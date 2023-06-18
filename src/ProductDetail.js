import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import dummyImage from './images/dummy.jpg';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [navigate, setNavigate] = useState(false);
  
  const token = localStorage.getItem('token'); // or wherever you store your token
  const decoded = jwtDecode(token);
  const userId = decoded.id; // replace 'id' with the property name you have set in the payload while creating JWT token

  useEffect(() => {
    fetch(`http://localhost:5000/shop/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((productData) => {
        setProduct(productData);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch data: " + error);
      });
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, product_id: id }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      setNavigate(true);

    } catch (error) {
      setErrorMessage("Failed to add to cart: " + error);
    }
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  if (navigate) {
    return <Navigate to="/cart" />;
  }

  return (
    <div>
      <img src={dummyImage} alt="product" className="product-image" />
      <h1>{product.product_name}</h1>
      <p>{product.product_price}</p>
      <p>{product.product_size}</p>
      {/* add more fields as necessary */}
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductDetail;
