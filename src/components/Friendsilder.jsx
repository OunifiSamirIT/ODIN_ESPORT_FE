import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Config } from "../config";
import Other from "../pages/Setting/Fragments/Other";
import { Context } from "../index";
import secureLocalStorage from "react-secure-storage";
import { AuthContext } from "../AuthContext";

function FriendsSlider() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    _currentLang,
    _setLang,
    getTranslation,
    dark_light_bg,
    dark_fill_svg,
    dark_img,
    dark_bg,
  } = React.useContext(Context);
  const { checkTokenExpiration } = useContext(AuthContext);

  useEffect(() => {
    checkTokenExpiration();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("Secret"));
        const tokenn = storedUserData?.token;

        const response = await fetch(`${Config.LOCAL_URL}/api/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        });

        if (response.status === 403) {
          console.error("Forbidden: You do not have access.");
          return;
        }

        if (response.status === 401) {
          console.error("Unauthorized: Please log in again.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setAgents(data);
        setLoading(false);

        console.log("Fetched Users: ", data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-medium text-blue-600 animate-bounce">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const friendSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
  };

  const sliderRef = React.createRef();

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div
      style={dark_light_bg}
      className="flex flex-col mt-1 w-full rounded-md shadow-sm"
    >
      {/* <div className="flex gap-2 justify-between px-6 pt-4 max-md:px-5">
                <div className="text-lg font-bold text-zinc-900">
                    Personnes que
                    vous pourriez
                    connaître
                </div>
              
            </div> */}
      <div className="flex justify-between items-center px-6 pt-3 max-md:px-5">
        <div style={dark_light_bg} className="text-lg font-bold">
          {getTranslation(
            ` People you might know`, // -----> Englais
            `Personnes que vous pourriez connaître` //  -----> Francais
          )}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center pr-6 pl-1 mt-2">
        <button onClick={prevSlide} className="prev-slide-button text-2xl">
          &#10094;
        </button>{" "}
        <Slider ref={sliderRef} style={{ width: "93%" }} {...friendSettings}>
          {agents.map((value, index) => (
            <div
              style={dark_bg}
              key={index}
              className="card w150 d-block border-0  rounded-3 overflow-hidden mb-3 me-3 "
            >
              <div
                style={dark_bg}
                className="card-body d-flex flex-column justify-content-center align-items-center w-100 ps-3 pe-3 pb-4 text-center"
              >
                <Link to={`/profile/${value?.user?.id}`}>
                  <figure className="avatar mb-1  d-flex justify-content-center align-items-center">
                    <img
                      src={value?.user?.image}
                      alt="avater"
                      className="shadow-sm object-cover rounded-circle w-16 h-16"
                    />
                  </figure>
                </Link>
                <h4
                  style={dark_bg}
                  className="fw-700 font-xssss mt-3 mb-1 d-block w-100"
                >
                  {" "}
                  {value?.user?.nom} {value?.user?.prenom}{" "}
                </h4>
                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">
                  {" "}
                  {value.user && (
                    <div>
                      {value.user?.profil === "other" &&
                        value?.other?.profession}
                      {value.user?.profil === "player" && "Joueur"}
                      {value.user?.profil == "coach" ? " Entraineur" : ""}
                      {value.user?.profil === "agent" &&
                        value?.agent?.typeresponsable === "players" &&
                        "Manager de Joueur"}
                      {value.user?.profil === "agent" &&
                        value?.agent?.typeresponsable === "club" &&
                        "Manager de Club"}
                      {value.user?.profil === "scout" && "Scout"}
                    </div>
                  )}
                </p>
                <a
                  href={`/profile/${value?.user?.id}`}
                  className=" justify-center px-6 py-2  text-white text-center bg-blue-600 rounded-[30px] max-md:px-5"
                >
                  Voir Profil
                </a>
              </div>
            </div>
          ))}
        </Slider>
        <button onClick={nextSlide} className="next-slide-button text-2xl">
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default FriendsSlider;
