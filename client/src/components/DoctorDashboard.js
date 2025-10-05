
// import { useState, useEffect, useCallback } from 'react';

// const DoctorDashboard = ({ contract, account, setView }) => {
//     const [doctorView, setDoctorView] = useState('loading');
//     const [doctorInfo, setDoctorInfo] = useState(null);
//     const [allPatients, setAllPatients] = useState([]);
    
//     const [doctorNameInput, setDoctorNameInput] = useState('');
//     const [patientIdInput, setPatientIdInput] = useState('');
//     const [recordsForPatient, setRecordsForPatient] = useState([]);
    
//     const [error, setError] = useState('');

//     const handleTxError = (err) => { setError(err.reason || "An error occurred.") };

//     const loadInitialData = useCallback(async () => {
//         if (contract) {
//             setError('');
//             try {
//                 // Check if the current user is a registered doctor
//                 const data = await contract.getMyDoctorProfile();
//                 setDoctorInfo({ id: `D${Number(data[0])}`, name: data[1] });
//                 setDoctorView('dashboard');
//             } catch (err) {
//                 // This is expected if they are not yet registered
//                 setDoctorView('register');
//             }
//             try {
//                 // Fetch the patient directory regardless of registration status
//                 const [patientIds, patientNames] = await contract.getAllPatients();
//                 setAllPatients(patientNames.map((name, i) => ({ id: Number(patientIds[i]), name })));
//             } catch (err) {
//                 console.warn("Could not fetch patient directory, it might be empty.", err);
//             }
//         }
//     }, [contract]);

//     useEffect(() => {
//         loadInitialData();
//     }, [loadInitialData]);

//     const handleRegisterDoctor = async () => {
//         if (!doctorNameInput) return;
//         try {
//             const tx = await contract.registerDoctor(doctorNameInput);
//             await tx.wait();
//             // Reload all data to reflect the new registration status
//             await loadInitialData();
//         } catch (err) { handleTxError(err); }
//     };

//     const handleViewRecords = async () => {
//         const patientId = patientIdInput.toUpperCase().replace('P', '');
//         if (!patientId) return;
//         setError('');
//         setRecordsForPatient([]);
//         try {
//             const records = await contract.viewRecordsById(patientId);
//             setRecordsForPatient(records);
//             if (records.length === 0) {
//                 setError("No records found for this patient.");
//             }
//         } catch (err) { 
//             setError(err.reason || "Could not view records. Ensure the patient ID is correct and you have been granted access.");
//         }
//     };

//     const renderRegisterView = () => (
//         <div className="dashboard-content">
//             <div className="dashboard-section">
//                 <h2>Register as a Doctor</h2>
//                 <p>You are not yet registered. Please provide your name to join the network.</p>
//                 <input type="text" placeholder="Enter Your Full Name" value={doctorNameInput} onChange={e => setDoctorNameInput(e.target.value)} />
//                 <button onClick={handleRegisterDoctor}>Register</button>
//             </div>
//         </div>
//     );

//     const renderDashboardView = () => (
//          <div className="dashboard-content">
//             <div className="dashboard-section">
//                 <h2>Doctor Profile</h2>
//                 <p><strong>Doctor ID:</strong> {doctorInfo?.id}</p>
//                 <p><strong>Name:</strong> {doctorInfo?.name}</p>
//             </div>
//             <div className="dashboard-section">
//                 <h3>View Patient Records</h3>
//                 <p>Enter a Patient ID (e.g., P1) to retrieve their records.</p>
//                 <input type="text" placeholder="P1" value={patientIdInput} onChange={e => setPatientIdInput(e.target.value)} />
//                 <button onClick={handleViewRecords}>View Records</button>
//                 {recordsForPatient.length > 0 && (
//                     <div style={{marginTop: '1rem'}}>
//                         <h4>Records for Patient {patientIdInput.toUpperCase()}:</h4>
//                         <ul>{recordsForPatient.map((r, i) => <li key={i}>{r}</li>)}</ul>
//                     </div>
//                 )}
//             </div>
//             <div className="dashboard-section">
//                 <h3>Patient Directory</h3>
//                 {allPatients.length > 0 ? (
//                     <ul>{allPatients.map(p => <li key={p.id}><strong>P{p.id}</strong> - {p.name}</li>)}</ul>
//                 ) : <p>No patients are registered in the system yet.</p>}
//             </div>
//         </div>
//     );

//     return (
//         <div className="dashboard">
//              <div className="dashboard-header">
//                 <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
//                 <h2>Doctor Portal</h2>
//             </div>
//             {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}
            
//             {doctorView === 'loading' && <div className="dashboard-content"><p>Loading your information...</p></div>}
//             {doctorView === 'register' && renderRegisterView()}
//             {doctorView === 'dashboard' && renderDashboardView()}
//         </div>
//     );
// };

// export default DoctorDashboard;


import { useState, useEffect, useCallback } from 'react';

const DoctorDashboard = ({ healthContract, claimContract, setView }) => {
    const [doctorView, setDoctorView] = useState('loading');
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [allPatients, setAllPatients] = useState([]);
    const [pendingClaims, setPendingClaims] = useState([]);
    
    const [doctorNameInput, setDoctorNameInput] = useState('');
    const [patientIdInput, setPatientIdInput] = useState('');
    const [recordsForPatient, setRecordsForPatient] = useState([]);
    
    const [error, setError] = useState('');

    const handleTxError = (err) => { setError(err.reason || "An error occurred.") };

    const loadInitialData = useCallback(async () => {
        if (healthContract && claimContract) {
            try {
                const data = await healthContract.getMyDoctorProfile();
                setDoctorInfo({ id: `D${Number(data[0])}`, name: data[1] });
                setDoctorView('dashboard');

                const [patientIds, patientNames] = await healthContract.getAllPatients();
                setAllPatients(patientNames.map((name, i) => ({ id: Number(patientIds[i]), name })));

                const allClaimIds = await claimContract.getAllClaimIds();
                const claimsDetails = await Promise.all(
                    allClaimIds.map(id => claimContract.claims(id))
                );
                const filteredClaims = claimsDetails.filter(claim => Number(claim.status) === 0);
                setPendingClaims(filteredClaims);

            } catch (err) {
                setDoctorView('register');
            }
        }
    }, [healthContract, claimContract]);

    useEffect(() => { loadInitialData(); }, [loadInitialData]);

    const handleRegisterDoctor = async () => {
        if (!doctorNameInput) return;
        try {
            const tx = await healthContract.registerDoctor(doctorNameInput);
            await tx.wait();
            await loadInitialData();
        } catch (err) { handleTxError(err); }
    };
    
    const handleViewRecords = async () => {
        const patientId = patientIdInput.toUpperCase().replace('P', '');
        if (!patientId) return;
        setError('');
        setRecordsForPatient([]);
        try {
            const records = await healthContract.viewRecordsById(patientId);
            setRecordsForPatient(records);
            if (records.length === 0) {
                setError("No records found for this patient.");
            }
        } catch (err) { 
            setError(err.reason || "Could not view records. Ensure the patient ID is correct and you have been granted access.");
        }
    };

    const handleVerifyClaim = async (claimId) => {
        try {
            const tx = await claimContract.verifyClaim(claimId);
            await tx.wait();
            alert(`Claim #${claimId} verified successfully!`);
            loadInitialData(); // Refresh the list
        } catch (err) {
            handleTxError(err);
        }
    };

    const renderRegisterView = () => (
        <div className="dashboard-content">
            <div className="dashboard-section">
                <h2>Register as a Doctor</h2>
                <p>You are not yet registered. Please provide your name to join the network.</p>
                <input type="text" placeholder="Enter Your Full Name" value={doctorNameInput} onChange={e => setDoctorNameInput(e.target.value)} />
                <button onClick={handleRegisterDoctor}>Register</button>
            </div>
        </div>
    );

    const renderDashboardView = () => (
         <div className="dashboard-content">
            <div className="dashboard-section">
                <h2>Doctor Profile</h2>
                <p><strong>Doctor ID:</strong> {doctorInfo?.id}</p>
                <p><strong>Name:</strong> {doctorInfo?.name}</p>
            </div>
            <div className="dashboard-section">
                <h3>Claims Awaiting Your Verification</h3>
                {pendingClaims.length > 0 ? (
                    <ul>
                        {pendingClaims.map(claim => (
                            <li key={Number(claim.id)}>
                                <strong>Claim ID: {Number(claim.id)}</strong> - for Patient ID: {Number(claim.patientId)}
                                <br/>
                                <small>Procedure: {claim.procedureName}</small>
                                <button style={{float: 'right', marginTop: '-10px'}} onClick={() => handleVerifyClaim(claim.id)}>Verify</button>
                            </li>
                        ))}
                    </ul>
                ) : <p>There are no claims awaiting verification.</p>}
            </div>
            <div className="dashboard-section">
                <h3>View Patient Records</h3>
                <p>Enter a Patient ID (e.g., P1) to retrieve their records.</p>
                <input type="text" placeholder="P1" value={patientIdInput} onChange={e => setPatientIdInput(e.target.value)} />
                <button onClick={handleViewRecords}>View Records</button>
                {recordsForPatient.length > 0 && (
                    <div style={{marginTop: '1rem'}}>
                        <h4>Records for Patient {patientIdInput.toUpperCase()}:</h4>
                        <ul>{recordsForPatient.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    </div>
                )}
            </div>
            <div className="dashboard-section">
                <h3>Patient Directory</h3>
                {allPatients.length > 0 ? (
                    <ul>{allPatients.map(p => <li key={p.id}><strong>P{p.id}</strong> - {p.name}</li>)}</ul>
                ) : <p>No patients are registered in the system yet.</p>}
            </div>
        </div>
    );

    return (
        <div className="dashboard">
             <div className="dashboard-header">
                <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
                <h2>Doctor Portal</h2>
            </div>
            {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}
            
            {doctorView === 'loading' && <div className="dashboard-content"><p>Loading your information...</p></div>}
            {doctorView === 'register' && renderRegisterView()}
            {doctorView === 'dashboard' && renderDashboardView()}
        </div>
    );
};

export default DoctorDashboard;

