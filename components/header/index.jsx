'use client'
import { routes } from '@/constans'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenu from './mobile-menu'
import Right from './right'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className='h-16 shadow-md bg-white dark:bg-black w-full z-50 fixed'>
            <div className='container mx-auto flex flex-row items-center justify-between p-3'>
                <MobileMenu />
                <div className='flex items-center mr-auto'>
                    <Link href="/">
                        <Image
                            alt='logo'
                            src="/logo.png"
                            width={512}
                            height={120}
                            className='h-10 w-auto'
                            priority
                        />
                    </Link>
                </div>
                <nav className='hidden lg:flex mr-auto ml-16 space-x-8'>
                    {
                        routes.map((item) => {
                            return (
                                <Link href={item?.href} key={item?.id} className='text-black dark:text-white'>
                                    {
                                        t(item?.title)
                                    }
                                </Link>

                            )
                        })
                    }
                </nav>
                <Right />
            </div>
        </div>
    )
}

export default Header