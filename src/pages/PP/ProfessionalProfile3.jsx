import React, { useEffect, useMemo, useRef, useState } from "react";
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
import "./ProfessionalProle3.scss";
import RadarChart from "./RadarChart";
import { useCountUp } from "react-countup";
import secureLocalStorage from "react-secure-storage";
import { useParams } from "react-router-dom";
import { Config } from "../../config";

export default function ProfessionalProfile3() {
  const [currentTestWindow, setCurrentTestWindow] = useState(1);
  const [profileRating, setProfileRating] = useState(0);
  const [appearRadar, setAppearRadar] = useState(false);
  const [sautData, setSautData] = useState(null);
  const [vitesseData, setVitesseData] = useState(null);
  const [agiliteData, setAgiliteData] = useState(null);
  const [tirData, setTirData] = useState(null);
  const [jonglageData, setJonglageData] = useState(null);
  const [conduitData, setConduitData] = useState(null);
  const MobileRadar = useRef();
  const [isDataReady, setIsDataReady] = useState(false); // Flag pour indiquer que les données sont prêtes

  const storedUserDatad = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const fetchPlayer = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenn}`,
      },
    });
    const result = await response.json();
    setPlayer(result);
    console.log("name player here", player);
  };
  // Function to fetch saut data
  const fetchSaut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getSaut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      const data = await response.json();
      setSautData(data);
      console.log(data, "sautdataaaaaa");

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Saut Data:", data);
    } catch (error) {
      console.error("Error fetching saut:", error);
    }
  };
  const fetchVitesse = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getvitesse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      setVitesseData(data);
      console.log(data, "aloo vitessee");
      console.log(data, "fetchVitesse");

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("vitessseee Data:", data);
    } catch (error) {
      console.error("Error fetching saut:", error);
    }
  };
  const fetchAgilite = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getAgilite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      const data = await response.json();
      setAgiliteData(data);
      console.log(data, "aloo fetchAgilite");

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching saut:", error);
    }
  };
  const fetchTirBall = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getTir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      const data = await response.json();
      setTirData(data);
      console.log(data, "fetchTirBall");

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching saut:", error);
    }
  };
  const fetchJonglage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getJonglage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      const data = await response.json();
      setJonglageData(data);
      console.log(data, "fetchjonglage");

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching saut:", error);
    }
  };
  const fetchConduit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getConduit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      const data = await response.json();
      setConduitData(data);
      console.log(data, "fetchConduit");

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching saut:", error);
    }
  };

  useEffect(() => {
    fetchPlayer();
    fetchSaut();
    fetchVitesse();
    fetchAgilite();
    fetchTirBall();
    fetchJonglage();
    fetchConduit();
  }, []);

  function AnimateRadarOnMobileScreen() {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAppearRadar(true);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    observer.observe(MobileRadar.current);
  }
  useEffect(() => {
    AnimateRadarOnMobileScreen();
  }, []);
  useEffect(() => {
    // Vérifie que toutes les données nécessaires sont présentes
    if (
      vitesseData?.points10M !== undefined &&
      vitesseData?.points20M !== undefined &&
      vitesseData?.points30M !== undefined &&
      sautData?.totalPoints !== undefined &&
      tirData?.TirContrainte?.total_score !== undefined &&
      agiliteData?.total_score !== undefined &&
      tirData?.tir?.total_score !== undefined &&
      jonglageData?.piedFort?.total_score !== undefined &&
      jonglageData?.piedFaible?.total_score !== undefined &&
      jonglageData?.DeuxPied?.total_score !== undefined &&
      conduitData?.zigzag?.total_score !== undefined &&
      conduitData?.slalom?.total_score !== undefined
    ) {
      // Toutes les données sont prêtes, procéder au calcul
      const allTestData = {
        vitesse: [
          { val: vitesseData?.points10M },
          { val: vitesseData?.points20M },
          { val: vitesseData?.points30M },
        ],
        saut: [{ val: sautData?.totalPoints }],
        agilite: [{ val: agiliteData?.total_score }],
        tir: [
          { val: tirData?.TirContrainte?.total_score },
          { val: tirData?.tir?.total_score },
        ],
        jonglage: [
          { val: jonglageData?.piedFort?.total_score },
          { val: jonglageData?.piedFaible?.total_score },
          { val: jonglageData?.DeuxPied?.total_score },
        ],
        conduit: [
          { val: conduitData?.zigzag?.total_score },
          { val: conduitData?.slalom?.total_score },
        ],
      };

      let totalPoints = 0;
      Object.values(allTestData).forEach((category) => {
        category.forEach((item) => {
          if (item && typeof item.val === "number" && !isNaN(item.val)) {
            totalPoints += item.val;
          }
        });
      });

      const rating = (totalPoints / 800) * 10;
      const newRating = Math.min(Math.round(rating * 10) / 10, 10);

      setProfileRating(newRating);
      setIsDataReady(true); // Les données sont maintenant prêtes et le calcul est fait
    }
  }, [vitesseData, sautData, agiliteData, tirData, jonglageData, conduitData]);
  return (
    <div className="profesionalProfileContainer">
      {/* <Header /> */}
      <div className="aboveContainer">
        <div className="seperateCon ">
          <div className="personalDetailCon con ">
            <img
              src={imagePP}
              alt=""
              loading="lazy"
              className="personalImage"
            />
            <div className="infoCon">
              <img src={starPP} alt="" className="star" />
              <p className="playerName">{player?.user?.nom}</p>
              <p className="playerNickName">{player?.user?.prenom}</p>
              <div className="positionCon">{player?.player?.positionPlay} </div>
            </div>
          </div>

          <div className="starsNdWheelContainer con">
            {isDataReady ? ( // N'affiche le composant CircularPercentage que si les données sont prêtes
              <CircularPercentage rate={profileRating} />
            ) : (
              <p> veuillez attendre pour terminer tout vos resultat 😃 </p> // Message de chargement si les données ne sont pas prêtes
            )}

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
                  maxWidth: (profileRating / 10) * 100 + "%",
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
        <div
          className="statContainer con"
          ref={MobileRadar}
          onClick={() => setAppearRadar(true)}
        >
          <div className="mobileRadar">
            {appearRadar && (
              <div className="radarWrapper">
                <RadarChart id={id} style={{ padding: 20 }} />
              </div>
            )}
          </div>
          <div className="desktopRadar">
            <div className="radarWrapper">
              <RadarChart id={id} style={{ padding: 20 }} />
            </div>
          </div>
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
                  val: vitesseData?.points10M,
                  secondes: vitesseData?.value10,
                  min: [20, 28],
                  averge: [30, 34],
                  max: [36, 50],
                  currentTestWindow: 1,
                },

                {
                  test: "20M",
                  unit: "sec",
                  val: vitesseData?.points20M,
                  secondes: vitesseData?.value20,
                  min: [20, 28],
                  averge: [30, 34],
                  max: [36, 50],
                  currentTestWindow: 1,
                },
                {
                  test: "30M",
                  unit: "sec",
                  val: vitesseData?.points30M,
                  secondes: vitesseData?.value30,
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
                  val: sautData?.totalPoints,
                  secondes: sautData?.distances,
                  min: [0, 20],
                  averge: [40, 60],
                  max: [80, 100],
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
                  test: "Agilité",
                  unit: "U",
                  val: agiliteData?.total_score,
                  min: [25],
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
                  val: tirData?.TirContrainte?.total_score,
                  min: [0, 50],
                  averge: [50, 125],
                  max: [125, 150],
                  currentTestWindow: 4,
                },
                {
                  test: "Sans Contrainte",
                  unit: "U",
                  val: tirData?.tir?.total_score,
                  min: [0, 50],
                  averge: [50, 125],
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
                  unit: "Jongle",
                  val: jonglageData?.piedFort?.total_score,
                  secondes: jonglageData?.piedFort?.value,
                  min: [10],
                  averge: [25],
                  max: [50],
                  currentTestWindow: 5,
                },

                {
                  test: "Pied Faible",
                  unit: "Jongle",
                  val: jonglageData?.piedFaible?.total_score,
                  secondes: jonglageData?.piedFaible?.value,
                  min: [10],
                  averge: [25],
                  max: [50],
                  currentTestWindow: 5,
                },
                {
                  test: "Deux Pieds",
                  unit: "Jongle",
                  val: jonglageData?.DeuxPied?.total_score,
                  secondes: jonglageData?.DeuxPied?.value,
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
                  val: conduitData?.zigzag?.total_score,
                  min: [0],
                  averge: [50],
                  max: [100],
                  currentTestWindow: 6,
                },
                {
                  test: "Slalom",
                  unit: "U",
                  val: conduitData?.slalom?.total_score,
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
        <span className="text-sm md:ml-5 max-sm:block animate-pulse font-normal text-orange-500">
          A Venir Bientôt ...
        </span>

        <img loading="lazy" src={ABientot} />
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
      if (0 <= val && val < min[1]) {
        return "#EB2E2E";
      }

      if (min[1] <= val && val < averge[1]) {
        return "#FF7F00";
      }

      if (averge[1] <= val && val <= max[1]) {
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
                    {getColorBarPercentage(d.val, d.min, d.averge, d.max) ==
                      "#EB2E2E" && "Faible"}
                    {getColorBarPercentage(d.val, d.min, d.averge, d.max) ==
                      "#FF7F00" && "Moyenne"}
                    {getColorBarPercentage(d.val, d.min, d.averge, d.max) ==
                      "#2E71EB" && "Bonne"}
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
              {d.currentTestWindow == 4 || d.currentTestWindow == 6 ? (
                <p style={{ fontWeight: "bold" }}>
                  {getColorBarPercentage(d.val, d.min, d.averge, d.max) ==
                    "#EB2E2E" && "Faible"}
                  {getColorBarPercentage(d.val, d.min, d.averge, d.max) ==
                    "#FF7F00" && "Moyenne"}
                  {getColorBarPercentage(d.val, d.min, d.averge, d.max) ==
                    "#2E71EB" && "Bonne"}
                </p>
              ) : (
                <>
                  <>
                    {d.secondes ? d.secondes : d.val} {d.unit}{" "}
                  </>
                </>
              )}
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
            <>
              {d.secondes ? d.secondes : d.val} {d.unit}{" "}
            </>
          </p>
        </>
      ))}
    </div>
  );
};

let CircularPercentage = ({ rate }) => {
  const circular = useRef(null);

  useEffect(() => {
    if (circular.current) {
      const circle = circular.current.querySelector("circle");
      const path = circular.current.querySelector("path");

      if (circle && path) {
        const radius = circle.getAttribute("r");
        const circumference = 2 * Math.PI * radius;
        const fillPercentage = (rate / 10) * 100; // Convertir le rate en pourcentage
        const dashOffset =
          circumference - (fillPercentage / 100) * circumference;

        path.style.strokeDasharray = `${circumference} ${circumference}`;
        path.style.strokeDashoffset = dashOffset;
      }
    }
  }, [rate]);

  useCountUp({ ref: "counter", end: rate, decimals: 1 });

  return (
    <div className="wheel">
      <div className="Detail">
        <p id="counter"></p>
        <p>
          {rate < 5 && "Faible"}
          {rate > 5 && rate < 7 && "Moyenne"}
          {rate >= 7 && "Bien"}
        </p>
      </div>
      <svg
        className="round"
        ref={circular}
        viewBox="0 0 324 324"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="160.048"
          cy="167.317"
          r="117.786"
          stroke="#F8FAFC"
          strokeWidth="13.4613"
        />
        <path
          d="M153.549 282.857C127.763 281.054 103.229 271.05 83.5344 254.309C63.8393 237.567 50.0152 214.965 44.0825 189.806C38.1497 164.647 40.4194 138.25 50.5599 114.473C60.7003 90.6959 78.1798 70.7855 100.444 57.6518C122.707 44.518 148.588 38.8494 174.304 41.4746C200.019 44.0997 224.221 54.8809 243.372 72.2424C262.523 89.604 275.618 112.636 280.745 137.971C285.872 163.307 282.761 189.618 271.867 213.059"
          stroke="url(#paint0_linear_4773_5518)"
          strokeWidth="13.5174"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4773_5518"
            x1="270.891"
            y1="108.891"
            x2="53.1096"
            y2="215.109"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E71EB" />
            <stop offset="1" stopColor="#10419B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Utilisation dans ton composant principal
