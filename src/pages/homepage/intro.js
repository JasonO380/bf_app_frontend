import React, { useContext } from "react";
import logo from "../../images/logo.jpeg";
import me from "../../images/Intro-me.jpeg";
import { useMediaQuery } from "@chakra-ui/react";
import Intro2 from "./components/intro2";
import Description from "./components/description";
import Services from "./components/services";
import Tracking from "./components/tracking";
import { LoginRegisterContext } from "../../authentication/login-register-context";
import MobileHome from "../mobile-homepage/mobile-home";
import Footer from "./components/footer";
import { NavLink } from "react-router-dom";
import {
    Box,
    Image,
    Flex,
    Button,
    Heading,
    Stack,
    Spacer,
} from "@chakra-ui/react";

const Intro = () => {
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    const logout = () => {
        auth.logout();
    };
    if (!isTabletOrAbove) {
        return <MobileHome />;
    }
    return (
        <React.Fragment>
            <Box bg="#151414" height={isTabletOrAbove ? "100vh" : "100vh"}>
                <Flex width="95%" margin="auto">
                    <Image
                        marginBottom={5}
                        marginTop={5}
                        borderRadius="100%"
                        height="5rem"
                        src={logo}
                    />
                    <Spacer />
                    <Flex align="end" margin="auto" px="50px">
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
                <Intro2 />
                <Box
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                    width="60%"
                    zIndex={3}
                    mt={-200}
                >
                    <Description />
                </Box>
                <Services />
                <Tracking />
                <Footer />
            </Box>
        </React.Fragment>
    );
};

export default Intro;
