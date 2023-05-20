import React, { useContext, useReducer, useState } from "react";
import {
    Box,
    Text,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import ShowTodaysSession from "./show-todays-session";
import { LoginRegisterContext } from "../authentication/login-register-context";

const AddRoundsToMovement = (props) => {
    const user = props.user;
    const movement = props.movement;
    const movementToRemove = props.removeMovement;
    const [sessionID, setSessionID] = useState([]);
    const [currentMovement, setCurrentMovement] = useState("");
    const auth = useContext(LoginRegisterContext);
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
                    month: dateEntry.toLocaleString("en-US", { month: "long" }),
                };
            case "CONVERT_TO_KG":
                const weightKG = Math.round(
                    parseFloat(state.weight) * 0.45359237
                );
                return {
                    ...state,
                    weight: weightKG.toString(),
                };
            case "CONVERT_TO_POUNDS":
                const weightPounds = Math.round(
                    parseFloat(state.weight) * 2.20462
                );
                return {
                    ...state,
                    weight: weightPounds.toString(),
                };
            case "CLEAR_FORM":
                console.log("form cleared");
                return {
                    movement: "",
                    reps: "",
                    rounds: "",
                    weight: "",
                    distance: "",
                    time: "",
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
        athlete: "",
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

    const movementHandler = (event) => {
        const movementToAdd = event.target.name;
        const formattedValue =
            movementToAdd.charAt(0).toUpperCase() +
            movementToAdd.slice(1).toLowerCase();
        setCurrentMovement(formattedValue);
    };

    const removeMovementHandler = (movementToRemove) => {
        props.removeMovement(movementToRemove);
    };

    const convertToKG = () => {
        dispatch({ type: "CONVERT_TO_KG" });
    };

    const convertToPounds = () => {
        dispatch({ type: "CONVERT_TO_POUNDS" });
    };

    const addSession = async (event) => {
        const userID = auth.userID;
        event.preventDefault();
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/${userID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        session: [
                            {
                                exercise: currentMovement,
                                weight: inputState.weight,
                                reps: inputState.reps,
                                rounds: inputState.rounds,
                                distance: inputState.distance,
                                time: inputState.time,
                                year: inputState.year,
                                month: inputState.month,
                                dayOfMonth: inputState.dayOfMonth,
                                dayOfWeek: inputState.dayOfWeek,
                                athlete: userID,
                            },
                        ],
                    }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            dispatch({
                type: "CLEAR_FORM",
            });
            console.log(responseData.sessionID);
            setSessionID(responseData.sessionID);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            {movement.map((m, index) => (
                <React.Fragment key={index}>
                    <Box>
                        <Text fontSize="xs" color="white">
                            {m}
                        </Text>
                    </Box>
                    <form onSubmit={addSession}>
                        <Flex
                            gap="10px"
                            margin="auto"
                            width="100%"
                            paddingBottom="5px"
                        >
                            <FormControl>
                                <Stack>
                                    <FormLabel
                                        fontSize="xs"
                                        color="white"
                                        htmlFor="weight"
                                    >
                                        Weight
                                    </FormLabel>
                                    <Input
                                        onChange={changeHandler}
                                        value={inputState.weight}
                                        name="weight"
                                        type="text"
                                        bg="white"
                                        placeholder="Weight"
                                        fontSize="xs"
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl>
                                <Stack>
                                    <FormLabel
                                        fontSize="xs"
                                        color="white"
                                        htmlFor="reps"
                                    >
                                        Reps
                                    </FormLabel>
                                    <Input
                                        onChange={changeHandler}
                                        value={inputState.reps}
                                        name="reps"
                                        type="text"
                                        bg="white"
                                        placeholder="Reps"
                                        fontSize="xs"
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl>
                                <Stack>
                                    <FormLabel
                                        fontSize="xs"
                                        color="white"
                                        htmlFor="rounds"
                                    >
                                        Rounds
                                    </FormLabel>
                                    <Input
                                        onChange={changeHandler}
                                        value={inputState.rounds}
                                        name="rounds"
                                        type="text"
                                        bg="white"
                                        placeholder="Rounds"
                                        fontSize="xs"
                                    />
                                </Stack>
                            </FormControl>
                        </Flex>
                        <Flex
                            gap="10px"
                            margin="auto"
                            width="100%"
                            paddingBottom="5px"
                        >
                            <Button
                                mt={4}
                                name={m}
                                border="1px solid white"
                                borderRadius="50px"
                                width="fit-content"
                                onClick={convertToKG}
                                type="submit"
                                bg="transparent"
                                color="white"
                                fontSize="xs"
                            >
                                Convert KG
                            </Button>
                            <Button
                                mt={4}
                                name={m}
                                border="1px solid white"
                                borderRadius="50px"
                                width="fit-content"
                                onClick={convertToPounds}
                                type="submit"
                                bg="transparent"
                                color="white"
                                fontSize="xs"
                            >
                                Convert pounds
                            </Button>
                        </Flex>
                        <Flex
                            gap="10px"
                            margin="auto"
                            width="100%"
                            paddingBottom="5px"
                        >
                            <FormControl>
                                <Stack>
                                    <FormLabel
                                        fontSize="xs"
                                        color="white"
                                        htmlFor="distance"
                                    >
                                        Distance
                                    </FormLabel>
                                    <Input
                                        onChange={changeHandler}
                                        value={inputState.distance}
                                        name="distance"
                                        type="text"
                                        bg="white"
                                        placeholder="Distance"
                                        fontSize="xs"
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl>
                                <Stack>
                                    <FormLabel
                                        fontSize="xs"
                                        color="white"
                                        htmlFor="time"
                                    >
                                        Time
                                    </FormLabel>
                                    <Input
                                        onChange={changeHandler}
                                        value={inputState.time}
                                        name="time"
                                        type="text"
                                        bg="white"
                                        placeholder="Time"
                                        fontSize="xs"
                                    />
                                </Stack>
                            </FormControl>
                        </Flex>
                        <Box flexGrow={1}>
                            <Button
                                mt={4}
                                name={m}
                                borderRadius="50px"
                                width="100%"
                                onClick={movementHandler}
                                type="submit"
                                bg="red"
                                color="white"
                                fontSize="xs"
                            >
                                Add round
                            </Button>
                        </Box>
                    </form>
                    <Box paddingBottom="60px" flexGrow={1}>
                        <Button
                            mt={4}
                            name={m}
                            borderRadius="50px"
                            width="100%"
                            onClick={() => removeMovementHandler(m)}
                            bg="red"
                            color="white"
                            fontSize="xs"
                        >
                            Remove movement
                        </Button>
                    </Box>
                </React.Fragment>
            ))}
            {sessionID && (
                <ShowTodaysSession user={auth.userID} newSession={sessionID} />
            )}
        </React.Fragment>
    );
};

export default AddRoundsToMovement;
