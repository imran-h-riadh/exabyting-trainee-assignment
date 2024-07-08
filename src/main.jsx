import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import LoadingProvider from "./providers/ErrorProvider.jsx";
import ErrorPageProvider from "./providers/ErrorPageProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ErrorPageProvider>
      <LoadingProvider>
        <Router>
          <App />
        </Router>
      </LoadingProvider>
    </ErrorPageProvider>
  </AuthProvider>
);
