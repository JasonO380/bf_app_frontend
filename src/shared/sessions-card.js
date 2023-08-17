import React, { useContext, useState, useEffect } from "react";
import { Flex, Text, Heading, Button, Stack } from "@chakra-ui/react";
import UpdateSession from "./update-session";
import LoadingSpinner from "./loading-spinner";
import { LoginRegisterContext } from "../authentication/login-register-context";

let updateID;
const SessionCard = (props) => {
    const auth = useContext(LoginRegisterContext);
    const session = props.workouts;
    console.log(session)
    const [update, setUpdate] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [error, setError] = useState(null);
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

    const deleteSession = async (id) => {
        // console.log(event.target.name);
        // sessionToDelete = event.target.name;
        setIsDeleting(true)
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
                        session: id,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {
            setError(err.message);
        }
        setIsDeleting(false)
        props.getUpdate();
    };

    const handleDelete = async (sessionId) => {
        setDeleteID(sessionId)
        if (window.confirm("Are you sure you want to delete this session?")) {
            const success = await deleteSession(sessionId);
            if (success) {
                // Handle successful deletion, e.g., remove the session from the UI.
            } else {
                // Handle errors, e.g., display an error message to the user.
                console.error("Error while deleting:", error);
            }
        }
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

    if (session) {
        return (
            <React.Fragment>
                <Stack width="100%" position="relative" paddingBottom="70px">
                    {session.map((session) => {
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
                                                                    {isDeleting && deleteID === s.id && <LoadingSpinner text={"Deleting requested session"} /> }
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
                                                                                () => handleDelete(s.id)
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
