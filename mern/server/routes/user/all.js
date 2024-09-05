// Modules
import express from "express";
import db from "../../db/connection.js";

const user_router = express.Router();

// This section will help you get a list of all the records.
user_router.get("/all", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

export default user_router;