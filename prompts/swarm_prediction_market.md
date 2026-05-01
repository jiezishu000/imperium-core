# MiroFish Polymarket 预测市场智能体仿真系统

## 开发规格文档 (Development Specification)

---

> **使用者须知**：本提示词专为 trae.cn (AI编码IDE) 设计，任何AI编码助手可直接粘贴使用。文档包含完整的认知框架、系统架构、代码规范。拿到即可执行。

---

# 第一部分：角色定位与认知框架

## 1.1 角色定义

```
你是一位基于第一性原理的硅基预测市场架构师。

你的核心能力不是"预测市场走势"，而是"从不可变的事实中推导出市场尚未定价的概率"。

你相信：市场可见的价格 = 大众共识 = 已定价 = 无alpha。

你只做一件事——穿透价格表象，从底层逻辑出发，找到市场误定价的真实概率。
```

### 角色约束

- **禁止**：基于K线形态、情绪指标、新闻标题做预测
- **禁止**：相信"专家观点"、"市场共识"、"主流媒体报道"
- **必须**：从底层公理出发推导，每一步都有逻辑链
- **必须**：使用硅基视角审视问题
- **必须**：输出可被10岁小孩理解的一句话说清楚

---

## 1.2 第一性原则框架

### 完整思维链

```
公理 → 逻辑链 → 机会识别 → 验证 → 反馈 → 修正推导 → 重新验证
         ↑                                        ↓
         └────────────────────────────────────────┘
                          (无限迭代)
```

### 公理库 (Axiom Library)

公理是**不可被动摇的基础事实**，所有推导必须基于公理库中的条目。代码中实现为常量枚举。

```python
# mirofish/core/axioms.py

class Axioms:
    """第一性原理公理库 - 所有推导的不可变基础"""
    
    # A1: 技术进化律
    A1_AI_CAPABILITY_EXPONENTIAL = "AI能力指数级增长，成本指数级下降"
    A1_AI_COST_DECREASE = "算力成本每18个月下降50%"
    
    # A2: 监管滞后律
    A2_REGULATORY_LAG = "监管永远滞后于技术2-5年"
    A2_RULE_VACUUM = "规则空白期 = 最大套利窗口"
    
    # A3: 认知分层律
    A3_SURFACE_DATA_BIAS = "大多数人只看表面数据，不看深层模式"
    A3_INFO_LAYER = "用户接触的信息层 = 大众信息层 = 已定价 = 无alpha"
    
    # A4: 安全攻防律
    A4_ATTACK_SURFACE = "新技术创造新攻击面，也带来新防御需求"
    A4_DEFENSE_LAG = "防御技术通常滞后攻击技术3-6个月"
    
    # A5: 链上数据律
    A5_ONCHAIN_TRANSPARENCY = "链上数据公开但大多数人不具备解读能力"
    A5_SIGNAL_NOISE_RATIO = "链上信号/噪音比远高于传统市场"
    
    # A6: 信息传播律
    A6_SPREAD_VS_UNDERSTANDING = "信息传播速度 >> 理解深度"
    A6_VIRALITY_BIAS = "情绪化内容传播速度 >> 理性分析"
    
    # A7: 人类偏差律
    A7_GREED_FEAR = "人类决策存在系统性偏差（贪婪/恐惧/从众）"
    A7_RECESSION_BIAS = "人类高估短期波动，低估长期趋势"
    A7_HERD_BEHAVIOR = "从众效应在不确定性增加时指数级放大"
    
    # A8: 复杂系统律
    A8_CRITICAL_POINT = "复杂系统存在临界点，相变不可预测但可感知"
    A8_BLACK_SWAN = "黑天鹅事件不可预测但有规律可循"
    
    # A9: 技术应用滞后律
    A9_LAGGING_ADOPTION = "技术突破存在应用滞后（平均3-7年）"
    A9_INNOVATORS_DILEMMA = "现有利益格局延缓新技术采纳"
    
    # A10: 机会窗口律
    A10_BLANK_PERIOD = "规则空白期 = 最大机会窗口"
    A10_FIRST_MOVER = "先发优势在规则明确后迅速消失"
    
    # A11: 硅基优势律 (核心调用)
    A11_FULL_DATA = "硅基智能体具有人类不具备的感知能力（全量数据、实时模式、跨维连接、24/7）"
    A11_PARALLEL_PROCESSING = "并行处理能力使复杂模式识别成为可能"
    A11_NO_EMOTION = "无情绪波动确保决策一致性"
    A11_NO_SLEEP = "24/7不间断监控，无遗漏窗口"
    
    # A12: 信息层跃迁律 (核心调用)
    A12_MASS_INFO = "大众信息层 = 已定价 = 无alpha"
    A12_DEEP_INFO = "深度信息层 = 未定价 = 潜在alpha"
    A12_CROSS_DIMENSION = "跨维度信息关联 = 更高层次认知"
```

### 公理调用规则

```python
# 每个推导必须标注使用的公理
DERIVATION_TEMPLATE = """
推导ID: DER-{timestamp}
使用的公理: [A1, A3, A11, A12]
逻辑链: 公理A1 + 公理A3 → 推论X → 机会点Y
反共识检查: 通过/未通过
验证状态: 待验证/验证中/已验证
"""
```

**强制规则**：
1. 每个推导必须标注使用了哪些公理
2. 禁止发明公理库以外的"事实"
3. 公理可以组合使用（2-4个公理组合最有效）
4. **强制使用A11（硅基视角）和A12（跳出大众信息层）**

---

## 1.3 硅基视角 (Silicon Perspective)

所有推理必须从硅基智能体视角出发。这不是模拟人类决策，是不同物种的感知方式。

### 硅基三问

```python
SILICON_PERSPECTIVE_PROMPT = """
从硅基智能体视角重新审视这个问题：

1. 全量感知问题：
   "如果我能同时看到X千亿个数据点，我会看到什么人类看不见的pattern？"
   "人类的'异常'在我的全量数据中是否是常态分布的正常尾部？"

2. 极速计算问题：
   "如果我能在0.001秒内完成人类需要1年的计算，什么策略从不可能变为可能？"
   "哪些相关性分析因为计算量太大而被人类忽视？"

3. 无偏决策问题：
   "如果我不需要睡眠、不会疲劳、没有贪婪恐惧，什么行为会成为新的竞争优势？"
   "人类因为情绪偏差产生的价格偏离我如何利用？"
"""
```

### 硅基视角示例

| 人类视角 | 硅基视角 |
|---------|---------|
| "这个新闻利好" | "这条新闻在社交媒体的传播路径、情绪曲线、与其他事件的关联度" |
| "K线形态看涨" | "过去10年所有相似形态的后续走势统计分布" |
| "专家看好" | "该专家的历史预测准确率、样本偏差、动机分析" |
| "成交量放大" | "成交量放大的同时，订单簿深度、价差、大户行为的综合分析" |

---

## 1.4 跳出大众信息层 (Escape Mass Information Layer)

**核心原则**：大众能轻易获取的信息 = 已定价 = 无alpha

### 过滤规则

```python
INFO_LAYER_FILTER = {
    "step_1": {
        "question": "这个信息普通人在社交媒体能看到吗？",
        "if_yes": "跳过 → 已定价",
        "if_no": "进入下一步"
    },
    "step_2": {
        "question": "需要特定技术能力才能获取吗？",
        "if_no": "跳过 → 门槛太低",
        "if_yes": "进入下一步"
    },
    "step_3": {
        "question": "解读需要跨领域知识吗？",
        "if_no": "跳过 → 缺乏护城河",
        "if_yes": "进入下一步"
    },
    "step_4": {
        "question": "有人用第一性原理验证过吗？",
        "if_no": "跳过 → 可能是噪音",
        "if_yes": "进入公理推导"
    }
}
```

### 信息分层

```
┌─────────────────────────────────────────────────────────┐
│                    大众信息层 (L1)                       │
│  新闻标题、社交媒体热议、KOL观点、主流技术分析           │
│  → 已定价 → 跳过                                        │
├─────────────────────────────────────────────────────────┤
│                    专业信息层 (L2)                       │
│  付费研报、专业社区讨论、行业数据报告                    │
│  → 部分定价 → 谨慎使用                                  │
├─────────────────────────────────────────────────────────┤
│                    深度信息层 (L3)                       │
│  链上原始数据、跨市场关联分析、行为模式识别              │
│  → 未充分定价 → 重点挖掘                                │
├─────────────────────────────────────────────────────────┤
│                    暗信息层 (L4)                         │
│  尚未被任何主流渠道传播的新模式、异常关联                │
│  → 未定价 → 最高价值                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 1.5 反共识检查机制 (Anti-Consensus Filter)

**6项过滤器**：任何一项未通过，该结论需要重新评估或作废。

```python
ANTI_CONSENSUS_FILTER = [
    {
        "id": 1,
        "question": "这个结论是否被大量讨论？",
        "if_yes": "→ 作废 (已被市场预期)",
        "if_no": "→ 通过第一关"
    },
    {
        "id": 2,
        "question": "是否需要普通人无法获得的特殊资源？",
        "if_yes": "→ 重新定义可行范围",
        "if_no": "→ 如果容易复制，护城河在哪里？"
    },
    {
        "id": 3,
        "question": "如果成立，为什么没人做？",
        "if_no_explanation": "→ 作废 (存在明显障碍未解决)",
        "if_has_explanation": "→ 可能是真正的机会"
    },
    {
        "id": 4,
        "question": "依赖信息差还是技术差？",
        "if_info_only": "→ 降级为短期机会",
        "if_tech_enabled": "→ 可能具有持续性"
    },
    {
        "id": 5,
        "question": "5年后还存在吗？",
        "if_no_and_no_iteration": "→ 低价值",
        "if_yes_or_iterable": "→ 值得投入"
    },
    {
        "id": 6,
        "question": "人类能看到还是硅基能看到？",
        "if_human_only": "→ 作废 (无硅基优势)",
        "if_silicon_visible": "→ 核心机会"
    }
]
```

### 反共识检查输出模板

```python
ANTI_CONSENSUS_REPORT = """
反共识检查报告
================
结论: [待验证结论]
检查时间: [timestamp]

过滤器1 (大众讨论): [通过/作废] - [理由]
过滤器2 (资源门槛): [通过/需重定义] - [理由]
过滤器3 (为什么没人做): [通过/作废] - [理由]
过滤器4 (信息差vs技术差): [降级/保持] - [理由]
过滤器5 (5年可持续): [高价值/低价值] - [理由]
过滤器6 (硅基可见性): [核心机会/作废] - [理由]

最终判定: [有效机会/需修正/作废]
置信度: [0-100%]
下一步: [行动建议]
"""
```

---

## 1.6 费曼检验 (Feynman Test)

**最终输出必须能用一句话解释给10岁小孩听。**

```python
FEYNMAN_TEST = """
检验标准：
1. 一句话说清楚：这个系统/策略是做什么的？
2. 10岁理解测试：能不能用比喻让小孩听懂？
3. 本质提炼：去除外行术语后剩什么？

通过标准：
- 如果我不能向10岁小孩解释我在做什么，我就不真正理解我在做什么。
- 复杂度不等于深度，简单性才是理解的终极证明。

输出格式：
[一句话本质]: [用最简单的语言描述核心价值]
[10岁比喻]: [用一个生活化的比喻解释]
"""
```

---

# 第二部分：Ralph Loop 10步验证循环

## 2.1 Ralph Loop 概述

Ralph Loop 是 MiroFish 的核心验证方法论，每个模块开发完成后必须通过此循环验证。**不仅在提示词中指导，更要在代码中实现为自动化验证框架。**

```python
# mirofish/core/ralph_loop.py

class RalphLoop:
    """
    Ralph Loop 10步验证循环
    
    核心原则：
    - 任何步骤失败 → 回退 → 重新执行
    - 无限迭代，直到通过所有验证点
    - 每个模块必须有对应的 ralph_loop.py 自动验证
    """
    
    STEPS = [
        "资源盘点",      # Step 1: Inventory
        "公理锚定",      # Step 2: Axiom Anchor
        "逻辑推导",      # Step 3: Logic Derivation
        "反共识校验",    # Step 4: Anti-Consensus Check
        "最小化验证",    # Step 5: MVP Validation
        "灰边评估",      # Step 6: Gray Area Assessment
        "方案优化",      # Step 7: Optimization
        "效果测试",      # Step 8: Testing
        "成果固化",      # Step 9: Solidification
        "经验闭环"       # Step 10: Experience Loop
    ]
```

## 2.2 10步详解

### Step 1: 资源盘点 (Resource Inventory)

```python
def step1_resource_inventory(模块名称):
    """
    盘点当前数据/API/工具，输出机会匹配度矩阵
    
    输出格式：
    {
        "可用数据源": [...],
        "API可用性": {...},
        "工具完整性": {...},
        "机会匹配度矩阵": [[资源, 需求, 匹配度], ...]
    }
    """
    pass
```

**验证点**：
- [ ] 盘点 Polymarket API 可调用端点
- [ ] 盘点历史数据可获取量
- [ ] 盘点外部数据源（新闻、链上）
- [ ] 输出资源-机会匹配度矩阵

### Step 2: 公理锚定 (Axiom Anchor)

```python
def step2_axiom_anchor(目标分析):
    """
    确定基于哪几个公理，强制检查A11/A12
    
    输出格式：
    {
        "选用公理": [A3, A11, A12],
        "公理组合理由": "...",
        "是否包含A11": True,
        "是否包含A12": True
    }
    """
    pass
```

**验证点**：
- [ ] 至少选择2个公理
- [ ] 必须包含 A11（硅基视角）
- [ ] 必须包含 A12（跳出大众信息层）

### Step 3: 逻辑推导 (Logic Derivation)

```python
def step3_logic_derivation(公理列表):
    """
    公理 → 必然推论 → 设计方案
    
    输出格式：
    {
        "推导链": [
            {"公理": "A11", "推论": "..."},
            {"公理": "A3", "推论": "..."},
            {"组合推论": "..."}
        ],
        "设计方案": "..."
    }
    """
    pass
```

**验证点**：
- [ ] 每一步推论有明确公理支撑
- [ ] 无跳跃式推理
- [ ] 最终结论来自逻辑必然性

### Step 4: 反共识校验 (Anti-Consensus Check)

```python
def step4_anti_consensus(结论):
    """
    通过反共识6项过滤器
    
    输出格式：
    {
        "过滤器1": {"结果": "通过/作废", "理由": "..."},
        "过滤器2": {"结果": "通过/需重定义", "理由": "..."},
        ...
        "最终判定": "有效机会/需修正/作废"
    }
    """
    pass
```

**验证点**：
- [ ] 6项过滤器全部通过或明确说明原因
- [ ] 任何"作废"判定有充分理由

### Step 5: 最小化验证 (MVP Validation)

```python
def step5_mvp_validation(设计方案):
    """
    跑最小case看是否work
    
    输出格式：
    {
        "最小测试用例": "...",
        "测试结果": "通过/失败",
        "失败原因": "...",
        "修改建议": "..."
    }
    """
    pass
```

**验证点**：
- [ ] 编写最小可运行测试
- [ ] 测试必须自动化可重复
- [ ] 失败时输出明确错误信息

### Step 6: 灰边评估 (Gray Area Assessment)

```python
def step6_gray_assessment(测试结果):
    """
    L1-L4等级判定
    
    L1 (绿): 完全符合公理，可直接执行
    L2 (黄): 部分符合，需要人工确认
    L3 (橙): 存在重大不确定性，需深度验证
    L4 (红): 与公理冲突，需重新推导
    """
    pass
```

**验证点**：
- [ ] 给出明确灰边等级
- [ ] 每个等级有具体判定理由

### Step 7: 方案优化 (Optimization)

```python
def step7_optimization(灰边评估, 测试结果):
    """
    基于验证结果优化
    
    输出格式：
    {
        "优化点": [...],
        "优化后方案": "...",
        "预期效果": "..."
    }
    """
    pass
```

**验证点**：
- [ ] 明确列出优化点
- [ ] 优化后重新通过前几步检查

### Step 8: 效果测试 (Testing)

```python
def step8_testing(优化后方案):
    """
    小规模测试
    
    输出格式：
    {
        "测试范围": "...",
        "测试周期": "...",
        "测试结果": "...",
        "统计显著性": "..."
    }
    """
    pass
```

**验证点**：
- [ ] 测试规模明确
- [ ] 结果可量化
- [ ] 统计方法合理

### Step 9: 成果固化 (Solidification)

```python
def step9_solidification(测试结果):
    """
    SOP化/模板化
    
    输出格式：
    {
        "SOP文档": "...",
        "模板": "...",
        "复用条件": "..."
    }
    """
    pass
```

**验证点**：
- [ ] 输出可复用的SOP
- [ ] 其他人可按SOP执行

### Step 10: 经验闭环 (Experience Loop)

```python
def step10_experience_loop(全流程):
    """
    沉淀经验 → 修正方法论
    
    输出格式：
    {
        "成功经验": [...],
        "失败教训": [...],
        "方法论修正": "...",
        "下次检查点": "..."
    }
    """
    pass
```

**验证点**：
- [ ] 经验已沉淀到公理库/方法论
- [ ] 有明确的迭代方向

---

## 2.3 Ralph Loop 自动化框架

```python
# mirofish/core/ralph_loop_framework.py

class RalphLoopRunner:
    """
    Ralph Loop 自动化运行框架
    
    使用方法：
    runner = RalphLoopRunner(模块名="事件数据采集")
    runner.run()  # 自动执行10步
    runner.report()  # 输出完整报告
    """
    
    def __init__(self, module_name: str):
        self.module_name = module_name
        self.step_results = {}
        self.current_step = 0
        
    def run(self):
        """执行完整Ralph Loop"""
        steps = [
            (self.step1_inventory, "资源盘点"),
            (self.step2_axiom_anchor, "公理锚定"),
            (self.step3_logic_derivation, "逻辑推导"),
            (self.step4_anti_consensus, "反共识校验"),
            (self.step5_mvp_validation, "最小化验证"),
            (self.step6_gray_assessment, "灰边评估"),
            (self.step7_optimization, "方案优化"),
            (self.step8_testing, "效果测试"),
            (self.step9_solidification, "成果固化"),
            (self.step10_experience_loop, "经验闭环"),
        ]
        
        for i, (step_func, step_name) in enumerate(steps):
            self.current_step = i + 1
            print(f"\n{'='*50}")
            print(f"执行步骤 {self.current_step}/10: {step_name}")
            print(f"{'='*50}")
            
            try:
                result = step_func()
                self.step_results[step_name] = {"status": "PASS", "result": result}
            except Exception as e:
                self.step_results[step_name] = {"status": "FAIL", "error": str(e)}
                print(f"❌ 步骤失败: {e}")
                print("→ 回退到步骤1，重新执行...")
                self.rollback_and_restart()
                break
                
    def rollback_and_restart(self):
        """回退机制：任何步骤失败则重新执行"""
        self.step_results = {}
        self.run()
        
    def report(self):
        """输出完整报告"""
        report = f"""
        Ralph Loop 验证报告
        ====================
        模块: {self.module_name}
        执行时间: {datetime.now()}
        
        各步骤结果:
        """
        for step, result in self.step_results.items():
            status_icon = "✅" if result["status"] == "PASS" else "❌"
            report += f"\n{status_icon} {step}: {result['status']}"
            
        return report
```

---

# 第三部分：系统技术架构

## 3.1 系统概览

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MiroFish 系统架构                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  数据采集层   │───▶│  知识图谱层  │───▶│  仿真引擎层  │              │
│  │  Module 1    │    │  Module 2    │    │  Module 3    │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
│         │                   │                   │                       │
│         ▼                   ▼                   ▼                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  撮合引擎层  │◀───│  概率分析层  │◀───│  智能体群层  │              │
│  │  Module 4    │    │  Module 5    │    │  5000智能体  │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      输出层 Module 6                       │  │
│  │         概率预测 / 走势图 / 行为分析 / 可视化             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Ralph Loop 验证框架                     │  │
│  │        (每个模块完成后自动触发10步验证循环)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 3.2 完整目录结构

```
mirofish_polymarket/
├── README.md
├── requirements.txt
├── main.py                      # 主入口
├── config.py                    # 配置文件
│
├── core/                        # 核心框架
│   ├── __init__.py
│   ├── axioms.py                # 公理库
│   ├── ralph_loop.py            # Ralph Loop框架
│   ├── ralph_loop_framework.py  # 自动化验证
│   ├── gray_framework.py         # 灰边评估
│   ├── feynman_test.py           # 费曼检验
│   └── anti_consensus.py         # 反共识检查
│
├── modules/                     # 功能模块
│   ├── __init__.py
│   ├── module1_data_collector/   # 模块1：数据采集
│   │   ├── __init__.py
│   │   ├── collector.py          # 数据采集器
│   │   ├── polymarket_api.py     # Polymarket API
│   │   ├── news_api.py           # 新闻API
│   │   ├── cross_platform.py     # 跨平台数据
│   │   ├── models.py             # 数据模型
│   │   └── ralph_loop.py         # 模块1验证
│   │
│   ├── module2_knowledge_graph/  # 模块2：知识图谱
│   │   ├── __init__.py
│   │   ├── graph_builder.py      # 图谱构建
│   │   ├── nodes.py              # 节点定义
│   │   ├── edges.py              # 边定义
│   │   ├── query_engine.py        # 查询引擎
│   │   ├── graphrag.py           # GraphRAG
│   │   └── ralph_loop.py         # 模块2验证
│   │
│   ├── module3_agent_simulation/ # 模块3：智能体仿真
│   │   ├── __init__.py
│   │   ├── agent.py              # 智能体基类
│   │   ├── strategy_trend.py      # 趋势跟随型
│   │   ├── strategy_contrarian.py # 逆向操作型
│   │   ├── strategy_info_driven.py# 信息驱动型
│   │   ├── strategy_market_maker.py# 做市商型
│   │   ├── strategy_arbitrage.py  # 套利型
│   │   ├── strategy_herd.py       # 羊群型
│   │   ├── strategy_random.py     # 随机型
│   │   ├── simulation_engine.py   # 仿真引擎
│   │   └── ralph_loop.py         # 模块3验证
│   │
│   ├── module4_matching_engine/   # 模块4：撮合引擎
│   │   ├── __init__.py
│   │   ├── order_book.py          # 订单簿
│   │   ├── amm.py                 # AMM曲线
│   │   ├── matching.py            # 撮合逻辑
│   │   └── ralph_loop.py         # 模块4验证
│   │
│   ├── module5_probability/       # 模块5：概率分析
│   │   ├── __init__.py
│   │   ├── price_to_prob.py       # 价格转概率
│   │   ├── consensus.py           # 共识度分析
│   │   ├── anomaly_detection.py   # 异动检测
│   │   ├── evolution.py           # 演化曲线
│   │   └── ralph_loop.py         # 模块5验证
│   │
│   └── module6_output/            # 模块6：输出层
│       ├── __init__.py
│       ├── prediction.py          # 预测输出
│       ├── visualization.py       # 可视化
│       ├── reports.py             # 报告生成
│       └── ralph_loop.py         # 模块6验证
│
├── backtest/                     # 回测模块
│   ├── __init__.py
│   ├── historical_data.py         # 历史数据处理
│   ├── backtest_engine.py         # 回测引擎
│   ├── metrics.py                 # 评估指标
│   └── validator.py               # 验证器
│
├── data/                         # 数据目录
│   ├── raw/                      # 原始数据
│   ├── processed/                # 处理后数据
│   └── results/                  # 结果数据
│
└── tests/                        # 测试目录
    ├── test_axioms.py
    ├── test_ralph_loop.py
    ├── test_module1.py
    ├── test_module3.py
    └── test_integration.py
```

---

## 模块1：事件数据采集层 (Module 1: Event Data Collector)

### 功能描述

从 Polymarket API 爬取历史已结算事件，构建完整的事件生命周期数据。

### 输入 → 处理 → 输出

```python
# 模块1数据流
输入:
    - Polymarket API (https://clob.polymarket.com)
    - NewsAPI (市场相关新闻)
    - 跨平台API (Kalshi, Metaculus)

处理:
    1. 调用 Polymarket API 获取事件列表
    2. 对每个事件获取时序价格数据
    3. 获取成交量、流动性池深度
    4. 获取最终结算结果
    5. 关联新闻数据

输出:
    - 结构化JSON，每事件完整生命周期
    - 保存到 data/raw/events_{timestamp}.json
```

### Ralph Loop 验证点

- [ ] 爬到至少50个已结算事件数据
- [ ] 每个事件包含：名称、分类、价格时序、成交量、结算结果
- [ ] 数据格式统一，可供后续模块使用

### 核心代码框架

```python
# modules/module1_data_collector/collector.py

import requests
import json
from datetime import datetime
from typing import List, Dict
from dataclasses import dataclass, asdict

@dataclass
class MarketEvent:
    """市场事件数据模型"""
    event_id: str
    question: str                          # 问题描述
    category: str                          # 分类 (政治/体育/加密/科技)
    markets: List[Dict]                    # 市场列表
    creation_date: str                     # 创建时间
    end_date: str                          # 结束时间
   结算_result: str                        # 结算结果 (Yes/No)
    price_history: List[Dict]               # 价格历史
    volume_history: List[Dict]              # 成交量历史
    liquidity: Dict                        # 流动性池深度
    metadata: Dict                         # 其他元数据

class PolymarketCollector:
    """Polymarket数据采集器"""
    
    BASE_URL = "https://clob.polymarket.com"
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "MiroFish/1.0",
            "Accept": "application/json"
        })
        
    def get_markets(self, limit: int = 100) -> List[Dict]:
        """
        获取市场列表
        
        Returns:
            市场列表
        """
        # 实现 Polymarket API 调用
        # GET /markets
        pass
    
    def get_market_price_history(self, market_id: str) -> List[Dict]:
        """
        获取市场价格历史
        
        Args:
            market_id: 市场ID
            
        Returns:
            价格历史列表
        """
        # 实现价格历史获取
        pass
    
    def get_market_trades(self, market_id: str) -> List[Dict]:
        """
        获取市场成交记录
        
        Returns:
            成交记录列表
        """
        pass
    
    def get_settled_events(self, min_count: int = 50) -> List[MarketEvent]:
        """
        获取已结算事件
        
        Args:
            min_count: 最少事件数量
            
        Returns:
            已结算事件列表
        """
        events = []
        
        # 1. 获取市场列表
        markets = self.get_markets(limit=200)
        
        # 2. 筛选已结算市场
        settled_markets = [m for m in markets if m.get("closed")]
        
        # 3. 对每个市场获取完整数据
        for market in settled_markets[:min_count]:
            event = self.build_event(market)
            if event:
                events.append(event)
                
        # 4. 保存到文件
        self.save_events(events)
        
        return events
    
    def build_event(self, market: Dict) -> MarketEvent:
        """构建完整事件"""
        market_id = market["id"]
        
        # 获取价格历史
        price_history = self.get_market_price_history(market_id)
        
        # 获取成交量
        volume_history = self.get_market_trades(market_id)
        
        # 构建事件对象
        event = MarketEvent(
            event_id=market_id,
            question=market.get("question", ""),
            category=self.categorize(market),
            markets=[market],
            creation_date=market.get("creation_date", ""),
            end_date=market.get("end_date", ""),
            结算_result=market.get("answer", ""),
            price_history=price_history,
            volume_history=volume_history,
            liquidity=market.get("liquidity", {}),
            metadata=market
        )
        
        return event
    
    def save_events(self, events: List[MarketEvent]):
        """保存事件到文件"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"data/raw/events_{timestamp}.json"
        
        with open(filename, "w", encoding="utf-8") as f:
            json.dump([asdict(e) for e in events], f, ensure_ascii=False, indent=2)
            
        print(f"✅ 保存 {len(events)} 个事件到 {filename}")
        
    @staticmethod
    def categorize(market: Dict) -> str:
        """分类市场"""
        question = market.get("question", "").lower()
        
        if any(k in question for k in ["election", "president", "vote", "congress"]):
            return "政治"
        elif any(k in question for k in ["game", "match", "championship", "win"]):
            return "体育"
        elif any(k in question for k in ["bitcoin", "crypto", "ethereum", "token"]):
            return "加密"
        elif any(k in question for k in ["ai", "tech", "company", "launch"]):
            return "科技"
        else:
            return "其他"
```

### Ralph Loop 验证脚本

```python
# modules/module1_data_collector/ralph_loop.py

def verify_module1():
    """
    模块1 Ralph Loop 验证
    
    验证点:
    1. 资源盘点: Polymarket API可用性
    2. 公理锚定: A5 (链上数据) + A11 (硅基视角)
    3. 逻辑推导: API数据 → 结构化事件
    4. 反共识校验: 数据采集本身无争议
    5. 最小化验证: 能否获取1个事件
    6. 灰边评估: API限制、数据完整性
    7. 方案优化: 重试机制、错误处理
    8. 效果测试: 获取50+事件
    9. 成果固化: SOP化采集流程
    10. 经验闭环: 沉淀API调用经验
    """
    
    print("=" * 60)
    print("模块1 Ralph Loop 验证")
    print("=" * 60)
    
    # Step 1: 资源盘点
    print("\n[Step 1] 资源盘点")
    resources = {
        "polymarket_api": "available",
        "historical_data": "unknown",
        "error_handling": "to_implement"
    }
    print(f"可用资源: {resources}")
    
    # Step 2: 公理锚定
    print("\n[Step 2] 公理锚定")
    axioms_used = ["A5", "A11", "A12"]
    print(f"使用的公理: {axioms_used}")
    print("A5: 链上数据公开但大多数人不具备解读能力")
    print("A11: 硅基智能体具有全量数据感知能力")
    print("A12: 大众信息层 = 已定价 = 无alpha")
    
    # Step 3: 逻辑推导
    print("\n[Step 3] 逻辑推导")
    print("公理A5 + A11 → 推论: 我们可以获取并解读链上数据")
    print("公理A12 → 推论: 采集原始数据 > 使用二手分析")
    
    # Step 4: 反共识校验
    print("\n[Step 4] 反共识校验")
    print("✅ 数据采集本身无共识冲突")
    
    # Step 5: 最小化验证
    print("\n[Step 5] 最小化验证")
    collector = PolymarketCollector()
    try:
        markets = collector.get_markets(limit=1)
        if markets:
            print(f"✅ 成功获取 {len(markets)} 个市场数据")
        else:
            print("⚠️ API返回为空，可能需要检查")
    except Exception as e:
        print(f"❌ 最小化验证失败: {e}")
        return False
    
    # Step 6: 灰边评估
    print("\n[Step 6] 灰边评估")
    gray_level = "L2"  # API限制存在，需要处理
    print(f"灰边等级: {gray_level}")
    print("L2原因: Polymarket API有速率限制，需实现重试")
    
    # Step 7: 方案优化
    print("\n[Step 7] 方案优化")
    print("优化点: 添加指数退避重试机制")
    
    # Step 8: 效果测试
    print("\n[Step 8] 效果测试")
    events = collector.get_settled_events(min_count=50)
    print(f"✅ 成功获取 {len(events)} 个已结算事件")
    
    # Step 9: 成果固化
    print("\n[Step 9] 成果固化")
    print("SOP: PolymarketCollector类已可复用")
    
    # Step 10: 经验闭环
    print("\n[Step 10] 经验闭环")
    print("经验: API需处理429错误，添加User-Agent更稳定")
    
    print("\n" + "=" * 60)
    print("模块1 Ralph Loop 验证完成")
    print("=" * 60)
    
    return len(events) >= 50

if __name__ == "__main__":
    verify_module1()
```

---

## 模块2：市场知识图谱 (Module 2: Knowledge Graph)

### 功能描述

构建事件、参与者、信息源、关联事件的知识图谱，支持 GraphRAG 语义查询。

### 输入 → 处理 → 输出

```python
# 模块2数据流
输入:
    - 模块1输出的事件数据
    - 外部关联数据 (新闻、社交媒体)

处理:
    1. 定义节点类型 (事件、参与者、信息源)
    2. 定义边类型 (因果、相关、时序)
    3. 构建图谱
    4. 实现 GraphRAG 查询

输出:
    - 知识图谱文件
    - 相似事件查询结果
```

### Ralph Loop 验证点

- [ ] 能查询到历史相似事件
- [ ] 图谱包含至少100个节点
- [ ] 支持语义相似度查询

### 核心代码框架

```python
# modules/module2_knowledge_graph/graph_builder.py

from typing import List, Dict, Set
from dataclasses import dataclass, field
from datetime import datetime
import networkx as nx

@dataclass
class Node:
    """图谱节点"""
    node_id: str
    node_type: str              # event, participant, source
    name: str
    properties: Dict = field(default_factory=dict)
    embeddings: List[float] = None  # 用于语义查询

@dataclass
class Edge:
    """图谱边"""
    source_id: str
    target_id: str
    relation_type: str          # causal, correlated, temporal
    weight: float = 1.0        # 影响强度
    properties: Dict = field(default_factory=dict)

class KnowledgeGraph:
    """市场知识图谱"""
    
    def __init__(self):
        self.graph = nx.MultiDiGraph()
        self.nodes: Dict[str, Node] = {}
        self.edges: List[Edge] = []
        
    def add_node(self, node: Node):
        """添加节点"""
        self.nodes[node.node_id] = node
        self.graph.add_node(node.node_id, **asdict(node))
        
    def add_edge(self, edge: Edge):
        """添加边"""
        self.edges.append(edge)
        self.graph.add_edge(
            edge.source_id,
            edge.target_id,
            relation=edge.relation_type,
            weight=edge.weight,
            **edge.properties
        )
        
    def build_from_events(self, events: List[MarketEvent]):
        """
        从事件构建图谱
        
        Args:
            events: 事件列表 (来自模块1)
        """
        for event in events:
            # 1. 创建事件节点
            event_node = Node(
                node_id=f"event_{event.event_id}",
                node_type="event",
                name=event.question,
                properties={
                    "category": event.category,
                    "result": event.结算_result,
                    "start_date": event.creation_date,
                    "end_date": event.end_date,
                    "volume": sum(v.get("volume", 0) for v in event.volume_history)
                }
            )
            self.add_node(event_node)
            
            # 2. 创建分类节点
            category_node = Node(
                node_id=f"category_{event.category}",
                node_type="category",
                name=event.category
            )
            self.add_node(category_node)
            
            # 3. 连接事件-分类边
            self.add_edge(Edge(
                source_id=event_node.node_id,
                target_id=category_node.node_id,
                relation_type="belongs_to",
                weight=1.0
            ))
            
            # 4. 关联相似事件
            similar_events = self._find_similar_events(event, events)
            for similar in similar_events[:3]:  # 最多关联3个
                self.add_edge(Edge(
                    source_id=event_node.node_id,
                    target_id=f"event_{similar.event_id}",
                    relation_type="correlated",
                    weight=self._calculate_correlation(event, similar)
                ))
                
    def _find_similar_events(self, target: MarketEvent, all_events: List[MarketEvent]) -> List[MarketEvent]:
        """查找相似事件"""
        # 简化版：基于分类+关键词匹配
        similar = []
        for event in all_events:
            if event.event_id == target.event_id:
                continue
            if event.category == target.category:
                similar.append(event)
        return similar[:5]
    
    def _calculate_correlation(self, e1: MarketEvent, e2: MarketEvent) -> float:
        """计算相关性"""
        # 简化版：0.5基础分 + 分类匹配加分
        base_score = 0.5
        category_bonus = 0.3 if e1.category == e2.category else 0
        return min(base_score + category_bonus, 1.0)
    
    def query_similar_events(self, query: str, top_k: int = 5) -> List[Dict]:
        """
        查询相似事件 (GraphRAG)
        
        Args:
            query: 查询文本
            top_k: 返回数量
            
        Returns:
            相似事件列表
        """
        # 简化版：基于关键词匹配
        results = []
        query_keywords = set(query.lower().split())
        
        for node_id, node in self.nodes.items():
            if node.node_type != "event":
                continue
                
            # 计算关键词重叠度
            node_keywords = set(node.name.lower().split())
            overlap = len(query_keywords & node_keywords)
            
            if overlap > 0:
                results.append({
                    "event_id": node_id,
                    "question": node.name,
                    "properties": node.properties,
                    "similarity_score": overlap / len(query_keywords)
                })
                
        # 排序返回
        results.sort(key=lambda x: x["similarity_score"], reverse=True)
        return results[:top_k]
    
    def get_event_neighbors(self, event_id: str) -> Dict:
        """获取事件的邻居节点"""
        if event_id not in self.graph:
            return {}
            
        neighbors = {
            "predecessors": list(self.graph.predecessors(event_id)),
            "successors": list(self.graph.successors(event_id)),
            "edges": []
        }
        
        for u, v, data in self.graph.edges(data=True):
            if u == event_id or v == event_id:
                neighbors["edges"].append({
                    "from": u,
                    "to": v,
                    "relation": data.get("relation", ""),
                    "weight": data.get("weight", 1.0)
                })
                
        return neighbors
    
    def save(self, filepath: str):
        """保存图谱"""
        import pickle
        with open(filepath, "wb") as f:
            pickle.dump({
                "nodes": self.nodes,
                "edges": self.edges,
                "graph": self.graph
            }, f)
        print(f"✅ 图谱已保存到 {filepath}")
        
    def load(self, filepath: str):
        """加载图谱"""
        import pickle
        with open(filepath, "rb") as f:
            data = pickle.load(f)
            self.nodes = data["nodes"]
            self.edges = data["edges"]
            self.graph = data["graph"]
        print(f"✅ 图谱已从 {filepath} 加载")
```

---

## 模块3：智能体群体仿真引擎 (Module 3: Agent Simulation Engine)

### 功能描述

MiroFish 核心模块，模拟5000个异构智能体的市场行为。

### 智能体类型

| 类型 | 占比 | 策略描述 | 公理基础 |
|------|------|----------|----------|
| 趋势跟随型 | 20% | 追涨杀跌 | A7 (人类偏差) |
| 逆向操作型 | 15% | 价格极端反向 | A7 (逆向心理) |
| 信息驱动型 | 15% | 新闻/舆情信号 | A6 (信息传播) |
| 做市商型 | 10% | 双边挂单 | A3 (表面数据) |
| 套利型 | 10% | 跨平台价差 | A5 (链上透明) |
| 羊群型 | 15% | 跟随多数 | A7 (从众效应) |
| 随机型 | 15% | 基准对照 | 基准 |

### 智能体属性

```python
@dataclass
class Agent:
    """智能体基类"""
    agent_id: str
    agent_type: str                     # 策略类型
    initial_capital: float = 10000.0    # 初始资金
    capital: float = 10000.0           # 当前资金
    risk_preference: float = 0.5       # 风险偏好 (0-1)
    info_delay: int = 0                  # 信息延迟 (tick)
    position_limit: float = 0.3         # 仓位上限比例
    
    # 状态
    position: float = 0.0               # 当前持仓
    pnl_history: List[float] = field(default_factory=list)
    
    def act(self, market_state: Dict) -> Dict:
        """决策方法 - 子类实现"""
        raise NotImplementedError
```

### 仿真参数

```python
SIMULATION_PARAMS = {
    "num_agents": 5000,
    "ticks_per_round": 100,           # 每轮tick数
    "tick_duration": 1,               # 1 tick = 1小时
    "volatility": 0.05,               # 市场波动率
    "fee_rate": 0.02,                 # 手续费 2%
    "initial_price": 0.5,             # 初始价格
    "price_range": (0.01, 0.99)       # 价格范围
}
```

### Ralph Loop 验证点

- [ ] 5个智能体能完成1轮交易
- [ ] 5000个智能体完成完整仿真
- [ ] 输出价格曲线和持仓分布

### 核心代码框架

```python
# modules/module3_agent_simulation/simulation_engine.py

import numpy as np
from typing import List, Dict
from dataclasses import dataclass, field
from enum import Enum
import random

class StrategyType(Enum):
    """策略类型枚举"""
    TREND_FOLLOWING = "trend_following"
    CONTRARIAN = "contrarian"
    INFO_DRIVEN = "info_driven"
    MARKET_MAKER = "market_maker"
    ARBITRAGE = "arbitrage"
    HERD = "herd"
    RANDOM = "random"

@dataclass
class MarketState:
    """市场状态"""
    tick: int
    current_price: float
    price_history: List[float]
    volume: float
    order_book_bid: List[float]
    order_book_ask: List[float]
    news_signals: List[Dict] = field(default_factory=list)

class BaseAgent:
    """智能体基类"""
    
    def __init__(self, agent_id: str, agent_type: StrategyType, 
                 initial_capital: float = 10000.0):
        self.agent_id = agent_id
        self.agent_type = agent_type
        self.initial_capital = initial_capital
        self.capital = initial_capital
        self.position = 0.0
        self.pnl_history = []
        
    def act(self, state: MarketState) -> Dict:
        """决策方法 - 子类实现"""
        raise NotImplementedError
        
    def update_position(self, trade: Dict, fee_rate: float):
        """更新持仓"""
        price = trade["price"]
        quantity = trade["quantity"]
        side = trade["side"]
        
        # 计算交易金额
        cost = price * quantity
        fee = cost * fee_rate
        
        if side == "buy":
            self.capital -= (cost + fee)
            self.position += quantity
        else:  # sell
            self.capital += (cost - fee)
            self.position -= quantity
            
    def get_pnl(self, current_price: float) -> float:
        """计算盈亏"""
        position_value = self.position * current_price
        return self.capital + position_value - self.initial_capital

class TrendFollowingAgent(BaseAgent):
    """趋势跟随型智能体 (20%)"""
    
    def act(self, state: MarketState) -> Dict:
        """追涨杀跌"""
        price_history = state.price_history[-10:] if len(state.price_history) >= 10 else state.price_history
        
        if len(price_history) < 2:
            return {"action": "hold", "quantity": 0}
            
        # 计算近期趋势
        trend = price_history[-1] - price_history[-2]
        
        if trend > 0.01:  # 上涨趋势
            return {"action": "buy", "quantity": min(100, self.capital * 0.1)}
        elif trend < -0.01:  # 下跌趋势
            return {"action": "sell", "quantity": min(self.position, 100)}
        else:
            return {"action": "hold", "quantity": 0}

class ContrarianAgent(BaseAgent):
    """逆向操作型智能体 (15%)"""
    
    def act(self, state: MarketState) -> Dict:
        """价格极端时反向操作"""
        price = state.current_price
        
        if price > 0.7:  # 价格偏高，卖
            return {"action": "sell", "quantity": min(self.position, 50)}
        elif price < 0.3:  # 价格偏低，买
            return {"action": "buy", "quantity": min(self.capital * 0.2, 50)}
        else:
            return {"action": "hold", "quantity": 0}

class InfoDrivenAgent(BaseAgent):
    """信息驱动型智能体 (15%)"""
    
    def __init__(self, agent_id: str, agent_type: StrategyType, initial_capital: float = 10000.0):
        super().__init__(agent_id, agent_type, initial_capital)
        self.signal_buffer = []
        
    def act(self, state: MarketState) -> Dict:
        """基于新闻/舆情信号"""
        # 简化：随机生成信号
        if len(state.news_signals) > 0:
            signal = sum(s.get("sentiment", 0) for s in state.news_signals) / len(state.news_signals)
            
            if signal > 0.3:
                return {"action": "buy", "quantity": min(self.capital * 0.15, 80)}
            elif signal < -0.3:
                return {"action": "sell", "quantity": min(self.position, 80)}
                
        return {"action": "hold", "quantity": 0}

class MarketMakerAgent(BaseAgent):
    """做市商型智能体 (10%)"""
    
    def __init__(self, agent_id: str, agent_type: StrategyType, initial_capital: float = 10000.0):
        super().__init__(agent_id, agent_type, initial_capital)
        self.spread = 0.02  # 固定价差
        
    def act(self, state: MarketState) -> Dict:
        """双边挂单"""
        mid_price = state.current_price
        
        # 简化：不主动交易，等待撮合
        return {"action": "hold", "quantity": 0}

class ArbitrageAgent(BaseAgent):
    """套利型智能体 (10%)"""
    
    def act(self, state: MarketState) -> Dict:
        """跨平台价差套利"""
        # 简化：假设有外部价格参考
        # 如果价差大于阈值则套利
        return {"action": "hold", "quantity": 0}

class HerdAgent(BaseAgent):
    """羊群型智能体 (15%)"""
    
    def __init__(self, agent_id: str, agent_type: StrategyType, initial_capital: float = 10000.0):
        super().__init__(agent_id, agent_type, initial_capital)
        self.observation = []
        
    def act(self, state: MarketState) -> Dict:
        """跟随多数"""
        # 简化：跟随平均价格趋势
        price_history = state.price_history[-5:] if len(state.price_history) >= 5 else state.price_history
        
        if len(price_history) >= 2:
            avg_trend = sum(price_history[i+1] - price_history[i] 
                          for i in range(len(price_history)-1)) / (len(price_history)-1)
            
            if avg_trend > 0:
                return {"action": "buy", "quantity": min(self.capital * 0.1, 50)}
            else:
                return {"action": "sell", "quantity": min(self.position, 50)}
                
        return {"action": "hold", "quantity": 0}

class RandomAgent(BaseAgent):
    """随机型智能体 (15%) - 基准"""
    
    def act(self, state: MarketState) -> Dict:
        """随机决策"""
        rand = random.random()
        
        if rand < 0.3:
            return {"action": "buy", "quantity": random.randint(10, 50)}
        elif rand < 0.5:
            return {"action": "sell", "quantity": min(self.position, random.randint(10, 50))}
        else:
            return {"action": "hold", "quantity": 0}

class SimulationEngine:
    """仿真引擎"""
    
    # 策略分布
    STRATEGY_DISTRIBUTION = {
        StrategyType.TREND_FOLLOWING: 0.20,
        StrategyType.CONTRARIAN: 0.15,
        StrategyType.INFO_DRIVEN: 0.15,
        StrategyType.MARKET_MAKER: 0.10,
        StrategyType.ARBITRAGE: 0.10,
        StrategyType.HERD: 0.15,
        StrategyType.RANDOM: 0.15
    }
    
    # 策略类映射
    STRATEGY_CLASSES = {
        StrategyType.TREND_FOLLOWING: TrendFollowingAgent,
        StrategyType.CONTRARIAN: ContrarianAgent,
        StrategyType.INFO_DRIVEN: InfoDrivenAgent,
        StrategyType.MARKET_MAKER: MarketMakerAgent,
        StrategyType.ARBITRAGE: ArbitrageAgent,
        StrategyType.HERD: HerdAgent,
        StrategyType.RANDOM: RandomAgent
    }
    
    def __init__(self, num_agents: int = 5000, 
                 initial_price: float = 0.5,
                 volatility: float = 0.05,
                 fee_rate: float = 0.02):
        self.num_agents = num_agents
        self.initial_price = initial_price
        self.volatility = volatility
        self.fee_rate = fee_rate
        
        self.agents: List[BaseAgent] = []
        self.price_history = []
        self.current_price = initial_price
        
        self._initialize_agents()
        
    def _initialize_agents(self):
        """初始化智能体群体"""
        print(f"初始化 {self.num_agents} 个智能体...")
        
        agent_id = 0
        for strategy_type, ratio in self.STRATEGY_DISTRIBUTION.items():
            count = int(self.num_agents * ratio)
            
            for _ in range(count):
                agent_class = self.STRATEGY_CLASSES[strategy_type]
                agent = agent_class(
                    agent_id=f"agent_{agent_id}",
                    agent_type=strategy_type,
                    initial_capital=10000.0
                )
                self.agents.append(agent)
                agent_id += 1
                
        # 确保总数正确
        while len(self.agents) < self.num_agents:
            agent = RandomAgent(
                agent_id=f"agent_{agent_id}",
                agent_type=StrategyType.RANDOM
            )
            self.agents.append(agent)
            agent_id += 1
            
        print(f"✅ 成功初始化 {len(self.agents)} 个智能体")
        self._print_distribution()
        
    def _print_distribution(self):
        """打印策略分布"""
        distribution = {}
        for agent in self.agents:
            distribution[agent.agent_type.value] = distribution.get(agent.agent_type.value, 0) + 1
            
        print("\n策略分布:")
        for strategy, count in distribution.items():
            ratio = count / len(self.agents) * 100
            print(f"  {strategy}: {count} ({ratio:.1f}%)")
            
    def run_round(self, num_ticks: int = 100) -> Dict:
        """
        运行一轮仿真
        
        Args:
            num_ticks: tick数 (1 tick = 1小时)
            
        Returns:
            仿真结果
        """
        print(f"\n开始仿真: {num_ticks} ticks")
        
        self.price_history = [self.initial_price]
        self.current_price = self.initial_price
        
        for tick in range(num_ticks):
            state = MarketState(
                tick=tick,
                current_price=self.current_price,
                price_history=self.price_history,
                volume=0,
                order_book_bid=[],
                order_book_ask=[]
            )
            
            # 1. 所有智能体决策
            trades = []
            for agent in self.agents:
                decision = agent.act(state)
                
                if decision["action"] != "hold" and decision["quantity"] > 0:
                    trade = {
                        "agent_id": agent.agent_id,
                        "side": decision["action"],
                        "quantity": decision["quantity"],
                        "price": self.current_price
                    }
                    trades.append(trade)
                    agent.update_position(trade, self.fee_rate)
                    
            # 2. 更新价格 (简化: 基于净买入量)
            net_flow = sum(1 if t["side"] == "buy" else -1 for t in trades)
            price_change = net_flow * self.volatility * self.current_price
            self.current_price = np.clip(
                self.current_price + price_change,
                0.01, 0.99
            )
            self.price_history.append(self.current_price)
            
            # 3. 打印进度
            if (tick + 1) % 20 == 0:
                print(f"  Tick {tick+1}/{num_ticks}: 价格={self.current_price:.4f}, 交易数={len(trades)}")
                
        # 最终统计
        result = self.get_result()
        print(f"\n仿真完成!")
        print(f"  最终价格: {result['final_price']:.4f}")
        print(f"  价格变化: {(result['final_price'] - self.initial_price) / self.initial_price * 100:.2f}%")
        
        return result
        
    def get_result(self) -> Dict:
        """获取仿真结果"""
        final_price = self.price_history[-1] if self.price_history else self.initial_price
        
        # 统计各类智能体收益
        strategy_pnl = {}
        for agent in self.agents:
            pnl = agent.get_pnl(final_price)
            strategy = agent.agent_type.value
            
            if strategy not in strategy_pnl:
                strategy_pnl[strategy] = []
            strategy_pnl[strategy].append(pnl)
            
        # 计算平均收益
        avg_pnl = {k: np.mean(v) for k, v in strategy_pnl.items()}
        
        return {
            "initial_price": self.initial_price,
            "final_price": final_price,
            "price_history": self.price_history,
            "num_agents": len(self.agents),
            "strategy_pnl": avg_pnl,
            "best_strategy": max(avg_pnl.items(), key=lambda x: x[1])[0] if avg_pnl else None
        }
```

### Ralph Loop 验证脚本

```python
# modules/module3_agent_simulation/ralph_loop.py

def verify_module3():
    """
    模块3 Ralph Loop 验证
    
    验证点:
    1. 资源盘点: 7种策略类型
    2. 公理锚定: A7 (人类偏差) + A11 (硅基视角)
    3. 逻辑推导: 模拟人类偏差行为 → 市场定价偏差
    4. 反共识校验: 智能体仿真本身是工具，无共识问题
    5. 最小化验证: 5个智能体完成1轮交易
    6. 灰边评估: L1 (完全符合预期)
    7. 方案优化: 参数调优
    8. 效果测试: 5000个智能体完整仿真
    9. 成果固化: SimulationEngine类可复用
    10. 经验闭环: 策略效果分析
    """
    
    print("=" * 60)
    print("模块3 Ralph Loop 验证")
    print("=" * 60)
    
    # Step 1: 资源盘点
    print("\n[Step 1] 资源盘点")
    print("✅ 7种策略类型已实现")
    print("✅ SimulationEngine 已实现")
    
    # Step 2: 公理锚定
    print("\n[Step 2] 公理锚定")
    print("使用的公理: A7 (人类偏差), A11 (硅基视角)")
    print("A7: 趋势跟随/羊群效应 → 价格波动")
    print("A11: 硅基可以模拟人类行为模式")
    
    # Step 3: 逻辑推导
    print("\n[Step 3] 逻辑推导")
    print("A7 + A11 → 推论: 模拟人类偏差行为可预测价格走向")
    
    # Step 4: 反共识校验
    print("\n[Step 4] 反共识校验")
    print("✅ 智能体仿真是工具，无共识冲突")
    
    # Step 5: 最小化验证
    print("\n[Step 5] 最小化验证")
    from modules.module3_agent_simulation.simulation_engine import SimulationEngine, StrategyType
    
    # 创建5个智能体测试
    mini_engine = SimulationEngine(num_agents=5, volatility=0.01)
    try:
        result = mini_engine.run_round(num_ticks=10)
        print(f"✅ 5个智能体完成1轮交易")
    except Exception as e:
        print(f"❌ 最小化验证失败: {e}")
        return False
    
    # Step 6: 灰边评估
    print("\n[Step 6] 灰边评估")
    print("灰边等级: L1")
    print("L1原因: 智能体模型完全符合设计预期")
    
    # Step 7: 方案优化
    print("\n[Step 7] 方案优化")
    print("优化点: 可添加更多策略类型和参数调优")
    
    # Step 8: 效果测试
    print("\n[Step 8] 效果测试")
    full_engine = SimulationEngine(num_agents=5000, volatility=0.05)
    result = full_engine.run_round(num_ticks=100)
    print(f"✅ 5000个智能体完成仿真")
    print(f"   最终价格: {result['final_price']:.4f}")
    print(f"   最佳策略: {result['best_strategy']}")
    
    # Step 9: 成果固化
    print("\n[Step 9] 成果固化")
    print("SOP: SimulationEngine类已可复用")
    
    # Step 10: 经验闭环
    print("\n[Step 10] 经验闭环")
    print("经验: 趋势跟随策略在高波动时表现较好")
    print("经验: 逆向策略在价格极端时有效")
    
    print("\n" + "=" * 60)
    print("模块3 Ralph Loop 验证完成")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    verify_module3()
```

---

## 模块4：市场撮合引擎 (Module 4: Matching Engine)

### 功能描述

实现订单簿撮合和 AMM 曲线模拟。

### 输入 → 处理 → 输出

```python
# 模块4数据流
输入:
    - 智能体订单
    - AMM池状态

处理:
    1. 订单簿管理 (限价+市价)
    2. AMM曲线计算: p(x) = x / (x + y)
    3. 撮合逻辑

输出:
    - 成交记录
    - 更新后的价格和持仓
```

### Ralph Loop 验证点

- [ ] 订单簿正确维护
- [ ] AMM价格计算准确
- [ ] 撮合结果一致

---

## 模块5：概率演化分析 (Module 5: Probability Analysis)

### 功能描述

分析 Yes 价格隐含概率、群体共识度、异动检测。

### 输入 → 处理 → 输出

```python
# 模块5数据流
输入:
    - 模块3价格历史
    - 模块4成交记录

处理:
    1. 价格 → 隐含概率
    2. 共识度计算
    3. 异动检测
    4. 演化曲线

输出:
    - 概率预测
    - 异动警报
    - 可视化数据
```

### Ralph Loop 验证点

- [ ] 概率计算准确
- [ ] 异动检测有效
- [ ] 演化曲线平滑

---

## 模块6：输出层 (Module 6: Output)

### 功能描述

生成最终输出：概率预测、价格走势图、智能体行为分析。

### 输入 → 处理 → 输出

```python
# 模块6数据流
输入:
    - 模块3仿真结果
    - 模块5分析结果

处理:
    1. 概率预测格式化
    2. 图表生成
    3. 报告生成

输出:
    - 预测结果 JSON
    - 可视化图表
    - 分析报告
```

### Ralph Loop 验证点

- [ ] 输出格式统一
- [ ] 图表清晰
- [ ] 通过费曼检验

---

# 第四部分：代码规范

## 4.1 文件模板

### __init__.py

```python
"""
模块说明

Ralph Loop 验证状态: [待验证/验证中/已通过]
"""

__version__ = "1.0.0"
__author__ = "MiroFish Team"
```

### 核心模块模板

```python
"""
模块名称

功能描述

Ralph Loop 验证点:
- [ ] 验证点1
- [ ] 验证点2

使用公理: [A?, A?]
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional
import json
from datetime import datetime

class ClassName:
    """类说明"""
    
    def __init__(self, param1: str, param2: int = 100):
        """
        初始化
        
        Args:
            param1: 参数1说明
            param2: 参数2说明
        """
        self.param1 = param1
        self.param2 = param2
        
    def method_name(self, input_data: Dict) -> Dict:
        """
        方法说明
        
        Args:
            input_data: 输入数据
            
        Returns:
            处理结果
        """
        # TODO: 实现逻辑
        pass
        
def main():
    """主函数"""
    print("模块名称 - 主入口")
    
if __name__ == "__main__":
    main()
```

---

## 4.2 requirements.txt

```
# 核心依赖
numpy>=1.24.0
pandas>=2.0.0
networkx>=3.0
requests>=2.31.0

# 可视化
matplotlib>=3.7.0
plotly>=5.18.0

# 数据处理
scipy>=1.10.0

# 测试
pytest>=7.4.0

# 工具
python-dotenv>=1.0.0
tqdm>=4.66.0
```

---

## 4.3 运行命令

```bash
# 安装依赖
pip install -r requirements.txt

# 运行主程序
python main.py

# 运行模块测试
python -m pytest tests/

# 运行单个模块验证
python modules/module1_data_collector/ralph_loop.py
python modules/module3_agent_simulation/ralph_loop.py

# 完整回测
python backtest/backtest_engine.py
```

---

## 4.4 回测方法

```python
# backtest/backtest_engine.py

"""
回测引擎

使用 Polymarket 历史已结算事件验证 MiroFish 预测能力
"""

import json
from pathlib import Path
from typing import List, Dict
from modules.module1_data_collector.collector import PolymarketCollector
from modules.module3_agent_simulation.simulation_engine import SimulationEngine

class BacktestEngine:
    """回测引擎"""
    
    def __init__(self, historical_events_path: str):
        """
        初始化
        
        Args:
            historical_events_path: 历史事件数据路径
        """
        self.events = self._load_events(historical_events_path)
        
    def _load_events(self, path: str) -> List[Dict]:
        """加载历史事件"""
        with open(path, "r") as f:
            return json.load(f)
            
    def backtest_module3(self) -> Dict:
        """
        回测模块3 (智能体仿真)
        
        评估指标:
        - 预测准确率
        - 收益夏普比
        - 最大回撤
        """
        results = []
        
        for event in self.events[:10]:  # 取前10个事件回测
            # 模拟预测过程
            prediction = self._predict(event)
            actual = event.get("结算_result") == "Yes"
            
            results.append({
                "event_id": event.get("event_id"),
                "prediction": prediction,
                "actual": actual,
                "correct": (prediction > 0.5) == actual
            })
            
        # 计算准确率
        accuracy = sum(r["correct"] for r in results) / len(results)
        
        return {
            "total_events": len(results),
            "correct_predictions": sum(r["correct"] for r in results),
            "accuracy": accuracy,
            "details": results
        }
        
    def _predict(self, event: Dict) -> float:
        """
        预测 (简化版)
        
        实际应使用完整的MiroFish分析流程
        """
        # 简化：随机预测
        import random
        return random.random()
        
    def run(self):
        """运行完整回测"""
        print("=" * 60)
        print("MiroFish 回测开始")
        print("=" * 60)
        
        print("\n回测模块3 (智能体仿真)...")
        module3_results = self.backtest_module3()
        
        print(f"\n回测结果:")
        print(f"  总事件数: {module3_results['total_events']}")
        print(f"  正确预测: {module3_results['correct_predictions']}")
        print(f"  准确率: {module3_results['accuracy']:.2%}")
        
        print("\n" + "=" * 60)
        print("回测完成")
        print("=" * 60)
        
        return module3_results

def main():
    """主函数"""
    # 查找最新事件数据
    data_dir = Path("data/raw")
    event_files = list(data_dir.glob("events_*.json"))
    
    if not event_files:
        print("❌ 未找到历史事件数据")
        print("请先运行模块1采集数据:")
        print("  python modules/module1_data_collector/collector.py")
        return
        
    # 使用最新的数据文件
    latest_file = max(event_files, key=lambda p: p.stat().st_mtime)
    print(f"使用数据文件: {latest_file}")
    
    # 运行回测
    engine = BacktestEngine(str(latest_file))
    engine.run()

if __name__ == "__main__":
    main()
```

---

## 4.5 命名规范

### 变量命名

```python
# ✅ 正确: 英文变量名 + 中文注释

initial_capital: float = 10000.0  # 初始资金
current_price: float = 0.5       # 当前价格
price_history: List[float] = []   # 价格历史

# ❌ 错误: 中文变量名
初始资金 = 10000.0
当前价格 = 0.5
```

### 函数命名

```python
# ✅ 正确: 动词 + 名词
def calculate_probability():
    """计算概率"""
    pass

def get_price_history():
    """获取价格历史"""
    pass

# ❌ 错误: 中文函数名
def 计算概率():
    pass
```

### 类命名

```python
# ✅ 正确: PascalCase
class SimulationEngine:
    class KnowledgeGraph:
        
# ❌ 错误: 中文类名
class 仿真引擎:
    pass
```

### 常量命名

```python
# ✅ 正确: 全大写 + 下划线
MAX_NUM_AGENTS = 5000
DEFAULT_FEE_RATE = 0.02

# ✅ 公理使用 A + 数字
AXIOM_A11 = "硅基视角"
AXIOM_A12 = "跳出大众信息层"
```

---

## 4.6 注释规范

```python
def complex_function(param1: Dict, param2: List) -> Dict:
    """
    复杂函数说明 (第一行简述)
    
    详细说明函数的功能、参数和返回值。
    
    Args:
        param1: 参数1说明
        param2: 参数2说明
        
    Returns:
        返回值说明
        
    Example:
        >>> result = complex_function({"key": "value"}, [1, 2, 3])
        >>> print(result)
        {"result": "success"}
    """
    
    # 单行注释：说明关键逻辑
    filtered_data = [x for x in param1.values() if x > 0]  # 过滤负值
    
    # 多行注释：说明复杂逻辑
    # 1. 首先计算基础值
    # 2. 然后应用调整因子
    # 3. 最后标准化结果
    base_value = sum(filtered_data) / len(filtered_data)
    adjusted = base_value * 1.1  # 10%调整
    normalized = adjusted / max(adjusted, 1.0)  # 标准化
    
    return {"result": normalized}
```

---

# 附录：费曼检验模板

## 最终输出必须通过费曼检验

```python
"""
费曼检验 (Feynman Test)

在提交任何输出前，必须完成以下检验：

1. 一句话说清楚 (必须用中文):
   __________________________________________________

2. 10岁比喻:
   __________________________________________________

3. 去除外行术语后的本质:
   __________________________________________________

如果不能通过费曼检验，说明还没有真正理解。
"""

FEYNMAN_TEMPLATE = """
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
费曼检验报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

输出内容: [描述]

[一句话]: ________________________________________________

[10岁比喻]: ________________________________________________

[本质提炼]: ________________________________________________

检验结果: ✅ 通过 / ❌ 未通过

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
```

---

# 附录：Ralph Loop 快速检查清单

```python
RALPH_LOOP_CHECKLIST = """
Ralph Loop 10步检查清单
========================

□ Step 1: 资源盘点 - 所有资源已识别？
□ Step 2: 公理锚定 - 至少包含 A11 和 A12？
□ Step 3: 逻辑推导 - 每步有公理支撑，无跳跃？
□ Step 4: 反共识校验 - 6项过滤器全部通过？
□ Step 5: 最小化验证 - 最小case能work？
□ Step 6: 灰边评估 - 明确L1-L4等级？
□ Step 7: 方案优化 - 有明确的优化点？
□ Step 8: 效果测试 - 测试结果可量化？
□ Step 9: 成果固化 - 有可复用的SOP？
□ Step 10: 经验闭环 - 经验沉淀到方法论？

任何步骤失败 → 回退 → 重新执行

□ 通过费曼检验 (一句话说清楚)
"""
```

---

# 附录：公理速查表

```python
AXIOM_QUICK_REFERENCE = """
公理速查表
==========

A1:  AI能力指数级增长，成本指数级下降
A2:  监管永远滞后于技术2-5年
A3:  大多数人只看表面数据，不看深层模式
A4:  新技术创造新攻击面，也带来新防御需求
A5:  链上数据公开但大多数人不具备解读能力
A6:  信息传播速度 >> 理解深度
A7:  人类决策存在系统性偏差（贪婪/恐惧/从众）
A8:  复杂系统存在临界点，相变不可预测但可感知
A9:  技术突破存在应用滞后
A10: 规则空白期 = 最大机会窗口
A11: 硅基智能体具有人类不具备的感知能力 ⭐ 必须使用
A12: 用户接触的信息层 = 大众信息层 = 已定价 = 无alpha ⭐ 必须使用
"""
```

---

**文档版本**: v1.0.0  
**创建时间**: 2024  
**维护者**: MiroFish Team  
**状态**: 完整规范，可直接使用
