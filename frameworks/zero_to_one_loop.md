# Imperium 帝国：从 0 到 1 最短闭环路径

## 核心理念
**飞轮转起来之前，只需要一个最小的转动。**
目标：证明 LLM + 量化能赚钱，不是构建完整系统。

---

## 最短路径（4 步闭环）

```
策场验证 → 回测验证 → 模拟盘 → 第一笔真金
   ↓           ↓          ↓          ↓
 AgentWorld  Freqtrade  Gate.io    实盘$50
  逻辑验证    历史数据   Dry-run    真实闭环
```

### 第 1 步：策场验证（Agent World）
**做什么**：用 Agent World 的 1978 个合成环境验证 LLM 决策逻辑
**零件**：TradingAgents（LLM决策层）+ Agent World 策场
**产出**：决策正确率、工具调用成功率
**验证标准**：>80% 任务完成率，或在金融类场景中盈利信号准确率 >60%
**卡点突破**：策场环境是合成的，无需真实 API，直接验证决策逻辑

### 第 2 步：回测验证（Freqtrade）
**做什么**：用 Freqtrade 的 dry-run 模式 + 历史数据验证策略
**零件**：Freqtrade + 历史 OHLCV 数据 + Qlib 因子（可选）
**产出**：Sharpe、Max Drawdown、Win Rate
**验证标准**：Sharpe > 1.0，Max Drawdown < 20%
**卡点突破**：Dry-run 模式不需要真实 API key，用 fake key 即可运行

### 第 3 步：模拟盘（Gate.io）
**做什么**：Freqtrade 连接 Gate.io，用 dry-run 模式跑真实市场数据
**零件**：Freqtrade + Gate.io API（只读权限即可）
**产出**：实时信号、模拟订单执行日志
**验证标准**：连续 7 天每日盈亏不为负，或累计盈利 > 1%
**卡点突破**：
- Gate.io 支持 Freqtrade，API 获取无门槛
- Dry-run 不动用真钱，只验证信号与订单流程

### 第 4 步：第一笔真金
**做什么**：实盘最小金额（$50 USDT）
**零件**：Freqtrade（dry-run=false）+ Gate.io（实盘权限）
**产出**：真实盈亏
**验证标准**：赚到哪怕 $1，即闭环完成
**资金来源**：
1. 自有资金 $50（推荐，风险可控）
2. 交易所新人奖励（如 Gate.io 新用户有免手续费体验金）
3. 朋友/天使出资，承诺亏损兜底

---

## 关键技术细节

### Freqtrade 连接方案优先级
```
1. Gate.io（推荐）
   - 支持 Freqtrade 原生
   - API 注册无门槛
   - 支持 spot + futures
   
2. Binance（备选）
   - 需要 API Key + Secret
   - 注册需 KYC
   
3. Dry-run Only（无门槛）
   - 不连交易所
   - 只用历史数据回测
```

### 最小可运行配置
```yaml
# config.json (Gate.io dry-run)
{
    "dry_run": true,
    "exchange": {
        "name": "gateio",
        "key": "fake_key",
        "secret": "fake_secret"
    },
    "pairlist": ["BTC/USDT"],
    "stake_currency": "USDT",
    "stake_amount": 100
}
```

---

## 风险控制

| 阶段 | 最大亏损 | 止损线 |
|------|---------|--------|
| 策场验证 | $0 | N/A |
| 回测验证 | $0 | N/A |
| 模拟盘 | $0（dry-run）| N/A |
| 实盘 $50 | $50 | 亏损 20% 停止 |

---

## 时间线（最激进估算）

- **Day 1**：搭建 Freqtrade + 配置 Gate.io API
- **Day 2**：跑通 dry-run 回测，拿到第一个回测报告
- **Day 3-7**：策场验证 LLM 决策逻辑
- **Day 8-14**：模拟盘验证，连续 7 天观察
- **Day 15**：第一笔真金入场

**最快 2 周完成从 0 到 1。**

---

## 总结

**闭环 = 证明能赚钱，不是完美系统。**

最小闭环只需要：
1. ✅ LLM 决策逻辑（Agent World 验证）
2. ✅ 策略回测（Freqtrade dry-run）
3. ✅ 市场信号（Gate.io 实时数据）
4. ✅ 真金入场（$50）

飞轮转起来之后，再迭代优化。
