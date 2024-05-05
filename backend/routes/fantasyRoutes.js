import express from "express";
import { getDreamTeam } from "../controllers/fantasyControllers.js";

const router = express.Router();

router.get("/dream11", getDreamTeam);

export default router;
