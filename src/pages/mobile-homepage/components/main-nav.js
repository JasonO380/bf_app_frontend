import React, { useContext, useState } from "react";
import logo from "../../../images/logo.jpeg";
import HamburgerMenu from "../../homepage/components/hamburger-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { Image, Flex, Box, Button, VStack, Spacer, } from "@chakra-ui/react";
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
    const toggleBlogMenu = (e) => {
        e.stopPropagation();
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
                    zIndex={3}
                    w="fit-content"
                >
                    <MotionVStack display="flex" alignItems="flex-start" spacing={2}>
                        <MotionBox>
                            <NavLink to="/blogs">
                                Blogs
                            </NavLink>
                            <MotionButton
                                onClick={toggleBlogMenu}
                                bg="transparent"
                                border="none"
                                p={0}
                                animate={{
                                    rotate: isBlogMenuOpen ? 180 : 0,
                                }}
                                _focus={{
                                    outline: "none",
                                }}
                            >
                                <FaChevronDown w={6} h={6} />
                            </MotionButton>
                            {isBlogMenuOpen && (
                                <MotionVStack
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{ opacity: 1, scaleY: 1 }}
                                    exit={{ opacity: 0, scaleY: 0 }}
                                    spacing={2}
                                >
                                    <NavLink to="/carbcycling">
                                        Carb Cycling
                                    </NavLink>
                                    <NavLink to="/relative-intensity">
                                        Relative Intensity
                                    </NavLink>
                                    <NavLink to="/progressive-overload">
                                        Progressive Overload
                                    </NavLink>
                                </MotionVStack>
                            )}
                        </MotionBox>
                        <MotionBox>
                            <NavLink to="/charts">
                                Charts
                            </NavLink>
                        </MotionBox>
                        <MotionBox>
                            <NavLink to="/workouts">
                                Workouts
                            </NavLink>
                        </MotionBox>
                    </MotionVStack>
                </MotionBox>
            )}
        </Flex>
    );
};

export default MainNav;


{/* {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                        position: "absolute",
                        top: "calc(100% + 10px)",
                        left: 0,
                        right: 0,
                        borderRadius: "5px",
                        backgroundColor: "white",
                        padding: "10px",
                        zIndex: 3,
                        width: "fit-content",
                    }}
                >
                    <motion.div>
                        <NavLink to="/blogs">Blogs</NavLink>
                        <motion.button
                            onClick={toggleBlogMenu}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                padding: 0,
                            }}
                        >
                            <FaChevronDown
                                w={6}
                                h={6}
                                transform={
                                    isBlogMenuOpen ? "rotate(180deg)" : "none"
                                }
                            />
                        </motion.button>
                        {isBlogMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                exit={{ opacity: 0, scaleY: 0 }}
                            >
                                <NavLink to="/carb-cycling">
                                    Carb Cycling
                                </NavLink>
                                <NavLink to="/relative-intensity">
                                    Relative Intensity
                                </NavLink>
                                <NavLink to="/progressive-overload">
                                    Progressive Overload
                                </NavLink>
                            </motion.div>
                        )}
                    </motion.div>
                    <motion.div>
                        <NavLink to="/charts">Charts</NavLink>
                    </motion.div>
                    <motion.div>
                        <NavLink to="/workouts">Workouts</NavLink>
                    </motion.div>
                </motion.div>
            )} */}