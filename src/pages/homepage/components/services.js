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

const Services = () => {
    return (
        <Box
            mt={-1}
            bg="#151414"
            position="relative"
            height="100%"
            width="100%"
        >
            <Box mt={100} margin="auto" width="95%" justify="space-between">
                <Heading paddingTop="100px" fontSize="3rem" color="white">
                    Services
                </Heading>
                <Flex mt={75} justify="space-between">
                    <Stack width="27%">
                        <Heading fontSize="1.5rem" color="white">
                            Personal Training
                        </Heading>
                        <Text fontSize="xs" color="white">
                            In person training tailored to specific needs of
                            client
                        </Text>
                    </Stack>
                    <Stack width="27%">
                        <Heading fontSize="1.5rem" color="white">
                            Online Training
                        </Heading>
                        <Text fontSize="xs" color="white">
                            For those who have a home gym and looking for a
                            coach to reach the next level
                        </Text>
                    </Stack>
                    <Stack width="27%">
                        <Heading fontSize="1.5rem" color="white">
                            Programming
                        </Heading>
                        <Text fontSize="xs" color="white">
                            If you are looking for programming to follow. I cna
                            provide workout cycles to hit your goals.
                        </Text>
                    </Stack>
                </Flex>
            </Box>
        </Box>
    );
};

export default Services;
