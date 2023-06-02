import React from "react";
import { Box, Image } from "@chakra-ui/react";
import LoadingSpinner from "./loading-spinner";
import logo from "../images/logo.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const SplashPage = (props) => {
    const text = props.text;
    const MotionBox = motion(Box);
    const pageVariants = {
        initial: {
            opacity: 0,
            x: "-100%",
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            y: "-100%",
        },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.4,
    };

    return (
        <AnimatePresence mode="wait">
            <MotionBox
                bg="linear-gradient(to bottom, #3D0149, #00BCD4)"
                height="100vh"
                display="flex"
                position="relative"
                justifyContent="center"
                alignItems="center"
                initial="initial"
                animate="in"
                exit="out"
                zIndex="7"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Box textAlign="center">
                    <Image
                        borderRadius="100%"
                        height="15rem"
                        src={logo}
                        marginBottom="15px"
                    />
                    <LoadingSpinner text={text} />
                </Box>
            </MotionBox>
        </AnimatePresence>
    );
};

export default SplashPage;
