import React from "react";
import { Box, Text, } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MacroOutlineDonutChart from "./MacroOutlineDonutChart";
import CarbCyclingBeginner from "./carb-cycling-beginner";
import calculateMacroDistribution from "./calculate-macro-distribution";

const CalorieAndMacrosOutline = ({ calorieTotal, type }) => {
    console.log(calorieTotal)
    const MotionBox = motion(Box);
    const levels = [
        { name: 'Sedentary', key: 'sedentary' },
        { name: 'Light active', key: 'lightlyActive' },
        { name: 'Medium active', key: 'moderatelyActive' },
        { name: 'Very active', key: 'veryActive' },
        { name: 'Intense active', key: 'extraActive' }
    ];

    const macros = levels.map(level => ({
        ...level,
        cals: calorieTotal[level.key],
        macroDistribution: calculateMacroDistribution(calorieTotal[level.key]),
    }));
    
    const boxVariants = {
        hidden: { height: 0 },
        show: {
            height: 'auto',
            transition: {
                duration: 1.5
            }
        }
    };

    console.log(macros)
    if(type === "beginner" || type === "advanced"){
        console.log(type)
        return (
            <CarbCyclingBeginner calorieTotal={calorieTotal} cycleType={type} />
        )
    }

    return (
        <MotionBox 
        p={5} 
        width="100%" 
        margin="0 auto"
        variants={boxVariants} 
        initial="hidden"
        animate={calorieTotal ? "show" : "hidden"}
        overflow="hidden"
        rounded="md"
        bg="gray.800" 
        borderRadius="20px"
        >
        {macros.map(({ name, cals, macroDistribution }) => macroDistribution && (
                <React.Fragment key={name}>
                    <Box margin="auto">
                        <Text textAlign="center" color="white" fontSize="x-large"><strong>{name} cals: {cals}</strong></Text>
                    </Box>
                    <MacroOutlineDonutChart macroDistribution={macroDistribution} cycleType={type} />
                </React.Fragment>
            ))}
        </MotionBox>
    );
};

export default CalorieAndMacrosOutline;
