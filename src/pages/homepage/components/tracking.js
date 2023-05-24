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
    useMediaQuery,
} from "@chakra-ui/react";
import Beatrix from "../../../images/beatrix.jpeg";
import Food from "../../../images/healthy-food.jpeg";

const Tracking = () => {
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    return (
        <Box
            bg="#151414"
            position="relative"
            width="100%"
            paddingBottom="50px"
            mt={-1}
        >
            <Box width="95%" margin="auto">
                <Box
                    marginTop={!isTabletOrAbove && "55px"}
                    paddingTop={isTabletOrAbove && "75px"}
                >
                    <Stack>
                        <Heading color="white">Tracking</Heading>
                        <Text fontSize="xs" marginLeft="15px" color="white">
                            Register for free to start tracking your progress.
                            No email required. For password recovery you will
                            need an email to recover lost passwords when a
                            password recovery option is added to the site.
                        </Text>
                    </Stack>
                </Box>
                <Flex paddingTop="50px" justifyContent="center">
                    <Stack
                        alignItems="flex-start"
                        width={isTabletOrAbove ? "50%" : "100%"}
                    >
                        <Heading color="white">Macros</Heading>
                        <Text color="white" fontSize="xs">
                            Log your protein, carb and fat intake. Charts for
                            analytics coming soon.
                        </Text>
                        <Image
                            height={isTabletOrAbove ? "400px" : "125px"}
                            objectFit="contain"
                            alt="Picture of healthy food"
                            src={Food}
                        />
                    </Stack>
                    <Stack
                        alignItems="flex-start"
                        width={isTabletOrAbove ? "50%" : "100%"}
                    >
                        <Heading color="white">Workouts</Heading>
                        <Text color="white" fontSize="xs">
                            Log your exercises, reps and rounds. Charts for
                            workout analytics coming soon.
                        </Text>
                        <Image
                            height={isTabletOrAbove ? "400px" : "125px"}
                            objectFit="contain"
                            alt="Pic of barbell racked"
                            src={Beatrix}
                        />
                    </Stack>
                </Flex>
            </Box>
        </Box>
    );
};

export default Tracking;
