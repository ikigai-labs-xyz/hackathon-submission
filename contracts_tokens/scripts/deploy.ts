import { ethers } from "hardhat"

async function main() {
  const initialSupply = 1000

  const coins = [
    { initialSupply, name: "USDC", symbol: "USDC" },
    { initialSupply, name: "Good Coin", symbol: "GCOIN" },
    { initialSupply, name: "Bad Coin", symbol: "BCOIN" },
  ]

  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log(
    `Account balance before deployment: ${ethers.formatEther(balance)} ETH`
  )

  const Coin = await ethers.getContractFactory("Coin")

  const coin0 = await Coin.deploy(
    coins[0].initialSupply,
    coins[0].name,
    coins[0].symbol
  )
  await coin0.waitForDeployment()
  console.log(
    `${await coin0.name()}, ${await coin0.symbol()} deployed to ${coin0.target}`
  )

  const coin1 = await Coin.deploy(
    coins[1].initialSupply,
    coins[1].name,
    coins[1].symbol
  )
  await coin1.waitForDeployment()
  console.log(
    `${await coin1.name()}, ${await coin1.symbol()} deployed to ${coin1.target}`
  )

  const coin2 = await Coin.deploy(
    coins[2].initialSupply,
    coins[2].name,
    coins[2].symbol
  )
  await coin2.waitForDeployment()
  console.log(
    `${await coin2.name()}, ${await coin2.symbol()} deployed to ${coin2.target}`
  )

  console.log(
    `Account balance after deployment: ${ethers.formatEther(balance)} ETH`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
