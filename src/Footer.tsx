// Footer.tsx
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/about">About</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/terms">Terms</Link>
      <Link to="/contact">Contact</Link>
    </footer>
  );
};

export default Footer;
