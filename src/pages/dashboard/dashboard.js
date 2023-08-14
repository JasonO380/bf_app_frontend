import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import ShowTodaysSession from "../../athletes/show-todays-session";
import useGetSessions from "../../http-requests/getSessions";
import GetGoogleSheets from "../../athletes/get-google-sheets";
import MonthlyWorkoutTotal from "./components/monthly-workout-total";
import GetAndAddTodaysMacros from "../../macros/get-and-add-todays-macros";
import SessionCard from "../../shared/sessions-card";
import ShowAthleteSessionsHistory from "../../athletes/show-athletes-history-sessions";
import EditMacros from "../../macros/editMacros";
import AddMacros from "../../macros/addMacros";
import GetMacros from "../../macros/getMacros";
import { AnimatePresence, motion } from "framer-motion";
import { LoginRegisterContext } from "../../authentication/login-register-context";

const Dashboard = () => {
    const auth = useContext(LoginRegisterContext);
    const [refreshSessions, setRefreshSessions] = useState(false);
    const user = auth.userID;
    const name = auth.userName;
    const navigate = useNavigate();
    console.log(user);
    const [view, setView] = useState("default");
    const { workouts, sessionsLoading } = useGetSessions(user, 'today', refreshSessions);
    console.log(workouts);
    const [showMacros, setShowMacros] = useState(false);
    const [showWorkoutEdit, setShowWorkoutEdit] = useState(false);
    const [showMacrosEdit, setShowMacrosEdit] = useState(false);
    const [isDefaultScreen, setIsDefaultScreen] = useState(true);
    const [currentDaysWorkouts, setCurrentDaysWorkouts] = useState([]);
    const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);
    const [todaysSession, setTodaysSession] = useState([]);
    const MotionBox = motion(Box);
    const pageVariants = {
        initial: {
            opacity: 0,
            x: "-100%",
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            y: "-100%",
        },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.4,
    };

    const handleCloseClick = () => {
        setView("default");
        // setShowAddAthleteSession(false);
        // setShowWorkoutHistory(false);
        // setShowMacros(false);
        // setShowWorkoutEdit(false);
        // setShowMacrosEdit(false);
        // setIsDefaultScreen(true);
    };

    const handleStartWorkoutClick = () => {
        setView("showAddAthleteSession");
        // handleCloseClick();
        // setShowAddAthleteSession(true);
        // setIsDefaultScreen(false);
    };

    const handleViewWorkoutHistoryClick = () => {
        setView("showWorkoutHistory");
        // handleCloseClick();
        // setShowWorkoutHistory(true);
        // setIsDefaultScreen(false);
    };

    const handleMacrosClick = () => {
        setView("showMacros");
        // handleCloseClick();
        // setShowMacros(true);
        // setIsDefaultScreen(false);
    };

    const handleEditWorkoutsClick = () => {
        setView("showWorkoutEdit");
        // handleCloseClick();
        // setShowWorkoutEdit(true);
        // setIsDefaultScreen(false);
    };

    const handleEditMacrosClick = () => {
        setView("showMacrosEdit");
        // handleCloseClick();
        // setShowMacrosEdit(true);
        // setIsDefaultScreen(false);
    };

    const handleRefreshSessions = () => {
        console.log("handleRefreshSessions called");
        setRefreshSessions(prev => !prev);
    }

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

    useEffect(() => {
        console.log("Dashboard mounted");
        return () => {
            console.log("Dashboard will unmount");
        };
    }, []);

    return (
        <Box
            width="100%"
            bottom="0"
            position="relative"
            height="100vh"
            bg="#151414"
            overflowY="auto"
        >
            <Flex justifyContent="end">
                <Button
                    mt={4}
                    mr={4}
                    onClick={() => navigate("/")}
                    bg="red"
                    borderRadius="50px"
                    color="white"
                    fontSize="xs"
                >
                    Home
                </Button>
            </Flex>
            <Box p="15px">
                <Box>
                    <Heading as="h1" size="lg" color="white">
                        Dashboard
                    </Heading>
                    <Text color="white">Welcome, {name}</Text>
                </Box>
                {view === "default" && (
                    <>
                        <MonthlyWorkoutTotal />
                        <GetGoogleSheets />
                    </>
                )}
            </Box>
            <Box
                position="fixed"
                bottom="0"
                width="100%"
                bg="rgba(0, 0, 0, 0.4)"
                backdropFilter="blur(10px)"
                zIndex="1"
                display="flex"
                justifyContent="center"
            >
                <Flex p="10px" marginBottom="15px">
                    <Button
                        onClick={handleStartWorkoutClick}
                        borderRadius="50px"
                        colorScheme="blue"
                        mr="4"
                        fontSize="xs"
                    >
                        Start workout
                    </Button>
                    <Button
                        onClick={handleViewWorkoutHistoryClick}
                        borderRadius="50px"
                        colorScheme="blue"
                        mr="4"
                        fontSize="xs"
                    >
                        History
                    </Button>
                    <Button
                        onClick={handleMacrosClick}
                        borderRadius="50px"
                        colorScheme="blue"
                        fontSize="xs"
                    >
                        Add Macros
                    </Button>
                    <Spacer />
                </Flex>
            </Box>
            {view === "showMacros" && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={view === "showMacros" ? "visible" : "hidden"}
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
                    </Box>
                </motion.div>
            )}
            {view === "showAddAthleteSession" && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={
                        view === "showAddAthleteSession" ? "visible" : "hidden"
                    }
                >
                    <Box p="10px">
                        <Button
                            borderRadius="50px"
                            colorScheme="red"
                            onClick={handleCloseClick}
                            fontSize="xs"
                        >
                            Close
                        </Button>
                        <AddMovement refreshSessions={handleRefreshSessions} workouts={workouts} />
                        
                    </Box>
                </motion.div>
            )}
            {view === "showWorkoutHistory" && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={
                        view === "showWorkoutHistory" ? "visible" : "hidden"
                    }
                >
                    <Box p="10px">
                        <Flex justifyContent="center" gap="10px">
                            <Button
                                borderRadius="50px"
                                colorScheme="red"
                                onClick={handleCloseClick}
                                fontSize="xs"
                            >
                                Close
                            </Button>
                            <Button
                                borderRadius="50px"
                                colorScheme="blue"
                                onClick={handleEditWorkoutsClick}
                                fontSize="xs"
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
                                fontSize="xs"
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
            {view === "showWorkoutEdit" && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={view === "showWorkoutEdit" ? "visible" : "hidden"}
                >
                    <Box p="10px">
                        <Flex justifyContent="center" gap="10px">
                            <Button
                                borderRadius="50px"
                                colorScheme="red"
                                onClick={handleCloseClick}
                                fontSize="xs"
                            >
                                Close
                            </Button>
                            <Button
                                borderRadius="50px"
                                colorScheme="blue"
                                onClick={handleEditMacrosClick}
                                fontSize="xs"
                            >
                                <Stack spacing={0} alignItems="center">
                                    <Box as="span">Edit</Box>
                                    <Box as="span">Macros</Box>
                                </Stack>
                            </Button>
                        </Flex>
                        <ShowAthleteSessionsHistory
                            edit={showWorkoutEdit}
                            user={user}
                        />
                    </Box>
                </motion.div>
            )}
            {view === "showMacrosEdit" && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={view === "showMacrosEdit" ? "visible" : "hidden"}
                >
                    <Box p="10px">
                        <Flex justifyContent="center" gap="10px">
                            <Button
                                borderRadius="50px"
                                colorScheme="red"
                                onClick={handleCloseClick}
                                fontSize="xs"
                            >
                                Close
                            </Button>
                            <Button
                                borderRadius="50px"
                                colorScheme="blue"
                                onClick={handleEditWorkoutsClick}
                                fontSize="xs"
                            >
                                <Stack spacing={0} alignItems="center">
                                    <Box as="span">Edit</Box>
                                    <Box as="span">Workouts</Box>
                                </Stack>
                            </Button>
                        </Flex>
                        <EditMacros />
                    </Box>
                </motion.div>
            )}
        </Box>
    );
};

export default Dashboard;
