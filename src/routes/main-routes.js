import React, { useState, useCallback, useEffect } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import AnimatedRoutes from "./animated-routes";

const MainRoutes = () => {
    const [token, setToken] = useState(false);
    const [userID, setUserID] = useState();

    const login = useCallback((uid, token)=> {
        setToken(token);
        setUserID(uid);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userID:uid,
                token:token
            })
        )
    }, [])

    const logout = useCallback(()=>{
        setToken(null);
        setUserID(null);
        localStorage.removeItem("userData");
    },[])

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.token){
            login(storedData.userID, storedData.token )
        }
    },[login])

    return (
        <LoginRegisterContext.Provider
        value={{
            isLoggedIn: !!token,
            token: token,
            userID: userID,
            login: login,
            logout: logout
        }}>
            <AnimatedRoutes />
        </LoginRegisterContext.Provider>
    )
};

export default MainRoutes;