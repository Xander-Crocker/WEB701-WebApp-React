import express from "express";

//imports for test data
import fs from "fs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// This will help us connect to the database (unused in testing)
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id. (unused in testing)
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// ANCHOR - Routes below this comment are for testing purposes and not for the database

// connection to the data.json file
const dataFilePath = path.join(__dirname, "../db/data.json");

// Helper function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// ANCHOR These routes are used for testing api

// This gets all the data from the JSON file
router.get("/", async (req, res) => {
    const data = readData();
    res.status(200).json(data);
});

// This gets a single object by id from the JSON file
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    data[index] = { ...data[index], ...updatedData };
    writeData(data);
    res.status(200).json(data[index]);
});

// This creates a new object in the JSON file
router.post("/", async (req, res) => {
    const data = readData();
    const newData = req.body;
    newData.id = data.length + 1;
    data.push(newData);
    writeData(data);
    res.status(201).json(newData);
});

// This updates an object by id in the JSON file
router.patch("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    data[index] = { ...data[index], ...updatedData };
    writeData(data);
    res.status(200).json(data[index]);
});

// This deletes an object by id from the JSON file
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    const deletedData = data.splice(index, 1);
    writeData(data);
    res.status(200).json(deletedData[0]);
});

// ANCHOR Routes below this comment are for the database and not for testing purposes 

// This section will help you get a list of all the records.
// router.get("/", async (req, res) => {
//     let collection = await db.collection("records");
//     let results = await collection.find({}).toArray();
//     res.send(results).status(200);
// });

// This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("records");
//     let query = { _id: new ObjectId(req.params.id) };
//     let result = await collection.findOne(query);

//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// });

// This section will help you create a new record.
// router.post("/", async (req, res) => {
//     try {
//         let newDocument = {
//         name: req.body.name,
//         position: req.body.position,
//         level: req.body.level,
//         };
//         let collection = await db.collection("records");
//         let result = await collection.insertOne(newDocument);
//         res.send(result).status(204);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error adding record");
//     }
// });

// This section will help you update a record by id.
// router.patch("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
//         const updates = {
//         $set: {
//             name: req.body.name,
//             position: req.body.position,
//             level: req.body.level,
//         },
//         };

//         let collection = await db.collection("records");
//         let result = await collection.updateOne(query, updates);
//         res.send(result).status(200);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error updating record");
//     }
// });

// This section will help you delete a record
// router.delete("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };

//         const collection = db.collection("records");
//         let result = await collection.deleteOne(query);

//         res.send(result).status(200);
//         } catch (err) {
//         console.error(err);
//         res.status(500).send("Error deleting record");
//         }
// });

// This exports the router so that it can be used in the server.js
export default router;