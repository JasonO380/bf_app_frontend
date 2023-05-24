import React, { useContext, useState } from "react";
import logo from "../../../images/logo.jpeg";
import HamburgerMenu from "../../homepage/components/hamburger-menu";
import { NavLink } from "react-router-dom";
import { Image, Flex, Button, Spacer } from "@chakra-ui/react";
import { LoginRegisterContext } from "../../../authentication/login-register-context";
import { motion } from "framer-motion";

const MainNav = () => {
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const logout = () => {
        auth.logout();
    };
    return (
        <Flex position="relative" width="95%" margin="auto">
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
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                        position: "absolute",
                        top: 'calc(100% + 10px)',
                        left: 0,
                        right: 0,
                        borderRadius:"5px",
                        backgroundColor: "white",
                        padding: "10px",
                        zIndex: 2,
                        width:"fit-content"
                    }}
                >
                    <motion.div>
                        <NavLink to="/blogs">Blogs</NavLink>
                    </motion.div>
                    <motion.div>
                        <NavLink to="/charts">Charts</NavLink>
                    </motion.div>
                    <motion.div>
                        <NavLink to="/workouts">Workouts</NavLink>
                    </motion.div>
                </motion.div>
            )}
        </Flex>
    );
};

export default MainNav;
