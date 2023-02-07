import React, { useContext, useReducer } from "react";
import { Box, Image, Flex, Button, Stack, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";


let userID;
const AddAthleteSession = () => {
    const auth = useContext(LoginRegisterContext);
    console.log(auth)
    const inputReducer = (state, action) => {
        console.log("Action:", action)
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
            default:
                return state;
        }
    };
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement: "",
        weight: "",
        reps:"",
        rounds:"",
        distance:"",
        time:""
    });
    userID = auth.userID;
    console.log(userID);

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    return(
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
            <Stack 
                margin="auto"
                width="80%">
                <form>
                <FormControl>
                    <FormLabel htmlFor="movement">Movement</FormLabel>
                    <Input
                    onChange={changeHandler}
                    name="movement"
                    type="text"
                    color='black'
                    placeholder="Movement" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="weight">Weight</FormLabel>
                    <Input
                    onChange={changeHandler}
                    name="weight"
                    type="text"
                    color='black'
                    placeholder="Weight" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="reps">Reps</FormLabel>
                    <Input
                    onChange={changeHandler}
                    name="reps"
                    type="text"
                    color='black'
                    placeholder="Reps" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="distance">Distance</FormLabel>
                    <Input
                    onChange={changeHandler}
                    name="distance"
                    type="text"
                    color='black'
                    placeholder="Distance" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Input
                    onChange={changeHandler}
                    name="time"
                    type="text"
                    color='black'
                    placeholder="Time" />
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
    )
};

export default AddAthleteSession;