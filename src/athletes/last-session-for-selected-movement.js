import React from "react";
import { Box, Text, Stack, Heading } from "@chakra-ui/react";

const LastSessionForSelectedMovement = ({ selectedMovement, allSessions }) => {
    console.log("Selected movement LastSession component: ", selectedMovement);
    let previousSessionsForMovement = [];
    let currentDaysSession = [];
    const findRecentSessions = (allSessions, selectedMovement) => {
        const date = new Date();
        const currentDay = date.getDate();
        for (let month of allSessions) {
            for (let days of month.months) {
                for (let dayData of days.days) {
                    console.log("dayData in finRecentSessions: ", dayData)
                    const movementsPreviousSession = dayData.sessions.filter((s) => {
                        return s.movement === selectedMovement[0];
                    });
                    console.log("findRecentSessions function: ", movementsPreviousSession);
                    if (movementsPreviousSession.length > 0) {
                        if(dayData.day === currentDay){
                            currentDaysSession = movementsPreviousSession
                        } else {
                            previousSessionsForMovement = movementsPreviousSession;
                        }
                        // break; // Found the most recent day with the movement, so break out of loop.
                    }
                }
                // if (recentSessionsForMovement.length > 0) break; // Break out of outer loop
            }
            // if (recentSessionsForMovement.length > 0) break; // Break out of outermost loop
        }
        return previousSessionsForMovement;
    };
    findRecentSessions(allSessions, selectedMovement);

    if (previousSessionsForMovement.length > 0) {
        return (
            <Box>
                <Heading color="white">Previous session</Heading>
                <Text color="white" fontSize="large" fontWeight="bold">
                    Movement: {selectedMovement}
                </Text>
                {previousSessionsForMovement.map((s, index) => {
                    return (
                        <Stack
                            marginTop="7px"
                            padding="7px"
                            borderRadius="10px"
                            border="1px solid grey"
                            width="90%"
                            fontSize="xs"
                        >
                            {s.weight && (
                                <Text color="white">Weight: {s.weight}</Text>
                            )}
                            {s.reps && (
                                <Text color="white">Reps: {s.reps}</Text>
                            )}
                            {s.time && (
                                <Text color="white">Time: {s.time}</Text>
                            )}
                            {s.distance && (
                                <Text color="white">
                                    Distance: {s.distance}
                                </Text>
                            )}
                            {s.rounds && (
                                <Text color="white">Rounds: {s.rounds}</Text>
                            )}
                        </Stack>
                    );
                })}
            </Box>
        );
    }
};

export default LastSessionForSelectedMovement;
