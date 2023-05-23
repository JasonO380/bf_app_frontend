import React from "react";
import {
    Box,
    Image,
    Flex,
    Button,
    Heading,
    Stack,
    Spacer,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import Beatrix from "../../../images/beatrix.jpeg";
import Food from "../../../images/healthy-food.jpeg";

const Tracking = () => {
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    return (
        <Box bg="#151414" position="relative" width="100%" paddingBottom="50px" mt={-1}>
            <Box width="95%" margin="auto">
            <Box marginTop={!isTabletOrAbove && "55px"} paddingTop={isTabletOrAbove && "75px"}>
                {isTabletOrAbove && (<Flex alignItems= "end">
                <Heading color="white">Tracking</Heading>
                <Text fontSize="xs" marginLeft="15px" color="white">Register for free to start tracking your progress</Text>
                </Flex>)}
                {!isTabletOrAbove && (
                    <Stack>
                    <Heading color="white">Tracking</Heading>
                    <Text fontSize="xs" marginLeft="15px" color="white">Register for free to start tracking your progress</Text>
                    </Stack>
                )}
            </Box>
            <Flex paddingTop="50px" justifyContent="center">
                <Stack width={isTabletOrAbove ? "50%" : "100%"}>
                    <Heading color="white">Macros</Heading>
                    <Text color="white" fontSize="xs">Log your protein, carb and fat intake</Text>
                    <Image alt="Picure of healthy food" src={Food} />
                </Stack>
                <Stack width={isTabletOrAbove ? "50%" : "100%"}>
                    <Heading color="white">Workouts</Heading>
                    <Text color="white" fontSize="xs">Log your exercises, reps and rounds</Text>
                    <Image src={Beatrix}  />
                </Stack>
            </Flex>
            </Box>
        </Box>
    );
};

export default Tracking;
