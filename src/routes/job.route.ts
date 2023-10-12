import express from "express";
import { checkJobStatus, getJobData } from "../controllers/JobControllers.js";
import Authenticate from "../controllers/AuthMiddleware.js";

const router = express.Router();

router.get("/status/:id", Authenticate, checkJobStatus);
router.get("/:id", Authenticate, getJobData);

export default router;
