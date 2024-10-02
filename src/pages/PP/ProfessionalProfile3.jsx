import React, { useEffect, useRef, useState } from "react";
import imagePP from "../../assets/imagePP.png";
import starPP from "../../assets/starPP.svg";
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
import { Radar } from "react-chartjs-2";

export default function ProfessionalProfile3() {
  const [currentTestWindow, setCurrentTestWindow] = useState(1);
  const [currentPercentage, setCurrentPercentage] = useState(60);

  // useEffect(() => {
  //   alert(currentPercentage)

  //   let interval
  //   if (currentPercentage > 60) {

  //     alert("cleard")
  //     clearInterval(interval)
  //   }
  //   else {
  //      interval = setInterval(() => {
  //       setCurrentPercentage(prev => prev + 1)
  //     }, 100);
  //   }
  // }, [currentPercentage])

  return (
    <div className="profesionalProfileContainer">
      <div className="aboveContainer">
        <div className="seperateCon ">
          <div className="personalDetailCon con ">
            <img src={imagePP} alt="" className="personalImage" />
            <div className="infoCon">
              <img src={starPP} alt="" className="star" />
              <p className="playerName">ALAN HOWLETT</p>
              <p className="playerNickName">bel hajj mohamed</p>
              <div className="positionCon">Ailier Gauche </div>
            </div>
          </div>

          <div className="starsNdWheelContainer con">
            {/* <div className="wheelPercentageCon">
          <div className="inner">
            <div className="percVal">
              <p>7.8</p> 
              <p>Moyenne</p> 
            </div>
          </div>
          </div> */}
            {/* <CircularProgressbar value={currentPercentage} text={`${currentPercentage}%`} /> */}
            <div className="StarsPercentageCon">
              <div className="starsWrapperCon">
                {new Array(5).fill("").map(() => (
                  <img src={Star} alt="" />
                ))}
              </div>
              <div className="starsFilledWrapperCon">
                {new Array(5).fill("").map(() => (
                  <img src={FilledStar} alt="" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="statContainer con"></div>
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
                  val: 7.2,
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
                  val: 40,
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
                  val: 25,
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
        <h1>Vidéo test collective</h1>
      </div>
    </div>
  );
}

let CustomStatBar = ({ title, data = [] }) => {
  let getWidthBarPercentage = (val, totVal) => {
    return (val / totVal) * 100;
  };

  return (
    <div className="jonglage">
      <h1>{title}</h1>
      {data.map((d) => (
        <>
          <div className="ExercideNdValueCon">
           <div className="aboveTitleBar">
             {d.currentTestWindow != 2 && (d.currentTestWindow == 3 ? (
              <p style={{fontWeight: "bold"}}>
                {d.val <= d.averge && "Moyenne"}
                {60 < d.val && "bonne"}
              </p>
            ) : (
              <p>{d.test}</p>
            ))
             }
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
