import React, { useEffect, useState } from 'react'
import { useHouseholdStore } from '../store/useHouseholdStore'
import { axiosInstance } from '../lib/axios'

const Card = ({ text, typeCard }) => {
    const { household } = useHouseholdStore()
    const [assignedTickets, setAssignedTickets] = useState(0);
    const [pendingTickets, setPendingTickets] = useState(0);

    useEffect(() => {
        const fetchTickets = async (householdID) => {
            try {
                const response = await axiosInstance.get(`/tickets/household/${householdID}`)
                const allTickets = response.data || []

                // Filter tickets where status is NOT "DONE"
                const activeTickets = allTickets.filter(ticket => ticket.status !== 'DONE')

                if (typeCard == 'Assigned') {
                    setAssignedTickets(allTickets.length || 0)
                } else if (typeCard == 'Pending') {
                    setPendingTickets(activeTickets.length || 0)
                }
            } catch (error) {
                console.error('Error fetching tickets:', error)
                setAssignedTickets(0)
                setPendingTickets(0)
            }
        }

        if (household && household._id) {
            fetchTickets(household._id)
        }
    }, [household])

    // Add null check to prevent errors
    if (!household) {
        return (
            <div className='flex justify-center items-center h-16 bg-brand-surface text-black rounded-sm'>
                <span className='text-sm font-medium'>{text}</span>
                <span className='text-sm font-bold ml-2'>...</span>
            </div>
        )
    }
    if (typeCard == 'Assigned') {
        return (
            <div className='flex justify-center items-center h-16 bg-brand-surface text-black rounded-sm'>
                <span className='text-sm font-medium'>{text}</span>
                <span className='text-sm font-bold ml-2'>{assignedTickets}</span>
            </div>
        )
    }

    if (typeCard == 'Pending') {
        return (
            <div className='flex justify-center items-center h-16 bg-brand-surface text-black rounded-sm'>
                <span className='text-sm font-medium'>{text}</span>
                <span className='text-sm font-bold ml-2'>{pendingTickets}</span>
            </div>
        )
    }
}

export default Card