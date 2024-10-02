import React, { useEffect, useRef, useState } from "react";
import imagePP from "../../assets/imagePP.png";
import starPP from "../../assets/starPP.svg";
import ABientot from "../../assets/ABientot.png";
import Vitesse from "./svg/Vitesse";
import Tir from "./svg/Tir";
import Agilite from "./svg/Agilite";
import Conduite from "./svg/Conduite";
import Jonglage from "./svg/Jonglage";
import Saut from "./svg/Saut";
import Star from "../../assets/Star.svg";
import FilledStar from "../../assets/StarFilled.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProfessionalProle3.scss";
import RadarChart from "./RadarChart";
import Header from "../../components/Header2";
import { useCountUp } from 'react-countup';

export default function ProfessionalProfile3() {
  const [currentTestWindow, setCurrentTestWindow] = useState(1);
  const [profileRating, setProfileRating] = useState(6);
  return (
    <div className="profesionalProfileContainer">
      {/* <Header /> */}
      <div className="aboveContainer">
        <div className="seperateCon ">
          <div className="personalDetailCon con ">
          <img src={imagePP} alt=""  
          loading="lazy"
          className="personalImage" />
            <div className="infoCon">
              <img src={starPP} alt="" className="star" />
              <p className="playerName">ALAN HOWLETT</p>
              <p className="playerNickName">bel hajj mohamed</p>
              <div className="positionCon">Ailier Gauche </div>
            </div>
          </div>

          <div className="starsNdWheelContainer con">
            <CircularPercentage rate={profileRating}  />

            <div class="point"></div>
            <div className="StarsPercentageCon">
              <div className="starsWrapperCon">
                {new Array(5).fill("").map(() => (
                  <img src={Star} alt="" />
                ))}
              </div>
              <div
                className="starsFilledWrapperCon"
                style={{
                  maxWidth: (profileRating /10) * 100 + "%",
                }}
              >
                <div className="inner">
                  {new Array(5).fill("").map(() => (
                    <img src={FilledStar} alt="" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="statContainer con">
        <RadarChart style={{ padding: 20 }}  />


        </div>
      </div>
      <div className="testValuesContainer">
        <nav>
          <ul>
            <li
              className={`${currentTestWindow == 1 && "active"}`}
              onClick={() => setCurrentTestWindow(1)}
            >
              <Vitesse />
              Vitesse
            </li>
            <li
              className={`${currentTestWindow == 2 && "active"}`}
              onClick={() => setCurrentTestWindow(2)}
            >
              <Saut />
              Saut
            </li>
            <li
              className={`${currentTestWindow == 3 && "active"}`}
              onClick={() => setCurrentTestWindow(3)}
            >
              <Agilite />
              Agilité
            </li>
            <li
              className={`${currentTestWindow == 4 && "active"}`}
              onClick={() => setCurrentTestWindow(4)}
            >
              <Tir />
              Tir de balle
            </li>
            <li
              className={`${currentTestWindow == 5 && "active"}`}
              onClick={() => setCurrentTestWindow(5)}
            >
              <Jonglage />
              Jonglage
            </li>
            <li
              className={`${currentTestWindow == 6 && "active"}`}
              onClick={() => setCurrentTestWindow(6)}
            >
              <Conduite />
              Conduite
            </li>
          </ul>
        </nav>
        <main>
          {currentTestWindow === 1 && (
            <CustomStatBar
              title="Vitesse"
              data={[
                {
                  test: "10M",
                  unit: "sec",
                  val: 10,
                  min: [20, 28],
                  averge: [30, 34],
                  max: [36, 50],
                  currentTestWindow: 1,
                },

                {
                  test: "20M",
                  unit: "sec",
                  val: 32.2,
                  min: [20, 28],
                  averge: [30, 34],
                  max: [36, 50],
                  currentTestWindow: 1,
                },
                {
                  test: "30M",
                  unit: "sec",
                  val: 40.1,
                  min: [20, 28],
                  averge: [30, 34],
                  max: [36, 50],
                  currentTestWindow: 1,
                },
              ]}
            />
          )}

          {currentTestWindow == 2 && (
            <CustomStatBar
              title="Saut"
              data={[
                {
                  test: "Avec Contrainte",
                  unit: "M",
                  val: 0.6,
                  min: [0],
                  averge: [0],
                  max: [1],
                  currentTestWindow: 2,
                },
              ]}
            />
          )}

          {currentTestWindow == 3 && (
            <CustomStatBar
              title="Agilité"
              data={[
                {
                  test: "Zigzag",
                  unit: "U",
                  val: 50,
                  min: [0],
                  averge: [50],
                  max: [100],
                  currentTestWindow: 3,
                },
              ]}
            />
          )}

          {currentTestWindow == 4 && (
            <CustomStatBar
              title="Tir de balle"
              data={[
                {
                  test: "Avec Contrainte",
                  unit: "U",
                  val: 60,
                  min: [0, 50],
                  averge: [75, 100],
                  max: [125, 150],
                  currentTestWindow: 4,
                },
                {
                  test: "Sans Contrainte",
                  unit: "U",
                  val: 130,
                  min: [0, 50],
                  averge: [75, 100],
                  max: [125, 150],
                  currentTestWindow: 4,
                },
              ]}
            />
          )}

          {currentTestWindow === 5 && (
            <CustomStatBar
              title="Jonglage"
              data={[
                {
                  test: "Pied Fort",
                  unit: "U",
                  val: 45,
                  min: [10],
                  averge: [25],
                  max: [50],
                  currentTestWindow: 5,
                },

                {
                  test: "Pied Faible",
                  unit: "U",
                  val: 9,
                  min: [10],
                  averge: [25],
                  max: [50],
                  currentTestWindow: 5,
                },
                {
                  test: "Deux Pieds",
                  unit: "U",
                  val: 30,
                  min: [10],
                  averge: [25],
                  max: [50],
                  currentTestWindow: 5,
                },
              ]}
            />
          )}

          {currentTestWindow == 6 && (
            <CustomStatBar
              title="Conduite"
              data={[
                {
                  test: "Zigzag",
                  unit: "U",
                  val: 40,
                  min: [0],
                  averge: [50],
                  max: [100],
                  currentTestWindow: 6,
                },
                {
                  test: "Slalom",
                  unit: "U",
                  val: 60,
                  min: [0],
                  averge: [50],
                  max: [100],
                  currentTestWindow: 6,
                },
              ]}
            />
          )}
        </main>
      </div>
      <div className="videoContainer">
        <h1>Vidéo test collective
        
        </h1>
        <span className="text-sm md:ml-5 max-sm:block animate-pulse font-normal text-orange-500">
                    A Venir Bientôt ...
                  </span>
      
        <img
          loading="lazy"
          src={ABientot}
        />
      </div>
    </div>
  );
}

let CustomStatBar = ({ title, data = [], detail }) => {
  let getWidthBarPercentage = (val, totVal) => {
    return (val / totVal) * 100;
  };

  let getColorBarPercentage = (val, min, averge, max) => {
    if (max.length > 1) {
      if (0 < val && val < min[1]) {
        return "#EB2E2E";
      }

      if (min[1] < val && val < averge[1]) {
        return "#FF7F00";
      }

      if (averge[1] < val && val < max[1]) {
        return "#2E71EB";
      }
    } else {
      if (val == min[0]) {
        return "#EB2E2E";
      }
      if (val <= averge[0]) {
        return "#FF7F00";
      }
      if (averge[0] <= val) {
        return "#2E71EB";
      }
    }
  };

  return (
    <div className="jonglage">
      <h1>{title}</h1>
      {data.map((d) => (
        <>
          <div className="ExercideNdValueCon">
            <div className="aboveTitleBar">
              {d.currentTestWindow != 2 &&
                (d.currentTestWindow == 3 ? (
                  <p style={{ fontWeight: "bold" }}>
                    {d.val == 0 && "0"}
                    {d.val <= d.averge && "Moyenne"}
                    {d.averge < d.val && "bonne"}
                  </p>
                ) : (
                  <p>{d.test}</p>
                ))}
            </div>

            <p
              className="testVal"
              style={{
                display:
                  d.currentTestWindow == 2 || d.currentTestWindow == 3
                    ? "none"
                    : "block",
              }}
            >
              {d.val} {d.unit}
            </p>
          </div>
          <div className="barCon">
            <div className="wrapper">
              <div
                className="progressBar"
                style={{
                  width:
                    getWidthBarPercentage(d.val, d.max[d.max.length - 1]) + "%",
                  backgroundColor: getColorBarPercentage(
                    d.val,
                    d.min,
                    d.averge,
                    d.max
                  ),
                }}
              ></div>
            </div>
          </div>
          <p
            className="sautVal testVal"
            style={{
              display: d.currentTestWindow == 2 ? "block" : "none",
            }}
          >
            {d.val} {d.unit}
          </p>
        </>
      ))}
    </div>
  );
};

let CircularPercentage = ({ rate }) => {
  const [currentStrokePercentage, setStrokePercentage] = useState("0 999");
  useCountUp({ ref: 'counter', end: rate });

  let percentage = rate/10 * 100
  const circular = useRef(null);
  useEffect(() => {
    console.log(circular.current.childNodes[0].getAttribute("r"));

    let roundRadius = circular.current.childNodes[0].getAttribute("r");
    let roundCircum = 2 * roundRadius * Math.PI;
    let roundDraw = (percentage * roundCircum) / 100;
    setStrokePercentage(roundDraw + " 999");
  }, []);

  return (

    <div className="wheel">
    <div className="Detail">
      <p id="counter"></p>
      <p>
      {rate <5 && "Faible"}
      {rate >= 5 && "Moyenne"}
      {rate == 5 && "Bien"}
      </p>
    </div>
    <svg 
      class="round"
      ref={circular}
      style={{
        strokeDasharray: currentStrokePercentage,
      }}
       viewBox="0 0 324 324" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="167.048" cy="160.317" r="117.786" stroke="#F8FAFC" stroke-width="13.4613" />
      <path d="M153.549 282.857C127.763 281.054 103.229 271.05 83.5344 254.309C63.8393 237.567 50.0152 214.965 44.0825 189.806C38.1497 164.647 40.4194 138.25 50.5599 114.473C60.7003 90.6959 78.1798 70.7855 100.444 57.6518C122.707 44.518 148.588 38.8494 174.304 41.4746C200.019 44.0997 224.221 54.8809 243.372 72.2424C262.523 89.604 275.618 112.636 280.745 137.971C285.872 163.307 282.761 189.618 271.867 213.059" stroke="url(#paint0_linear_4773_5518)" stroke-width="13.5174" stroke-linecap="round" stroke-linejoin="round" />
      <defs>
        <linearGradient id="paint0_linear_4773_5518" x1="270.891" y1="108.891" x2="53.1096" y2="215.109" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2E71EB" />
          <stop offset="1" stop-color="#10419B" />
        </linearGradient>
      </defs>
    </svg></div>
  );
};

