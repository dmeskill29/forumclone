// Header.tsx
import { Link } from "react-router-dom";
import Search from "./Search";
import "./Header.css"; // Import the CSS file

const Header = ({ setSearchTerm, loggedIn }) => {
  return (
    <header className="header">
      <Link to="/home">Home</Link>
      <Search setSearchTerm={setSearchTerm} />
      {loggedIn ? (
        <Link to="/profile">Profile</Link>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </header>
  );
};

export default Header;
