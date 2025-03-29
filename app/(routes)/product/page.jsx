'use client';
import React, { useCallback, useEffect, useState } from 'react'
import ProductService from '@/service/endpoints/product';
import general from '@/utils/general';
import ProductCard from '@/components/productCard';
import useRefState from '@/hooks/useRefState';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/loading';
const Products = () => {
    const { t } = useTranslation();
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const [paginationInfo, setPaginationInfo] = useState({
        page: page ?? 1,
        pageCount: 10,
        total: 160,
    });
    const [filterProps, filterPropsRef, setFilterProps] = useRefState({
        limit: 16,
        page: page ?? 1
    });
    const updateFilterProps = useCallback(
        (vals) => setFilterProps((curr) => ({ ...curr, ...vals })),
        []
    );

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { ProductList } = ProductService();

    const onChangePage = useCallback((page, pageSize) => {
        updateFilterProps({ page: page, limit: pageSize });
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const data = await ProductList({ page: filterPropsRef?.current?.page, pageSize: filterPropsRef?.current?.limit });
        setProductData(data);
        setLoading(false);
    };

    useEffect(() => {
        getProducts();
    }, [filterProps])

    return (
        <div className='container mx-auto pt-28 pb-16 relative space-y-4'>
            {
                loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div className='grid grid-cols-12'>
                            {
                                (!general.isNullOrEmpty(productData) && productData?.length > 0) && productData?.map((productItem) => {
                                    return (
                                        <div key={productItem?.productID} className='col-span-6 lg:col-span-3 md:col-span-4 px-3 py-2'>
                                            <ProductCard item={productItem} />
                                        </div>
                                    )
                                })
                            }
                            {
                                (general.isNullOrEmpty(productData) || productData?.length <= 0) &&
                                <div className='col-span-12 flex items-center justify-center'>
                                    <span className='text-black dark:text-white text-2xl font-bold'>Veri Bulunamadı</span>
                                </div>
                            }
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href={filterProps?.page == 1 ? "#" : "?page=" + (filterProps?.page - 1)} title={t("general.previous")} />
                                </PaginationItem>
                                {[...Array(paginationInfo?.total / paginationInfo?.pageCount)].map((_, index) => (
                                    <PaginationItem key={index} isSelected={(index + 1) == filterProps?.page}>
                                        <PaginationLink href={"?page=" + (index + 1)}>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext href={filterProps?.page == (paginationInfo?.total / paginationInfo?.pageCount) ? "#" : "?page=" + (filterProps?.page + 1)} title={t("general.next")} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
            }
        </div>
    )
}

export default Products