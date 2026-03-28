import { Household } from "../../db/models/householdModel.js";

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
    const newHouse = new Household({ name: name });
    await newHouse.save();
    return res.status(201).json(newHouse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
