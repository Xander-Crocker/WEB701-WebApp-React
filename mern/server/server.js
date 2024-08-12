import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// middleware
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(req.path, req,method);
    next();
});

// start the Express server;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Use 'npm start' in terminal to start Express server