import React from 'react';
import './../App.css'; // Use the main App styles

const Login = ({ connectToBlockchain }) => {
  return (
    <div className="card login-card">
      <h2>Welcome to HealthChain</h2>
      <p>A secure, decentralized platform for managing healthcare data.</p>
      <p>Please connect your MetaMask wallet to proceed.</p>
      <button onClick={connectToBlockchain}>Connect Wallet</button>
    </div>
  );
};

export default Login;
