// Modules
import express from "express";

const user_router = express.Router();

// Routes
user_router.get("/logout", async (req, res) => {
    res.status(200).json({ message: "Logged out" });
});

export default user_router;