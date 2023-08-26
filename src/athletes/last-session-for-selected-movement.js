import React, { useEffect } from "react";
import { Box, Text, Stack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LastSessionForSelectedMovement = ({ selectedMovement, allSessions }) => {
    let previousSessionsForMovement = [];
    const containerVariants = {
        hidden: { opacity: 0, y: "-20px" },
        visible: {
            opacity: 1,
            y: "0px",
            transition: {
                when: "beforeChildren",
                staggerChildren: .3,
            },
        },
        exit: { opacity: 0, y: '-20px', transition: { delay: 1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: "-20px" },
        visible: { opacity: 1, y: "0px" },
        exit: { opacity: 0, y: '-20px', transition: { staggerChildren: .9 } }
    };
    const MotionBox = motion(Box);
    const MotionStack = motion(Stack)
    const findRecentSessions = (allSessions, selectedMovement) => {
        let found = false;
        const date = new Date();
        const currentDateString = date.toISOString().split("T")[0];
        for (let month of allSessions) {
            if (found) break;
            for (let days of month.months) {
                if (found) break;
                for (let dayData of days.days) {
                    const movementsPreviousSession = dayData.sessions.filter(
                        (s) => {
                            return s.movement === selectedMovement[0];
                        }
                    );
                    if (movementsPreviousSession.length > 0) {
                        // Convert dayData.date to simplified format "YYYY-MM-DD"
                        const dayDataDateString = new Date(dayData.date)
                            .toISOString()
                            .split("T")[0];
                        if (dayDataDateString !== currentDateString) {
                            previousSessionsForMovement =
                                movementsPreviousSession;
                            found = true;
                            break; // break out of the loop when the previousMovementsSession is found
                        }
                    }
                }
            }
        }
        return previousSessionsForMovement;
    };
    findRecentSessions(allSessions, selectedMovement);

    if (previousSessionsForMovement.length > 0) {
        return (
            <MotionBox initial="hidden" animate="visible" variants={containerVariants}>
                <Heading color="white">Previous session</Heading>
                <Text color="white" fontSize="large" fontWeight="bold">
                    {selectedMovement}
                </Text>
                {previousSessionsForMovement.map((s, index) => {
                    return (
                        <MotionStack
                            marginTop="7px"
                            padding="7px"
                            borderRadius="10px"
                            border="1px solid grey"
                            width="90%"
                            fontSize="xs"
                            variants={itemVariants}
                            key={index}
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
                        </MotionStack>
                    );
                })}
            </MotionBox>
        );
    }
};

export default LastSessionForSelectedMovement;
