// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.0/utils/Pausable.sol";

/**
 * @title Token - Empire Base Currency
 * @dev Polygon PoS链上的帝国基础流通代币
 * @notice Token = 算力凭证 + 资源度量 + 交易媒介
 *
 * Name:   Token
 * Symbol: Token
 * Decimals: 18
 * Initial Supply: 1亿万亿 (10^20)
 * Max Supply: 10亿万亿 (10^21)
 * 1% transfer burn tax, yearly halving mint
 */
contract TokenCoin is ERC20, ERC20Burnable, Ownable, Pausable {

    uint256 public constant MAX_SUPPLY = 10 ** 21;
    uint256 public constant INITIAL_SUPPLY = 10 ** 20;
    uint256 public constant INITIAL_YEARLY_MINT = 10 ** 14;
    uint256 public constant BURN_TAX_RATE = 100;
    uint256 public constant BURN_TAX_DIVISOR = 10000;

    uint256 public immutable genesisTime;
    uint256 public currentYear;
    uint256 public totalBurned;
    mapping(uint256 => uint256) public yearlyMintHistory;

    event Mint(address indexed to, uint256 amount, uint256 year);
    event BurnTax(address indexed from, uint256 amount, uint256 tax);
    event YearAdvanced(uint256 oldYear, uint256 newYear);

    constructor(address initialOwner)
        ERC20("Token", "Token")
        Ownable(initialOwner)
    {
        genesisTime = block.timestamp;
        currentYear = 0;
        totalBurned = 0;
        _mint(initialOwner, INITIAL_SUPPLY);
        yearlyMintHistory[0] = INITIAL_SUPPLY;
    }

    function mint(address to) external onlyOwner whenNotPaused {
        uint256 year = getCurrentYear();
        if (year > currentYear) {
            currentYear = year;
            emit YearAdvanced(year - 1, year);
        }
        uint256 mintAmount = calculateYearlyMint(currentYear);
        require(totalSupply() + mintAmount <= MAX_SUPPLY, "Token: exceeds max supply");
        _mint(to, mintAmount);
        yearlyMintHistory[currentYear] += mintAmount;
        emit Mint(to, mintAmount, currentYear);
    }

    function mintBatch(address to, uint256 amount) external onlyOwner whenNotPaused {
        require(amount > 0, "Token: zero amount");
        require(totalSupply() + amount <= MAX_SUPPLY, "Token: exceeds max supply");
        _mint(to, amount);
        yearlyMintHistory[getCurrentYear()] += amount;
        emit Mint(to, amount, getCurrentYear());
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

    function getCurrentYear() public view returns (uint256) {
        return (block.timestamp - genesisTime) / 365 days;
    }

    function calculateYearlyMint(uint256 year) public pure returns (uint256) {
        return INITIAL_YEARLY_MINT / (2 ** year);
    }

    function getRemainingMintable() external view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }
}
