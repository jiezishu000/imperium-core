# 高星量化框架因子体系拆解地图

量化交易本质就是**因子 = 信号 = Alpha**。本报告对五大主流量化框架进行因子体系系统性拆解，从因子清单、计算逻辑、组合方式、衰减机制、独特优势五个维度进行分析。

---

## 一、Freqtrade 因子体系

### 1.1 因子清单

| 类别 | 因子名称 | 数量 |
|------|---------|------|
| **趋势型** | EMA, SMA, WMA, HMA, ZLMA, ROC | 6 |
| **均值回归型** | Bollinger Bands, Weighted Bollinger Bands, Keltner Channel | 3 |
| **动量型** | RSI, MACD, TDI, Awesome Oscillator, ROC | 5 |
| **波动型** | ATR, True Range, Bollinger Width, Implied Volatility | 4 |
| **成交量型** | VWAP, Rolling VWAP, PVT, Relative Volume | 4 |
| **随机型** | Stochastic, Williams %R, CCI | 3 |
| **特殊型** | Heikin-Ashi, IBS, Z-Score, Chopiness, Aroon | 5 |
| **形态型** | Session, Cross Above/Below | 2 |

**总计：32+ 指标**

### 1.2 核心因子计算公式

| 因子 | 公式/逻辑 |
|------|----------|
| **RSI** | `100 - 100/(1 + AvgGain/AvgLoss)`, 窗口=14 |
| **MACD** | `EMA(fast=3) - EMA(slow=10)`, Signal=EMA(macd, smooth=16) |
| **Bollinger Bands** | 中轨=SMA(close,20), 上轨=中轨+2σ, 下轨=中轨-2σ |
| **ATR** | `Mean(TrueRange)`, TrueRange=Max(H-L, \|H-PC\|, \|L-PC\|) |
| **VWAP** | `Sum(price×volume) / Sum(volume)` (滚动窗口) |
| **HMA** | `2×WMA(n/2) - WMA(n)`, 再做sqrt(n)的WMA |
| **CCI** | `(TypicalPrice - SMA(TP,20)) / (0.015 × Std(TP))` |
| **Stochastic** | `100×(Close - LL(n)) / (HH(n) - LL(n))` |
| **RSI** | Wilder's 平滑算法，双重平滑（增益/损失） |

### 1.3 因子权重与组合

| 组合方式 | 说明 |
|---------|------|
| **FreqAI (ML)** | 使用 LightGBM/XGBoost 动态学习因子权重，非线性组合 |
| **传统策略** | 固定阈值组合，如 `RSI<30 AND MACD>0 AND Bollinger下穿` |
| **特征膨胀** | `indicator_periods_candles × include_timeframes × include_shifted_candles × include_corr_pairs` 自动扩展 |
| **自定义特征** | 用户可添加 `%` 前缀因子，由 FreqAI 自动扩展 |

### 1.4 因子衰减机制

| 维度 | 策略 |
|------|------|
| **数据更新** | 实时K线更新，价格因子无衰减 |
| **模型重训练** | FreqAI 每 `freqai_retrain_hours` 或新数据量触发重训练 |
| **Hyperopt优化** | 参数自动优化，最优参数随市场变化可能失效 |
| **滚动窗口** | 训练集滚动窗口（如最近180天），避免过拟合历史 |

### 1.5 Freqtrade 独有因子

- **FreqAI多目标预测**：可同时预测涨跌方向、幅度、范围，支持多输出分类器
- **特征自动扩展系统**：单因子自动生成多周期×多 timeframe×多标的×移位变体
- **TDI (Traders Dynamic Index)**：RSI + Bollinger Bands 组合指标
- **IBS (Internal Bar Strength)**：`(Close - Low) / (High - Low)`
- **Heikin-Ashi**：平滑K线形态，滤除噪音
- **Chopiness Index**：衡量市场趋势/盘整状态
- **FreqAI Hybrid**：混合模式，支持分类+回归双输出

---

## 二、TradingAgents 因子体系

### 2.1 因子清单

| 类别 | 因子名称 | 数量 |
|------|---------|------|
| **移动平均** | SMA(50/200), EMA(10) | 3 |
| **MACD族** | MACD, MACD Signal, MACD Histogram | 3 |
| **动量型** | RSI | 1 |
| **波动型** | Bollinger Bands(上/中/下), ATR | 4 |
| **成交量型** | VWMA | 1 |
| **基本面** | 财务报表、资产负债表、现金流量表、利润表、内幕交易 | 5 |
| **情绪面** | 新闻分析、社交媒体情绪 | 2 |

**总计：19+ 因子**（技术面），基本面与情绪面通过 LLM 动态提取

### 2.2 核心因子计算公式

| 因子 | 公式/逻辑 |
|------|----------|
| **close_50_sma** | `Mean(Close, 50)` |
| **close_200_sma** | `Mean(Close, 200)` |
| **macd** | `EMA(Close, fast) - EMA(Close, slow)` |
| **macds (Signal)** | `EMA(MACD, signal_period)` |
| **macdh (Histogram)** | `MACD - Signal` |
| **rsi** | 标准RSI, 阈值70/30 |
| **boll / boll_ub / boll_lb** | `SMA(20) ± 2×Std(20)` |
| **atr** | `Mean(TrueRange, 14)` |
| **vwma** | `Sum(Close×Volume) / Sum(Volume)` |

### 2.3 因子权重与组合

| 组合方式 | 说明 |
|---------|------|
| **LLM动态选择** | Agent 根据市场状态动态选择8个最相关的因子，避免冗余 |
| **去冗余规则** | 不同时选 RSI 和 Stochastic RSI |
| **互补性原则** | 选择提供不同维度信息的指标 |
| **多Agent协同** | Market Analyst (技术面) + Fundamentals Analyst (基本面) + News Analyst (情绪面) + Social Media Analyst (舆情) |

### 2.4 因子衰减机制

| 维度 | 策略 |
|------|------|
| **实时数据** | K线数据实时更新 |
| **基本面更新** | 财报季（季度/年报）更新，数据陈旧度低 |
| **情绪分析** | 新闻/社交媒体每日更新 |
| **模型适应** | Agent 通过对话持续学习市场状态 |

### 2.5 TradingAgents 独有因子

- **LLM语义因子**：通过自然语言处理从新闻、财报、管理层发言中提取情绪信号
- **多Agent协同决策**：分解为研究、分析师、交易员角色，模拟真实机构流程
- **动态因子池**：根据市场环境动态调整因子组合，而非固定策略
- **内幕交易因子**：跟踪内部人买卖行为作为 Alpha 信号

---

## 三、Qlib 因子体系

### 3.1 因子清单（Alpha158 + Alpha360）

| 类别 | 因子名称 | 数量 |
|------|---------|------|
| **K线形态** | KMID, KLEN, KMID2, KUP, KUP2, KLOW, KLOW2, KSFT, KSFT2 | 9 |
| **价格滚动** | ROC, MA, STD, BETA, RSQR, RESI | 6×5周期=30 |
| **极值型** | MAX, MIN, QTLU, QTLD | 4×5周期=20 |
| **时序型** | RANK, RSV, IMAX, IMIN, IMXD | 5×5周期=25 |
| **相关型** | CORR, CORD | 2×5周期=10 |
| **动量统计** | CNTP, CNTN, CNTD, SUMP, SUMN, SUMD | 6×5周期=30 |
| **成交量型** | VMA, VSTD, WVMA, VSUMP, VSUMN, VSUMD | 6×5周期=30 |
| **原始价格** | CLOSE, OPEN, HIGH, LOW, VWAP (多窗口) | 25+ |
| **原始成交量** | VOLUME (多窗口) | 5 |

**Alpha158 总计：158+ 因子**

| 类别 | 因子名称 | 数量 |
|------|---------|------|
| **归一化价格** | CLOSE0-59, OPEN0-59, HIGH0-59, LOW0-59, VWAP0-59 | 60×5=300 |
| **归一化成交量** | VOLUME0-59 | 60 |

**Alpha360 总计：360 因子**（全部归一化到最新价格）

### 3.2 核心因子计算公式

| 因子 | 公式/逻辑 |
|------|----------|
| **KMID** | `(Close - Open) / Open` |
| **KLEN** | `(High - Low) / Open` |
| **KUP** | `(High - Max(Open,Close)) / Open` |
| **KLOW** | `(Min(Open,Close) - Low) / Open` |
| **ROC(d)** | `Ref(Close,d) / Close - 1` |
| **MA(d)** | `Mean(Close, d) / Close` |
| **STD(d)** | `Std(Close, d) / Close` |
| **RSQR(d)** | R² of linear regression on Close over d days |
| **RESI(d)** | 回归残差 / Close |
| **BETA(d)** | Slope(Close, d) / Close |
| **CORR(d)** | `Corr(Close, Log(Volume), d)` |
| **CORD(d)** | `Corr(ΔClose/Close, ΔVolume/Volume, d)` |
| **RSV(d)** | `(Close - Min(Low,d)) / (Max(High,d) - Min(Low,d))` |
| **SUMP(d)** | `Sum(Gain>0) / Sum(Abs(Return))` (类似RSI) |
| **WVMA(d)** | `Std(Abs(Return)×Volume,d) / Mean(Abs(Return)×Volume,d)` |
| **IMAX(d)** | `IdxMax(High,d) / d` (Aroon风格) |

### 3.3 因子权重与组合

| 组合方式 | 说明 |
|---------|------|
| **深度学习自动组合** | TFT/Transformer/LSTM 等模型自动学习非线性因子交互 |
| **线性加权** | 原始Alpha158 也可搭配线性模型 |
| **滚动 Z-Score 归一化** | CSZScoreNorm 确保跨截面可比性 |
| **时序标准化** | 每个因子在时序上做 Z-Score 处理 |
| **特征选择** | Alpha158 TFT 选择了22个核心因子（见下） |

**TFT 精选的22个 Alpha158 因子：**
```
RESI5, WVMA5, RSQR5, KLEN, RSQR10, CORR5, CORD5, CORR10, ROC60,
RESI10, VSTD5, RSQR60, CORR60, WVMA60, STD5, RSQR20, CORD60,
CORD10, CORR20, KLOW, + date features
```

### 3.4 因子衰减机制

| 维度 | 策略 |
|------|------|
| **滚动训练** | 滚动窗口训练（如每季度），避免过拟合历史 |
| **增量学习** | 支持增量更新模型参数 |
| **数据老化剔除** | 因子计算仅用最近N天数据，天然衰减 |
| **预测周期** | LABEL0 = `Ref(Close,-2)/Ref(Close,-1)-1`（T+1收益） |

### 3.5 Qlib 独有因子

- **超大规模因子库**：158/360个预定义因子，覆盖价、量、时序、统计多维度
- **因子DSL语言**：`Ref($close, d)`, `Mean($close, d)`, `Corr(A, B, d)` 等表达式
- **跨截面+时序双维度**：因子既做滚动计算，也做横截面排名
- **AlphaNet 因子**：可扩展的因子搜索空间
- **TFT 时序融合**：同时建模时序依赖和静态特征

---

## 四、FinRL 因子体系

### 4.1 因子清单

| 类别 | 因子名称 | 数量 |
|------|---------|------|
| **趋势型** | SMA(30/60) | 2 |
| **动量型** | MACD, RSI(30), CCI(30), DX(30) | 4 |
| **波动型** | Bollinger Bands (上轨/下轨) | 2 |
| **风险型** | Turbulence Index, VIX | 2 |
| **另类数据** | 市场波动率指数 (VIX) | 1 |

**标准配置总计：11 因子**（使用 stockstats 库计算）

### 4.2 核心因子计算

| 因子 | 公式/逻辑 |
|------|----------|
| **macd** | `EMA(close,12) - EMA(close,26)`, Signal=EMA(9) |
| **boll_ub** | `SMA(close,20) + 2×Std` |
| **boll_lb** | `SMA(close,20) - 2×Std` |
| **rsi_30** | RSI, 窗口=30 |
| **cci_30** | CCI, 窗口=30 |
| **dx_30** | ADX, 窗口=30 |
| **close_30_sma** | `Mean(Close, 30)` |
| **close_60_sma** | `Mean(Close, 60)` |
| **turbulence** | 基于协方差矩阵的极端市场度量 |

### 4.3 因子权重与组合

| 组合方式 | 说明 |
|---------|------|
| **DRL自动学习** | PPO/A2C/SAC/DDPG 等策略直接学习状态→动作映射，因子权重隐式学得 |
| **状态空间构造** | `state = [cash, stock_holdings×n_assets, prices×n_assets, tech_indicators×n_assets]` |
| **奖励塑形** | 账户收益作为奖励，RL算法自动识别有效因子组合 |
| **可扩展指标** | 支持用户自定义 tech_indicator_list |

### 4.4 因子衰减机制

| 维度 | 策略 |
|------|------|
| **环境重置** | 每个 episode 从头开始，使用最新数据 |
| **在线学习** | 支持持续训练适应市场变化 |
| **滚动窗口** | 数据按时间分割，训练集/测试集分离 |

### 4.5 FinRL 独有因子

- **Turbulence Index**：市场极端风险度量，基于收益率协方差矩阵
- **VIX 恐慌指数**：市场波动率预期的代理变量
- **RL原生态子组合**：不显式定义因子权重，由策略网络隐式学习
- **多资产联合状态空间**：同时考虑N个资产的因子作为联合状态

---

## 五、vnpy 因子体系

### 5.1 因子清单

| 类别 | 因子来源 | 说明 |
|------|---------|------|
| **信号型** | AlphaLab Signal | 用户自定义因子/模型输出的Signal DataFrame |
| **风控型** | AlphaLab 风控模块 | 持仓管理、流动性管理 |
| **执行型** | AlphaLab 执行模块 | 订单管理、价格优化 |

**核心模式：信号驱动（Signal-Driven）**，不内置技术指标计算

### 5.2 因子计算（通过 AlphaLab）

| 模块 | 功能 |
|------|------|
| **AlphaDataset** | 数据加载、因子计算、信号生成 |
| **AlphaModel** | 机器学习模型训练与预测 |
| **AlphaSignal** | 信号 DataFrame: `vt_symbol, signal, datetime` |

### 5.3 因子权重与组合

| 组合方式 | 说明 |
|---------|------|
| **信号排名** | 按 signal 值排序，取 top_k 做多 |
| **目标持仓** | `target = signal_rank × cash_ratio / price` |
| **再平衡** | 定期按信号调整持仓至目标仓位 |
| **示例策略** | EquityDemoStrategy: `top_k=50, n_drop=5, min_days=3` |

### 5.4 因子衰减机制

| 维度 | 策略 |
|------|------|
| **信号日更新** | 每个交易日根据最新信号调整 |
| **持仓最短期** | `min_days` 防止频繁换手 |
| **滑点成本** | `price_add` 参数控制交易滑点 |

### 5.5 vnpy 独有设计

- **Signal-Execution 解耦**：信号生成与执行完全分离
- **目标持仓模式**：`set_target()` + `execute_trading()` 自动拆单执行
- **多空双向**：支持 LONG/SHORT, OPEN/CLOSE 四种仓位操作
- **佣金优化**：`min_commission` 防止小额交易被佣金侵蚀

---

## 六、跨框架对比

### 6.1 因子数量对比

| 框架 | 因子数量 | 类型 |
|------|---------|------|
| Freqtrade | 32+ | 技术指标为主 |
| TradingAgents | 19+ 技术 + 无限基本面/情绪 | LLM动态提取 |
| Qlib | **158/360** | 预定义+可扩展 |
| FinRL | 11 标准，可扩展 | 技术指标 |
| vnpy | 取决于用户实现 | 信号驱动 |

### 6.2 因子组合方式对比

| 框架 | 组合方式 | 权重类型 |
|------|---------|---------|
| Freqtrade | 阈值规则 / FreqAI(ML) | 固定 / 动态 |
| TradingAgents | LLM动态选择 | 动态 |
| Qlib | 深度学习 | 动态 |
| FinRL | DRL强化学习 | 隐式动态 |
| vnpy | 信号排名 | 固定 |

### 6.3 因子衰减策略对比

| 框架 | 衰减机制 | 更新频率 |
|------|---------|---------|
| Freqtrade | 滚动训练+Hyperopt | 天/小时 |
| TradingAgents | 实时数据+财报季 | 实时/季度 |
| Qlib | 滚动窗口+增量学习 | 季度/日 |
| FinRL | Episode重置+在线学习 | 每日 |
| vnpy | 每日信号+min_days | 日 |

---

## 七、关键洞察与建议

### 7.1 各框架核心优势

| 框架 | 核心优势 | 最佳场景 |
|------|---------|---------|
| **Freqtrade** | FreqAI + 自动特征扩展 | 加密货币高频/多标的 |
| **TradingAgents** | LLM语义理解 + 多Agent协同 |基本面+情绪分析 |
| **Qlib** | 超大规模因子库 + 专业时序建模 | A股/美股量化投研 |
| **FinRL** | 端到端RL + 多资产组合优化 | 投资组合管理 |
| **vnpy** | 机构级执行 + 完整风控 | 实盘交易/算法执行 |

### 7.2 因子设计核心原则

1. **归一化优先**：所有因子应除以当前价格，消除量纲
2. **滚动窗口**：使用最近N天数据，天然实现因子衰减
3. **横截面可比**：做 Z-Score 或 Rank 处理
4. **避免未来函数**：只用当前及之前的数据计算
5. **因子正交化**：减少冗余，提高模型效率

### 7.3 推荐因子组合策略

```
趋势: SMA(50/200) + EMA(10) + MACD
动量: RSI + ROC + CCI
波动: Bollinger Bands + ATR
成交量: VWAP + Relative Volume + OBV
另类: Turbulence + VIX
```

---

*报告版本：2025.06.02*
*数据来源：各框架源码分析*
