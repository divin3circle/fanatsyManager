import mongoose from "mongoose";

const dreamTeamSchema = mongoose.Schema(
  {
    element: {
      type: Number,
      required: true,
      unique: true,
    },
    form: {
      type: Number,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
    },
    ict: {
      type: Number,
      required: false,
    },
    ownership: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    teamID: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SuggestionsSchema = mongoose.Schema({
  element: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ownership: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  teamID: {
    type: Number,
    required: true,
  },
  combined_index: {
    type: Number,
    required: true,
  },
});

const DreamTeam = mongoose.model("DreamTeam", dreamTeamSchema);
const Suggestions = mongoose.model("Suggestions", SuggestionsSchema);

export default DreamTeam;
export { Suggestions };
