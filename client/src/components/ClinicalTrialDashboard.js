// import { useState, useEffect, useCallback } from 'react';

// const ClinicalTrialDashboard = ({ contract, setView }) => {
//     const [trialName, setTrialName] = useState('');
//     const [trialIdToView, setTrialIdToView] = useState('');
//     const [dataHash, setDataHash] = useState('');
//     const [trialData, setTrialData] = useState([]);
//     const [error, setError] = useState('');

//     const handleTxError = (err) => setError(err.reason || "An error occurred.");

//     const handleCreateTrial = async () => {
//         if (!trialName) return;
//         try {
//             const tx = await contract.createTrial(trialName);
//             await tx.wait();
//             alert(`Trial '${trialName}' created successfully!`);
//             setTrialName('');
//         } catch (err) { handleTxError(err); }
//     };

//     const handleAddData = async () => {
//         if (!trialIdToView || !dataHash) return;
//         try {
//             const tx = await contract.addTrialData(trialIdToView, dataHash);
//             await tx.wait();
//             alert('Data added to trial!');
//             setDataHash('');
//             handleViewData(); // Refresh data
//         } catch (err) { handleTxError(err); }
//     };
    
//     const handleViewData = async () => {
//         if (!trialIdToView) return;
//         try {
//             const data = await contract.getTrialData(trialIdToView);
//             setTrialData(data);
//         } catch (err) { handleTxError(err); }
//     };

//     return (
//         <div className="dashboard">
//             <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
//             {error && <p className="error-message">{error}</p>}
            
//             <div className="dashboard-section">
//                 <h2>Clinical Trial Management (For Research Institutions)</h2>
//                 <p>Create a new trial to begin collecting transparent, auditable data.</p>
//                 <input type="text" placeholder="New Trial Name (e.g., 'Cardio-Health Study')" value={trialName} onChange={e => setTrialName(e.target.value)} />
//                 <button onClick={handleCreateTrial}>Create Trial</button>
//             </div>

//             <div className="dashboard-section">
//                 <h2>Manage an Existing Trial</h2>
//                 <input type="number" placeholder="Enter Trial ID" value={trialIdToView} onChange={e => setTrialIdToView(e.target.value)} />
//                 <hr/>
//                 <h3>Add Anonymized Data</h3>
//                 <input type="text" placeholder="Enter Hash of Anonymized Data" value={dataHash} onChange={e => setDataHash(e.target.value)} />
//                 <button onClick={handleAddData}>Add Data Point</button>
//                 <hr/>
//                 <h3>View Trial Data Log</h3>
//                 <button onClick={handleViewData}>View All Data</button>
//                 {trialData.length > 0 && (
//                     <ul>
//                         {trialData.map((d, i) => (
//                             <li key={i}>
//                                 <strong>Data Hash:</strong> {d.dataHash} <br/>
//                                 <strong>Submitted By:</strong> {d.submittedBy}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ClinicalTrialDashboard;

import { useState } from 'react';

const ClinicalTrialDashboard = ({ contract, setView }) => {
    const [nav, setNav] = useState('create'); // create, manage
    const [trialName, setTrialName] = useState('');
    const [trialIdToView, setTrialIdToView] = useState('');
    const [dataHash, setDataHash] = useState('');
    const [trialData, setTrialData] = useState([]);
    const [error, setError] = useState('');

    const handleTxError = (err) => setError(err.reason || "An error occurred.");

    const handleCreateTrial = async () => {
        if (!trialName) return;
        try {
            const tx = await contract.createTrial(trialName);
            await tx.wait();
            alert(`Trial '${trialName}' created successfully!`);
            setTrialName('');
        } catch (err) { handleTxError(err); }
    };

    const handleAddData = async () => {
        if (!trialIdToView || !dataHash) return;
        try {
            const tx = await contract.addTrialData(trialIdToView, dataHash);
            await tx.wait();
            alert('Data added to trial!');
            setDataHash('');
            handleViewData(); // Refresh data
        } catch (err) { handleTxError(err); }
    };
    
    const handleViewData = async () => {
        if (!trialIdToView) return;
        try {
            const data = await contract.getTrialData(trialIdToView);
            setTrialData(data);
        } catch (err) { handleTxError(err); }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
                <h2>Clinical Trial Portal</h2>
            </div>
            {error && <p className="error-message" style={{margin: '0 2rem 1rem'}}>{error}</p>}
            
            <div className="dashboard-nav">
                <button className={`nav-tab ${nav === 'create' ? 'active' : ''}`} onClick={() => setNav('create')}>Create Trial</button>
                <button className={`nav-tab ${nav === 'manage' ? 'active' : ''}`} onClick={() => setNav('manage')}>Manage Trial</button>
            </div>

            <div className="dashboard-content">
                {nav === 'create' && (
                    <div className="dashboard-section">
                        <h2>Create a New Clinical Trial</h2>
                        <p>Create a new trial to begin collecting transparent, auditable data for research and AI model building.</p>
                        <input type="text" placeholder="New Trial Name (e.g., 'Cardio-Health Study')" value={trialName} onChange={e => setTrialName(e.target.value)} />
                        <button onClick={handleCreateTrial}>Create Trial</button>
                    </div>
                )}

                {nav === 'manage' && (
                    <div className="dashboard-section">
                        <h2>Manage an Existing Trial</h2>
                        <input type="number" placeholder="Enter Trial ID to Manage" value={trialIdToView} onChange={e => setTrialIdToView(e.target.value)} />
                        <hr style={{margin: '1rem 0'}}/>
                        <h3>Add Anonymized Data Point</h3>
                        <input type="text" placeholder="Enter Hash of Anonymized Data" value={dataHash} onChange={e => setDataHash(e.target.value)} />
                        <button onClick={handleAddData}>Add Data</button>
                        <hr style={{margin: '1rem 0'}}/>
                        <h3>View Trial Data Log</h3>
                        <button onClick={handleViewData}>View All Data for Trial #{trialIdToView}</button>
                        {trialData.length > 0 && (
                            <ul style={{marginTop: '1rem'}}>
                                {trialData.map((d, i) => (
                                    <li key={i}>
                                        <strong>Data Hash:</strong> {d.dataHash} <br/>
                                        <small><strong>Submitted By:</strong> {d.submittedBy}</small>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClinicalTrialDashboard;

