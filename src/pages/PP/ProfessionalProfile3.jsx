import React, { useState } from 'react'
import imagePP from "../../assets/imagePP.png"
import starPP from "../../assets/starPP.svg"
import "./ProfessionalProle3.scss"
import { Radar } from "react-chartjs-2";

export default function ProfessionalProfile3() {
  const [currentTestWindow, setCurrentTestWindow] = useState(1)
  return (
    <div className='profesionalProfileContainer'>
      <div className="aboveContainer">
        <div className='seperateCon '>

          <div className="personalDetailCon con ">
            <img src={imagePP} alt="" className='personalImage' />
            <div className="infoCon">
              <img src={starPP} alt="" className='star' />
              <p className="playerName">ALAN HOWLETT</p>
              <p className="playerNickName">bel hajj mohamed</p>
              <div className="positionCon">Ailier Gauche </div>
            </div>
          </div>

          <div className="starsContainer con"></div>
        </div>
        <div className="statContainer con">
        </div>
      </div>
      <div className="testValuesContainer">
        <nav>
          <ul>
            <li className={`${ currentTestWindow == 1 && "active"}`} onClick={() => setCurrentTestWindow(1)}>Vitesse</li>
            <li className={`${ currentTestWindow == 2 && "active"}`}   onClick={() => setCurrentTestWindow(2)}>Saut</li>
            <li className={`${ currentTestWindow == 3 && "active"}`}  onClick={() => setCurrentTestWindow(3)}>Agilité</li>
            <li className={`${ currentTestWindow == 4 && "active"}`}  onClick={() => setCurrentTestWindow(4)}>Tir de balle</li>
            <li className={`${ currentTestWindow == 5 && "active"}`}  onClick={() => setCurrentTestWindow(5)}>Jonglage</li>
            <li className={`${ currentTestWindow == 6 && "active"}`}  onClick={() => setCurrentTestWindow(6)}>Conduite</li>
          </ul>
        </nav>
        <main>
          {
            currentTestWindow == 1 &&

            <CustomStatBar title='Vitesse' />
          }

          {
            currentTestWindow == 2 &&

            <CustomStatBar title='Saut' />
          }

          {
            currentTestWindow == 3 &&

            <CustomStatBar title='Agilité' />
          }

          {
            currentTestWindow == 4 &&

            <CustomStatBar title='Tir de balle' />
          }


          {
            currentTestWindow == 5 &&

            <CustomStatBar title='Jonglage' />
          }


          {
            currentTestWindow == 6 &&

            <CustomStatBar title='Conduite'  />
          }

        </main>
      </div>
      <div className="videoContainer">
        <h1>Vidéo test collective</h1>
      </div>

    </div>
  )
}


let CustomStatBar = ({ title, data = [{}] }) => {
  return (
    <div className="jonglage">

      <h1>{title}</h1>
      {
        data.map((data) => (
          <>
            <div className="ExercideNdValueCon">
              <p>Pied Fort</p>
              <p>0 U</p></div>
            <div className="barCon">
              <div className="wrapper">
              <div className="progressBar" style={{}}></div>

              </div>
            </div>
          </>
        ))
      }

    </div>
  )
}