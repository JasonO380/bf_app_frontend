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
                `http://localhost:5000/api/users/${id}`,
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
            allSessions.map((s) => {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.toLocaleString("en-US", { month: "long" });
                const dayOfWeek = date.toLocaleString("default", {
                    weekday: "long",
                });
                if (
                    s.year === year &&
                    s.month === month &&
                    s.dayOfWeek === dayOfWeek
                ) {
                    ses.push(s);
                }
            });
            setWorkouts(ses);
            setAllWorkouts(allSessions);
        } catch (err) {}
    };

    const deleteSession = async (event) => {
        console.log(event.target.name);
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
                        session: sessionToDelete,
                    }),
                }
            );
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

    return (
        <React.Fragment>
            <Stack color="black" >
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
                            <Flex ml={8} mt={2}>
                                <Button
                                    color="white"
                                    borderRadius="50"
                                    name={s.id}
                                    onClick={updateHandler}
                                    bg="teal"
                                    mr={2}
                                >
                                    Update
                                </Button>
                                <Button
                                    color="white"
                                    borderRadius="50"
                                    name={s._id}
                                    onClick={deleteSession}
                                    bg="red"
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
