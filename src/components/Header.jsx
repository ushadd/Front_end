import { useState } from "react"; // 1. Import useState
import { Link, useNavigate } from "react-router-dom"; // 2. Import useNavigate
import logo from "../assets/img.png";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirects to /services?query=yoursearchterm
      navigate(`/services?query=${encodeURIComponent(searchTerm.toLowerCase())}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="CleanCrew Logo" width="40" height="40" className="me-2" />
          <span className="fw-bold">CleanCrew</span>
        </Link>

        {/* ... Mobile Toggle ... */}

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="mx-auto">
            {/* 3. Attach handleSearch to onSubmit */}
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // 4. Update state
              />
              <button className="btn btn-light" type="submit">Search</button>
            </form>
          </div>

          {/* ... Rest of your links ... */}
        </div>
      </div>
    </nav>
  );
}