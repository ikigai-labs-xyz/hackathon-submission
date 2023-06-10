import React from "react"
import Spinner from "../Spinner"
import { BsArrowRightShort } from "react-icons/bs"

import { usePrepareContractWrite, useContractWrite, useChainId, useAccount } from "wagmi"
import "./Dashboard.css"
import { chainIdToAdresses } from "../../utils/chainMapping"

const AuditorSBT = ({ onSubmit }) => {
	const chainId = useChainId()
	const { address: walletAddress } = useAccount()
	const auditorNftAddress = chainIdToAdresses[chainId]?.AuditorNFT

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: auditorNftAddress,
		abi: [
			{
				name: "mint",
				type: "function",
				stateMutability: "nonpayable",
				inputs: [
					{
						internalType: "address",
						name: "auditor",
						type: "address",
					},
				],
				outputs: [],
			},
		],
		functionName: "mint",
		args: [walletAddress],
	})

	const { write, isSuccess } = useContractWrite(config)

	const handleButtonClick = async () => {
		console.log(chainIdToAdresses[chainId].AuditorNFT)
		write?.()
		console.log(prepareError, write, isSuccess)

		if (isSuccess) {
			Promise.resolve(onSubmit("mint badge"))
		}
	}

	return (
		<div>
			<h1 className="h1">Get Started</h1>
			<h2 className="h2">
				First of all, you will need to get verified as an Auditor on TurtleShell. Therefore, you will
				need an Auditor SBT.
			</h2>

			<div className="text-center">
				<button
					className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}
					onClick={() => {
						handleButtonClick()
					}}
				>
					<div className="flex items-center">
						Mint Badge <BsArrowRightShort size={20} />
					</div>
				</button>
			</div>
		</div>
	)
}

export default AuditorSBT
