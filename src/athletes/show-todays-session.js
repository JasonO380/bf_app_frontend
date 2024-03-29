import React, { useContext, useState, useEffect } from "react";
import { Flex, Text, Box, Heading, Button, Stack } from "@chakra-ui/react";
import useDeleteSelectedSession from "../http-requests/deleteSelectedSession";
import UpdateSession from "../shared/update-session";
import { LoginRegisterContext } from "../authentication/login-register-context";
import LoadingSpinner from "../shared/loading-spinner";

const ShowTodaysSession = ({ workouts, refreshSessions }) => {
    console.log(workouts);
    const auth = useContext(LoginRegisterContext);
    const [update, setUpdate] = useState();
    const [addRoundID, setAddRoundID] = useState();
    const [deleteRoundID, setDeleteroundID] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [movement, setMovement] = useState([]);
    const { deleteSession, isDeleting, error } = useDeleteSelectedSession();

    const addRoundToMovement = async (id, movement) => {
        setIsLoading(true);
        const workoutToUpdate = workouts.find((w) => w.id === id);
        if (!workoutToUpdate) return; // Exit if no matching workout is found

        const updatedRounds = workoutToUpdate.rounds + 1;
        try {
            let requestBody = {
                exercise: movement,
                rounds: updatedRounds,
                reps: workoutToUpdate.reps,
                weight: workoutToUpdate.weight,
                distance: workoutToUpdate.distance,
                time: workoutToUpdate.time,
            };

            const response = await fetch(
                `https://bf-backend.onrender.com/api/session/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            console.log(response);
            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {}
        setIsLoading(false)
        refreshSessions();
    };
    const handleDelete = async (sessionId) => {
        setDeleteroundID(sessionId)
        if (window.confirm("Are you sure you want to delete this session?")) {
            const success = await deleteSession(sessionId);
            if (success) {
                // Handle successful deletion, e.g., remove the session from the UI.
            } else {
                // Handle errors, e.g., display an error message to the user.
                console.error("Error while deleting:", error);
            }
        }
        refreshSessions();
    };
    const handleUpdate = (id) => {
        console.log(id);
        setUpdate((prevUpdate) => id);
    };
    const handleAddRound = (id, movement) => {
        console.log(movement);
        setAddRoundID((prevID) => id);
        setMovement((prevMov) => movement);
        addRoundToMovement(id, movement);
    };
    const updateClickOutsideBox = () => {
        console.log("Click outside div in test session card");
        setUpdate((prev) => !prev);
    };
    const currentDate = new Date();
    const options = {
        weekday: "short",
        month: "long",
        day: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    return (
        <Stack width="100%" position="relative" paddingBottom="70px">
            <Heading color="white">{formattedDate}</Heading>
            {workouts.map((s) => {
                return (
                    <Box>
                        {update === s.id ? (
                            <UpdateSession
                                updateChangeHandler={updateClickOutsideBox}
                                updateMode={() => setUpdate(null)}
                                refreshSessions={refreshSessions}
                                update={update}
                                addRounds={addRoundID === s.id}
                                addRoundID={addRoundID}
                            />
                        ) : (
                            <>
                            <Flex
                            padding="7px"
                            borderRadius="10px"
                            gap="7px"
                            justifyContent="space-between"
                            border="1px solid grey"
                            width="90%">
                                <Stack
                                    fontSize="xs"
                                >
                                    <Stack>
                                        <Text color="white">{" " + s.movement}</Text>
                                        {isLoading && addRoundID === s.id  && <LoadingSpinner text={"Adding round to movement"} />}
                                        {isDeleting && deleteRoundID === s.id && <LoadingSpinner text={"Deleting round"} />}
                                        {s.weight !== null &&
                                            s.weight !== undefined && (
                                                <Text color="white">
                                                    Weight: {s.weight}
                                                </Text>
                                            )}
                                        {s.reps && (
                                            <Text color="white">
                                                Reps:
                                                {" " + s.reps}
                                            </Text>
                                        )}
                                        {s.distance && (
                                            <Text color="white">
                                                Distance:
                                                {" " + s.distance}
                                            </Text>
                                        )}
                                        {s.time && (
                                            <Text color="white">
                                                Time:
                                                {" " + s.time}
                                            </Text>
                                        )}
                                        <Text color="white">
                                                Rounds:
                                                {" " + s.rounds}
                                            </Text>
                                    </Stack>
                                </Stack>
                                <Stack gap="7px" marginTop="5px">
                                    <Button
                                        color="white"
                                        borderRadius="50"
                                        fontSize="xs"
                                        onClick={() => handleDelete(s.id)}
                                        bg="red"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        color="white"
                                        borderRadius="50"
                                        fontSize="xs"
                                        onClick={() => handleUpdate(s.id)}
                                        bg="teal"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleAddRound(s.id, s.movement)
                                        }
                                        bg="blue.500"
                                        color="white"
                                        borderRadius="50"
                                        fontSize="xs"
                                    >
                                        +1 Round
                                    </Button>
                                </Stack>
                                </Flex>
                            </>
                        )}
                    </Box>
                );
            })}
        </Stack>
    );
};

export default ShowTodaysSession;
