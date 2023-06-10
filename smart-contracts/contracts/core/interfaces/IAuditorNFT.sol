// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ISBT.sol";
import "./ISmartContractNFT.sol";

/**
 * @title IERC4671
 * @dev Interface implementation for {https://eips.ethereum.org/EIPS/eip-4671}
 */
interface IAuditorNFT is ISBT {
  struct AuditorData {
    uint8 reputationScore; // 0 to 100
    // array of audited SmartContractNFT
    address[] auditedContracts;
  }

  event MintAuditorNFT(address auditor);

  function mint(address auditor) external;

  function addAuditedContract(address auditor, address contractAddress) external;

  function getAuditorData(address auditor) external view returns (AuditorData memory);
}
