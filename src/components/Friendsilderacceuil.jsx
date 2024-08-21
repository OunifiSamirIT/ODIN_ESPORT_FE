import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Config } from "../config";
import { Context } from "../index";
import secureLocalStorage from "react-secure-storage";
import CryptoJS from "crypto-js";

function FriendsSlider() {
  const {
    _currentLang,
    _setLang,
    getTranslation,
    dark_light_bg,
    dark_fill_svg,
    dark_img,
    dark_bg,
  } = React.useContext(Context);

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef();
  const decryptString = (encryptedText, secret) => {
    try {
      const ciphertext = CryptoJS.enc.Hex.parse(encryptedText);
      const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000"); // Assurez-vous que cela correspond à l'IV utilisé côté serveur
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        CryptoJS.enc.Hex.parse(secret),
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };
  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     const token1 = secureLocalStorage.getItem("cryptedUser");
    //     if (!token1) {
    //       throw new Error("Token not found in storage.");
    //     }

    //     const parsedToken1 = JSON.parse(token1);
    //     const token2 = parsedToken1?.token;

    //     if (!token2) {
    //       throw new Error("No token provided!");
    //     }

    //     const response = await fetch(`${Config.LOCAL_URL}/api/user`, {
    //       method: "GET",
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token2}`,
    //       },
    //     });

    //     if (response.status === 401) {
    //       console.error("Unauthorized: Please log in again.");
    //       window.location.href = "/login";
    //       return;
    //     }

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch users");
    //     }

    //     const data = await response.json();
    //     const storedUserData = JSON.parse(
    //       secureLocalStorage.getItem("cryptedUser")
    //     );
    //     const id = storedUserData ? storedUserData.id : null;
    //     const filteredData = data?.filter((agent) => agent?.user?.id !== id);
    //     console.log(data, "filteredData");
    //     setAgents(filteredData);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error.message);
    //     setLoading(false);
    //   }
    // };
    const fetchUsers = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("Secret"));
        

        const tokenn = storedUserData.token;
       

        console.log("Decrypted Token: ", tokenn);

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
        console.log("Fetched Users: ", data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
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
    <div
      style={dark_light_bg}
      className="flex flex-col mt-6 w-[100%] px-3 md:px-0 md:w-[85%]  rounded-md shadow-sm"
    >
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
                className="card-body d-flex flex-column justify-content-center align-items-center w-100 ps-3 pe-3 pb-4 text-center"
              >
                <Link to={`/profile/${value?.user?.id}`}>
                  <figure className="avatar mb-1  d-flex justify-content-center align-items-center">
                    <img
                      src={value?.user?.image}
                      alt="avatar"
                      className="shadow-sm object-cover rounded-circle w-16 h-16"
                    />
                  </figure>
                </Link>
                <h4
                  style={dark_bg}
                  className="fw-700 font-xssss mt-3 mb-1 d-block w-100"
                >
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
