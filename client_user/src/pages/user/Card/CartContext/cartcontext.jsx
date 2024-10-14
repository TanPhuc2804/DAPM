import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Tải giỏ hàng từ localStorage nếu có
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Lưu giỏ hàng mỗi khi cartItems thay đổi
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.size === product.size
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += product.quantity;
                return updatedItems;
            } else {
                return [...prevItems, product];
            }
        });
    };

    // cập nhật số lượng sản phẩm
    const updateCartItemQuantity = (id, size, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    //  xoá sản phẩm khỏi giỏ hàng
    const removeFromCart = (id, size) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === id && item.size === size))
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
