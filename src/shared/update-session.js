import React, { useContext, useReducer, useState, useEffect } from "react";
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

const UpdateSession = (props) => {
    let workout = [];
    const updateSession = props.update;
    const auth = useContext(LoginRegisterContext);
    console.log(updateSession);
    const [update, setUpdate] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState();

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
                `http://localhost:5000/api/session/${updateSession}`,
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
            props.updateMode(false);
            props.getUpdate();
        } catch (err) {}
    };

    useEffect(() => {
        const getSessionToUpdate = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/session/${updateSession}`,
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
                console.log(responseData.session);
                console.log(workout);
            } catch (err) {}
        };
        getSessionToUpdate();
        setWorkoutToUpdate(workout);
        console.log(update);
        setUpdate(true);
    }, []);

    if (update) {
        return (
            <Box>
                <Stack margin="auto" width="80%">
                    <form onSubmit={updateWorkout}>
                        <FormControl>
                            <FormLabel htmlFor="movement">Movement</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.exercise}
                                value={inputState.movement}
                                name="movement"
                                type="text"
                                color="black"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="weight">Weight</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.weight}
                                value={inputState.weight}
                                name="weight"
                                type="text"
                                color="black"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="reps">Reps</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.reps}
                                value={inputState.reps}
                                name="reps"
                                type="text"
                                color="black"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="rounds">Rounds</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.rounds}
                                value={inputState.rounds}
                                name="rounds"
                                type="text"
                                color="black"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="distance">Distance</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.distance}
                                value={inputState.distance}
                                name="distance"
                                type="text"
                                color="black"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="time">Time</FormLabel>
                            <Input
                                onChange={changeHandler}
                                placeholder={workoutToUpdate.time}
                                value={inputState.time}
                                name="time"
                                type="text"
                                color="black"
                            />
                        </FormControl>
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

export default UpdateSession;