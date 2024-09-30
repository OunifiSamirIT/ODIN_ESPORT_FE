import React from 'react'
import imagePP from "../../assets/imagePP.png"
import starPP from "../../assets/starPP.svg"
import "./ProfessionalProle3.scss"

export default function ProfessionalProfile3() {
  return (
    <div className='profesionalProfileContainer'>
     <div className="aboveContainer">
     <div className='seperateCon '>

      <div className="personalDetailCon con ">
        <img src={imagePP} alt=""  className='personalImage'/>
        <div className="infoCon">
          <img src={starPP} alt=""  className='star'/>
          <p className="playerName">ALAN HOWLETT</p>
          <p className="playerNickName">bel hajj mohamed</p>
          <div className="positionCon">Ailier Gauche </div>
        </div>
      </div>

      <div className="starsContainer con"></div>
     </div>
      <div className="statContainer con"></div>
      </div>
      <div className="testValuesContainer">
        <nav>
          <ul>
         
          </ul>
        </nav>
        <main>
          <div className="jonglage">
            <h1>Jonglage</h1>
          </div>
        </main>
      </div>
      <div className="videoContainer">
        <h1>Vidéo test collective</h1>
      </div>

    </div>
  )
}
