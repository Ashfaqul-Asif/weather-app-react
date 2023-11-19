import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const LineChart = () => {
  const next5daysForeCast = useSelector(
    (state) => state.weather.next5daysForeCast
  );

  const data = {
    labels: next5daysForeCast.map((item) => moment(item.dt_txt).format("ddd")),
    datasets: [
      {
        label: "Temperature",
        data: next5daysForeCast.map((item) => item.main.temp),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "5 Days Forecast Temperature",
        font: {
          size: 20, // Adjust the font size as desired
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
