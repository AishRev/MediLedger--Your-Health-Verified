// import { useState } from 'react';

// const InsuranceClaimDashboard = ({ contract, setView }) => {
//     const [claimIdToUpdate, setClaimIdToUpdate] = useState('');
//     const [claimDetails, setClaimDetails] = useState(null);
//     const [error, setError] = useState('');

//     const handleTxError = (err) => setError(err.reason || "An error occurred.");
    
//     const handleGetClaimDetails = async () => {
//         if (!claimIdToUpdate) return;
//         setError('');
//         try {
//             const claim = await contract.claims(claimIdToUpdate);
//             if (claim.id === 0n) {
//                 setError("Claim not found.");
//                 setClaimDetails(null);
//                 return;
//             }
//             setClaimDetails(claim);
//         } catch (err) { handleTxError(err); }
//     };

//     const handleVerifyClaim = async () => {
//         if (!claimIdToUpdate) return;
//         try {
//             const tx = await contract.verifyClaim(claimIdToUpdate);
//             await tx.wait();
//             alert('Claim verified by doctor!');
//             handleGetClaimDetails();
//         } catch (err) { handleTxError(err); }
//     };
    
//     const handleProcessClaim = async (isApproved) => {
//         if (!claimIdToUpdate) return;
//         try {
//             const tx = await contract.processClaim(claimIdToUpdate, isApproved);
//             await tx.wait();
//             alert(`Claim has been ${isApproved ? 'Approved' : 'Rejected'}!`);
//             handleGetClaimDetails();
//         } catch (err) { handleTxError(err); }
//     };

//     const getStatusText = (status) => {
//         const statuses = ['Submitted', 'Verified by Doctor', 'Approved', 'Rejected'];
//         return statuses[Number(status)];
//     };

//     return (
//         <div className="dashboard">
//             <div className="dashboard-header">
//                 <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
//                 <h2>Insurance Claim Portal</h2>
//             </div>
//             {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}

//             <div className="dashboard-content">
//                 <div className="dashboard-section">
//                     <h2>Claim Processing</h2>
//                     <p>This portal is for Doctors to verify claims and Insurers to process them.</p>
//                     <input type="number" placeholder="Enter Claim ID to manage" value={claimIdToUpdate} onChange={e => setClaimIdToUpdate(e.target.value)} />
//                     <button onClick={handleGetClaimDetails}>Fetch Claim Details</button>
//                 </div>

//                 {claimDetails && (
//                     <div className="dashboard-section">
//                         <h3>Claim #{Number(claimDetails.id)} Details</h3>
//                         <p><strong>Patient ID:</strong> {Number(claimDetails.patientId)}</p>
//                         <p><strong>Procedure:</strong> {claimDetails.procedureName}</p>
//                         <p><strong>Submitted By (Patient Wallet):</strong> {claimDetails.submittedBy}</p>
//                         <p><strong>Status:</strong> <strong style={{color: 'var(--primary-color)'}}>{getStatusText(claimDetails.status)}</strong></p>
//                         {Number(claimDetails.status) > 0 && <p><strong>Verified By (Doctor Wallet):</strong> {claimDetails.verifier}</p>}
//                         {Number(claimDetails.status) > 1 && <p><strong>Processed By (Insurer Wallet):</strong> {claimDetails.payer}</p>}
//                         <hr style={{margin: '1rem 0'}}/>
//                         <h4>Actions:</h4>
//                         <div className="button-group">
//                             <button onClick={handleVerifyClaim}>Verify as Doctor</button>
//                             <button onClick={() => handleProcessClaim(true)}>Approve as Insurer</button>
//                             <button onClick={() => handleProcessClaim(false)}>Reject as Insurer</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default InsuranceClaimDashboard;


import { useState } from 'react';

const InsuranceClaimDashboard = ({ contract, setView }) => {
    const [claimIdToUpdate, setClaimIdToUpdate] = useState('');
    const [claimDetails, setClaimDetails] = useState(null);
    const [claimDocuments, setClaimDocuments] = useState([]);
    const [error, setError] = useState('');

    const handleTxError = (err) => setError(err.reason || "An error occurred.");
    
    const handleGetClaimDetails = async () => {
        if (!claimIdToUpdate) return;
        setError('');
        setClaimDocuments([]);
        try {
            const claim = await contract.claims(claimIdToUpdate);
            if (claim.id === 0n) {
                setError("Claim not found.");
                setClaimDetails(null);
                return;
            }
            setClaimDetails(claim);
            const documents = await contract.getClaimDocuments(claimIdToUpdate);
            setClaimDocuments(documents);
        } catch (err) { handleTxError(err); }
    };

    // --- FIX: Added the logic for the handler functions ---
    const handleVerifyClaim = async () => {
        if (!claimIdToUpdate) return;
        try {
            const tx = await contract.verifyClaim(claimIdToUpdate);
            await tx.wait();
            alert('Claim verified by doctor!');
            handleGetClaimDetails(); // Refresh details
        } catch (err) { handleTxError(err); }
    };
    
    const handleProcessClaim = async (isApproved) => {
        if (!claimIdToUpdate) return;
        try {
            const tx = await contract.processClaim(claimIdToUpdate, isApproved);
            await tx.wait();
            alert(`Claim has been ${isApproved ? 'Approved' : 'Rejected'}!`);
            handleGetClaimDetails(); // Refresh details
        } catch (err) { handleTxError(err); }
    };

    const getStatusText = (status) => {
        const statuses = ['Submitted', 'Verified by Doctor', 'Approved', 'Rejected'];
        return statuses[Number(status)];
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
                <h2>Insurance Claim Portal</h2>
            </div>
            {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}

            <div className="dashboard-content">
                <div className="dashboard-section">
                    <h2>Claim Processing</h2>
                    <p>This portal is for Doctors to verify claims and Insurers to process them.</p>
                    <input type="number" placeholder="Enter Claim ID to manage" value={claimIdToUpdate} onChange={e => setClaimIdToUpdate(e.target.value)} />
                    <button onClick={handleGetClaimDetails}>Fetch Claim Details</button>
                </div>

                {claimDetails && (
                    <div className="dashboard-section">
                        <h3>Claim #{Number(claimDetails.id)} Details</h3>
                        <p><strong>Patient ID:</strong> P{Number(claimDetails.patientId)}</p>
                        <p><strong>Procedure:</strong> {claimDetails.procedureName}</p>
                        <p><strong>Status:</strong> <strong style={{color: 'var(--primary-color)'}}>{getStatusText(claimDetails.status)}</strong></p>
                        
                        <h4>Supporting Documents (with Keys)</h4>
                        {claimDocuments.length > 0 ? (
                            <ul className="record-list">
                                <li className="record-header">
                                    <span>Document Name</span>
                                    <span>Decryption Key</span>
                                    <span>File Hash (Proof)</span>
                                </li>
                                {claimDocuments.map((doc, i) => (
                                    <li key={i}>
                                        <span>{doc.docName}</span>
                                        <span className="key">{doc.decryptionKey}</span>
                                        <span className="hash">{doc.fileHash.substring(0, 16)}...</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No documents were submitted with this claim.</p>}

                        <hr style={{margin: '1rem 0'}}/>
                        <h4>Actions:</h4>
                        <div className="button-group">
                            <button onClick={handleVerifyClaim}>Verify as Doctor</button>
                            <button onClick={() => handleProcessClaim(true)}>Approve as Insurer</button>
                            <button onClick={() => handleProcessClaim(false)}>Reject as Insurer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsuranceClaimDashboard;