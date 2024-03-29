import React, { useState, useEffect, useContext } from "react";
import { Box, Stack, Flex, Text, Heading } from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import LoadingSpinner from "../shared/loading-spinner";
import CalculateTopSets from "./calculate-athletes-top-sets";
import CalculateDailyVolume from "./calculate-daily-volume";

const ShowWorkoutsByWeek = ({user}) => {
    let allSessions;
    const auth = useContext(LoginRegisterContext);
    const [allWorkouts, setAllWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getSessions = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/usersworkoutsweekly/${user}`,
                // `http://localhost:5000/api/users/${user}`, keep this here for testing purposes for now
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            allSessions = responseData.sessions
            setAllWorkouts(allSessions);
        } catch (err) {}
        setIsLoading(false)
    };

    useEffect(() => {
        getSessions();
        console.log(auth.userID);
    }, []);

    if(isLoading){
        return <LoadingSpinner text={"Fetching your requested data"} />
    }

    return (
        <Box paddingBottom="70px">
            <Box width="90%">
                {allWorkouts.length > 0 && allWorkouts.map((s) => {
                    const months = s.months;
                    return (
                        <React.Fragment>
                            {months.map((monthObj) => {
                                const weeks = monthObj.weeks; 
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
                                        {weeks.map((week) => {
                                            // Now we map over weeks
                                            return (
                                                <Box
                                                display="grid"
                                                gridTemplateColumns="repeat(7, 1fr)"
                                                gap="1rem" 
                                                overflowX="auto"
                                                >
                                                    {" "}
                                                    {/* Flex container to display days in a row */}

                                                    {week.filter(dayObj => dayObj !== null).map((dayObj) => {
                                                        const day =  dayObj.day;
                                                        const dayOfWeek = dayObj.dayOfWeek;
                                                        const session =
                                                            dayObj.sessions;
                                                        const topSets =
                                                            CalculateTopSets(
                                                                session
                                                            );
                                                        const totalVolume =
                                                            CalculateDailyVolume(
                                                                session
                                                            );
                                                        return (
                                                            <Box
                                                                padding="7px"
                                                                borderRadius="10px"
                                                                border="1px solid grey"
                                                                width="300px"
                                                                mt="1rem"
                                                            >
                                                                <Stack>
                                                                    <Text
                                                                        fontSize="25px"
                                                                        color="white"
                                                                    >
                                                                        {dayOfWeek} {day}
                                                                    </Text>
                                                                    <Text
                                                                        color="white"
                                                                        fontSize="xs"
                                                                    >
                                                                        Total
                                                                        volume:{" "}
                                                                        {
                                                                            totalVolume
                                                                        }
                                                                    </Text>
                                                                </Stack>
                                                                {topSets && topSets.map(
                                                                    (s) => {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <Stack>
                                                                                    <Text
                                                                                        color="white"
                                                                                        fontSize="xs"
                                                                                        whiteSpace="pre-wrap"
                                                                                    >
                                                                                        Movement:
                                                                                        {" " +
                                                                                            s.movement}
                                                                                        {s.weight !==
                                                                                            null &&
                                                                                            s.weight !==
                                                                                                undefined && (
                                                                                                <Text
                                                                                                    color="white"
                                                                                                    fontSize="xs"
                                                                                                >
                                                                                                    Weight:{" "}
                                                                                                    {
                                                                                                        s.weight
                                                                                                    }
                                                                                                </Text>
                                                                                            )}
                                                                                        {s.reps && (
                                                                                            <Text
                                                                                                color="white"
                                                                                                fontSize="xs"
                                                                                            >
                                                                                                Reps:
                                                                                                {" " +
                                                                                                    s.reps}
                                                                                            </Text>
                                                                                        )}
                                                                                        {s.distance && (
                                                                                            <Text
                                                                                                color="white"
                                                                                                fontSize="xs"
                                                                                            >
                                                                                                Distance:
                                                                                                {" " +
                                                                                                    s.distance}
                                                                                            </Text>
                                                                                        )}
                                                                                        {s.time && (
                                                                                            <Text
                                                                                                color="white"
                                                                                                fontSize="xs"
                                                                                            >
                                                                                                Time:
                                                                                                {" " +
                                                                                                    s.time}
                                                                                            </Text>
                                                                                        )}
                                                                                    </Text>
                                                                                </Stack>
                                                                            </React.Fragment>
                                                                        );
                                                                    }
                                                                )}
                                                                ;
                                                            </Box>
                                                        );
                                                    })}

                                                </Box>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ShowWorkoutsByWeek;
