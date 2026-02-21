import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { Calendar, User, Settings, Mail, Phone, MapPin, Clock, Star, CheckCircle } from "lucide-react";
import { createBooking, createPayment } from "../services/api";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  // Initialize with passed service if available
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    service: location.state?.selectedService || "",
    date: "",
    hours: "",
    address: ""
  });

  const RATE_PER_HOUR = 299;

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalConfirm = async () => {
    setLoading(true);
    try {
      const bookingData = {
        ...booking,
        property_type: "Home",
        hours: parseInt(booking.hours)
      };

      const bookingRes = await createBooking(bookingData);
      const bookingId = bookingRes.data.bookingId || bookingRes.data.id;

      const paymentData = {
        booking: { id: bookingId },
        amount: parseFloat(booking.hours) * RATE_PER_HOUR,
        payment_method: "Cash",
        payment_status: "Pending",
      };

      await createPayment(paymentData);
      setStep(3);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Failed to save booking.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) return (
    <div id="book" className="booking-wrapper">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Book Your Service</h2>
        </div>
        <form onSubmit={handleBookingSubmit} className="booking-form">
          <div className="input-group">
            <User className="icon" size={18} />
            <input required name="name" placeholder="Full Name" onChange={handleChange} value={booking.name} />
          </div>
          <div className="grid-inputs">
            <div className="input-group"><Mail className="icon" size={18} /><input required type="email" name="email" placeholder="Email" onChange={handleChange} value={booking.email} /></div>
            <div className="input-group"><Phone className="icon" size={18} /><input required type="tel" name="phone" placeholder="Phone" onChange={handleChange} value={booking.phone} /></div>
          </div>
          <div className="input-group">
            <MapPin className="icon" size={18} /><input required name="address" placeholder="House Address" onChange={handleChange} value={booking.address} />
          </div>
          <div className="grid-inputs">
            <div className="input-group">
              <Settings className="icon" size={18} />
              <select required name="service" onChange={handleChange} value={booking.service}>
                <option value="" disabled>Select Service</option>
                <option value="Cleaning">House Cleaning</option>
                <option value="Commercial Clean">Commercial Cleaning</option>
                <option value="Deep Clean">Deep Cleaning</option>
              </select>
            </div>
            <div className="input-group">
              <Clock className="icon" size={18} />
              <select required name="hours" onChange={handleChange} value={booking.hours}>
                <option value="" disabled>Hours</option>
                {[1, 2, 3, 4, 5, 6].map(h => <option key={h} value={h}>{h} {h === 1 ? 'Hr' : 'Hrs'}</option>)}
              </select>
            </div>
          </div>
          <div className="input-group">
            <Calendar className="icon" size={18} /><input required type="date" name="date" onChange={handleChange} value={booking.date} />
          </div>
          <button type="submit" className="submit-btn">Continue to Confirmation</button>
        </form>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className="booking-wrapper">
      <div className="booking-card payment-card">
        <div className="booking-header">
          <h2>Confirm Booking</h2>
          <div className="price-summary">
            <span>Total Amount (Cash):</span>
            <strong>₹{booking.hours * RATE_PER_HOUR}</strong>
          </div>
        </div>
        <div className="cash-view">
          <p><strong>Service:</strong> {booking.service}</p>
          <button onClick={handleFinalConfirm} className="submit-btn w-100" disabled={loading}>
            {loading ? "Processing..." : "Confirm & Book Now"}
          </button>
          <button className="back-link" onClick={() => setStep(1)}>← Edit Details</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-wrapper">
      <div className="booking-card success-card">
        <CheckCircle size={60} color="#28a745" />
        <h2>Booking Confirmed!</h2>
        <button className="submit-btn mt-4" onClick={() => window.location.href = "/"}>Back to Home</button>
      </div>
    </div>
  );
}

export default Booking;