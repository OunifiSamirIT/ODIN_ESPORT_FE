import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { paysAllInfo } from "../../../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";
import { Context } from "../../../index";
const Scout = ({ userInfo }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const MultiValueContainer = ({ children, ...props }) => {
    return (
      <components.MultiValueContainer {...props}>
        <span className="text-white flex gap-3 justify-center">{children}</span>
        {selectedCountries.length > 1 && (
          <span
            onClick={() =>
              setSelectedCountries(
                selectedCountries.slice(0, selectedCountries.length - 1)
              )
            }
            style={{ cursor: "pointer", marginLeft: "5px", color: "white" }}
          ></span>
        )}
      </components.MultiValueContainer>
    );
  };

  const handleChange = (event) => {
    const input = event.target.value;
    // Ensure the input is a valid number, non-negative, and has at most 3 digits
    if (/^\d*$/.test(input) && input.length <= 3 && input >= 0) {
      setValue(event.target.name, input);
    } else {
      setValue(event.target.name, 0);
    }
  };
  const schema = yup
    .object({
      engagement: yup
        .string()
        .required("Ce champ est obligatoire")
        .min(2, ({ min }) => `Minimum de (${min} characters nécessaire)`)
        .max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
      totalPlayer: yup
        .string()
        .required("Ce champ est obligatoire")
        .max(70, ({ max }) => `Maximum de (${max} characters autorisé)`),
      region: yup
        .string()
        .required("Ce champ est obligatoire")
        .min(4, () => `Ce champs est obligtoire)`),
      skills: yup
        .array()
        .min(3, "Vous Devez selectionner au minimum 3 compétences !") // Validate minimum length
        .required("Vous pouvez selectionner au maximum 10 compétences !"),
      region: yup
        .array()
        .required("Ce champs est obligatoire")
        .min(1, "Vous pouvez selectionner au minimum 1 region !"),
    })
    .required();

  const [selectedSkills, setSelectedSkills] = useState(
    userInfo.scout.skillsscout.split(",").filter((item) => item !== "")
  );
  const [baseSkills, setBaseSkills] = useState(
    userInfo.scout.skillsscout.split(",").filter((item) => item !== "")
  );
  const [selectedSkillsError, setSelectedSkillsError] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState();
  const [selectedRegionsV, setSelectedRegionsV] = useState([]);

  const toggleSkill = (skill) => {
    const skillExists = selectedSkills.includes(skill);

    if (!skillExists && selectedSkills.length < 10) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
    } else {
      const updatedSkills = selectedSkills.filter(
        (selectedSkill) => selectedSkill !== skill
      );
      setSelectedSkills(updatedSkills);
    }
  };

  const skillsList = [
    "Analyse tactique",
    "Connaissance approfondie du sport",
    "Réseautage",
    "Observation",
    "Analyse des données",
    "Compétence en communication",
    "Connaissance des marchés",
    "Rapports détaillés",
    "Gestion du temps",
    "Éthique professionnelle",
    "Compétences informatiques",
    "Adaptabilité",
    "Évaluation psychologique",
  ];
  const regionOptions = Array.from(
    new Set(paysAllInfo.map((country) => country.region))
  ).map((region) => ({
    value: region,
    label: region,
  }));

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const handleDestructureCountries = (stringValue) => {
    const countryLabelsArray = stringValue.split(",");
    return countryLabelsArray.map((countryLabel) => {
      return regionOptions.find((option) => {
        return option.value === countryLabel;
      });
    });
  };
  const handleRegionChange = (selectedOptions) => {
    setSelectedRegions(selectedOptions);
    // Update the formData state with the selected countries
    const selectedCountryLabels = selectedOptions
      .map((option) => option.value)
      .join(",");
    setSelectedRegionsV(selectedCountryLabels);
  };
  useEffect(() => {
    const val = handleDestructureCountries(userInfo.scout.paysscout);
    setSelectedRegions(val);
    setValue("engagement", userInfo.scout.engagement);
    setValue("totalPlayer", userInfo.scout.nb_joueurdetecter);
  }, []);
  useEffect(() => {
    setValue("region", selectedRegions);
  }, [selectedRegions]);

  useEffect(() => {
    setValue("skills", selectedSkills);
  }, [selectedSkills]);

  const resetForm = async () => {
    const val = handleDestructureCountries(userInfo.scout.paysscout);
    setSelectedRegions(val);
    setValue("engagement", userInfo.scout.engagement);
    setValue("totalPlayer", userInfo.scout.nb_joueurdetecter);
    setValue("region", selectedRegions);
    setValue("skills", setSelectedSkills(baseSkills));
  };
  const onSubmit = async (data) => {
    const formDataToUpdate = new FormData();
    formDataToUpdate.append("engagement", data.engagement);
    formDataToUpdate.append("totalPlayer", data.totalPlayer);
    formDataToUpdate.append("skills", selectedSkills);
    formDataToUpdate.append("region", selectedRegionsV);

    const response = await fetch(
      `${Config.LOCAL_URL}/api/scouts/${storedUserData.id}`,
      {
        method: "PUT",
        body: formDataToUpdate,
      }
    ).then((r) => {
      if (r.status === 200) {
        toast.success("Vos modifications ont été enregistrées avec succès.", {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  return (
    <>
      <div className="py-4 flex flex-col flex-wrap grow justify-between content-start w-full bg-white rounded-xl max-md:max-w-full">
        <div>
          <ToastContainer />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap  gap-y-6 justify-between  w-full bg-white rounded-xl   max-md:max-w-full"
        >
          <div className="mt-6  max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
            <div className="lg:flex-1 w-full">
              <div className="flex items-center gap-4 justify-between px-4 whitespace-nowrap items-center">
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.483 9.2711L19.1399 15.6698L13.7165 19.7378C12.3621 20.7541 10.4991 20.7541 9.14466 19.7378L3.30316 15.3564C2.80883 14.9859 2.20687 14.7849 1.58872 14.7849H0.953422C0.426706 14.7849 0 14.3582 0 13.8325V3.29531C0 2.81145 0.360986 2.40856 0.841983 2.35427C2.13448 2.21044 3.2984 1.69135 4.48899 0.997952C6.20153 0.116918 8.4484 0.431232 9.83806 1.73326L10.4257 2.29807L6.60918 6.02318C5.58719 7.04423 5.42431 8.65866 6.2301 9.774C6.72539 10.4626 7.62166 10.9732 8.55794 10.9732C9.31324 10.9732 10.0381 10.676 10.5619 10.1512L11.483 9.27015V9.2711ZM19.0056 0.997952C17.3959 0.193115 15.3881 0.402658 13.9499 1.5199L7.94645 7.3795C7.59309 7.73382 7.51308 8.30053 7.77405 8.66247C7.9455 8.90059 8.19409 9.04346 8.47793 9.06727C8.75891 9.09108 9.03131 8.98917 9.22848 8.79106L12.6745 5.52504C13.5784 4.66686 14.888 6.03651 13.9918 6.90136L12.8669 7.94622L21.0515 14.7859H21.9058C22.4316 14.7859 22.8583 14.3592 22.8583 13.8334V3.26292C22.8583 2.79621 22.5173 2.41046 22.0573 2.3276C20.4438 2.03614 19.0046 0.998904 19.0046 0.998904L19.0056 0.997952Z"
                    fill="#1D1E21"
                  />
                </svg>
                <div className="grow text-lg">
                  {" "}
                  {getTranslation(
                    `Type of commitment`, // -----> Englais
                    `Type d’engagement`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
              <select
                name="engagement"
                {...register("engagement")}
                className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                  errors.club ? "is-invalid !border-red-500" : ""
                }`}
              >
                <option value="" disabled>
                  {getTranslation(
                    `Your type of commitment`, // -----> Englais
                    `Votre type d’engagement`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </option>
                <option value="plein-temps">
                  {getTranslation(
                    `Full-Time`, // -----> Englais
                    `Plein Temps`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </option>
                <option value="mi-temps">
                  {getTranslation(
                    `Part-Time`, // -----> Englais
                    `Mi-Temps`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}{" "}
                </option>
                <option value="volontaire">
                  {getTranslation(
                    `Volunteer`, // -----> Englais
                    `Volontaire`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </option>
              </select>
              {errors.engagement && (
                <span className="invalid-feedback block py-2 px-2">
                  {errors.engagement.message}
                </span>
              )}
            </div>
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 justify-between px-4">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48be6745725217387de9710be0a193a4d08011e72ce73951c9268683bb1b223?"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow text-lg">
                  {" "}
                  {getTranslation(
                    `Number of players scouted`, // -----> Englais
                    `Nombre de joueurs détectés`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
              <input
                {...register("totalPlayer")}
                onChange={handleChange}
                name="totalPlayer"
                type="number"
                className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                  errors.totalPlayer ? "is-invalid !border-red-500" : ""
                }`}
              />

              {errors.totalPlayer && (
                <span className="invalid-feedback block py-2 px-2">
                  {errors.totalPlayer.message}
                </span>
              )}
            </div>
          </div>
          <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
            <div className="lg:flex-1">
              <div className="flex items-center gap-4 justify-between px-4">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_617_39188)">
                    <path
                      d="M10 0.5C4.48583 0.5 0 4.98583 0 10.5C0 16.0142 4.48583 20.5 10 20.5C15.5142 20.5 20 16.0142 20 10.5C20 4.98583 15.5142 0.5 10 0.5ZM12.945 11.7592L11.0775 15.8058C10.9292 16.1275 10.6075 16.3333 10.2533 16.3333H10.0758C9.57417 16.3333 9.1675 15.9267 9.1675 15.425V13.4542C9.1675 13.1633 9.05167 12.8842 8.84583 12.6783L7.85417 11.6867C7.6275 11.46 7.5 11.1525 7.5 10.8325V10.03C7.5 9.7975 7.4075 9.57417 7.2425 9.40917L6.93167 9.09833C6.76167 8.92833 6.53167 8.83333 6.29167 8.83333H4.6675C4.3475 8.83333 4.04167 8.7025 3.82083 8.47L2.43917 7.0175C3.76167 4.15917 6.64917 2.16667 10 2.16667C10.1717 2.16667 10.3392 2.1825 10.5075 2.1925C10.0633 2.86583 9.66083 3.485 9.41667 3.86333C9.2625 4.10083 9.25917 4.40333 9.405 4.64667L10.1025 5.81C10.2875 6.1175 10.2383 6.51167 9.985 6.76583L9.9825 6.76833C9.74417 7.00667 9.38083 7.06583 9.07917 6.915L8.34583 6.54833C8.09 6.42 7.78083 6.47083 7.57833 6.6725L7.1375 7.11333C6.8775 7.37333 6.8775 7.79417 7.1375 8.05333L7.63083 8.54667C7.81417 8.73 8.06333 8.83333 8.3225 8.83333H9.515C9.8325 8.83333 10.1433 8.9225 10.4125 9.09083L12.5475 10.425C12.9967 10.7058 13.1675 11.2775 12.945 11.7592ZM16.27 10.7167C15.9933 10.5792 15.7908 10.3275 15.7158 10.0275L15.1933 7.93833C15.0792 7.48167 15.2817 7.00417 15.6892 6.76917L17.0083 6.00833C17.8433 7.30583 18.3333 8.84583 18.3333 10.5C18.3333 10.9067 18.2942 11.3025 18.2375 11.6933L16.27 10.7167Z"
                      fill="#1D1E21"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_617_39188">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <div className="grow text-lg">
                  {getTranslation(
                    `Exploration regions`, // -----> Englais
                    `Régions d’explorations`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
              <Select
                options={regionOptions}
                name="region"
                placeholder="Choisir une region"
                value={selectedRegions}
                onChange={handleRegionChange}
                className={`border border-red-500 rounded-full mt-2 ${
                  errors.region ? "!border-red-500" : ""
                }`}
                isMulti // Enable multiple selection
                components={{ MultiValueContainer }}
                // className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: "0.375rem",
                    display: "flex",
                    borderColor: "transparent",
                    justifyContent: "center",
                    borderRadius: "30px",
                    width: "100%",
                    minHeight: "53px",
                    color: "white", // Set text color to black
                  }),
                  options: (provided) => ({
                    color: "white",
                  }),
                  multiValue: (provided, state) => ({
                    backgroundColor: "#2E71EB",
                    display: "flex",
                    color: "white",
                    padding: "0px 5px",
                    border: "transparent",
                    margin: "5px 5px",
                    justifyContent: "center",
                    borderRadius: "30px",
                    fontSize: "1rem",
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
              />
              {errors.region && (
                <span className="invalid-feedback block py-2 px-2">
                  {errors.region.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2   text-lg text-blue-600 max-md:flex-wrap max-md:pr-5 max-md:mr-2.5 max-md:max-w-full">
            <div className="flex gap-4 self-start  text-lg whitespace-nowrap text-zinc-900">
              <div className="flex gap-4 self-start px-4 text-lg text-black whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                  className="my-auto w-5 aspect-square"
                />
                <div className="flex-auto">
                  {getTranslation(
                    `Skills`, // -----> Englais
                    `Compétences`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
            </div>
            <div className="form-group icon-input  mb-3">
              {skillsList.map((skill, index) => (
                <div
                  key={skill}
                  className="form-check rounded-[30px] pl-0  form-check-inline me-2 mb-2"
                >
                  <input
                    type="checkbox"
                    id={"skill" + index}
                    name="coachSkillsInProfile"
                    checked={selectedSkills.includes(skill)}
                    className="form-check-input d-none rounded-[30px] "
                    onChange={() => toggleSkill(skill)}
                  />
                  <label
                    htmlFor={"skill" + index}
                    className={`form-check-label btn ${
                      selectedSkills.includes(skill)
                        ? "flex gap-4 text-white justify-between px-4 py-2 bg-blue-600 rounded-[30px]"
                        : `${
                            (!selectedSkills.includes(skill) &&
                              errors.skills) ||
                            selectedSkillsError
                              ? "border-1 border-red-500 flex gap-4 justify-between px-4 py-2 text-blue-600 bg-gray-100 rounded-[30px]"
                              : "flex gap-4 justify-between px-4 py-2 text-blue-600 bg-gray-100 rounded-[30px]"
                          } `
                    }`}
                  >
                    <div className="text-[18px] font-light">
                      {" "}
                      {skill}{" "}
                      {selectedSkills.includes(skill) ? (
                        <span className="pl-2">-</span>
                      ) : (
                        <span className="pl-2">+</span>
                      )}{" "}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            {errors.skills && (
              <span className="invalid-feedback block py-2 px-2">
                {errors.skills?.message}
              </span>
            )}
            {selectedSkills.length >= 10 && (
              <span className="invalid-feedback block py-2 px-2">
                {getTranslation(
                  `You can select up to 10 skills!`, // -----> Englais
                  `Vous pouvez selectionner au maximum 10 compétences !`, //  -----> Francais
                  ``, //  -----> Turkey
                  `` //  -----> Allemagne
                )}
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-y-2 justify-between py-2 mr-4 w-full text-base font-medium flex-nowrap">
            <div className="hidden md:flex gap-2 items-center justify-center  px-4 py-2 text-orange-600 border-2 border-solid border-orange-600 rounded-[30px] max-md:px-5">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                  fill="#FF7F00"
                />
              </svg>
              <button onClick={resetForm} className="">
                {getTranslation(
                  `Cancel`, // -----> Englais
                  ` Annuler`, //  -----> Francais
                  ``, //  -----> Turkey
                  `` //  -----> Allemagne
                )}
              </button>
            </div>
            <div className="flex gap-2 items-center justify-center   px-4 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                className="w-5 aspect-square"
              />
              <button type="submit" className="">
                {getTranslation(
                  `Submit`, // -----> Englais
                  `Confirmer`, //  -----> Francais
                  ``, //  -----> Turkey
                  `` //  -----> Allemagne
                )}
              </button>
            </div>
            <div className="md:hidden flex gap-2 items-center justify-center  px-4 py-2 text-orange-600 border-2 border-solid border-orange-600 rounded-[30px] max-md:px-5">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                  fill="#FF7F00"
                />
              </svg>

              <button onClick={resetForm} className="">
                {getTranslation(
                  `Cancel`, // -----> Englais
                  ` Annuler`, //  -----> Francais
                  ``, //  -----> Turkey
                  `` //  -----> Allemagne
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Scout;
