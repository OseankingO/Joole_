import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import Axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer from './store/reducers/auth';
import categoryReducer from './store/reducers/category';
import productReducer from './store/reducers/product';
import { Provider } from 'react-redux';

// localhost
// Axios.defaults.baseURL = 'http://localhost:8080/JooleBackend_war';

// aws
Axios.defaults.baseURL = 'http://ec2-3-133-103-215.us-east-2.compute.amazonaws.com:8080/JooleBackend/';

Axios.defaults.headers.post['Content-Type'] = 'application/json';

Axios.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if(token) {
    request.headers = {
      'Authorization': 'Bearer ' + token
    };
  }
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

Axios.interceptors.response.use(response => {
  // Edit request config
  return response;
}, error => {
  return Promise.reject(error.response);
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
