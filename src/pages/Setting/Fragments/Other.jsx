import React, { useState } from "react";
import Select, { components } from "react-select";
import { paysAllInfo } from "../../../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"


const Other = ({ userInfo }) => {
    const [selectedCountries, setSelectedCountries] = useState([])
    const [formData, setFormData] = useState({
        countryCoachedIn: "",
        totalTeam: "",
        footballTactic: "",
        ClubActuelCoach: "",
        interets: "",
        skills: "",
        Licence: "",
    });
    const options = paysAllInfo.map((country, index) => {
        const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

        return {
            value: countryCode,
            label: (
                <div key={country.iso}>
                    {countryCode && (
                        <span
                            className={`flag-icon flag-icon-${countryCode}`}
                            style={{ marginRight: "8px", width: "40px" }}
                        ></span>
                    )}
                    {country.nationalite}
                </div>
            ),
        };
    });

    const handleCountryPaysEntrainement = (selectedOptions) => {
        setSelectedCountries(selectedOptions);

        // Update the formData state with the selected countries
        const selectedCountryLabels = selectedOptions.map(
            (option) => option.label.props.children[1]
        );
        setFormData({
            ...formData,
            countryCoachedIn: selectedCountryLabels.join(", "), // Join selected countries as a string
        });
    };

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
                        style={{ cursor: "pointer", marginLeft: "5px" , color: "white" }}
                    >
                    </span>
                )}
            </components.MultiValueContainer>
        );
    };
    const optionsPays = paysAllInfo.map((country) => {
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
                    <span className="text-white">{country.name}</span>
                </div>
            ),
        };
    });
    const schema = yup
        .object({
            club: yup.string().required('Ce champ est obligatoire').min(2, ({ min }) => `Minimum de (${min} characters nécessaire)`).max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
            totalTeam: yup.string().required('Ce champ est obligatoire').max(70, ({ max }) => `Maximum de (${max} characters autorisé)`),
            countryCoachedIn: yup.string().required('Ce champ est obligatoire').min(2, ({ min }) => `Minimum de (${min} characters nécessaire)`).max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
            footballTactic: yup.string().required('Ce champ est obligatoire'),
        })
        .required()

    const [selectedSkills, setSelectedSkills] = useState('Négociation,Connaissance approfondie du sport,Réseautage'.split(','))
    // const [selectedSkills, setSelectedSkills] = useState(['Négociation']);

    const toggleSkill = (skill) => {
        const skillExists = selectedSkills.includes(skill);
        if (!skillExists) {
            const updatedSkills = [...selectedSkills, skill];
            setSelectedSkills(updatedSkills);
        } else {
            const updatedSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
            setSelectedSkills(updatedSkills);
        }
        console.log(selectedSkills)
    };

    const skillsList = [
        "Connaissance des tactiques",
        "Compétences techniques",
        "Leadership",
        "Communication",
        "Gestion de groupe",
        "Analyse",
        "Planification",
        "Adaptabilité",
        "Éthique",
        "Connaissance des règles du jeu",
        "Gestion du stress",
        "Développement individuel",
        "Empathie"
    ];
    const regionOptions = Array.from(new Set(paysAllInfo.map(country => country.region))).map(region => ({
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
        defaultValues: {}
    })
    console.log(errors)
    const onSubmit = async (data) => {
        console.log(data)
    }
    return (

        <>
            <div className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start w-full bg-white rounded-xl max-md:pl-5 max-md:mt-6 max-md:max-w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start w-full bg-white rounded-xl max-md:pl-5 max-md:mt-6 max-md:max-w-full">
                    <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 whitespace-nowrap items-center">
                                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.483 9.2711L19.1399 15.6698L13.7165 19.7378C12.3621 20.7541 10.4991 20.7541 9.14466 19.7378L3.30316 15.3564C2.80883 14.9859 2.20687 14.7849 1.58872 14.7849H0.953422C0.426706 14.7849 0 14.3582 0 13.8325V3.29531C0 2.81145 0.360986 2.40856 0.841983 2.35427C2.13448 2.21044 3.2984 1.69135 4.48899 0.997952C6.20153 0.116918 8.4484 0.431232 9.83806 1.73326L10.4257 2.29807L6.60918 6.02318C5.58719 7.04423 5.42431 8.65866 6.2301 9.774C6.72539 10.4626 7.62166 10.9732 8.55794 10.9732C9.31324 10.9732 10.0381 10.676 10.5619 10.1512L11.483 9.27015V9.2711ZM19.0056 0.997952C17.3959 0.193115 15.3881 0.402658 13.9499 1.5199L7.94645 7.3795C7.59309 7.73382 7.51308 8.30053 7.77405 8.66247C7.9455 8.90059 8.19409 9.04346 8.47793 9.06727C8.75891 9.09108 9.03131 8.98917 9.22848 8.79106L12.6745 5.52504C13.5784 4.66686 14.888 6.03651 13.9918 6.90136L12.8669 7.94622L21.0515 14.7859H21.9058C22.4316 14.7859 22.8583 14.3592 22.8583 13.8334V3.26292C22.8583 2.79621 22.5173 2.41046 22.0573 2.3276C20.4438 2.03614 19.0046 0.998904 19.0046 0.998904L19.0056 0.997952Z" fill="#1D1E21" />
                                </svg>
                                <div className="grow text-lg">Profession</div>
                            </div>
                            <input {...register('club')} disabled value="Medicin d'équipe" type='text'  className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.club ? 'is-invalid !border-red-500' : '' }`} />

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
                                <div className="flex-auto">Compétences</div>
                            </div>
                        </div>
                        <div className="form-group icon-input  mb-3">
                            {skillsList.map((skill, index) => (
                                <div key={skill} className="form-check rounded-[30px] form-check-inline mb-2">
                                    <input
                                        type="checkbox"
                                        id={'skill' + index}
                                        name="coachSkillsInProfile"
                                        checked={selectedSkills.includes(skill)}
                                        className="form-check-input d-none rounded-[30px] "
                                        onChange={() => toggleSkill(skill)}
                                    />
                                    <label
                                        htmlFor={'skill' + index}
                                        className={`form-check-label btn ${selectedSkills.includes(skill) ? "flex gap-4 text-white justify-between px-4 py-2 bg-blue-600 rounded-[30px]" : "flex gap-4 justify-between px-4 py-2 text-blue-600 bg-gray-100 rounded-[30px]"
                                            }`}
                                    >
                                        <div className="text-[18px] font-light"> {selectedSkills.includes(skill) ? "-" : "+"} {skill} </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-5 justify-between py-2 mt-6 mr-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
                        <div className="flex gap-2 justify-between px-8 py-2 text-blue-600 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e237a106a6aae9aaedb87131a5b6a9cefc6631b6b0b800569f8639d3cbb6941?"
                                className="w-5 aspect-square"
                            />
                            <div className="grow">Annuler</div>
                        </div>
                        <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                                className="w-5 aspect-square"
                            />
                            <button type='submit' className="grow">Confirmer</button>
                        </div>
                    </div>
                </form>

            </div>

        </>

    )

}

export default Other