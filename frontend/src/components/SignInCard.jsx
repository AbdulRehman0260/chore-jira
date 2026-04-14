import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { axiosInstance } from '../lib/axios'

const SignInCard = () => {
    //local component state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //global auth state
    const { isLoading, isAuthenticated, setUser, setAuthenticated, setLoading } = useAuthStore()

    //using reacts event object to change local state
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //using the submit event to tie to action
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axiosInstance.post('/customers/login', formData)
            setUser(response.data)
            setAuthenticated(true)
            console.log('Login successful!')
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        //form wrapper (div) - run the submit function
        <form onSubmit={handleSubmit} className="flex flex-col min-h-40 w-full max-w-sm">
            <div className="flex justify-center items-center min-h-40">
                <p className="text-2xl font-bold text-center">
                    Sign in to your account
                </p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="email"> Email Address</label>
                        <input
                            className="border-1 border-brand-surface rounded-sm "
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="password"> Password</label>
                        <input
                            className="border-1 border-brand-surface rounded-sm"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        type='submit'
                        className="flex w-full h-8 justify-center items-center bg-brand-primary rounded-sm text-sm text-brand-white hover:bg-brand-primary-light cursor-pointer disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>

                {/* Debug: Show auth status */}
                {isAuthenticated && (
                    <div className="mt-4 p-2 bg-green-100 text-green-800 rounded text-sm">
                        ✅ Authenticated! You can now conditionally render content.
                    </div>
                )}
                <div className="flex justify-center gap-2">
                    <p className="text-sm">Dont have an account yet?</p>
                    <button className="text-sm text-brand-accent hover:text-brand-accent-hover cursor-pointer">
                        Sign up
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SignInCard