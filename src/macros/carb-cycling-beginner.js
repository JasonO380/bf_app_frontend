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
    const activities = ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"];
    const macroDistributions = activities.reduce((acc, activity) => {
        acc[activity] = calculateMacroDistribution(calorieTotal[activity]);
        return acc;
    }, {});
    console.log(macroDistributions);

    const beginner = [
        { type: "mediumCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Medium carb" },
        { type: "mediumCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Medium carb" },
        { type: "lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb" },
        { type: "lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb" },
        { type: "highCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "High carb" },
        { type: "lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb" },
        { type: "mediumCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Medium carb" },
    ];

    const advanced = [
        {type:"lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb"},
        {type:"lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb"},
        {type:"lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb"},
        {type:"lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb"},
        {type:"lowCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Low carb"},
        {type:"highCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "High carb"},
        {type:"mediumCarb", activity: ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"], label: "Medium carb"},
    ];
    let days = cycleType === "beginner" ? beginner : advanced;

    return (
        <Box
        bg="gray.800"
        borderRadius="20px">
        {activities.map((activity, activityIndex) => (
            <Box key={activityIndex} mb={4}>
            <Box margin="auto">
                <Text color="white" fontSize="x-large" textAlign="center" mb={2}>
                    <strong>{activity} cals: {calorieTotal[activity]}</strong> 
                </Text>
                </Box>
                <Flex
                    overflowX="auto"
                    whiteSpace="nowrap"
                    direction="row"
                    rounded="md"
                >
                    {days.map((day, dayIndex) => {
                        console.log(macroDistributions[activity][day.type]);
                        return (
                            macroDistributions[activity] && macroDistributions[activity][day.type] ? (
                                <React.Fragment key={dayIndex}>
                                    <Stack marginRight="2rem" >
                                        <Box margin="auto">
                                            <Text
                                                textAlign="center"
                                                color="white"
                                                fontSize="x-large"
                                            >
                                                <strong>Day {dayIndex + 1}</strong>
                                            </Text>
                                        </Box>
                                        <MacroOutlineDonutChart
                                            macroDistribution={macroDistributions[activity][day.type]}
                                            label={day.label}
                                            day={dayIndex + 1}
                                            cycleType={type}
                                        />
                                    </Stack>
                                </React.Fragment>
                            ) : null
                        );
                    })}
                </Flex>
            </Box>
        ))}
    </Box>
    );
};

export default CarbCyclingBeginner;



