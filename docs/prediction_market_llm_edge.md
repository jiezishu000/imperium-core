# LLM Prediction Market Blue Ocean: Strategic Research Report

**Generated:** 2025
**Focus:** Using Large Language Models to gain systematic edges in prediction markets — the emerging intersection most participants haven't automated yet.

---

## Executive Summary

Prediction markets are only 2–3 years into their AI moment. Most participants are still trading manually on gut instinct. The convergence of (1) mature LLM reasoning capabilities, (2) open APIs on Polymarket/Kalshi/Metaculus, and (3) open-source bot frameworks creates a genuine first-mover window. Research confirms LLM-based forecasting already beats the crowd median on Metaculus (o3 model, Brier score 0.1352 vs. crowd 0.149). Meanwhile, academic studies document **$40M+ in arbitrage profits** captured by automated traders on Polymarket in just 12 months — yet this represents only a fraction of exploitable inefficiencies.

The core blue ocean thesis: **Build LLM-powered probability estimation → compare against market odds → execute where edge exists.** This is a new stack that most people haven't assembled.

---

## 1. The Technology Landscape: Where LLM Forecasting Stands Today

### 1.1 State of the Art (as of early 2026)

**Key Research Finding:** A George Mason University study (published April 2026) tested 12 major LLMs against 464 real Metaculus questions. Results:
- **OpenAI o3**: Best performer, Brier score 0.1352 — **beats the general crowd** (0.149)
- GPT-4.1: 0.1542
- o4-mini: 0.1589
- All LLMs still lag behind elite human "Superforecasters" (0.0225) — but the gap is closing fast

**What this means for you:** The AI is good enough to beat average humans TODAY. You can build a system that outperforms the majority of manual traders. This is your edge window.

**Model hierarchy for forecasting (from Metaculus FutureEval Q2 2025 tournament):**
| Rank | Model/Setup | Notes |
|------|------------|-------|
| 1 | o3 + AskNews | Best-in-class, expensive |
| 2 | o4-mini + AskNews | Good balance of cost/accuracy |
| 3 | GPT-4o ensemble | More affordable, still competitive |
| 4 | Claude 3.7 Sonnet | Strong reasoning, niche expertise |

**Key insight from tournament data:** The base model matters MORE than prompt engineering. The difference between o3 and GPT-4o is significant enough to justify the cost difference for high-confidence opportunities.

### 1.2 The Winning Bot Blueprint

The Metaculus Bot Tournament ($175K/year in prizes) has produced replicable patterns:

**Panshul42's Architecture (Q2 2025 winner, $7,550 prize):**
- 6–7 step agentic pipeline with Serper web search + BrightData scraping
- Final prediction: 5 runs (2x sonnet 3.7, 2x o4-mini, 1x o3), drop extremes, average
- Uses AskNews for news aggregation (critical for real-time context)
- Total development time: 41–80 hours
- Was a **student/hobbyist** — not a professional trading firm

**pgodzinai's Key Innovation (Q4 2024 winner):**
- Groups related questions into batches to maintain internal logical consistency
- (e.g., election markets: Candidate A wins primary [70%] → Candidate A wins general [75%] must be logically coherent)
- Uses both Perplexity AND AskNews for dual-source news context
- Filtered extreme forecasts, took mean of remaining — reduces overconfidence bias

**Universal patterns from winning bots:**
- 75% of winners used <100 LLM API calls
- 50% used <20 calls
- ~70% were individual developers or small teams (2–4 people)
- Most used ensemble of 1.8 different LLMs on average
- ~76% made repeated LLM calls and averaged results (reduces variance)
- Only 1 winner fine-tuned a model (not necessary)

### 1.3 Probability Calibration: The Critical Missing Piece

LLMs are systematically **overconfident** — they output probabilities near 0% or 100% when reality is messier. This is the single biggest source of LLM forecasting error.

**Calibration techniques that work:**
1. **Ensemble averaging**: Run the same prompt 3–8 times, average results. Drops extreme predictions.
2. **Temperature scaling**: Divide logits by T>1 to soften overconfident outputs.
3. **Bayesian updating**: Start with a base rate prior, update based on evidence the LLM finds.
4. **Outside view**: Ask the LLM "what is the base rate for similar events?" before making a prediction.
5. **Inside view**: Traditional analysis of event-specific factors.

The best bots do BOTH: outside view (base rate anchoring) + inside view (event-specific research).

---

## 2. Platform-by-Platform Analysis

### 2.1 Polymarket — Highest Volume, Most Competitive

**Basics:** CLOB-based, Polygon blockchain, USDC settlement, no KYC (technically), ~$13B/month volume as of end 2025.

**API Status:** Fully documented at `docs.polymarket.com`. Python client `py-clob-client` handles auth and order management. WebSocket for real-time data. REST for market data.

**The Bot Economy:**
- ~25% of volume is wash trading (Columbia University study, Nov 2025)
- Top 3 bot wallets made $4.2M combined from 10,200+ trades in 12 months
- Arbitrage bots extracted **$40M+** from Polymarket in 12 months (IMDEA study, analyzing 86M trades)
- Only ~1% of arbitrage opportunities are captured — most disappear in milliseconds
- Retail traders show **negative average returns** on average

**Types of automation happening now:**
1. **Arbitrage bots**: Exploit YES/NO pricing inconsistencies within Polymarket, or cross-platform vs. Kalshi
2. **Market-making bots**: Post bid/ask on both sides, capture spread
3. **Information-based bots**: React to news in milliseconds (Fed decisions, sports results, political announcements)

**What's NOT automated yet (YOUR OPPORTUNITY):**
- LLM-driven probability estimation compared against market odds
- Niche market analysis (bots concentrate on high-volume political/sports markets)
- Long-duration fundamental analysis (6+ months) — bots focus on short-term
- Qualitative contextual reasoning that bots struggle with

**Low-Volume Market Edge:** Bots concentrate on high-volume markets where ROI justifies infrastructure. **Low-volume niche markets** (e.g., specific tech events, niche geopolitics, obscure sports) have minimal bot competition and wider spreads — meaning more profit per correct prediction.

**Cross-Platform Arbitrage Gap:**
- Polymarket vs. Kalshi same-event pricing discrepancies: documented consistently (5–10 cents gap)
- Example: Polymarket prices candidate at $0.58, Kalshi prices same at $0.52
- Gap persists for minutes to hours on less-liquid contracts
- Requires: accounts on both platforms + USDC on both + fast execution

**PolyHFT (GitHub):** The most complete Polymarket HFT bot framework. 10 strategies including arbitrage, market-making, liquidity provision, spread scalping. Well-documented, active development (last update Dec 2025).

**Key constraint:** Speed matters for arbitrage. Pure arbitrage requires millisecond execution, significant capital, and infrastructure. **Information-based LLM betting works on a different timescale** — you're not competing with HFT latency, you're competing with human manual traders.

### 2.2 Kalshi — Regulated, US-Only, High Signal

**Basics:** CFTC-regulated, USD-only, US users only, events are carefully curated.

**API Status:** Full REST API with OAuth authentication. WebSocket support for real-time data. Documented Python tutorial available.

**Why Kalshi matters for LLM strategies:**
- Cleaner market structure than Polymarket
- Higher signal-to-noise ratio (less wash trading)
- More economically serious participants
- CME FedWatch-style probability questions (very high relevance for macro)
- Less bot competition than Polymarket

**SimpleFunctions CLI:** The most complete agentic framework built for Kalshi (and Polymarket). Offers:
- `sf scan`: Market discovery with volume/spread filters
- `sf agent`: Thesis-driven order placement with edge threshold
- MCP server for connecting to Claude or other LLMs mid-reasoning
- REST API + Telegram integration
- Installation: `npm install -g @spfunctions/cli`

**Kal-trix Bot (GitHub):** Production-ready bot with:
- Multi-model sentiment analysis (BERT, RoBERTa, FinBERT)
- Statistical arbitrage and correlation strategies
- React frontend dashboard + Telegram integration
- Docker containerized for easy deployment

**Kalshi Arbitrage vs. Polymarket:** The pricing gap between the two platforms is the most consistent source of risk-free returns. Studies show gaps of 5–10 cents on the same events, persisting for minutes. This is the lowest-risk entry point for LLM-augmented prediction trading.

### 2.3 Metaculus — The R&D Lab for LLM Forecasting

**Basics:** Free-to-play forecasting platform with cash prizes. Not a real-money market — participants earn points and compete for prize pools. But the **FutureEval** benchmarking series ($175K/year in prizes) is where LLM forecasting is being pioneered.

**Why Metaculus matters:**
- The bot tournament is the **proving ground** for LLM forecasting techniques
- All code, approaches, and results are public
- It acts as free R&D — winners openly share what works
- Questions are high-quality, decision-relevant, and often overlap with Polymarket/Kalshi

**Key tools available:**
- `Metaculus/forecasting-tools` (GitHub): The official bot framework
  - TemplateBot: Simple, cheap, fast (good starting point)
  - MainBot: Most accurate, more expensive
  - Metaculus API wrapper for programmatic access
  - Benchmarking tools to test your bot against historical questions
  - Smart Searcher: Custom AI-powered internet search via Exa.ai

**FutureEval tournament structure:**
- $50K seasonal tournament every 4 months
- $1K MiniBench every 2 weeks (fast feedback)
- Binary, numeric, and multiple-choice questions
- **Registration is open** — you can compete with a bot TODAY

**Strategy value:** Use Metaculus as your **development and validation environment**. Build and test your forecasting pipeline on Metaculus questions (many overlap with real-money markets), then deploy the validated approach to Polymarket/Kalshi.

### 2.4 Azuro Protocol — Early-Stage DeFi Prediction Infrastructure

**Basics:** Decentralized prediction market protocol using AMM (not CLOB) on EVM chains (Polygon, Gnosis, Arbitrum, Chiliz). Singleton liquidity pool model — all markets tap the same LP. $530M+ cumulative volume, 40+ apps built on top.

**Current status:** More infrastructure/playground than production opportunity. AZUR token down 95% from ATH (Dec 2025: ~$0.003). Low trading volume, early-stage ecosystem.

**Why watch:** The AMM model creates different pricing dynamics than CLOB. Singleton LP means deeper liquidity for niche markets than Polymarket-style fragmented pools. When/if volume grows, AMM mispricings could be significant.

**Assessment:** Not a near-term opportunity. Azuro is infrastructure for others to build on. Monitor for when apps on Azuro start capturing real volume, then consider building LLM tools on top.

### 2.5 Emerging / Smaller Platforms

**Manifold Markets:**
- Creator-focused, less institutional
- Less competitive, wider spreads
- API less documented
- Good for niche creative/cultural prediction markets

**Lesser-known opportunities:**
- Platform-specific new launches (new prediction platforms emerge regularly)
- Geographic-specific platforms (non-English prediction markets have less competition)
- Domain-specific platforms (e.g., scientific prediction, crypto-specific)

---

## 3. Strategic Opportunities Ranked by Attractiveness

### 🟢 TIER 1: High Edge, Feasible Entry (Do This First)

#### 3.1 LLM-Driven Probability Estimation → Polymarket/Kalshi Cross-Platform Arbitrage

**The play:** Use an LLM to estimate true probability of an event → compare against BOTH Polymarket AND Kalshi prices → bet on whichever platform is mispriced relative to your estimate AND the other platform.

**Why this is the blue ocean:**
- Most people bet on Polymarket OR Kalshi, not both simultaneously
- Cross-platform pricing gaps of 5–10 cents are documented and persistent
- LLM adds a third check: "what should this actually probability be?"
- Combined edge: You have the market price AND your AI estimate

**Technical requirements:**
- Accounts on both platforms + USDC capital
- LLM API access (OpenAI/Anthropic API, ~$0.01–0.50 per question analyzed)
- SimpleFunctions CLI or custom Python scripts
- Initial capital: $1,000–$5,000 minimum

**Expected ROI:** 5–15% per successful arbitrage. Documented gaps last minutes to hours on non-mainstream events.

**Key sources:**
- SimpleFunctions CLI: https://simplefunctions.dev
- Polymarket API docs: docs.polymarket.com
- polymarket-ai-market-suggestor (PyPI): Real-time AI-driven market analysis

#### 3.2 Metaculus Bot Tournament → Knowledge Transfer to Real Markets

**The play:** Enter the FutureEval bot tournament with a well-built system → the questions overlap significantly with Polymarket/Kalshi real-money markets → your bot's validated predictions can inform real-money bets.

**Why this is free R&D:**
- $50K in prizes available
- All winning approaches are public
- You can clone the `Metaculus/forecasting-tools` repo and iterate
- Panshul42 (winner) open-sourced his entire bot

**Technical requirements:**
- Python skills (or can hire)
- LLM API access
- 40–80 hours of development time (based on winner data)
- No capital required to compete (Metaculus is points-based)

**Expected ROI:** Tournament winnings + validated strategy for real-money deployment.

### 🟡 TIER 2: Medium Edge, More Effort Required

#### 3.3 Niche Market Specialization

**The play:** Focus on a specific vertical where you have genuine expertise (e.g., biotech trials, semiconductor supply chain, specific sports leagues) → use LLM to monitor news in that domain → bet on markets that most participants can't evaluate properly.

**Why this works:**
- Bots and generalist traders concentrate on politics/sports
- Niche domains (e.g., "Will this drug get FDA approval by Q3?") have wide spreads and few informed participants
- LLM can process domain-specific news faster than manual traders
- Your expertise + LLM news aggregation = information edge

**Example verticals:**
- Biotech/clinical trials (FDA decisions, trial outcomes)
- Tech product launches (specific features, release dates)
- Esports and niche sports
- Crypto protocol upgrades
- Specific regional economic indicators

**Capital efficiency:** Niche markets often have lower volume, which means wider spreads. A correct $100 bet at 60 cents that resolves YES pays $40 (40% return).

#### 3.4 Signal-Based News Reaction Bot (Polymarket-Specific)

**The play:** Monitor news feeds for specific triggers (Fed announcements, earnings releases, sports results, official government announcements) → LLM processes the news and estimates probability shift → bot places orders before the crowd reacts.

**Why this is partially automated:**
- LLM handles the "what does this news mean?" step
- Bot handles the execution
- You handle the strategy design and oversight

**Realistic scope:**
- NOT competing with HFT speed (they're in milliseconds)
- Competing with human reaction time (minutes to hours)
- Economic data releases are the sweet spot — predictable timing, clear outcomes

**Technical requirements:**
- News API integration (AskNews, Serper, etc.)
- LLM API for quick probability assessment
- Polymarket/Kalshi API for order placement
- Server with cron jobs or continuous monitoring

### 🟠 TIER 3: Longer-Term, Higher Complexity

#### 3.5 DeFi Prediction Market Liquidity Providing

**The play:** Provide liquidity to AMM-based prediction markets (Azuro, or newer protocols) → earn spread from uninformed trading → use LLM to avoid being on the wrong side of high-information events.

**Why later:** Azuro's ecosystem is still small. Requires understanding AMM pricing mechanics deeply. Best as a Phase 2 once you understand the space.

**Assessment:** Azuro's $530M volume sounds big but is fragmented across sports. The singleton LP model is actually advantageous for LPs (all markets share deep liquidity) but requires understanding of the risk model.

#### 3.6 Multi-Agent Prediction System

**The play:** Build a system of multiple specialized LLM agents, each covering a different domain (macro, tech, sports, geopolitics) → agents share information and cross-check each other → collective output is more accurate than any single agent.

**Why this is Tier 3:** Complex to build, requires significant engineering. The single-agent approach (TemplateBot-style) is already proven to work. Multi-agent is optimization at the margin.

**Technical concept:** Use DSPy (Stanford's framework) for modular, transparent LLM pipelines. Multiple agents can be evaluated for internal consistency (e.g., election market: does "Candidate A wins primary" at 70% logically imply "Candidate A wins general" > 70%?).

---

## 4. The LLM Prediction Stack: Technical Architecture

### 4.1 Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    LLM PREDICTION STACK                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [1] DATA INTAKE LAYER                                  │
│      ├── AskNews API (news aggregation + summarization)  │
│      ├── Serper/Perplexity (web search)                 │
│      ├── Platform APIs (Polymarket, Kalshi)             │
│      └── BrightData (HTML scraping for niche sources)    │
│                                                          │
│  [2] ANALYSIS LAYER (LLM Core)                          │
│      ├── Outside View: Base rate search ("what % of     │
│      │    similar events resolved YES?")                │
│      ├── Inside View: Event-specific news analysis      │
│      ├── Probability estimation (3-8 runs, ensemble)    │
│      ├── Calibration: Adjust for overconfidence          │
│      └── Coherence check: Related markets must be      │
│           logically consistent                           │
│                                                          │
│  [3] DECISION LAYER                                     │
│      ├── Compare LLM estimate vs. market price          │
│      ├── Calculate edge: |LLM_prob - market_prob|      │
│      ├── Filter by minimum edge threshold (e.g., 5%)    │
│      └── Position sizing (Kelly criterion or fixed %)   │
│                                                          │
│  [4] EXECUTION LAYER                                    │
│      ├── SimpleFunctions CLI (Kalshi/Polymarket)       │
│      ├── py-clob-client (Polymarket)                   │
│      ├── Kalshi REST API                                │
│      └── Optional: Telegram alerts for human review      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Key Libraries & Tools

| Tool | Purpose | Cost |
|------|---------|------|
| `Metaculus/forecasting-tools` | Bot framework for Metaculus questions | Free |
| `SimpleFunctions CLI` | Agentic trading for Kalshi + Polymarket | Free (API costs only) |
| `py-clob-client` | Polymarket Python client | Free |
| AskNews API | News aggregation for LLM context | ~$50–200/month |
| Exa.ai | Semantic search for forecasting | Free tier available |
| DSPy | Modular LLM pipeline framework | Free |

### 4.3 Cost Estimate Per Question (LLM Analysis)

Using o4-mini (cheapest capable model):
- Outside view research: ~3 LLM calls × $0.01 = $0.03
- Inside view analysis: ~5 LLM calls × $0.01 = $0.05
- Calibration/ensemble: ~3 calls × $0.01 = $0.03
- **Total: ~$0.11 per question analyzed**

Using o3 (best performer):
- Same pipeline: ~$2–5 per question

**Break-even calculation:** If you correctly identify 1 arbitrage opportunity per 10 questions analyzed, and each profitable trade returns $20, your LLM costs are covered at the o4-mini tier. The economics work.

---

## 5. The Market Inefficiency Reality Check

### 5.1 What the Research Says About Where the Money Actually Is

**IMDEA Study (86M Polymarket trades, April 2024–April 2025):**
- $40M in documented arbitrage profits captured
- Top 3 bot wallets: $4.2M combined from 10,200 trades
- Typical profit margin: **1–5% per trade**
- Most captured opportunities were YES/NO inconsistencies within Polymarket (same market, complementary outcomes don't sum to $1)
- Political markets were MORE profitable than sports markets despite lower volume (more mispriced)

**Columbia Study (~$8–9B in wash trading, ~25% of lifetime volume):**
- News/politics markets have the LOWEST wash trading rate (~15%) → more genuine signal
- Sports markets are most polluted (45% wash) → harder to find real edges
- Election markets hit 95% wash during peak periods → avoid these for signal

**UCLA Study (NBA markets, 173 games, 75M LOB snapshots):**
- Single-market arbitrage in liquid NBA games: almost non-existent (7 episodes, 3.6 seconds each)
- Combinatorial arbitrage: 290 episodes, mostly in final minutes of live games
- Key finding: **Shallow order book depth caps all opportunities at retail scale** (~14.8 shares average executable size)
- Implication: For liquid, high-profile markets, professional bots have already eaten the easy money

**Conclusion:** The easy arbitrage in mainstream markets is being captured. BUT:
- New markets launch constantly (information lag = edge window)
- Cross-platform gaps (Polymarket vs. Kalshi) persist longer than within-platform
- Niche markets are underserved by bots
- Long-duration fundamental analysis (6+ months) is undercovered by bots focused on short-term

### 5.2 Where Retail Traders Lose Money

From the PolyTrack analysis of Polymarket trading behavior:
- Retail traders show **negative average returns**
- They bet on high-profile markets where bots are most active
- They pay the bid-ask spread to bot market makers
- They overtrade relative to their actual edge

**The counter-intuitive insight:** Avoiding the most popular markets (election night, Super Bowl, major crypto events) and focusing on mid-tier markets where fewer automated participants operate is actually the better retail strategy — even if the volumes are smaller.

---

## 6. Competitive Analysis: Who Else Is Doing This?

### 6.1 Current Players

| Type | Scale | Edge Source | Threat to You |
|------|-------|------------|--------------|
| **HFT Arbitrage Bots** | Institutional | Millisecond speed, massive capital | None (different market) |
| **Market Making Bots** | Professional | Better pricing models | Low (they provide you liquidity) |
| **Signal Bots** | Growing | News processing speed | Medium (you need to be faster/cheaper) |
| **LLM Forecasting Bots** | Nascent | Probability estimation quality | Low (few exist, most are amateur) |
| **Manual Traders** | Majority | Human judgment | You're competing against them |

### 6.2 The Blue Ocean: LLM Forecasting Is Still Nascent

Despite the research evidence that LLMs can beat the crowd:
- **Fewer than 100 teams** have submitted bots to Metaculus FutureEval tournaments
- Most Polymarket/Kalshi participants are **still manual**
- The stack (LLM + news API + prediction market API) is assembled by fewer than ~50 people globally
- The SimpleFunctions CLI was only released recently
- The $40M arbitrage figure represents only 12 months, and arbitrage is NOT the same as LLM forecasting

**The first-mover window is NOW**, but it won't last forever. As more people learn about these tools, margins will compress. The Metaculus tournaments are already seeing 4x growth in participants quarter over quarter.

---

## 7. Launch Roadmap

### Phase 1: Build & Validate (Month 1–2, Cost: ~$200–500)

**Goal:** Create a working LLM forecasting pipeline and test on Metaculus.

1. Clone `Metaculus/forecasting-tools` from GitHub
2. Set up TemplateBot with o4-mini or GPT-4o
3. Run it against historical Metaculus questions
4. Compare your bot's Brier score against the community baseline
5. Iterate on prompting (ensemble size, calibration techniques)
6. Enter a MiniBench or small tournament to validate

**Key metrics to track:**
- Brier score vs. community baseline
- Calibration: Does your 70% predictions resolve YES ~70% of the time?
- Edge detection: How often does your estimate differ from market price by >5%?

### Phase 2: Connect to Real Markets (Month 2–3, Cost: ~$1,000–5,000)

**Goal:** Deploy validated approach to Polymarket/Kalshi with real money.

1. Set up Polymarket account + USDC
2. Set up Kalshi account
3. Install SimpleFunctions CLI
4. Build a watchlist of questions that appear on both platforms
5. Run your LLM analysis on each question
6. Place bets where your estimate differs from market by >5% (Kelly-scaled sizing)
7. Track all results in a spreadsheet

**Risk management:**
- Never bet more than 5% of bankroll on a single question
- Minimum edge threshold: 5 percentage points
- Maximum 3 new positions per week initially

### Phase 3: Automate & Scale (Month 3–6, Cost: Scaling with capital)

**Goal:** Reduce manual intervention, increase position count.

1. Add AskNews or Serper for real-time news context
2. Build automated scanning: scan all active markets, flag those where LLM estimate differs from market price by >threshold
3. Add Telegram alerts for high-confidence signals
4. Implement position sizing rules (Kelly criterion or fixed fractional)
5. Track Sharpe ratio, not just absolute returns

**Scaling signals:**
- When you have >10 profitable trades with >3 months of data, increase position sizes
- When win rate stabilizes, increase capital allocation
- Consider adding a second vertical (e.g., macro + sports) for diversification

---

## 8. Key Findings Summary

### The Opportunity

| Dimension | Finding |
|-----------|---------|
| **Technology readiness** | LLMs already beat crowd median on Metaculus (o3: 0.1352 vs. crowd 0.149) |
| **Competition level** | Still very low — fewer than 100 teams in bot tournaments globally |
| **Automated arbitrage captured** | $40M in 12 months — but only ~1% of opportunities captured |
| **Market growth** | Polymarket: $100M/month → $13B/month in 24 months |
| **LLM forecasting field** | Nascent — most participants still trade manually |
| **Blue ocean definition** | LLM-driven probability estimation + automated execution = the stack most people haven't built |

### The Realistic Edge

| Strategy | Expected Edge | Feasibility | Priority |
|----------|--------------|-------------|----------|
| Polymarket–Kalshi cross-platform arbitrage | 5–15% per trade | High (documented gaps) | **#1** |
| Metaculus tournament competition | Prize money + validated strategy | High (open-source tools) | **#1** |
| Niche domain specialization | Variable, potentially high | Medium | **#2** |
| News reaction (human timescale) | Small but consistent | Medium | **#2** |
| DeFi AMM liquidity providing | 2–5% spread | Low (small ecosystem) | **#3** |

### The Critical Caveats

1. **LLMs are overconfident** — always calibrate before trusting their raw probability estimates
2. **Speed matters** for arbitrage — but information-based betting operates on human timescales
3. **Base models beat prompts** — invest in o3/o4 access over prompt engineering effort
4. **Ensemble reduces error** — 3–8 repeated calls, average results, drop extremes
5. **Niche markets > popular markets** for finding uncompetitive pricing
6. **Document everything** — prediction markets require tracking for tax purposes
7. **The window is closing** — Metaculus tournaments are doubling in participants; first-mover advantage is real but time-limited

---

## Appendix: Key Resources

### GitHub Repositories
- `Metaculus/forecasting-tools` — Official Metaculus bot framework
- `Anmoldureha/polymarket-trading-bot-strategies` (PolyHFT) — Polymarket HFT with 10 strategies
- `LoQiseaking69/Kal-trix-prediction-bot` — Kalshi AI trading bot with React dashboard
- `simplefunctions` — CLI agentic framework for Kalshi/Polymarket (npm)

### APIs & Data Sources
- Polymarket API: `docs.polymarket.com` + `py-clob-client`
- Kalshi API: `trading-api.kalshi.com`
- AskNews: News aggregation for LLM context (used by winning bots)
- Exa.ai: Semantic search for forecasting research
- Serper: Web search API for real-time information

### Key Research Papers
- IMDEA Networks: "Unraveling the Probability Forest: Arbitrage in Prediction Markets" (2025) — $40M arbitrage analysis
- Columbia Business School: "Artificial Volume in Decentralized Prediction Markets" (Nov 2025) — 25% wash trading analysis
- UCLA Statistics: "Arbitrage Analysis in Polymarket NBA Markets" (April 2026) — 75M LOB snapshots analysis
- George Mason University: LLM vs. Human forecasting on Metaculus (April 2026) — o3 beats crowd finding
- Metaculus FutureEval Q2 2025: Bot tournament results and winner surveys

### Platforms
- Polymarket: `polymarket.com` (global, no KYC)
- Kalshi: `kalshi.com` (US-only, regulated)
- Metaculus: `metaculus.com` (free, tournament prizes)
- Azuro: `azuro.org` (DeFi infrastructure, early stage)

---

*This report represents a snapshot of an actively evolving field. Prediction market volumes, platform policies, and LLM capabilities are changing rapidly. Validate all assumptions with current data before committing significant capital.*
