// SignUp.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitSignUp = async (event) => {
    event.preventDefault();
    // Send a request to the server
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      // If the sign-up was successful, navigate to the sign-in page
      navigate("/signin");
    } else {
      // If the sign-up was not successful, show an error message
      alert(data.message);
    }
  };

  return (
    <form onSubmit={submitSignUp}>
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
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </form>
  );
};

export default SignUp;
