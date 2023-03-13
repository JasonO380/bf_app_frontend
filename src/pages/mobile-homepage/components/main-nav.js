import React from "react";
import logo from "../../../images/logo.jpeg";
import {
    Image,
    Flex,
    Button,
    Spacer,
} from "@chakra-ui/react";

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
                <Button
                    borderRadius="50"
                    mt="20px"
                    fontSize="xs"
                    color="white"
                    backgroundColor="transparent"
                >
                    Login
                </Button>
                <Button
                    borderRadius="50"
                    mt="20px"
                    fontSize="xs"
                    color="white"
                    backgroundColor="red"
                >
                    Register
                </Button>
            </Flex>
        </Flex>
    );
};

export default MainNav;
