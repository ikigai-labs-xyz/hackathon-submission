const { networkConfig, constants } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/deployment/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  const isDevelopmentChain = constants.developmentChains.includes(network.name)

  const contractConfig = networkConfig[chainId].contracts.GoodERC20_2
  const contractName = contractConfig.name

  log(`Deploying ${contractName}`)
  const constructorArguments = []
  const deployedContract = await deploy(contractName, {
    from: deployer,
    args: constructorArguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  log(`${contractName} (${deployedContract.address}) deployed)`)

  if (!isDevelopmentChain && process.env.EXPLORER_API_KEY) {
    await verify(deployedContract.address, constructorArguments, network.name)
  }

  log("------------------------------")
}

module.exports.tags = ["all", "SecuredDex"]
