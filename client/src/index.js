import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
