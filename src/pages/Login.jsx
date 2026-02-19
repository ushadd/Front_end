import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import { User, Mail, Lock, Phone, MapPin, ArrowRight } from "lucide-react";
import "./Login.css"; // Keep the CSS filename or rename to Login.css as preferred

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Prepare login payload
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        setTimeout(() => navigate("/booking"), 1000);
      } else {
        // Register flow
        await registerUser(formData);
        setMessage("Registration successful! Switching to login...");
        // After 2 seconds, toggle back to login view so they can sign in
        setTimeout(() => {
          setIsLogin(true);
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      setMessage(isLogin ? "Invalid email or password" : "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Enter your details to access your bookings"
              : "Join us to start booking professional services"}
          </p>
        </div>

        {message && (
          <div className={`auth-alert ${message.includes("successful") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="grid-inputs">
              <div className="input-group">
                <User className="icon" size={18} />
                <input required name="firstName" placeholder="First Name" onChange={handleChange} />
              </div>
              <div className="input-group">
                <input required name="lastName" placeholder="Last Name" onChange={handleChange} />
              </div>
            </div>
          )}

          <div className="input-group">
            <Mail className="icon" size={18} />
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <Phone className="icon" size={18} />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="input-group">
            <Lock className="icon" size={18} />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
            <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>New here? <span onClick={() => setIsLogin(false)}>Create an account</span></p>
          ) : (
            <p>Already a user? <span onClick={() => setIsLogin(true)}>Click here for Login</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;