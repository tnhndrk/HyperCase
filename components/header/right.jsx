'use client'
import React, { useEffect } from 'react'
import LanguageSwitcher from '../languageSwitcher'
import ThemeSwitcher from '../themeSwitcher'
import CurrencySwitcher from '../currencySwitcher'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/context/cartContext'
import Badge from '../badge'

const Right = () => {
    const { cart, addToCart, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
    console.log(totalItems)
    return (
        <>
            <div className='flex flex-row items-center ml-2 justify-center gap-3'>
                <ThemeSwitcher />
                <CurrencySwitcher />
                <LanguageSwitcher />
                <Link href="/basket" className='relative'><ShoppingCart /><Badge item={totalItems} /></Link>
            </div>
        </>
    )
}

export default Right