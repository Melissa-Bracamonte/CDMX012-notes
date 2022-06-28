import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/routes/App";
import { HashRouter } from "react-router-dom";
import UserProvider from "./database/UserProvider";
// import reportWebVitals from './reportWebVitals';

import "./database/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <HashRouter>
        <App />
    </HashRouter>
  </UserProvider>
);
