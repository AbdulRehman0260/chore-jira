import React from 'react'
import Dropdown from './DropDown'
import PointsCounter from './PointsCounter'
import { useAuthStore } from '../store/useAuthStore'
import { IoHomeOutline } from "react-icons/io5";
import { useHouseholdStore } from '../store/useHouseholdStore';


const NavBar = () => {
    const { logout } = useAuthStore()
    return (
        <div className='flex bg-brand-primary justify-end items-center pb-1 relative z-50'>
            <div className='flex items-center justify-center gap-1'>
                <IoHomeOutline className='text-brand-white text-md' />
                <Dropdown />
                <PointsCounter />
                <button onClick={logout} className='text-white w-14 text-xs hover:bg-brand-primary-light cursor-pointer'>Logout</button>
            </div>
        </div>

    )
}

export default NavBar