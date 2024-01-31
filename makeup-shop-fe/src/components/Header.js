import React from 'react';
import { useNavigate } from "react-router";
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import the shopping cart icon
import { useSelector, useDispatch } from "react-redux";

import "./Header.css";

const Header = () => {
//   const history = useHistory(); // Get history object from react-router-dom
const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">Makeup Shop</div>
      <div className="cart-icon" onClick={() => navigate(`/cart`)}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
      <div className="auth-icon" onClick={() => navigate(`/`)}>🔒</div>
    </header>
  );
};

export default Header;
