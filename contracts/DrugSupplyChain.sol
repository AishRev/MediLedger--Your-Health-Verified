// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// A dedicated contract for tracking drugs from manufacturer to delivery.
contract DrugSupplyChain {

    // ----------- STATE VARIABLES -----------
    uint public manufacturerCounter;
    uint public drugCounter;

    struct Manufacturer {
        uint id;
        string name;
        address walletAddress;
        bool isRegistered;
    }

    struct Drug {
        uint id;
        string name;
        uint manufacturerId;
        State currentState;
        Checkpoint[] history;
    }

    struct Checkpoint {
        uint timestamp;
        address scannedBy;
        State stateAtScan;
    }

    enum State { Manufactured, InTransit, AtPharmacy, Delivered }

    // Mappings for direct lookup
    mapping(address => uint) public addressToManufacturerId;
    mapping(uint => Manufacturer) public manufacturers;
    mapping(uint => Drug) public drugs;

    // ----------- MODIFIERS & EVENTS -----------
    modifier onlyManufacturer() {
        require(addressToManufacturerId[msg.sender] != 0, "Only registered manufacturers can perform this action.");
        _;
    }

    event ManufacturerRegistered(uint id, string name);
    event DrugAdded(uint drugId, string name, uint manufacturerId);
    event DrugStateUpdated(uint drugId, State newState);

    // ----------- CORE FUNCTIONS -----------
    function registerManufacturer(string memory _name) public {
        require(addressToManufacturerId[msg.sender] == 0, "This wallet is already registered as a manufacturer.");
        manufacturerCounter++;
        addressToManufacturerId[msg.sender] = manufacturerCounter;
        manufacturers[manufacturerCounter] = Manufacturer(manufacturerCounter, _name, msg.sender, true);
        emit ManufacturerRegistered(manufacturerCounter, _name);
    }

    function addDrug(string memory _name) public onlyManufacturer {
        uint mfgId = addressToManufacturerId[msg.sender];
        drugCounter++;
        
        Drug storage newDrug = drugs[drugCounter];
        newDrug.id = drugCounter;
        newDrug.name = _name;
        newDrug.manufacturerId = mfgId;
        newDrug.currentState = State.Manufactured;
        
        newDrug.history.push(Checkpoint({
            timestamp: block.timestamp,
            scannedBy: msg.sender,
            stateAtScan: State.Manufactured
        }));

        emit DrugAdded(drugCounter, _name, mfgId);
    }

    function updateDrugState(uint _drugId) public {
        require(drugs[_drugId].id != 0, "Drug with this ID does not exist.");
        Drug storage drugToUpdate = drugs[_drugId];
        require(drugToUpdate.currentState != State.Delivered, "Drug has already been delivered.");

        drugToUpdate.currentState = State(uint(drugToUpdate.currentState) + 1);

        drugToUpdate.history.push(Checkpoint({
            timestamp: block.timestamp,
            scannedBy: msg.sender,
            stateAtScan: drugToUpdate.currentState
        }));

        emit DrugStateUpdated(_drugId, drugToUpdate.currentState);
    }
    
    // ----------- GETTER FUNCTIONS -----------
    function getMyManufacturerProfile() public view returns (uint, string memory) {
        uint mfgId = addressToManufacturerId[msg.sender];
        require(mfgId != 0, "You are not a registered manufacturer.");
        return (manufacturers[mfgId].id, manufacturers[mfgId].name);
    }

    function getDrugHistory(uint _drugId) public view returns (Checkpoint[] memory) {
        require(drugs[_drugId].id != 0, "Drug with this ID does not exist.");
        return drugs[_drugId].history;
    }

    function getAllManufacturers() public view returns (uint[] memory, string[] memory) {
        uint[] memory ids = new uint[](manufacturerCounter);
        string[] memory names = new string[](manufacturerCounter);
        for (uint i = 1; i <= manufacturerCounter; i++) {
            ids[i-1] = manufacturers[i].id;
            names[i-1] = manufacturers[i].name;
        }
        return (ids, names);
    }
}
