import React from 'react';
import './../App.css';

const DashboardSelector = ({ setView }) => {
  return (
    <div className="card-container">
      <div className="card" onClick={() => setView('patient')}>
        <h2>Patient Portal</h2>
        <p>Manage your health records and grant access to doctors.</p>
      </div>
      <div className="card" onClick={() => setView('doctor')}>
        <h2>Doctor Portal</h2>
        <p>Register as a doctor and view records of patients who gave you access.</p>
      </div>
      <div className="card" onClick={() => setView('supplychain')}>
        <h2>Supply Chain Portal</h2>
        <p>Register as a manufacturer and track the drug supply chain.</p>
      </div>
    </div>
  );
};

export default DashboardSelector;
