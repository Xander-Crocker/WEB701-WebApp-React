// Modules
import express from "express";

// Import Routes
import all from "./all.js";
import one from "./one.js";
import register from "./register.js";
import update from "./update.js";
import deleteUser from "./delete.js";

// Unused imports for later use
import login from "./login.js";
import logout from "./logout.js";

// Router
const user_router = express.Router();

// Routes
user_router.use('/', all);
user_router.use('/', one);
user_router.use('/', register);
user_router.use('/', update);
user_router.use('/', deleteUser);

// Unused routes for later use
user_router.use('/', login);
user_router.use('/', logout);


// Export default router;
export default user_router;