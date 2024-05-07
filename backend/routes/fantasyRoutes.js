import express from "express";
import {
  getDreamTeam,
  getPlayer,
  getSuggestions,
} from "../controllers/fantasyControllers.js";

const router = express.Router();

router.get("/dream11", getDreamTeam);

router.get("/suggested/:position", getSuggestions);

router.get("/players/:id", getPlayer);

export default router;
