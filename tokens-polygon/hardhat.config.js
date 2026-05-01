require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const POLYGON_RPC = process.env.POLYGON_RPC_URL || "https://polygon-rpc.com";
const AMOY_RPC = process.env.AMOY_RPC_URL || "https://rpc-amoy.polygon.technology";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    polygon: {
      url: POLYGON_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 137,
      timeout: 120000
    },
    amoy: {
      url: AMOY_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
      timeout: 120000
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || ""
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
