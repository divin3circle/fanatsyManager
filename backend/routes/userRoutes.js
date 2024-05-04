import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);

export default router;
