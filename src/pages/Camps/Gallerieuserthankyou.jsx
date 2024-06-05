import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { Config } from "../../config";
import Header from "../../components/Header2";
import { Context } from "../../index";

const Album = () => {
  const [isActive, setIsActive] = useState(false);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [album, setAlbum] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setSelectedCard(id);
    // Navigate to the details page with the selected card's id
    navigate(`/defaultgroup/${id}`);
  };
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const userId = storedUserData ? storedUserData.id : null;

    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/albumc`);
        const result = await response.json();

        // Convert id to a number before filtering
        const numericId = parseInt(id, 10);

        // Filter out the current camp based on the numeric id from useParams
        const filteredAlbums = result.data.filter(
          (value) => value.id !== numericId
        );

        setAlbum(filteredAlbums);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchAlbums();
  }, [id]); // Include id in the dependency array to re-run the effect when id changes

  return (
    <>
      <Header />

      <div className="flex flex-col items-center pb-9 px-2 bg-zinc-100">
        <div className="flex justify-center items-center px-2 mx-4 md:mx-0 md:px-10 py-10 mt-24  md:mt-24 w-full bg-white rounded-xl">
          <div className="w-full max-w-[1120px]">
            <div className="flex flex-col md:flex-row-reverse gap-5">
              <div className="flex flex-col w-full md:w-3/5">
                <div className="flex flex-col self-stretch my-auto text-base">
                  <div className="text-2xl text-center md:text-4xl font-bold text-blue-600">
                    THANK YOU!
                  </div>
                  <div className="text-zinc-900 md:px-0 px-3">
                    {getTranslation(
                      `Votre préinscription au camp de soccer est enregistrée! N'oubliez pas de vérifier vos e-mails pour la confirmation finale. Nous avons hâte de vous retrouver sur le terrain!`, // -----> Englais
                      `Your pre-registration for the soccer camp is recorded! Don't forget to check your emails for the final confirmation. We look forward to seeing you on the field!` //  -----> Francais
                    )}{" "}
                  </div>
                  <div className="flex gap-1 md:gap-4 max-md:max-w-[250px] items-center flex-1 justify-center  mx-2 px-8 py-2 mt-6 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] ">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9cb7dcd8e4198fc85a3fd9f3a4a89f77f8d22cc38535f84baf50f8089f909e1?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="w-5 aspect-square fill-white"
                    />
                    <Link to="/home">
                      <div className="flex items-center max-md:scale-90 justify-center flex-1 md:mr-0">
                        {getTranslation(
                          `Back to home`, // -----> Englais
                          `Revenir au page d’accueil` //  -----> Francais
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-2/5 ">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="grow w-full aspect-[0.79] max-md:scale-90"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center px-4 md:px-0 mt-6 w-full bg-white rounded-xl shadow-sm">
          <div className="flex flex-col w-full max-w-[1115px]">
            <div className="flex gap-5 justify-between pt-4">
              <div className="flex-auto ml-2 text-lg md:text-3xl font-bold text-zinc-900">
                {getTranslation(
                  `Camps that might interest you`, // -----> Englais
                  `Camps qui pourraient vous intéresser` //  -----> Francais
                )}{" "}
              </div>
            </div>
            <div className="px-2 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {album.map((value, index) => (
                  <div key={index} className="flex flex-col">
                    <div
                      onClick={() => handleCardClick(value.id)}
                      className="flex flex-col grow items-start pb-4 mx-auto w-full bg-white rounded-xl"
                    >
                      <img
                        loading="lazy"
                        srcSet={value.ImagesAlbumcamps[0]?.image_url}
                        className="self-stretch w-full aspect-square rounded-t-xl object-cover"
                      />
                      <div className="pl-3 pr-2">
                        <div className="mt-4 px-2 self-start text-break font-semibold text-zinc-900">
                          {value.album_name}
                        </div>
                        <div className="flex justify-between mt-1 px-2 max-w-full text-xs font-light whitespace-nowrap text-zinc-400 w-[282px]">
                          <div className="flex self-start gap-2">
                            <div className="flex self-start">
                              {value.date_debut}
                            </div>
                            <div>-</div>
                            <div className="grow">{value.date_fin}</div>
                          </div>
                          <div className=" text-xs text-break font-light w-35 ml-5 whitespace-pre-line">
                            {value.payscamps}
                          </div>
                        </div>
                        <div className="mt-2 text-xs mx-2 font-light text-black">
                          {value.description.length > 100
                            ? value.description.slice(0, 100) + "..."
                            : value.description}
                        </div>
                        <div className="flex gap-5 px-2 justify-between items-center mt-3  max-w-full w-[282px]">
                          <div className="flex flex-col whitespace-nowrap ">
                            <div className="text-xs font-light text-zinc-400">
                              {getTranslation(
                                `Price`, // -----> Englais
                                `Prix` //  -----> Francais
                              )}
                            </div>
                            <div className="mt-1 text-base text-zinc-900 font-semibold">
                              {value.prix} €
                            </div>
                          </div>
                          <div className="flex justify-center items-center w-11 h-7 bg-blue-600 rounded-md aspect-[1.13]">
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
    </>
  );
};

export default Album;
