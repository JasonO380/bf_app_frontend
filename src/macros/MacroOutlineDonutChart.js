import React from "react";
import DonutChart from "../shared/donut-chart";
import MacroDonutChartLegend from "./macro-donut-chart-legend";
import { Box, Flex, Text } from "@chakra-ui/react";

const MacroOutlineDonutChart = ({ macroDistribution }) => {
    console.log(macroDistribution)
    const macros = macroDistribution;
    console.log(macros);
    const prepareChartData = (macros, label) => {
        const { carbohydrates, protein, fats } = macros;
        console.log(macros);
        console.log(label);
        const chartData = {
            labels: [
                "Carbs ",
                "Pro ",
                "Fats ",
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
                    position: "bottom",
                    labels: {
                        boxWidth: 15,
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

    return (
        <>
            {macros && (
                <>
                    {macros.highCarb && (
                        <>
                            <Box>
                                <Text
                                    textAlign="center"
                                    color="white"
                                    fontSize="large"
                                >
                                    <strong>High Carb Day</strong>
                                </Text>
                            </Box>
                            <Flex border="1px solid white" borderRadius="10px" padding="10px">
                                <MacroDonutChartLegend
                                    carbDayType={macros.highCarb}
                                />
                                <Box height="12rem">
                                    <DonutChart
                                        data={
                                            prepareChartData(macros.highCarb)
                                                .chartData
                                        }
                                        options={
                                            prepareChartData(macros.highCarb)
                                                .chartOptions
                                        }
                                    />
                                </Box>
                            </Flex>
                        </>
                    )}
                    {macros.mediumCarb && (
                        <>
                            <Box>
                                <Text
                                    textAlign="center"
                                    color="white"
                                    fontSize="large"
                                >
                                    <strong>Medium Carb Day</strong>
                                </Text>
                            </Box>
                            <Flex border="1px solid white" borderRadius="10px" padding="10px">
                                <MacroDonutChartLegend
                                    carbDayType={macros.mediumCarb}
                                />
                                <Box height="12rem">
                                    <DonutChart
                                        data={
                                            prepareChartData(macros.mediumCarb)
                                                .chartData
                                        }
                                        options={
                                            prepareChartData(macros.mediumCarb)
                                                .chartOptions
                                        }
                                    />
                                </Box>
                            </Flex>
                        </>
                    )}
                    {macros.lowCarb && (
                        <>
                            <Box>
                                <Text
                                    textAlign="center"
                                    color="white"
                                    fontSize="large"
                                >
                                    <strong>Low Carb Day</strong>
                                </Text>
                            </Box>
                            <Flex border="1px solid white" borderRadius="10px" padding="10px">
                                <MacroDonutChartLegend
                                    carbDayType={macros.lowCarb}
                                />
                                <Box height="12rem">
                                    <DonutChart
                                        data={
                                            prepareChartData(macros.lowCarb)
                                                .chartData
                                        }
                                        options={
                                            prepareChartData(macros.lowCarb)
                                                .chartOptions
                                        }
                                    />
                                </Box>
                            </Flex>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default MacroOutlineDonutChart;
