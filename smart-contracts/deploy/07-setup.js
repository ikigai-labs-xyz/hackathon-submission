const { networkConfig, constants } = require("../helper-hardhat-config")
const { network, ethers } = require("hardhat")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  const contracts = networkConfig[chainId].contracts

  // mint audit nft for deployer
  const auditorNFT = await ethers.getContract("AuditorNFT", deployer)
  const auditorNftTx = await auditorNFT.mint(deployer)
  await auditorNftTx.wait()
  log("Minted Auditor NFT for", deployer)

  const goodERC20_1 = await ethers.getContract("GoodERC20_1", deployer)
  const goodERC20_2 = await ethers.getContract("GoodERC20_2", deployer)
  const badERC20 = await ethers.getContract("BadERC20", deployer)

  // mint smart contract NFT for good token with good token type
  const smartContractNftContractName = contracts.SmartContractNFT.name
  const smartContractNFT = await ethers.getContract(smartContractNftContractName, deployer)

  const goodContractTypeName = "good-erc20"
  const goodContractType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(goodContractTypeName))
  const goodERC20Data = {
    auditor: deployer,
    contractType: goodContractType,
  }

  const smartContractNftGoodERC20_1Tx = await smartContractNFT.mint(goodERC20_1.address, goodERC20Data)
  await smartContractNftGoodERC20_1Tx.wait()
  log(
    `Minted SmartContractNFT (Audit) with type (${goodContractTypeName}), ${goodContractType}) on contract (${goodERC20_1.address})`
  )

  const smartContractNftGoodERC20_2Tx = await smartContractNFT.mint(goodERC20_2.address, goodERC20Data)
  await smartContractNftGoodERC20_2Tx.wait()
  log(
    `Minted SmartContractNFT (Audit) with type (${goodContractTypeName}), ${goodContractType}) on contract (${goodERC20_2.address})`
  )

  // mint smart contract NFT for bad token with bad token type
  const badContractTypeName = "bad-erc20"
  const badContractType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(badContractTypeName))
  const badERC20Data = {
    auditor: deployer,
    contractType: badContractType,
  }

  const smartContractNftBadERC20Tx = await smartContractNFT.mint(badERC20.address, badERC20Data)
  await smartContractNftBadERC20Tx.wait()
  log(
    `Minted SmartContractNFT (Audit) with type (${badContractTypeName}, ${badContractType}) on contract (${badERC20.address})`
  )
}

module.exports.tags = ["all", "setup"]
