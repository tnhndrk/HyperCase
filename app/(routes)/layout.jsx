import React from 'react'
import Providers from '@/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import '@/lib/i18n';
const RoutesLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='min-h-screen'>
                <Providers>{children}</Providers>
            </div>
            <Footer />
        </>
    )
}

export default RoutesLayout