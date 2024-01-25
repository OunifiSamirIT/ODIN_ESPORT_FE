import React,{Component, useEffect, useState} from 'react';
import Slider from "react-slick";



function Friendsilder () {
    const [agents, setAgents] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
      // Fetch data from your API endpoint using the fetch API
      fetch("http://localhost:8088/api/agents")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching agents: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAgents(data))
      .catch((error) => console.error("Error fetching agents:", error));
     
     
      fetch("http://localhost:8088/api/players")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching players: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setPlayers(data))
        .catch((error) => console.error("Error fetching players:", error));
  
  
        
    }, []);
        const friendsettings = {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
        };
        return (
            <Slider {...friendsettings}>
                {agents.map((value , index) => (
                <div key={index} className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 ">
                    <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src={`assets/images/${value.imageUrl}`} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {value.nom} </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{value.email}</p>
                        <a href="/" className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</a>
                    </div>
                </div>
                ))}
                          {players.map((player) => (
                <div key={player.id} className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 ">
                    <div key={player?.user?.id} className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src={`assets/images/loggin.png`} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {player?.user?.nom} </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{player?.user?.email}</p>
                        <a href="/" className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</a>
                    </div>
                </div>
                ))}
            </Slider>
        );
    
}

export default Friendsilder;