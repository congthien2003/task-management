import express from "express";
import * as dotenv from "dotenv";
import connect from "../src/config/db/index.js";
import route from "./routes/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// authen middleware
import checkToken from "./app/authentication/auth.js";
// CORS configuration
const corsOptions = {
	origin: "http://localhost:4200", // Allow requests from Angular application
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

// Get the filename and directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.use("/static", express.static(path.join(__dirname, "public")));

// app.use(checkToken);
app.use(express.json());

connect();
route(app);
app.listen(3000, () => {
	console.log("Server started at port 3000");
});
