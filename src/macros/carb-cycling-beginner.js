import React, { useState } from "react";
import MacroOutlineDonutChart from "./MacroOutlineDonutChart";
import calculateMacroDistribution from "./calculate-macro-distribution";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const CarbCyclingBeginner = ({
    calorieTotal,
    cycleType
}) => {
    console.log(calorieTotal);
    const type = cycleType;
    const sedentaryCarbs = calculateMacroDistribution(calorieTotal.sedentary);
    const lightlyActiveCarbs = calculateMacroDistribution(
        calorieTotal.lightlyActive
    );
    const moderatelyActiveCarbs = calculateMacroDistribution(
        calorieTotal.moderatelyActive
    );
    const veryActiveCarbs = calculateMacroDistribution(calorieTotal.veryActive);
    const extraActiveCarbs = calculateMacroDistribution(
        calorieTotal.extraActive
    );
    const macroDistributions = {
        sedentary: sedentaryCarbs,
        lightlyActive: lightlyActiveCarbs,
        moderatelyActive: moderatelyActiveCarbs,
        veryActive: veryActiveCarbs,
        extraActive: extraActiveCarbs,
    };
    console.log(macroDistributions);

    const beginner = [
        { type: "mediumCarb", activity: "sedentary", label: "Medium carb" },
        { type: "mediumCarb", activity: "sedentary", label: "Medium carb" },
        { type: "lowCarb", activity: "sedentary", label: "Low carb" },
        { type: "lowCarb", activity: "sedentary", label: "Low carb" },
        { type: "highCarb", activity: "sedentary", label: "High carb" },
        { type: "lowCarb", activity: "sedentary", label: "Low carb" },
        { type: "mediumCarb", activity: "sedentary", label: "Medium carb" },
    ];

    const advanced = [
        "lowCarb",
        "lowCarb",
        "lowCarb",
        "lowCarb",
        "lowCarb",
        "highCarb",
        "mediumCarb",
    ];
    let days = cycleType === "beginner" ? beginner : advanced;
    console.log(days);
    console.log(macroDistributions);
    console.log('Rendering CarbCyclingBeginner component');

    return (
        <Flex
            overflowX="auto"
            whiteSpace="nowrap"
            direction="row"
            mt={3}
            rounded="md"
            bg="gray.800"
            borderRadius="20px"
        >
            {days.map((day, index) => {
                console.log(macroDistributions[day.activity][day.type])
                return (
                    macroDistributions[day.activity] ? (
                        <React.Fragment key={index}>
                            <Stack>
                                <Box margin="auto">
                                    <Text
                                        textAlign="center"
                                        color="white"
                                        fontSize="x-large"
                                    >
                                        <strong>Day {index + 1}</strong>
                                    </Text>
                                </Box>
                                <MacroOutlineDonutChart
                                    macroDistribution={
                                        macroDistributions[day.activity][day.type]
                                    }
                                    label={day.label}
                                    day={index + 1}
                                    cycleType={type}
                                />
                            </Stack>
                        </React.Fragment>
                    ) : null
                );
            })}
        </Flex>
    );
};

export default CarbCyclingBeginner;

{
    /* <Stack 
                key={index} 
                p={6} mb={1} 
                mr={3} 
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
                </Stack> */
}

// const beginner = [
//     "mediumCarb",
//     "mediumCarb",
//     "lowCarb",
//     "lowCarb",
//     "highCarb",
//     "lowCarb",
//     "mediumCarb",
// ];
