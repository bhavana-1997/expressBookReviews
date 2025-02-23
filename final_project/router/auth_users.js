const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: "testUser", password: "password123" },
  { username: "newUser", password: "pass456" },
];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  // Check if username and password are provided
  const { username, password } = req.body;
  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ username }, "secretKey", { expiresIn: "1h" });
  req.session.authorization = { token };
  return res.status(200).json({ message: "Login successful", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const { review } = req.body; // Extract review from request body
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract token from "Bearer <token>" format
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }
  // Verify JWT token
  jwt.verify(tokenParts[1], "secretKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    const username = decoded.username; // Extract username from token
    // Check if the book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: `ISBN ${isbn} not found` });
    }
    // Initialize reviews if not present
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }
    // Add or update review for the logged-in user
    books[isbn].reviews[username] = review;

    return res.status(200).json({
      message: "Review successfully added/updated",
      reviews: books[isbn].reviews,
    });
  });
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const token = req.headers.authorization;

  console.log(
    "Received delete request for review:",
    isbn,
    req.headers.authorization
  );

  // Validate token presence
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract token from "Bearer <token>" format
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Verify token and get username
  jwt.verify(tokenParts[1], "secretKey", (err, decoded) => {
    if (err) {
      console.log("JWT verification error:", err);
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    const username = decoded.username;
    console.log("Deleting review for user:", username);

    // Check if book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: `ISBN ${isbn} not found` });
    }

    let book = books[isbn];

    // Check if the user has a review to delete
    if (!book.reviews || !book.reviews[username]) {
      return res.status(404).json({ message: "No review found for this user" });
    }

    // Delete the user's review
    delete book.reviews[username];

    return res.status(200).json({
      message: "Review successfully deleted",
      remainingReviews: book.reviews,
    });
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
