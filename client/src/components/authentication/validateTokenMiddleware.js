// import { loginSuccess } from "../../redux/slices/authSlice";
// import axios from "axios";
// const url =import.meta.env.VITE_APP_BACKEND_URI

// // export const validateTokenMiddleware = (store) => (next) => (action) => {
// //   if (action.type === "VALIDATE_TOKEN") {
// //     const user = JSON.parse(localStorage.getItem("token"));
// //     console.log(user)
// //     if (user) {
// //       // const headers = {
// //       //   Authorization: `Bearer ${token}`,
// //       //   send: 'userdata',
// //       // }

// //       // const response =  axios.get(`${url}/api/users/isauthenticated`, {headers})
// //       action.payload = user;
// //       store.dispatch(loginSuccess(action.payload));
   
// //     }

// //     next(action);
// //   }

// // };

// export const validateTokenMiddleware = (store) => (next) => (action) => {
//   if (action.type === "VALIDATE_TOKEN") {
//     const token = JSON.parse(localStorage.getItem("token"));
//     console.log("User from localStorage:", token);

//     if (token) {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         send: 'userdata',
//       }

     

//       const response =  axios.get(`${url}/api/users/isauthenticated`, {headers})
//       console.log(response);

//      const user = {
//         name : "Alok"
//       }
//       action.payload = user
//       console.log("Dispatching loginSuccess with payload:", action.payload);
//       store.dispatch(loginSuccess(action.payload));
//     }

   
//   } else {
//     // Log other action types for debugging
//     console.log("Skipping middleware for action type:", action.type);
//     next(action);
//   }
// };
