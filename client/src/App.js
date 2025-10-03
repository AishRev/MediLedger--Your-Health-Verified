// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import EHR_ABI from './EHR.json';

// function App() {
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
  
//   // State for form inputs
//   const [patientName, setPatientName] = useState('');
//   const [patientAge, setPatientAge] = useState('');
//   const [recordHash, setRecordHash] = useState('');
  
//   // --- NEW: State to hold and display patient data ---
//   const [patientInfo, setPatientInfo] = useState(null);

//   // --- IMPORTANT: Paste your NEW contract address here ---
//   const contractAddress = "0x202D46bf8CCEda661fae83618a5A4A43D17c685a"; 

//   // Function to fetch data from the blockchain
//   const fetchPatientData = async (ehrContract) => {
//     try {
//       const data = await ehrContract.getMyRecords();
//       setPatientInfo({
//         name: data[0],
//         age: data[1].toString(),
//         records: data[2]
//       });
//     } catch (error) {
//       console.log("Could not fetch patient data. Likely not registered yet.");
//       setPatientInfo(null); // Clear data if not registered
//     }
//   };

//   useEffect(() => {
//     // Inside your useEffect...
// const connectToBlockchain = async () => {
//     if (window.ethereum) {
//         try {
//             // This part remains the same
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             setAccount(accounts[0]);

//             // --- CHANGE IS HERE ---
//             // Create a more specific provider to prevent ENS errors
//             const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
//             const signer = await provider.getSigner();

//             // The rest is the same
//             const ehrContract = new ethers.Contract(contractAddress, EHR_ABI.abi, signer);
//             setContract(ehrContract);
//             await fetchPatientData(ehrContract);

//         } catch (error) {
//             console.error("Error connecting to MetaMask", error);
//         }
//     } else {
//         alert("Please install MetaMask to use this app.");
//     }
// };
//     connectToBlockchain();
//   }, []);

//   const handleRegister = async () => {
//     if (contract && patientName && patientAge) {
//       try {
//         const tx = await contract.registerPatient(patientName, parseInt(patientAge));
//         await tx.wait();
//         alert('Patient registered successfully!');
//         await fetchPatientData(contract); // Refresh data after registering
//       } catch (error) {
//         console.error("Error registering patient:", error);
//       }
//     }
//   };

//   const handleAddRecord = async () => {
//     if (contract && recordHash) {
//       try {
//         const tx = await contract.addRecord(recordHash);
//         await tx.wait();
//         alert('Record added successfully!');
//         await fetchPatientData(contract); // Refresh data after adding a record
//       } catch (error) {
//         console.error("Error adding record:", error);
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Healthcare EHR DApp</h1>
//       <p><strong>Your Account:</strong> {account ? account : "Not Connected"}</p>
//       <hr />

//       {/* --- NEW: Display Patient Data --- */}
//       {patientInfo ? (
//         <div>
//           <h2>Your Information</h2>
//           <p><strong>Name:</strong> {patientInfo.name}</p>
//           <p><strong>Age:</strong> {patientInfo.age}</p>
//           <h3>Your Medical Records:</h3>
//           <ul>
//             {patientInfo.records.length > 0 ? 
//               patientInfo.records.map((record, index) => <li key={index}>{record}</li>) :
//               <p>No records found.</p>
//             }
//           </ul>
//         </div>
//       ) : (
//         <div>
//           <h2>Register as Patient</h2>
//           <input type="text" placeholder="Enter your name" onChange={(e) => setPatientName(e.target.value)} />
//           <input type="number" placeholder="Enter your age" onChange={(e) => setPatientAge(e.target.value)} />
//           <button onClick={handleRegister}>Register</button>
//         </div>
//       )}

//       <hr />

//       {patientInfo && (
//         <div>
//           <h2>Add Medical Record</h2>
//           <input type="text" placeholder="Enter record hash/URL" onChange={(e) => setRecordHash(e.target.value)} />
//           <button onClick={handleAddRecord}>Add Record</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import EHR_ABI from './EHR.json';
// import DRUG_SUPPLY_CHAIN_ABI from './DrugSupplyChain.json';
// import './App.css';

// function App() {
//   // Connection & View State
//   const [account, setAccount] = useState(null);
//   const [ehrContract, setEhrContract] = useState(null);
//   const [drugContract, setDrugContract] = useState(null);
//   const [view, setView] = useState('patient');
//   const [error, setError] = useState('');

//   // EHR State
//   const [patientInfo, setPatientInfo] = useState(null);
//   const [allDoctors, setAllDoctors] = useState([]);
//   const [patientNameInput, setPatientNameInput] = useState('');
//   const [patientAgeInput, setPatientAgeInput] = useState('');
//   const [recordHashInput, setRecordHashInput] = useState('');
//   const [doctorNameToRegister, setDoctorNameToRegister] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [patientAddressForDoctor, setPatientAddressForDoctor] = useState('');
//   const [recordsForDoctor, setRecordsForDoctor] = useState([]);

//   // Supply Chain State
//   const [allManufacturers, setAllManufacturers] = useState([]);
//   const [manufacturerNameToRegister, setManufacturerNameToRegister] = useState('');
//   const [drugNameInput, setDrugNameInput] = useState('');
//   const [drugIdToUpdate, setDrugIdToUpdate] = useState('');
//   const [drugDetails, setDrugDetails] = useState(null);

//   // --- IMPORTANT: Paste your NEW contract addresses here ---
//   const ehrContractAddress = "0xe5105Df226ABCAE1A50d92b6aA42A96CEBC32B47";
//   const drugContractAddress = "0xa5a0Bc6810C5E3fCd166934cEd761A3676264176";

//   useEffect(() => {
//     const connectToBlockchain = async () => {
//       setError('');
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           await provider.send("eth_requestAccounts", []);
//           const signer = await provider.getSigner();
//           setAccount(signer.address);

//           const ehr = new ethers.Contract(ehrContractAddress, EHR_ABI.abi, signer);
//           const drug = new ethers.Contract(drugContractAddress, DRUG_SUPPLY_CHAIN_ABI.abi, signer);
//           setEhrContract(ehr);
//           setDrugContract(drug);

//           // Fetch all global data (doctors, manufacturers, patient info)
//           const [docAddresses, docNames] = await ehr.getAllDoctors();
//           const doctorsList = docNames.map((name, i) => ({ name, address: docAddresses[i] }));
//           setAllDoctors(doctorsList);
//           if (doctorsList.length > 0) setSelectedDoctor(doctorsList[0].address);

//           const [mfgAddresses, mfgNames] = await drug.getAllManufacturers();
//           setAllManufacturers(mfgNames.map((name, i) => ({ name, address: mfgAddresses[i] })));

//           const data = await ehr.getMyRecords();
//           setPatientInfo({ name: data[0], age: data[1].toString(), records: data[2] });

//         } catch (err) {
//           setPatientInfo(null); // Not registered yet
//         }
//       } else {
//         setError("Please install MetaMask to use this application.");
//       }
//     };
//     connectToBlockchain();
//   }, []);

//   const handleTxError = (err) => {
//     if (err.code === 4001) {
//         setError("Transaction rejected by user in MetaMask.");
//     } else {
//         setError(err.reason || "An unexpected error occurred.");
//     }
//   };
  
//   // --- EHR Handlers ---
//   const handleRegisterPatient = async () => {
//     if (!patientNameInput || !patientAgeInput) return;
//     try {
//       const tx = await ehrContract.registerPatient(patientNameInput, parseInt(patientAgeInput));
//       await tx.wait();
//       setPatientInfo({ name: patientNameInput, age: patientAgeInput, records: [] });
//     } catch (err) { handleTxError(err); }
//   };
//   const handleAddRecord = async () => {
//     if (!recordHashInput) return;
//     try {
//       const tx = await ehrContract.addRecord(recordHashInput);
//       await tx.wait();
//       setPatientInfo(prev => ({ ...prev, records: [...prev.records, recordHashInput] }));
//     } catch (err) { handleTxError(err); }
//   };
//   const handleGrantAccess = async () => {
//     if (!selectedDoctor) return;
//     try {
//       const tx = await ehrContract.grantAccess(selectedDoctor);
//       await tx.wait();
//       alert(`Access granted to doctor at address: ${selectedDoctor}`);
//     } catch (err) { handleTxError(err); }
//   };
//   const handleRegisterDoctor = async () => {
//     if (!doctorNameToRegister) return;
//     try {
//       const tx = await ehrContract.registerDoctor(doctorNameToRegister);
//       await tx.wait();
//       setAllDoctors(prev => [...prev, { name: doctorNameToRegister, address: account }]);
//     } catch (err) { handleTxError(err); }
//   };
//   const handleViewRecords = async () => {
//     try {
//       const records = await ehrContract.viewRecords(patientAddressForDoctor);
//       setRecordsForDoctor(records);
//     } catch (err) {
//       handleTxError(err);
//       setRecordsForDoctor([]);
//     }
//   };
  
//   // --- Supply Chain Handlers ---
//   const handleRegisterManufacturer = async () => {
//     if (!manufacturerNameToRegister) return;
//     try {
//       const tx = await drugContract.registerManufacturer(manufacturerNameToRegister);
//       await tx.wait();
//       setAllManufacturers(prev => [...prev, { name: manufacturerNameToRegister, address: account }]);
//     } catch (err) { handleTxError(err); }
//   };
//   const handleAddDrug = async () => {
//     if (!drugNameInput) return;
//     try {
//       const tx = await drugContract.addDrug(drugNameInput);
//       await tx.wait();
//     } catch (err) { handleTxError(err); }
//   };
//   const handleUpdateDrugState = async () => {
//     if(!drugIdToUpdate) return;
//     try {
//       const tx = await drugContract.updateDrugState(drugIdToUpdate);
//       await tx.wait();
//       handleGetDrugDetails();
//     } catch (err) { handleTxError(err); }
//   };
//   const handleGetDrugDetails = async () => {
//     if(!drugIdToUpdate) return;
//     try {
//       const drug = await drugContract.drugs(drugIdToUpdate);
//       if (drug.id === 0n) { // Check if drug exists
//           setError(`Drug with ID ${drugIdToUpdate} not found.`);
//           setDrugDetails(null);
//           return;
//       }
//       const history = await drugContract.getDrugHistory(drugIdToUpdate);
//       setDrugDetails({ name: drug.name, manufacturer: drug.manufacturer, currentState: Number(drug.currentState), history });
//     } catch(err) {
//         handleTxError(err);
//         setDrugDetails(null);
//     }
//   };

//   const renderPatientDashboard = () => (
//     <div>
//       {patientInfo ? (
//         <div>
//           <h2>Your Information</h2>
//           <p><strong>Name:</strong> {patientInfo.name}, <strong>Age:</strong> {patientInfo.age}</p>
//           <h3>Your Records:</h3>
//           <ul>{patientInfo.records.map((r, i) => <li key={i}>{r}</li>)}</ul>
//           <hr/>
//           <h2>Add Medical Record</h2>
//           <input type="text" placeholder="Record Hash" value={recordHashInput} onChange={e => setRecordHashInput(e.target.value)} />
//           <button onClick={handleAddRecord}>Add Record</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Register as Patient</h2>
//           <input type="text" placeholder="Name" value={patientNameInput} onChange={e => setPatientNameInput(e.target.value)} />
//           <input type="number" placeholder="Age" value={patientAgeInput} onChange={e => setPatientAgeInput(e.target.value)} />
//           <button onClick={handleRegisterPatient}>Register</button>
//         </div>
//       )}
//       <hr/>
//       <h2>Grant Access to Doctor</h2>
//       <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
//         {allDoctors.map(doc => <option key={doc.address} value={doc.address}>{doc.name} - {doc.address.substring(0, 6)}...</option>)}
//       </select>
//       <button onClick={handleGrantAccess}>Grant Access</button>
//     </div>
//   );

//   const renderDoctorDashboard = () => (
//     <div>
//       <h2>Doctor Directory</h2>
//       <ul>{allDoctors.map(doc => <li key={doc.address}>{doc.name} ({doc.address})</li>)}</ul>
//       <hr/>
//       <h2>Register as Doctor</h2>
//       <input type="text" placeholder="Enter Your Name" value={doctorNameToRegister} onChange={e => setDoctorNameToRegister(e.target.value)} />
//       <button onClick={handleRegisterDoctor}>Register</button>
//       <hr/>
//       <h2>View Patient Records</h2>
//       <input type="text" placeholder="Patient's Address" value={patientAddressForDoctor} onChange={e => setPatientAddressForDoctor(e.target.value)} />
//       <button onClick={handleViewRecords}>View Records</button>
//       {recordsForDoctor.length > 0 && <ul>{recordsForDoctor.map((r, i) => <li key={i}>{r}</li>)}</ul>}
//     </div>
//   );
  
//   const renderSupplyChainDashboard = () => (
//     <div>
//       <h2>Manufacturer Directory</h2>
//       <ul>{allManufacturers.map(mfg => <li key={mfg.address}>{mfg.name} ({mfg.address})</li>)}</ul>
//       <hr/>
//       <h2>Register as Manufacturer</h2>
//       <input type="text" placeholder="Enter Company Name" value={manufacturerNameToRegister} onChange={e => setManufacturerNameToRegister(e.target.value)} />
//       <button onClick={handleRegisterManufacturer}>Register</button>
//       <hr/>
//       <h2>Add New Drug</h2>
//       <input type="text" placeholder="Drug Name" value={drugNameInput} onChange={e => setDrugNameInput(e.target.value)} />
//       <button onClick={handleAddDrug}>Add Drug</button>
//       <hr/>
//       <h2>Track Drug</h2>
//       <input type="number" placeholder="Enter Drug ID" value={drugIdToUpdate} onChange={e => setDrugIdToUpdate(e.target.value)} />
//       <button onClick={handleGetDrugDetails}>Track</button>
//       <button onClick={handleUpdateDrugState}>Scan Checkpoint</button>
//       {drugDetails && <div><h3>Drug #{drugIdToUpdate} Details</h3>...</div>}
//     </div>
//   );

//   return (
//     <div className="App">
//       <h1>Healthcare Blockchain Platform</h1>
//       <p><strong>Your Account:</strong> {account}</p>
//       {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
//       <nav>
//         <button onClick={() => setView('patient')}>Patient</button>
//         <button onClick={() => setView('doctor')}>Doctor</button>
//         <button onClick={() => setView('supplychain')}>Supply Chain</button>
//       </nav>
//       <main>
//         {view === 'patient' && renderPatientDashboard()}
//         {view === 'doctor' && renderDoctorDashboard()}
//         {view === 'supplychain' && renderSupplyChainDashboard()}
//       </main>
//     </div>
//   );
// }

// export default App;


import { useState } from 'react';
import { ethers } from 'ethers';
import HEALTHCHAIN_ABI from './HealthChain.json'; // The single, unified ABI

// Import Components
import Login from './components/Login';
import DashboardSelector from './components/DashboardSelector';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';

import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [view, setView] = useState('login');
  const [error, setError] = useState('');

  // --- IMPORTANT: Paste your SINGLE NEW contract address here ---
  const contractAddress = "0xd7539fD5E3d476943e39E5E3e483811ABE3F077D";

  const connectToBlockchain = async () => {
    setError('');
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const healthChainContract = new ethers.Contract(contractAddress, HEALTHCHAIN_ABI.abi, signer);
        setContract(healthChainContract);
        
        setView('selector');
      } catch (err) {
        console.error("Connection error:", err);
        setError("Failed to connect. Please ensure you performed the 'Hard Reset' and are using the correct contract address and ABI file.");
      }
    } else {
      setError("Please install MetaMask.");
    }
  };

  const renderView = () => {
    switch(view) {
      case 'selector':
        return <DashboardSelector setView={setView} />;
      case 'patient':
        return <PatientDashboard contract={contract} account={account} setView={setView} />;
      case 'doctor':
        return <DoctorDashboard contract={contract} account={account} setView={setView} />;
      case 'login':
      default:
        return <Login connectToBlockchain={connectToBlockchain} />;
    }
  };
  
  return (
    <div className="app-container">
       <header className="app-header">
        <h1>HealthChain</h1>
        <p className="account-info">{account ? `Connected: ${account.substring(0, 6)}...${account.substring(38)}` : "Not Connected"}</p>
      </header>
      {error && <p className="error-message">{error}</p>}
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;

