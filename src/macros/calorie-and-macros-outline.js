import React from "react";
import { Box, Text, } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MacroOutlineDonutChart from "./MacroOutlineDonutChart";
import CarbCyclingBeginner from "./carb-cycling-beginner";
import calculateMacroDistribution from "./calculate-macro-distribution";

const CalorieAndMacrosOutline = ({ calorieTotal, type }) => {
    const sedentaryCarbs = calculateMacroDistribution(calorieTotal.sedentary);
    const lightlyActiveCarbs = calculateMacroDistribution(calorieTotal.lightlyActive);
    const moderatelyActiveCarbs = calculateMacroDistribution(calorieTotal.moderatelyActive);
    const veryActiveCarbs = calculateMacroDistribution(calorieTotal.veryActive);
    const extraActiveCarbs = calculateMacroDistribution(calorieTotal.extraActive);
    const MotionBox = motion(Box);
    let CarbData;
    console.log(type)
    const boxVariants = {
        hidden: { height: 0 },
        show: {
            height: 'auto',
            transition: {
                duration: 1.5
            }
        }
    };

    if(type === "bmr"){
        console.log(type)
        CarbData = MacroOutlineDonutChart
    }
    if(type === "beginner" || type === "advanced"){
        console.log(type)
        CarbData = CarbCyclingBeginner
    }

    return (
        <MotionBox 
        // bg="offWhite" 
        p={5} 
        width="100%" 
        margin="0 auto"
        variants={boxVariants} 
        initial="hidden"
        animate={calorieTotal ? "show" : "hidden"}
        overflow="hidden"
        rounded="md"
        bg="gray.800" 
        // bg="linear-gradient(to bottom, #3D0149, #8B0000)" 
        borderRadius="20px"
        >
        {sedentaryCarbs && (
            <>
            <Box margin="auto">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Sedentary cals: {calorieTotal.sedentary}</strong></Text>
            </Box>
                <CarbData macroDistribution={sedentaryCarbs} cycleType={type} />
            </>
        )}
        {lightlyActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Light active cals: {calorieTotal.lightlyActive}</strong></Text>
            </Box>
                <CarbData macroDistribution={lightlyActiveCarbs} cycleType={type} />
            </>
        )}
        {moderatelyActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Medium active cals: {calorieTotal.moderatelyActive}</strong></Text>
            </Box>
                <CarbData macroDistribution={moderatelyActiveCarbs} cycleType={type} />
            </>
        )}
        {veryActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Very active cals: {calorieTotal.veryActive}</strong></Text>
            </Box>
                <CarbData macroDistribution={veryActiveCarbs} cycleType={type} />
            </>
        )}
        {extraActiveCarbs && (
            <>
            <Box margin="auto" mt="15px">
                <Text textAlign="center" color="white" fontSize="x-large"><strong>Intense active cals: {calorieTotal.extraActive}</strong></Text>
            </Box>
                <CarbData macroDistribution={extraActiveCarbs} cycleType={type} />
            </>
        )}
        </MotionBox>
    );
};

export default CalorieAndMacrosOutline;
