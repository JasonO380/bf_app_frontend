import { Box, Text } from "@chakra-ui/react";
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
            width="fit-content"
            height="65px"
            padding="5px"
            bg="white"
            borderRadius="50px"
            display="flex"
            margin="auto"
            flexDirection="column"
        >
            <Box w="100%" py={2}>
                <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontStyle="italic"
                    color="black"
                >
                    {props.text}
                </Text>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                {[...Array(10)].map((_, index) => (
                    <MotionBox
                        key={index}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            delay: index * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        animate={{
                            height: [
                                `${2 + Math.sin((index / 10) * Math.PI) * 7.5}px`, // Going up
                                `${
                                    12.0 +
                                    Math.sin(((index + 0.5) / 10) * Math.PI) *
                                        7.5
                                }px`, // Going down
                                `${
                                    2 + Math.sin(((index + 1) / 10) * Math.PI) * 7.5
                                }px`, // Going up
                            ],
                        }}
                        w="5px"
                        h="20px"
                        borderRadius="50"
                        bg={index % 2 === 0 ? "#ff1f06" : "#0000ffe0"}
                        mx={0.5}
                    />
                ))}
            </Box>
        </MotionBox>
    );
};

export default LoadingSpinner;
