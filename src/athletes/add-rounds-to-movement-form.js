import React from "react";
import {
    Box,
    Text,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const AddRoundsToMovementForm = ({
    movement,
    inputState,
    changeHandler,
    convertToKG,
    convertToPounds,
    addSession,
    removeMovementHandler,
    movementHandler,
    m
}) => {
    return (
        <form onSubmit={addSession}>
            <Flex gap="10px" margin="auto" width="100%" paddingBottom="5px">
                {/* Render the input fields */}
                {/* Weight */}
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="weight">
                            Weight
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e, movement)}
                            value={inputState[movement]?.weight || ""}
                            name="weight"
                            type="text"
                            bg="white"
                            placeholder="Weight"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="reps">
                            Reps
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e, m)}
                            value={inputState[m]?.reps || ""}
                            name="reps"
                            type="text"
                            bg="white"
                            placeholder="Reps"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="rounds">
                            Rounds
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e, m)}
                            value={inputState[m]?.rounds || ""}
                            name="rounds"
                            type="text"
                            bg="white"
                            placeholder="Rounds"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
            </Flex>
            {/* convert to KG and pounds */}
            <Flex gap="10px" margin="auto" width="100%" paddingBottom="5px">
                <Button
                    mt={4}
                    name={movement}
                    border="1px solid white"
                    borderRadius="50px"
                    width="fit-content"
                    onClick={() => convertToKG(movement)}
                    type="button"
                    bg="transparent"
                    color="white"
                    fontSize="xs"
                >
                    Convert KG
                </Button>
                <Button
                    mt={4}
                    name={movement}
                    border="1px solid white"
                    borderRadius="50px"
                    width="fit-content"
                    onClick={() => convertToPounds(movement)}
                    type="button"
                    bg="transparent"
                    color="white"
                    fontSize="xs"
                >
                    Convert Pounds
                </Button>
            </Flex>
            {/* Distance and time fields */}
            <Flex gap="10px" margin="auto" width="100%" paddingBottom="5px">
                <FormControl>
                    <Stack>
                        <FormLabel
                            fontSize="xs"
                            color="white"
                            htmlFor="distance"
                        >
                            Distance
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e, m)}
                            value={inputState[m]?.distance || ""}
                            name="distance"
                            type="text"
                            bg="white"
                            placeholder="Distance"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="time">
                            Time
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e, m)}
                            value={inputState[m]?.time || ""}
                            name="time"
                            type="text"
                            bg="white"
                            placeholder="Time"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
            </Flex>
            <Box flexGrow={1}>
                {/* Add Round Button */}
                <Button
                    mt={4}
                    name={movement}
                    borderRadius="50px"
                    width="100%"
                    onClick={movementHandler}
                    type="submit"
                    bg="red"
                    color="white"
                    fontSize="xs"
                >
                    Add round
                </Button>
            </Box>
            <Box paddingBottom="60px" flexGrow={1}>
                {/* Remove Movement Button */}
                <Button
                    mt={4}
                    name={movement}
                    borderRadius="50px"
                    width="100%"
                    onClick={() => removeMovementHandler(movement)}
                    bg="red"
                    color="white"
                    fontSize="xs"
                >
                    Remove movement
                </Button>
            </Box>
        </form>
    );
};

export default AddRoundsToMovementForm;
