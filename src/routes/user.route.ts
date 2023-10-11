import express from "express";
import { userSignup, userLogin } from "../controllers/UserControllers.js";
import Authenticate from "../controllers/AuthMiddleware.js";
import { jobController } from "../controllers/JobControllers.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/jobs", Authenticate, jobController);

export default router;
