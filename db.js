// db.js
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import mongodb from 'mongodb';
import nodemailer from 'nodemailer';


const uri = "mongodb+srv://solvesuiteus:mLykPnS3hlch22sD@cluster0.r8gkmtv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export async function connectDb() {
  await client.connect();
  return client.db('test');
}

export async function createUser(username, password) {
  const db = await connectDb();
  const collection = db.collection('users');
  const hashedPassword = await bcrypt.hash(password, 10);
  await collection.insertOne({ username, password: hashedPassword, role: 'user' });
}

export async function findUser(username) {
  const db = await connectDb();
  const collection = db.collection('users');
  return collection.findOne({ username });
}

export async function createPost(username, title, description, context, time, stake) {
  const db = await connectDb();
  const collection = db.collection('posts');
  const post = { username, title, description, context, time, stake, date: new Date() };
  const result = await collection.insertOne(post);
  post.id = post._id;
  delete post._id;
  return post;
}

export async function getPost(id) {
  const db = await connectDb();
  const collection = db.collection('posts');
  const post = await collection.findOne({ _id: new mongodb.ObjectId(id) });
  
  if (!post) {
    return null;
  }

  post.id = post._id;
  delete post._id;

  return post;
}

export async function getPosts() {
  const db = await connectDb();
  const collection = db.collection('posts');
  return collection.find().toArray();
}

export async function createComment(postId, text) {
  const db = await connectDb();
  const collection = db.collection('comments');
  const comment = {
    postId,
    text,
    created_at: new Date(),
  };
  await collection.insertOne(comment);
  return comment
}

export async function getComments(id) {
  const db = await connectDb();
  const collection = db.collection('comments'); 
  const comments = await collection.find({ postId: id }).toArray();
  return comments;
}

export async function sendPasswordResetEmail(email, token) {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail', // replace with your email service
    auth: {
      user: process.env.EMAIL_USERNAME, // replace with your email username
      pass: process.env.EMAIL_PASSWORD, // replace with your email password
    },
  });

  // Create the email options
  let mailOptions = {
    from: process.env.EMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: 'Password Reset', // Subject line
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:
    http://localhost:3000/reset/${token}
    If you did not request this, please ignore this email and your password will remain unchanged.`, // plain text body
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}