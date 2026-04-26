import React from 'react'
import NavBar from '../components/NavBar'
import CardHolder from '../components/CardHolder'

const Dashboard = () => {
    return (
        <>
            <div><NavBar /></div>
            <div className='flex mt-4 justify-around'>
                <CardHolder />
            </div>

        </>
    )
}

export default Dashboard