import express from "express";
import {
  checkJobStatus,
  getJobData,
  deleteJob,
  addDesc,
} from "../controllers/JobControllers.js";
import Authenticate from "../controllers/AuthMiddleware.js";

const router = express.Router();

router.get("/status/:id", Authenticate, checkJobStatus);
router.get("/:id", Authenticate, getJobData);
router.delete("/delete/:id", Authenticate, deleteJob);
router.patch("/desc/:id", Authenticate, addDesc);

export default router;
