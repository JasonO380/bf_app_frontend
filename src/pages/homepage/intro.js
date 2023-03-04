import React from "react";
import logo from "../../images/logo.jpeg";
import me from "../../images/Intro-me.jpeg";
import { useMediaQuery } from "@chakra-ui/react";
import Intro2 from "./components/intro2";
import Description from "./components/description";
import { Link } from "react-router-dom";
import { Box, Image, Flex, Button, Heading, Stack } from "@chakra-ui/react";

const Intro = () => {
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    return (
        <React.Fragment>
            <Box bg="#151414" height={isTabletOrAbove ? "100vh" : "100%"}>
                <Flex
                    align="end"
                    // justify="space-between"
                    mt="auto"
                    mb="10px"
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
                <Intro2 />
                <Description />
            </Box>
            {/* <Description /> */}
        </React.Fragment>
    );
};

export default Intro;
