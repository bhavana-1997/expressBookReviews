const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body; // Get username & password from request body

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (users[username]) {
    return res
      .status(400)
      .json({ message: "Username already exists. Choose a different one." });
  }

  // Register the new user
  users[username] = { password }; // Store user with password (in a real app, hash the password!)

  return res
    .status(201)
    .json({ message: `User '${username}' registered successfully!` });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code her
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const authorName = req.params.author;
  let matchingBooks = [];
  for (let key in books) {
    if (books[key].author === authorName) {
      matchingBooks.push(books[key]);
    }
  }
  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found" });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let searchTitle = req.params.title.toLowerCase(); // Convert input to lowercase
  let matchingBooks = Object.values(books).filter((book) =>
    book.title.toLowerCase().includes(searchTitle)
  );

  if (matchingBooks.length > 0) {
    res.json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found with that title" });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn; // Get ISBN from request parameters

  if (books[isbn]) {
    res.json({ reviews: books[isbn].reviews }); // Send the reviews of the book
  } else {
    res.status(404).json({ message: "Book not found" }); // Error if ISBN doesn't exist
  }
});
function getBookList() {
  return new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject("No books available");
    }
  });
}

// Get the book list available in the shop
public_users.get("/books-promise", function (req, res) {
  getBookList()
    .then((bk) => res.status(200).json(bk))
    .catch((error) =>
      res.status(500).json({ message: "Failed to fetch books", error })
    );
});

module.exports.general = public_users;
