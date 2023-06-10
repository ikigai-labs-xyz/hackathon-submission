const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { constants } = require("../../helper-hardhat-config")

if (!constants.developmentChains.includes(network.name)) {
  describe.skip
} else {
  describe("SmartContractNFT", () => {
    let deployer, auditor1, auditor2, fakeContractAddress, flashLoanType, erc20Type

    beforeEach(async () => {
      await deployments.fixture(["all"])
      deployer = (await getNamedAccounts()).deployer
      provider = ethers.provider

      auditor1 = (await getNamedAccounts()).user1
      auditor2 = (await getNamedAccounts()).user2
      auditorNFT = await ethers.getContract("AuditorNFT", deployer)
      auditorNFT.mint(auditor1)
      auditorNFT.mint(auditor2)
      smartContractNFT = await ethers.getContract("SmartContractNFT", auditor1)
      fakeContractAddress = "0x000000000000000000000000000000000000dEaD"
      flashLoanType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("flashloan"))
      erc20Type = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("erc20"))
    })

    describe("mint", () => {
      context("with a valid smart contract Audit", () => {
        it("should add newAuditSecurityData to the list of audits", async () => {
          const newAuditSecurityData = {
            auditor: auditor1,
            contractType: flashLoanType,
          }

          await smartContractNFT.mint(fakeContractAddress, newAuditSecurityData)

          const contractSecurityData = await smartContractNFT.getContractSecurity(fakeContractAddress)

          expect(contractSecurityData.contractAddress).to.equal(fakeContractAddress)
          expect(contractSecurityData.score).to.equal(50)
          expect(contractSecurityData.contractType).to.equal(flashLoanType)
        })

        it("should emit a MintSmartContractNFT event", async () => {
          const newAuditSecurityData = {
            auditor: auditor1,
            contractType: flashLoanType,
          }

          await expect(smartContractNFT.mint(fakeContractAddress, newAuditSecurityData))
            .to.emit(smartContractNFT, "MintSmartContractNFT")
            .withArgs(auditor1, fakeContractAddress, [auditor1, flashLoanType])
        })
      })

      context("with multiple valid smart contract Audits", () => {
        context("all auditors have the same reputation", () => {
          let contractSecurityData

          beforeEach(async () => {
            let newAuditSecurityData = {
              auditor: auditor1,
              contractType: erc20Type,
            }
            await smartContractNFT.mint(fakeContractAddress, newAuditSecurityData)

            newAuditSecurityData = {
              auditor: auditor2,
              contractType: flashLoanType,
            }

            await smartContractNFT.mint(fakeContractAddress, newAuditSecurityData)

            contractSecurityData = await smartContractNFT.getContractSecurity(fakeContractAddress)
          })

          it("should average auditors reputation score", async () => {
            expect(contractSecurityData.score).to.equal(50)
          })

          it("should take the first auditor's contract type", async () => {
            expect(contractSecurityData.contractType).to.equal(erc20Type)
          })
        })
      })

      it("calls SBT mint", () => {
        const newAuditSecurityData = {
          auditor: auditor1,
          contractType: flashLoanType,
        }

        expect(smartContractNFT.mint(fakeContractAddress, newAuditSecurityData))
          .to.emit(smartContractNFT, "Transfer")
          .withArgs(constants.AddressZero, auditor1, 1)
      })
    })
  })
}
