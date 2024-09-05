// Modules
import express from "express";
import db from "../../db/connection.js";
import { ObjectId } from "mongodb";

const user_router = express.Router();

// This section will help you delete a record
user_router.delete("/update/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default user_router;