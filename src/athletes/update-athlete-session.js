import React, { useContext, useReducer, useState, useEffect, useRef } from "react";
import {
    Box,
    Image,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
    background,
} from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";

const UpdateAthleteSession = (props) => {
    let workout = [];
    const refPoint = useRef(null);
    const updateMode = props.updateMode
    const updateSession = props.updateChange;
    const auth = useContext(LoginRegisterContext);
    const [updateID, setUpdateID] = useState();
    const [update, setUpdate] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState();
    const [showModal, setShowModal] = useState(true);

    const inputReducer = (state, action) => {
        console.log("Action:", action);
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
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

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDiv);
    }, [updateSession]);

    const handleClickOutsideDiv = (event) => {
        const updateDiv = refPoint.current;
        if (updateDiv && updateDiv.contains(event.target)) {
            setShowModal(true);
        } else {
            props.updateChangeHandler("23");
            console.log("here")
            setShowModal(false);
            document.removeEventListener("click", handleClickOutsideDiv);
        }
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const updateWorkout = async (event) => {
        console.log(updateSession)
        event.preventDefault();
        try {
            console.log(inputState);
            const response = await fetch(
                `https://bf-backend.onrender.com/api/session/${updateID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        exercise: inputState.movement,
                        weight: inputState.weight,
                        reps: inputState.reps,
                        rounds: inputState.rounds,
                        distance: inputState.distance,
                        time: inputState.time,
                    }),
                }
            );
            console.log(response);
            const responseData = await response.json();
            console.log(responseData)
            props.getUpdate();
            console.log(props.updateMode)
        } catch (err) {}
    };

    useEffect(() => {
        console.log(updateSession);
        setUpdateID(updateSession);
        console.log(updateID);
        const getSessionToUpdate = async () => {
            try {
                const response = await fetch(
                    `https://bf-backend.onrender.com/api/session/${updateSession}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Issuer " + auth.token,
                        },
                    }
                );
                const responseData = await response.json();
                setWorkoutToUpdate(responseData.session);
                workout = responseData.session;
                setWorkoutToUpdate(workout);
                console.log(workout);
            } catch (err) {}
        };
        getSessionToUpdate();
        console.log(update);
        console.log(workoutToUpdate);
    }, []);
    

    if (workoutToUpdate) {
        return (
            <Box>
                <Stack margin="auto" width="80%">
                    <form style={{background:"black"}} ref={refPoint} onSubmit={updateWorkout}>
                        <FormControl>
                            <FormLabel color="white" htmlFor="movement">Movement</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.exercise}
                                value={inputState.movement}
                                name="movement"
                                type="text"
                                color="white"
                            />
                        </FormControl>
                        {workoutToUpdate.weight && <FormControl>
                            <FormLabel color="white" htmlFor="weight">Weight</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.weight}
                                value={inputState.weight}
                                name="weight"
                                type="text"
                                color="white"
                            />
                        </FormControl>}
                        {workoutToUpdate.reps && <FormControl>
                            <FormLabel color="white" htmlFor="reps">Reps</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.reps}
                                value={inputState.reps}
                                name="reps"
                                type="text"
                                color="white"
                            />
                        </FormControl>}
                        {workoutToUpdate.rounds && <FormControl>
                            <FormLabel color="white" htmlFor="rounds">Rounds</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.rounds}
                                value={inputState.rounds}
                                name="rounds"
                                type="text"
                                color="white"
                            />
                        </FormControl>}
                        {workoutToUpdate.distance && <FormControl>
                            <FormLabel color="white" htmlFor="distance">Distance</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.distance}
                                value={inputState.distance}
                                name="distance"
                                type="text"
                                color="white"
                            />
                        </FormControl>}
                        {workoutToUpdate.time && <FormControl>
                            <FormLabel color="white" htmlFor="time">Time</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.time}
                                value={inputState.time}
                                name="time"
                                type="text"
                                color="white"
                            />
                        </FormControl>}
                        <Button
                            mt={4}
                            width="100%"
                            type="submit"
                            bg="red"
                            color="white"
                        >
                            Update
                        </Button>
                    </form>
                </Stack>
            </Box>
        );
    }
};

export default UpdateAthleteSession;
