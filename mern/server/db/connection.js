import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

// connection string for MongoDB Atlas
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const initializeDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

// Select the database that will be used when data is stored
const db = client.db("records");

export default { initializeDB, db };