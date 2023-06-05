import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import DonutChart from "../shared/donut-chart";
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.register(ArcElement);

const DonutTest = (macroDistribution) => {
    console.log(macroDistribution);
    const macros = macroDistribution.macroDistribution;
    console.log(macros);
    const prepareChartData = (macros, label) => {
        const { carbohydrates, protein, fats } = macros;
        console.log(macros);
        console.log(label);
        const chartData = {
            labels: [
                "Carbohydrates " + carbohydrates,
                "Protein " + protein,
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
        // const chartOptions = {
        //     legend: {
        //         position: "bottom",
        //         labels: {
        //             boxWidth: 15,
        //         },
        //     },
        //     title: {
        //         display: true,
        //         text: label,
        //         font: {
        //             size: "16",
        //             family: "Montserrat",
        //         },
        //     },
        // };

        return { chartData, chartOptions };
    };

    return (
        <>
            {macros && (
                <>
                    {macros.highCarb && (
                        <Box color="white" height="12rem">
                        <DonutChart
                            data={
                                prepareChartData(
                                    macros.highCarb,
                                    "High Carb Day"
                                ).chartData
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
                        <DonutChart
                            data={
                                prepareChartData(
                                    macros.mediumCarb,
                                    "Medium Carb Day"
                                ).chartData
                            }
                            options={
                                prepareChartData(
                                    macros.mediumCarb,
                                    "Medium Carb Day"
                                ).chartOptions
                            }
                        />
                    )}
                    {macros.lowCarb && (
                        <DonutChart
                            data={
                                prepareChartData(macros.lowCarb, "Low Carb Day")
                                    .chartData
                            }
                            options={
                                prepareChartData(macros.lowCarb, "Low Carb Day")
                                    .chartOptions
                            }
                        />
                    )}
                </>
            )}
        </>
    );
};

export default DonutTest;
