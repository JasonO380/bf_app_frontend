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
import UpdateAthleteSession from "./update-athlete-session";
import { LoginRegisterContext } from "../authentication/login-register-context";

// let user;
const GetAthletesSessions = (props) => {
    const user = props.user;
    const [id, setID] = useState();
    const history = props.history;
    let sessionToDelete;
    let updateID;
    let ses = [];
    let allSessions;
    console.log(user);
    const [editSession, setEditSession] = useState(false);
    const newSession = props.newSession;
    const auth = useContext(LoginRegisterContext);
    const [update, setUpdate] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [allWorkouts, setAllWorkouts] = useState([]);

    const getSessions = async () => {
        console.log(user);
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/${user}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            allSessions = responseData.sessions;
            console.log(allSessions);
            const sessions = responseData.sessions.filter((session) => {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.toLocaleString("en-US", { month: "long" });
                const dayOfWeek = date.toLocaleString("default", {
                    weekday: "long",
                });
                const dayOfMonth = date.getDate();
                return (
                    session.year === year &&
                    session.month === month &&
                    session.dayOfMonth === dayOfMonth &&
                    session.dayOfWeek === dayOfWeek
                );
            });
            setWorkouts(sessions);
            setAllWorkouts(allSessions);
        } catch (err) {}
    };

    useEffect(() => {
        getSessions();
    }, [user, auth.token]);

    const deleteSession = async (event) => {
        console.log(event.target.name);
        sessionToDelete = event.target.name;
        const userID = auth.userID;
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/${userID}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        session: sessionToDelete,
                    }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {}
        getSessions();
    };

    const updateHandler = (event) => {
        updateID = event.target.name;
        setUpdate(event.target.name);
        setEditSession(true);
    };

    useEffect(() => {
        setID(user);
        getSessions();
        console.log(auth.userID);
    }, [user, newSession, history]);

    console.log(workouts);

    return (
        <React.Fragment>
            <Stack paddingBottom="60px" color="black">
                {workouts.reverse().map((s) => {
                    return (
                        <Box fontSize="xs" mb={5}>
                            <Flex>
                                <Text color="white">
                                    Year: {s.year} Month: {s.month} Day:{" "}
                                    {s.dayOfMonth}
                                </Text>
                            </Flex>
                            <Stack>
                            <Text color="white">
                                Movement: {s.exercise}
                                {s.weight && (
                                    <>
                                        Weight: {s.weight}
                                        Reps: {s.reps}
                                    </>
                                )}
                                {s.distance && (
                                    <>
                                        Distance: {s.distance}
                                        Time: {s.time}
                                    </>
                                )}
                                Rounds: {s.rounds}
                            </Text>
                            </Stack>
                            <Flex ml={8} mt={2}>
                                <Button
                                    color="white"
                                    borderRadius="50"
                                    name={s.id}
                                    onClick={updateHandler}
                                    bg="teal"
                                    mr={2}
                                    fontSize="xs"
                                >
                                    Update
                                </Button>
                                <Button
                                    color="white"
                                    borderRadius="50"
                                    name={s._id}
                                    onClick={deleteSession}
                                    bg="red"
                                    fontSize="xs"
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Box>
                    );
                })}
            </Stack>
            {editSession && (
                <Box position="absolute" zIndex="3">
                    <UpdateAthleteSession
                        getUpdate={getSessions}
                        updateMode={setEditSession}
                        update={update}
                    />
                </Box>
            )}
        </React.Fragment>
    );
};

export default GetAthletesSessions;
