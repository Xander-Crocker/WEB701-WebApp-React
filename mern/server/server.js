import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

//import dbConnection from "../server/db/connection.js";

// import user router
import user_router from "./routes/user/user_index.js";
import initializeDB from "../server/db/mongooseConnection.js";
import dbConnection from "../server/db/connection.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(helmet());

// CORS middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions)); // Enable CORS

// CORS logging 
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

initializeDB().then(() => {
    console.log('MongoDB connected with Mongoose');

    app.use('/api/user', user_router);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB with Mongoose:', error);
});

// // MongoDB Atlas
// dbConnection.initializeDB().then(() => {
//     console.log('MongoDB connected');

//     // User routes 
//     app.use('/api/user', user_router);

//     // Start server
//     app.listen(PORT, () => {
//         console.log(`Server listening on port ${PORT}`);
//     });
// }).catch(error => {
//     console.error('Failed to connect to MongoDB:', error);
// });

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});