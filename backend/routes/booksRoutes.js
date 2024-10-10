import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new book
router.post('/', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).send({ message: "Missing required fields" });
        }

        const newBook = { title, author, publishYear };
        const savedBook = await Book.create(newBook);

        return response.status(201).send({ success: true, message: "Book added successfully", book: savedBook });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ success: false, message: error.message });
    }
});

// Route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ success: false, message: error.message });
    }
});

// Route to get a book by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).send({ success: false, message: "Book not found" });
        }

        return response.status(200).json({ success: true, book });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return response.status(400).send({ success: false, message: "Invalid book ID" });
        }
        return response.status(500).send({ success: false, message: error.message });
    }
});

// Route to update a book by ID
router.put('/:id', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).send({ success: false, message: "All fields (title, author, publishYear) are required" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            request.params.id,
            { title, author, publishYear },
            { new: true, runValidators: true } // `runValidators` ensures validation on updates
        );

        if (!updatedBook) {
            return response.status(404).send({ success: false, message: "Book not found" });
        }

        return response.status(200).send({ success: true, book: updatedBook });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return response.status(400).send({ success: false, message: "Invalid book ID" });
        }
        return response.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

// Route to delete a book by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return response.status(404).send({ success: false, message: "Book not found" });
        }

        return response.status(200).send({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return response.status(400).send({ success: false, message: "Invalid book ID" });
        }
        return response.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

export default router;
