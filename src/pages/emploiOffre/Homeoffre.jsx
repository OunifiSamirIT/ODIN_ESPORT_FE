import React from 'react'
import Header from '../../components/Header2'
import { Link, Navigate, useNavigate, useLocation, json } from "react-router-dom";
import { paysAllInfo } from "../../assets/data/Country";
import "../flags.css";
import Select from "react-select";
import { useState } from 'react';
import { useEffect } from 'react';

import { Config } from "../../config";



function HomeOffre() {

  const [album, setAlbum] = useState([]);


  const optionsPays = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase();

    return {
      value: countryCode,
      label: (
        <div>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "2px", width: "40px" }}
            ></span>
          )}
          {country.name}
        </div>
      ),
    };
  });


  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCard(id);
    navigate(`/offre_emploi/${id}`);
  };

  const [selectedNiveauEtudes, setSelectedNiveauEtudes] = useState("");
  const [selectedPays, setSelectedPays] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedTypeContrat, setSelectedTypeContrat] = useState("");
  const [offres, setOffres] = useState([]);
  const [filteredoffres, setFilteredoffres] = useState([]);


  const navigate = useNavigate();

  // Fetch offres from the API
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/offreEmploi`);
        const result = await response.json();
        setOffres(result.data);
        setFilteredoffres(result.data);
        console.log("eeeeeeeeeee", result.data)
      } catch (error) {
        console.error("Error fetching offres:", error);
      }
    };
    fetchOffres();
  }, []);





  // Function to handle filtering logic

  // Function to handle reset button click
  const handleReset = () => {
    // Reset all search criteria state variables to initial values
    setSelectedNiveauEtudes("");
    setSelectedPays("");
    setSelectedExperience("");
    setSelectedTypeContrat("");
  };
  const handleNEChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedNiveauEtudes(selectedValue);
    console.log("Niveau d'études selected:", selectedValue);
  };


  const handleExperienceChange = (e) => {
    setSelectedExperience(e.target.value);
    console.log("Expérience selected:", e.target.value);
  };

  const handlePaysChange = (selectedOption) => {
    setSelectedPays(selectedOption.value);
    console.log("Pays selected:", selectedOption.value);
  };

  const handleContratChange = (e) => {
    setSelectedTypeContrat(e.target.value);
    console.log("Type de contrat selected:", e.target.value);
  };





  const handleSearch = () => {
    const filteredData = offres.filter((offr) => {

      // Format date_debut and date_fin
      return (
        offr.NivET.toLowerCase().includes(selectedNiveauEtudes.toLowerCase()) &&
        (selectedPays === "" || offr.paysoffre === selectedPays) &&
        (selectedExperience === "" || offr.Experience === selectedExperience)

      );
    });
    console.log("Searching with criteria:");
    console.log("Niveau d'études:", selectedNiveauEtudes);
    console.log("Pays:", selectedPays);
    console.log("Expérience:", selectedExperience);
    console.log("Type de contrat:", selectedTypeContrat);

    // Your filtering logic here

    // Verify if the function is triggered
    console.log("Search button clicked");
    setFilteredoffres(filteredData);
  };
  const [user, setUser] = useState([]);
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;
    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          console.log("user offre", user)
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const id = storedUserData.id ? storedUserData.id : null;
  const userProfileType = storedUserData ? storedUserData.profil : null;
  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);
  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  return (
    <>





      <Header />


      <div className="flex flex-col pb-12   mt-0 lg:mt-8 bg-zinc-100">
        <div className="self-center md:mt-20 w-full max-w-[1344px]  max-md:max-w-full">
          <div className="flex max-md:flex-col max-md:gap-0">

{/* left menu */}
<div className=" xs:hidden sm:hidden hidden md:mt-5 md:ml-4  md:flex md:flex-col md:w-[24%] max-md:ml-0 max-md:w-full">
<div className="flex flex-col items-start gap-4 py-4 px-0 w-full rounded-[0.625rem] bg-white  border border-solid shadow-sm border-neutral-900 border-opacity-10 ">
                <Link to="/home" className="nav-content-bttn open-font">
                  <div className="flex justify-center items-center gap-4 py-2 px-6 ">
                    <div className="flex justify-center items-center gap-2.5 p-2 rounded-full text-xl font-bold whitespace-nowrap text-zinc-900">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.3299 4.77286V1.6701C18.3299 1.21019 17.9575 0.836926 17.4967 0.836926C17.036 0.836926 16.6635 1.21019 16.6635 1.6701V3.6414L12.3285 0.716116C10.913 -0.238705 9.0833 -0.238705 7.66773 0.716116L1.83549 4.65204C0.686538 5.42773 0 6.71832 0 8.10556V15.8341C0 18.1312 1.86882 20 4.16589 20H5.83224C6.29299 20 6.66542 19.6267 6.66542 19.1668V11.6682C6.66542 11.2091 7.03868 10.8351 7.49859 10.8351H12.4977C12.9576 10.8351 13.3308 11.2091 13.3308 11.6682V19.1668C13.3308 19.6267 13.7033 20 14.164 20H15.8304C18.1274 20 19.9963 18.1312 19.9963 15.8341V8.10556C19.9963 6.78831 19.3764 5.55771 18.3299 4.77286Z"
                          fill="#1D1E21"
                        />
                      </svg>
                    </div>
                    <div className="text-[#1d1e21] font-['Sora'] text-xl font-medium leading-[normal]">
                      Acceuil
                    </div>
                  </div>
                </Link>

                <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4]" />

                <Link
                  to={`/profile/${id}`}
                  className="nav-content-bttn open-font"
                >
                  <div className="flex justify-center items-center gap-4 py-2 px-6">
                    <div className="flex flex-col items-center gap-0.5 p-2">
                      <svg
                        width={11}
                        height={10}
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.97296 0.00156238C6.3698 0.0796846 6.77465 0.130725 7.16175 0.239575C9.54676 0.916635 11.1307 3.00667 10.9915 5.2769C10.8518 7.56276 8.9976 9.49185 6.53529 9.91215C3.44823 10.4413 0.495733 8.52262 0.055379 5.7024C-0.379821 2.91604 1.79847 0.359882 4.88496 0.0333313C4.93354 0.0255356 4.9814 0.0143936 5.02812 0L5.97296 0.00156238Z"
                          fill="#1D1E21"
                        />
                      </svg>{" "}
                      <svg
                        width={15}
                        height={8}
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 7.9985C0 6.67371 0 5.34925 0 4.02513C0 2.05144 1.36257 0.452292 3.37675 0.0692564C3.6453 0.0223936 3.91792 0.000457146 4.19085 0.00375035C6.39722 -0.00125012 8.60325 -0.00125012 10.8089 0.00375035C12.907 0.00825077 14.5633 1.33787 14.9409 3.31856C14.982 3.55885 15.001 3.80214 14.9977 4.04563C15.0029 5.36375 14.9977 6.68188 14.9977 8L0 7.9985Z"
                          fill="#1D1E21"
                        />
                      </svg>
                    </div>
                    <div className="text-[#1d1e21] font-['Sora'] text-xl font-medium leading-[normal]">
                      Profil
                    </div>
                  </div>{" "}
                </Link>


                {  shouldShowAgentItem && (
                  
                  <Link
                    to="/defaultgroupagent"
                    className="nav-content-bttn open-font"
                  >
                  <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4]" />
                    <div className="flex justify-center items-center gap-4 py-2 px-6">
                      <div className="flex justify-center items-center gap-2.5 p-2 rounded-full">
                        <svg
                          width={19}
                          height={20}
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.16667 7.5C9.16667 7.27899 9.25447 7.06702 9.41074 6.91074C9.56703 6.75446 9.77899 6.66667 10 6.66667C10.221 6.66667 10.433 6.75446 10.5893 6.91074C10.7455 7.06702 10.8333 7.27899 10.8333 7.5C10.8333 7.72101 10.7455 7.93297 10.5893 8.08926C10.433 8.24554 10.221 8.33333 10 8.33333C9.77899 8.33333 9.56703 8.24554 9.41074 8.08926C9.25447 7.93297 9.16667 7.72101 9.16667 7.5ZM18.3333 4.16667V15.8333C18.332 16.938 17.8926 17.997 17.1115 18.7782C16.3304 19.5593 15.2713 19.9987 14.1667 20H5.83333C5.02353 19.9989 4.23158 19.7619 3.55434 19.3179C2.8771 18.8739 2.34392 18.2422 2.02 17.5H0.833333C0.61232 17.5 0.400358 17.4122 0.244078 17.2559C0.0877973 17.0996 0 16.8877 0 16.6667C0 16.4457 0.0877973 16.2337 0.244078 16.0774C0.400358 15.9211 0.61232 15.8333 0.833333 15.8333H1.66667V14.1667H0.833333C0.61232 14.1667 0.400358 14.0789 0.244078 13.9226C0.0877973 13.7663 0 13.5543 0 13.3333C0 13.1123 0.0877973 12.9004 0.244078 12.7441C0.400358 12.5878 0.61232 12.5 0.833333 12.5H1.66667V10.8333H0.833333C0.61232 10.8333 0.400358 10.7455 0.244078 10.5893C0.0877973 10.433 0 10.221 0 10C0 9.77899 0.0877973 9.56702 0.244078 9.41074C0.400358 9.25446 0.61232 9.16667 0.833333 9.16667H1.66667V7.5H0.833333C0.61232 7.5 0.400358 7.4122 0.244078 7.25592C0.0877973 7.09964 0 6.88768 0 6.66667C0 6.44565 0.0877973 6.23369 0.244078 6.07741C0.400358 5.92113 0.61232 5.83333 0.833333 5.83333H1.66667V4.16667H0.833333C0.61232 4.16667 0.400358 4.07887 0.244078 3.92259C0.0877973 3.76631 0 3.55435 0 3.33333C0 3.11232 0.0877973 2.90036 0.244078 2.74408C0.400358 2.5878 0.61232 2.5 0.833333 2.5H2.02C2.34392 1.7578 2.8771 1.12608 3.55434 0.682083C4.23158 0.238088 5.02353 0.00106531 5.83333 0L14.1667 0C15.2713 0.00132321 16.3304 0.440735 17.1115 1.22185C17.8926 2.00296 18.332 3.062 18.3333 4.16667ZM7.5 7.5C7.5 8.16304 7.76339 8.79893 8.23223 9.26777C8.70107 9.73661 9.33696 10 10 10C10.663 10 11.2989 9.73661 11.7678 9.26777C12.2366 8.79893 12.5 8.16304 12.5 7.5C12.5 6.83696 12.2366 6.20107 11.7678 5.73223C11.2989 5.26339 10.663 5 10 5C9.33696 5 8.70107 5.26339 8.23223 5.73223C7.76339 6.20107 7.5 6.83696 7.5 7.5ZM14.1667 15C13.9908 9.49333 6.0075 9.495 5.83333 15C5.83333 15.221 5.92113 15.433 6.07741 15.5893C6.23369 15.7455 6.44565 15.8333 6.66667 15.8333C6.88768 15.8333 7.09964 15.7455 7.25592 15.5893C7.4122 15.433 7.5 15.221 7.5 15C7.5 14.337 7.76339 13.7011 8.23223 13.2322C8.70107 12.7634 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.7634 11.7678 13.2322C12.2366 13.7011 12.5 14.337 12.5 15C12.5 15.221 12.5878 15.433 12.7441 15.5893C12.9004 15.7455 13.1123 15.8333 13.3333 15.8333C13.5543 15.8333 13.7663 15.7455 13.9226 15.5893C14.0789 15.433 14.1667 15.221 14.1667 15Z"
                            fill="#1D1E21"
                          />
                        </svg>
                      </div>
                      <div className="text-[#1d1e21] font-['Sora'] text-xl font-medium leading-[normal]">
                        Agents
                      </div>
                    </div>{" "}
                  </Link>
                )}
                {shouldShowForProfile && (
                  <Link
                    to="/defaultbadge"
                    className="nav-content-bttn open-font"
                  >
                    <div className="flex justify-center items-center gap-4 py-2 px-6">
                      <div className="flex justify-center items-center gap-2.5 p-2 rounded-full">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_488_16850)">
                            <path
                              d="M10.9875 13.3333H9.0125C8.5725 13.334 8.14363 13.195 7.78766 12.9364C7.43169 12.6778 7.16699 12.3128 7.03167 11.8942L6.42167 10.0167C6.28382 9.59778 6.28284 9.14589 6.41887 8.7264C6.55491 8.30692 6.82089 7.94161 7.17834 7.68333L8.775 6.52667C9.13041 6.26715 9.5591 6.12729 9.99917 6.12729C10.4392 6.12729 10.8679 6.26715 11.2233 6.52667L12.8208 7.68667C13.1784 7.94485 13.4444 8.31016 13.5805 8.72968C13.7165 9.14919 13.7155 9.60112 13.5775 10.02L12.9683 11.8975C12.8318 12.3151 12.5666 12.6789 12.2109 12.9368C11.8551 13.1947 11.4269 13.3335 10.9875 13.3333ZM20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433286 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C6.08879 0.58649 8.02219 0 10 0C12.6513 0.00286757 15.1932 1.05736 17.0679 2.9321C18.9426 4.80684 19.9971 7.34872 20 10ZM10 17.5C10.4315 17.4975 10.862 17.4579 11.2867 17.3817L11.9933 15.0642C12.1537 14.5606 12.4699 14.1211 12.8964 13.8089C13.3228 13.4968 13.8374 13.3282 14.3658 13.3275L16.7133 13.3233C17.0913 12.565 17.3367 11.7477 17.4392 10.9067L15.5658 9.65667C15.1335 9.35323 14.8087 8.92034 14.6383 8.42041C14.4678 7.92047 14.4606 7.37933 14.6175 6.875L15.3283 4.73083C14.7324 4.13169 14.04 3.63702 13.28 3.2675L11.47 4.5225C11.0431 4.83392 10.5284 5.00173 10 5.00173C9.47161 5.00173 8.95687 4.83392 8.53 4.5225L6.76834 3.2425C6.01995 3.60002 5.33574 4.07868 4.74334 4.65917L5.3825 6.87333C5.53944 7.37767 5.53217 7.91881 5.36173 8.41874C5.19129 8.91867 4.8665 9.35156 4.43417 9.655L2.5725 10.9842C2.67956 11.798 2.92089 12.5885 3.28667 13.3233L5.63334 13.3275C6.16184 13.328 6.67653 13.4963 7.10311 13.8083C7.5297 14.1203 7.84611 14.5598 8.00667 15.0633L8.7275 17.3833C9.14754 17.4586 9.57328 17.4977 10 17.5Z"
                              fill="#1D1E21"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_488_16850">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="text-[#1d1e21] font-['Sora'] text-xl font-medium leading-[normal]">
                        Joueur
                      </div>
                    </div>{" "}
                  </Link>
                )}
                <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4]" />

             <Link to="/defaultgroup">   <div className="flex justify-between items-center py-2 px-6 w-[19.875rem]">
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex justify-center items-center gap-2.5 p-2 rounded-full">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5689 18.0481H16.9897C16.8607 18.0485 16.7349 18.008 16.6305 17.9323C16.526 17.8565 16.4484 17.7496 16.4086 17.6269L16.2303 17.0775C16.19 16.9549 16.1896 16.8226 16.2294 16.6998C16.2691 16.577 16.3469 16.4701 16.4515 16.3944L16.9188 16.056C17.0229 15.98 17.1483 15.9391 17.2771 15.9391C17.4059 15.9391 17.5313 15.98 17.6353 16.056L18.103 16.3955C18.2076 16.4711 18.2855 16.5779 18.3253 16.7007C18.3651 16.8234 18.3649 16.9556 18.3245 17.0782L18.1473 17.628C18.1072 17.7504 18.0294 17.857 17.9251 17.9324C17.8207 18.0079 17.6951 18.0484 17.5663 18.0481H17.5689ZM20.2052 17.0724C20.2053 17.6513 20.0337 18.2172 19.7121 18.6986C19.3906 19.1799 18.9335 19.5551 18.3987 19.7767C17.8639 19.9983 17.2754 20.0563 16.7076 19.9434C16.1398 19.8305 15.6182 19.5518 15.2089 19.1425C14.7995 18.7332 14.5207 18.2117 14.4078 17.6439C14.2948 17.0761 14.3527 16.4876 14.5742 15.9528C14.7958 15.4179 15.1709 14.9608 15.6522 14.6392C16.1336 14.3176 16.6995 14.1459 17.2784 14.1459C18.0545 14.1459 18.7989 14.4542 19.3478 15.003C19.8967 15.5518 20.2051 16.2962 20.2052 17.0724ZM17.2784 19.2675C17.4047 19.2664 17.5307 19.2542 17.6549 19.2312L17.8619 18.554C17.9088 18.4066 18.0013 18.2779 18.1261 18.1865C18.2509 18.0951 18.4015 18.0458 18.5562 18.0456H19.2433C19.3544 17.8236 19.4268 17.5842 19.4572 17.3378L18.9088 16.9722C18.7819 16.8835 18.6864 16.7568 18.6363 16.6103C18.5862 16.4638 18.5839 16.3051 18.6299 16.1573L18.8398 15.5305C18.6653 15.3552 18.4627 15.2104 18.2403 15.102L17.7087 15.4695C17.5838 15.5607 17.4332 15.6098 17.2785 15.6098C17.1239 15.6098 16.9733 15.5607 16.8484 15.4695L16.3342 15.0948C16.1151 15.1994 15.9149 15.3395 15.7416 15.5095L15.9271 16.1573C15.9731 16.3049 15.971 16.4633 15.9212 16.6096C15.8713 16.7559 15.7762 16.8826 15.6497 16.9714L15.105 17.3604C15.1363 17.5987 15.2069 17.8302 15.3138 18.0456H16.0005C16.1552 18.0458 16.3059 18.0951 16.4307 18.1865C16.5556 18.2779 16.6482 18.4065 16.6952 18.554L16.9061 19.233C17.029 19.2549 17.1535 19.2667 17.2784 19.2675Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M19.5741 14.034L13.7589 2.40829C13.5286 1.91264 13.203 1.46719 12.8006 1.09739C12.3982 0.727584 11.9269 0.440663 11.4136 0.253008C10.9003 0.0653542 10.3551 -0.0193581 9.80903 0.00370844C9.263 0.026775 8.72686 0.157169 8.23122 0.387444C7.34749 0.797776 6.63579 1.50524 6.22018 2.3865L0.387512 14.0606C0.15733 14.5556 0.0269271 15.0912 0.00374815 15.6367C-0.0194308 16.1822 0.0650693 16.7269 0.252422 17.2397C0.439776 17.7526 0.726312 18.2234 1.09567 18.6255C1.46503 19.0276 1.90997 19.353 2.40509 19.5831C2.93608 19.83 3.51323 19.9619 4.09875 19.9702L7.76096 13.0438C7.90268 12.7516 8.1006 12.4901 8.34341 12.2744C8.58621 12.0587 8.86914 11.893 9.17603 11.7867C9.48292 11.6804 9.80775 11.6356 10.132 11.6549C10.4562 11.6742 10.7734 11.7572 11.0655 11.8992C11.5776 12.148 11.9881 12.5661 12.2275 13.0826L13.8493 16.4598C13.8863 15.785 14.1278 15.1375 14.5417 14.6033C14.9556 14.0691 15.5222 13.6736 16.1664 13.4691C16.8105 13.2647 17.5015 13.2611 18.1477 13.4589C18.7939 13.6566 19.3646 14.0463 19.784 14.5762C19.7266 14.3909 19.6565 14.2097 19.5741 14.034ZM10.7223 13.7886C10.6424 13.6122 10.5018 13.4704 10.3261 13.3891C10.132 13.2988 9.91006 13.2892 9.70889 13.3624C9.50772 13.4356 9.3438 13.5856 9.25308 13.7795L5.97906 19.9702H13.6888L10.7223 13.7886Z"
                          fill="#1D1E21"
                        />
                      </svg>
                    </div>
                    <div className="text-[#1d1e21] font-['Sora'] text-xl font-medium leading-[normal]">
                      Camps
                    </div>
                  </div>
                </div></Link>
                <Link
                  to="/defaultgroupEvents"
                >
                  <div className="flex gap-5 justify-between px-6 py-2 mt-8 w-full text-xl font-medium whitespace-nowrap text-zinc-900 max-md:px-5">
                    <div className="flex gap-4 justify-between px-2 py-1.5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cf2e6080455aed54d848487194a6ca0fa5a1f12e5bf524b2f4def505c5924b9?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 my-auto w-5 aspect-square fill-zinc-900"
                      />
                      <div>Événements</div>
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d22964e4d2bf57e3d7709bb65ff794adb95fc3a025192d162071e4948acfdb9a?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                      className="shrink-0 my-auto w-5 aspect-[2] fill-zinc-900"
                    />
                  </div>
                </Link>
                <div className="flex gap-5 justify-between px-6 py-2 mt-8 w-full text-xl font-medium whitespace-nowrap text-zinc-900 max-md:px-5">
                  <div className="flex gap-4 justify-between px-2 py-1.5">
                    {" "}
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a7fc5fd676e2d7354f4a7f19b0967db7f2d99a7e161c7c156ac1ce03217cf2c?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                      className="shrink-0 my-auto w-5 aspect-square fill-zinc-900"
                    />
                    <div>Offres d’emploi</div>
                  </div>
                </div>
                {!(userProfileType === "other" && user?.other?.profession === "Fan Football") && userProfileType !== "player" && (

                  <div className="flex gap-2 items-center justify-center self-center px-8 py-2 mt-2 text-base font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9786e68dfb8caaa3f272d19139631266c00cc57d909bc9770e440be5ee793738?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                      className="shrink-0 my-auto w-4 aspect-square fill-white"
                    />
                    <div>Publier une offre</div>
                  </div>
                )}

              </div>
            </div>

            {/* left menu */}




































            <div className="flex flex-col md:px-0 px-3 ml-5 mr-7 mt-20 md:mt-5 w-[76%] max-md:ml-0 max-md:w-full">

              {/* aaaa */}
              <div className="flex flex-col px-4 pt-8 pb-4 bg-white rounded-xl ">
                <div className="flex gap-2.5 justify-between  max-md:flex-wrap max-md:max-w-full">
                  <div className="my-auto text-3xl font-bold text-zinc-900">
                    Offres d'emploi
                  </div>
                  <div className="flex flex-col justify-center text-base whitespace-nowrap text-neutral-500">
                    <div className="flex flex-col justify-center w-full bg-gray-100 border border-solid border-neutral-200 rounded-[30px]">
                      <div className="flex gap-5 justify-between px-4 py-2 rounded-md max-md:pl-5">
                        <div>Recherche</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9033f03d9a2834cdac194d3bcb22d8f5a291db69f65af060dca64befb0fc2639?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 w-5 aspect-square"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-wrap gap-y-4 justify-between content-start mt-4 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-10">
                        <div className="flex gap-4 px-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e2b478902ee6294e8eec9f0a5e25c169d3e80bc2dfdb1e199c0736222901e81?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                            className="shrink-0 aspect-[1.1] fill-zinc-900 w-[22px]"
                          />
                          <div className="flex-1">Niveau d’études</div>
                        </div>
                        <div className="flex flex-col justify-center mt-2 text-xs font-light border border-solid border-neutral-200 rounded-[30px]">
                          <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                            <div className="my-auto w-full">
                              <select className='w-full' value={selectedNiveauEtudes}
                                onChange={handleNEChange}
                              >
                                <option value="Bac +3">Bac +3</option>
                                <option value="Bac">Bac</option>
                                <option value="Lycée Secondaire">Lycée Secondaire</option>
                              </select>
                            </div>

                          </div>
                        </div>

                        <div className="flex gap-4 px-4 mt-4 whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fc7b06844195331538c54aa188c56f25638bf27c62a789cda2e6486ea93f211?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                            className="shrink-0 w-5 aspect-square"
                          />
                          <div className="flex-1">
                            pays




                          </div>
                        </div>


                        <div className="flex flex-col justify-center py-1.5 mt-2 text-xs font-light whitespace-nowrap border border-solid border-neutral-200 rounded-[30px]">

                          <Select
                            options={optionsPays}
                            //    onChange={(selectedOption) => setSearchPays(selectedOption.label.props.children[1])}
                            value={selectedPays}
                            onChange={(selectedOption) => setSelectedPays(selectedOption.label.props.children[1])} placeholder="Pays Camps"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                borderRadius: "0.375rem",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "30px",
                                width: "235px",
                                paddingTop: "6px",
                                paddingBottom: "6px",
                                fontSize: "1rem",
                                borderWidth: "none",
                              }),
                              menu: (provided, state) => ({
                                ...provided,
                                width: "100%",
                              }),
                            }}

                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-zinc-900 max-md:mt-10">
                        <div className="flex gap-4 px-4 text-base whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a7fc5fd676e2d7354f4a7f19b0967db7f2d99a7e161c7c156ac1ce03217cf2c?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                            className="shrink-0 w-5 aspect-square fill-zinc-900"
                          />
                          <div className="flex-1">Expérience</div>
                        </div>
                        <div className="flex flex-col justify-center py-1.5 mt-2 text-xs font-light border border-solid border-neutral-200 rounded-[30px]">
                          <div className="flex gap-5 justify-between px-4 py-2.5 rounded-md">
                            <div className="my-auto w-full">
                              <select className='w-full' value={selectedExperience}
                                onChange={handleExperienceChange}>
                                <option value="1 à 2 ans">1 à 2 ans</option>
                                <option value="2 à 4 ans">2 à 4 ans</option>
                                <option value="4 à 6 ans">4 à 6 ans</option>
                              </select>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-zinc-900 max-md:mt-10">
                        <div className="flex gap-4 px-4 text-base">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5979dd4aa3413707b72e990f69efb743e3daa101a919441b14d1dcf102947db?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                            className="shrink-0 aspect-[0.75] fill-zinc-900 w-[15px]"
                          />
                          <div className="flex-1">Type de contrat</div>
                        </div>
                        <div className="flex flex-col justify-center py-1.5 mt-2 text-xs font-light whitespace-nowrap border border-solid border-neutral-200 rounded-[30px]">
                          <div className="flex gap-5 justify-between px-4 py-2.5 rounded-md">
                            <div className="my-auto w-full">
                              <select className='w-full' value={selectedTypeContrat}
                                onChange={(e) => setSelectedTypeContrat(e.target.value)}>
                                <option value="CDD">CDD</option>
                                <option value="CDI">CDI</option>
                                <option value="CDI">CVIP</option>
                              </select>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="flex gap-1 md:gap-5 justify-between py-2 mt-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                  <div onClick={handleReset}
                    className="justify-center px-4 py-2 text-white bg-orange-500 rounded-[30px] max-md:px-5">
                    Réinitialiser
                  </div>
                  <div className="flex gap-1 md:gap-5 justify-between pl-6">
                    <div onClick={handleSearch}
                      className="justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                      Confirmer
                    </div>
                  </div>

                </div>
              </div>

              {/* bbbbb cart */}




              {filteredoffres.map((value, index) => (
                <div key={index} className="flex gap-5 p-6 mt-8 text-base font-light bg-white rounded-xl border border-solid shadow-sm border-neutral-900 border-opacity-10 text-neutral-900 max-md:flex-wrap max-md:px-5">
                  <img
                    loading="lazy"
                    src={value.imagesalbumoffres.length > 0 ? value.imagesalbumoffres[0].image_url : 'placeholder.jpg'} // Update placeholder.jpg with a placeholder image URL or use a conditional check to handle cases where no image is available
                    onClick={() => handleCardClick(value.id)}
                    className="shrink-0 self-start aspect-fit w-[72px]"
                  />
                  <div className="flex flex-col flex-1 max-md:max-w-full">
                    <div className="self-start">{value.EntrepriseName}</div>
                    <div className="self-start mt-1 font-semibold">
                      {value.postoffre}


                    </div>
                    <div className="flex gap-4 justify-between py-0.5 pr-20 mt-1.5 text-neutral-900 text-opacity-70 max-md:flex-wrap max-md:pr-5">
                      <div className="flex gap-1.5 justify-between px-1 py-0.5 text-neutral-900 text-opacity-70">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a56e4a73d8bb393d5a1698aeade75643c094a2060b7a72076dd3f55dff87074a?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto aspect-[1.06] fill-neutral-900 fill-opacity-70 w-[17px]"
                        />
                        <div>{value.NivET}</div>
                      </div>
                      <div className="flex gap-1.5 justify-between px-1 py-0.5">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/93ebf7629de25de9e4735b72c99d1f2eb2a278e3e5bd77b8c4c3f379bba5b0bd?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
                        />
                        <div>{value.Experience}</div>
                      </div>
                      <div className="flex gap-1.5 justify-between px-1 py-0.5 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7467a2ec806a50bb07e79a6d5e4c6837d5fa5b898f9f135e1842965f2f905480?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto w-3 aspect-[0.75] fill-neutral-900 fill-opacity-70"
                        />
                        <div>CDI</div>
                      </div>
                      <div className="flex gap-1.5 justify-between px-1 py-0.5">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/169497047ffb97f2a6bf4f95c6534c9431043e2e6ac9cc05d63cae95c8f9d866?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto w-3.5 aspect-[0.88] fill-neutral-900 fill-opacity-70"
                        />
                        <div>{value.paysoffre}</div>
                      </div>
                      <div className="flex gap-1.5 justify-between px-1 py-0.5">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/10a38c1e9a44cb74467a36e05c308edb03242e37340e793426056a9b44611826?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
                        />
                        <div>Expire le {value.date_experie}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-neutral-900 text-opacity-70 max-md:max-w-full">
                      {value.description}      </div>
                  </div>
                </div>
              ))}



              {/* <div className="flex gap-5 p-6 mt-6 text-base font-light bg-white rounded-xl border border-solid shadow-sm border-neutral-900 border-opacity-10 text-neutral-900 max-md:flex-wrap max-md:px-5">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
        className="shrink-0 self-start aspect-square w-[72px]"
      />
      <div className="flex flex-col flex-1 max-md:max-w-full">
        <div className="self-start">Espérance Sportive de Tunis</div>
        <div className="self-start mt-1 font-semibold">Entraineur</div>
        <div className="flex gap-5 justify-between py-0.5 pr-20 mt-1.5 w-full text-neutral-900 text-opacity-70 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-1.5 justify-between px-1 py-0.5 text-neutral-900 text-opacity-70">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a56e4a73d8bb393d5a1698aeade75643c094a2060b7a72076dd3f55dff87074a?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto aspect-[1.06] fill-neutral-900 fill-opacity-70 w-[17px]"
            />
            <div>Bac +3</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/93ebf7629de25de9e4735b72c99d1f2eb2a278e3e5bd77b8c4c3f379bba5b0bd?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
            />
            <div>1 à 2 ans</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7467a2ec806a50bb07e79a6d5e4c6837d5fa5b898f9f135e1842965f2f905480?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-3 aspect-[0.75] fill-neutral-900 fill-opacity-70"
            />
            <div>CDI</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/169497047ffb97f2a6bf4f95c6534c9431043e2e6ac9cc05d63cae95c8f9d866?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-3.5 aspect-[0.88] fill-neutral-900 fill-opacity-70"
            />
            <div>Tunis, Tunisie</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10a38c1e9a44cb74467a36e05c308edb03242e37340e793426056a9b44611826?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
            />
            <div>Expire le 27/07/2024</div>
          </div>
        </div>
        <div className="mt-3 text-neutral-900 text-opacity-70 max-md:max-w-full">
          Nous recherchons un Analyste de Performance motivé et méticuleux pour
          rejoindre notre équipe de football. En tant qu'Analyste de
          Performance, vous jouerez un rôle crucial dans l'amélioration des
          performances de notre équipe...
        </div>
      </div>
    </div>


    <div className="flex gap-5 p-6 mt-8 text-base font-light bg-white rounded-xl border border-solid shadow-sm border-neutral-900 border-opacity-10 text-neutral-900 max-md:flex-wrap max-md:px-5">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e87cf75e02bd9f6f44918c9c195053e1374e160aea8dd313e7faac9f49257708?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
        className="shrink-0 self-start aspect-square w-[72px]"
      />
      <div className="flex flex-col flex-1 max-md:max-w-full">
        <div className="self-start">Linear company</div>
        <div className="self-start mt-1 font-semibold">
          Analyste de performance
        </div>
        <div className="flex gap-4 justify-between py-0.5 pr-20 mt-1.5 text-neutral-900 text-opacity-70 max-md:flex-wrap max-md:pr-5">
          <div className="flex gap-1.5 justify-between px-1 py-0.5 text-neutral-900 text-opacity-70">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a56e4a73d8bb393d5a1698aeade75643c094a2060b7a72076dd3f55dff87074a?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto aspect-[1.06] fill-neutral-900 fill-opacity-70 w-[17px]"
            />
            <div>Bac +3</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/93ebf7629de25de9e4735b72c99d1f2eb2a278e3e5bd77b8c4c3f379bba5b0bd?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
            />
            <div>1 à 2 ans</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7467a2ec806a50bb07e79a6d5e4c6837d5fa5b898f9f135e1842965f2f905480?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-3 aspect-[0.75] fill-neutral-900 fill-opacity-70"
            />
            <div>CDI</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/169497047ffb97f2a6bf4f95c6534c9431043e2e6ac9cc05d63cae95c8f9d866?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-3.5 aspect-[0.88] fill-neutral-900 fill-opacity-70"
            />
            <div>Abidjan, Cote d’ivoir</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10a38c1e9a44cb74467a36e05c308edb03242e37340e793426056a9b44611826?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
            />
            <div>Expire le 27/07/2024</div>
          </div>
        </div>
        <div className="mt-3 text-neutral-900 text-opacity-70 max-md:max-w-full">
          Nous recherchons un Analyste de Performance motivé et méticuleux pour
          rejoindre notre équipe de football. En tant qu'Analyste de
          Performance, vous jouerez un rôle crucial dans l'amélioration des
          performances de notre équipe...
        </div>
      </div>
    </div>

    <div className="flex gap-5 p-6 mt-6 text-base font-light bg-white rounded-xl border border-solid shadow-sm border-neutral-900 border-opacity-10 text-neutral-900 max-md:flex-wrap max-md:px-5">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0eaedd6655f57964351054b97d9bee477ccf4d87547c7a966212f19f38280086?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
        className="shrink-0 self-start aspect-square w-[72px]"
      />
      <div className="flex flex-col flex-1 max-md:max-w-full">
        <div className="self-start">Espérance Sportive de Tunis</div>
        <div className="self-start mt-1 font-semibold">Entraineur</div>
        <div className="flex gap-5 justify-between py-0.5 pr-20 mt-1.5 w-full text-neutral-900 text-opacity-70 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-1.5 justify-between px-1 py-0.5 text-neutral-900 text-opacity-70">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a56e4a73d8bb393d5a1698aeade75643c094a2060b7a72076dd3f55dff87074a?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto aspect-[1.06] fill-neutral-900 fill-opacity-70 w-[17px]"
            />
            <div>Bac +3</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/93ebf7629de25de9e4735b72c99d1f2eb2a278e3e5bd77b8c4c3f379bba5b0bd?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
            />
            <div>1 à 2 ans</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7467a2ec806a50bb07e79a6d5e4c6837d5fa5b898f9f135e1842965f2f905480?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-3 aspect-[0.75] fill-neutral-900 fill-opacity-70"
            />
            <div>CDI</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/169497047ffb97f2a6bf4f95c6534c9431043e2e6ac9cc05d63cae95c8f9d866?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-3.5 aspect-[0.88] fill-neutral-900 fill-opacity-70"
            />
            <div>Tunis, Tunisie</div>
          </div>
          <div className="flex gap-1.5 justify-between px-1 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10a38c1e9a44cb74467a36e05c308edb03242e37340e793426056a9b44611826?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-4 aspect-square fill-neutral-900 fill-opacity-70"
            />
            <div>Expire le 27/07/2024</div>
          </div>
        </div>
        <div className="mt-3 text-neutral-900 text-opacity-70 max-md:max-w-full">
          Nous recherchons un Analyste de Performance motivé et méticuleux pour
          rejoindre notre équipe de football. En tant qu'Analyste de
          Performance, vous jouerez un rôle crucial dans l'amélioration des
          performances de notre équipe...
        </div>
      </div>
    </div> */}



            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeOffre
