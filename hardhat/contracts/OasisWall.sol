// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MixerWall {
    event DepositDone(string privateKey);

    mapping(string => uint256) private deposits;

    function deposit(string memory password) public payable {
        require(
            msg.value == (10 * 1e18) ||
                msg.value == (100 * 1e18) ||
                msg.value == (1000 * 1e18) ||
                msg.value == (10000 * 1e18)
        );
        deposits[password] = msg.value;
        emit DepositDone(password);
    }

    function withdraw(string memory password) public {
        require(deposits[password] > 0);
        address payable to = payable(msg.sender);
        to.transfer(deposits[password]);
        deposits[password] = 0;
    }
}
