import express from "express";
import cors from "cors";

// import records router (will change to user router later)
import records from "./routes/record.js";

// import user router
import user_router from "./routes/user/user_index.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// For user routes (test routes using test data from json file)
// app.use('/api/user', user_router);

// start the Express server;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Use 'npm start' in terminal to start Express server with nodemon