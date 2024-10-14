import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import axios from 'axios';
import CartItem from './CartItem/CartItem';

function Cart() {
  const [CartItem, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get("http://localhost:3000/customer/cart")
        .then(res => {
            if (res.data.status) {
                setCartItems(res.data.products); 
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
      <div>
          <Breadcrumb />
          <ShoppingCart cartItems={CartItem} /> 
      </div>
  );
}

export default Cart;
