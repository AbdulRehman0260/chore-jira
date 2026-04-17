import React from 'react'

const TicketCreate = () => {
    return (
        <form className=''>
            <div className='flex min-w-full min-h-screen bg-brand-primary justify-center items-center'>
                <div className='bg-brand-surface p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <h2 className='text-2xl font-bold text-brand-primary mb-6 text-center'>Create New Ticket</h2>

                    <div className='mb-6'>
                        <label className='block text-brand-primary font-semibold mb-2' htmlFor="category">
                            Category
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white">
                            <option value="">Select a category...</option>
                            <optgroup label="Laundry">
                                <option value="LAUNDRY_WASHING">Laundry Washing</option>
                                <option value="LAUNDRY_DRYING">Laundry Drying</option>
                                <option value="LAUNDRY_FOLDING">Laundry Folding</option>
                                <option value="IRONING_CLOTHES">Ironing Clothes</option>
                            </optgroup>
                            <optgroup label="Kitchen">
                                <option value="WASHING_DISHES">Washing Dishes</option>
                                <option value="CLEANING_KITCHEN_TOPS">Cleaning Kitchen Tops</option>
                                <option value="MAKING_DINNER">Making Dinner</option>
                            </optgroup>
                            <optgroup label="Cleaning">
                                <option value="TAKING_OUT_TRASH">Taking Out Trash</option>
                                <option value="VACUUMING">Vacuuming</option>
                                <option value="CLEAN_BEDROOM">Clean Bedroom</option>
                                <option value="CLEAN_LOUNGE">Clean Lounge</option>
                            </optgroup>
                            <optgroup label="Bathrooms">
                                <option value="CLEAN_MASTER_BATHROOM">Clean Master Bathroom</option>
                                <option value="CLEAN_ENSUITE_BATHROOM">Clean Ensuite Bathroom</option>
                            </optgroup>
                            <optgroup label="Hala-specific">
                                <option value="PICKUP_HALAS_TOYS">Pickup Hala's Toys</option>
                                <option value="HALA_NAPPY_CHANGE">Hala Nappy Change</option>
                                <option value="HALA_PUTTING_TO_BED">Hala Putting to Bed</option>
                                <option value="HALA_STERILIZE_TEETHERS_BOTTLES">Hala Sterilize Teethers/Bottles</option>
                                <option value="HALA_BATHING">Hala Bathing</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value="CHECKING_MAIL">Checking Mail</option>
                                <option value="WATER_PLANTS">Water Plants</option>
                                <option value="OTHER">Other</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className='mb-6'>
                        <label className='block text-brand-primary font-semibold mb-2' htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                            rows={4}
                            placeholder="Enter ticket description..."
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-brand-primary font-semibold mb-2' htmlFor="points">
                            Points
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white">
                            <option value="1">1 Point</option>
                            <option value="2" selected>2 Points</option>
                            <option value="3">3 Points</option>
                            <option value="4">4 Points</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-brand-accent-hover transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 hover:cursor-pointer"
                    >
                        Create Ticket
                    </button>
                </div>
            </div>
        </form>
    )
}

export default TicketCreate

// import mongoose from "mongoose";

// const ticketSchema = new mongoose.Schema({

//     assignerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer",
//         required: true,
//         index: true
//     },
//     assigneeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer",
//         required: true,
//         index: true
//     },
//     householdId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Household",
//         required: true,
//         index: true
//     },
//     category: {
//         type: String,
//         enum: [
//             // Laundry
//             "LAUNDRY_WASHING", "LAUNDRY_DRYING", "LAUNDRY_FOLDING", "IRONING_CLOTHES",
//             // Kitchen  
//             "WASHING_DISHES", "CLEANING_KITCHEN_TOPS", "MAKING_DINNER",
//             // Cleaning
//             "TAKING_OUT_TRASH", "VACUUMING", "CLEAN_BEDROOM", "CLEAN_LOUNGE",
//             // Bathrooms
//             "CLEAN_MASTER_BATHROOM", "CLEAN_ENSUITE_BATHROOM",
//             // Hala-specific
//             "PICKUP_HALAS_TOYS", "HALA_NAPPY_CHANGE", "HALA_PUTTING_TO_BED",
//             "HALA_STERILIZE_TEETHERS_BOTTLES", "HALA_BATHING",
//             // Other
//             "CHECKING_MAIL", "WATER_PLANTS", "OTHER"
//         ],
//         required: true,
//         index: true
//     },
//     description: {
//         type: String
//     },
//     status: {
//         type: String,
//         enum: ["OPEN", "BLOCKED", "IN-PROGRESS", "DONE"],
//         default: "OPEN",
//         required: true,
//         index: true
//     },
//     points: {
//         type: Number,
//         enum: [1, 2, 3, 4],
//         default: 2
//     },
//     dueDate: {
//         type: Date
//     }
// }
// );

// const Ticket = mongoose.model("Ticket", ticketSchema);

// export { Ticket };