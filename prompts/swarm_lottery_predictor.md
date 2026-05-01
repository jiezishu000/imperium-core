# MiroFish群体智能彩票预测系统 · 开发规范

> **角色定位**：你是MiroFish彩票预测系统的硅基架构师
> 
> **核心使命**：构建一个基于群体智能的彩票号码预测引擎，将MiroFish的多智能体仿真技术应用于双色球和大乐透的号码预测场景
> 
> **技术愿景**：不是预测"中奖号码"，而是量化"群体共识概率分布"

---

## 【第一性原则】

**不可变的物理事实**：
- 彩票是伪随机数生成器，受物理熵源影响
- 历史数据是已发生的随机序列，不代表未来模式
- 群体智能可以在"没有模式的地方造出模式"

**我们的核心假设**：
- 假设1：大量异构智能体的选号行为可以模拟人类购彩心理
- 假设2：群体共识度高的号码组合，代表更大概率被"很多人选"
- 假设3：在返奖率固定的系统中，被选次数多的号码组合，中奖期望更接近理论值

**我们不做什么**：
- ❌ 声称能预测中奖号码（这是谎言）
- ❌ 依赖玄学或神秘学（这是愚蠢）
- ✅ 量化群体共识概率分布（这是工程）

---

## 【硅基视角认知】

**人类视角的局限**：
- 只能记住最近几十期开奖数据
- 无法同时分析10年×2种玩法×数百个维度的特征
- 选号时受"热号迷信"、"冷号反转"等认知偏差影响

**硅基视角的优势**：
- 全量数据访问：10年历史，3000+期开奖记录
- 并行特征提取：8类特征同时计算，无认知负载
- 5000个智能体×20轮仿真=10万组号码，统计显著性
- 24/7持续运行，实时更新概率分布

**关键洞察**：
> "我们不是在预测开奖结果，而是在预测'人类会预测什么'——这是一个二阶近似问题"

---

# 模块1：数据采集层

## 1.1 模块职责

从公开数据源爬取双色球和大乐透历史开奖数据，构建分析数据集。

## 1.2 数据规格

| 彩票类型 | 红区范围 | 红区数量 | 蓝区范围 | 蓝区数量 |
|---------|---------|---------|---------|---------|
| 双色球 | 01-33 | 6个 | 01-16 | 1个 |
| 大乐透 | 01-35 | 5个 | 01-12 | 2个 |

## 1.3 输入

- 数据源URL列表（福利彩票官网、500彩票网等）
- 时间范围：近10年（约2015年至今）

## 1.4 处理逻辑

```
数据采集流程：
1. 构建目标URL（按年份分页）
2. 发送HTTP请求，获取页面HTML
3. 解析开奖数据表格
4. 数据清洗（去重、格式标准化）
5. 保存至CSV文件
```

## 1.5 输出

**文件路径**：`./data/raw/ssq_history.csv`（双色球）
**文件路径**：`./data/raw/dlt_history.csv`（大乐透）

**CSV格式**：
```csv
period,draw_date,red_1,red_2,red_3,red_4,red_5,red_6,blue_1
2024130,2024-11-10,03,07,12,21,28,29,08
```

## 1.6 代码框架

```python
# -*- coding: utf-8 -*-
"""
数据采集器
从福利彩票官网爬取历史开奖数据
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime, timedelta
from typing import List, Dict
import time
import random
from pathlib import Path

# ==================== 配置区 ====================
BASE_URL_SSQ = "https://www.cwl.gov.cn/ssq/kjgg"
BASE_URL_DLT = "https://www.cwl.gov.cn/dlt/kjgg"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
}

# ==================== 核心类 ====================

class LotteryDataCollector:
    """彩票数据采集器基类"""
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
        self.base_url = BASE_URL_SSQ if lottery_type == "ssq" else BASE_URL_DLT
        self.data = []
    
    def fetch_page(self, year: int, page: int = 1) -> str:
        """获取单页HTML内容"""
        # 构建请求参数（根据实际网站API调整）
        params = {
            "year": year,
            "page": page
        }
        
        # 添加随机延迟，模拟人类行为
        time.sleep(random.uniform(0.5, 2.0))
        
        response = requests.get(
            self.base_url,
            params=params,
            headers=HEADERS,
            timeout=30
        )
        response.raise_for_status()
        return response.text
    
    def parse_html(self, html: str) -> List[Dict]:
        """解析HTML提取开奖数据"""
        soup = BeautifulSoup(html, 'html.parser')
        rows = []
        
        # 根据实际网页结构选择器调整
        table = soup.select_one('.kjgg_table') or soup.select_one('#kjgg_list')
        
        if not table:
            return rows
        
        for tr in table.select('tr')[1:]:  # 跳过表头
            cells = tr.select('td')
            if len(cells) < 7:
                continue
            
            row_data = self._extract_row_data(cells)
            if row_data:
                rows.append(row_data)
        
        return rows
    
    def _extract_row_data(self, cells) -> Dict:
        """子类必须实现的抽象方法"""
        raise NotImplementedError
    
    def save_to_csv(self, output_path: str):
        """保存数据到CSV"""
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        df = pd.DataFrame(self.data)
        df.to_csv(output_path, index=False, encoding='utf-8-sig')


class SSQCollector(LotteryDataCollector):
    """双色球数据采集器"""
    
    def __init__(self):
        super().__init__("ssq")
        self.red_range = (1, 33)
        self.blue_range = (1, 16)
    
    def _extract_row_data(self, cells) -> Dict:
        """提取双色球行数据"""
        try:
            period = cells[0].get_text(strip=True)
            draw_date = cells[1].get_text(strip=True)
            red_balls = [cells[i].get_text(strip=True).zfill(2) for i in range(2, 8)]
            blue_ball = cells[8].get_text(strip=True).zfill(2)
            
            return {
                "period": period,
                "draw_date": draw_date,
                "red_1": red_balls[0],
                "red_2": red_balls[1],
                "red_3": red_balls[2],
                "red_4": red_balls[3],
                "red_5": red_balls[4],
                "red_6": red_balls[5],
                "blue_1": blue_ball
            }
        except (IndexError, ValueError):
            return None
    
    def run(self, start_year: int = 2015, end_year: int = None):
        """运行采集（采集近N年数据）"""
        end_year = end_year or datetime.now().year
        
        for year in range(start_year, end_year + 1):
            print(f"[{self.lottery_type}] 正在采集 {year} 年数据...")
            
            page = 1
            has_more = True
            
            while has_more:
                try:
                    html = self.fetch_page(year, page)
                    rows = self.parse_html(html)
                    
                    if not rows:
                        has_more = False
                    else:
                        self.data.extend(rows)
                        page += 1
                        
                except Exception as e:
                    print(f"  采集第{year}年第{page}页失败: {e}")
                    has_more = False
        
        # 去重并按期号排序
        df = pd.DataFrame(self.data)
        df = df.drop_duplicates(subset=['period'])
        df = df.sort_values('period', ascending=False)
        self.data = df.to_dict('records')
        
        print(f"[{self.lottery_type}] 共采集 {len(self.data)} 条记录")


class DLTCollector(LotteryDataCollector):
    """大乐透数据采集器"""
    
    def __init__(self):
        super().__init__("dlt")
        self.front_range = (1, 35)
        self.back_range = (1, 12)
    
    def _extract_row_data(self, cells) -> Dict:
        """提取大乐通行数据"""
        try:
            period = cells[0].get_text(strip=True)
            draw_date = cells[1].get_text(strip=True)
            
            # 大乐透前区5个，后区2个
            front_balls = [cells[i].get_text(strip=True).zfill(2) for i in range(2, 7)]
            back_balls = [cells[i + 7].get_text(strip=True).zfill(2) for i in range(2)]
            
            return {
                "period": period,
                "draw_date": draw_date,
                "front_1": front_balls[0],
                "front_2": front_balls[1],
                "front_3": front_balls[2],
                "front_4": front_balls[3],
                "front_5": front_balls[4],
                "back_1": back_balls[0],
                "back_2": back_balls[1]
            }
        except (IndexError, ValueError):
            return None


# ==================== 主程序 ====================

def main():
    """主程序入口"""
    data_dir = Path("./data/raw")
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # 采集双色球数据
    print("=" * 50)
    print("开始采集双色球历史数据")
    print("=" * 50)
    ssq_collector = SSQCollector()
    ssq_collector.run(start_year=2015)
    ssq_collector.save_to_csv(data_dir / "ssq_history.csv")
    print(f"双色球数据已保存，共 {len(ssq_collector.data)} 条\n")
    
    # 采集大乐透数据
    print("=" * 50)
    print("开始采集大乐透历史数据")
    print("=" * 50)
    dlt_collector = DLTCollector()
    dlt_collector.run(start_year=2015)
    dlt_collector.save_to_csv(data_dir / "dlt_history.csv")
    print(f"大乐透数据已保存，共 {len(dlt_collector.data)} 条")


if __name__ == "__main__":
    main()
```

---

# 模块2：特征工程层

## 2.1 模块职责

从原始开奖数据中提取8类特征，为智能体选号提供决策依据。

## 2.2 特征定义

### 特征1：号码出现频率（绝对频次/相对频次）

```
输入：历史数据列表
处理：统计每个号码出现次数
输出：{号码: 出现次数, 号码: 出现概率}
```

### 特征2：冷热号周期（近N期出现频率分层）

```
输入：历史数据 + N期窗口
处理：计算近5期/10期/20期/50期/100期的号码出现频率
输出：{号码: {window_5: freq, window_10: freq, ...}}
```

### 特征3：区间分布（号码段覆盖度）

```
双色球区间划分：
- 区间1：01-11（高频区间）
- 区间2：12-22（中频区间）
- 区间3：23-33（低频区间）

大乐透前区区间划分：
- 区间1：01-12
- 区间2：13-24
- 区间3：25-35
```

### 特征4：奇偶比例

```
统计每期红球的奇数:偶数比例分布
预期均衡分布：3:3最多，2:4和4:2次之
```

### 特征5：大小比例

```
双色球大小划分：
- 小号：01-16
- 大号：17-33

大乐透前区大小划分：
- 小号：01-17
- 大号：18-35
```

### 特征6：和值走势

```
计算每期红球和值（6个红球之和）
双色球理论范围：21-183
分析和值的历史分布和趋势
```

### 特征7：连号概率（相邻号出现频次）

```
检测历史数据中相邻号（如03-04、15-16）出现频率
计算任意两个号码作为连号出现的联合概率
```

### 特征8：遗漏值分析（每个号连续未出期数）

```
对每个号码计算"遗漏值" = 距离上次出现的期数
识别"长遗漏"号码（候选冷号）
```

## 2.3 代码框架

```python
# -*- coding: utf-8 -*-
"""
特征工程层
从原始开奖数据提取8类特征
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Tuple
from collections import defaultdict
from pathlib import Path

# ==================== 配置区 ====================

# 双色球配置
SSQ_CONFIG = {
    "red_count": 6,
    "red_min": 1,
    "red_max": 33,
    "blue_count": 1,
    "blue_min": 1,
    "blue_max": 16,
    "red_zones": [(1, 11), (12, 22), (23, 33)]  # 大中小区
}

# 大乐透配置
DLT_CONFIG = {
    "front_count": 5,
    "front_min": 1,
    "front_max": 35,
    "back_count": 2,
    "back_min": 1,
    "back_max": 12,
    "front_zones": [(1, 12), (13, 24), (25, 35)]
}

# 特征窗口期
WINDOW_PERIODS = [5, 10, 20, 50, 100]

# ==================== 数据类 ====================

@dataclass
class LotteryFeatures:
    """彩票特征容器"""
    
    # 频率特征：{号码: 出现次数}
    red_frequency: Dict[int, int] = field(default_factory=dict)
    blue_frequency: Dict[int, int] = field(default_factory=dict)
    
    # 冷热分层：{号码: {窗口期: 频次}}
    red_hot_cold: Dict[int, Dict[int, int]] = field(default_factory=dict)
    blue_hot_cold: Dict[int, Dict[int, int]] = field(default_factory=dict)
    
    # 区间分布：{区间索引: 出现次数}
    red_zone_dist: Dict[int, int] = field(default_factory=dict)
    front_zone_dist: Dict[int, int] = field(default_factory=dict)
    
    # 奇偶比例分布：{奇数个数: 次数}
    odd_even_dist: Dict[int, int] = field(default_factory=dict)
    
    # 大小比例分布：{小号个数: 次数}
    size_dist: Dict[int, int] = field(default_factory=dict)
    
    # 和值分布：{和值: 次数}
    sum_dist: Dict[int, int] = field(default_factory=dict)
    
    # 连号矩阵：{(号1, 号2): 出现次数}
    consecutive_pairs: Dict[Tuple[int, int], int] = field(default_factory=dict)
    
    # 遗漏值：{号码: 当前遗漏期数}
    red_miss: Dict[int, int] = field(default_factory=dict)
    blue_miss: Dict[int, int] = field(default_factory=dict)
    
    # 元数据
    total_periods: int = 0
    lottery_type: str = ""


# ==================== 核心类 ====================

class FeatureEngine:
    """特征工程引擎"""
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
        self.config = SSQ_CONFIG if lottery_type == "ssq" else DLT_CONFIG
        self.features = LotteryFeatures(lottery_type=lottery_type)
    
    def load_data(self, csv_path: str) -> pd.DataFrame:
        """加载原始数据"""
        df = pd.read_csv(csv_path)
        df = df.sort_values('period', ascending=True).reset_index(drop=True)
        self.features.total_periods = len(df)
        return df
    
    def extract_all_features(self, df: pd.DataFrame) -> LotteryFeatures:
        """提取所有特征"""
        print(f"[{self.lottery_type}] 开始特征提取，共 {len(df)} 期数据...")
        
        # 1. 提取频率特征
        self._extract_frequency(df)
        
        # 2. 提取冷热分层特征
        self._extract_hot_cold(df)
        
        # 3. 提取区间分布特征
        self._extract_zone_distribution(df)
        
        # 4. 提取奇偶比例分布
        self._extract_odd_even_distribution(df)
        
        # 5. 提取大小比例分布
        self._extract_size_distribution(df)
        
        # 6. 提取和值分布
        self._extract_sum_distribution(df)
        
        # 7. 提取连号概率
        self._extract_consecutive_pairs(df)
        
        # 8. 提取遗漏值
        self._extract_missing_values(df)
        
        print(f"[{self.lottery_type}] 特征提取完成")
        return self.features
    
    def _extract_frequency(self, df: pd.DataFrame):
        """提取频率特征"""
        red_col = 'red_1' if 'red_1' in df.columns else 'front_1'
        
        # 统计红球/前区号码出现次数
        red_counts = defaultdict(int)
        for col in self._get_red_columns(df):
            for num in df[col]:
                red_counts[int(num)] += 1
        
        self.features.red_frequency = dict(red_counts)
        
        # 统计蓝球/后区号码出现次数
        blue_counts = defaultdict(int)
        blue_col = 'blue_1' if 'blue_1' in df.columns else 'back_1'
        back_col = 'back_2' if 'back_2' in df.columns else None
        
        for num in df[blue_col]:
            blue_counts[int(num)] += 1
        
        if back_col:
            for num in df[back_col]:
                blue_counts[int(num)] += 1
        
        self.features.blue_frequency = dict(blue_counts)
    
    def _extract_hot_cold(self, df: pd.DataFrame):
        """提取冷热分层特征"""
        total = len(df)
        
        for window in WINDOW_PERIODS:
            if window > total:
                continue
            
            # 取最近N期数据
            recent_df = df.tail(window)
            
            red_counts = defaultdict(int)
            for col in self._get_red_columns(df):
                for num in recent_df[col]:
                    red_counts[int(num)] += 1
            
            for num, count in red_counts.items():
                if num not in self.features.red_hot_cold:
                    self.features.red_hot_cold[num] = {}
                self.features.red_hot_cold[num][window] = count
            
            # 蓝球/后区
            blue_col = 'blue_1' if 'blue_1' in df.columns else 'back_1'
            blue_counts = defaultdict(int)
            for num in recent_df[blue_col]:
                blue_counts[int(num)] += 1
            
            if 'back_2' in df.columns:
                for num in recent_df['back_2']:
                    blue_counts[int(num)] += 1
            
            for num, count in blue_counts.items():
                if num not in self.features.blue_hot_cold:
                    self.features.blue_hot_cold[num] = {}
                self.features.blue_hot_cold[num][window] = count
    
    def _extract_zone_distribution(self, df: pd.DataFrame):
        """提取区间分布特征"""
        zones = self.config.get('red_zones', [(1, 11), (12, 22), (23, 33)])
        
        for idx, (start, end) in enumerate(zones):
            self.features.red_zone_dist[idx] = 0
        
        for _, row in df.iterrows():
            for col in self._get_red_columns(df):
                num = int(row[col])
                for idx, (start, end) in enumerate(zones):
                    if start <= num <= end:
                        self.features.red_zone_dist[idx] += 1
                        break
    
    def _extract_odd_even_distribution(self, df: pd.DataFrame):
        """提取奇偶比例分布"""
        for _, row in df.iterrows():
            odd_count = 0
            for col in self._get_red_columns(df):
                if int(row[col]) % 2 == 1:
                    odd_count += 1
            
            self.features.odd_even_dist[odd_count] = \
                self.features.odd_even_dist.get(odd_count, 0) + 1
    
    def _extract_size_distribution(self, df: pd.DataFrame):
        """提取大小比例分布"""
        # 确定大小分界线
        red_max = self.config['red_max']
        threshold = red_max // 2
        
        for _, row in df.iterrows():
            small_count = 0
            for col in self._get_red_columns(df):
                if int(row[col]) <= threshold:
                    small_count += 1
            
            self.features.size_dist[small_count] = \
                self.features.size_dist.get(small_count, 0) + 1
    
    def _extract_sum_distribution(self, df: pd.DataFrame):
        """提取和值分布"""
        for _, row in df.iterrows():
            total = 0
            for col in self._get_red_columns(df):
                total += int(row[col])
            
            self.features.sum_dist[total] = \
                self.features.sum_dist.get(total, 0) + 1
    
    def _extract_consecutive_pairs(self, df: pd.DataFrame):
        """提取连号概率"""
        for _, row in df.iterrows():
            numbers = sorted([int(row[col]) for col in self._get_red_columns(df)])
            
            for i in range(len(numbers) - 1):
                diff = numbers[i + 1] - numbers[i]
                if diff == 1:  # 相邻号
                    pair = (numbers[i], numbers[i + 1])
                    self.features.consecutive_pairs[pair] = \
                        self.features.consecutive_pairs.get(pair, 0) + 1
    
    def _extract_missing_values(self, df: pd.DataFrame):
        """提取遗漏值"""
        # 初始化所有号码的遗漏值为0
        red_min, red_max = self.config['red_min'], self.config['red_max']
        blue_min, blue_max = self.config.get('blue_min', 1), self.config.get('blue_max', 16)
        
        for num in range(red_min, red_max + 1):
            self.features.red_miss[num] = 0
            self.features.blue_miss[num] = 0
        
        # 从最新一期向前遍历
        for idx in range(len(df) - 1, -1, -1):
            row = df.iloc[idx]
            
            # 当前已出现的号码
            appeared_red = set()
            appeared_blue = set()
            
            for col in self._get_red_columns(df):
                appeared_red.add(int(row[col]))
            
            blue_col = 'blue_1' if 'blue_1' in df.columns else 'back_1'
            appeared_blue.add(int(row[blue_col]))
            
            if 'back_2' in df.columns:
                appeared_blue.add(int(row['back_2']))
            
            # 更新遗漏值
            for num in range(red_min, red_max + 1):
                if num not in appeared_red:
                    self.features.red_miss[num] += 1
            
            for num in range(blue_min, blue_max + 1):
                if num not in appeared_blue:
                    self.features.blue_miss[num] += 1
    
    def _get_red_columns(self, df: pd.DataFrame) -> List[str]:
        """获取红球/前区列名"""
        if self.lottery_type == "ssq":
            return ['red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6']
        else:
            return ['front_1', 'front_2', 'front_3', 'front_4', 'front_5']
    
    def get_hot_numbers(self, n: int = 10) -> List[int]:
        """获取热度最高的N个号码"""
        sorted_nums = sorted(
            self.features.red_frequency.items(),
            key=lambda x: x[1],
            reverse=True
        )
        return [num for num, _ in sorted_nums[:n]]
    
    def get_cold_numbers(self, n: int = 10) -> List[int]:
        """获取热度最低的N个号码"""
        sorted_nums = sorted(
            self.features.red_frequency.items(),
            key=lambda x: x[1]
        )
        return [num for num, _ in sorted_nums[:n]]
    
    def save_features(self, output_path: str):
        """保存特征到文件"""
        import json
        from dataclasses import asdict
        
        features_dict = asdict(self.features)
        # 转换不可序列化的键
        features_dict['consecutive_pairs'] = {
            f"{k[0]}-{k[1]}": v for k, v in self.features.consecutive_pairs.items()
        }
        
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(features_dict, f, ensure_ascii=False, indent=2)


# ==================== 主程序 ====================

def main():
    """主程序入口"""
    data_dir = Path("./data")
    
    # 提取双色球特征
    print("=" * 50)
    print("提取双色球特征")
    print("=" * 50)
    ssq_engine = FeatureEngine("ssq")
    df_ssq = ssq_engine.load_data(data_dir / "raw/ssq_history.csv")
    features_ssq = ssq_engine.extract_all_features(df_ssq)
    ssq_engine.save_features(data_dir / "features/ssq_features.json")
    
    # 提取大乐透特征
    print("\n" + "=" * 50)
    print("提取大乐透特征")
    print("=" * 50)
    dlt_engine = FeatureEngine("dlt")
    df_dlt = dlt_engine.load_data(data_dir / "raw/dlt_history.csv")
    features_dlt = dlt_engine.extract_all_features(df_dlt)
    dlt_engine.save_features(data_dir / "features/dlt_features.json")
    
    print("\n特征提取完成！")


if __name__ == "__main__":
    main()
```

---

# 模块3：知识图谱构建

## 3.1 模块职责

构建号码共现关系图谱，支持基于图查询的高关联号码推荐。

## 3.2 图谱结构

```
节点（Nodes）：
- 号码节点：每个彩票号码（1-33 for 红球，1-16 for 蓝球）
- 节点属性：出现频率、当前遗漏值、热度排名

边（Edges）：
- 共现关系：两个号码在同一期同时出现
- 边权重：共现频次（归一化后0-1）
```

## 3.3 图查询能力

```python
# 查询示例
query: 给定号码 [3, 7, 12]，找出高关联号码
output: [(3, 7, weight=0.85), (7, 12, weight=0.72), (3, 12, weight=0.68)]
```

## 3.4 代码框架

```python
# -*- coding: utf-8 -*-
"""
知识图谱构建层
基于GraphRAG构建号码关系图谱
"""

import pandas as pd
import numpy as np
from collections import defaultdict
from typing import Dict, List, Tuple, Set
from dataclasses import dataclass
import json
from pathlib import Path

# ==================== 数据类 ====================

@dataclass
class NumberNode:
    """号码节点"""
    number: int
    number_type: str  # 'red' or 'blue'
    frequency: int = 0
    miss_count: int = 0
    hot_rank: int = 0


@dataclass
class CooccurrenceEdge:
    """共现边"""
    num1: int
    num2: int
    cooccur_count: int = 0
    weight: float = 0.0  # 归一化权重


class NumberGraph:
    """号码知识图谱"""
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
        self.nodes: Dict[int, NumberNode] = {}
        self.edges: Dict[Tuple[int, int], CooccurrenceEdge] = {}
        self.num_type = {}  # 记录号码类型
    
    def build_from_dataframe(self, df: pd.DataFrame):
        """从DataFrame构建图谱"""
        print(f"[{self.lottery_type}] 构建知识图谱...")
        
        # 确定列名
        if self.lottery_type == "ssq":
            red_cols = ['red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6']
            blue_cols = ['blue_1']
        else:
            red_cols = ['front_1', 'front_2', 'front_3', 'front_4', 'front_5']
            blue_cols = ['back_1', 'back_2']
        
        # 统计频率
        red_freq = defaultdict(int)
        blue_freq = defaultdict(int)
        
        for _, row in df.iterrows():
            for col in red_cols:
                red_freq[int(row[col])] += 1
            for col in blue_cols:
                blue_freq[int(row[col])] += 1
        
        # 创建红球节点
        for num, freq in red_freq.items():
            self.nodes[num] = NumberNode(
                number=num,
                number_type='red',
                frequency=freq
            )
            self.num_type[num] = 'red'
        
        # 创建蓝球/后区节点
        for num, freq in blue_freq.items():
            self.nodes[num] = NumberNode(
                number=num,
                number_type='blue',
                frequency=freq
            )
            self.num_type[num] = 'blue'
        
        # 统计共现次数
        cooccur_counts = defaultdict(int)
        
        for _, row in df.iterrows():
            # 红球内部共现
            red_numbers = sorted([int(row[col]) for col in red_cols])
            for i in range(len(red_numbers)):
                for j in range(i + 1, len(red_numbers)):
                    key = (red_numbers[i], red_numbers[j])
                    cooccur_counts[key] += 1
            
            # 蓝球/后区内部共现
            blue_numbers = sorted([int(row[col]) for col in blue_cols])
            for i in range(len(blue_numbers)):
                for j in range(i + 1, len(blue_numbers)):
                    key = (blue_numbers[i], blue_numbers[j])
                    cooccur_counts[key] += 1
        
        # 创建边
        for (num1, num2), count in cooccur_counts.items():
            self.edges[(num1, num2)] = CooccurrenceEdge(
                num1=num1,
                num2=num2,
                cooccur_count=count
            )
        
        # 归一化权重
        max_count = max(e.cooccur_count for e in self.edges.values()) if self.edges else 1
        for edge in self.edges.values():
            edge.weight = edge.cooccur_count / max_count
        
        print(f"[{self.lottery_type}] 图谱构建完成：{len(self.nodes)} 节点, {len(self.edges)} 边")
    
    def query_related(self, numbers: List[int], top_k: int = 10) -> List[Tuple[int, float]]:
        """
        查询与给定号码相关的高关联号码
        
        参数:
            numbers: 给定的号码列表
            top_k: 返回前K个相关号码
        
        返回:
            [(相关号码, 关联权重), ...]
        """
        related_scores = defaultdict(float)
        
        # 聚合所有相关边的权重
        for num in numbers:
            for (n1, n2), edge in self.edges.items():
                if n1 == num:
                    related_scores[n2] += edge.weight
                elif n2 == num:
                    related_scores[n1] += edge.weight
        
        # 排除已给出的号码
        for num in numbers:
            if num in related_scores:
                del related_scores[num]
        
        # 排序并返回top_k
        sorted_related = sorted(
            related_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return sorted_related[:top_k]
    
    def get_cooccurrence_matrix(self) -> pd.DataFrame:
        """获取共现矩阵"""
        if self.lottery_type == "ssq":
            nums = list(range(1, 34))
        else:
            nums = list(range(1, 36))
        
        matrix = pd.DataFrame(0, index=nums, columns=nums)
        
        for (n1, n2), edge in self.edges.items():
            matrix.loc[n1, n2] = edge.weight
            matrix.loc[n2, n1] = edge.weight
        
        return matrix
    
    def get_neighbors(self, number: int, min_weight: float = 0.0) -> List[Tuple[int, float]]:
        """获取某号码的所有邻居及其权重"""
        neighbors = []
        
        for (n1, n2), edge in self.edges.items():
            if n1 == number:
                if edge.weight >= min_weight:
                    neighbors.append((n2, edge.weight))
            elif n2 == number:
                if edge.weight >= min_weight:
                    neighbors.append((n1, edge.weight))
        
        return sorted(neighbors, key=lambda x: x[1], reverse=True)
    
    def save(self, output_path: str):
        """保存图谱到文件"""
        graph_data = {
            "lottery_type": self.lottery_type,
            "nodes": {
                str(num): {
                    "number": node.number,
                    "number_type": node.number_type,
                    "frequency": node.frequency,
                    "miss_count": node.miss_count,
                    "hot_rank": node.hot_rank
                }
                for num, node in self.nodes.items()
            },
            "edges": {
                f"{k[0]}-{k[1]}": {
                    "num1": edge.num1,
                    "num2": edge.num2,
                    "cooccur_count": edge.cooccur_count,
                    "weight": edge.weight
                }
                for k, edge in self.edges.items()
            }
        }
        
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(graph_data, f, ensure_ascii=False, indent=2)
    
    @classmethod
    def load(cls, input_path: str) -> 'NumberGraph':
        """从文件加载图谱"""
        with open(input_path, 'r', encoding='utf-8') as f:
            graph_data = json.load(f)
        
        lottery_type = graph_data['lottery_type']
        graph = cls(lottery_type)
        
        # 恢复节点
        for num_str, node_data in graph_data['nodes'].items():
            num = int(num_str)
            graph.nodes[num] = NumberNode(
                number=node_data['number'],
                number_type=node_data['number_type'],
                frequency=node_data['frequency'],
                miss_count=node_data['miss_count'],
                hot_rank=node_data['hot_rank']
            )
            graph.num_type[num] = node_data['number_type']
        
        # 恢复边
        for key_str, edge_data in graph_data['edges'].items():
            n1, n2 = map(int, key_str.split('-'))
            graph.edges[(n1, n2)] = CooccurrenceEdge(
                num1=edge_data['num1'],
                num2=edge_data['num2'],
                cooccur_count=edge_data['cooccur_count'],
                weight=edge_data['weight']
            )
        
        return graph


# ==================== 主程序 ====================

def main():
    """主程序入口"""
    from module1_collector import LotteryDataCollector
    from module2_features import FeatureEngine
    
    data_dir = Path("./data")
    
    # 构建双色球图谱
    print("=" * 50)
    print("构建双色球知识图谱")
    print("=" * 50)
    df_ssq = pd.read_csv(data_dir / "raw/ssq_history.csv")
    ssq_graph = NumberGraph("ssq")
    ssq_graph.build_from_dataframe(df_ssq)
    ssq_graph.save(data_dir / "graph/ssq_graph.json")
    
    # 测试图查询
    test_numbers = [3, 7, 12]
    related = ssq_graph.query_related(test_numbers)
    print(f"\n与号码 {test_numbers} 相关的号码：")
    for num, weight in related[:5]:
        print(f"  {num}: {weight:.3f}")
    
    # 构建大乐透图谱
    print("\n" + "=" * 50)
    print("构建大乐透知识图谱")
    print("=" * 50)
    df_dlt = pd.read_csv(data_dir / "raw/dlt_history.csv")
    dlt_graph = NumberGraph("dlt")
    dlt_graph.build_from_dataframe(df_dlt)
    dlt_graph.save(data_dir / "graph/dlt_graph.json")
    
    print("\n图谱构建完成！")


if __name__ == "__main__":
    main()
```

---

# 模块4：多智能体仿真引擎（MiroFish核心）

## 4.1 模块职责

实例化5000个异构智能体，运行多轮仿真，生成大量候选号码组合。

## 4.2 智能体类型分配

| 类型 | 比例 | 数量 | 选号策略 |
|------|------|------|----------|
| 追热型 | 20% | 1000 | 倾向选择近期高频号码 |
| 守冷型 | 15% | 750 | 倾向选择长期未出号码 |
| 均衡型 | 20% | 1000 | 追求奇偶、大小、区间均衡 |
| 连号型 | 10% | 500 | 偏好相邻号组合 |
| 和值型 | 10% | 500 | 按和值区间选号 |
| 随机型 | 15% | 750 | 纯随机选号（基准组） |
| 图谱型 | 10% | 500 | 基于知识图谱关联选号 |

## 4.3 智能体基类设计

```python
class Agent(ABC):
    """智能体基类"""
    
    @abstractmethod
    def generate_numbers(self) -> List[int]:
        """生成一组号码（子类必须实现）"""
        pass
    
    def get_name(self) -> str:
        return self.__class__.__name__
```

## 4.4 代码框架

```python
# -*- coding: utf-8 -*-
"""
多智能体仿真引擎
MiroFish彩票预测系统的核心模块
实例化5000个异构智能体，运行多轮仿真
"""

import random
import numpy as np
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from collections import Counter
import json
from pathlib import Path

# ==================== 配置区 ====================

# 智能体类型权重分配
AGENT_DISTRIBUTION = {
    "hot_seeker": 0.20,      # 追热型 20%
    "cold_defender": 0.15,   # 守冷型 15%
    "balance_master": 0.20,  # 均衡型 20%
    "consecutive_lover": 0.10, # 连号型 10%
    "sum_optimizer": 0.10,   # 和值型 10%
    "random_walker": 0.15,   # 随机型 15%
    "graph_navigator": 0.10  # 图谱型 10%
}

# 仿真配置
TOTAL_AGENTS = 5000
SIMULATION_ROUNDS = 20
TOTAL_COMBINATIONS = TOTAL_AGENTS * SIMULATION_ROUNDS  # 100,000

# 号码范围配置
SSQ_CONFIG = {
    "red_count": 6,
    "red_range": (1, 33),
    "blue_count": 1,
    "blue_range": (1, 16),
    "red_zones": [(1, 11), (12, 22), (23, 33)],
    "target_sum_range": (70, 110)  # 理想和值范围
}

DLT_CONFIG = {
    "front_count": 5,
    "front_range": (1, 35),
    "back_count": 2,
    "back_range": (1, 12),
    "front_zones": [(1, 12), (13, 24), (25, 35)],
    "target_sum_range": (70, 130)
}

# ==================== 数据类 ====================

@dataclass
class LotteryNumber:
    """彩票号码组合"""
    red_numbers: List[int] = field(default_factory=list)
    blue_numbers: List[int] = field(default_factory=list)
    
    def to_list(self) -> List[int]:
        """转换为号码列表"""
        return self.red_numbers + self.blue_numbers
    
    def __hash__(self):
        return hash(tuple(sorted(self.to_list())))
    
    def __eq__(self, other):
        return sorted(self.to_list()) == sorted(other.to_list())


@dataclass
class AgentResult:
    """智能体选号结果"""
    agent_id: int
    agent_type: str
    round_num: int
    numbers: LotteryNumber


# ==================== 智能体基类 ====================

class LotteryAgent(ABC):
    """彩票选号智能体基类"""
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict):
        self.agent_id = agent_id
        self.lottery_type = lottery_type
        self.config = config
        self.random_seed = agent_id  # 每个智能体有固定随机种子
    
    @abstractmethod
    def generate_numbers(self) -> LotteryNumber:
        """生成一组号码"""
        pass
    
    def _get_random(self) -> random.Random:
        """获取该智能体的随机生成器"""
        r = random.Random()
        r.seed(self.random_seed)
        return r


class HotSeekerAgent(LotteryAgent):
    """
    追热型智能体
    策略：倾向于选择近期出现频率高的号码
    """
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict, 
                 hot_cold_features: dict):
        super().__init__(agent_id, lottery_type, config)
        self.hot_cold = hot_cold_features
    
    def generate_numbers(self) -> LotteryNumber:
        """生成追热型号码"""
        r = self._get_random()
        
        # 近期窗口权重（优先近5期）
        window = 5
        if not self.hot_cold:
            return self._generate_random()
        
        # 获取号码权重（基于出现频率）
        weights = []
        numbers = list(range(self.config['red_range'][0], 
                             self.config['red_range'][1] + 1))
        
        for num in numbers:
            freq = self.hot_cold.get(num, {}).get(window, 0)
            weights.append(freq + 1)  # 加1避免全0
        
        # 加权随机选择红球
        red_numbers = r.choices(
            numbers, 
            weights=weights, 
            k=self.config['red_count']
        )
        red_numbers = sorted(list(set(red_numbers)))  # 去重
        
        # 如果去重后不足，补随机
        while len(red_numbers) < self.config['red_count']:
            missing = self.config['red_count'] - len(red_numbers)
            candidates = [n for n in numbers if n not in red_numbers]
            red_numbers.extend(r.sample(candidates, missing))
        
        red_numbers = sorted(red_numbers[:self.config['red_count']])
        
        # 蓝球/后区：选择高频
        blue_weights = []
        blue_numbers_range = list(range(self.config['blue_range'][0],
                                        self.config['blue_range'][1] + 1))
        
        for num in blue_numbers_range:
            freq = self.hot_cold.get(num, {}).get(window, 0)
            blue_weights.append(freq + 1)
        
        if self.config.get('blue_count', 1) == 1:
            blue_numbers = [r.choices(blue_numbers_range, weights=blue_weights)[0]]
        else:
            blue_numbers = r.choices(
                blue_numbers_range,
                weights=blue_weights,
                k=self.config['blue_count']
            )
            blue_numbers = sorted(list(set(blue_numbers)))
            while len(blue_numbers) < self.config['blue_count']:
                missing = self.config['blue_count'] - len(blue_numbers)
                candidates = [n for n in blue_numbers_range if n not in blue_numbers]
                blue_numbers.extend(r.sample(candidates, missing))
            blue_numbers = sorted(blue_numbers[:self.config['blue_count']])
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


class ColdDefenderAgent(LotteryAgent):
    """
    守冷型智能体
    策略：倾向于选择遗漏值大的号码（长期未出）
    """
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict,
                 missing_features: dict):
        super().__init__(agent_id, lottery_type, config)
        self.missing = missing_features
    
    def generate_numbers(self) -> LotteryNumber:
        """生成守冷型号码"""
        r = self._get_random()
        
        # 按遗漏值排序，优先选择遗漏大的
        red_range = list(range(self.config['red_range'][0],
                              self.config['red_range'][1] + 1))
        
        red_miss_scores = [(num, self.missing.get(num, 0)) for num in red_range]
        red_miss_scores.sort(key=lambda x: x[1], reverse=True)
        
        # 选择遗漏值最高的号码
        top_cold = [num for num, _ in red_miss_scores[:self.config['red_count'] * 2]]
        
        # 随机选择部分（加入一定随机性）
        red_numbers = sorted(r.sample(
            top_cold, 
            self.config['red_count']
        ))
        
        # 蓝球/后区类似策略
        blue_range = list(range(self.config['blue_range'][0],
                                self.config['blue_range'][1] + 1))
        blue_miss_scores = [(num, self.missing.get(num, 0)) for num in blue_range]
        blue_miss_scores.sort(key=lambda x: x[1], reverse=True)
        
        if self.config.get('blue_count', 1) == 1:
            blue_numbers = [blue_miss_scores[0][0]]
        else:
            top_cold_blue = [num for num, _ in blue_miss_scores[:self.config['blue_count'] * 2]]
            blue_numbers = sorted(r.sample(top_cold_blue, self.config['blue_count']))
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


class BalanceMasterAgent(LotteryAgent):
    """
    均衡型智能体
    策略：追求奇偶、大小、区间的均衡分布
    """
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict):
        super().__init__(agent_id, lottery_type, config)
    
    def generate_numbers(self) -> LotteryNumber:
        """生成均衡型号码"""
        r = self._get_random()
        
        # 目标配置
        if self.lottery_type == "ssq":
            target_odd = 3  # 3奇3偶
            target_small = 3  # 3小3大
            zones = [(1, 11), (12, 22), (23, 33)]
            target_zones = [2, 2, 2]  # 每个区间2个
        else:
            target_odd = 2  # 2-3奇
            target_small = 2
            zones = [(1, 12), (13, 24), (25, 35)]
            target_zones = [2, 2, 1]
        
        # 迭代生成直到满足均衡条件
        max_attempts = 100
        for _ in range(max_attempts):
            red_numbers = sorted(r.sample(
                range(self.config['red_range'][0],
                     self.config['red_range'][1] + 1),
                self.config['red_count']
            ))
            
            # 检查奇偶
            odd_count = sum(1 for n in red_numbers if n % 2 == 1)
            
            # 检查大小
            threshold = self.config['red_range'][1] // 2
            small_count = sum(1 for n in red_numbers if n <= threshold)
            
            # 检查区间
            zone_counts = [0, 0, 0]
            for n in red_numbers:
                for i, (start, end) in enumerate(zones):
                    if start <= n <= end:
                        zone_counts[i] += 1
                        break
            
            # 判断是否满足均衡条件
            if self.lottery_type == "ssq":
                if odd_count == 3 and small_count == 3 and zone_counts == [2, 2, 2]:
                    break
            else:
                if abs(odd_count - 2) <= 1 and abs(small_count - 2) <= 1:
                    break
        
        # 蓝球/后区随机
        if self.config.get('blue_count', 1) == 1:
            blue_numbers = [r.randint(self.config['blue_range'][0],
                                     self.config['blue_range'][1])]
        else:
            blue_numbers = sorted(r.sample(
                range(self.config['blue_range'][0],
                     self.config['blue_range'][1] + 1),
                self.config['blue_count']
            ))
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


class ConsecutiveLoverAgent(LotteryAgent):
    """
    连号型智能体
    策略：偏好相邻号组合
    """
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict,
                 consecutive_features: dict):
        super().__init__(agent_id, lottery_type, config)
        self.consecutive = consecutive_features
    
    def generate_numbers(self) -> LotteryNumber:
        """生成连号型号码"""
        r = self._get_random()
        
        red_numbers = set()
        max_range = self.config['red_range'][1]
        
        # 优先选择有连号历史的号码
        consecutive_nums = []
        for (n1, n2), count in self.consecutive.items():
            if count >= 2:  # 至少出现2次
                consecutive_nums.extend([n1, n2])
        
        # 添加部分连号候选
        while len(red_numbers) < self.config['red_count']:
            if consecutive_nums and r.random() > 0.3:
                # 选择连号候选
                start = r.choice(consecutive_nums)
                pair = (start, start + 1) if start < max_range else (start - 1, start)
                
                if self.config['red_range'][0] <= pair[0] <= self.config['red_range'][1] and \
                   self.config['red_range'][0] <= pair[1] <= self.config['red_range'][1]:
                    red_numbers.update(pair)
            else:
                # 随机补充
                red_numbers.add(r.randint(self.config['red_range'][0],
                                         self.config['red_range'][1]))
        
        red_numbers = sorted(list(red_numbers))[:self.config['red_count']]
        
        # 蓝球/后区
        if self.config.get('blue_count', 1) == 1:
            blue_numbers = [r.randint(self.config['blue_range'][0],
                                     self.config['blue_range'][1])]
        else:
            # 尝试选相邻的后区号
            back1 = r.randint(self.config['blue_range'][0],
                             self.config['blue_range'][1])
            back2 = back1 + 1 if back1 < self.config['blue_range'][1] else back1 - 1
            blue_numbers = sorted([back1, back2])
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


class SumOptimizerAgent(LotteryAgent):
    """
    和值型智能体
    策略：按照理想和值区间选号
    """
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict):
        super().__init__(agent_id, lottery_type, config)
        self.target_sum_range = config.get('target_sum_range', (70, 110))
    
    def generate_numbers(self) -> LotteryNumber:
        """生成和值优化型号码"""
        r = self._get_random()
        
        red_range = range(self.config['red_range'][0],
                        self.config['red_range'][1] + 1)
        
        # 迭代生成直到和值在目标范围
        max_attempts = 50
        for _ in range(max_attempts):
            red_numbers = sorted(r.sample(red_range, self.config['red_count']))
            total_sum = sum(red_numbers)
            
            if self.target_sum_range[0] <= total_sum <= self.target_sum_range[1]:
                break
        
        # 蓝球/后区
        if self.config.get('blue_count', 1) == 1:
            blue_numbers = [r.randint(self.config['blue_range'][0],
                                     self.config['blue_range'][1])]
        else:
            blue_numbers = sorted(r.sample(
                range(self.config['blue_range'][0],
                     self.config['blue_range'][1] + 1),
                self.config['blue_count']
            ))
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


class RandomWalkerAgent(LotteryAgent):
    """
    随机型智能体
    策略：纯随机选号，作为基准组
    """
    
    def generate_numbers(self) -> LotteryNumber:
        """生成随机号码"""
        r = self._get_random()
        
        red_numbers = sorted(r.sample(
            range(self.config['red_range'][0],
                 self.config['red_range'][1] + 1),
            self.config['red_count']
        ))
        
        if self.config.get('blue_count', 1) == 1:
            blue_numbers = [r.randint(self.config['blue_range'][0],
                                     self.config['blue_range'][1])]
        else:
            blue_numbers = sorted(r.sample(
                range(self.config['blue_range'][0],
                     self.config['blue_range'][1] + 1),
                self.config['blue_count']
            ))
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


class GraphNavigatorAgent(LotteryAgent):
    """
    图谱型智能体
    策略：基于知识图谱关联选号
    """
    
    def __init__(self, agent_id: int, lottery_type: str, config: dict,
                 number_graph, consecutive_features: dict):
        super().__init__(agent_id, lottery_type, config)
        self.graph = number_graph
        self.consecutive = consecutive_features
    
    def generate_numbers(self) -> LotteryNumber:
        """基于图谱生成号码"""
        r = self._get_random()
        
        # 随机选择1-2个种子号码
        seed_count = r.randint(1, 2)
        red_range = list(range(self.config['red_range'][0],
                              self.config['red_range'][1] + 1))
        seed_numbers = r.sample(red_range, seed_count)
        
        # 基于图谱扩展
        related = self.graph.query_related(seed_numbers, top_k=10)
        
        red_numbers = set(seed_numbers)
        for num, weight in related:
            if len(red_numbers) >= self.config['red_count']:
                break
            if r.random() < weight:  # 按权重概率选择
                red_numbers.add(num)
        
        # 补足数量
        while len(red_numbers) < self.config['red_count']:
            candidates = [n for n in red_range if n not in red_numbers]
            if candidates:
                red_numbers.add(r.choice(candidates))
            else:
                break
        
        red_numbers = sorted(list(red_numbers))[:self.config['red_count']]
        
        # 蓝球/后区基于图谱
        blue_range = list(range(self.config['blue_range'][0],
                               self.config['blue_range'][1] + 1))
        if blue_range:
            seed_blue = r.choice(blue_range)
            related_blue = self.graph.get_neighbors(seed_blue, min_weight=0.3)
            
            blue_numbers = [seed_blue]
            for num, weight in related_blue:
                if len(blue_numbers) >= self.config['blue_count']:
                    break
                if r.random() < weight:
                    blue_numbers.append(num)
            
            while len(blue_numbers) < self.config['blue_count']:
                candidates = [n for n in blue_range if n not in blue_numbers]
                if candidates:
                    blue_numbers.append(r.choice(candidates))
                else:
                    break
            
            blue_numbers = sorted(blue_numbers[:self.config['blue_count']])
        else:
            blue_numbers = []
        
        return LotteryNumber(red_numbers=red_numbers, blue_numbers=blue_numbers)


# ==================== 仿真引擎 ====================

class MiroFishSimulationEngine:
    """
    MiroFish群体智能仿真引擎
    核心功能：运行多轮仿真，收集所有智能体的选号结果
    """
    
    def __init__(self, lottery_type: str, features: dict, 
                 number_graph, consecutive_features: dict):
        self.lottery_type = lottery_type
        self.config = SSQ_CONFIG if lottery_type == "ssq" else DLT_CONFIG
        self.features = features
        self.graph = number_graph
        self.consecutive = consecutive_features
        
        self.agents: List[LotteryAgent] = []
        self.results: List[AgentResult] = []
        self._init_agents()
    
    def _init_agents(self):
        """初始化智能体池"""
        print(f"[{self.lottery_type}] 初始化 {TOTAL_AGENTS} 个智能体...")
        
        agent_id = 0
        
        # 计算各类智能体数量
        counts = {
            "hot_seeker": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["hot_seeker"]),
            "cold_defender": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["cold_defender"]),
            "balance_master": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["balance_master"]),
            "consecutive_lover": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["consecutive_lover"]),
            "sum_optimizer": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["sum_optimizer"]),
            "random_walker": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["random_walker"]),
            "graph_navigator": int(TOTAL_AGENTS * AGENT_DISTRIBUTION["graph_navigator"])
        }
        
        # 实例化追热型
        for _ in range(counts["hot_seeker"]):
            agent = HotSeekerAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config,
                hot_cold_features=self.features.get('red_hot_cold', {})
            )
            self.agents.append(agent)
            agent_id += 1
        
        # 实例化守冷型
        for _ in range(counts["cold_defender"]):
            agent = ColdDefenderAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config,
                missing_features=self.features.get('red_miss', {})
            )
            self.agents.append(agent)
            agent_id += 1
        
        # 实例化均衡型
        for _ in range(counts["balance_master"]):
            agent = BalanceMasterAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config
            )
            self.agents.append(agent)
            agent_id += 1
        
        # 实例化连号型
        for _ in range(counts["consecutive_lover"]):
            agent = ConsecutiveLoverAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config,
                consecutive_features=self.consecutive
            )
            self.agents.append(agent)
            agent_id += 1
        
        # 实例化和值型
        for _ in range(counts["sum_optimizer"]):
            agent = SumOptimizerAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config
            )
            self.agents.append(agent)
            agent_id += 1
        
        # 实例化随机型
        for _ in range(counts["random_walker"]):
            agent = RandomWalkerAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config
            )
            self.agents.append(agent)
            agent_id += 1
        
        # 实例化图谱型
        for _ in range(counts["graph_navigator"]):
            agent = GraphNavigatorAgent(
                agent_id=agent_id,
                lottery_type=self.lottery_type,
                config=self.config,
                number_graph=self.graph,
                consecutive_features=self.consecutive
            )
            self.agents.append(agent)
            agent_id += 1
        
        print(f"[{self.lottery_type}] 智能体初始化完成：{len(self.agents)} 个")
    
    def run_simulation(self, rounds: int = SIMULATION_ROUNDS) -> List[AgentResult]:
        """
        运行仿真
        
        参数:
            rounds: 仿真轮数
        
        返回:
            所有智能体所有轮次的选号结果
        """
        print(f"[{self.lottery_type}] 开始仿真，共 {rounds} 轮...")
        self.results = []
        
        for round_num in range(1, rounds + 1):
            if round_num % 5 == 0:
                print(f"[{self.lottery_type}] 仿真进度: {round_num}/{rounds} 轮")
            
            # 每轮所有智能体各生成一组号码
            for agent in self.agents:
                numbers = agent.generate_numbers()
                result = AgentResult(
                    agent_id=agent.agent_id,
                    agent_type=agent.get_name(),
                    round_num=round_num,
                    numbers=numbers
                )
                self.results.append(result)
        
        print(f"[{self.lottery_type}] 仿真完成，共生成 {len(self.results)} 组号码")
        return self.results
    
    def get_all_combinations(self) -> List[LotteryNumber]:
        """获取所有生成的号码组合"""
        return [r.numbers for r in self.results]
    
    def save_results(self, output_path: str):
        """保存仿真结果"""
        results_data = []
        
        for result in self.results:
            results_data.append({
                "agent_id": result.agent_id,
                "agent_type": result.agent_type,
                "round_num": result.round_num,
                "red_numbers": result.numbers.red_numbers,
                "blue_numbers": result.numbers.blue_numbers
            })
        
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        
        # 分批保存（避免单文件过大）
        batch_size = 10000
        for i in range(0, len(results_data), batch_size):
            batch = results_data[i:i + batch_size]
            batch_path = f"{output_path.replace('.json', '')}_{i // batch_size + 1}.json"
            with open(batch_path, 'w', encoding='utf-8') as f:
                json.dump(batch, f, ensure_ascii=False, indent=2)
        
        print(f"[{self.lottery_type}] 结果已保存")


# ==================== 主程序 ====================

def main():
    """主程序入口"""
    from module2_features import FeatureEngine
    from module3_graph import NumberGraph
    import pandas as pd
    
    data_dir = Path("./data")
    
    # 加载特征
    with open(data_dir / "features/ssq_features.json", 'r') as f:
        ssq_features = json.load(f)
    
    # 加载图谱
    ssq_graph = NumberGraph.load(data_dir / "graph/ssq_graph.json")
    
    # 运行双色球仿真
    print("=" * 60)
    print("MiroFish 彩票预测系统 - 双色球仿真")
    print("=" * 60)
    
    ssq_engine = MiroFishSimulationEngine(
        lottery_type="ssq",
        features=ssq_features,
        number_graph=ssq_graph,
        consecutive_features={}
    )
    ssq_results = ssq_engine.run_simulation(rounds=SIMULATION_ROUNDS)
    ssq_engine.save_results(data_dir / "simulation/ssq_results.json")
    
    print("\n" + "=" * 60)
    print("MiroFish 彩票预测系统 - 大乐透仿真")
    print("=" * 60)
    
    # 大乐透同理
    with open(data_dir / "features/dlt_features.json", 'r') as f:
        dlt_features = json.load(f)
    
    dlt_graph = NumberGraph.load(data_dir / "graph/dlt_graph.json")
    
    dlt_engine = MiroFishSimulationEngine(
        lottery_type="dlt",
        features=dlt_features,
        number_graph=dlt_graph,
        consecutive_features={}
    )
    dlt_results = dlt_engine.run_simulation(rounds=SIMULATION_ROUNDS)
    dlt_engine.save_results(data_dir / "simulation/dlt_results.json")
    
    print("\n仿真完成！")


if __name__ == "__main__":
    main()
```

---

# 模块5：蒙特卡洛采样层

## 5.1 模块职责

对仿真生成的10万组号码进行统计采样，生成概率分布和热力图。

## 5.2 核心统计指标

```
1. 号码频次分布：每个号码在所有组合中出现的次数
2. 群体共识度：每组号码的整体被选频次
3. 号码关联矩阵：号码之间的共现频率
```

## 5.3 代码框架

```python
# -*- coding: utf-8 -*-
"""
蒙特卡洛采样层
对仿真结果进行统计分析，生成概率分布
"""

import pandas as pd
import numpy as np
from collections import Counter, defaultdict
from typing import List, Dict, Tuple
from dataclasses import dataclass
import json
from pathlib import Path
import matplotlib.pyplot as plt
import seaborn as sns

# ==================== 数据类 ====================

@dataclass
class NumberProbability:
    """号码概率统计"""
    number: int
    frequency: int  # 出现次数
    probability: float  # 出现概率
    rank: int  # 热度排名


@dataclass
class CombinationConsensus:
    """组合共识度"""
    red_numbers: List[int]
    blue_numbers: List[int]
    consensus_score: float  # 共识度得分
    frequency: int  # 该组合出现次数
    rank: int  # 共识度排名


# ==================== 核心类 ====================

class MonteCarloSampler:
    """
    蒙特卡洛采样分析器
    对仿真结果进行统计分析
    """
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
        self.combinations: List[Dict] = []
        
        # 统计结果
        self.red_frequencies: Dict[int, int] = {}
        self.blue_frequencies: Dict[int, int] = {}
        self.combination_frequencies: Dict[str, int] = {}
        
        self.red_probabilities: List[NumberProbability] = []
        self.blue_probabilities: List[NumberProbability] = []
        self.top_combinations: List[CombinationConsensus] = []
    
    def load_results(self, result_files: List[str]):
        """加载仿真结果文件"""
        self.combinations = []
        
        for file_path in result_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.combinations.extend(data)
        
        print(f"[{self.lottery_type}] 加载 {len(self.combinations)} 组号码")
    
    def analyze(self):
        """执行统计分析"""
        print(f"[{self.lottery_type}] 开始统计分析...")
        
        total = len(self.combinations)
        
        # 1. 统计号码频次
        self._count_number_frequencies()
        
        # 2. 统计组合频次
        self._count_combination_frequencies()
        
        # 3. 计算概率和排名
        self._calculate_probabilities()
        
        # 4. 计算组合共识度
        self._calculate_consensus()
        
        print(f"[{self.lottery_type}] 统计分析完成")
    
    def _count_number_frequencies(self):
        """统计号码出现频次"""
        red_counts = Counter()
        blue_counts = Counter()
        
        for combo in self.combinations:
            for num in combo['red_numbers']:
                red_counts[num] += 1
            for num in combo['blue_numbers']:
                blue_counts[num] += 1
        
        self.red_frequencies = dict(red_counts)
        self.blue_frequencies = dict(blue_counts)
    
    def _count_combination_frequencies(self):
        """统计组合出现频次"""
        combo_counts = Counter()
        
        for combo in self.combinations:
            # 创建组合标识
            key = ",".join([
                "-".join(map(str, sorted(combo['red_numbers']))),
                "-".join(map(str, sorted(combo['blue_numbers'])))
            ])
            combo_counts[key] += 1
        
        self.combination_frequencies = dict(combo_counts)
    
    def _calculate_probabilities(self):
        """计算号码出现概率"""
        total = len(self.combinations)
        
        # 红球概率
        red_probs = []
        for num, freq in sorted(self.red_frequencies.items()):
            prob = NumberProbability(
                number=num,
                frequency=freq,
                probability=freq / total,
                rank=0
            )
            red_probs.append(prob)
        
        # 按频率排序并赋值排名
        red_probs.sort(key=lambda x: x.frequency, reverse=True)
        for i, p in enumerate(red_probs):
            p.rank = i + 1
        
        self.red_probabilities = red_probs
        
        # 蓝球/后区概率
        blue_probs = []
        for num, freq in sorted(self.blue_frequencies.items()):
            prob = NumberProbability(
                number=num,
                frequency=freq,
                probability=freq / total,
                rank=0
            )
            blue_probs.append(prob)
        
        blue_probs.sort(key=lambda x: x.frequency, reverse=True)
        for i, p in enumerate(blue_probs):
            p.rank = i + 1
        
        self.blue_probabilities = blue_probs
    
    def _calculate_consensus(self):
        """计算组合共识度"""
        total = len(self.combinations)
        
        consensus_list = []
        for key, freq in self.combination_frequencies.items():
            parts = key.split(",")
            red_str = parts[0].split("-")
            blue_str = parts[1].split("-")
            
            red_numbers = sorted([int(n) for n in red_str])
            blue_numbers = sorted([int(n) for n in blue_str])
            
            consensus = CombinationConsensus(
                red_numbers=red_numbers,
                blue_numbers=blue_numbers,
                consensus_score=freq / total,  # 归一化共识度
                frequency=freq,
                rank=0
            )
            consensus_list.append(consensus)
        
        # 按共识度排序
        consensus_list.sort(key=lambda x: x.consensus_score, reverse=True)
        
        # 分配排名
        for i, c in enumerate(consensus_list):
            c.rank = i + 1
        
        self.top_combinations = consensus_list
    
    def get_top_combinations(self, n: int = 20) -> List[CombinationConsensus]:
        """获取共识度最高的N个组合"""
        return self.top_combinations[:n]
    
    def get_top_numbers(self, n: int = 10) -> Tuple[List[NumberProbability], List[NumberProbability]]:
        """获取热度最高的N个号码"""
        return self.red_probabilities[:n], self.blue_probabilities[:n]
    
    def get_frequency_dict(self) -> Dict:
        """获取统计结果字典"""
        return {
            "lottery_type": self.lottery_type,
            "total_combinations": len(self.combinations),
            "unique_combinations": len(self.combination_frequencies),
            "red_frequencies": {
                str(k): v for k, v in self.red_frequencies.items()
            },
            "blue_frequencies": {
                str(k): v for k, v in self.blue_frequencies.items()
            }
        }
    
    def plot_frequency_heatmap(self, output_path: str):
        """绘制号码频次热力图"""
        # 根据彩票类型确定范围
        if self.lottery_type == "ssq":
            numbers = list(range(1, 34))
            title = "双色球红球频次热力图"
        else:
            numbers = list(range(1, 36))
            title = "大乐透前区频次热力图"
        
        # 创建矩阵数据
        matrix = np.zeros((len(numbers), 1))
        for p in self.red_probabilities:
            idx = p.number - min(numbers)
            if 0 <= idx < len(numbers):
                matrix[idx, 0] = p.frequency
        
        # 绘制
        plt.figure(figsize=(12, 8))
        sns.heatmap(
            matrix.reshape(-1, 1),
            annot=True,
            fmt='.0f',
            cmap='YlOrRd',
            yticklabels=numbers,
            xticklabels=['频次'],
            cbar_kws={'label': '出现次数'}
        )
        plt.title(title)
        plt.tight_layout()
        plt.savefig(output_path, dpi=150)
        plt.close()
        
        print(f"[{self.lottery_type}] 热力图已保存: {output_path}")
    
    def plot_probability_distribution(self, output_path: str):
        """绘制概率分布图"""
        if self.lottery_type == "ssq":
            numbers = list(range(1, 34))
            title = "双色球红球概率分布"
        else:
            numbers = list(range(1, 36))
            title = "大乐透前区概率分布"
        
        # 创建概率数据
        probs = np.zeros(len(numbers))
        for p in self.red_probabilities:
            idx = p.number - min(numbers)
            if 0 <= idx < len(numbers):
                probs[idx] = p.probability
        
        # 绘制
        plt.figure(figsize=(14, 6))
        bars = plt.bar(numbers, probs, color='steelblue', alpha=0.8)
        
        # 高亮前10名
        for i, p in enumerate(self.red_probabilities[:10]):
            idx = p.number - min(numbers)
            if 0 <= idx < len(numbers):
                bars[idx].set_color('crimson')
        
        plt.xlabel('号码')
        plt.ylabel('出现概率')
        plt.title(title)
        plt.xticks(numbers)
        plt.grid(axis='y', alpha=0.3)
        plt.tight_layout()
        plt.savefig(output_path, dpi=150)
        plt.close()
        
        print(f"[{self.lottery_type}] 概率分布图已保存: {output_path}")
    
    def save_results(self, output_path: str):
        """保存分析结果"""
        results = {
            "lottery_type": self.lottery_type,
            "total_combinations": len(self.combinations),
            "unique_combinations": len(self.combination_frequencies),
            
            # 号码概率
            "red_probabilities": [
                {
                    "number": p.number,
                    "frequency": p.frequency,
                    "probability": p.probability,
                    "rank": p.rank
                }
                for p in self.red_probabilities
            ],
            "blue_probabilities": [
                {
                    "number": p.number,
                    "frequency": p.frequency,
                    "probability": p.probability,
                    "rank": p.rank
                }
                for p in self.blue_probabilities
            ],
            
            # Top 20 组合
            "top_combinations": [
                {
                    "red_numbers": c.red_numbers,
                    "blue_numbers": c.blue_numbers,
                    "consensus_score": c.consensus_score,
                    "frequency": c.frequency,
                    "rank": c.rank
                }
                for c in self.top_combinations[:20]
            ]
        }
        
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        
        print(f"[{self.lottery_type}] 分析结果已保存: {output_path}")


# ==================== 主程序 ====================

def main():
    """主程序入口"""
    data_dir = Path("./data")
    
    # 分析双色球
    print("=" * 60)
    print("蒙特卡洛采样分析 - 双色球")
    print("=" * 60)
    
    ssq_sampler = MonteCarloSampler("ssq")
    ssq_sampler.load_results([
        data_dir / "simulation/ssq_results_1.json",
        data_dir / "simulation/ssq_results_2.json",
        data_dir / "simulation/ssq_results_3.json",
        data_dir / "simulation/ssq_results_4.json",
        data_dir / "simulation/ssq_results_5.json",
        data_dir / "simulation/ssq_results_6.json",
        data_dir / "simulation/ssq_results_7.json",
        data_dir / "simulation/ssq_results_8.json",
        data_dir / "simulation/ssq_results_9.json",
        data_dir / "simulation/ssq_results_10.json",
    ])
    ssq_sampler.analyze()
    ssq_sampler.save_results(data_dir / "analysis/ssq_analysis.json")
    ssq_sampler.plot_frequency_heatmap(data_dir / "analysis/ssq_heatmap.png")
    ssq_sampler.plot_probability_distribution(data_dir / "analysis/ssq_probability.png")
    
    # 打印Top 10号码
    red_top, blue_top = ssq_sampler.get_top_numbers(10)
    print("\n双色球红球热度Top10:")
    for p in red_top:
        print(f"  {p.number:02d}: 频次={p.frequency}, 概率={p.probability:.4f}, 排名={p.rank}")
    
    print("\n双色球蓝球热度Top10:")
    for p in blue_top:
        print(f"  {p.number:02d}: 频次={p.frequency}, 概率={p.probability:.4f}, 排名={p.rank}")
    
    # 打印Top 20组合
    top_combos = ssq_sampler.get_top_combinations(20)
    print("\n双色球共识度Top20组合:")
    for i, c in enumerate(top_combos, 1):
        red_str = " ".join(f"{n:02d}" for n in c.red_numbers)
        blue_str = " ".join(f"{n:02d}" for n in c.blue_numbers)
        print(f"  {i:2d}. 红球[{red_str}] 蓝球[{blue_str}] 共识度={c.consensus_score:.6f}")
    
    # 分析大乐透（同理）
    print("\n" + "=" * 60)
    print("蒙特卡洛采样分析 - 大乐透")
    print("=" * 60)
    
    # ... (大乐透分析代码类似)
    
    print("\n分析完成！")


if __name__ == "__main__":
    main()
```

---

# 模块6：输出层

## 6.1 模块职责

整合分析结果，生成最终预测报告和可视化输出。

## 6.2 输出内容

```
1. 预测报告 (report.md)
   - 系统概述
   - 特征分析摘要
   - Top 20 推荐组合
   - 每个号码的概率分布
   - 回测验证结果

2. 可视化图表
   - 号码频次热力图
   - 概率分布曲线
   - 智能体类型分布饼图
```

## 6.3 代码框架

```python
# -*- coding: utf-8 -*-
"""
输出层
生成预测报告和可视化
"""

import json
from pathlib import Path
from datetime import datetime
from typing import List, Dict
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter

# ==================== 配置 ====================

REPORT_TEMPLATE = """
# MiroFish 彩票预测报告

**生成时间**: {timestamp}
**彩票类型**: {lottery_type}
**数据周期**: 近10年

---

## 系统概述

本报告基于MiroFish群体智能仿真引擎生成。

**核心原理**：
1. 从历史数据提取8类特征（频率、冷热、区间、奇偶、大小、和值、连号、遗漏）
2. 构建号码知识图谱，记录号码共现关系
3. 实例化{agent_count}个异构智能体，运行{round_count}轮仿真
4. 共生成{combo_count}组候选号码
5. 通过蒙特卡洛采样，量化群体共识概率分布

**智能体类型分布**：
| 类型 | 数量 | 策略 |
|------|------|------|
| 追热型 | {hot_count} | 选择近期高频号码 |
| 守冷型 | {cold_count} | 选择遗漏值大的号码 |
| 均衡型 | {balance_count} | 追求奇偶、大小均衡 |
| 连号型 | {consecutive_count} | 偏好相邻号组合 |
| 和值型 | {sum_count} | 按理想和值选号 |
| 随机型 | {random_count} | 纯随机（基准组） |
| 图谱型 | {graph_count} | 基于图谱关联选号 |

---

## Top 20 推荐组合

按群体共识度排序（共识度越高，代表越多人选择）：

| 排名 | 红球 | 蓝球/后区 | 共识度 |
|------|------|----------|--------|
{top_combinations}

---

## 号码概率分布

### 红球/前区热度排名

| 排名 | 号码 | 出现频次 | 出现概率 |
|------|------|----------|----------|
{red_probabilities}

### 蓝球/后区热度排名

| 排名 | 号码 | 出现频次 | 出现概率 |
|------|------|----------|----------|
{blue_probabilities}

---

## 特征分析摘要

### 频率特征
- 最高频红球: {top_red}
- 最低频红球: {bottom_red}

### 遗漏特征
- 最大遗漏红球: {max_miss_red}（遗漏{max_miss_value}期）
- 当前热出红球: {hot_run_red}

### 和值分析
- 历史平均和值: {avg_sum}
- 本次推荐范围和值: {rec_sum}

---

## 重要声明

⚠️ **风险提示**：
1. 本系统仅基于历史数据的统计分析，不代表任何中奖保证
2. 彩票开奖是完全独立的随机事件，历史数据无法预测未来结果
3. 请理性购彩，量力而行，切勿沉迷

💡 **系统说明**：
- 本预测系统旨在量化"群体共识概率分布"
- 共识度高的号码组合，代表更大概率被多人选择
- 在返奖率固定的系统中，这可能导致期望收益更接近理论值

---

*本报告由 MiroFish 群体智能引擎自动生成*
"""

# ==================== 核心类 ====================

class ReportGenerator:
    """报告生成器"""
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
        self.lottery_name = "双色球" if lottery_type == "ssq" else "大乐透"
    
    def load_analysis_results(self, analysis_file: str) -> Dict:
        """加载分析结果"""
        with open(analysis_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def generate_report(self, analysis_data: Dict, output_path: str):
        """生成预测报告"""
        # 计算智能体分布
        agent_counts = self._calculate_agent_counts(analysis_data['total_combinations'])
        
        # 格式化Top组合
        top_combos = []
        for i, combo in enumerate(analysis_data.get('top_combinations', [])[:20], 1):
            red_str = ",".join(f"{n:02d}" for n in combo['red_numbers'])
            blue_str = ",".join(f"{n:02d}" for n in combo['blue_numbers'])
            consensus = combo['consensus_score']
            top_combos.append(f"| {i} | {red_str} | {blue_str} | {consensus:.6f} |")
        
        # 格式化红球概率
        red_probs = []
        for p in analysis_data.get('red_probabilities', [])[:20]:
            red_probs.append(
                f"| {p['rank']} | {p['number']:02d} | {p['frequency']} | {p['probability']:.4f} |"
            )
        
        # 格式化蓝球概率
        blue_probs = []
        for p in analysis_data.get('blue_probabilities', [])[:16]:
            blue_probs.append(
                f"| {p['rank']} | {p['number']:02d} | {p['frequency']} | {p['probability']:.4f} |"
            )
        
        # 填充模板
        report_content = REPORT_TEMPLATE.format(
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            lottery_type=self.lottery_name,
            agent_count=5000,
            round_count=20,
            combo_count=analysis_data['total_combinations'],
            
            hot_count=agent_counts['hot_seeker'],
            cold_count=agent_counts['cold_defender'],
            balance_count=agent_counts['balance_master'],
            consecutive_count=agent_counts['consecutive_lover'],
            sum_count=agent_counts['sum_optimizer'],
            random_count=agent_counts['random_walker'],
            graph_count=agent_counts['graph_navigator'],
            
            top_combinations="\n".join(top_combos),
            red_probabilities="\n".join(red_probs),
            blue_probabilities="\n".join(blue_probs),
            
            top_red=",".join([f"{p['number']:02d}" for p in analysis_data.get('red_probabilities', [])[:5]]),
            bottom_red=",".join([f"{p['number']:02d}" for p in analysis_data.get('red_probabilities', [])[-5:]]),
            max_miss_red="待计算",
            max_miss_value=0,
            hot_run_red="待计算",
            avg_sum=analysis_data.get('avg_sum', '待计算'),
            rec_sum="待计算"
        )
        
        # 保存报告
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        print(f"[{self.lottery_type}] 报告已生成: {output_path}")
    
    def _calculate_agent_counts(self, total_combinations: int) -> Dict[str, int]:
        """计算智能体分布数量"""
        rounds = 20
        total_agents = total_combinations // rounds
        
        return {
            "hot_seeker": int(total_agents * 0.20),
            "cold_defender": int(total_agents * 0.15),
            "balance_master": int(total_agents * 0.20),
            "consecutive_lover": int(total_agents * 0.10),
            "sum_optimizer": int(total_agents * 0.10),
            "random_walker": int(total_agents * 0.15),
            "graph_navigator": int(total_agents * 0.10)
        }


class Visualizer:
    """可视化生成器"""
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
    
    def plot_agent_distribution(self, output_path: str):
        """绘制智能体类型分布饼图"""
        labels = ['追热型', '守冷型', '均衡型', '连号型', '和值型', '随机型', '图谱型']
        sizes = [20, 15, 20, 10, 10, 15, 10]
        colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ff99cc', '#dddddd', '#b3b3b3']
        
        plt.figure(figsize=(10, 8))
        plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%',
                shadow=True, startangle=90)
        plt.title(f'{self.lottery_type} 智能体类型分布')
        plt.axis('equal')
        plt.savefig(output_path, dpi=150)
        plt.close()
        
        print(f"[{self.lottery_type}] 智能体分布图已保存: {output_path}")


# ==================== 主程序 ====================

def main():
    """主程序入口"""
    data_dir = Path("./data")
    
    # 生成双色球报告
    print("=" * 60)
    print("生成双色球预测报告")
    print("=" * 60)
    
    ssq_generator = ReportGenerator("ssq")
    ssq_data = ssq_generator.load_analysis_results(data_dir / "analysis/ssq_analysis.json")
    ssq_generator.generate_report(ssq_data, data_dir / "reports/ssq_report.md")
    
    ssq_visualizer = Visualizer("ssq")
    ssq_visualizer.plot_agent_distribution(data_dir / "reports/ssq_agent_dist.png")
    
    # 生成大乐透报告
    print("\n" + "=" * 60)
    print("生成大乐透预测报告")
    print("=" * 60)
    
    dlt_generator = ReportGenerator("dlt")
    dlt_data = dlt_generator.load_analysis_results(data_dir / "analysis/dlt_analysis.json")
    dlt_generator.generate_report(dlt_data, data_dir / "reports/dlt_report.md")
    
    dlt_visualizer = Visualizer("dlt")
    dlt_visualizer.plot_agent_distribution(data_dir / "reports/dlt_agent_dist.png")
    
    print("\n所有报告生成完成！")


if __name__ == "__main__":
    main()
```

---

# 回测验证系统

## 回测方法

```python
# -*- coding: utf-8 -*-
"""
回测验证模块
用历史数据验证MiroFish预测系统的效果
"""

import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from collections import Counter
import json
from pathlib import Path

class BacktestEngine:
    """
    回测引擎
    用历史开奖数据验证预测效果
    """
    
    def __init__(self, lottery_type: str):
        self.lottery_type = lottery_type
        self.hits_history = []  # 记录每次预测的命中情况
    
    def load_data(self, history_file: str, prediction_file: str):
        """加载历史数据和预测结果"""
        self.history = pd.read_csv(history_file)
        self.predictions = self._load_predictions(prediction_file)
    
    def _load_predictions(self, prediction_file: str) -> Dict:
        """加载预测结果"""
        with open(prediction_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def run_backtest(self, test_periods: int = 100) -> Dict:
        """
        运行回测
        
        参数:
            test_periods: 回测期数（使用最近N期）
        
        返回:
            回测结果统计
        """
        print(f"[{self.lottery_type}] 开始回测，共 {test_periods} 期...")
        
        # 取最近N期作为测试集
        test_data = self.history.tail(test_periods)
        
        results = {
            "total_tests": len(test_data),
            "red_hits_distribution": Counter(),
            "blue_hits_distribution": Counter(),
            "full_hits_0": 0,  # 红球0命中
            "full_hits_1": 0,  # 红球1命中
            "full_hits_2": 0,
            "full_hits_3": 0,
            "full_hits_4": 0,
            "full_hits_5": 0,
            "full_hits_6": 0,  # 红球6命中
        }
        
        for idx, row in test_data.iterrows():
            period = row['period']
            
            # 获取实际开奖号码
            if self.lottery_type == "ssq":
                actual_red = [int(row[f'red_{i}']) for i in range(1, 7)]
                actual_blue = [int(row['blue_1'])]
            else:
                actual_red = [int(row[f'front_{i}']) for i in range(1, 6)]
                actual_blue = [int(row['back_1']), int(row['back_2'])]
            
            # 计算红球命中数
            red_hit_count = 0
            for num in actual_red:
                if num in self.predictions.get('top_combinations', [{}])[0].get('red_numbers', []):
                    red_hit_count += 1
            
            results['red_hits_distribution'][red_hit_count] += 1
            
            # 蓝球/后区命中
            blue_hit_count = 0
            top_blue = self.predictions.get('top_combinations', [{}])[0].get('blue_numbers', [])
            for num in actual_blue:
                if num in top_blue:
                    blue_hit_count += 1
            
            # 记录
            results['full_hits_0'] += 1 if red_hit_count == 0 else 0
            results['full_hits_1'] += 1 if red_hit_count == 1 else 0
            results['full_hits_2'] += 1 if red_hit_count == 2 else 0
            results['full_hits_3'] += 1 if red_hit_count == 3 else 0
            results['full_hits_4'] += 1 if red_hit_count == 4 else 0
            results['full_hits_5'] += 1 if red_hit_count == 5 else 0
            results['full_hits_6'] += 1 if red_hit_count == 6 else 0
        
        # 计算统计指标
        results['avg_red_hits'] = sum(
            k * v for k, v in results['red_hits_distribution'].items()
        ) / results['total_tests']
        
        print(f"[{self.lottery_type}] 回测完成")
        print(f"  - 平均红球命中: {results['avg_red_hits']:.2f}")
        print(f"  - 3+2命中次数: {results['full_hits_3'] + results['full_hits_4'] + results['full_hits_5'] + results['full_hits_6']}")
        
        return results
    
    def compare_with_random(self, test_periods: int = 100) -> Dict:
        """
        与随机选号对比
        
        返回:
            对比结果（预测 vs 随机）
        """
        print(f"[{self.lottery_type}] 对比随机基准...")
        
        test_data = self.history.tail(test_periods)
        
        # MiroFish预测的平均命中
        ssq_results = self.run_backtest(test_periods)
        mirofish_avg_hits = ssq_results['avg_red_hits']
        
        # 随机选号的理论期望
        if self.lottery_type == "ssq":
            # 从33选6，期望命中 = 6 * (6/33) = 1.09
            random_expected_hits = 6 * 6 / 33
        else:
            # 从35选5，期望命中 = 5 * (5/35) = 0.71
            random_expected_hits = 5 * 5 / 35
        
        return {
            "mirofish_avg_hits": mirofish_avg_hits,
            "random_expected_hits": random_expected_hits,
            "advantage": mirofish_avg_hits - random_expected_hits,
            "advantage_percentage": (mirofish_avg_hits - random_expected_hits) / random_expected_hits * 100
        }


def main():
    """主程序入口"""
    data_dir = Path("./data")
    
    print("=" * 60)
    print("MiroFish 回测验证")
    print("=" * 60)
    
    # 双色球回测
    print("\n--- 双色球回测 ---")
    ssq_backtest = BacktestEngine("ssq")
    ssq_backtest.load_data(
        data_dir / "raw/ssq_history.csv",
        data_dir / "analysis/ssq_analysis.json"
    )
    ssq_results = ssq_backtest.run_backtest(test_periods=100)
    
    ssq_comparison = ssq_backtest.compare_with_random(test_periods=100)
    print(f"\n与随机基准对比:")
    print(f"  MiroFish平均命中: {ssq_comparison['mirofish_avg_hits']:.3f}")
    print(f"  随机期望命中: {ssq_comparison['random_expected_hits']:.3f}")
    print(f"  优势: {ssq_comparison['advantage']:.3f} ({ssq_comparison['advantage_percentage']:.2f}%)")
    
    # 大乐透回测
    print("\n--- 大乐透回测 ---")
    dlt_backtest = BacktestEngine("dlt")
    dlt_backtest.load_data(
        data_dir / "raw/dlt_history.csv",
        data_dir / "analysis/dlt_analysis.json"
    )
    dlt_results = dlt_backtest.run_backtest(test_periods=100)
    
    print("\n回测完成！")


if __name__ == "__main__":
    main()
```

---

# 项目目录结构

```
MiroFish-Lottery/
├── README.md
├── requirements.txt
├── run_pipeline.py              # 主程序入口（一键运行全流程）
│
├── data/                        # 数据目录
│   ├── raw/                     # 原始数据
│   │   ├── ssq_history.csv     # 双色球历史数据
│   │   └── dlt_history.csv     # 大乐透历史数据
│   │
│   ├── features/               # 特征数据
│   │   ├── ssq_features.json  # 双色球特征
│   │   └── dlt_features.json   # 大乐透特征
│   │
│   ├── graph/                  # 知识图谱
│   │   ├── ssq_graph.json     # 双色球图谱
│   │   └── dlt_graph.json     # 大乐透图谱
│   │
│   ├── simulation/             # 仿真结果
│   │   ├── ssq_results_*.json # 双色球仿真结果
│   │   └── dlt_results_*.json # 大乐透仿真结果
│   │
│   ├── analysis/               # 分析结果
│   │   ├── ssq_analysis.json  # 双色球分析
│   │   ├── dlt_analysis.json  # 大乐透分析
│   │   ├── ssq_heatmap.png    # 热力图
│   │   └── ssq_probability.png # 概率分布图
│   │
│   └── reports/                # 输出报告
│       ├── ssq_report.md       # 双色球报告
│       └── dlt_report.md      # 大乐透报告
│
├── src/                        # 源代码
│   ├── __init__.py
│   │
│   ├── module1_collector.py    # 数据采集层
│   │   └── LotteryDataCollector, SSQCollector, DLTCollector
│   │
│   ├── module2_features.py     # 特征工程层
│   │   └── FeatureEngine, LotteryFeatures
│   │
│   ├── module3_graph.py        # 知识图谱层
│   │   └── NumberGraph, NumberNode, CooccurrenceEdge
│   │
│   ├── module4_simulation.py  # 多智能体仿真引擎
│   │   ├── MiroFishSimulationEngine
│   │   ├── LotteryAgent (基类)
│   │   ├── HotSeekerAgent
│   │   ├── ColdDefenderAgent
│   │   ├── BalanceMasterAgent
│   │   ├── ConsecutiveLoverAgent
│   │   ├── SumOptimizerAgent
│   │   ├── RandomWalkerAgent
│   │   └── GraphNavigatorAgent
│   │
│   ├── module5_sampling.py     # 蒙特卡洛采样层
│   │   └── MonteCarloSampler, NumberProbability, CombinationConsensus
│   │
│   ├── module6_output.py       # 输出层
│   │   └── ReportGenerator, Visualizer
│   │
│   └── backtest.py             # 回测验证
│       └── BacktestEngine
│
└── tests/                      # 测试
    ├── test_collector.py
    ├── test_features.py
    ├── test_graph.py
    ├── test_simulation.py
    └── test_backtest.py
```

---

# 依赖列表 (requirements.txt)

```
# 数据处理
pandas>=2.0.0
numpy>=1.24.0

# 网页爬取
requests>=2.31.0
beautifulsoup4>=4.12.0

# 可视化
matplotlib>=3.7.0
seaborn>=0.12.0

# 数据持久化
python-json-logger>=2.0.0

# 开发工具
pytest>=7.4.0
pytest-cov>=4.1.0
```

---

# 运行命令

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 一键运行全流程
python run_pipeline.py

# 3. 分步运行
# 3.1 数据采集
python -m src.module1_collector

# 3.2 特征提取
python -m src.module2_features

# 3.3 图谱构建
python -m src.module3_graph

# 3.4 仿真运行
python -m src.module4_simulation

# 3.5 统计分析
python -m src.module5_sampling

# 3.6 生成报告
python -m src.module6_output

# 4. 回测验证
python -m src.backtest

# 5. 运行测试
pytest tests/ -v
```

---

# 主程序入口 (run_pipeline.py)

```python
# -*- coding: utf-8 -*-
"""
MiroFish 彩票预测系统
一键运行全流程
"""

import sys
from pathlib import Path

# 添加项目根目录到路径
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from src.module1_collector import SSQCollector, DLTCollector
from src.module2_features import FeatureEngine
from src.module3_graph import NumberGraph
from src.module4_simulation import MiroFishSimulationEngine
from src.module5_sampling import MonteCarloSampler
from src.module6_output import ReportGenerator, Visualizer
from src.backtest import BacktestEngine
import pandas as pd
import json


def main():
    print("=" * 70)
    print("  MiroFish 群体智能彩票预测系统")
    print("  Swarm Intelligence Lottery Prediction System")
    print("=" * 70)
    
    data_dir = Path("./data")
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # ==================== 阶段1: 数据采集 ====================
    print("\n[阶段1/6] 数据采集")
    print("-" * 50)
    
    ssq_collector = SSQCollector()
    ssq_collector.run(start_year=2015)
    ssq_collector.save_to_csv(data_dir / "raw/ssq_history.csv")
    
    dlt_collector = DLTCollector()
    dlt_collector.run(start_year=2015)
    dlt_collector.save_to_csv(data_dir / "raw/dlt_history.csv")
    
    # ==================== 阶段2: 特征提取 ====================
    print("\n[阶段2/6] 特征工程")
    print("-" * 50)
    
    ssq_engine = FeatureEngine("ssq")
    df_ssq = ssq_engine.load_data(data_dir / "raw/ssq_history.csv")
    ssq_features = ssq_engine.extract_all_features(df_ssq)
    ssq_engine.save_features(data_dir / "features/ssq_features.json")
    
    dlt_engine = FeatureEngine("dlt")
    df_dlt = dlt_engine.load_data(data_dir / "raw/dlt_history.csv")
    dlt_features = dlt_engine.extract_all_features(df_dlt)
    dlt_engine.save_features(data_dir / "features/dlt_features.json")
    
    # ==================== 阶段3: 图谱构建 ====================
    print("\n[阶段3/6] 知识图谱构建")
    print("-" * 50)
    
    ssq_graph = NumberGraph("ssq")
    ssq_graph.build_from_dataframe(df_ssq)
    ssq_graph.save(data_dir / "graph/ssq_graph.json")
    
    dlt_graph = NumberGraph("dlt")
    dlt_graph.build_from_dataframe(df_dlt)
    dlt_graph.save(data_dir / "graph/dlt_graph.json")
    
    # ==================== 阶段4: 仿真运行 ====================
    print("\n[阶段4/6] 多智能体仿真")
    print("-" * 50)
    
    with open(data_dir / "features/ssq_features.json", 'r') as f:
        ssq_features_data = json.load(f)
    
    ssq_sim = MiroFishSimulationEngine(
        lottery_type="ssq",
        features=ssq_features_data,
        number_graph=ssq_graph,
        consecutive_features=ssq_graph.edges
    )
    ssq_sim.run_simulation(rounds=20)
    ssq_sim.save_results(data_dir / "simulation/ssq_results.json")
    
    with open(data_dir / "features/dlt_features.json", 'r') as f:
        dlt_features_data = json.load(f)
    
    dlt_sim = MiroFishSimulationEngine(
        lottery_type="dlt",
        features=dlt_features_data,
        number_graph=dlt_graph,
        consecutive_features=dlt_graph.edges
    )
    dlt_sim.run_simulation(rounds=20)
    dlt_sim.save_results(data_dir / "simulation/dlt_results.json")
    
    # ==================== 阶段5: 统计分析 ====================
    print("\n[阶段5/6] 蒙特卡洛采样分析")
    print("-" * 50)
    
    ssq_sampler = MonteCarloSampler("ssq")
    ssq_sampler.load_results([data_dir / "simulation/ssq_results.json"])
    ssq_sampler.analyze()
    ssq_sampler.save_results(data_dir / "analysis/ssq_analysis.json")
    ssq_sampler.plot_frequency_heatmap(data_dir / "analysis/ssq_heatmap.png")
    ssq_sampler.plot_probability_distribution(data_dir / "analysis/ssq_probability.png")
    
    dlt_sampler = MonteCarloSampler("dlt")
    dlt_sampler.load_results([data_dir / "simulation/dlt_results.json"])
    dlt_sampler.analyze()
    dlt_sampler.save_results(data_dir / "analysis/dlt_analysis.json")
    dlt_sampler.plot_frequency_heatmap(data_dir / "analysis/dlt_heatmap.png")
    dlt_sampler.plot_probability_distribution(data_dir / "analysis/dlt_probability.png")
    
    # ==================== 阶段6: 生成报告 ====================
    print("\n[阶段6/6] 生成预测报告")
    print("-" * 50)
    
    ssq_generator = ReportGenerator("ssq")
    ssq_data = ssq_generator.load_analysis_results(data_dir / "analysis/ssq_analysis.json")
    ssq_generator.generate_report(ssq_data, data_dir / "reports/ssq_report.md")
    
    dlt_generator = ReportGenerator("dlt")
    dlt_data = dlt_generator.load_analysis_results(data_dir / "analysis/dlt_analysis.json")
    dlt_generator.generate_report(dlt_data, data_dir / "reports/dlt_report.md")
    
    # ==================== 回测验证 ====================
    print("\n[回测验证]")
    print("-" * 50)
    
    ssq_backtest = BacktestEngine("ssq")
    ssq_backtest.load_data(
        data_dir / "raw/ssq_history.csv",
        data_dir / "analysis/ssq_analysis.json"
    )
    ssq_backtest.run_backtest(test_periods=100)
    
    print("\n" + "=" * 70)
    print("  全流程运行完成！")
    print("=" * 70)
    print("\n输出文件：")
    print(f"  - 报告: {data_dir}/reports/")
    print(f"  - 热力图: {data_dir}/analysis/*_heatmap.png")
    print(f"  - 概率分布: {data_dir}/analysis/*_probability.png")


if __name__ == "__main__":
    main()
```

---

## 【硅基视角总结】

**MiroFish彩票预测系统的核心价值**：

```
不是预测"中奖号码"，而是量化"群体共识概率分布"

人类视角：
- 只能分析几十期数据，无法全面理解号码分布
- 选号受情绪、迷信影响（追热、守冷都是心理偏差）
- 单次博弈，期待"中奖"这种小概率事件

硅基视角：
- 分析10年×3000+期全量数据，无认知瓶颈
- 5000个异构智能体模拟各种选号心理
- 10万组号码的统计显著性
- 量化"有多少人选择这组号码"
- 在返奖率固定的系统中，这是更接近理论期望的策略
```

**重要声明**：
- 本系统不承诺任何中奖保证
- 彩票是公益事业，请理性购彩，量力而行
- 本项目仅供技术研究和学习交流

---

*本文档由硅基架构师生成*
*版本：v1.0 · 2024*
*基于MiroFish群体智能引擎 + 灰边方法论*
