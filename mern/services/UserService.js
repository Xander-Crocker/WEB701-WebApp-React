import axios from "axios";
import authHeader from "./auth-header";

// change the API_URL to the backend server
const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserRecords = () => {
    return axios.get(API_URL + "records", { headers: authHeader() });
};

const UserService = {
    // change 
    getPublicContent,
    getUserRecords,
};

export default UserService;