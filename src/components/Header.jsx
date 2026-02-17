import { Link } from "react-router-dom";
import logo from "../assets/img.png";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">

        {/* LEFT: Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="CleanCrew Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold">CleanCrew</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* CENTER: Search Bar */}
          <div className="mx-auto">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search services..."
              />
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </form>
          </div>

          {/* RIGHT: Navigation Links */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/booking">Book Now</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Header;