# TradingAgents + Freqtrade 整合说明

## 概述

本文档说明如何将 **TradingAgents**（LLM 驱动的交易策略大脑）与 **Freqtrade**（交易执行引擎）进行整合。

```
┌─────────────────────────────────────────────────────────────────┐
│                        TradingAgents                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Research │→ │  Trader  │→ │   Risk   │→ │  Portfolio   │   │
│  │  Agent   │  │  Agent   │  │  Agent   │  │   Manager    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│        │              │             │             │             │
│        └──────────────┴─────────────┴─────────────┘             │
│                           │                                     │
│                    输出: TraderProposal                          │
│                    {action, entry_price, stop_loss, sizing}      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ 信号转换
┌─────────────────────────────────────────────────────────────────┐
│                       Freqtrade                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │ populate_      │→ │ populate_      │→ │   订单执行     │     │
│  │ indicators()   │  │ entry/exit()   │  │               │     │
│  └────────────────┘  └────────────────┘  └────────────────┘     │
│         │                    │                                   │
│         └────────────────────┴── DataFrame 信号列               │
│                                {enter_long, exit_long}           │
└─────────────────────────────────────────────────────────────────┘
```

## 核心组件

### 1. TradingAgents 信号格式

**TraderProposal** 结构（来自 `tradingagents/agents/schemas.py`）：

```python
class TraderProposal(BaseModel):
    action: TraderAction  # BUY, HOLD, SELL
    reasoning: str       # 决策理由
    entry_price: float   # 入场价格 (可选)
    stop_loss: float      # 止损价格 (可选)
    position_sizing: str  # 仓位建议, 如 "5% of portfolio"
```

### 2. Freqtrade 信号接口

Freqtrade 策略必须实现的方法：

| 方法 | 功能 | 输出列 |
|------|------|--------|
| `populate_indicators()` | 填充技术指标 | DataFrame with indicators |
| `populate_entry_trend()` | 生成入场信号 | `enter_long=1` 表示买入 |
| `populate_exit_trend()` | 生成出场信号 | `exit_long=1` 表示卖出 |

## 桥接策略实现

### TradingAgentsBridge 类

位置：`imperium-bot/strategies/trading_agents_bridge.py`

**核心功能：**

1. **延迟初始化 LLM**
   - 在 `__init__` 中创建 `TradingAgentsGraph`
   - 支持后续配置覆盖

2. **信号缓存机制**
   ```python
   _signal_cache: Dict[str, dict]  # pair -> signal
   _cache_duration_minutes: int    # 默认 60 分钟
   ```
   - 避免每个 K 线都调用 LLM
   - 减少 API 调用成本

3. **信号解析**
   ```python
   def _parse_trader_proposal(self, proposal_text: str, current_price: float) -> dict:
       # 解析 markdown 格式的 Trader 输出
       # 提取 action, entry_price, stop_loss, position_sizing
   ```

4. **信号转换**
   ```
   TradingAgents          Freqtrade
   ─────────────────────────────────
   BUY         →     enter_long = 1
   HOLD        →     不操作
   SELL        →     exit_long = 1
   ```

### 简化版 TradingAgentsLite

不依赖 LLM，基于简单技术指标：
- 金叉（短期均线 > 长期均线）→ 买入信号
- 死叉（短期均线 < 长期均线）→ 卖出信号

适用场景：
- 回测验证
- LLM 不可用时
- 开发调试

## 配置文件

位置：`imperium-bot/config/ta_ft_config.json`

### 关键配置项

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `strategy` | `TradingAgentsBridge` | 使用的策略类 |
| `dry_run` | `true` | 模拟盘模式 |
| `timeframe` | `1h` | K 线周期 |
| `max_open_trades` | `3` | 最大持仓数 |
| `trading_agents.selected_analysts` | `["market", "news"]` | 分析维度 |

## 使用方法

### 1. 前置条件

```bash
# 安装依赖
cd ~/quant-repos/TradingAgents
pip install -e .

# 配置 LLM API 密钥
export OPENAI_API_KEY="your-key"
# 或
export ANTHROPIC_API_KEY="your-key"
```

### 2. 启动 Freqtrade

```bash
# 进入 Freqtrade 目录
cd ~/quant-repos/freqtrade

# 使用桥接策略启动 (模拟盘)
freqtrade trade \
    --config ./imperium-bot/config/ta_ft_config.json \
    --strategy TradingAgentsBridge \
    --strategy-path ./imperium-bot/strategies

# 或回测
freqtrade backtesting \
    --config ./imperium-bot/config/ta_ft_config.json \
    --strategy TradingAgentsBridge \
    --strategy-path ./imperium-bot/strategies
```

### 3. 回测测试

```bash
freqtrade backtesting \
    --config ./imperium-bot/config/ta_ft_config.json \
    --strategy TradingAgentsLite \
    --strategy-path ./imperium-bot/strategies \
    --timerange 20230101-20231231
```

## 信号流程图

```
┌────────────────────────────────────────────────────────────────────┐
│                         每个 K 线周期                                │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Freqtrade 调用 populate_indicators(dataframe, metadata)        │
│                          │                                          │
│                          ▼                                          │
│  2. 检查缓存是否过期 (_should_analyze)                               │
│                          │                                          │
│         ┌────────────────┴────────────────┐                         │
│         │                                 │                         │
│      过期                             未过期                         │
│         │                                 │                         │
│         ▼                                 ▼                         │
│  3. 调用 TradingAgents               4. 使用缓存信号                 │
│     _analyze_with_trading_agents()                                │
│                          │                                          │
│                          ▼                                          │
│  5. 解析 TraderProposal                                           │
│     → action, entry_price, stop_loss                              │
│                          │                                          │
│                          ▼                                          │
│  6. 更新信号缓存                                                   │
│                                                                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  7. Freqtrade 调用 populate_entry_trend(dataframe, metadata)       │
│     → 设置 dataframe["enter_long"] = 1 如果 action == BUY          │
│                                                                     │
│  8. Freqtrade 调用 populate_exit_trend(dataframe, metadata)        │
│     → 设置 dataframe["exit_long"] = 1 如果 action == SELL          │
│                                                                     │
│  9. Freqtrade 执行订单                                             │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

## 自定义配置

### 修改 TradingAgents 分析配置

编辑 `TradingAgentsBridge` 类中的 `trading_agents_config`：

```python
trading_agents_config: Dict = {
    "selected_analysts": ["market", "news", "social", "fundamentals"],
    "lookback_days": 14,
    "debug": True,
}
```

### 修改信号缓存策略

```python
# 更频繁的分析
_cache_duration_minutes: int = 30  # 30分钟更新一次

# 更激进的止损
stoploss: float = -0.03  # 3% 止损
```

### 添加自定义指标

```python
def populate_indicators(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
    # 添加 TA-Lib 指标
    dataframe['rsi'] = ta.RSI(dataframe['close'], timeperiod=14)
    dataframe['macd'] = ta.MACD(dataframe['close'])[0]
    
    return dataframe
```

## 注意事项

1. **LLM 调用成本**
   - 建议启用信号缓存
   - 避免高频调用

2. **信号延迟**
   - LLM 分析有延迟
   - 建议使用较长时间周期（如 1h, 4h）

3. **回测限制**
   - 回测时无法调用 LLM
   - 使用 `TradingAgentsLite` 进行回测

4. **风控**
   - 建议设置止损
   - 建议使用追踪止损
   - 控制最大持仓数

## 文件结构

```
~/quant-repos/imperium-bot/
├── config/
│   └── ta_ft_config.json      # Freqtrade 配置文件
└── strategies/
    └── trading_agents_bridge.py  # 桥接策略实现
```

## 扩展方向

1. **多周期信号融合**
   - 结合短期（1h）和长期（4h）信号

2. **信号置信度**
   - 解析 LLM 输出的置信度
   - 只在置信度高时交易

3. **动态仓位**
   - 根据 position_sizing 动态调整仓位

4. **组合多个 LLM**
   - 集成多个 LLM 的信号
   - 使用投票机制决策

---

**维护者**: 帝国 Bot 团队  
**最后更新**: 2025
