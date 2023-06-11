import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  MintSmartContractNFT as MintSmartContractNFTEvent,
  Transfer as TransferEvent
} from "../generated/SmartContractNFT/SmartContractNFT"
import {
  Approval,
  ApprovalForAll,
  MintSmartContractNFT,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintSmartContractNFT(
  event: MintSmartContractNFTEvent
): void {
  let entity = new MintSmartContractNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.auditor = event.params.auditor
  entity.contractAddress = event.params.contractAddress
  entity.securityData_auditor = event.params.securityData.auditor
  entity.securityData_contractType = event.params.securityData.contractType

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
