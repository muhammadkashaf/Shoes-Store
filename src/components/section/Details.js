/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
import Colors from "./Colors";
import "../css/Details.css";

export const Details = ({ match }) => {
  let params = match.params;

  const context = useContext(DataContext);
  const [product, setProduct] = useState([]);

  const getProduct = () => {
    const { products } = context;

    if (params.id) {
      const res = products;
      const data = res.filter((item) => {
        return item._id === params.id;
      });
      setProduct(data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const { addCart } = context;

  return (
    <>
      { product.map((item) => (
        <div className="details" key={item._id}>
          <img src={item.src} alt="" />
          <div className="box">
            <div className="row">
              <h2>{item.title}</h2>
              <span>${item.price}</span>
            </div>
            <Colors colors={item.colors} />
            <p>{item.description}</p>
            <p>{item.content}</p>
            <Link to="/cart" className="cart" onClick={() => addCart(item._id)}>
              Add to cart
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Details;
