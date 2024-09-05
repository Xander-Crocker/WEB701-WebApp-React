// Modules
import express from "express";
import db from "../../db/connection.js";
import { ObjectId } from "mongodb";

const user_router = express.Router();

// This section will help you get a single record by id
user_router.get("/one/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default user_router;