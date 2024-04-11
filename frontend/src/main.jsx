import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthCtxProvider } from "/src/context";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthCtxProvider>
    <App />
  </AuthCtxProvider>
  // </React.StrictMode>
);
