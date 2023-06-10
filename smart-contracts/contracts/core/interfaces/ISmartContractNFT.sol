// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ISBT.sol";

interface ISmartContractNFT {
  // struct for the Audit Security JSON
  struct AuditSecurityData {
    address auditor;
    // keccak256 of the contract name, ex: keccak("flashloan")
    bytes32 contractType;
  }

  // struct for the Contract Security JSON
  struct ContractSecurityData {
    address contractAddress;
    bytes32 contractType;
    uint8 score;
  }

  event MintSmartContractNFT(address auditor, address contractAddress, AuditSecurityData securityData);

  function mint(address contractAddress, AuditSecurityData calldata newAuditSecurityData) external;

  function getContractSecurity(address contractAddress) external view returns (ContractSecurityData memory);
}
