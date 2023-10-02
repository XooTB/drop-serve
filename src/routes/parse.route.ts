import express from "express";
import parseController from "../controllers/parseController.ts";

const router = express.Router();

router.post("/", parseController);

export default router;
