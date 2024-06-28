// RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = {
    labels: ["Speed", "Dribble", "Passe", "Défense", "Tir", "Puissance"],
    datasets: [
      {
        label: "Stats",
        data: [78, 65, 59, 47, 71, 63],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="md:-mt-[60px] md:w-[350px] md:h-[350px] w-[290px] h-[290px] ">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
