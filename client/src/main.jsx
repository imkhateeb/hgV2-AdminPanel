import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { NotificationProvider } from "./components/utility/Notification.jsx";

store.dispatch({ type: "VALIDATE_TOKEN" });



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
    </Provider>
  </React.StrictMode>
);
