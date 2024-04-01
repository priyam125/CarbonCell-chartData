import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Nations",
        color: "#ef233c",
        font: {
          size: 20,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Population (in millions)",
        color: "#ef233c",
        font: {
          size: 20,
        },
      },
      ticks: {
        callback: function (value, index, values) {
          if (value >= 1000000) {
            return value / 1000000 + "M";
          } else if (value >= 1000) {
            return value / 1000 + "K";
          } else {
            return value;
          }
        },
      },
    },
  },
};

function BarChart({ chartData }) {
  return <Bar data={chartData} options={options} />;
}

export default BarChart;
