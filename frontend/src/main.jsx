import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (window.location.pathname === "/style-preview") {
  import("./pages/StylePreview").then(({ default: StylePreview }) => {
    root.render(
      <React.StrictMode>
        <StylePreview />
      </React.StrictMode>
    );
  });
} else {
  import("./App").then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  });
}