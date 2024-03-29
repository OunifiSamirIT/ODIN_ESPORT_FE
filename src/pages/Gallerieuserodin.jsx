import React, { useState, useEffect } from "react";
import Header from "../components/Header";
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';
import Pagetitle from "../components/Pagetitle";
// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';
import Load from "../components/Load";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { paysAllInfo } from "../assets/data/Country";
import "./flags.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Config } from "../config";
const Album = () => {
  const [album, setAlbum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();



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


  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/album`);
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
    { value: '3jours', label: '3 jours' },
    { value: 'semaine', label: 'Semaine' },
    { value: '2 semaine', label: '2 semaine' },
    { value: '3semaines', label: '3 semaines' },
    { value: '1mois', label: '1 mois' },
    { value: '2mois', label: '2 mois' },
    { value: '3mois', label: '3 mois' },
    { value: '4mois', label: '4 mois' },
    { value: '5mois', label: '5 mois' },
    { value: '6mois', label: '6 mois' },
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
    console.log("After Reset:", searchDuree, searchDateDB);
  };
  
  const handleDureeChange = (e) => {
    setSearchDuree(e.target.value);
  };
  
  
  
  const handleTypePrixChange = (e) => {
    setSearchTypePrix(e.target.value);
  };
  
  const handleDateDBChange = (date) => {
    // Format the date as "yyyy-MM-dd"
    const formattedDate = date.toISOString().split('T')[0];
  
    // Update the state with the formatted date
    setSearchDateDb(formattedDate);
  };
  
  
  
  const handleDateDFChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
  
    // Update the state with the formatted date
    setSearchDateDF(formattedDate);
  };

  const handleSearch = () => {

    const filteredData = album.filter((camps) => {
      const dateDebut = camps.date_debut ? new Date(camps.date_debut) : null;
      const dateFin = camps.date_fin ? new Date(camps.date_fin) : null;
  
      // Check if Date objects were successfully created
      if (dateDebut === null || isNaN(dateDebut.getTime())) {
          console.error('Invalid date_debut:', camps.date_debut);
          return false; // Skip this camp if date_debut is invalid
      }
      if (dateFin === null || isNaN(dateFin.getTime())) {
          console.error('Invalid date_fin:', camps.date_fin);
          return false; // Skip this camp if date_fin is invalid
      }
  
      // Format date strings for comparison
      const formattedDateDB = dateDebut.toISOString().split('T')[0];
      const formattedDateDF = dateFin.toISOString().split('T')[0];
  
      // Add your filtering logic here
      return (
          camps.Duree.toLowerCase().includes(searchDuree.toLowerCase()) &&
          (searchPays === "" || camps.payscamps === searchPays) &&
          (searchTypePrix === "" || camps.prix === searchTypePrix) &&
          (searchDateDB === "" || formattedDateDB === searchDateDB) &&
          (searchDateDF === "" || formattedDateDF === searchDateDF)
      );
    });
    console.log('Search Criteria:', searchDuree, searchPays, searchTypePrix, searchDateDB, searchDateDF);

    setFilteredCamps(filteredData);
  };

  
  
  return (
    <>
    <Header />

    <div className="flex flex-col pb-12 mt-0 lg:mt-14 bg-zinc-100">
      <div className="self-center mt-12 w-full max-w-[1344px] max-md:mt-10 max-md:max-w-full">
        <div className="flex max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 pt-4 pb-6 mx-auto w-full  rounded-xl max-md:mt-6"></div>
          </div>

          <div className="flex flex-col ml-5 mr-7 mt-1 w-[76%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col px-9 pt-2 mt-12 pb-4 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                  Chercher un camp
                </div>
                <div className="flex-wrap gap-y-4 justify-between content-start mt-4 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-10">
                        <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/803e02712b2b4c86f9a16b3c2fd85a1f2520ba9fac821299d322e0a17e04e0df?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 aspect-square"
                          />
                          <div className="grow">Durée</div>
                        </div>
                        <div className="flex flex-col justify-center mt-2 w-full text-xs font-light border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                          <div className="flex gap-5 justify-between px-4 py-3.5 rounded-md">
                            <select
                               onChange={handleDureeChange}
                               value={searchDuree}
                            >
                              {dureeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
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
                          <div className="grow">Date de début</div>
                        </div>
                        <div className="flex flex-col justify-center mt-2 w-full text-xs font-light whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                          <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                            <DatePicker 
                            dateFormat="yyyy-MM-dd" 
                             selected={searchDateDB} // Set the selected date from your state
                             onChange={(date) => handleDateDBChange(date)} // Handle date change
  />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-10">
                        <div className="flex gap-4 justify-between px-4 text-base">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bfb1d26cb36312136826da85a4c47e65f704f7a4f080f319b159e471c18e5bc?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 aspect-square"
                          />
                          <div className="grow">Pays</div>
                        </div>
                        <div className="flex flex-col justify-center mt-2 text-xs font-light border border-solid  rounded-[30px]">
                          <Select
                           options={optionsPays}
                           onChange={(selectedOption) => setSearchPays(selectedOption.label.props.children[1])}
                              value={optionsPays.find((option) => option.value === searchPays)}
                            placeholder="Pays Camps"
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
                      <div className="flex flex-col grow text-base whitespace-nowrap text-zinc-900 max-md:mt-10">
                        <div className="flex gap-4 justify-between px-4">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/50a0695569327f7204d974bc36853e47face4848f228a6c678484e0d7aca8146?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="aspect-[0.9] fill-zinc-900 w-[18px]"
                          />
                          <div className="grow">Prix</div>
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
                        <div className="flex gap-4 justify-between px-4 mt-4">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between py-2 mt-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                  <button
                    className="justify-center px-8 py-2 text-white bg-orange-500 rounded-[30px] max-md:px-5"
                    onClick={handleReset}
                  >
                    Réinitialiser
                  </button>
                  <div className="flex gap-2 justify-between pl-6">
                    <div
                      className="justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5"
                      onClick={handleSearch}
                    >
                      Confirmer
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2 mt-6 max-md:max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-md:flex-col max-md:gap-0">
                  {filteredCamps.map((value, index) => (
                    <div key={index} className="flex flex-col">
                      <div onClick={() => handleCardClick(value.id)} className="flex flex-col grow items-center pb-4 mx-auto w-full bg-white rounded-xl">
                        <img
                          loading="lazy"
                          srcSet={value.ImagesAlbumcamps[0]?.image_url}
                          className="self-stretch w-full aspect-square rounded-t-xl object-cover"
                        />
                        <div className="mt-4 text-base font-semibold text-zinc-900">
                          {value.album_name}
                        </div>
                        <div className="flex justify-between mt-1 px-2 max-w-full text-xs font-light whitespace-nowrap text-zinc-900 w-[282px]">
                          <div className="flex gap-2">
                            <div className="grow">{value.date_debut}</div>
                            <div>-</div>
                            <div className="grow">{value.date_fin}</div>
                          </div>
                          <div>{value.payscamps}</div>
                        </div>
                        <div className="mt-2 text-xs mx-2 font-light text-zinc-900">
                          {value.description}
                        </div>
                        <div className="flex gap-5 px-2 justify-between mt-2 max-w-full w-[282px]">
                          <div className="flex flex-col whitespace-nowrap text-zinc-900">
                            <div className="text-xs font-light">Prix</div>
                            <div className="mt-1 text-base font-semibold">
                              {value.prix} €
                            </div>
                          </div>
                          <div className="flex justify-center items-center p-2.5  bg-blue-600 rounded-md aspect-[1.13]">
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
