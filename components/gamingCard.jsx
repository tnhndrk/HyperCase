import React from 'react'
import Image from 'next/image'

const GamingCard = ({ item, onClick }) => {
    return (
        <div className='w-44 h-56 border rounded-lg overflow-hidden' onClick={() => onClick && onClick()}>
            <Image
                alt=''
                src={item?.categoryDetail?.categoryMainImage}
                width={500}
                height={500}
                priority
                className='w-auto h-56 object-conver'
            />
        </div>
    )
}

export default GamingCard