import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";
const Player = ({ userInfo }) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [imagePreviewlic, setImagePreviewlic] = useState(null);

    const [errMsg, setErrMsg] = useState("");
    const [CurrentUser, setCurrentUser] = useState([]);
    const [PlayerData, setPlyerData] = useState([]);
    const [profile, setUserProfile] = useState([]);
    const [skills, setSkills] = useState([]);
    const [file, setFile] = useState(null);
    const [licenceError, setLicenceError] = useState([])








    const schema = yup
        .object({
            club: yup.string().required().min(2, ({ min }) => `Minimum de (${min} characters nécessaire)`).max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
            height:yup.number('Ce champ est obligatoire').typeError('Ce champ est obligatoire').required('Ce champ est obligatoire'),
            weight: yup.number('Ce champ est obligatoire').typeError('Ce champ est obligatoire').required('Ce champ est obligatoire'),
            PiedFort: yup.string().required(),
            positionPlay: yup.string().required(),
            positionSecond: yup.mixed(),
            skills: yup.array()
            .min(3, 'Vous pouvez selectionner au minimum 3 compétences !')
            .max(10, 'Vous pouvez selectionner au maximum 10 compétences !') // Validate minimum length
            .required('Vous pouvez selectionner au maximum 10 compétences !'),
        })
        
    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {}
    })


    useEffect(() => {
        setValue('club', userInfo.player.champsoptionelle);
        setValue('height', userInfo.player.height);
        setValue('positionPlay', userInfo.player.positionPlay);
        setValue('positionSecond', userInfo.player.positionSecond);
        setValue('weight', userInfo.player.weight);
        setValue('PiedFort', userInfo.player.PiedFort);
        setValue('licence', userInfo.player.Licence !== '' ? "oui" : "non");
        setValue('competence', selectedSkills);
        setSelectedSkills(userInfo.player.skillsInProfile.split(',').filter((item) => item !== ''));
        setBaseSkills(userInfo.player.skillsInProfile.split(',').filter((item) => item !== ''))
    }, [])

    const [FileError, setFileError] = useState(false)
    const [FileName, setFileName] = useState('')
    const handleFileChangeLicense = (event) => {
        const file = event.target.files[0];
        setFileName(file.name)

        if (file) {
            // Convert the selected image to a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewlic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [selectedSkills, setSelectedSkills] = useState(userInfo.player.skillsInProfile.split(',').filter((item) => item !== ''))
    const [baseSkills, setBaseSkills] = useState(userInfo.player.skillsInProfile.split(',').filter((item) => item !== ''))
    const [selectedSkillsError , setSelectedSkillsError] = useState(false)

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

    const licence = watch('licence');
    const skillsList = [
        "Rapidite",
        "Tacle",
        "Defence",
        "Tirs de loin",
        "jeu en une touche",
        "Rapidite de la prise de désicion",
        "Frappe puissante",
        "Agilité",
        "Controller du Ballon",
        "Dribble",
        "Exploitation de l'espace",
        "Evaluation des risques sur les terrain",
        "Endurance",
        "Equilibre et Coordination",
        "Auto-Motivation",
    ];
   
    const resetForm = async (data) => {
        setValue('club', userInfo.player.champsoptionelle);
        setValue('height', userInfo.player.height);
        setValue('PiedFort', userInfo.player.PiedFort);
        setValue('weight', userInfo.player.weight);
        setValue('positionPlay', userInfo.player.positionPlay);
        setValue('positionSecond', userInfo.player.positionSecond);
        setValue('licence', userInfo.player.Licence);
        setValue('competence', setSelectedSkills(baseSkills));
    }
    

    const onSubmit = async (data) => {
        setFileError(false)
        if(data.licence === "oui"){
            if(data.file.length > 0 || userInfo.player.Licence !== '')
            {
            console.log(FileError)
            const formDataToUpdate = new FormData();
            console.log(FileError)
            formDataToUpdate.append("club", data.club);
            formDataToUpdate.append("height", data.height);
            formDataToUpdate.append("weight", data.weight);
            formDataToUpdate.append("PiedFort", data.PiedFort);
            formDataToUpdate.append("positionPlay", data.positionPlay);
            formDataToUpdate.append("positionSecond", data.positionSecond);
            formDataToUpdate.append("skills", selectedSkills);
            formDataToUpdate.append("licence", data.licence);
            formDataToUpdate.append("image", data.file[0] || null);
            const response = await fetch(
                `${Config.LOCAL_URL}/api/player/${storedUserData.id}`,
                {
                    method: "PUT",
                    body: formDataToUpdate,
                }
            ).then((r)=> {
                if(r.status === 200) {
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
              }).finally(()=> {
               
                console.log('done')
              });
        }else{
            setFileError(true)
            console.log(false)
        }}
        else{
            const formDataToUpdate = new FormData();
            formDataToUpdate.append("club", data.club);
            formDataToUpdate.append("height", data.height);
            formDataToUpdate.append("weight", data.weight);
            formDataToUpdate.append("PiedFort", data.PiedFort);
            formDataToUpdate.append("positionPlay", data.positionPlay);
            formDataToUpdate.append("positionSecond", data.positionSecond);
            formDataToUpdate.append("skills", selectedSkills);
            formDataToUpdate.append("licence", data.licence);
            formDataToUpdate.append("image", null);
            const response = await fetch(
                `${Config.LOCAL_URL}/api/player/${storedUserData.id}`,
                {
                    method: "PUT",
                    body: formDataToUpdate,
                }
            ).then((r)=> {
                console.log('gfjii')
                if(r.status === 200) {
                  toast.success('Information du joueur sont changé', {
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
              }).finally(()=> {
               
                console.log('done')
              });
        }

        // if(data.licence === "oui" && data.file[0]   ){

        // if(FileError === true){
        //   console.log('error')
        // }else{
            
        // }
        // }
        
        // if (response.status === 200) {
        //     window.location.reload();
        // }


    }

    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <div className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start w-full bg-white rounded-xl  max-md:max-w-full">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48be6745725217387de9710be0a193a4d08011e72ce73951c9268683bb1b223?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="grow text-lg">Club Actuel</div>
                            </div>
                            <div className="relative">
                                <input name='club' {...register('club')} type='text' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.club ? 'is-invalid !border-red-500' : ''}`} />
                                {errors.club && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
                            </div>
                        </div>
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/67cc44c5147e294e812e8e6e60b5a03612a46374164925d1ed48b3daf7f65514?"
                                    className="my-auto aspect-[0.85] w-[17px]"
                                />
                                <div className="grow text-lg">Taille</div>
                            </div>
                           
                            <input {...register('height')} onChange={handleChange} name='height'  type='number' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.height ? 'is-invalid !border-red-500' : ''}`} />
                            {errors.height && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
                        </div>
                    </div>
                    <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_617_36935)">
                                        <path d="M19.4455 11.435C18.9664 10.8408 18.2539 10.5 17.4922 10.5H16.2497C15.5597 10.5 14.9997 11.0592 14.9997 11.75C14.9997 12.4408 15.5597 13 16.2497 13L17.5005 12.99C16.8897 15.8158 14.0297 17.51 11.2497 17.9075V13H12.083C12.773 13 13.333 12.4408 13.333 11.75C13.333 11.0592 12.773 10.5 12.083 10.5H11.2497V7.77C12.7014 7.2525 13.7497 5.8775 13.7497 4.25C13.7497 2.1825 12.0672 0.5 9.9997 0.5C7.9322 0.5 6.2497 2.1825 6.2497 4.25C6.2497 5.8775 7.29803 7.25167 8.7497 7.77V10.5H7.91637C7.22553 10.5 6.66637 11.0592 6.66637 11.75C6.66637 12.4408 7.22553 13 7.91637 13H8.7497V17.9075C5.97053 17.51 3.11137 15.8175 2.5072 13H3.7497C4.44053 13 4.9997 12.4408 4.9997 11.75C4.9997 11.0592 4.44053 10.5 3.7497 10.5H2.5072C1.74553 10.5 1.03303 10.8408 0.553867 11.4358C0.0788672 12.025 -0.102799 12.7842 0.0563672 13.5192C1.0472 18.1025 5.80887 20.5008 10.0005 20.5008C14.1922 20.5008 18.9539 18.1025 19.9447 13.5192C20.103 12.7842 19.9222 12.025 19.4464 11.4358L19.4455 11.435ZM9.9997 3C10.6889 3 11.2497 3.56083 11.2497 4.25C11.2497 4.93917 10.6889 5.5 9.9997 5.5C9.31053 5.5 8.7497 4.93917 8.7497 4.25C8.7497 3.56083 9.31053 3 9.9997 3Z" fill="#1D1E21" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_617_36935">
                                            <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <div className="grow text-lg">Poids</div>
                            </div>
                            <div className="relative">
                                <input {...register('weight')} onChange={handleChange} name='weight'  type='number' className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.weight ? 'is-invalid !border-red-500' : ''}`} />
                                {errors.weight && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
                            </div>
                        </div>
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                                <svg width="33" height="21" viewBox="0 0 33 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_617_37007)">
                                        <path d="M32.0387 17.9516C31.8969 18.4739 31.7292 18.9837 31.3712 19.4092C30.7205 20.1826 29.8803 20.5005 28.8866 20.4988C25.5197 20.4927 22.1545 20.4927 18.791 20.4988H3.15298C1.76464 20.4988 0.693342 19.8314 0.223608 18.6633C0.130996 18.4347 0.073422 18.1911 0 17.9549V16.4531C0.114305 16.4581 0.228608 16.4681 0.342913 16.4681H31.6958C31.8101 16.4681 31.9244 16.4581 32.0387 16.4531V17.9516Z" fill="#1D1E21" />
                                        <path d="M0 8.94138C0.0834341 8.60764 0.147678 8.27391 0.250302 7.94935C0.568659 6.97697 1.18118 6.12747 2.00322 5.51826C2.82527 4.90905 3.81624 4.57022 4.83918 4.54858C5.48746 4.5394 5.8529 4.88231 5.89045 5.52142C5.97388 6.9398 6.64136 7.97188 7.9713 8.47999C9.28539 8.9806 10.4743 8.67523 11.4755 7.68653C12.4025 6.76876 13.3194 5.84264 14.243 4.92236C14.6852 4.48099 15.049 4.42759 15.5905 4.72712C16.6284 5.30115 17.6638 5.87768 18.7159 6.46256C18.6325 6.54599 18.5741 6.61941 18.5082 6.68449C15.9429 9.25148 13.375 11.8168 10.8047 14.3805C10.6932 14.4937 10.5457 14.5646 10.3876 14.5807C6.97732 14.5913 3.56709 14.5938 0.156857 14.5882C0.105127 14.5882 0.0533995 14.579 0.00167031 14.574L0 8.94138Z" fill="#1D1E21" />
                                        <path d="M32.0393 14.5731C31.9559 14.5781 31.8725 14.5881 31.789 14.5881H19.656C19.5668 14.5881 19.4767 14.5781 19.334 14.5706C19.4266 14.4696 19.4833 14.4037 19.5459 14.3394C21.115 12.7681 22.6839 11.1965 24.2524 9.62458C24.3943 9.4819 24.5194 9.47189 24.7147 9.48441C25.514 9.53363 26.3158 9.55449 27.1176 9.56784C28.1461 9.57819 29.1461 9.90729 29.9798 10.5098C30.8135 11.1123 31.4398 11.9585 31.7724 12.9319C31.8842 13.2656 31.9517 13.6102 32.0393 13.9506V14.5731Z" fill="#1D1E21" />
                                        <path d="M13.332 14.5892L20.4798 7.44141L22.5932 8.61533C22.5098 8.71127 22.4422 8.78803 22.3713 8.85895C20.5296 10.7012 18.6857 12.5412 16.8396 14.379C16.7076 14.5003 16.5373 14.5715 16.3582 14.58C15.3603 14.6017 14.3616 14.5892 13.332 14.5892Z" fill="#1D1E21" />
                                        <path d="M9.39295 6.88219C8.67041 5.347 8.58949 3.87856 9.24612 2.4193C9.50643 1.8436 9.91359 1.32548 10.3166 0.825707C10.3902 0.732494 10.4824 0.655609 10.5874 0.599935C10.6923 0.544261 10.8077 0.511015 10.9261 0.502306C11.0446 0.493597 11.1636 0.509616 11.2755 0.549347C11.3875 0.589078 11.49 0.651653 11.5764 0.733097C12.3182 1.44479 13.0248 2.19236 13.7357 2.91406C12.4483 3.91527 11.3995 5.18097 10.2106 6.29148C9.977 6.50757 9.68998 6.67444 9.39295 6.88219Z" fill="#1D1E21" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_617_37007">
                                            <rect width="32.0387" height="20" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <div className="grow text-lg">Pied fort</div>
                            </div>
                            <select
                                id="PiedFort"
                                name="PiedFort"
                                {...register('PiedFort')}
                                className={`w-full flex justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5
                                    }`}
                            >
                                <option value="" disabled>
                                    Pied Fort
                                </option>
                                <option value="PiedGauche">Pied Gauche</option>
                                <option value="PiedDroit">Pied Droit</option>
                                <option value="DeuxPieds">Les deux pieds</option>
                            </select>
                            {errors.PiedFort && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
                        </div>
                    </div>
                    <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b051312f4e1495e14e7b1235b0b1ebab3cae89f347c699d855c048d1aa427fb4?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="grow text-lg">Position Principale</div>
                            </div>
                            <select
                                id="positionPlay"
                                name='positionPlay' {...register('positionPlay')}
                                className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 appearence-none"
                            >
                                <option value="" disabled>
                                    Position Secondaire
                                </option>
                                <option value="Gardien de but (GK)">
                                    Gardien de but (GK)
                                </option>
                                <option value="Arrière droit (RB)">
                                    Arrière droit (RB)
                                </option>
                                <option value="Arrière gauche( LB)">
                                    Arrière gauche( LB)
                                </option>
                                <option value="Défenseur central (CB)">
                                    Défenseur central (CB)
                                </option>
                                <option value="Milieu défensif (CDM)">
                                    Milieu défensif (CDM)
                                </option>
                                <option value="Milieu central (CM)">
                                Milieu central (CM)
                                </option>
                                <option value="Milieu offensif (MO)">
                                   Milieu offensif (MO)
                                </option>
                                <option value="Ailier droit (RW)">
                                    Ailier droit (RW)
                                </option>
                                <option value="Ailier gauche ( LW)">
                                    Ailier gauche ( LW)
                                </option>
                                <option value="Avant-centre ">
                                    Avant-centre ( ST)
                                </option>
                            </select>
                             {errors.positionPlay && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
                        </div>
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_657_46108)">
                                        <path d="M19.9992 17.1658C19.9992 19.0042 18.5042 20.4992 16.6659 20.4992H6.54425L8.24841 18.8325H16.6667C17.5859 18.8325 18.3334 18.085 18.3334 17.1658C18.3334 16.2467 17.5859 15.4992 16.6667 15.4992H12.5001C10.6617 15.4992 9.16675 14.0042 9.16675 12.1658C9.16675 10.56 10.3084 9.21667 11.8226 8.9025L13.4551 10.4992H12.5001C11.5809 10.4992 10.8334 11.2467 10.8334 12.1658C10.8334 13.085 11.5809 13.8325 12.5001 13.8325H16.6667C18.5051 13.8325 19.9992 15.3275 19.9992 17.1658ZM18.7784 7.6125L15.8326 10.4942L12.8926 7.61917C11.2617 5.9875 11.2617 3.345 12.8859 1.72C13.6734 0.933333 14.7201 0.5 15.8326 0.5C16.9451 0.5 17.9917 0.933333 18.7784 1.72C20.4034 3.345 20.4034 5.98833 18.7784 7.6125ZM7.11175 11.72C8.73675 13.345 8.73675 15.9883 7.11175 17.6125L4.16591 20.4942L1.22591 17.6192C-0.404921 15.9875 -0.404921 13.345 1.21925 11.72C2.00675 10.9333 3.05341 10.5 4.16591 10.5C5.27841 10.5 6.32508 10.9333 7.11175 11.72Z" fill="#1D1E21" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_657_46108">
                                            <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>



                                <div className="grow text-lg">Position Secondaire</div>
                            </div>
                            <select
                                {...register('positionSecond')}
                                id="positionSecond"
                                name="positionSecond"
                                className={`w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 }`}
                            >
                                                                <option value="" disabled>
                                    Position Secondaire
                                </option>
                                <option value="Gardien de but (GK)">
                                    Gardien de but (GK)
                                </option>
                                <option value="Arrière droit (RB)">
                                    Arrière droit (RB)
                                </option>
                                <option value="Arrière gauche( LB)">
                                    Arrière gauche( LB)
                                </option>
                                <option value="Défenseur central (CB)">
                                    Défenseur central (CB)
                                </option>
                                <option value="Milieu défensif (CDM)">
                                    Milieu défensif (CDM)
                                </option>
                                <option value="Milieu central (CM)">
                                Milieu central (CM)
                                </option>
                                <option value="Milieu offensif (MO)">
                                   Milieu offensif (MO)
                                </option>
                                <option value="Ailier droit (RW)">
                                    Ailier droit (RW)
                                </option>
                                <option value="Ailier gauche ( LW)">
                                    Ailier gauche ( LW)
                                </option>
                                <option value="Avant-centre ">
                                    Avant-centre ( ST)
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex sm:gap-4 gap-x-4  flex-wrap items-end">
                        <div className="lg:flex-1 w-full">
                            <div className="flex gap-4 justify-between px-4 mt-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7a97c9bcd4cc04810a57119703304622116c26ca19187ab06a1368043f945f4?"
                                    className="my-auto w-5 aspect-square"
                                />
                                <div className="grow text-lg">Avez-vous une licence ?</div>
                            </div>
                            <div className="flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                                <select {...register('licence')} className="flex gap-5 justify-between px-4 py-2 rounded-md" name="licence" id="licence" >
                                    <option disabled>Oui/Non</option>
                                    <option value="oui">OUI</option>
                                    <option value="non">Non</option>
                                </select>
                            </div>
                        </div>
                        <div className="lg:flex-1 w-full">
                            {licence === 'oui' &&
                                <div>
                                    <div className="cursor-pointer flex gap-4 justify-center items-center w-full">
                                        <div className={`mt-3 flex gap-2 justify-center items-center w-full  px-8 py-2 text-base font-medium text-blue-500 whitespace-nowrap border-1 border-blue-600 rounded-[30px] text-clip  ${FileError ? '!border-red-500 text-red-500 ' : ''}`}>
                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_1342_45742)">
                                                    <path d="M12.167 5.84589V0.395052C12.9278 0.683385 13.6278 1.12755 14.2212 1.72005L17.1245 4.62505C17.7178 5.21755 18.162 5.91755 18.4503 6.67839H13.0003C12.5403 6.67839 12.167 6.30505 12.167 5.84589ZM18.8137 8.34589H13.0003C11.622 8.34589 10.5003 7.22422 10.5003 5.84589V0.0317188C10.3662 0.0225521 10.232 0.0117188 10.0962 0.0117188H6.33366C4.03616 0.0125521 2.16699 1.88172 2.16699 4.17922V15.8459C2.16699 18.1434 4.03616 20.0126 6.33366 20.0126H14.667C16.9645 20.0126 18.8337 18.1434 18.8337 15.8459V8.75005C18.8337 8.61422 18.8228 8.48005 18.8137 8.34589ZM13.5895 14.0792C13.427 14.2417 13.2137 14.3234 13.0003 14.3234C12.787 14.3234 12.5737 14.2417 12.4112 14.0792L11.3337 13.0017V16.6667C11.3337 17.1267 10.9603 17.5001 10.5003 17.5001C10.0403 17.5001 9.66699 17.1267 9.66699 16.6667V13.0017L8.58949 14.0792C8.26366 14.4051 7.73699 14.4051 7.41116 14.0792C7.08533 13.7534 7.08533 13.2267 7.41116 12.9009L8.75616 11.5559C9.71783 10.5942 11.2828 10.5942 12.2453 11.5559L13.5903 12.9009C13.9162 13.2267 13.9162 13.7534 13.5903 14.0792H13.5895Z" fill="#2E71EB" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1342_45742">
                                                        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <label className="cursor-pointer text-ellipsis overflow-hidden w-[250px] ">
                                                <input
                                                    {...register('file')}
                                                    type="file"
                                                    name="file"
                                                    accept="*"
                                                    placeholder="sfgf"
                                                    onChange={handleFileChangeLicense}
                                                    className={`grow my-auto w-2 inset-0 opacity-0`}
                                                />
                                                <span className=""> {FileName ?  FileName : 'Importer une Licence'}</span>
                                               
                                            </label>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                                

                            }
                            {licence !== 'oui' &&
                                <div>
                                    <div className="flex gap-4 justify-between mt-2">
                                        <div className="flex gap-2 justify-center items-center w-full text-gray-600  px-8 py-2 text-base font-medium bg-gray-400 whitespace-nowrap border-1 border-gray-600 rounded-[30px] max-md:px-5">
                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_1342_20565)">
                                                    <path d="M12.167 5.84589V0.395052C12.9278 0.683385 13.6278 1.12755 14.2212 1.72005L17.1245 4.62505C17.7178 5.21755 18.162 5.91755 18.4503 6.67839H13.0003C12.5403 6.67839 12.167 6.30505 12.167 5.84589ZM18.8137 8.34589H13.0003C11.622 8.34589 10.5003 7.22422 10.5003 5.84589V0.0317188C10.3662 0.0225521 10.232 0.0117188 10.0962 0.0117188H6.33366C4.03616 0.0125521 2.16699 1.88172 2.16699 4.17922V15.8459C2.16699 18.1434 4.03616 20.0126 6.33366 20.0126H14.667C16.9645 20.0126 18.8337 18.1434 18.8337 15.8459V8.75005C18.8337 8.61422 18.8228 8.48005 18.8137 8.34589ZM13.5895 14.0792C13.427 14.2417 13.2137 14.3234 13.0003 14.3234C12.787 14.3234 12.5737 14.2417 12.4112 14.0792L11.3337 13.0017V16.6667C11.3337 17.1267 10.9603 17.5001 10.5003 17.5001C10.0403 17.5001 9.66699 17.1267 9.66699 16.6667V13.0017L8.58949 14.0792C8.26366 14.4051 7.73699 14.4051 7.41116 14.0792C7.08533 13.7534 7.08533 13.2267 7.41116 12.9009L8.75616 11.5559C9.71783 10.5942 11.2828 10.5942 12.2453 11.5559L13.5903 12.9009C13.9162 13.2267 13.9162 13.7534 13.5903 14.0792H13.5895Z" fill="#5A5A5A" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1342_20565">
                                                        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>


                                            <label>
                                                <input
                                                    type="file"
                                                    name="file"
                                                    disabled
                                                    className="grow my-auto w-2 inset-0 opacity-0"
                                                />
                                                Importer une Licence
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            }
                            
                        </div>
                        {FileError && <span className="invalid-feedback block px-2 ">Ce champ est obligatoire</span>}
                         {/* {imagePreviewlic &&  <span><img src={imagePreviewlic} alt="preview" /></span>} */}

                    </div>

                    <div className="flex gap-4 self-start px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                        <div className="flex gap-4 self-start mt-4 text-lg text-black whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                                className="my-auto w-5 aspect-square"
                            />
                            <div className="flex-auto text-lg">Compétences</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2  mt-4 text-lg text-blue-600 max-md:flex-wrap">
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
                                            className={`form-check-label btn ${selectedSkills.includes(skill) ? "flex gap-4 text-white justify-between px-2 py-2 bg-blue-600 rounded-[30px]" : `${(!selectedSkills.includes(skill) && errors.skills) || selectedSkillsError ? 'border-1 border-red-500 flex gap-4 justify-between px-2 py-2 text-blue-600 bg-gray-200 rounded-[30px]' : 'flex gap-4 justify-between px-2 py-2 text-blue-600 bg-gray-100 rounded-[30px]'} `
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
                    <div className="flex  gap-4  justify-between py-2 mt-6 mr-4 w-full text-base font-medium flex-nowrap">
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
    );
}

export default Player;