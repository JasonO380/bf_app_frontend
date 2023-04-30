import React, { useContext, useReducer, useState } from "react";
import {
    Box,
    Text,
    VStack,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
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
    const [movements, setMovements] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState([]);
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
            case "RESET_MOVEMENT":
                return {
                    ...state,
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

    const searchForMovement = async (query) => {
        if (query.length < 1) {
            setMovements([]);
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:5000/api/movement/search/${query}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            if (responseData.movements && responseData.movements.length === 0) {
                console.log("no movements found");
            }
            setMovements(responseData.movements);
            setShowMenu(
                responseData.movements && responseData.movements.length > 0
            );
            console.log(responseData.movements);
        } catch (err) {
            console.log(err);
        }
    };

    const validateMovement = (value) => {
        //I think I need to get rid of this
        // setNewMovement("");
        if (value.length < 1) {
            setShowMenu(false);
        }
        if (value.length < 3) {
            setErrorMessage("Movement must be at least 3 characters long");
            setTouched(true);
            setIsValid(false);
            console.log("movement too short");
        } else {
            console.log("movement valid");
            setIsValid(true);
            setErrorMessage("");
        }
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        const formattedValue =
            inputValue.charAt(0).toUpperCase() +
            inputValue.slice(1).toLowerCase();
        searchForMovement(formattedValue);
        if (formattedValue.length < 3) {
            setIsValid(false);
        }
        if (formattedValue.length > 2) {
            setIsValid(true);
        }
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: formattedValue,
        });
    };

    const handleSelectMovement = (movement) => {
        setSelectedMovement((prevMovements) => [
            ...prevMovements,
            movement.movement,
        ]);
        setShowMenu(false);
        dispatch({ type: "CLEAR_FORM" });
    };

    const removeMovementHandler = (movementToRemove) => {
        setSelectedMovement((prevMovements) =>
            prevMovements.filter((movement) => movement !== movementToRemove)
        );
        setNewMovement((prevMovements) =>
            prevMovements.filter((movement) => movement !== movementToRemove)
        );
    };

    const addMovement = (event) => {
        event.preventDefault();
        console.log(inputState.movement);
        setShowMenu(false);
        validateMovement(inputState.movement);
        if (!isValid) {
            setTouched(true);
        } else {
            setSelectedMovement((prevMovement) => [
                ...prevMovement,
                inputState.movement,
            ]);
            setShowAddRounds(true);
            setShowMenu(false);
            dispatch({
                type: "CLEAR_FORM",
            });
            dispatch({
                type: "RESET_MOVEMENT",
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
                            <Text
                                paddingBottom="15px"
                                color="white"
                                fontSize="small"
                                fontStyle="italic"
                                fontWeight="bold"
                            >
                                Must be 3 characters
                            </Text>
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
                    {showMenu && movements.length > 0 && (
                        <Box
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="lg"
                            w="100%"
                            maxH="150px"
                            mt={4}
                            overflowY="scroll"
                            bg="white"
                        >
                            <VStack alignItems="stretch" spacing={0}>
                                <Box p={2} borderBottomWidth="1px">
                                    --Select one--
                                </Box>
                                {movements.map((movement) => (
                                    <Box
                                        key={movement._id}
                                        value={movement._id}
                                        p={2}
                                        borderBottomWidth={
                                            movements.indexOf(movement) ===
                                            movements.length - 1
                                                ? 0
                                                : "1px"
                                        }
                                        onClick={() =>
                                            handleSelectMovement(movement)
                                        }
                                        _hover={{ bg: "gray.100" }}
                                        cursor="pointer"
                                    >
                                        {movement.movement}
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    )}
                    {touched && !isValid && (
                        <Text color="red">{errorMessage}</Text>
                    )}
                </Stack>
            </Box>
            {user && (selectedMovement || newMovement.length) && (
                <AddRoundsToMovement
                    movement={[...newMovement, ...selectedMovement]}
                    removeMovement={removeMovementHandler}
                />
            )}
        </React.Fragment>
    );
};

export default AddMovement;
