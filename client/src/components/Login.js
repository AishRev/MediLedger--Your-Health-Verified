// import React from 'react';
// import './../App.css'; // Use the main App styles

// const Login = ({ connectToBlockchain }) => {
//   return (
//     <div className="card login-card">
//       <h2>Welcome to HealthChain</h2>
//       <p>A secure, decentralized platform for managing healthcare data.</p>
//       <p>Please connect your MetaMask wallet to proceed.</p>
//       <button onClick={connectToBlockchain}>Connect Wallet</button>
//     </div>
//   );
// };

// export default Login;

import React from 'react';
import './../App.css';

const Login = ({ connectToBlockchain }) => {
  return (
    <div className="login-container">
      <div className="card login-card" style={{ animation: 'popIn 0.5s ease-out' }}>
        <h2>Welcome to MediLedger</h2>
        <p>A secure, decentralized platform for managing healthcare data on the blockchain.</p>
        <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>
          Please connect your MetaMask wallet to begin.
        </p>
        <button onClick={connectToBlockchain} style={{ marginTop: '1rem' }}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Login;

