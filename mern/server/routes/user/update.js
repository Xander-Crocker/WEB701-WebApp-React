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

// Function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// This updates a user's username and/or password in the JSON file
user_router.patch("/update/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { username, password } = req.body;
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    if (username) {
        data[index].username = username;
    }
    if (password) {
        data[index].password = password;
    }
    writeData(data);
    res.status(200).json(data[index]);
});
// to test the route, use PATCH http://localhost:5050/api/user/update/11 in thunder client with the below Json data in the body
// {
//     "username": "newUsername",
//     "password": "newPassword"
// }

export default user_router;