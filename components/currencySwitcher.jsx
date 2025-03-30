'use client';

import { useCurrency } from "@/context/currencyContext";
import { Button } from "./ui/button";
import { Repeat } from "lucide-react";

export default function CurrencySwitcher() {
    const { currency, toggleCurrency } = useCurrency();
    return (
        <Button
            variant="ghost"
            onClick={toggleCurrency}
            className="border-x border-x-black dark:border-x-white cursor-pointer rounded-none h-7"
        >
            {currency === 'TRY' ? '₺ (TRY)' : '$ (USD)'} <Repeat />
        </Button>
    );
}