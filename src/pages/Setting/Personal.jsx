import React, { Component, Fragment, useEffect, useReducer, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Select, { components } from "react-select";
import "flag-icon-css/css/flag-icons.min.css";
import SelectWithFlag from "../../components/Form/countrySelect";
import { useForm, Controller } from "react-hook-form"
import PlaceHolder from "../../assets/placeholder.jpg"
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { paysAllInfo } from "../../assets/data/Country";
import DatePicker from "react-datepicker";

const Personal = ({ userInfo }) => {
  const [inputErrors, setInputErrors] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
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
  const optionsCountry = paysAllInfo.map((country, index) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

    return {
      value: countryCode,
      label: (
        <div key={countryCode}>
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

  const [imagePreview, setImagePreview] = useState(null);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [selectedCountryphoneWS, setSelectedCountryphoneWS] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    gender: "",
    nationality: "",
    countryresidence: "",
    cityresidence: "",
    tel: "",
    email: "",
    login: "",
    profil: "",
    password: "",
    // Additional fields for player
    height: "",
    weight: "",
    strongSkill: "",
    positionPlay: "",
    positionSecond: "",
    skillsInProfile: "",
  });
  const [selectedCountryphone, setSelectedCountryphone] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const optionsphone = paysAllInfo.map((country, index) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase();

    return {
      value: countryCode,
      label: (
        <div key={index} style={{ textAlign: "left" }}>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "2px", textAlign: "left" }}
            ></span>
          )}
          ({country.phone})
        </div>
      ),
      countryCode: countryCode,
      phoneLength: country.phoneLength,
    };
  });

  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);

  const schema = yup
    .object({
      nom: yup.string().required('Ce champ est obligatoire').max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
      discreptionBio: yup.string().required('Ce champ est obligatoire').max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
      prenom: yup.string().min(2, ({ min }) => `Minimum de (${min} characters nécessaire)`).max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
      nationality: yup.object().required(),
      country: yup.object().required(),
      cityresidence: yup.string(),
      gender: yup.string().oneOf(['male', 'female'], 'Ce champ est obligatoire'),
      // tel: yup.string().max(8),
      date_naissance: yup.string('Ce champ est obligatoire').required('Ce champ est obligatoire'),
      // wats: yup.object().required('Ce champ est obligatoire'),
      // numWSup: yup.string().required('Le numero de whatsapp est obligatoire'),
      numWSup: yup.string().when('wats', {
        is: (wats) => !wats ,
        then: () => yup.string().required('Le champ prefix est obligtoire'),
        otherwise: () => yup.string(),
      }),
      phoneLength: yup.object().required('Ce champ est obligatoire'),

    })
    .required()
      
  const {
    trigger,
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
 
  const phoneLength = watch('phoneLength');
  const whatsappLength = watch('wats')
  console.log(whatsappLength)
  if (whatsappLength) {
    let maxW = whatsappLength.phoneLength;
    schema.fields.numWSup = yup
      .string()
      .max(maxW, `Le Numéro doit être avec ${maxW} chiffres.`);
  }

  if (phoneLength) {
    let maxP = phoneLength.phoneLength;
    schema.fields.tel = yup
      .string()
      .max(maxP, `Le Numéro doit être avec ${maxP} chiffres.`);
  }


  console.log(errors)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      // Convert the selected image to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleYearChange = (year) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date_naissance: year ? `${year}-01-01` : null,
    }));
  };
  const onSubmit = async (data) => {
    const formDataToUpdate = new FormData();
    formDataToUpdate.append("discreptionBio", data.discreptionBio);
    formDataToUpdate.append("nom", data.nom);
    formDataToUpdate.append("prenom", data.prenom);
    formDataToUpdate.append("numWSup", data.numWSup);
    formDataToUpdate.append("tel", data.tel);
    formDataToUpdate.append("date_naissance", new Date(data.date_naissance).getFullYear());
    formDataToUpdate.append("gender", data.gender);
    formDataToUpdate.append("countryresidence", data.country?.label?.props?.children[1]);
    // formDataToUpdate.append("tel", data.tel);
    formDataToUpdate.append("nationality", data.nationality?.label?.props?.children[1]);
    formDataToUpdate.append("cityresidence", data.cityresidence);
    formDataToUpdate.append("image", file);
    const response = await fetch(
      `http://localhost:5000/api/user/${storedUserData.id}`,
      {
        method: "PUT",
        body: formDataToUpdate,
      }
    ).then((r) => {
      if (r.status === 200) {
        toast.success('User profile updated successfully', {
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
    }).finally(() => {
      console.log('done')
    });

    // if(response.status === 200) {
    //   // toast("Wow so easy!");
    //   
    // }
  }
  const resetForm = async () => {
    setValue('nom', userInfo.user.nom);
    setValue('discreptionBio', userInfo.user.discreptionBio);
    setValue('prenom', userInfo.user.prenom);
    setValue('country', userInfo.user.country);
    setValue('cityresidence', userInfo.user.cityresidence);
    setValue('gender', userInfo.user.gender);
    setValue('tel', userInfo.user.tel);
    setValue('numWSup', userInfo.user.numWSup);
    setValue('phoneLength', userInfo.user.phoneLength);
    setValue('wats', userInfo.user.wats);
    setValue('date_naissance', new Date(userInfo.user.date_naissance));
  }
  
  useEffect(() => {
    const defaultValue = (countryName) => { return options.find(option => option.label.props?.children[1] === countryName) };
    
    fetch(`http://localhost:5000/api/user/${storedUserData.id}`)
      .then((response) => response.json())
      .then((userData) => {
        console.log(defaultValue(userData.user.nationality))
        setUser(userData.user)
        setValue('nom', userData.user.nom);
        setValue('discreptionBio', userData.user.discreptionBio);
        setValue('prenom', userData.user.prenom);
        setValue('nationality', defaultValue(userData.user.nationality));
        setValue('country', defaultValue(userData.user.countryresidence));
        setValue('cityresidence', userData.user.cityresidence);
        setValue('gender', userData.user.gender);
        setValue('tel', userData.user.tel);
        setValue('numWSup', userData.user.numWSup);
        setValue('phoneLength', userData.user.phoneLength);
        setValue('wats', userData.user.wats);
        setValue('date_naissance', new Date(userData.user.date_naissance));
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);


  const [phoneLengthError, setPhoneLengthError] = useState('');
  const [whatsappLengthError, setWhatsappLengthError] = useState('');


  const handleChangePhoneNumberWS = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, whatsappLength?.phoneLength ? whatsappLength.phoneLength : 0);
    setValue('numWSup', value);
    const textError = `Le Numéro doit être avec ${whatsappLength?.phoneLength ? whatsappLength?.phoneLength : 5} chiffres.`

    setWhatsappLengthError(textError);

    schema.fields.numWSup = yup
      .string()
      .max(10, `Le Numéro doit être avec 10 chiffres.`);

  };

  const handleChangePhoneNumber = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, phoneLength?.phoneLength ? phoneLength.phoneLength : 5);
    console.log(value)
    const textError = `Le Numéro doit être avec ${phoneLength?.phoneLength ? phoneLength?.phoneLength : 5} chiffres.`
    setPhoneLengthError(textError);

    // Check if the length exceeds the limit and set an error message
    setValue('tel', value);
  };


  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="flex flex-col flex-wrap grow gap-y-6 justify-between w-full bg-white rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start  w-full bg-white rounded-xl ">
          <div className="flex gap-5 flex-col sm:flex-row max-md:flex-col max-md:gap-0 w-full">
            <div className="flex flex-col w-full sm:items-center sm:w-[36%] max-md:ml-0 max-md:w-full justify-center items-center">
              <label className="rounded-full border-2 aspect-square w-full max-w-[178px] max-md:mt-10">

                {user?.image !== null ?
                  <img
                    loading="lazy"
                    alt="logo"
                    srcSet={imagePreview ? imagePreview : user.image}
                    className="rounded-full border-2 aspect-square w-full max-w-[178px]"
                  /> : (<img
                    loading="lazy"
                    alt="logo"
                    srcSet={
                      imagePreview ? imagePreview : PlaceHolder
                    }
                    className="rounded-full border-2 aspect-square w-full max-w-[178px]"
                  />)}

              </label>
            </div>

            <div className="flex flex-col ml-0 sm:ml-5 w-full sm:w-[64%] max-md:ml-0 max-md:w-full justify-center items-center text-center">
              <div className="flex flex-col self-stretch my-auto max-md:mt-10">
                <div className="text-3xl font-bold text-black">
                  Photo de profile
                </div>
                <div className="flex gap-4 justify-center mt-4">
                  <div className="flex gap-2 justify-center px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe64f313a3ed145b5b50abb8a5dc1b51163bf8cf0e41b5232900227b0ae2686?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="w-6 aspect-square fill-white"
                    />
                    <label>
                      {" "}
                      <input
                        type="file"
                        {...register('image')}
                        name="image"
                        onChange={handleFileChange}
                        className="grow my-auto w-2 inset-0 opacity-0"
                      />
                      Importer une photo
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-between px-4 mt-6 text-lg text-zinc-900 max-md:flex-wrap max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ae42fd488ab777fc19f2a0df9cb3fa38098c430dfa9b6f45d761da60b117609?"
              className="my-auto w-5 aspect-square"
            />
            <div className="grow max-md:max-w-full">A Propos de Moi</div>
          </div>
          <div className="flex flex-col w-full">
            <textarea {...register("discreptionBio", { required: true })} name="discreptionBio" placeholder="A Propos de Moi" className={`border border-gray-800 border-solid ${errors.discreptionBio ? "!border-red-500" : "border-neutral-200"} justify-center p-4 mt-2 text-base font-light  rounded-[30px] text-zinc-900 max-md:max-w-full `}>
            </textarea>
            {errors.discreptionBio && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
          </div>


          {/* nom et prenom */}
          <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
            <div className="lg:flex-1 w-full">
              <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                <div className="flex gap-4 items-center text-lg">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b682aacddfd9d405027bfc2ee157c55aecce42a1e46ef3db6e893769755f24c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start aspect-[0.75] w-[15px]"
                  />
                  <div className="grow">Nom</div>
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("nom")}
                    className={`form-control  justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.nom ? "is-invalid" : ""
                      }`}
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="Votre nom"
                  />
                  {errors?.nom && (
                    <div className="invalid-feedback block p-2">
                      {errors.nom?.message}
                    </div>
                  )}
                </div>

              </div>
            </div>
            <div className="lg:flex-1 w-full">
              <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                <div className="flex gap-4 items-cente px-4 text-lg">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b682aacddfd9d405027bfc2ee157c55aecce42a1e46ef3db6e893769755f24c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start aspect-[0.75] w-[15px]"
                  />
                  <div className="grow">Prénom</div>
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("prenom", { required: true })}
                    className={`form-control  justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${errors.prenom ? "is-invalid" : ""
                      }`}
                    type="text"
                    id="prenom"
                    name="prenom"
                    placeholder="Votre Prenom"
                  />
                  {errors?.prenom && (
                    <div className="invalid-feedback block p-2">
                      {errors?.nom?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>



          {/* tel et whatsapp */}
          <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-base">
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 items-cente px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/77e0a9d5a9615e1a8589a669ca89cdae1507fb53a73dae9ebb1ad43aaa156c03?"
                  className="w-6 aspect-square"
                />
                <div className="grow">N° Whatsapp</div>
              </div>

              <div className="flex gap-2 mt-2 text-base h-[52px]">
                <Controller
                  control={control}
                  name="wats"
                  render={({ field }) => (
                    <Select
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          justifyContent: "center",
                          width: "135px",
                          height:"52px",
                          backgroundColor: "transaprent",
                          borderWidth: "none",
                        }),
                      }}
                      className={`px-2 text-sm text-center flex border-solid border-[0.5px] rounded-[30px] ${errors.wats ? 'boreder border-red-500' : ''}`}
                      placeholder="Préfixe"
                      {...field}
                      options={optionsphone}
                    />
                  )}
                />

                <div className={'w-full'} style={{ }}>
                  <input
                    {...register("numWSup", {
                      pattern: {
                        value: /^\d{8}$/
                      }
                    })}
                    type="number"
                    

                    // min={selectedCountryphoneWS.phoneLength}
                    onChange={handleChangePhoneNumberWS}
                    placeholder={`Votre numéro`}
                    className={`h-[52px] px-3 w-full form-control grow justify-center gap-2 items-start py-3.5 pl-1 border-solid  border-[0.5px] border-neutral-200 rounded-[30px] max-md:pr-2 ${errors.numWSup ? "is-invalid" : ""
                      }`}
                  />
                </div>


              </div>

              {errors.numWSup && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.numWSup?.message}
                </div>
              )}

              {(whatsappLengthError && whatsappLength) ? (
                <div className="text-red-500 text-sm mt-1">
                  Le Numéro doit être avec {whatsappLength.phoneLength} chiffres
                </div>
              ) : '' }
            </div>

            {/* -------------- */}
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 items-center px-4 text-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_595_43798)">
                    <path d="M0.00069809 5.19844C0.00069809 11.5651 8.44236 19.9984 14.8007 19.9984C16.1924 19.9984 17.4924 19.4734 18.4507 18.5151L19.284 17.5568C20.2507 16.5901 20.2507 14.9568 19.2424 13.9484C19.2174 13.9234 17.209 12.3818 17.209 12.3818C16.209 11.4318 14.634 11.4318 13.6424 12.3818L12.4257 13.3568C9.75903 12.2234 7.86736 10.3234 6.6507 7.5651L7.61736 6.34844C8.5757 5.35677 8.5757 3.77344 7.61736 2.78177C7.61736 2.78177 6.0757 0.773438 6.0507 0.748438C5.04237 -0.259896 3.40903 -0.259896 2.4007 0.748438L1.5257 1.50677C0.525698 2.49844 0.00069809 3.79844 0.00069809 5.1901V5.19844Z" fill="#1D1E21" />
                  </g>
                  <defs>
                    <clipPath id="clip0_595_43798">
                      <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="grow">N° Tel</div>
              </div>

              <div className="flex gap-2 mt-2 text-base h-[52px]">
                <Controller
                  control={control}
                  name="phoneLength"
                  render={({ field }) => (
                    <Select
                      classNames={'w-full'}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderRadius: "0.375rem",
                          display: "flex",
                          justifyContent: "center",
                          width: "135px",
                          backgroundColor: "transparent",
                          borderWidth: "none",
                        }),
                      }}
                      className={`text-sm text-center flex border-solid border-[0.5px] rounded-[30px] ${errors.wats ? 'boreder border-red-500' : ''}`}
                      placeholder="Préfixe"
                      {...field}
                      options={optionsphone}
                    />
                  )}
                />
                <div className={'w-full h-[52px] '}>
                  <input
                    {...register("tel")}
                    type="number"
                    disabled={phoneLength ? false : true}
                    // min={selectedCountryphoneWS.phoneLength}
                    onChange={handleChangePhoneNumber}
                    placeholder={`Votre numéro`}
                    // value={phoneNumber.slice(0, selectedCountryphone?.phoneLength)}
                    className={`px-3 w-full grow justify-center gap-2 items-start form-control py-3.5 pl-1 border-solid  border-[0.5px] border-neutral-200 rounded-[30px] max-md:pr-2 ${errors.numWSup ? "is-invalid" : ""
                      }`}
                  />
                </div>
              </div>
              {errors.tel && (
                <div className="invalid-feedback block py-2 px-2">
                  {errors.tel?.message}
                </div>
              )}
              {errors.phoneLength && (
                <div className="invalid-feedback block py-2 px-2">
                  {errors.phoneLength?.message}
                </div>
              )}
            </div>
          </div>


          {/* annee de naissance */}
          <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-base">
            <div className="lg:flex-1 w-full">
              <div className="flex flex-col grow text-base whitespace-nowrap text-zinc-900 max-md:mt-6">
                <div className="flex gap-4 justify-between px-4 text-lg">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/424750770a24c4c2e5f786593b06fdc9d9137ae4f454f3cda3580afabec0922e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start w-5 aspect-square"
                  />{" "}
                  <div className="grow">Année de naissance</div>
                </div>{" "}
                <div className={`flex flex-col justify-center py-px mt-2 w-full border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${errors.date_naissance ? '!border-red-500 ' : ''}`}>
                  <div className="flex gap-5 justify-between  py-3.5 rounded-md w-full ">
                    <Controller
                      control={control}
                      name="date_naissance"
                     
                      render={({ field }) => (
                        <DatePicker
                          PlaceHolder="Année de naissance"
                          name="date_naissance"
                          dateFormat="yyyy"
                          selected={field.value}
                          showYearPicker
                          {...field}
                          yearDropdownItemNumber={10} // Set the maximum selectable year to 2012
                          maxDate={new Date(2012, 0, 1)}
                          className="ml-4 w-full text-zinc-600"
                        />
                      )}
                    />
                  </div>
                </div>{" "}
              </div>
              {errors.date_naissance && <span className="invalid-feedback block py-2 px-2">{errors.date_naissance?.message}</span>}
            </div>
            <div className="lg:flex-1 w-full ">
              <div className="flex gap-4 justify-between px-4 text-lg items-base">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81299e0229e715d9789e71faf61b6931d61c805b7fbce9b340cc4b0fd8493cf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="self-start w-5 aspect-square"
                />{" "}
                <div className="grow">Sexe</div>
              </div>{" "}
              <div className="">
                <select
                  {...register('gender')}
                  name="gender"
                  placeholder="Sexe"
                  onChange={handleInputChange}
                  className={` text-zinc-600 h-[53px] w-full md:w-full form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 max-w-full text-base whitespace-nowrap border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] w-[379px] ${errors.sexe ? "is-invalid" : ""
                }`}

                >
                  <option value="">Sexe</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback block py-2 px-2">
                    {errors.gender?.message}
                  </div>
                )}
              </div>{" "}
            </div>
          </div>


          {/* country */}
          <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc2223db27c0d33870f85928116ea4a9a4b038fc39e2a16c1efd0448f4f6523d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="self-start w-5 aspect-square"
                />{" "}
                <div className="grow">Nationalité</div>
              </div>{" "}
              <div className={`flex flex-col justify-center py-1.5 mt-2 w-full text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${errors.nationality ? 'border !border-red-500' : ''}`}>
                <div className="flex gap-5 justify-between px-4  w-full rounded-md">
                  <div className={`flex gap-5 justify-between w-full`} >

                    <Controller
                      control={control}
                      name='nationality'
                      render={({ field }) => (
                        <Select
                          options={optionsCountry}
                          className={"is-invalid"}
                          placeholder="Nationalité"
                          {...field}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              borderRadius: "0.375rem", // You can adjust the radius as needed

                              width: "100%",
                              fontSize: "1rem", // Set the desired font size
                              backgroundColor: "white", // Set the background color
                              borderWidth: "none",
                            }),
                            menu: (provided, state) => ({
                              ...provided,
                              width: "185%",
                            }),
                          }}
                        />

                      )}
                    />
                  </div>
                </div>
              </div>
              {errors.nationality && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.nationality?.message}
                </div>
              )}
            </div>
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a128d306f388b8fe1ee6ab08de9c65c1f7200283d1682fac379e573167086b34?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="self-start w-5 aspect-square"
                />{" "}
                <div className="grow">Pays de résidence</div>
              </div>{" "}
              <div className={`flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${errors.country ? 'border !border-red-500' : ''}`}>
                <div className="flex gap-5 justify-between px-4  w-full rounded-md">
                  <div className="flex gap-4 justify-between">
                    <div className="flex-auto">
                      <Controller
                        control={control}
                        name='country'
                        render={({ field }) => (
                          <Select
                            options={options}
                            placeholder="Résidence"
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
                              menu: (provided, state) => ({
                                ...provided,
                                width: "185%",
                              })
                            }}
                          />
                        )}
                      />

                    </div>
                  </div>{" "}
                </div>
              </div>
              {errors.country && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex gap-4 self-start px-4 mt-6 text-lg text-zinc-900">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/26bf7a353dc8ba12a2c588e612f061c37dd22cdccf246eec44650d1580269c48?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="self-start w-5 aspect-square"
              />{" "}
              <div className="flex-auto">Ville de résidence (Facultative)</div>{" "}
            </div>{" "}
            <input
              type="text"
              name="cityresidence"
              {...register("cityresidence")}
              className={` text-zinc-600 w-full md:w-1/2 form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 max-w-full text-base whitespace-nowrap border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] w-[379px] max-md:pr-5 ${errors.cityresidence ? "is-invalid" : ""
                }`}
              placeholder="Ville"
            />
            {errors.cityresidence && (
              <div className="invalid-feedback">
                {errors.cityresidence.message}
              </div>
            )}
          </div>

          <div className="flex gap-5 justify-between py-2 mt-6 mr-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
            <div className="flex gap-2 justify-between px-8 py-2 text-blue-600 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e237a106a6aae9aaedb87131a5b6a9cefc6631b6b0b800569f8639d3cbb6941?"
                className="w-5 aspect-square"
              />
              <button onClick={resetForm} className="grow">Annuler</button>
            </div>
            <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                className="w-5 aspect-square"
              />
              <button type="submit" className="grow" >Confirmer</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Personal;
