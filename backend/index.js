import express from "express";
import mongoose from "mongoose"; // Import Mongoose
import { PORT, mongoDBURL } from "./config.js"; // Import configuration
import bookRoutes from './routes/booksRoutes.js'; // Use ES module syntax for importing routes
import cors from 'cors';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(cors());


app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to the MERN stack');
});

// Use the book routes for any request starting with /books
app.use('/books', bookRoutes);

// Connect to MongoDB using Mongoose
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
