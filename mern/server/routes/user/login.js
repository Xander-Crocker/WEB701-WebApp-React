// Modules
import express from "express";
import db from "../../db/connection.js";
import { ObjectId } from "mongodb";

const user_router = express.Router();

// This checks if the username and password are correct, if so the user will be logged in.
user_router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.collection("users").findOne({ username, password }, (err, result) => {
        if (err) {
            res.status(500).json({ message: "An error has occurred" });
            return;
        }
        if (!result) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        res.status(200).json({ message: "Login successful" });
    });
});

export default user_router;