import React from 'react'
import Dropdown from './DropDown'

const NavBar = () => {
    return (
        <div className='flex min-w-full h-10 bg-brand-primary justify-end'>
            <Dropdown />
            <button className='text-white w-20 hover:bg-brand-primary-light cursor-pointer'>Logout</button>
        </div>

    )
}

export default NavBar