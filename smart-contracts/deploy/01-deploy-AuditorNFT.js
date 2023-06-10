const { networkConfig, constants } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/deployment/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  const isDevelopmentChain = constants.developmentChains.includes(network.name)

  const waitBlockConfirmations = isDevelopmentChain ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS
  const contractConfig = networkConfig[chainId].contracts.AuditorNFT
  const contractName = contractConfig.name

  log(`Deploying ${contractName}`)
  const args = contractConfig.args
  const deployedContract = await deploy(contractName, {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })
  log(`${contractName} (${deployedContract.address}) deployed)`)

  if (!isDevelopmentChain && process.env.EXPLORER_API_KEY) {
    await verify(deployedContract.address, constructorArguments, network.name)
  }

  log("------------------------------")
}

module.exports.tags = ["all", "AuditorNFT"]
