'use client'
import { routes } from '@/constans'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const socialMediaAnimation = `
rounded-xl cursor-pointer bg-transparent
text-black dark:text-white hover:text-white
hover:rotate-[360deg] hover:transition
hover:duration-300 h-10 w-10
`;
const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className='border-t-2 bg-white dark:bg-black border-t-mycolor-200'>
            <div className='container mx-auto py-5'>
                <div className='text-center space-y-4'>
                    <h2 className='text-2xl font-semibold'>
                        {t("footer.title")}
                    </h2>
                    <p className='font-light'>
                        {t("footer.desc")}
                    </p>
                </div>
            </div>
            <div>
                <div className='container flex flex-row mx-auto'>
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
                    <div className='flex flex-row gap-4 ml-auto'>
                        <Button size="icon" variant="default" className={`hover:bg-blue-800 ${socialMediaAnimation}`}><Facebook /></Button>
                        <Button size="icon" variant="default" className={`hover:bg-fuchsia-500 ${socialMediaAnimation}`}><Instagram /></Button>
                        <Button size="icon" variant="default" className={`hover:bg-blue-500 ${socialMediaAnimation}`}><Twitter /></Button>
                    </div>
                </div>

            </div>
            <div className='text-center my-4 space-x-8'>
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
            </div>
        </div>
    )
}

export default Footer