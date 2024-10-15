import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnection from "../server/db/connection.js";

// import user router
import user_router from "./routes/user/user_index.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());

// Configure cors middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions)); // Enable CORS

// Add logging to debug CORS issues
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Initialize the database connection
dbConnection.initializeDB().then(() => {
    // For user routes (test routes using test data from json file)
    app.use('/api/user', user_router);

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
});