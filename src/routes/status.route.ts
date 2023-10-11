import express from "express";
import { checkJobStatus, getJobData } from "../controllers/JobControllers.js";
import Authenticate from "../controllers/AuthMiddleware.js";

const router = express.Router();

router.get("/:id", checkJobStatus);
router.get("/job/:id", getJobData);

export default router;
