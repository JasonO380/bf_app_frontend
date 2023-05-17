import React, { useContext, useState, useEffect, useCallback } from "react";
import { Box, Flex, Text, Heading, Button, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LoginRegisterContext } from "../authentication/login-register-context";

const GetSessionByID = (props) => {
    const sessionID = props.sessionID;
    const sessionIDs = [];
    sessionIDs.push(sessionID);
    const auth = useContext(LoginRegisterContext);
    const [sessionData, setSessionData] = useState(null);
    console.log(sessionID);
    useEffect(() => {
        const fetchSession = async () => {
            const fetchedSessions = [];
            for (const sID of sessionIDs) {
                try {
                    const response = await fetch(
                        `https://bf-backend.onrender.com/api/session/${sID}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Issuer " + auth.token,
                            },
                        }
                    );
                    const responseData = await response.json();
                    fetchedSessions.push(responseData.session);
                    console.log(fetchedSessions);
                } catch (err) {
                    console.error(err);
                }
            }
            setSessionData(fetchedSessions);
        };
        fetchSession();
    }, [sessionID, auth.token]);

    console.log(sessionData);

    if (sessionData) {
        return (
            <Box paddingBottom="100px">
                {sessionData.map((s, index) => {
                    return (
                        <Flex key={index}>
                            <Text color="white">{s.exercise}</Text>
                            {s.weight && (
                                <Text color="white">
                                    {" "}
                                    Weight: {s.weight + " "}
                                </Text>
                            )}
                            {s.reps && (
                                <Text color="white"> Reps: {s.reps + " "}</Text>
                            )}
                            {s.time && (
                                <Text color="white"> Time: {s.time + " "}</Text>
                            )}
                            {s.distance && (
                                <Text color="white">
                                    {" "}
                                    Distance: {s.distance + " "}
                                </Text>
                            )}
                            <Text color="white"> Rounds: {s.rounds}</Text>
                        </Flex>
                    );
                })}
            </Box>
        );
    }
};

export default GetSessionByID;
