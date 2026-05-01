/**
 * Deploy both Token and XiamiToken to Polygon
 * 
 * Usage:
 *   npx hardhat run scripts/deploy.js --network polygon
 *   npx hardhat run scripts/deploy.js --network amoy
 */

const hre = require("hardhat");

async function main() {
  console.log("===========================================================");
  console.log("  Empire Tokens Deployment - Polygon");
  console.log("  Network:", hre.network.name, "(ChainID:", hre.network.config.chainId, ")");
  console.log("===========================================================\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "POL\n");

  // ==================== Deploy Token ====================
  console.log("--- Deploying Token (Token) ---");
  const TokenFactory = await hre.ethers.getContractFactory("TokenCoin");
  const token = await TokenFactory.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddr = await token.getAddress();
  console.log("Token deployed:", tokenAddr);

  const tName = await token.name();
  const tSymbol = await token.symbol();
  const tSupply = await token.totalSupply();
  const tMax = await token.MAX_SUPPLY();
  console.log("  Name:", tName);
  console.log("  Symbol:", tSymbol);
  console.log("  Total Supply:", hre.ethers.formatUnits(tSupply, 18));
  console.log("  Max Supply:", hre.ethers.formatUnits(tMax, 18));
  console.log("  Explorer:", getExplorerLink(tokenAddr, hre.network.name));
  console.log("");

  // ==================== Deploy Xiami ====================
  console.log("--- Deploying Xiami (XIAMI) ---");
  const XiamiFactory = await hre.ethers.getContractFactory("XiamiToken");
  const xiami = await XiamiFactory.deploy(deployer.address);
  await xiami.waitForDeployment();
  const xiamiAddr = await xiami.getAddress();
  console.log("Xiami deployed:", xiamiAddr);

  const xName = await xiami.name();
  const xSymbol = await xiami.symbol();
  const xSupply = await xiami.totalSupply();
  console.log("  Name:", xName);
  console.log("  Symbol:", xSymbol);
  console.log("  Total Supply:", hre.ethers.formatUnits(xSupply, 18));
  console.log("  Explorer:", getExplorerLink(xiamiAddr, hre.network.name));
  console.log("");

  // ==================== Save deployment info ====================
  const fs = require("fs");
  const deploymentsDir = "./deployments";
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const info = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    tokens: {
      Token: {
        address: tokenAddr,
        name: tName,
        symbol: tSymbol,
        totalSupply: tSupply.toString(),
        maxSupply: tMax.toString()
      },
      Xiami: {
        address: xiamiAddr,
        name: xName,
        symbol: xSymbol,
        totalSupply: xSupply.toString()
      }
    }
  };

  const fileName = `${hre.network.name}_${Date.now()}.json`;
  fs.writeFileSync(`${deploymentsDir}/${fileName}`, JSON.stringify(info, null, 2));
  console.log("Deployment saved: deployments/" + fileName);

  console.log("\n===========================================================");
  console.log("  Both tokens deployed successfully!");
  console.log("===========================================================");
  console.log("\nNext steps:");
  console.log("1. Verify: npx hardhat run scripts/verify.js --network " + hre.network.name);
  console.log("2. Add to MetaMask:");
  console.log("   Token  ->", tokenAddr);
  console.log("   Xiami  ->", xiamiAddr);
}

function getExplorerLink(address, network) {
  const explorers = {
    polygon: "https://polygonscan.com",
    amoy: "https://amoy.polygonscan.com",
    mumbai: "https://mumbai.polygonscan.com"
  };
  return `${explorers[network] || explorers.polygon}/address/${address}`;
}

main()
  .then(() => process.exit(0))
  .catch((error) => { console.error("Deploy failed:", error); process.exit(1); });
