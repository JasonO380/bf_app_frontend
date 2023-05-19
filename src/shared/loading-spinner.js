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
            width="160px"
            height="55px"
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
                            y: [
                                `${Math.sin((index / 10) * Math.PI) * 15}px`, // Going up
                                `${
                                    Math.sin(((index + 0.5) / 10) * Math.PI) *
                                    -15
                                }px`, // Going down
                                `${
                                    Math.sin(((index + 1) / 10) * Math.PI) * 15
                                }px`, // Going up
                            ],
                        }}
                        w="5px"
                        h="5px"
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
