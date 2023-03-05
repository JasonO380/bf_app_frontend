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
import me2 from "../../../images/intro-me2.jpeg";
import me3 from "../../../images/intro-me3.jpeg";
import weights from "../../../images/weights1.jpeg";
import weights2 from "../../../images/weights2.jpeg"

const Services = () => {
    return (
        <Box
            mt={-1}
            bg="#151414"
            position="relative"
            // height="100%"
            width="100%"
        >
            <Box mt={100} margin="auto" width="95%" justify="space-between">
                <Heading paddingTop="100px" fontSize="3rem" color="white">
                    Services
                </Heading>
                <Flex mt={75} justify="space-between">
                    <Stack width="27%">
                        <Image
                        boxShadow="10px 10px 5px black"
                        maxH="100%"
                        maxW="100%"
                        src={me2} />
                        <Heading fontSize="1.5rem" color="white">
                            Personal Training
                        </Heading>
                        <Text fontSize="xs" color="white">
                            In person training tailored to specific needs of
                            client
                        </Text>
                    </Stack>
                    <Stack width="27%">
                        <Image
                        boxShadow="10px 10px 5px black"
                        maxH="100%"
                        maxW="100%"
                        filter="grayscale(100%) brightness(90%) contrast(150%)"
                        src={weights2} />
                        <Heading fontSize="1.5rem" color="white">
                            Online Training
                        </Heading>
                        <Text fontSize="xs" color="white">
                            For those who have a home gym and looking for a
                            coach to reach the next level
                        </Text>
                    </Stack>
                    <Stack width="27%">
                        <Image
                        boxShadow="10px 10px 5px black"
                        maxH="100%"
                        maxW="100%"
                        filter="grayscale(100%) brightness(80%) contrast(150%)"
                        src={weights} />
                        <Heading fontSize="1.5rem" color="white">
                            Programming
                        </Heading>
                        <Text fontSize="xs" color="white">
                            If you are looking for programming to follow. I can
                            provide workout cycles to hit your goals.
                        </Text>
                    </Stack>
                </Flex>
            </Box>
        </Box>
    );
};

export default Services;
