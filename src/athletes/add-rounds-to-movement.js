import React, { useContext, useReducer, useState, useEffect } from "react";
import {
    Box,
    Text,
    Heading,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import ShowTodaysSession from "./do-not-need-show-todays-session";
// import useGetTodaysSessions from "../http-requests/getTodaysSessions";
// import useGetSessions from "../http-requests/getSessions";
import AddRoundsToMovementForm from "./add-rounds-to-movement-form";
import { LoginRegisterContext } from "../authentication/login-register-context";
import LoadingSpinner from "../shared/loading-spinner";

const AddRoundsToMovement = ({movement, removeMovement, refreshSessions, user}) => {
    // const user = props.user;
    // const movement = props.movement;
    // const movementToRemove = props.removeMovement;
    const [todaysLoadedSessions, setTodaysLoadedSessions] = useState([]);
    const [sessionID, setSessionID] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewSession, setIsNewSession] = useState(false);
    const [currentMovement, setCurrentMovement] = useState("");
    const auth = useContext(LoginRegisterContext);
    // const { workouts } = useGetSessions(auth.userID);
    // console.log("Add rounds to movement getSessions ", workouts);
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
    // const date = new Date();
    // const month = date.toLocaleString("default", { month: "long" });
    // const dayOfMonth = date.getDate();
    // let todaysSessions = [];
    // workouts.forEach((data) => {
    //     data.months.forEach((monthObj) => {
    //         if (monthObj.month === month) {
    //             monthObj.days.forEach((dayObj) => {
    //                 if (dayObj.day === dayOfMonth) {
    //                     todaysSessions.push(...dayObj.sessions);
    //                 }
    //             });
    //         }
    //     });
    // });
    // console.log(todaysSessions);
    // setTodaysLoadedSessions((prevWorkouts) => todaysSessions);
    // console.log(todaysLoadedSessions);

    // useEffect(() => {
    //     const todaysSessions = workouts.filter((session) => {
    //         const date = new Date();
    //         const month = date.toLocaleString("default", { month: "long" });
    //         const day = date.getDate();
    //         let matches = false;
    //         session.months.forEach((monthObj) => {
    //             if (monthObj.month === month) {
    //                 monthObj.days.forEach((dayObj) => {
    //                     if (dayObj.day === day) {
    //                         matches = true;
    //                     }
    //                 });
    //             }
    //         });

    //         return matches;
    //     });
    //     console.log(todaysSessions);
    //     setTodaysLoadedSessions((prevWorkouts) => todaysSessions);
    //     console.log(todaysLoadedSessions);
    // }, [workouts]);

    // useEffect(()=> {
    //     setTodaysLoadedSessions(prevSession => workouts)
    //     console.log(todaysLoadedSessions)
    // },[workouts])

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
        // props.removeMovement(movementToRemove);
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
        setIsLoading(true)
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
            // console.log(responseData.sessionID);
            // setSessionID(responseData.sessionID);
            setIsNewSession(true);
            if(refreshSessions){
                refreshSessions()
            }
        } catch (err) {}
        setIsLoading(false)
    };

    return (
        <React.Fragment>
            {movement.map((m, index) => (
                <React.Fragment key={index}>
                    <Box>
                        <Text fontSize="x-large" color="white">
                            <strong>{m}</strong>
                        </Text>
                    </Box>
                    {isLoading && <LoadingSpinner text={"Sending your session data"} />}
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
        </React.Fragment>
    );
};

export default AddRoundsToMovement;
