/**
 * Verify both contracts on Polygonscan
 * 
 * Usage:
 *   npx hardhat run scripts/verify.js --network polygon
 *   npx hardhat run scripts/verify.js --network amoy
 */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Read latest deployment
  const deploymentsDir = "./deployments";
  const files = fs.readdirSync(deploymentsDir).filter(f => f.startsWith(hre.network.name)).sort();
  if (files.length === 0) {
    console.error("No deployment found for", hre.network.name);
    process.exit(1);
  }
  const latest = JSON.parse(fs.readFileSync(path.join(deploymentsDir, files[files.length - 1]), "utf8"));

  console.log("Verifying on", hre.network.name, "...\n");

  // Verify Token
  console.log("--- Verifying Token ---");
  try {
    await hre.run("verify:verify", {
      address: latest.tokens.Token.address,
      constructorArguments: [latest.deployer]
    });
    console.log("Token verified!\n");
  } catch (e) {
    console.log("Token verify error:", e.message, "\n");
  }

  // Verify Xiami
  console.log("--- Verifying Xiami ---");
  try {
    await hre.run("verify:verify", {
      address: latest.tokens.Xiami.address,
      constructorArguments: [latest.deployer]
    });
    console.log("Xiami verified!\n");
  } catch (e) {
    console.log("Xiami verify error:", e.message, "\n");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => { console.error(error); process.exit(1); });
