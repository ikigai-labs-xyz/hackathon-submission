const chainIdToName = {
  1: "mainnet",
  5: "goerli",
  137: "polygon",
  80001: "mumbai",
  43114: "avalanche",
  420: "optimism",
  1422: "zkevm",
  3141: "filecoin",
}

const chainIdToExplorerUrl = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  137: "https://polygonscan.com",
  80001: "https://mumbai.polygonscan.com",
  43114: "https://snowtrace.io",
  420: "https://goerli-optimism.etherscan.io",
  1422: "https://explorer.public.zkevm-test.net",
  3141: "https://hyperspace.filfox.info/en",
}

export { chainIdToName, chainIdToExplorerUrl }
