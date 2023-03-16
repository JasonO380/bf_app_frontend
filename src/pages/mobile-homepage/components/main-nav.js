import React from "react";
import logo from "../../../images/logo.jpeg";
import { NavLink } from "react-router-dom";
import { Image, Flex, Button, Spacer } from "@chakra-ui/react";

const MainNav = () => {
    return (
        <Flex width="95%" margin="auto">
            <Image
                marginBottom={5}
                marginTop={5}
                borderRadius="100%"
                height="2.5rem"
                src={logo}
            />
            <Spacer />
            <Flex align="end" margin="auto">
                <NavLink to="/login">
                    <Button
                        borderRadius="50"
                        mt="20px"
                        fontSize="xs"
                        color="white"
                        backgroundColor="transparent"
                    >
                        Login
                    </Button>
                </NavLink>
                <NavLink to="/register">
                    <Button
                        borderRadius="50"
                        mt="20px"
                        fontSize="xs"
                        color="white"
                        backgroundColor="red"
                    >
                        Register
                    </Button>
                </NavLink>
            </Flex>
        </Flex>
    );
};

export default MainNav;
