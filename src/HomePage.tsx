// HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
      ))}
      <Link to="/postpage">
        <button>Create a new post</button>
      </Link>
    </div>
  );
};

export default HomePage;
