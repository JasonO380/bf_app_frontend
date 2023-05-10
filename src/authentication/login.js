import React, { useState, useReducer, useContext, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Stack,
    Box,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { LoginRegisterContext } from "./login-register-context";
import CoachLogin from "./coach-login";
import LoadingSpinner from "../shared/loading-spinner";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

let accessGranted;
const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [coachLogin, setCoachLogin] = useState(false)
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    const inputReducer = (state, action) => {
        console.log("Action:", action);
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
            default:
                return state;
        }
    };
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(true);
    const [login, setLogin] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        username: "",
        password: "",
    });
    const loginRegister = useContext(LoginRegisterContext);

    useEffect(() => {
        console.log("input state: ", inputState);
    }, [inputState]);

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const loginUser = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputState);
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: inputState.username,
                        password: inputState.password,
                    }),
                }
            );
            const responseData = await response.json();
            accessGranted = responseData.message;
            console.log(responseData);
            console.log(responseData.message);
            console.log("here");
            console.log(accessGranted);
            loginRegister.login(responseData.userID, responseData.token, responseData.userName);
        } catch (err) {
            console.log(err);
            setLogin(false);
            setErrorMessage(err.message);
        }
        if (accessGranted !== "Success") {
            setLogin(false);
            setIsLoading(false);
            console.log(login);
        } else {
            navigate("/athlete");
            setIsLoading(false);
        }
    };

    const coachLog = () => {
        setCoachLogin(!coachLogin);
    }

    const logout = () => {
        loginRegister.logout()
        console.log(loginRegister.token)
    }

    if(coachLogin){
        return(
            <CoachLogin onSwitch={coachLog} />
        )
    }

    return (
        <Box bg="#151414" p={5} height="100vh" width="100%" margin="0 auto">
            <Stack
                margin="auto"
                width={isTabletOrAbove ? "50%" : "80%"}
                color="white"
                borderRadius="12"
                height="100%"
                justifyContent="center"
                spacing={8}
                p={8}
                // backgroundColor="purple.900"
            >
            <Heading display="flex" alignItems="center" justifyContent="center" fontSize="60px">
                <FaUser />
            </Heading>
            <LoadingSpinner />
                <form onSubmit={loginUser}>
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            type="text"
                            color="black"
                            name="username"
                            value={inputState.userName}
                            placeholder="Enter username"
                            bg="white"
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            color="black"
                            type="password"
                            name="password"
                            value={inputState.password}
                            placeholder="Enter password"
                            bg="white"
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        // bg="red"
                        width="100%"
                        type="submit"
                        bg="red"
                        color="white"
                    >
                        Login
                    </Button>
                </form>
                <Button
                    mt={4}
                    onClick={coachLog}
                    width="100%"
                    bg="red"
                    color="white"
                >
                    Switch to Coach login
                </Button>
                <Button
                    mt={4}
                    onClick={logout}
                    width="100%"
                    bg="red"
                    color="white"
                >
                    Logout
                </Button>
            </Stack>
        </Box>
    );
};

export default Login;
