import React from "react";
import { Doughnut } from "react-chartjs-2";

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
                            this.height = this.height + 20;
                        };
                    },
                },
            ]}
        />
    );
};

export default DonutChart;
