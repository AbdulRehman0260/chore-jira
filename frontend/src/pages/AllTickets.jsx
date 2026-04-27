import React from 'react'
import NavBar from '../components/NavBar'
import CardHolder from '../components/CardHolder'

const AllTickets = () => {
    return (
        <>
            <div><NavBar /></div>
            <div className='flex mt-4 justify-around'>
                <CardHolder viewAll={true} />
            </div>

        </>
    )
}

export default AllTickets