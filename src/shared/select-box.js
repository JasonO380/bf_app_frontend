import React, { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";

const SelectBox = ({ data, labelKey, selectedOption }) => {
    const [showMenu, setShowMenu] = useState(false);
    // const [selectedOption, setSelectedOption] = useState();
    const handleMenuClick = () => {
        setShowMenu(true);
    };

    const handleSelect = (option) => {
        console.log(option);
        setShowMenu(false);
        selectedOption(option);
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            boxShadow="lg"
            w="100%"
            maxH="150px"
            mt={4}
            overflowY="scroll"
            bg="white"
        >
            <VStack alignItems="stretch" spacing={0}>
                <Box
                    fontSize="xs"
                    p={2}
                    onClick={handleMenuClick}
                    borderBottomWidth="1px"
                >
                    --Select one--
                </Box>
                {showMenu &&
                    data.map((option) => (
                        <Box
                            key={option._id}
                            value={option._id}
                            p={2}
                            borderBottomWidth={
                                data.indexOf(option) === data.length - 1
                                    ? 0
                                    : "1px"
                            }
                            onClick={() => handleSelect(option)}
                            _hover={{ bg: "gray.100" }}
                            cursor="pointer"
                        >
                            {option[labelKey]}
                        </Box>
                    ))}
            </VStack>
        </Box>
    );
};

export default SelectBox;
