import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import TestServer from "../../api/test.server";
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

  const [vitesse, setVitesse] = useState(80);
  const [saut, setSaut] = useState(30);
  const [tir, setTir] = useState(70);
  const [conduit, setConduit] = useState();
  const [agilite, setAgilite] = useState(50);
  const [jonglage, setJonglage] = useState(50);

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
      (data?.slalom?.total_score + data?.zigzag?.total_score)  > 200 ? setConduit(100) : setConduit(((data?.slalom?.total_score + data?.zigzag?.total_score) ) * 100/ 200);
    } catch (error) {
      console.error("Error fetching conduit data: ", error);
    }
  };

  const getAgiliteForCurrentUser = async (id) => {
    try {
      console.log("Agilite id: ", id);

      let data = await TestServer.getAgiliteStatsByUser(id);
      console.log("Agilite Data: ", data);
      setAgilite((data?.total_score * 100) / 100);
    } catch (error) {
      console.error("Error fetching agilite data: ", error);
    }
  };

  const getJonglageForCurrentUser = async (id) => {
    try {
      let data = await TestServer.getJonglageStatsByUser(id);
      const sommeallscore = data?.jFort + data?.JFaible + data?.JDeux 
      console.log("Jonglage Data: ", sommeallscore);
      setJonglage(((sommeallscore ) * 100) / 150);
    } catch (error) {
      console.error("Error fetching jonglage data: ", error);
    }
  };

  const getTirForCurrentUser = async (id) => {
    try {
        const Alldata = await TestServer.getTirStatsByUser(id);
        console.log("Tir Data: ", Alldata); // Now this should show the data correctly
        
        if (!Alldata) {
            console.error("No data returned from API");
            return;
        }

        const sommetir = (Alldata.TirContrainte?.total_score || 0) + (Alldata.tir?.total_score || 0);
        setTir(((sommetir) * 100) / 300);
        console.log("taux tir" , tir)

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
          color: "transparent", // Color for the tick labels
          backdropColor: "rgba(0, 0, 0, 0)", // Make the backdrop transparent
         
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const formattedValue = parseFloat(value).toFixed(2); 

            const displayValue = parseFloat(formattedValue); 
            const percentage = displayValue + "%";

            const label = tooltipItem.label; 
            return `Taux performance:  ${percentage}`;
          },
        },
      },
    },
  };


  return (
          <Radar   style={{ padding: " 0 5px" }} data={data} options={options} />
  );
};

export default RadarChart;
