import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../index";
import secureLocalStorage from "react-secure-storage";
import { Config } from "../config";

const SettingsLayout = ({ children, setCurrentTab, tab, setDeleteModal }) => {
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  // const [currentTab, setCurrentTab] = useState('')
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a request to the backend to logout and clear cookies
      const response = await fetch(`${Config.LOCAL_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Include credentials to handle cookies
      });

      // Check if the response is successful
      if (response.ok) {
        // Clear the authentication token from localStorage
        localStorage.removeItem("Secret");
        secureLocalStorage.removeItem("cryptedUser");

        // Redirect to the login page or another route
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-x-5 gap-y-2  w-full    mt-[100px]">
        <div className="flex flex-col max-md:ml-0">
          <div className="flex md:w-[345px] flex-col text-base font-medium ">
            <div className="flex gap-2 justify-center text-center py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5 w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac20d9bf5dc01e69f2a6e82df157e82794a74dd3d3c80d0437777183828a95ba?"
                className="my-auto aspect-square w-[15px]"
              />
              <Link
                to={`/profile/${storedUserData.id}`}
                className="hover:text-orange-300"
              >
                {" "}
                {getTranslation(
                  `Back to profile`, // -----> Englais
                  ` Revenir au Profil` //  -----> Francais
                )}{" "}
              </Link>
            </div>
            <div className=" flex-col md:px-4 py-1 mt-3 w-full bg-white rounded-[10px] text-zinc-900 hidden md:flex items-left">
              {/* <div className="text-blue-600">Informations Personnelles</div> */}
              <a href={`/setting/personal`} className={`mt-4 text-left`}>
                {getTranslation(
                  `Personal Information`, // -----> Englais
                  `Information Personnelle` //  -----> Francais
                )}{" "}
              </a>
              <div className="shrink-0 mt-3 h-px bg-blue-100" />
              <a href={`/setting/information`} className="mt-4 text-left">
                {getTranslation(
                  `Profile Information`, // -----> Englais
                  `Information du Profil` //  -----> Francais
                )}{" "}
              </a>
              {storedUserData.profil == "player" && (
                <>
                  <div className="shrink-0 mt-3 h-px bg-blue-100" />
                  <a href={`/setting/experience`} className="mt-4 text-left">
                    {" "}
                    {getTranslation(
                      `Experiences`, // -----> Englais
                      `Expériences` //  -----> Francais
                    )}{" "}
                  </a>
                </>
              )}
              <div className="shrink-0 mt-3 h-px bg-blue-100" />
              <a href={`/setting/parametre`} className="mt-4 text-left">
                {" "}
                {getTranslation(
                  `Setting Information`, // -----> Englais
                  `Parametre du Profil` //  -----> Francais
                )}{" "}
              </a>
              <div className="shrink-0 mt-3 h-px bg-blue-100" />
              <a href={`/setting/social`} className="mt-3 text-left">
                {" "}
                {getTranslation(
                  `Social Media`, // -----> Englais
                  `Réseaux Sociaux` //  -----> Francais
                )}{" "}
              </a>
              <div className="shrink-0 mt-3 h-px bg-blue-100" />
              <div className="flex items-center gap-4 px-3.5 py-3 text-orange-500 whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cded10bad9b00bba1f301a02f5bfc764d8bff607a7af5b3849d13ad9750d0472?"
                  className="w-5 aspect-square"
                />
                <button type="submit" onClick={handleLogout} className="">
                  {" "}
                  {getTranslation(
                    `Log Out`, // -----> Englais
                    `Déconnexion` //  -----> Francais
                  )}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col w-full h-max">
          <div className="flex w-full flex-col flex-wrap gap-y-2   px-2 bg-white rounded-[10px]">
            {children}
          </div>
          {tab === "parametre" && (
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModal(true)}
                class="max-sm:w-full mt-4 flex gap-2 justify-center px-8 py-2 text-base font-medium border-2 border-solid border-red-600 rounded-[30px] text-red-600"
              >
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 3.33333H14.0825C13.695 1.43417 12.0125 0 10 0H8.33333C6.32167 0 4.63833 1.43417 4.25083 3.33333H0.833333C0.373333 3.33333 0 3.70583 0 4.16667C0 4.6275 0.373333 5 0.833333 5H1.55L2.63 16.2325C2.83667 18.3808 4.62 20 6.7775 20H11.55C13.7108 20 15.4942 18.3775 15.6983 16.2267L16.7617 5H17.4992C17.9592 5 18.3325 4.6275 18.3325 4.16667C18.3325 3.70583 17.96 3.33333 17.5 3.33333ZM8.33333 1.66667H10C11.085 1.66667 12.0017 2.36583 12.3467 3.33333H5.9875C6.3325 2.36583 7.24833 1.66667 8.33333 1.66667ZM12.2558 13.5775C12.5817 13.9033 12.5817 14.43 12.2558 14.7558C12.0933 14.9183 11.88 15 11.6667 15C11.4533 15 11.24 14.9183 11.0775 14.7558L9.16667 12.845L7.25583 14.7558C7.09333 14.9183 6.88 15 6.66667 15C6.45333 15 6.24 14.9183 6.0775 14.7558C5.75167 14.43 5.75167 13.9033 6.0775 13.5775L7.98833 11.6667L6.0775 9.75583C5.75167 9.43 5.75167 8.90333 6.0775 8.5775C6.40333 8.25167 6.93 8.25167 7.25583 8.5775L9.16667 10.4883L11.0775 8.5775C11.4033 8.25167 11.93 8.25167 12.2558 8.5775C12.5817 8.90333 12.5817 9.43 12.2558 9.75583L10.345 11.6667L12.2558 13.5775Z"
                    fill="#EB2E2E"
                  />
                </svg>
                <span>Supprimer votre compte</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
