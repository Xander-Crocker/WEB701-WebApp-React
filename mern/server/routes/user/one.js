// Modules
import express from "express";

// imports for test data
import fs from "fs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const user_router = express.Router();

// Connection to the data.json file
// const dataFilePath = path.join(__dirname, "../../db/test_data.json");

// Function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
};

// This gets a single object by id from the JSON file
user_router.get("/one/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(data[index]);
});
// to test the route, use GET http://localhost:5050/api/user/one/1 in thunder client

export default user_router;