import React, { useState, useEffect } from "react";
import Header from "../../components/Header2";
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';

// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';

import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { paysAllInfo } from "../../assets/data/Country";
import "../flags.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Config } from "../../config";
import LeftMenu from "../../components/LeftMenu";
import { Context } from "../../index";
import Index from "../Profile/Index";

const Album = () => {
  const [album, setAlbum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [searchDuree, setSearchDuree] = useState("");
  const [searchPays, setSearchPays] = useState("");
  const [searchTypePrix, setSearchTypePrix] = useState("");
  const [searchDateDB, setSearchDateDb] = useState("");
  const [searchDateDf, setSearchDateDf] = useState("");
  const [filteredCamps, setFilteredCamps] = useState([]);

  const handleCardClick = (id) => {
    setSelectedCard(id);
    navigate(`/defaultgroupevent/${id}`);
  };

  // const optionsPays = paysAllInfo.map((country) => {
  //   const countryCode = country.iso && country.iso["alpha-2"].toLowerCase();

  //   return {
  //     value: countryCode,
  //     label: (
  //       <div>
  //         {countryCode && (
  //           <span
  //             className={`flag-icon flag-icon-${countryCode}`}
  //             style={{ marginRight: "2px", width: "40px" }}
  //           ></span>
  //         )}
  //         {country.name}
  //       </div>
  //     ),
  //   };
  // });
  const options = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

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

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/albumevent`);

        const result = await response.json();

        setAlbum(result.data);
        setFilteredCamps(result.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchAlbums();
  }, []);

  const dureeOptions = [
    { value: "", label: "Durée" },
    { value: "4 jours", label: "4 jours" },
    { value: "1 semaine", label: "1 Semaine" },
    { value: "2 semaine", label: "2 semaines" },
    { value: "3 semaines", label: "3 semaines" },
    { value: "1 mois", label: "1 mois" },
  ];

  const resetSearchCriteria = () => {
    setSearchDuree("");
    setSearchPays("");
    setSearchTypePrix("");
    setSearchDateDb("");
    setSearchDateDf("");
    setFilteredCamps(album);
  };

  const handleReset = () => {
    resetSearchCriteria();
  };

  const handleDureeChange = (e) => {
    setSearchDuree(e.target.value);
  };

  const handleTypePrixChange = (e) => {
    setSearchTypePrix(e.target.value);
  };

  const handleDateDBChange = (date) => {
    // Format the date as "yyyy-MM-dd"
    const formattedDate = date?.toISOString()?.split("T")[0];

    // Update the state with the formatted date
    setSearchDateDb(formattedDate);
  };

  const handleDateDFChange = (date) => {
    const formattedDate = date?.toISOString()?.split("T")[0];

    // Update the state with the formatted date
    setSearchDateDf(formattedDate);
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1].padStart(2, "0");
      const day = dateParts[2].padStart(2, "0");
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
  const formatDatee = (dateString) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1].padStart(2, "0");
      const day = dateParts[2].padStart(2, "0");
      return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  const handleSearch = () => {
    const filteredData = album.filter((camps) => {
      // Format date_debut and date_fin
      const formattedDateDB = formatDate(camps.date_debut);
      const formattedDateDF = formatDate(camps.date_fin);

      return (
        camps.Duree.toLowerCase().includes(searchDuree.toLowerCase()) &&
        (searchPays === "" || camps.payscamps === searchPays) &&
        (searchTypePrix === "" || camps.prix === searchTypePrix) &&
        (searchDateDB === "" || formattedDateDB === searchDateDB) &&
        (searchDateDf === "" || formattedDateDF === searchDateDf)
      );
    });

    setFilteredCamps(filteredData);
  };
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
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
  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

  return (
    <>
      <Header />

      <div className="flex flex-col pb-12    mt-0 lg:mt-8 bg-zinc-100">
        <div className="self-center md:mt-20  w-full max-w-[1344px]  max-md:max-w-full">
          <div className="flex max-md:flex-col max-md:gap-0">
            {/* left menu */}
            <LeftMenu
              id={id}
              classothercomponent={true}
              shouldShowAgentItem={shouldShowAgentItem}
              shouldShowForProfile={shouldShowForProfile}
              setEventTogglerIsOpenned={setEventTogglerIsOpenned}
              eventTogglerIsOpenned={eventTogglerIsOpenned}
              user={user}
              userProfileType={userProfileType}
            />

            {/* left menu */}

            <div className="flex flex-col md:px-0 px-3 ml-5 mr-7 mt-20 md:mt-2 w-[76%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow  max-md:max-w-full">
                <div className="flex flex-col px-9 pt-2 mt-3 md:mt-12 pb-2 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                  <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                    {getTranslation(
                      `Search for an Event`, // -----> Englais
                      `Chercher un Évènements` //  -----> Francais
                      //   ``,  //  -----> Turkey
                      //   `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <div className="flex-wrap gap-y-4 justify-between content-start mt-2 max-md:max-w-full">
                    <div className="flex gap-3 md:gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-10">
                          <div className="flex gap-2 md:gap-4 justify-between px-4 whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/803e02712b2b4c86f9a16b3c2fd85a1f2520ba9fac821299d322e0a17e04e0df?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow">
                              {" "}
                              <div className="grow">
                                {" "}
                                {getTranslation(
                                  `Duration`, // -----> Englais
                                  `Durée` //  -----> Francais
                                  //   ``,  //  -----> Turkey
                                  //   `` ,  //  -----> Allemagne
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center mt-2 w-full text-xs font-light border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3.5 rounded-md">
                              <select
                                onChange={handleDureeChange}
                                value={searchDuree}
                                className="w-full"
                              >
                                {dureeOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-4 justify-between px-4 mt-4 whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a38d56790789553e5ad61b7be1f1c9794b8856c20bce58844081006640976d32?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow">
                              {" "}
                              {getTranslation(
                                `Start Date `, // -----> Englais
                                `Date de début`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>{" "}
                          </div>
                          <div className="flex flex-col justify-center mt-2 w-full text-xs font-light whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                              <DatePicker
                                dateFormat="dd-MM-yyyy"
                                selected={searchDateDB} // Set the selected date from your state
                                onChange={(date) => handleDateDBChange(date)} // Handle date change
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col whitespace-nowrap text-zinc-900 ">
                          <div className="flex gap-4 justify-between px-4 text-base">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bfb1d26cb36312136826da85a4c47e65f704f7a4f080f319b159e471c18e5bc?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow">
                              {" "}
                              {getTranslation(
                                `Country`, // -----> Englais
                                `Pays`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>{" "}
                          </div>
                          <div className="flex flex-col justify-center mt-2 mr-1 text-xs font-light border border-solid  rounded-[30px]">
                            <Select
                              options={options}
                              placeholder="Pays Events"
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  borderRadius: "0.375rem", // You can adjust the radius as needed
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "6px",
                                  paddingBottom: "6px",
                                  borderRadius: "30px",
                                  border:
                                    "1px solid var(--black-100-e-5-e-5-e-5, #E5E5E5)", // Border style

                                  width: "100%",
                                  fontSize: "12px", // Set the desired font size
                                  backgroundColor: "#ffffff", // Set the background color
                                  borderWidth: "none",
                                }),
                              }}
                              onChange={(selectedOption) =>
                                setSearchPays(
                                  selectedOption.label.props.children[1]
                                )
                              }
                              value={options.find(
                                (option) => option.value === searchPays
                              )}
                              // Enable searching by nationalite
                              filterOption={(option, inputValue) => {
                                const nationalite = option.label.props.children; // Assuming nationalite is directly the children of label

                                const nationaliteString =
                                  typeof nationalite === "string"
                                    ? nationalite.toLowerCase()
                                    : nationalite.join("").toLowerCase(); // Join children of JSX element if it's an array

                                return nationaliteString.includes(
                                  inputValue.toLowerCase()
                                );
                              }}
                              // Ensure that all options are displayed even when filtered
                              isSearchable
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-base whitespace-nowrap text-zinc-900 ">
                          <div className="flex gap-4 justify-between px-4">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/50a0695569327f7204d974bc36853e47face4848f228a6c678484e0d7aca8146?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="aspect-[0.9] fill-zinc-900 w-[18px]"
                            />
                            <div className="grow">
                              {" "}
                              {getTranslation(
                                `Price `, // -----> Englais
                                `Prix`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>{" "}
                          </div>
                          <div className="flex flex-col justify-center mt-2 w-full text-xs  border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                              <input
                                value={searchTypePrix}
                                className="bg-transparent border-hidden "
                                onChange={handleTypePrixChange}
                                type="number"
                                name="prix"
                                // id="prix"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:gap-3 justify-between py-2 mt-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <button
                      className="justify-center px-8 py-2 text-white bg-orange-500 rounded-[30px] max-md:px-3"
                      onClick={handleReset}
                    >
                      {getTranslation(
                        `Reset`, // -----> Englais
                        `Réinitialiser`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </button>
                    <div className="flex gap-2 justify-between pl-6">
                      <div
                        className="justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5"
                        onClick={handleSearch}
                      >
                        {getTranslation(
                          `Submit`, // -----> Englais
                          `Confirmer` //  -----> Francais
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 mt-6 max-md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-md:flex-col max-md:gap-0">
                    {filteredCamps.map((value, index) => (
                      <div key={index} className="flex flex-col">
                        <div
                          onClick={() => handleCardClick(value.id)}
                          className="flex flex-col grow items-start pb-4 mx-auto w-full bg-white rounded-xl"
                        >
                          <img
                            loading="lazy"
                            // srcSet={value?.ImagesAlbumevents[0]?.image_url}
                            src={
                              value?.ImagesAlbumevents?.length > 0
                                ? value?.ImagesAlbumevents[0]?.image_url
                                : "placeholder.jpg"
                            }
                            className="self-stretch w-full aspect-square rounded-t-xl object-cover"
                          />
                          <div className="mt-4 px-2 self-start text-break font-semibold text-zinc-900">
                            {value.album_name}
                          </div>
                          <div className="flex justify-between mt-1 px-2 max-w-full text-xs font-light whitespace-nowrap text-zinc-400 w-[282px]">
                            <div className="flex self-start gap-2">
                              <div className="flex self-start">
                                {formatDatee(value.date_debut)}
                              </div>
                              <div>-</div>
                              <div className="grow">{value.Duree}</div>
                            </div>
                            <div className=" text-xs text-capitalize font-light">
                              {value.payscamps}
                            </div>
                          </div>
                          <div className="mt-2 text-xs mx-2 text-break font-light text-black">
                            {value.description.length > 100
                              ? value.description.slice(0, 100) + "..."
                              : value.description}
                          </div>
                          <div className="flex gap-5 px-2 justify-between mt-2 max-w-full w-[282px]">
                            <div className="flex flex-col whitespace-nowrap ">
                              <div className="text-xs font-light text-zinc-400">
                                {getTranslation(
                                  `Price `, // -----> Englais
                                  `Prix`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </div>
                              <div className="mt-1 text-base text-zinc-900 font-semibold">
                                {value.prix} DT
                              </div>
                            </div>
                            <div className="flex justify-center items-center p-2.5 w-11 h-7 mt-3 bg-blue-600 rounded-md aspect-[1.13]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/688459f573915c74266dcb5eb0235120d7e93fd088c5102dd26fe0420b9723d9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 h-3 aspect-[1.33] fill-white"
                              />
                            </div>
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
      </div>
    </>
  );
};

export default Album;
