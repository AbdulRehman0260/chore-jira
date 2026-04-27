import React from 'react'
import Dropdown from './DropDown'
import PointsCounter from './PointsCounter'
import DateFilter from './DateFilter'
import { useAuthStore } from '../store/useAuthStore'
import { IoHomeOutline } from "react-icons/io5";
import { useHouseholdStore } from '../store/useHouseholdStore';


const NavBar = ({ onDateFilterChange, currentFilter }) => {
    const { logout } = useAuthStore()
    const { household, households, setHousehold } = useHouseholdStore()
    return (
        <div className='flex bg-brand-primary justify-between items-center px-3 py-1.5 relative z-50'>
            {/* Left side - Home info */}
            <div className='flex items-center gap-2'>
                <IoHomeOutline className='text-brand-white text-sm' />
                {household && households.length > 0 && (
                    <div className='flex items-center gap-2'>
                        <span className='text-brand-white text-xs font-medium'>
                            {household.name}
                        </span>
                        {household.inviteCode && (
                            <span className='text-brand-white text-xs opacity-75 bg-brand-white/10 px-1.5 py-0.5 rounded'>
                                {household.inviteCode}
                            </span>
                        )}
                        {households.length > 1 && (
                            <select
                                onChange={(e) => {
                                    const selectedHousehold = households.find(h => h._id === e.target.value)
                                    if (selectedHousehold) setHousehold(selectedHousehold)
                                }}
                                value={household._id}
                                className='text-xs bg-brand-primary border border-brand-white/30 rounded px-1.5 py-0.5 text-brand-white'
                            >
                                {households.map((h, index) => (
                                    <option key={`${h._id}-${index}`} value={h._id} className='text-black'>
                                        {h.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </div>

            {/* Right side - Controls */}
            <div className='flex items-center gap-2'>
                <div className='scale-75'>
                    <DateFilter onDateFilterChange={onDateFilterChange} currentFilter={currentFilter} />
                </div>
                <PointsCounter />
                <button onClick={logout} className='bg-brand-white/10 hover:bg-brand-white/20 text-white px-2 py-0.5 text-xs rounded cursor-pointer transition-colors'>
                    Logout
                </button>
            </div>
        </div>

    )
}

export default NavBar