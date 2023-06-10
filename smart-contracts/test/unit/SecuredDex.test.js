const { expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { networkConfig, constants } = require("../../helper-hardhat-config")

const chainId = network.config.chainId
const contractConfig = networkConfig[chainId].contracts.SecuredDex
const contractName = contractConfig.name

!constants.developmentChains.includes(network.name)
  ? describe.skip
  : describe(contractName, () => {
      let contract, turtleShell, goodERC20_1, goodERC20_2, badERC20, deployer

      beforeEach(async () => {
        deployer = await ethers.getSigner((await getNamedAccounts()).deployer)
        await deployments.fixture(["all"])

        turtleShell = await ethers.getContract("SmartContractNFT", deployer.address)
        contract = await ethers.getContract(contractName, deployer.address)
        goodERC20_1 = await ethers.getContract("GoodERC20_1", deployer.address)
        goodERC20_2 = await ethers.getContract("GoodERC20_2", deployer.address)
        badERC20 = await ethers.getContract("BadERC20", deployer.address)
      })

      describe("constructor", () => {
        it("sets turtleshell address", async () => {
          expect(await contract.turtleShell()).to.equal(turtleShell.address)
        })
      })

      describe("createSafeLiquidityPool", () => {
        it("fails if token1 is insecure", async () => {
          await expect(
            contract.createSafeLiquidityPool(badERC20.address, goodERC20_1.address)
          ).to.be.revertedWith("Token is not secure")
        })
        it("fails if token2 is insecure", async () => {
          await expect(
            contract.createSafeLiquidityPool(goodERC20_1.address, badERC20.address)
          ).to.be.revertedWith("Token is not secure")
        })
        it("succeeds if both tokens are secure", async () => {
          await expect(contract.createSafeLiquidityPool(goodERC20_1.address, goodERC20_2.address)).to.not.be
            .reverted
        })
        it("emits event", async () => {
          await expect(contract.createSafeLiquidityPool(goodERC20_1.address, goodERC20_2.address)).to.emit(
            contract,
            "CreatedLiquidityPool"
          )
        })
      })
    })
