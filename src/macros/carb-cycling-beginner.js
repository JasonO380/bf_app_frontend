import React from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const CarbCyclingBeginner = ({ macroDistribution }) => {
    const days = [
        "mediumCarb",
        "mediumCarb",
        "lowCarb",
        "lowCarb",
        "highCarb",
        "lowCarb",
        "mediumCarb",
    ];

    return (
        <Flex overflowX="auto" whiteSpace="nowrap" direction="row">
            {days.map((day, index) => (
                <Stack key={index} p={1} mb={1} boxShadow="md" rounded="md">
                    <Text color="white" fontWeight="bold">
                        Day {index + 1}
                    </Text>
                    <Text color="white">
                        Carbs: {macroDistribution[day].carbohydrates}{" "}
                        grams
                    </Text>
                    <Text color="white">
                        Protein: {macroDistribution[day].protein} grams
                    </Text>
                    <Text color="white">
                        Fats: {macroDistribution[day].fats} grams
                    </Text>
                </Stack>
            ))}
        </Flex>
    );
};

export default CarbCyclingBeginner;
