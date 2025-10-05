# 🏥 MediLedger  
**Tagline:** *Your Health, Verified.*

---

## 🩸 Overview  
**MediLedger** is a comprehensive **decentralized application (DApp)** built on the **Ethereum blockchain** that revolutionizes healthcare data management.  
It provides a **secure, transparent, and patient-centric platform** for managing:  
- Electronic Health Records (EHR)  
- Pharmaceutical Supply Chain  
- Clinical Trials  
- Insurance Claims  

MediLedger puts **control back into the hands of patients, doctors, manufacturers, and insurers** through blockchain transparency.

---

## 🖼️ Application Preview  
MediLedger features a **clean, modern, and multi-portal interface** for different user roles, starting with a central dashboard:
![Selector Dashboard](./assets/LandingPage.png)
![Selector Dashboard](./assets/LP1.png)

### 👤 Patient Portal  
![Patient Portal](./assets/Patient.png)  
### 🩺 Doctor Portal  
![Doctor Portal](./assets/Doctor.png)  
### 💊 Supply Chain Portal  
![Supply Chain Portal](./assets/Supply.png)
### 🔬 Clinical Trial Portal
![Clinical Trial Portal](./assets/Clinic.png)
### 📄 Insurance Claim Portal
![Insurance Claim Portal](./assets/Insuranceclaim.png)


---

## ✨ Core Features  

### 👤 Patient Portal  
- **Decentralized Identity:** Register securely using an Ethereum wallet and receive a unique Patient ID (e.g., `P1`).  
- **Record Management:** Add and view your immutable medical records on the blockchain.  
- **Access Control:** Grant and revoke access to your records for doctors using their Doctor ID (e.g., `D1`).  
- **Service Interaction:** Consent to join clinical trials and submit insurance claims directly from your dashboard.  

---

### 🩺 Doctor Portal  
- **Professional Registration:** Register as a healthcare provider and receive a Doctor ID (e.g., `D1`).  
- **Secure Record Viewing:** Access patient records only if granted explicit permission.  
- **Claim Verification:** Review and verify insurance claims from your patients, serving as a trusted intermediary.  

---

### 💊 Drug Supply Chain Portal  
- **Manufacturer Registration:** Pharmaceutical companies can register and get a unique Manufacturer ID.  
- **Drug Tokenization:** Add new drug batches as blockchain tokens, ensuring authenticity and traceability.  
- **Track and Trace:** Update drug status (e.g., *In-Transit*, *At Pharmacy*) for transparency and anti-counterfeiting.  

---

### 🔬 Clinical Trial Portal  
- **Trial Creation:** Research institutions can create and log trials on-chain with complete transparency.  
- **Tamper-Proof Data Logging:** Log anonymized data hashes for verifiable research integrity.  
- **Patient Consent:** Patients can securely consent to trial participation recorded on the blockchain.  

---

### 📄 Insurance Claim Portal  
- **Seamless Submission:** Patients can file insurance claims for treatments directly.  
- **Multi-Party Verification:** Claims undergo doctor verification and insurer approval, each step immutably recorded.  
- **Transparent Status Tracking:** Track claim progress from submission to approval or rejection.  

---

## 🛠️ Technology Stack  
| Component | Technology |
|------------|-------------|
| **Blockchain** | Solidity, Truffle Suite, Ganache |
| **Front-End** | React.js, Ethers.js, JavaScript (ES6+), CSS3 |
| **Wallet & Authentication** | MetaMask |

---

## 📜 License  
This project is licensed under the terms of the **MIT License**.

---

## 🚀 Getting Started  
Follow these steps to set up, deploy, and run the project locally.

### ✅ Prerequisites  
Make sure you have the following installed:  
- **Node.js** (v14 or higher)  
- **Truffle Suite**  
  ```bash
  npm install -g truffle
Ganache
MetaMask Browser Extension

## 🔧 Installation & Setup (Quick Start)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AishRev/MediLedger--Your-Health-Verified.git
cd MediLedger--Your-Health-Verified
```
### 2️⃣ Environment Reset
Close Ganache, delete the build/ folder.
In client/, remove node_modules/ and package-lock.json.
Restart Ganache with a new workspace.
Reset MetaMask → Settings → Advanced → Reset Account.
### 3️⃣ Install & Deploy
```bash
cd client && npm install && cd ..
truffle migrate --reset
``` 
4️⃣ Configure Front-End
Copy the four new ABIs (HealthChain.json, DrugSupplyChain.json, ClinicalTrial.json, InsuranceClaim.json) from build/contracts/ → client/src/.
Update contract addresses in client/src/App.js.
5️⃣ Run the App
``` bash
cd client
npm start
```

👩‍💻 Author: Aishwarya Sreejith
🩺 'Your Health — Verified' on the Blockchain.
