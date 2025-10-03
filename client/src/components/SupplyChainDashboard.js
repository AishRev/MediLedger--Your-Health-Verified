import { useState, useEffect } from 'react';

const SupplyChainDashboard = ({ drugContract, account, setView }) => {
    const [allManufacturers, setAllManufacturers] = useState([]);
    const [manufacturerNameToRegister, setManufacturerNameToRegister] = useState('');
    const [drugNameInput, setDrugNameInput] = useState('');
    const [drugIdToUpdate, setDrugIdToUpdate] = useState('');
    const [drugDetails, setDrugDetails] = useState(null);
    const [error, setError] = useState('');

    const handleTxError = (err) => {
        if (err.code === 4001) {
            setError("Transaction rejected in MetaMask.");
            return;
        }
        setError(err.reason || "An error occurred. Check the console for details.");
    };

    useEffect(() => {
        const loadManufacturers = async () => {
            if (drugContract) {
                try {
                    const [mfgAddresses, mfgNames] = await drugContract.getAllManufacturers();
                    setAllManufacturers(mfgNames.map((name, i) => ({ name, address: mfgAddresses[i] })));
                } catch (err) {
                    console.error("Could not fetch manufacturer list:", err);
                    setError("Could not fetch the list of registered manufacturers.");
                }
            }
        };
        loadManufacturers();
    }, [drugContract]);
    
    const handleRegisterManufacturer = async () => {
        if (!manufacturerNameToRegister) return;
        setError('');
        try {
          const tx = await drugContract.registerManufacturer(manufacturerNameToRegister);
          await tx.wait();
          setAllManufacturers(prev => [...prev, { name: manufacturerNameToRegister, address: account }]);
          setManufacturerNameToRegister('');
        } catch (err) { handleTxError(err); }
      };

    const handleAddDrug = async () => {
        if (!drugNameInput) return;
        setError('');
        try {
          const tx = await drugContract.addDrug(drugNameInput);
          await tx.wait();
          alert('Drug added successfully!');
          setDrugNameInput('');
        } catch (err) { handleTxError(err); }
    };
      
    const handleUpdateDrugState = async () => {
        if(!drugIdToUpdate) return;
        setError('');
        try {
          const tx = await drugContract.updateDrugState(drugIdToUpdate);
          await tx.wait();
          alert('Drug state updated!');
          handleGetDrugDetails();
        } catch (err) { handleTxError(err); }
    };

    const handleGetDrugDetails = async () => {
        if(!drugIdToUpdate) return;
        setError('');
        setDrugDetails(null);
        try {
          const drug = await drugContract.drugs(drugIdToUpdate);
          if (drug.id === 0n) { // drug.id is a BigInt, compare with 0n
              setError(`Drug with ID ${drugIdToUpdate} not found.`);
              return;
          }
          const history = await drugContract.getDrugHistory(drugIdToUpdate);
          setDrugDetails({ name: drug.name, manufacturer: drug.manufacturer, currentState: Number(drug.currentState), history });
        } catch(err) {
            handleTxError(err);
        }
    };

    return (
        <div className="dashboard">
            <button className="back-button" onClick={() => setView('selector')}>← Back to Home</button>
            {error && <p className="error-message">{error}</p>}
            <div className="dashboard-section">
                <h2>Manufacturer Directory</h2>
                {allManufacturers.length > 0 ? (
                    <ul>{allManufacturers.map(mfg => <li key={mfg.address}><strong>{mfg.name}</strong> ({mfg.address})</li>)}</ul>
                ) : (
                    <p>No manufacturers are registered in the system yet.</p>
                )}
            </div>
            <div className="dashboard-section">
                <h2>Register as Manufacturer</h2>
                <input type="text" placeholder="Enter Company Name" value={manufacturerNameToRegister} onChange={e => setManufacturerNameToRegister(e.target.value)} />
                <button onClick={handleRegisterManufacturer}>Register</button>
            </div>
            <div className="dashboard-section">
                <h2>Add New Drug to Supply Chain</h2>
                <input type="text" placeholder="Drug Name (e.g., Paracetamol 500mg)" value={drugNameInput} onChange={e => setDrugNameInput(e.target.value)} />
                <button onClick={handleAddDrug}>Add Drug</button>
            </div>
            <div className="dashboard-section">
                <h2>Track Drug</h2>
                <input type="number" placeholder="Enter Drug ID to Track or Update" value={drugIdToUpdate} onChange={e => setDrugIdToUpdate(e.target.value)} />
                <button onClick={handleGetDrugDetails}>Track</button>
                <button onClick={handleUpdateDrugState}>Scan Checkpoint</button>
                {drugDetails && (
                    <div>
                        <h3>Drug #{drugIdToUpdate} Details</h3>
                        <p><strong>Name:</strong> {drugDetails.name}</p>
                        <p><strong>Manufacturer:</strong> {drugDetails.manufacturer}</p>
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
};

export default SupplyChainDashboard;

