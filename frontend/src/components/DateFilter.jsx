import React, { useState } from 'react'

const DateFilter = ({ onDateFilterChange, currentFilter }) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleFilter = () => {
        onDateFilterChange({ startDate, endDate })
    }

    const handleClear = () => {
        setStartDate('')
        setEndDate('')
        onDateFilterChange({ startDate: null, endDate: null })
    }

    const getFilterDisplay = () => {
        if (!currentFilter || (!currentFilter.startDate && !currentFilter.endDate)) return 'No filter'
        if (currentFilter.startDate === currentFilter.endDate) {
            return new Date(currentFilter.startDate).toLocaleDateString()
        }
        return `${new Date(currentFilter.startDate).toLocaleDateString()} - ${new Date(currentFilter.endDate).toLocaleDateString()}`
    }

    return (
        <div className='flex items-center gap-2'>
            <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Start'
            />
            <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='End'
            />
            <button
                onClick={handleFilter}
                className='px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
            >
                Filter
            </button>
            <button
                onClick={handleClear}
                className='px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
            >
                Clear
            </button>
            <span className='text-brand-white text-xs px-2 py-1 bg-brand-primary-light rounded'>
                {getFilterDisplay()}
            </span>
        </div>
    )
}

export default DateFilter
