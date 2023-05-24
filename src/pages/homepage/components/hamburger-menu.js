import React from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
    return (
        <Box
            as="button"
            onClick={toggleMenu}
            pos="relative"
            display="flex"
            flexDirection="column"
            justifyContent="end"
            alignItems="center"
            width="2.5rem"
            height="2.5rem"
            bg="transparent"
            border="none"
            cursor="pointer"
            padding={0}
            zIndex={1}
        >
            <Box
                w="1.5rem"
                h="2px"
                bg="white"
                borderRadius="2px"
                transition="all 0.3s ease"
                transform={
                    isOpen ? "rotate(-45deg) translate(-4px, 5px)" : "none"
                }
            ></Box>
            <Box
                w="1.5rem"
                h="2px"
                bg="white"
                borderRadius="2px"
                opacity={isOpen ? 0 : 1}
                transition="opacity 0.3s ease"
                mt="4px"
            ></Box>
            <Box
                w="1.5rem"
                h="2px"
                bg="white"
                borderRadius="2px"
                transition="all 0.3s ease"
                transform={
                    isOpen ? "rotate(45deg) translate(-4px, -5px)" : "none"
                }
                mt="4px"
            ></Box>
        </Box>
    );
};

export default HamburgerMenu;
