pragma solidity >=0.4.22 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";

contract Factory is Ownable{
    
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    
    event NewPseudoKittie(uint id, address indexed owner);
    event UpdateOwnerKitties(uint id, address indexed owner);
    // event UpdateKittiesForSale(uint id);
    
    modifier onlyOwnerOf(uint _kittieId) {
       assert(msg.sender == kittieToOwner[_kittieId]);
       _;
    }
    
    modifier isStillForSale(uint _kittieId){
        assert(kitties[_kittieId].forSale && kitties[_kittieId].price != 0);
        _;
    }

    struct PseudoKittie {
        uint id;
        uint price;
        bool forSale;
    }

    PseudoKittie[] public kitties;
    
    mapping (uint => address payable) public kittieToOwner;
    mapping (address => uint) ownerKittieCount;

    function _createKittie() internal {
        uint id = kitties.length;
        kitties.push(PseudoKittie(id,0,false));
        kittieToOwner[id] = msg.sender;
        ownerKittieCount[msg.sender] = ownerKittieCount[msg.sender].add(1);
        // emit NewPseudoKittie(id, msg.sender);
        emit UpdateOwnerKitties(id, msg.sender);
    } 


    function createFirstKittie() external {
        assert(ownerKittieCount[msg.sender] == 0);
        _createKittie();
    }
    
    function kittieForSale(uint _kittieId, uint _priceInWei) external onlyOwnerOf(_kittieId) {
        PseudoKittie storage kittie = kitties[_kittieId];
        kittie.price = _priceInWei; 
        kittie.forSale = true;
        emit UpdateOwnerKitties(_kittieId, msg.sender);
        // emit UpdateKittiesForSale(_kittieId);
    }
    
    function buyKittie(uint _kittieId) external payable isStillForSale(_kittieId) {
        PseudoKittie storage _kittie = kitties[_kittieId];
        assert(_kittie.price == msg.value);
        _kittie.price = 0; 
        _kittie.forSale = false;
        address payable _previousOwner = kittieToOwner[_kittieId];
        kittieToOwner[_kittieId] = msg.sender;
        ownerKittieCount[msg.sender] = ownerKittieCount[msg.sender].add(1);
        ownerKittieCount[_previousOwner] = ownerKittieCount[_previousOwner].sub(1);
        _previousOwner.transfer(msg.value);
        emit UpdateOwnerKitties(_kittieId, msg.sender);
    }
    
    function kittieCancelSale(uint _kittieId) external onlyOwnerOf(_kittieId) {
        PseudoKittie storage kittie = kitties[_kittieId];
        kittie.price = 0; 
        kittie.forSale = false;
        emit UpdateOwnerKitties(_kittieId, msg.sender);
        // emit UpdateKittiesForSale(_kittieId);
    }
    
    function isForSale(uint i, address _owner) private view returns(bool){
        return kitties[i].forSale && _owner != kittieToOwner[i];
    }
    
    function getKittiesForSale(address _owner) external view returns(uint[] memory) {
        uint size = 0;
         for (uint i = 0; i < kitties.length; i++) {
          if (isForSale(i, _owner)) {
             size++;
          }
        }
      uint[] memory result = new uint[](size);
      uint counter = 0;
      for (uint i = 0; i < kitties.length; i++) {
          if (isForSale(i, _owner)) {
             result[counter] = i;
             counter++;
          }
        }
       return result;
    }
    
    function getKittiesByOwner(address _owner) external view returns(uint[] memory) {
      uint[] memory result = new uint[](ownerKittieCount[_owner]);
      uint counter = 0;
      for (uint i = 0; i < kitties.length; i++) {
          if (kittieToOwner[i] == _owner ) {
            result[counter] = i;
            counter++;
          }
        }
       return result;
    }
    
}
