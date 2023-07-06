import React, { useState } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const CarbCyclingBeginner = ({ macroDistribution, cycleType }) => {
    console.log(macroDistribution)
    let days;
    const beginner = [
        "mediumCarb",
        "mediumCarb",
        "lowCarb",
        "lowCarb",
        "highCarb",
        "lowCarb",
        "mediumCarb",
    ];

    const advanced = [
        "lowCarb",
        "lowCarb",
        "lowCarb",
        "lowCarb",
        "lowCarb",
        "highCarb",
        "mediumCarb"
    ];
    if (cycleType === "beginner"){
        console.log(cycleType)
        days = beginner;
        // setDays(beginner)
    };

    if(cycleType === "advanced"){
        console.log(cycleType)
        days = advanced;
        // setDays(advanced);
    }
    // const days = [
    //     "mediumCarb",
    //     "mediumCarb",
    //     "lowCarb",
    //     "lowCarb",
    //     "highCarb",
    //     "lowCarb",
    //     "mediumCarb",
    // ];

    return (
        <Flex 
        overflowX="auto" 
        whiteSpace="nowrap" 
        direction="row"
        mt={3}
        rounded="md"
        bg="black" 
        // bg="linear-gradient(to bottom, #3D0149, #00BCD4)" 
        borderRadius="20px"
        >
            {days.map((day, index) => (
                <>
                <Stack 
                key={index} 
                p={6} mb={1} 
                mr={3} 
                // boxShadow="md" 
                // rounded="md" 
                // bg="linear-gradient(to bottom, #3D0149, #00BCD4)" 
                // borderRadius="20px"
                >
                    <Text color="white" fontWeight="bold">
                        Day {index + 1}
                    </Text>
                    <Text fontSize="xs" color="white">
                        Carbs: {macroDistribution[day].carbohydrates}{" "}
                        grams
                    </Text>
                    <Text fontSize="xs" color="white">
                        Protein: {macroDistribution[day].protein} grams
                    </Text>
                    <Text fontSize="xs" color="white">
                        Fats: {macroDistribution[day].fats} grams
                    </Text>
                </Stack>
                </>
            ))}
        </Flex>
    );
};

export default CarbCyclingBeginner;
