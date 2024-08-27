import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";
import { Context } from "../../../index";
import secureLocalStorage from "react-secure-storage";

const Other = ({ userInfo }) => {
  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const [selectedSkillsError, setSelectedSkillsError] = useState(false);
  const fanDeFootballAttributes = [
    "Engagement émotionnel",
    "Fidélité",
    "Esprit sportif",
    "Réseautage social",
    "Adaptabilité",
    "Motivation",
    "Respect",
  ];
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const journalisteSportifAttributes = [
    "Recherche",
    "Rédaction",
    "Communication",
    "Maîtrise des médias sociaux",
    "Réactivité",
    "Gestion du temps",
    "Analyse critique",
    "Adaptabilité",
  ];

  const arbitreDeFootballAttributes = [
    "Encouragement",
    "Ecoute",
    "Communication",
    "Leadership",
    "Motivation",
    "Autorité et respect",
    "Gestion des conflits",
    "Réactivité",
    "Gestion du stress",
  ];

  const analysteDeFootballAttributes = [
    "Esprit d'équipe",
    "Gestion du temps",
    "Communication",
    "Analyse vidéo",
    "Compétences analytiques",
    "Connaissance tactique",
    "Communication",
    "Adaptabilité",
    "Compréhension des adversaires",
    "Rapports détaillés",
    "Collaboration",
    "Compétences informatiques",
    "Éthique professionnelle",
  ];

  const nutritionnisteAttributes = [
    "Évaluation nutritionnelle",
    "Planification de régimes",
    "Compréhension des besoins",
    "Adaptabilité",
    "Communication",
    "Écoute",
    "Encouragement",
  ];

  const physiotherapeuteAttributes = [
    "Compétences Physiothérapeute",
    "Gestion du temps",
    "Éthique professionnelle",
    "Empathie",
    "Analyse des mouvements sportifs",
  ];

  const medecinDEquipeAttributes = [
    "Diagnostic des blessures",
    "Prévention des blessures",
    "Gestion du stress",
    "Technologie médicale",
    "Empathie",
  ];

  const preparateurPhysiqueAttributes = [
    "Leadership",
    "Collaboration",
    "Communication",
    "Connaissance du football",
    "Rééducation",
    "Motivation",
    "Gestion du stress",
    "Évaluation de condition physique",
    "Planification de l'entraînement",
  ];

  const schema = yup
    .object({
      skills: yup
        .array()
        .min(1, "Vous pouvez selectionner au minimum 3 compétences !")
        .max(10, "Vous pouvez selectionner au maximum 10 compétences !") // Validate minimum length
        .required("Vous pouvez selectionner au maximum 10 compétences !"),
    })
    .required();

  const [selectedSkills, setSelectedSkills] = useState(
    userInfo.other?.skillsAutre.split(",").filter((item) => item !== "")
  );
  const [baseSkills, setBaseSkills] = useState(
    userInfo.other?.skillsAutre.split(",").filter((item) => item !== "")
  );
  const resetForm = async (data) => {
    setValue("skills", userInfo.other.skillsAutre);
  };
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
    if (selectedSkills.length >= 10) {
      setSelectedSkillsError(true);
    }
    if (selectedSkills.length < 10) {
      setSelectedSkillsError(false);
    }
  };

  useEffect(() => {
    setValue("skills", selectedSkills);
  }, [selectedSkills]);
  const getAttributesBasedOnProfession = (profession) => {
    switch (profession) {
      case "Fan Football":
        return fanDeFootballAttributes;
      case "Journaliste Sportif":
        return journalisteSportifAttributes;
      case "Arbitre Football":
        return arbitreDeFootballAttributes;
      case "Analyste de football":
        return analysteDeFootballAttributes;
      case "Nutrtitionniste":
        return nutritionnisteAttributes;
      case "Physiotherpeute":
        return physiotherapeuteAttributes;
      case "Médecin d'équipe":
        return medecinDEquipeAttributes;
      case "Prof de fitnesse":
        return preparateurPhysiqueAttributes;
      default:
        return [];
    }
  };

  const skillsList = getAttributesBasedOnProfession(userInfo.other.profession);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      profession: userInfo.other.profession,
    },
  });

  const onSubmit = async (data) => {
    const formDataToUpdate = new FormData();
    formDataToUpdate.append("skillsAutre", data.skills.join(","));
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;
    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const id = storedUserDatad ? storedUserDatad?.id : null;

    const response = await fetch(
      `${Config.LOCAL_URL}/api/other/${storedUserDatad.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
        body: formDataToUpdate,
      }
    ).then((r) => {
      if (r.status === 200) {
        toast.success("Vos modifications ont été enregistrées !", {
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
      <div>
        <ToastContainer />
      </div>
      <div className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start w-full bg-white rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start w-full bg-white rounded-[20px]"
        >
          <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 justify-between px-4 whitespace-nowrap items-center">
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
                  {getTranslation(
                    `The profession`, // -----> Englais
                    `La profession`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>
              <input
                {...register("profession")}
                disabled
                type="text"
                className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                  errors.club ? "is-invalid !border-red-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 justify-between px-4 whitespace-nowrap items-center">
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
                  {getTranslation(
                    `Skills`, // -----> Englais
                    `Compétences`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-2  mt-4 mr-3 text-lg text-blue-600">
                <div className="form-group icon-input  mb-3">
                  {skillsList.map((skill, index) => (
                    <div
                      key={skill}
                      className="form-check rounded-[30px] form-check-inline pl-0 me-2 mb-2"
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
                  {errors.skills && (
                    <span className="invalid-feedback block  px-2">
                      {errors.skills?.message}
                    </span>
                  )}
                  {selectedSkillsError && !errors.skills ? (
                    <span className="invalid-feedback block py-2 px-2">
                      Vous pouvez selectionner au maximum 10 compétences !
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
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

export default Other;
