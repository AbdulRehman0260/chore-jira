import React from 'react'

const Ticket = ({ data }) => {
    return (
        <div className='bg-white border border-gray-200 rounded shadow-sm p-3 w-80'>
            {/* Ticket Header */}
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                    <div className='bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs font-medium'>
                        TASK-123
                    </div>
                    <span className='bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium'>
                        {data.status || "In Progress"}
                    </span>
                </div>
            </div>

            {/* Title */}
            <h3 className='text-sm font-semibold text-gray-900 mb-2 truncate'>
                {data.category || "Ironing"}
            </h3>

            {/* Description */}
            <p className='text-xs text-gray-600 mb-3 line-clamp-2'>
                {data.description || "Take the clothes out of dryer and iron them"}
            </p>

            {/* Details */}
            <div className='space-y-1 text-xs'>
                <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>🏷️</span>
                    <span className='text-gray-600'>Category:</span>
                    <span className='text-gray-900 truncate'>{data.category || "Ironing"}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>👤</span>
                    <span className='text-gray-600'>Assignee:</span>
                    <span className='text-gray-900 truncate'>{data.assignedTo || "Zarnain Syed"}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>📅</span>
                    <span className='text-gray-600'>Due:</span>
                    <span className='text-gray-900'>{data.dueDate || "2025-01-04"}</span>
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