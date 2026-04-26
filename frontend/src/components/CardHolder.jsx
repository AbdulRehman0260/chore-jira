import React, { useEffect, useState } from 'react'
import Ticket from './Ticket'
import { axiosInstance } from '../lib/axios'

const CardHolder = () => {
    const [userTickets, setUserTickets] = useState([])
    useEffect(
        () => {
            const tickets = async () => {
                try {
                    const data = await axiosInstance.get("tickets/user")
                    console.log(data)
                } catch (error) {
                    console.log("Error trying to useEffect", error)
                }

            }; tickets()
        }, []
    )
    return (
        <div className='flex gap-4'>
            {[...Array(4)].map((_, index) => (
                <Ticket key={index} data={{}} />
            ))}
        </div>
    )
}

export default CardHolder