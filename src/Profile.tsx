import { useNavigate } from "react-router-dom";

const Profile = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the user's token from local storage (or wherever you're storing it)
    localStorage.removeItem("token");
    setLoggedIn(false);

    // Redirect the user to the login page
    navigate("/SignIn");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Add the rest of the profile page content here */}
    </div>
  );
};

export default Profile;
