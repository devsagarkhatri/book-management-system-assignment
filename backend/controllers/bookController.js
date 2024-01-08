const Book = require("../models/Book");

const publish = async (req, res) => {
  try {
    const { title, author } = req.body;
    const userId = req.userId;

    // Validate title and author
    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    // Create a new book
    const book = new Book({ title, author, published: true, userId });
    await book.save();

    res.json({ message: "Book published successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  try {
    const { title } = req.query;
    const userId = req.userId;

    // Validate title
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required for searching" });
    }

    // Search for books by title for the current user
    const books = await Book.find({ title, userId });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const unpublish = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId;

    // Validate bookId
    if (!bookId) {
      return res
        .status(400)
        .json({ message: "Book ID is required for unpublishing" });
    }

    // Find the book by ID and user ID
    const book = await Book.findOne({ _id: bookId, userId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Unpublish the book
    book.published = false;
    await book.save();

    res.json({ message: "Book unpublished successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userId = req.userId;

    // Get books published by the current user
    const books = await Book.find({ userId });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPublishedBooks = async (req, res) => {
  try {
    // Get all published books
    const books = await Book.find({ published: true });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  publish,
  search,
  unpublish,
  getUserBooks,
  getPublishedBooks,
};
