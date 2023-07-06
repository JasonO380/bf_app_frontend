import React from "react";
import DonutChart from "../shared/donut-chart";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/react";

const MacroOutlineDonutChart = ({ macroDistribution, label }) => {
    console.log(macroDistribution);
    const macros = macroDistribution;
    console.log(macros);
    const MotionBox = motion(Box);
    const boxVariants = {
        hidden: { scaleY: 0 },
        show: {
            scaleY: 1,
            transition: {
                duration: 0.5
            }
        }
    };
    const prepareChartData = (macros, label) => {
        const { carbohydrates, protein, fats } = macros;
        console.log(macros);
        console.log(label);
        const chartData = {
            labels: [
                "Carb " + carbohydrates,
                "Pro " + protein,
                "Fats " + fats,
            ],
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
                    }
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

    return (
        <>
            <Flex
                overflowX="auto"
                whiteSpace="nowrap"
                direction="row"
            >
                {macros && (
                    <>
                        {macros.highCarb && (
                            <Box
                                border="1px solid white"
                                borderRadius="10px"
                                padding="15px"
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
                                border="1px solid white"
                                borderRadius="10px"
                                padding="10px"
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
                                border="1px solid white"
                                borderRadius="10px"
                                padding="10px"
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
};

export default MacroOutlineDonutChart;
