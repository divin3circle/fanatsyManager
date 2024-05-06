import asyncHandler from "express-async-handler";
import {
  fetchDreamTeam,
  fetchSuggestedPlayers,
} from "../utils/fantasyUtils.js";
import DreamTeam, { Suggestions } from "../models/fantasyModels.js";

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
//@desc     Gets current suggested players
//@route    GET /api/fantasy/suggested/:positions
//@access   Private(but for now public)
const getSuggestions = asyncHandler(async (req, res) => {
  const position = Number(req.params.position);
  if (position) {
    try {
      let suggestions;
      if (position === 1) {
        suggestions = await Suggestions.find({ index: 1 }).sort({
          combined_index: -1,
        });
        res.status(200).json({ suggestions });
      } else if (position === 2) {
        suggestions = await Suggestions.find({ index: 2 }).sort({
          combined_index: -1,
        });
        res.status(200).json({ suggestions });
      } else if (position === 3) {
        suggestions = await Suggestions.find({ index: 3 }).sort({
          combined_index: -1,
        });
        res.status(200).json({ suggestions });
      } else {
        suggestions = await Suggestions.find({ index: 4 }).sort({
          combined_index: -1,
        });
        res.status(200).json({ suggestions });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Please provide the positions" });
  }
});

export { getDreamTeam, getSuggestions };
