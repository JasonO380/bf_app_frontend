import React, { useContext, useReducer, useState } from "react";
import {
    Box,
    Image,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";

const AddMacros = () => {
    const auth = useContext(LoginRegisterContext);
    console.log(auth);
    const [newMacros, setNewMacros] = useState()
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    year: dateEntry.getFullYear(),
                    dayOfWeek: dateEntry.toLocaleString("default", {
                        weekday: "long",
                    }),
                    dayOfMonth:dateEntry.getDate(),
                    month: dateEntry.toLocaleString("en-US", { month: "long" })
                };
            case "CLEAR_FORM":
                console.log("form cleared")
                return {
                    carbs: "",
                    protein: "",
                    fats: ""
                };
            default:
                return state;
        }
    };
    const [inputState, dispatch] = useReducer(inputReducer, {
        protein: "",
        carbs: "",
        fats: "",
        athlete: ""
    });

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const postMacros = async (event) => {
        const userID = auth.userID;
        event.preventDefault();
        try {
            const response = await fetch (
                `http://localhost:5000/api/macros/${userID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        carbs: inputState.carbs,
                        protein: inputState.protein,
                        fats: inputState.fats,
                        year: inputState.year,
                        month: inputState.month,
                        dayOfMonth: inputState.dayOfMonth,
                        dayOfWeek: inputState.dayOfWeek,
                        athlete: userID,
                    })
                }
            );
            const responseData = await response.json();
            dispatch({
                type: "CLEAR_FORM",
            });
            console.log(responseData.macros);
            setNewMacros(responseData.macros)
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
            <Stack margin="auto" width="80%" paddingBottom="60px">
                <form onSubmit={postMacros}>
                    <FormControl>
                        <FormLabel color="white" htmlFor="carbs">Carbs</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.carbs}
                            name="carbs"
                            type="text"
                            bg="white"
                            placeholder="Carbs"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="white" htmlFor="protein">Protein</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.protein}
                            name="protein"
                            type="text"
                            bg="white"
                            placeholder="Protein"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="white" htmlFor="fats">Fats</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.fats}
                            name="fats"
                            type="text"
                            bg="white"
                            placeholder="Carbs"
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        width="100%"
                        type="submit"
                        bg="red"
                        color="white"
                    >
                        Add macros
                    </Button>
                </form>
            </Stack>
        </Box>
    )
};

export default AddMacros;