import express from "express";
import {
  getDreamTeam,
  getSuggestions,
} from "../controllers/fantasyControllers.js";

const router = express.Router();

router.get("/dream11", getDreamTeam);

router.get("/suggested/:position", getSuggestions);

export default router;
