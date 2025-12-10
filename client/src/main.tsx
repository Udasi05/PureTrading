import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";
import { PopupProvider } from "@/context/PopupContext";

createRoot(document.getElementById("root")!).render(
<React.StrictMode>
    <PopupProvider>
    <App />
    </PopupProvider>
</React.StrictMode>
);
