import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017";

const initializeDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB with Mongoose...');
        await mongoose.connect(uri);
        console.log('MongoDB connected with Mongoose2');
    } catch (error) {
        console.error('Failed to connect to MongoDB with Mongoose:', error);
        process.exit(1); // Exit process with failure
    }
};

export default initializeDB;