import React from "react";
import DonutChart from "../shared/donut-chart";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/react";

const MacroOutlineDonutChart = ({ macroDistribution, label, day, cycleType, borderColor }) => {
    const carbCycle = cycleType;
    const color = borderColor;
    const macros = macroDistribution;
    console.log(macros)
    console.log(cycleType);
    console.log(label)
    const MotionBox = motion(Box);
    const boxVariants = {
        hidden: { scaleY: 0 },
        show: {
            scaleY: 1,
            transition: {
                duration: 0.5,
            },
        },
    };
    const selectBorderColor = (color) => {
        console.log(color)
        if (color === "High carb") {
            return "#FF0040"; // Red for highCarb
        } else if (color === "Medium carb") {
            return "#CA4DF7"; // Purple for mediumCarb
        } else if (color === "Low carb") {
            return "#00FF00"; // Green for lowCarb
        }
    };
    const prepareChartData = (macros,label) => {
        const { carbohydrates, protein, fats } = macros;
        const chartData = {
            labels: ["Carb " + carbohydrates, "Pro " + protein, "Fats " + fats],
            datasets: [
                {
                    data: [carbohydrates, protein, fats],
                    backgroundColor: ["#257ff5", "#F06B2D", "#f8df00"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        };

        const chartOptions = {
            plugins: {
                legend: {
                    position: "left",
                    labels: {
                        boxWidth: 10,
                        color: "white",
                    },
                },
                title: {
                    display: true,
                    text: label,
                    font: {
                        size: "16",
                        family: "Montserrat",
                        color: "white",
                    },
                },
            },
        };

        return { chartData, chartOptions };
    };

    if (cycleType === "beginner" || cycleType === "advanced") {
        return (
            <MotionBox
                border={`10px solid ${selectBorderColor(color)}`}
                borderRadius="40px"
                padding="5px"
                height="14rem"
                minWidth="225px"
                marginRight="2rem"
                variants={boxVariants}
                initial="hidden"
                animate="show"
            >
                <DonutChart
                    data={prepareChartData(macros, label).chartData}
                    options={prepareChartData(macros, label).chartOptions}
                />
            </MotionBox>
        );
    } else {
        return (
            <>
                <Flex overflowX="auto" whiteSpace="nowrap" direction="row">
                    {macros && (
                        <>
                            {macros.highCarb && (
                                <Box
                                    border="10px solid #FF0040"
                                    borderRadius="40px"
                                    padding="5px"
                                    height="14rem"
                                    minWidth="225px"
                                    marginRight="2rem"
                                >
                                    <DonutChart
                                        data={
                                            prepareChartData(macros.highCarb)
                                                .chartData
                                        }
                                        options={
                                            prepareChartData(
                                                macros.highCarb,
                                                "High Carb Day"
                                            ).chartOptions
                                        }
                                    />
                                </Box>
                            )}
                            {macros.mediumCarb && (
                                <Box
                                    border="10px solid #CA4DF7"
                                    borderRadius="40px"
                                    padding="5px"
                                    height="14rem"
                                    minWidth="225px"
                                    marginRight="2rem"
                                >
                                    <DonutChart
                                        data={
                                            prepareChartData(macros.mediumCarb)
                                                .chartData
                                        }
                                        options={
                                            prepareChartData(
                                                macros.mediumCarb,
                                                "Medium Carb Day"
                                            ).chartOptions
                                        }
                                    />
                                </Box>
                            )}
                            {macros.lowCarb && (
                                <Box
                                    border="10px solid #00FF00"
                                    borderRadius="40px"
                                    padding="5px"
                                    height="14rem"
                                    minWidth="225px"
                                    marginRight="2rem"
                                >
                                    <DonutChart
                                        data={
                                            prepareChartData(macros.lowCarb)
                                                .chartData
                                        }
                                        options={
                                            prepareChartData(
                                                macros.lowCarb,
                                                "Low Carb Day"
                                            ).chartOptions
                                        }
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Flex>
            </>
        );
    }
};

export default MacroOutlineDonutChart;
