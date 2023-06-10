const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { constants } = require("../../helper-hardhat-config")

if (!constants.developmentChains.includes(network.name)) {
  describe.skip
} else {
  describe("AuditorNFT", function () {
    let auditorNFT, smartContractNFT, deployer, auditor1, auditor2, fakeContractAddress

    beforeEach(async function () {
      await deployments.fixture(["all"])
      deployer = (await getNamedAccounts()).deployer
      provider = ethers.provider

      auditorNFT = await ethers.getContract("AuditorNFT", deployer)
      auditor1 = (await getNamedAccounts()).user1
      auditor2 = (await getNamedAccounts()).user2
      smartContractNFT = await ethers.getContract("SmartContractNFT", auditor1)
      fakeContractAddress = "0x000000000000000000000000000000000000dEaD"
      flashLoanType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("flashloan"))
    })

    describe("mint", function () {
      it("should set AuditorData for auditor", async function () {
        await auditorNFT.mint(auditor1)

        const auditorData = await auditorNFT.getAuditorData(auditor1)

        expect(auditorData.reputationScore).to.equal(50)
        expect(auditorData.auditedContracts).to.deep.equal([])
      })

      it("should emit event correctly", async () => {
        await expect(auditorNFT.mint(auditor1)).to.emit(auditorNFT, "MintAuditorNFT").withArgs(auditor1)
      })

      describe("addAuditedContract", function () {
        it("should add a new audited contract to the auditor's list of audited contracts", async function () {
          await auditorNFT.mint(auditor1)
          await smartContractNFT.mint(fakeContractAddress, {
            auditor: auditor1,
            contractType: flashLoanType,
          })

          await auditorNFT.addAuditedContract(auditor1, fakeContractAddress)

          const auditorData = await auditorNFT.getAuditorData(auditor1)

          expect(auditorData.auditedContracts).to.have.lengthOf(1)
          expect(auditorData.auditedContracts[0]).to.equal(fakeContractAddress)
        })
      })

      it("calls SBT mint", () => {
        expect(auditorNFT.mint(auditor1))
          .to.emit(auditorNFT, "Transfer")
          .withArgs(constants.AddressZero, auditor1, 1)
      })
    })
  })
}
