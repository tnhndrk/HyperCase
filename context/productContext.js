'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext({
    product: null,
    toggleProduct: () => { },
});

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState();

    useEffect(() => {
        const savedProduct = localStorage.getItem('product');
        const initialProduct = savedProduct;
        setProduct(initialProduct);
    }, []);

    const toggleProduct = (newProduct) => {
        setProduct(newProduct);
        localStorage.setItem('product', newProduct);
    };
    return (
        <ProductContext.Provider value={{ product, toggleProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
