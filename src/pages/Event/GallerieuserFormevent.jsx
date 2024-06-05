import React, { useState, useEffect } from "react";
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';

// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Modal from "react-modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../../index";

import { paysAllInfo } from "../../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Config } from "../../config";
import Header from "../../components/Header2";

const schema = yup.object().shape({
  modepaiement: yup.string().required("Ce champs est obligatoire !"),
});

const Album = () => {
  const [isActive, setIsActive] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [album, setAlbum] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTermsLinkClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handelretourform = () => {
    navigate("/defaultgroupEvents");
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          userData.user.gender =
            userData.user.gender === "male" ? "homme" : "femme";

          setUsers(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const matchingCountry = paysAllInfo.find(
    (country) => country.nationalite === users?.user?.nationality
  );

  const matchingCountryPays = paysAllInfo.find(
    (country) => country.name === users?.user?.countryresidence
  );

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    emailsecondaire: "",
    modepaiement: "",

    status: "Encours",
    champsoptionnel: "",
    eventodinId: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      schema
        .validate(formData, { abortEarly: false })
        .then(() => {
          // If validation passes, proceed with form submission

          const storedUserData = JSON.parse(localStorage.getItem("user"));
          const userId = storedUserData ? storedUserData.id : null;
          const eventodinId = id;

          fetch(`${Config.LOCAL_URL}/api/inscritevent/upload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailsecondaire: formData.emailsecondaire,
              modepaiement: formData.modepaiement,
              // date_validation: formData.date_validation,
              // fraisinscrit: formData.fraisinscrit,
              status: formData.status,
              champsoptionnel: formData.champsoptionnel,
              eventodinId: eventodinId,
              userId: userId,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Reset form data after successful submission
              setFormData({
                emailsecondaire: "",
                modepaiement: "",
                // date_validation: "",
                // fraisinscrit: "",
                status: "",
                champsoptionnel: "",
                eventodinId: "",
                userId: "",
              });

              navigate(`/thanksevent/${id}`);
            })
            .catch((error) => {
              console.error("Error submitting form:", error);
            });
        })
        .catch((validationErrors) => {
          // Handle validation errors
          const newErrors = {};

          if (validationErrors.inner && Array.isArray(validationErrors.inner)) {
            validationErrors.inner.forEach((error) => {
              newErrors[error.path] = error.message;
            });
          } else {
            // Handle the case where validationErrors.inner is not as expected
            console.error(
              "Unexpected validationErrors structure:",
              validationErrors
            );
            // You might want to set a generic error message or handle this case differently
          }

          setErrors(newErrors);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="flex flex-col pt-8 mt-0 md:mt-14 bg-white rounded-xl  max-md:my-10 max-md:max-w-full">
        <div className=" mt-20 md:text-5xl    w-full text-2xl text-center font-bold text-black max-md:max-w-full">
          {getTranslation(
            ` Pre-registration`, // -----> Englais
            `Pré-inscription`, //  -----> Francais
            ``, //  -----> Turkey
            `` //  -----> Allemagne
          )}{" "}
        </div>
        <div className="flex flex-col flex-wrap gap-y-2 justify-between content-start px-20 py-8 mt-2 md:mt-6 max-md:px-4 max-md:max-w-full">
          <div className="max-md:max-w-full">
            <div className="flex gap-3 md:gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                  <div className="flex gap-4 justify-between px-4 text-lg">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/59df83238ff310e910628d8bd3168c058bfa88fb66b3c5c55211fd65db4a7a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="my-auto aspect-[0.75] w-[15px]"
                    />
                    <div className="grow">
                      {getTranslation(
                        `Last name`, // -----> Englais
                        `Nom`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>
                  </div>
                  <input
                    value={users?.user?.nom}
                    disabled
                    type="text"
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                  <div className="flex gap-4 justify-between px-4 text-lg">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b6804daf216040b510e3588d74469399244a1b90572a01c90b865359dc5ac0?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="my-auto aspect-[0.75] w-[15px]"
                    />
                    <div className="grow">
                      {getTranslation(
                        `First name`, // -----> Englais
                        `Prénom`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>
                  </div>
                  <input
                    value={users?.user?.prenom}
                    disabled
                    type="text"
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                  <div className="flex gap-4 justify-between px-4 text-lg">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/60a94d426897782b7365b8c8850daade691e593a3866944a1df0ca4473099960?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="my-auto w-5 aspect-square"
                    />
                    <div className="grow">
                      {getTranslation(
                        `Year of birth`, // -----> Englais
                        `Année de naissance` //  -----> Francais
                      )}
                    </div>
                  </div>
                  <input
                    value={users?.user?.date_naissance}
                    disabled
                    type="text"
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                  />

                  <div className="self-center mt-2 text-zinc-800">
                    {getTranslation(
                      `You must be at least 13 years old .`, // -----> Englais
                      `Vous devez avoir au moins 13 ans .` //  -----> Francais
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-8 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ecca3927dfc3bd6c59dddb415b118548d59fe896ac45d6ba08dcf9dbb25cc49?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">
                  {getTranslation(
                    `Gender`, // -----> Englais
                    `Sexe`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>

              <input
                className="flex flex-col justify-center px-4 py-3.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]"
                type="text"
                disabled
                value={users?.user?.gender}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/092f94cce37a29c49e173094ae8127519c329952195acf18c964dff918bd9544?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">
                  {getTranslation(
                    `Nationality`, // -----> Englais
                    `Nationalité`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                <div className="flex gap-5 justify-between px-4 py-2 w-full rounded-md">
                  <div className="flex gap-4 justify-between">
                    {/* <div className="flex-auto">Tunisienne</div> */}

                    {matchingCountry && matchingCountry.iso && (
                      <div>
                        <span
                          className={`flag-icon flag-icon-${matchingCountry.iso[
                            "alpha-2"
                          ].toLowerCase()}`}
                          style={{
                            marginRight: "8px",
                            height: "20px",
                            width: "50px",
                          }}
                        ></span>
                        {matchingCountry.nationalite}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/657b7b4e3e42d05cbea3c45510522b76cf86b06b0a1d47ec41abf0a57ff40cdd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">
                  {getTranslation(
                    `Country of residence`, // -----> Englais
                    `Pays de résidence`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                <div className="flex gap-5 justify-between px-4 py-2 w-full rounded-md">
                  <div className="flex gap-4 justify-between">
                    {matchingCountryPays && matchingCountryPays.iso && (
                      <div>
                        <span
                          className={`flag-icon flag-icon-${matchingCountryPays.iso[
                            "alpha-2"
                          ].toLowerCase()}`}
                          style={{
                            marginRight: "8px",
                            height: "20px",
                            width: "50px",
                          }}
                        ></span>
                        {matchingCountryPays.countryresidence}
                      </div>
                    )}{" "}
                    {users?.user?.countryresidence}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-8 text-zinc-900 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/be4ad2608224289b1e42bc2da7f2cc573989cbb43db9b54c7ae9749f3309ff69?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="flex-auto">
                  {getTranslation(
                    `City of residence`, // -----> Englais
                    `Ville de résidence` //  -----> Francais
                  )}
                </div>
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                {users?.user?.countryresidence}
              </div>
            </div>
            <div className="flex flex-col flex-1 mt-1 whitespace-nowrap">
              <div className="flex gap-4 px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/84ca92032564e90dd6df0c0ed8bb0f3f4a94a871fdc2b5d33d592d1bfc078fd3?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto aspect-[1.05] w-[21px]"
                />
                <div className="grow">
                  {getTranslation(
                    `Email`, // -----> Englais
                    `Email` //  -----> Francais
                  )}
                </div>{" "}
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-1 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                {users?.user?.email}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-2 ml-6 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc00c5eaa5821ce5ae54c0d94595d6f32479f2489001ac728b02aebe3f1e1e68?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto aspect-[1.1] w-[22px]"
                />
                <div className="flex-auto">
                  {getTranslation(
                    `Secondary Email`, // -----> Englais
                    `Email Secondaire`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}{" "}
                  (
                  {getTranslation(
                    `Optional`, // -----> Englais
                    `Facultatif`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                  )
                </div>{" "}
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                <input
                  type="text"
                  name="emailsecondaire"
                  placeholder="Exemple jhon@gmail.com"
                  value={formData.emailsecondaire}
                  onChange={handleChange}
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between items-start mt-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-stretch text-zinc-900">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/77e0a9d5a9615e1a8589a669ca89cdae1507fb53a73dae9ebb1ad43aaa156c03?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="w-6 aspect-square"
                />
                <div className="grow">N° Whatsapp</div>
              </div>
              <div className="flex gap-4 justify-between mt-2 text-base">
                <div className="grow justify-center items-start py-3.5 pr-16 pl-4 border border-solid border-neutral-200 rounded-[30px] max-md:pr-5">
                  {users?.user?.optionalattributs
                    ? users?.user?.optionalattributs.split(",")[0]
                    : null}{" "}
                  {`  `}
                  {users?.user?.numWSup}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 text-zinc-900">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8342 3.8475C10.8342 3.3875 11.2067 3.01417 11.6675 3.01417H15.0642L13.9892 1.9175C13.6667 1.58833 13.6717 1.06083 14.0008 0.738333C14.3283 0.4175 14.8575 0.420833 15.1792 0.75L16.9933 2.60083C17.3192 2.92583 17.5008 3.365 17.5008 3.83333C17.5008 4.30167 17.3183 4.74167 16.9875 5.0725L15.1792 6.91667C15.0167 7.08333 14.8 7.16667 14.5842 7.16667C14.3733 7.16667 14.1625 7.0875 14.0008 6.92833C13.6717 6.60583 13.6675 6.07833 13.9892 5.74917L15.0375 4.67917H11.6675C11.2067 4.67917 10.8342 4.30583 10.8342 3.84583V3.8475ZM19.2908 7.735C18.8617 7.34417 18.3025 7.14167 17.7258 7.17C17.145 7.19667 16.61 7.44833 16.2308 7.86583L13.28 10.98C13.3067 11.155 13.3342 11.33 13.3342 11.5117C13.3342 13.2475 12.0383 14.7417 10.32 14.9867L6.77667 15.4833C6.32083 15.5483 5.89917 15.2317 5.83417 14.7767C5.76917 14.3208 6.08583 13.8992 6.54083 13.8342L10.0092 13.3483C10.7892 13.2367 11.4658 12.6767 11.6258 11.905C11.8725 10.7175 10.9675 9.6675 9.8225 9.6675H7.5V8.83417H7.81333C9.01917 8.83417 10 7.85333 10 6.6475C10 5.57417 9.23083 4.66667 8.1725 4.49083L5.435 4.03417C5.18333 3.9925 5.00083 3.77667 5.00083 3.52083C5.00083 3.23417 5.23417 3.00083 5.52083 3.00083H7.72417C8.02083 3.00083 8.2975 3.16083 8.44667 3.4175C8.67583 3.81583 9.18417 3.9525 9.585 3.72167C9.98333 3.49083 10.12 2.98167 9.88833 2.58333C9.44333 1.8125 8.61333 1.33333 7.72333 1.33333H7.5C7.5 0.873333 7.1275 0.5 6.66667 0.5C6.20583 0.5 5.83333 0.873333 5.83333 1.33333H5.52C4.31417 1.33333 3.33333 2.31417 3.33333 3.52C3.33333 4.59333 4.1025 5.50083 5.16083 5.67667L7.89833 6.13333C8.15 6.175 8.3325 6.39083 8.3325 6.64667C8.3325 6.93333 8.09917 7.16667 7.8125 7.16667H5.60917C5.3125 7.16667 5.03583 7.00667 4.88667 6.75C4.6575 6.35083 4.14833 6.21417 3.74833 6.44583C3.35 6.67667 3.21333 7.18583 3.445 7.58417C3.89 8.355 4.72 8.83333 5.61 8.83333H5.83333V9.66667H3.33333C1.4925 9.66667 0 11.1592 0 13V17.1667C0 19.0075 1.4925 20.5 3.33333 20.5H6.885C9.2225 20.5 11.4517 19.5183 13.03 17.795L19.4483 10.7875C20.2383 9.9025 20.1667 8.53167 19.2908 7.73333V7.735Z"
                    fill="#1D1E21"
                  />
                </svg>
                <div className="grow">
                  {" "}
                  {getTranslation(
                    `Payment Method`, // -----> Englais
                    `Mode de paiement` //  -----> Francais
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                <div
                  htmlFor="modepaiement"
                  className="flex gap-5 justify-between px-4 py-2 rounded-md"
                >
                  <select
                    name="modepaiement"
                    value={formData.modepaiement}
                    onChange={handleChange}
                    className="w-full"
                  >
                    <option>
                      {getTranslation(
                        `Bank Transfer / On-site`, // -----> Englais
                        ` virement Bancaire / sur place` //  -----> Francais
                      )}
                    </option>
                    <option value="Par virement">
                      {getTranslation(
                        `Bank Transfer`, // -----> Englais
                        ` virement Bancaire` //  -----> Francais
                      )}
                    </option>
                    <option value="Sur place">
                      {getTranslation(
                        `On-site`, // -----> Englais
                        `Sur place` //  -----> Francais
                      )}
                    </option>
                  </select>
                </div>
              </div>{" "}
              <p className="text-red text-md">{errors.modepaiement}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-y-2 justify-between py-2 mr-4 w-full text-base font-medium flex-nowrap">
            <div className="flex gap-3 items-center justify-center  px-4 py-2 text-white  bg-orange-500 rounded-[30px] ">
              <button onClick={handelretourform} className="grow md:ml-4">
                {getTranslation(
                  `Cancel`, // -----> Englais
                  `Annuler` //  -----> Francais
                )}
              </button>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex gap-1 items-center justify-center   px-4 py-2 text-white bg-blue-600 rounded-[30px] ">
              <button className="grow" onClick={handleSubmit}>
                {getTranslation(
                  `Submit`, // -----> Englais
                  `Confirmer` //  -----> Francais
                )}
              </button>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/baaf729ca2403013e4685351338f1da226bf86e312b0177a0235a267f7f3c2f3?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="w-5 aspect-square"
              />
            </div>
          </div>

          {/* <div className="flex flex-col md:flex-row gap-y-2 justify-between py-2 mr-4 w-full text-base font-medium flex-nowrap">

            <div className="flex gap-3 items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-[30px] md:order-2 md:flex-row md:justify-center md:items-center">
              <button onClick={handleSubmit} className="grow">Confirmer</button>
              <div className="md:ml-auto md:order-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/baaf729ca2403013e4685351338f1da226bf86e312b0177a0235a267f7f3c2f3?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="w-5 aspect-square md:mb-0"
                />
              </div>
            </div>

            <div className="flex gap-1 items-center justify-center px-4 py-2 text-white bg-orange-500 rounded-[30px] md:order-1">
              <button onClick={handelretourform} className="grow">Annuler</button>
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className=" ml-">
                <path d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z" fill="white" />
              </svg>
            </div>

          </div> */}
        </div>
      </div>
    </>
  );
};

export default Album;
