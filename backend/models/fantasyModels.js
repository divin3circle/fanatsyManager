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

const DreamTeam = mongoose.model("DreamTeam", dreamTeamSchema);

export default DreamTeam;
