import { Box, Text, MotionBox } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoadingSpinner = (props) => {
    const MotionBox = motion(Box);
    return (
        <MotionBox
            initial={{ scale: 0 }}
            animate={{
                scale: 1,
                transition: { type: "spring", bounce: 0.65, duration: 1.8 },
            }}
            exit={{ scale: 0 }}
            w="150px"
            h="105px"
            bg="white"
            borderRadius="20px"
            d="flex"
            m="auto"
            flexDirection="column"
        >
            <Box w="100%">
                <Text textAlign="center" fontStyle="italic" color="black">
                    Loading
                </Text>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                {[...Array(10)].map((_, index) => (
                    <MotionBox
                        key={index}
                        transition={{
                            duration: index % 2 === 0 ? 1 : 0.2,
                            ease: "easeInOut",
                            delay: index % 2 === 0 ? 0.2 : 0.1,
                            yoyo: Infinity,
                        }}
                        animate={{ y: ["100%", "-100%"] }}
                        w="5px"
                        h="10px"
                        borderRadius="100%"
                        bg={index % 2 === 0 ? "#ff1f06" : "#0000ffe0"}
                        mx={1}
                    />
                ))}
            </Box>
        </MotionBox>
    );
};

export default LoadingSpinner;
