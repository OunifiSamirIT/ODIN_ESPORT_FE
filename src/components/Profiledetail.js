import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profiledetail() {
  const [agents, setAgents] = useState([]);
  const [players, setPlayers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const id = storedUserData.id;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://odine-sport.com/api/other/${id}`);
        const data = await response.json();
        setUserInfo(data);
        console.log("hhhsksksk", userInfo);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    console.log(userInfo);
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    // You can render a loading state here
    return <p>Loading...</p>;
  }
  const isPlayerProfile = storedUserData && storedUserData.profil === "player";

  const isOtherProfile = storedUserData && storedUserData.profil === "other";
  const isagentProfile = storedUserData && storedUserData.profil === "agent";

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
      <div className="card-body d-block p-4">
        <h4 className="fw-700 mb-3 font-xsss text-grey-900">Détails</h4>
        <h2 className="mb-2">
          Profile:
          <span className="ml-2 font-bold">{storedUserData.profil}</span>
        </h2>
        {isPlayerProfile && (
          <>
            <h2 className="mb-2">
              Postion :
              <span className="ml-2 font-bold">{players.positionPlay}</span>
            </h2>
            <h2 className="mb-2">
              Meilleur Compétence:
              <span className="ml-2 font-bold">{players.skillsInProfile}</span>
            </h2>
          </>
        )}
      </div>

      <div className="card-body d-flex pt-0">
        <i className="feather-eye text-grey-500 me-3 font-lg"></i>
        <h4 className="fw-700 text-grey-900 font-xssss mt-0">
          Visble{" "}
          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
            Anyone can find you
          </span>
        </h4>
      </div>
      <div className="card-body d-flex pt-0">
        <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          {userInfo?.user?.nationality}{" "}
        </h4>
      </div>
    </div>
  );
}

export default Profiledetail;
