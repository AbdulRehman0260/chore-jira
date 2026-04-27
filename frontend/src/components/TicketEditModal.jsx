import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import { useHouseholdStore } from '../store/useHouseholdStore'

const TicketEditModal = ({ ticket, isOpen, onClose, onSave }) => {
    const { household } = useHouseholdStore()
    const [people, setPeople] = useState([])
    const [formData, setFormData] = useState({
        status: '',
        category: '',
        description: '',
        dueDate: '',
        points: 1,
        assigneeId: '',
        assigneeName: ''
    })

    useEffect(() => {
        if (ticket) {
            setFormData({
                status: ticket.status || '',
                category: ticket.category || '',
                description: ticket.description || '',
                dueDate: ticket.dueDate ? new Date(ticket.dueDate).toISOString().split('T')[0] : '',
                points: ticket.points || 1,
                assigneeId: ticket.assigneeId || '',
                assigneeName: ticket.assigneeName || ''
            })
        }
    }, [ticket])

    useEffect(() => {
        const loadPeople = async () => {
            if (!household || !household._id) return

            try {
                const response = await axiosInstance.get(`tickets/household/${household._id}/users`)
                setPeople(response.data || [])
            } catch (error) {
                console.error("Error loading household users:", error)
            }
        }
        loadPeople()
    }, [household])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axiosInstance.patch(`/tickets/${ticket._id}`, formData)
            onSave(response.data)
            onClose()
        } catch (error) {
            console.error("Error updating ticket:", error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name === 'assigneeId') {
            const selectedPerson = people.find(person => person._id === value)
            setFormData({
                ...formData,
                assigneeId: value,
                assigneeName: selectedPerson?.name || selectedPerson?.email || ''
            })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    if (!isOpen || !ticket) return null

    return (
        <div className='fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-semibold text-gray-900'>Edit Ticket</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-600 text-2xl leading-none'
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Status */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-brand-primary'>
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary'
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN-PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-brand-primary'>
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary'
                        >
                            <option value="">Select category</option>
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

                    {/* Description */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-brand-primary'>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary'
                            placeholder='Enter ticket description'
                        />
                    </div>

                    {/* Assignee */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-brand-primary'>
                            Assign to
                        </label>
                        <select
                            name="assigneeId"
                            value={formData.assigneeId}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary'
                        >
                            <option value="">Select person</option>
                            {people.map((person, index) => (
                                <option key={index} value={person._id}>
                                    {person.name || person.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Due Date */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-brand-primary'>
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary'
                        />
                    </div>

                    {/* Points */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-brand-primary'>
                            Points
                        </label>
                        <select
                            name="points"
                            value={formData.points}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary'
                        >
                            <option value={1}>1 Point</option>
                            <option value={2}>2 Points</option>
                            <option value={3}>3 Points</option>
                            <option value={5}>5 Points</option>
                            <option value={8}>8 Points</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-3 pt-4'>
                        <button
                            type="button"
                            onClick={onClose}
                            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className='flex-1 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark'
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TicketEditModal
