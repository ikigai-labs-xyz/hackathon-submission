import { ethers } from "ethers"
import { turtleAddress } from "./address"
import turtleTokenAbi from "../assets/turtleshell_token_abi.json"

export const getTurtleTokenContract = (chainId) => {
  const turtleContract = new ethers.Contract(
    turtleAddress[chainId],
    turtleTokenAbi
  )

  return turtleContract
}
