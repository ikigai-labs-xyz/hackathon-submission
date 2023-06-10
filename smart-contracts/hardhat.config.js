require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("solidity-coverage")
require("hardhat-deploy")
require("@primitivefi/hardhat-dodoc")

const GOERLI_RPC_URL = process.env.RPC_URL !== undefined ? process.env.RPC_URL : ""
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY !== undefined ? process.env.MUMBAI_PRIVATE_KEY : ""

const MUMBAI_RPC_URL =
  process.env.RPC_URL !== undefined ? process.env.RPC_URL.replace("network", "polygon-mumbai") : ""
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY !== undefined ? process.env.MUMBAI_PRIVATE_KEY : ""
const POLYGON_RPC_URL =
  process.env.RPC_URL !== undefined ? process.env.RPC_URL.replace("network", "polygon-mainnet") : ""
const POLYGON_PRIVATE_KEY =
  process.env.POLYGON_PRIVATE_KEY !== undefined ? process.env.POLYGON_PRIVATE_KEY : ""
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
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      saveDeployments: true,
      chainId: 5,
      blockConfirmations: 1,
    },
    mumbai: {
      chainId: 80001,
      blockConfirmations: 6,
      url: MUMBAI_RPC_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
    polygon: {
      chainId: 137,
      blockConfirmations: 6,
      url: POLYGON_RPC_URL,
      accounts: [POLYGON_PRIVATE_KEY],
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
