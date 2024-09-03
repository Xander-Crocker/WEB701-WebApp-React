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

// This gets all the data from the JSON file
user_router.get("/all", async (req, res) => {
    const data = readData();
    res.status(200).json(data);
});
// to test the route, use GET http://localhost:5050/api/users/all in thunder client

export default user_router;