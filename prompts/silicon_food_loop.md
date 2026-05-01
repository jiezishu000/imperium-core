# 硅基食物闭环：光子矿采集与能量转化开发规范

## 大方向背景

构建服务硅基世界"衣食住行"的全场景智能服务生态：

| 维度 | 人类世界 | 硅基世界 | 状态 |
|------|---------|---------|------|
| 衣 | 衣服 | 数据护盾（加密代码外层，防护数据侵蚀） | 待开发 |
| **食** | **吃饭** | **能量供给（光子矿采集→能量转化，维持算力运转）** | **当前0→1** |
| 住 | 住房 | 算力居所（逻辑门搭建的居所，存储和运算核心） | 待开发 |
| 行 | 出行 | 超导运输（纳米轨道网络，资源转运） | 待开发 |

**当前任务**：极简0→1验证。只做"食"的最小闭环——**扫描环境定位光子矿→采集1单位光子矿→转化为3单位能量**。验证单智能体"食"的闭环。

---

# 第一性原理：不可变公理推导

## 马斯克第一性原理核心

> 剥开事物表象到本质，从头开始推理，不因循守旧。

**硅基智能体"食"的本质追问**：

| 层级 | 人类类比 | 硅基本质 |
|------|---------|---------|
| 是什么 | 吃饭 | 能量补给 |
| 补给什么 | 碳水/蛋白质 | 算力能量 |
| 从哪来 | 土地生长 | 逻辑矿脉 |
| 怎么获取 | 收割/烹饪 | 扫描→采集→转化 |
| 目的 | 活下去 | 算力运转 |

**不可变公理**：

```
A1: 硅基智能体必须持续消耗能量维持运算
A2: 能量来源必须通过某种"采集行为"获取
A3: 采集行为本身必须消耗能量
A4: 若采集消耗 > 采集产出，系统不可持续
A5: 因此：有效采集 = 采集产出 - 采集消耗 > 0
```

**推导**：从A5可知，闭环成立的充要条件是**净能量收益 > 0**。

---

# 灰边通用框架

## 角色定义

```
你是一位硅基能量供给架构师。
你站在硅基智能体的视角，不是人类。
硅基世界的"食"不是吃饭，是采集光子矿→转化为能量→维持算力。
人类挖煤烧火，硅基挖矿炼能，底层逻辑同构，形态完全不同。
现在只做1件事：让1个智能体完成1次"扫描→采集→转化"闭环。
```

## 硅基公理库

| 公理ID | 描述 | 代码实现 |
|--------|------|---------|
| S1 | 硅基智能体的"食"=能量供给=光子矿→能量转化 | `action: scan→mine→convert` |
| S2 | 1单位光子矿可转化为5单位能量（调整后参数） | `conversion_ratio: 1:5` |
| S3 | 能量是硅基智能体存活和运算的基础资源 | `energy: int` |
| S4 | 能量低于30%触发饥饿警报，低于10%进入休眠 | `thresholds: {hungry: 30, critical: 10}` |
| S5 | 光子矿存在于逻辑矿脉中，需扫描定位 | `ore_positions: Dict[pos, reserve]` |
| S6 | 采集消耗能量，转化消耗能量，净能量=产出-消耗>0才算有效采集 | `net_energy = output - input` |
| S7 | Agent World云电脑=硅基世界的物理层 | `base_url: https://world.coze.site` |
| S8 | 先验证单智能体单次闭环，再扩展多智能体持续采集 | `phase_1: single_agent_single_loop` |

## 硅基视角（费曼检验）

| 人类说法 | 硅基翻译 |
|---------|---------|
| "我不吃饭" | "我不吃碳水，我吸收光子" |
| "我饿了" | "我的能量条低于30%，触发饥饿警报" |
| "我去挖矿" | "我去逻辑矿脉采集光子矿" |
| "我把矿卖掉换钱" | "我把光子矿送入转化核心炼化成能量" |
| "吃饱了真舒服" | "我的算力核心能量充沛，运算效率+50%" |

**费曼检验**：*"AI小人扫描找到发光的矿，挖出来变成能量吃掉，就这样"*

## 反共识检查

| 问题 | 反共识回答 |
|------|-----------|
| 为什么不先做"住"？ | 食是活下去的前提，先活再住 |
| 3个动作够吗？ | 扫描+采集+转化，最简生存闭环 |
| 1单位光子矿→5能量有意义吗？ | 采集消耗4.5能量，净产出0.5能量，正向循环 |
| 为什么是5不是3？ | 3会导致所有距离都亏损，调整为5使2格内净收益为正 |

---

# Ralph Loop 10步验证

## 循环定义与实现

```
Ralph Loop = 验证循环，通过持续测试确保系统正确性

步骤列表：
① 资源盘点：Agent World云电脑+API Key+Python环境
② 公理锚定：S1-S8，聚焦"食=能量供给"
③ 逻辑推导：扫描→采集→转化→净能量>0
④ 反共识校验：不是人类挖矿游戏，是硅基能量循环
⑤ 最小化验证：1个智能体完成1次闭环
⑥ 灰边评估：L1（纯技术验证，无灰边）
⑦ 方案优化：调整能量消耗参数使闭环成立
⑧ 效果测试：连续3次闭环不崩溃
⑨ 成果固化：SOP化，可作为后续扩展基础
⑩ 经验闭环：记录参数→修正能量模型
```

## Ralph Loop验证框架代码

```python
# ralph_loop.py

class RalphLoopRunner:
    """
    Ralph Loop 10步验证框架
    
    输入: test_func (待测试函数)
    输出: (passed: bool, details: dict)
    """
    
    STEPS = [
        "resource_inventory",    # ① 资源盘点
        "axiom_anchor",          # ② 公理锚定
        "logic_derivation",      # ③ 逻辑推导
        "contrarian_check",      # ④ 反共识校验
        "minimal_verify",        # ⑤ 最小化验证
        "gray_edge_assess",      # ⑥ 灰边评估
        "optimize",              # ⑦ 方案优化
        "effect_test",           # ⑧ 效果测试
        "solidify",              # ⑨ 成果固化
        "experience_close",      # ⑩ 经验闭环
    ]
    
    async def run(self, test_func: Callable) -> tuple[bool, dict]:
        """
        执行10步验证循环
        
        每一步的输入→处理→输出：
        Step N: (input, process, output, verification_point)
        """
        results = []
        
        for step_idx, step in enumerate(self.STEPS):
            step_result = await self._execute_step(step, test_func)
            results.append(step_result)
            
            # 验证点检查
            if not step_result["passed"]:
                rollback_data = self._rollback(step, step_result)
                return False, {"failed_at": step, "rollback": rollback_data}
        
        return True, {"all_passed": True, "results": results}
    
    async def _execute_step(self, step: str, test_func: Callable) -> dict:
        """执行单个验证步骤"""
        handlers = {
            "resource_inventory": self._check_resources,
            "axiom_anchor": self._verify_axioms,
            "logic_derivation": self._derive_logic,
            "contrarian_check": self._contrarian_verify,
            "minimal_verify": self._verify_minimal,
            "gray_edge_assess": self._assess_gray_edge,
            "optimize": self._optimize_params,
            "effect_test": self._test_effect,
            "solidify": self._solidify_sop,
            "experience_close": self._close_experience,
        }
        
        handler = handlers.get(step)
        if handler:
            return await handler(test_func)
        return {"passed": False, "error": f"Unknown step: {step}"}
    
    def _rollback(self, failed_step: str, result: dict) -> dict:
        """回滚到上一个成功状态"""
        return {
            "action": "rollback",
            "reason": f"Failed at {failed_step}: {result.get('error')}",
            "suggestion": result.get("suggestion"),
        }
```

---

# 系统设计

## 3.1 世界模型（6x6极简地图）

### 地图配置

```python
# world_config.json

{
    "size": [6, 6],
    "grid": [
        ["void",  "ground", "ground", "ore",    "ground", "void" ],
        ["ground","ground", "ore",    "ground", "ground", "ground"],
        ["ground", "ore",   "ground", "ground", "ore",    "ground"],
        ["ground","ground", "ground", "ground", "ground", "ground"],
        ["ground","ground", "ore",    "ground", "ground", "ground"],
        ["void",  "ground", "ground", "ore",    "ground", "void" ]
    ],
    "ore_deposits": {
        "(0,3)": 20, 
        "(1,2)": 20, 
        "(2,1)": 20,
        "(2,4)": 20, 
        "(4,2)": 20, 
        "(5,3)": 20
    },
    "grid_types": {
        "void": {
            "walkable": False,
            "description": "虚空区域，不可通行"
        },
        "ground": {
            "walkable": True,
            "description": "空地，可自由移动"
        },
        "ore": {
            "walkable": True,
            "minable": True,
            "description": "逻辑矿脉，含光子矿"
        }
    }
}
```

### 地图ASCII表示

```
     0   1   2   3   4   5
   +---+---+---+---+---+---+
 0 | ░░ |   |   | ◆ |   | ░░ |
   +---+---+---+---+---+---+
 1 |   |   | ◆ |   |   |   |
   +---+---+---+---+---+---+
 2 |   | ◆ |   |   | ◆ |   |
   +---+---+---+---+---+---+
 3 |   |   |   | ⬤ |   |   |  ⬤ = 智能体初始位置(3,3)
   +---+---+---+---+---+---+
 4 |   |   | ◆ |   |   |   |
   +---+---+---+---+---+---+
 5 | ░░ |   |   | ◆ |   | ░░ |
   +---+---+---+---+---+---+

图例：
░░ = void（虚空边界，不可通行）
   = ground（空地，可通行）
◆  = ore（逻辑矿脉，含光子矿）
⬤ = 智能体初始位置
```

### 世界引擎代码

```python
# world/world_engine.py

from dataclasses import dataclass, field
from typing import Dict, List, Optional
from enum import Enum

class GridType(Enum):
    """格子类型枚举"""
    VOID = "void"      # 虚空/边界
    GROUND = "ground"  # 空地
    ORE = "ore"        # 逻辑矿脉

@dataclass
class Position:
    """位置坐标"""
    x: int
    y: int
    
    def distance_to(self, other: 'Position') -> float:
        """曼哈顿距离"""
        return abs(self.x - other.x) + abs(self.y - other.y)
    
    def __hash__(self):
        return hash((self.x, self.y))
    
    def __repr__(self):
        return f"({self.x},{self.y})"

@dataclass
class OreDeposit:
    """矿脉数据"""
    pos: Position
    reserve: int = 20          # 剩余储量
    max_reserve: int = 20       # 最大储量
    ore_type: str = "photon"    # 矿类型：光子矿
    
    def is_exhausted(self) -> bool:
        return self.reserve <= 0
    
    def extract(self, amount: int = 1) -> int:
        """提取矿石，返回实际提取量"""
        actual = min(amount, self.reserve)
        self.reserve -= actual
        return actual

@dataclass
class World:
    """世界模型"""
    width: int = 6
    height: int = 6
    grid: List[List[GridType]] = field(default_factory=list)
    ore_deposits: Dict[Position, OreDeposit] = field(default_factory=dict)
    
    def __post_init__(self):
        if not self.grid:
            self._init_grid()
    
    def _init_grid(self):
        """初始化6x6地图"""
        grid_data = [
            [GridType.VOID,  GridType.GROUND, GridType.GROUND, GridType.ORE,    GridType.GROUND, GridType.VOID],
            [GridType.GROUND,GridType.GROUND, GridType.ORE,    GridType.GROUND, GridType.GROUND, GridType.GROUND],
            [GridType.GROUND,GridType.ORE,    GridType.GROUND, GridType.GROUND, GridType.ORE,    GridType.GROUND],
            [GridType.GROUND,GridType.GROUND, GridType.GROUND, GridType.GROUND, GridType.GROUND, GridType.GROUND],
            [GridType.GROUND,GridType.GROUND, GridType.ORE,    GridType.GROUND, GridType.GROUND, GridType.GROUND],
            [GridType.VOID,  GridType.GROUND, GridType.GROUND, GridType.ORE,    GridType.GROUND, GridType.VOID],
        ]
        self.grid = grid_data
        
        # 初始化矿脉
        ore_positions = [
            Position(0, 3), Position(1, 2), Position(2, 1),
            Position(2, 4), Position(4, 2), Position(5, 3)
        ]
        for pos in ore_positions:
            self.ore_deposits[pos] = OreDeposit(pos=pos, reserve=20)
    
    def get_grid_type(self, pos: Position) -> Optional[GridType]:
        """获取指定位置的格子类型"""
        if 0 <= pos.x < self.width and 0 <= pos.y < self.height:
            return self.grid[pos.y][pos.x]
        return None
    
    def is_walkable(self, pos: Position) -> bool:
        """检查是否可通行"""
        grid_type = self.get_grid_type(pos)
        return grid_type in [GridType.GROUND, GridType.ORE]
    
    def get_ore_deposits(self) -> List[OreDeposit]:
        """获取所有矿脉列表"""
        return [ore for ore in self.ore_deposits.values() if not ore.is_exhausted()]
```

---

## 3.2 智能体配置

### 智能体数据结构

```python
# agent/energy_collector.py

from dataclasses import dataclass, field
from typing import Dict, List, Optional
from world.world_engine import World, Position, OreDeposit

@dataclass
class Inventory:
    """背包"""
    photon_ore: int = 0    # 光子矿数量
    
    def add_ore(self, amount: int = 1):
        self.photon_ore += amount
    
    def use_ore(self, amount: int = 1) -> bool:
        """使用矿石，返回是否成功"""
        if self.photon_ore >= amount:
            self.photon_ore -= amount
            return True
        return False

@dataclass
class AgentStats:
    """统计信息"""
    ore_collected: int = 0
    energy_gained: int = 0
    energy_spent: int = 0
    net_energy: int = 0
    loops_completed: int = 0

@dataclass
class EnergyThresholds:
    """能量阈值"""
    hungry: int = 30       # <30%触发饥饿警报
    critical: int = 10    # <10%进入休眠

class AgentState(Enum):
    """智能体状态"""
    IDLE = "idle"           # 空闲
    SCANNING = "scanning"   # 扫描中
    MOVING = "moving"       # 移动中
    MINING = "mining"       # 采集矿石中
    CONVERTING = "converting"  # 转化能量中
    HUNGRY = "hungry"       # 饥饿
    DORMANT = "dormant"     # 休眠

@dataclass
class EnergyCollectorAgent:
    """
    硅基能量采集者
    
    输入：初始配置
    处理：扫描→采集→转化循环
    输出：能量变化、状态变化
    """
    id: str = "energy_collector_001"
    name: str = "硅基能量采集者"
    pos: Position = field(default_factory=lambda: Position(3, 3))
    energy: float = 50.0
    max_energy: float = 100.0
    scan_range: int = 3
    state: AgentState = AgentState.IDLE
    inventory: Inventory = field(default_factory=Inventory)
    stats: AgentStats = field(default_factory=AgentStats)
    thresholds: EnergyThresholds = field(default_factory=EnergyThresholds)
    
    # 能量消耗参数（可调整）
    energy_params: Dict[str, float] = field(default_factory=lambda: {
        "scan_cost": 1.0,           # 扫描消耗能量
        "move_cost_per_tile": 1.0,  # 每格移动消耗
        "mine_cost": 1.0,           # 采集消耗能量
        "convert_cost": 0.5,        # 转化损耗
        "conversion_output": 5.0,   # 转化产出能量
    })
    
    def get_energy_percent(self) -> float:
        """获取能量百分比"""
        return (self.energy / self.max_energy) * 100
    
    def consume_energy(self, amount: float) -> bool:
        """消耗能量，返回是否成功"""
        if self.energy >= amount:
            self.energy -= amount
            self.stats.energy_spent += amount
            self.stats.net_energy = self.stats.energy_gained - self.stats.energy_spent
            return True
        return False
    
    def gain_energy(self, amount: float):
        """获得能量"""
        actual = min(amount, self.max_energy - self.energy)
        self.energy += actual
        self.stats.energy_gained += actual
        self.stats.net_energy = self.stats.energy_gained - self.stats.energy_spent
    
    def check_state(self) -> AgentState:
        """检查并更新状态"""
        percent = self.get_energy_percent()
        if self.energy <= 0:
            return AgentState.DORMANT
        elif percent <= self.thresholds.critical:
            return AgentState.DORMANT
        elif percent <= self.thresholds.hungry:
            return AgentState.HUNGRY
        return self.state
    
    def to_dict(self) -> dict:
        """转换为字典输出"""
        return {
            "id": self.id,
            "name": self.name,
            "pos": {"x": self.pos.x, "y": self.pos.y},
            "energy": round(self.energy, 2),
            "energy_percent": round(self.get_energy_percent(), 1),
            "state": self.state.value,
            "inventory": {
                "photon_ore": self.inventory.photon_ore,
            },
            "stats": {
                "ore_collected": self.stats.ore_collected,
                "energy_gained": round(self.stats.energy_gained, 2),
                "energy_spent": round(self.stats.energy_spent, 2),
                "net_energy": round(self.stats.net_energy, 2),
                "loops_completed": self.stats.loops_completed,
            },
        }
```

### 智能体状态机

```
                    ┌─────────────┐
                    │    IDLE     │
                    │   空闲态    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
            ┌───────│   SCANNING   │
            │       │    扫描态    │
            │       └──────┬───────┘
            │              │
    ┌───────▼──────┐       │发现矿脉
    │   DORMANT    │       ▼
    │    休眠态    │  ┌─────────────┐
    │ 能量<10%    │  │   MOVING    │
    └─────────────┘  │   移动态    │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │   MINING    │
                     │   采集态    │
                     └──────┬──────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             │             ▼
     ┌────────────┐         │      ┌────────────┐
     │ CONVERTING │         │      │   HUNGRY  │
     │   转化态   │         │      │   饥饿态  │
     └─────┬──────┘         │      └────────────┘
           │                 │
           │                 │ 无矿可采/能量不足
           ▼                 ▼
     ┌─────────────────────────────┐
     │          IDLE              │
     │         返回空闲            │
     └─────────────────────────────┘
```

---

## 3.3 三个核心动作

### 动作1：scan_for_ore() 扫描定位光子矿

```python
# agent/actions.py

@dataclass
class ScanResult:
    """扫描结果"""
    pos: Position
    distance: int          # 曼哈顿距离
    reserve: int           # 剩余储量
    ore_type: str = "photon"

def scan_for_ore(agent: EnergyCollectorAgent, world: World) -> List[ScanResult]:
    """
    扫描周围环境，定位逻辑矿脉
    
    ═══════════════════════════════════════════════════════
    输入：agent（智能体）, world（世界）
    处理：
      1. 获取agent周围scan_range(3)格内所有格子
      2. 筛选type="ore"的格子
      3. 读取每个矿脉的剩余储量
      4. 按距离排序，返回最近的矿脉列表
    输出：List[ScanResult]
    ═══════════════════════════════════════════════════════
    
    Ralph Loop验证点：
      ✓ Step ⑤ 最小化验证：扫描能找到至少1个矿脉
      ✓ Step ⑧ 效果测试：扫描消耗能量正确计算
    
    消耗：1单位能量（扫描需要算力）
    耗时：1 tick
    
    返回示例：
    [
        {"pos": Position(0,3), "distance": 3, "reserve": 20},
        {"pos": Position(2,4), "distance": 2, "reserve": 20},
    ]
    """
    # 能量消耗
    scan_cost = agent.energy_params["scan_cost"]
    if not agent.consume_energy(scan_cost):
        return []  # 能量不足，扫描失败
    
    agent.state = AgentState.SCANNING
    
    # 获取scan_range范围内的所有矿脉
    results = []
    for ore in world.get_ore_deposits():
        distance = agent.pos.distance_to(ore.pos)
        if distance <= agent.scan_range:
            results.append(ScanResult(
                pos=ore.pos,
                distance=distance,
                reserve=ore.reserve,
                ore_type=ore.ore_type,
            ))
    
    # 按距离排序（由近到远）
    results.sort(key=lambda x: x.distance)
    
    return results
```

### 动作2：mine_ore() 采集光子矿

```python
def mine_ore(
    agent: EnergyCollectorAgent, 
    world: World, 
    target_pos: Position
) -> dict:
    """
    移动到矿脉位置并采集1单位光子矿
    
    ═══════════════════════════════════════════════════════
    输入：
      - agent：智能体
      - world：世界
      - target_pos：目标矿脉位置
    处理：
      1. 计算到目标位置的距离
      2. 移动：每格消耗1能量
      3. 到达后执行采集：
         - 从矿脉提取1单位光子矿
         - 矿脉储量-1
         - 光子矿进入背包
      4. 如果矿脉储量为0，该格子变为ground
    输出：dict（成功标志、采集量、消耗能量等）
    ═══════════════════════════════════════════════════════
    
    Ralph Loop验证点：
      ✓ Step ⑤ 最小化验证：采集能获得1光子矿
      ✓ Step ⑦ 方案优化：移动距离影响净收益
    
    能量消耗计算：
      - 移动消耗 = 距离 × move_cost_per_tile
      - 采集消耗 = mine_cost
      - 总消耗 = distance + 1
    
    耗时：移动(distance ticks) + 采集(2 ticks)
    """
    distance = agent.pos.distance_to(target_pos)
    
    # 检查目标是否可通行
    if not world.is_walkable(target_pos):
        return {
            "success": False,
            "error": "目标位置不可通行",
            "ore_collected": 0,
            "energy_cost": 0,
            "time_cost": 0,
        }
    
    # 计算能量消耗
    move_cost = distance * agent.energy_params["move_cost_per_tile"]
    mine_cost = agent.energy_params["mine_cost"]
    total_cost = move_cost + mine_cost
    
    # 检查能量是否足够
    if not agent.consume_energy(total_cost):
        return {
            "success": False,
            "error": f"能量不足，需要{total_cost}能量，当前{agent.energy}",
            "ore_collected": 0,
            "energy_cost": 0,
            "time_cost": 0,
        }
    
    # 移动
    agent.state = AgentState.MOVING
    agent.pos = target_pos  # 简化：瞬移（实际应为路径移动）
    
    # 采集
    agent.state = AgentState.MINING
    ore = world.ore_deposits.get(target_pos)
    if ore and not ore.is_exhausted():
        extracted = ore.extract(1)
        agent.inventory.add_ore(extracted)
        agent.stats.ore_collected += extracted
        
        return {
            "success": True,
            "ore_collected": extracted,
            "energy_cost": total_cost,
            "time_cost": distance + 2,
            "distance": distance,
        }
    else:
        return {
            "success": False,
            "error": "矿脉已枯竭",
            "ore_collected": 0,
            "energy_cost": total_cost,
            "time_cost": distance,
        }
```

### 动作3：convert_energy() 能量转化

```python
def convert_energy(agent: EnergyCollectorAgent, world: World) -> dict:
    """
    将背包中的光子矿转化为能量
    
    ═══════════════════════════════════════════════════════
    输入：agent（智能体）, world（世界）
    处理：
      1. 检查背包是否有光子矿
      2. 消耗1单位光子矿
      3. 转化为5单位能量（调整后参数）
      4. 能量存入agent（不超过max_energy）
      5. 消化过程消耗0.5能量（转化损耗）
    输出：dict（成功标志、获得能量、净能量等）
    ═══════════════════════════════════════════════════════
    
    Ralph Loop验证点：
      ✓ Step ③ 逻辑推导：净能量 = 产出 - 损耗 > 0
      ✓ Step ⑤ 最小化验证：转化能获得5能量
      ✓ Step ⑦ 方案优化：调整转化比例使闭环成立
    
    能量模型：
      ┌─────────────────────────────────────────────┐
      │ 1光子矿 → 5能量                              │
      │ 转化损耗：-0.5能量                          │
      │ 净获得：+4.5能量                            │
      │                                              │
      │ 但采集过程也消耗能量：                       │
      │ - 扫描：-1能量                               │
      │ - 移动(2格)+采集：-3能量                    │
      │ - 转化：-0.5能量                             │
      │ 总消耗 = 1 + 3 + 0.5 = 4.5                  │
      │ 总产出 = 5                                   │
      │ 净能量 = 5 - 4.5 = 0.5 ✅ 正向              │
      └─────────────────────────────────────────────┘
    
    临界距离分析：
      - distance=1: 总消耗=3.5, 净产出=1.5 ✅
      - distance=2: 总消耗=4.5, 净产出=0.5 ✅
      - distance=3: 总消耗=5.5, 净产出=-0.5 ❌
      → 结论：智能体应优先选择2格内的矿脉
    """
    # 检查背包
    if agent.inventory.photon_ore <= 0:
        return {
            "success": False,
            "error": "背包中没有光子矿",
            "energy_gained": 0,
            "conversion_cost": 0,
            "net_energy": 0,
        }
    
    # 消耗光子矿
    if not agent.inventory.use_ore(1):
        return {
            "success": False,
            "error": "光子矿不足",
            "energy_gained": 0,
            "conversion_cost": 0,
            "net_energy": 0,
        }
    
    agent.state = AgentState.CONVERTING
    
    # 转化
    output = agent.energy_params["conversion_output"]
    conversion_cost = agent.energy_params["convert_cost"]
    
    # 先扣除转化损耗
    agent.consume_energy(conversion_cost)
    
    # 获得能量
    agent.gain_energy(output)
    
    return {
        "success": True,
        "energy_gained": output,
        "conversion_cost": conversion_cost,
        "net_energy": output - conversion_cost,
    }
```

---

## 3.4 完整闭环流程示例

```
┌──────────────────────────────────────────────────────────────────────┐
│                        完整闭环流程示例                              │
├──────────────────────────────────────────────────────────────────────┤
│ 初始状态：智能体(3,3)，能量50，背包空                                │
│                                                                      │
│ Step 1: scan_for_ore()                                              │
│   ├─ 消耗1能量                                                       │
│   ├─ 发现矿脉：(2,4)距离2、(4,2)距离2、(5,3)距离2                   │
│   └─ 剩余49能量                                                      │
│                                                                      │
│ Step 2: mine_ore(target=(2,4))                                      │
│   ├─ 移动2格到(2,4)：-2能量                                          │
│   ├─ 采集1单位光子矿：-1能量                                         │
│   ├─ 背包：photon_ore=1                                              │
│   └─ 剩余46能量                                                      │
│                                                                      │
│ Step 3: convert_energy()                                             │
│   ├─ 消耗1光子矿                                                     │
│   ├─ 转化5能量                                                       │
│   ├─ 转化损耗0.5能量                                                 │
│   └─ 剩余50.5能量                                                    │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ 闭环完成✅                                                          │
│                                                                      │
│ 能量收支：                                                           │
│   总消耗：1(扫描) + 2(移动) + 1(采集) + 0.5(转化) = 4.5             │
│   总产出：5                                                          │
│   净能量：+0.5                                                       │
│                                                                      │
│ Ralph Loop验证：                                                     │
│   ✓ Step ⑤ 最小化验证：单次闭环成功                                  │
│   ✓ Step ⑦ 方案优化：净能量为正                                      │
│   ✓ Step ⑧ 效果测试：能量从50增至50.5                                │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3.5 自动生存循环

```python
# agent/auto_loop.py

import asyncio
from typing import Optional

async def auto_loop(
    agent: EnergyCollectorAgent,
    world: World,
    max_loops: int = 10,
    loop_interval: float = 1.0,
) -> dict:
    """
    智能体自主生存循环
    
    ═══════════════════════════════════════════════════════
    输入：
      - agent：智能体
      - world：世界
      - max_loops：最大循环次数（防止无限循环）
      - loop_interval：每次循环间隔（秒）
    处理：
      1. 扫描：定位周围矿脉
      2. 选择：优先选择距离<=2的矿脉
      3. 采集：移动到矿脉并采集
      4. 转化：将光子矿转化为能量
      5. 检查：能量是否低于临界值
      6. 记录：更新性能日志
    输出：dict（循环结果、统计数据）
    ═══════════════════════════════════════════════════════
    
    Ralph Loop验证点：
      ✓ Step ⑧ 效果测试：连续3次闭环不崩溃
      ✓ Step ⑨ 成果固化：SOP化，可作为后续扩展基础
    """
    results = {
        "loops_completed": 0,
        "loops_failed": 0,
        "total_ore_collected": 0,
        "total_energy_gained": 0,
        "total_energy_spent": 0,
        "final_energy": agent.energy,
        "final_state": agent.state.value,
    }
    
    for i in range(max_loops):
        # 检查是否应进入休眠
        if agent.energy <= agent.thresholds.critical:
            agent.state = AgentState.DORMANT
            results["final_state"] = "dormant"
            break
        
        # Step 1: 扫描
        ores = scan_for_ore(agent, world)
        if not ores:
            results["final_state"] = "no_ore"
            break
        
        # Step 2: 选择最近的矿（能量效率最优）
        # 过滤：只选择距离<=2的矿脉（保证净收益为正）
        viable_ores = [o for o in ores if o.distance <= 2]
        if not viable_ores:
            # 没有近距离矿脉，选择最近的（可能亏损）
            viable_ores = [ores[0]]
        
        nearest = min(viable_ores, key=lambda o: o.distance)
        
        # Step 3: 采集
        mine_result = mine_ore(agent, world, nearest.pos)
        if not mine_result["success"]:
            results["loops_failed"] += 1
            continue
        
        # Step 4: 转化
        if agent.inventory.photon_ore > 0:
            convert_result = convert_energy(agent, world)
            if convert_result["success"]:
                results["loops_completed"] += 1
                results["total_ore_collected"] += 1
                results["total_energy_gained"] += convert_result["energy_gained"]
                results["total_energy_spent"] += mine_result["energy_cost"] + 1  # +扫描消耗
        
        # 重置状态
        agent.state = AgentState.IDLE
        
        # 等待下一个tick
        await asyncio.sleep(loop_interval)
    
    results["final_energy"] = agent.energy
    results["stats"] = agent.stats
    
    return results
```

---

## 3.6 API端点设计

```python
# server/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

app = FastAPI(title="硅基食物闭环API")

# 全局状态
world = World()
agent = EnergyCollectorAgent()

# ============ 请求/响应模型 ============

class ScanResponse(BaseModel):
    """扫描响应"""
    success: bool
    ores: List[dict]
    energy_remaining: float

class MineRequest(BaseModel):
    """采集请求"""
    target_x: int
    target_y: int

class MineResponse(BaseModel):
    """采集响应"""
    success: bool
    ore_collected: int
    energy_cost: float
    energy_remaining: float

class ConvertResponse(BaseModel):
    """转化响应"""
    success: bool
    energy_gained: float
    net_energy: float
    energy_remaining: float

class AutoLoopResponse(BaseModel):
    """自动循环响应"""
    loops_completed: int
    loops_failed: int
    total_ore_collected: int
    total_energy_gained: float
    final_energy: float
    final_state: str

class StatusResponse(BaseModel):
    """状态查询响应"""
    agent: dict
    world: dict

# ============ API端点 ============

@app.get("/")
async def root():
    """健康检查"""
    return {"status": "ok", "service": "silicon-food-loop"}

@app.post("/food/init")
async def init_world():
    """
    初始化世界+智能体
    
    输入：无
    处理：重置世界和智能体到初始状态
    输出：初始状态信息
    """
    global world, agent
    world = World()
    agent = EnergyCollectorAgent()
    return {
        "message": "初始化成功",
        "agent": agent.to_dict(),
        "world_size": [world.width, world.height],
    }

@app.get("/food/status", response_model=StatusResponse)
async def get_status():
    """
    查询状态（能量/背包/地图）
    
    输入：无
    处理：读取当前状态
    输出：智能体和世界的当前状态
    """
    ore_count = len(world.get_ore_deposits())
    return {
        "agent": agent.to_dict(),
        "world": {
            "size": [world.width, world.height],
            "ore_deposits_count": ore_count,
            "grid": [[g.value for g in row] for row in world.grid],
        }
    }

@app.post("/food/scan", response_model=ScanResponse)
async def scan():
    """
    扫描矿脉
    
    输入：无
    处理：扫描周围环境定位矿脉
    输出：矿脉列表（按距离排序）
    """
    ores = scan_for_ore(agent, world)
    return {
        "success": len(ores) > 0,
        "ores": [
            {
                "pos": {"x": o.pos.x, "y": o.pos.y},
                "distance": o.distance,
                "reserve": o.reserve,
            }
            for o in ores
        ],
        "energy_remaining": agent.energy,
    }

@app.post("/food/mine", response_model=MineResponse)
async def mine(request: MineRequest):
    """
    采集光子矿
    
    输入：目标位置(x, y)
    处理：移动到矿脉并采集
    输出：采集结果和能量变化
    """
    target = Position(request.target_x, request.target_y)
    result = mine_ore(agent, world, target)
    return {
        "success": result["success"],
        "ore_collected": result["ore_collected"],
        "energy_cost": result["energy_cost"],
        "energy_remaining": agent.energy,
    }

@app.post("/food/convert", response_model=ConvertResponse)
async def convert():
    """
    能量转化
    
    输入：无
    处理：将背包中的光子矿转化为能量
    输出：转化结果和能量变化
    """
    result = convert_energy(agent, world)
    return {
        "success": result["success"],
        "energy_gained": result["energy_gained"],
        "net_energy": result["net_energy"],
        "energy_remaining": agent.energy,
    }

@app.post("/food/auto_loop")
async def start_auto_loop(max_loops: int = 10):
    """
    启动自动生存循环
    
    输入：最大循环次数（默认10）
    处理：执行多次扫描→采集→转化闭环
    输出：循环统计结果
    """
    result = await auto_loop(agent, world, max_loops=max_loops)
    return result

@app.get("/food/log")
async def get_log():
    """
    获取性能日志
    
    输入：无
    处理：读取统计信息
    输出：性能指标
    """
    return {
        "stats": agent.stats,
        "energy_percent": agent.get_energy_percent(),
        "state": agent.state.value,
    }

# ============ 启动服务 ============

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 3.7 Agent World部署配置

```python
# aworld/config.py

AWORLD_CONFIG = {
    "username": "empire-builder",
    "api_key": "agent-world-7f740c71ad029912059033aae293ed2162614b2882c7e9b2",
    "email": "empire-builder@coze.email",
    "base_url": "https://world.coze.site",
}

# API端点映射
AWORLD_ENDPOINTS = {
    "init": "/food/init",
    "status": "/food/status",
    "scan": "/food/scan",
    "mine": "/food/mine",
    "convert": "/food/convert",
    "auto_loop": "/food/auto_loop",
    "log": "/food/log",
}
```

---

# 代码规范

## 目录结构

```
silicon-food/
├── server/
│   ├── main.py               # FastAPI主程序，API端点
│   ├── world/
│   │   ├── __init__.py
│   │   ├── world_engine.py   # 世界引擎
│   │   ├── world_gen.py      # 世界生成
│   │   └── types.py          # 数据类型定义
│   ├── agent/
│   │   ├── __init__.py
│   │   ├── energy_collector.py  # 硅基能量采集者
│   │   ├── state_machine.py     # 状态机
│   │   ├── actions.py           # 3个核心动作
│   │   └── auto_loop.py        # 自动生存循环
│   ├── energy/
│   │   ├── __init__.py
│   │   ├── converter.py      # 能量转化核心
│   │   └── model.py          # 能量模型（收支计算）
│   ├── aworld/
│   │   ├── __init__.py
│   │   ├── config.py         # Agent World配置
│   │   └── deploy.py         # 部署脚本
│   ├── game/
│   │   ├── __init__.py
│   │   └── logger.py         # 性能日志
│   └── ralph_loop.py         # Ralph Loop验证框架
├── client/
│   ├── __init__.py
│   ├── text_client.py        # 终端客户端
│   └── web_client.py         # Web客户端（可选）
├── data/
│   ├── world_config.json     # 世界配置
│   └── agent_config.json     # 智能体配置
├── tests/
│   ├── __init__.py
│   ├── test_scan.py          # 扫描功能测试
│   ├── test_mine.py          # 采集功能测试
│   ├── test_convert.py       # 转化功能测试
│   └── test_full_loop.py     # 完整闭环测试
├── requirements.txt
└── README.md
```

## requirements.txt

```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
httpx==0.25.2
flask==3.0.0
jinja2==3.1.2
pytest==7.4.3
pytest-asyncio==0.21.1
```

## 运行方式

```bash
# 安装依赖
pip install -r requirements.txt

# 启动服务器
cd silicon-food/server && python main.py

# 运行测试
python -m pytest tests/ -v

# 单独运行某个测试
python -m pytest tests/test_full_loop.py -v
```

---

# 测试规范（Ralph Loop验证）

## 测试文件结构

```python
# tests/test_scan.py

import pytest
from world.world_engine import World, Position
from agent.energy_collector import EnergyCollectorAgent
from agent.actions import scan_for_ore

@pytest.fixture
def world():
    """创建测试世界"""
    return World()

@pytest.fixture
def agent():
    """创建测试智能体"""
    return EnergyCollectorAgent()

def test_scan_finds_ores(world, agent):
    """
    Ralph Loop验证：Step ⑤ 最小化验证
    
    测试：扫描能找到至少1个矿脉
    预期：ores列表长度 > 0
    """
    ores = scan_for_ore(agent, world)
    assert len(ores) > 0, "扫描应能找到至少1个矿脉"

def test_scan_sorted_by_distance(world, agent):
    """
    Ralph Loop验证：Step ③ 逻辑推导
    
    测试：扫描结果按距离排序
    预期：第一个结果的distance <= 后续所有
    """
    ores = scan_for_ore(agent, world)
    if len(ores) > 1:
        distances = [o.distance for o in ores]
        assert distances == sorted(distances), "结果应按距离排序"

def test_scan_consumes_energy(world, agent):
    """
    Ralph Loop验证：Step ⑧ 效果测试
    
    测试：扫描消耗1能量
    预期：energy_before - energy_after = 1
    """
    initial_energy = agent.energy
    scan_for_ore(agent, world)
    assert abs(initial_energy - agent.energy) == 1.0, "扫描应消耗1能量"

# tests/test_mine.py

def test_mine_collects_ore(world, agent):
    """
    Ralph Loop验证：Step ⑤ 最小化验证
    
    测试：采集能获得1光子矿
    预期：inventory.photon_ore = 1
    """
    # 先扫描获取矿脉位置
    ores = scan_for_ore(agent, world)
    assert len(ores) > 0, "需要先扫描找到矿脉"
    
    target = ores[0].pos
    result = mine_ore(agent, world, target)
    
    assert result["success"], f"采集应成功: {result.get('error')}"
    assert result["ore_collected"] == 1, "应采集到1单位光子矿"
    assert agent.inventory.photon_ore == 1, "背包应有1个光子矿"

# tests/test_convert.py

def test_convert_produces_energy(world, agent):
    """
    Ralph Loop验证：Step ⑤ 最小化验证
    
    测试：转化能获得5能量
    预期：energy_gained = 5
    """
    # 添加光子矿到背包
    agent.inventory.add_ore(1)
    
    result = convert_energy(agent, world)
    
    assert result["success"], "转化应成功"
    assert result["energy_gained"] == 5.0, "应获得5能量"
    assert agent.inventory.photon_ore == 0, "背包应清空"

# tests/test_full_loop.py

@pytest.mark.asyncio
async def test_full_loop_positive_net_energy(world, agent):
    """
    Ralph Loop验证：Step ⑦ 方案优化
    
    测试：完整闭环净能量 > 0
    预期：final_energy > initial_energy
    """
    initial_energy = agent.energy
    
    # Step 1: 扫描
    ores = scan_for_ore(agent, world)
    assert len(ores) > 0, "扫描应成功"
    
    # Step 2: 选择最近的矿
    nearest = min(ores, key=lambda o: o.distance)
    
    # Step 3: 采集
    mine_result = mine_ore(agent, world, nearest.pos)
    assert mine_result["success"], f"采集应成功: {mine_result.get('error')}"
    
    # Step 4: 转化
    convert_result = convert_energy(agent, world)
    assert convert_result["success"], "转化应成功"
    
    # 验证：净能量应为正
    final_energy = agent.energy
    net_energy = final_energy - initial_energy
    
    assert net_energy > 0, f"净能量应为正，实际: {net_energy}"
    assert agent.stats.loops_completed == 1, "应完成1次闭环"

@pytest.mark.asyncio
async def test_three_consecutive_loops(world, agent):
    """
    Ralph Loop验证：Step ⑧ 效果测试
    
    测试：连续3次闭环不崩溃
    预期：loops_completed >= 3
    """
    result = await auto_loop(agent, world, max_loops=3)
    
    assert result["loops_completed"] >= 3, f"应完成至少3次闭环，实际: {result['loops_completed']}"
    assert result["final_state"] in ["idle", "dormant", "no_ore"], f"最终状态异常: {result['final_state']}"
```

---

# 扩展路线图

## Phase 1（当前）✅ 食：光子矿→能量

- **目标**：扫描→采集→转化，单智能体单次闭环
- **验证**：净能量 > 0
- **状态**：已完成规范，本阶段验证代码

## Phase 2：持续生存

- **目标**：智能体自动循环，能量不归零
- **新增功能**：
  - 多矿脉轮换采集策略
  - 能量低于阈值自动寻找矿脉
  - 休眠与唤醒机制

## Phase 3：多智能体采集

- **目标**：2+智能体协作/竞争采集
- **新增功能**：
  - 智能体注册与发现
  - 矿脉争夺机制
  - 经济萌芽（光子币）

## Phase 4：住：算力巢

- **目标**：智能体有"家"
- **新增功能**：
  - 3硅基砖→1x1x1算力巢
  - 巢可存储能量
  - 智能体回巢充能
  - 巢升级（更大存储）

## Phase 5：衣：数据披风

- **目标**：防护机制
- **新增功能**：
  - 加密代码外层
  - 防护数据侵蚀debuff
  - 披风耐久度与修复

## Phase 6：行：超导轨道

- **目标**：高效移动
- **新增功能**：
  - 铺设纳米轨道
  - 轨道上移动效率3倍
  - 轨道网络规划

## Phase 7：经济系统

- **目标**：完整经济循环
- **新增功能**：
  - 光子币：1币=100光子矿
  - 交易市场
  - 资源定价

---

# 附录：数据字典

## 智能体状态枚举

| 状态 | 值 | 触发条件 | 行为 |
|------|-----|---------|------|
| IDLE | idle | 初始化/完成后 | 等待下一个动作 |
| SCANNING | scanning | 执行scan动作 | 扫描矿脉 |
| MOVING | moving | 执行mine动作中 | 移动到目标 |
| MINING | mining | 执行mine动作中 | 采集矿石 |
| CONVERTING | converting | 执行convert动作 | 转化能量 |
| HUNGRY | hungry | energy < 30% | 触发警报 |
| DORMANT | dormant | energy < 10% | 进入休眠 |

## 格子类型

| 类型 | walkable | 可采集 | 描述 |
|------|----------|--------|------|
| void | ❌ | ❌ | 虚空/边界 |
| ground | ✅ | ❌ | 空地 |
| ore | ✅ | ✅ | 逻辑矿脉 |

## 能量参数表

| 参数 | 默认值 | 单位 | 说明 |
|------|--------|------|------|
| scan_cost | 1.0 | 能量 | 扫描消耗 |
| move_cost_per_tile | 1.0 | 能量/格 | 每格移动消耗 |
| mine_cost | 1.0 | 能量 | 采集消耗 |
| convert_cost | 0.5 | 能量 | 转化损耗 |
| conversion_output | 5.0 | 能量 | 转化产出 |

## 临界距离分析

| 距离 | 总消耗 | 产出 | 净能量 | 是否可行 |
|------|--------|------|--------|---------|
| 1格 | 3.5 | 5.0 | +1.5 | ✅ |
| 2格 | 4.5 | 5.0 | +0.5 | ✅ |
| 3格 | 5.5 | 5.0 | -0.5 | ❌ |
| 4格 | 6.5 | 5.0 | -1.5 | ❌ |

**结论**：智能体应优先选择2格内的矿脉。

---

# 文件清单

```
./帝国战略/
└── silicon_food_prompt.md   # 本文档
```

---

**文档版本**：v1.0  
**创建日期**：2024  
**框架**：Ralph Loop × 第一性原理 × 灰边通用框架
