import React, { useContext, useState } from "react";
import { Box, Flex, Text, Heading, Button, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LoginRegisterContext } from "../authentication/login-register-context";

const SessionCard = (props) => {
    const auth = useContext(LoginRegisterContext);
    const session = props.workouts;
    const finalSession = [];
    const [update, setUpdate] = useState();
    let sessionToDelete;
    let updateID;
    const animation = {
        offscreen: { scale: 0 },
        onscreen: {
            scale: 1,
            transition: { type: "spring", bounce: 0.65, duration: 0.8 },
        },
    };

    //helper finction to create MovementObjects
    const generateMovementObjects = (session) => ({
        id: session._id,
        movement: session.exercise,
        rounds: session.rounds,
        reps: session.reps,
        weight: session.weight,
        distance: session.distance,
        time: session.time,
    });
    // Helper function to find or create a year object
    const findOrCreateYear = (year) => {
        let yearObj = finalSession.find((fSession) => fSession.year === year);
        if (!yearObj) {
            yearObj = { year, months: [] };
            finalSession.push(yearObj);
        }
        return yearObj;
    };

    // Helper function to find or create a month object
    const findOrCreateMonth = (yearObj, month) => {
        let monthObj = yearObj.months.find(
            (monthObj) => monthObj.month === month
        );
        if (!monthObj) {
            monthObj = { month, days: [] };
            yearObj.months.push(monthObj);
        }
        return monthObj;
    };

    // Helper function to find or create a day object
    const findOrCreateDay = (monthObj, day) => {
        let dayObj = monthObj.days.find((dayObj) => dayObj.day === day);
        if (!dayObj) {
            dayObj = { day, sessions: [] };
            monthObj.days.push(dayObj);
        }
        return dayObj;
    };

    session.forEach((sess) => {
        const yearObj = findOrCreateYear(sess.year);
        const monthObj = findOrCreateMonth(yearObj, sess.month);
        const dayObj = findOrCreateDay(monthObj, sess.dayOfMonth);
        dayObj.sessions.push(generateMovementObjects(sess));
    });

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
        props.getSessions();
    };

    const updateHandler = (event) => {
        updateID = event.target.name;
        setUpdate(event.target.name);
        props.update(true);
    };

    if (finalSession.length > 0) {
        return (
            <Stack color="black" paddingBottom="75px">
                {finalSession.map((session) => {
                    const months = session.months;
                    return (
                        <React.Fragment>
                            {months.map((monthObj) => {
                                const days = monthObj.days;
                                const month = monthObj.month;
                                return (
                                    <React.Fragment>
                                        <Flex>
                                            <Heading as="h1" size="lg" color="white">{month}</Heading>
                                        </Flex>
                                        {days.map((dayObj) => {
                                            const day = dayObj.day;
                                            const session = dayObj.sessions;
                                            return (
                                                <React.Fragment>
                                                    <Flex>
                                                        <Text fontSize="25px" color="white">{day}</Text>
                                                    </Flex>
                                                    {session.map((s) => {
                                                        return (
                                                            <React.Fragment>
                                                                <Flex>
                                                                    <Text color="white">
                                                                        Movement:{" "}
                                                                        {
                                                                            s.movement
                                                                        }
                                                                        {s.weight && (
                                                                            <>
                                                                                Weight:{" "}
                                                                                {
                                                                                    s.weight
                                                                                }{" "}
                                                                                Reps:{" "}
                                                                                {
                                                                                    s.reps
                                                                                }
                                                                            </>
                                                                        )}
                                                                        {s.distance && (
                                                                            <>
                                                                                Distance:{" "}
                                                                                {
                                                                                    s.distance
                                                                                }{" "}
                                                                                Time:{" "}
                                                                                {
                                                                                    s.time
                                                                                }
                                                                            </>
                                                                        )}
                                                                        Rounds:{" "}
                                                                        {
                                                                            s.rounds
                                                                        }
                                                                    </Text>
                                                                </Flex>
                                                                <Flex
                                                                    ml={8}
                                                                    mt={2}
                                                                >
                                                                    <Button
                                                                        color="white"
                                                                        borderRadius="50"
                                                                        name={
                                                                            s._id
                                                                        }
                                                                        onClick={
                                                                            updateHandler
                                                                        }
                                                                        bg="teal"
                                                                        mr={2}
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                    <Button
                                                                        color="white"
                                                                        borderRadius="50"
                                                                        name={
                                                                            s._id
                                                                        }
                                                                        onClick={
                                                                            deleteSession
                                                                        }
                                                                        bg="red"
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Flex>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </Stack>
        );
    }
};

export default SessionCard;
