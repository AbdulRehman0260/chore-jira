import React from 'react'
import NavBar from '../components/NavBar'
import choresImage from '../lib/images/chores.svg'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <NavBar />
            <div className="bg-brand-surface relative">
                <img
                    src={choresImage}
                    alt="Kaam Chore"
                    className="w-full h-60 object-cover object-[23%_77%]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-8xl font-bold text-brand-accent drop-shadow-lg text-shadow-lg" >
                        Kaam Chore
                    </h1>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4 px-4'>
                <div className='w-1/2'>
                    <Card text='Pending Tickets'
                        typeCard='Pending' />
                </div>
                <div className='w-1/2'>
                    <Card text='Assigned Tickets'
                        typeCard='Assigned' />
                </div>
            </div>
            <div className='flex justify-center mt-2'>
                <button className='bg-brand-primary text-white p-2 rounded-sm hover:bg-brand-primary-light cursor-pointer'
                    onClick={() => navigate('/ticket-create')}
                >
                    Create a Ticket
                </button>
            </div>
        </>

    )
}

export default HomePage