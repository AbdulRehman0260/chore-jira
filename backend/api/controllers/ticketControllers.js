import { Membership } from "../../db/models/membershipModel.js";

/*Ticket creation flow:
1. GET /api/tickets/households - Get user's households (for dropdown)
2. GET /api/tickets/household/:householdId/users - Get users in selected household (for assignee dropdown)
3. POST /api/tickets - Create the ticket with all data
*/

// Step 1: Get households current user belongs to
export const getUserHouseholds = async (req, res) => {
  try {
    const loggedInUserId = req.user.user;

    const userMemberships = await Membership.find({ userId: loggedInUserId })
      .populate('householdId', 'name inviteCode');

    const households = userMemberships.map(membership => membership.householdId);

    return res.status(200).json(households);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Step 2: Get users in a specific household
export const getHouseholdUsers = async (req, res) => {
  try {
    const { householdId } = req.params;

    const householdMemberships = await Membership.find({
      householdId: householdId
    })
      .populate('userId', 'name email')
      .select('userId role');

    const users = householdMemberships.map(membership => ({
      ...membership.userId.toObject(),
      role: membership.role
    }));

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// // Step 3: Create the ticket
// export const createTicket = async (req, res) => {
//   try {
//     const loggedInUserId = req.user.user;
//     const {
//       householdId,
//       assigneeId,
//       category,
//       description,
//       points,
//       dueDate
//     } = req.body;

//     // Verify user belongs to this household
//     const userMembership = await Membership.findOne({
//       userId: loggedInUserId,
//       householdId: householdId
//     });

//     if (!userMembership) {
//       return res.status(403).json({ error: "You don't belong to this household" });
//     }

//     // Verify assignee belongs to this household
//     const assigneeMembership = await Membership.findOne({
//       userId: assigneeId,
//       householdId: householdId
//     });

//     if (!assigneeMembership) {
//       return res.status(400).json({ error: "Assignee doesn't belong to this household" });
//     }

//     // Create ticket (you'll need to import Ticket model)
//     const newTicket = {
//       assignerId: loggedInUserId,
//       assigneeId: assigneeId,
//       householdId: householdId,
//       category: category,
//       description: description,
//       points: points || 2,
//       dueDate: dueDate ? new Date(dueDate) : undefined
//     };

//     // TODO: Save ticket to database
//     // const ticket = new Ticket(newTicket);
//     // await ticket.save();

//     return res.status(201).json({
//       message: "Ticket created successfully",
//       ticket: newTicket
//     });

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };