
// import React, { useEffect, useRef } from 'react';
// import './../App.css';

// const DashboardSelector = ({ setView }) => {
//   // We use refs and an IntersectionObserver to trigger animations on scroll
//   const cardsRef = useRef(null);
//   const heroRef = useRef(null);
//   const quoteRef = useRef(null); // Ref for the quote section to animate it out

//   useEffect(() => {
//     // This observer will add/remove 'is-visible' to re-trigger card animations
//     const repeatingObserver = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           entry.target.classList.toggle('is-visible', entry.isIntersecting);
//         });
//       },
//       {
//         threshold: 0.2, // Trigger when 20% of the element is visible
//       }
//     );

//     // This observer will fade out the hero and slide out the quote
//     const heroAnimationObserver = new IntersectionObserver(
//         (entries) => {
//             entries.forEach((entry) => {
//                 if(heroRef.current) {
//                     heroRef.current.classList.toggle('fade-out', entry.isIntersecting);
//                 }
//                 if(quoteRef.current) {
//                     quoteRef.current.classList.toggle('slide-out-left', entry.isIntersecting);
//                 }
//             });
//         },
//         {
//             threshold: 0.1, // Trigger when 10% of the cards section is visible
//         }
//     );

//     const currentCardsRef = cardsRef.current;

//     if (currentCardsRef) {
//         repeatingObserver.observe(currentCardsRef);
//         heroAnimationObserver.observe(currentCardsRef);
//     }

//     // Cleanup observers on component unmount
//     return () => {
//       if (currentCardsRef) {
//           repeatingObserver.unobserve(currentCardsRef);
//           heroAnimationObserver.unobserve(currentCardsRef);
//       }
//     };
//   }, []);

//   return (
//     <div className="selector-container-landing">
//       {/* The large vertical title is now a separate fixed element */}
//       <h1 className="hero-title-fixed">MEDILEDGER</h1>

//       <div className="landing-hero" ref={heroRef}>
//         <div className="hero-text-panel" ref={quoteRef}>
//           <div className="hero-quote-animated">
//             <p className="quote-main">Your Health, Verified.</p>
//             <p className="quote-sub">
//               MediLedger provides a secure, immutable, and patient-centric platform, putting control over your sensitive health data back where it belongs - in your hands.
//             </p>
//           </div>
//         </div>
//         <div className="hero-image-panel">
//            <img 
//             src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//             alt="Doctor with tablet" 
//             className="hero-image-landing"
//             onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/eef2f7/3a7bd5?text=MediLedger'; }}
//           />
//         </div>
//       </div>

//       {/* This invisible element creates the space for the parallax scroll effect */}
//       <div style={{ height: '100vh' }}></div>

//       <div className="card-container" ref={cardsRef}>
//         <div className="card card-left" onClick={() => setView('patient')}>
//           <h2>Patient Portal</h2>
//           <p>Manage your health records and grant access to doctors.</p>
//         </div>
//         <div className="card card-right" onClick={() => setView('doctor')}>
//           <h2>Doctor Portal</h2>
//           <p>Register as a doctor and view records of patients who gave you access.</p>
//         </div>
//         <div className="card card-left" onClick={() => setView('supplychain')}>
//           <h2>Supply Chain</h2>
//           <p>Register as a manufacturer and track drugs.</p>
//         </div>
//         <div className="card card-right" onClick={() => setView('trial')}>
//           <h2>Clinical Trials</h2>
//           <p>Manage decentralized clinical trials.</p>
//         </div>
//         <div className="card card-left" onClick={() => setView('claim')}>
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
  const quoteRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const fadeOutObserver = new IntersectionObserver(
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
        { threshold: 0.1 }
    );

    const currentCardsRef = cardsRef.current;
    const currentContactRef = contactRef.current;

    if (currentCardsRef) {
        observer.observe(currentCardsRef);
        fadeOutObserver.observe(currentCardsRef);
    }
    if (currentContactRef) {
        observer.observe(currentContactRef);
    }

    // Cleanup observers on component unmount
    return () => {
      if (currentCardsRef) {
          observer.unobserve(currentCardsRef);
          fadeOutObserver.unobserve(currentCardsRef);
      }
      if (currentContactRef) {
          observer.unobserve(currentContactRef);
      }
    };
  }, []);

  return (
    <div className="selector-container-landing">
      {/* Landing Nav has been removed */}

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

      <div style={{ height: '100vh' }}></div>

      <div className="card-container" ref={cardsRef}>
        <div className="card card-left" onClick={() => setView('patient')}><h2>Patient Portal</h2><p>Manage your health records and grant access to doctors.</p></div>
        <div className="card card-right" onClick={() => setView('doctor')}><h2>Doctor Portal</h2><p>Register as a doctor and view records of patients who gave you access.</p></div>
        <div className="card card-left" onClick={() => setView('supplychain')}><h2>Supply Chain</h2><p>Register as a manufacturer and track drugs.</p></div>
        <div className="card card-right" onClick={() => setView('trial')}><h2>Clinical Trials</h2><p>Manage decentralized clinical trials.</p></div>
        <div className="card card-left" onClick={() => setView('claim')}><h2>Insurance Claims</h2><p>Process healthcare insurance claims.</p></div>
      </div>

      {/* --- UPDATED Contact Section --- */}
      <div className="contact-container" ref={contactRef}>
          <h2>Get In Touch</h2>
          <div className="contact-details">
              <div className="contact-card">
                  <h3>Aishwarya Sreejith</h3>
                  <p>Developer</p>
                  <hr style={{margin: '1rem 0', borderTop: '1px solid #eee'}} />
                  <p><strong>Email:</strong> aishsree20@gmail.com</p>
                  <p><strong>Phone:</strong> +91 7021808219</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardSelector;

