import React from 'react'

const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-drawer dark:bg-dark">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
    )
}

export default Loading