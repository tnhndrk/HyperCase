'use client'
import React, { useEffect } from 'react'
import { useProduct } from '@/context/productContext'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import general from '@/utils/general';
import { useCurrency } from '@/context/currencyContext';
import { useCart } from '@/context/cartContext';
import Loading from '@/components/loading';
import { useTranslation } from 'react-i18next';

const ProductDetails = () => {
    const { product } = useProduct();
    const { currency } = useCurrency()
    const { addToCart } = useCart();
    const { t } = useTranslation()
    let hasDiscount = (product?.salePrice != product?.buyPrice && product?.buyPrice != 0);
    if (general.isNullOrEmpty(product)) {
        return <Loading />
    }
    return (
        <div className='container mx-auto pt-44'>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-4 w-full flex flex-col pt-8'>
                    <h1 className='font-semibold mb-2 text-lg'>{t(product?.productName)}</h1>
                    <div className='overflow-hidden relative w-fit h-auto p-1 rounded-xl'>
                        <div className='absolute w-full h-full -z-50 rounded-xl top-0 left-0 bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 opacity-70 blur-3xl animate-spin'></div>
                        <Image
                            alt=''
                            src={product?.productData?.productMainImage}
                            width={500}
                            height={500}
                            priority
                            className='w-auto lg:h-96 md:h-80 h-72 object-contain rounded-xl border-2 border-gray-900'
                        />
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-8'>
                    <div className='border-b gap-7 py-6 gap-y-4'>
                        <div>
                            <p className='font-semibold text-xl dark:text-zinc-50 text-zinc-950'>{t("product.desc.title")}</p>
                            <ol className='mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside'>
                                <li>{t(product?.productData?.productInfo)}</li>
                                <li>{t("general.stock")}: {t(product?.totalStock)}</li>
                            </ol>
                            {!general.isNullOrEmpty(product?.productRequire) && product?.productRequire?.length > 0 &&
                                <>
                                    <p className='font-semibold text-xl dark:text-zinc-50 text-zinc-950 mt-3'>{t("product.productRules")}</p>
                                    <ol className='mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside'>
                                        {
                                            product?.productRequire?.map((purchaseRequireItem, index) => {
                                                return (<li key={"productRequire" + index}>{t(purchaseRequireItem?.title)}</li>)
                                            })
                                        }
                                    </ol>
                                </>
                            }
                            {!general.isNullOrEmpty(product?.purchaseRequire) && product?.purchaseRequire?.length > 0 &&
                                <>
                                    <p className='font-semibold text-xl dark:text-zinc-50 text-zinc-950 mt-3'>{t("product.purchasingRules")}</p>
                                    <ol className='mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside'>
                                        {
                                            product?.purchaseRequire?.map((purchaseRequireItem, index) => {
                                                return (<li key={"purchaseRequire" + index}>{t(purchaseRequireItem?.title)}</li>)
                                            })
                                        }
                                    </ol>
                                </>
                            }
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='bg-gray-200 dark:bg-gray-800 rounded-xl p-4'>
                            <div className='flow-root text-sm text-gray-700 dark:text-gray-100'>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p>{t("general.amount")}</p>
                                    <p className='font-semibold'>
                                        {general.currencyToSymbol(currency)}
                                        {general.priceCalculator(currency, product?.salePrice).toFixed(2)}
                                    </p>
                                </div>
                                {
                                    (hasDiscount) &&
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p>{t("general.discount")}</p>
                                        <p className='font-semibold'>
                                            %{(((product?.salePrice - product?.buyPrice) / product?.salePrice) * 100)?.toFixed(2)}
                                        </p>
                                    </div>
                                }
                                <div className='my-2 h-px bg-gray-400'></div>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p>{t("general.totalAmount")}</p>
                                    <p className='font-semibold'>
                                        {
                                            (hasDiscount) &&
                                            <del className='font-semibold text-gray-400 mr-2'>
                                                {general.currencyToSymbol(currency)}
                                                {general.priceCalculator(currency, product?.salePrice).toFixed(2)}
                                            </del>
                                        }
                                        <span>{general.currencyToSymbol(currency)}
                                            {general.priceCalculator(currency, (hasDiscount) ? product?.buyPrice : product?.salePrice).toFixed(2)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 flex justify-end pb-12 space-x-4'>
                        <Button variant="default" onClick={() => addToCart(product)} className="cursor-pointer">
                            {t("general.addBasket")}<ShoppingCart className='h-4 w-4 inline' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails