import axios from "axios";

const login = (username, password) => {
    return axios
        .post("http://localhost:5050/api/user/login", {
            username,
            password,
        })
        .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;