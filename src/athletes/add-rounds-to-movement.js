import React, { useContext, useReducer, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import AddRoundsToMovementForm from "./add-rounds-to-movement-form";
import LastSessionForSelectedMovement from "./last-session-for-selected-movement";
import { LoginRegisterContext } from "../authentication/login-register-context";
import LoadingSpinner from "../shared/loading-spinner";

const AddRoundsToMovement = ({
    movement,
    removeMovement,
    refreshSessions,
    allSessions,
    addRoundsType,
    user,
}) => {
    const [isLoading, setIsLoading] = useState(false);
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
        removeMovement(movementToRemove);
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
        setIsLoading(true);
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
            if (refreshSessions) {
                refreshSessions();
            }
        } catch (err) {}
        setIsLoading(false);
    };

    // if (addRoundsType === "previousMovement") {
    //     return (
    //         <AddRoundsToMovementForm
    //             movement={movement}
    //             movementHandler={movementHandler}
    //             inputState={inputState}
    //             changeHandler={changeHandler}
    //             convertToKG={convertToKG}
    //             convertToPounds={convertToPounds}
    //             addSession={addSession}
    //             removeMovementHandler={removeMovementHandler}
    //         />
    //     );
    // }

    return (
        <>
            {movement.map((m, index) => (
                <React.Fragment key={index}>
                    <Box>
                        <Text fontSize="x-large" color="white">
                            <strong>{m}</strong>
                        </Text>
                    </Box>
                    {isLoading && (
                        <LoadingSpinner text={"Sending your session data"} />
                    )}
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
            {movement.length > 0 && (
                <LastSessionForSelectedMovement
                    allSessions={allSessions}
                    selectedMovement={movement}
                    onRemovement={removeMovementHandler}
                />
            )}
        </>
    );
};

export default AddRoundsToMovement;
