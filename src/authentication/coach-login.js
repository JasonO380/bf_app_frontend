import React, { useState, useReducer, useContext, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    Flex,
    Text,
    Button,
    Stack,
    Box,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { LoginRegisterContext } from "./login-register-context";
import { FaClipboardList } from "react-icons/fa";
import LoadingSpinner from "../shared/loading-spinner";
import { useNavigate } from "react-router-dom";

let accessGranted;
const CoachLogin = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
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
    // const navigate = useNavigate();
    const [isValid, setIsValid] = useState(true);
    const [login, setLogin] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        coachname: "",
        password: "",
    });
    const loginRegister = useContext(LoginRegisterContext);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const loginCoach = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputState);
        try {
            const response = await fetch(
                "https://bf-backend.onrender.com/api/coach/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        coachname: inputState.coachname,
                        password: inputState.password,
                    }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                console.log(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            accessGranted = responseData.message;
            console.log(accessGranted);
            loginRegister.login(
                responseData.userID,
                responseData.token,
                responseData.coachname
            );
        } catch (err) {
            console.log(err);
            setLogin(false);
            setErrorMessage(err.message);
        }
        if (accessGranted !== "Coach login successful") {
            setIsLoading(false);
            console.log(login);
        } else {
            // navigate("/dashboard");
            setIsLoading(false);
        }
    };

    const logout = () => {
        loginRegister.logout();
        console.log(loginRegister.token);
    };

    const switchToUser = () => {
        props.onClick();
    };

    return (
        <Box bg="#151414" p={5} height="100vh" width="100%" margin="0 auto">
            <Flex justifyContent="end">
                <Button
                    mt={4}
                    mr={4}
                    onClick={() => navigate("/")}
                    bg="red"
                    color="white"
                    borderRadius="50px"
                >
                    Home
                </Button>
            </Flex>
            <Stack
                margin="auto"
                width={isTabletOrAbove ? "50%" : "80%"}
                color="white"
                borderRadius="12"
                spacing={8}
                p={8}
                display="flex"
                alignItems="center"
            >
                <Heading fontSize="60px">
                    <FaClipboardList />
                </Heading>
                {isLoading && <LoadingSpinner />}
                <form onSubmit={loginCoach}>
                    <FormControl>
                        <FormLabel htmlFor="username">Coach name</FormLabel>
                        <Input
                            type="text"
                            color="black"
                            name="coachname"
                            value={inputState.coachname}
                            placeholder="Enter coach name"
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
                    onClick={props.onSwitch}
                    width="100%"
                    bg="red"
                    color="white"
                >
                    Switch to user Login
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
                {errorMessage && <Text>{errorMessage}</Text>}
            </Stack>
        </Box>
    );
};

export default CoachLogin;
