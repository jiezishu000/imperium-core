# Empire Tokens - Polygon Deployment

Two ERC-20 tokens for the Empire ecosystem on Polygon PoS.

## Token Overview

| | Token | Xiami |
|---|---|---|
| **Name** | Token | 虾米 |
| **Symbol** | Token | XIAMI |
| **Decimals** | 18 | 18 |
| **Supply** | 1亿万亿 (10^20) | 1亿万亿 (10^20) |
| **Max Supply** | 10亿万亿 (10^21) | Fixed, no mint |
| **Burn Tax** | 1% per transfer | 1% per transfer |
| **Mint** | Yearly halving | None |
| **Role** | Base currency | Reward / airdrop |

## Quick Start

```bash
# 1. Install
npm install

# 2. Configure .env
cp .env.example .env
# Fill in PRIVATE_KEY, POLYGONSCAN_API_KEY

# 3. Test (Amoy testnet first)
npx hardhat run scripts/deploy.js --network amoy

# 4. Mainnet
npx hardhat run scripts/deploy.js --network polygon

# 5. Verify
npx hardhat run scripts/verify.js --network polygon
```

## Gas Estimate

Deploying both contracts on Polygon mainnet:
- ~0.01-0.03 POL per contract
- Total: ~0.02-0.06 POL (~$0.02-0.06)

## Token Economics

### Token (Base Currency)
- Initial: 1万万亿
- Max: 10万万亿
- Yearly mint halves: Y0=10^14, Y1=5×10^13, Y2=2.5×10^13...
- 1% burn tax on every transfer → deflationary pressure
- Owner can pause/unpause

### Xiami (Reward Token)
- Fixed supply: 1亿万亿
- No mint function → pure deflation
- 1% burn tax → supply keeps shrinking
- Airdrop: 1000万 per recruit = 1000万 recruits possible
