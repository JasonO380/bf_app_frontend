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
import { LoginRegisterContext } from "../authentication/login-register-context";
import UpdateSession from "./update-session";

const DisplaySessions = (props) => {
    console.log(props.workouts);
    const auth = useContext(LoginRegisterContext);
    const [editSession, setEditSession] = useState(false);
    const [update, setUpdate] = useState();
    let sessionToDelete;

    const deleteSession = async (event) => {
        console.log(event.target.name)
        sessionToDelete = event.target.name;

        const userID = auth.userID;
        try {
            const response = await fetch(
                `http://localhost:5000/api/users/${userID}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        session: sessionToDelete
                    })
                }
            );
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {}
        props.getSessions();
    };

    const updateHandler = (event) => {
        const updateID = event.target.name;
        setUpdate(event.target.name)
        setEditSession(true)
    };

    const getClientSessions = () => {
        props.getSessions();
    }

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
                            onClick={updateHandler} 
                            bg="teal" 
                            mr={2}>
                                Update
                            </Button>
                            <Button
                            name={s._id}
                            onClick={deleteSession}
                            bg="red">Delete</Button>
                        </Flex>
                    </Box>
                );
            })}
        </Stack>
        {editSession && 
        <UpdateSession
        getClientSessions={getClientSessions}
        updateMode={setEditSession} 
        update={update} />}
        </React.Fragment>
    )
};

export default DisplaySessions;