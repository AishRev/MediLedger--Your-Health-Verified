// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract InsuranceClaim {

    struct Claim {
        uint id;
        uint patientId;
        string procedureName;
        address submittedBy; // Patient's wallet address
        Status status;
        address verifier; // Doctor's wallet address
        address payer; // Insurance company's wallet address
    }

    enum Status { Submitted, VerifiedByDoctor, Approved, Rejected }

    uint public claimCounter;
    mapping(uint => Claim) public claims;
    // --- NEW: A list of all claim IDs for easy retrieval ---
    uint[] public allClaimIds;

    event ClaimSubmitted(uint id, uint indexed patientId, string procedureName);
    event ClaimVerified(uint id, address indexed verifier);
    event ClaimProcessed(uint id, Status newStatus, address indexed payer);

    function submitClaim(uint _patientId, string memory _procedureName) public {
        claimCounter++;
        claims[claimCounter] = Claim(claimCounter, _patientId, _procedureName, msg.sender, Status.Submitted, address(0), address(0));
        allClaimIds.push(claimCounter); // Add to the global list
        emit ClaimSubmitted(claimCounter, _patientId, _procedureName);
    }

    function verifyClaim(uint _claimId) public {
        Claim storage claim = claims[_claimId];
        require(claim.status == Status.Submitted, "Claim is not in a submittable state.");
        claim.status = Status.VerifiedByDoctor;
        claim.verifier = msg.sender;
        emit ClaimVerified(_claimId, msg.sender);
    }

    function processClaim(uint _claimId, bool _approve) public {
        Claim storage claim = claims[_claimId];
        require(claim.status == Status.VerifiedByDoctor, "Claim must be verified by a doctor first.");
        if (_approve) {
            claim.status = Status.Approved;
        } else {
            claim.status = Status.Rejected;
        }
        claim.payer = msg.sender;
        emit ClaimProcessed(_claimId, claim.status, msg.sender);
    }
    
    // --- NEW: A function to get all claim IDs ---
    function getAllClaimIds() public view returns (uint[] memory) {
        return allClaimIds;
    }
}

