import React from "react";
import { Box, Image, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import me2 from "../../../images/intro-me2.jpeg";

const MobileServices = () => {
    return (
        <Box width="95%" margin="auto">
            <Box paddingTop="225px">
                <Heading color="white">Services</Heading>
            </Box>
            <Flex paddingTop="25px" gap={5} width="95%" margin="auto">
                <Image
                    boxShadow="10px 10px 5px black"
                    height="fit-content"
                    maxWidth="50%"
                    objectFit="contain"
                    src={me2}
                />
                <Stack>
                    <Heading fontSize="1rem" color="white">
                        One on One Training
                    </Heading>
                    <Text fontSize="xs" color="white">
                        In person training tailored to specific needs of client
                    </Text>
                    <Heading fontSize="1rem" color="white">
                        Online Training
                    </Heading>
                    <Text fontSize="xs" color="white">
                        For those who have a home gym and looking for a coach to
                        reach the next level
                    </Text>
                    <Heading fontSize="1rem" color="white">
                        Programming
                    </Heading>
                    <Text fontSize="xs" color="white">
                        Customized programs to fit your needs and goals
                    </Text>
                </Stack>
            </Flex>
        </Box>
    );
};

export default MobileServices;
