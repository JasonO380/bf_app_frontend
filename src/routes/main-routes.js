import React, { useState, useCallback, useEffect } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import AnimatedRoutes from "./animated-routes";

const MainRoutes = () => {
    const [token, setToken] = useState(false);
    const [userID, setUserID] = useState();
    const [userName, setUserName] = useState();

    const login = useCallback((uid, token, userName)=> {
        setToken(token);
        setUserID(uid);
        setUserName(userName);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userID:uid,
                token:token,
                userName:userName
            })
        )
    }, [])

    const logout = useCallback(()=>{
        setToken(null);
        setUserID(null);
        setUserName(null)
        localStorage.removeItem("userData");
    },[])

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.token){
            login(storedData.userID, storedData.token, storedData.userName )
        }
    },[login])

    return (
        <LoginRegisterContext.Provider
        value={{
            isLoggedIn: !!token,
            token: token,
            userID: userID,
            userName:userName,
            login: login,
            logout: logout
        }}>
            <AnimatedRoutes />
        </LoginRegisterContext.Provider>
    )
};

export default MainRoutes;