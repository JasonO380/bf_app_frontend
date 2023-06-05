import React from "react";
import {
    Box,
    Text,
    Image,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import MacroOutlineDonutChart from "./MacroOutlineDonutChart";
import calculateMacroDistribution from "./calculate-macro-distribution";
import DonutTest from "./donut-test";

const CalorieAndMacrosOutline = ({ calorieTotal }) => {
    const sedentaryCarbs = calculateMacroDistribution(calorieTotal.sedentary);
    const lightlyActiveCarbs = calculateMacroDistribution(calorieTotal.lightlyActive);
    const moderatelyActiveCarbs = calculateMacroDistribution(calorieTotal.moderatelyActive);
    const veryActiveCarbs = calculateMacroDistribution(calorieTotal.veryActive);
    const extraActiveCarbs = calculateMacroDistribution(calorieTotal.extraActive);
    console.log(sedentaryCarbs);
    console.log(veryActiveCarbs, " very active");

    return (
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
            <Box>
                <Text color="white">Sedentary: {calorieTotal.sedentary}</Text>
                {lightlyActiveCarbs && <DonutTest macroDistribution={lightlyActiveCarbs} />}
                <Text color="white">
                    High carb day: CARBS:{" "}
                    {sedentaryCarbs.highCarb.carbohydrates} PROTEIN:{" "}
                    {sedentaryCarbs.highCarb.protein} FATS:{" "}
                    {sedentaryCarbs.highCarb.fats}
                </Text>
                <Text color="white">
                    Meduim carb day: CARBS:{" "}
                    {sedentaryCarbs.mediumCarb.carbohydrates} PROTEIN:{" "}
                    {sedentaryCarbs.mediumCarb.protein} FATS:{" "}
                    {sedentaryCarbs.mediumCarb.fats}
                </Text>
                <Text color="white">
                    Low carb day: CARBS: {sedentaryCarbs.lowCarb.carbohydrates}{" "}
                    PROTEIN: {sedentaryCarbs.lowCarb.protein} FATS:{" "}
                    {sedentaryCarbs.lowCarb.fats}
                </Text>
                <Text color="white">
                    Lightly active: {calorieTotal.lightlyActive}
                </Text>
                <Text color="white">
                    Moderately active: {calorieTotal.moderatelyActive}
                </Text>
                <Text color="white">
                    Very active: {calorieTotal.veryActive}
                </Text>
                <Text color="white">
                    Extra active: {calorieTotal.extraActive}
                </Text>
            </Box>
        </Box>
    );
};

export default CalorieAndMacrosOutline;
