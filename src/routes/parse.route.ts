import express from "express";
import parseController from "../controllers/parseController.js";
import Authenticate from "../controllers/AuthMiddleware.js";

const router = express.Router();

router.post("/", Authenticate, parseController);

export default router;
