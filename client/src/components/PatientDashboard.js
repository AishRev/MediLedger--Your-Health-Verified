import { useState, useEffect, useCallback } from 'react';

const PatientDashboard = ({ contract, setView }) => {
    const [patientView, setPatientView] = useState('loading');
    const [patientInfo, setPatientInfo] = useState(null);
    const [allDoctors, setAllDoctors] = useState([]);
    
    const [patientNameInput, setPatientNameInput] = useState('');
    const [patientAgeInput, setPatientAgeInput] = useState('');
    const [recordHashInput, setRecordHashInput] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    
    const [error, setError] = useState('');
    
    const handleTxError = (err) => { setError(err.reason || "An error occurred.") };

    const loadInitialData = useCallback(async () => {
        if (contract) {
            setError('');
            try {
                const data = await contract.getMyPatientProfile();
                setPatientInfo({ id: `P${Number(data[0])}`, name: data[1], age: data[2].toString(), records: data[3] });
                setPatientView('dashboard');
            } catch (err) {
                setPatientView('register');
            }
            try {
                const [docIds, docNames] = await contract.getAllDoctors();
                const doctorsList = docNames.map((name, i) => ({ id: Number(docIds[i]), name }));
                setAllDoctors(doctorsList);
                if (doctorsList.length > 0) setSelectedDoctorId(doctorsList[0].id);
            } catch (err) {
                // This is not a critical error if the list is just empty
                console.warn("Could not fetch doctor directory, it might be empty.", err);
            }
        }
    }, [contract]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    const handleRegisterPatient = async () => {
        if (!patientNameInput || !patientAgeInput) return;
        try {
            const tx = await contract.registerPatient(patientNameInput, parseInt(patientAgeInput));
            await tx.wait();
            await loadInitialData();
        } catch (err) { handleTxError(err); }
    };

    const handleAddRecord = async () => {
        if (!recordHashInput) return;
        try {
            const tx = await contract.addRecord(recordHashInput);
            await tx.wait();
            setPatientInfo(prev => ({ ...prev, records: [...prev.records, recordHashInput] }));
            setRecordHashInput('');
        } catch (err) { handleTxError(err); }
    };

    const handleGrantAccess = async () => {
        if (!selectedDoctorId) return;
        try {
            const tx = await contract.grantAccessById(selectedDoctorId);
            await tx.wait();
            alert(`Access granted successfully to Doctor ID: D${selectedDoctorId}`);
        } catch (err) { handleTxError(err); }
    };

    const renderRegisterView = () => (
        <div className="dashboard-section">
            <h2>Register as a New Patient</h2>
            <p>Welcome! Provide your details to get started.</p>
            <input type="text" placeholder="Enter Your Name" value={patientNameInput} onChange={e => setPatientNameInput(e.target.value)} />
            <input type="number" placeholder="Enter Your Age" value={patientAgeInput} onChange={e => setPatientAgeInput(e.target.value)} />
            <button onClick={handleRegisterPatient}>Register</button>
        </div>
    );
    
    const renderDashboardView = () => (
        <div>
            <div className="dashboard-section">
                <h2>Patient Dashboard</h2>
                <p><strong>Patient ID:</strong> {patientInfo?.id}</p>
                <p><strong>Name:</strong> {patientInfo?.name}</p>
                <h3>Your Medical Records:</h3>
                <ul>{patientInfo?.records.length > 0 ? patientInfo.records.map((r, i) => <li key={i}>{r}</li>) : <li>No records added.</li>}</ul>
            </div>
            <div className="dashboard-section">
                <h3>Add a New Medical Record</h3>
                <input type="text" placeholder="Enter Record Hash / URL" value={recordHashInput} onChange={e => setRecordHashInput(e.target.value)} />
                <button onClick={handleAddRecord}>Add Record</button>
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
                ) : <p>No doctors are registered in the system yet.</p>}
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
            {error && <p className="error-message">{error}</p>}
            
            {patientView === 'loading' && <p>Loading your information...</p>}
            {patientView === 'register' && renderRegisterView()}
            {patientView === 'dashboard' && renderDashboardView()}
        </div>
    );
};

export default PatientDashboard;

