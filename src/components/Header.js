import React, { useState, useContext } from "react";
import Menu from "./svg/bars-solid.svg";
import Close from "./svg/times-solid.svg";
import CartIcon from "./svg/shopping-cart-solid.svg";
import { Link } from "react-router-dom";
import { DataContext } from "./Context";
import "./css/Header.css";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const menuToggle = () => {
    setToggle(true);
  };

  const { cart } = useContext(DataContext);
  console.log("cart", cart);
  return (
    <header>
      <div className="menu" onClick={menuToggle}>
        <img src={Menu} alt="" width="20" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">
            <img
              style={{ width: 100, ObjectFit: "contain" }}
              alt="logo"
              src="https://png.pngtree.com/template/20191218/ourlarge/pngtree-modern-logos-for-sneakers-can-be-used-for-store-logos-or-image_340676.jpg"
            />
          </Link>
        </h1>
      </div>
      <nav>
        <ul className={toggle ? "toggle" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login / Register</Link>
          </li>
          <li className="close" onClick={() => setToggle(false)}>
            <img src={Close} alt="" width="20" />
          </li>
        </ul>
        <div className="nav-cart">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={CartIcon} alt="" width="20" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
