import React, { useEffect, useState } from "react";
import Album from "./GallerieuserFormevent";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./../../components/Header2";
const PayementEvent = () => {
  const [selectedPack, setSelectedPack] = useState("");
  const navigate = useNavigate();
  const { eventodinId } = useParams();
  useEffect(() => {
    console.log(eventodinId, "aloo idd");
  }, [selectedPack]);
  const handleChoosePack = (pack) => {
    setSelectedPack(pack);
    navigate(`/FormEvent/${eventodinId}`, { state: { selectedPack: pack } });
    console.log(selectedPack, "aloo");
  };

  return (
    <>
      <Header />
      <div className="flex justify-center  items-center min-h-screen bg-gray-100 p-6">
        <div className="text-center mt-[100px]">
          <h1 className="text-3xl font-bold mb-2 mt-4">
             Des Packs pour lancer votre aventure !
          </h1>
          <p className="text-lg mb-6">Choisissez le Pack qui vous convient. </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex-1 max-w-lg">
              <h2 className="flex items-start text-blue-600 text-lg font-semibold mb-4">
                Superstar Pack
              </h2>
              <p className="flex items-start text-4xl font-bold mb-4">70 DT</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center md:mt-0 mt-6  mb-2 text-sm font-semibold">
                  <span className="mr-2 md:mt-0 -mt-6">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Participation à l'événement Kick Off League
                </li>{" "}
                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2 md:mt-0 -mt-6">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Cadre logistique professionnel pour la détection
                </li>
                <p className="text-xs ml-7 mb-2">
                  Terrains de test équipés, personnel technique qualifié,
                  matériel sportif dédié aux tests, services de restauration et
                  possibilité d'hébergement pour les participants.
                </p>
                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2 md:mt-0 -mt-6">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Résultats des tests collectifs et individuels
                </li>
                <p className="text-xs ml-7 mb-2">
                  Rapports détaillés et précis sur vos performances.
                </p>
                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2 md:mt-0 -mt-6">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Chances de devenir professionnel
                </li>
                <p className="text-xs ml-7 mb-2 ">
                  Opportunités de contact avec des clubs ou des agents pendant
                  le mercato estival.
                </p>
              </ul>
              <button
                className="bg-blue-600 text-white py-2 px-16 md:px-40  rounded"
                onClick={() => handleChoosePack("pack_standard")}
              >
                Choisir le pack
              </button>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-md p-6 flex-1 max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-white font-semibold">Elite Pack</h2>
                <div className="flex gap-2">
                  <span className="bg-blue-600 py-1 px-2 rounded">
                    Superstar Pack
                  </span>
                  <span className="bg-white text-blue-600 py-1 px-2 rounded">
                    Le plus populaire
                  </span>
                </div>
              </div>
              <p className="flex items-start text-4xl font-bold mb-4">95 DT</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center mb-2 text-sm font-semibold">
                  <span className="mr-2 md:mt-0 -mt-6">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.3" cx="8" cy="8" r="8" fill="white" />
                      <g clip-path="url(#clip0_4319_83773)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83773">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Compte Premium sur la plateforme “Odin Esport”
                </li>
                <p className="text-xs text-white ml-7 mb-2">
                  {" "}
                  Digitalisation des profils avec une visibilité accrue dans
                  l'écosystème du football.
                </p>
                <li className="flex text-sm items-center mb-2  font-semibold">
                  <span className="  mr-2 items-center -mt-11 md:-mt-5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.3" cx="8" cy="8" r="8" fill="white" />
                      <g clip-path="url(#clip0_4319_83773)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83773">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Résultats des tests affichés sur les profils de la plateforme
                  “Odin Esport”
                </li>

                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2 md:mt-0 -mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.3" cx="8" cy="8" r="8" fill="white" />
                      <g clip-path="url(#clip0_4319_83773)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83773">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Support et suivi
                </li>
                <p className="text-xs ml-7 mb-2">
                  Accès à une bibliothèque sportive complète et suivi
                  personnalisé pour maximiser le potentiel des joueurs.
                </p>
              </ul>
              <button
                className="bg-white text-blue-600 py-2 px-16 md:px-40  mt-11 rounded border border-white"
                onClick={() => handleChoosePack("pack_premium")}
              >
                Choisir le pack
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center min-h-screen  bg-gray-100 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            Packs to kickstart your journey !
          </h1>
          <p className="text-lg mb-6">Choose the plan that works for you.</p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex-1 max-w-lg">
              <h2 className="flex items-start text-blue-600 text-lg  font-semibold mb-4">
                Superstar Pack
              </h2>
              <p className=" flex items-start text-4xl font-bold mb-4">70 DT</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center mb-2 text-sm font-semibold">
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Participation à l'événement Kick Off League
                </li>

                <p className="text-sm text-gray-500 ml-7"></p>
                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Cadre logistique professionnel pour la détection
                </li>
                <p className="text-xs ml-4 ">
                  Terrains de test équipés, personnel technique qualifié,
                  matériel sportif dédié aux tests, services de restauration et
                  possibilité d'hébergement pour les participants.
                </p>
                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Résultats des tests collectifs et individuels
                </li>
                <p className="text-xs ml-4">
                  Rapports détaillés et précis sur vos performances.
                </p>
                <li className="flex text-sm items-center mb-2 font-semibold">
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.3"
                        cx="8"
                        cy="8"
                        r="8"
                        fill="#2E71EB"
                      />
                      <g clip-path="url(#clip0_4319_83613)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83613">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Chances de devenir professionnel
                </li>
                <p className="text-xs ml-4">
                  Opportunités de contact avec des clubs ou des agents pendant
                  le mercato estival.
                </p>
              </ul>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => handleChoosePack("pack_standard")}
              >
                Choose Pack
              </button>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-md p-6 flex-1 max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-white font-semibold">Elite Pack</h2>
                <div className="flex gap-2">
                  <span className="bg-blue-600 py-1 px-2 rounded">
                    + Superstar Pack
                  </span>
                  <span className="bg-white text-blue-600 py-1 px-2 rounded">
                    Most Popular
                  </span>
                </div>
              </div>
              <p className=" flex items-start text-4xl font-bold mb-4">95 DT</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center mb-2 text-sm font-semibold">
                  <span className="mr-2 ">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.3" cx="8" cy="8" r="8" fill="white" />
                      <g clip-path="url(#clip0_4319_83773)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83773">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Compte Premium sur la plateforme “Odin Esport”
                </li>
                <p className="text-xs ml-4">
                  Digitalisation des profils avec une visibilité accrue dans
                  l'écosystème du football.
                </p>
                <li className="flex items-center mb-2 text-sm font-semibold">
                  <span className="mr-2 ">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.3" cx="8" cy="8" r="8" fill="white" />
                      <g clip-path="url(#clip0_4319_83773)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83773">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Résultats des tests affichés sur les profils de la plateforme
                  “Odin Esport”
                </li>
                <p className="text-sm  ml-4"></p>
                <li className="flex items-center mb-2 text-sm font-semibold">
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.3" cx="8" cy="8" r="8" fill="white" />
                      <g clip-path="url(#clip0_4319_83773)">
                        <path
                          d="M11.8453 5.42682L6.92683 11.329L4.18848 8.51237L5.14447 7.58293L6.85056 9.33776L10.821 4.57324L11.8453 5.42682Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4319_83773">
                          <rect
                            width="8"
                            height="8"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Support et suivi
                </li>
                <p className="text-xs ml-4">
                  Accès à une bibliothèque sportive complète et suivi
                  personnalisé pour maximiser le potentiel des joueurs.
                </p>
              </ul>
              <button
                className="bg-white text-blue-600 py-2 px-4 rounded"
                onClick={() => handleChoosePack("pack_premium")}
              >
                Choose Pack
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PayementEvent;
