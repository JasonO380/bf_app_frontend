import React from "react";
import logo from "../../../images/logo.jpeg";
import me from "../../../images/Intro-me.jpeg";
import { useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Box, Image, Flex, Button, Heading, Stack, Spacer, Text } from "@chakra-ui/react";

const Intro2 = () => {
    return (
        <React.Fragment>
            <Box
                bg="#151414" 
                position="absolute"
                width="100%"
                height="100%"
                margin="auto"
                overflow="hidden"
                >
                    <Box height="100%" width="95%" margin="auto">
                    <Box
                        position="absolute"
                        height="100%"
                        width="95%"
                        left= "50%"
                        transform= "translateX(-50%)"
                        zIndex={1}
                        background="linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)"
                        borderRadius="20px"
                    />
                    <Image
                        borderRadius="20px"
                        margin="auto"
                        height="100%"
                        width="100%"
                        objectFit="cover"
                        objectPosition="center top"
                        src={me}
                        zIndex={2}
                    />
                    </Box>
                </Box>
                <Flex height="100%" position="relative" width="95%" margin="auto">
                <Box zIndex="3" >
                    <Image mt={8} marginLeft="12vw" borderRadius="100%" height="6rem" src={logo} />
                </Box>
                <Spacer />
                <Stack
                zIndex="3"
                marginRight="12vw" 
                spacing={-3}>
                    <Heading fontSize="4rem" padding={0} mt={0} color="white">
                        Lean
                    </Heading>
                    <Heading fontSize="4rem" padding={0} mt={0} color="red">
                        Strong
                    </Heading>
                    <Heading fontSize="4rem" padding={0} mt={0} color="white">
                        Mobile
                    </Heading>
                    <Text color="white">
                        Photo credit Bradley French photography
                    </Text>
                </Stack>
            </Flex>
        </React.Fragment>
    );
};

export default Intro2;
