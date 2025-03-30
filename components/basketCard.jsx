import React from 'react'
import CustomCard from './customCard'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from './ui/button'
import general from '@/utils/general'
import Image from 'next/image'
import { useCurrency } from '@/context/currencyContext'
import { useCart } from "@/context/cartContext";
import { useTranslation } from 'react-i18next'

const BasketCard = ({ item }) => {
    const { addToCart, removeFromCart } = useCart();
    const { currency } = useCurrency()
    const { t } = useTranslation();
    return (
        <div className='mb-4'>
            <CustomCard
                cardContent={
                    <div className='flex flex-row gap-4'>
                        <Image
                            alt=''
                            src={item?.productData?.productMainImage}
                            width={500}
                            height={500}
                            priority
                            className='w-auto h-52 object-cover rounded-xl'
                        />
                        <div className='flex flex-col space-y-2'>
                            <span className='text-lg font-semibold'>{t(item?.productName)}</span>
                            <span className='text-sm '>{t(item?.productData?.productInfo)}</span>
                            <div className='w-full flex flex-row items-center gap-4 mt-3'>
                                <Button variant="outline" onClick={() => removeFromCart(item?.productID)}><MinusCircle /></Button>
                                {item.quantity} {t("general.piece")}
                                <Button variant="outline" onClick={() => addToCart(item)}><PlusCircle /></Button>
                            </div>
                            <div className='w-full flex flex-row items-center gap-4 mt-3'>
                                <b>
                                    {general.currencyToSymbol(currency)}
                                    {general.priceCalculator(currency, item?.salePrice).toFixed(2)} x {item.quantity}
                                </b>
                            </div>
                            <div className='w-full flex flex-row items-center gap-4 mt-2'>
                                {t("general.totalAmount")}:<b>{general.currencyToSymbol(currency)}{general.priceCalculator(currency, item?.salePrice * item.quantity).toFixed(2)}</b>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export default BasketCard

