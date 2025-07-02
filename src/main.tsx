import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found in the document.");
}
