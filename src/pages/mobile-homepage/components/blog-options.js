import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

const BlogOptions = () => {
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);
    const [isBlogMenuOpen, setBlogMenuOpen] = useState(false);
    const toggleBlogMenu = () => {
        setBlogMenuOpen(!isBlogMenuOpen);
    };
    return (
        <>
            <Box onClick={toggleBlogMenu} cursor="pointer">
                <Flex alignItems="center">
                    <Text as="span">
                        Blogs
                    </Text>
                    <MotionButton
                        bg="transparent"
                        border="none"
                        p={0}
                        animate={{
                            rotate: isBlogMenuOpen ? 180 : 0,
                        }}
                        _focus={{
                            outline: "none",
                        }}
                        onClick={toggleBlogMenu}
                    >
                        <FaChevronUp w={6} h={6} />
                    </MotionButton>
                </Flex>
            </Box>
            {isBlogMenuOpen && (
                <MotionBox
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    spacing={2}
                    transition={{
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                    }}
                >
                    <MotionBox
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                    >
                        <NavLink to="/carbcycling">Carb Cycling</NavLink>
                    </MotionBox>
                    <MotionBox
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                    >
                        <NavLink to="/periodization">
                            Periodization
                        </NavLink>
                    </MotionBox>
                    {/* <MotionBox
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                    >
                        <NavLink to="/progressive-overload">
                            Progressive Overload
                        </NavLink>
                    </MotionBox> */}
                </MotionBox>
            )}
        </>
    );
};

export default BlogOptions;
