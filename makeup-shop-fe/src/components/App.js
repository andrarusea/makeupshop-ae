import React from "react";
import MyMenu from "./Menu";
import ErrorPage from "./ErrorPage";
import "./App.css";
// import { BrowserRouter, Routes, Route, useLocation  } from "react-router-dom"
import { Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./products/ProductList";
import ProductDetails from "./products/Product";
import ShoppingCart from "./shopping-cart/Cart";
import Header from "./Header";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
function App() {
  const location = useLocation();

  return (
    <div>
      <div className={location.pathname !== "/" ? "my-app" : ""}>
        {<Header></Header>}
        {location.pathname !== "/" && location.pathname !== "/register" ? (
          <MyMenu />
        ) : (
          ""
        )}
        <div className={location.pathname !== "/" ? "my-app-page" : ""}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route
              path="/products/makeup"
              element={<ProductList category="MAKEUP" />}
            />
            <Route
              path="/products/skincare"
              element={<ProductList category="SKINCARE" />}
            />
            <Route
              path="/products/perfumes"
              element={<ProductList category="PERFUMES" />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
