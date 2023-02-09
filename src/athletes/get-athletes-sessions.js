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

let user
const GetAthletesSessions = (props) => {
    const newSession = props.newSession;
    const auth = useContext(LoginRegisterContext);
    const [workouts, setWorkouts] = useState([]);
    const getSessions = async () => {
        user = auth.userID;
        console.log(user);
        try {
            const response = await fetch(
                `http://localhost:5000/api/users/${user}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            setWorkouts(responseData.sessions);
            console.log(responseData.sessions);
        } catch (err) {}
    };

    const deleteSession = async (event) => {
        console.log(event.target.name)
        const sessionToDelete = event.target.name;
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
    }

    useEffect(() => {
        getSessions();
        console.log(auth.userID);
    }, [user, newSession]);

    return (
        <Stack color="black">
            {workouts.map((s) => {
                return (
                    <Box mb={5}>
                        <Text>
                            Date: {s.date}
                            Movement: {s.exercise}
                            Weight: {s.weight}
                            Reps: {s.reps}
                            Rounds: {s.rounds}
                        </Text>
                        <Flex mt={2}>
                            <Button 
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
    );
};

export default GetAthletesSessions;
