
// new version
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-section">
          <h2 className="footer-logo">FurniLux</h2>
          <p>
            Premium furniture for modern homes.  
            Quality, comfort & style in every piece.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@furnilux.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>India</p>
        </div>

      {/* SOCIAL */}
<div className="footer-section">
  <h3>Follow Us</h3>
  <div className="social-icons">
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>

    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://twitter.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <FaTwitter />
    </a>

    
  </div>
</div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FurniLux. All rights reserved.
      </div>



      
    </footer>
  );
}

export default Footer;
