import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreContextProvider from "./Context/StoreContext";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

 const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`, // Make sure this matches your server's GraphQL endpoint
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <StoreContextProvider>
                    <App />
                    <ToastContainer position="top-right" autoClose={3000} />
                </StoreContextProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);

reportWebVitals();
