import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { worker } from "./mocks/browser";

const container = document.getElementById("root");
const root = createRoot(container);

if (process.env.NODE_ENV === "development") {
  worker.start().then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}



