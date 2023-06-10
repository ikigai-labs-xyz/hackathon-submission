// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoodERC20_1 is ERC20 {
  constructor() ERC20("GoodToken1", "GOOD") {
    _mint(msg.sender, 1000 * 10 ** 18);
  }
}
