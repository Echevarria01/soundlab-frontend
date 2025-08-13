import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { worker } from "./mocks/browser";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

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



