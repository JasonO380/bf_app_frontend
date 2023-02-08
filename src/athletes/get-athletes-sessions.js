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

const GetAthletesSessions = (props) => {
    const newSession = props.newSession;
    const auth = useContext(LoginRegisterContext);
    const [workouts, setWorkouts] = useState([]);
    const getSessions = async () => {
        const userID = auth.userID;
        console.log(userID);
        try {
            const response = await fetch(
                `http://localhost:5000/api/users/${userID}`,
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

    useEffect(() => {
        getSessions();
        console.log(auth.userID);
    }, [newSession]);

    return (
        <Stack color="black">
            {workouts.map((s) => {
                return (
                    <Text>
                        Date: {s.date}
                        Movement: {s.exercise}
                        Weight: {s.weight}
                        Reps: {s.reps}
                        Rounds: {s.rounds}
                    </Text>
                );
            })}
        </Stack>
    );
};

export default GetAthletesSessions;
