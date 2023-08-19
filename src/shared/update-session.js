import React, {
    useContext,
    useReducer,
    useState,
    useEffect,
    useRef,
} from "react";
import {
    Box,
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
    const addRoundID = props.addRoundID;
    const refPoint = useRef(null);
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

    const handleClickOutsideDiv = (event) => {
        const updateDiv = refPoint.current;
        const isInputOrButton =
            event.target.tagName === "INPUT" ||
            event.target.tagName === "BUTTON";
        if (updateDiv && !updateDiv.contains(event.target)) {
            console.log("clicked outside");
            props.updateChangeHandler(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDiv);
    }, [updateSession]);

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
        event.preventDefault();
        try {
            console.log(inputState);
            let requestBody = {
                exercise: workoutToUpdate.exercise,
                rounds: workoutToUpdate.rounds,
                reps: workoutToUpdate.reps,
                weight: workoutToUpdate.weight,
                distance: workoutToUpdate.distance,
                time: workoutToUpdate.time,
            };
            if (inputState.exercise) requestBody.exercise = inputState.exercise;
            if (inputState.weight) requestBody.weight = inputState.weight;
            if (inputState.reps) requestBody.reps = inputState.reps;
            if (inputState.rounds) requestBody.rounds = inputState.rounds;
            if (inputState.distance) requestBody.distance = inputState.distance;
            if (inputState.time) requestBody.time = inputState.time;

            const response = await fetch(
                `https://bf-backend.onrender.com/api/session/${updateSession}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            const responseData = await response.json();
        } catch (err) {}
        if(props.sessionType === "all"){
            props.updateMode();
            props.onUpdate();
        } else {
            props.updateMode();
            props.refreshSessions();
        }
    };

    useEffect(() => {
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
            } catch (err) {}
        };
        getSessionToUpdate();
        setWorkoutToUpdate(workout);
        setUpdate(true);
    }, []);

    if (update) {
        return (
            <Box>
                <Stack margin="auto" width="80%">
                    <form onSubmit={updateWorkout} ref={refPoint}>
                        <FormControl fontSize="xs">
                            <FormLabel
                                fontSize="xs"
                                color="white"
                                htmlFor="exercise"
                            >
                                Movement
                            </FormLabel>
                            <Input
                                    onChange={changeHandler}
                                    placeholder={workoutToUpdate.exercise}
                                    value={inputState.exercise}
                                    name="exercise"
                                    type="text"
                                    color="white"
                                    fontSize="xs"
                                />
                        </FormControl>
                        {workoutToUpdate.weight && (
                            <FormControl>
                                <FormLabel
                                    fontSize="xs"
                                    color="white"
                                    htmlFor="weight"
                                >
                                    Weight
                                </FormLabel>
                                <Input
                                    onChange={changeHandler}
                                    placeholder={workoutToUpdate.weight}
                                    value={inputState.weight}
                                    name="weight"
                                    type="text"
                                    color="white"
                                    fontSize="xs"
                                />
                            </FormControl>
                        )}
                        {workoutToUpdate.reps && (
                            <FormControl>
                                <FormLabel
                                    fontSize="xs"
                                    color="white"
                                    htmlFor="reps"
                                >
                                    Reps
                                </FormLabel>
                                <Input
                                    onChange={changeHandler}
                                    placeholder={workoutToUpdate.reps}
                                    value={inputState.reps}
                                    name="reps"
                                    type="text"
                                    color="white"
                                    fontSize="xs"
                                />
                            </FormControl>
                        )}
                        {workoutToUpdate.rounds && (
                            <FormControl>
                                <FormLabel
                                    fontSize="xs"
                                    color="white"
                                    htmlFor="rounds"
                                >
                                    Rounds
                                </FormLabel>
                                <Input
                                    onChange={changeHandler}
                                    placeholder={workoutToUpdate.rounds}
                                    value={inputState.rounds}
                                    name="rounds"
                                    type="text"
                                    color="white"
                                    fontSize="xs"
                                />
                            </FormControl>
                        )}
                        {workoutToUpdate.distance && (
                            <FormControl>
                                <FormLabel
                                    fontSize="xs"
                                    color="white"
                                    htmlFor="distance"
                                >
                                    Distance
                                </FormLabel>
                                <Input
                                    onChange={changeHandler}
                                    placeholder={workoutToUpdate.distance}
                                    value={inputState.distance}
                                    name="distance"
                                    type="text"
                                    color="white"
                                    fontSize="xs"
                                />
                            </FormControl>
                        )}
                        {workoutToUpdate.time && (
                            <FormControl>
                                <FormLabel
                                    fontSize="xs"
                                    color="white"
                                    htmlFor="time"
                                >
                                    Time
                                </FormLabel>
                                <Input
                                    onChange={changeHandler}
                                    placeholder={workoutToUpdate.time}
                                    value={inputState.time}
                                    name="time"
                                    type="text"
                                    color="white"
                                    fontSize="xs"
                                />
                            </FormControl>
                        )}
                        <Button
                            mt={4}
                            width="100%"
                            type="submit"
                            bg="red"
                            color="white"
                            fontSize="xs"
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
