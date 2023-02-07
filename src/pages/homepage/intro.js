import React from "react";
import logo from "../../images/logo.jpeg";
import { Link } from "react-router-dom";
import { Box, Image, Flex, Button } from "@chakra-ui/react";

const Intro = () => {
    return (
        <Box bg='gray.700' height='100vh'>
            <Flex align='center' alignItems="center" justifyContent="center">
                <Image borderRadius="100%" mt='50px' src={logo} />
            </Flex>
            <Flex align='center' justify='space-between' mt='auto' mb='50px' px='50px'>
                <Button mt='20px' fontSize="x-large" color="black" backgroundColor='red'>Login</Button>
                <Button mt='20px' fontSize="x-large" color="black" backgroundColor='red'>Register</Button>
            </Flex>
        </Box>
    );
};

export default Intro;
