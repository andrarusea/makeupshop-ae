import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../actions/actions";
import { addProductToShoppingCart } from "../../actions/actions";
import "./ProductDetails.css";
import makeup from "../../images/6075201.png";
import skincare from "../../images/skincare.png";
import perfume from "../../images/perfume.png";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    let userId = 7;
    let toSend = {
      quantity: 1,
      productId: productId,
    };

    dispatch(addProductToShoppingCart(userId, toSend));
    alert("Successfully added to shopping cart!");
  };

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="p-col-12 p-md-6 p-lg-4">
        <Card title={product.name} className="product-card">
          <img
            src={getProductImage(product.category)}
            alt={product.name}
            style={{ width: "50px", height: "50px" }}
            className="product-image"
          />
          <div className="product-info">
            <p>Brand: {product.brand}</p>
            <p>Price: {product.price} $</p>
            <p>Description: {product.description}</p>
          </div>
        </Card>
        <button
          onClick={() => handleAddToCart(product.id)}
          className="p-button p-button-primary p-button-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
