import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import './LoginForm.css'; 
import { useNavigate } from "react-router";
import { auth } from '../../actions/actions';

const LoginForm = ({ onSubmit }) => {
  const userSelector = (state) => state.user.user;

  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  const login = (email, password) => {
    let toSend = {
      username: email,
      password: password
    }

    console.log(toSend)
    dispatch(auth(toSend));

    if (Object.keys(user).length !== 0) {
      console.log(user);

      localStorage.setItem('token', user.token);
      localStorage.setItem('email', user.email);
      localStorage.setItem('firstname', user.firstname);
      localStorage.setItem('lastname', user.lastname);
      localStorage.setItem('userId', user.userId);

      console.log(localStorage)
      navigate(`/products`);
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={() => login(formData.username, formData.password)}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginForm;
