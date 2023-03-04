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

const AddClient = (props) => {
    const auth = useContext(LoginRegisterContext);
    const coachID = auth.userID;
    const [id, setID] = useState(coachID);

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
                    dayOfMonth: dateEntry.getDate(),
                    month: dateEntry.toLocaleString("en-US", { month: "long" })
                };
            case "CLEAR_FORM":
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
        console.log(id);
        event.preventDefault()
        try {
            const response = await fetch(
                `http://localhost:5000/api/client/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        clientName: inputState.clientName,
                        year:inputState.year,
                        month:inputState.month,
                        dayOfMonth:inputState.dayOfMonth,
                        dayOfWeek:inputState.dayOfWeek,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData.client);
            dispatch({
                type: "CLEAR_FORM",
            });
            props.updateClients();
        } catch (err) {}
    };

    useEffect(()=> {
        setID(coachID);
        console.log(id);
    }, [coachID])

    return (
        <Stack>
            <form onSubmit={addClient}>
                <FormControl>
                    <FormLabel htmlFor="addClient">Add client</FormLabel>
                    <Input
                        name="clientName"
                        onChange={changeHandler}
                        value={inputState.clientName}
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
