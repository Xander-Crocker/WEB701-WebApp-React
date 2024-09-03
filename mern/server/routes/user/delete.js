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

// This deletes an object by id from the JSON file
user_router.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    const deletedData = data.splice(index, 1);
    writeData(data);
    res.status(200).json({ message: "Successfully deleted", deletedData: deletedData[0] });
});
// to test the route, use DELETE http://localhost:5050/api/user/delete/11 in thunder client

export default user_router;