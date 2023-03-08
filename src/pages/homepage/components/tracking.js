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
} from "@chakra-ui/react";
import Beatrix from "../../../images/beatrix.jpeg";

const Tracking = () => {
    return (
        <Box bg="#151414" position="relative" width="100%" paddingBottom="50px">
            <Box width="95%" margin="auto">
            <Box paddingTop="75px">
                <Flex alignItems="baseline">
                <Heading color="white">Tracking</Heading>
                <Text marginLeft="15px" color="white">Register for free to start tracking your progress</Text>
                </Flex>
            </Box>
            <Flex paddingTop="50px" justifyContent="center">
                <Stack width="50%">
                    <Heading color="white">Macros</Heading>
                    <Text color="white">Keep track of your protein, carb and fat intake</Text>
                    <Image alt="Picure of healthy food" src="https://www.communitydoctor.com.ng/wp-content/uploads/2020/11/shutterstock_300553067-705x470-1.jpg" />
                </Stack>
                <Stack width="50%">
                    <Heading color="white">Workouts</Heading>
                    <Text color="white">Log your exercises, reps and rounds</Text>
                    <Image src={Beatrix}  />
                </Stack>
            </Flex>
            </Box>
        </Box>
    );
};

export default Tracking;
