import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { paysAllInfo } from "../../../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";

const Agent = ({ userInfo }) => {
    const [selectedCountries, setSelectedCountries] = useState([])
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
                    <span className="">{country.name}</span>
                </div>
            ),
        };
    });
    const schema = yup
        .object({
            club: yup.string().required('Ce champ est obligatoire'),
            totalPlayer: yup.number('Ce champ est obligatoire').typeError('Ce champ est obligatoire').required('Ce champ est obligatoire'),
            totalCareerTransfers: yup.number('Ce champ est obligatoire').typeError('Ce champ est obligatoire').required('Ce champ est obligatoire'),
            skills: yup.array()
                .min(1, 'Vous pouvez selectionner au minimum 3 compétences !')
                .max(10, 'Vous pouvez selectionner au maximum 10 compétences !') // Validate minimum length
                .required('Vous pouvez selectionner au maximum 10 compétences !'),
        })
        .required()
   
    const [selectedSkills, setSelectedSkills] = useState(userInfo.agent?.skillsagent.split(',').filter((item) => item !== ''))
    // const [selectedSkills, setSelectedSkills] = useState(['Négociation']);
    const [baseSkills, setBaseSkills] = useState(userInfo.agent.skillsagent?.split(',').filter((item) => item !== ''))
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

    const skillsListJoueur = [
        "Négociation",
        "Connaissance approfondie du sport",
        "Empathie",
        "Compétences juridiques",
        "Gestion des carrières",
        "Communication",
        "Conseil financier",
        "Analyse du marché",
        "Gestion du stress",
        "Éthique professionnelle",
        "Gestion de conflits",
        "Adaptabilité",
        "Compétences marketing"
    ];
    const skillsListClub = [
        "Leadership",
        "Gestion financière",
        "Négociation",
        "Gestion des ressources humaines",
        "Communication",
        "Connaissance du marché du football",
        "Stratégie marketing",
        "Planification stratégique",
        "Gestion des installations",
        "Juridique et conformité",
        "Analyse des performances",
        "Empathie",
        "Gestion de crise"
    ];
    useEffect(() => {
        const defaultValue = (countryName) => { return optionsPays.find(option => option.label.props?.children[1].props.children === countryName) };
        setValue('totalTeam', userInfo.agent.champsoptionelle);
        setValue('totalCareerTransfers', userInfo.agent.totalCareerTransfers);
        setValue('totalPlayer', userInfo.agent.totalPlayer);
        setValue('club', userInfo.agent.clubCovered);
        setValue('paysclub', defaultValue(userInfo.agent.paysclub));
        // setValue('skills', selectedSkills);
    }, [])

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
    const resetForm = async () => {
        const defaultValue = (countryName) => { return optionsPays.find(option => option.label.props?.children[1].props.children === countryName) };
        setValue('club', userInfo.agent.clubCovered);
        setValue('paysclub', defaultValue(userInfo.agent.paysclub));
        setValue('totalPlayer', userInfo.agent.totalPlayer);
        setValue('totalCareerTransfers', userInfo.agent.totalCareerTransfers);
        setValue('skills', setSelectedSkills(baseSkills));

    }

    useEffect(() => {
        setValue('skills', selectedSkills);
    }, [selectedSkills]);

    const handleChange = (event) => {
        console.log(event.target.name)
        const input = event.target.value;
        // Ensure the input is a valid number, non-negative, and has at most 3 digits
        if (/^\d*$/.test(input) && input.length <= 3 && input >= 0) {
          setValue(event.target.name , input);
        }else{
            setValue(event.target.name , 0);
        }
      };
    
    const onSubmit = async (data) => {

        if (selectedSkills.length > 0) {
            const formDataToUpdate = new FormData();
            formDataToUpdate.append("club", data.club);
            formDataToUpdate.append("totalPlayer", data.totalPlayer);
            formDataToUpdate.append("paysclub", data.paysclub?.label?.props?.children[1].props.children);
            formDataToUpdate.append("totalCareerTransfers", data.totalCareerTransfers);
            formDataToUpdate.append("skills", selectedSkills);
            formDataToUpdate.append("totalTeam", data.totalTeam);
            console.log('formdata', formDataToUpdate)
            const response = await fetch(
                `${Config.LOCAL_URL}/api/agents/${storedUserData.id}`,
                {
                    method: "PUT",
                    body: formDataToUpdate,
                }
            ).then((r) => {
                console.log(r)
                if (r.status === 200) {
                    toast.success('Vos modifications ont été enregistrées !', {
                        position: "top-right",
                        autoClose: 5000,
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
    }
    return (
        <>
            {userInfo.agent.typeresponsable === 'player' &&
                <div className="flex flex-col flex-wrap grow  content-start w-full bg-white rounded-xl py-4">
                    <div>
                        <ToastContainer />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-wrap grow gap-y-6 content-start w-full bg-white rounded-xl w-full">
                        <div className="max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                            <div className="lg:flex-1 w-full">
                                <div className="flex gap-4 px-4 whitespace-nowrap">
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_617_40391)">
                                            <path d="M10.9875 13.8333H9.0125C8.5725 13.834 8.14363 13.695 7.78766 13.4364C7.43169 13.1778 7.16699 12.8128 7.03167 12.3942L6.42167 10.5167C6.28382 10.0978 6.28284 9.64589 6.41887 9.22641C6.55491 8.80692 6.82089 8.44161 7.17834 8.18333L8.775 7.02667C9.13041 6.76715 9.5591 6.62729 9.99917 6.62729C10.4392 6.62729 10.8679 6.76715 11.2233 7.02667L12.8208 8.18667C13.1784 8.44485 13.4444 8.81016 13.5805 9.22968C13.7165 9.64919 13.7155 10.1011 13.5775 10.52L12.9683 12.3975C12.8318 12.8151 12.5666 13.1789 12.2109 13.4368C11.8551 13.6947 11.4269 13.8335 10.9875 13.8333ZM20 10.5C20 12.4778 19.4135 14.4112 18.3147 16.0557C17.2159 17.7002 15.6541 18.9819 13.8268 19.7388C11.9996 20.4957 9.98891 20.6937 8.0491 20.3079C6.10929 19.922 4.32746 18.9696 2.92894 17.5711C1.53041 16.1725 0.578004 14.3907 0.192152 12.4509C-0.193701 10.5111 0.00433286 8.50043 0.761209 6.67317C1.51809 4.8459 2.79981 3.28412 4.4443 2.1853C6.08879 1.08649 8.02219 0.5 10 0.5C12.6513 0.502868 15.1932 1.55736 17.0679 3.4321C18.9426 5.30684 19.9971 7.84872 20 10.5ZM10 18C10.4315 17.9975 10.862 17.9579 11.2867 17.8817L11.9933 15.5642C12.1537 15.0606 12.4699 14.6211 12.8964 14.3089C13.3228 13.9968 13.8374 13.8282 14.3658 13.8275L16.7133 13.8233C17.0913 13.065 17.3367 12.2477 17.4392 11.4067L15.5658 10.1567C15.1335 9.85323 14.8087 9.42034 14.6383 8.92041C14.4678 8.42048 14.4606 7.87933 14.6175 7.375L15.3283 5.23083C14.7324 4.63169 14.04 4.13702 13.28 3.7675L11.47 5.0225C11.0431 5.33392 10.5284 5.50173 10 5.50173C9.47161 5.50173 8.95687 5.33392 8.53 5.0225L6.76834 3.7425C6.01995 4.10002 5.33574 4.57868 4.74334 5.15917L5.3825 7.37333C5.53944 7.87767 5.53217 8.41881 5.36173 8.91874C5.19129 9.41867 4.8665 9.85156 4.43417 10.155L2.5725 11.4842C2.67956 12.298 2.92089 13.0885 3.28667 13.8233L5.63334 13.8275C6.16184 13.828 6.67653 13.9963 7.10311 14.3083C7.5297 14.6203 7.84611 15.0598 8.00667 15.5633L8.7275 17.8833C9.14754 17.9586 9.57328 17.9977 10 18Z" fill="#1D1E21" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_617_40391">
                                                <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="grow text-md md:text-lg">Nombre de joueurs gérés</div>
                                </div>
                                <input {...register('totalPlayer')} onChange={handleChange} name='totalPlayer' type='number' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.totalPlayer ? 'is-invalid !border-red-500' : ''}`} />
                                {errors.totalPlayer && <span className="invalid-feedback block py-2 px-2">{errors.totalPlayer.message}</span>}

                            </div>
                            <div className="lg:flex-1 w-full">
                                <div className="flex gap-4 justify-between px-4">
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_617_40429)">
                                            <path d="M0 4.66667L0 16.3333C0 18.6308 1.86917 20.5 4.16667 20.5H15.8333C18.1308 20.5 20 18.6308 20 16.3333V4.66667C20 2.36917 18.1308 0.5 15.8333 0.5H4.16667C1.86917 0.5 0 2.36917 0 4.66667ZM8.94417 11.525L7.36583 13H14.1667C14.6267 13 15 13.3725 15 13.8333C15 14.2942 14.6267 14.6667 14.1667 14.6667H7.3275L8.9225 16.2617C9.24833 16.5875 9.24833 17.1142 8.9225 17.44C8.59667 17.7658 8.07 17.7658 7.74417 17.44L5.61 15.3058C4.7975 14.4933 4.7975 13.1717 5.61 12.36L7.80667 10.3075C8.1425 9.99333 8.67 10.0117 8.985 10.3475C9.135 10.5075 9.20917 10.7125 9.20917 10.9167C9.20917 11.14 9.12083 11.3617 8.945 11.525H8.94417ZM12.2558 3.55917L14.39 5.69333C14.7958 6.09917 14.9992 6.6325 14.9992 7.16667C14.9992 7.70083 14.7958 8.23333 14.39 8.64L12.2558 10.7742C11.93 11.1 11.4033 11.1 11.0775 10.7742C10.7517 10.4483 10.7517 9.92167 11.0775 9.59583L12.6725 8.00083H5.83333C5.37333 8.00083 5 7.62833 5 7.1675C5 6.70667 5.37333 6.33417 5.83333 6.33417H12.6725L11.0775 4.73917C10.7517 4.41333 10.7517 3.88667 11.0775 3.56083C11.4033 3.235 11.93 3.235 12.2558 3.56083V3.55917Z" fill="#1D1E21" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_617_40429">
                                                <rect width="20" height="20" fill="white" transform="matrix(0 -1 1 0 0 20.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="grow text-md md:text-lg">Nombre de transferts effectués</div>
                                </div>
                                <input {...register('totalCareerTransfers')} onChange={handleChange} name='totalCareerTransfers' type='number' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.totalCareerTransfers ? 'is-invalid !border-red-500' : ''}`} />

                                {errors.totalCareerTransfers && <span className="invalid-feedback block py-2 px-2">{errors.totalCareerTransfers.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2  text-blue-600 max-md:flex-wrap">
                            <div className="flex gap-4 self-start  text-lg whitespace-nowrap text-zinc-900">
                                <div className="flex gap-4 self-start px-4 text-lg text-black whitespace-nowrap">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                                        className="my-auto w-5 aspect-square"
                                    />
                                    <div className="grow text-md md:text-lg">Compétences</div>
                                </div>
                            </div>
                            <div className="form-group icon-input  mb-3">
                                {skillsListJoueur.map((skill, index) => (
                                    <div key={skill} className="form-check pl-0 rounded-[30px] form-check-inline me-2 mb-2">
                                        <input
                                            type="checkbox"
                                            id={'skill' + index}
                                            name="coachSkillsInProfile"
                                            checked={selectedSkills.includes(skill)}
                                            className="form-check-input d-none rounded-[30px] text-md md:text-lg "
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
                            </div> 
                            {errors.skills && <span className="invalid-feedback block py-2 px-2">{errors.skills?.message}</span>}
                            {selectedSkillsError && !errors.skills ? <span className="invalid-feedback block py-2 px-2">Vous pouvez selectionner au maximum 10 compétences !</span> : null}
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

                </div>}
            {userInfo.agent.typeresponsable === 'club' &&
                <div className="flex flex-col flex-wrap grow content-start w-full bg-white rounded-xl">
                    <div>
                        <ToastContainer />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-wrap grow gap-y-6  content-start w-full bg-white rounded-xl">
                        <div className="mt-6 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                            <div className="lg:flex-1 w-full">
                                <div className="flex gap-4  md:px-4 whitespace-nowrap w-full">
                                    <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.483 9.2711L19.1399 15.6698L13.7165 19.7378C12.3621 20.7541 10.4991 20.7541 9.14466 19.7378L3.30316 15.3564C2.80883 14.9859 2.20687 14.7849 1.58872 14.7849H0.953422C0.426706 14.7849 0 14.3582 0 13.8325V3.29531C0 2.81145 0.360986 2.40856 0.841983 2.35427C2.13448 2.21044 3.2984 1.69135 4.48899 0.997952C6.20153 0.116918 8.4484 0.431232 9.83806 1.73326L10.4257 2.29807L6.60918 6.02318C5.58719 7.04423 5.42431 8.65866 6.2301 9.774C6.72539 10.4626 7.62166 10.9732 8.55794 10.9732C9.31324 10.9732 10.0381 10.676 10.5619 10.1512L11.483 9.27015V9.2711ZM19.0056 0.997952C17.3959 0.193115 15.3881 0.402658 13.9499 1.5199L7.94645 7.3795C7.59309 7.73382 7.51308 8.30053 7.77405 8.66247C7.9455 8.90059 8.19409 9.04346 8.47793 9.06727C8.75891 9.09108 9.03131 8.98917 9.22848 8.79106L12.6745 5.52504C13.5784 4.66686 14.888 6.03651 13.9918 6.90136L12.8669 7.94622L21.0515 14.7859H21.9058C22.4316 14.7859 22.8583 14.3592 22.8583 13.8334V3.26292C22.8583 2.79621 22.5173 2.41046 22.0573 2.3276C20.4438 2.03614 19.0046 0.998904 19.0046 0.998904L19.0056 0.997952Z" fill="#1D1E21" />
                                    </svg>
                                    <div className="grow text-lg">Club actuel</div>
                                </div>
                                <input {...register('club')} name='club' type='text' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.club ? 'is-invalid !border-red-500' : ''}`} />
                                {errors.club && <span className="invalid-feedback block py-2 px-2">{errors.club.message}</span>}

                            </div>
                            <div className="lg:flex-1 w-full">
                                <div className="flex gap-4  md:px-4 whitespace-nowrap w-full">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48be6745725217387de9710be0a193a4d08011e72ce73951c9268683bb1b223?"
                                        className="my-auto w-5 aspect-square"
                                    />
                                    <div className="grow text-lg">Pays du club</div>
                                </div>
                                <div className={`flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${errors.country ? 'border !border-red-500' : ''}`}>
                                    <div className="flex gap-5 justify-between px-4  w-full rounded-md">
                                        <div className="flex gap-4 justify-between w-full">
                                            <div className="flex w-full">
                                                <Controller
                                                    control={control}
                                                    name='paysclub'
                                                    render={({ field }) => (
                                                        <Select
                                                            options={optionsPays}
                                                            placeholder="Pays du club"
                                                            className="w-full"
                                                            {...field}
                                                            styles={{
                                                                control: (provided, state) => ({
                                                                    ...provided,
                                                                    borderRadius: "0.375rem", // You can adjust the radius as needed
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    width: "100%",
                                                                    fontSize: "1rem", // Set the desired font size
                                                                    backgroundColor: "white", // Set the background color
                                                                    borderWidth: "none",
                                                                }),
                                                                option: (provided, state) => ({
                                                                    ...provided,
                                                                    width: "100%"
                                                                }),
                                                                menu: (provided, state) => ({
                                                                    ...provided,
                                                                    width: "100%",
                                                                })
                                                            }}
                                                        />
                                                    )}
                                                />

                                            </div>
                                        </div>{" "}
                                    </div>
                                </div>
                                {errors.paysclub && <span className="invalid-feedback block py-2 px-2">{errors.paysclub.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2  text-blue-600 max-md:flex-wrap max-md:pr-5 max-md:mr-2.5 max-md:max-w-full">
                            <div className="flex gap-4 self-start  text-lg whitespace-nowrap text-zinc-900">
                                <div className="flex gap-4  md:px-4 whitespace-nowrap w-full">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                                        className="my-auto w-5 aspect-square"
                                    />
                                    <div className="grow text-md md:text:lg">Compétences</div>
                                </div>
                            </div>
                            <div className="form-group icon-input  mb-3">
                                {skillsListClub.map((skill, index) => (
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

                </div>}

        </>

    )

}

export default Agent