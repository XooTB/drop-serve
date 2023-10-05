import express from "express";
import parseController from "../controllers/parseController.js";

const router = express.Router();

router.post("/", parseController);

export default router;
