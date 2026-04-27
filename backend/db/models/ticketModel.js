import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({

    assignerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        index: true
    },
    assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        index: true
    },
    assigneeName: {
        type: String,
        required: false
    },
    householdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Household",
        required: true,
        index: true
    },
    category: {
        type: String,
        enum: [
            // Laundry
            "LAUNDRY_WASHING", "LAUNDRY_DRYING", "LAUNDRY_FOLDING", "IRONING_CLOTHES",
            // Kitchen  
            "WASHING_DISHES", "CLEANING_KITCHEN_TOPS", "MAKING_DINNER",
            // Cleaning
            "TAKING_OUT_TRASH", "VACUUMING", "CLEAN_BEDROOM", "CLEAN_LOUNGE",
            // Bathrooms
            "CLEAN_MASTER_BATHROOM", "CLEAN_ENSUITE_BATHROOM",
            // Hala-specific
            "PICKUP_HALAS_TOYS", "HALA_NAPPY_CHANGE", "HALA_PUTTING_TO_BED",
            "HALA_STERILIZE_TEETHERS_BOTTLES", "HALA_BATHING",
            // Other
            "CHECKING_MAIL", "WATER_PLANTS", "OTHER"
        ],
        required: true,
        index: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["OPEN", "BLOCKED", "IN-PROGRESS", "DONE"],
        default: "OPEN",
        required: true,
        index: true
    },
    points: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 2
    },
    dueDate: {
        type: Date
    }
}
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export { Ticket };