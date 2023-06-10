// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IAuditorNFT.sol";
import "./interfaces/ISmartContractNFT.sol";
import "./SBT.sol";

// TODO: Create second version which stores security data on IPFS
contract SmartContractNFT is ISmartContractNFT, SBT {
  // STORAGE
  IAuditorNFT private s_auditorNFT;

  // address of the Auditor NFT contract (to update array)

  mapping(address contractAddress => AuditSecurityData[]) private s_contractAudits;
  mapping(address contractAddress => ContractSecurityData) private s_contractSecurity;

  modifier onlyAuditor(address auditor) {
    // check if has auditor NFT, revert otherwise
    uint256 tokenId = s_auditorNFT.getTokenIdOfOwner(auditor);
    require(tokenId != 0, "AuditorNFT: caller has no AuditorNFT minted");
    _;
  }

  constructor(address auditorNFTAddress, string memory name, string memory symbol) SBT(name, symbol) {
    s_auditorNFT = IAuditorNFT(auditorNFTAddress);
  }

  // FUNCTIONS

  // computeSecurityData internal
  function _computeSecurityData(address contractAddress) internal {
    AuditSecurityData[] memory audits = s_contractAudits[contractAddress];
    uint8 currentMaximumReputation = 0;
    uint256 totalReputationScore = 0;
    bytes32 bestContractType = audits[0].contractType;

    for (uint256 i = 0; i < audits.length; i++) {
      IAuditorNFT.AuditorData memory auditorData = s_auditorNFT.getAuditorData(audits[i].auditor);
      uint8 auditorReputationScore = auditorData.reputationScore;

      // get data from auditor with best reputation
      if (auditorReputationScore > currentMaximumReputation) {
        currentMaximumReputation = auditorReputationScore;
        bestContractType = audits[i].contractType;
      }
      totalReputationScore += auditorReputationScore;
    }

    uint8 averageReputationScore = uint8(totalReputationScore / audits.length);

    s_contractSecurity[contractAddress] = ContractSecurityData(
      contractAddress,
      bestContractType,
      averageReputationScore
    );
  }

  // mint(contractAddress, securityJSON)
  function mint(
    address contractAddress,
    AuditSecurityData calldata newAuditSecurityData
  ) external onlyAuditor(msg.sender) {
    s_contractAudits[contractAddress].push(newAuditSecurityData);

    _computeSecurityData(contractAddress);

    // update tokenIds
    // call ERC721 mint
    _mintUsingAutomaticTokenId(contractAddress);

    emit MintSmartContractNFT(newAuditSecurityData.auditor, contractAddress, newAuditSecurityData);
  }

  // getContractSecurity(contractAddress) returns (uint8 score)
  function getContractSecurity(address contractAddress) external view returns (ContractSecurityData memory) {
    return s_contractSecurity[contractAddress];
  }
}
