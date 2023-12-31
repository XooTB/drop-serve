import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Route Imports
import ParseRoutes from "./routes/parse.route.js";
import JobRoutes from "./routes/job.route.js";
import UserRoutes from "./routes/user.route.js";
import ImageRoutes from "./routes/image.route.js";

// Config the REST API.
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/parse", ParseRoutes);
app.use("/api/job", JobRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/image", ImageRoutes);

//@ts-ignore
app.get("/api", async (req, res) => {
  res.status(200).send("API WORKING.");
});

// Routes.

export default app;
