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
import secureLocalStorage from "react-secure-storage";

const Album = () => {
  const [album, setAlbum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg, dark_border, dark_gray_color, dark_gray_svg, _currentTheme } = React.useContext(Context);

  const [searchDuree, setSearchDuree] = useState("");
  const [searchPays, setSearchPays] = useState("");
  const [searchTypePrix, setSearchTypePrix] = useState("");
  const [searchDateDB, setSearchDateDb] = useState("");
  const [searchDateDF, setSearchDateDF] = useState("");
  const [filteredCamps, setFilteredCamps] = useState([]);

  const handleCardClick = (id) => {
    setSelectedCard(id);
    navigate(`/defaultgroup/${id}`);
  };
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
        const response = await fetch(`${Config.LOCAL_URL}/api/albumc`);

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
    { value: "", label: "Duree" },
    { value: "3jours", label: "3 jours" },
    { value: "1 semaine", label: "1 Semaine" },
    { value: "2 semaine", label: "2 semaine" },
    { value: "3semaines", label: "3 semaines" },
    { value: "1mois", label: "1 mois" },
    { value: "2mois", label: "2 mois" },
    { value: "3mois", label: "3 mois" },
    { value: "4mois", label: "4 mois" },
    { value: "5mois", label: "5 mois" },
    { value: "6mois", label: "6 mois" },
  ];

  const resetSearchCriteria = () => {
    setSearchDuree("");
    setSearchPays("");
    setSearchTypePrix("");
    setSearchDateDb("");
    setSearchDateDF("");
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
    const formattedDate = date.toISOString().split("T")[0];

    setSearchDateDb(formattedDate);
  };

  const handleDateDFChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    // Update the state with the formatted date
    setSearchDateDF(formattedDate);
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
        (searchDateDF === "" || formattedDateDF === searchDateDF)
      );
    });

    setFilteredCamps(filteredData);
  };

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  // for left slide barre ---------------------------------
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
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

  // const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

  // const id = storedUserData.id ? storedUserData.id : null;

  // const userProfileType = storedUserData ? storedUserData.profil : null;

  // const shouldHideForProfiles = ["other", "player"];
  // const shouldShowAgentItem = ["player"].includes(userProfileType);

  // const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

  // left slide barre ------------------------------
  return (
    <>
      <Header />

      <div style={dark_bg} className="flex flex-col pb-12    mt-0 lg:mt-8 ">
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
                <div style={dark_light_bg} className="flex flex-col px-9 pt-2 mt-3 md:mt-12 pb-2 rounded-xl max-md:px-5 max-md:max-w-full">
                  <div className="text-3xl font-bold  max-md:max-w-full">
                    {getTranslation(
                      `Search for a Camp`, // -----> Englais
                      ` Chercher un Camp` //  -----> Francais
                      //   ``,  //  -----> Turkey
                      //   `` ,  //  -----> Allemagne
                    )}{" "}
                  </div>
                  <div className="flex-wrap gap-y-4 justify-between content-start mt-2 max-md:max-w-full">
                    <div className="flex gap-3 md:gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-base  max-md:mt-10">
                          <div className="flex gap-2 md:gap-4 justify-between px-4 whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/803e02712b2b4c86f9a16b3c2fd85a1f2520ba9fac821299d322e0a17e04e0df?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                              style={dark_img}
                            />
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
                          <div className="flex flex-col justify-center mt-2 w-full text-xs font-light border border-solid  rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3.5 rounded-md">
                              <select
                                onChange={handleDureeChange}
                                value={searchDuree}
                                className="w-full"
                                style={{
                                  backgroundColor: "transparent"
                                }}
                              >
                                {dureeOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                    style={dark_bg}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-3 justify-between px-4">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/50a0695569327f7204d974bc36853e47face4848f228a6c678484e0d7aca8146?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="aspect-[0.9] fill-zinc-900 w-[18px]"
                              style={dark_img}

                            />
                            <div className="grow">
                              {" "}
                              {getTranslation(
                                `Price`, // -----> Englais
                                `Prix` //  -----> Francais
                                //   ``,  //  -----> Turkey
                                //   `` ,  //  -----> Allemagne
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center mt-2 w-full text-xs  border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                              <input
                                value={searchTypePrix}
                                onChange={handleTypePrixChange}
                                type="text"
                                name="prix"
                                // id="prix"
                                className="bg-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col whitespace-nowrap  ">
                          <div className="flex gap-4 justify-between px-4 text-base">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bfb1d26cb36312136826da85a4c47e65f704f7a4f080f319b159e471c18e5bc?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                              style={dark_img}

                            />
                            <div className="grow">
                              {getTranslation(
                                `Country`, // -----> Englais
                                `Pays`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>{" "}
                          </div>

                          <div className="flex flex-col justify-center mt-2 text-xs font-light border border-solid rounded-[30px]">
                            <Select
                              options={options}
                              placeholder={<div style={dark_light_bg} >Pays camps</div>} 

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
                                  borderWidth: "none",
                                  ...dark_light_bg,
                                }),
                                menuList: base => ({
                                  ...base,
                                  // kill the white space on first and last option
                                  color: "#111"
                                })


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
                        <div className="flex flex-col grow text-base whitespace-nowrap  ">
                          <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a38d56790789553e5ad61b7be1f1c9794b8856c20bce58844081006640976d32?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                              style={dark_img}

                            />
                            <div className="grow">
                              {getTranslation(
                                `Start Date `, // -----> Englais
                                `Date de début`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>{" "}
                          </div>
                          <div className="flex flex-col justify-center my-2 w-full text-xs font-light whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                              <DatePicker
                                dateFormat="dd-MM-yyyy"
                                className="bg-transparent"
                                selected={searchDateDB} // Set the selected date from your state
                                onChange={(date) => handleDateDBChange(date)} // Handle date change
                              />
                            </div>
                          </div>
                          {/* <div className="flex gap-4 mt-2 justify-between px-4 md:mt-4">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ebab6160954a2bce21ceaf2e169787de6ab38cfed49192e766553aa8805b259?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow">Date de fin</div>
                          </div>
                          <div className="flex flex-col justify-center mt-2 w-full text-xs font-light border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                              <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={searchDateDF} // Set the selected date from your state
                                onChange={(date) => handleDateDFChange(date)} // Handle date change
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:gap-3 flex-col md:flex-row items-center justify-between  py-2 mt-4 w-full text-base font-medium ">
                    <button
                      className="justify-center px-8 py-2 mt-2 md:mt-0 text-white bg-orange-500 md:w-fit w-full rounded-[30px] px-5"
                      onClick={handleReset}
                    >
                      {getTranslation(
                        `Reset`, // -----> Englais
                        `Réinitialiser`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </button>
                    <button
                      className="justify-center px-8 py-2 mt-2 md:mt-0 text-white md:w-fit w-full bg-blue-600 rounded-[30px] px-5"
                      onClick={handleSearch}
                    >
                      {getTranslation(
                        `Submit`, // -----> Englais
                        `Confirmer` //  -----> Francais
                      )}
                    </button>

                    {/* <div className="flex gap-2 justify-between pl-6">
                    <div
                      className="justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px]  max-sm:px-5"
                      onClick={handleSearch}
                    >
                      Confirmer
                    </div>
                  </div> */}
                  </div>
                </div>

                <div className="px-2 mt-6 max-md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-md:flex-col max-md:gap-0">
                    {filteredCamps.map((value, index) => (
                      <div key={index} className="flex flex-col">
                        <div
                        style={dark_light_bg}
                          onClick={() => handleCardClick(value.id)}
                          className="flex flex-col grow items-start pb-4 mx-auto w-full  rounded-xl"
                        >
                          <img
                            loading="lazy"
                            srcSet={value.ImagesAlbumcamps[0]?.image_url}
                            className="self-stretch w-full aspect-square rounded-t-xl object-cover"
                          />
                          <div className="pl-3 pr-2">
                            <div className="mt-4 px-2 self-start text-break font-semibold ">
                              {value.album_name}
                            </div>
                            <div className="flex justify-between mt-1 px-2 max-w-full text-xs font-light whitespace-nowrap w-[282px]">
                              <div className="flex self-start gap-2">
                                <div className="flex self-start ">
                                  {formatDatee(value.date_debut)}
                                </div>
                                <div>-</div>
                                <div className="grow">{value.Duree}</div>
                              </div>
                              <div className=" text-xs font-light text-capitalize w-20 pl-2   whitespace-pre-line">
                                {value.payscamps}
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-break mx-2 font-light">
                              {value.description.length > 100
                                ? value.description.slice(0, 100) + "..."
                                : value.description}
                            </div>
                            <div className="flex gap-5 px-2 justify-between items-center mt-3  max-w-full w-[282px]">
                              <div className="flex flex-col whitespace-nowrap ">
                                <div className="text-xs font-light ">
                                  {getTranslation(
                                    `Price`, // -----> Englais
                                    `Prix` //  -----> Francais
                                  )}
                                </div>
                                <div className="mt-1 text-base font-semibold">
                                  {value.prix} €
                                </div>
                              </div>
                              <div className="flex justify-center items-center mr-7 mt-3 w-11 h-7 bg-blue-600 rounded-md aspect-[1.13]">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/688459f573915c74266dcb5eb0235120d7e93fd088c5102dd26fe0420b9723d9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="w-5 h-4 fill-white"
                                />
                              </div>
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
