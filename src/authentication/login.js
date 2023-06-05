import React, { useState, useReducer, useContext, useEffect } from "react";
import {
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
import FormComponent from "../shared/form-component";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [coachLogin, setCoachLogin] = useState(false);
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    let accessGranted;
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

    const fields = [
        {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter username",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
    ];

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
                setLogin(false);
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
                width={isTabletOrAbove ? "50%" : "100%"}
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
                <FormComponent
                    onSubmit={loginUser}
                    inputState={inputState}
                    changeHandler={changeHandler}
                    buttonText="Login"
                    isLoading={isLoading}
                    fields={fields}
                    message="Logging in"
                    extraButtons={[
                        {
                            text: "Switch to Coach login",
                            onClick: coachLog,
                        },
                    ]}
                />
                {!login && errorMessage && (
                    <Text color="white">{errorMessage}</Text>
                )}
            </Stack>
        </Box>
    );
};

export default Login;
