import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Ticket from '../components/Ticket'
import TicketEditModal from '../components/TicketEditModal'
import { axiosInstance } from '../lib/axios'
import { useHouseholdStore } from '../store/useHouseholdStore'

const Dashboard = () => {
    const [userTickets, setUserTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null })
    const { household } = useHouseholdStore()

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true)
            setError(null)

            if (!household || !household._id) {
                setUserTickets([])
                setLoading(false)
                return
            }

            try {
                const ticketData = await axiosInstance.get(`tickets/household/${household._id}`)
                const { data } = ticketData
                setUserTickets(data || [])
                console.log(`Fetched ${data?.length || 0} tickets for household: ${household.name}`)
            } catch (error) {
                console.log("Error fetching household tickets:", error)
                setError("Failed to load tickets")
                setUserTickets([])
            } finally {
                setLoading(false)
            }
        }

        fetchTickets()
    }, [household?._id])

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedTicket(null)
    }

    const handleTicketSave = (updatedTicket) => {
        setUserTickets(prevTickets =>
            prevTickets.map(ticket =>
                ticket._id === updatedTicket._id ? updatedTicket : ticket
            )
        )

        // Refresh points if ticket was completed
        if (updatedTicket.status === 'DONE') {
            // Check if this was a status change to DONE
            const originalTicket = userTickets.find(t => t._id === updatedTicket._id)
            console.log("Ticket completion check:", {
                updatedStatus: updatedTicket.status,
                originalStatus: originalTicket?.status,
                ticketPoints: updatedTicket.points,
                isStatusChange: originalTicket && originalTicket.status !== 'DONE'
            })

            if (originalTicket && originalTicket.status !== 'DONE') {
                // Refresh points display
                if (window.refreshPoints) {
                    console.log("Calling refreshPoints function...")
                    window.refreshPoints()
                    console.log(`Refreshed points after completing ticket worth ${updatedTicket.points} points`)
                } else {
                    console.error("refreshPoints function not available!")
                }
            }
        }
    }

    const handleDateFilterChange = (filter) => {
        setDateFilter(filter)
    }

    const filterTicketsByDate = (tickets) => {
        if (!dateFilter.startDate && !dateFilter.endDate) {
            return tickets
        }

        return tickets.filter(ticket => {
            if (!ticket.dueDate) return false

            const ticketDate = new Date(ticket.dueDate)
            const startDate = dateFilter.startDate ? new Date(dateFilter.startDate) : null
            const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null

            if (startDate && ticketDate < startDate) return false
            if (endDate && ticketDate > endDate) return false

            return true
        })
    }

    const organizeTicketsByStatus = (tickets) => {
        if (!tickets || !Array.isArray(tickets)) {
            return {
                'OPEN': [],
                'IN-PROGRESS': [],
                'DONE': [],
                'BLOCKED': []
            }
        }

        const statusGroups = {
            'OPEN': [],
            'IN-PROGRESS': [],
            'DONE': [],
            'BLOCKED': []
        }

        tickets.forEach(ticket => {
            if (!ticket) return

            const status = ticket.status?.toUpperCase() || 'OPEN'
            if (statusGroups[status]) {
                statusGroups[status].push(ticket)
            } else {
                statusGroups['OPEN'].push(ticket)
            }
        })

        Object.keys(statusGroups).forEach(status => {
            statusGroups[status].sort((a, b) => {
                if (!a || !b) return 0
                const dateA = new Date(a.dueDate || '9999-12-31')
                const dateB = new Date(b.dueDate || '9999-12-31')
                return dateA - dateB
            })
        })

        return statusGroups
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'done':
                return 'bg-green-50 text-green-700 border-green-200'
            case 'open':
                return 'bg-blue-50 text-blue-700 border-blue-200'
            case 'in-progress':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'
            case 'blocked':
                return 'bg-red-50 text-red-700 border-red-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
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

    const filteredTickets = filterTicketsByDate(userTickets)
    const organizedTickets = organizeTicketsByStatus(filteredTickets)

    if (error) {
        return (
            <>
                <div><NavBar onDateFilterChange={handleDateFilterChange} currentFilter={dateFilter} /></div>
                <div className='min-h-screen bg-gray-50'>
                    <div className='container mx-auto px-4 py-8 max-w-7xl'>
                        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-12'>
                            <div className='text-center'>
                                <div className='text-6xl mb-4'>⚠️</div>
                                <p className='text-xl text-red-600 font-bold mb-2'>{error}</p>
                                <p className='text-gray-500 mb-6'>Something went wrong while loading your tickets</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg'
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <div><NavBar onDateFilterChange={handleDateFilterChange} currentFilter={dateFilter} /></div>
                <div className='min-h-screen bg-gray-50'>
                    <div className='container mx-auto px-4 py-8 max-w-7xl'>
                        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-12'>
                            <div className='text-center'>
                                <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4'></div>
                                <p className='text-lg text-gray-600 font-medium'>Loading your tickets...</p>
                                <p className='text-sm text-gray-400 mt-2'>This should only take a moment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div><NavBar onDateFilterChange={handleDateFilterChange} currentFilter={dateFilter} /></div>
            <div className='min-h-screen bg-gray-50'>
                <div className='p-8'>
                    <div className='flex gap-4 overflow-x-auto pb-4'>
                        {Object.entries(organizedTickets).map(([status, tickets]) => (
                            <div key={status} className='flex-shrink-0 w-80'>
                                <div className='flex items-center justify-between mb-3 px-1'>
                                    <div className='flex items-center gap-2'>
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`}></div>
                                        <span className='font-medium text-gray-700 text-sm'>{status}</span>
                                        <span className='text-gray-500 text-sm'>{tickets.length}</span>
                                    </div>
                                </div>

                                <div className='bg-gray-50 rounded-lg p-2 min-h-[400px]'>
                                    {tickets.length === 0 ? (
                                        <div className='text-center py-8'>
                                            <div className='text-gray-400 text-sm'>No issues</div>
                                        </div>
                                    ) : (
                                        <div className='space-y-2'>
                                            {tickets.map((ticket, index) => (
                                                <div
                                                    key={ticket._id || index}
                                                    onClick={() => handleTicketClick(ticket)}
                                                    className='transform transition-all duration-200 hover:scale-[1.0] hover:shadow-xs'
                                                >
                                                    <Ticket data={ticket} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TicketEditModal
                ticket={selectedTicket}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleTicketSave}
            />
        </>
    )
}

export default Dashboard