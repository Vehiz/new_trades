import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./components/useAuth.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <App />
    </AuthProvider>
  
);