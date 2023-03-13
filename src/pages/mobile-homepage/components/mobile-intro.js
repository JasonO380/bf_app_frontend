import React from "react";
import me from "../../../images/Intro-me.jpeg";
import { Box, Image, Flex, Heading, Text } from "@chakra-ui/react";

const MobileIntro = () => {
    return (
        <React.Fragment>
            <Box
                left="50%"
                transform="translateX(-50%)"
                width="90%"
                position="absolute"
            >
                <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={2}
                    background="linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)"
                    borderRadius="20px"
                />
                <Image maxWidth="85%" borderRadius="20px" src={me} />
            </Box>
            <Flex
                position="relative"
                margin="auto"
                justifyContent="space-between"
                width="90%"
            >
                <Box
                    justifyContent="flex-start"
                    zIndex="3"
                    marginLeft="5px"
                    marginTop="5px"
                >
                    <Text fontSize="xs" color="white">
                        Brad Frech
                    </Text>
                    <Text fontSize="xs" color="white">
                        Photography
                    </Text>
                </Box>
                <Box zIndex="3">
                    <Heading color="white">Lean</Heading>
                    <Heading color="red">Strong</Heading>
                    <Heading color="white">Mobile</Heading>
                </Box>
            </Flex>
        </React.Fragment>
    );
};

export default MobileIntro;
