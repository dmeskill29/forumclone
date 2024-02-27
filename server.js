import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { createUser, findUser, createPost, createComment, getPosts, getPost, getComments, sendPasswordResetEmail } from './db.js';

const app = express();
app.use(express.json());
app.use(cors());

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already in use
  const existingUser = await findUser(username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already in use" });
  }

  // Create the user
  await createUser(username, password);

  res.status(201).json({ message: "Account created", success: true });
});

function checkRole(role) {
  return async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = await jwt.verify(token, 'fordee');
      if (decoded.role === role) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = await findUser(username);

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Check the password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, 'fordee', { expiresIn: '1d' });

  res.status(200).json({ message: "Logged in", success: true, username: username, token: token });
});

app.get("/free-endpoint",  (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", checkRole, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.post('/password-reset', async (req, res) => {
  const { email } = req.body;

  // Validate the email address
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Generate a password reset token
  const token = crypto.randomBytes(20).toString('hex');

  // Store the token and email in your database
  // This is a placeholder and should be replaced with your actual database code
  await db.collection('passwordResetTokens').insertOne({ email, token });

  // Send the password reset email
  // This is a placeholder and should be replaced with your actual email sending code
  await sendPasswordResetEmail(email, token);

  res.json({ message: 'Password reset email sent' });
});



app.get('/some-protected-route', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'fordee');
    // The decoded object will contain the data you signed the JWT with (in this case, the user ID)
    // You can now use this information to authorize the user for the requested resource
  } catch (err) {
    // The token was not valid
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.post('/posts', async (req, res) => {
  const { username, title, description, context, time, stake } = req.body;
  try {
    const post = await createPost(username, title, description, context, time, stake);
    res.status(201).json({ message: 'Post created', postId: post.id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error getting posts' });
  }
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPost(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await createComment(id, text);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment' });
  }
});

app.get('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await getComments(id);
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: 'Comments not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting comments' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});