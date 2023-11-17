import { loginSuccess, logout } from "../../redux/slices/authSlice";

export const validateTokenMiddleware = (store) => (next) => (action) => {
  if (action.type === "VALIDATE_TOKEN") {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) {
      action.payload = user;
      store.dispatch(loginSuccess(action.payload));
    }
  }
  next(action);
};
