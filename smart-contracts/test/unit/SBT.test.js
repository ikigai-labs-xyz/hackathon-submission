const { expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { networkConfig, constants } = require("../../helper-hardhat-config")

const chainId = network.config.chainId
const contractConfig = networkConfig[chainId].contracts.SBT
const contractName = contractConfig.name

!constants.developmentChains.includes(network.name)
  ? describe.skip
  : describe(contractName, () => {
      let contract, deployer

      beforeEach(async () => {
        deployer = await ethers.getSigner((await getNamedAccounts()).deployer)
        await deployments.fixture(["forTests"])
        contract = await ethers.getContract(contractName, deployer.address)

        TRANSFER_NOT_SUPPORTED_ERROR = "SBT__TransferNotSupported"
        APPROVAL_NOT_SUPPORTED_ERROR = "SBT_ApprovalNotSupported"
      })

      describe("safeTransferFrom", () => {
        it("reverts", async () => {
          let error
          try {
            await contract.safeTransferFrom(deployer.address, deployer.address, 0)
          } catch (e) {
            error = e
          }

          expect(error).not.to.be.undefined
          // not checking the specific error message, since `safeTransferFrom`
          // cannot be found on the contract
        })
      })

      describe("transferFrom", () => {
        it("reverts", async () => {
          let error
          try {
            await contract.transferFrom(deployer.address, deployer.address, 0)
          } catch (e) {
            error = e
          }

          expect(error).not.to.be.undefined
          expect(String(error)).to.contain(TRANSFER_NOT_SUPPORTED_ERROR)
        })
      })

      describe("approve", () => {
        it("reverts", async () => {
          let error
          try {
            await contract.approve(deployer.address, 0)
          } catch (e) {
            error = e
          }

          expect(error).not.to.be.undefined
          expect(String(error)).to.contain(APPROVAL_NOT_SUPPORTED_ERROR)
        })
      })

      describe("setApprovalForAll", () => {
        it("reverts", async () => {
          let error
          try {
            await contract.setApprovalForAll(deployer.address, false)
          } catch (e) {
            error = e
          }

          expect(error).not.to.be.undefined
          expect(String(error)).to.contain(APPROVAL_NOT_SUPPORTED_ERROR)
        })
      })

      describe("getApproved", () => {
        it("returns zero address", async () => {
          const approvedRetrieved = await contract.getApproved(0)
          expect(approvedRetrieved).to.equal(ethers.constants.AddressZero)
        })
      })
    })
