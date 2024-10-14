import express from "express";
import cors from "cors";

// import user router
import user_router from "./routes/user/user_index.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// For user routes (test routes using test data from json file)
app.use('/api/user', verifyToken, user_router);

// start the Express server;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});