import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = (props) => {
    ChartJS.defaults.color = "#FFFFFF";
    const chartData = props.data;
    const options = {
        plugins: {
            title: {
                color: "white",
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "white",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: "white",
                },
                grid: {
                    display: false,
                },
            },
        },
        tooltips: {
            mode: "index",
            intersect: true,
            titleFontColor: "white",
            bodyFontColor: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderWidth: 0,
        },
    };
    console.log(chartData);
    const line = {
        labels: chartData.map((m) => m.month),
        datasets: [
            {
                label: "Number of days lifted",
                data: chartData.map((c) => c.count),
                backgroundColor: "rgba(202, 77, 247,0.9)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };
    return <Bar data={line} options={options} />;
};

export default BarChart;
