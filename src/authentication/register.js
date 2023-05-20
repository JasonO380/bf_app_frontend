import React, { useState, useContext, useReducer, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    Flex,
    Text,
    Button,
    Stack,
    Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import LoadingSpinner from "../shared/loading-spinner";
import { FaUserPlus } from "react-icons/fa";
import { LoginRegisterContext } from "./login-register-context";

const Register = () => {
    let accessGranted;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [passwordErrorMessage, setPasswordErrorMessage] = useState();
    const [usernameErrorMessage, setUsernameErrorMessage] = useState();
    const [emailTouched, setEmailTouched] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState();
    const [nameAvailable, setNameAvailable] = useState();
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
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
    const [isValid, setIsValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isSearchingUsername, setIsSearchingUsername] = useState(false);
    const [login, setLogin] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        email: "",
        username: "",
        password: "",
    });
    const auth = useContext(LoginRegisterContext);

    useEffect(() => {
        console.log("input state: ", inputState);
    }, [inputState]);

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        if (inputName === "password" && inputValue.length >= 6) {
            setPasswordTouched(true); // set touched to true after the user types 6 characters
        }
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
        if (inputName === "username") {
            searchForUsername(inputValue);
        }
        validateInput(inputValue, inputName);
    };

    const validateInput = (value, name) => {
        if (name === "password") {
            if (value.length < 6) {
                setIsPasswordValid(false);
                setPasswordErrorMessage(
                    "Password must be at least 6 characters long"
                );
                console.log("Password too short");
                if (value.length === 6) {
                    setPasswordTouched(true);
                }
                setIsPasswordValid(false);
                console.log("Password too short");
            } else {
                console.log("password valid");
                setIsPasswordValid(true);
                setPasswordErrorMessage("");
            }
        }
        if (name === "username") {
            if (value.length < 1) {
                setUsernameErrorMessage(
                    "Username must be at least 1 character"
                );
                setUsernameTouched(true);
                setIsUsernameValid(false);
                console.log("Username too short");
            } else {
                console.log("username valid");
                setIsUsernameValid(true);
                setUsernameErrorMessage("");
            }
        }
        if (name === "email") {
            if (value.length >= 1) {
                setEmailTouched(true);
                if (!value.includes("@")) {
                    setIsEmailValid(false);
                    setEmailErrorMessage("Email must contain @");
                } else {
                    setIsEmailValid(true);
                    setEmailErrorMessage("");
                }
            }
            if (value.length < 1) {
                setEmailTouched(false);
                setEmailErrorMessage("");
                setErrorMessage("");
            }
        }
    };

    const searchForUsername = async (query) => {
        setIsSearchingUsername(true);
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/find/${query}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData.message);
            setNameAvailable(responseData.message);
        } catch (err) {
            console.log(err);
        }
        setIsSearchingUsername(false);
    };

    const registerUser = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;
        validateInput(inputValue, inputName);
        console.log(inputState);
        try {
            const response = await fetch(
                "https://bf-backend.onrender.com/api/users/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: inputState.username,
                        email: inputState.email,
                        password: inputState.password,
                    }),
                }
            );
            if (!response.ok) {
                const errorResponse = await response.json();
                console.log(errorResponse.message);
                setErrorMessage(errorResponse.message);
                setLogin(false);
                throw new Error(errorResponse.message);
            }
            const responseData = await response.json();
            accessGranted = responseData.message;
            auth.login(
                responseData.userID,
                responseData.token,
                responseData.username
            );
            console.log(auth.login);
        } catch (err) {
            console.log(err);
        }
        if (accessGranted === "Email already in use") {
            setEmailErrorMessage("Email already in use");
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
                spacing={8}
                p={8}
                display="flex"
                alignItems="center"
            >
                <Heading fontSize="60px">
                    <FaUserPlus />
                </Heading>
                {isLoading && <LoadingSpinner text="Registering" />}
                <form onSubmit={registerUser}>
                    <FormControl>
                        <FormLabel fontSize="xs" htmlFor="username">Username</FormLabel>
                        <Input
                            color="black"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            bg="white"
                            onChange={changeHandler}
                            value={inputState.username}
                            fontSize="xs"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize="xs" htmlFor="email">Email</FormLabel>
                        <Input
                            color="black"
                            type="email"
                            name="email"
                            placeholder="Email (not required)"
                            bg="white"
                            onChange={changeHandler}
                            value={inputState.email}
                            fontSize="xs"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize="xs" htmlFor="password">Password</FormLabel>
                        <Input
                            color="black"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            bg="white"
                            onChange={changeHandler}
                            value={inputState.password}
                            fontSize="xs"
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        backgroundColor="red"
                        width="100%"
                        borderRadius="50px"
                        type="submit"
                        bg="red"
                        color="white"
                        fontSize="xs"
                        isDisabled={
                            (!isPasswordValid && passwordTouched) ||
                            (!isUsernameValid && usernameTouched)
                        }
                    >
                        Register
                    </Button>
                </form>
                {isSearchingUsername && <LoadingSpinner text="Checking name" />}
                {isUsernameValid && <Text>{nameAvailable}</Text>}
                {usernameTouched && !isUsernameValid && (
                    <Text fontSize="xs">{usernameErrorMessage}</Text>
                )}
                {passwordTouched && !isPasswordValid && (
                    <Text fontSize="xs">{passwordErrorMessage}</Text>
                )}
                {emailTouched && !isEmailValid && (
                    <Text fontSize="xs">{emailErrorMessage}</Text>
                )}
                {errorMessage && <Text fontSize="xs">{errorMessage}</Text>}
            </Stack>
        </Box>
    );
};

export default Register;
