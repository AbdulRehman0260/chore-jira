import React from 'react'
import NavBar from '../components/NavBar'
import HomeManagement from '../components/HomeManagement'
import choresImage from '../lib/images/chores.svg'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import { useHouseholdStore } from '../store/useHouseholdStore'

const HomePage = () => {
    const navigate = useNavigate()
    const { household } = useHouseholdStore()

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

            <div className='container mx-auto px-4 py-8'>
                {/* Home Management Section */}
                <div className='mb-8'>
                    <HomeManagement />
                </div>

                {/* Only show ticket stats and actions if user has a household */}
                {household && (
                    <>
                        <div className='flex items-center justify-center gap-4 px-4 mb-6'>
                            <div className='w-1/2'>
                                <Card text='Pending Tickets'
                                    typeCard='Pending' />
                            </div>
                            <div className='w-1/2'>
                                <Card text='Assigned Tickets'
                                    typeCard='Assigned' />
                            </div>
                        </div>

                        <div className='flex justify-center gap-4'>
                            <button className='bg-brand-primary text-white p-2 rounded-sm hover:bg-brand-primary-light cursor-pointer'
                                onClick={() => navigate('/ticket-create')}
                            >
                                Create a Ticket
                            </button>
                            <button
                                className='bg-brand-accent text-white p-2 rounded-sm hover:bg-brand-accent-hover cursor-pointer flex items-center gap-2'
                                onClick={() => navigate('/ticket-dashboard')}
                            >
                                View Dashboard
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Footer Section */}
            <div className='bg-brand-primary text-white py-12 mt-16'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {/* About Section */}
                        <div>
                            <h3 className='text-xl font-semibold mb-4 text-brand-accent'>About Kaam Chore</h3>
                            <p className='text-brand-surface leading-relaxed'>
                                Simplify household task management with our intuitive ticketing system.
                                Assign chores, track progress, and keep your home running smoothly.
                            </p>
                        </div>

                        {/* Features Section */}
                        <div>
                            <h3 className='text-xl font-semibold mb-4 text-brand-accent'>Features</h3>
                            <ul className='space-y-2 text-brand-surface'>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Easy ticket creation
                                </li>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Household member assignment
                                </li>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Points-based tracking
                                </li>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Due date management
                                </li>
                            </ul>
                        </div>

                        {/* Stats Section */}
                        <div>
                            <h3 className='text-xl font-semibold mb-4 text-brand-accent'>Why Choose Us</h3>
                            <ul className='space-y-2 text-brand-surface'>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Family-friendly interface
                                </li>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Fair task distribution
                                </li>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Progress tracking
                                </li>
                                <li className='flex items-center'>
                                    <span className='w-2 h-2 bg-brand-accent rounded-full mr-2'></span>
                                    Motivational points system
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className='border-t border-brand-primary-dark mt-8 pt-8 text-center'>
                        <p className='text-brand-surface text-sm'>
                            © 2024 Kaam Chore. Making household management simple.
                        </p>
                        <p className='text-brand-surface text-xs mt-2'>
                            Built with ❤️ for families everywhere
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HomePage