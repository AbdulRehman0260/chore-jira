import mongoose from "mongoose";

const householdSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Household = new mongoose.model("Household", householdSchema);

export { Household };
