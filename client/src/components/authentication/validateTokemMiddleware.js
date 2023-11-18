import { loginSuccess, logout } from "../../redux/slices/authSlice";

export const validateTokenMiddleware = (store) => (next) => (action) => {
  if (action.type === "VALIDATE_TOKEN") {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) {
      // Here we will first make api request to validate the token and then get the user data from the server and then dispatch the loginSuccess action with the user data
      action.payload = user;
      store.dispatch(loginSuccess(action.payload));
    }
  }
  next(action);
};
