import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  // const [username, setUsername] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [context, setContext] = useState("");
  const [stake, setStake] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser.username,
        title,
        context,
        description,
        time: new Date().toISOString(), // current time in ISO format
        stake: 0, // initial stake value
      }),
    });

    if (response.ok) {
      const data = await response.json();
      navigate(`/posts/${data.postId}`);
    } else {
      console.error("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Context"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={stake}
        onChange={(e) => setStake(Number(e.target.value))}
        placeholder="Stake"
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostPage;
