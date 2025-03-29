import React from 'react'
import CustomCard from './CustomCard'
import Link from 'next/link'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '@/context/currencyContext'
import Image from 'next/image'
import general from '@/utils/general'
import { useProduct } from '@/context/productContext'
import { useRouter } from 'next/navigation'

const ProductCard = ({ item }) => {
    const { toggleProduct } = useProduct();
    const { t } = useTranslation()
    const { currency } = useCurrency()
    const router = useRouter();
    const goProductDetails = (item) => {
        toggleProduct(item)
        router.push(`/product/${item.productID}`)
    }

    return (
        <div className='relative p-1 overflow-hidden rounded-xl group cursor-pointer'>
            <div className='absolute w-full h-full -z-50 rounded-xl top-0 left-0 bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 opacity-0 group-hover:opacity-70 blur-3xl group-hover:animate-spin'></div>

            <CustomCard
                cardTitle={item?.productName}
                cardContent={
                    <Image
                        alt=''
                        src={item?.productData?.productMainImage}
                        width={500}
                        height={500}
                        priority
                        className='w-full h-auto object-cover rounded-sm'
                    />
                }
                cardFooter={
                    <div className='flex flex-row items-center justify-between p-2 gap-4 w-full'>
                        <div className='w-full'>
                            <Button className='w-full cursor-pointer' onClick={() => goProductDetails(item)}>{t('general.detail')}</Button>
                        </div>
                        <span className='text-base font-bold'>
                            {general.currencyToSymbol(currency)}
                            {general.priceCalculator(currency, item?.salePrice).toFixed(2)}
                        </span>
                    </div>
                }
            />
        </div>
    )
}

export default ProductCard
