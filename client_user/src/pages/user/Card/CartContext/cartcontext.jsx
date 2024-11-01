import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { openNotification } from '../../../../assets/hooks/notification';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // thêm sản phẩm vào giỏ hàng
    const addToCart = (products) => {
       setCartItems(products)
    };

    // cập nhật số lượng sản phẩm
    const updateCartItemQuantity = (id, size, newQuantity) => {
        const idProduct = id
        const quantity = newQuantity
        axios.post("http://localhost:3000/customer/cart/update-quantity-cart",{idProduct,quantity,size})
            .then(res=>{
                if(res.data.status){
                    openNotification(true,res.data.message,"Update quantity successfull !")
                    setCartItems((prevItems) =>
                        prevItems.map((item) =>
                            item.productId === id && item.size === size
                                ? { ...item, quantity: newQuantity }
                                : item
                        )
                    );
                    
                }
            })
            .catch(err=>{
                openNotification(false,err.response.data.message,"Update quantity failed !")
            })
       
    };

    //  xoá sản phẩm khỏi giỏ hàng
    const removeFromCart = (id, size) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.productId === id && item.size === size))
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
