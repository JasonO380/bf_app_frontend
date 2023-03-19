import React, { useState } from "react";
import { Box, Image, Flex, Button, Heading, Stack, Spacer } from "@chakra-ui/react";
import AddAthleteSession from "../../athletes/add-athlete-session";
import { motion } from "framer-motion";

const Dashboard = () => {
    const [showAddAthleteSession, setShowAddAthleteSession] = useState(false);
    const handleStartWorkoutClick = () => {
        setShowAddAthleteSession(true);
    };
    const handleCloseClick = () => {
        setShowAddAthleteSession(false);
    };
    const variants = {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
    };

    return (
        <Box width="100%" bg="#151414">
            <Box p="15px">
                <Heading as="h1" size="lg" color="white">
                    Dashboard
                </Heading>
            </Box>
            <Box
                position="fixed"
                bottom="0"
                width="100%"
                bg="rgba(0, 0, 0, 0.4)"
                backdropFilter="blur(10px)"
                zIndex="1"
            >
                <Flex p="10px">
                    <Button onClick={handleStartWorkoutClick} borderRadius="50px" colorScheme="blue" mr="4">
                        Start workout
                    </Button>
                    <Button borderRadius="50px" colorScheme="blue" mr="4">
                        History
                    </Button>
                    <Button borderRadius="50px" colorScheme="blue">
                        Add Macros
                    </Button>
                    <Spacer />
                </Flex>
            </Box>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={showAddAthleteSession ? "visible" : "hidden"}
            >
                <Box p="15px">
                    <Button borderRadius="50px" colorScheme="red" onClick={handleCloseClick}>
                        Close
                    </Button>
                    <AddAthleteSession />
                </Box>
            </motion.div>

        </Box>
    )
};

export default Dashboard;

//bg="151414"