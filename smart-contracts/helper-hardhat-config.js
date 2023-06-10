const { ethers } = require("hardhat")

const constants = {
  developmentChains: ["hardhat", "localhost"],
  testNetChains: ["sepolia"],
  NULL_ADDRESS: ethers.constants.AddressZero,
}

const scriptsConfig = {}

const contractsConfig = {
  SBT: {
    name: "SBT",
    args: ["SBT", "SoulBoundToken"],
  },
  AuditorNFT: {
    name: "AuditorNFT",
    args: ["AuditorNFT", "AuditorNFT"],
  },
  SmartContractNFT: {
    name: "SmartContractNFT",
    args: ["SmartContractNFT", "SmartContractNFT"],
  },
  SecuredDex: {
    name: "SecuredDex",
    args: [],
  },
  BadERC20: {
    name: "BadERC20",
    args: [],
  },
  GoodERC20_1: {
    name: "GoodERC20_1",
    args: [],
  },
  GoodERC20_2: {
    name: "GoodERC20_2",
    args: [],
  },
}
const networkConfig = {
  11155111: {
    name: "sepolia",
    contracts: contractsConfig,
  },
  420: {
    name: "optimism",
    contracts: contractsConfig,
  },
  10200: {
    name: "gnosis",
    contracts: contractsConfig,
  },
  167005: {
    name: "taiko",
    contracts: contractsConfig,
  },
  534353: {
    name: "scroll",
    contracts: contractsConfig,
  },
  31337: {
    name: "hardhat",
    contracts: contractsConfig,
    forTests: [contractsConfig.SBT],
  },
}

module.exports = {
  constants,
  scriptsConfig,
  networkConfig,
}
