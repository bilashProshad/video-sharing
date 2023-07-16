import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.scss";
import { SidebarProvider } from "./contexts/SidebarContext";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SidebarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SidebarProvider>
  </React.StrictMode>
);
