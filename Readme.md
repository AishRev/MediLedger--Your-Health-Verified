MediLedger
Tagline: Your Health, Verified.

MediLedger is a decentralized healthcare management platform built on the Ethereum blockchain. It provides a secure, transparent, and patient-centric system for managing electronic health records (EHR) and facilitating controlled data sharing between patients and doctors.

✨ Features
This project demonstrates a robust proof-of-concept for a blockchain-based healthcare system with the following features:

Patient Portal:

Securely register as a patient using an Ethereum wallet.

Receive a unique, user-friendly Patient ID (e.g., P1, P2).

Add and view your own immutable medical records (represented as hashes).

Grant access to your records to registered doctors using their unique Doctor ID.

Doctor Portal:

Securely register as a healthcare professional.

Receive a unique, user-friendly Doctor ID (e.g., D1, D2).

View a directory of all registered patients in the system.

Access the medical records of patients who have granted you permission.

Decentralized & Secure:

All data and access rules are managed by a Solidity smart contract on a private Ethereum network.

Users interact with the application via MetaMask, ensuring their private keys never leave their wallet.

Patient and doctor identities are pseudonymous, linked only to their wallet addresses.

🛠️ Tech Stack
Blockchain: Solidity, Truffle Suite, Ganache

Front-End: React.js, Ethers.js, JavaScript (ES6+), CSS3

Wallet: MetaMask

🚀 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (v14 or higher)

Truffle Suite (npm install -g truffle)

Ganache UI

MetaMask Browser Extension

Installation & Setup
Clone the repository:

git clone <your-repository-url>
cd <your-repository-folder>

Install front-end dependencies:
Navigate to the client directory and install the required npm packages.

cd client
npm install

Set up the local blockchain:

Open the Ganache UI application.

Create a new workspace (e.g., "MediLedger").

Note the RPC Server URL (e.g., HTTP://127.0.0.1:7545) and Network ID (e.g., 5777).

Configure MetaMask:

Add Ganache as a custom network using the RPC URL and Network ID from the previous step.

Import one of the pre-funded accounts from Ganache into MetaMask by copying its private key.

Deploy the Smart Contract:

Navigate back to the root project directory.

Run the migration command to compile and deploy the HealthChain.sol contract.

Important: This step must be done after starting Ganache.

truffle migrate --reset

Connect the Front-End to the Contract:

After deployment, Truffle will output the address of the newly created contract. Copy this address.

Open the client/src/App.js file.

Paste the copied contract address into the contractAddress variable.

Copy the HealthChain.json ABI file from build/contracts/ into the client/src/ directory, replacing the existing one.

Run the application:

Navigate back to the client directory.

Start the React development server.

npm start

Your browser should open to http://localhost:3000 with the MediLedger application running.