//Packages
import express from "express"; // Express Server
import cors from "cors"; // Cross-Origin Resource Sharing

//Routes
import servicesRouter from "./api/routes.js";

// Create Server, use Cors Module and assign uri routes
const app = express();

app.use(cors());
app.use(express.json());

// Assign Routes
app.use("/api/v1", servicesRouter);

app.use("*", (req, res) => res.status(404).json({ error: "Not Found" })); // error handler for route uri slugs that don't exist

export default app;
