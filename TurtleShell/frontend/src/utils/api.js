import axios from "axios"
import { backendUrl } from "./url"

export const getContractsOfAddress = (walletAddress) => {
  return axios.get(`${backendUrl}/getContractsOf?address=${walletAddress}`)
}

export const getSourceCodeOfContract = (contractAddress, chain) => {
  return axios.get(
    `${backendUrl}/getSourceCode?address=${contractAddress}&chain=${chain}`
  )
}

export const getAuditsOfContract = (sources) => {
  return axios.post(`${backendUrl}/getAuditData`, sources)
}

export const getScoreOfContract = (vulnerabilities) => {
  return axios.post(`${backendUrl}/getScore`, {
    vulnerabilities,
  })
}

export const getContractType = (sources) => {
  return axios.post(`${backendUrl}/getContractType`, sources)
}

export const uploadToIpfs = (json) => {
  return axios.post(`${backendUrl}/uploadToIpfs`, json)
}

export const getBackendSignature = (
  chainId,
  contractAddress,
  ipfsHash,
  grade,
  contractType
) => {
  const urlParam = new URLSearchParams({
    chainId,
    contractAddress,
    ipfsHash,
    grade,
    contractType,
  })

  return axios.get(`${backendUrl}/getSignature?${urlParam}`)
}
