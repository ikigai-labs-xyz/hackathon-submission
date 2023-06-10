require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("solidity-coverage")
require("hardhat-deploy")
require("@primitivefi/hardhat-dodoc")

const SEPOLIA_RPC_URL =
  process.env.RPC_URL !== undefined ? process.env.RPC_URL.replace("network", "sepolia") : ""
const SEPOLIA_PRIVATE_KEY =
  process.env.SEPOLIA_PRIVATE_KEY !== undefined ? process.env.SEPOLIA_PRIVATE_KEY : ""

const EXPLORER_API_KEY = process.env.EXPLORER_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const REPORT_GAS = process.env.REPORT_GAS

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    localhost: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      saveDeployments: true,
      chainId: 11155111,
      blockConfirmations: 1,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user1: {
      default: 1,
    },
    user2: {
      default: 2,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "MATIC",
    excludeContracts: [],
  },
  etherscan: {
    apiKey: EXPLORER_API_KEY,
  },
  dodoc: {
    runOnCompile: false,
    exclude: [],
  },
  mocha: {
    timeout: 300000,
  },
}
