import React, { useEffect, useState } from "react";
import '../styles/Shop.css'
import dummyImage from '../images/dummy.jpg';

export default function Home() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/shop")
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(({products}) => {
        setData(products);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch data: " + error);
      });
  }, []);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="product-list">
      {data.map((item, index) => (
        <div key={index} className="product-item">
          <img src={dummyImage} alt="product" className="product-image"/>
          <h2>{item.product_name}</h2>
          <p>{item.product_price}</p>
          <p>{item.product_size}</p>
        </div>
      ))}
    </div>
  );
}
