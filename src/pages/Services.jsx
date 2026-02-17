import React from 'react';
import { Home, Building2, Sparkles, Clock, ArrowRight } from 'lucide-react';
import './Services.css';

const serviceData = [
  {
    id: 1,
    service_name: "Home Cleaning",
    description: "Comprehensive sanitation for living spaces, kitchens, and bedrooms using eco-friendly products.",
    price: 799,
    duration: "2-3 hrs",
    icon: <Home className="service-icon" />,
    tag: "Most Popular"
  },
  {
    id: 2,
    service_name: "Commercial Cleaning",
    description: "Professional workspace maintenance to ensure a productive and healthy environment for your team.",
    price: 999,
    duration: "4-6 hrs",
    icon: <Building2 className="service-icon" />,
    tag: "Business"
  },
  {
    id: 3,
    service_name: "Deep Cleaning",
    description: "An intensive top-to-bottom scrub targeting hidden grime, vents, and appliances. Highly detailed.",
    price:1299,
    duration: "5-8 hrs",
    icon: <Sparkles className="service-icon" />,
    tag: "Premium"
  }
];

function Services() {
  return (
    <div className="services-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-outline">Our Expertise</span>
          <h2 className="display-5 fw-bold mt-2">Professional Cleaning Services</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Tailored cleaning solutions designed to fit your schedule and exceed your expectations.
          </p>
        </div>

        <div className="row g-4">
          {serviceData.map((service) => (
            <div className="col-lg-4 col-md-6" key={service.id}>
              <div className="modern-service-card">
                {service.tag && <div className="card-tag">{service.tag}</div>}

                <div className="icon-box">
                  {service.icon}
                </div>

                <div className="card-body-content">
                  <h4>{service.service_name}</h4>
                  <p>{service.description}</p>

                  <div className="service-meta">
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{service.duration}</span>
                    </div>
                    <div className="price-box">
                      <span className="currency">Rs</span>
                      <span className="amount">{service.price}</span>
                    </div>
                  </div>

                  <button className="btn-modern">
                    Book Service <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;