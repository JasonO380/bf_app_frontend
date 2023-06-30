import React from "react";
import { Box, Text, } from "@chakra-ui/react";
import MacroOutlineDonutChart from "./MacroOutlineDonutChart";
import CarbCyclingBeginner from "./carb-cycling-beginner";
import calculateMacroDistribution from "./calculate-macro-distribution";

const CalorieAndMacrosOutline = ({ calorieTotal }) => {
    const sedentaryCarbs = calculateMacroDistribution(calorieTotal.sedentary);
    const lightlyActiveCarbs = calculateMacroDistribution(calorieTotal.lightlyActive);
    const moderatelyActiveCarbs = calculateMacroDistribution(calorieTotal.moderatelyActive);
    const veryActiveCarbs = calculateMacroDistribution(calorieTotal.veryActive);
    const extraActiveCarbs = calculateMacroDistribution(calorieTotal.extraActive);

    return (
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
        {sedentaryCarbs && (
            <>
            <Box margin="auto">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Sedentary cals: {calorieTotal.sedentary}</strong></Text>
            </Box>
                <CarbCyclingBeginner macroDistribution={sedentaryCarbs} />
            </>
        )}
        {lightlyActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Light active cals: {calorieTotal.lightlyActive}</strong></Text>
            </Box>
                <CarbCyclingBeginner macroDistribution={lightlyActiveCarbs} />
            </>
        )}
        {moderatelyActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Moderately active cals: {calorieTotal.moderatelyActive}</strong></Text>
            </Box>
                <CarbCyclingBeginner macroDistribution={moderatelyActiveCarbs} />
            </>
        )}
        {veryActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Very active cals: {calorieTotal.veryActive}</strong></Text>
            </Box>
                <CarbCyclingBeginner macroDistribution={veryActiveCarbs} />
            </>
        )}
        {extraActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Intense active cals: {calorieTotal.extraActive}</strong></Text>
            </Box>
                <CarbCyclingBeginner macroDistribution={extraActiveCarbs} />
            </>
        )}
        </Box>
    );
};

export default CalorieAndMacrosOutline;
