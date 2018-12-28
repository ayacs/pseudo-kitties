pragma solidity >=0.4.22 <0.6.0;

contract Ownable {
    
    address payable owner; 
    
    constructor() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        assert(msg.sender == owner);
        _;
    }

    function transferOwnership(address payable newOwner) onlyOwner public{
        owner = newOwner;
    }
    
    
}

contract greeter is Ownable {
    

    string greeting;
    
    
    function setGreeting(string memory newGreeting) onlyOwner public{
        greeting = newGreeting;
    }
    
    
    function greet() public view returns(string memory) {
        return greeting;
    }
    
       function() external payable {
        owner.transfer(msg.value);
    }
}
