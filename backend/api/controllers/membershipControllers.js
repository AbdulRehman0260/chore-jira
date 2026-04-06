//check if invite code exists in database
import { Household } from "../../db/models/householdModel.js"
import { Membership } from "../../db/models/membershipModel.js"

// Middleware to validate invite code and attach householdId to request
export const validateInvite = async (req, res, next) => {
    try {
        const { inviteCode } = req.body;
        const household = await Household.findOne({ inviteCode });

        if (!household) {
            return res.status(400).json({ error: "Invalid invite code" });
        }

        // Attach householdId to request for next middleware/controller
        req.householdId = household._id;
        next();

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Controller to create membership using householdId from request
export const joinHousehold = async (req, res) => {
    try {
        const user_id = req.user.user;
        const householdId = req.householdId; // Set by middleware

        //Membership creation
        const newMembership = new Membership({
            userId: user_id,
            householdId: householdId
        });

        await newMembership.save();
        return res.status(201).json({ message: "Successfully joined household" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
