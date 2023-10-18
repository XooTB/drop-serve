import express from "express";
import { imageController } from "../controllers/ImageController.js";

const router = express.Router();

router.post("/upload/:id", imageController);

export default router;
