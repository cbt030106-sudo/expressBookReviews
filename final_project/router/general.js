const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Dữ liệu sách thô, các hàm Axios bên dưới gọi vào tuyến này
public_users.get('/data/books', (req, res) => {
  return res.status(200).json(books);
});

// Get the book list available in the shop (async/await + Axios)
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/data/books`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving book list", error: error.message});
  }
});

// Get book details based on ISBN (async/await + Axios)
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/data/books`);
    const book = response.data[req.params.isbn];
    if (!book) {
      return res.status(404).json({message: "Book not found for this ISBN"});
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving book by ISBN", error: error.message});
  }
});

// Get book details based on author (async/await + Axios)
public_users.get('/author/:author', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/data/books`);
    const author = req.params.author.toLowerCase();
    const result = Object.entries(response.data)
      .filter(([isbn, book]) => book.author.toLowerCase() === author)
      .map(([isbn, book]) => ({isbn, ...book}));
    if (result.length === 0) {
      return res.status(404).json({message: "No books found for this author"});
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books by author", error: error.message});
  }
});

// Get all books based on title (async/await + Axios)
public_users.get('/title/:title', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/data/books`);
    const title = req.params.title.toLowerCase();
    const result = Object.entries(response.data)
      .filter(([isbn, book]) => book.title.toLowerCase() === title)
      .map(([isbn, book]) => ({isbn, ...book}));
    if (result.length === 0) {
      return res.status(404).json({message: "No books found with this title"});
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books by title", error: error.message});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
