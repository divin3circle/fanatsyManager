import asyncHandler from "express-async-handler";
import { fetchDreamTeam, insertDreamTeam } from "../utils/fantasyUtils.js";
import DreamTeam from "../models/fantasyModels.js";

//@desc     Gets current dream team
//@route    GET /api/fantasy/dream11
//@access   Private(but for now public)
const getDreamTeam = asyncHandler(async (req, res) => {
  try {
    const dreamTeam = await DreamTeam.find();
    res.status(200).json({ dreamTeam });
  } catch (error) {
    console.error(error);
  }
});

export { getDreamTeam };
