import React, { useState, useReducer, useContext, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    Text,
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
    const [coachLogin, setCoachLogin] = useState(false);
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
                "https://bf-backend.onrender.com/api/users/login",
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
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            accessGranted = responseData.message;
            console.log(responseData);
            console.log(responseData.message);
            console.log("here");
            console.log(accessGranted);
            loginRegister.login(
                responseData.userID,
                responseData.token,
                responseData.userName
            );
        } catch (err) {
            console.log(err);
            setLogin(false);
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
    };

    const logout = () => {
        loginRegister.logout();
        console.log(loginRegister.token);
    };

    if (coachLogin) {
        return <CoachLogin onSwitch={coachLog} />;
    }

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
                    fontSize="xs"
                >
                    Home
                </Button>
            </Flex>
            <Stack
                margin="auto"
                width={isTabletOrAbove ? "50%" : "80%"}
                color="white"
                borderRadius="12"
                justifyContent="center"
                spacing={8}
                p={8}
                display="flex"
                alignItems="center"
            >
                <Heading fontSize="60px">
                    <FaUser />
                </Heading>
                {isLoading && <LoadingSpinner text="Loggin in" />}
                <form onSubmit={loginUser}>
                    <FormControl>
                        <FormLabel fontSize="xs" htmlFor="username">Username</FormLabel>
                        <Input
                            type="text"
                            color="black"
                            name="username"
                            value={inputState.userName}
                            fontSize="xs"
                            placeholder="Enter username"
                            bg="white"
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize="xs" htmlFor="password">Password</FormLabel>
                        <Input
                            color="black"
                            type="password"
                            name="password"
                            value={inputState.password}
                            fontSize="xs"
                            placeholder="Enter password"
                            bg="white"
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        width="100%"
                        type="submit"
                        bg="red"
                        color="white"
                        fontSize="xs"
                    >
                        Login
                    </Button>
                    <Button
                        mt={4}
                        onClick={coachLog}
                        width="100%"
                        bg="red"
                        color="white"
                        fontSize="xs"
                    >
                        Switch to Coach login
                    </Button>
                </form>
                {!login && errorMessage && (
                    <Text color="white">{errorMessage}</Text>
                )}
            </Stack>
        </Box>
    );
};

export default Login;
