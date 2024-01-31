// RegisterForm.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css"; // Import CSS file for RegisterForm styling
import { register } from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const RegisterForm = ({ onSubmit }) => {
  const userSelector = (state) => state.user.user;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  });
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createAccount = (formData) => {
    let toSend = {
      username: formData.email,
      password: formData.password,
      firstname: formData.firstName,
      lastname: formData.lastName,
    };

    console.log(toSend);
    dispatch(register(toSend));

    navigate(`/`);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    if (!validatePassword(value)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
    handleChange(e);
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button
          onClick={() => createAccount(formData)}
          disabled={passwordError}
        >
          Create Account
        </button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
