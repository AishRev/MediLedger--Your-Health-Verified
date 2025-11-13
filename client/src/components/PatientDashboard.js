// import { useState, useEffect, useCallback } from 'react';

// const PatientDashboard = ({ healthContract, trialContract, claimContract, setView }) => {
//     const [patientView, setPatientView] = useState('loading'); // loading, register, dashboard
//     const [nav, setNav] = useState('profile'); // profile, records, trials, claims

//     const [patientInfo, setPatientInfo] = useState(null);
//     const [allDoctors, setAllDoctors] = useState([]);
//     const [myClaims, setMyClaims] = useState([]);
    
//     // Form Inputs
//     const [patientNameInput, setPatientNameInput] = useState('');
//     const [patientAgeInput, setPatientAgeInput] = useState('');
//     const [recordHashInput, setRecordHashInput] = useState('');
//     const [selectedDoctorId, setSelectedDoctorId] = useState('');
//     const [trialIdToJoin, setTrialIdToJoin] = useState('');
//     const [procedureForClaim, setProcedureForClaim] = useState('');
    
//     const [error, setError] = useState('');
    
//     const handleTxError = (err) => { setError(err.reason || "An error occurred.") };

//     const getStatusText = (status) => {
//         const statuses = ['Submitted', 'Verified by Doctor', 'Approved', 'Rejected'];
//         return statuses[Number(status)];
//     };

//     const loadInitialData = useCallback(async () => {
//         if (healthContract && claimContract) {
//             try {
//                 const data = await healthContract.getMyPatientProfile();
//                 const patientProfile = { id: Number(data[0]), name: data[1], age: data[2].toString(), records: data[3] };
//                 setPatientInfo(patientProfile);
//                 setPatientView('dashboard');

//                 const [docIds, docNames] = await healthContract.getAllDoctors();
//                 const doctorsList = docNames.map((name, i) => ({ id: Number(docIds[i]), name }));
//                 setAllDoctors(doctorsList);
//                 if (doctorsList.length > 0) setSelectedDoctorId(doctorsList[0].id);

//                 const allClaimIds = await claimContract.getAllClaimIds();
//                 const claimsDetails = await Promise.all(
//                     allClaimIds.map(id => claimContract.claims(id))
//                 );
//                 const filteredClaims = claimsDetails.filter(claim => Number(claim.patientId) === patientProfile.id);
//                 setMyClaims(filteredClaims);

//             } catch (err) {
//                 setPatientView('register');
//             }
//         }
//     }, [healthContract, claimContract]);

//     useEffect(() => { loadInitialData(); }, [loadInitialData]);

//     const handleRegisterPatient = async () => {
//         if (!patientNameInput || !patientAgeInput) return;
//         try {
//             const tx = await healthContract.registerPatient(patientNameInput, parseInt(patientAgeInput));
//             await tx.wait();
//             await loadInitialData();
//         } catch (err) { handleTxError(err); }
//     };

//     const handleAddRecord = async () => {
//         if (!recordHashInput) return;
//         try {
//             const tx = await healthContract.addRecord(recordHashInput);
//             await tx.wait();
//             setPatientInfo(prev => ({ ...prev, records: [...prev.records, recordHashInput] }));
//             setRecordHashInput('');
//         } catch (err) { handleTxError(err); }
//     };

//     const handleGrantAccess = async () => {
//         if (!selectedDoctorId) return;
//         try {
//             const tx = await healthContract.grantAccessById(selectedDoctorId);
//             await tx.wait();
//             alert(`Access granted to Doctor ID: D${selectedDoctorId}`);
//         } catch (err) { handleTxError(err); }
//     };

//     const handleConsentToTrial = async () => {
//         if (!trialIdToJoin) return;
//         try {
//             const tx = await trialContract.consentToTrial(trialIdToJoin, patientInfo.id);
//             await tx.wait();
//             alert(`You have successfully consented to join Trial #${trialIdToJoin}`);
//         } catch (err) { handleTxError(err); }
//     };

//     const handleSubmitClaim = async () => {
//         if (!procedureForClaim) return;
//         try {
//             claimContract.once("ClaimSubmitted", (id, patientId) => {
//                 if(Number(patientId) === patientInfo.id) {
//                     alert(`Claim for '${procedureForClaim}' submitted successfully! Your Claim ID is ${Number(id)}.`);
//                     loadInitialData();
//                 }
//             });
//             const tx = await claimContract.submitClaim(patientInfo.id, procedureForClaim);
//             await tx.wait();
//         } catch (err) { handleTxError(err); }
//     };

//     const renderRegisterView = () => (
//         <div className="dashboard-content">
//             <div className="dashboard-section">
//                 <h2>Register as a New Patient</h2>
//                 <p>Welcome! It looks like you're not in our system yet. Please provide your details to get started.</p>
//                 <input type="text" placeholder="Enter Your Name" value={patientNameInput} onChange={e => setPatientNameInput(e.target.value)} />
//                 <input type="number" placeholder="Enter Your Age" value={patientAgeInput} onChange={e => setPatientAgeInput(e.target.value)} />
//                 <button onClick={handleRegisterPatient}>Register</button>
//             </div>
//         </div>
//     );
    
//     const renderDashboardView = () => (
//         <>
//             <div className="dashboard-nav">
//                 <button className={`nav-tab ${nav === 'profile' ? 'active' : ''}`} onClick={() => setNav('profile')}>My Profile</button>
//                 <button className={`nav-tab ${nav === 'records' ? 'active' : ''}`} onClick={() => setNav('records')}>Manage Records</button>
//                 <button className={`nav-tab ${nav === 'trials' ? 'active' : ''}`} onClick={() => setNav('trials')}>Clinical Trials</button>
//                 <button className={`nav-tab ${nav === 'claims' ? 'active' : ''}`} onClick={() => setNav('claims')}>Insurance Claims</button>
//             </div>
//             <div className="dashboard-content">
//                 {nav === 'profile' && (
//                     <div className="dashboard-section">
//                         <h2>Patient Profile</h2>
//                         <p><strong>Patient ID:</strong> P{patientInfo?.id}</p>
//                         <p><strong>Name:</strong> {patientInfo?.name}</p>
//                         <p><strong>Age:</strong> {patientInfo?.age}</p>
//                     </div>
//                 )}
//                 {nav === 'records' && (
//                     <>
//                         <div className="dashboard-section">
//                             <h3>Your Medical Records</h3>
//                              <ul>{patientInfo?.records.length > 0 ? patientInfo.records.map((r, i) => <li key={i}>{r}</li>) : <li>No records have been added yet.</li>}</ul>
//                         </div>
//                         <div className="dashboard-section">
//                             <h3>Add a New Medical Record</h3>
//                             <input type="text" placeholder="Enter Record Hash / URL" value={recordHashInput} onChange={e => setRecordHashInput(e.target.value)} />
//                             <button onClick={handleAddRecord}>Add Record</button>
//                         </div>
//                         <div className="dashboard-section">
//                             <h3>Grant Record Access to a Doctor</h3>
//                             {allDoctors.length > 0 ? (
//                                 <div className="button-group">
//                                     <select value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
//                                         {allDoctors.map(doc => <option key={doc.id} value={doc.id}>D{doc.id} - {doc.name}</option>)}
//                                     </select>
//                                     <button onClick={handleGrantAccess}>Grant Access</button>
//                                 </div>
//                             ) : <p>No doctors are currently registered in the system.</p>}
//                         </div>
//                     </>
//                 )}
//                 {nav === 'trials' && (
//                      <div className="dashboard-section">
//                         <h3>Join a Clinical Trial</h3>
//                         <input type="number" placeholder="Enter Trial ID" value={trialIdToJoin} onChange={e => setTrialIdToJoin(e.target.value)} />
//                         <button onClick={handleConsentToTrial}>Consent & Join</button>
//                     </div>
//                 )}
//                 {nav === 'claims' && (
//                     <div className="dashboard-section">
//                         <h3>Submit an Insurance Claim</h3>
//                         <input type="text" placeholder="Procedure Name (e.g., 'Annual Check-up')" value={procedureForClaim} onChange={e => setProcedureForClaim(e.target.value)} />
//                         <button onClick={handleSubmitClaim}>Submit Claim</button>
//                         <hr style={{margin: '2rem 0'}}/>
//                         <h3>Your Submitted Claims</h3>
//                         {myClaims.length > 0 ? (
//                             <ul>
//                                 {myClaims.map(claim => (
//                                     <li key={Number(claim.id)}>
//                                         <strong>Claim ID: {Number(claim.id)}</strong> - {claim.procedureName}
//                                         <br/>
//                                         <small>Status: {getStatusText(claim.status)}</small>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : <p>You have not submitted any claims yet.</p>}
//                     </div>
//                 )}
//             </div>
//         </>
//     );

//     return (
//         <div className="dashboard">
//              <div className="dashboard-header">
//                 <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
//                 <h2>Patient Portal</h2>
//             </div>
//             {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}
            
//             {patientView === 'loading' && <div className="dashboard-content"><p>Loading your information...</p></div>}
//             {patientView === 'register' && renderRegisterView()}
//             {patientView === 'dashboard' && renderDashboardView()}
//         </div>
//     );
// };

// export default PatientDashboard;


import { useState, useEffect, useCallback } from 'react';

// --- NEW, CORRECTED HELPER FUNCTION ---
// This function generates a random *valid* hex string
const generateHex = (length) => {
  let result = '';
  const characters = '0123456789abcdef'; // Valid hex characters
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return '0x' + result;
};

// This function can still be used for simple, non-hex IDs
const generateId = (length) => (Math.random().toString(36).substring(2, 2 + length)).toUpperCase();

const PatientDashboard = ({ healthContract, trialContract, claimContract, setView }) => {
    const [patientView, setPatientView] = useState('loading'); // loading, register, dashboard
    const [nav, setNav] = useState('profile'); // profile, records, trials, claims
    const [patientInfo, setPatientInfo] = useState(null);
    const [allDoctors, setAllDoctors] = useState([]);
    const [myClaims, setMyClaims] = useState([]);
    
    // Form Inputs
    const [patientNameInput, setPatientNameInput] = useState('');
    const [patientAgeInput, setPatientAgeInput] = useState('');
    const [recordName, setRecordName] = useState('');
    const [recordFile, setRecordFile] = useState(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [trialIdToJoin, setTrialIdToJoin] = useState('');
    const [procedureForClaim, setProcedureForClaim] = useState('');
    const [claimFile, setClaimFile] = useState(null);

    const [error, setError] = useState('');
    
    const handleTxError = (err) => { setError(err.reason || "An error occurred.") };

    const getStatusText = (status) => {
        const statuses = ['Submitted', 'Verified by Doctor', 'Approved', 'Rejected'];
        return statuses[Number(status)];
    };

    const loadInitialData = useCallback(async () => {
        if (healthContract && claimContract) {
            setError('');
            let profile;
            try {
                const data = await healthContract.getMyPatientProfile();
                profile = { id: Number(data[0]), name: data[1], age: data[2].toString(), records: data[3] };
                setPatientInfo(profile);
                setPatientView('dashboard');
            } catch (err) {
                setPatientView('register');
                return;
            }

            try {
                const [docIds, docNames] = await healthContract.getAllDoctors();
                const doctorsList = docNames.map((name, i) => ({ id: Number(docIds[i]), name }));
                setAllDoctors(doctorsList);
                if (doctorsList.length > 0) setSelectedDoctorId(doctorsList[0].id);
            } catch (err) {
                console.error("Could not fetch doctor list:", err);
                setError("Could not fetch doctor directory. This is a critical sync issue. Please perform a Hard Reset.");
            }

            try {
                const allClaimIds = await claimContract.getAllClaimIds();
                const claimsDetails = await Promise.all(
                    allClaimIds.map(id => claimContract.claims(id))
                );
                // Important: Check if profile exists before filtering
                if (profile) {
                    const filteredClaims = claimsDetails.filter(claim => Number(claim.patientId) === profile.id);
                    setMyClaims(filteredClaims);
                }
            } catch (err) {
                console.error("Could not fetch claims:", err);
                setError("Could not fetch claim information.");
            }
        }
    }, [healthContract, claimContract]);

    useEffect(() => { loadInitialData(); }, [loadInitialData]);

    const handleRegisterPatient = async () => {
        if (!patientNameInput || !patientAgeInput) return;
        try {
            const tx = await healthContract.registerPatient(patientNameInput, parseInt(patientAgeInput));
            await tx.wait();
            await loadInitialData();
        } catch (err) { handleTxError(err); }
    };

    const handleAddRecord = async () => {
        if (!recordName || !recordFile) {
            setError("Please provide a name and select a file.");
            return;
        }
        setError('');
        try {
            const fileHash = generateHex(64); // Use valid hex
            const decryptionKey = `KEY-${generateId(4)}-${generateId(8)}`;
            
            const tx = await healthContract.addRecord(recordName, fileHash, decryptionKey);
            await tx.wait();
            
            const newRecord = { recordName, fileHash, decryptionKey };
            setPatientInfo(prev => ({ ...prev, records: [...prev.records, newRecord] }));
            setRecordName('');
            setRecordFile(null);
        } catch (err) { handleTxError(err); }
    };

    const handleGrantAccess = async () => {
        if (!selectedDoctorId) return;
        try {
            const tx = await healthContract.grantAccessById(selectedDoctorId);
            await tx.wait();
            alert(`Access granted to Doctor ID: D${selectedDoctorId}`);
        } catch (err) { handleTxError(err); }
    };

    const handleConsentToTrial = async () => {
        if (!trialIdToJoin) return;
        try {
            const tx = await trialContract.consentToTrial(trialIdToJoin, patientInfo.id);
            await tx.wait();
            alert(`You have successfully consented to join Trial #${trialIdToJoin}`);
        } catch (err) { handleTxError(err); }
    };

    const handleSubmitClaim = async () => {
        if (!procedureForClaim || !claimFile) {
            setError("Please provide a procedure name and select a file.");
            return;
        }
        setError('');
        try {
            const docName = claimFile.name;
            const fileHash = generateHex(64); // Use valid hex
            const decryptionKey = `CLAIM-KEY-${generateId(6)}`;
            
            claimContract.once("ClaimSubmitted", (id, patientId) => {
                if(Number(patientId) === patientInfo.id) {
                    alert(`Claim for '${procedureForClaim}' submitted successfully! Your Claim ID is ${Number(id)}.`);
                    loadInitialData();
                    setProcedureForClaim('');
                    setClaimFile(null);
                }
            });
            const tx = await claimContract.submitClaim(
                patientInfo.id, 
                procedureForClaim,
                [docName],
                [fileHash],
                [decryptionKey]
            );
            await tx.wait();
        } catch (err) { handleTxError(err); }
    };

    const renderRegisterView = () => (
        <div className="dashboard-content">
            <div className="dashboard-section">
                <h2>Register as a New Patient</h2>
                <p>Welcome! Please provide your details to get started.</p>
                <input type="text" placeholder="Enter Your Name" value={patientNameInput} onChange={e => setPatientNameInput(e.target.value)} />
                <input type="number" placeholder="Enter Your Age" value={patientAgeInput} onChange={e => setPatientAgeInput(e.target.value)} />
                <button onClick={handleRegisterPatient}>Register</button>
            </div>
        </div>
    );
    
    const renderDashboardView = () => (
        <>
            <div className="dashboard-nav">
                <button className={`nav-tab ${nav === 'profile' ? 'active' : ''}`} onClick={() => setNav('profile')}>My Profile</button>
                <button className={`nav-tab ${nav === 'records' ? 'active' : ''}`} onClick={() => setNav('records')}>Manage Records</button>
                <button className={`nav-tab ${nav === 'trials' ? 'active' : ''}`} onClick={() => setNav('trials')}>Clinical Trials</button>
                <button className={`nav-tab ${nav === 'claims' ? 'active' : ''}`} onClick={() => setNav('claims')}>Insurance Claims</button>
            </div>
            <div className="dashboard-content">
                {nav === 'profile' && (
                    <div className="dashboard-section">
                        <h2>Patient Profile</h2>
                        <p><strong>Patient ID:</strong> P{patientInfo?.id}</p>
                        <p><strong>Name:</strong> {patientInfo?.name}</p>
                        <p><strong>Age:</strong> {patientInfo?.age}</p>
                    </div>
                )}
                {nav === 'records' && (
                    <>
                        <div className="dashboard-section">
                            <h3>Add a New Medical Record</h3>
                            <input type="text" placeholder="Record Name (e.g., 'Blood Test 05/10/25')" value={recordName} onChange={e => setRecordName(e.target.value)} />
                            <label className="file-input-label">
                                {recordFile ? recordFile.name : "Click to select a file (simulated)"}
                                <input type="file" onChange={(e) => setRecordFile(e.target.files[0])} />
                            </label>
                            <button onClick={handleAddRecord}>Add Record (Generates Key & Hash)</button>
                        </div>
                        <div className="dashboard-section">
                            <h3>Your Medical Records</h3>
                             {patientInfo?.records.length > 0 ? (
                                <ul className="record-list">
                                    <li className="record-header">
                                        <span>Record Name</span>
                                        <span>Decryption Key</span>
                                        <span>File Hash (Proof)</span>
                                    </li>
                                    {patientInfo.records.map((r, i) => (
                                        <li key={i}>
                                            <span>{r.recordName}</span>
                                            <span className="key">{r.decryptionKey}</span>
                                            <span className="hash">{r.fileHash.substring(0, 16)}...</span>
                                        </li>
                                    ))}
                                </ul>
                             ) : <li>No records have been added yet.</li>}
                        </div>
                        <div className="dashboard-section">
                            <h3>Grant Record Access to a Doctor</h3>
                            {allDoctors.length > 0 ? (
                                <div className="button-group">
                                    <select value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
                                        {allDoctors.map(doc => <option key={doc.id} value={doc.id}>D{doc.id} - {doc.name}</option>)}
                                    </select>
                                    <button onClick={handleGrantAccess}>Grant Access</button>
                                </div>
                            ) : <p>No doctors are currently registered in the system.</p>}
                        </div>
                    </>
                )}
                {nav === 'trials' && (
                     <div className="dashboard-section">
                        <h3>Join a Clinical Trial</h3>
                        <p>Consent to join a trial. This allows the research institution to verify your participation.</p>
                        <input type="number" placeholder="Enter Trial ID" value={trialIdToJoin} onChange={e => setTrialIdToJoin(e.target.value)} />
                        <button onClick={handleConsentToTrial}>Consent & Join</button>
                    </div>
                )}
                {nav === 'claims' && (
                    <div className="dashboard-section">
                        <h3>Submit an Insurance Claim</h3>
                        <input type="text" placeholder="Procedure Name (e.g., 'Annual Check-up')" value={procedureForClaim} onChange={e => setProcedureForClaim(e.target.value)} />
                        <label className="file-input-label">
                            {claimFile ? claimFile.name : "Upload Supporting Document (simulated)"}
                            <input type="file" onChange={(e) => setClaimFile(e.target.files[0])} />
                        </label>
                        <button onClick={handleSubmitClaim}>Submit Claim (Generates Key & Hash)</button>
                        <hr style={{margin: '2rem 0'}}/>
                        <h3>Your Submitted Claims</h3>
                        {myClaims.length > 0 ? (
                            <ul className="record-list">
                                <li className="record-header">
                                    <span>Claim ID</span>
                                    <span>Procedure</span>
                                    <span>Status</span>
                                </li>
                                {myClaims.map(claim => (
                                    <li key={Number(claim.id)}>
                                        <span>{Number(claim.id)}</span>
                                        <span>{claim.procedureName}</span>
                                        <span className="status">{getStatusText(claim.status)}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p>You have not submitted any claims yet.</p>}
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className="dashboard">
             <div className="dashboard-header">
                <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
                <h2>Patient Portal</h2>
            </div>
            {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}
            
            {patientView === 'loading' && <div className="dashboard-content"><p>Loading your information...</p></div>}
            {patientView === 'register' && renderRegisterView()}
            {patientView === 'dashboard' && renderDashboardView()}
        </div>
    );
};

export default PatientDashboard;