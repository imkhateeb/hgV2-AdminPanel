import { loginSuccess } from "../../redux/slices/authSlice";
import axios from "axios";
const url =import.meta.env.VITE_APP_BACKEND_URI

export const validateTokenMiddleware = (store) => (next) =>  async (action) => {
  if (action.type === "VALIDATE_TOKEN") {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        send: 'userdata',
      }

      const response = await axios.get(`${url}/api/users/isauthenticated`, {headers})

      store.dispatch(loginSuccess(token));
      next(action);
    }
  }

};
