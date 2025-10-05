// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ClinicalTrial {

    struct Trial {
        uint id;
        string name;
        address researchInstitution;
        bool isActive;
        mapping(uint => bool) participants; // patientId => isParticipant
    }

    struct DataPoint {
        uint timestamp;
        string dataHash; // Hash of anonymized data for AI model building
        address submittedBy;
    }

    uint public trialCounter;
    mapping(uint => Trial) public trials;
    mapping(uint => DataPoint[]) public trialData; // trialId => data points

    event TrialCreated(uint id, string name, address indexed institution);
    event PatientConsented(uint trialId, uint indexed patientId);
    event DataAdded(uint trialId, string dataHash);

    function createTrial(string memory _name) public {
        trialCounter++;
        Trial storage newTrial = trials[trialCounter];
        newTrial.id = trialCounter;
        newTrial.name = _name;
        newTrial.researchInstitution = msg.sender;
        newTrial.isActive = true;
        emit TrialCreated(trialCounter, _name, msg.sender);
    }

    // Called by a patient to join a trial
    function consentToTrial(uint _trialId, uint _patientId) public {
        require(trials[_trialId].isActive, "This trial is no longer active.");
        trials[_trialId].participants[_patientId] = true;
        emit PatientConsented(_trialId, _patientId);
    }

    // Called by the research institution to add tamper-proof data
    function addTrialData(uint _trialId, string memory _dataHash) public {
        require(trials[_trialId].researchInstitution == msg.sender, "Only the research institution can add data.");
        trialData[_trialId].push(DataPoint(block.timestamp, _dataHash, msg.sender));
        emit DataAdded(_trialId, _dataHash);
    }

    function getTrialData(uint _trialId) public view returns (DataPoint[] memory) {
        return trialData[_trialId];
    }
}
