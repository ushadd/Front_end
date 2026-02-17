import { useState } from "react";
import axios from "axios";
import { Calendar, User, Settings, Mail, Phone, MapPin, Clock, CreditCard, Star } from "lucide-react";
import "./Booking.css";

function Booking() {
  const [step, setStep] = useState(1); // 1: Booking, 2: Payment, 3: Success/Rate
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [booking, setBooking] = useState({
    name: "", email: "", phone: "", service: "", date: "", hours: "", address: ""
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to Payment Step
  };
const [paymentSubStep, setPaymentSubStep] = useState("selection"); // selection, upi, cash

const handlePaymentSelection = (method) => {
  if (method === "UPI") {
    setPaymentSubStep("upi");
  } else if (method === "Cash") {
    setPaymentSubStep("cash");
  }
};

  const handlePaymentSubmit = async (method) => {
    setLoading(true);
    try {
      // 1. Save Booking
      const res = await axios.post("http://localhost:8080/api/bookings", booking);

      // 2. Save Payment (Matching your Backend Entity)
      const paymentData = {
        booking: { id: res.data.id },
        amount: booking.hours * 25.0, // Example: $25 per hour
        payment_method: method,
        payment_status: "Success",
        payment_date_time: new Date().toISOString()
      };
      await axios.post("http://localhost:8080/api/payments", paymentData);

      setStep(3);
    } catch (error) {
      alert("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 1: BOOKING FORM ---
  if (step === 1) return (
    <div className="booking-wrapper">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Book Your Service</h2>
          <p>Complete all fields to proceed to payment.</p>
        </div>
        <form onSubmit={handleBookingSubmit} className="booking-form">
          <div className="input-group">
            <User className="icon" size={18} /><input required name="name" placeholder="Full Name" onChange={handleChange} />
          </div>
          <div className="grid-inputs">
            <div className="input-group"><Mail className="icon" size={18} /><input required type="email" name="email" placeholder="Email" onChange={handleChange} /></div>
            <div className="input-group"><Phone className="icon" size={18} /><input required type="tel" name="phone" placeholder="Phone" onChange={handleChange} /></div>
          </div>
          <div className="input-group">
            <MapPin className="icon" size={18} /><input required name="address" placeholder="House Address" onChange={handleChange} />
          </div>
          <div className="grid-inputs">
            <div className="input-group">
              <Settings className="icon" size={18} />
              <select required name="service" onChange={handleChange} defaultValue="">
                <option value="" disabled>Service</option>
                <option value="Cleaning">House Cleaning</option>
                <option value="Commercial Clean">Commercial Cleaning</option>
                <option value="Deep Clean">Deep Cleaning</option>
              </select>
            </div>
            <div className="input-group">
              <Clock className="icon" size={18} />
              <select required name="hours" onChange={handleChange} defaultValue="">
                <option value="" disabled>Hours</option>
                {[1, 2, 3, 4, 5, 6].map(h => <option key={h} value={h}>{h} Hours</option>)}
              </select>
            </div>
          </div>
          <div className="input-group">
            <Calendar className="icon" size={18} /><input required type="date" name="date" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn">Continue to Payment</button>
        </form>
      </div>
    </div>
  );

 // --- STEP 2: PAYMENT UI ---
 if (step === 2) {
   return (
     <div className="booking-wrapper">
       <div className="booking-card payment-card">

         {/* Header Section */}
         <div className="booking-header">
           <h2>Payment</h2>
           <div className="price-summary">
             <span>Total Amount:</span>
             <strong>₹{booking.hours * 299}</strong>
           </div>
         </div>

         {/* 1. Initial Selection View */}
         {paymentSubStep === "selection" && (
           <div className="payment-options-container">
             <p className="text-muted">How would you like to pay?</p>
             <div className="payment-options">
               <button onClick={() => handlePaymentSelection("UPI")} className="pay-opt">
                 <span className="opt-title">UPI / QR Code</span>
                 <span className="opt-sub">GPay, PhonePe, etc.</span>
               </button>
               <button onClick={() => handlePaymentSelection("Cash")} className="pay-opt">
                 <span className="opt-title">Cash</span>
                 <span className="opt-sub">Pay after service</span>
               </button>
             </div>
           </div>
         )}

         {/* 2. UPI Scanner View */}
         {paymentSubStep === "upi" && (
           <div className="upi-view">
             <div className="qr-placeholder">
               {/* Replace src with your dynamic QR generator URL if needed */}
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleUPI" alt="QR Code" />
               <p>Scan to pay ₹{booking.hours * 299}</p>
             </div>
             <div className="app-shortcuts">
               <button onClick={() => handlePaymentSubmit("GPay")} className="app-btn gpay">Pay via GPay</button>
               <button onClick={() => handlePaymentSubmit("PhonePe")} className="app-btn phonepe">Pay via PhonePe</button>
             </div>
             <button className="back-link" onClick={() => setPaymentSubStep("selection")}>← Back to options</button>
           </div>
         )}

         {/* 3. Cash Message View */}
         {paymentSubStep === "cash" && (
           <div className="cash-view">
             <div className="info-box">
               <p><strong>Note:</strong> Please pay the amount directly to the service provider once the task is completed.</p>
             </div>
             <button onClick={() => handlePaymentSubmit("Cash")} className="submit-btn w-100" disabled={loading}>
               {loading ? "Booking..." : "Confirm & Book Service"}
             </button>
             <button className="back-link" onClick={() => setPaymentSubStep("selection")}>Change payment method</button>
           </div>
         )}
       </div>
     </div>
   );
 }

  // --- STEP 3: SUCCESS & RATING ---
  return (
    <div className="booking-wrapper">
      <div className="booking-card success-card">
        <h2>Service Completed!</h2>
        <p>How would you rate your experience?</p>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              fill={rating >= star ? "#ffc107" : "none"}
              stroke={rating >= star ? "#ffc107" : "#ccc"}
              onClick={() => setRating(star)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <button className="submit-btn mt-4" onClick={() => alert("Thank you for your feedback!")}>Submit Review</button>
      </div>
    </div>
  );
}

export default Booking;