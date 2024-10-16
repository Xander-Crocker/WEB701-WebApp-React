// Modules
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// old import
// import db from "../../db/connection.js";

const user_router = express.Router();

// This checks if the username and password are correct, if so the user will be logged in.
user_router.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body;
        console.log('Received login request:', { username, password });

        console.log('Attempting to find user in database...');
        const user = await User.findOne({ username }).maxTimeMS(5000);
        console.log('Database query completed.');
        
        if (!user) {
            console.error('User not found');
            return res.status(400).send('Invalid credentials');
        }

        console.log('User found:', user); 

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Password does not match');
            return res.status(400).send('Invalid credentials');
        }

        console.log('Password matches'); 

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated token:', token); 

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.stack); // Seem to be hitting this error
        res.status(500).send('Internal server error');
    }

    //NOTE: old code using old db connection
    // const { username, password } = req.body;

    // try {
    //     const user = await db.collection('records').findOne({ username, password });

    //     if (user) {
    //         res.status(200).json({ message: 'Login successful' });
    //     } else {
    //         res.status(401).json({ message: 'Invalid username or password' });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }

});

export default user_router;