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

const UpdateAthleteSession = (props) => {
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
        setWorkoutToUpdate(workout);
        console.log(update);
        setUpdate(true);
        getSessionToUpdate();
    }, []);

    const updateWorkout = async () => {};

    if (update) {
        return (
            <Box>
                <Stack margin="auto" width="80%">
                    <form onSubmit={updateWorkout}>
                        <FormControl>
                            <FormLabel htmlFor="movement">Movement</FormLabel>
                            <Input
                                onChange={changeHandler}
                                value={workoutToUpdate.exercise}
                                name="movement"
                                type="text"
                                color="black"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="weight">Weight</FormLabel>
                            <Input
                                onChange={changeHandler}
                                value={workoutToUpdate.weight}
                                placeholder={workout.weight}
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
                                value={workout.reps}
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
                                value={workout.rounds}
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
                                value={workout.distance}
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
                                value={workout.time}
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

export default UpdateAthleteSession;
