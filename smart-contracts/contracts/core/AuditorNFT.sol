// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ISmartContractNFT.sol";
import "./interfaces/IAuditorNFT.sol";
import {SBT} from "./SBT.sol";

contract AuditorNFT is IAuditorNFT, SBT {
  // STORAGE

  mapping(address auditor => AuditorData) private s_auditorData;

  constructor(string memory name, string memory symbol) SBT(name, symbol) {}

  // FUNCTIONS
  function mint(address auditor) external override {
    AuditorData memory auditorData = s_auditorData[auditor];
    auditorData.reputationScore = 50; //TODO: remove mock and get the reputation score when AuditorSBT is implemented
    s_auditorData[auditor] = auditorData;

    _mintUsingAutomaticTokenId(auditor);

    emit MintAuditorNFT(auditor);
  }

  function addAuditedContract(address auditor, address contractAddress) external override {
    // TODO: implement reputation algorithm
    s_auditorData[auditor].auditedContracts.push(contractAddress);
  }

  function getAuditorData(address auditor) external view override returns (AuditorData memory) {
    return s_auditorData[auditor];
  }
}
