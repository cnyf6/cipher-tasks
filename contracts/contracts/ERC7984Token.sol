// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, externalEuint64, ebool } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

interface IERC7984 {
    function balanceOf(address account) external view returns (euint64);
    function transfer(address to, externalEuint64 amount, bytes calldata proof) external returns (bool);
    function approve(address spender, externalEuint64 amount, bytes calldata proof) external returns (bool);
    function transferFrom(address from, address to, externalEuint64 amount, bytes calldata proof) external returns (bool);
}

contract ERC7984Token is IERC7984, SepoliaConfig {
    string public name = "Private Token";
    string public symbol = "PRIV";
    uint8 public decimals = 18;

    mapping(address => euint64) private _balances;
    mapping(address => mapping(address => euint64)) private _allowances;

    euint64 public totalSupply;

    event Transfer(address indexed from, address indexed to);
    event Approval(address indexed owner, address indexed spender);

    constructor(uint64 initialSupply) {
        euint64 supply = FHE.asEuint64(initialSupply);
        _balances[msg.sender] = supply;
        totalSupply = supply;

        FHE.allowThis(supply);
        FHE.allow(supply, msg.sender);
    }

    function balanceOf(address account) external view returns (euint64) {
        return _balances[account];
    }

    function transfer(
        address to,
        externalEuint64 amount,
        bytes calldata proof
    ) external returns (bool) {
        euint64 value = FHE.fromExternal(amount, proof);
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(
        address spender,
        externalEuint64 amount,
        bytes calldata proof
    ) external returns (bool) {
        euint64 value = FHE.fromExternal(amount, proof);

        _allowances[msg.sender][spender] = value;
        FHE.allowThis(value);
        FHE.allow(value, spender);

        emit Approval(msg.sender, spender);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        externalEuint64 amount,
        bytes calldata proof
    ) external returns (bool) {
        euint64 value = FHE.fromExternal(amount, proof);

        // 授权校验（fail-closed）
        ebool hasAllowance = FHE.ge(_allowances[from][msg.sender], value);
        euint64 transferAmount = FHE.select(hasAllowance, value, FHE.asEuint64(0));

        _allowances[from][msg.sender] = FHE.sub(
            _allowances[from][msg.sender],
            transferAmount
        );

        _transfer(from, to, transferAmount);
        return true;
    }

    function _transfer(address from, address to, euint64 amount) internal {
        // 余额充足性校验（fail-closed: 不足则转0）
        ebool hasSufficient = FHE.ge(_balances[from], amount);
        euint64 transferAmount = FHE.select(
            hasSufficient,
            amount,
            FHE.asEuint64(0)
        );

        // 更新余额
        euint64 newFromBalance = FHE.sub(_balances[from], transferAmount);
        euint64 newToBalance = FHE.add(_balances[to], transferAmount);

        _balances[from] = newFromBalance;
        _balances[to] = newToBalance;

        // 授权查看
        FHE.allowThis(newFromBalance);
        FHE.allowThis(newToBalance);
        FHE.allow(newFromBalance, from);
        FHE.allow(newToBalance, to);

        emit Transfer(from, to);
    }

    // 用户请求查看自身余额
    function requestBalanceAccess() external {
        FHE.allow(_balances[msg.sender], msg.sender);
    }
}


