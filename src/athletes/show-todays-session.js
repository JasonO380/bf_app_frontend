import React from "react";
import UpdateAthleteSession from "./update-athlete-session";
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

const ShowTodaysSession = (props) => {
    const session = props.newSession
    return (
        <React.Fragment>
        <Box 
                    mb={5}>
                    <Flex>
                        <Text color="white">Year:{session.year} Month: {session.month} Day: {session.dayOfWeek}</Text>
                    </Flex>
                        <Text color="white">
                            Movement: {session.exercise}
                            Weight: {session.weight}
                            Reps: {session.reps}
                            Rounds: {session.rounds}
                        </Text>
                        <Flex
                        ml={8} 
                        mt={2}>
                            <Button
                            color="white"
                            borderRadius="50"
                            name={session.id}
                            // onClick={updateHandler} 
                            bg="teal" 
                            mr={2}>
                                Update
                            </Button>
                            <Button
                            color="white"
                            borderRadius="50"
                            name={session._id}
                            // onClick={deleteSession}
                            bg="red">Delete</Button>
                        </Flex>
                    </Box>
        {/* {editSession && 
        <UpdateAthleteSession
        getUpdate={getSessions}
        updateMode={editSession} 
        update={update} />} */}
        </React.Fragment>
    )
};

export default ShowTodaysSession;