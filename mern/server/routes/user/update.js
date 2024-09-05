// Modules
import express from "express";
import db from "../../db/connection.js";
import { ObjectId } from "mongodb";

const user_router = express.Router();

// This section will help you update a record by id.
user_router.patch("/update/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };
        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

export default user_router;