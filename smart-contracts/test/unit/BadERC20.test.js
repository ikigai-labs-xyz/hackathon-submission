const { expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { networkConfig, constants } = require("../../helper-hardhat-config")

const chainId = network.config.chainId
const contractConfig = networkConfig[chainId].contracts.BadERC20
const contractName = contractConfig.name

!constants.developmentChains.includes(network.name)
  ? describe.skip
  : describe(contractName, () => {
      let contract, deployer, user1

      beforeEach(async () => {
        deployer = await ethers.getSigner((await getNamedAccounts()).deployer)
        user1 = await ethers.getSigner((await getNamedAccounts()).user1)
        await deployments.fixture(["all"])
        contract = await ethers.getContract(contractName, deployer.address)
      })

      describe("transferFrom", () => {
        it("allows for transfers without permission", async () => {
          await contract.transferFrom(deployer.address, user1.address, 1000)
        })
      })
    })
