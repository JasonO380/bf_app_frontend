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

let client;
const AddClientSession = (props) => {
    const auth = useContext(LoginRegisterContext);
    client = props.clientID;
    console.log(client);
    const [newSession, setNewSession] = useState()
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
                    dayOfMonth:dateEntry.getDate(),
                    month: dateEntry.toLocaleString("en-US", { month: "long" })
                };
            case "CLEAR_FORM":
                console.log("form cleared")
                return {
                    movement: "",
                    reps: "",
                    rounds: "",
                    weight: "",
                    distance:"",
                    time:""
                };
            default:
                return state;
        }
    };
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement: "",
        weight: "",
        reps: "",
        rounds: "",
        distance: "",
        time: "",
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

    const addSession = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/api/client/session/${client}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        session:[{
                            exercise: inputState.movement,
                            weight: inputState.weight,
                            reps: inputState.reps,
                            rounds: inputState.rounds,
                            distance: inputState.distance,
                            time: inputState.time,
                            year:inputState.year,
                            month: inputState.month,
                            dayOfMonth: inputState.dayOfMonth,
                            dayOfWeek:inputState.dayOfWeek,
                            athlete: client
                        }],
                    }),
                }
            );
            const responseData = await response.json();
            dispatch({
                type: "CLEAR_FORM",
            });
            console.log(responseData.userSession);
            setNewSession(responseData.userSession);
            props.getClientSessions();
        } catch (err) {}
    };

    return (
        <React.Fragment>
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
            <Stack margin="auto" width="80%">
                <form onSubmit={addSession}>
                    <FormControl>
                        <FormLabel htmlFor="movement">Movement</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.movement}
                            name="movement"
                            type="text"
                            color="black"
                            placeholder="Movement"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="weight">Weight</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.weight}
                            name="weight"
                            type="text"
                            color="black"
                            placeholder="Weight"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="reps">Reps</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.reps}
                            name="reps"
                            type="text"
                            color="black"
                            placeholder="Reps"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="rounds">Rounds</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.rounds}
                            name="rounds"
                            type="text"
                            color="black"
                            placeholder="Rounds"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="distance">Distance</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.distance}
                            name="distance"
                            type="text"
                            color="black"
                            placeholder="Distance"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="time">Time</FormLabel>
                        <Input
                            onChange={changeHandler}
                            value={inputState.time}
                            name="time"
                            type="text"
                            color="black"
                            placeholder="Time"
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        width="100%"
                        type="submit"
                        bg="red"
                        color="white"
                    >
                        Add session
                    </Button>
                </form>
            </Stack>
        </Box>
        </React.Fragment>
    );
};

export default AddClientSession;