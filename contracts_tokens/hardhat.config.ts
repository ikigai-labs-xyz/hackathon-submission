import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"

const INFURA_API_KEY = process.env.INFURA_API_KEY
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY

if (!INFURA_API_KEY || !SEPOLIA_PRIVATE_KEY) {
  throw new Error("Please set INFURA_API_KEY and SEPOLIA_PRIVATE_KEY in .env")
}

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
      // gasPrice: 45000000000,
    },
  },
}

export default config
