import React from 'react'

const Ticket = ({ data, onClick }) => {
    console.log('Ticket data:', data) // Debug log to see what data we're getting

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'done':
                return 'bg-green-100 text-green-800'
            case 'open':
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800'
            case 'blocked':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const formatCategoryName = (category) => {
        const categoryMap = {
            "LAUNDRY_WASHING": "Laundry Washing",
            "LAUNDRY_DRYING": "Laundry Drying",
            "LAUNDRY_FOLDING": "Laundry Folding",
            "IRONING_CLOTHES": "Ironing Clothes",
            "WASHING_DISHES": "Washing Dishes",
            "CLEANING_KITCHEN_TOPS": "Cleaning Kitchen Tops",
            "MAKING_DINNER": "Making Dinner",
            "TAKING_OUT_TRASH": "Taking Out Trash",
            "VACUUMING": "Vacuuming",
            "CLEAN_BEDROOM": "Clean Bedroom",
            "CLEAN_LOUNGE": "Clean Lounge",
            "CLEAN_MASTER_BATHROOM": "Clean Master Bathroom",
            "CLEAN_ENSUITE_BATHROOM": "Clean Ensuite Bathroom",
            "PICKUP_HALAS_TOYS": "Pickup Hala's Toys",
            "HALA_NAPPY_CHANGE": "Hala Nappy Change",
            "HALA_PUTTING_TO_BED": "Hala Putting to Bed",
            "HALA_STERILIZE_TEETHERS_BOTTLES": "Hala Sterilize Teethers/Bottles",
            "HALA_BATHING": "Hala Bathing",
            "CHECKING_MAIL": "Checking Mail",
            "WATER_PLANTS": "Water Plants",
            "OTHER": "Other"
        }
        return categoryMap[category] || category
    }

    const formatDate = (dateString) => {
        if (!dateString) return "No due date"
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }
    return (
        <div
            className='bg-white border border-gray-200 rounded shadow-sm p-3 w-80 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 hover:scale-105'
            onClick={() => onClick && onClick(data)}
        >
            {/* Ticket Header */}
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                    <div className='bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs font-medium'>
                        TASK-123
                    </div>
                    <span className={`${getStatusColor(data.status)} px-1.5 py-0.5 rounded text-xs font-medium`}>
                        {data.status || "In Progress"}
                    </span>
                </div>
            </div>

            {/* Title */}
            <h3 className='text-sm font-semibold text-gray-900 mb-2 truncate'>
                {formatCategoryName(data.category)}
            </h3>

            {/* Description */}
            <p className='text-xs text-gray-600 mb-3 line-clamp-2'>
                {data.description || "No description provided"}
            </p>

            {/* Details */}
            <div className='space-y-1 text-xs'>
                <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>🏷️</span>
                    <span className='text-gray-600'>Category:</span>
                    <span className='text-gray-900 truncate'>{formatCategoryName(data.category)}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>👤</span>
                    <span className='text-gray-600'>Assignee:</span>
                    <span className='text-gray-900 truncate'>{data.assigneeName || "Unassigned"}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>📅</span>
                    <span className='text-gray-600'>Due:</span>
                    <span className='text-gray-900'>{formatDate(data.dueDate)}</span>
                </div>
            </div>

            {/* Points */}
            <div className='flex items-center justify-between mt-3 pt-2 border-t border-gray-100'>
                <div className='flex items-center gap-1'>
                    <span className='text-gray-400'>⭐</span>
                    <span className='bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs font-medium'>{data.points || "3 pts"}</span>
                </div>
            </div>
        </div>
    )
}

export default Ticket