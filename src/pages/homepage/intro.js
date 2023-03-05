import React from "react";
import logo from "../../images/logo.jpeg";
import me from "../../images/Intro-me.jpeg";
import { useMediaQuery } from "@chakra-ui/react";
import Intro2 from "./components/intro2";
import Description from "./components/description";
import Services from "./components/services";
import { Link } from "react-router-dom";
import { Box, Image, Flex, Button, Heading, Stack, Spacer } from "@chakra-ui/react";

const Intro = () => {
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    return (
        <React.Fragment>
            <Box bg="#151414" height={isTabletOrAbove ? "100vh" : "100vh"}>
            <Flex width="95%" margin="auto">
                <Image marginBottom={5} marginTop={5}  borderRadius="100%" height="5rem" src={logo} />
                <Spacer />
                <Flex
                    align="end"
                    // justify="space-between"
                    // mt="auto"
                    // mb="10px"
                    margin="auto"
                    px="50px"
                >
                    <Button
                        borderRadius="50"
                        mt="20px"
                        fontSize="large"
                        color="white"
                        backgroundColor="transparent"
                    >
                        Login
                    </Button>
                    <Button
                        borderRadius="50"
                        mt="20px"
                        fontSize="large"
                        color="white"
                        backgroundColor="red"
                    >
                        Register
                    </Button>
                </Flex>
                </Flex>
                <Intro2 />
                <Box 
                position="absolute"
                left= "50%"
                transform= "translateX(-50%)" 
                width="60%"
                zIndex={3} 
                mt={-200}>
                    <Description />
                </Box>
                <Services />
            </Box>
        </React.Fragment>
    );
};

export default Intro;
