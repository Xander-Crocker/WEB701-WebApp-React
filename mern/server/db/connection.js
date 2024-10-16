import { MongoClient, ServerApiVersion } from "mongodb";
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

// Select the database that will be used when data is stored
const db = client.db("records");

export default db ;