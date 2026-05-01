// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.0/utils/Pausable.sol";

/**
 * @title XiamiToken - Empire Reward Token
 * @dev Polygon PoS链上的帝国激励代币
 * @notice 虾米 = 小额激励 + 空投招募 + 生态奖励
 *         每个小弟送1000万虾米，可招募1000万小弟
 *
 * Name:   虾米
 * Symbol: XIAMI
 * Decimals: 18
 * Total Supply: 1亿万亿 (10^20) 固定，不增发
 * 1% transfer burn tax
 */
contract XiamiToken is ERC20, ERC20Burnable, Ownable, Pausable {

    uint256 public constant TOTAL_SUPPLY = 10 ** 20;     // 1亿万亿
    uint256 public constant BURN_TAX_RATE = 100;         // 1%
    uint256 public constant BURN_TAX_DIVISOR = 10000;

    uint256 public totalBurned;

    event BurnTax(address indexed from, uint256 amount, uint256 tax);

    constructor(address initialOwner)
        ERC20("\u867e\u7c73", "XIAMI")
        Ownable(initialOwner)
    {
        totalBurned = 0;
        _mint(initialOwner, TOTAL_SUPPLY);
    }

    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        uint256 tax = (amount * BURN_TAX_RATE) / BURN_TAX_DIVISOR;
        uint256 send = amount - tax;
        if (tax > 0) {
            totalBurned += tax;
            _burn(_msgSender(), tax);
            emit BurnTax(_msgSender(), amount, tax);
        }
        return super.transfer(to, send);
    }

    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused returns (bool) {
        uint256 tax = (amount * BURN_TAX_RATE) / BURN_TAX_DIVISOR;
        uint256 send = amount - tax;
        if (tax > 0) {
            totalBurned += tax;
            _burn(from, tax);
            emit BurnTax(from, amount, tax);
        }
        return super.transferFrom(from, to, send);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }
}
