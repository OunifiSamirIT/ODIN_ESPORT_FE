import React, { useState } from "react";
import Select, { components } from "react-select";
import { paysAllInfo } from "../../../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"


const Entraineur = ({ userInfo }) => {
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
                {children}
                {selectedCountries.length > 1 && (
                    <span
                        onClick={() =>
                            setSelectedCountries(
                                selectedCountries.slice(0, selectedCountries.length - 1)
                            )
                        }
                        style={{ cursor: "pointer", marginLeft: "5px" }}
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

        const [selectedSkills , setSelectedSkills] = useState('Négociation,Connaissance approfondie du sport,Réseautage'.split(','))
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
            <div className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start py-8 pr-4 pl-8 w-full bg-white rounded-xl max-md:pl-5 max-md:mt-6 max-md:max-w-full">
                <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start py-8 pr-4 pl-8 w-full bg-white rounded-xl max-md:pl-5 max-md:mt-6 max-md:max-w-full">
                    <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48be6745725217387de9710be0a193a4d08011e72ce73951c9268683bb1b223?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="grow text-lg">Club Actuelle</div>
                            </div>
                            <input {...register('club')} name='club' type='text'  className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.club ? 'is-invalid !border-red-500' : '' }`} />
                            {errors.club && <span className="invalid-feedback block py-2 px-2">{errors.club.message}</span>}
                        </div>
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/67cc44c5147e294e812e8e6e60b5a03612a46374164925d1ed48b3daf7f65514?"
                                    className="my-auto aspect-[0.85] w-[17px]"
                                />
                                <div className="grow text-lg">Nombre de clubs entraînées</div>
                            </div>
                            <input {...register('totalTeam')} name='totalTeam' type='number' value={formData.height} className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.club ? 'is-invalid !border-red-500' : '' }`} />
                            {errors.totalTeam && <span className="invalid-feedback block py-2 px-2">{errors.totalTeam.message}</span>}

                        </div>
                    </div>
                    <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_617_38128)">
                                        <path d="M9.97079 20.5H1.82501C0.681596 20.5 0 19.8156 0 18.6666V2.31945C0 1.18716 0.684382 0.5 1.8111 0.5H18.1833C19.3128 0.5 19.9944 1.18716 19.9944 2.31945V18.7056C19.9944 19.8184 19.3073 20.5083 18.1972 20.5083L9.97079 20.5ZM14.9145 5.07366C14.8421 5.17103 14.8032 5.22389 14.7587 5.27674L8.7773 12.3125C8.65489 12.4572 8.52413 12.5907 8.41285 12.7521C8.35231 12.8173 8.31985 12.9038 8.32246 12.9928C8.32506 13.0818 8.36252 13.1662 8.42677 13.2278C8.54588 13.3292 8.69891 13.3819 8.8552 13.3752C8.96648 13.3752 9.08332 13.2333 9.16956 13.1304C11.1893 10.7601 13.2044 8.38705 15.2149 6.0112C15.2575 5.95044 15.2965 5.88728 15.3318 5.82202L15.4041 5.8721C15.4041 6.34783 15.4041 6.82355 15.4041 7.2965C15.4126 7.45474 15.4825 7.60343 15.5988 7.71102C15.877 7.92245 16.222 7.67763 16.2248 7.27702C16.2248 6.42016 16.2248 5.56051 16.2248 4.70086C16.2248 4.38093 16.0885 4.24183 15.7685 4.24183H13.4261C13.0978 4.24183 12.9086 4.39484 12.9058 4.65357C12.9031 4.9123 13.0922 5.07366 13.4177 5.07366C13.9046 5.07366 14.3831 5.07366 14.9145 5.07366ZM11.4508 4.06378C11.4534 3.84457 11.4128 3.627 11.3312 3.4235C11.2497 3.21999 11.1289 3.03454 10.9757 2.87773C10.8225 2.72091 10.64 2.59581 10.4384 2.50957C10.2369 2.42333 10.0203 2.37763 9.80109 2.37509C9.35838 2.37509 8.93381 2.55095 8.62077 2.86399C8.30773 3.17703 8.13187 3.6016 8.13187 4.04431C8.1318 4.48176 8.30345 4.90176 8.6099 5.21393C8.91636 5.5261 9.3331 5.7055 9.77048 5.71352C10.2118 5.71649 10.6363 5.54461 10.9511 5.23545C11.266 4.9263 11.4457 4.50503 11.4508 4.06378ZM6.02587 13.6256C5.58558 13.6293 5.16458 13.8068 4.85454 14.1194C4.5445 14.432 4.37055 14.8545 4.37057 15.2948C4.37642 15.7337 4.55486 16.1525 4.86727 16.4608C5.17967 16.769 5.60091 16.9418 6.03978 16.9418C6.48249 16.9418 6.90706 16.7659 7.2201 16.4529C7.53313 16.1398 7.709 15.7153 7.709 15.2726C7.70313 14.8318 7.52316 14.4112 7.20835 14.1027C6.89354 13.7941 6.46945 13.6226 6.02865 13.6256H6.02587ZM4.01725 8.41209C3.68897 8.73202 3.39129 9.00744 3.10752 9.30234C3.0676 9.3398 3.03579 9.38505 3.01404 9.4353C2.99229 9.48554 2.98107 9.5397 2.98107 9.59445C2.98107 9.6492 2.99229 9.70336 3.01404 9.75361C3.03579 9.80385 3.0676 9.8491 3.10752 9.88657C3.18375 9.95557 3.2829 9.99379 3.38573 9.99379C3.48855 9.99379 3.5877 9.95557 3.66393 9.88657C3.75017 9.81423 3.82529 9.72799 3.90597 9.65009L4.57365 8.98519C4.88246 9.29677 5.15232 9.58889 5.44443 9.86153C5.49497 9.91879 5.56091 9.96029 5.6344 9.98108C5.70789 10.0019 5.7858 10.0011 5.85885 9.97878C5.93189 9.95649 5.99698 9.91364 6.04633 9.85536C6.09568 9.79707 6.12721 9.72581 6.13715 9.65009C6.13807 9.49878 6.08365 9.35235 5.98415 9.23835C5.72263 8.96015 5.42774 8.68195 5.1245 8.40374C5.41939 8.12554 5.6809 7.87516 5.93129 7.62756C6.18167 7.37996 6.22896 7.12123 6.03144 6.92927C5.83391 6.73731 5.603 6.77069 5.33315 7.04611C5.06329 7.32153 4.84907 7.56079 4.56809 7.85847C4.28989 7.55244 4.03394 7.28537 3.77799 7.02386C3.52205 6.76235 3.29114 6.74565 3.09918 6.9237C2.90722 7.10175 2.93226 7.35492 3.18264 7.6053C3.43302 7.85568 3.71957 8.13389 4.01725 8.41209ZM14.9924 16.0515C15.3151 16.3854 15.5849 16.6803 15.8743 16.9557C15.9248 17.013 15.9907 17.0545 16.0642 17.0753C16.1377 17.0961 16.2156 17.0953 16.2887 17.073C16.3617 17.0507 16.4268 17.0078 16.4762 16.9495C16.5255 16.8912 16.557 16.82 16.567 16.7443C16.5706 16.5925 16.5158 16.4451 16.414 16.3325C16.1552 16.0543 15.8576 15.7761 15.5627 15.4979C15.8631 15.2058 16.133 14.9415 16.3973 14.6883C16.6616 14.4352 16.6504 14.2126 16.464 14.029C16.2776 13.8454 16.0384 13.8704 15.8019 14.1069C15.5655 14.3434 15.29 14.6438 15.023 14.9248C14.9172 14.8247 14.8477 14.7635 14.7837 14.6967C14.5556 14.4713 14.333 14.2377 14.0965 14.0207C14.0607 13.9829 14.0175 13.9529 13.9697 13.9324C13.9219 13.9119 13.8704 13.9013 13.8183 13.9013C13.7663 13.9013 13.7148 13.9119 13.667 13.9324C13.6192 13.9529 13.576 13.9829 13.5401 14.0207C13.4631 14.0794 13.4111 14.1651 13.3946 14.2605C13.3781 14.356 13.3983 14.4541 13.4511 14.5353C13.5038 14.6152 13.5665 14.6881 13.6375 14.7523L14.4193 15.5174C14.1188 15.7956 13.8462 16.0738 13.5846 16.3242C13.3231 16.5746 13.3259 16.7971 13.5151 16.9835C13.7043 17.1699 13.9407 17.1449 14.1772 16.9084C14.4137 16.6719 14.703 16.3603 14.9924 16.0571V16.0515Z" fill="#1D1E21" />
                                        <path d="M10.6172 4.06542C10.6106 4.28241 10.5198 4.48831 10.364 4.63946C10.2082 4.7906 9.99962 4.87509 9.78254 4.87499C9.67007 4.87508 9.55875 4.85244 9.45525 4.80843C9.35175 4.76441 9.25822 4.69993 9.18026 4.61886C9.10231 4.53779 9.04154 4.4418 9.00162 4.33665C8.96169 4.23151 8.94343 4.11938 8.94793 4.007C8.95806 3.78807 9.05389 3.58191 9.21473 3.43303C9.37558 3.28416 9.58852 3.20453 9.80758 3.21134C10.028 3.21789 10.2368 3.31139 10.3885 3.47142C10.5402 3.63144 10.6224 3.84499 10.6172 4.06542Z" fill="#1D1E21" />
                                        <path d="M6.8715 15.285C6.87155 15.5034 6.78591 15.7132 6.63298 15.8693C6.48005 16.0253 6.27203 16.1152 6.05359 16.1196C5.83604 16.1196 5.62705 16.0348 5.47116 15.883C5.31526 15.7313 5.22478 15.5247 5.21898 15.3072C5.21638 15.196 5.23605 15.0854 5.27683 14.9818C5.31761 14.8783 5.37867 14.784 5.45643 14.7044C5.53419 14.6248 5.62708 14.5616 5.72963 14.5185C5.83218 14.4753 5.94233 14.4531 6.05359 14.4531C6.27155 14.4575 6.47916 14.547 6.63201 14.7024C6.78486 14.8579 6.87082 15.0669 6.8715 15.285Z" fill="#1D1E21" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_617_38128">
                                            <rect width="19.9944" height="20" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <div className="grow text-lg">Pays d’entraînement</div>
                            </div>

                            <Controller
                                control={control}
                                name="countryCoachedIn"
                                
                                render={({ field }) => (
                                    <Select
                                        options={optionsPays}
                                        placeholder="Select one or more countries"
                                        className={`border border-red-500 rounded-full mt-3 ${errors.footballTactic ? '!border-red-500' : ''}`}
                                        isMulti // Enable multiple selection
                                        components={{ MultiValueContainer }}
                                        // className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderRadius: "0.375rem",
                                                display: "flex",
                                                justifyContent: "center",
                                                borderRadius: "30px",
                                                width: "100%",
                                                minHeight: "53px",
                                                color: "black", // Set text color to black

                                            }),
                                            options : (provided) => ({
                                                color: "black",
                                            }),
                                            multiValue: (provided, state) => ({
                                                backgroundColor: '#2E71EB',
                                                display: 'flex',
                                                padding: '5px 5px',
                                                margin: '5px 5px',
                                                justifyContent: 'center',
                                                borderRadius: '30px',
                                                fontSize: '1rem',
                                                color: '#FFFFFF',
                                            }),
                                            menu: (provided, state) => ({
                                                ...provided,
                                                width: "100%",
                                                color: "black",
                                            }),
                                        }}
                                        onChange={handleCountryPaysEntrainement}
                                        value={selectedCountries} // Set the value from component state
                                    />
                                )}
                            />
                             {errors.countryCoachedIn && <span className="invalid-feedback block py-2 px-2">{errors.countryCoachedIn.message}</span>}
                        </div>
                    </div>
                    <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b051312f4e1495e14e7b1235b0b1ebab3cae89f347c699d855c048d1aa427fb4?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="grow text-lg">Tactiques préférés</div>
                            </div>
                            <select
                                name="footballTactic"
                                {...register('footballTactic')}
                                className={`form-control appearance-none justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 w-full ${errors.footballTactic ? 'is-invalid !border-red-500' : '' }`}
                            >
                                <option value="" disabled>
                                    Tactique préférée
                                </option>
                                <option value="4-4-2">4-4-2</option>
                                <option value="4-3-3">4-3-3</option>
                                <option value="4-2-3-1">4-2-3-1</option>
                                <option value="5-3-2">5-3-2</option>
                                <option value="5-4-1">5-4-1</option>
                                <option value="catenaccio">3-4-3</option>
                            </select>
                            {errors.footballTactic && <span className="invalid-feedback block py-2 px-2">{errors.footballTactic.message}</span>}
                        </div>
                    </div>
                    <div className="flex gap-4 self-start px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                    <div className="flex gap-4 self-start px-4 mt-4 text-lg text-black whitespace-nowrap">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                            className="my-auto w-5 aspect-square"
                        />
                        <div className="flex-auto">Compétences</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2  mt-4 mr-3 text-lg text-blue-600 max-md:flex-wrap max-md:pr-5 max-md:mr-2.5 max-md:max-w-full">
                    <div className="form-group icon-input  mb-3">
                        {skillsList.map((skill,index) => (
                            <div key={skill} className="form-check rounded-[30px] form-check-inline me-2 mb-2">
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

export default Entraineur