import React from 'react';
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { Provider } from 'react-redux';
import store from './Store/store';
import SocketWrapper from "./Context/SocketWrapper";

import App from './App.js'
import './index.css'

const clientId = process.env.REACT_APP_CLIENT_ID
console.log(clientId);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <SocketWrapper>
  <GoogleOAuthProvider clientId={clientId}>
  <Provider store={store}>
  {/* <React.StrictMode> */}
    <App/>
  {/* </React.StrictMode> */}
  </Provider> 
  </GoogleOAuthProvider>
  </SocketWrapper>
);

