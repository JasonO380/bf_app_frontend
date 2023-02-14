import React, { useEffect, useContext, useState } from "react";
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
import UpdateSession from "./update-session";

const DisplaySessions = (props) => {
    console.log(props.workouts);
    return (
        <React.Fragment>
        <Stack color="black">
            {props.workouts.map((s) => {
                return (
                    <Box 
                    mb={5}>
                        <Text>
                            Date: {s.date}
                            Movement: {s.exercise}
                            Weight: {s.weight}
                            Reps: {s.reps}
                            Rounds: {s.rounds}
                        </Text>
                        <Flex
                        ml={8} 
                        mt={2}>
                            <Button
                            name={s.id}
                            // onClick={updateHandler} 
                            bg="teal" 
                            mr={2}>
                                Update
                            </Button>
                            <Button
                            name={s._id}
                            // onClick={deleteSession}
                            bg="red">Delete</Button>
                        </Flex>
                    </Box>
                );
            })}
        </Stack>
        {/* {editSession && 
        <UpdateSession
        getUpdate={getSessions}
        updateMode={editSession} 
        update={update} />} */}
        </React.Fragment>
    )
};

export default DisplaySessions;