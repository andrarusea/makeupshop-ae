import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import {
  getShoppingCart,
  editQuantity,
  deleteItemFromShoppingCart,
  pay,
} from "../../actions/actions";
import "./Cart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isLoading = useSelector((state) => state.cart.fetching);
  const redirect = useSelector((state) => state.url.redirect);

  let userId = localStorage.getItem("userId");

  const [address, setAddress] = useState({
    county: "",
    city: "",
    street: "",
    number: "",
    postalCode: "",
    flat: "",
    apartment: "",
    floor: "",
  });

  useEffect(() => {
    dispatch(getShoppingCart(userId));
  }, [dispatch]);

  const handleQuantityChange = (itemId, quantity) => {
    console.log("handle quantity change", itemId, quantity);
    let payload = {
      quantity: Number(quantity),
    };
    dispatch(editQuantity(userId, payload, itemId));
    window.location.reload();
  };

  const handleRemoveItem = (itemId) => {
    console.log("Item id: ", itemId);
    dispatch(deleteItemFromShoppingCart(userId, itemId));
    window.location.reload();
  };

  const handleSubmitOrder = () => {
    dispatch(pay(totalPrice))
      .then(() => {
        console.log(redirect);
        if (redirect && redirect.url) {
          window.location.replace(redirect.url);
        }
      })
      .catch((error) => {
        console.error("Error dispatching action:", error);
      });
  };

  let totalPrice = 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="p-grid p-nogutter p-justify-center">
        <div className="p-col-12 p-md-8">
          <Card title="Shopping Cart">
            <div>No items in the shopping cart. Keep on shopping!</div>
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-6">
                <InputText
                  value={address.county}
                  onChange={(e) =>
                    setAddress({ ...address, county: e.target.value })
                  }
                  placeholder="County"
                />
                <InputText
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  placeholder="City"
                />
                <InputText
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  placeholder="Street"
                />
                <InputText
                  value={address.number}
                  onChange={(e) =>
                    setAddress({ ...address, number: e.target.value })
                  }
                  placeholder="Number"
                />
              </div>
              <div className="p-col-12 p-md-6">
                <InputText
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                  placeholder="Postal Code"
                />
                <InputText
                  value={address.flat}
                  onChange={(e) =>
                    setAddress({ ...address, flat: e.target.value })
                  }
                  placeholder="Flat"
                />
                <InputText
                  value={address.apartment}
                  onChange={(e) =>
                    setAddress({ ...address, apartment: e.target.value })
                  }
                  placeholder="Apartment"
                />
                <InputText
                  value={address.floor}
                  onChange={(e) =>
                    setAddress({ ...address, floor: e.target.value })
                  }
                  placeholder="Floor"
                />
              </div>
            </div>
            <Button
              label="Send Order"
              onClick={() => handleSubmitOrder()}
              className="p-button p-button-primary"
            />
          </Card>
        </div>
      </div>
    );
  }

  if (!isLoading) {
    totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  }

  return (
    <div className="p-grid p-nogutter p-justify-center">
      <div className="p-col-12 p-md-8">
        <Card title="Shopping Cart">
          {cart.cartItems.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="item-details">
                <p>Name: {item.product.name}</p>
                <p>Price: ${item.product.price}</p>
                <p>
                  Quantity:
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.cartItemId, e.target.value)
                    }
                  >
                    {[...Array(10).keys()].map((quantity) => (
                      <option key={quantity} value={quantity + 1}>
                        {quantity + 1}
                      </option>
                    ))}
                  </select>
                </p>
                <p>Total: ${item.product.price * item.quantity}</p>
                <Button
                  label="Remove"
                  onClick={() => handleRemoveItem(item.cartItemId)}
                  className="p-button p-button-danger"
                />
              </div>
            </div>
          ))}
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <div className="p-grid p-fluid">
            <div className="p-col-12 p-md-6">
              <InputText
                value={address.county}
                onChange={(e) =>
                  setAddress({ ...address, county: e.target.value })
                }
                placeholder="County"
              />
              <InputText
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                placeholder="City"
              />
              <InputText
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                placeholder="Street"
              />
              <InputText
                value={address.number}
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
                placeholder="Number"
              />
            </div>
            <div className="p-col-12 p-md-6">
              <InputText
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
                placeholder="Postal Code"
              />
              <InputText
                value={address.flat}
                onChange={(e) =>
                  setAddress({ ...address, flat: e.target.value })
                }
                placeholder="Flat"
              />
              <InputText
                value={address.apartment}
                onChange={(e) =>
                  setAddress({ ...address, apartment: e.target.value })
                }
                placeholder="Apartment"
              />
              <InputText
                value={address.floor}
                onChange={(e) =>
                  setAddress({ ...address, floor: e.target.value })
                }
                placeholder="Floor"
              />
            </div>
          </div>
          <Button
            label="Send Order"
            onClick={() => handleSubmitOrder()}
            className="p-button p-button-primary"
          />
        </Card>
      </div>
    </div>
  );
};

export default ShoppingCart;
