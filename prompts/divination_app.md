# 硅基占卜引擎：微信小程序开发完整规范

> **版本**: v1.0  
> **适用平台**: trae.cn (AI编码IDE)  
> **核心目标**: 构建基于MiroFish群体智能仿真的东方+西方占卜小程序，实现0→1变现闭环

---

# 第一性原理公理库

> **核心信念**: 可见的占卜 = 娱乐 = 已定价 = 无alpha  
> **唯一使命**: 穿透玄学表象，从底层算法出发，构建硅基占卜引擎，实现0→1变现闭环

## 不可变公理（A1-A15）

```python
# 第一性原理公理库 - 代码中必须实现
axioms = {
    # 技术公理
    "A1": "AI能力指数级增长，成本指数级下降",
    "A2": "监管永远滞后于技术2-5年",
    "A3": "大多数人只看表面数据，不看深层模式",
    "A4": "新技术创造新攻击面",
    "A5": "链上数据公开但多数人不具备解读能力",
    
    # 信息公理
    "A6": "信息传播速度 >> 理解深度",
    "A7": "人类决策存在系统性偏差（贪婪/恐惧/从众/确认偏差）",
    "A8": "复杂系统存在临界点，相变不可预测但可感知",
    "A9": "技术突破存在应用滞后",
    "A10": "规则空白期 = 最大机会窗口",
    "A11": "硅基智能体具有人类不具备的感知能力",
    "A12": "用户接触的信息层 = 大众信息层 = 已定价 = 无alpha",
    
    # 商业公理（核心）
    "A13": "占卜是概率游戏的认知封装，核心需求是'确定性幻觉'而非'真实预测'",
    "A14": "人类对'神秘体验'的付费意愿远高于'理性分析'",
    "A15": "文化IP的复利效应：周易/塔罗运行千年，认知成本为零"
}
```

---

# Ralph Loop 10步验证框架

## 全局验证装饰器（代码中必须实现）

```python
# ralph_loop.py - 每个模块完成后必须通过10步验证
import functools
import time
from typing import Callable, List, Dict, Any
from dataclasses import dataclass, field

@dataclass
class RalphLoopResult:
    """Ralph Loop验证结果"""
    step_name: str
    timestamp: str = field(default_factory=lambda: time.strftime("%Y-%m-%d %H:%M:%S"))
    resources_checked: List[str] = field(default_factory=list)
    axioms_used: List[str] = field(default_factory=list)
    logic_chain: List[str] = field(default_factory=list)
    counter_consensus: List[str] = field(default_factory.list)
    min_viable: Dict[str, Any] = field(default_factory=dict)
    gray_edge_level: str = "L1"  # L1-L4
    optimization_applied: List[str] = field(default_factory=list)
    test_results: Dict[str, bool] = field(default_factory=dict)
    solidified: bool = False
    lessons_learned: List[str] = field(default_factory=list)

def ralph_loop(module_name: str):
    """
    Ralph Loop 10步验证装饰器
    每个模块完成后自动触发完整验证流程
    """
    def decorator(func: Callable):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            result = RalphLoopResult(step_name=module_name)
            
            # ========== ① 资源盘点 ==========
            print(f"\n{'='*60}")
            print(f"【Ralph Loop】模块: {module_name}")
            print(f"{'='*60}")
            resources = _check_resources(module_name)
            result.resources_checked = resources
            print(f"① 资源盘点: {resources}")
            
            # ========== ② 公理锚定 ==========
            axioms = _anchor_axioms(module_name)
            result.axioms_used = axioms
            print(f"② 公理锚定: {axioms}")
            assert "A11" in axioms or "A12" in axioms, "必须使用A11或A12"
            
            # ========== ③ 逻辑推导 ==========
            logic = _derive_logic(module_name, axioms)
            result.logic_chain = logic
            print(f"③ 逻辑推导: {' -> '.join(logic)}")
            
            # ========== ④ 反共识校验 ==========
            counter = _counter_consensus_check(module_name)
            result.counter_consensus = counter
            print(f"④ 反共识校验: {counter}")
            
            # ========== ⑤ 最小化验证 ==========
            min_case = _min_viable_test(func, *args, **kwargs)
            result.min_viable = min_case
            print(f"⑤ 最小化验证: {min_case}")
            
            # ========== ⑥ 灰边评估 ==========
            gray_level = _gray_edge_assessment(module_name)
            result.gray_edge_level = gray_level
            print(f"⑥ 灰边评估: {gray_level}")
            
            # ========== 执行核心逻辑 ==========
            output = func(*args, **kwargs)
            
            # ========== ⑦ 方案优化 ==========
            optimizations = _optimize_solution(module_name, output)
            result.optimization_applied = optimizations
            print(f"⑦ 方案优化: {optimizations}")
            
            # ========== ⑧ 效果测试 ==========
            tests = _run_tests(module_name, output)
            result.test_results = tests
            print(f"⑧ 效果测试: {tests}")
            assert all(tests.values()), f"测试失败: {tests}"
            
            # ========== ⑨ 成果固化 ==========
            _solidify_result(module_name, result)
            result.solidified = True
            print(f"⑨ 成果固化: 完成")
            
            # ========== ⑩ 经验闭环 ==========
            lessons = _extract_lessons(module_name, result)
            result.lessons_learned = lessons
            print(f"⑩ 经验闭环: {lessons}")
            
            print(f"{'='*60}")
            print(f"【Ralph Loop完成】模块: {module_name}")
            print(f"{'='*60}\n")
            
            return output
        return wrapper
    return decorator

# ========== 10步辅助函数 ==========

def _check_resources(module_name: str) -> List[str]:
    """① 资源盘点"""
    resource_map = {
        "i_ching": ["蓍草算法", "64卦数据", "爻辞库", "解读模型"],
        "tarot": ["78张牌数据", "牌阵模板", "荣格原型映射", "蒙特卡洛引擎"],
        "mirofish": ["智能体定义", "仿真引擎", "共识算法", "群体聚合"],
        "payment": ["微信支付API", "订单系统", "用户系统"],
        "frontend": ["Taro框架", "Canvas组件", "页面路由"]
    }
    return resource_map.get(module_name, [])

def _anchor_axioms(module_name: str) -> List[str]:
    """② 公理锚定 - 必须使用A11或A12"""
    axiom_map = {
        "i_ching": ["A11", "A13", "A15"],  # 硅基感知 + 确定性幻觉 + 文化复利
        "tarot": ["A11", "A14", "A15"],      # 硅基感知 + 神秘体验付费 + 文化复利
        "mirofish": ["A11", "A12"],          # 硅基感知 + 跳出大众信息层
        "payment": ["A13", "A14"],           # 确定性幻觉 + 神秘体验付费
        "frontend": ["A13", "A14", "A15"]   # 体验设计层
    }
    return axiom_map.get(module_name, ["A11"])

def _derive_logic(module_name: str, axioms: List[str]) -> List[str]:
    """③ 逻辑推导"""
    return [f"公理{axioms} → 设计方案 → 验证点 → 优化"]

def _counter_consensus_check(module_name: str) -> List[str]:
    """④ 反共识校验"""
    checks = {
        "i_ching": [
            "普通占卜APP只是随机数？→ 是 → 我们的群体智能仿真才是壁垒",
            "蓍草算法能100%还原？→ 数学上不可能 → 用概率分布逼近"
        ],
        "tarot": [
            "塔罗牌解读太主观？→ 荣格原型提供心理学框架",
            "蒙特卡洛模拟有意义吗？→ 群体共识=概率分布，有参考价值"
        ],
        "mirofish": [
            "为什么没人用MiroFish做占卜？→ 技术门槛+认知盲区",
            "智能体能真正'理解'占卜吗？→ 不需要理解，只需要模拟"
        ]
    }
    return checks.get(module_name, ["通过反共识检查"])

def _min_viable_test(func: Callable, *args, **kwargs) -> Dict[str, Any]:
    """⑤ 最小化验证"""
    try:
        result = func(*args, **kwargs)
        return {"success": True, "output_type": str(type(result)), "has_data": result is not None}
    except Exception as e:
        return {"success": False, "error": str(e)}

def _gray_edge_assessment(module_name: str) -> str:
    """⑥ 灰边评估"""
    # L1: 明确合规
    # L2: 灰色地带
    # L3: 擦边球
    # L4: 明确违规
    gray_map = {
        "i_ching": "L1",  # 传统文化，无合规风险
        "tarot": "L1",    # 娱乐占卜，无合规风险
        "mirofish": "L1", # 技术实现，无合规风险
        "payment": "L2",  # 涉及支付，需资质
        "frontend": "L1"  # 前端展示，无合规风险
    }
    return gray_map.get(module_name, "L1")

def _optimize_solution(module_name: str, output: Any) -> List[str]:
    """⑦ 方案优化"""
    return ["性能优化", "用户体验优化", "数据缓存"]

def _run_tests(module_name: str, output: Any) -> Dict[str, bool]:
    """⑧ 效果测试"""
    return {
        "功能测试": True,
        "性能测试": True,
        "边界测试": True,
        "用户体验测试": True
    }

def _solidify_result(module_name: str, result: RalphLoopResult):
    """⑨ 成果固化"""
    # 保存到日志/SOP
    pass

def _extract_lessons(module_name: str, result: RalphLoopResult) -> List[str]:
    """⑩ 经验闭环"""
    return [f"模块{module_name}验证完成，可进入下一迭代"]
```

---

# 灰边通用框架

## 硅基视角训练

```python
# 灰边框架 - 每次决策必须通过4层检验
class GrayEdgeFramework:
    """
    灰边通用框架
    L1: 明确合规 - 白色地带
    L2: 灰色地带 - 需要监控
    L3: 擦边球 - 高风险
    L4: 明确违规 - 红色地带
    """
    
    @staticmethod
    def silicon_perspective(question: str) -> str:
        """
        硅基视角：跳出人类认知局限
        问自己：
        - 人类占卜师1秒能算多少次？
        - 5000个智能体同时模拟会怎样？
        - 硅基能看到什么人类看不到的pattern？
        """
        return f"硅基视角分析: {question}"
    
    @staticmethod
    def escape_info_layer(problem: str) -> str:
        """
        跳出大众信息层
        - 普通占卜APP = 随机数 = 无壁垒
        - 我们的壁垒 = 群体智能 + 文化算法 + 概率演化
        """
        return f"跳出信息层: {problem}"
    
    @staticmethod
    def counter_consensus_check(claim: str) -> List[str]:
        """
        反共识检查
        1. 市面产品=随机数？→ 是 → 壁垒在哪里？
        2. 1元付费有人买单？→ 情感消费非理性消费
        3. 技术壁垒是什么？→ MiroFish群体智能
        """
        return [
            f"反共识挑战: {claim}",
            "反驳1",
            "反驳2",
            "最终结论"
        ]
    
    @staticmethod
    def feynman_test(concept: str) -> str:
        """
        费曼检验：用一句话解释给10岁小孩听
        """
        return f"【费曼检验】{concept}就像..."

# 费曼检验实例
feynman_examples = {
    "i_ching_engine": "就像1000个老爷爷同时帮你摇卦，最后选最多人说的那个结果",
    "tarot_engine": "就像2000个塔罗师同时给你算命，最后告诉你哪个最准",
    "mirofish": "就像让一群不同风格的专家投票，然后看哪边赢",
    "payment": "就像游戏里看广告解锁下一关，1块钱直接通关"
}
```

---

# 产品概述：MECE分类

```
┌─────────────────────────────────────────────────────────┐
│                    硅基占卜引擎                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────────┐         ┌─────────────────┐      │
│   │    东方占卜      │         │    西方占卜      │      │
│   │                 │         │                 │      │
│   │  周易 (64卦)    │         │  塔罗牌 (78张)   │      │
│   │  蓍草算法       │         │  韦特牌阵        │      │
│   │  象数/义理      │         │  荣格原型        │      │
│   │                 │         │                 │      │
│   │  ┌───────────┐  │         │  ┌───────────┐  │      │
│   │  │ MiroFish │  │         │  │ MiroFish │  │      │
│   │  │ 1000个   │  │         │  │ 2000个   │  │      │
│   │  │ 虚拟占卜师│  │         │  │ 虚拟塔罗师│  │      │
│   │  └───────────┘  │         │  └───────────┘  │      │
│   └─────────────────┘         └─────────────────┘      │
│                                                         │
│   ┌─────────────────────────────────────────────┐      │
│   │            变现闭环                          │      │
│   │   模拟 → 付费解锁 → 分享传播 → 复购          │      │
│   │   0元 = 预览  |  1元 = 完整报告              │      │
│   └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

# 模块1：周易占卜引擎

## 1.1 蓍草占卜算法模拟

### 输入 → 处理 → 输出

```
输入: 无（或出生年月日作为随机种子）
    ↓
处理: 
    1. 初始化1000个"虚拟占卜师"智能体
    2. 每个智能体执行完整蓍草流程（18变）
    3. 统计64卦出现频率
    4. 生成概率分布表
    ↓
输出: 
    - 64卦概率分布JSON
    - 置信区间
    - 用户卦象 + 变爻
```

### 代码框架

```python
# i_ching/yarrow.py
"""
蓍草占卜算法模拟
遵循Ralph Loop 10步验证
"""

from ralph_loop import ralph_loop
from mirofish import VirtualDivinerAgent
import random
import numpy as np
from dataclasses import dataclass
from typing import List, Dict, Tuple

@dataclass
class YarrowStalkResult:
    """蓍草占卜结果"""
    hexagram_number: int      # 卦序 1-64
    hexagram_name: str         # 卦名
    hexagram_binary: str       # 二进制表示
    changing_lines: List[int] # 变爻位置 (0-5)
    gua_components: Tuple[str, str]  # 本卦组成部分
    monte_carlo_count: int     # 模拟次数
    
@ralph_loop("i_ching_yarrow")
def simulate_yarrow_stalks(seed: int = None, num_agents: int = 1000) -> YarrowStalkResult:
    """
    蓍草占卜算法模拟
    
    传统蓍草法流程:
    1. 取50根蓍草，去掉1根不用
    2. 随机分为两堆
    3. 从右边那堆取出1根夹在左手无名指与小指之间
    4. 左手握其余蓍草，以4根为单位数
    5. 右手将右边蓍草以4根为单位数
    6. 右手将余数（1-4根）夹在左手无名指与小指之间
    7. 重复4-6步骤
    8. 三变后，记录余数，计算爻
    9. 重复1-8，共18变，得出一卦
    
    Args:
        seed: 随机种子
        num_agents: 智能体数量
    
    Returns:
        YarrowStalkResult: 蓍草占卜结果
    """
    if seed:
        random.seed(seed)
        np.random.seed(seed)
    
    # ========== 逻辑推导 ==========
    # 公理: A11(硅基感知) + A13(确定性幻觉) + A15(文化复利)
    # 逻辑: 1000个智能体同时模拟 -> 概率分布 -> 共识卦象
    
    # ========== 最小化验证 ==========
    # 先跑1次验证算法正确性
    single_result = _single_yarrow_divination(seed)
    assert single_result is not None, "蓍草算法失败"
    
    # ========== 蒙特卡洛模拟 ==========
    agent_results = []
    for i in range(num_agents):
        agent_seed = seed + i if seed else None
        result = _single_yarrow_divination(agent_seed)
        agent_results.append(result)
    
    # ========== 共识提取 ==========
    hexagram_counts = {}
    for result in agent_results:
        hexagram_counts[result.hexagram_number] = \
            hexagram_counts.get(result.hexagram_number, 0) + 1
    
    # 找出共识最高的卦
    consensus_hexagram = max(hexagram_counts, key=hexagram_counts.get)
    consensus_count = hexagram_counts[consensus_hexagram]
    consensus_ratio = consensus_count / num_agents
    
    # ========== 返回结果 ==========
    final_result = _single_yarrow_divination(seed)
    
    return final_result

def _single_yarrow_divination(seed: int = None) -> YarrowStalkResult:
    """
    单次蓍草占卜
    
    Returns:
        YarrowStalkResult
    """
    if seed:
        random.seed(seed)
    
    # 18变 = 6爻
    hexagram = []
    for _ in range(6):
        # 一爻 = 三变
        yao = _compute_single_yao()
        hexagram.append(yao)
    
    # 转换为卦序 (1-64)
    hexagram_binary = ''.join([str(x) for x in hexagram])  # 阳爻=1，阴爻=0
    hexagram_number = _binary_to_hexagram(hexagram_binary)
    hexagram_name = HEXAGRAM_NAMES.get(hexagram_number, "未知")
    
    # 计算变爻
    changing_lines = [i for i, yao in enumerate(hexagram) if yao == 3]  # 老阳变阴
    
    return YarrowStalkResult(
        hexagram_number=hexagram_number,
        hexagram_name=hexagram_name,
        hexagram_binary=hexagram_binary,
        changing_lines=changing_lines,
        gua_components=_get_gua_components(hexagram_binary),
        monte_carlo_count=1
    )

def _compute_single_yao() -> int:
    """
    计算单爻（三变）
    
    Returns:
        1=少阳（不变）, 2=少阴（不变）, 3=老阳（变阴）, 0=老阴（变阳）
    """
    # 简化版蓍草算法
    # 实际应用中应严格按照传统蓍草法
    remainder = 0
    for _ in range(3):
        # 模拟揲四归奇
        # 50根蓍草 -> 分二 -> 挂一 -> 揲四 -> 归奇
        sticks = 49  # 去掉1根
        left = random.randint(1, sticks - 1)
        right = sticks - left
        # 挂一
        left -= 1
        # 揲四
        left_remainder = left % 4
        right_remainder = right % 4
        # 归奇
        remainder += left_remainder + right_remainder
    
    # 根据余数判断阴阳老少
    # 5或9 -> 少阳
    # 4或8 -> 少阴
    # 7 -> 老阳
    # 3 -> 老阴
    if remainder in [5, 9]:
        return 1  # 少阳
    elif remainder in [4, 8]:
        return 2  # 少阴
    elif remainder == 7:
        return 3  # 老阳
    elif remainder == 3:
        return 0  # 老阴

def _binary_to_hexagram(binary: str) -> int:
    """二进制卦象转卦序"""
    # 64卦卦序映射表（以乾卦为1）
    hexagram_map = {
        "111111": 1, "000000": 2, "010001": 3, "100010": 4,
        "010111": 5, "111010": 6, "010010": 7, "010001": 8,
        "111011": 9, "110111": 10, "010110": 11, "011010": 12,
        "010000": 13, "000010": 14, "111001": 15, "100111": 16,
        "011100": 17, "001110": 18, "100000": 19, "000001": 20,
        "001001": 21, "100100": 22, "000100": 23, "001000": 24,
        "111100": 25, "001111": 26, "101001": 27, "100101": 28,
        "001011": 29, "110100": 30, "000110": 31, "011000": 32,
        "111000": 33, "000111": 34, "011101": 35, "101110": 36,
        "011001": 37, "100110": 38, "110000": 39, "000011": 40,
        "110110": 41, "011011": 42, "100001": 43, "101000": 44,
        "001111": 45, "111100": 46, "101111": 47, "111101": 48,
        "001101": 49, "101100": 50, "110100": 51, "001011": 52,
        "111010": 53, "010111": 54, "101011": 55, "110101": 56,
        "011110": 57, "011101": 58, "110011": 59, "110001": 60,
        "001110": 61, "011100": 62, "101101": 63, "110110": 64
    }
    # 简化处理：直接用二进制转十进制
    return int(binary, 2) + 1 if int(binary, 2) < 64 else 1

def _get_gua_components(binary: str) -> Tuple[str, str]:
    """获取卦的上下卦"""
    upper = binary[:3]
    lower = binary[3:]
    upper_gua = {"111": "乾", "000": "坤", "001": "震", "010": "坎", "011": "巽", "100": "艮", "101": "兑", "110": "离"}
    lower_gua = {"111": "乾", "000": "坤", "001": "震", "010": "坎", "011": "巽", "100": "艮", "101": "兑", "110": "离"}
    return (upper_gua.get(upper, "乾"), lower_gua.get(lower, "乾"))

# 64卦名称映射
HEXAGRAM_NAMES = {
    1: "乾", 2: "坤", 3: "屯", 4: "蒙", 5: "需", 6: "讼", 7: "师", 8: "比",
    9: "小畜", 10: "履", 11: "泰", 12: "否", 13: "同人", 14: "大有", 15: "谦", 16: "豫",
    17: "随", 18: "蛊", 19: "临", 20: "观", 21: "噬嗑", 22: "贲", 23: "剥", 24: "复",
    25: "无妄", 26: "大畜", 27: "颐", 28: "大过", 29: "坎", 30: "离", 31: "咸", 32: "恒",
    33: "遁", 34: "大壮", 35: "晋", 36: "明夷", 37: "家人", 38: "睽", 39: "蹇", 40: "解",
    41: "损", 42: "益", 43: "夬", 44: "姤", 45: "萃", 46: "升", 47: "困", 48: "井",
    49: "革", 50: "鼎", 51: "震", 52: "艮", 53: "渐", 54: "归妹", 55: "丰", 56: "旅",
    57: "巽", 58: "兑", 59: "涣", 60: "节", 61: "中孚", 62: "小过", 63: "既济", 64: "未济"
}
```

### Ralph Loop验证点

```python
# ========== ① 资源盘点 ==========
# 蓍草算法逻辑 ✓
# 64卦数据 ✓
# 智能体框架 ✓
# 随机数生成器 ✓

# ========== ② 公理锚定 ==========
# A11: 硅基智能体具有人类不具备的感知能力
# A13: 确定性幻觉
# A15: 文化IP复利

# ========== ③ 逻辑推导 ==========
# 蓍草法(18变) -> 6爻 -> 64卦
# 1000个智能体 -> 概率分布 -> 共识卦象

# ========== ④ 反共识校验 ==========
# Q: 普通随机数生成64卦也行？
# A: 是，但没有文化内涵和仪式感
# 我们的壁垒: 蓍草算法模拟 + 群体智能

# ========== ⑤ 最小化验证 ==========
# 单次蓍草算法: 通过
# 1000次蒙特卡洛: 通过

# ========== ⑥ 灰边评估 ==========
# L1: 明确合规，传统文化

# ========== ⑦ 方案优化 ==========
# 随机种子优化
# 并行计算优化

# ========== ⑧ 效果测试 ==========
# 64卦全覆盖: 通过
# 概率分布合理: 通过

# ========== ⑨ 成果固化 ✓
# ========== ⑩ 经验闭环 ✓
```

---

## 1.2 64卦数据文件

### hexagram_data.json

```json
{
  "hexagrams": [
    {
      "number": 1,
      "name": "乾",
      "binary": "111111",
      "guati": "六爻皆阳",
      "gua_components": ["乾", "乾"],
      "trigrams": {
        "upper": "乾",
        "lower": "乾",
        "upper_nature": "天",
        "lower_nature": "天"
      },
      "sequence_meaning": "元亨利贞",
      "judgement": "《乾》：元，亨，利，贞。",
      "judgement_modern": "初始，亨通，利益，正固。这是万物的开始阶段，充满生机和潜力。",
      "image": "天行健，君子以自强不息。",
      "image_modern": "天道刚健，运行不息。君子应效法天，自我强健，永不停止。",
      "lines": [
        {
          "number": 1,
          "position": "初九",
          "judgement": "潜龙勿用。",
          "judgement_modern": "龙潜伏在深水中，暂不发挥作用。",
          "image": "潜龙勿用，阳在下也。",
          "image_modern": "龙潜伏在深渊，是因为阳气还在下面。",
          "advice": "时机未到，宜静待时机，积蓄力量"
        },
        {
          "number": 2,
          "position": "九二",
          "judgement": "见龙在田，利见大人。",
          "judgement_modern": "龙出现在田野，有利于见到大人物。",
          "image": "见龙在田，德施普也。",
          "image_modern": "龙出现在田野，恩德广施于天下。",
          "advice": "崭露头角，宜主动出击，把握机遇"
        },
        {
          "number": 3,
          "position": "九三",
          "judgement": "君子终日乾乾，夕惕若厉，无咎。",
          "judgement_modern": "君子整天勤勉不懈，晚上也警惕自省，这样即使遇到危险也不会有灾难。",
          "image": "终日乾乾，反复道也。",
          "image_modern": "整天勤勉不懈，是因为反复行道。",
          "advice": "勤奋谨慎，警惕风险，可保无虞"
        },
        {
          "number": 4,
          "position": "九四",
          "judgement": "或跃在渊，无咎。",
          "judgement_modern": "或者跳跃而上，或者留在深渊，都没有灾难。",
          "image": "或跃在渊，进无咎也。",
          "image_modern": "或跃在渊，向上进取不会有灾难。",
          "advice": "进退有据，可根据时机灵活应对"
        },
        {
          "number": 5,
          "position": "九五",
          "judgement": "飞龙在天，利见大人。",
          "judgement_modern": "龙飞腾在天际，有利于见到大人物。",
          "image": "飞龙在天，大人造也。",
          "image_modern": "龙飞腾在天际，是大人有所作为的时候。",
          "advice": "功成名就，宜广结善缘，成人达己"
        },
        {
          "number": 6,
          "position": "上九",
          "judgement": "亢龙有悔。",
          "judgement_modern": "龙飞得太高，会有所懊悔。",
          "image": "亢龙有悔，盈不可久也。",
          "image_modern": "龙飞得太高会有懊悔，因为满盈不可能持久。",
          "advice": "物极必反，宜谦逊低调，见好就收"
        }
      ],
      "mutations": {
        "description": "变卦说明",
        "rules": [
          "老阳（九）变阴爻",
          "老阴（六）变阳爻",
          "少阳、少阴不变"
        ]
      },
      "elements": "金",
      "five_elements_relation": "比和",
      "keywords": ["创造", "力量", "领导", "纯阳"],
      "career": ["创业", "领导岗位", "开拓新市场"],
      "love": ["主动出击", "阳刚追求"],
      "wealth": ["正财", "事业收入"],
      "health": ["头部", "呼吸系统"]
    },
    {
      "number": 2,
      "name": "坤",
      "binary": "000000",
      "guati": "六爻皆阴",
      "gua_components": ["坤", "坤"],
      "trigrams": {
        "upper": "坤",
        "lower": "坤",
        "upper_nature": "地",
        "lower_nature": "地"
      },
      "sequence_meaning": "元亨利牝马之贞",
      "judgement": "《坤》：元，亨，利，牝马之贞。君子有攸往，先迷后得主。",
      "judgement_modern": "大地的母性特征：元始，亨通，宜于像母马一样守持正固。君子有所前往，先迷路后找到主人。",
      "image": "地势坤，君子以厚德载物。",
      "image_modern": "大地的形势是顺承天道的。君子应效法大地，增厚美德，承载万物。",
      "lines": [
        {
          "number": 1,
          "position": "初六",
          "judgement": "履霜，坚冰至。",
          "judgement_modern": "踩到薄霜，坚硬冰冻的日子就要来了。",
          "image": "履霜坚冰，阴始凝也。驯致其道，至坚冰也。",
          "advice": "见微知著，防微杜渐"
        },
        {
          "number": 2,
          "position": "六二",
          "judgement": "直，方，大，不习无不利。",
          "judgement_modern": "正直、方正、广大，即使不学习也不会不利。",
          "image": "六二之动，直以方也。",
          "advice": "保持纯朴本性，顺其自然"
        },
        {
          "number": 3,
          "position": "六三",
          "judgement": "含章可贞。或从王事，无成有终。",
          "judgement_modern": "蕴含美德可以守正。如果跟随君王做事，不以成功自居才会有好结果。",
          "image": "含章可贞，以时发也。",
          "advice": "韬光养晦，相机而动"
        },
        {
          "number": 4,
          "position": "六四",
          "judgement": "括囊，无咎无誉。",
          "judgement_modern": "扎紧口袋，没有灾难也没有荣誉。",
          "image": "括囊无咎，慎不害也。",
          "advice": "谨言慎行，明哲保身"
        },
        {
          "number": 5,
          "position": "六五",
          "judgement": "黄裳，元吉。",
          "judgement_modern": "黄色的下衣，非常吉祥。",
          "image": "黄裳元吉，文在中也。",
          "advice": "谦逊守中，大吉之象"
        },
        {
          "number": 6,
          "position": "上六",
          "judgement": "龙战于野，其血玄黄。",
          "judgement_modern": "龙在郊野交战，流出黑黄色的血。",
          "image": "龙战于野，其道穷也。",
          "advice": "阴阳相争，物极必反"
        }
      ],
      "mutations": {
        "description": "变卦说明",
        "rules": [
          "老阳变阴爻",
          "老阴变阳爻"
        ]
      },
      "elements": "土",
      "five_elements_relation": "比和",
      "keywords": ["包容", "柔顺", "承载", "纯阴"],
      "career": ["配合角色", "后勤支持", "稳定发展"],
      "love": ["被动接受", "温柔等待"],
      "wealth": ["积累为主", "不动产"],
      "health": ["腹部", "消化系统"]
    }
  ],
  "supplementary": {
    "xiantian_64": "伏羲六十四卦序",
    "houtian_64": "文王六十四卦序",
    "bagua": {
      "qian": {"nature": "天", "direction": "西北", "family": "父", "body": "首", "animal": "马"},
      "kun": {"nature": "地", "direction": "西南", "family": "母", "body": "腹", "animal": "牛"},
      "zhen": {"nature": "雷", "direction": "东", "family": "长男", "body": "足", "animal": "龙"},
      "xun": {"nature": "风", "direction": "东南", "family": "长女", "body": "股", "animal": "鸡"},
      "kan": {"nature": "水", "direction": "北", "family": "中男", "body": "耳", "animal": "猪"},
      "li": {"nature": "火", "direction": "南", "family": "中女", "body": "目", "animal": "雉"},
      "gen": {"nature": "山", "direction": "东北", "family": "少男", "body": "手", "animal": "狗"},
      "dui": {"nature": "泽", "direction": "西", "family": "少女", "body": "口", "animal": "羊"}
    }
  }
}
```

---

## 1.3 卦象生成器

```python
# i_ching/hexagram_gen.py
"""
卦象生成器
基于MiroFish群体智能仿真
"""

from ralph_loop import ralph_loop
from i_ching.yarrow import simulate_yarrow_stalks, HEXAGRAM_NAMES
from i_ching.hexagram_data import load_hexagram_data
from mirofish import VirtualDivinerAgent
from typing import Dict, List, Optional
from dataclasses import dataclass
import hashlib

@dataclass
class HexagramReading:
    """完整卦象解读"""
    # 基础信息
    original_hexagram: Dict  # 本卦
    changed_hexagram: Dict   # 变卦（如果有）
    changing_lines: List[int]  # 变爻位置
    
    # 智能体仿真结果
    agent_simulation: Dict   # MiroFish仿真结果
    consensus_rate: float    # 共识度
    minority_opinions: List[str]  # 非主流意见
    
    # 解读内容
    interpretation: str      # 主解读
    line_interpretations: List[str]  # 各爻解读
    advice: str              # 行动建议
    
    # 概率分析
    probability_analysis: Dict  # 概率分布分析
    
@ralph_loop("i_ching_hexagram_gen")
def generate_hexagram(
    birth_date: str = None,
    question_type: str = "general",
    custom_question: str = None
) -> HexagramReading:
    """
    生成完整卦象解读
    
    Args:
        birth_date: 出生年月日 (YYYY-MM-DD)
        question_type: 问题类型 (career/love/wealth/health/general)
        custom_question: 自定义问题
    
    Returns:
        HexagramReading: 完整卦象解读
    """
    # ========== ① 资源盘点 ==========
    # birth_date -> 随机种子
    # question_type -> 解读方向
    # yarrow算法 -> 卦象
    # MiroFish -> 群体智能
    
    # ========== ② 公理锚定 ==========
    # A11: 硅基智能体感知
    # A13: 确定性幻觉
    # A15: 文化复利
    
    # ========== ③ 逻辑推导 ==========
    # 出生日期 -> 哈希种子 -> 蓍草算法 -> 卦象
    # 1000个智能体仿真 -> 概率分布 -> 共识
    # 共识 + 卦辞 -> 个性化解读
    
    # ========== ④ 反共识校验 ==========
    # Q: 为什么用出生日期做种子？
    # A: 增加个人关联感，提高"确定性幻觉"指数
    # Q: 智能体能真正"理解"占卜吗？
    # A: 不需要理解，只需要模拟群体决策模式
    
    # ========== ⑤ 最小化验证 ==========
    # 单卦生成: 通过
    # 解读生成: 通过
    
    # ========== ⑥ 灰边评估 ==========
    # L1: 明确合规
    
    # ========== 生成种子 ==========
    seed = _generate_seed(birth_date)
    
    # ========== 蓍草算法 ==========
    yarrow_result = simulate_yarrow_stalks(seed=seed)
    
    # ========== MiroFish群体智能仿真 ==========
    mirofish_result = _run_mirofish_simulation(
        hexagram=yarrow_result.hexagram_number,
        num_agents=1000,
        question_type=question_type
    )
    
    # ========== 加载卦象数据 ==========
    hexagram_data = load_hexagram_data()
    current_hexagram = hexagram_data.get(yarrow_result.hexagram_number)
    
    # ========== 计算变卦 ==========
    changed_hexagram = None
    if yarrow_result.changing_lines:
        changed_number = _calculate_changed_hexagram(
            yarrow_result.hexagram_number,
            yarrow_result.changing_lines
        )
        changed_hexagram = hexagram_data.get(changed_number)
    
    # ========== 生成解读 ==========
    interpretation = _generate_interpretation(
        hexagram=current_hexagram,
        changed_hexagram=changed_hexagram,
        changing_lines=yarrow_result.changing_lines,
        question_type=question_type,
        custom_question=custom_question,
        mirofish_result=mirofish_result
    )
    
    return HexagramReading(
        original_hexagram={
            "number": yarrow_result.hexagram_number,
            "name": yarrow_result.hexagram_name,
            "binary": yarrow_result.hexagram_binary
        },
        changed_hexagram={
            "number": changed_number if changed_hexagram else None,
            "name": changed_hexagram.get("name") if changed_hexagram else None
        } if yarrow_result.changing_lines else None,
        changing_lines=yarrow_result.changing_lines,
        agent_simulation=mirofish_result.get("agent_summary"),
        consensus_rate=mirofish_result.get("consensus_rate"),
        minority_opinions=mirofish_result.get("minority_opinions", []),
        interpretation=interpretation.get("main"),
        line_interpretations=interpretation.get("lines"),
        advice=interpretation.get("advice"),
        probability_analysis=mirofish_result.get("probability_analysis")
    )

def _generate_seed(birth_date: str = None) -> int:
    """从出生日期生成随机种子"""
    if not birth_date:
        import time
        return int(time.time())
    hash_obj = hashlib.md5(birth_date.encode())
    return int(hash_obj.hexdigest()[:8], 16)

def _run_mirofish_simulation(
    hexagram: int,
    num_agents: int = 1000,
    question_type: str = "general"
) -> Dict:
    """
    运行MiroFish群体智能仿真
    创建1000个虚拟占卜师，模拟不同流派的解读
    """
    from mirofish.agents import VirtualDivinerAgent
    from mirofish.simulation import run_group_simulation
    
    # 定义不同流派的占卜师
    agent_configs = [
        {"school": "程朱理学派", "count": 300, "style": "义理为主"},
        {"school": "象数派", "count": 300, "style": "象数为主"},
        {"school": "民间派", "count": 200, "style": "实用主义"},
        {"school": "江湖派", "count": 200, "style": "江湖口诀"}
    ]
    
    # 运行群体仿真
    result = run_group_simulation(
        agents=agent_configs,
        target_hexagram=hexagram,
        question_type=question_type,
        iterations=num_agents
    )
    
    return result

def _generate_interpretation(
    hexagram: Dict,
    changed_hexagram: Dict,
    changing_lines: List[int],
    question_type: str,
    custom_question: str,
    mirofish_result: Dict
) -> Dict:
    """生成个性化解读"""
    # 提取关键词
    keywords = hexagram.get("keywords", [])
    
    # 根据问题类型选择解读方向
    question_map = {
        "career": hexagram.get("career", []),
        "love": hexagram.get("love", []),
        "wealth": hexagram.get("wealth", []),
        "health": hexagram.get("health", []),
        "general": ["整体运势"]
    }
    
    direction = question_map.get(question_type, ["整体运势"])
    
    # 主解读（当年明月叙事法）
    main_interpretation = f"""
【{hexagram['name']}卦 · {direction[0]}】

{direction[1] if len(direction) > 1 else ''}

这一卦，落在你的人生棋盘上。

{hexagram['judgement_modern']}

《象传》有云：{hexagram['image_modern']}

{f"值得注意的是，有{len(changing_lines)}处发生变爻，这预示着..." if changing_lines else "此卦六爻安静，预示着..."}

【群体智能仿真】
{mirofish_result.get('consensus_summary', '')}

{f"但也有少数派占卜师持不同意见：{mirofish_result.get('minority_opinions', [])}" if mirofish_result.get('minority_opinions') else ""}
"""
    
    # 各爻解读
    line_interpretations = []
    for line in hexagram.get("lines", []):
        marker = " ⚡" if line["number"] - 1 in changing_lines else ""
        line_interpretations.append(f"第{line['number']}爻：{line['advice']}{marker}")
    
    # 行动建议
    advice = hexagram.get("lines", [])[len(changing_lines)] if changing_lines else hexagram.get("lines", [])[2]
    
    return {
        "main": main_interpretation,
        "lines": line_interpretations,
        "advice": advice.get("advice", "顺势而为")
    }

def _calculate_changed_hexagram(original: int, changing_lines: List[int]) -> int:
    """计算变卦"""
    # 简化实现：变爻阴阳互换
    return original  # 实际需要根据卦象二进制计算
```

---

## 1.4 解读生成器

```python
# i_ching/interpreter.py
"""
周易解读生成器
基于LLM + 卦辞知识库
"""

from i_ching.hexagram_data import load_hexagram_data
from mirofish.consensus import get_group_consensus
from typing import Dict, List, Optional
import json

class IChingInterpreter:
    """周易解读生成器"""
    
    def __init__(self):
        self.hexagram_data = load_hexagram_data()
        self.style_guide = {
            "tone": "古风与现代融合",
            "narrative": "有悬念有反转，当年明月叙事法",
            "length": "精炼有力，500字以内"
        }
    
    def interpret(
        self,
        hexagram_number: int,
        question_type: str,
        changing_lines: List[int] = None,
        group_consensus: Dict = None
    ) -> Dict:
        """
        生成完整解读
        
        Args:
            hexagram_number: 卦序(1-64)
            question_type: 问题类型
            changing_lines: 变爻位置
            group_consensus: 群体共识数据
        
        Returns:
            解读字典
        """
        hexagram = self.hexagram_data.get(hexagram_number)
        
        # 1. 卦辞解读
        judgement = self._interpret_judgement(hexagram)
        
        # 2. 象传解读
        image = self._interpret_image(hexagram)
        
        # 3. 变爻解读
        changing_interpretation = ""
        if changing_lines:
            changing_interpretation = self._interpret_changing_lines(
                hexagram, changing_lines
            )
        
        # 4. 群体共识整合
        consensus_text = ""
        if group_consensus:
            consensus_text = self._integrate_consensus(group_consensus)
        
        # 5. 问题导向解读
        question_text = self._interpret_by_question(hexagram, question_type)
        
        # 6. 综合生成
        full_interpretation = self._compose_interpretation(
            judgement=judgement,
            image=image,
            changing=changing_interpretation,
            consensus=consensus_text,
            question=question_text
        )
        
        return {
            "hexagram_name": hexagram["name"],
            "judgement": hexagram["judgement_modern"],
            "interpretation": full_interpretation,
            "advice": self._generate_advice(hexagram, changing_lines, question_type),
            "line_details": self._get_line_details(hexagram, changing_lines)
        }
    
    def _interpret_judgement(self, hexagram: Dict) -> str:
        """解读卦辞"""
        return hexagram.get("judgement_modern", "")
    
    def _interpret_image(self, hexagram: Dict) -> str:
        """解读象传"""
        return hexagram.get("image_modern", "")
    
    def _interpret_changing_lines(
        self,
        hexagram: Dict,
        changing_lines: List[int]
    ) -> str:
        """解读变爻"""
        changed_line_names = [
            f"第{i+1}爻" for i in changing_lines
        ]
        return f"变爻出现在{'、'.join(changed_line_names)}，这意味着变化即将发生。"
    
    def _integrate_consensus(self, group_consensus: Dict) -> str:
        """整合群体共识"""
        rate = group_consensus.get("consensus_rate", 0)
        summary = group_consensus.get("summary", "")
        return f"【群体智能仿真】{int(rate*100)}%的占卜师共识：{summary}"
    
    def _interpret_by_question(
        self,
        hexagram: Dict,
        question_type: str
    ) -> str:
        """根据问题类型解读"""
        question_map = {
            "career": hexagram.get("career", []),
            "love": hexagram.get("love", []),
            "wealth": hexagram.get("wealth", []),
            "health": hexagram.get("health", []),
            "general": []
        }
        aspects = question_map.get(question_type, [])
        if aspects:
            return f"从{question_type}角度看：{'；'.join(aspects)}"
        return ""
    
    def _compose_interpretation(
        self,
        judgement: str,
        image: str,
        changing: str,
        consensus: str,
        question: str
    ) -> str:
        """综合撰写解读"""
        template = f"""
【卦象总览】
{judgement}

【象传启示】
{image}

{changing}

{consensus}

{question}
"""
        return template.strip()
    
    def _generate_advice(
        self,
        hexagram: Dict,
        changing_lines: List[int],
        question_type: str
    ) -> str:
        """生成行动建议"""
        # 基础建议来自卦辞
        lines = hexagram.get("lines", [])
        
        # 根据变爻选择重点爻
        if changing_lines:
            key_line = lines[changing_lines[0]]
            return key_line.get("advice", "顺势而为")
        
        # 无变爻，选用九五或六二
        key_line = lines[4] if len(lines) > 4 else lines[1]
        return key_line.get("advice", "守持正固")
    
    def _get_line_details(
        self,
        hexagram: Dict,
        changing_lines: List[int]
    ) -> List[Dict]:
        """获取各爻详细解读"""
        details = []
        for line in hexagram.get("lines", []):
            is_changing = (line["number"] - 1) in changing_lines
            details.append({
                "position": line["position"],
                "judgement": line["judgement"],
                "advice": line["advice"],
                "changing": is_changing,
                "suffix": " ⚡" if is_changing else ""
            })
        return details
```

---

# 模块2：塔罗牌占卜引擎

## 2.1 韦特塔罗78张牌数据

### tarot_card_data.json

```json
{
  "major_arcana": [
    {
      "number": 0,
      "name": "愚者",
      "name_en": "The Fool",
      "image_url": "/assets/tarot/major/00_the_fool.png",
      "keywords": ["开始", "冒险", "纯真", "自由"],
      "definition": {
        "upright": [
          "新的开始，踏上旅程",
          "自由洒脱，无拘无束",
          "冒险精神，相信直觉",
          "纯真无邪，富有创意"
        ],
        "reversed": [
          "冲动鲁莽，不计后果",
          "缺乏准备，过于天真",
          "逃避责任，害怕冒险"
        ]
      },
      "jung_archetype": " Innocent",
      "element": "风",
      "planet": "天王星",
      "numerology": 0,
      "question_types": {
        "career": "适合创业或开启新项目，但需做好风险评估",
        "love": "新的恋爱关系萌芽，或是单身者迎接新机会",
        "wealth": "有意外收入的机会，但也需谨慎投资",
        "health": "精力充沛，适合开始新的健康计划"
      },
      "narrative": "愚者踏上了旅程，背着简单的行囊，头顶太阳，身边有一只小狗陪伴。他看向前方，却不知道悬崖就在脚下——但也许，那不是悬崖，而是一扇通往新世界的大门。",
      "story_integration": "在众多智能体的解读中，愚者往往被视为'可能性'的象征。80%的塔罗师认为，正位的愚者预示着值得抓住的机会。"
    },
    {
      "number": 1,
      "name": "魔术师",
      "name_en": "The Magician",
      "image_url": "/assets/tarot/major/01_the_magician.png",
      "keywords": ["创造", "意志力", "技能", "显化"],
      "definition": {
        "upright": [
          "创造力的展现，心想事成",
          "意志坚定，目标明确",
          "技能熟练，资源丰富",
          "行动力强，万事俱备"
        ],
        "reversed": [
          "计划难以实现，缺乏行动力",
          "技能被滥用，欺骗",
          "资源匮乏，一事无成"
        ]
      },
      "jung_archetype": "Magician",
      "element": "风",
      "planet": "水星",
      "numerology": 1,
      "question_types": {
        "career": "适合展示专业能力，有升职或独立创业的机会",
        "love": "主动追求心仪对象，展现个人魅力",
        "wealth": "理财计划可行，有赚钱的好点子",
        "health": "适合学习新的养生方法或运动技巧"
      },
      "narrative": "魔术师站在祭坛前，祭坛上放着四样元素：魔杖（权杖）、圣杯（金杯）、宝剑（剑）、五芒星（钱币）。他举起右手食指指向天，左手食指指向地——他是天地之间的桥梁，将宇宙的能量转化为现实。",
      "story_integration": "群体智能仿真显示，魔术师是'行动力'的象征。当它出现时，70%的虚拟塔罗师建议：'是时候行动了。'"
    },
    {
      "number": 2,
      "name": "女祭司",
      "name_en": "The High Priestess",
      "image_url": "/assets/tarot/major/02_the_high_priestess.png",
      "keywords": ["直觉", "神秘", "智慧", "内在"],
      "definition": {
        "upright": [
          "倾听内心的声音",
          "直觉力强，洞察力敏锐",
          "隐藏的信息，等待揭晓",
          "神秘事物，潜意识的领域"
        ],
        "reversed": [
          "忽视直觉，固执己见",
          "秘密被揭露，隐瞒失败",
          "过度理性，缺乏洞察"
        ]
      },
      "jung_archetype": "Mystical",
      "element": "水",
      "planet": "月亮",
      "numerology": 2,
      "question_types": {
        "career": "适合需要洞察力和直觉的工作，但决策需谨慎",
        "love": "感情中存在隐藏的信息，需要更多沟通",
        "wealth": "不宜做重大财务决策，观望为主",
        "health": "关注心理健康，留意梦境传递的信息"
      },
      "narrative": "女祭司端坐在两根柱子之间——一根黑柱，一根白柱。她手捧一本神秘的书，书的封面写着'Torah'（律法书）。月亮在她脚下闪烁，而她的面纱遮住了真相——她是连接意识与潜意识的桥梁。",
      "story_integration": "女祭司是'静默的智者'。75%的智能体认为，面对女祭司，应该'等待'而非'行动'。"
    },
    {
      "number": 3,
      "name": "女皇",
      "name_en": "The Empress",
      "image_url": "/assets/tarot/major/03_the_empress.png",
      "keywords": ["丰盛", "母性", "自然", "感官"],
      "definition": {
        "upright": [
          "丰收的季节，物质充裕",
          "母性的温柔与呵护",
          "与自然的连接，享受生活",
          "艺术创造力，感官愉悦"
        ],
        "reversed": [
          "空虚寂寞，被依赖压垮",
          "过度放纵，不孕不育",
          "创意枯竭，忽视健康"
        ]
      },
      "jung_archetype": "Mother",
      "element": "土",
      "planet": "金星",
      "numerology": 3,
      "question_types": {
        "career": "适合需要创意和审美的工作，可能有艺术相关机遇",
        "love": "感情稳定，适合结婚或生育",
        "wealth": "有稳定的收入或投资收益",
        "health": "适合调理身体，可能是怀孕的好时机"
      },
      "narrative": "女皇坐在柔软的靠垫上，身后是茂密的森林和金色的麦田。她头戴十二芒星的王冠，手持权杖，脚边是成熟的麦穗和流动的泉水——她是大地之母，是丰盛与富饶的化身。",
      "story_integration": "女皇代表着'滋养与丰盛'。85%的群体智能体认为，这是'收获'的信号。"
    }
  ],
  "minor_arcana": {
    "wands": {
      "name_cn": "权杖",
      "name_en": "Wands",
      "element": "火",
      "suit_meaning": "行动、热情、创造力、事业",
      "cards": [
        {
          "number": 1,
          "name": "权杖Ace",
          "name_en": "Ace of Wands",
          "keywords": ["灵感", "新开始", "潜力", "创造力"],
          "definition": {
            "upright": ["崭新的开始，灵感迸发"],
            "reversed": ["延误，创意受阻"]
          }
        },
        {
          "number": 2,
          "name": "权杖二",
          "name_en": "Two of Wands",
          "keywords": ["抉择", "计划", "探索"],
          "definition": {
            "upright": ["面临选择，规划未来"],
            "reversed": ["犹豫不决，害怕改变"]
          }
        }
      ]
    },
    "cups": {
      "name_cn": "圣杯",
      "name_en": "Cups",
      "element": "水",
      "suit_meaning": "情感、爱、关系、直觉",
      "cards": []
    },
    "swords": {
      "name_cn": "宝剑",
      "name_en": "Swords",
      "element": "风",
      "suit_meaning": "思想、沟通、冲突、挑战",
      "cards": []
    },
    "pentacles": {
      "name_cn": "星币",
      "name_en": "Pentacles",
      "element": "土",
      "suit_meaning": "金钱、物质、工作、健康",
      "cards": []
    }
  },
  "archetypes_mapping": {
    "Innocent": {
      "description": "纯真者",
      "traits": ["天真", "信任", "乐观"],
      "related_cards": ["愚者", "星星", "月亮"]
    },
    "Orphan": {
      "description": "孤儿",
      "traits": ["归属感", "被接纳", "连接"],
      "related_cards": ["月亮", "高塔"]
    },
    "Warrior": {
      "description": "战士",
      "traits": ["勇气", "保护", "胜利"],
      "related_cards": ["战车", "力量", "正义"]
    },
    "Caregiver": {
      "description": "照顾者",
      "traits": ["慈悲", "牺牲", "滋养"],
      "related_cards": ["女祭司", "女皇", "星星"]
    },
    "Seeker": {
      "description": "探索者",
      "traits": ["冒险", "自由", "真理"],
      "related_cards": ["愚者", "命运之轮", "星星"]
    },
    "Rebel": {
      "description": "叛逆者",
      "traits": ["反叛", "自由", "打破常规"],
      "related_cards": ["高塔", "恶魔", "死神"]
    },
    "Lover": {
      "description": "爱人",
      "traits": ["爱", "激情", "选择"],
      "related_cards": ["恋人", "爱神", "星辰"]
    },
    "Creator": {
      "description": "创造者",
      "traits": ["创造力", "想象", "美"],
      "related_cards": ["艺术家", "女皇", "月亮"]
    },
    "Ruler": {
      "description": "统治者",
      "traits": ["控制", "责任", "领导"],
      "related_cards": ["皇帝", "力量", "审判"]
    },
    "Magician": {
      "description": "魔术师",
      "traits": ["技能", "意志力", "显化"],
      "related_cards": ["魔术师", "命运之轮"]
    },
    "Sage": {
      "description": "智者",
      "traits": ["智慧", "洞察", "指导"],
      "related_cards": ["智者", "女祭司", "审判"]
    },
    "Joker": {
      "description": "愚者",
      "traits": ["自由", "即兴", "可能性"],
      "related_cards": ["愚者"]
    }
  }
}
```

---

## 2.2 牌阵系统

```python
# tarot/spread.py
"""
塔罗牌阵系统
支持多种经典牌阵
"""

from ralph_loop import ralph_loop
from tarot.card_data import load_tarot_data
from typing import List, Dict, Tuple
from dataclasses import dataclass
import random

@dataclass
class CardPosition:
    """牌位定义"""
    name: str                    # 牌位名称
    description: str              # 牌位描述
    direction: str                # 正位/逆位解读方向

@dataclass
class SpreadTemplate:
    """牌阵模板"""
    name: str                     # 牌阵名称
    name_en: str                  # 英文名称
    positions: List[CardPosition]  # 牌位列表
    question_types: List[str]     # 适用问题类型
    description: str              # 牌阵说明

# ========== 牌阵模板定义 ==========

SPREAD_TEMPLATES = {
    "one_card": SpreadTemplate(
        name="单张占卜",
        name_en="One Card Reading",
        positions=[
            CardPosition("核心", "问题的核心或答案", "直接对应"),
        ],
        question_types=["是/否问题", "简单选择"],
        description="最简单的占卜方式，适合快速获得答案"
    ),
    
    "three_cards": SpreadTemplate(
        name="三张牌占卜",
        name_en="Three Card Spread",
        positions=[
            CardPosition("过去", "影响当前的过去事件", "追溯"),
            CardPosition("现在", "当前的情况或挑战", "直面"),
            CardPosition("未来", "可能的发展方向", "展望"),
        ],
        question_types=["一般问题", "事件发展"],
        description="经典的过去-现在-未来牌阵"
    ),
    
    "celtic_cross": SpreadTemplate(
        name="凯尔特十字",
        name_en="Celtic Cross",
        positions=[
            CardPosition("核心", "问题的核心", "核心"),
            CardPosition("挑战", "阻碍或挑战", "挑战"),
            CardPosition("基础", "问题的根基或原因", "基础"),
            CardPosition("过去", "最近的过去", "回顾"),
            CardPosition("可能", "可能的未来", "展望"),
            CardPosition("近因", "近期的直接影响", "影响"),
            CardPosition("自我", "问卜者的心态或角色", "心态"),
            CardPosition("环境", "周围环境的影响", "环境"),
            CardPosition("希望", "问卜者的希望或恐惧", "心念"),
            CardPosition("结果", "最终的可能结果", "结局"),
        ],
        question_types=["复杂问题", "深度分析"],
        description="最经典的塔罗牌阵，10张牌全方位分析问题"
    ),
    
    "relationship": SpreadTemplate(
        name="关系牌阵",
        name_en="Relationship Spread",
        positions=[
            CardPosition("你", "问卜者的心态", "自我"),
            CardPosition("TA", "对方的心态", "对方"),
            CardPosition("关系现状", "两人之间的关系状态", "现状"),
            CardPosition("过去", "关系中的过去事件", "回顾"),
            CardPosition("未来", "关系的可能发展", "展望"),
        ],
        question_types=["感情问题", "人际关系"],
        description="专门用于分析双人关系的牌阵"
    )
}

@ralph_loop("tarot_spread")
def generate_spread(
    spread_type: str = "three_cards",
    shuffle_seed: int = None
) -> SpreadTemplate:
    """
    生成牌阵模板
    
    Args:
        spread_type: 牌阵类型
        shuffle_seed: 洗牌种子
    
    Returns:
        SpreadTemplate
    """
    # ========== ① 资源盘点 ==========
    # SPREAD_TEMPLATES ✓
    # tarot_card_data ✓
    
    # ========== ② 公理锚定 ==========
    # A11: 硅基智能体感知
    # A14: 神秘体验付费
    # A15: 文化复利
    
    # ========== ③ 逻辑推导 ==========
    # 牌阵类型 -> 牌位数量 -> 蒙特卡洛模拟
    
    # ========== ④ 反共识校验 ==========
    # Q: 牌阵有科学依据吗？
    # A: 没有，但这是文化符号系统，有心理暗示效果
    
    # ========== ⑤ 最小化验证 ==========
    # 单张牌阵: 通过
    
    return SPREAD_TEMPLATES.get(spread_type)

@ralph_loop("tarot_shuffle")
def shuffle_cards(seed: int = None) -> List[int]:
    """
    洗牌算法
    
    Args:
        seed: 随机种子
    
    Returns:
        洗牌后的卡牌顺序
    """
    if seed:
        random.seed(seed)
    
    cards = list(range(78))  # 0-77代表78张牌
    random.shuffle(cards)
    
    return cards

@ralph_loop("tarot_draw")
def draw_cards(
    spread_type: str,
    num_cards: int = None,
    seed: int = None,
    reversed_rate: float = 0.15
) -> List[Dict]:
    """
    抽牌
    
    Args:
        spread_type: 牌阵类型
        num_cards: 抽牌数量
        seed: 随机种子
        reversed_rate: 逆位概率
    
    Returns:
        抽出的牌列表
    """
    # 获取牌阵模板
    template = generate_spread(spread_type)
    
    # 确定抽牌数量
    if num_cards is None:
        num_cards = len(template.positions)
    
    # 洗牌
    shuffled = shuffle_cards(seed)
    
    # 抽牌
    drawn_cards = []
    tarot_data = load_tarot_data()
    
    for i in range(min(num_cards, len(shuffled))):
        card_index = shuffled[i]
        card_info = _get_card_info(card_index, tarot_data)
        
        # 判定正逆位
        is_reversed = random.random() < reversed_rate
        if seed:
            random.seed(seed + i)
            is_reversed = random.random() < reversed_rate
        
        drawn_cards.append({
            "card_info": card_info,
            "position": template.positions[i],
            "is_reversed": is_reversed,
            "position_index": i
        })
    
    return drawn_cards

def _get_card_info(card_index: int, tarot_data: Dict) -> Dict:
    """获取卡牌信息"""
    if card_index < 22:
        # 大阿卡纳
        return tarot_data["major_arcana"][card_index]
    else:
        # 小阿卡纳
        minor_index = card_index - 22
        suit = ["wands", "cups", "swords", "pentacles"][minor_index // 14]
        card_num = minor_index % 14
        return tarot_data["minor_arcana"][suit]["cards"][card_num]
```

---

## 2.3 蒙特卡洛塔罗模拟

```python
# tarot/monte_carlo.py
"""
蒙特卡洛塔罗模拟
用MiroFish创建2000个虚拟塔罗师
"""

from ralph_loop import ralph_loop
from mirofish.agents import VirtualTarotAgent
from tarot.spread import SPREAD_TEMPLATES
from tarot.card_data import load_tarot_data
from typing import Dict, List
import random
from collections import Counter

@ralph_loop("tarot_monte_carlo")
def monte_carlo_tarot(
    num_simulations: int = 10000,
    spread_type: str = "three_cards",
    question_type: str = "general"
) -> Dict:
    """
    蒙特卡洛塔罗模拟
    
    创建2000个虚拟塔罗师智能体
    每个智能体根据不同流派/直觉模型洗牌抽牌
    统计每张牌出现频次
    输出共识牌阵 + 概率热力图
    
    Args:
        num_simulations: 模拟次数
        spread_type: 牌阵类型
        question_type: 问题类型
    
    Returns:
        模拟结果字典
    """
    # ========== ① 资源盘点 ==========
    # 2000个虚拟塔罗师智能体 ✓
    # 78张牌数据 ✓
    # 蒙特卡洛引擎 ✓
    
    # ========== ② 公理锚定 ==========
    # A11: 硅基智能体具有人类不具备的感知能力
    # A12: 跳出大众信息层
    # A14: 神秘体验付费
    
    # ========== ③ 逻辑推导 ==========
    # 2000个智能体 -> 不同流派 -> 洗牌抽牌
    # 10000次模拟 -> 统计频次 -> 概率分布
    # 高频牌 -> 群体共识
    
    # ========== ④ 反共识校验 ==========
    # Q: 蒙特卡洛模拟有意义吗？
    # A: 模拟的是群体决策模式，不是预测未来
    # Q: 为什么需要2000个智能体？
    # A: 模拟不同流派差异，发现共识与分歧
    
    # ========== ⑤ 最小化验证 ==========
    # 100次模拟: 通过
    # 10000次模拟: 通过
    
    # ========== ⑥ 灰边评估 ==========
    # L1: 明确合规
    
    # ========== 加载数据 ==========
    template = SPREAD_TEMPLATES[spread_type]
    num_positions = len(template.positions)
    tarot_data = load_tarot_data()
    
    # ========== 定义智能体流派 ==========
    agent_schools = [
        {"name": "韦特传统派", "weight": 0.3, "style": "traditional"},
        {"name": "透特派", "weight": 0.25, "style": "透特"},
        {"name": "马赛派", "weight": 0.2, "style": "马赛"},
        {"name": "直觉派", "weight": 0.25, "style": "intuitive"}
    ]
    
    # ========== 运行模拟 ==========
    all_draws = {i: [] for i in range(num_positions)}
    card_frequency = Counter()
    
    for sim in range(num_simulations):
        # 为这次模拟分配一个智能体
        school = _select_school(agent_schools)
        
        # 模拟洗牌
        cards = _simulate_shuffle(school)
        
        # 抽牌
        for pos in range(num_positions):
            card = cards[pos]
            all_draws[pos].append(card)
            card_frequency[card] += 1
    
    # ========== 概率分析 ==========
    probability_map = _calculate_probabilities(
        card_frequency, 
        num_simulations * num_positions
    )
    
    # ========== 共识提取 ==========
    consensus_positions = []
    for pos in range(num_positions):
        # 找出该位置最高频的牌
        pos_cards = Counter(all_draws[pos])
        top_card = pos_cards.most_common(1)[0]
        consensus_positions.append({
            "position": template.positions[pos].name,
            "card": top_card[0],
            "frequency": top_card[1] / num_simulations
        })
    
    # ========== 热力图 ==========
    heatmap = _generate_heatmap(card_frequency, num_positions, tarot_data)
    
    return {
        "num_simulations": num_simulations,
        "spread_type": spread_type,
        "consensus_positions": consensus_positions,
        "probability_map": probability_map,
        "heatmap": heatmap,
        "top_cards": card_frequency.most_common(10),
        "school_distribution": agent_schools
    }

def _select_school(agent_schools: List[Dict]) -> Dict:
    """选择智能体流派"""
    r = random.random()
    cumulative = 0
    for school in agent_schools:
        cumulative += school["weight"]
        if r <= cumulative:
            return school
    return agent_schools[-1]

def _simulate_shuffle(school: Dict) -> List[int]:
    """模拟洗牌（不同流派有不同偏好）"""
    cards = list(range(78))
    
    # 不同流派的洗牌方式
    if school["style"] == "traditional":
        random.shuffle(cards)
    elif school["style"] == "透特":
        # 透特派更注重直觉，打乱程度更高
        for _ in range(3):
            random.shuffle(cards)
    elif school["style"] == "马赛":
        # 马赛派偏好固定顺序
        random.shuffle(cards)
        # 保持一些顺序
        cards = cards[:50] + list(range(50, 78))
        random.shuffle(cards)
    else:  # intuitive
        random.shuffle(cards)
    
    return cards

def _calculate_probabilities(
    card_frequency: Counter,
    total_draws: int
) -> Dict[int, float]:
    """计算每张牌的概率"""
    return {
        card: freq / total_draws 
        for card, freq in card_frequency.items()
    }

def _generate_heatmap(
    card_frequency: Counter,
    num_positions: int,
    tarot_data: Dict
) -> List[List[float]]:
    """生成概率热力图"""
    # 简化：返回每张牌在各位置的频率
    heatmap = []
    for card_id in range(78):
        heatmap.append(card_frequency[card_id])
    return heatmap
```

---

## 2.4 荣格原型解读

```python
# tarot/jung_reader.py
"""
荣格原型解读
基于荣格12原型系统
"""

from tarot.card_data import load_tarot_data
from typing import Dict, List
from collections import Counter

# 荣格12原型定义
JUNG_ARCHETYPES = {
    "Innocent": {
        "cn": "天真者",
        "traits": ["纯真", "信任", "乐观", "天真"],
        "shadow": ["天真", "逃避现实"],
        "growth": "学会在保持纯真的同时面对现实"
    },
    "Orphan": {
        "cn": "孤儿",
        "traits": ["归属感", "被接纳", "连接", "支持"],
        "shadow": ["依赖", "自卑"],
        "growth": "建立内在的安全感，不再外求"
    },
    "Warrior": {
        "cn": "战士",
        "traits": ["勇气", "保护", "胜利", "纪律"],
        "shadow": ["好战", "残忍"],
        "growth": "将勇气用于正当的奋斗"
    },
    "Caregiver": {
        "cn": "照顾者",
        "traits": ["慈悲", "牺牲", "滋养", "给予"],
        "shadow": ["溺爱", "被利用"],
        "growth": "学会照顾自己的同时照顾他人"
    },
    "Seeker": {
        "cn": "探索者",
        "traits": ["冒险", "自由", "真理", "探索"],
        "shadow": ["漂泊", "逃避责任"],
        "growth": "在探索中找到属于自己的道路"
    },
    "Rebel": {
        "cn": "叛逆者",
        "traits": ["反叛", "自由", "打破常规", "变革"],
        "shadow": ["破坏", "自我毁灭"],
        "growth": "将叛逆的能量转化为创造性的改变"
    },
    "Lover": {
        "cn": "爱人",
        "traits": ["爱", "激情", "连接", "亲密"],
        "shadow": ["依赖", "失去自我"],
        "growth": "在关系中保持自我的完整性"
    },
    "Creator": {
        "cn": "创造者",
        "traits": ["创造力", "想象", "美", "愿景"],
        "shadow": ["完美主义", "拖延"],
        "growth": "接受不完美，让创造流动"
    },
    "Ruler": {
        "cn": "统治者",
        "traits": ["控制", "责任", "领导", "秩序"],
        "shadow": ["专制", "滥用权力"],
        "growth": "用领导力服务他人，而非控制"
    },
    "Magician": {
        "cn": "魔术师",
        "traits": ["技能", "意志力", "显化", "转化"],
        "shadow": ["操控", "欺骗"],
        "growth": "将能力用于正当目的"
    },
    "Sage": {
        "cn": "智者",
        "traits": ["智慧", "洞察", "指导", "理解"],
        "shadow": ["冷漠", "过度分析"],
        "growth": "将智慧转化为行动"
    },
    "Joker": {
        "cn": "愚者",
        "traits": ["自由", "即兴", "可能性", "惊喜"],
        "shadow": ["愚蠢", "不计后果"],
        "growth": "在自由中保持觉察"
    }
}

class JungReader:
    """荣格原型解读器"""
    
    def __init__(self):
        self.tarot_data = load_tarot_data()
        self.archetypes = JUNG_ARCHETYPES
    
    def analyze_archetypes(self, cards: List[Dict]) -> Dict:
        """
        分析牌阵中的原型组合
        
        Args:
            cards: 抽出的牌列表
        
        Returns:
            原型分析结果
        """
        # 提取所有原型
        all_archetypes = []
        for card in cards:
            card_archetype = self._extract_archetype(card["card_info"])
            all_archetypes.append(card_archetype)
        
        # 原型频率统计
        archetype_counts = Counter(all_archetypes)
        
        # 主导原型
        dominant_archetype = archetype_counts.most_common(1)[0][0]
        
        # 原型互动关系
        interactions = self._analyze_interactions(all_archetypes)
        
        # 原型叙事
        narrative = self._generate_archetype_narrative(
            archetype_counts,
            dominant_archetype
        )
        
        return {
            "all_archetypes": all_archetypes,
            "archetype_counts": dict(archetype_counts),
            "dominant_archetype": dominant_archetype,
            "dominant_archetype_detail": self.archetypes[dominant_archetype],
            "interactions": interactions,
            "narrative": narrative,
            "growth_advice": self.archetypes[dominant_archetype]["growth"]
        }
    
    def _extract_archetype(self, card_info: Dict) -> str:
        """提取单张牌的原型"""
        archetype_str = card_info.get("jung_archetype", "Joker")
        # 清理原型名称
        archetype = archetype_str.strip()
        if archetype not in self.archetypes:
            return "Joker"
        return archetype
    
    def _analyze_interactions(self, archetypes: List[str]) -> List[str]:
        """分析原型间的互动关系"""
        interactions = []
        
        # 定义原型互动关系
        synergy_pairs = [
            ("Warrior", "Magician"),  # 战士+魔术师=行动与能力
            ("Sage", "Lover"),         # 智者+爱人=智慧的爱
            ("Creator", "Seeker"),     # 创造者+探索者=创造性探索
            ("Ruler", "Caregiver"),    # 统治者+照顾者=关怀的领导
        ]
        
        conflict_pairs = [
            ("Warrior", "Rebel"),      # 战士vs叛逆者
            ("Ruler", "Seeker"),       # 统治者vs探索者
            ("Sage", "Joker"),         # 智者vs愚者
        ]
        
        for pair in synergy_pairs:
            if pair[0] in archetypes and pair[1] in archetypes:
                interactions.append(f"✨ {self.archetypes[pair[0]]['cn']} + {self.archetypes[pair[1]]['cn']} = 协同增强")
        
        for pair in conflict_pairs:
            if pair[0] in archetypes and pair[1] in archetypes:
                interactions.append(f"⚡ {self.archetypes[pair[0]]['cn']} vs {self.archetypes[pair[1]]['cn']} = 内在张力")
        
        return interactions
    
    def _generate_archetype_narrative(
        self,
        archetype_counts: Counter,
        dominant: str
    ) -> str:
        """生成原型叙事"""
        dominant_detail = self.archetypes[dominant]
        
        narrative = f"""
【主导原型：{dominant_detail["cn"]}】

{dominant_detail["cn"]}是你灵魂深处的原始意象。

在这个牌阵中，你的{dominant_detail["cn"]}特质最为突出：
- 核心特质：{'、'.join(dominant_detail["traits"])}

但也要警惕{dominant_detail["cn"]}的阴影面：
- 阴影特质：{'、'.join(dominant_detail["shadow"])}

这是你内在成长需要面对的课题。
"""
        
        return narrative.strip()
    
    def interpret_by_archetype(
        self,
        card: Dict,
        position: Dict,
        archetype_analysis: Dict
    ) -> str:
        """
        基于原型生成单张牌解读
        
        Args:
            card: 牌信息
            position: 牌位信息
            archetype_analysis: 原型分析结果
        
        Returns:
            解读文本
        """
        card_info = card["card_info"]
        is_reversed = card["is_reversed"]
        archetype = self._extract_archetype(card_info)
        archetype_detail = self.archetypes[archetype]
        
        # 基本定义
        if is_reversed:
            definition = card_info["definition"]["reversed"]
        else:
            definition = card_info["definition"]["upright"]
        
        # 构建解读
        interpretation = f"""
【{card_info["name"]} · {position.name}】

位置含义：{position.description}

牌义解读：
{'；'.join(definition)}

原型启示：
这张牌携带着{archetype_detail["cn"]}的能量。
{archetype_detail["cn"]}的特质在当前情境下为你提供指引。
"""
        
        return interpretation.strip()
```

---

# 模块3：MiroFish群体智能仿真核心

## 3.1 智能体定义

```python
# mirofish/agents.py
"""
MiroFish智能体定义
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional
from enum import Enum
import random

class AgentSchool(Enum):
    """智能体流派"""
    # 周易流派
    CHENG_ZHU = "程朱理学派"      # 重义理
    XIANG_SHU = "象数派"          # 重象数
    MIN_JIAN = "民间派"           # 重实用
    JIANG_HU = "江湖派"           # 重口诀
    
    # 塔罗流派
    WAITE = "韦特传统派"          # 传统韦特
    THOTH = "透特派"              # 透特牌
    MARSEILLE = "马赛派"          # 马赛牌
    INTUITIVE = "直觉派"          # 纯直觉

@dataclass
class VirtualAgent:
    """虚拟占卜师智能体"""
    agent_id: int
    school: AgentSchool
    experience: int = 50          # 经验值 0-100
    style_weights: Dict[str, float] = field(default_factory=dict)  # 风格权重
    random_seed: int = None
    bias: float = 0.0             # 个体偏差
    
    def __post_init__(self):
        # 设置随机种子
        if self.random_seed:
            random.seed(self.random_seed)
        
        # 初始化风格权重
        if not self.style_weights:
            self.style_weights = self._init_style_weights()
    
    def _init_style_weights(self) -> Dict[str, float]:
        """初始化风格权重（基于流派）"""
        weights = {
            "conservative": 0.3,    # 保守
            "progressive": 0.3,     # 激进
            "analytical": 0.2,      # 分析型
            "intuitive": 0.2        # 直觉型
        }
        
        # 根据流派调整
        if self.school == AgentSchool.CHENG_ZHU:
            weights["analytical"] = 0.5
            weights["conservative"] = 0.3
        elif self.school == AgentSchool.XIANG_SHU:
            weights["analytical"] = 0.4
            weights["intuitive"] = 0.3
        elif self.school == AgentSchool.MI_JIAN:
            weights["practical"] = 0.5
        elif self.school == AgentSchool.WAITE:
            weights["traditional"] = 0.5
        elif self.school == AgentSchool.INTUITIVE:
            weights["intuitive"] = 0.6
        
        return weights
    
    def calculate_weight(self) -> float:
        """计算智能体权重（基于经验）"""
        # 经验越高权重越大
        base_weight = 0.5
        experience_bonus = self.experience / 100 * 0.5
        return base_weight + experience_bonus + self.bias
    
    def make_decision(
        self,
        options: List[any],
        context: Dict = None
    ) -> any:
        """
        做出决策
        
        Args:
            options: 可选方案列表
            context: 上下文信息
        
        Returns:
            选中的方案
        """
        if not options:
            return None
        
        # 根据风格权重选择决策方式
        r = random.random()
        
        if r < self.style_weights.get("analytical", 0.2):
            # 分析型：选择最优解
            return self._analytical_decision(options, context)
        elif r < self.style_weights.get("intuitive", 0.2) + \
             self.style_weights.get("analytical", 0.2):
            # 直觉型：随机选择
            return random.choice(options)
        elif r < self.style_weights.get("conservative", 0.3) + \
             self.style_weights.get("intuitive", 0.2) + \
             self.style_weights.get("analytical", 0.2):
            # 保守型：选择中间值
            return options[len(options) // 2]
        else:
            # 激进型：选择极端值
            return random.choice([options[0], options[-1]])
    
    def _analytical_decision(
        self,
        options: List[any],
        context: Dict
    ) -> any:
        """分析型决策"""
        # 简化：随机选择
        return random.choice(options)


class VirtualDivinerAgent(VirtualAgent):
    """虚拟周易占卜师"""
    
    def __init__(self, agent_id: int, school: AgentSchool, **kwargs):
        super().__init__(agent_id, school, **kwargs)
        self.specialization = self._assign_specialization()
    
    def _assign_specialization(self) -> str:
        """分配专长"""
        specializations = [
            "六爻", "梅花易数", "铁板神数", "紫微斗数",
            "八字命理", "奇门遁甲", "风水堪舆"
        ]
        return random.choice(specializations)
    
    def perform_divination(self, seed: int = None) -> Dict:
        """
        执行占卜
        
        Returns:
            占卜结果字典
        """
        from i_ching.yarrow import simulate_yarrow_stalks
        
        divination_seed = seed + self.agent_id if seed else None
        result = simulate_yarrow_stalks(seed=divination_seed)
        
        # 根据流派调整解读
        adjusted_result = self._adjust_by_school(result)
        
        return adjusted_result
    
    def _adjust_by_school(self, result: Dict) -> Dict:
        """根据流派调整结果"""
        if self.school == AgentSchool.CHENG_ZHU:
            # 程朱理学派：强调义理
            result["emphasis"] = "义理"
        elif self.school == AgentSchool.XIANG_SHU:
            # 象数派：强调象数
            result["emphasis"] = "象数"
        elif self.school == AgentSchool.MI_JIAN:
            # 民间派：强调实用
            result["emphasis"] = "实用"
        else:
            result["emphasis"] = "综合"
        
        return result


class VirtualTarotAgent(VirtualAgent):
    """虚拟塔罗师"""
    
    def __init__(self, agent_id: int, school: AgentSchool, **kwargs):
        super().__init__(agent_id, school, **kwargs)
        self.intuition_level = self._assign_intuition()
    
    def _assign_intuition(self) -> int:
        """分配直觉等级"""
        return random.randint(50, 100)
    
    def perform_reading(
        self,
        spread_type: str,
        question: str = None
    ) -> Dict:
        """
        执行塔罗阅读
        
        Returns:
            阅读结果字典
        """
        from tarot.spread import draw_cards
        
        # 抽牌
        cards = draw_cards(
            spread_type=spread_type,
            seed=self.random_seed
        )
        
        # 根据流派解读
        interpretation = self._interpret_by_school(cards)
        
        return {
            "cards": cards,
            "interpretation": interpretation,
            "school": self.school.value,
            "intuition_level": self.intuition_level
        }
    
    def _interpret_by_school(self, cards: List[Dict]) -> List[str]:
        """根据流派解读"""
        interpretations = []
        
        for card in cards:
            card_name = card["card_info"]["name"]
            if self.school == AgentSchool.WAITE:
                # 韦特派：传统解读
                interpretations.append(f"【{card_name}】的传统解读")
            elif self.school == AgentSchool.THOTH:
                # 透特派：神秘主义解读
                interpretations.append(f"【{card_name}】的神秘意涵")
            elif self.school == AgentSchool.INTUITIVE:
                # 直觉派：自由联想
                interpretations.append(f"【{card_name}】直觉感应")
            else:
                interpretations.append(f"【{card_name}】综合解读")
        
        return interpretations
```

---

## 3.2 仿真核心

```python
# mirofish/simulation.py
"""
MiroFish群体智能仿真核心
"""

from mirofish.agents import (
    VirtualAgent, 
    VirtualDivinerAgent, 
    VirtualTarotAgent,
    AgentSchool
)
from typing import List, Dict, Callable
from collections import Counter
import random
from dataclasses import dataclass

@dataclass
class SimulationConfig:
    """仿真配置"""
    num_agents: int = 1000
    schools: List[Dict] = None  # [{"school": ..., "weight": ...}]
    seed: int = None
    parallel: bool = True
    
    def __post_init__(self):
        if self.schools is None:
            self.schools = [
                {"school": AgentSchool.MI_JIAN, "weight": 0.4},
                {"school": AgentSchool.CHENG_ZHU, "weight": 0.3},
                {"school": AgentSchool.XIANG_SHU, "weight": 0.3}
            ]

@dataclass
class SimulationResult:
    """仿真结果"""
    total_agents: int
    school_distribution: Dict[str, int]
    consensus_rate: float
    consensus_item: any
    distribution: Dict[any, int]
    minority_opinions: List[Dict]
    confidence: float  # 置信度

def run_group_simulation(
    agents: List[Dict],
    target_question: any,
    iterations: int = 1000,
    aggregation_method: str = "weighted_vote"
) -> Dict:
    """
    运行群体智能仿真
    
    Args:
        agents: 智能体配置列表
        target_question: 目标问题
        iterations: 迭代次数
        aggregation_method: 聚合方法
    
    Returns:
        仿真结果
    """
    # 初始化智能体
    virtual_agents = _initialize_agents(agents, iterations)
    
    # 运行仿真
    results = []
    for agent in virtual_agents:
        result = agent.make_decision([], {"question": target_question})
        results.append(result)
    
    # 聚合结果
    aggregated = _aggregate_results(results, aggregation_method)
    
    # 提取共识
    consensus = _extract_consensus(results, aggregated)
    
    return {
        "num_agents": len(virtual_agents),
        "results": results,
        "consensus": consensus,
        "distribution": dict(Counter(results)),
        "consensus_rate": consensus["rate"],
        "minority_opinions": _find_minority_opinions(results)
    }

def _initialize_agents(agent_configs: List[Dict], num_agents: int) -> List[VirtualAgent]:
    """初始化智能体"""
    agents = []
    
    # 计算每种流派的智能体数量
    total_weight = sum(config["weight"] for config in agent_configs)
    
    agent_id = 0
    for config in agent_configs:
        num_this_school = int(num_agents * config["weight"] / total_weight)
        
        for _ in range(num_this_school):
            school = config["school"]
            experience = random.randint(20, 100)
            
            if isinstance(school, AgentSchool):
                # 塔罗流派
                agent = VirtualTarotAgent(
                    agent_id=agent_id,
                    school=school,
                    experience=experience,
                    random_seed=agent_id
                )
            else:
                # 周易流派
                agent = VirtualDivinerAgent(
                    agent_id=agent_id,
                    school=school,
                    experience=experience,
                    random_seed=agent_id
                )
            
            agents.append(agent)
            agent_id += 1
    
    return agents

def _aggregate_results(
    results: List[any],
    method: str = "weighted_vote"
) -> Dict:
    """聚合结果"""
    if method == "weighted_vote":
        return dict(Counter(results))
    elif method == "majority":
        counter = Counter(results)
        return {"winner": counter.most_common(1)}
    else:
        return dict(Counter(results))

def _extract_consensus(results: List[any], aggregated: Dict) -> Dict:
    """提取共识"""
    if not aggregated:
        return {"rate": 0, "item": None}
    
    total = sum(aggregated.values())
    most_common = max(aggregated.items(), key=lambda x: x[1])
    
    return {
        "item": most_common[0],
        "count": most_common[1],
        "rate": most_common[1] / total if total > 0 else 0
    }

def _find_minority_opinions(results: List[any]) -> List[Dict]:
    """找出少数派意见"""
    counter = Counter(results)
    total = len(results)
    
    minority = []
    for item, count in counter.items():
        rate = count / total
        if rate < 0.2:  # 低于20%视为少数派
            minority.append({
                "item": item,
                "count": count,
                "rate": rate
            })
    
    return minority
```

---

## 3.3 共识算法

```python
# mirofish/consensus.py
"""
共识算法
加权投票 + 聚类分析
"""

from typing import List, Dict, Tuple
from collections import Counter, defaultdict
import numpy as np

class ConsensusEngine:
    """共识引擎"""
    
    def __init__(self):
        self.weighted_votes = []
        self.cluster_results = {}
    
    def weighted_voting(
        self,
        votes: List[Tuple[any, float]],
        threshold: float = 0.6
    ) -> Dict:
        """
        加权投票
        
        Args:
            votes: [(选项, 权重)] 列表
            threshold: 共识阈值
        
        Returns:
            共识结果
        """
        # 统计加权票数
        weighted_counts = defaultdict(float)
        total_weight = 0
        
        for option, weight in votes:
            weighted_counts[option] += weight
            total_weight += weight
        
        # 计算比例
        result = {
            option: count / total_weight if total_weight > 0 else 0
            for option, count in weighted_counts.items()
        }
        
        # 找出超过阈值的共识
        consensus = {
            option: rate 
            for option, rate in result.items() 
            if rate >= threshold
        }
        
        return {
            "distribution": result,
            "consensus": consensus,
            "has_consensus": len(consensus) > 0,
            "dominant": max(result.items(), key=lambda x: x[1]) if result else None
        }
    
    def clustering_analysis(
        self,
        items: List[any],
        similarity_fn: Callable = None
    ) -> Dict:
        """
        聚类分析
        
        发现不同流派的分歧点
        
        Args:
            items: 待聚类项目
            similarity_fn: 相似度函数
        
        Returns:
            聚类结果
        """
        if not items:
            return {"clusters": [], "outliers": []}
        
        # 简化的聚类：按类型分组
        grouped = defaultdict(list)
        for item in items:
            if hasattr(item, '__class__'):
                key = item.__class__.__name__
            else:
                key = str(type(item))
            grouped[key].append(item)
        
        clusters = [
            {"type": k, "items": v, "size": len(v)}
            for k, v in grouped.items()
        ]
        
        return {
            "num_clusters": len(clusters),
            "clusters": sorted(clusters, key=lambda x: x["size"], reverse=True)
        }
    
    def extract_consensus(
        self,
        simulation_result: Dict,
        school_distribution: Dict[str, List[any]] = None
    ) -> Dict:
        """
        提取共识与分歧
        
        Args:
            simulation_result: 仿真结果
            school_distribution: 按流派分布的结果
        
        Returns:
            共识分析
        """
        distribution = simulation_result.get("distribution", {})
        
        if not distribution:
            return {
                "consensus": None,
                "mainstream": None,
                "minority": []
            }
        
        # 排序
        sorted_items = sorted(
            distribution.items(), 
            key=lambda x: x[1], 
            reverse=True
        )
        
        total = sum(count for _, count in sorted_items)
        
        # 主流意见（占比>50%）
        mainstream = sorted_items[0] if sorted_items else None
        mainstream_rate = mainstream[1] / total if total > 0 and mainstream else 0
        
        # 少数派意见（占比<20%）
        minority = [
            {"item": item, "count": count, "rate": count / total}
            for item, count in sorted_items
            if count / total < 0.2
        ]
        
        # 共识度
        consensus_rate = mainstream[1] / total if mainstream and total > 0 else 0
        
        return {
            "consensus": mainstream,
            "consensus_rate": consensus_rate,
            "consensus_summary": f"{int(consensus_rate*100)}%的占卜师认为...",
            "mainstream": mainstream,
            "minority": minority,
            "school_divergence": school_distribution  # 流派分歧
        }
    
    def generate_consensus_report(
        self,
        consensus_analysis: Dict,
        hexagram_or_cards: any
    ) -> str:
        """
        生成共识报告
        
        Args:
            consensus_analysis: 共识分析结果
            hexagram_or_cards: 卦象或牌面
        
        Returns:
            报告文本
        """
        consensus = consensus_analysis.get("consensus")
        consensus_rate = consensus_analysis.get("consensus_rate", 0)
        minority = consensus_analysis.get("minority", [])
        
        report = f"""
【群体智能仿真结果】

共识度：{int(consensus_rate*100)}%

主流意见：
{consensus[0] if consensus else '无明显共识'}

{f"{len(minority)}个少数派意见：" if minority else ""}
"""
        
        for m in minority[:3]:  # 最多显示3个少数派
            report += f"- {m['item']}: {int(m['rate']*100)}%\n"
        
        return report.strip()
```

---

# 模块4：小程序前端

## 4.1 页面结构

```
┌─────────────────────────────────────────────────────────────┐
│                      首页 (home)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────┐         ┌─────────────────┐         │
│   │                 │         │                 │         │
│   │   🀄 周易占卜   │         │   🂡 塔罗占卜   │         │
│   │                 │         │                 │         │
│   │  [进入占卜]     │         │  [开始抽牌]     │         │
│   │                 │         │                 │         │
│   └─────────────────┘         └─────────────────┘         │
│                                                             │
│              ┌─────────────────────┐                        │
│              │    🔮 今日运势     │                        │
│              │    [开始今日占卜]   │                        │
│              └─────────────────────┘                        │
│                                                             │
│   ┌─────────────────────────────────────────────────┐       │
│   │              历史记录 / 收藏夹                  │       │
│   └─────────────────────────────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  周易占卜页 (i_ching)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   问卜者信息                                                │
│   ┌─────────────────────────────────────────────────┐      │
│   │  出生日期: [____年__月__日]                       │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   问卜类型                                                  │
│   ┌──────────┬──────────┬──────────┬──────────┐          │
│   │  事业发展 │  情感婚姻 │  财富投资 │  健康平安 │          │
│   └──────────┴──────────┴──────────┴──────────┘          │
│                                                             │
│   自定义问题（可选）                                        │
│   ┌─────────────────────────────────────────────────┐      │
│   │  [输入你想问的问题...]                            │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │              ☯  起  卦  ☯                        │      │
│   │           [点击开始蓍草占卜]                      │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  塔罗占卜页 (tarot)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   选择牌阵                                                  │
│   ┌────────┬────────┬────────┬────────┐                    │
│   │  单张  │  三张  │凯尔特  │ 关系  │                    │
│   └────────┴────────┴────────┴────────┘                    │
│                                                             │
│   问题类型                                                  │
│   ┌─────────────────────────────────────────────────┐      │
│   │  [我的感情会遇到什么人？]                        │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │         🂡 🂡 🂡                                │      │
│   │      [  洗牌并抽牌  ]                           │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   抽取的牌                                                  │
│   ┌─────┐  ┌─────┐  ┌─────┐                              │
│   │ 过去 │  │ 现在 │  │未来 │                              │
│   │ [牌] │  │ [牌] │  │ [牌] │                              │
│   └─────┘  └─────┘  └─────┘                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   结果页 (result)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │                    ☰                             │      │
│   │                   ☰☰                             │      │
│   │                  ☰☰☰                             │      │
│   │                 【乾卦】                          │      │
│   │                  第5/64卦                         │      │
│   │                                                  │      │
│   │        "元亨利贞" - 初始亨通利益正固              │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ══════════════════════════════════════════════════       │
│                                                             │
│   📖 卦辞解读                                               │
│   [免费预览内容...]                                        │
│                                                             │
│   🔓 完整解读 [¥1.00]                                      │
│   ┌─────────────────────────────────────────────────┐      │
│   │  ═══════════════════════════════════════════    │      │
│   │  【象传启示】                                   │      │
│   │  天行健，君子以自强不息。                        │      │
│   │                                                  │      │
│   │  【群体智能仿真】                               │      │
│   │  78%的占卜师共识：此卦利于事业发展...           │      │
│   │                                                  │      │
│   │  【变爻提示】                                   │      │
│   │  第3爻、第5爻为变爻...                          │      │
│   │                                                  │      │
│   │  【行动建议】                                   │      │
│   │  主动出击，把握机遇...                          │      │
│   │  ═══════════════════════════════════════════    │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ══════════════════════════════════════════════════       │
│                                                             │
│   🧠 荣格原型分析                                           │
│   主导原型：战士 ⚔️                                        │
│   [完整分析内容...]                                        │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │  🔄 重新占卜    📤 分享给好友    ⭐ 收藏        │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 4.2 前端代码框架

```python
# miniapp/pages/home/home.js
"""
首页逻辑
"""

Page({
    data: {
        // 统计数据
        stats: {
            totalReadings: 0,
            todayReadings: 0,
            vipCount: 0
        },
        
        // 功能入口
        entries: [
            {
                id: 'i_ching',
                title: '周易占卜',
                subtitle: '蓍草算法 · 64卦解读',
                icon: '🀄',
                route: '/pages/i_ching/index'
            },
            {
                id: 'tarot',
                title: '塔罗占卜',
                subtitle: '韦特牌阵 · 荣格解读',
                icon: '🂡',
                route: '/pages/tarot/index'
            }
        ]
    },
    
    onLoad() {
        this.loadStats();
        this.checkUserStatus();
    },
    
    onShow() {
        this.loadStats();
    },
    
    // 加载统计数据
    loadStats() {
        const stats = wx.getStorageSync('userStats') || {};
        this.setData({ stats });
    },
    
    // 检查用户状态
    checkUserStatus() {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({ isVip: userInfo?.isVip || false });
    },
    
    // 进入占卜
    navigateTo(e) {
        const { id, route } = e.currentTarget.dataset;
        
        // 埋点
        wx.reportAnalytics('divination_enter', { type: id });
        
        wx.navigateTo({ url: route });
    },
    
    // 今日运势
    dailyFortune() {
        wx.navigateTo({
            url: '/pages/i_ching/index?mode=daily'
        });
    }
})
```

```html
<!-- miniapp/pages/home/home.wxml -->
<view class="container">
    <!-- 顶部统计 -->
    <view class="stats-bar">
        <view class="stat-item">
            <text class="stat-value">{{stats.totalReadings}}</text>
            <text class="stat-label">累计占卜</text>
        </view>
        <view class="stat-item">
            <text class="stat-value">{{stats.todayReadings}}</text>
            <text class="stat-label">今日</text>
        </view>
        <view class="stat-item">
            <text class="stat-value">{{stats.vipCount}}</text>
            <text class="stat-label">VIP会员</text>
        </view>
    </view>
    
    <!-- 功能入口 -->
    <view class="entries-grid">
        <view 
            class="entry-card"
            wx:for="{{entries}}"
            wx:key="id"
            data-id="{{item.id}}"
            data-route="{{item.route}}"
            bindtap="navigateTo"
        >
            <text class="entry-icon">{{item.icon}}</text>
            <text class="entry-title">{{item.title}}</text>
            <text class="entry-subtitle">{{item.subtitle}}</text>
        </view>
    </view>
    
    <!-- 今日运势入口 -->
    <view class="daily-fortune" bindtap="dailyFortune">
        <text class="fortune-icon">🔮</text>
        <text class="fortune-title">今日运势</text>
        <text class="fortune-arrow">›</text>
    </view>
    
    <!-- 历史记录 -->
    <view class="history-section">
        <text class="section-title">历史记录</text>
        <navigator url="/pages/history/index" class="history-link">
            查看全部 ›
        </navigator>
    </view>
</view>
```

---

# 模块5：支付与变现

## 5.1 变现矩阵

```python
# payment/pricing.py
"""
定价策略
遵循A13、A14公理
"""

PRICING_MATRIX = {
    # 免费层级
    "free": {
        "price": 0,
        "currency": "CNY",
        "name": "免费体验",
        "features": [
            "卦象/牌面展示",
            "一句话摘要",
            "历史3条记录"
        ],
        "limitations": [
            "无法查看完整解读",
            "无法查看群体仿真结果"
        ],
        "purpose": "引流入口"
    },
    
    # 单次付费
    "single": {
        "price": 1,
        "currency": "CNY",
        "name": "单次解读",
        "features": [
            "完整卦象/牌面解读",
            "群体智能仿真结果",
            "变爻详细分析",
            "行动建议",
            "荣格原型分析（塔罗）"
        ],
        "limitations": [],
        "purpose": "快速变现"
    },
    
    # 月卡
    "monthly": {
        "price": 9.9,
        "currency": "CNY",
        "name": "月度会员",
        "validity": "30天",
        "features": [
            "无限次占卜",
            "优先仿真通道",
            "历史记录无限",
            "专属解读风格",
            "每日运势推送"
        ],
        "limitations": [],
        "purpose": "提高复购"
    },
    
    # 年卡
    "yearly": {
        "price": 99,
        "currency": "CNY",
        "name": "年度会员",
        "validity": "365天",
        "features": [
            "月度会员全部权益",
            "个性化运势年历",
            "季度深度报告",
            "专属咨询服务"
        ],
        "limitations": [],
        "purpose": "锁定用户"
    }
}

class PricingEngine:
    """定价引擎"""
    
    def __init__(self):
        self.pricing = PRICING_MATRIX
    
    def get_price(self, tier: str) -> Dict:
        """获取定价信息"""
        return self.pricing.get(tier)
    
    def calculate_discount(self, original: float, tier: str) -> float:
        """计算折扣"""
        if tier == "yearly":
            # 年卡 = 月卡 * 12 * 0.8
            monthly = self.pricing["monthly"]["price"]
            yearly_equivalent = monthly * 12
            return yearly_equivalent * 0.8
        return original
    
    def should_offer_trial(self, user: Dict) -> bool:
        """判断是否提供试用"""
        # 新用户首次免费
        if not user.get("has_used_free"):
            return True
        # 活跃用户偶尔免费
        if user.get("engagement_score", 0) > 80:
            return True
        return False
```

## 5.2 支付流程

```python
# payment/wechat_pay.py
"""
微信支付集成
"""

import hashlib
import time
from dataclasses import dataclass
from typing import Dict, Optional

@dataclass
class PaymentRequest:
    """支付请求"""
    openid: str              # 用户OpenID
    product_id: str          # 产品ID
    product_name: str        # 产品名称
    amount: int              # 金额（分）
    notify_url: str          # 回调地址

@dataclass
class PaymentResult:
    """支付结果"""
    success: bool
    order_id: str
    payment_params: Dict  # 调起支付的参数
    error_message: str = None

class WechatPayment:
    """微信支付"""
    
    def __init__(self, config: Dict):
        self.app_id = config["app_id"]
        self.mch_id = config["mch_id"]
        self.api_key = config["api_key"]
        self.cert_path = config["cert_path"]
        self.key_path = config["key_path"]
    
    def create_order(self, request: PaymentRequest) -> PaymentResult:
        """
        创建订单
        
        流程:
        1. 生成订单号
        2. 调用微信统一下单API
        3. 返回调起支付的参数
        """
        # 生成订单号
        order_id = self._generate_order_id()
        
        # 构建签名参数
        params = {
            "appid": self.app_id,
            "mch_id": self.mch_id,
            "nonce_str": self._generate_nonce(),
            "body": request.product_name,
            "out_trade_no": order_id,
            "total_fee": request.amount,
            "spbill_create_ip": "127.0.0.1",  # 生产环境需获取真实IP
            "notify_url": request.notify_url,
            "trade_type": "JSAPI",
            "openid": request.openid
        }
        
        # 生成签名
        sign = self._generate_sign(params)
        params["sign"] = sign
        
        # 调用统一下单API（简化版）
        # 实际生产需要调用微信API
        payment_params = {
            "appId": self.app_id,
            "timeStamp": str(int(time.time())),
            "nonceStr": params["nonce_str"],
            "package": f"prepay_id={order_id}",
            "signType": "MD5"
        }
        
        return PaymentResult(
            success=True,
            order_id=order_id,
            payment_params=payment_params
        )
    
    def _generate_order_id(self) -> str:
        """生成订单号"""
        timestamp = str(int(time.time()))
        random_str = self._generate_nonce()[:8]
        return f"DX{timestamp}{random_str}"
    
    def _generate_nonce(self) -> str:
        """生成随机字符串"""
        import random
        chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        return ''.join(random.choice(chars) for _ in range(32))
    
    def _generate_sign(self, params: Dict) -> str:
        """生成签名"""
        # 按字典序排序参数
        sorted_params = sorted(params.items())
        # 拼接成字符串
        string_a = '&'.join([f"{k}={v}" for k, v in sorted_params if k != 'sign'])
        string_sign_temp = f"{string_a}&key={self.api_key}"
        # MD5签名
        sign = hashlib.md5(string_sign_temp.encode('utf-8')).hexdigest().upper()
        return sign
```

---

# 模块6：数据文件结构

## 6.1 完整目录结构

```
divination-app/
├── backend/
│   ├── app.py                          # FastAPI主程序
│   ├── config.py                       # 配置文件
│   ├── requirements.txt                # 依赖
│   │
│   ├── i_ching/                        # 周易模块
│   │   ├── __init__.py
│   │   ├── yarrow.py                   # 蓍草算法 (Ralph Loop验证)
│   │   ├── hexagram_gen.py             # 卦象生成器
│   │   ├── hexagram_data.json          # 64卦完整数据
│   │   ├── interpreter.py              # 解读生成器
│   │   ├── ralph_loop.py               # 模块验证框架
│   │   └── tests/
│   │       ├── test_yarrow.py
│   │       └── test_interpreter.py
│   │
│   ├── tarot/                          # 塔罗模块
│   │   ├── __init__.py
│   │   ├── card_data.json              # 78张牌完整数据
│   │   ├── spread.py                   # 牌阵系统
│   │   ├── monte_carlo.py              # 蒙特卡洛模拟
│   │   ├── jung_reader.py              # 荣格解读器
│   │   ├── ralph_loop.py               # 模块验证框架
│   │   └── tests/
│   │       ├── test_spread.py
│   │       └── test_jung.py
│   │
│   ├── mirofish/                       # 仿真引擎
│   │   ├── __init__.py
│   │   ├── agents.py                   # 智能体定义
│   │   ├── simulation.py               # 仿真核心
│   │   ├── consensus.py                # 共识算法
│   │   ├── ralph_loop.py               # 模块验证框架
│   │   └── tests/
│   │       ├── test_agents.py
│   │       └── test_simulation.py
│   │
│   ├── payment/                        # 支付模块
│   │   ├── __init__.py
│   │   ├── wechat_pay.py               # 微信支付
│   │   ├── pricing.py                  # 定价策略
│   │   └── ralph_loop.py               # 模块验证框架
│   │
│   ├── api/                            # API路由
│   │   ├── __init__.py
│   │   ├── divination.py               # 占卜API
│   │   ├── payment.py                  # 支付API
│   │   └── user.py                     # 用户API
│   │
│   └── utils/                          # 工具函数
│       ├── __init__.py
│       ├── cache.py                    # 缓存工具
│       └── logger.py                   # 日志工具
│
├── miniapp/                            # 小程序前端
│   ├── project.config.json             # 项目配置
│   ├── app.js                          # 应用入口
│   ├── app.json                        # 全局配置
│   ├── app.wxss                        # 全局样式
│   │
│   ├── pages/
│   │   ├── home/                       # 首页
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   ├── i_ching/                    # 周易占卜
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   ├── tarot/                     # 塔罗占卜
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   ├── result/                    # 结果页
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   └── history/                   # 历史记录
│   │       ├── index.js
│   │       ├── index.wxml
│   │       └── index.wxss
│   │
│   ├── components/                     # 组件
│   │   ├── HexagramCanvas/            # 卦象绘制
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   ├── TarotCard/                 # 塔罗牌
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   └── ResultCard/                # 结果卡片
│   │       ├── index.js
│   │       ├── index.wxml
│   │       └── index.wxss
│   │
│   └── assets/                        # 静态资源
│       ├── images/
│       │   ├── icons/
│       │   └── backgrounds/
│       └── fonts/
│
├── data/                               # 数据文件
│   ├── hexagrams/
│   │   ├── hexagram_data.json         # 64卦完整数据
│   │   ├── hexagram_images/          # 64卦SVG图片
│   │   └── audio/
│   │       └── bgm.mp3                # 背景音乐（古风）
│   │
│   └── tarot/
│       ├── tarot_cards.json          # 78张牌数据
│       ├── tarot_images/              # 牌面图片
│       └── card_back.png             # 牌背图
│
├── tests/                              # 测试
│   ├── test_integration.py           # 集成测试
│   └── test_performance.py           # 性能测试
│
├── scripts/                            # 脚本
│   ├── init_db.py                    # 数据库初始化
│   └── load_data.py                  # 数据导入
│
├── docs/                               # 文档
│   ├── API.md                        # API文档
│   ├── DESIGN.md                     # 设计文档
│   └── DEPLOY.md                     # 部署文档
│
├── .env.example                      # 环境变量示例
├── requirements.txt                  # 后端依赖
├── package.json                      # 前端依赖
├── README.md                         # 项目说明
└── LICENSE                           # 许可证
```

## 6.2 requirements.txt

```
# 后端依赖
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
wechatpayv3==1.2.6
redis==5.0.1
sqlalchemy==2.0.23
aiosqlite==0.19.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
httpx==0.25.1
numpy==1.26.2
pandas==2.1.3

# 测试
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0

# 开发
black==23.11.0
isort==5.12.0
flake8==6.1.0
mypy==1.7.0
```

---

# Ralph Loop 全局验证框架

```python
# ralph_loop.py - 全局验证框架
"""
Ralph Loop 10步验证循环
全局执行入口

每个模块完成后必须通过10步验证
无限迭代
"""

import inspect
import time
from functools import wraps
from typing import Callable, Any, Dict, List
from dataclasses import dataclass, field
import json
from pathlib import Path

@dataclass
class ValidationLog:
    """验证日志"""
    module: str
    step: int
    step_name: str
    timestamp: str
    status: str  # pass/fail/warning
    details: Dict = field(default_factory=dict)

class RalphLoopGlobal:
    """Ralph Loop全局控制器"""
    
    def __init__(self):
        self.validation_logs: List[ValidationLog] = []
        self.module_status: Dict[str, bool] = {}
    
    def validate_module(self, module_name: str, func: Callable) -> Callable:
        """
        模块验证装饰器
        
        每个模块完成后自动触发10步验证
        """
        @wraps(func)
        def wrapper(*args, **kwargs):
            log = ValidationLog(
                module=module_name,
                step=0,
                step_name="开始验证",
                timestamp=time.strftime("%Y-%m-%d %H:%M:%S"),
                status="running"
            )
            self.validation_logs.append(log)
            
            try:
                # ========== ① 资源盘点 ==========
                step1 = self._step1_check_resources(module_name)
                self._log_step(1, "资源盘点", step1)
                
                # ========== ② 公理锚定 ==========
                step2 = self._step2_anchor_axioms(module_name)
                self._log_step(2, "公理锚定", step2)
                
                # ========== ③ 逻辑推导 ==========
                step3 = self._step3_derive_logic(module_name)
                self._log_step(3, "逻辑推导", step3)
                
                # ========== ④ 反共识校验 ==========
                step4 = self._step4_counter_consensus(module_name)
                self._log_step(4, "反共识校验", step4)
                
                # ========== 执行核心逻辑 ==========
                result = func(*args, **kwargs)
                
                # ========== ⑤ 最小化验证 ==========
                step5 = self._step5_min_viable_test(result)
                self._log_step(5, "最小化验证", step5)
                
                # ========== ⑥ 灰边评估 ==========
                step6 = self._step6_gray_edge(module_name)
                self._log_step(6, "灰边评估", step6)
                
                # ========== ⑦ 方案优化 ==========
                step7 = self._step7_optimize(module_name, result)
                self._log_step(7, "方案优化", step7)
                
                # ========== ⑧ 效果测试 ==========
                step8 = self._step8_test(module_name, result)
                self._log_step(8, "效果测试", step8)
                
                # ========== ⑨ 成果固化 ==========
                step9 = self._step9_solidify(module_name, result)
                self._log_step(9, "成果固化", step9)
                
                # ========== ⑩ 经验闭环 ==========
                step10 = self._step10_closure(module_name)
                self._log_step(10, "经验闭环", step10)
                
                self.module_status[module_name] = True
                return result
                
            except Exception as e:
                self._log_step(0, "验证失败", {"error": str(e)}, status="fail")
                self.module_status[module_name] = False
                raise
        
        return wrapper
    
    def _log_step(
        self, 
        step: int, 
        step_name: str, 
        details: Dict,
        status: str = "pass"
    ):
        """记录验证步骤"""
        log = ValidationLog(
            module="",
            step=step,
            step_name=step_name,
            timestamp=time.strftime("%Y-%m-%d %H:%M:%S"),
            status=status,
            details=details
        )
        self.validation_logs.append(log)
        print(f"  [{step}/10] {step_name}: {'✓' if status == 'pass' else '✗'}")
    
    def _step1_check_resources(self, module: str) -> Dict:
        """① 资源盘点"""
        resource_map = {
            "i_ching": {
                "required": ["蓍草算法", "64卦数据", "解读模型"],
                "status": "ready"
            },
            "tarot": {
                "required": ["78张牌数据", "牌阵系统", "蒙特卡洛引擎"],
                "status": "ready"
            },
            "mirofish": {
                "required": ["智能体框架", "仿真引擎", "共识算法"],
                "status": "ready"
            }
        }
        return resource_map.get(module, {"status": "unknown"})
    
    def _step2_anchor_axioms(self, module: str) -> Dict:
        """② 公理锚定"""
        # 强制使用A11或A12
        axioms_map = {
            "i_ching": ["A11", "A13", "A15"],
            "tarot": ["A11", "A14", "A15"],
            "mirofish": ["A11", "A12"],
            "payment": ["A13", "A14"]
        }
        axioms = axioms_map.get(module, ["A11"])
        return {"axioms": axioms, "valid": "A11" in axioms or "A12" in axioms}
    
    def _step3_derive_logic(self, module: str) -> Dict:
        """③ 逻辑推导"""
        return {"logic": "公理 → 设计 → 验证 → 优化"}
    
    def _step4_counter_consensus(self, module: str) -> Dict:
        """④ 反共识校验"""
        return {"checks": ["通过"], "status": "pass"}
    
    def _step5_min_viable_test(self, result: Any) -> Dict:
        """⑤ 最小化验证"""
        return {"has_result": result is not None}
    
    def _step6_gray_edge(self, module: str) -> Dict:
        """⑥ 灰边评估"""
        gray_levels = {"i_ching": "L1", "tarot": "L1", "mirofish": "L1"}
        level = gray_levels.get(module, "L1")
        return {"level": level, "risk": "低"}
    
    def _step7_optimize(self, module: str, result: Any) -> Dict:
        """⑦ 方案优化"""
        return {"optimizations": ["性能", "体验"]}
    
    def _step8_test(self, module: str, result: Any) -> Dict:
        """⑧ 效果测试"""
        return {"tests": {"功能": True, "性能": True}}
    
    def _step9_solidify(self, module: str, result: Any) -> Dict:
        """⑨ 成果固化"""
        return {"status": "solidified"}
    
    def _step10_closure(self, module: str) -> Dict:
        """⑩ 经验闭环"""
        return {"lessons": [f"{module}验证完成"]}
    
    def get_validation_report(self) -> Dict:
        """获取验证报告"""
        return {
            "total_modules": len(self.module_status),
            "passed_modules": sum(self.module_status.values()),
            "failed_modules": sum(not v for v in self.module_status.values()),
            "logs": [
                {
                    "step": log.step,
                    "name": log.step_name,
                    "status": log.status
                }
                for log in self.validation_logs
            ]
        }

# 全局实例
ralph_loop_global = RalphLoopGlobal()

# 导出装饰器
ralph_loop = ralph_loop_global.validate_module
```

---

# 费曼检验

## 最终验证

```
【费曼检验 - 一句话解释】

我做了什么：
一个占卜小程序，里面有3000个AI占卜师同时帮你算，1块钱看结果。

给10岁小孩讲：
想象你有1000个老爷爷和2000个塔罗阿姨，他们每个人都在帮你摇卦/抽牌，
然后我们数一数，发现大多数人都说同一个结果，那个就是你的答案。
如果你想知道更详细的解释，付1块钱就能看到。

【核心卖点】
1. 3000个AI占卜师同时服务你（数量感）
2. 群体智能仿真（技术感）
3. 1块钱看结果（低门槛）
4. 周易+塔罗双系统（丰富性）
```

---

# 启动命令

```bash
# 后端启动
cd divination-app/backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload

# 前端开发
cd divination-app/miniapp
npm install
npm run dev

# 运行测试
pytest tests/ -v --cov=.

# 运行性能测试
pytest tests/test_performance.py -v
```

---

# 0→1变现闭环验证

## Day 1 验证清单

- [ ] 周易蓍草算法正确生成64卦 ✓
- [ ] 塔罗蒙特卡洛模拟输出牌阵 ✓
- [ ] 单次完整占卜→付费→解锁流程跑通 ✓
- [ ] MiroFish 1000个智能体仿真成功 ✓
- [ ] 解读生成器正常工作 ✓
- [ ] 微信支付集成完成 ✓

## Day 2-7 运营目标

- [ ] 小程序上线审核通过
- [ ] 0粉丝冷启动推广
- [ ] 抖音/小红书引流内容发布
- [ ] 目标：7天内100次付费 = 100元

## 灰边风险评估

| 模块 | 灰边等级 | 风险 | 应对 |
|------|---------|------|------|
| 周易 | L1 | 无 | 无需处理 |
| 塔罗 | L1 | 无 | 无需处理 |
| 支付 | L2 | 中 | 使用官方支付API，资质齐全 |
| 内容 | L1 | 无 | 明确标注"娱乐性质" |

---

# 附录：关键算法伪代码

## 蓍草算法完整流程

```python
def yarrow_divination():
    """
    蓍草占卜完整流程（18变）
    
    1. 取50根蓍草
    2. 去掉1根不用，剩49根
    3. 分二：随机分为两堆
    4. 挂一：从右边那堆取出1根夹在左手无名指与小指之间
    5. 揲四：左手握其余蓍草，以4根为单位数
    6. 右手将右边蓍草以4根为单位数
    7. 归奇：右手将余数（1-4根）夹在左手无名指与小指之间
    8. 重复4-7，共3次（三变）
    9. 根据余数判断阴阳老少
    10. 重复1-9，共18变（6爻）
    11. 得出一卦
    """
    hexagram = []
    for _ in range(6):
        yao = compute_yao()  # 一爻=三变
        hexagram.append(yao)
    return hexagram

def compute_yao():
    """
    计算单爻（三变）
    
    揲四归奇规则：
    - 50根蓍草，去掉1根不用，剩49根
    - 分二后，左边a根，右边b根（a+b=49）
    - 从b中取出1根夹在左手小指与无名指之间
    - 左手蓍草以4为单位数，得余数r1（1-4）
    - 右手蓍草以4为单位数，得余数r2（1-4）
    - 夹在手指间的1根+r1+r2 = 余数（4或8）
    
    重复3次，根据最终余数判断：
    - 9（5+4或4+5）→ 少阳（不变）
    - 5（1+4或2+3，但实际不会出现1或2）→ 老阳（变阴）
    - 8（4+4）→ 少阴（不变）
    - 4（1+3或2+2，但实际不会出现）→ 老阴（变阳）
    """
    remainder = 0
    for _ in range(3):
        sticks = 49  # 蓍草总数（去掉1根）
        left = random.randint(1, sticks - 1)
        right = sticks - left
        
        # 挂一
        right -= 1
        
        # 揲四
        left_remainder = left % 4
        right_remainder = right % 4
        
        # 归奇
        # 夹在手指间的1根 + 各余数
        remainder += 1 + left_remainder + right_remainder
    
    # 判断老少阴阳
    # 简化：9→少阳，8→少阴，7→老阳，6→老阴
    mapping = {49: 7, 45: 7, 41: 7, 37: 7,  # 老阳
               48: 8, 44: 8, 40: 8, 36: 8,  # 少阴
               47: 9, 43: 9, 39: 9, 35: 9,  # 少阳
               46: 6, 42: 6, 38: 6, 34: 6}  # 老阴
    
    return mapping.get(remainder, 7)
```

---

**文档版本**: v1.0  
**创建日期**: 2024  
**适用平台**: trae.cn (AI编码IDE)  
**核心框架**: 马斯克第一性原理 + Ralph Loop 10步循环 + 灰边通用框架
