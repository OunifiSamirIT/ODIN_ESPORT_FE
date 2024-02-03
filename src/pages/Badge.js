import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Pagetitle from "../components/Pagetitle";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

function Badge() {
  const [initialUsers, setInitialUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchNom, setSearchNom] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [searchSkills, setSearchSkills] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://odine-sport.com/api/players");
        const result = await response.json();

        setInitialUsers(result);
        setFilteredUsers(result); // Initially, show all users
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filtered = initialUsers.filter(
        (user) =>
          (user.user.nom.toLowerCase().includes(searchNom.toLowerCase()) ||
            user.user.prenom.toLowerCase().includes(searchNom.toLowerCase())) &&
          user.positionPlay
            .toLowerCase()
            .includes(searchPosition.toLowerCase()) &&
          user.skillsInProfile.toLowerCase().includes(searchSkills.toLowerCase())
      );
    setFilteredUsers(filtered);
  };

  const handleReset = () => {
    setSearchNom("");
    setSearchPosition("");
    setSearchSkills("");
    setFilteredUsers(initialUsers);
  };

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />
      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <Pagetitle title="Joueur Filter and Recherche" />
               


<div class="flex space-x-2 mb-2">
    <div class="flex items-center">
        <input
            class="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
            type="text"
            placeholder="Rechercher avec nom"
            value={searchNom}
            onChange={(e) => setSearchNom(e.target.value)}
        />
    </div>

    <div class="flex items-center">
    <select
        class="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
        value={searchPosition}
        onChange={(e) => setSearchPosition(e.target.value)}
    >
        <option value="" disabled>Select  Position</option>
        <option value="Gardien de but">Gardien de but (GK)</option>
        <option value="Arrière droit">Arrière droit (RB)</option>
        <option value="Arrière gauche">Arrière gauche( LB)</option>
        <option value="Défenseur central">Défenseur central (CB)</option>
        <option value="Milieu défensif">Milieu défensif (CDM)</option>
        <option value="Milieu central">Milieu central ( CM)</option>
        <option value="Milieu offensif">Milieu offensif ( CAM)</option>
        <option value="Ailier droit">Ailier droit (RW)</option>
        <option value="Ailier gauche">Ailier gauche ( LW)</option>
        <option value="Avant-centre">Avant-centre ( ST)</option>
    </select>
</div>


<div class="flex items-center">
    <select
        class="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
        value={searchSkills}
        onChange={(e) => setSearchSkills(e.target.value)}
    >
        <option value="" disabled>Select Skill</option>
        <option value="Rapidite">Rapidite</option>
        <option value="Tacle">Tacle</option>
        <option value="Defence">Defence</option>
        <option value="Tirs de loin">Tirs de loin</option>
        <option value="jeu en une touche">jeu en une touche</option>
        <option value="Rapidite de la prise de décision">Rapidite de la prise de décision</option>
        <option value="Frappe puissante">Frappe puissante</option>
        <option value="Agilité">Agilité</option>
        <option value="Controller du Ballon">Controller du Ballon</option>
        <option value="Dribble">Dribble</option>
        <option value="Exploitation de l'espace">Exploitation de l'espace</option>
        <option value="Evaluation des risques sur les terrain">Evaluation des risques sur les terrain</option>
        <option value="Endurance">Endurance</option>
        <option value="Equilibre et Coordination">Equilibre et Coordination</option>
        <option value="Auto-Motivation">Auto-Motivation</option>
    </select>
</div>



    

</div><div class="flex space-x-4 mb-2">
    <button class="bg-blue-500 text-white px-4 py-2 rounded sm:w-full md:w-auto" onClick={handleSearch}>Search</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded sm:w-full md:w-auto" onClick={handleReset}>Reset</button>
</div>

                <div className="row ps-2 pe-1">
                  {filteredUsers.map((user, index) => (
                    <div key={index} className="col-md-4 col-sm-6 pe-2 ps-2">
                      <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                        <div className="card-body d-block w-100 p-4 text-center">
                          <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                            <img
                              src={user.user.image}
                              alt="avatar"
                              className="float-right p-1 bg-white rounded-circle w-100"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-700 font-xss mt-3 mb-0">
                            {user.user.prenom} {user.user.nom}
                          </h4>
                          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                            {user.user.email}
                          </p>
                          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                            Position: {user.positionPlay}
                          </p>
                          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                            Skills: {user.skillsInProfile}
                          </p>
                          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                            WhatsApp Number: {user.NumeroWhatsup}
                          </p>
                          <a
                            href={`#follow/${user.iduser}`}
                            className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                          >
                            FOLLOW
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ... (other components) */}
    </Fragment>
  );
}

export default Badge;
