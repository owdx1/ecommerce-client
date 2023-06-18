import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const getCartData = async () => {
      try {
        const decodedToken = jwt_decode(token);
        const response = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: decodedToken.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.products); // Extract products array from the response
        } else {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to fetch cart: ${error.message}`);
        if (error.message.startsWith('HTTP error, status = 401')) {
          localStorage.removeItem('token');
          setToken(null);
          navigate('/login');
        } else {
          navigate('/error');
        }
      }
    };

    // Check if the token exists
    if (token) {
      getCartData();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      {cartItems ? (
        <>
          <h1>Cart</h1>
          {cartItems.map((item, index) => (
            <div key={index}>
              <h2>{item.product_name}</h2>
              <p>{item.product_price}</p>
              <p>{item.product_size}</p>
              {/* Display more product details as necessary */}
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;
