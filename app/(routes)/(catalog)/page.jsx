'use client';
import React, { useCallback, useEffect, useState } from 'react'
import ProductService from '@/service/endpoints/product';
import general from '@/utils/general';
import ProductCard from '@/components/productCard';
import SearchInput from '@/components/searchInput';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import useRefState from '@/hooks/useRefState';
import GamingCard from '@/components/gamingCard';
import Image from 'next/image';
import { useProduct } from '@/context/productContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [formProps, formPropsRef, setFormProps] = useRefState({});
  const updateProps = useCallback((values) => setFormProps((curr) => ({ ...curr, ...values })), []);
  const onChangeText = useCallback((e) => { updateProps({ search: e }) }, []);
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();
  const { toggleProduct } = useProduct();
  const [loading, setLoading] = useState(true);
  const { ProductList } = ProductService();

  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState(formProps?.search || '');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < productData.length ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [productData.length]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    onChangeText(e.target.value);
    setSelectedIndex(-1);

    if (!searchValue) {
      setFilteredProducts(productData);
      return;
    }
    const filtered = productData?.filter(product =>
      product?.productName?.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  }

  const goProductDetails = (item) => {
    toggleProduct(item)
    router.push(`/product/${item.productID}`)
  }

  const getProducts = async () => {
    setLoading(true);
    const data = await ProductList({});// page: 1, pageSize: 30 eklenince verisi tam dolu ürünler gelmiyor, o sebeple kullanılmadı
    let newData = data?.slice(0, 32)
    setProductData(newData);
    setFilteredProducts(newData);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
      setInputValue(filteredProducts[selectedIndex].productName);
    }
  }, [selectedIndex, filteredProducts]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleSearchChange(e);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!filteredProducts.length) return;

      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProducts.length - 1));
      } else if (e.key === 'Enter') {
        goProductDetails(filteredProducts[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProducts, selectedIndex]);

  return (
    <div className='container mx-auto pt-28 pb-16 relative space-y-4'>
      <div className='w-full h-auto flex lg:flex-row flex-col items-center justify-between px-3 border border-gray-900 rounded-2xl py-8 gap-4'>
        <div className='w-full pl-8 space-y-4'>
          <h1 className='font-bold text-3xl'>{t("home.title")}</h1>
          <span className='text-black dark:text-white'>{t("home.desc")}</span>
        </div>
        <div className='w-full flex items-center justify-center'>
          <div className="relative lg:w-96 lg:h-96 w-72 h-72 border-2 border-gray-900 rounded-xl overflow-hidden">
            {productData.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Image
                  alt=""
                  src={item?.productData?.productMainImage}
                  width={500}
                  height={500}
                  priority
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row items-center justify-between px-3'>
        <div className='w-full flex flex-row items-center gap-4'>
          <SearchInput onChange={handleInputChange} value={inputValue} placeholder={t("general.search")} />
          <Button onClick={() => goProductDetails(filteredProducts[selectedIndex] || filteredProducts[0])} variant="default" className="cursor-pointer">{t("general.search")}</Button>
        </div>
        <Button variant="ghost" className="cursor-pointer" onClick={() => router.push(`/product`)}>{t("general.allSee")}<ChevronRight className='inline' /></Button>
      </div>

      {formProps?.search && (
        <div className="bg-white shadow-lg text-black rounded-lg p-4 mx-3 w-[50%] absolute z-10">
          {!general.isNullOrEmpty(filteredProducts) ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.productID}
                className={`p-2 border-b last:border-none cursor-pointer 
                                    ${index === selectedIndex ? 'bg-gray-300' : ''}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => goProductDetails(product)}
              >
                {t(product.productName)}
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t("general.dataNotFound")}</p>
          )}
        </div>
      )}

      {
        loading ?
          <></>
          :
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
              <h2>{t("general.dataNotFound")}</h2>
            }
          </div>
      }
    </div>
  )
}

export default HomePage