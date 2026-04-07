import mongoose, { Mongoose } from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    householdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["OWNER", "MEMBER"],
      default: "MEMBER",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "PENDING", "REMOVED"],
      default: "ACTIVE",
      index: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Membership = mongoose.model("Membership", membershipSchema);

export { Membership };
