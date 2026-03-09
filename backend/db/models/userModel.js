import mongoose, { Mongoose } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true

    },
    passwordHash: { type: String, required: true },
    status: {
        type: String,
        enum: ["ACTIVE", "PENDING_HOUSEHOLD", "DISABLED"],
        default: "PENDING_HOUSEHOLD",
        index: true,

    },
},
    { timestamps: true }
)

const Customer = mongoose.model("Customer", userSchema)

export { Customer }