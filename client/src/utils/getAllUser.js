import axios from "axios";

const fetchAllUsers = async () => {
        try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/users/all`)
                return response.data;
        } catch (error) {
                console.log("Error getting all users", error);
                return null;
        }
};

export default fetchAllUsers