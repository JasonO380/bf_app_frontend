import React from "react";
import {
    Box,
    Image,
    Flex,
    Text,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const SessionCard = (props) => {
    const workouts = props.workouts;
    console.log(workouts);
    return(
        <Stack color="black">
                {workouts.map((s) => {
                    return (
                        <Box mb={5}>
                            <Flex>
                                <Text color="white">
                                    Year: {s.year} Month: {s.month} Day:{" "}
                                    {s.dayOfWeek}
                                </Text>
                            </Flex>
                            <Text color="white">
                                Movement: {s.exercise}
                                Weight: {s.weight}
                                Reps: {s.reps}
                                Rounds: {s.rounds}
                            </Text>
                            <Flex ml={8} mt={2}>
                                <Button
                                    color="white"
                                    borderRadius="50"
                                    name={s._id}
                                    onUpdate={props.onUpdate}
                                    bg="teal"
                                    mr={2}
                                >
                                    Update
                                </Button>
                                <Button
                                    color="white"
                                    borderRadius="50"
                                    name={s._id}
                                    onDelete={props.onDelete}
                                    bg="red"
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Box>
                    );
                })}
            </Stack>
    )
};

export default SessionCard;