import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { paysAllInfo } from "../../../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";

const Entraineur = ({ userInfo }) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
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
                <div key={country.iso}>
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

    const schema = yup
        .object({
            ClubActuelCoach: yup.string().required('Ce champ est obligatoire'),
            totalTeam: yup.string('Ce champ est obligatoire').required('Ce champ est obligatoire'),
            countryCoachedIn: yup.array()
                .required('Ce champs est obligatoire')
                .min(1, 'Vous pouvez selectionner au minimum 1 pays !'),
            skills: yup.array()
                .min(1, 'Vous pouvez selectionner au minimum 3 compétences !')
                .max(10, 'Vous pouvez selectionner au maximum 10 compétences !') // Validate minimum length
                .required('Vous pouvez selectionner au maximum 10 compétences !'),
            footballTactic: yup.string().required('Ce champ est obligatoire'),
        })
    const [selectedCountriesV, setSelectedCountriesV] = useState([]);
    const [countryError, setCountryError] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedSkills, setSelectedSkills] = useState(userInfo.coach.skills.split(',').filter((item) => item !== ''))
    const [baseSkills, setBaseSkills] = useState(userInfo.coach.skills.split(',').filter((item) => item !== ''))
    const [selectedSkillsError, setSelectedSkillsError] = useState(false)

    const toggleSkill = (skill) => {
        const skillExists = selectedSkills.includes(skill);
        if (!skillExists && selectedSkills.length < 10) {
            const updatedSkills = [...selectedSkills, skill];
            setSelectedSkills(updatedSkills);
        } else {
            const updatedSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
            setSelectedSkills(updatedSkills);
        }
        if(selectedSkills.length >= 10){
            setSelectedSkillsError(true)
        }
        if(selectedSkills.length < 10){
            setSelectedSkillsError(false)
        }
    };

    const skillsList = ["Connaissance des tactiques", "Compétences techniques", "Leadership", "Communication", "Gestion de groupe", "Analyse", "Planification", "Adaptabilité", "Ethique", "Connaissance des règles du jeu", "Gestion de stress", "Développement individuel", "Empathie"]


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
    const handleCountryPaysEntrainement = async (selectedOptions) => {
        setSelectedCountriesV(selectedOptions)
        const selectedCountryLabels = selectedOptions.map(
            (option) => option.label.props.children[1]
        ).join(",");
        setSelectedCountries(selectedCountryLabels)
    };

    const handleDestructureCountries = (stringValue) => {
        const countryLabelsArray = stringValue.split(",");
        return countryLabelsArray.map(countryLabel => {
            return optionsPays.find(option => {
                return option.label.props.children[1] === countryLabel;
            });


        })
    };
    const resetForm = async () => {
        const val = handleDestructureCountries(userInfo.coach.countryCoachedIn)
        setSelectedCountriesV(val)
        setValue('ClubActuelCoach', userInfo.coach.ClubActuelCoach);
        setValue('totalTeam', userInfo.coach.totalTeam);
        setValue('footballTactic', userInfo.coach.footballTactic);
        setValue('skills', setSelectedSkills(baseSkills));
        setValue('countryCoachedIn', selectedCountriesV);

    }
    const handleChange = (event) => {
        console.log(event.target.name)
        const input = event.target.value;
        // Ensure the input is a valid number, non-negative, and has at most 3 digits
        if (/^\d*$/.test(input) && input.length <= 3 && input >= 0) {
            setValue(event.target.name, input);
        } else {
            setValue(event.target.name, 0);
        }
    };

    useEffect(() => {
        console.log(selectedCountriesV);
        setValue('countryCoachedIn', selectedCountriesV);
    }, [selectedCountriesV]);
    useEffect(() => {
        console.log(selectedCountriesV);
        setValue('skills', selectedSkills);
    }, [selectedSkills]);
    useEffect(() => {
        const val = handleDestructureCountries(userInfo.coach.countryCoachedIn)
        setSelectedCountriesV(val)
        setSelectedCountries(userInfo.coach.countryCoachedIn)
        setValue('ClubActuelCoach', userInfo.coach.ClubActuelCoach);
        setValue('totalTeam', userInfo.coach.totalTeam);
        setValue('footballTactic', userInfo.coach.footballTactic);
        // setValue('countryCoachedIn', selectedCountriesV);
    }, [])
    const onSubmit = async (data, errors) => {
        console.log(data)
        if (selectedCountries) {
            if (true) {
                const formDataToUpdate = new FormData();
                formDataToUpdate.append("ClubActuelCoach", data.ClubActuelCoach);
                formDataToUpdate.append("totalTeam", data.totalTeam);
                formDataToUpdate.append("footballTactic", data.footballTactic);
                formDataToUpdate.append("countryCoachedIn", selectedCountries);
                formDataToUpdate.append("skills", data.skills.join(','));
                const response = await fetch(
                    `${Config.LOCAL_URL}/api/coachs/${storedUserData.id}`,
                    {
                        method: "PUT",
                        body: formDataToUpdate,
                    }

                ).then((r) => {
                    if (r.status === 200) {
                        toast.success('Vos modifications ont été enregistrées !', {
                            position: "top-right",
                            icon: "🚀",
                            autoClose: 5000,
                            title: 'success',
                            type: 'success',
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }
                });
            } else {
                setSelectedSkillsError(true)
            }
        } else {
            setCountryError(true)
        }

    }
    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <div className="flex flex-col flex-wrap grow  content-start w-full bg-white rounded-xl w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start  w-full bg-white rounded-xl">
                    <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-2 justify-between px-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48be6745725217387de9710be0a193a4d08011e72ce73951c9268683bb1b223?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="grow text-lg">Club Actuel</div>
                            </div>
                            <input {...register('ClubActuelCoach')} name='ClubActuelCoach' type='text' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.ClubActuelCoach ? 'is-invalid !border-red-500' : ''}`} />
                            {errors.ClubActuelCoach && <span className="invalid-feedback block py-2 px-2">{errors.ClubActuelCoach.message}</span>}
                        </div>
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-2 justify-left  whitespace-nowrap items-center">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_617_38088)">
                                        <path d="M10.0018 0.5C4.47043 0.5 -0.0136719 4.9841 -0.0136719 10.5155C-0.0136719 16.0468 4.47043 20.5309 10.0018 20.5309C15.5332 20.5309 20.0172 16.0468 20.0172 10.5155C20.0172 4.9841 15.5332 0.5 10.0018 0.5ZM16.2091 7.86684L16.8557 5.77602C17.7271 7.0391 18.2306 8.51937 18.3099 10.0518L16.5249 8.79434C16.2298 8.58625 16.1023 8.2118 16.2091 7.86684ZM12.1657 2.46266H12.1591L10.4924 3.67598C10.2002 3.88836 9.80453 3.88836 9.51238 3.67598L7.8457 2.46266C9.25902 2.07047 10.7524 2.07047 12.1657 2.46266ZM3.14238 5.77684L3.78906 7.86684C3.89586 8.2118 3.76832 8.58625 3.47324 8.79434L1.68824 10.0518C1.76758 8.51965 2.27102 7.03961 3.14238 5.77684ZM3.33824 15.4885L5.62742 15.496C5.98879 15.4968 6.30852 15.7303 6.4191 16.0743L7.1391 18.3185C5.6257 17.7615 4.3057 16.7787 3.33824 15.4885ZM12.8599 18.3185L13.5791 16.0743C13.6895 15.7306 14.0088 15.4971 14.3699 15.496L16.6599 15.4885C15.6929 16.7788 14.3732 17.7617 12.8599 18.3185ZM17.6399 13.8185L14.3649 13.8293C13.2805 13.8307 12.3214 14.5328 11.9924 15.566L10.9632 18.7743C10.323 18.8555 9.67508 18.8555 9.03488 18.7743L8.0057 15.5652C7.67625 14.532 6.7168 13.8303 5.63238 13.8293L2.3582 13.8193C2.10621 13.238 1.92195 12.6295 1.80902 12.006L4.4332 10.1568C5.32023 9.53426 5.70356 8.40996 5.38152 7.37516L4.4357 4.31516C4.91367 3.88082 5.44055 3.50355 6.0057 3.19098L8.52902 5.0243C9.40488 5.66328 10.5932 5.66328 11.469 5.0243L13.9923 3.19098C14.5574 3.50375 15.0842 3.88098 15.5623 4.31516L14.6165 7.37516C14.2945 8.40992 14.6778 9.53422 15.5648 10.1568L18.189 12.006C18.0762 12.6293 17.8919 13.2374 17.6399 13.8185Z" fill="black" />
                                        <path d="M12.8207 8.18828L11.2232 7.02828C10.4939 6.49578 9.50405 6.49578 8.77483 7.02828L7.17733 8.18828C6.44385 8.71824 6.1378 9.66203 6.42065 10.5216L7.03065 12.3991C7.30944 13.2568 8.1096 13.8368 9.01147 13.8349H10.9865C11.8892 13.835 12.6894 13.2536 12.9682 12.3949L13.5773 10.5174C13.8584 9.6591 13.5525 8.7175 12.8207 8.18828ZM11.9923 10.0024L11.3831 11.8799C11.3274 12.0519 11.1672 12.1684 10.9864 12.1682H9.01143C8.83096 12.168 8.6712 12.0516 8.61561 11.8799L8.00565 10.0016C7.94952 9.82961 8.01081 9.64106 8.15733 9.53492L9.75401 8.3766C9.9001 8.27043 10.098 8.27043 10.244 8.3766L11.8415 9.5366C11.9873 9.64285 12.0482 9.83086 11.9923 10.0024Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_617_38088">
                                            <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <div className="grow text-lg">Nombre de clubs entraînées</div>
                            </div>
                            <input {...register('totalTeam')} onChange={handleChange} name='totalTeam' type='number' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.totalTeam ? 'is-invalid !border-red-500' : ''}`} />
                            {errors.totalTeam && <span className="invalid-feedback block py-2 px-2">{errors.totalTeam.message}</span>}

                        </div>
                    </div>
                    <div className=" md:w-1/2 pr-3  max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-2 justify-between items-center px-4">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.97079 20.5H1.82501C0.681596 20.5 0 19.8156 0 18.6666V2.31945C0 1.18716 0.684382 0.5 1.8111 0.5H18.1833C19.3128 0.5 19.9944 1.18716 19.9944 2.31945V18.7056C19.9944 19.8184 19.3073 20.5083 18.1972 20.5083L9.97079 20.5ZM14.9145 5.07366C14.8421 5.17103 14.8032 5.22389 14.7587 5.27674L8.7773 12.3125C8.65489 12.4572 8.52413 12.5907 8.41285 12.7521C8.35231 12.8173 8.31985 12.9038 8.32246 12.9928C8.32506 13.0818 8.36252 13.1662 8.42677 13.2278C8.54588 13.3292 8.69891 13.3819 8.8552 13.3752C8.96648 13.3752 9.08332 13.2333 9.16956 13.1304C11.1893 10.7601 13.2044 8.38705 15.2149 6.0112C15.2575 5.95044 15.2965 5.88728 15.3318 5.82202L15.4041 5.8721C15.4041 6.34783 15.4041 6.82355 15.4041 7.2965C15.4126 7.45474 15.4825 7.60343 15.5988 7.71102C15.877 7.92245 16.222 7.67763 16.2248 7.27702C16.2248 6.42016 16.2248 5.56051 16.2248 4.70086C16.2248 4.38093 16.0885 4.24183 15.7685 4.24183H13.4261C13.0978 4.24183 12.9086 4.39484 12.9058 4.65357C12.9031 4.9123 13.0922 5.07366 13.4177 5.07366C13.9046 5.07366 14.3831 5.07366 14.9145 5.07366ZM11.4508 4.06378C11.4534 3.84457 11.4128 3.627 11.3312 3.4235C11.2497 3.21999 11.1289 3.03454 10.9757 2.87773C10.8225 2.72091 10.64 2.59581 10.4384 2.50957C10.2369 2.42333 10.0203 2.37763 9.80109 2.37509C9.35838 2.37509 8.93381 2.55095 8.62077 2.86399C8.30773 3.17703 8.13187 3.6016 8.13187 4.04431C8.1318 4.48176 8.30345 4.90176 8.6099 5.21393C8.91636 5.5261 9.3331 5.7055 9.77048 5.71352C10.2118 5.71649 10.6363 5.54461 10.9511 5.23545C11.266 4.9263 11.4457 4.50503 11.4508 4.06378ZM6.02587 13.6256C5.58558 13.6293 5.16458 13.8068 4.85454 14.1194C4.5445 14.432 4.37055 14.8545 4.37057 15.2948C4.37642 15.7337 4.55486 16.1525 4.86727 16.4608C5.17967 16.769 5.60091 16.9418 6.03978 16.9418C6.48249 16.9418 6.90706 16.7659 7.2201 16.4529C7.53313 16.1398 7.709 15.7153 7.709 15.2726C7.70313 14.8318 7.52316 14.4112 7.20835 14.1027C6.89354 13.7941 6.46945 13.6226 6.02865 13.6256H6.02587ZM4.01725 8.41209C3.68897 8.73202 3.39129 9.00744 3.10752 9.30234C3.0676 9.3398 3.03579 9.38505 3.01404 9.4353C2.99229 9.48554 2.98107 9.5397 2.98107 9.59445C2.98107 9.6492 2.99229 9.70336 3.01404 9.75361C3.03579 9.80385 3.0676 9.8491 3.10752 9.88657C3.18375 9.95557 3.2829 9.99379 3.38573 9.99379C3.48855 9.99379 3.5877 9.95557 3.66393 9.88657C3.75017 9.81423 3.82529 9.72799 3.90597 9.65009L4.57365 8.98519C4.88246 9.29677 5.15232 9.58889 5.44443 9.86153C5.49497 9.91879 5.56091 9.96029 5.6344 9.98108C5.70789 10.0019 5.7858 10.0011 5.85885 9.97878C5.93189 9.95649 5.99698 9.91364 6.04633 9.85536C6.09568 9.79707 6.12721 9.72581 6.13715 9.65009C6.13807 9.49878 6.08365 9.35235 5.98415 9.23835C5.72263 8.96015 5.42774 8.68195 5.1245 8.40374C5.41939 8.12554 5.6809 7.87516 5.93129 7.62756C6.18167 7.37996 6.22896 7.12123 6.03144 6.92927C5.83391 6.73731 5.603 6.77069 5.33315 7.04611C5.06329 7.32153 4.84907 7.56079 4.56809 7.85847C4.28989 7.55244 4.03394 7.28537 3.77799 7.02386C3.52205 6.76235 3.29114 6.74565 3.09918 6.9237C2.90722 7.10175 2.93226 7.35492 3.18264 7.6053C3.43302 7.85568 3.71957 8.13389 4.01725 8.41209ZM14.9924 16.0515C15.3151 16.3854 15.5849 16.6803 15.8743 16.9557C15.9248 17.013 15.9907 17.0545 16.0642 17.0753C16.1377 17.0961 16.2156 17.0953 16.2887 17.073C16.3617 17.0507 16.4268 17.0078 16.4762 16.9495C16.5255 16.8912 16.557 16.82 16.567 16.7443C16.5706 16.5925 16.5158 16.4451 16.414 16.3325C16.1552 16.0543 15.8576 15.7761 15.5627 15.4979C15.8631 15.2058 16.133 14.9415 16.3973 14.6883C16.6616 14.4352 16.6504 14.2126 16.464 14.029C16.2776 13.8454 16.0384 13.8704 15.8019 14.1069C15.5655 14.3434 15.29 14.6438 15.023 14.9248C14.9172 14.8247 14.8477 14.7635 14.7837 14.6967C14.5556 14.4713 14.333 14.2377 14.0965 14.0207C14.0607 13.9829 14.0175 13.9529 13.9697 13.9324C13.9219 13.9119 13.8704 13.9013 13.8183 13.9013C13.7663 13.9013 13.7148 13.9119 13.667 13.9324C13.6192 13.9529 13.576 13.9829 13.5401 14.0207C13.4631 14.0794 13.4111 14.1651 13.3946 14.2605C13.3781 14.356 13.3983 14.4541 13.4511 14.5353C13.5038 14.6152 13.5665 14.6881 13.6375 14.7523L14.4193 15.5174C14.1188 15.7956 13.8462 16.0738 13.5846 16.3242C13.3231 16.5746 13.3259 16.7971 13.5151 16.9835C13.7043 17.1699 13.9407 17.1449 14.1772 16.9084C14.4137 16.6719 14.703 16.3603 14.9924 16.0571V16.0515Z" fill="#1D1E21" />
                                </svg>

                                <div className="grow text-lg">Tactique préférée</div>
                            </div>
                            <select
                                name="footballTactic"
                                {...register('footballTactic')}
                                className={`form-control appearance-none justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 w-full ${errors.footballTactic ? 'is-invalid !border-red-500' : ''}`}
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
                    <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-2 justify-between px-4 items-center  whitespace-nowrap">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_617_38156)">
                                        <path d="M10 0.5C4.48583 0.5 0 4.98583 0 10.5C0 16.0142 4.48583 20.5 10 20.5C15.5142 20.5 20 16.0142 20 10.5C20 4.98583 15.5142 0.5 10 0.5ZM12.945 11.7592L11.0775 15.8058C10.9292 16.1275 10.6075 16.3333 10.2533 16.3333H10.0758C9.57417 16.3333 9.1675 15.9267 9.1675 15.425V13.4542C9.1675 13.1633 9.05167 12.8842 8.84583 12.6783L7.85417 11.6867C7.6275 11.46 7.5 11.1525 7.5 10.8325V10.03C7.5 9.7975 7.4075 9.57417 7.2425 9.40917L6.93167 9.09833C6.76167 8.92833 6.53167 8.83333 6.29167 8.83333H4.6675C4.3475 8.83333 4.04167 8.7025 3.82083 8.47L2.43917 7.0175C3.76167 4.15917 6.64917 2.16667 10 2.16667C10.1717 2.16667 10.3392 2.1825 10.5075 2.1925C10.0633 2.86583 9.66083 3.485 9.41667 3.86333C9.2625 4.10083 9.25917 4.40333 9.405 4.64667L10.1025 5.81C10.2875 6.1175 10.2383 6.51167 9.985 6.76583L9.9825 6.76833C9.74417 7.00667 9.38083 7.06583 9.07917 6.915L8.34583 6.54833C8.09 6.42 7.78083 6.47083 7.57833 6.6725L7.1375 7.11333C6.8775 7.37333 6.8775 7.79417 7.1375 8.05333L7.63083 8.54667C7.81417 8.73 8.06333 8.83333 8.3225 8.83333H9.515C9.8325 8.83333 10.1433 8.9225 10.4125 9.09083L12.5475 10.425C12.9967 10.7058 13.1675 11.2775 12.945 11.7592ZM16.27 10.7167C15.9933 10.5792 15.7908 10.3275 15.7158 10.0275L15.1933 7.93833C15.0792 7.48167 15.2817 7.00417 15.6892 6.76917L17.0083 6.00833C17.8433 7.30583 18.3333 8.84583 18.3333 10.5C18.3333 10.9067 18.2942 11.3025 18.2375 11.6933L16.27 10.7167Z" fill="#1D1E21" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_617_38156">
                                            <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>


                                <div className="grow text-lg">Pays d’entraînement</div>
                            </div>

                            <Select
                                name="countryCoachedIn"
                                options={optionsPays}
                                placeholder="Select one or more countries"
                                className={`border rounded-full mt-3 ${errors.countryCoachedIn ? '!border-red-500' : ''}`}
                                isMulti
                                value={selectedCountriesV}
                                onChange={handleCountryPaysEntrainement}
                                components={{ MultiValueContainer }}
                                // className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        borderRadius: "0.375rem",
                                        color: 'white',
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: "30px",
                                        width: "100%",
                                        borderColor: "transparent",
                                        minHeight: "53px",
                                    }),
                                    option: (provided, stats) => ({
                                        Color: "red",
                                        backgroundColor: "white",
                                        padding: "10px"

                                    }),
                                    value: provided => ({
                                        ...provided,
                                        color: 'black'
                                    }),
                                    multiValue: (provided, state) => ({
                                        backgroundColor: '#2E71EB',
                                        color: "white",
                                        display: 'flex',
                                        padding: '5px 5px',
                                        margin: '5px 5px',
                                        justifyContent: 'center',
                                        borderRadius: '30px',
                                        fontSize: '1rem',
                                    }),
                                    menu: (provided, state) => ({
                                        ...provided,
                                        width: "100%",
                                    }),
                                }}// Set the value from component state
                            />
                            {errors.countryCoachedIn && <span className="invalid-feedback block py-2 px-2">{errors.countryCoachedIn?.message}</span>}
                        </div>
                    </div>
                    <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-2 justify-between px-4 items-center  text-lg">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="flex-auto">Compétences</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2  mt-4 mr-3 text-lg text-blue-600">
                            <div className="form-group icon-input  mb-3">
                                {skillsList.map((skill, index) => (
                                    <div key={skill} className="form-check rounded-[30px] form-check-inline pl-0 me-2 mb-2">
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
                                            className={`form-check-label btn ${selectedSkills.includes(skill) ? "flex gap-4 text-white justify-between px-4 py-2 bg-blue-600 rounded-[30px]" : `${(!selectedSkills.includes(skill) && errors.skills) || selectedSkillsError ? 'border-1 border-red-500 flex gap-4 justify-between px-4 py-2 text-blue-600 bg-gray-100 rounded-[30px]' : 'flex gap-4 justify-between px-4 py-2 text-blue-600 bg-gray-100 rounded-[30px]'} `
                                                }`}
                                        >
                                            <div className="text-[18px] font-light"> {skill} {selectedSkills.includes(skill) ? <span className="pl-2">-</span> : <span className="pl-2">+</span>}  </div>
                                        </label>
                                    </div>
                                ))}
                                {errors.skills && <span className="invalid-feedback block  px-2">{errors.skills?.message}</span>}
                                {selectedSkillsError && !errors.skills ? <span className="invalid-feedback block py-2 px-2">Vous pouvez selectionner au maximum 10 compétences !</span> : null}
                            </div>
                        </div>

                    </div>



                    <div className="flex  justify-between py-2 mt-6 mr-4 w-full text-base font-medium flex-nowrap">
                        <div className="flex gap-2 justify-between px-4 py-2 text-blue-600 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e237a106a6aae9aaedb87131a5b6a9cefc6631b6b0b800569f8639d3cbb6941?"
                                className="w-5 aspect-square"
                            />
                            <a onClick={resetForm} className="grow">Annuler</a>
                        </div>
                        <div className="flex gap-2  px-4 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
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