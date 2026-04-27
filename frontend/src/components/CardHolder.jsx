import React, { useEffect, useState } from 'react'
import Ticket from './Ticket'
import { axiosInstance } from '../lib/axios'
import { useNavigate } from 'react-router-dom'

const CardHolder = ({ viewAll = false }) => {
    const [userTickets, setUserTickets] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => {
            const tickets = async () => {
                try {
                    const ticketData = await axiosInstance.get("tickets/user")
                    const { data } = ticketData
                    setUserTickets(data)
                    console.log(data)
                } catch (error) {
                    console.log("Error trying to useEffect", error)
                }

            }; tickets()
        }, []
    )
    const hasMoreTickets = userTickets.length > 4
    return (
        <div className='flex flex-col'>
            <div className='flex flex-wrap gap-4'>

                {(viewAll ? userTickets : userTickets.slice(-4)).map((ticket, index) => (
                    <Ticket key={index} data={ticket} />
                ))}
            </div>
            <div className='flex justify-end mt-2'>
                {!viewAll && hasMoreTickets && <button onClick={() => navigate("/all-tickets")} className='font-bold text-brand-primary-light hover:text-gray-500 cursor-pointer'>More</button>}
            </div>

        </div>


    )
}

export default CardHolder