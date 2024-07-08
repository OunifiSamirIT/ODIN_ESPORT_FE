import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Config } from "../config";
import { Context } from "../index";

function FriendsSlider() {

  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg } = React.useContext(Context);

  
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        // Récupérez l'ID de l'utilisateur connecté à partir du local storage
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        const id = storedUserData ? storedUserData.id : null;
        // Filtrez les utilisateurs pour exclure l'utilisateur connecté
        
        const filteredData = data.filter((agent) => agent.user.id !== id);
        console.log(data , 'filteredData')
        setAgents(filteredData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const friendSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div style={dark_light_bg} className="flex flex-col mt-6 w-[100%] px-3 md:px-0 md:w-[85%]  rounded-md shadow-sm">
      <div className="flex flex-row items-center mt-2">
        <button
          onClick={prevSlide}
          className="prev-slide-button w-[10%] -ml-2 md:px-1 font-bold text-3xl"
        >
          &#10094;
        </button>
        <Slider
          ref={sliderRef}
          style={{ width: "90%", marginLeft: "5px", paddingLeft: "5px" }}
          {...friendSettings}
        >
          {agents.map((value, index) => (
            <div
              key={index}
              style={dark_bg}
              className="w150 md:w-[50%] d-block border-0 rounded-3 overflow-hidden mb-3 mt-2 me-3"
            >
              <div 
              style={dark_bg}

               className="card-body d-flex flex-column justify-content-center align-items-center w-100 ps-3 pe-3 pb-4 text-center">
                <Link to={`/profile/${value?.user?.id}`}>
                  <figure className="avatar mb-1 d-flex justify-content-center align-items-center">
                    <img
                      src={value?.user?.image}
                      alt="avatar"
                      className="shadow-sm rounded-circle w-16 h-16"
                    />
                  </figure>
                </Link>
                <h4 
                 style={dark_bg}
                className="fw-700 font-xssss mt-3 mb-1 d-block w-100">
                  {value?.user?.nom} {value?.user?.prenom}
                </h4>
                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">
                  {value.user?.profil === "other" && value?.other?.profession}
                  {value.user?.profil === "player" && "Joueur"}
                  {value.user?.profil === "coach" && " Entraineur"}
                  {value.user?.profil === "agent" &&
                    value?.agent?.typeresponsable === "players" &&
                    "Manager de Joueur"}
                  {value.user?.profil === "agent" &&
                    value?.agent?.typeresponsable === "club" &&
                    "Manager de Club"}
                  {value.user?.profil === "scout" && "Scout"}
                </p>
                <a
                  href={`/profile/${value?.user?.id}`}
                  className="justify-center px-6 py-2 text-white text-center bg-blue-600 rounded-[30px] max-md:px-5"
                >
                  Voir Profil
                </a>
              </div>
            </div>
          ))}
        </Slider>

        <button
          onClick={nextSlide}
          className="next-slide-button w-[10%] font-bold px-1.5 text-3xl"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default FriendsSlider;
