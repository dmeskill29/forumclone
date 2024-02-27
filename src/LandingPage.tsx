// LandingPage.tsx
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const showHomePage = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Welcome to our app!</h1>
      <button onClick={showHomePage}>Enter</button>
    </div>
  );
};

export default LandingPage;
