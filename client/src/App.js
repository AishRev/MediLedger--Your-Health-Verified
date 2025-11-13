

// import { useState } from 'react';
// import { ethers } from 'ethers';
// import HEALTHCHAIN_ABI from './HealthChain.json';
// import DRUG_SUPPLY_CHAIN_ABI from './DrugSupplyChain.json';
// import CLINICAL_TRIAL_ABI from './ClinicalTrial.json';
// import INSURANCE_CLAIM_ABI from './InsuranceClaim.json';

// // Import Components
// import Login from './components/Login';
// import DashboardSelector from './components/DashboardSelector';
// import PatientDashboard from './components/PatientDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import SupplyChainDashboard from './components/SupplyChainDashboard';
// import ClinicalTrialDashboard from './components/ClinicalTrialDashboard';
// import InsuranceClaimDashboard from './components/InsuranceClaimDashboard';

// import './App.css';

// function App() {
//   const [account, setAccount] = useState(null);
//   const [healthContract, setHealthContract] = useState(null);
//   const [drugContract, setDrugContract] = useState(null);
//   const [trialContract, setTrialContract] = useState(null);
//   const [claimContract, setClaimContract] = useState(null);
//   const [view, setView] = useState('login');
//   const [error, setError] = useState('');

//   // --- IMPORTANT: Paste your FOUR NEW contract addresses here ---
//   const healthContractAddress = "0x1A7186A64E3ebb3E123b10c212E06AcFfe3d8005";
//   const drugContractAddress = "0xAFBa01746418c1B70A4De2726991CC24888E9782";
//   const trialContractAddress = "0xe39dDBf8d8bC421CEcaa635eD2568926963dA511";
//   const claimContractAddress = "0x8Ad0Df75D6F3Ba8E23dd26aA0a80538b5a187eEB";

//   const connectToBlockchain = async () => {
//     setError('');
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);

//         setHealthContract(new ethers.Contract(healthContractAddress, HEALTHCHAIN_ABI.abi, signer));
//         setDrugContract(new ethers.Contract(drugContractAddress, DRUG_SUPPLY_CHAIN_ABI.abi, signer));
//         setTrialContract(new ethers.Contract(trialContractAddress, CLINICAL_TRIAL_ABI.abi, signer));
//         setClaimContract(new ethers.Contract(claimContractAddress, INSURANCE_CLAIM_ABI.abi, signer));
        
//         setView('selector');
//       } catch (err) {
//         console.error("Connection error:", err);
//         setError("Failed to connect. Please ensure you performed the 'Hard Reset' and are using correct contract addresses and ABI files.");
//       }
//     } else {
//       setError("Please install MetaMask.");
//     }
//   };

//   const renderView = () => {
//     switch(view) {
//       case 'selector':
//         return <DashboardSelector setView={setView} />;
//       case 'patient':
//         return <PatientDashboard healthContract={healthContract} trialContract={trialContract} claimContract={claimContract} setView={setView} />;
//       case 'doctor':
//         return <DoctorDashboard contract={healthContract} setView={setView} />;
//       case 'supplychain':
//         return <SupplyChainDashboard contract={drugContract} setView={setView} />;
//       case 'trial':
//         return <ClinicalTrialDashboard contract={trialContract} setView={setView} />;
//       case 'claim':
//         return <InsuranceClaimDashboard contract={claimContract} setView={setView} />;
//       case 'login':
//       default:
//         return <Login connectToBlockchain={connectToBlockchain} />;
//     }
//   };
  
//   return (
//     <div className="app-container">
//        <header className="app-header">
//         <h1>MediLedger</h1>
//         <p className="account-info">{account ? `Connected: ${account.substring(0, 6)}...${account.substring(38)}` : "Not Connected"}</p>
//       </header>
//       {error && <p className="error-message">{error}</p>}
//       <main className="main-content">
//         {renderView()}
//       </main>
//     </div>
//   );
// }

// export default App;


// import { useState } from 'react';
// import { ethers } from 'ethers';
// import HEALTHCHAIN_ABI from './HealthChain.json';
// import DRUG_SUPPLY_CHAIN_ABI from './DrugSupplyChain.json';
// import CLINICAL_TRIAL_ABI from './ClinicalTrial.json';
// import INSURANCE_CLAIM_ABI from './InsuranceClaim.json';

// // Import Components
// import Login from './components/Login';
// import DashboardSelector from './components/DashboardSelector';
// import PatientDashboard from './components/PatientDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import SupplyChainDashboard from './components/SupplyChainDashboard';
// import ClinicalTrialDashboard from './components/ClinicalTrialDashboard';
// import InsuranceClaimDashboard from './components/InsuranceClaimDashboard';

// import './App.css';

// function App() {
//   const [account, setAccount] = useState(null);
//   const [healthContract, setHealthContract] = useState(null);
//   const [drugContract, setDrugContract] = useState(null);
//   const [trialContract, setTrialContract] = useState(null);
//   const [claimContract, setClaimContract] = useState(null);
//   const [view, setView] = useState('login');
//   const [error, setError] = useState('');

//   // --- IMPORTANT: Paste your FOUR NEW contract addresses here ---
//   const healthContractAddress = "0xEceBf0C7FC2eBB694ac9a817C9bc2890555D1158";
//   const drugContractAddress = "0xdD0DEeed14D5E2f9a3870f2105bf308f92a1eA24";
//   const trialContractAddress = "0x1A2BCFCF081aE453fDC1DD040F07493fc1dA284B";
//   const claimContractAddress = "0x220FBf1ef81088eA9A820a6c9c42780476B73Db8";

//   const connectToBlockchain = async () => {
//     setError('');
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);

//         setHealthContract(new ethers.Contract(healthContractAddress, HEALTHCHAIN_ABI.abi, signer));
//         setDrugContract(new ethers.Contract(drugContractAddress, DRUG_SUPPLY_CHAIN_ABI.abi, signer));
//         setTrialContract(new ethers.Contract(trialContractAddress, CLINICAL_TRIAL_ABI.abi, signer));
//         setClaimContract(new ethers.Contract(claimContractAddress, INSURANCE_CLAIM_ABI.abi, signer));
        
//         setView('selector');
//       } catch (err) {
//         console.error("Connection error:", err);
//         setError("Failed to connect. Please ensure you performed the 'Hard Reset' and are using correct contract addresses and ABI files.");
//       }
//     } else {
//       setError("Please install MetaMask.");
//     }
//   };

//   const renderView = () => {
//     switch(view) {
//       case 'selector':
//         return <DashboardSelector setView={setView} />;
//       case 'patient':
//         return <PatientDashboard healthContract={healthContract} trialContract={trialContract} claimContract={claimContract} setView={setView} />;
//       case 'doctor':
//         // --- UPDATED: Pass claimContract to the Doctor Dashboard ---
//         return <DoctorDashboard healthContract={healthContract} claimContract={claimContract} setView={setView} />;
//       case 'supplychain':
//         return <SupplyChainDashboard contract={drugContract} setView={setView} />;
//       case 'trial':
//         return <ClinicalTrialDashboard contract={trialContract} setView={setView} />;
//       case 'claim':
//         return <InsuranceClaimDashboard contract={claimContract} setView={setView} />;
//       case 'login':
//       default:
//         return <Login connectToBlockchain={connectToBlockchain} />;
//     }
//   };
  
//   return (
//     <div className="app-container">
//        <header className="app-header">
//         <h1>MediLedger</h1>
//         <p className="account-info">{account ? `Connected: ${account.substring(0, 6)}...${account.substring(38)}` : "Not Connected"}</p>
//       </header>
//       {error && <p className="error-message">{error}</p>}
//       <main className="main-content">
//         {renderView()}
//       </main>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import HEALTHCHAIN_ABI from './HealthChain.json';
// import DRUG_SUPPLY_CHAIN_ABI from './DrugSupplyChain.json';
// import CLINICAL_TRIAL_ABI from './ClinicalTrial.json';
// import INSURANCE_CLAIM_ABI from './InsuranceClaim.json';

// // Import Components
// import Login from './components/Login';
// import DashboardSelector from './components/DashboardSelector';
// import PatientDashboard from './components/PatientDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import SupplyChainDashboard from './components/SupplyChainDashboard';
// import ClinicalTrialDashboard from './components/ClinicalTrialDashboard';
// import InsuranceClaimDashboard from './components/InsuranceClaimDashboard';

// import './App.css';

// function App() {
//   const [account, setAccount] = useState(null);
//   const [healthContract, setHealthContract] = useState(null);
//   const [drugContract, setDrugContract] = useState(null);
//   const [trialContract, setTrialContract] = useState(null);
//   const [claimContract, setClaimContract] = useState(null);
//   const [view, setView] = useState('login'); // Start explicitly at the login view
//   const [error, setError] = useState('');

//   // --- IMPORTANT: Paste your FOUR NEW contract addresses here ---
//   const healthContractAddress = "0xb957ee5a8A00395aEF8dA5E5BF64E4484A653db9";
//   const drugContractAddress = "0x3AB609bFD3d278f9008D084DD618656356Badc5E";
//   const trialContractAddress = "0x7e8B8B17dC059eaC037A8815e28c919FA23ca1C4";
//   const claimContractAddress = "0x9E31853B7AdE5f067C9CF92d5046e094a1AdB62F";

//   // This effect checks if the user is ALREADY connected from a previous session
//   useEffect(() => {
//     const checkIfWalletIsConnected = async () => {
//       if (window.ethereum) {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts = await provider.listAccounts();
//         if (accounts.length > 0 && accounts[0]) {
//           // If already connected, trigger the full connection logic
//           // to set up contracts and move to the selector
//           await connectToBlockchain();
//         }
//       }
//     };
//     checkIfWalletIsConnected();
//   }, []);

//   const connectToBlockchain = async () => {
//     setError('');
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         // This will prompt the user to connect if they haven't already
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);

//         setHealthContract(new ethers.Contract(healthContractAddress, HEALTHCHAIN_ABI.abi, signer));
//         setDrugContract(new ethers.Contract(drugContractAddress, DRUG_SUPPLY_CHAIN_ABI.abi, signer));
//         setTrialContract(new ethers.Contract(trialContractAddress, CLINICAL_TRIAL_ABI.abi, signer));
//         setClaimContract(new ethers.Contract(claimContractAddress, INSURANCE_CLAIM_ABI.abi, signer));
        
//         setView('selector');
//       } catch (err) {
//         console.error("Connection error:", err);
//         setError("Failed to connect. Please ensure your contract addresses and ABI files are correct after deployment.");
//       }
//     } else {
//       setError("Please install MetaMask to use this application.");
//     }
//   };

//   const renderView = () => {
//     switch(view) {
//       case 'selector':
//         return <DashboardSelector setView={setView} />;
//       case 'patient':
//         return <PatientDashboard healthContract={healthContract} trialContract={trialContract} claimContract={claimContract} setView={setView} />;
//       case 'doctor':
//         return <DoctorDashboard healthContract={healthContract} claimContract={claimContract} setView={setView} />;
//       case 'supplychain':
//         return <SupplyChainDashboard contract={drugContract} setView={setView} />;
//       case 'trial':
//         return <ClinicalTrialDashboard contract={trialContract} setView={setView} />;
//       case 'claim':
//         return <InsuranceClaimDashboard contract={claimContract} setView={setView} />;
//       case 'login':
//       default:
//         return <Login connectToBlockchain={connectToBlockchain} />;
//     }
//   };
  
//   return (
//     <div className="app-container">
//        <header className="app-header">
//         <h1>MediLedger</h1>
//         <p className="account-info">{account ? `Connected: ${account.substring(0, 6)}...${account.substring(38)}` : "Not Connected"}</p>
//       </header>
//       {error && <p className="error-message">{error}</p>}
//       <main className="main-content">
//         {renderView()}
//       </main>
//     </div>
//   );
// }

// export default App;

import { useState } from 'react'; // --- FIX: Removed 'useEffect' ---
import { ethers } from 'ethers';
import HEALTHCHAIN_ABI from './HealthChain.json';
import DRUG_SUPPLY_CHAIN_ABI from './DrugSupplyChain.json';
import CLINICAL_TRIAL_ABI from './ClinicalTrial.json';
import INSURANCE_CLAIM_ABI from './InsuranceClaim.json';

// Import Components
import Login from './components/Login';
import DashboardSelector from './components/DashboardSelector';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import SupplyChainDashboard from './components/SupplyChainDashboard';
import ClinicalTrialDashboard from './components/ClinicalTrialDashboard';
import InsuranceClaimDashboard from './components/InsuranceClaimDashboard';

import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [healthContract, setHealthContract] = useState(null);
  const [drugContract, setDrugContract] = useState(null);
  const [trialContract, setTrialContract] = useState(null);
  const [claimContract, setClaimContract] = useState(null);
  const [view, setView] = useState('login');
  const [error, setError] = useState('');

  // --- IMPORTANT: Paste your FOUR NEW contract addresses from the hard reset ---
  const healthContractAddress = "0xc78ced43C8d8247eF11F9A3227380DE5C324f82d";
  const drugContractAddress = "0x3D9284DF0661b21693F0c1D874a377EC49A44B75";
  const trialContractAddress = "0x7e0e31B35eC8984466aeD39fD5A1C77c5bE34e07";
  const claimContractAddress = "0x4B2b22ccc118280BB63ddCa0c55c668b63a9f792";

  // --- FIX: The auto-connecting useEffect hook has been REMOVED. ---
  // The app will now always start with view='login',
  // guaranteeing the Login component is always displayed first.

  const connectToBlockchain = async () => {
    setError('');

    // --- CRITICAL CHECK ---
    // This check now only runs when you CLICK the connect button.
    if (healthContractAddress.includes('PASTE_YOUR')) {
        setError("Setup Error: Contract addresses have not been updated in App.js. You must perform the 'Hard Reset' steps and paste the new addresses from your deployment.");
        return; // Stop execution
    }

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // This will always prompt the user to connect
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        setHealthContract(new ethers.Contract(healthContractAddress, HEALTHCHAIN_ABI.abi, signer));
        setDrugContract(new ethers.Contract(drugContractAddress, DRUG_SUPPLY_CHAIN_ABI.abi, signer));
        setTrialContract(new ethers.Contract(trialContractAddress, CLINICAL_TRIAL_ABI.abi, signer));
        setClaimContract(new ethers.Contract(claimContractAddress, INSURANCE_CLAIM_ABI.abi, signer));
        
        setView('selector');
      } catch (err) {
        console.error("Connection error:", err);
        setError("Failed to connect. This is likely an invalid contract address or ABI file. Please perform the 'Hard Reset' steps again.");
      }
    } else {
      setError("Please install MetaMask to use this application.");
    }
  };

  const renderView = () => {
    switch(view) {
      case 'selector':
        return <DashboardSelector setView={setView} />;
      case 'patient':
        return <PatientDashboard healthContract={healthContract} trialContract={trialContract} claimContract={claimContract} setView={setView} />;
      case 'doctor':
        return <DoctorDashboard healthContract={healthContract} claimContract={claimContract} setView={setView} />;
      case 'supplychain':
        return <SupplyChainDashboard contract={drugContract} setView={setView} />;
      case 'trial':
        return <ClinicalTrialDashboard contract={trialContract} setView={setView} />;
      case 'claim':
        return <InsuranceClaimDashboard contract={claimContract} setView={setView} />;
      case 'login':
      default:
        return <Login connectToBlockchain={connectToBlockchain} />;
    }
  };
  
  return (
    <div className="app-container">
       <header className="app-header">
        <h1>MediLedger</h1>
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