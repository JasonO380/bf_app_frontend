import React, { useState, useEffect } from "react";
import DonutChart from "../shared/donut-chart";

const MacroOutlineDonutChart = ({ macroDistribution }) => {
    console.log(macroDistribution);
    const [cData, setCData] = useState(null);
    const [cOptions, setCOptions] = useState(null);

    const prepareChartData = (macroDistribution) => {
        const { highCarb, mediumCarb, lowCarb } = macroDistribution;
        console.log(highCarb.carbohydrates, " high carbs");

        const chartData = {
            labels: ["High Carb", "Medium Carb", "Low Carb"],
            datasets: [
                {
                    label: "Carbs",
                    data: [
                        highCarb.carbohydrates,
                        mediumCarb.protein,
                        lowCarb.fats,
                    ],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
                {
                    label: "Protein",
                    data: [
                        highCarb.protein,
                        mediumCarb.protein,
                        lowCarb.protein,
                    ],
                    backgroundColor: ["#FFB8D1", "#82CFFD", "#FFE88D"],
                    hoverBackgroundColor: ["#FFB8D1", "#82CFFD", "#FFE88D"],
                },
                {
                    label: "Fats",
                    data: [highCarb.fats, mediumCarb.fats, lowCarb.fats],
                    backgroundColor: ["#FFA7B2", "#7EC2F3", "#FFD460"],
                    hoverBackgroundColor: ["#FFA7B2", "#7EC2F3", "#FFD460"],
                },
            ],
        };

        const chartOptions = {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 15,
                },
            },
        };
        setCData(chartData);
        setCOptions(chartOptions);
    };

    useState(() => {
        prepareChartData(macroDistribution);
    }, [macroDistribution]);

    return cData && <DonutChart data={cData} options={cOptions} />;
};

export default MacroOutlineDonutChart;
