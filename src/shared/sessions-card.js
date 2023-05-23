import React, { useContext, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { Box, Flex, Text, Heading, Button, Stack } from "@chakra-ui/react";
import RemoveDuplicates from "./unique-session";
import { motion } from "framer-motion";
import UpdateAthleteSession from "../athletes/update-athlete-session";
import UpdateSession from "./update-session";
import { LoginRegisterContext } from "../authentication/login-register-context";

let updateID;
const SessionCard = (props) => {
    const auth = useContext(LoginRegisterContext);
    const session = props.workouts;
    const finalSession = [];
    const [update, setUpdate] = useState();
    const [editSession, setEditSession] = useState(false);
    let sessionToDelete;
    const updateChange = props.onUpdate;
    const animation = {
        offscreen: { scale: 0 },
        onscreen: {
            scale: 1,
            transition: { type: "spring", bounce: 0.65, duration: 0.8 },
        },
    };

    //helper to handle differnt clicks on updateHandler
    useEffect(() => {
        console.log("here");
        updateID = updateChange;
    }, [updateChange]);

    //helper function to create MovementObjects
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
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {}
        props.getUpdate();
    };

    const updateDOM = () => {
        props.getUpdate();
    };

    const updateHandler = (event) => {
        updateID = event.target.name;
        setUpdate((prevUpdate) => updateID);
        props.getUpdate();
        console.log(update);
    };

    const updateChangeHandler = (data) => {
        updateID = data;
        setUpdate(updateID);
    };

    useEffect(() => {
        console.log(update);
    }, [update]);

    console.log(finalSession);

    if (finalSession) {
        return (
            <React.Fragment>
                <Stack width="100%" position="relative" paddingBottom="60px">
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
                                                <Heading
                                                    as="h1"
                                                    size="lg"
                                                    color="white"
                                                >
                                                    {month}
                                                </Heading>
                                            </Flex>
                                            {days.map((dayObj) => {
                                                const day = dayObj.day;
                                                const session = dayObj.sessions;
                                                return (
                                                    <React.Fragment>
                                                        <Flex>
                                                            <Text
                                                                fontSize="25px"
                                                                color="white"
                                                            >
                                                                {day}
                                                            </Text>
                                                        </Flex>
                                                        {session.map((s) => {
                                                            return (
                                                                <React.Fragment>
                                                                    {update ===
                                                                    s.id ? (
                                                                        <UpdateSession
                                                                            updateChangeHandler={
                                                                                updateChangeHandler
                                                                            }
                                                                            updateMode={() =>
                                                                                setUpdate(
                                                                                    null
                                                                                )
                                                                            }
                                                                            onUpdate={
                                                                                updateDOM
                                                                            }
                                                                            update={
                                                                                update
                                                                            }
                                                                            handleUpdate={
                                                                                updateHandler
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <Stack
                                                                            padding="7px"
                                                                            borderRadius="10px"
                                                                            border="1px solid grey"
                                                                            width="90%"
                                                                            fontSize="xs"
                                                                        >
                                                                            <Text color="white">
                                                                                Movement:
                                                                                {" " +
                                                                                    s.movement}
                                                                                    {s.weight !== null && s.weight !== undefined && (
                                                                                        <Text color="white">
                                                                                            Weight: {s.weight}
                                                                                        </Text>
                                                                                    )}
                                                                                {s.reps && (
                                                                                    <Text color="white">
                                                                                        Reps:
                                                                                        {" " +
                                                                                            s.reps}
                                                                                    </Text>
                                                                                )}
                                                                                {s.distance && (
                                                                                    <Text color="white">
                                                                                        Distance:
                                                                                        {" " +
                                                                                            s.distance}
                                                                                    </Text>
                                                                                )}
                                                                                {s.time && (
                                                                                    <Text color="white">
                                                                                        Time:
                                                                                        {" " +
                                                                                            s.time}
                                                                                    </Text>
                                                                                )}
                                                                                Rounds:
                                                                                {" " +
                                                                                    s.rounds}
                                                                            </Text>
                                                                        </Stack>
                                                                    )}
                                                                    <Flex
                                                                        ml={8}
                                                                        mt={2}
                                                                    >
                                                                        <Button
                                                                            color="white"
                                                                            borderRadius="50"
                                                                            fontSize="xs"
                                                                            name={
                                                                                s.id
                                                                            }
                                                                            onClick={
                                                                                updateHandler
                                                                            }
                                                                            bg="teal"
                                                                            mr={
                                                                                2
                                                                            }
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                        <Button
                                                                            color="white"
                                                                            borderRadius="50"
                                                                            fontSize="xs"
                                                                            name={
                                                                                s.id
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
                                                        ;
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
            </React.Fragment>
        );
    }
};

export default SessionCard;
