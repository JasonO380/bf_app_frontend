import React, { useContext, useState } from "react";
import logo from "../../../images/logo.jpeg";
import HamburgerMenu from "../../../shared/hamburger-menu";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import {
    Image,
    Flex,
    Box,
    Text,
    Button,
    VStack,
    Spacer,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react"
// import { Link as NavLink } from "react-router-dom"
import BlogOptions from "./blog-options";
import { LoginRegisterContext } from "../../../authentication/login-register-context";
import { motion } from "framer-motion";

const MainNav = () => {
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isBlogMenuOpen, setBlogMenuOpen] = useState(false);
    const navigate = useNavigate();
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);
    const MotionVStack = motion(VStack);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const toggleBlogMenu = () => {
        setBlogMenuOpen(!isBlogMenuOpen);
    };
    const logout = () => {
        auth.logout();
    };
    return (
        <Flex position="relative" alignSelf="center" width="95%" margin="auto">
            <Image
                marginBottom={5}
                marginTop={5}
                borderRadius="100%"
                height="2.5rem"
                src={logo}
            />
            <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
            {isMenuOpen && (
                <MotionBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    pos="absolute"
                    top="calc(100% + 10px)"
                    left={0}
                    right={0}
                    borderRadius="5px"
                    bgColor="white"
                    p={2}
                    zIndex={4}
                    w="fit-content"
                >
                    <MotionVStack
                        display="flex"
                        alignItems="flex-start"
                        spacing={2}
                    >
                    <MotionBox>
                            <NavLink to="/welcome">Welcome</NavLink>
                        </MotionBox>
                    <BlogOptions />
                    </MotionVStack>
                </MotionBox>
            )}
        </Flex>
    );
};

export default MainNav;
