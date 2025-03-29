'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CurrencyContext = createContext({
    currency: 'TRY',
    toggleCurrency: () => { },
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('light');

    useEffect(() => {
        const savedCurrency = localStorage.getItem('currency');
        const initialCurrency = savedCurrency || "TRY";
        setCurrency(initialCurrency);
    }, []);

    const toggleCurrency = () => {
        const newCurrency = currency === 'TRY' ? 'USD' : 'TRY';
        setCurrency(newCurrency);
        localStorage.setItem('currency', newCurrency);
    };
    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
