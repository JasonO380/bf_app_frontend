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
import AddRoundsToMovementForm from "./add-rounds-to-movement-form";
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
                    [action.movement]: {
                        ...state[action.movement],
                        [action.name]: action.value,
                        year: dateEntry.getFullYear(),
                        dayOfWeek: dateEntry.toLocaleString("default", {
                            weekday: "long",
                        }),
                        dayOfMonth: dateEntry.getDate(),
                        month: dateEntry.toLocaleString("en-US", {
                            month: "long",
                        }),
                    },
                };
            case "CONVERT_TO_KG":
                return {
                    ...state,
                    [action.movement]: {
                        ...state[action.movement],
                        weight: Math.round(
                            parseFloat(state[action.movement].weight) *
                                0.45359237
                        ).toString(),
                    },
                };
            case "CONVERT_TO_POUNDS":
                return {
                    ...state,
                    [action.movement]: {
                        ...state[action.movement],
                        weight: Math.round(
                            parseFloat(state[action.movement].weight) * 2.20462
                        ).toString(),
                    },
                };
            case "CLEAR_FORM":
                const newState = { ...state };
                delete newState[action.movement];
                return newState;
            default:
                return state;
        }
    };
    const [inputState, dispatch] = useReducer(inputReducer, {});

    const changeHandler = (event, movement) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
            movement: movement,
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

    const convertToKG = (movement) => {
        dispatch({
            type: "CONVERT_TO_KG",
            movement: movement,
        });
    };

    const convertToPounds = (movement) => {
        dispatch({
            type: "CONVERT_TO_POUNDS",
            movement: movement,
        });
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
                                ...inputState[currentMovement],
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
                movement: currentMovement,
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
                    <AddRoundsToMovementForm
                        movement={m}
                        movementHandler={movementHandler}
                        inputState={inputState}
                        changeHandler={changeHandler}
                        convertToKG={convertToKG}
                        convertToPounds={convertToPounds}
                        addSession={addSession}
                        removeMovementHandler={removeMovementHandler}
                        m={m}
                    />
                </React.Fragment>
            ))}
            {sessionID && (
                <ShowTodaysSession user={auth.userID} newSession={sessionID} />
            )}
        </React.Fragment>
    );
};

export default AddRoundsToMovement;
