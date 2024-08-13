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
const dataFilePath = path.join(__dirname, "../../db/test_data.json");

// Function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
};

// This checks if the username and password are correct
user_router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const data = readData();
    const user = data.find((user) => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: "Login successful", user });3
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});
// to test the route, use POST http://localhost:5050/api/user/login in thunder client with the below Json data in the body
// {
//     "username": "Node",
//     "password": "node"
// }

export default user_router;