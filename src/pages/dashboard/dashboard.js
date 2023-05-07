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
import AddMovement from "../../athletes/add-movement";
import AddAthleteSession from "../../athletes/add-athlete-session";
import WeeklyWorkoutTotal from "./components/weekly-workout-total";
import GetAndAddTodaysMacros from "../../macros/get-and-add-todays-macros";
import ShowAthleteSessionsHistory from "../../athletes/show-athletes-history-sessions";
import AddMacros from "../../macros/addMacros";
import GetMacros from "../../macros/getMacros";
import { motion } from "framer-motion";
import { LoginRegisterContext } from "../../authentication/login-register-context";

const Dashboard = () => {
    const auth = useContext(LoginRegisterContext);
    console.log(auth);
    const user = auth.userID;
    const name = auth.userName;
    console.log(user);
    const [showAddAthleteSession, setShowAddAthleteSession] = useState(false);
    const [showMacros, setShowMacros] = useState(false);
    const [showWorkoutEdit, setShowWorkoutEdit] = useState(false);
    const [showMacrosEdit, setShowMacrosEdit] = useState(false);
    const [currentDaysWorkouts, setCurrentDaysWorkouts] = useState([]);
    const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);
    const [allWorkouts, setAllWorkouts] = useState([]);

    const handleCloseClick = () => {
        setShowAddAthleteSession(false);
        setShowWorkoutHistory(false);
        setShowMacros(false);
        setShowWorkoutEdit(false);
        setShowMacrosEdit(false);
    };

    const handleStartWorkoutClick = () => {
        handleCloseClick();
        setShowAddAthleteSession(true);
    };

    const handleViewWorkoutHistoryClick = () => {
        handleCloseClick();
        setShowWorkoutHistory(true);
    };

    const handleMacrosClick = () => {
        handleCloseClick();
        setShowMacros(true);
    };

    const handleEditWorkoutsClick = () => {
        handleCloseClick();
        setShowWorkoutEdit(true);
    };

    const handleEditMacrosClick = () => {
        handleCloseClick();
        setShowMacrosEdit(true);
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
        <Box
            width="100%"
            bottom="0"
            position="fixed"
            height="100%"
            bg="#151414"
            overflowY="auto"
        >
            <Box p="15px">
                <Box>
                    <Heading as="h1" size="lg" color="white">
                        Dashboard
                    </Heading>
                    <Text color="white">Welcome, {name}</Text>
                </Box>
                <WeeklyWorkoutTotal />
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
                    <Button
                        onClick={handleMacrosClick}
                        borderRadius="50px"
                        colorScheme="blue"
                    >
                        Add Macros
                    </Button>
                    <Spacer />
                </Flex>
            </Box>
            {showMacros && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={showMacros ? "visible" : "hidden"}
                >
                    <Box p="10px">
                        <Button
                            borderRadius="50px"
                            colorScheme="red"
                            onClick={handleCloseClick}
                        >
                            Close
                        </Button>
                        <GetAndAddTodaysMacros />
                        {/* <AddMacros /> */}
                    </Box>
                </motion.div>
            )}
            {showAddAthleteSession && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={showAddAthleteSession ? "visible" : "hidden"}
                >
                    <Box p="10px">
                        <Button
                            borderRadius="50px"
                            colorScheme="red"
                            onClick={handleCloseClick}
                        >
                            Close
                        </Button>
                        <AddMovement />
                        {/* <AddAthleteSession /> */}
                    </Box>
                </motion.div>
            )}
            {showWorkoutHistory && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={showWorkoutHistory ? "visible" : "hidden"}
                >
                    <Box p="10px">
                        <Flex
                        justifyContent="center" 
                        gap="10px">
                            <Button
                                borderRadius="50px"
                                colorScheme="red"
                                onClick={handleCloseClick}
                            >
                                Close
                            </Button>
                            <Button
                                borderRadius="50px"
                                colorScheme="blue"
                                onClick={handleEditWorkoutsClick}
                            >
                                <Stack spacing={0} alignItems="center">
                                    <Box as="span">Edit</Box>
                                    <Box as="span">Workouts</Box>
                                </Stack>
                            </Button>
                            <Button
                                borderRadius="50px"
                                colorScheme="blue"
                                onClick={handleEditMacrosClick}
                            >
                                <Stack spacing={0} alignItems="center">
                                    <Box as="span">Edit</Box>
                                    <Box as="span">Macros</Box>
                                </Stack>
                            </Button>
                        </Flex>
                        <GetMacros />
                        <ShowAthleteSessionsHistory user={user} />
                    </Box>
                </motion.div>
            )}
            {showWorkoutEdit && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={showWorkoutEdit ? "visible" : "hidden"}
                >
                    <Box p="10px">
                        <Flex
                        justifyContent="center" 
                        gap="10px">
                            <Button
                                borderRadius="50px"
                                colorScheme="red"
                                onClick={handleCloseClick}
                            >
                                Close
                            </Button>
                            <Button
                                borderRadius="50px"
                                colorScheme="blue"
                                onClick={handleEditMacrosClick}
                            >
                                <Stack spacing={0} alignItems="center">
                                    <Box as="span">Edit</Box>
                                    <Box as="span">Macros</Box>
                                </Stack>
                            </Button>
                        </Flex>
                        <ShowAthleteSessionsHistory edit={showWorkoutEdit}  user={user} />
                    </Box>
                </motion.div>
            )}
        </Box>
    );
};

export default Dashboard;

//bg="151414"
