import { Household } from "../../db/models/householdModel.js";
import crypto from "crypto";

//function to generate a random invitecodes
const generateInviteCode = (length = 6) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    code += charset[randomBytes[i] % charset.length];
  }
  return code;
};

export const createHousehold = async (req, res) => {
  try {
    if (!req.body) {
      return new Error("Request body is missing");
    }
    const { name } = await req.body;

    if (typeof name != "string") {
      return res
        .status(400)
        .json({ error: "name field should be a string only" });
    }

    //getting the user id to attach to the household object
    const user_id = req.user.user._id;

    //invite code generation
    const code = generateInviteCode(6);

    //household creation
    const newHouse = new Household(
      {
        name: name,
        createdByUserId: user_id,
        inviteCode: code

      });

    await newHouse.save();
    return res.status(201).json(newHouse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
