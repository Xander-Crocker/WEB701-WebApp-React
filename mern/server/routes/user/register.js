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

// Function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// This creates a new user with username and password in the JSON file
user_router.post("/register", async (req, res) => {
    const data = readData();
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const newUser = {
        id: data.length + 1,
        username,
        password
    };
    data.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});
// to test the route, use POST http://localhost:5050/api/user/register in thunder client with the below Json data in the body
// {
//     "username": "newUser",
//     "password": "password1234"
// }

export default user_router;