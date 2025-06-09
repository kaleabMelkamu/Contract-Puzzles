//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

contract Escrow {

    address public arbiter;
    address public depositor;
    address public beneficiary;
    bool public isApproved;
   

    constructor(address _arbiter, address _beneficiary) payable {
        
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    event Approved(uint);

    function approve() external 
    {
        require(msg.sender == arbiter);
        uint balance = address(this).balance;
        (bool sent,) = beneficiary.call {value : address(this).balance} ("");
        require(sent, "failed to send Ether");
        emit Approved(balance);
        isApproved=true;
    }

}