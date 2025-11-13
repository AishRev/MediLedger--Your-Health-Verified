// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract InsuranceClaim {

    struct ClaimDocument {
        string docName;
        string fileHash;
        string decryptionKey;
    }

    struct Claim {
        uint id;
        uint patientId;
        string procedureName;
        address submittedBy;
        Status status;
        address verifier;
        address payer;
        ClaimDocument[] supportingDocuments;
    }

    enum Status { Submitted, VerifiedByDoctor, Approved, Rejected }

    uint public claimCounter;
    mapping(uint => Claim) public claims;
    uint[] public allClaimIds;

    event ClaimSubmitted(uint id, uint indexed patientId, string procedureName);
    event ClaimVerified(uint id, address indexed verifier);
    event ClaimProcessed(uint id, Status newStatus, address indexed payer);

    function submitClaim(uint _patientId, string memory _procedureName, string[] memory _docNames, string[] memory _fileHashes, string[] memory _decryptionKeys) public {
        require(_docNames.length == _fileHashes.length && _fileHashes.length == _decryptionKeys.length, "Document data mismatch");

        claimCounter++;
        Claim storage newClaim = claims[claimCounter];
        newClaim.id = claimCounter;
        newClaim.patientId = _patientId;
        newClaim.procedureName = _procedureName;
        newClaim.submittedBy = msg.sender;
        newClaim.status = Status.Submitted;

        for (uint i = 0; i < _docNames.length; i++) {
            newClaim.supportingDocuments.push(ClaimDocument(_docNames[i], _fileHashes[i], _decryptionKeys[i]));
        }

        allClaimIds.push(claimCounter);
        emit ClaimSubmitted(claimCounter, _patientId, _procedureName);
    }

    // --- FIX: Added the logic for verifyClaim ---
    function verifyClaim(uint _claimId) public {
        Claim storage claim = claims[_claimId];
        require(claim.status == Status.Submitted, "Claim is not in a submittable state.");
        // In a real app, you would add a check here to ensure msg.sender is a registered doctor
        claim.status = Status.VerifiedByDoctor;
        claim.verifier = msg.sender;
        emit ClaimVerified(_claimId, msg.sender);
    }

    // --- FIX: Added the logic for processClaim ---
    function processClaim(uint _claimId, bool _approve) public {
        Claim storage claim = claims[_claimId];
        require(claim.status == Status.VerifiedByDoctor, "Claim must be verified by a doctor first.");
        // In a real app, you would add a check here to ensure msg.sender is a registered insurer
        if (_approve) {
            claim.status = Status.Approved;
        } else {
            claim.status = Status.Rejected;
        }
        claim.payer = msg.sender;
        emit ClaimProcessed(_claimId, claim.status, msg.sender);
    }
    
    function getAllClaimIds() public view returns (uint[] memory) {
        return allClaimIds;
    }

    function getClaimDocuments(uint _claimId) public view returns (ClaimDocument[] memory) {
        // Add security here in a real app (e.g., only doctor/insurer)
        return claims[_claimId].supportingDocuments;
    }
}