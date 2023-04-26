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
    color,
} from "@chakra-ui/react";
import GetAthletesSessions from "./get-athletes-sessions";
import AddRoundsToMovement from "./add-rounds-to-movement";
import ShowTodaysSession from "./show-todays-session";
import { LoginRegisterContext } from "../authentication/login-register-context";

const AddMovement = () => {
    const auth = useContext(LoginRegisterContext);
    const user = auth.userID;
    let movementID;
    const [newMovement, setNewMovement] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState(false);
    const [showAddRounds, setShowAddRounds] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
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
                };
            default:
                return state;
        }
    };
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement: "",
        athlete: "",
    });

    const validateMovement = (value) => {
        if (value.length < 3) {
            setErrorMessage("Movement must be at least 3 characters long");
            setTouched(true);
            setIsValid(false);
            console.log('movement too short');
        } else {
            console.log("movement valid");
            setIsValid(true);
            setErrorMessage("");
        }
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        const formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
        if(formattedValue.length < 3){
            setIsValid(false);
        }
        if(formattedValue.length > 2){
            setIsValid(true);
        };
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: formattedValue,
        });
        
    };

    const addMovement = (event) => {
        event.preventDefault();
        console.log(inputState.movement);
        validateMovement(inputState.movement);
        if (!isValid) {
            setTouched(true);
        } else {
            setNewMovement((prevMovement) => [...prevMovement, inputState.movement]);
            setShowAddRounds(true);
            dispatch({
                type: "CLEAR_FORM",
            });
        }
    };

    return (
        <React.Fragment>
            <Box bg="offWhite" p={5} width="100%" margin="0 auto">
                <Stack margin="auto" width="80%" paddingBottom="60px">
                    <FormControl>
                        <form onSubmit={addMovement}>
                            <FormLabel color="white" htmlFor="movement">
                                Movement
                            </FormLabel>
                            <Text paddingBottom="15px" color="white" fontSize="small" fontStyle="italic" fontWeight="bold" >Must be 3 characters</Text>
                            <Input
                                onChange={changeHandler}
                                value={inputState.movement}
                                name="movement"
                                type="text"
                                bg="white"
                                placeholder="Movement"
                            />
                            <Button
                                mt={4}
                                width="100%"
                                type="submit"
                                borderRadius="50px"
                                bg="red"
                                color="white"
                                isDisabled={!isValid && touched} 
                            >
                                Add movement
                            </Button>
                        </form>
                    </FormControl>
                    {touched && !isValid && <Text color="red">{errorMessage}</Text>}
                </Stack>
            </Box>
            {user && <AddRoundsToMovement movement={newMovement} />}
        </React.Fragment>
    );
};

export default AddMovement;
