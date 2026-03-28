import mongoose from "mongoose";

const householdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Household = new mongoose.model("Household", householdSchema);

export { Household };
