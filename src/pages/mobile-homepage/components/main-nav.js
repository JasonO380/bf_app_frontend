import React, { useContext } from "react";
import logo from "../../../images/logo.jpeg";
import { NavLink } from "react-router-dom";
import { Image, Flex, Button, Spacer } from "@chakra-ui/react";
import { LoginRegisterContext } from "../../../authentication/login-register-context";

const MainNav = () => {
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    const logout = () => {
        auth.logout();
    };
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
                {!isLoggedIn ? (
                    <>
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
                    </>
                ) : (
                    <>
                    <NavLink to="/athlete">
                        <Button
                            borderRadius="50"
                            mt="20px"
                            fontSize="xs"
                            color="white"
                            backgroundColor="transparent"
                        >
                            Dashboard
                        </Button>
                    </NavLink>
                    <Button
                            borderRadius="50"
                            mt="20px"
                            fontSize="xs"
                            onClick={logout}
                            color="white"
                            backgroundColor="red"
                        >
                            Log Out
                        </Button>
                        </>
                )}
            </Flex>
        </Flex>
    );
};

export default MainNav;
