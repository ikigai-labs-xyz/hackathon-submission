// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../core/interfaces/ISmartContractNFT.sol";
import "./MockLiquidityPool.sol";

contract SecuredDex {
  ISmartContractNFT public immutable turtleShell;

  bytes32 public constant GOOD_ERC20_TYPE = keccak256("good-erc20");

  event CreatedLiquidityPool(address liquidityPoolAddress);

  modifier onlySecureERC20(address token) {
    require(turtleShell.getContractSecurity(token).contractType == GOOD_ERC20_TYPE, "Token is not secure");
    _;
  }

  constructor(ISmartContractNFT _turtleShell) {
    turtleShell = _turtleShell;
  }

  function createSafeLiquidityPool(
    address token1,
    address token2
  ) external onlySecureERC20(token1) onlySecureERC20(token2) {
    // create liquidity pool
    MockLiquidityPool liquidityPool = new MockLiquidityPool(token1, token2);
    emit CreatedLiquidityPool(address(liquidityPool));
  }
}
