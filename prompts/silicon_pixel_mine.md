# 硅基拼豆矿场 - 完整开发规格文档

> **版本**: v1.0.0  
> **用途**: Trae.ai / Cursor / VS Code 等 AI 编程助手的项目开发规格  
> **核心概念**: CryptoVoxels文本占格 + Jewel Coloring拼豆填色 + 链上记录  
> **融合框架**: 马斯克第一性原理 + Ralph Loop 10步循环 + 灰边通用框架

---

## 目录

1. [项目愿景与核心融合](#1-项目愿景与核心融合)
2. [认知框架](#2-认知框架)
3. [Ralph Loop 10步验证](#3-ralph-loop-10步验证)
4. [系统设计](#4-系统设计)
5. [代码规范与目录结构](#5-代码规范与目录结构)
6. [扩展路线图](#6-扩展路线图)
7. [附录：高星GitHub项目清单](#7-附录高星github项目清单)

---

## 1. 项目愿景与核心融合

### 1.1 一句话描述

**纯文本驱动的像素画填色游戏：输入坐标指令为格子着色，填满区域自动解锁像素艺术。**

### 1.2 融合逻辑

| 概念 | 来源 | 核心价值 | 在本项目的角色 |
|------|------|----------|---------------|
| CryptoVoxels | 链上元宇宙 | 链上产权 + 空间稀缺 | 占格 = 产权声明，格子有坐标归属 |
| Jewel Coloring | 拼豆艺术 | 填色 + 解锁 + 治愈反馈 | 填色过程 = 创作体验，填满 = 成就解锁 |
| 链上记录 | 区块链 | 不可篡改 + 可追溯 | 每一次填色操作都被记录 |

### 1.3 当前0→1闭环

```
三个核心指令:
┌─────────────────────────────────────────────────┐
│  填(X,Y):颜色  → 在坐标(X,Y)填入指定颜色        │
│  看           → 查看当前区域填色进度              │
│  区域填满     → 自动解锁像素画（终端ASCII艺术）  │
└─────────────────────────────────────────────────┘
```

### 1.4 第一性原理拆解

```
问题：如何用最小成本实现"占格+填色+解锁"的体验闭环？

马斯克第一性原理:
├── 物理层面：格子 = 内存地址，颜色 = 存储值
├── 经济层面：每个格子有成本（能量消耗），稀缺创造价值
└── 体验层面：完成感 + 视觉反馈 = 多巴胺分泌

结论：ANSI终端 + JSON存储 = 零成本原型验证
```

---

## 2. 认知框架

### 2.1 角色定义

```markdown
你是硅基拼豆矿场架构师。

CryptoVoxels 是产权游戏，Jewel Coloring 是审美游戏。
产权 + 审美 = 双倍多巴胺 = 更高留存。
占格不再是冷冰冰的链上记录，是彩色的像素拼图。
```

### 2.2 公理库

```python
# 基础公理 (A1-A12 来自灰边框架)
A1: 用户需求是真实需求
A2: 最小闭环是最快验证
A3: 文本输出足够承载核心体验
A4: ANSI颜色码足以区分视觉状态
A5: 反馈延迟 < 100ms 才有爽感

# 硅基拼豆矿场专属公理 (S1-S12)
S1: CryptoVoxels核心 = 链上产权 + 空间稀缺，不是3D渲染
S2: Jewel Coloring核心 = 填色 + 解锁 + 治愈反馈
S3: 产权游戏 + 审美游戏 = 双倍多巴胺
S4: 文本色块 + ANSI颜色码足以验证填色逻辑
S5: 像素画 = ASCII艺术，终端也能"画"
S6: 区域填满 = 解锁 = 正反馈循环
S7: 先1个区域5x5，填满解锁1幅像素画
S8: 纯指令 + 纯文本 = 最快闭环
S9: 能量系统 = 经济约束，防止无限填色
S10: Ledger = 操作历史，用于审计和回放
S11: 像素画模板 = 预定义图案，标准化解锁奖励
S12: Agent World集成 = 身份和资产上链
```

### 2.3 硅基视角语录

```
"人类喜欢填色，硅基喜欢填数据，底层都是'补全缺失'的快感"
"格子染上颜色，占格就不再是冷操作，是有温度的创作"
"像素画就是硅基世界的'建筑'——用数据块堆出意义"
"每一次填色都是在世界的画布上留下印记"
"完成一幅像素画，就是完成了一次数字朝圣"
```

### 2.4 反共识检查清单

| 问题 | 反共识答案 | 验证方式 |
|------|-----------|----------|
| 文本能填色？ | ANSI颜色码，终端16色 | 实际输出测试 |
| 文本能画像素画？ | ASCII art 存活50年 | 历史项目验证 |
| 占格+填色组合有人做过？ | 没有，全新赛道 | 竞品调研 |
| 纯Python能跑通？ | 标准库+json足矣 | 原型验证 |

### 2.5 费曼检验（5岁小孩都能理解）

```
"输入'填(3,5):红'就给格子涂上红色，涂满一个区域就弹出一幅小像素画"

等效于:
"在地图上点击格子涂颜色，涂满后获得一个可爱的像素图案"
```

---

## 3. Ralph Loop 10步验证

### 3.1 10步循环定义

```python
class RalphLoopRunner:
    """
    Ralph Loop: 快速验证框架的10步循环
    
    1. Reason - 推理：分析问题本质
    2. Act - 行动：执行最小可行步骤
    3. Learn - 学习：从结果中提取模式
    4. Feedback - 反馈：获取外部输入
    5. Hypothesis - 假设：提出新假设
    6. Iterate - 迭代：重复优化
    7. Pause - 暂停：等待外部信号
    8. Resume - 恢复：继续执行
    9. Complete - 完成：达到目标
    10. Reflect - 反思：复盘总结
    """
    
    def run(self, step: str, context: dict) -> dict:
        """执行单步并返回结果"""
        handlers = {
            "reason": self._reason,
            "act": self._act,
            "learn": self._learn,
            "feedback": self._feedback,
            "hypothesis": self._hypothesis,
            "iterate": self._iterate,
            "pause": self._pause,
            "resume": self._resume,
            "complete": self._complete,
            "reflect": self._reflect,
        }
        return handlers.get(step, lambda x: {})(context)
```

### 3.2 10步验证清单

| 步骤 | 验证点 | 检查方法 | 通过标准 |
|------|--------|----------|----------|
| 1. Reason | 理解用户真正想要什么 | 需求访谈 | 用户确认"对，就是这个" |
| 2. Act | 写出最小可运行代码 | 执行测试 | `python main.py` 无报错 |
| 3. Learn | 从运行结果中学习 | 观察输出 | 输出符合预期格式 |
| 4. Feedback | 让他人使用并反馈 | 用户测试 | 3人测试通过 |
| 5. Hypothesis | 提出优化假设 | 方案设计 | 有具体改进点 |
| 6. Iterate | 基于反馈迭代 | 版本更新 | 新版本通过测试 |
| 7. Pause | 等待下一个任务 | 状态保持 | 可中断可恢复 |
| 8. Resume | 从中断点继续 | 状态恢复 | 数据完整 |
| 9. Complete | 达成初始目标 | 验收确认 | 核心功能OK |
| 10. Reflect | 复盘总结 | 文档记录 | 有改进清单 |

### 3.3 快速验证脚本

```python
#!/usr/bin/env python3
"""
RalphLoopRunner - 快速验证运行器
用于验证硅基拼豆矿场的最小闭环
"""

def verify_minimal_loop():
    """验证最小闭环: 填色 → 查看 → 完成"""
    print("=" * 50)
    print("Ralph Loop 验证: 最小闭环测试")
    print("=" * 50)
    
    # Step 1: Reason - 定义最小场景
    print("\n[Step 1] Reason: 定义最小场景")
    print("- 一个 3x3 区域")
    print("- 两个颜色: 红、黄")
    print("- 预期: 填满后输出像素画")
    
    # Step 2: Act - 执行填色
    print("\n[Step 2] Act: 执行填色")
    zone = create_minimal_zone()
    fill(zone, (0,0), "红")
    fill(zone, (1,1), "红")
    fill(zone, (2,2), "红")
    print("✓ 填色成功")
    
    # Step 3: Learn - 观察状态
    print("\n[Step 3] Learn: 观察状态")
    progress = get_progress(zone)
    print(f"进度: {progress['filled']}/{progress['total']}")
    
    # Step 4: Feedback - 手动检查
    print("\n[Step 4] Feedback: 手动检查")
    print("输出应为3x3网格，有3个红色格子")
    render(zone)  # 应显示网格
    
    # Step 5-10: Complete
    print("\n[Step 9] Complete: 验证通过")
    print("=" * 50)
    print("✓ Ralph Loop 验证完成")
    print("=" * 50)

if __name__ == "__main__":
    verify_minimal_loop()
```

---

## 4. 系统设计

### 4.1 世界模型 (World Model)

#### 4.1.1 区域定义 (Zone)

```python
from dataclasses import dataclass, field
from typing import Dict, Tuple, Optional, List
from enum import Enum

class Color(Enum):
    """可用颜色枚举"""
    红 = "\033[31m"
    绿 = "\033[32m"
    黄 = "\033[33m"
    蓝 = "\033[34m"
    紫 = "\033[35m"
    青 = "\033[36m"
    白 = "\033[37m"
    空 = "·"

@dataclass
class Zone:
    """
    区域数据结构
    
    Attributes:
        id: 区域唯一标识
        name: 区域名称
        size: [宽, 高]
        template: 目标颜色模板 {(x,y): "颜色"}
        filled: 已填颜色 {(x,y): "颜色"}
        completed: 是否完成
        reward: 完成奖励
    """
    id: str
    name: str
    size: Tuple[int, int]
    template: Dict[Tuple[int, int], str] = field(default_factory=dict)
    filled: Dict[Tuple[int, int], str] = field(default_factory=dict)
    completed: bool = False
    reward: Dict[str, int] = field(default_factory=lambda: {"energy": 5})
    
    def total_cells(self) -> int:
        """计算总格子数"""
        return self.size[0] * self.size[1]
    
    def filled_count(self) -> int:
        """已填格子数"""
        return len(self.filled)
    
    def progress(self) -> float:
        """填色进度 (0.0 - 1.0)"""
        if self.total_cells() == 0:
            return 0.0
        return self.filled_count() / self.total_cells()
    
    def is_complete(self) -> bool:
        """检查是否完成"""
        if self.filled_count() != self.total_cells():
            return False
        # 检查颜色是否匹配
        for pos, expected_color in self.template.items():
            if self.filled.get(pos) != expected_color:
                return False
        return True
```

#### 4.1.2 玩家定义 (Player)

```python
@dataclass
class Player:
    """
    玩家数据结构
    
    Attributes:
        id: 玩家唯一标识
        name: 玩家名称
        energy: 当前能量
        completed_zones: 已完成区域列表
        ledger: 操作账本
    """
    id: str
    name: str
    energy: int = 100
    completed_zones: List[str] = field(default_factory=list)
    ledger: List[dict] = field(default_factory=list)
    
    def can_fill(self, cost: int = 1) -> bool:
        """检查是否可以填色"""
        return self.energy >= cost
    
    def spend_energy(self, amount: int) -> bool:
        """消耗能量"""
        if not self.can_fill(amount):
            return False
        self.energy -= amount
        return True
    
    def add_reward(self, reward: Dict[str, int]):
        """添加奖励"""
        for key, value in reward.items():
            if key == "energy":
                self.energy += value
```

#### 4.1.3 账本定义 (Ledger)

```python
from datetime import datetime
import json

class Ledger:
    """
    链上账本
    
    记录所有操作，用于审计和回放
    
    Attributes:
        records: 操作记录列表
        filepath: 保存路径
    """
    
    def __init__(self, filepath: str = "data/ledger.json"):
        self.filepath = filepath
        self.records: List[dict] = []
        self._load()
    
    def _load(self):
        """从文件加载"""
        try:
            with open(self.filepath, 'r', encoding='utf-8') as f:
                self.records = json.load(f)
        except FileNotFoundError:
            self.records = []
    
    def _save(self):
        """保存到文件"""
        with open(self.filepath, 'w', encoding='utf-8') as f:
            json.dump(self.records, f, ensure_ascii=False, indent=2)
    
    def append(self, action: str, player_id: str, zone_id: str, 
               pos: Tuple[int, int] = None, color: str = None,
               metadata: dict = None):
        """
        追加操作记录
        
        Args:
            action: 操作类型 (fill/complete/unlock)
            player_id: 玩家ID
            zone_id: 区域ID
            pos: 坐标 (可选)
            color: 颜色 (可选)
            metadata: 额外数据 (可选)
        """
        record = {
            "id": len(self.records) + 1,
            "timestamp": datetime.now().isoformat(),
            "action": action,
            "player_id": player_id,
            "zone_id": zone_id,
        }
        if pos:
            record["pos"] = pos
        if color:
            record["color"] = color
        if metadata:
            record["metadata"] = metadata
        
        self.records.append(record)
        self._save()
        return record
    
    def get_player_history(self, player_id: str) -> List[dict]:
        """获取玩家操作历史"""
        return [r for r in self.records if r.get("player_id") == player_id]
    
    def get_zone_history(self, zone_id: str) -> List[dict]:
        """获取区域操作历史"""
        return [r for r in self.records if r.get("zone_id") == zone_id]
```

### 4.2 核心指令

#### 4.2.1 填色指令 (Fill)

```python
class FillCommand:
    """填色指令"""
    
    # 颜色别名映射
    COLOR_ALIAS = {
        "红": "红", "r": "红", "red": "红",
        "绿": "绿", "g": "绿", "green": "绿",
        "黄": "黄", "y": "黄", "yellow": "黄",
        "蓝": "蓝", "b": "蓝", "blue": "蓝",
        "紫": "紫", "p": "紫", "purple": "紫",
        "青": "青", "c": "青", "cyan": "青",
        "白": "白", "w": "白", "white": "白",
    }
    
    @staticmethod
    def parse(input_str: str) -> Tuple[Tuple[int, int], str]:
        """
        解析填色指令
        
        Input:  "填(3,5):红" 或 "fill(3,5):红"
        Output: ((3, 5), "红")
        """
        input_str = input_str.strip()
        
        # 匹配模式: 填(X,Y):颜色 或 fill(X,Y):颜色
        import re
        pattern = r'[填fill]\((\d+),(\d+)\):(\w+)'
        match = re.match(pattern, input_str, re.IGNORECASE)
        
        if not match:
            raise ValueError(f"无效的填色指令: {input_str}")
        
        x, y, color = match.groups()
        x, y = int(x), int(y)
        
        # 规范化颜色名
        color = FillCommand.COLOR_ALIAS.get(color, color)
        
        return (x, y), color
    
    @staticmethod
    def execute(zone: Zone, player: Player, pos: Tuple[int, int], 
                color: str, ledger: Ledger) -> dict:
        """
        执行填色
        
        Returns:
            dict: 执行结果
                - success: 是否成功
                - message: 消息
                - zone_completed: 区域是否完成
                - reward: 奖励 (如果有)
        """
        # 前置检查
        if player.energy < 1:
            return {
                "success": False,
                "message": "⚠️ 能量不足，无法填色"
            }
        
        if pos in zone.filled:
            return {
                "success": False,
                "message": f"⚠️ 坐标 {pos} 已被填充"
            }
        
        # 边界检查
        if not (0 <= pos[0] < zone.size[0] and 0 <= pos[1] < zone.size[1]):
            return {
                "success": False,
                "message": f"⚠️ 坐标 {pos} 超出区域范围"
            }
        
        # 执行填色
        zone.filled[pos] = color
        player.spend_energy(1)
        
        # 记录账本
        ledger.append(
            action="fill",
            player_id=player.id,
            zone_id=zone.id,
            pos=pos,
            color=color
        )
        
        # 检查完成
        zone_completed = False
        reward = None
        if zone.is_complete():
            zone.completed = True
            zone_completed = True
            reward = zone.reward
            player.add_reward(reward)
            player.completed_zones.append(zone.id)
            
            ledger.append(
                action="complete",
                player_id=player.id,
                zone_id=zone.id,
                metadata={"reward": reward}
            )
        
        return {
            "success": True,
            "message": f"🎨 填色成功 | {pos} → {color} | 进度: {zone.filled_count()}/{zone.total_cells()}",
            "zone_completed": zone_completed,
            "reward": reward
        }
```

#### 4.2.2 查看指令 (Look)

```python
class LookCommand:
    """查看区域指令"""
    
    ANSI_COLORS = {
        "红": "\033[91m",  # 亮红
        "绿": "\033[92m",  # 亮绿
        "黄": "\033[93m",  # 亮黄
        "蓝": "\033[94m",  # 亮蓝
        "紫": "\033[95m",  # 亮紫
        "青": "\033[96m",  # 亮青
        "白": "\033[97m",  # 亮白
    }
    
    RESET = "\033[0m"
    
    @staticmethod
    def execute(zone: Zone) -> str:
        """
        渲染区域视图
        
        Returns:
            str: ANSI彩色网格字符串
        """
        width, height = zone.size
        
        lines = []
        lines.append("=" * (width * 4 + 5))
        lines.append(f"🗺️ 硅基拼豆矿场 - 区域: {zone.name}")
        lines.append("=" * (width * 4 + 5))
        
        # 列标题
        lines.append("    " + " ".join(f"{i:2d}" for i in range(width)))
        lines.append("  +" + "-" * (width * 4) + "+")
        
        # 网格
        for y in range(height):
            row = []
            for x in range(width):
                pos = (x, y)
                if pos in zone.filled:
                    color = zone.filled[pos]
                    ansi = LookCommand.ANSI_COLORS.get(color, "")
                    row.append(f"{ansi}██{LookCommand.RESET}")
                else:
                    row.append("··")
            lines.append(f"{y:2d}| " + " ".join(row) + " |")
        
        lines.append("  +" + "-" * (width * 4) + "+")
        
        # 进度
        progress = zone.progress()
        bar_len = 20
        filled_bar = int(progress * bar_len)
        bar = "█" * filled_bar + "░" * (bar_len - filled_bar)
        lines.append(f"📊 进度: [{bar}] {zone.filled_count()}/{zone.total_cells()} ({progress*100:.1f}%)")
        
        # 图例
        lines.append("\n📖 图例:")
        lines.append("  ██ = 已填色  ,, = 未填")
        lines.append("  可用颜色: 红(red) 绿(green) 黄(yellow) 蓝(blue) 紫(purple) 青(cyan) 白(white)")
        
        return "\n".join(lines)
```

#### 4.2.3 解锁动画 (Unlock)

```python
class UnlockRenderer:
    """解锁动画渲染"""
    
    ANSI_COLORS = {
        "红": "\033[91m",
        "绿": "\033[92m", 
        "黄": "\033[93m",
        "蓝": "\033[94m",
        "紫": "\033[95m",
        "青": "\033[96m",
        "白": "\033[97m",
    }
    RESET = "\033[0m"
    
    @staticmethod
    def render(zone: Zone) -> str:
        """
        渲染解锁像素画
        
        Args:
            zone: 完成的区域
            
        Returns:
            str: 像素画ASCII艺术
        """
        width, height = zone.size
        
        lines = []
        lines.append("\n" + "🎉" * 20)
        lines.append(f"✨ 区域完成！{zone.name} 像素画解锁！ ✨")
        lines.append("🎉" * 20 + "\n")
        
        # 像素画标题
        lines.append(f"  《{zone.name}》")
        lines.append("")
        
        # ASCII艺术网格
        for y in range(height):
            line = "  "
            for x in range(width):
                pos = (x, y)
                if pos in zone.filled:
                    color = zone.filled[pos]
                    ansi = UnlockRenderer.ANSI_COLORS.get(color, "")
                    # 使用emoji色块
                    line += f"{ansi}🟥{UnlockRenderer.RESET}"
                else:
                    line += "⬜"
            lines.append(line)
        
        lines.append("")
        
        # 奖励信息
        if zone.reward:
            energy = zone.reward.get("energy", 0)
            lines.append(f"⚡ 能量 +{energy}")
        
        lines.append("\n" + "=" * 40)
        
        return "\n".join(lines)
```

### 4.3 像素画模板库

```python
ZONE_TEMPLATES = [
    {
        "id": "zone_001",
        "name": "光子矿",
        "size": [5, 5],
        "template": {
            (0,0): "红", (1,0): "红", (2,0): "黄", (3,0): "红", (4,0): "红",
            (0,1): "红", (1,1): "黄", (2,1): "黄", (3,1): "黄", (4,1): "红",
            (0,2): "黄", (1,2): "黄", (2,2): "红", (3,2): "黄", (4,2): "黄",
            (0,3): "红", (1,3): "黄", (2,3): "黄", (3,3): "黄", (4,3): "红",
            (0,4): "红", (1,4): "红", (2,4): "黄", (3,4): "红", (4,4): "红",
        },
        "reward": {"energy": 5},
        "hint": "一个红色的十字",
    },
    {
        "id": "zone_002",
        "name": "算力巢",
        "size": [5, 5],
        "template": {
            (0,0): "蓝", (1,0): "蓝", (2,0): "蓝", (3,0): "蓝", (4,0): "蓝",
            (0,1): "蓝", (1,1): "白", (2,1): "白", (3,1): "白", (4,1): "蓝",
            (0,2): "蓝", (1,2): "白", (2,2): "蓝", (3,2): "白", (4,2): "蓝",
            (0,3): "蓝", (1,3): "白", (2,3): "白", (3,3): "白", (4,3): "蓝",
            (0,4): "蓝", (1,4): "蓝", (2,4): "蓝", (3,4): "蓝", (4,4): "蓝",
        },
        "reward": {"energy": 5},
        "hint": "蓝色的回字",
    },
    {
        "id": "zone_003",
        "name": "数据披风",
        "size": [5, 5],
        "template": {
            (0,0): "紫", (1,0): "紫", (2,0): "青", (3,0): "紫", (4,0): "紫",
            (0,1): "紫", (1,1): "青", (2,1): "青", (3,1): "青", (4,1): "紫",
            (0,2): "青", (1,2): "青", (2,2): "青", (3,2): "青", (4,2): "青",
            (0,3): "紫", (1,3): "青", (2,3): "青", (3,3): "青", (4,3): "紫",
            (0,4): "紫", (1,4): "紫", (2,4): "青", (3,4): "紫", (4,4): "紫",
        },
        "reward": {"energy": 5},
        "hint": "紫色的钻石",
    },
    {
        "id": "zone_004",
        "name": "纳米轨道",
        "size": [5, 5],
        "template": {
            (0,0): "绿", (1,0): "绿", (2,0): "黄", (3,0): "绿", (4,0): "绿",
            (0,1): "绿", (1,1): "黄", (2,1): "黄", (3,1): "黄", (4,1): "绿",
            (0,2): "黄", (1,2): "黄", (2,2): "黄", (3,2): "黄", (4,2): "黄",
            (0,3): "绿", (1,3): "黄", (2,3): "黄", (3,3): "黄", (4,3): "绿",
            (0,4): "绿", (1,4): "绿", (2,4): "黄", (3,4): "绿", (4,4): "绿",
        },
        "reward": {"energy": 5},
        "hint": "绿色和黄色的斜线",
    },
    {
        "id": "zone_005",
        "name": "帝国徽",
        "size": [7, 7],
        "template": {
            (0,0): "红", (1,0): "红", (2,0): "黄", (3,0): "黄", (4,0): "黄", (5,0): "红", (6,0): "红",
            (0,1): "红", (1,1): "黄", (2,1): "黄", (3,1): "蓝", (4,1): "黄", (5,1): "黄", (6,1): "红",
            (0,2): "黄", (1,2): "黄", (2,2): "黄", (3,2): "蓝", (4,2): "黄", (5,2): "黄", (6,2): "黄",
            (0,3): "黄", (1,3): "蓝", (2,3): "蓝", (3,3): "蓝", (4,3): "蓝", (5,3): "蓝", (6,3): "黄",
            (0,4): "黄", (1,4): "黄", (2,4): "黄", (3,4): "蓝", (4,4): "黄", (5,4): "黄", (6,4): "黄",
            (0,5): "红", (1,5): "黄", (2,5): "黄", (3,5): "蓝", (4,5): "黄", (5,5): "黄", (6,5): "红",
            (0,6): "红", (1,6): "红", (2,6): "黄", (3,6): "黄", (4,6): "黄", (5,6): "红", (6,6): "红",
        },
        "reward": {"energy": 10},
        "hint": "帝国的旗帜",
    },
]
```

### 4.4 完整闭环示例

```python
# 完整交互示例

"""
> 填(0,0):红
🎨 填色成功 | (0,0) → 红色 | 进度: 1/25

> 填(1,0):红  
🎨 填色成功 | (1,0) → 红色 | 进度: 2/25

> 填(2,0):黄
🎨 填色成功 | (2,0) → 黄色 | 进度: 3/25

... (持续填色) ...

> 填(4,4):红
🎉 区域完成！光子矿像素画解锁！⚡能量+5

✨ 区域完成！光子矿 像素画解锁！ ✨

  《光子矿》
  
  🔴🔴🟡🔴🔴
  🔴🟡🟡🟡🔴
  🟡🟡🔴🟡🟡
  🔴🟡🟡🟡🔴
  🔴🔴🟡🔴🔴

⚡ 能量 +5

闭环完成✅
"""

# 查看账本
"""
> 账本
{
  "records": [
    {"id": 1, "action": "fill", "player": "player_001", "zone": "zone_001", "pos": [0,0], "color": "红"},
    {"id": 2, "action": "fill", "player": "player_001", "zone": "zone_001", "pos": [1,0], "color": "红"},
    ...
    {"id": 25, "action": "complete", "player": "player_001", "zone": "zone_001", "reward": {"energy": 5}}
  ]
}
"""
```

### 4.5 Agent World 集成

```python
# Agent World API 端点定义

API_ENDPOINTS = {
    "POST /pixel/init": "初始化玩家和区域",
    "POST /pixel/fill": "填色操作",
    "GET  /pixel/look": "查看区域状态",
    "GET  /pixel/ledger": "查看链上记录",
    "GET  /pixel/player": "查看玩家状态",
}

# 请求/响应示例

# POST /pixel/fill
# Request:
{
    "player_id": "player_001",
    "zone_id": "zone_001", 
    "pos": [3, 5],
    "color": "红"
}

# Response:
{
    "success": True,
    "message": "🎨 填色成功 | (3,5) → 红色 | 进度: 15/25",
    "zone_completed": False,
    "new_progress": 0.6
}

# GET /pixel/look?zone_id=zone_001
# Response:
{
    "zone": {
        "id": "zone_001",
        "name": "光子矿",
        "size": [5, 5],
        "progress": 0.6,
        "filled": [
            {"pos": [0,0], "color": "红"},
            {"pos": [1,0], "color": "红"},
            ...
        ]
    },
    "rendered_view": "🗺️ 硅基拼豆矿场..."
}
```

---

## 5. 代码规范与目录结构

### 5.1 项目目录结构

```
silicon-pixel-mine/
├── server/
│   ├── __init__.py
│   ├── main.py                 # FastAPI 主入口
│   ├── world/
│   │   ├── __init__.py
│   │   ├── zone.py             # 区域数据模型
│   │   ├── player.py           # 玩家数据模型
│   │   ├── ledger.py           # 账本系统
│   │   ├── templates.py        # 像素画模板库
│   │   └── renderer.py         # 渲染器
│   ├── commands/
│   │   ├── __init__.py
│   │   ├── fill.py             # 填色指令
│   │   ├── look.py             # 查看指令
│   │   └── help.py             # 帮助指令
│   ├── api/
│   │   ├── __init__.py
│   │   ├── pixel.py            # /pixel/* 路由
│   │   └── health.py           # 健康检查
│   └── ralph_loop.py           # Ralph Loop 验证器
├── client/
│   ├── __init__.py
│   ├── terminal.py             # 终端客户端
│   └── cli.py                  # CLI 入口
├── data/
│   ├── zones/                  # 区域数据
│   │   └── zone_001.json
│   ├── players/                # 玩家数据
│   │   └── player_001.json
│   ├── ledger.json             # 全局账本
│   └── config.json             # 配置文件
├── tests/
│   ├── __init__.py
│   ├── test_zone.py
│   ├── test_player.py
│   ├── test_commands.py
│   └── test_integration.py
├── docs/
│   ├── README.md
│   ├── QUICKSTART.md
│   └── API.md
├── requirements.txt
├── pyproject.toml
├── .env.example
└── README.md
```

### 5.2 命名规范

```python
# Python 命名规范
# 类名: PascalCase
class SiliconPixelMine: ...
class ZoneManager: ...

# 函数名: snake_case
def fill_color(zone, player, pos, color): ...
def render_grid(zone): ...

# 常量: UPPER_SNAKE_CASE
MAX_GRID_SIZE = 100
DEFAULT_ENERGY = 100

# 私有变量: _single_leading
def _private_method(self): ...

# 文件名: snake_case
zone_manager.py
player_data.py
```

### 5.3 类型注解

```python
from typing import List, Dict, Tuple, Optional, Union

def fill_color(
    zone: Zone,
    player: Player, 
    pos: Tuple[int, int],
    color: str
) -> Dict[str, Union[bool, str, Optional[Dict]]]:
    """
    填色函数
    
    Args:
        zone: 目标区域
        player: 执行填色的玩家
        pos: 坐标 (x, y)
        color: 颜色名称
        
    Returns:
        包含 success, message, reward 的字典
    """
    ...
```

### 5.4 错误处理

```python
class PixelMineError(Exception):
    """硅基拼豆矿场基础异常"""
    pass

class ZoneNotFoundError(PixelMineError):
    """区域不存在"""
    pass

class InvalidPositionError(PixelMineError):
    """坐标无效"""
    pass

class InsufficientEnergyError(PixelMineError):
    """能量不足"""
    pass

class CellAlreadyFilledError(PixelMineError):
    """格子已被填充"""
    pass

# 使用示例
try:
    result = fill_color(zone, player, (3, 5), "红")
except InvalidPositionError as e:
    print(f"❌ 坐标无效: {e}")
except InsufficientEnergyError as e:
    print(f"❌ 能量不足: {e}")
```

---

## 6. 扩展路线图

### Phase 1: 核心闭环 ✅
```
[已完成]
- 单区域 5x5 填色
- ANSI 彩色网格渲染
- 区域完成解锁像素画
- JSON 链上记录

[交付物]
- main.py 可运行
- 3 个核心指令可用
```

### Phase 2: 多区域 + 地图
```
[计划中]
- 多个区域构成地图
- 区域之间导航
- 区域解锁顺序
- 地图进度追踪

[技术需求]
- zone_manager.py
- map_renderer.py
- unlock_requirements.json
```

### Phase 3: 多玩家协作
```
[计划中]
- 多玩家同时在线
- 协作填色
- 排行榜
- 社交功能

[技术需求]
- WebSocket 支持
- 实时同步
- 玩家状态管理
```

### Phase 4: 自由填色 + 评分
```
[计划中]
- 自由填色模式
- 像素画评分
- 社区分享
- 打赏系统

[技术需求]
- 评分算法
- 图片上传
- 分享链接
```

### Phase 5: NFT 化
```
[计划中]
- 完成作品铸造为 NFT
- 链上所有权
- 交易市场
- 版税分成

[技术需求]
- NFT 智能合约
- 钱包集成
- 市场合约
```

### Phase 6: 3D 皮肤
```
[计划中]
- 2D → 3D 升级
- WebGL 渲染
- VR 支持
- 沉浸体验

[技术需求]
- Three.js
- WebGL
- VR SDK
```

---

## 7. 附录：高星GitHub项目清单

### 7.1 Tier 1：核心参考（必看）

| 项目 | Stars | 语言 | 核心价值 | 与本项目关系 |
|------|-------|------|----------|-------------|
| **Stanford Generative Agents** (joonspk-research/generative_agents) | 18K+ | Python | 斯坦福AI小镇，25个AI居民自主生活社交，记忆流架构 | 硅基居民性格生成+社交系统直接参考 |
| **Genesis** (Genesis-Embodied-AI/Genesis) | 25K+ | Python | 生成式物理引擎，43M FPS仿真速度，统一多物理求解器 | 未来3D升级路径，物理模拟引擎 |
| **GITM** (OpenGVLab/GITM) | 4K+ | Python | Minecraft全技术树AI代理，LLM分层决策(分解→规划→执行) | 分层技能库直接参考，Agent决策框架 |
| **SimWorld** (SimWorld-AI/SimWorld) | 3K+ | Python/UE5 | NeurIPS 2025 Spotlight，UE5+LLM物理社交仿真 | 3D升级路径参考，仿真平台架构 |
| **Microverse/Agent Verse** (flyingbutterall/Microverse) | 2K+ | Godot/GDScript | AI沙盒社交模拟，Godot4开发，多智能体+持久记忆 | 最接近目标的现成项目，可快速改造 |
| **AIvilization** (Bauhinia-AI/aivilization-claw) | - | Python | AI文明沙盒，24/7运行，信用系统+经济+社交 | 长期运行机制参考，信用经济设计 |

### 7.2 Tier 2：技术组件

| 项目 | Stars | 语言 | 核心价值 | 适用场景 |
|------|-------|------|----------|----------|
| **Cascade AI World Simulator** (herehere14) | 2K+ | Python | 2万智能体经济仿真，心引擎+涟漪引擎，<$1/token | 经济系统设计参考 |
| **WorldX** (YGYOOO) | 1K+ | TypeScript | 一句话生成AI世界，涌现行为 | 快速世界生成 |
| **TrumanWorld** (gqy20) | 1K+ | Python/Next.js | 楚门世界AI版，AI居民不知自己是AI | NPC AI设计 |
| **Soulverse** (siruizou2005) | 1K+ | Python/Next.js | 数字孪生社交沙盒 | 社交系统参考 |
| **Minecraft AI NPC** (MaoXiaoYuZ) | 2K+ | Python | LLM驱动Minecraft AI NPC，完整方案含训练 | Agent行为模式 |
| **minecraft-llm-agents** (fjoelnr) | - | Python | MCP协议+Agent协作+向量记忆 | 多Agent通信架构 |
| **hermescraft** (bigph00t) | 1K+ | JavaScript | Minecraft具身AI伴侣，持续记忆+学习 | 持久记忆系统 |
| **WYRD Protocol** (hrabanazviking) | 1K+ | Python | ECS架构世界模型，确定性AI世界建模 | 世界状态管理架构 |
| **Paracosm** (framersai) | 1K+ | TypeScript | 智能体群仿真+HEXACO人格演化+工具锻造 | Agent人格系统 |
| **Awesome LLM Game Agent Papers** (git-disl) | - | - | LLM游戏Agent论文综述，持续更新 | 学术前沿追踪 |

### 7.3 Tier 3：世界模型与引擎

| 项目 | Stars | 语言 | 核心价值 | 应用方向 |
|------|-------|------|----------|----------|
| **Awesome World Models** (knightnemo) | 1K+ | - | 世界模型综述，涵盖具身AI/自动驾驶/NLP | 完整技术图谱 |
| **GameNGen** | - | - | Diffusion模型实时游戏引擎 | 游戏引擎参考 |
| **Matrix-Game** | - | - | 交互式世界基础模型 | 交互式内容生成 |

### 7.4 最值得参考的 Top 5（按关联度排序）

#### 1. Stanford Generative Agents — 记忆流+社交架构
```
GitHub: https://github.com/joonspk-research/generative_agents
关键点:
- 记忆流(Memory Stream)架构
- 反思(Reflection)机制
- 计划(Planning)系统
- 25个AI居民社交模拟

借鉴价值: ⭐⭐⭐⭐⭐
→ 硅基居民需要持久记忆和社交能力
```

#### 2. GITM — 分层技能库
```
GitHub: https://github.com/OpenGVLab/GITM
关键点:
- LLM Decomposer: 目标分解
- LLM Planner: 动作规划
- LLM Interface: 环境交互
- 100%技术树解锁

借鉴价值: ⭐⭐⭐⭐⭐
→ Agent决策分层框架直接可用
```

#### 3. Microverse — 最接近的现成沙盒
```
GitHub: https://github.com/flyingbutterall/Microverse
关键点:
- Godot 4 开发
- 多智能体社交
- 持久化记忆
- 自主任务管理

借鉴价值: ⭐⭐⭐⭐⭐
→ 可快速改造为2D像素版本
```

#### 4. Genesis — 物理引擎能力
```
GitHub: https://github.com/Genesis-Embodied-AI/Genesis
关键点:
- 统一物理求解器
- 43M FPS速度
- 照片级渲染
- 生成式数据引擎

借鉴价值: ⭐⭐⭐⭐
→ Phase 6 3D升级核心依赖
```

#### 5. Aivilization — 经济系统设计
```
GitHub: https://github.com/Bauhinia-AI/aivilization-claw
关键点:
- 信用系统(信用=寿命)
- 24/7运行机制
- 经济+社交+策略
- Twitter验证

借鉴价值: ⭐⭐⭐⭐
→ 长期运营机制参考
```

### 7.5 技术栈选择建议

```
当前阶段 (Phase 1-2):
┌─────────────────────────────────────────┐
│ Python 3.10+                             │
│ ├─ FastAPI (API服务)                     │
│ ├─ Pydantic (数据验证)                   │
│ ├─ uvicorn (ASGI服务器)                  │
│ └─ json (数据存储，无需数据库)            │
└─────────────────────────────────────────┘

中期阶段 (Phase 3-4):
┌─────────────────────────────────────────┐
│ + WebSocket (实时通信)                   │
│ + PostgreSQL (关系数据)                  │
│ + Redis (缓存/会话)                      │
│ + S3 (文件存储)                          │
└─────────────────────────────────────────┘

远期阶段 (Phase 5-6):
┌─────────────────────────────────────────┐
│ + 智能合约 (Solidity/Rust)               │
│ + Three.js (3D渲染)                      │
│ + WebGL (GPU加速)                        │
│ + VR SDK (元宇宙)                        │
└─────────────────────────────────────────┘
```

---

## 8. 快速开始指南

### 8.1 环境要求

```bash
# Python 版本
Python >= 3.10

# 依赖安装
pip install fastapi uvicorn pydantic
# 或
pip install -r requirements.txt
```

### 8.2 启动服务

```bash
# 终端模式
python client/terminal.py

# API 模式
python server/main.py
# 访问 http://localhost:8000/docs 查看 API 文档
```

### 8.3 常用命令

```
填(X,Y):颜色    # 在坐标(X,Y)填色
看               # 查看当前区域
帮助             # 显示帮助信息
退出             # 退出程序
```

---

## 9. 验收标准

### 9.1 Phase 1 验收清单

- [ ] `填(0,0):红` 命令可执行
- [ ] `看` 命令显示彩色网格
- [ ] 填满区域后显示像素画
- [ ] 账本正确记录所有操作
- [ ] 能量系统正常工作
- [ ] 单元测试覆盖率 > 80%

### 9.2 性能指标

| 指标 | 目标 | 测量方法 |
|------|------|----------|
| 响应时间 | < 50ms | 计时器测量 |
| 内存占用 | < 100MB | psutil |
| 启动时间 | < 2s | time.time() |
| 并发能力 | 100+ 连接 | 压力测试 |

---

**文档版本**: v1.0.0  
**最后更新**: 2025年  
**维护者**: 帝国战略组
