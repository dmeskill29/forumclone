// SignIn.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitSignIn = async (event) => {
    event.preventDefault();
    // Send a request to the server
    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      // If the sign-in was successful, set loggedIn to true and navigate to the home page
      const user = {
        username: username, // replace with the actual username
        // add any other information you need
      };
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);
      navigate("/home");
    } else {
      // If the sign-in was not successful, show an error message
      alert(data.message);
    }
  };

  return (
    <form onSubmit={submitSignIn}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
      {/* <Link to="/password-reset">Forgot your password?</Link> */}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
};

export default SignIn;
