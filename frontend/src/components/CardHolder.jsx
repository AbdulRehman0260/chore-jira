import React, { useEffect, useState } from 'react'
import Ticket from './Ticket'
import TicketEditModal from './TicketEditModal'
import { axiosInstance } from '../lib/axios'
import { useNavigate } from 'react-router-dom'
import { useHouseholdStore } from '../store/useHouseholdStore'

const CardHolder = ({ viewAll = false }) => {
    const [userTickets, setUserTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const { household } = useHouseholdStore()
    useEffect(
        () => {
            const tickets = async () => {
                if (!household || !household._id) {
                    console.log("No household selected")
                    setUserTickets([])
                    return
                }

                try {
                    const ticketData = await axiosInstance.get(`tickets/household/${household._id}`)
                    const { data } = ticketData
                    setUserTickets(data)
                    console.log(`Fetched ${data.length} tickets for household: ${household.name}`)
                } catch (error) {
                    console.log("Error fetching household tickets:", error)
                    setUserTickets([])
                }

            }; tickets()
        }, [household?._id]
    )

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedTicket(null)
    }

    const handleTicketSave = (updatedTicket) => {
        // Update the ticket in the local state
        setUserTickets(prevTickets =>
            prevTickets.map(ticket =>
                ticket._id === updatedTicket._id ? updatedTicket : ticket
            )
        )
    }

    const hasMoreTickets = userTickets.length > 4
    return (
        <>

            <div className='flex flex-col'>
                <div className='flex flex-wrap gap-4'>

                    {(viewAll ? userTickets : userTickets.slice(-4)).map((ticket, index) => (
                        <Ticket key={index} data={ticket} onClick={handleTicketClick} />
                    ))}
                </div>
                <div className='flex justify-end mt-2'>
                    {!viewAll && hasMoreTickets && <button onClick={() => navigate("/all-tickets")} className='font-bold text-brand-primary-light hover:text-gray-500 cursor-pointer'>More</button>}
                </div>

            </div>

            {/* Edit Modal */}
            <TicketEditModal
                ticket={selectedTicket}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleTicketSave}
            />
        </>
    )
}

export default CardHolder