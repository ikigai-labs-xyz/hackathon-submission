const chainIdToName = {
  1: "mainnet",
  5: "goerli",
  137: "polygon",
  80001: "mumbai",
  43114: "avalanche",
  420: "optimism",
  1422: "zkevm",
  3141: "filecoin",
  100: "gnosis",

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
  100: "https://rpc.gateway.pokt.network/",
}

const chainIdToAdresses = {

  11155111: {AuditorNFT:'0x5D7e8eBfa2716B4752f609A16933b464a4ffa449',
             SmartContractNFT:'0xA3B1Ed01730fbeFB4ae0b33456Ae59C8192ac5CB'},

  10200: {AuditorNFT:'0xC4306e51954c8a266299b68d95915797582E833F',
            SmartContractNFT:'0x2A7f14c77Fd1f8E4B1a68F833f8D614a86f5538D'},
  
167005: {AuditorNFT:'0xC4306e51954c8a266299b68d95915797582E833F',
        SmartContractNFT:'0x2A7f14c77Fd1f8E4B1a68F833f8D614a86f5538D'},

        420: {AuditorNFT:'0xC4306e51954c8a266299b68d95915797582E833F',
        SmartContractNFT:'0x2A7f14c77Fd1f8E4B1a68F833f8D614a86f5538D'},

        535453: {AuditorNFT:'0xC4306e51954c8a266299b68d95915797582E833F',
        SmartContractNFT:'0x2A7f14c77Fd1f8E4B1a68F833f8D614a86f5538D'},
}

export { chainIdToName, chainIdToExplorerUrl, chainIdToAdresses }
