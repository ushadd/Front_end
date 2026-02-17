import React from 'react';
import Booking from '../pages/Booking.jsx';

function Banner() {
  return (
    <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Content */}
          <div className="col-lg-6 text-start">
            <span className="badge bg-soft-success text-success mb-3 p-2 px-3 rounded-pill"
                  style={{ backgroundColor: '#dcfce7', fontWeight: '600' }}>
              ✨ Rated #1 for Home Cleaning
            </span>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Your Home, <span style={{ color: '#00A699' }}>Sparkling Clean</span>
            </h1>
            <p className="lead text-muted mb-4">
              Join 10,000+ homeowners who trust our vetted, background-checked
              professionals to keep their spaces pristine.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-lg px-4 py-3 rounded-3"
                      style={{ backgroundColor: '#00A699', color: 'white', fontWeight: '600' }}>
                Book Your Cleaning

              </button>
              <button className="btn btn-outline-secondary btn-lg px-4 py-3 rounded-3">
                See Pricing
              </button>
            </div>

            {/* Trust Bar */}
            <div className="mt-5 d-flex gap-4 align-items-center opacity-75">
              <small className="fw-bold text-uppercase tracking-wider">Trusted By:</small>
              <span className="fw-bold italic">Forbes</span>
              <span className="fw-bold italic">TechCrunch</span>
            </div>
          </div>

          {/* Right Side: Professional Image */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
                alt="Housekeeping Professional"
                className="img-fluid rounded-4 shadow-lg"
              />
              {/* Floating UI Element to make it look 'App-like' */}
              <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded-3 shadow-sm border-start border-4 border-success">
                <p className="mb-0 small fw-bold text-dark">✓ 100% Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;