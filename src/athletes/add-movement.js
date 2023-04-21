import React, { useContext, useReducer, useState } from "react";
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
import GetAthletesSessions from "./get-athletes-sessions";
import AddRoundsToMovement from "./add-rounds-to-movement";
import ShowTodaysSession from "./show-todays-session";
import { LoginRegisterContext } from "../authentication/login-register-context";

const AddMovement = () => {
    const auth = useContext(LoginRegisterContext);
    const user = auth.userID;
    let movementID;
    const [newMovement, setNewMovement] = useState([]);
    const [showAddRounds, setShowAddRounds] = useState(false);
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

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const addMovement = (event) => {
        setNewMovement((prevMovement) => [...prevMovement, inputState.movement]);
        setShowAddRounds(true);
        dispatch({
            type: "CLEAR_FORM",
        });
        event.preventDefault();
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
                                bg="red"
                                color="white"
                            >
                                Add movement
                            </Button>
                        </form>
                    </FormControl>
                </Stack>
            </Box>
            {user && <AddRoundsToMovement movement={newMovement} />}
        </React.Fragment>
    );
};

export default AddMovement;
