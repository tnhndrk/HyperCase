'use client'
import BasketCard from "@/components/basketCard";
import CustomCard from "@/components/customCard";
import { useCurrency } from "@/context/currencyContext";
import { useCart } from "@/context/cartContext";
import general from "@/utils/general";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Basket() {
    const { cart, totalItems, totalPrice, clearCart } = useCart();
    const { currency } = useCurrency()
    const { t } = useTranslation();

    useEffect(() => {
        console.log("Toplam ürün sayısı:", totalItems);
        console.log("Toplam fiyat:", totalPrice);
    }, [totalItems, totalPrice, cart]);

    return (
        <div className='container mx-auto pt-28 pb-16 relative space-y-4'>
            {cart?.length === 0 ? (
                <p>{t("basket.noBasket")}</p>
            ) : (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-8">
                        <ul>
                            {cart?.map((item) => (
                                <BasketCard item={item} key={item.productID} />
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <CustomCard
                            cardTitle={<h2>{t("basket.orderSummary")}</h2>}
                            cardContent={
                                <div className="space-y-4">
                                    <h2 className="font-bold">{t("basket.products")}</h2>
                                    <hr />
                                    {cart?.map((item) => (
                                        <div className="grid grid-cols-12" key={"summary" + item?.productID}>
                                            <div className="col-span-12 lg:col-span-8 font-semibold">{t(item?.productName)}</div>
                                            <div className="col-span-12 lg:col-span-2 text-right">x{item?.quantity}</div>
                                            <div className="col-span-12 lg:col-span-2 text-right"> {general.currencyToSymbol(currency)}
                                                {general.priceCalculator(currency, item?.salePrice).toFixed(2)}</div>
                                        </div>
                                    ))}
                                    <h4 className="text-right">{t("basket.totalProductPiece")}: {totalItems}</h4>
                                    <hr />
                                </div>
                            }
                            cardFooter={<h2 className="text-right w-full">{t("general.totalAmount")}: {general.currencyToSymbol(currency)}{totalPrice.toFixed(2)}</h2>}
                        />
                    </div>
                </div>
            )
            }
        </div>
    );
}
