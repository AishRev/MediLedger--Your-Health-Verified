

// import React from 'react';
// import './../App.css';

// const DashboardSelector = ({ setView }) => {
//   return (
//     <div className="selector-container">
//       <div className="hero-section">
//         <img src="https://placehold.co/150x150/007bff/FFFFFF?text=MD" alt="Doctor" className="hero-image" />
//         <div className="hero-quote">
//           <p>"The good physician treats the disease; the great physician treats the patient who has the disease."</p>
//           <footer>- William Osler</footer>
//         </div>
//       </div>
//       <div className="card-container">
//         <div className="card" style={{animationDelay: '0.1s'}} onClick={() => setView('patient')}>
//           <h2>Patient Portal</h2>
//           <p>Manage your health records and interact with services.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.2s'}} onClick={() => setView('doctor')}>
//           <h2>Doctor Portal</h2>
//           <p>Register as a doctor and view patient records.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.3s'}} onClick={() => setView('supplychain')}>
//           <h2>Supply Chain</h2>
//           <p>Register as a manufacturer and track drugs.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.4s'}} onClick={() => setView('trial')}>
//           <h2>Clinical Trials</h2>
//           <p>Manage decentralized clinical trials.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.5s'}} onClick={() => setView('claim')}>
//           <h2>Insurance Claims</h2>
//           <p>Process healthcare insurance claims.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardSelector;

// import React, { useEffect, useRef } from 'react';
// import './../App.css';

// const DashboardSelector = ({ setView }) => {
//   const titleRef = useRef(null);
//   const cardsRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('is-visible');
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     // --- FIX IS HERE ---
//     // We create local variables for the refs' current values.
//     const currentTitleRef = titleRef.current;
//     const currentCardsRef = cardsRef.current;

//     if (currentTitleRef) observer.observe(currentTitleRef);
//     if (currentCardsRef) observer.observe(currentCardsRef);

//     // The cleanup function now uses these stable variables.
//     return () => {
//       if (currentTitleRef) observer.unobserve(currentTitleRef);
//       if (currentCardsRef) observer.unobserve(currentCardsRef);
//     };
//   }, []); // The dependency array remains empty as intended.

//   return (
//     <div className="selector-container">
//       <div className="hero-section-animated">
//         <img 
//             src="https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//             alt="Doctor" 
//             className="hero-image-large"
//             onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x400/eef2f7/3a7bd5?text=MediLedger'; }}
//         />
//         <div className="hero-overlay-text">Welcome to MediLedger</div>
//       </div>

//       <div className="welcome-text-container" ref={titleRef}>
//         <h2 className="welcome-title">Your Health, Verified.</h2>
//         <p className="welcome-tagline">
//           Select a portal below to manage your decentralized health identity.
//         </p>
//       </div>

//       <div className="card-container" ref={cardsRef}>
//         <div className="card" style={{animationDelay: '0.1s'}} onClick={() => setView('patient')}>
//           <h2>Patient Portal</h2>
//           <p>Manage your health records and grant access to doctors.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.2s'}} onClick={() => setView('doctor')}>
//           <h2>Doctor Portal</h2>
//           <p>Register as a doctor and view records of patients who gave you access.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.3s'}} onClick={() => setView('supplychain')}>
//           <h2>Supply Chain</h2>
//           <p>Register as a manufacturer and track drugs.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.4s'}} onClick={() => setView('trial')}>
//           <h2>Clinical Trials</h2>
//           <p>Manage decentralized clinical trials.</p>
//         </div>
//         <div className="card" style={{animationDelay: '0.5s'}} onClick={() => setView('claim')}>
//           <h2>Insurance Claims</h2>
//           <p>Process healthcare insurance claims.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardSelector;

import React, { useEffect, useRef } from 'react';
import './../App.css';

const DashboardSelector = ({ setView }) => {
  // We use refs and an IntersectionObserver to trigger animations on scroll
  const cardsRef = useRef(null);
  const heroRef = useRef(null);
  const quoteRef = useRef(null); // Ref for the quote section to animate it out

  useEffect(() => {
    // This observer will add/remove 'is-visible' to re-trigger card animations
    const repeatingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    // This observer will fade out the hero and slide out the quote
    const heroAnimationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if(heroRef.current) {
                    heroRef.current.classList.toggle('fade-out', entry.isIntersecting);
                }
                if(quoteRef.current) {
                    quoteRef.current.classList.toggle('slide-out-left', entry.isIntersecting);
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the cards section is visible
        }
    );

    const currentCardsRef = cardsRef.current;

    if (currentCardsRef) {
        repeatingObserver.observe(currentCardsRef);
        heroAnimationObserver.observe(currentCardsRef);
    }

    // Cleanup observers on component unmount
    return () => {
      if (currentCardsRef) {
          repeatingObserver.unobserve(currentCardsRef);
          heroAnimationObserver.unobserve(currentCardsRef);
      }
    };
  }, []);

  return (
    <div className="selector-container-landing">
      {/* The large vertical title is now a separate fixed element */}
      <h1 className="hero-title-fixed">MEDILEDGER</h1>

      <div className="landing-hero" ref={heroRef}>
        <div className="hero-text-panel" ref={quoteRef}>
          <div className="hero-quote-animated">
            <p className="quote-main">Your Health, Verified.</p>
            <p className="quote-sub">
              MediLedger provides a secure, immutable, and patient-centric platform, putting control over your sensitive health data back where it belongs - in your hands.
            </p>
          </div>
        </div>
        <div className="hero-image-panel">
           <img 
            src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Doctor with tablet" 
            className="hero-image-landing"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/eef2f7/3a7bd5?text=MediLedger'; }}
          />
        </div>
      </div>

      {/* This invisible element creates the space for the parallax scroll effect */}
      <div style={{ height: '100vh' }}></div>

      <div className="card-container" ref={cardsRef}>
        <div className="card card-left" onClick={() => setView('patient')}>
          <h2>Patient Portal</h2>
          <p>Manage your health records and grant access to doctors.</p>
        </div>
        <div className="card card-right" onClick={() => setView('doctor')}>
          <h2>Doctor Portal</h2>
          <p>Register as a doctor and view records of patients who gave you access.</p>
        </div>
        <div className="card card-left" onClick={() => setView('supplychain')}>
          <h2>Supply Chain</h2>
          <p>Register as a manufacturer and track drugs.</p>
        </div>
        <div className="card card-right" onClick={() => setView('trial')}>
          <h2>Clinical Trials</h2>
          <p>Manage decentralized clinical trials.</p>
        </div>
        <div className="card card-left" onClick={() => setView('claim')}>
          <h2>Insurance Claims</h2>
          <p>Process healthcare insurance claims.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;



