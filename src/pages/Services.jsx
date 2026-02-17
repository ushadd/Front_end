import React from 'react';
import { useLocation } from "react-router-dom";
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
    tag: "Most Popular",
    keywords: ["home", "house", "residential"]
  },
  {
    id: 2,
    service_name: "Commercial Cleaning",
    description: "Professional workspace maintenance to ensure a productive and healthy environment for your team.",
    price: 999,
    duration: "4-6 hrs",
    icon: <Building2 className="service-icon" />,
    tag: "Business",
    keywords: ["office", "commercial", "business", "workplace"]
  },
  {
    id: 3,
    service_name: "Deep Cleaning",
    description: "An intensive top-to-bottom scrub targeting hidden grime, vents, and appliances. Highly detailed.",
    price: 1299,
    duration: "5-8 hrs",
    icon: <Sparkles className="service-icon" />,
    tag: "Premium",
    keywords: ["deep", "intensive", "scrub"]
  }
];

function Services() {
  // 1. Get the search query from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase() || "";

  // 2. Filter logic based on your requirements
  const filteredServices = serviceData.filter((service) => {
    if (!query) return true; // Show everything if no search

    // Show Home Cleaning if user types "home"
    if (query.includes("home")) return service.service_name === "Home Cleaning";

    // Show Commercial if user types "office"
    if (query.includes("office")) return service.service_name === "Commercial Cleaning";

    // Show Deep Cleaning if user types "deep"
    if (query.includes("deep")) return service.service_name === "Deep Cleaning";

    // General search: Check if query exists in name, description, or keywords
    return (
      service.service_name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.keywords.some(k => k.includes(query))
    );
  });

  return (
    <div className="services-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-outline">Our Expertise</span>
          <h2 className="display-5 fw-bold mt-2">Professional Cleaning Services</h2>
          {query && (
            <p className="text-primary mt-2">
              Showing results for: <strong>"{query}"</strong>
            </p>
          )}
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Tailored cleaning solutions designed to fit your schedule and exceed your expectations.
          </p>
        </div>

        <div className="row g-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
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
            ))
          ) : (
            <div className="text-center py-5">
              <h3>No services found matching "{query}"</h3>
              <p>Try searching for "Home", "Office", or "Deep Cleaning".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;