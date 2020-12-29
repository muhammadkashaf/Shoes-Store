import React, { createContext, useEffect, useState } from "react";
import { data } from "./data";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addCart = (id) => {
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const item = products.filter((product) => {
        return product._id === id;
      });
      setCart([...cart, ...item]);
    } else {
      alert("The product has been added to cart.");
    }
  };

  const reduction = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart(cart);
    getTotal();
  };

  const increase = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    setCart(cart);
    getTotal();
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart(cart);
      getTotal();
    }
  };

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    setTotal(res);
  };

  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
    localStorage.setItem("dataTotal", JSON.stringify(total));
  }, [cart, total]);

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      setCart(dataCart);
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      setTotal(dataTotal);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        products,
        cart,
        total,
        removeProduct,
        addCart,
        reduction,
        increase,
        getTotal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
