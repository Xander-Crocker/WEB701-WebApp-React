// Modules
import express from "express";
import db from "../../db/connection.js";

const user_router = express.Router();

// This checks if the username and password are correct, if so the user will be logged in.
user_router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection('records').findOne({ username, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default user_router;