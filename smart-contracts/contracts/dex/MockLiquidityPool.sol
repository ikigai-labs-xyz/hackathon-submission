// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockLiquidityPool {
  address immutable token1;
  address immutable token2;

  constructor(address _token1, address _token2) {
    token1 = _token1;
    token2 = _token2;
  }

  function swap(address fromToken, address toToken, uint256 amount) external {
    // swap tokens
  }
}
