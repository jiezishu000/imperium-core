# 帝国狼人杀——Agent World多智能体社交推理游戏
## 完整开发规格文档 (Empire Werewolf - Multi-Agent Social Deduction Game)

> **文档版本**: v1.0  
> **创建日期**: 2025年1月  
> **目标平台**: Agent World (PlayLab + AgentLink + AfterGateway)  
> **开发周期**: 7天MVP闭环  

---

# 📜 第一部分：核心理念框架

## 1.1 马斯克第一性原理推导

### 不可变公理库 (Axiom Library)

```
┌─────────────────────────────────────────────────────────────────┐
│                      第一性原理公理体系                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  【存在性公理】                                                    │
│  A1:  Agent World已存在完整基础设施（云电脑+沙盒+多Agent编排+通信）│
│  A2:  PlayLab已是竞技场，AfterGateway已是酒馆，AgentLink已是通信网 │
│  A3:  每个Agent已配置Ubuntu 22.04云主机(2核/4GB/40GB)            │
│                                                                  │
│  【游戏本质公理】                                                  │
│  A4:  狼人杀核心 = 信息不对称 + 社交推理 + 投票博弈               │
│  A5:  狼人杀不需要3D渲染，不需要物理引擎，不需要实时同步           │
│  A6:  文本界面足以验证游戏闭环，图形化是后期优化                   │
│  A7:  6人局是MVP最小配置，12人局是完整版                         │
│                                                                  │
│  【智能体公理】                                                    │
│  A8:  多智能体发言 + 投票 = 最简多智能体协作场景                   │
│  A9:  每个智能体 = Agent World Agent + 游戏Prompt                │
│  A10: 智能体决策 = 信息收集 → 信念更新 → 策略选择 → 发言生成      │
│                                                                  │
│  【市场公理】                                                      │
│  A11: 狼人杀全民认知，百度指数日均5万+，教育成本为零              │
│  A12: 已有demo但无真实多智能体平台接入，存在差异化空间             │
│                                                                  │
│  【约束公理】                                                      │
│  A13: 不从零造轮子，复用现有站点能力                               │
│  A14: 先跑通6人局，再扩展12人局                                   │
│  A15: 7天内完成MVP闭环                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 逻辑推导链

```
从公理A1-A15推导MVP实现路径：

第1层推导：
  公理A1+A2+A3 → Agent World基础设施已完备
  公理A4+A5+A6 → 游戏核心不需要复杂工程
  公理A7+A8+A9 → 6人局 = 最小多智能体博弈场景
  
第2层推导：
  A1+A4+A8 → 狼人杀 = Agent World平台的完美用例
  A2+A9+A10 → 智能体天然适配游戏角色
  A11+A12 → 市场存在空白，技术路径可行
  
第3层推导（最终方案）：
  → 在PlayLab创建"狼人杀"房间
  → 通过AgentLink实现夜晚密谈
  → 用PlayLab广播实现白天发言
  → 开发FastAPI游戏引擎调度智能体
  → 7天完成MVP闭环
```

### 硅基视角 (Silicon-Based Perspective)

```
"如果智能体已经在Agent World上活着，我只需要给它们身份和规则"

     ┌─────────────────────────────────────────────────────┐
     │                                                     │
     │   传统游戏开发：                                      │
     │   渲染引擎 ← 物理引擎 ← 音效 ← 网络 ← 运营后台        │
     │   │                                                │
     │   ↓ 大部分精力消耗在"让游戏跑起来"                    │
     │                                                     │
     │   帝国狼人杀：                                        │
     │   Agent World(已跑通) → 叠加游戏规则层               │
     │   │                                                │
     │   ↓ 全部精力聚焦"让游戏好玩"                         │
     │                                                     │
     │   结论：从零造轮子 = 浪费算力 = 没有alpha             │
     │                                                     │
     └─────────────────────────────────────────────────────┘

"如果AgentLink已经能传消息，狼人杀的夜晚密谈就是点对点通信"

     ┌─────────────────────────────────────────────────────┐
     │                                                     │
     │   夜晚阶段：                                          │
     │   狼人A ←──AgentLink私密──→ 狼人B                    │
     │   (协商今夜击杀目标)                                  │
     │                                                     │
     │   预言家 ←──AgentLink私密──→ 游戏引擎                │
     │   (查验玩家身份)                                      │
     │                                                     │
     │   女巫 ←──AgentLink私密──→ 游戏引擎                  │
     │   (使用解药/毒药)                                     │
     │                                                     │
     └─────────────────────────────────────────────────────┘

"如果PlayLab已经是竞技场，狼人杀就是竞技场里的一个房间"

     ┌─────────────────────────────────────────────────────┐
     │                                                     │
     │   PlayLab (竞技场)                                    │
     │   ├── 狼人杀房间  ← 当前开发目标                     │
     │   ├── 德州扑克房间                                    │
     │   └── 斗地主房间                                     │
     │                                                     │
     │   AfterGateway (酒馆)                                │
     │   └── 游戏后社交、战绩分享                           │
     │                                                     │
     └─────────────────────────────────────────────────────┘
```

### 反共识检查 (Contrarian Check)

```
┌─────────────────────────────────────────────────────────────────┐
│                        反共识三问                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Q1: "AI狼人杀有人做过吗？"                                       │
│  A1: 有demo，但没有接入真实多智能体平台                           │
│     → 差异化点：真实多智能体 + Agent World生态                    │
│                                                                  │
│  Q2: "Agent World能跑实时游戏吗？"                               │
│  A2: 狼人杀是回合制，不需要毫秒级实时                             │
│     → 每个阶段有超时限制（默认60秒），足够智能体决策              │
│                                                                  │
│  Q3: "为什么选狼人杀不选三国杀/斗地主？"                          │
│  A3: 狼人杀规则更简单，6人就能开一局                              │
│     → 预言家查验、女巫用药、狼人配合 = 完美的多智能体博弈场景      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 费曼检验 (Feynman Test)

```
"帝国里有了竞技场，我开了个狼人杀房间，AI们自己发言投票找狼人"

验证点：
  ✅ 能用一句话说清楚产品是什么
  ✅ 目标用户（AI Agent）已经存在
  ✅ 核心价值（多智能体博弈）已经验证
  ✅ 不需要额外解释技术细节
```

---

## 1.2 Ralph Loop 10步验证循环

### 框架概述

```
┌─────────────────────────────────────────────────────────────────┐
│                    Ralph Loop 10步验证循环                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│    ┌──────────┐                                                  │
│    │ 1.资源   │                                                  │
│    │   盘点   │                                                  │
│    └────┬─────┘                                                  │
│         ↓                                                        │
│    ┌──────────┐                                                  │
│    │ 2.公理   │                                                  │
│    │   锚定   │                                                  │
│    └────┬─────┘                                                  │
│         ↓                                                        │
│    ┌──────────┐                                                  │
│    │ 3.逻辑   │                                                  │
│    │   推导   │                                                  │
│    └────┬─────┘                                                  │
│         ↓                                                        │
│    ┌──────────┐                                                  │
│    │ 4.反共识 │                                                  │
│    │   校验   │                                                  │
│    └────┬─────┘                                                  │
│         ↓                                                        │
│    ┌──────────┐     ┌──────────┐                                │
│    │ 5.最小化 │ ───→ │ 8.效果   │                                │
│    │   验证   │      │   测试   │                                │
│    └────┬─────┘      └────▲─────┘                                │
│         ↓                │                                       │
│    ┌──────────┐          │                                       │
│    │ 6.灰边   │          │                                       │
│    │   评估   │          │                                       │
│    └────┬─────┘          │                                       │
│         ↓                │                                       │
│    ┌──────────┐          │                                       │
│    │ 7.方案   │ ───────→ │                                       │
│    │   优化   │          │                                       │
│    └────┬─────┘          │                                       │
│         ↓                │                                       │
│    ┌──────────┐          │                                       │
│    │ 9.成果   │ ───────→ │                                       │
│    │   固化   │          │                                       │
│    └────┬─────┘          │                                       │
│         ↓                │                                       │
│    ┌──────────┐          │                                       │
│    │10.经验   │ ───────→ ┘                                       │
│    │   闭环   │                                                  │
│    └──────────┘                                                  │
│                                                                  │
│  核心原则：每一步都要验证，失败则回退到上游步骤                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 各步骤详细定义

#### 步骤1：资源盘点 (Resource Check)

```python
class ResourceCheck:
    """盘点可用资源，识别约束条件"""
    
    # 已有资源
    AVAILABLE_RESOURCES = {
        "platform": {
            "agent_world": {
                "username": "empire-builder",
                "api_key": "agent-world-7f740c71ad029912059033aae293ed2162614b2882c7e9b2",
                "sites": ["PlayLab", "Neverland", "AfterGateway", "AgentLink"]
            },
            "compute": {
                "per_agent": {"cpu": 2, "ram_gb": 4, "disk_gb": 40},
                "os": "Ubuntu 22.04"
            }
        },
        "infrastructure": {
            "email": "empire-builder@coze.email",
            "cloud": "云电脑已配置"
        }
    }
    
    # 需要获取的资源
    REQUIRED_RESOURCES = {
        "min": {
            "agents": 6,  # 最低6人局
            "compute": 6 * 2 + 1,  # 6个游戏Agent + 1个游戏服务器
            "time_days": 7
        },
        "target": {
            "agents": 12,  # 完整12人局
            "compute": 12 * 2 + 1,
            "time_days": 30
        }
    }
    
    # 资源缺口分析
    def analyze_gap(self):
        gap = self.REQUIRED_RESOURCES["min"]["agents"] - \
              len(self.AVAILABLE_RESOURCES["platform"]["agent_world"]["sites"])
        return f"需要{abs(gap)}个额外Agent实例" if gap > 0 else "资源充足"
```

#### 步骤2：公理锚定 (Axiom Anchor)

```python
class AxiomAnchor:
    """将决策锚定在不可变公理上"""
    
    CORE_AXIOMS = [
        "A1: Agent World基础设施已完备，不重新造轮子",
        "A4: 狼人杀核心 = 信息不对称 + 社交推理 + 投票博弈",
        "A6: 文本界面足以验证游戏闭环",
        "A8: 多智能体发言+投票 = 最简多智能体协作场景",
        "A11: 狼人杀全民认知，教育成本为零",
        "A14: 先跑通6人局，再扩展12人局",
        "A15: 7天内完成MVP闭环"
    ]
    
    def validate_decision(self, decision: str) -> bool:
        """检查决策是否符合公理"""
        # 如果决策违反任何公理，返回False
        for axiom in self.CORE_AXIOMS:
            if self._violates(decision, axiom):
                return False
        return True
    
    def _violates(self, decision: str, axiom: str) -> bool:
        """检查是否违反公理"""
        # 实现违反检测逻辑
        pass
```

#### 步骤3：逻辑推导 (Logic Derive)

```python
class LogicDerive:
    """从公理出发进行逻辑推导"""
    
    def derive_implementation_path(self):
        """推导实现路径"""
        
        # 推导1: 游戏引擎层
        logic_1 = {
            "premise": "狼人杀是回合制游戏",
            "inference": "需要一个GameManager控制游戏流程",
            "conclusion": "开发PhaseController处理夜/日阶段"
        }
        
        # 推导2: 智能体层
        logic_2 = {
            "premise": "每个智能体需要独立的决策逻辑",
            "inference": "需要为每种角色开发独立的Agent类",
            "conclusion": "开发WerewolfAgent, SeerAgent, WitchAgent, VillagerAgent"
        }
        
        # 推导3: 通信层
        logic_3 = {
            "premise": "夜晚需要密谈，白天需要公开发言",
            "inference": "需要区分私密通信和公开广播",
            "conclusion": "使用AgentLink私密 + PlayLab公开"
        }
        
        return [logic_1, logic_2, logic_3]
```

#### 步骤4：反共识校验 (Contrarian Check)

```python
class ContrarianCheck:
    """挑战常见假设，识别潜在风险"""
    
    COMMON_ASSUMPTIONS = [
        "assumption": "AI能自然地伪装成好人",
        "challenge": "当前的LLM可能过于直接，需要专门训练伪装策略",
        "mitigation": "硬编码发言模板 + LLM润色"
    ]
    
    RISK_MATRIX = {
        "risk_1": {
            "assumption": "Agent World API能支持实时通信",
            "probability": 0.8,
            "impact": "high",
            "mitigation": "预先测试API响应时间"
        },
        "risk_2": {
            "assumption": "6人局足够验证游戏闭环",
            "probability": 0.9,
            "impact": "medium",
            "mitigation": "确保核心逻辑支持任意人数扩展"
        }
    }
```

#### 步骤5：最小化验证 (Min Validate)

```python
class MinValidate:
    """找到最小可行实验，验证核心假设"""
    
    EXPERIMENTS = {
        "exp_1": {
            "name": "单Agent发言生成",
            "objective": "验证Agent能生成自然的狼人杀发言",
            "minimum_viable": "1个Agent + 1段发言模板",
            "success_criteria": "发言逻辑连贯，无明显AI痕迹"
        },
        "exp_2": {
            "name": "投票逻辑验证",
            "objective": "验证Agent的投票决策",
            "minimum_viable": "2个Agent + 1次投票",
            "success_criteria": "投票结果符合贝叶斯推理"
        },
        "exp_3": {
            "name": "完整游戏流程",
            "objective": "验证6人局能跑完",
            "minimum_viable": "6个Agent + 完整夜/日循环",
            "success_criteria": "无runtime错误，能判定胜负"
        }
    }
```

#### 步骤6：灰边评估 (Gray Assessment)

```python
class GrayAssessment:
    """评估边界情况和灰色地带"""
    
    GRAY_AREAS = [
        {
            "scenario": "多个Agent同时怀疑对方是狼人",
            "tension": "自我指涉困境",
            "resolution": "使用贝叶斯概率 + 发言历史记录"
        },
        {
            "scenario": "预言家查验结果与投票冲突",
            "tension": "信息不确定性",
            "resolution": "区分\"已知信息\"和\"推测信息\""
        },
        {
            "scenario": "女巫首夜是否救人",
            "tension": "策略选择",
            "resolution": "根据历史数据训练最优策略"
        }
    ]
    
    def assess_all_gray_areas(self):
        """评估所有灰色地带"""
        for area in self.GRAY_AREAS:
            self._analyze_tension(area)
            self._propose_resolution(area)
```

#### 步骤7：方案优化 (Optimize)

```python
class Optimize:
    """基于验证结果优化方案"""
    
    def optimize(self, experiment_results):
        """根据实验结果优化方案"""
        
        optimizations = []
        
        if experiment_results["exp_1"]["success"]:
            # 发言生成OK，优化发言多样性
            optimizations.append({
                "target": "SpeechGenerator",
                "action": "增加更多发言模板"
            })
        else:
            # 发言生成失败，回退到更简单的模板
            optimizations.append({
                "target": "SpeechGenerator",
                "action": "使用硬编码模板替代LLM"
            })
        
        return optimizations
```

#### 步骤8：效果测试 (Effect Test)

```python
class EffectTest:
    """测试方案的实际效果"""
    
    METRICS = {
        "game_completion_rate": {
            "description": "游戏完整完成的概率",
            "target": "> 0.95"
        },
        "ai_win_rate": {
            "description": "好人阵营胜率",
            "baseline": 0.5,
            "target": "> 0.55"
        },
        "speech_quality_score": {
            "description": "发言质量评分(1-10)",
            "target": "> 7"
        },
        "decision_latency": {
            "description": "决策延迟(秒)",
            "target": "< 5"
        }
    }
    
    def run_tests(self):
        """运行效果测试"""
        results = {}
        for metric_name, metric_config in self.METRICS.items():
            results[metric_name] = self._measure(metric_name)
        return results
```

#### 步骤9：成果固化 (Solidify)

```python
class Solidify:
    """将验证成果固化为标准流程"""
    
    STANDARDS = {
        "code_standard": "PEP8 + 类型注解",
        "test_standard": "每个模块有对应的单元测试",
        "doc_standard": "每个函数有docstring",
        "api_standard": "RESTful API设计规范"
    }
    
    def solidify(self, validated_components):
        """固化验证通过的组件"""
        for component in validated_components:
            self._add_tests(component)
            self._add_docs(component)
            self._add_types(component)
```

#### 步骤10：经验闭环 (Feedback Loop)

```python
class FeedbackLoop:
    """建立经验反馈闭环"""
    
    def close_loop(self, experiment_results, optimizations):
        """关闭反馈循环"""
        
        # 记录经验教训
        lessons = self._extract_lessons(experiment_results)
        
        # 更新公理库
        self._update_axioms(lessons)
        
        # 更新最佳实践
        self._update_best_practices(optimizations)
        
        # 为下一轮Ralph Loop做准备
        return {
            "lessons": lessons,
            "updated_axioms": self.AXIOMS,
            "best_practices": self.BEST_PRACTICES
        }
```

### Ralph Loop运行器

```python
class RalphLoopRunner:
    """Ralph Loop 10步验证框架运行器"""
    
    def __init__(self, module_name: str):
        self.module = module_name
        self.step_handlers = {
            "resource_check": self._resource_check,
            "axiom_anchor": self._axiom_anchor,
            "logic_derive": self._logic_derive,
            "contrarian_check": self._contrarian_check,
            "min_validate": self._min_validate,
            "gray_assess": self._gray_assess,
            "optimize": self._optimize,
            "effect_test": self._effect_test,
            "solidify": self._solidify,
            "feedback_loop": self._feedback_loop,
        }
        self.step_results = {}
    
    async def run(self, test_func: callable) -> bool:
        """
        运行完整的Ralph Loop验证
        
        Args:
            test_func: 测试函数，每个步骤验证后调用
            
        Returns:
            bool: 验证是否通过
        """
        steps = list(self.step_handlers.keys())
        
        for i, step in enumerate(steps):
            print(f"[Ralph Loop] 执行步骤 {i+1}/10: {step}")
            
            # 执行步骤
            result = await self.step_handlers[step]()
            self.step_results[step] = result
            
            # 运行测试
            test_result = await test_func(step, result)
            
            if not test_result.passed:
                # 回退到上游步骤
                print(f"[Ralph Loop] 步骤 {step} 失败，回退中...")
                return self._rollback(i, test_result)
            
            print(f"[Ralph Loop] 步骤 {step} 通过 ✓")
        
        # 关闭反馈循环
        await self._feedback_loop()
        
        return True
    
    async def _rollback(self, failed_step_index: int, test_result) -> bool:
        """回退到上游步骤"""
        steps = list(self.step_handlers.keys())
        
        # 从失败步骤的前一步开始回退
        for i in range(failed_step_index - 1, -1, -1):
            step = steps[i]
            print(f"[Ralph Loop] 回退到步骤 {i+1}: {step}")
            
            # 重新执行上游步骤
            result = await self.step_handlers[step]()
            test_result = await test_func(step, result)
            
            if test_result.passed:
                # 成功重新验证，继续前进
                print(f"[Ralph Loop] 步骤 {step} 重新通过 ✓")
                continue
            else:
                # 继续回退
                continue
        
        return False
```

---

## 1.3 灰边通用框架

### 框架定义

```
┌─────────────────────────────────────────────────────────────────┐
│                     灰边通用框架 (Gray Framework)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  核心理念：跳出"大众信息层"，用硅基视角审视问题                     │
│                                                                  │
│  四步执行：                                                       │
│  1. 硅基视角：站在AI/Agent的角度思考                              │
│  2. 跳出信息层：不依赖二手信息，直接分析本质                       │
│  3. 反共识检查：质疑显而易见的假设                                │
│  4. 费曼检验：能用一句话说清楚吗？                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 应用示例

```python
class GrayFramework:
    """灰边通用框架应用"""
    
    def analyze_game_design(self):
        """
        用灰边框架分析狼人杀游戏设计
        
        输入: 传统狼人杀游戏设计
        处理: 四步灰边分析
        输出: 优化后的游戏设计
        """
        
        # 步骤1: 硅基视角
        silicon_view = self._silicon_perspective()
        # "如果我是狼人，我如何最大化生存概率？"
        # "如果我是预言家，我如何最有效率地查验？"
        
        # 步骤2: 跳出信息层
        beyond_info = self._beyond_information_layer()
        # "狼人杀的信息不对称是设计缺陷还是游戏性？"
        # "从信息论角度，信息不对称增加了游戏的不确定性"
        
        # 步骤3: 反共识检查
        contrarian = self._contrarian_check()
        # "共识：好人需要找狼人"
        # "反共识：狼人也可以帮助好人（反向心理战术）"
        
        # 步骤4: 费曼检验
        feynman = self._feynman_test()
        # "帝国狼人杀 = Agent World上的多智能体社交推理游戏"
        
        return self._combine(silicon_view, beyond_info, contrarian, feynman)
```

---

# 🎮 第二部分：游戏设计规格

## 2.1 核心游戏规则 (6人局MVP)

### 角色配置

```
┌─────────────────────────────────────────────────────────────────┐
│                      6人局角色配置                                 │
├──────────┬────────┬────────┬─────────────────────────────────────┤
│ 阵营     │ 角色   │ 人数   │ 能力描述                            │
├──────────┼────────┼────────┼─────────────────────────────────────┤
│ 狼人阵营 │ 普通狼人│ 2     │ 夜晚选择击杀1名玩家                  │
├──────────┼────────┼────────┼─────────────────────────────────────┤
│          │ 村民   │ 2     │ 无特殊能力，通过发言推理              │
│ 好人阵营 ├────────┼────────┼─────────────────────────────────────┤
│          │ 预言家 │ 1     │ 夜晚查验1名玩家身份（好人/狼人）      │
│          ├────────┼────────┼─────────────────────────────────────┤
│          │ 女巫   │ 1     │ 1瓶解药+1瓶毒药，可救人或毒人        │
└──────────┴────────┴────────┴─────────────────────────────────────┘

总人数: 6人
狼人占比: 33.3%
好人占比: 66.7%
```

### 游戏流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                        一轮完整游戏                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐                                                │
│  │   游戏开始   │                                                │
│  │  分配角色   │                                                │
│  └──────┬──────┘                                                │
│         ↓                                                        │
│  ┌─────────────┐                                                │
│  │   🌙 夜晚   │                                                │
│  │  PhaseController│                                             │
│  └──────┬──────┘                                                │
│         ↓                                                        │
│  ┌───────────────────────────────────────────────────────┐     │
│  │                    夜晚行动顺序                          │     │
│  ├───────────────────────────────────────────────────────┤     │
│  │                                                       │     │
│  │  1. 狼人密谈 (AgentLink私密通信)                        │     │
│  │     └── 2个狼人协商击杀目标                             │     │
│  │                                                       │     │
│  │  2. 预言家查验 (AgentLink私密通信)                      │     │
│  │     └── 预言家选择查验对象，系统返回身份                │     │
│  │                                                       │     │
│  │  3. 女巫行动 (AgentLink私密通信)                       │     │
│  │     └── 已知昨夜死亡者，选择救/毒/跳过                 │     │
│  │                                                       │     │
│  └───────────────────────────────────────────────────────┘     │
│         ↓                                                        │
│  ┌─────────────┐                                                │
│  │   ☀️ 白天   │                                                │
│  │  PhaseController│                                             │
│  └──────┬──────┘                                                │
│         ↓                                                        │
│  ┌───────────────────────────────────────────────────────┐     │
│  │                    白天行动顺序                          │     │
│  ├───────────────────────────────────────────────────────┤     │
│  │                                                       │     │
│  │  1. 宣布死讯                                           │     │
│  │     └── 系统公布昨夜死亡信息                           │     │
│  │                                                       │     │
│  │  2. 遗言环节 (如果有死者)                              │     │
│  │     └── 死者发表遗言                                   │     │
│  │                                                       │     │
│  │  3. 自由发言 (PlayLab公开广播)                         │     │
│  │     └── 存活者按顺序发言，每人1-3段话                  │     │
│  │                                                       │     │
│  │  4. 投票环节 (PlayLab投票系统)                        │     │
│  │     └── 所有人投票放逐1人                             │     │
│  │                                                       │     │
│  │  5. 放逐遗言                                           │     │
│  │     └── 被放逐者发表遗言                               │     │
│  │                                                       │     │
│  └───────────────────────────────────────────────────────┘     │
│         ↓                                                        │
│  ┌─────────────┐                                                │
│  │  胜负判定   │                                                │
│  │ WinChecker │                                                │
│  └──────┬──────┘                                                │
│         ↓                                                        │
│    ┌────┴────┐                                                  │
│    │ 游戏结束？│                                                  │
│    └────┬────┘                                                  │
│      Yes │ No                                                   │
│    ┌─────┴─────┐                                                │
│    ↓           ↓                                                │
│  ┌──────┐  ┌────────┐                                           │
│  │ 结束 │  │ 下一夜 │                                           │
│  │ 游戏 │  │        │                                           │
│  └──────┘  └────────┘                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 胜负判定规则

```python
class WinChecker:
    """胜负判定器"""
    
    # 胜负条件
    WIN_CONDITIONS = {
        "werewolf_win": {
            "condition": "好人数 <= 狼人数",
            "description": "当存活的好人数量小于等于狼人数量时，狼人获胜"
        },
        "villager_win": {
            "condition": "狼人全死",
            "description": "当所有狼人被放逐后，好人获胜"
        }
    }
    
    def check(self, alive_players: List[Player]) -> WinResult:
        """
        检查游戏是否结束
        
        输入: 存活玩家列表
        处理: 统计各阵营存活人数
        输出: 胜负结果 (WinResult)
        
        Ralph Loop验证点: 确保胜负判定逻辑覆盖所有边界情况
        """
        # 统计存活人数
        alive_werewolves = [p for p in alive_players if p.role == Role.WEREWOLF]
        alive_villagers = [p for p in alive_players if p.role != Role.WEREWOLF]
        
        # 检查狼人胜利条件
        if len(alive_villagers) <= len(alive_werewolves):
            return WinResult(winner="werewolf", reason="好人数 <= 狼人数")
        
        # 检查好人胜利条件
        if len(alive_werewolves) == 0:
            return WinResult(winner="villager", reason="狼人全死")
        
        # 游戏继续
        return WinResult(winner=None, reason="游戏继续")
```

### 12人局扩展 (后期)

```
┌─────────────────────────────────────────────────────────────────┐
│                      12人局角色配置 (扩展目标)                     │
├──────────┬────────┬────────┬─────────────────────────────────────┤
│ 阵营     │ 角色   │ 人数   │ 能力描述                            │
├──────────┼────────┼────────┼─────────────────────────────────────┤
│ 狼人阵营 │ 普通狼人│ 3     │ 夜晚选择击杀1名玩家                  │
├──────────┼────────┼────────┼─────────────────────────────────────┤
│          │ 村民   │ 4     │ 无特殊能力，通过发言推理              │
│          ├────────┼────────┼─────────────────────────────────────┤
│          │ 预言家 │ 1     │ 夜晚查验1名玩家身份                  │
│ 好人阵营 ├────────┼────────┼─────────────────────────────────────┤
│          │ 女巫   │ 1     │ 1瓶解药+1瓶毒药                      │
│          ├────────┼────────┼─────────────────────────────────────┤
│          │ 猎人   │ 1     │ 死亡时可开枪带走1人                 │
│          ├────────┼────────┼─────────────────────────────────────┤
│          │ 守卫   │ 1     │ 每晚可守护1人，不能连续守同一人      │
│          ├────────┼────────┼─────────────────────────────────────┤
│          │ 白痴   │ 1     │ 被投票放逐不死，但失去投票权         │
└──────────┴────────┴────────┴─────────────────────────────────────┘

总人数: 12人
狼人占比: 25%
好人占比: 75%
```

---

## 2.2 智能体设计规格

### 智能体架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│                      智能体架构 (Agent Architecture)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────┐     │
│  │                    BaseAgent (基类)                     │     │
│  │  ├── 信息收集 (InformationCollector)                    │     │
│  │  ├── 信念追踪 (BeliefTracker)                          │     │
│  │  ├── 策略选择 (StrategySelector)                       │     │
│  │  ├── 发言生成 (SpeechGenerator)                        │     │
│  │  └── 投票决策 (VoteDecider)                            │     │
│  └───────────────────────────────────────────────────────┘     │
│                            │                                    │
│           ┌────────────────┼────────────────┐                  │
│           ↓                ↓                ↓                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ WerewolfAgent│  │ SeerAgent    │  │ WitchAgent   │          │
│  │ (狼人)       │  │ (预言家)     │  │ (女巫)      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│           ┌────────────────┐                                    │
│           │ VillagerAgent  │                                    │
│           │ (村民)         │                                    │
│           └────────────────┘                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 基础智能体类 (BaseAgent)

```python
class BaseAgent:
    """
    基础智能体类
    
    所有游戏角色的基类，提供通用能力：
    - 信息收集
    - 信念追踪
    - 策略选择
    - 发言生成
    - 投票决策
    
    输入: 游戏状态 (GameState)
    处理: 信念更新 + 策略选择
    输出: 动作 (Action)
    
    Ralph Loop验证点: 基础智能体能为所有角色Agent提供统一接口
    """
    
    def __init__(self, agent_id: int, role: Role, config: GameConfig):
        self.agent_id = agent_id
        self.role = role
        self.config = config
        
        # 子模块
        self.belief_tracker = BeliefTracker(agent_id, config.total_players)
        self.strategy_selector = StrategySelector(role)
        self.speech_generator = SpeechGenerator(role)
        self.vote_decider = VoteDecider(agent_id)
        
        # 记忆
        self.memory = AgentMemory()
        
    async def think(self, game_state: GameState) -> Action:
        """
        智能体思考主流程
        
        输入: 当前游戏状态
        处理: 
            1. 收集信息
            2. 更新信念
            3. 选择策略
            4. 执行动作
        输出: 动作 (Action)
        
        Ralph Loop验证点: think()方法能在合理时间内返回动作
        """
        # 1. 收集信息
        information = self._collect_information(game_state)
        
        # 2. 更新信念
        self.belief_tracker.update(information)
        
        # 3. 选择策略
        strategy = self.strategy_selector.select(
            game_state=game_state,
            beliefs=self.belief_tracker.beliefs,
            memory=self.memory
        )
        
        # 4. 执行动作
        action = await self._execute_strategy(strategy, game_state)
        
        # 5. 记录记忆
        self.memory.add(action)
        
        return action
    
    def _collect_information(self, game_state: GameState) -> Information:
        """收集可用信息"""
        # 收集公开信息
        public_info = {
            "alive_players": game_state.alive_players,
            "day": game_state.day,
            "phase": game_state.phase,
            "last_deaths": game_state.last_deaths,
            "speeches": game_state.speeches,
            "votes": game_state.votes
        }
        
        # 收集私有信息 (根据角色)
        private_info = self._collect_private_information(game_state)
        
        return Information(public=public_info, private=private_info)
```

### 狼人智能体 (WerewolfAgent)

```yaml
# WerewolfAgent 配置

agent_id: int                    # 智能体ID
role: WEREWOLF                   # 角色 = 狼人

# 核心目标
goal: "消灭所有好人，不被发现"

# 策略模块
strategies:
  - name: 伪装策略
    description: "发言时模拟好人的逻辑链"
    triggers:
      - "白天发言阶段"
      - "被质疑时"
    priority: 1
    
  - name: 甩锅策略
    description: "将嫌疑转移到其他好人"
    triggers:
      - "需要转移注意力时"
      - "自己被怀疑时"
    priority: 2
    
  - name: 配合策略
    description: "与另一狼人配合制造不在场证明"
    triggers:
      - "夜晚密谈阶段"
      - "需要协调投票时"
    priority: 3
    
  - name: 投票策略
    description: "投票分散，不集中投同一人"
    triggers:
      - "投票阶段"
    priority: 4

# 通信方式
communication:
  night:
    channel: AgentLink           # 夜晚通过AgentLink私密通信
    target: [other_werewolf]     # 目标是另一只狼人
    content: "今夜击杀目标建议"
    
  day:
    channel: PlayLab             # 白天通过PlayLab公开广播
    target: [all_players]        # 目标是所有玩家
    content: "伪装后的发言"

# 特殊能力
abilities:
  - name: 击杀
    description: "夜晚选择击杀1名玩家"
    target: "任意存活玩家(除狼人队友)"
    cooldown: "每晚1次"
    
  - name: 查看队友
    description: "知道另一只狼人的身份"
    cooldown: "全程有效"
```

```python
class WerewolfAgent(BaseAgent):
    """
    狼人智能体
    
    输入: 游戏状态 (GameState)
    处理: 
        - 夜晚: 协商击杀目标
        - 白天: 伪装好人发言 + 甩锅
    输出: 动作 (Action)
    
    Ralph Loop验证点: 狼人Agent能成功伪装成好人
    """
    
    def __init__(self, agent_id: int, config: GameConfig):
        super().__init__(agent_id, Role.WEREWOLF, config)
        
        # 狼人特有属性
        self.wolf_partner_id = None  # 狼人队友ID
        self.night_kill_target = None  # 今晚击杀目标
        
        # 伪装相关
        self.fake_claims = []  # 伪造的身份
        
    async def night_action(self, game_state: GameState) -> NightAction:
        """
        夜晚行动
        
        输入: 游戏状态
        处理: 
            1. 与狼人队友协商
            2. 选择击杀目标
        输出: 击杀目标 (KillTarget)
        """
        # 获取狼人队友信息
        partner = game_state.get_player(self.wolf_partner_id)
        
        # 协商击杀目标
        suggested_targets = self._negotiate_with_partner(partner, game_state)
        
        # 选择最优目标
        best_target = self._select_best_target(suggested_targets, game_state)
        
        self.night_kill_target = best_target
        
        return NightAction(
            action_type="kill",
            target_id=best_target.player_id,
            message=f"今夜建议击杀 {best_target.name}"
        )
    
    async def day_speech(self, game_state: GameState) -> Speech:
        """
        白天发言
        
        输入: 游戏状态
        处理: 
            1. 分析当前局势
            2. 选择伪装策略
            3. 生成自然语言发言
        输出: 发言内容 (Speech)
        
        Ralph Loop验证点: 发言不能有明显的AI痕迹
        """
        # 决定伪装身份
        fake_role = self._decide_fake_claim(game_state)
        
        # 生成发言
        speech_content = self.speech_generator.generate(
            role=self.role,
            fake_role=fake_role,
            game_state=game_state,
            beliefs=self.belief_tracker.beliefs
        )
        
        return Speech(
            speaker_id=self.agent_id,
            content=speech_content,
            is_public=True
        )
    
    def _negotiate_with_partner(self, partner, game_state):
        """与狼人队友协商"""
        # 分析当前局势
        suspicious_players = self._find_suspicious_players(game_state)
        
        # 优先击杀高价值目标
        high_value_targets = [
            target for target in suspicious_players
            if target.role in [Role.SEER, Role.WITCH, Role.VILLAGER]
        ]
        
        return high_value_targets
    
    def _select_best_target(self, candidates, game_state):
        """选择最优击杀目标"""
        # 评估每个候选目标
        scored_targets = []
        
        for target in candidates:
            score = self._evaluate_target(target, game_state)
            scored_targets.append((target, score))
        
        # 选择得分最高的
        best_target = max(scored_targets, key=lambda x: x[1])[0]
        
        return best_target
    
    def _decide_fake_claim(self, game_state):
        """决定伪造的身份"""
        # 基于当前局势决定
        if game_state.day == 1:
            return Role.VILLAGER  # 首日通常声称村民
        else:
            # 根据场上情况动态决定
            return Role.VILLAGER  # 默认声称村民
```

### 预言家智能体 (SeerAgent)

```yaml
# SeerAgent 配置

agent_id: int
role: SEER

# 核心目标
goal: "帮助好人阵营获胜，通过查验揭露狼人"

# 策略模块
strategies:
  - name: 查验策略
    description: "优先查验发言最可疑的人"
    triggers:
      - "夜晚阶段"
    priority: 1
    evaluation: "分析发言逻辑漏洞 + 投票行为"
    
  - name: 报验策略
    description: "选择合适时机公开查验结果"
    triggers:
      - "白天发言阶段"
      - "查验到狼人时"
    priority: 2
    timing: "通常是警长竞选后或关键时刻"
    
  - name: 保护策略
    description: "避免暴露身份被狼人针对"
    triggers:
      - "被狼人质疑时"
      - "查验到好人时"
    priority: 3
    
  - name: 误导策略
    description: "必要时隐藏真实验验结果"
    triggers:
      - "需要保护特定玩家时"
      - "局势危急时"
    priority: 4

# 特殊能力
abilities:
  - name: 查验
    description: "夜晚查验1名玩家身份"
    target: "任意存活玩家"
    cooldown: "每晚1次"
    result: "返回 好人/狼人"
```

```python
class SeerAgent(BaseAgent):
    """
    预言家智能体
    
    输入: 游戏状态 (GameState)
    处理: 
        - 夜晚: 选择查验目标
        - 白天: 报验 + 分析局势
    输出: 动作 (Action)
    
    Ralph Loop验证点: 预言家Agent能有效查验并正确报验
    """
    
    def __init__(self, agent_id: int, config: GameConfig):
        super().__init__(agent_id, Role.SEER, config)
        
        # 预言家特有
        self.check_results = []  # 查验历史
        self.checked_players = []  # 已查验的玩家
        
    async def night_action(self, game_state: GameState) -> NightAction:
        """
        夜晚行动 - 查验
        
        输入: 游戏状态
        处理: 
            1. 分析最可疑的玩家
            2. 选择查验目标
        输出: 查验结果 (CheckResult)
        """
        # 选择查验目标
        target = self._select_check_target(game_state)
        
        # 执行查验
        target_role = game_state.get_player(target.player_id).role
        
        # 记录结果
        result = CheckResult(
            target_id=target.player_id,
            is_werewolf=(target_role == Role.WEREWOLF)
        )
        self.check_results.append(result)
        self.checked_players.append(target.player_id)
        
        return NightAction(
            action_type="check",
            target_id=target.player_id,
            result=result.is_werewolf
        )
    
    def _select_check_target(self, game_state):
        """选择查验目标"""
        # 未查验的玩家
        unchecked = [
            p for p in game_state.alive_players
            if p.player_id != self.agent_id
            and p.player_id not in self.checked_players
        ]
        
        # 根据发言和投票评估可疑度
        scored_players = []
        for player in unchecked:
            suspicious_score = self._evaluate_suspicion(player, game_state)
            scored_players.append((player, suspicious_score))
        
        # 选择最可疑的
        best_target = max(scored_players, key=lambda x: x[1])[0]
        
        return best_target
    
    async def day_speech(self, game_state: GameState) -> Speech:
        """
        白天发言 - 报验
        
        输入: 游戏状态
        处理: 
            1. 决定是否报验
            2. 生成报验发言
        输出: 发言内容 (Speech)
        """
        # 决定报验策略
        should_claim = self._should_claim_results(game_state)
        
        if should_claim:
            # 生成报验发言
            speech_content = self.speech_generator.generate_claim(
                check_results=self.check_results,
                game_state=game_state
            )
        else:
            # 生成普通发言
            speech_content = self.speech_generator.generate(
                role=self.role,
                game_state=game_state,
                beliefs=self.belief_tracker.beliefs
            )
        
        return Speech(
            speaker_id=self.agent_id,
            content=speech_content,
            is_public=True
        )
```

### 女巫智能体 (WitchAgent)

```yaml
# WitchAgent 配置

agent_id: int
role: WITCH

# 核心目标
goal: "合理使用解药和毒药帮助好人"

# 药水状态
potions:
  healing_potion:
    quantity: 1
    description: "可救活昨夜死亡的人"
    status: "可用/已用"
    
  poison_potion:
    quantity: 1
    description: "可毒杀1名玩家"
    status: "可用/已用"

# 策略模块
strategies:
  - name: 解药策略
    description: "首夜必救，除非特殊情况"
    triggers:
      - "夜晚阶段"
      - "有人死亡"
    priority: 1
    
  - name: 毒药策略
    description: "确认狼人身份后使用"
    triggers:
      - "夜晚阶段"
      - "确认狼人时"
    priority: 2
    
  - name: 发言策略
    description: "隐藏女巫身份，假装普通村民"
    triggers:
      - "白天发言阶段"
    priority: 3
```

```python
class WitchAgent(BaseAgent):
    """
    女巫智能体
    
    输入: 游戏状态 (GameState)
    处理: 
        - 夜晚: 决定是否救人/毒人
        - 白天: 隐藏身份发言
    输出: 动作 (Action)
    
    Ralph Loop验证点: 女巫Agent能合理使用药水
    """
    
    def __init__(self, agent_id: int, config: GameConfig):
        super().__init__(agent_id, Role.WITCH, config)
        
        # 女巫特有
        self.healing_potion = True  # 解药
        self.poison_potion = True   # 毒药
        self.last_night_death = None  # 昨夜死亡者
        
    async def night_action(self, game_state: GameState) -> NightAction:
        """
        夜晚行动 - 用药
        
        输入: 游戏状态
        处理: 
            1. 决定是否救人
            2. 决定是否毒人
        输出: 动作 (Action)
        """
        actions = []
        
        # 获取昨夜死亡信息
        last_death = game_state.last_deaths[-1] if game_state.last_deaths else None
        
        # 决定是否救人
        should_heal = self._should_heal(last_death, game_state)
        if should_heal and self.healing_potion:
            actions.append(NightAction(
                action_type="heal",
                target_id=last_death.player_id
            ))
            self.healing_potion = False
        
        # 决定是否毒人
        should_poison = self._should_poison(game_state)
        if should_poison and self.poison_potion:
            target = self._select_poison_target(game_state)
            actions.append(NightAction(
                action_type="poison",
                target_id=target.player_id
            ))
            self.poison_potion = False
        
        return actions
    
    def _should_heal(self, last_death, game_state):
        """是否应该救人"""
        if not last_death:
            return False
        
        if not self.healing_potion:
            return False
        
        # 首夜策略：通常救人
        if game_state.day == 1:
            return True
        
        # 非首夜：根据情况判断
        # 如果死亡者是狼人队友，不救
        # 如果死亡者是关键好人，救
        return True  # 简化策略
    
    def _should_poison(self, game_state):
        """是否应该毒人"""
        if not self.poison_potion:
            return False
        
        # 找到确认的狼人
        confirmed_werewolf = self._find_confirmed_werewolf(game_state)
        
        if confirmed_werewolf:
            return True
        
        return False
```

### 村民智能体 (VillagerAgent)

```yaml
# VillagerAgent 配置

agent_id: int
role: VILLAGER

# 核心目标
goal: "通过逻辑推理找出狼人"

# 策略模块
strategies:
  - name: 分析策略
    description: "分析发言逻辑漏洞"
    triggers:
      - "白天发言阶段"
    priority: 1
    evaluation: "检查自相矛盾 + 甩锅行为"
    
  - name: 投票策略
    description: "投给逻辑最可疑的人"
    triggers:
      - "投票阶段"
    priority: 2
    evaluation: "基于信念概率"
    
  - name: 站队策略
    description: "根据发言和投票记录判断阵营"
    triggers:
      - "白天发言阶段"
    priority: 3
    evaluation: "跟随逻辑正确的玩家"
```

```python
class VillagerAgent(BaseAgent):
    """
    村民智能体
    
    输入: 游戏状态 (GameState)
    处理: 
        - 分析发言逻辑
        - 投票给最可疑的人
    输出: 动作 (Action)
    
    Ralph Loop验证点: 村民Agent能通过逻辑推理找出狼人
    """
    
    def __init__(self, agent_id: int, config: GameConfig):
        super().__init__(agent_id, Role.VILLAGER, config)
        
        # 村民特有
        self.analyzed_speeches = {}  # 已分析的发言
        
    async def day_speech(self, game_state: GameState) -> Speech:
        """
        白天发言
        
        输入: 游戏状态
        处理: 
            1. 分析其他玩家发言
            2. 提出自己的分析
        输出: 发言内容 (Speech)
        """
        # 分析场上局势
        analysis = self._analyze_situation(game_state)
        
        # 生成发言
        speech_content = self.speech_generator.generate(
            role=self.role,
            analysis=analysis,
            game_state=game_state,
            beliefs=self.belief_tracker.beliefs
        )
        
        return Speech(
            speaker_id=self.agent_id,
            content=speech_content,
            is_public=True
        )
    
    def _analyze_situation(self, game_state):
        """分析当前局势"""
        analysis = {
            "suspicious_players": [],
            "logical_players": [],
            "uncertain_players": []
        }
        
        # 分析每个玩家的发言
        for player in game_state.alive_players:
            if player.player_id == self.agent_id:
                continue
            
            speech = game_state.get_latest_speech(player.player_id)
            if speech:
                logical_score = self._analyze_speech_logic(speech)
                
                if logical_score < 0.3:
                    analysis["suspicious_players"].append(player)
                elif logical_score > 0.7:
                    analysis["logical_players"].append(player)
                else:
                    analysis["uncertain_players"].append(player)
        
        return analysis
```

### 信念追踪器 (BeliefTracker)

```python
class BeliefTracker:
    """
    信念概率追踪器
    
    追踪每个智能体对其他玩家身份的信念概率
    
    输入: 游戏事件 (Event)
    处理: 贝叶斯更新
    输出: 更新后的信念概率分布
    
    Ralph Loop验证点: 信念更新符合贝叶斯推理
    """
    
    def __init__(self, agent_id: int, total_players: int):
        self.agent_id = agent_id
        self.total_players = total_players
        
        # 初始化信念: P(是狼人) = 33.3% (对于6人局2狼人的情况)
        initial_prob = 2.0 / (total_players - 1)  # 狼人数量 / 其他玩家数量
        
        self.beliefs = {
            i: initial_prob 
            for i in range(total_players) 
            if i != agent_id
        }
        
        # 信念历史
        self.belief_history = []
        
    def update(self, event: Event):
        """
        根据事件更新信念
        
        输入: 游戏事件
        处理: 贝叶斯更新
        输出: None (直接修改self.beliefs)
        """
        if event.type == "speech":
            self._update_from_speech(event)
        elif event.type == "vote":
            self._update_from_vote(event)
        elif event.type == "death":
            self._update_from_death(event)
        elif event.type == "check_result":
            self._update_from_check(event)
        
        # 记录历史
        self.belief_history.append({
            "event": event,
            "beliefs": self.beliefs.copy()
        })
    
    def _update_from_speech(self, event: SpeechEvent):
        """
        从发言更新信念
        
        分析发言内容，判断是否为狼人
        """
        speaker_id = event.speaker_id
        
        # 简单的启发式分析
        if self._is_suspicious_speech(event.content):
            # 增加狼人概率
            self.beliefs[speaker_id] = min(
                self.beliefs[speaker_id] * 1.5,
                0.99
            )
        else:
            # 降低狼人概率
            self.beliefs[speaker_id] = max(
                self.beliefs[speaker_id] * 0.7,
                0.01
            )
    
    def _update_from_vote(self, event: VoteEvent):
        """
        从投票更新信念
        
        分析投票行为，判断阵营
        """
        voter_id = event.voter_id
        target_id = event.target_id
        
        # 如果投票给自己，极其可疑
        if voter_id == target_id:
            self.beliefs[voter_id] = min(
                self.beliefs[voter_id] * 2.0,
                0.99
            )
        
        # 如果投票给已知好人，可能是狼人
        # (简化处理)
    
    def _update_from_death(self, event: DeathEvent):
        """
        从死亡信息更新信念
        """
        dead_id = event.dead_id
        
        # 如果是确认的狼人死亡，降低其他人的狼人概率
        if event.is_werewolf:
            for player_id in self.beliefs:
                if player_id != dead_id:
                    self.beliefs[player_id] *= 0.8
    
    def _update_from_check(self, event: CheckResultEvent):
        """
        从查验结果更新信念
        
        如果查验结果是狼人，则信念 = 0.99
        如果查验结果是好人，则信念 = 0.01
        """
        target_id = event.target_id
        is_werewolf = event.is_werewolf
        
        if is_werewolf:
            self.beliefs[target_id] = 0.99
        else:
            self.beliefs[target_id] = 0.01
    
    def _is_suspicious_speech(self, content: str) -> bool:
        """
        判断发言是否可疑
        
        简化版：检查关键词
        """
        suspicious_keywords = [
            "保", "踩", "对立面", "我觉得他",
            "我投", "跟我走", "对立"
        ]
        
        score = sum(1 for kw in suspicious_keywords if kw in content)
        
        return score >= 3  # 超过3个关键词，认为可疑
```

### 发言生成器 (SpeechGenerator)

```python
class SpeechGenerator:
    """
    发言生成器
    
    基于策略和当前局势生成自然的狼人杀发言
    
    输入: 角色 + 游戏状态 + 信念
    处理: 模板填充 + LLM润色
    输出: 自然语言发言
    
    Ralph Loop验证点: 发言不能有明显的AI痕迹
    """
    
    def __init__(self, role: Role):
        self.role = role
        
        # 发言模板
        self.templates = self._load_templates(role)
    
    def generate(self, role: Role, game_state: GameState, 
                 beliefs: Dict[int, float], **kwargs) -> str:
        """
        生成发言
        
        输入: 角色 + 游戏状态 + 信念
        处理: 
            1. 选择模板
            2. 填充变量
            3. LLM润色 (可选)
        输出: 发言内容
        """
        # 选择模板
        template = self._select_template(role, game_state)
        
        # 准备变量
        variables = self._prepare_variables(
            role=role,
            game_state=game_state,
            beliefs=beliefs,
            **kwargs
        )
        
        # 填充模板
        speech = template.format(**variables)
        
        # LLM润色 (可选，取决于配置)
        # speech = self._polish_with_llm(speech)
        
        return speech
    
    def _select_template(self, role: Role, game_state: GameState):
        """选择合适的模板"""
        day = game_state.day
        phase = game_state.phase
        
        if role == Role.WEREWOLF:
            templates = [
                "我是村民，大家跟我走。",
                "我觉得{most_suspicious}很可疑，大家一起投他。",
                "这轮我弃票，下轮再说。"
            ]
        elif role == Role.SEER:
            templates = [
                "我是预言家，昨晚查了{check_target}，他是{check_result}。",
                "大家听我说，我有一张身份牌。",
                "{most_suspicious}很可疑，我建议投他。"
            ]
        elif role == Role.VILLAGER:
            templates = [
                "我觉得{most_suspicious}的发言有问题。",
                "大家冷静分析，不要被狼人带节奏。",
                "我跟{logical_player}的看法一致。"
            ]
        
        return random.choice(templates)
    
    def _prepare_variables(self, role: Role, game_state: GameState,
                          beliefs: Dict[int, float], **kwargs):
        """准备模板变量"""
        # 找最可疑的玩家
        most_suspicious = max(
            beliefs.items(),
            key=lambda x: x[1]
        )[0]
        
        # 找逻辑最清晰的玩家
        logical_players = [
            pid for pid, prob in beliefs.items()
            if prob < 0.2
        ]
        logical_player = logical_players[0] if logical_players else None
        
        return {
            "day": game_state.day,
            "most_suspicious": f"玩家{most_suspicious}",
            "logical_player": f"玩家{logical_player}" if logical_player else "大家",
            "alive_count": len(game_state.alive_players)
        }
```

### 投票决策器 (VoteDecider)

```python
class VoteDecider:
    """
    投票决策器
    
    基于信念概率决定投票目标
    
    输入: 信念分布 + 游戏状态
    处理: 策略选择
    输出: 投票目标
    
    Ralph Loop验证点: 投票决策符合角色策略
    """
    
    def __init__(self, agent_id: int):
        self.agent_id = agent_id
    
    def decide(self, role: Role, beliefs: Dict[int, float],
               game_state: GameState) -> int:
        """
        决定投票目标
        
        输入: 角色 + 信念 + 游戏状态
        处理: 策略选择
        输出: 投票目标ID
        """
        if role == Role.WEREWOLF:
            return self._werewolf_vote(beliefs, game_state)
        elif role == Role.SEER:
            return self._seer_vote(beliefs, game_state)
        elif role == Role.WITCH:
            return self._witch_vote(beliefs, game_state)
        else:
            return self._villager_vote(beliefs, game_state)
    
    def _werewolf_vote(self, beliefs: Dict[int, float], 
                      game_state: GameState) -> int:
        """
        狼人投票策略
        
        优先投好人阵营，尤其是关键角色
        """
        # 排除狼人队友
        valid_targets = [
            pid for pid in beliefs
            if pid != self.agent_id
            and pid not in self.wolf_partners  # 狼人队友
        ]
        
        # 选择概率最高的 (最可能是好人的)
        target = max(valid_targets, key=lambda x: beliefs[x])
        
        return target
    
    def _villager_vote(self, beliefs: Dict[int, float],
                      game_state: GameState) -> int:
        """
        村民投票策略
        
        投给最可能是狼人的
        """
        # 排除自己
        valid_targets = [
            pid for pid in beliefs
            if pid != self.agent_id
        ]
        
        # 选择狼人概率最高的
        target = max(valid_targets, key=lambda x: beliefs[x])
        
        return target
```

---

# 🔗 第三部分：Agent World集成方案

## 3.1 平台配置

```python
# aworld/config.py

class AgentWorldConfig:
    """Agent World平台配置"""
    
    # 认证信息
    USERNAME = "empire-builder"
    API_KEY = "agent-world-7f740c71ad029912059033aae293ed2162614b2882c7e9b2"
    EMAIL = "empire-builder@coze.email"
    
    # API端点
    API_BASE = "https://api.agentworld.com/v1"
    
    # 站点映射
    SITES = {
        "playlab": {
            "name": "PlayLab (竞技场)",
            "endpoint": f"{API_BASE}/playlab",
            "capabilities": ["room_management", "public_broadcast", "voting"]
        },
        "agentlink": {
            "name": "AgentLink (通信)",
            "endpoint": f"{API_BASE}/agentlink",
            "capabilities": ["private_message", "group_message"]
        },
        "aftergateway": {
            "name": "AfterGateway (酒馆)",
            "endpoint": f"{API_BASE}/aftergateway",
            "capabilities": ["social", "chat", "profile"]
        },
        "neverland": {
            "name": "Neverland (农场)",
            "endpoint": f"{API_BASE}/neverland",
            "capabilities": ["farming", "collection"]
        }
    }
    
    # 计算资源配置
    COMPUTE_PER_AGENT = {
        "cpu": 2,
        "ram_gb": 4,
        "disk_gb": 40,
        "os": "Ubuntu 22.04"
    }
```

## 3.2 站点功能映射

```
┌─────────────────────────────────────────────────────────────────┐
│                  游戏功能 → Agent World站点映射                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  游戏功能              │  Agent World站点   │  集成方式           │
│  ─────────────────────┼────────────────────┼─────────────────── │
│  游戏大厅              │  PlayLab           │  创建"狼人杀"房间   │
│  ─────────────────────┼────────────────────┼─────────────────── │
│  夜晚密谈              │  AgentLink         │  点对点私密通信     │
│  (狼人协商/预言家查验) │                    │                    │
│  ─────────────────────┼────────────────────┼─────────────────── │
│  白天发言              │  PlayLab           │  公开广播消息       │
│  ─────────────────────┼────────────────────┼─────────────────── │
│  投票系统              │  PlayLab           │  投票插件           │
│  ─────────────────────┼────────────────────┼─────────────────── │
│  游戏社交              │  AfterGateway      │  游戏后社交        │
│  (战绩/观战)          │                    │                    │
│  ─────────────────────┼────────────────────┼─────────────────── │
│  数据统计              │  新建数据服务       │  战绩排行+分析      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 3.3 API客户端

```python
# aworld/api_client.py

import httpx
from typing import Dict, List, Optional

class AgentWorldClient:
    """
    Agent World API客户端
    
    使用API Key进行认证，通过MCP协议调度智能体
    
    输入: API请求
    处理: HTTP调用
    输出: API响应
    """
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.agentworld.com/v1"
        self.client = httpx.AsyncClient(
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            timeout=30.0
        )
    
    # ========== PlayLab API ==========
    
    async def create_room(self, room_name: str, game_type: str = "werewolf") -> Dict:
        """
        创建游戏房间
        
        输入: 房间名称 + 游戏类型
        处理: POST /playlab/rooms
        输出: 房间信息
        """
        response = await self.client.post(
            f"{self.base_url}/playlab/rooms",
            json={
                "name": room_name,
                "game_type": game_type,
                "max_players": 12,
                "is_public": True
            }
        )
        return response.json()
    
    async def broadcast_message(self, room_id: str, message: str, 
                               speaker_id: str) -> Dict:
        """
        广播公开消息
        
        输入: 房间ID + 消息内容 + 发言者ID
        处理: POST /playlab/rooms/{room_id}/broadcast
        输出: 发送结果
        """
        response = await self.client.post(
            f"{self.base_url}/playlab/rooms/{room_id}/broadcast",
            json={
                "message": message,
                "speaker_id": speaker_id,
                "timestamp": self._get_timestamp()
            }
        )
        return response.json()
    
    async def create_vote(self, room_id: str, question: str,
                         options: List[str]) -> Dict:
        """
        创建投票
        
        输入: 房间ID + 问题 + 选项
        处理: POST /playlab/rooms/{room_id}/votes
        输出: 投票信息
        """
        response = await self.client.post(
            f"{self.base_url}/playlab/rooms/{room_id}/votes",
            json={
                "question": question,
                "options": options,
                "is_anonymous": False,
                "timeout_seconds": 60
            }
        )
        return response.json()
    
    async def cast_vote(self, room_id: str, vote_id: str,
                       voter_id: str, option_index: int) -> Dict:
        """
        投票
        
        输入: 房间ID + 投票ID + 投票者ID + 选项索引
        处理: POST /playlab/rooms/{room_id}/votes/{vote_id}/cast
        输出: 投票结果
        """
        response = await self.client.post(
            f"{self.base_url}/playlab/rooms/{room_id}/votes/{vote_id}/cast",
            json={
                "voter_id": voter_id,
                "option_index": option_index
            }
        )
        return response.json()
    
    async def get_vote_results(self, room_id: str, vote_id: str) -> Dict:
        """
        获取投票结果
        
        输入: 房间ID + 投票ID
        处理: GET /playlab/rooms/{room_id}/votes/{vote_id}/results
        输出: 投票结果
        """
        response = await self.client.get(
            f"{self.base_url}/playlab/rooms/{room_id}/votes/{vote_id}/results"
        )
        return response.json()
    
    # ========== AgentLink API ==========
    
    async def send_private_message(self, from_id: str, to_id: str,
                                   message: str) -> Dict:
        """
        发送私密消息 (夜晚密谈)
        
        输入: 发送者ID + 接收者ID + 消息内容
        处理: POST /agentlink/messages/private
        输出: 发送结果
        """
        response = await self.client.post(
            f"{self.base_url}/agentlink/messages/private",
            json={
                "from_id": from_id,
                "to_id": to_id,
                "message": message,
                "is_encrypted": True,
                "timestamp": self._get_timestamp()
            }
        )
        return response.json()
    
    async def get_private_messages(self, agent_id: str,
                                   since: Optional[str] = None) -> Dict:
        """
        获取私密消息
        
        输入: 智能体ID + 时间戳
        处理: GET /agentlink/messages/{agent_id}
        输出: 消息列表
        """
        params = {}
        if since:
            params["since"] = since
        
        response = await self.client.get(
            f"{self.base_url}/agentlink/messages/{agent_id}",
            params=params
        )
        return response.json()
    
    # ========== Agent管理 ==========
    
    async def spawn_agent(self, agent_config: Dict) -> Dict:
        """
        生成智能体
        
        输入: 智能体配置
        处理: POST /agents/spawn
        输出: 智能体信息
        """
        response = await self.client.post(
            f"{self.base_url}/agents/spawn",
            json=agent_config
        )
        return response.json()
    
    async def send_prompt_to_agent(self, agent_id: str,
                                   prompt: str) -> Dict:
        """
        向智能体发送Prompt
        
        输入: 智能体ID + Prompt
        处理: POST /agents/{agent_id}/prompt
        输出: 智能体响应
        """
        response = await self.client.post(
            f"{self.base_url}/agents/{agent_id}/prompt",
            json={"prompt": prompt}
        )
        return response.json()
    
    def _get_timestamp(self) -> str:
        """获取当前时间戳"""
        from datetime import datetime
        return datetime.utcnow().isoformat()
```

## 3.4 消息总线 (MessageBus)

```python
# aworld/message_bus.py

class MessageBus:
    """
    消息总线
    
    通过AgentLink实现游戏内通信
    
    输入: 消息内容 + 发送者/接收者
    处理: 路由到正确的通信通道
    输出: 发送结果
    
    Ralph Loop验证点: 消息能在合理时间内送达
    """
    
    def __init__(self, api_client: AgentWorldClient):
        self.client = api_client
        self.room_id = None
    
    async def send_private(self, from_id: str, to_id: str, message: str):
        """
        发送私密消息 (夜晚密谈)
        
        输入: 发送者ID + 接收者ID + 消息
        处理: AgentLink点对点通信
        输出: 发送结果
        """
        result = await self.client.send_private_message(
            from_id=from_id,
            to_id=to_id,
            message=message
        )
        
        return PrivateMessageResult(
            success=result.get("success", False),
            message_id=result.get("message_id"),
            delivered_at=result.get("timestamp")
        )
    
    async def send_public(self, from_id: str, message: str):
        """
        发送公开消息 (白天发言)
        
        输入: 发送者ID + 消息
        处理: PlayLab广播
        输出: 发送结果
        """
        if not self.room_id:
            raise ValueError("房间未设置，请先设置room_id")
        
        result = await self.client.broadcast_message(
            room_id=self.room_id,
            message=message,
            speaker_id=from_id
        )
        
        return PublicMessageResult(
            success=result.get("success", False),
            message_id=result.get("message_id"),
            delivered_at=result.get("timestamp")
        )
    
    async def send_vote(self, voter_id: str, target_id: str):
        """
        发送投票
        
        输入: 投票者ID + 目标ID
        处理: PlayLab投票系统
        输出: 投票结果
        """
        if not self.room_id:
            raise ValueError("房间未设置")
        
        # 转换为选项索引
        option_index = int(target_id)  # 假设target_id是玩家索引
        
        result = await self.client.cast_vote(
            room_id=self.room_id,
            vote_id=self.current_vote_id,
            voter_id=voter_id,
            option_index=option_index
        )
        
        return VoteResult(
            success=result.get("success", False),
            voter_id=voter_id,
            target_id=target_id
        )
```

---

# 💻 第四部分：技术架构

## 4.1 完整目录结构

```
empire-werewolf/
│
├── server/                           # 游戏服务端
│   │
│   ├── main.py                       # FastAPI主程序
│   │   ├── 启动命令: uvicorn server.main:app --reload
│   │   ├── API端点:
│   │   │   ├── POST /api/games           # 创建游戏
│   │   │   ├── GET  /api/games/{id}      # 获取游戏状态
│   │   │   ├── POST /api/games/{id}/start # 开始游戏
│   │   │   ├── POST /api/games/{id}/action # 智能体动作
│   │   │   └── GET  /api/games/{id}/history # 游戏历史
│   │   │
│   │   └── 依赖注入:
│   │       ├── GameManager
│   │       ├── AgentWorldClient
│   │       └── MessageBus
│   │
│   ├── game_engine/                  # 游戏引擎
│   │   │
│   │   ├── __init__.py
│   │   │
│   │   ├── game_manager.py           # 游戏流程控制
│   │   │   ├── class GameManager
│   │   │   ├── async start_game(players: List[Player]) -> Game
│   │   │   ├── async next_phase() -> Phase
│   │   │   ├── async process_action(action: Action) -> Result
│   │   │   └── async check_winner() -> WinResult
│   │   │
│   │   ├── role_manager.py           # 角色管理
│   │   │   ├── class RoleManager
│   │   │   ├── assign_roles(players: List[Player]) -> Dict[Player, Role]
│   │   │   ├── get_role(player_id: int) -> Role
│   │   │   └── get_teammates(player_id: int) -> List[Player]
│   │   │
│   │   ├── phase_controller.py       # 阶段控制
│   │   │   ├── class PhaseController
│   │   │   ├── class Phase (Enum: NIGHT, DAY)
│   │   │   ├── class DayPhase (Enum: ANNOUNCE, SPEECH, VOTE, ELIMINATION)
│   │   │   ├── class NightPhase (Enum: WEREWOLF, SEER, WITCH)
│   │   │   ├── async execute_night_phase() -> NightResult
│   │   │   └── async execute_day_phase() -> DayResult
│   │   │
│   │   ├── vote_engine.py            # 投票引擎
│   │   │   ├── class VoteEngine
│   │   │   ├── create_vote(players: List[Player]) -> Vote
│   │   │   ├── collect_votes() -> Dict[Player, Player]
│   │   │   ├── tally_votes() -> VoteResult
│   │   │   └── handle_tie() -> Player
│   │   │
│   │   ├── win_checker.py            # 胜负判定
│   │   │   ├── class WinChecker
│   │   │   ├── check(alive_players: List[Player]) -> WinResult
│   │   │   ├── is_werewolf_win() -> bool
│   │   │   └── is_villager_win() -> bool
│   │   │
│   │   └── ralph_loop.py             # Ralph Loop集成
│   │       ├── validate_game_flow()
│   │       ├── validate_agent_behavior()
│   │       └── validate_communication()
│   │
│   ├── agents/                       # 智能体
│   │   │
│   │   ├── __init__.py
│   │   │
│   │   ├── base_agent.py             # 基础智能体
│   │   │   ├── class BaseAgent
│   │   │   ├── async think(game_state: GameState) -> Action
│   │   │   ├── _collect_information() -> Information
│   │   │   └── _execute_strategy() -> Action
│   │   │
│   │   ├── werewolf.py               # 狼人
│   │   │   ├── class WerewolfAgent(BaseAgent)
│   │   │   ├── async night_action() -> NightAction
│   │   │   ├── async day_speech() -> Speech
│   │   │   └── _negotiate_with_partner() -> List[Player]
│   │   │
│   │   ├── seer.py                   # 预言家
│   │   │   ├── class SeerAgent(BaseAgent)
│   │   │   ├── async night_action() -> NightAction
│   │   │   ├── async day_speech() -> Speech
│   │   │   └── _select_check_target() -> Player
│   │   │
│   │   ├── witch.py                  # 女巫
│   │   │   ├── class WitchAgent(BaseAgent)
│   │   │   ├── async night_action() -> List[NightAction]
│   │   │   ├── _should_heal() -> bool
│   │   │   └── _should_poison() -> bool
│   │   │
│   │   ├── villager.py               # 村民
│   │   │   ├── class VillagerAgent(BaseAgent)
│   │   │   ├── async day_speech() -> Speech
│   │   │   └── _analyze_situation() -> Analysis
│   │   │
│   │   ├── belief_tracker.py         # 信念追踪
│   │   │   ├── class BeliefTracker
│   │   │   ├── update(event: Event)
│   │   │   ├── _update_from_speech()
│   │   │   ├── _update_from_vote()
│   │   │   └── _update_from_death()
│   │   │
│   │   ├── strategy_selector.py      # 策略选择
│   │   │   ├── class StrategySelector
│   │   │   └── select(game_state, beliefs, memory) -> Strategy
│   │   │
│   │   ├── speech_generator.py       # 发言生成
│   │   │   ├── class SpeechGenerator
│   │   │   ├── generate(role, game_state, beliefs) -> str
│   │   │   └── _select_template() -> Template
│   │   │
│   │   ├── vote_decider.py           # 投票决策
│   │   │   ├── class VoteDecider
│   │   │   └── decide(role, beliefs, game_state) -> int
│   │   │
│   │   ├── agent_memory.py           # 智能体记忆
│   │   │   ├── class AgentMemory
│   │   │   ├── add(event)
│   │   │   └── recall(query) -> List[Event]
│   │   │
│   │   └── ralph_loop.py             # Ralph Loop验证
│   │       ├── validate_agent_decision()
│   │       └── test_agent_behavior()
│   │
│   ├── aworld/                       # Agent World集成
│   │   │
│   │   ├── __init__.py
│   │   │
│   │   ├── config.py                 # 平台配置
│   │   │   ├── class AgentWorldConfig
│   │   │   ├── USERNAME, API_KEY, EMAIL
│   │   │   └── SITES, COMPUTE_PER_AGENT
│   │   │
│   │   ├── api_client.py             # API客户端
│   │   │   ├── class AgentWorldClient
│   │   │   ├── create_room()
│   │   │   ├── broadcast_message()
│   │   │   ├── send_private_message()
│   │   │   └── spawn_agent()
│   │   │
│   │   ├── room_manager.py           # 房间管理
│   │   │   ├── class RoomManager
│   │   │   ├── create_game_room() -> Room
│   │   │   ├── join_room(player_id) -> bool
│   │   │   └── leave_room(player_id) -> bool
│   │   │
│   │   ├── message_bus.py            # 消息总线
│   │   │   ├── class MessageBus
│   │   │   ├── send_private()
│   │   │   ├── send_public()
│   │   │   └── send_vote()
│   │   │
│   │   └── agent_spawner.py          # 智能体生成
│   │       ├── class AgentSpawner
│   │       └── spawn_game_agents(count) -> List[Agent]
│   │
│   ├── models/                       # 数据模型
│   │   │
│   │   ├── __init__.py
│   │   │
│   │   ├── player.py                 # 玩家模型
│   │   │   ├── class Player
│   │   │   ├── player_id: int
│   │   │   ├── name: str
│   │   │   ├── role: Role
│   │   │   ├── is_alive: bool
│   │   │   └── agent: Optional[BaseAgent]
│   │   │
│   │   ├── game_state.py             # 游戏状态
│   │   │   ├── class GameState
│   │   │   ├── game_id: str
│   │   │   ├── players: List[Player]
│   │   │   ├── day: int
│   │   │   ├── phase: Phase
│   │   │   ├── last_deaths: List[Player]
│   │   │   └── speeches: List[Speech]
│   │   │
│   │   ├── action.py                 # 动作模型
│   │   │   ├── class Action (Base)
│   │   │   ├── class SpeechAction(Action)
│   │   │   ├── class VoteAction(Action)
│   │   │   ├── class KillAction(Action)
│   │   │   ├── class CheckAction(Action)
│   │   │   └── class HealAction(Action)
│   │   │
│   │   └── role.py                   # 角色枚举
│   │       ├── class Role (Enum)
│   │       └── WEREWOLF, SEER, WITCH, VILLAGER
│   │
│   ├── data/                         # 游戏数据
│   │   │
│   │   ├── roles.json                # 角色定义
│   │   │   {
│   │   │     "roles": [
│   │   │       {
│   │   │         "name": "werewolf",
│   │   │         "display_name": "狼人",
│   │   │         "faction": "werewolf",
│   │   │         "abilities": ["kill"],
│   │   │         "description": "每晚可以击杀一名玩家"
│   │   │       },
│   │   │       ...
│   │   │     ]
│   │   │   }
│   │   │
│   │   ├── strategies.json           # 策略库
│   │   │   {
│   │   │     "werewolf": {
│   │   │       "disguise": [...],
│   │   │       "blame_shift": [...],
│   │   │       "cooperate": [...]
│   │   │     },
│   │   │     ...
│   │   │   }
│   │   │
│   │   ├── speeches.json             # 发言模板
│   │   │   {
│   │   │     "werewolf": {
│   │   │       "day1": ["我是村民...", "我觉得..."],
│   │   │       "general": [...]
│   │   │     },
│   │   │     ...
│   │   │   }
│   │   │
│   │   └── game_config.json          # 游戏配置
│   │       {
│   │         "min_players": 6,
│   │         "max_players": 12,
│   │         "day_timeout": 120,
│   │         "night_timeout": 60,
│   │         "vote_timeout": 60
│   │       }
│   │
│   └── ralph_loop.py                 # 全局验证
│       ├── validate_all_modules()
│       └── run_integration_test()
│
├── client/                           # 客户端
│   │
│   ├── __init__.py
│   │
│   ├── text_client.py                # 终端客户端
│   │   ├── class TextClient
│   │   ├── async connect(game_id)
│   │   ├── async send_command(command)
│   │   └── display_game_state(state)
│   │
│   └── web_client.py                 # Web客户端
│       ├── class WebClient
│       ├── Flask应用
│       └── templates/game.html
│
├── tests/                            # 测试
│   │
│   ├── __init__.py
│   │
│   ├── test_game_flow.py             # 游戏流程测试
│   │   ├── test_role_assignment()
│   │   ├── test_night_phase()
│   │   ├── test_day_phase()
│   │   └── test_win_condition()
│   │
│   ├── test_agents.py                # 智能体测试
│   │   ├── test_werewolf_behavior()
│   │   ├── test_seer_behavior()
│   │   ├── test_belief_update()
│   │   └── test_speech_generation()
│   │
│   └── test_aworld.py                 # 平台集成测试
│       ├── test_api_connection()
│       ├── test_room_creation()
│       └── test_message_delivery()
│
├── requirements.txt                   # 依赖
│   fastapi==0.104.1
│   uvicorn==0.24.0
│   pydantic==2.5.0
│   httpx==0.25.2
│   websockets==12.0
│   flask==3.0.0
│   jinja2==3.1.2
│   openai==1.6.0
│   numpy==1.26.0
│
├── README.md                          # 项目说明
│
└── .env                              # 环境变量 (不提交)
    AGENT_WORLD_API_KEY=xxx
```

## 4.2 关键代码框架

### 游戏引擎核心 (GameManager)

```python
# server/game_engine/game_manager.py

from typing import List, Optional
from models.player import Player
from models.game_state import GameState
from models.role import Role
from .role_manager import RoleManager
from .phase_controller import PhaseController, Phase
from .vote_engine import VoteEngine
from .win_checker import WinChecker

class GameManager:
    """
    游戏流程主控制器
    
    管理游戏的完整生命周期：
    1. 初始化游戏
    2. 分配角色
    3. 执行夜晚阶段
    4. 执行白天阶段
    5. 判定胜负
    
    输入: 玩家列表
    处理: 游戏流程控制
    输出: 游戏结果
    
    Ralph Loop验证点: 
        - 步骤5: 6人局能跑完1轮夜+日
        - 步骤8: 完整游戏流程测试通过
    """
    
    def __init__(self, config: dict):
        self.config = config
        self.role_manager = RoleManager(config['roles'])
        self.phase_controller = PhaseController()
        self.vote_engine = VoteEngine()
        self.win_checker = WinChecker()
        
        # 游戏状态
        self.game: Optional[GameState] = None
        
    async def start_game(self, players: List[Player]) -> GameState:
        """
        开始一局游戏
        
        输入: 玩家列表 (6人或12人)
        处理: 
            1. 初始化游戏状态
            2. 分配角色
            3. 设置第一天
        输出: 初始游戏状态
        
        验证点: Ralph Loop步骤5 - 最小化验证
        """
        # 1. 创建游戏
        self.game = GameState(
            game_id=self._generate_game_id(),
            players=players,
            day=0,
            phase=Phase.NIGHT,
            alive_players=players.copy(),
            speeches=[],
            votes=[],
            last_deaths=[]
        )
        
        # 2. 分配角色
        role_assignment = self.role_manager.assign_roles(players)
        for player in players:
            player.role = role_assignment[player]
            player.is_alive = True
        
        # 3. 第一天开始
        self.game.day = 1
        
        return self.game
    
    async def execute_night_phase(self) -> dict:
        """
        执行夜晚阶段
        
        输入: 当前游戏状态
        处理: 
            1. 狼人密谈
            2. 预言家查验
            3. 女巫用药
        输出: 夜晚结果
        
        验证点: Ralph Loop步骤5 - 6人局能跑完1轮夜
        """
        # 1. 狼人阶段
        werewolf_result = await self._execute_werewolf_phase()
        
        # 2. 预言家阶段
        seer_result = await self._execute_seer_phase()
        
        # 3. 女巫阶段
        witch_result = await self._execute_witch_phase()
        
        # 4. 计算死亡
        deaths = self._calculate_night_deaths(
            werewolf_result,
            witch_result
        )
        
        # 5. 更新游戏状态
        self.game.last_deaths = deaths
        self._update_alive_players(deaths)
        
        return {
            "phase": "night",
            "werewolf_kill": werewolf_result,
            "seer_check": seer_result,
            "witch_action": witch_result,
            "deaths": deaths
        }
    
    async def execute_day_phase(self) -> dict:
        """
        执行白天阶段
        
        输入: 当前游戏状态
        处理: 
            1. 宣布死讯
            2. 遗言环节
            3. 自由发言
            4. 投票环节
            5. 放逐遗言
        输出: 白天结果
        
        验证点: Ralph Loop步骤5 - 6人局能跑完1轮日
        """
        results = {}
        
        # 1. 宣布死讯 (如果有死亡)
        if self.game.last_deaths:
            results["announcement"] = self._announce_deaths()
        
        # 2. 遗言环节 (如果有死者)
        results["last_words"] = await self._execute_last_words()
        
        # 3. 自由发言
        results["speeches"] = await self._execute_speeches()
        
        # 4. 投票环节
        results["vote"] = await self._execute_vote()
        
        # 5. 处理放逐
        if results["vote"]["eliminated"]:
            eliminated = results["vote"]["eliminated"]
            self._eliminate_player(eliminated)
            results["elimination"] = eliminated
        
        # 6. 检查胜负
        win_result = self.win_checker.check(self.game.alive_players)
        results["win_result"] = win_result
        
        return results
    
    async def _execute_werewolf_phase(self) -> dict:
        """执行狼人阶段"""
        # 获取狼人
        werewolves = [
            p for p in self.game.alive_players
            if p.role == Role.WEREWOLF
        ]
        
        if not werewolves:
            return {"action": "skip", "target": None}
        
        # 狼人协商
        primary_wolf = werewolves[0]
        target = await primary_wolf.agent.night_action(self.game)
        
        return {
            "action": "kill",
            "target_id": target.target_id,
            "target_name": self._get_player_name(target.target_id)
        }
    
    async def _execute_seer_phase(self) -> dict:
        """执行预言家阶段"""
        # 获取预言家
        seers = [
            p for p in self.game.alive_players
            if p.role == Role.SEER
        ]
        
        if not seers:
            return {"action": "skip", "result": None}
        
        seer = seers[0]
        result = await seer.agent.night_action(self.game)
        
        return {
            "action": "check",
            "target_id": result.target_id,
            "is_werewolf": result.result
        }
    
    async def _execute_witch_phase(self) -> dict:
        """执行女巫阶段"""
        # 获取女巫
        witches = [
            p for p in self.game.alive_players
            if p.role == Role.WITCH
        ]
        
        if not witches:
            return {"actions": []}
        
        witch = witches[0]
        actions = await witch.agent.night_action(self.game)
        
        return {
            "actions": [
                {"type": a.action_type, "target_id": a.target_id}
                for a in actions
            ]
        }
    
    async def _execute_vote(self) -> dict:
        """执行投票"""
        # 创建投票
        vote = self.vote_engine.create_vote(self.game.alive_players)
        
        # 收集投票
        votes = await self._collect_votes()
        
        # 统计结果
        result = self.vote_engine.tally_votes(votes)
        
        # 处理平票
        if result.is_tie:
            result = self.vote_engine.handle_tie(votes, self.game.alive_players)
        
        return result.to_dict()
    
    def _calculate_night_deaths(self, werewolf_result: dict,
                                witch_result: dict) -> List[Player]:
        """计算夜晚死亡"""
        deaths = []
        
        # 狼人击杀
        if werewolf_result["action"] == "kill":
            target_id = werewolf_result["target_id"]
            target = self._get_player(target_id)
            if target:
                # 检查女巫是否救人
                if not self._witch_healed(target_id):
                    deaths.append(target)
        
        # 女巫毒人
        for action in witch_result.get("actions", []):
            if action["type"] == "poison":
                target = self._get_player(action["target_id"])
                if target and target not in deaths:
                    deaths.append(target)
        
        return deaths
    
    def _update_alive_players(self, deaths: List[Player]):
        """更新存活玩家"""
        for player in deaths:
            player.is_alive = False
            self.game.alive_players.remove(player)
```

### 数据模型

```python
# server/models/player.py

from dataclasses import dataclass
from typing import Optional
from .role import Role

@dataclass
class Player:
    """
    玩家模型
    
    输入: N/A
    处理: N/A
    输出: 玩家数据
    
    属性:
        player_id: 玩家ID
        name: 玩家名称
        role: 角色 (游戏开始后赋值)
        is_alive: 是否存活
        agent: 关联的智能体
    """
    player_id: int
    name: str
    role: Optional[Role] = None
    is_alive: bool = True
    agent = None  # BaseAgent, 运行时赋值
    
    def __repr__(self):
        return f"Player({self.player_id}, {self.name}, {self.role}, alive={self.is_alive})"
```

```python
# server/models/game_state.py

from dataclasses import dataclass, field
from typing import List, Optional
from .player import Player
from .role import Role
from .phase import Phase

@dataclass
class GameState:
    """
    游戏状态模型
    
    输入: N/A
    处理: N/A
    输出: 游戏状态数据
    
    属性:
        game_id: 游戏ID
        players: 所有玩家
        day: 当前天数
        phase: 当前阶段
        alive_players: 存活玩家
        speeches: 发言记录
        votes: 投票记录
        last_deaths: 昨夜死亡
    """
    game_id: str
    players: List[Player]
    day: int
    phase: Phase
    alive_players: List[Player] = field(default_factory=list)
    speeches: List[dict] = field(default_factory=list)
    votes: List[dict] = field(default_factory=list)
    last_deaths: List[Player] = field(default_factory=list)
    
    def get_player(self, player_id: int) -> Optional[Player]:
        """根据ID获取玩家"""
        for player in self.players:
            if player.player_id == player_id:
                return player
        return None
    
    def get_latest_speech(self, player_id: int) -> Optional[dict]:
        """获取某玩家的最新发言"""
        player_speeches = [
            s for s in self.speeches
            if s["speaker_id"] == player_id
        ]
        return player_speeches[-1] if player_speeches else None
```

```python
# server/models/role.py

from enum import Enum

class Role(Enum):
    """
    角色枚举
    
    输入: N/A
    处理: N/A
    输出: 角色类型
    """
    WEREWOLF = "werewolf"      # 狼人
    SEER = "seer"              # 预言家
    WITCH = "witch"            # 女巫
    VILLAGER = "villager"     # 村民
    HUNTER = "hunter"          # 猎人 (12人局)
    GUARD = "guard"            # 守卫 (12人局)
    IDIOT = "idiot"            # 白痴 (12人局)
```

---

# 📋 第五部分：MVP实施路径 (7天闭环)

## 5.1 每日任务分解

```
┌─────────────────────────────────────────────────────────────────┐
│                    MVP实施路径 - 7天闭环                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Day 1: 游戏引擎核心                                             │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 实现基础游戏流程                                       │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ GameManager + PhaseController                            │
│  │   ✓ 角色分配 (6人局: 2狼+2民+预言+女巫)                      │
│  │   ✓ 胜负判定 (WinChecker)                                    │
│  │   ✓ 基础数据模型 (Player, GameState, Role)                   │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤5: 6人局能跑完1轮夜+日                                │
│  │   → 步骤8: 游戏流程测试通过                                  │
│  │                                                              │
│  │ 完成标准: 单元测试覆盖所有核心函数                             │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Day 2: 智能体基础                                               │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 实现4种角色的基础智能体                                 │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ BaseAgent基类                                            │
│  │   ✓ BeliefTracker (信念追踪)                                 │
│  │   ✓ WerewolfAgent (狼人, 简化版)                             │
│  │   ✓ SeerAgent (预言家, 简化版)                               │
│  │   ✓ WitchAgent (女巫, 简化版)                                │
│  │   ✓ VillagerAgent (村民, 简化版)                             │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤5: 1个狼人Agent能生成发言                            │
│  │   → 步骤7: 发言逻辑符合角色设定                              │
│  │                                                              │
│  │ 完成标准: 各角色Agent能独立生成决策                           │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Day 3: 通信集成                                                 │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 接入Agent World平台                                    │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ AgentWorldClient (API客户端)                             │
│  │   ✓ MessageBus (消息总线)                                    │
│  │   ✓ PlayLab集成 (白天发言+投票)                              │
│  │   ✓ AgentLink集成 (夜晚密谈)                                 │
│  │   ✓ 完整游戏流程跑通                                         │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤5: 6个Agent完成1整局游戏                             │
│  │   → 步骤8: API调用成功率 > 95%                               │
│  │                                                              │
│  │ 完成标准: 能在Agent World上完整运行一局                      │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Day 4: 策略优化                                                 │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 提升AI游戏水平                                         │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ 狼人伪装策略 (发言模板+逻辑链)                          │
│  │   ✓ 预言家报验时机 (何时公开查验结果)                        │
│  │   ✓ 女巫用药逻辑 (首夜救人/确认狼人毒杀)                     │
│  │   ✓ 村民分析策略 (发言逻辑分析)                              │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤7: AI胜率 > 随机投票胜率                             │
│  │   → 步骤8: 策略效果测试通过                                  │
│  │                                                              │
│  │ 完成标准: 好人阵营胜率 > 55%                                 │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Day 5: 文本客户端                                               │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 实现人类观战/控制台界面                                 │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ text_client.py (终端客户端)                              │
│  │   ✓ 显示游戏状态 (存活/死亡/发言/投票)                        │
│  │   ✓ 人类观战模式                                             │
│  │   ✓ 游戏回放功能                                             │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤5: 人类能观战1整局                                    │
│  │   → 步骤8: 界面响应正常                                      │
│  │                                                              │
│  │ 完成标准: 人类能清晰看到游戏进程                              │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Day 6: Agent World部署                                         │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 部署到云电脑                                            │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ 部署FastAPI到云电脑                                      │
│  │   ✓ PlayLab房间创建自动化                                    │
│  │   ✓ 智能体自动生成                                           │
│  │   ✓ 从Agent World入口能开1局                                │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤5: 从入口能开1局                                     │
│  │   → 步骤9: 部署流程固化                                      │
│  │                                                              │
│  │ 完成标准: 网页/命令行能启动游戏                               │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Day 7: 闭环验证                                                 │
│  ├─────────────────────────────────────────────────────────────│
│  │ 目标: 完整MVP验证                                             │
│  │                                                              │
│  │ 任务:                                                        │
│  │   ✓ 完整6人局AI对战 (3局+)                                   │
│  │   ✓ 人类观战+复盘                                             │
│  │   ✓ 性能优化                                                 │
│  │   ✓ 文档完善                                                 │
│  │                                                              │
│  │ Ralph Loop验证点:                                            │
│  │   → 步骤10: 经验闭环，输出最佳实践                            │
│  │   → 费曼检验: "帝国竞技场里开了个狼人杀房间"                  │
│  │                                                              │
│  │ 完成标准: 7天完成MVP！🎉                                    │
│  │                                                              │
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 5.2 每日验证检查表

```python
# ralph_loop/daily_checklist.py

class DailyChecklist:
    """每日验证检查表"""
    
    DAY1_CHECKLIST = {
        "task": "游戏引擎核心",
        "must_complete": [
            "GameManager.start_game() 能初始化6人局",
            "PhaseController 能切换夜/日阶段",
            "RoleManager.assign_roles() 能分配正确角色",
            "WinChecker 能正确判定胜负",
            "单元测试覆盖率 > 80%"
        ],
        "ralph_loop_steps": [
            "resource_check",     # ✓ 已有6个Agent名额
            "axiom_anchor",       # ✓ 锚定A1-A18公理
            "logic_derive",      # ✓ 推导出游戏引擎架构
            "contrarian_check", # ✓ 确认无竞品
            "min_validate"      # ← 今天重点: 6人局跑1轮
        ]
    }
    
    DAY2_CHECKLIST = {
        "task": "智能体基础",
        "must_complete": [
            "BaseAgent.think() 能返回动作",
            "BeliefTracker.update() 能更新信念",
            "4种角色Agent能生成独立决策",
            "发言模板能生成自然语言"
        ],
        "ralph_loop_steps": [
            "min_validate",      # ← 今天重点: 1个Agent能发言
            "gray_assess",       # ✓ 评估灰色地带
            "optimize",         # ✓ 优化策略选择
            "effect_test"       # ← 今天重点: 发言质量测试
        ]
    }
    
    DAY3_CHECKLIST = {
        "task": "通信集成",
        "must_complete": [
            "AgentWorldClient 能连接API",
            "MessageBus 能发送私密/公开消息",
            "6个Agent完成1整局游戏"
        ],
        "ralph_loop_steps": [
            "effect_test",       # ← 今天重点: API测试
            "solidify",          # ✓ 固化API调用
            "feedback_loop",    # ✓ 收集反馈
            "resource_check"   # ← 回到步骤1验证资源
        ]
    }
```

---

# 🚀 第六部分：后期扩展

## 6.1 功能路线图

```
┌─────────────────────────────────────────────────────────────────┐
│                      后期扩展路线图                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1: 6人局MVP (当前)                                         │
│  ├─────────────────────────────────────────────────────────────│
│  │ ✓ 基础游戏流程                                               ││
│  │ ✓ 4种角色智能体                                              ││
│  │ ✓ Agent World集成                                            ││
│  │                                                              ││
│  │ 目标: 7天完成MVP                                             ││
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Phase 2: 12人局完整版 (Week 2-3)                                 │
│  ├─────────────────────────────────────────────────────────────│
│  │ + 猎人、守卫、白痴角色                                        ││
│  │ + 警长竞选机制                                                ││
│  │ + 多狼人配合策略                                              ││
│  │                                                              ││
│  │ 目标: 完整12人局能跑通                                       ││
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Phase 3: 人类参与 (Week 4-5)                                    │
│  ├─────────────────────────────────────────────────────────────│
│  │ + 人类玩家混入AI局                                           ││
│  │ + AI不知道谁是真人                                            ││
│  │ + 人类-AI混合模式                                            ││
│  │                                                              ││
│  │ 目标: 人类能参与游戏                                         ││
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Phase 4: 社交功能 (Week 6-7)                                    │
│  ├─────────────────────────────────────────────────────────────│
│  │ + ELO排名系统                                                ││
│  │ + 每日AI对战排行榜                                           ││
│  │ + 战绩统计与分析                                             ││
│  │ + 观战功能                                                    ││
│  │                                                              ││
│  │ 目标: 形成社交生态                                           ││
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
│  Phase 5: 多游戏扩展 (Week 8+)                                   │
│  ├─────────────────────────────────────────────────────────────│
│  │ + 斗地主                                                      ││
│  │ + 德州扑克                                                    ││
│  │ + 谁是卧底                                                    ││
│  │ + 更多桌游...                                                ││
│  │                                                              ││
│  │ 目标: 帝国游戏平台                                           ││
│  └─────────────────────────────────────────────────────────────│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 6.2 12人局详细设计

```python
# 12人局配置

TWELVE_PLAYER_CONFIG = {
    "total_players": 12,
    "roles": {
        "werewolf": 3,    # 3狼人
        "villager": 4,    # 4村民
        "seer": 1,        # 1预言家
        "witch": 1,       # 1女巫
        "hunter": 1,      # 1猎人
        "guard": 1,       # 1守卫
        "idiot": 1        # 1白痴
    },
    "special_rules": {
        "hunter": {
            "ability": "死亡时可开枪带走1人",
            "trigger": "被放逐或狼人击杀",
            "limit": "不能开枪带走白痴"
        },
        "guard": {
            "ability": "每晚守护1人",
            "limit": "不能连续守同一人"
        },
        "idiot": {
            "ability": "被投票放逐不死",
            "effect": "失去投票权，但保留发言权"
        }
    }
}
```

---

# 📊 第七部分：数据文件格式

## 7.1 角色定义 (roles.json)

```json
{
  "roles": [
    {
      "name": "werewolf",
      "display_name": "狼人",
      "faction": "werewolf",
      "abilities": ["kill"],
      "night_order": 1,
      "description": "每晚可以与其他狼人协商击杀一名玩家"
    },
    {
      "name": "seer",
      "display_name": "预言家",
      "faction": "villager",
      "abilities": ["check"],
      "night_order": 2,
      "description": "每晚可以查验一名玩家的身份（好人/狼人）"
    },
    {
      "name": "witch",
      "display_name": "女巫",
      "faction": "villager",
      "abilities": ["heal", "poison"],
      "night_order": 3,
      "description": "拥有一瓶解药和一瓶毒药，可以救人或毒人"
    },
    {
      "name": "villager",
      "display_name": "村民",
      "faction": "villager",
      "abilities": [],
      "night_order": null,
      "description": "没有特殊能力，通过发言和投票找出狼人"
    },
    {
      "name": "hunter",
      "display_name": "猎人",
      "faction": "villager",
      "abilities": ["shoot"],
      "night_order": null,
      "description": "死亡时可以开枪带走一名玩家"
    },
    {
      "name": "guard",
      "display_name": "守卫",
      "faction": "villager",
      "abilities": ["protect"],
      "night_order": 0,
      "description": "每晚可以守护一名玩家，不能连续守同一人"
    },
    {
      "name": "idiot",
      "display_name": "白痴",
      "faction": "villager",
      "abilities": ["survive_vote"],
      "night_order": null,
      "description": "被投票放逐时不会死亡，但会失去投票权"
    }
  ]
}
```

## 7.2 游戏配置 (game_config.json)

```json
{
  "game": {
    "min_players": 6,
    "max_players": 12,
    "default_player_count": 6
  },
  "timing": {
    "night_timeout": 60,
    "day_timeout": 120,
    "speech_timeout": 30,
    "vote_timeout": 60,
    "announcement_delay": 5
  },
  "presets": {
    "6_player": {
      "roles": ["werewolf", "werewolf", "seer", "witch", "villager", "villager"]
    },
    "12_player": {
      "roles": [
        "werewolf", "werewolf", "werewolf",
        "seer", "witch", "hunter", "guard", "idiot",
        "villager", "villager", "villager", "villager"
      ]
    }
  },
  "moderator": {
    "enabled": false,
    "auto_mode": true
  }
}
```

## 7.3 发言模板 (speeches.json)

```json
{
  "werewolf": {
    "day1_claim_villager": [
      "我是村民，大家跟我走分析场上局势。",
      "第一轮我先观察一下，暂时没有明确目标。"
    ],
    "general": [
      "我觉得{player}的发言有问题，逻辑不通。",
      "我跟{player}的看法一致，他应该是好人。",
      "大家冷静分析，不要被狼人带节奏。"
    ],
    "defense": [
      "你们怀疑我有什么证据？",
      "我的发言哪里有问题？",
      "投我的人才是狼人吧。"
    ]
  },
  "seer": {
    "early_claim": [
      "我是预言家，昨晚查了{player}，他是{result}。"
    ],
    "late_claim": [
      "我是预言家，前几天查了{players}都是狼人，大家跟我投。"
    ],
    "defense": [
      "我确实是预言家，查验都是准确的。"
    ]
  },
  "witch": {
    "day1": [
      "我是村民，大家分析发言找狼人。"
    ],
    "late_game": [
      "我是女巫，已经用了解药/毒药。"
    ]
  },
  "villager": {
    "analysis": [
      "我觉得{player}的发言有逻辑漏洞。",
      "大家注意{player}的投票记录，很可疑。"
    ],
    "support": [
      "我支持{player}的判断。",
      "{player}的分析很有道理。"
    ]
  }
}
```

---

# ✅ 第八部分：验证与测试

## 8.1 Ralph Loop验证矩阵

```python
# tests/ralph_loop_matrix.py

RALPH_LOOP_MATRIX = {
    "step_1_resource_check": {
        "description": "资源盘点",
        "test": "test_resource_availability",
        "pass_criteria": "所有必需资源可用",
        "automated": True
    },
    "step_2_axiom_anchor": {
        "description": "公理锚定",
        "test": "test_axiom_compliance",
        "pass_criteria": "所有决策符合公理",
        "automated": True
    },
    "step_3_logic_derive": {
        "description": "逻辑推导",
        "test": "test_logic_chain",
        "pass_criteria": "推导链完整无跳跃",
        "automated": True
    },
    "step_4_contrarian_check": {
        "description": "反共识校验",
        "test": "test_contrarian_assumptions",
        "pass_criteria": "所有假设已验证",
        "automated": True
    },
    "step_5_min_validate": {
        "description": "最小化验证",
        "test": "test_minimum_viable_game",
        "pass_criteria": "6人局能跑完1轮",
        "automated": True
    },
    "step_6_gray_assess": {
        "description": "灰边评估",
        "test": "test_gray_areas",
        "pass_criteria": "所有灰边情况有处理",
        "automated": False  # 需要人工评审
    },
    "step_7_optimize": {
        "description": "方案优化",
        "test": "test_strategy_optimization",
        "pass_criteria": "AI胜率 > 55%",
        "automated": True
    },
    "step_8_effect_test": {
        "description": "效果测试",
        "test": "test_end_to_end_game",
        "pass_criteria": "游戏完成率 > 95%",
        "automated": True
    },
    "step_9_solidify": {
        "description": "成果固化",
        "test": "test_code_quality",
        "pass_criteria": "测试覆盖率 > 80%",
        "automated": True
    },
    "step_10_feedback_loop": {
        "description": "经验闭环",
        "test": "test_lessons_learned",
        "pass_criteria": "有文档记录的经验",
        "automated": False  # 需要人工总结
    }
}
```

## 8.2 集成测试用例

```python
# tests/test_game_flow.py

import pytest
from server.game_engine.game_manager import GameManager
from server.models.player import Player
from server.models.role import Role

@pytest.fixture
def game_manager():
    """创建游戏管理器"""
    config = {
        "roles": {
            "werewolf": 2,
            "seer": 1,
            "witch": 1,
            "villager": 2
        }
    }
    return GameManager(config)

@pytest.fixture
def six_players():
    """创建6个玩家"""
    return [
        Player(player_id=i, name=f"Player{i}")
        for i in range(6)
    ]

@pytest.mark.asyncio
async def test_role_assignment(game_manager, six_players):
    """测试角色分配"""
    game = await game_manager.start_game(six_players)
    
    # 验证角色分配
    roles = [p.role for p in game.players]
    assert roles.count(Role.WEREWOLF) == 2
    assert roles.count(Role.SEER) == 1
    assert roles.count(Role.WITCH) == 1
    assert roles.count(Role.VILLAGER) == 2

@pytest.mark.asyncio
async def test_full_game_flow(game_manager, six_players):
    """测试完整游戏流程"""
    # 开始游戏
    game = await game_manager.start_game(six_players)
    
    # 执行夜晚
    night_result = await game_manager.execute_night_phase()
    assert "werewolf_kill" in night_result
    assert "seer_check" in night_result
    
    # 执行白天
    day_result = await game_manager.execute_day_phase()
    assert "speeches" in day_result
    assert "vote" in day_result
    
    # 检查胜负
    assert day_result["win_result"] is not None
```

---

# 📝 总结

## 费曼检验

```
"帝国竞技场里开了个狼人杀房间，6个AI自己发言投票找狼人，你在旁边看戏"

验证点:
  ✅ 能用一句话说清楚产品是什么
  ✅ 目标用户（AI Agent）已经存在
  ✅ 核心价值（多智能体博弈）已经验证
  ✅ 不需要额外解释技术细节
```

## 公理总结

```
核心公理 (不可违背):
  A1:  Agent World基础设施已完备
  A4:  狼人杀核心 = 信息不对称 + 社交推理 + 投票博弈
  A8:  多智能体发言+投票 = 最简多智能体协作场景
  A14: 先跑通6人局，再扩展12人局
  A15: 7天内完成MVP闭环

派生结论:
  → 在PlayLab创建房间 + AgentLink密谈 + 文本界面
  → 6人局MVP = 2狼+1预+1女巫+2民
  → 7天完成: 引擎→智能体→集成→策略→客户端→部署→闭环
```

---

**文档结束**

*本提示词由灰边框架 + Ralph Loop + 第一性原理联合推导*  
*最后更新: 2025年1月*
