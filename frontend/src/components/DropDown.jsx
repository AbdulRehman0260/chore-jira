import { useHouseholdStore } from '../store/useHouseholdStore.js';
import { axiosInstance } from '../lib/axios';
import React, { useState, useEffect } from 'react'

const Dropdown = () => {
    const { household, households, noHouseholdMessage, setHousehold, setHouseholds, setNoHouseholdMessage } = useHouseholdStore()
    const [open, setOpen] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [householdName, setHouseholdName] = useState('');
    const [creating, setCreating] = useState(false);

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
                console.error("Error response:", error.response);
                console.error("Error status:", error.response?.status);
                setNoHouseholdMessage(true);
            }
        };
        fetchHousehold();
    }, [setHousehold, setHouseholds, setNoHouseholdMessage]);

    const handleCreateHousehold = async (e) => {
        e.preventDefault();
        if (!householdName.trim()) return;

        setCreating(true);
        try {
            const response = await axiosInstance.post('/households', { name: householdName.trim() });
            console.log('Household created:', response.data);

            // Refresh households list
            const householdsResponse = await axiosInstance.get("tickets/households");
            const { data } = householdsResponse;

            if (Array.isArray(data) && data.length > 0) {
                setHouseholds(data);
                setHousehold(data[0]);
                setNoHouseholdMessage(false);
            }

            setShowCreateForm(false);
            setHouseholdName('');
        } catch (error) {
            console.error('Error creating household:', error);
            console.error('Error response:', error.response);
        } finally {
            setCreating(false);
        }
    };
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
            {open && (
                <div className="absolute bg-brand-surface rounded-xs shadow-xs mt-1 z-50">
                    {noHouseholdMessage ? (
                        <div className="p-3">
                            <p className="text-xs text-gray-600 mb-2">No households found</p>
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="w-full bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                            >
                                Create Household
                            </button>
                        </div>
                    ) : (
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
                    )}
                </div>
            )}

            {/* Create Household Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h3 className="text-lg font-semibold mb-4">Create Household</h3>
                        <form onSubmit={handleCreateHousehold}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Household Name
                                </label>
                                <input
                                    type="text"
                                    value={householdName}
                                    onChange={(e) => setHouseholdName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter household name"
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setHouseholdName('');
                                    }}
                                    className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="flex-1 px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {creating ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Dropdown