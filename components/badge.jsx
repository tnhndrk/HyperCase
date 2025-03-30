import React from 'react'

const Badge = ({ item }) => {
    return (
        <div className='absolute -right-3 -top-2 bg-blue-500 p-1 w-5 h-5 rounded-full flex items-center justify-center'>
            <span className='text-xs font-semibold'>{item}</span>
        </div>
    )
}

export default Badge