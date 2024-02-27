// App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import PostPage from "./PostPage";
import Post from "./Post";
import SignIn from "./SignIn";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About"; // import the About component
import Privacy from "./Privacy"; // import the Privacy component
import Terms from "./Terms"; // import the Terms component
import Contact from "./Contact"; // import the Contact component
import Profile from "./Profile";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoggedIn = localStorage.getItem("loggedIn");
    return savedLoggedIn !== null ? JSON.parse(savedLoggedIn) : false;
  });

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <Router>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/profile"
          element={<Profile setLoggedIn={setLoggedIn} />}
        />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/:id/comments" element={<Post />} />
        <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />{" "}
        {/* add a new route for the about page */}
        <Route path="/privacy" element={<Privacy />} />{" "}
        {/* add a new route for the privacy page */}
        <Route path="/terms" element={<Terms />} />{" "}
        {/* add a new route for the terms page */}
        <Route path="/contact" element={<Contact />} />{" "}
        {/* add a new route for the contact page */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
