// Modules
import express from "express";
import db from "../../db/connection.js";
import { ObjectId } from "mongodb";

const user_router = express.Router();

// This will log a user out if they are already logged in.
user_router.post("/logout", (req, res) => {
    const { username } = req.body;
    db.collection("records").findOne({ username }, (err, result) => {
        if (err) {
            res.status(500).json({ message: "An error has occurred" });
            return;
        }
        if (!result) {
            res.status(401).json({ message: "Invalid username" });
            return;
        }
        res.status(200).json({ message: "Logout successful" });
    });
});

export default user_router;