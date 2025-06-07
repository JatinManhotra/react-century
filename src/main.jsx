import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CenturyContextProvider from "./context/CenturyContext.jsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <CenturyContextProvider>
      <App />
    </CenturyContextProvider>
  </HashRouter>,
);
