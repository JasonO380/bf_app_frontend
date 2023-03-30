import { createContext } from "react";

export const LoginRegisterContext = createContext({
    isLoggedIn: false,
    token: null,
    userID: null,
    username:null,
    login: () => {},
    logout: () => {},
});