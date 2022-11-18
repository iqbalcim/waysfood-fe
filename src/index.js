import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from 'react-use-cart';
import App from './App';
import { ProfileContextProvider } from './Component/Context/profileContext';
import { UserContextProvider } from './Component/Context/userContext';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
        <ProfileContextProvider>
             
              <QueryClientProvider client={client}>
                  <App />
                </QueryClientProvider>
        </ProfileContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
