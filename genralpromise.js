const axios = require("axios");

const API_URL = "http://localhost:5000/books-promise"; // Change this if your API uses a different port
const BASE_URL = "http://localhost:5000"; // Base URL for ISBN fetching

// Function to fetch books using async-await
async function fetchBooksAsync() {
  try {
    const response = await axios.get(API_URL);
    console.log("Books available (Async-Await):", response.data);
  } catch (error) {
    console.error("Error fetching books (Async-Await):", error.message);
  }
}

// Function to fetch books using Promises
function fetchBooksPromise() {
  axios
    .get(API_URL)
    .then((response) => {
      console.log("Books available (Promise):", response.data);
    })
    .catch((error) => {
      console.error("Error fetching books (Promise):", error.message);
    });
}

// Function to fetch book details by ISBN using async-await
async function fetchBookByISBNAsync(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(`Book Details (Async-Await) for ISBN ${isbn}:`, response.data);
  } catch (error) {
    console.error(
      `Error fetching book (Async-Await) for ISBN ${isbn}:`,
      error.message
    );
  }
}

// Function to fetch book details by ISBN using Promises
function fetchBookByISBNPromise(isbn) {
  axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book Details (Promise) for ISBN ${isbn}:`, response.data);
    })
    .catch((error) => {
      console.error(
        `Error fetching book (Promise) for ISBN ${isbn}:`,
        error.message
      );
    });
}
// Function to fetch books by author using async-await (Task 12)
async function fetchBookByAuthorAsync(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log(`Books by Author (Async-Await) '${author}':`, response.data);
  } catch (error) {
    console.error(
      `Error fetching books (Async-Await) by Author '${author}':`,
      error.message
    );
  }
}

// Function to fetch books by author using Promises (Task 12)
function fetchBookByAuthorPromise(author) {
  axios
    .get(`${BASE_URL}/author/${author}`)
    .then((response) => {
      console.log(`Books by Author (Promise) '${author}':`, response.data);
    })
    .catch((error) => {
      console.error(
        `Error fetching books (Promise) by Author '${author}':`,
        error.message
      );
    });
}
// Function to fetch book details by Title using async-await (Task 13)
async function fetchBookByTitleAsync(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(
      `Book Details (Async-Await) for Title '${title}':`,
      response.data
    );
  } catch (error) {
    console.error(
      `Error fetching book (Async-Await) for Title '${title}':`,
      error.message
    );
  }
}

// Function to fetch book details by Title using Promises (Task 13)
function fetchBookByTitlePromise(title) {
  axios
    .get(`${BASE_URL}/title/${title}`)
    .then((response) => {
      console.log(
        `Book Details (Promise) for Title '${title}':`,
        response.data
      );
    })
    .catch((error) => {
      console.error(
        `Error fetching book (Promise) for Title '${title}':`,
        error.message
      );
    });
}

// Calling the functions for Task 12
console.log("Fetching books using async-await...");
fetchBooksAsync();

console.log("Fetching books using Promises...");
fetchBooksPromise();

// Calling the functions for Task 11
console.log("Fetching books using async-await...");
fetchBooksAsync();

console.log("Fetching books using Promises...");
fetchBooksPromise();

// Sample ISBN to test Task 11
const sampleISBN = "1"; // Change this to test with different ISBNs
const sampleAuthor = "Jane Austen"; // Change this to test with different authors

console.log(
  `Fetching book details using async-await for ISBN ${sampleISBN}...`
);
fetchBookByISBNAsync(sampleISBN);

console.log(`Fetching book details using Promises for ISBN ${sampleISBN}...`);
fetchBookByISBNPromise(sampleISBN);

console.log(
  `Fetching book details using async-await for Author '${sampleAuthor}'...`
);
fetchBookByAuthorAsync(sampleAuthor);

console.log(
  `Fetching book details using Promises for Author '${sampleAuthor}'...`
);
fetchBookByAuthorPromise(sampleAuthor);
// Sample Title to test Task 13
const sampleTitle = "Pride and Prejudice"; // Change this to test with different titles

console.log(
  `Fetching book details using async-await for Title '${sampleTitle}'...`
);
fetchBookByTitleAsync(sampleTitle);

console.log(
  `Fetching book details using Promises for Title '${sampleTitle}'...`
);
fetchBookByTitlePromise(sampleTitle);
