import React from 'react'

const Card = () => {
    return (
        <div className="flex flex-col min-h-40 w-full max-w-sm">
            <div className="flex justify-center items-center min-h-40">
                <p className="text-2xl font-bold text-center">
                    Sign in to your account
                </p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="Email Address"> Email Address</label>
                        <input className="border-1 border-brand-surface rounded-sm " type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="Password"> Password</label>
                        <input className="border-1 border-brand-surface rounded-sm" type="text" />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button type='submit' className="flex w-full h-8 justify-center items-center bg-brand-primary rounded-sm text-sm text-brand-white hover:bg-brand-primary-light cursor-pointer">Sign in</button>
                </div>
                <div className="flex justify-center gap-2">
                    <p className="text-sm">Dont have an account yet?</p>
                    <button className="text-sm text-brand-accent hover:text-brand-accent-hover cursor-pointer">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card