import { Membership } from "../../db/models/membershipModel.js";
import { Ticket } from "../../db/models/ticketModel.js";
import { Customer } from "../../db/models/userModel.js";
import { sendTaskAssignmentEmail } from "../../services/emailService.js";

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
export const createTicket = async (req, res) => {
  try {
    const {
      householdId,
      assignerId,
      assigneeId,
      assigneeName,
      category,
      description,
      points,
      dueDate
    } = req.body;

    // Fetch assignee and assigner details for email
    const [assignee, assigner] = await Promise.all([
      Customer.findById(assigneeId).select('name email'),
      Customer.findById(assignerId).select('name')
    ]);

    if (!assignee) {
      return res.status(404).json({ error: "Assignee not found" });
    }

    // Create ticket
    const newTicket = {
      assignerId: assignerId,
      assigneeId: assigneeId,
      assigneeName: assigneeName,
      householdId: householdId,
      category: category,
      description: description,
      points: points || 2,
      dueDate: dueDate ? new Date(dueDate) : undefined
    };

    // Save ticket to database
    const ticket = new Ticket(newTicket);
    await ticket.save();

    // Send email notification to assignee
    if (assignee.email) {
      const emailResult = await sendTaskAssignmentEmail(
        assignee.email,
        assignee.name,
        {
          category: category,
          description: description,
          points: points || 2,
          dueDate: dueDate
        },
        assigner.name
      );

      if (!emailResult.success) {
        console.error('Failed to send task assignment email:', emailResult.error);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.log('Assignee has no email address, skipping email notification');
    }

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Get all tickets given a userId
export const getTicketsByUserId = async (req, res) => {
  try {
    const user_id = req.user.user
    const tickets = await Ticket.find({ assigneeId: user_id })
      .populate('assignerId', 'name email')
      .populate('assigneeId', 'name email')
      .populate('householdId', 'name')
    return res.status(200).json(tickets)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Get all tickets given a userId
export const getTicketsByUserIdDash = async (req, res) => {
  try {
    const user_id = req.user.user
    console.log(user_id)
    const tickets = await Ticket.find({ assigneeId: user_id })
    return res.status(200).json(tickets)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Get all tickets given a householdId
export const getTicketsByHouseholdId = async (req, res) => {
  try {
    const { householdId } = req.params
    const tickets = await Ticket.find({ householdId: householdId })
    return res.status(200).json(tickets)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//update a singular ticket
export const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params
    const { status, category, description, points, dueDate, assigneeId, assigneeName } = req.body
    const user_id = req.user.user

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId)
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" })
    }

    // Check if user belongs to the household (can update)
    const userMembership = await Membership.findOne({
      userId: user_id,
      householdId: ticket.householdId
    })

    if (!userMembership) {
      return res.status(403).json({ error: "You don't belong to this household" })
    }

    // Check if ticket is being completed and award points
    const isBeingCompleted = status === "DONE" && ticket.status !== "DONE"

    console.log("Points awarding check:", {
      newStatus: status,
      oldStatus: ticket.status,
      isBeingCompleted: isBeingCompleted,
      ticketPoints: ticket.points,
      assigneeId: ticket.assigneeId
    })

    if (isBeingCompleted) {
      // Add ticket points to assignee's total
      console.log(`Awarding points: ticket=${ticketId}, assignee=${ticket.assigneeId}, points=${ticket.points}`)

      const result = await Customer.findByIdAndUpdate(
        ticket.assigneeId,
        { $inc: { points: ticket.points } },
        { returnDocument: 'after' }
      )

      console.log(`Points awarded successfully. User ${ticket.assigneeId} now has ${result.points} points`)
    }

    // Prepare update object
    const updateData = {}
    if (status) updateData.status = status
    if (category) updateData.category = category
    if (description) updateData.description = description
    if (points) updateData.points = points
    if (dueDate) updateData.dueDate = new Date(dueDate)
    if (assigneeId) updateData.assigneeId = assigneeId
    if (assigneeName) updateData.assigneeName = assigneeName

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $set: updateData },
      { returnDocument: 'after' } // Return updated document
    ).populate('assignerId', 'name email')
      .populate('assigneeId', 'name email')
      .populate('householdId', 'name')

    return res.status(200).json(updatedTicket)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}