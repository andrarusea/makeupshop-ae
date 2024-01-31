import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css';

import { Provider } from "react-redux"
import store from "./stores/store"

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);