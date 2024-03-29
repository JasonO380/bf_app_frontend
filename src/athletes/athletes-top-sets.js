import React from "react";
import {
    Box,
    Heading,
    Flex,
    Text,
    Stack
} from "@chakra-ui/react";
import CalculateTopSets from "./calculate-athletes-top-sets";
import CalculateDailyVolume from "./calculate-daily-volume";


const AthletesTopSets = (props) => {
    const session = props.session;

    return (
        <Box paddingBottom="70px">
            <Box>
                {session.map((s)=> {
                    const months = s.months;
                    return(
                        <React.Fragment>
                            {months.map((monthObj)=> {
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
                                                const topSets = CalculateTopSets(session);
                                                const totalVolume = CalculateDailyVolume(session)
                                                return (
                                                    <React.Fragment>
                                                    <Box
                                                        padding="7px"
                                                        borderRadius="10px"
                                                        border="1px solid grey"
                                                        width="90%">
                                                        <Stack>
                                                            <Text
                                                                fontSize="25px"
                                                                color="white"
                                                            >
                                                                {day}
                                                            </Text>
                                                            <Text color="white" fontSize="xs">Total volume: {totalVolume}</Text>
                                                        </Stack>
                                                        {topSets.map((s) => {
                                                            return (
                                                            <React.Fragment> 
                                                                    <Stack>
                                                                        <Text color="white" fontSize="xs">
                                                                            Movement:
                                                                            {" " + s.movement}
                                                                            {s.weight !== null && s.weight !== undefined && (
                                                                                        <Text color="white" fontSize="xs">
                                                                                            Weight: {s.weight}
                                                                                        </Text>
                                                                                    )}
                                                                            {s.reps && (
                                                                                <Text color="white" fontSize="xs">
                                                                                    Reps:
                                                                                    {" " + s.reps}
                                                                                </Text>
                                                                            )}
                                                                            {s.distance && (
                                                                                <Text color="white" fontSize="xs">
                                                                                    Distance:
                                                                                    {" " + s.distance}
                                                                                </Text>
                                                                            )}
                                                                            {s.time && (
                                                                                <Text color="white" fontSize="xs">
                                                                                    Time:
                                                                                    {" " + s.time}
                                                                                </Text>
                                                                            )}
                                                                        </Text>
                                                                    </Stack> 
                                                                </React.Fragment>
                                                                );
                                                        })};
                                                    </Box>    
                                                    </React.Fragment>
                                                );
                                            })}
                                        </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </Box>
        </Box>
    )
};

export default AthletesTopSets;