import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'

const SignUpCard = () => {
    // Local component state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    // Global auth state
    const { isLoading, setUser, setAuthenticated, setLoading } = useAuthStore()
    const navigate = useNavigate()

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('') // Clear error when user types
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long')
            return
        }

        setLoading(true)

        try {
            console.log('Creating user with:', { name: formData.name, email: formData.email })
            
            // Create user account
            const response = await axiosInstance.post('/customers', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })

            console.log('User created successfully:', response.data)

            // After successful signup, automatically log the user in
            const loginResponse = await axiosInstance.post('/customers/login', {
                email: formData.email,
                password: formData.password
            })

            setUser(loginResponse.data)
            setAuthenticated(true)
            console.log('User logged in successfully after signup!')
            
            // Navigate to home page
            navigate('/')

        } catch (error) {
            console.error('Signup failed:', error.response?.data?.error || error.message)
            setError(error.response?.data?.error || 'Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col min-h-40 w-full max-w-sm">
            <div className="flex justify-center items-center min-h-40">
                <p className="text-2xl font-bold text-center">
                    Create your account
                </p>
            </div>
            <div className="flex flex-col gap-1">
                {error && (
                    <div className="p-2 bg-red-100 text-red-800 rounded text-sm mb-2">
                        {error}
                    </div>
                )}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="name">Full Name</label>
                        <input
                            className="border-1 border-brand-surface rounded-sm"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="email">Email Address</label>
                        <input
                            className="border-1 border-brand-surface rounded-sm"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="password">Password</label>
                        <input
                            className="border-1 border-brand-surface rounded-sm"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="border-1 border-brand-surface rounded-sm"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button
                        type='submit'
                        className="flex w-full h-8 justify-center items-center bg-brand-primary rounded-sm text-sm text-brand-white hover:bg-brand-primary-light cursor-pointer disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Sign up'}
                    </button>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    <p className="text-sm">Already have an account?</p>
                    <button 
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-sm text-brand-accent hover:text-brand-accent-hover cursor-pointer"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SignUpCard
