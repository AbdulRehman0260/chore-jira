import React, { useState } from 'react'

const Dropdown = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative inline-block text-left">
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-brand-primary text-white px-4 py-2 rounded-xs w-48 text-left hover:bg-brand-primary-light cursor-pointer"
            >
                $HouseName
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute w-48 bg-brand-surface rounded-xs shadow-md">
                    <ul className="text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Account settings
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Support
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            License
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Sign out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
export default Dropdown