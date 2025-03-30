'use client'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Contacts = () => {
    const { t } = useTranslation()
    return (
        <div className='container mx-auto pt-44'>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                    <div className='flex flex-col max-w-[500px] space-y-5 items-start'>
                        <Image
                            alt='logo'
                            src="/img/logo.png"
                            width={500}
                            height={500}
                            priority
                            className='w-auto h-20 object-contain' />
                        <span className='mt-3'>{t("contact.desc")}</span>
                        <span className='flex flex-row gap-2'>
                            <Mail /> info@hyperteknoloji.com
                        </span>
                        <span className='flex flex-row gap-2'>
                            <Phone /> +905555555555
                        </span>
                        <span className='flex flex-row gap-2'>
                            <MapPin /> {t("contact.address")}
                        </span>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <div className='w-full h-full border border-gray-900 rounded-xl'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.8710067845054!2d28.950778012503267!3d40.25639797134681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca148025bb1765%3A0x19ef21f213c683e0!2sHyper%20Teknoloji!5e0!3m2!1str!2str!4v1743290558915!5m2!1str!2str"
                            width="100%"
                            height="450"
                            className='border-2 border-gray-700 rounded-xl p-1'
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts