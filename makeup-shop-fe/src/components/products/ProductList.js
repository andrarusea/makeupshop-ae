import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getProductsByCategory } from "../../actions/actions";
import { addProductToShoppingCart } from "../../actions/actions";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import "./ProductList.css"; // Import CSS file
import makeup from "../../images/6075201.png";
import skincare from "../../images/skincare.png";
import perfume from "../../images/perfume.png";

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (category) {
      dispatch(getProductsByCategory(category));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, category]);

  const getProductImage = (category) => {
    switch (category) {
      case "MAKEUP":
        return makeup;
      case "SKINCARE":
        return skincare;
      default:
        return perfume;
    }
  };

  const handleAddToCart = (productId) => {
    let toSend = {
      quantity: 1,
      productId: productId,
    };
    dispatch(addProductToShoppingCart(localStorage.getItem("userId"), toSend));
    alert("Successfully added to shopping cart!");
  };

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card title={product.name}>
              <img
                src={getProductImage(product.category)}
                style={{ width: "50px", height: "50px" }}
                alt={product.name}
              />
              <div className="product-card-details">
                <p>Brand: {product.brand}</p>
                <p>Price: {product.price} $</p>
              </div>
            </Card>
          </Link>
          <button
            onClick={() => handleAddToCart(product.id)}
            className="add-to-cart-button p-button p-button-primary p-button-sm"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
