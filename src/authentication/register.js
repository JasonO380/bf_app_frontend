import React, { useState, useContext, useReducer, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Box,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { LoginRegisterContext } from "./login-register-context";


let accessGranted;
const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isTabletOrAbove] = useMediaQuery('(min-width: 600px)');
    const inputReducer = (state, action) => {
        console.log("Action:", action)
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
        email:"",
        userName: "",
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

    const registerUser = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputState);
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: inputState.username,
                        email:inputState.email,
                        password: inputState.password,
                    }),
                }
            );
            const responseData = await response.json();
            accessGranted = responseData.message;
            console.log(responseData)
            console.log(responseData.message);
            console.log('here')
            console.log(accessGranted)
            // loginRegister.login(responseData.userID, responseData.token);
        } catch (err) {
            console.log(err);
            setLogin(false)
            setErrorMessage(err.message)
        }
        if (accessGranted !== "Success") {
            setLogin(false);
            setIsLoading(false)
            console.log(login)
        } else {
            // navigate("/dashboard");
            setIsLoading(false)
        }
    };
    return (
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
            <Stack
            margin='auto' 
            width={isTabletOrAbove ? "50%" : "80%"}
            color='white'
            borderRadius='12' 
            spacing={8} p={8} 
            backgroundColor="purple.900">
                <form onSubmit={registerUser}>
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        color='black'
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        bg="white"
                        onChange={changeHandler}
                        value={inputState.username}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        color='black'
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        bg="white"
                        onChange={changeHandler}
                        value={inputState.email}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        color='black'
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        bg="white"
                        onChange={changeHandler}
                        value={inputState.password}
                    />
                </FormControl>
                <Button
                    mt={4}
                    backgroundColor="red"
                    width="100%"
                    type="submit"
                    bg="red"
                    color="white"
                >
                    Register
                </Button>
                </form>
                {!login && <p>{accessGranted}</p>} 
            </Stack>
        </Box>
    );
};

export default Register;