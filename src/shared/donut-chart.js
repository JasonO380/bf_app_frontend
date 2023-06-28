import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.register(ArcElement);

const DonutChart = (props) => {
    const chartData = props.data;
    const chartOptions = props.options;
    console.log(chartData);

    return (
        <Doughnut
            data={chartData}
            options={chartOptions}
            plugins={[
                {
                    beforeInit: function (chart) {
                        chart.legend.afterFit = function () {
                            this.width = this.width += 20;
                        };
                    },
                },
            ]}
        />
    );
};

export default DonutChart;
