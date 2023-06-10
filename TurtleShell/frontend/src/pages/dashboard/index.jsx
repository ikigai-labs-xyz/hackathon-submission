import { useState } from "react"
import Confetti from "react-confetti"
import { useAccount, useChainId, useContractWrite, usePrepareContractWrite } from "wagmi"
import MintNft from "../../components/dashboard/MintNft"
import NavBar from "../../components/dashboard/Navbar"
import NoWallet from "../../components/dashboard/NoWallet"
import useWindowSize from "../../hooks/useWindowSize"
import AuditorForm from "../../components/dashboard/AuditorForm"
import AuditorSBT from "../../components/dashboard/AuditorSBT"
import MintSuccess from "../../components/dashboard/MintSuccess"
import { ChooseContract } from "../../components/dashboard/ChooseContract"
import { ethers } from "ethers"
import { chainIdToAdresses } from "../../utils/chainMapping"

const PageState = {
	auditorSBT: "auditorSBT",
	chooseContract: "chooseContract",
	auditorForm: "auditorForm",
	performAudit: "performAudit",
	mintNft: "mintNft",
	mintSuccess: "mintSuccess",
}

export default function Dashboard() {
	const [pageState, setPageState] = useState(PageState.auditorSBT)
	const [contractAddress, setContractAddress] = useState("")
	const [contractType, setContractType] = useState("default")

	const [success, setSuccess] = useState({ show: false, contractAddress: "", hash: "" })

	const { width, height } = useWindowSize()
	const { address } = useAccount()

	const contractSecurityData = {
		// "good-erc20" has to be provided to work for the dex
		// but that is not crucial here, as the SmartContractNFT minted here
		// will not be used in the DEX example.
		// You can theoretically mint any type here
		contractType: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(contractType)),
		// just use a default value here or from the input
		score: 50,
	}
	const chainId = useChainId()
	const smartContractNftAddress = chainIdToAdresses[chainId]?.SmartContractNFT

	const { config } = usePrepareContractWrite({
		address: smartContractNftAddress,
		abi: [
			{
				inputs: [
					{
						internalType: "address",
						name: "auditorNFTAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "symbol",
						type: "string",
					},
				],
				stateMutability: "nonpayable",
				type: "constructor",
			},
			{
				inputs: [],
				name: "SBT_ApprovalNotSupported",
				type: "error",
			},
			{
				inputs: [],
				name: "SBT__TransferNotSupported",
				type: "error",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "address",
						name: "owner",
						type: "address",
					},
					{
						indexed: true,
						internalType: "address",
						name: "approved",
						type: "address",
					},
					{
						indexed: true,
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
				],
				name: "Approval",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "address",
						name: "owner",
						type: "address",
					},
					{
						indexed: true,
						internalType: "address",
						name: "operator",
						type: "address",
					},
					{
						indexed: false,
						internalType: "bool",
						name: "approved",
						type: "bool",
					},
				],
				name: "ApprovalForAll",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: false,
						internalType: "address",
						name: "auditor",
						type: "address",
					},
					{
						indexed: false,
						internalType: "address",
						name: "contractAddress",
						type: "address",
					},
					{
						components: [
							{
								internalType: "address",
								name: "auditor",
								type: "address",
							},
							{
								internalType: "bytes32",
								name: "contractType",
								type: "bytes32",
							},
						],
						indexed: false,
						internalType: "struct ISmartContractNFT.AuditSecurityData",
						name: "securityData",
						type: "tuple",
					},
				],
				name: "MintSmartContractNFT",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "address",
						name: "from",
						type: "address",
					},
					{
						indexed: true,
						internalType: "address",
						name: "to",
						type: "address",
					},
					{
						indexed: true,
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
				],
				name: "Transfer",
				type: "event",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				name: "approve",
				outputs: [],
				stateMutability: "pure",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "owner",
						type: "address",
					},
				],
				name: "balanceOf",
				outputs: [
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				name: "getApproved",
				outputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
				],
				stateMutability: "pure",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "contractAddress",
						type: "address",
					},
				],
				name: "getContractSecurity",
				outputs: [
					{
						components: [
							{
								internalType: "address",
								name: "contractAddress",
								type: "address",
							},
							{
								internalType: "bytes32",
								name: "contractType",
								type: "bytes32",
							},
							{
								internalType: "uint8",
								name: "score",
								type: "uint8",
							},
						],
						internalType: "struct ISmartContractNFT.ContractSecurityData",
						name: "",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "owner",
						type: "address",
					},
				],
				name: "getTokenIdOfOwner",
				outputs: [
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "address",
						name: "",
						type: "address",
					},
				],
				name: "isApprovedForAll",
				outputs: [
					{
						internalType: "bool",
						name: "",
						type: "bool",
					},
				],
				stateMutability: "pure",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "contractAddress",
						type: "address",
					},
					{
						components: [
							{
								internalType: "address",
								name: "auditor",
								type: "address",
							},
							{
								internalType: "bytes32",
								name: "contractType",
								type: "bytes32",
							},
						],
						internalType: "struct ISmartContractNFT.AuditSecurityData",
						name: "newAuditSecurityData",
						type: "tuple",
					},
				],
				name: "mint",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [],
				name: "name",
				outputs: [
					{
						internalType: "string",
						name: "",
						type: "string",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
				],
				name: "ownerOf",
				outputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				name: "safeTransferFrom",
				outputs: [],
				stateMutability: "pure",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
					{
						internalType: "bytes",
						name: "",
						type: "bytes",
					},
				],
				name: "safeTransferFrom",
				outputs: [],
				stateMutability: "pure",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "bool",
						name: "",
						type: "bool",
					},
				],
				name: "setApprovalForAll",
				outputs: [],
				stateMutability: "pure",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes4",
						name: "interfaceId",
						type: "bytes4",
					},
				],
				name: "supportsInterface",
				outputs: [
					{
						internalType: "bool",
						name: "",
						type: "bool",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [],
				name: "symbol",
				outputs: [
					{
						internalType: "string",
						name: "",
						type: "string",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "address",
						name: "",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				name: "transferFrom",
				outputs: [],
				stateMutability: "pure",
				type: "function",
			},
		],
		functionName: "mint",
		args: [contractAddress, contractSecurityData],
	})

	console.log("contractAddress", contractAddress)
	console.log("smartContractNft", smartContractNftAddress)

	const { write, isSuccess, error } = useContractWrite(config)

	// function that gets called when clicking mint
	async function onMint() {
		write?.()

		if (isSuccess) {
			Promise.resolve()
			// switch the page here

			// maybe you have to call the onSubmit function here again,
			// if it works the same way
		} else if (error) {
			console.log("Error while minting Audit: ", error)
		}
	}

	function renderContent() {
		let content = ""
		if (!address) {
			content = <NoWallet />

			return content
		}

		switch (pageState) {
			case PageState.auditorSBT:
				content = (
					<AuditorSBT
						onSubmit={(onSubmit) => {
							if (onSubmit === "mint badge") {
								// Handle the "mint badge" action here; // Set the contract address accordingly
								setPageState(PageState.chooseContract)
							}
							console.log(onSubmit)
						}}
					/>
				)
				break

			case PageState.chooseContract:
				content = (
					<ChooseContract
						onSubmit={(contractAddress) => {
							setContractAddress(contractAddress)
							setPageState(PageState.auditorForm)
						}}
					/>
				)
				break

			case PageState.auditorForm:
				content = (
					<AuditorForm
						onSubmit={(contractType) => {
							setContractType(contractType)
							setPageState(PageState.mintNft)
						}}
					/>
				)

				break

			case PageState.mintNft:
				content = (
					<MintNft
						contract={contractAddress}
						loading={false}
						score={0}
						audits={[]}
						mintNft={onMint}
					/>
				)
				break

			case PageState.mintSuccess:
				content = <MintSuccess hash={success.hash} contract={contractAddress} />
				break
		}

		return content
	}

	return (
		<div className="h-screen w-screen">
			<NavBar />
			<main className=" flex min-h-screen flex-col items-center justify-between p-24">
				{renderContent()}

				{success.show && <Confetti width={width} height={height} />}
			</main>
		</div>
	)
}
