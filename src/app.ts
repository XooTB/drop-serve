import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Route Imports
import ParseRoutes from "./routes/parse.route.js";

// Config the REST API.
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/parse", ParseRoutes);

//@ts-ignore
app.get("/api", async (req, res) => {
  res.status(200).send("API WORKING.");
});

// Routes.

export default app;
