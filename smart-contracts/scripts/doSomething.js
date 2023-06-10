const { network, ethers } = require("hardhat")
const { scriptsConfig, networkConfig } = require("../helper-hardhat-config")

const main = async (arg1, arg2) => {
    const chainId = network.config.chainId
    const contractName = networkConfig[chainId].contracts.Contract.name
    const contract = await ethers.getContract(contractName)

    console.log("do something")
    const tx = await contract.doSomething()
    await tx.wait()
    console.log("Done something")
}

main(scriptsConfig.Contract.doSomething.arg1, scriptsConfig.Contract.doSomething.arg2)
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
