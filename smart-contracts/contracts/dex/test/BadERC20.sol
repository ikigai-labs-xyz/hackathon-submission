// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BadERC20 is ERC20 {
  constructor() ERC20("BadToken", "BAD") {
    _mint(msg.sender, 1000 * 10 ** 18);
  }

  /**
   * @dev WARNING: bad transferFrom function that allows sender to transfer
   * funds from someone without permission
   */
  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) public virtual override(ERC20) returns (bool) {
    // _spendAllowance(from, spender, amount);
    _transfer(from, to, amount);
    return true;
  }
}
