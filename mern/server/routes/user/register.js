// Modules
import express from "express";
import db from "../../db/connection.js";

const user_router = express.Router();

// This section will help you create a new record.
user_router.post("/register", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

export default user_router;