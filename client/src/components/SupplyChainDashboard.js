import { useState, useEffect, useCallback } from 'react';

const SupplyChainDashboard = ({ contract, account, setView }) => {
    const [manufacturerView, setManufacturerView] = useState('loading');
    const [manufacturerInfo, setManufacturerInfo] = useState(null);
    
    const [manufacturerNameInput, setManufacturerNameInput] = useState('');
    const [drugNameInput, setDrugNameInput] = useState('');
    const [drugIdToUpdate, setDrugIdToUpdate] = useState('');
    const [drugDetails, setDrugDetails] = useState(null);
    
    const [error, setError] = useState('');
    
    const handleTxError = (err) => { setError(err.reason || "An error occurred.") };

    const loadInitialData = useCallback(async () => {
        if (contract) {
            setError('');
            try {
                const data = await contract.getMyManufacturerProfile();
                setManufacturerInfo({ id: `M${Number(data[0])}`, name: data[1] });
                setManufacturerView('dashboard');
            } catch (err) {
                setManufacturerView('register');
            }
        }
    }, [contract]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    const handleRegister = async () => {
        if (!manufacturerNameInput) return;
        try {
            const tx = await contract.registerManufacturer(manufacturerNameInput);
            await tx.wait();
            await loadInitialData();
        } catch (err) { handleTxError(err); }
    };

    const handleAddDrug = async () => {
        if (!drugNameInput) return;
        try {
            const tx = await contract.addDrug(drugNameInput);
            await tx.wait();
            alert('Drug added successfully!');
            setDrugNameInput('');
        } catch (err) { handleTxError(err); }
    };

    const handleUpdateState = async () => {
        if (!drugIdToUpdate) return;
        try {
            const tx = await contract.updateDrugState(drugIdToUpdate);
            await tx.wait();
            alert('Drug state updated!');
            handleGetDetails();
        } catch (err) { handleTxError(err); }
    };

    const handleGetDetails = async () => {
        if (!drugIdToUpdate) return;
        setError('');
        try {
            const drug = await contract.drugs(drugIdToUpdate);
            if (drug.id === 0n) {
                setError(`Drug with ID ${drugIdToUpdate} not found.`);
                setDrugDetails(null);
                return;
            }
            const history = await contract.getDrugHistory(drugIdToUpdate);
            const mfg = await contract.manufacturers(drug.manufacturerId);
            setDrugDetails({ 
                name: drug.name, 
                manufacturerName: mfg.name, 
                currentState: Number(drug.currentState), 
                history 
            });
        } catch(err) {
            handleTxError(err);
            setDrugDetails(null);
        }
    };

    const renderRegisterView = () => (
        <div className="dashboard-section">
            <h2>Register as a Manufacturer</h2>
            <p>Please provide your company name to join the supply chain network.</p>
            <input type="text" placeholder="Enter Company Name" value={manufacturerNameInput} onChange={e => setManufacturerNameInput(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );

    const renderDashboardView = () => (
        <div>
            <div className="dashboard-section">
                <h2>Manufacturer Dashboard</h2>
                <p><strong>Manufacturer ID:</strong> {manufacturerInfo?.id}</p>
                <p><strong>Company Name:</strong> {manufacturerInfo?.name}</p>
            </div>
            <div className="dashboard-section">
                <h3>Add New Drug to Supply Chain</h3>
                <input type="text" placeholder="Drug Name (e.g., Paracetamol 500mg)" value={drugNameInput} onChange={e => setDrugNameInput(e.target.value)} />
                <button onClick={handleAddDrug}>Add Drug</button>
            </div>
            <div className="dashboard-section">
                <h3>Track a Drug</h3>
                <input type="number" placeholder="Enter Drug ID" value={drugIdToUpdate} onChange={e => setDrugIdToUpdate(e.target.value)} />
                <button onClick={handleGetDetails}>Track Drug</button>
                <button onClick={handleUpdateState}>Scan Checkpoint</button>
                {drugDetails && (
                    <div>
                        <h4>Drug #{drugIdToUpdate} Details</h4>
                        <p><strong>Name:</strong> {drugDetails.name}</p>
                        <p><strong>Manufacturer:</strong> {drugDetails.manufacturerName}</p>
                        <p><strong>Current State:</strong> {['Manufactured', 'In-Transit', 'At Pharmacy', 'Delivered'][drugDetails.currentState]}</p>
                        <h4>History:</h4>
                        <ul>
                            {drugDetails.history.map((h, i) => (
                                <li key={i}>
                                    State set to <strong>{['Manufactured', 'In-Transit', 'At Pharmacy', 'Delivered'][Number(h.stateAtScan)]}</strong> by scanner: {h.scannedBy}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
            {error && <p className="error-message">{error}</p>}
            
            {manufacturerView === 'loading' && <p>Loading manufacturer information...</p>}
            {manufacturerView === 'register' && renderRegisterView()}
            {manufacturerView === 'dashboard' && renderDashboardView()}
        </div>
    );
};

export default SupplyChainDashboard;

