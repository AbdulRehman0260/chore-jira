import React from 'react'
import SignUpCard from '../components/SignUpCard'

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <SignUpCard />
      </div>
    </div>
  )
}

export default SignUpPage
