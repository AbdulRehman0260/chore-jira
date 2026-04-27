import React, { useState, useEffect } from 'react'
import { useHouseholdStore } from '../store/useHouseholdStore'
import { useAuthStore } from '../store/useAuthStore'
import { axiosInstance } from '../lib/axios'

const HomeManagement = () => {
    const { household, households, setHousehold, setHouseholds } = useHouseholdStore()
    const { isAuthenticated, user } = useAuthStore()
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({ name: '' })
    const [joinFormData, setJoinFormData] = useState({ inviteCode: '' })
    const [loading, setLoading] = useState(false)

    // Fetch households when user is authenticated
    useEffect(() => {
        const fetchHouseholds = async () => {
            if (!isAuthenticated || !user) {
                console.log('User not authenticated, skipping household fetch')
                return
            }

            try {
                console.log('Fetching households for authenticated user')
                const householdsResponse = await axiosInstance.get('tickets/households')
                const { data } = householdsResponse

                console.log('Households response:', data)

                if (Array.isArray(data) && data.length > 0) {
                    console.log('Setting households in store:', data)
                    setHouseholds(data)
                    setHousehold(data[0])
                } else {
                    console.log('No households found for user')
                    setHouseholds([])
                    setHousehold(null)
                }
            } catch (error) {
                console.error('Error fetching households:', error)
                setHouseholds([])
                setHousehold(null)
            }
        }

        fetchHouseholds()
    }, [isAuthenticated, user, setHouseholds, setHousehold])

    const handleCreateHome = async (e) => {
        e.preventDefault();
        console.log('Create home form submitted!');
        console.log('Form data:', createFormData);

        if (!createFormData.name.trim()) {
            console.log('Name is empty, returning');
            return;
        }

        console.log('Setting loading to true');
        setLoading(true);
        try {
            console.log('Making API call to create home');
            await axiosInstance.post('/households', { name: createFormData.name.trim() });
            console.log('Home created successfully!');

            console.log('Fetching households list');
            const householdsResponse = await axiosInstance.get('tickets/households');
            const { data } = householdsResponse;

            if (Array.isArray(data) && data.length > 0) {
                console.log('Updating household state with:', data);
                setHouseholds(data);
                setHousehold(data[0]);
            }

            console.log('Resetting form and closing modal');
            setCreateFormData({ name: '' });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating home:', error);
        } finally {
            console.log('Setting loading to false');
            setLoading(false);
        }
    };

    const handleJoinHome = async (e) => {
        e.preventDefault();
        if (!joinFormData.inviteCode.trim()) return;

        setLoading(true);
        try {
            await axiosInstance.post('/memberships/join', { inviteCode: joinFormData.inviteCode.trim().toUpperCase() });

            const householdsResponse = await axiosInstance.get('tickets/households');
            const { data } = householdsResponse;

            if (Array.isArray(data) && data.length > 0) {
                setHouseholds(data);
                setHousehold(data[data.length - 1]);
            }

            setJoinFormData({ inviteCode: '' });
            setShowJoinForm(false);
        } catch (error) {
            console.error('Error joining home:', error);
        } finally {
            setLoading(false);
        }
    };

    if (household && households.length > 0) {
        return (
            <>
                <div className="flex items-center justify-center gap-4 px-4 mb-6">
                    <div className="w-1/2">
                        <div
                            className="flex justify-center items-center h-20 bg-brand-surface text-black rounded-sm cursor-pointer hover:bg-gray-100"
                            onClick={() => setShowCreateForm(true)}
                        >
                            <span className="px-4 font-bold">Create Another Home</span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div
                            className="flex justify-center items-center h-20 bg-brand-surface text-black rounded-sm cursor-pointer hover:bg-gray-100"
                            onClick={() => setShowJoinForm(true)}
                        >
                            <span className="px-4 font-bold">Join Another Home</span>
                        </div>
                    </div>
                </div>

                {showCreateForm && (
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50">
                        <div className="bg-white rounded-sm p-6 w-80">
                            <h3 className="text-lg font-bold text-black mb-4">Create Home</h3>
                            <form onSubmit={handleCreateHome}>
                                <div className="flex flex-col gap-1 mb-4">
                                    <label className="text-xs" htmlFor="homeName">
                                        Home Name
                                    </label>
                                    <input
                                        id="homeName"
                                        type="text"
                                        value={createFormData.name}
                                        onChange={(e) => setCreateFormData({ name: e.target.value })}
                                        className="border-1 border-brand-surface rounded-sm"
                                        placeholder="Enter your home name"
                                        required
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateForm(false);
                                            setCreateFormData({ name: '' });
                                        }}
                                        className="flex w-full h-8 justify-center items-center bg-gray-200 rounded-sm text-sm text-black hover:bg-gray-300 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex w-full h-8 justify-center items-center bg-brand-primary rounded-sm text-sm text-brand-white hover:bg-brand-primary-light cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? 'Creating...' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showJoinForm && (
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50">
                        <div className="bg-white rounded-sm p-6 w-80">
                            <h3 className="text-lg font-bold text-black mb-4">Join Home</h3>
                            <form onSubmit={handleJoinHome}>
                                <div className="flex flex-col gap-1 mb-4">
                                    <label className="text-xs" htmlFor="inviteCode">
                                        Invite Code
                                    </label>
                                    <input
                                        id="inviteCode"
                                        type="text"
                                        value={joinFormData.inviteCode}
                                        onChange={(e) => setJoinFormData({ inviteCode: e.target.value.toUpperCase() })}
                                        className="border-1 border-brand-surface rounded-sm font-mono uppercase"
                                        placeholder="Enter 6-letter code"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowJoinForm(false)
                                            setJoinFormData({ inviteCode: '' })
                                        }}
                                        className="flex w-full h-8 justify-center items-center bg-gray-200 rounded-sm text-sm text-black hover:bg-gray-300 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex w-full h-8 justify-center items-center bg-brand-accent rounded-sm text-sm text-brand-white hover:bg-brand-accent-hover cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? 'Joining...' : 'Join'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className="flex items-center justify-center gap-4 px-4 mb-6">
            <div className="w-1/2">
                <div
                    className="flex justify-center items-center h-20 bg-brand-surface text-black rounded-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => setShowCreateForm(true)}
                >
                    <span className="px-4 font-bold">Create New Home</span>
                </div>
            </div>
            <div className="w-1/2">
                <div
                    className="flex justify-center items-center h-20 bg-brand-surface text-black rounded-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => setShowJoinForm(true)}
                >
                    <span className="px-4 font-bold">Join Home</span>
                </div>
            </div>

            {showCreateForm && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-white rounded-sm p-6 w-80">
                        <h3 className="text-lg font-bold text-black mb-4">Create Home</h3>
                        <form onSubmit={handleCreateHome}>
                            <div className="flex flex-col gap-1 mb-4">
                                <label className="text-xs" htmlFor="homeName">
                                    Home Name
                                </label>
                                <input
                                    id="homeName"
                                    type="text"
                                    value={createFormData.name}
                                    onChange={(e) => setCreateFormData({ name: e.target.value })}
                                    className="border-1 border-brand-surface rounded-sm"
                                    placeholder="Enter your home name"
                                    required
                                />
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setCreateFormData({ name: '' });
                                    }}
                                    className="flex w-full h-8 justify-center items-center bg-gray-200 rounded-sm text-sm text-black hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full h-8 justify-center items-center bg-brand-primary rounded-sm text-sm text-brand-white hover:bg-brand-primary-light cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showJoinForm && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-white rounded-sm p-6 w-80">
                        <h3 className="text-lg font-bold text-black mb-4">Join Home</h3>
                        <form onSubmit={handleJoinHome}>
                            <div className="flex flex-col gap-1 mb-4">
                                <label className="text-xs" htmlFor="inviteCode">
                                    Invite Code
                                </label>
                                <input
                                    id="inviteCode"
                                    type="text"
                                    value={joinFormData.inviteCode}
                                    onChange={(e) => setJoinFormData({ inviteCode: e.target.value.toUpperCase() })}
                                    className="border-1 border-brand-surface rounded-sm font-mono uppercase"
                                    placeholder="Enter 6-letter code"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowJoinForm(false)
                                        setJoinFormData({ inviteCode: '' })
                                    }}
                                    className="flex w-full h-8 justify-center items-center bg-gray-200 rounded-sm text-sm text-black hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full h-8 justify-center items-center bg-brand-accent rounded-sm text-sm text-brand-white hover:bg-brand-accent-hover cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? 'Joining...' : 'Join'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};

export default HomeManagement;
