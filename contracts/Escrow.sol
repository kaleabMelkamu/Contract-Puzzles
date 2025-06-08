//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

contract Escrow {
    
    address public arbiter;
    address public depositor;
    address public beneficiary;
   

    constructor(address _arbiter, address _beneficiary) {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }
}