import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import TestServer from "../../../api/test.server";
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

const RadarChart = ({ id }) => {
  const dashedLinePlugin = {
    id: "dashedLinePlugin",
    beforeDraw: (chart) => {
      const {
        ctx,
        scales: { r },
      } = chart;
      const { grid } = r;

      // Get the positions of the ticks
      const tickPositions = r.ticks.map((tick) =>
        r.getDistanceFromCenterForValue(tick.value)
      );

      // Draw grid lines
      tickPositions.forEach((position, index) => {
        ctx.save();
        ctx.beginPath();
        if (index === 2) {
          // Third line (index 2)
          ctx.setLineDash([5, 5]); // Set dashed line pattern
        } else {
          ctx.setLineDash([]); // Solid lines for other grid lines
        }
        ctx.strokeStyle = grid.color;
        ctx.lineWidth = grid.lineWidth;
        ctx.arc(r.xCenter, r.yCenter, position, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      });
    },
  };

  const [vitesse, setVitesse] = useState(0);
  const [saut, setSaut] = useState(0);
  const [tir, setTir] = useState(0);
  const [conduit, setConduit] = useState(0);
  const [agilite, setAgilite] = useState(0);
  const [jonglage, setJonglage] = useState(0);

  const getVitesseForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getVitesseStatsByUser(id);
      console.log("Vitesse Data: ", data);
      setVitesse((data?.points * 100) / 150);
    } catch (error) {
      console.error("Error fetching vitesse data: ", error);
    }
  };

  const getSautForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getSautStatsByUser(id);
      console.log("Saut Data: ", data);
      setSaut((data?.totalPoints * 100) / 100);
    } catch (error) {
      console.error("Error fetching saut data: ", error);
    }
  };

  const getConduitForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getConduitStatsByUser(id);
      console.log("Conduit Data: ", data);
      data > 100 ? setConduit(100) : setConduit((data * 100) / 100);
    } catch (error) {
      console.error("Error fetching conduit data: ", error);
    }
  };

  const getAgiliteForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getagiliteStatsByUser(id);
      console.log("Agilite Data: ", data);
      setAgilite((data?.data?.total_score * 100) / 100);
    } catch (error) {
      console.error("Error fetching agilite data: ", error);
    }
  };

  const getJonglageForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getJonglageStatsByUser(id);
      console.log("Jonglage Data: ", data);
      setJonglage((data?.data?.points * 100) / 100);
    } catch (error) {
      console.error("Error fetching jonglage data: ", error);
    }
  };

  const getTirForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getTirStatsByUser(id);
      console.log("Tir Data: ", data);
      setTir(data.somme ? (data.somme * 100) / 300 : 0);
    } catch (error) {
      console.error("Error fetching tir data: ", error);
    }
  };

  useEffect(() => {
    getVitesseForCurrentUser(id);
    getSautForCurrentUser(id);
    getConduitForCurrentUser(id);
    getAgiliteForCurrentUser(id);
    getJonglageForCurrentUser(id);
    getTirForCurrentUser(id);
  }, [id]);

  const data = {
    labels: [
      "VITESSE",
      "SAUT",
      "TIR AU BUT",
      "CONDUITE DE BALLE",
      "JONGLAGE",
      "AGILITÉ",
    ],
    datasets: [
      {
        label: "Performance",
        data: [vitesse, saut, tir, conduit, jonglage, agilite],
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        pointBackgroundColor: "rgba(255, 165, 0, 0.7)",
        pointBorderColor: "rgb(255,69,0)",
        borderColor: "#BFDEFE",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 50,
          showLabelBackdrop: false, // Hide the label backdrop
          color: "#ffffff", // Color for the tick labels
          backdropColor: "rgba(0, 0, 0, 0)", // Make the backdrop transparent
          callback: function (value) {
            return `${value}%`; // Append % to the tick values
          },
        },
        angleLines: {
          color: "#ffffff",
          borderWidth: 2,
        },
        grid: {
          color: "#ffffff",
          lineWidth: 2,
          borderDash: [5, 5], // Create dashed lines (array of lengths)
          tickLength: 3, // Offset for dashed lines
        },
        pointLabels: {
          color: "#ffffff",
          font: {
            size: 16,
            weight: "600",
            padding: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      dashedLinePlugin,
    },
  };

  return (
    <div className="flex flex-col py-6 bg-[linear-gradient(52deg,#3C8AF5_0.06%,#2E71EB_24.43%,#1E56D7_75.66%,#1F46AE_99.53%)] rounded-[10px] h-full text-white ">
      <div className="w-full h-full">
        <div className="text-3xl text-center max-sm:text-xl font-bold text-white max-md:max-w-full ">
          Performance Radar
          <Radar style={{ padding: 20 }} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
