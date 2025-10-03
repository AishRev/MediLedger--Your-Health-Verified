// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// A single, unified contract for all healthcare functions.
contract HealthChain {

    // ----------- STATE VARIABLES -----------
    uint public patientCounter;
    uint public doctorCounter;

    struct Patient {
        uint id;
        string name;
        uint age;
        address walletAddress;
        bool isRegistered;
        string[] medicalRecords;
        mapping(uint => bool) accessGranted; // doctorId => hasAccess
    }

    struct Doctor {
        uint id;
        string name;
        address walletAddress;
        bool isRegistered;
    }

    // Mappings for direct lookup
    mapping(address => uint) public addressToPatientId;
    mapping(address => uint) public addressToDoctorId;
    mapping(uint => Patient) public patients;
    mapping(uint => Doctor) public doctors;

    // ----------- PATIENT FUNCTIONS -----------
    function registerPatient(string memory _name, uint _age) public {
        require(addressToPatientId[msg.sender] == 0, "This wallet is already registered as a patient.");
        patientCounter++;
        addressToPatientId[msg.sender] = patientCounter;

        Patient storage newPatient = patients[patientCounter];
        newPatient.id = patientCounter;
        newPatient.name = _name;
        newPatient.age = _age;
        newPatient.walletAddress = msg.sender;
        newPatient.isRegistered = true;
    }

    function addRecord(string memory _recordHash) public {
        uint patientId = addressToPatientId[msg.sender];
        require(patientId != 0, "You must be a registered patient to add records.");
        patients[patientId].medicalRecords.push(_recordHash);
    }

    function grantAccessById(uint _doctorId) public {
        uint patientId = addressToPatientId[msg.sender];
        require(patientId != 0, "You must be a registered patient.");
        require(doctors[_doctorId].isRegistered, "Doctor ID does not exist.");
        patients[patientId].accessGranted[_doctorId] = true;
    }

    function getMyPatientProfile() public view returns (uint, string memory, uint, string[] memory) {
        uint patientId = addressToPatientId[msg.sender];
        require(patientId != 0, "Patient not registered.");
        Patient storage p = patients[patientId];
        return (p.id, p.name, p.age, p.medicalRecords);
    }

    // ----------- DOCTOR FUNCTIONS -----------
    function registerDoctor(string memory _name) public {
        require(addressToDoctorId[msg.sender] == 0, "This wallet is already registered as a doctor.");
        doctorCounter++;
        addressToDoctorId[msg.sender] = doctorCounter;
        doctors[doctorCounter] = Doctor(doctorCounter, _name, msg.sender, true);
    }

    function viewRecordsById(uint _patientId) public view returns (string[] memory) {
        uint doctorId = addressToDoctorId[msg.sender];
        require(doctorId != 0, "You must be a registered doctor to view records.");
        require(patients[_patientId].isRegistered, "Patient ID does not exist.");
        require(patients[_patientId].accessGranted[doctorId], "Access denied. The patient has not granted you access to their records.");
        return patients[_patientId].medicalRecords;
    }
    
    function getMyDoctorProfile() public view returns (uint, string memory) {
        uint doctorId = addressToDoctorId[msg.sender];
        require(doctorId != 0, "Doctor not registered.");
        Doctor storage d = doctors[doctorId];
        return (d.id, d.name);
    }

    // ----------- PUBLIC GETTER FUNCTIONS FOR DIRECTORIES -----------
    function getAllDoctors() public view returns (uint[] memory, string[] memory) {
        uint[] memory ids = new uint[](doctorCounter);
        string[] memory names = new string[](doctorCounter);
        for (uint i = 1; i <= doctorCounter; i++) {
            ids[i-1] = doctors[i].id;
            names[i-1] = doctors[i].name;
        }
        return (ids, names);
    }

    function getAllPatients() public view returns (uint[] memory, string[] memory) {
        uint[] memory ids = new uint[](patientCounter);
        string[] memory names = new string[](patientCounter);
        for (uint i = 1; i <= patientCounter; i++) {
            ids[i-1] = patients[i].id;
            names[i-1] = patients[i].name;
        }
        return (ids, names);
    }
}