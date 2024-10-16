// Delete user route not working 
import express from "express";
// import mongoose from "mongoose";
// import User from "../../models/usermodel.js";

import dbConnection from "../../db/connection.js";
import { ObjectId } from "mongodb";

const user_router = express.Router();

// This section will help you delete a record
user_router.delete("/delete/:id", async (req, res) => {
    
    try {
        const userId = req.params.id;

        // Ensure the ID is a valid ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid ID format");
        }

        const collection = dbConnection.db.collection("users"); // Adjust the collection name if necessary
        const result = await collection.deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
    
    // try {
    //     const query = { _id: new ObjectId(req.params.id) };

    //     const collection = dbConnection.collection("records");
    //     let result = await collection.deleteOne(query);

    //     res.send(result).status(200);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send("Error deleting record");
    // }
});

export default user_router;