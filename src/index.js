import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux';
import App from './App';
import store from './Module/redux/store'; // Ensure your path to App is correct

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);