import React, { useEffect, useState } from 'react'
import { useHouseholdStore } from '../store/useHouseholdStore'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const TicketCreate = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { household } = useHouseholdStore()
    const [people, setPeople] = useState([])
    const [formData, setFormData] = useState({
        assignerId: user?._id || '',
        assigneeId: '',
        householdId: household?._id,
        category: '',
        description: '',
        dueDate: '',
        points: 1,
        assigneeName: ''
    })

    const submit = async (e) => {
        e.preventDefault()

        try {
            const response = await axiosInstance.post('/tickets', formData)
            navigate("/ticket-dashboard")
            console.log('Ticket created:', response.data)
        } catch (error) {
            console.error("Error creating ticket:", error.response?.data || error.message)
        }
    }

    //load the data from the API call on mount 
    useEffect(() => {
        //if import fails or household id is not gotten.
        if (!household || !household._id) {
            console.log("Error loading household object - household is null or missing _id")
            return
        }
        const dataLoad = async () => {
            try {
                const response = await axiosInstance.get(`tickets/household/${household._id}/users`)
                const { data } = response;
                if (!response) {
                    console.log("Data not loaded correctly from household API call")
                }
                setPeople(data)

            } catch (error) {
                console.error("Data loading error trying to fetch users in a household", error)
            }
        };
        dataLoad()
    }, [household._id])

    return (
        <div className='min-h-screen bg-brand-surface flex justify-center items-center p-4'>
            <form onSubmit={submit} className='w-full max-w-md bg-white rounded-lg shadow-sm p-6 space-y-4'>
                <div className='space-y-2'>
                    <label htmlFor="category" className='block text-sm font-medium text-brand-primary'>
                        Category
                    </label>
                    <select
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-primary bg-white'
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

                <div className='space-y-2'>
                    <label htmlFor="assign-to" className='block text-sm font-medium text-brand-primary'>
                        Assign to
                    </label>
                    <select
                        name="assign-to"
                        id="assign-to"
                        value={formData.assigneeId}
                        onChange={(e) => {
                            const selectedPerson = people.find(person => person._id === e.target.value)
                            setFormData({
                                ...formData,
                                assigneeId: e.target.value,
                                assigneeName: selectedPerson?.name || selectedPerson?.email || ''
                            })
                        }}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-primary bg-white'
                    >
                        <option value="">Select person</option>
                        {people.map((person, index) => (
                            <option key={index} value={person._id}>
                                {person.name || person.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor="description" className='block text-sm font-medium text-brand-primary'>
                        Description
                    </label>
                    <textarea
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-primary bg-white resize-none'
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Enter ticket description..."
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="points" className='block text-sm font-medium text-brand-primary'>
                        Points
                    </label>
                    <select
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-primary bg-white'
                        name="points"
                        id="points"
                        value={formData.points}
                        onChange={(e) =>
                            setFormData({ ...formData, points: parseInt(e.target.value) })
                        }
                    >
                        <option value="1">1 Point</option>
                        <option value="2">2 Points</option>
                        <option value="3">3 Points</option>
                        <option value="4">4 Points</option>
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor="duedate" className='block text-sm font-medium text-brand-primary'>
                        Due Date
                    </label>
                    <input
                        type="date"
                        name="duedate"
                        id="duedate"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-primary bg-white'
                    />
                </div>

                <button
                    type="submit"
                    className='w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-primary-light transition-colors duration-200 font-medium hover:cursor-pointer'
                >
                    Create Ticket
                </button>
            </form>
        </div>
    )
}

export default TicketCreate
