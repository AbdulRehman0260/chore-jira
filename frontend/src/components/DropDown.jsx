import { useHouseholdStore } from '../store/useHouseholdStore.js';
import { axiosInstance } from '../lib/axios';
import React, { useState, useEffect } from 'react'

const Dropdown = () => {
    const { household, households, noHouseholdMessage, setHousehold, setHouseholds, setNoHouseholdMessage } = useHouseholdStore()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchHousehold = async () => {
            try {
                const response = await axiosInstance.get("tickets/households")
                const { data } = response;

                // Handle empty response (user has no houses)
                if (!data || data === '' || data === null) {
                    setNoHouseholdMessage(true);
                    return;
                }

                // Handle array of households
                if (Array.isArray(data)) {
                    if (data.length === 0) {
                        // Empty array = user has no houses
                        setNoHouseholdMessage(true);
                    } else {
                        setHouseholds(data);
                        setHousehold(data[0]);
                    }
                } else {
                    // Any other response type = no houses
                    setNoHouseholdMessage(true);
                }
            } catch (error) {
                // Only catch actual network/server errors
                console.error("Error fetching households:", error);
                setNoHouseholdMessage(true);
            }
        };
        fetchHousehold();
    }, [setHousehold, setHouseholds, setNoHouseholdMessage]);
    return (
        <div className="relative">
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-brand-primary text-xs text-white rounded-xs text-left hover:bg-brand-primary-light cursor-pointer"
            >
                {noHouseholdMessage ? "No House joined" : household?.name || "House"}
            </button>

            {/* Dropdown */}
            {open && !noHouseholdMessage && (
                <div className="absolute bg-brand-surface rounded-xs shadow-xs mt-1">
                    <ul className="text-xs text-gray-700">
                        {/* Map over households array */}
                        {households.map((householdItem, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setHousehold(householdItem);
                                    setOpen(false);
                                }}
                            >
                                {householdItem.name || 'Unnamed Household'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default Dropdown