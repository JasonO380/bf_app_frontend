import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Image,
    Flex,
    Button,
    Heading,
    Text,
    Stack,
    Spacer,
} from "@chakra-ui/react";
import AddAthleteSession from "../../athletes/add-athlete-session";
import GetAthletesSessions from "../../athletes/get-athletes-sessions";
import ShowAthleteSessionsHistory from "../../athletes/show-athletes-history-sessions";
import { motion } from "framer-motion";
import { LoginRegisterContext } from "../../authentication/login-register-context";

const Dashboard = () => {
    const auth = useContext(LoginRegisterContext);
    console.log(auth);
    const user = auth.userID;
    const name = auth.userName;
    console.log(user);
    const [showAddAthleteSession, setShowAddAthleteSession] = useState(false);
    const [currentDaysWorkouts, setCurrentDaysWorkouts] = useState([]);
    const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);
    const [allWorkouts, setAllWorkouts] = useState([]);

    const handleStartWorkoutClick = () => {
        if (showWorkoutHistory) {
            setShowWorkoutHistory(false);
            setShowAddAthleteSession(true);
        } else {
            setShowAddAthleteSession(true);
        }
    };
    const handleCloseClick = () => {
        setShowAddAthleteSession(false);
        setShowWorkoutHistory(false);
    };
    const handleViewWorkoutHistoryClick = () => {
        if (showAddAthleteSession) {
            setShowAddAthleteSession(false);
            setShowWorkoutHistory(true);
        } else {
            setShowWorkoutHistory(true);
        }
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
                duration: 0.3,
            },
        },
    };

    return (
        <Box width="100%" bottom="0" position="fixed" height="100%" bg="#151414" overflowY="auto">
            <Box p="15px">
                <Heading as="h1" size="lg" color="white">
                    Dashboard
                </Heading>
                <Text color="white">
                    Welcome, {name}
                </Text>
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
                    <Button
                        onClick={handleStartWorkoutClick}
                        borderRadius="50px"
                        colorScheme="blue"
                        mr="4"
                    >
                        Start workout
                    </Button>
                    <Button
                        onClick={handleViewWorkoutHistoryClick}
                        borderRadius="50px"
                        colorScheme="blue"
                        mr="4"
                    >
                        History
                    </Button>
                    <Button borderRadius="50px" colorScheme="blue">
                        Add Macros
                    </Button>
                    <Spacer />
                </Flex>
            </Box>
            {showAddAthleteSession && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={showAddAthleteSession ? "visible" : "hidden"}
                >
                    <Box p="15px">
                        <Button
                            borderRadius="50px"
                            colorScheme="red"
                            onClick={handleCloseClick}
                        >
                            Close
                        </Button>
                        <AddAthleteSession />
                    </Box>
                </motion.div>
            )}
            {showWorkoutHistory && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={showWorkoutHistory ? "visible" : "hidden"}
                >
                    <Box p="15px">
                        <Button
                            borderRadius="50px"
                            colorScheme="red"
                            onClick={handleCloseClick}
                        >
                            Close
                        </Button>
                        <ShowAthleteSessionsHistory user={user} />
                    </Box>
                </motion.div>
            )}
        </Box>
    );
};

export default Dashboard;

//bg="151414"
