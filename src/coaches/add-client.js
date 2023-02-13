import React, { useState, useContext, useEffect, useReducer } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Box,
} from "@chakra-ui/react";

const AddClient = () => {
    const auth = useContext(LoginRegisterContext);
    // console.log(auth.userID);
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        console.log("Action:", action);
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    year: dateEntry.getFullYear(),
                    dayOfWeek: dateEntry.toLocaleString("default", {
                        weekday: "long",
                    }),
                    dayOfMonth: dateEntry.getDate(),
                    month: dateEntry.toLocaleString("en-US", { month: "long" }),
                    day: dateEntry.getDate(),
                };
            case "CLEAR_FORM":
                console.log("form cleared");
                return {
                    clientName: "",
                };
            default:
                return state;
        }
    };
    const [inputState, dispatch] = useReducer(inputReducer, {
        clientName: "",
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

    const addClient = async (event) => {
        event.preventDefault()
        const coachID = auth.id;
        try {
            const response = await fetch(
                `http://localhost:5000/api/client/${coachID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        clientName: inputState.clientName,
                    }),
                }
            );
            const responseData = await response.json();
            // console.log(responseData);
            dispatch({
                type: "CLEAR_FORM",
            });
        } catch (err) {}
    };

    return (
        <Stack>
            <form onSubmit={addClient}>
                <FormControl>
                    <FormLabel htmlFor="addClient">Add client</FormLabel>
                    <Input
                        name="client"
                        onChange={changeHandler}
                        value={inputState.client}
                        type="text"
                        color="black"
                        placeholder="Client name"
                    />
                </FormControl>
                <Button
                    mt={4}
                    width="100%"
                    type="submit"
                    bg="red"
                    color="white"
                >
                    Add client
                </Button>
            </form>
        </Stack>
    );
};

export default AddClient;
