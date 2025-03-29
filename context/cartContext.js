'use client'

import { createContext, useContext, useReducer } from "react";
import { toast } from "sonner";

const CartContext = createContext();

const cartReducer = (state, action) => {
    let updatedCart;
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.find(item => item.productID === action.payload.productID);
            updatedCart = existingItem
                ? state.map(item =>
                    item.productID === action.payload.productID
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...state, { ...action.payload, quantity: 1 }];
            break;

        case "REMOVE_FROM_CART":
            updatedCart = state
                .map(item =>
                    item.productID === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);
            break;

        case "CLEAR_CART":
            updatedCart = [];
            break;

        default:
            return state;
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () =>
        JSON.parse(localStorage.getItem("cart")) || []
    );

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.salePrice * item.quantity, 0);

    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
        toast("Ürün sepete eklendi.");
    };

    const removeFromCart = (productID) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: productID });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
