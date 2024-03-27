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
import { Langue } from "../../assets/data/Langue";
import DatePicker from "react-datepicker";

const Personal = ({ userInfo }) => {
  const [inputErrors, setInputErrors] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
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
      discreptionBio: yup.string().max(255, ({ max }) => `Maximum de (${max} characters autorisé)`),
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
        is: (wats) => !wats,
        then: () => yup.string().required('Le champ prefix est obligtoire'),
        otherwise: () => yup.string(),
      }),
      // phoneLength: yup.object().required('Ce champ est obligatoire'),

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
  // const handleYearChange = (year) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     date_naissance: year ? `${year}-01-01` : null,
  //   }));
  // };

  const handleChange = (event) => {
    const input = event.target.value;
    // Ensure the input is a valid number, non-negative, and has at most 3 digits
    if (/^\d*$/.test(input) && input.length <= 3 && input >= 0) {
      setValue(event.target.name , input);
    }
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
    formDataToUpdate.append("nationality", data.nationality?.label?.props?.children[1]);
    formDataToUpdate.append("cityresidence", data.cityresidence);
    formDataToUpdate.append("langueparlee", data.langueparlee.map(lang => lang.value).join(','));















    formDataToUpdate.append("image", file);
    const response = await fetch(
      `https://odine-sport.com/api/user/${storedUserData.id}`,
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
    setValue('langueparlee', userInfo.user.langueparlee);
    
    setValue('date_naissance', new Date(userInfo.user.date_naissance));
  }

  useEffect(() => {
    const defaultValue = (countryName) => { return options.find(option => option.label.props?.children[1] === countryName) };

    fetch(`https://odine-sport.com/api/user/${storedUserData.id}`)
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
        const selectedOptions = userData.user.langueparlee.split(',').map(lang => ({
          value: lang,
          label: lang,
        }));
        setValue('langueparlee', selectedOptions);
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













  const optionsLangue = Array.from(new Set(Langue.map(langue => langue.name))).map(name => ({
    value: name,
    label: name,
  }));
  

  useEffect(() => {
    setValue('langueparlee', selectedLanguages);
  }, [selectedLanguages]);

  
  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
    const selectedLanguageLabels = selectedOptions.map(option => option.value);
    console.log('Selected Languages:', selectedLanguageLabels);
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

          <div className="flex flex-col w-full">
            <div className="flex gap-4 justify-between px-4 text-lg text-zinc-900 max-md:flex-wrap max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ae42fd488ab777fc19f2a0df9cb3fa38098c430dfa9b6f45d761da60b117609?"
                className="my-auto w-5 aspect-square"
              />
              <div className="grow max-md:max-w-full">A Propos de Moi</div>
            </div>
            <textarea {...register("discreptionBio", { required: true })} name="discreptionBio" placeholder="A Propos de Moi" className={`border border-gray-800 border-solid ${errors.discreptionBio ? "!border-red-500" : "border-neutral-200"} justify-center p-4 mt-2 text-base font-light  rounded-[30px] text-zinc-900 max-md:max-w-full `}>
            </textarea>
            {errors.discreptionBio && <span className="invalid-feedback block py-2 px-2">Ce champ est obligatoire</span>}
          </div>


          {/* nom et prenom */}
          <div className=" mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
            <div className="lg:flex-1 w-full">
              <div className="flex flex-col whitespace-nowrap text-zinc-900">
                <div className="flex items-center px-4 gap-4  text-lg">
                  <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1458_7391)">
                      <path d="M0 20.499C0 19.1191 0 17.7396 0 16.3604C0 14.3047 1.3625 12.6391 3.37656 12.2401C3.6451 12.1913 3.91771 12.1684 4.19063 12.1719C6.39688 12.1667 8.60278 12.1667 10.8083 12.1719C12.9063 12.1766 14.5625 13.5615 14.9401 15.6245C14.9812 15.8748 15.0002 16.1282 14.9969 16.3818C15.0021 17.7547 14.9969 19.1276 14.9969 20.5005L0 20.499Z" fill="#1D1E21" />
                      <path d="M8.43266 1.00156C8.7936 1.07969 9.16183 1.13073 9.51391 1.23958C11.6832 1.91667 13.1238 4.00677 12.9972 6.27708C12.8702 8.56302 11.1837 10.4922 8.94412 10.9125C6.13631 11.4417 3.45089 9.52292 3.05037 6.7026C2.65454 3.91615 4.63579 1.35989 7.44308 1.03333C7.48726 1.02554 7.53079 1.01439 7.57329 1L8.43266 1.00156Z" fill="#1D1E21" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1458_7391">
                        <rect width="15.001" height="20" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>

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
              <div className="flex flex-col whitespace-nowrap text-zinc-900">
                <div className="flex gap-4 items-center px-4 text-lg">
                  <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1458_7391)">
                      <path d="M0 20.499C0 19.1191 0 17.7396 0 16.3604C0 14.3047 1.3625 12.6391 3.37656 12.2401C3.6451 12.1913 3.91771 12.1684 4.19063 12.1719C6.39688 12.1667 8.60278 12.1667 10.8083 12.1719C12.9063 12.1766 14.5625 13.5615 14.9401 15.6245C14.9812 15.8748 15.0002 16.1282 14.9969 16.3818C15.0021 17.7547 14.9969 19.1276 14.9969 20.5005L0 20.499Z" fill="#1D1E21" />
                      <path d="M8.43266 1.00156C8.7936 1.07969 9.16183 1.13073 9.51391 1.23958C11.6832 1.91667 13.1238 4.00677 12.9972 6.27708C12.8702 8.56302 11.1837 10.4922 8.94412 10.9125C6.13631 11.4417 3.45089 9.52292 3.05037 6.7026C2.65454 3.91615 4.63579 1.35989 7.44308 1.03333C7.48726 1.02554 7.53079 1.01439 7.57329 1L8.43266 1.00156Z" fill="#1D1E21" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1458_7391">
                        <rect width="15.001" height="20" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>

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
          <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-base">
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
                          height: "52px",
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

                <div className={'w-full'} style={{}}>
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
              ) : ''}
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
                      className={`text-sm text-center flex border-solid border-[0.5px] rounded-[30px] `}
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
                    // min={selectedCountryphoneWS.phoneLength}
                    onChange={handleChangePhoneNumber}
                    placeholder={`Votre numéro`}
                    // value={phoneNumber.slice(0, selectedCountryphone?.phoneLength)}
                    className={`px-3 w-full grow justify-center gap-2 items-start form-control py-3.5 pl-1 border-solid  border-[0.5px] border-neutral-200 rounded-[30px] max-md:pr-2 
                      }`}
                  />
                </div>
              </div>
              {errors.tel && (
                <div className="invalid-feedback block py-2 px-2">
                  {errors.tel?.message}
                </div>
              )}
              {(phoneLength && phoneLengthError) ? (
                <div className="text-red-500 text-sm mt-1">
                  Le Numéro doit être avec {phoneLength.phoneLength} chiffres
                </div>
              ) : ''}
            </div>
          </div>


          {/* annee de naissance */}
          <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-base">
            <div className="lg:flex-1 w-full">
              <div className="flex flex-col grow text-base whitespace-nowrap text-zinc-900">
                <div className="flex gap-4 items-center justify-between px-4 text-lg">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_608_33737)">
                      <path d="M0 16.332C0.00132321 17.4367 0.440735 18.4957 1.22185 19.2768C2.00296 20.058 3.062 20.4974 4.16667 20.4987H15.8333C16.938 20.4974 17.997 20.058 18.7782 19.2768C19.5593 18.4957 19.9987 17.4367 20 16.332V8.83203H0V16.332ZM14.1667 12.582C14.4139 12.582 14.6556 12.6553 14.8611 12.7927C15.0667 12.93 15.2269 13.1253 15.3215 13.3537C15.4161 13.5821 15.4409 13.8334 15.3926 14.0759C15.3444 14.3184 15.2254 14.5411 15.0505 14.7159C14.8757 14.8907 14.653 15.0098 14.4105 15.058C14.1681 15.1062 13.9167 15.0815 13.6883 14.9869C13.4599 14.8923 13.2647 14.7321 13.1273 14.5265C12.99 14.3209 12.9167 14.0793 12.9167 13.832C12.9167 13.5005 13.0484 13.1826 13.2828 12.9481C13.5172 12.7137 13.8351 12.582 14.1667 12.582ZM10 12.582C10.2472 12.582 10.4889 12.6553 10.6945 12.7927C10.9 12.93 11.0602 13.1253 11.1548 13.3537C11.2495 13.5821 11.2742 13.8334 11.226 14.0759C11.1777 14.3184 11.0587 14.5411 10.8839 14.7159C10.7091 14.8907 10.4863 15.0098 10.2439 15.058C10.0014 15.1062 9.75005 15.0815 9.52165 14.9869C9.29324 14.8923 9.09801 14.7321 8.96066 14.5265C8.82331 14.3209 8.75 14.0793 8.75 13.832C8.75 13.5005 8.8817 13.1826 9.11612 12.9481C9.35054 12.7137 9.66848 12.582 10 12.582ZM5.83333 12.582C6.08056 12.582 6.32223 12.6553 6.5278 12.7927C6.73336 12.93 6.89357 13.1253 6.98818 13.3537C7.08279 13.5821 7.10755 13.8334 7.05931 14.0759C7.01108 14.3184 6.89203 14.5411 6.71722 14.7159C6.5424 14.8907 6.31967 15.0098 6.0772 15.058C5.83472 15.1062 5.58339 15.0815 5.35498 14.9869C5.12657 14.8923 4.93135 14.7321 4.794 14.5265C4.65664 14.3209 4.58333 14.0793 4.58333 13.832C4.58333 13.5005 4.71503 13.1826 4.94945 12.9481C5.18387 12.7137 5.50181 12.582 5.83333 12.582Z" fill="#1D1E21" />
                      <path d="M15.8333 2.16667H15V1.33333C15 1.11232 14.9122 0.900358 14.7559 0.744078C14.5996 0.587797 14.3877 0.5 14.1667 0.5C13.9457 0.5 13.7337 0.587797 13.5774 0.744078C13.4211 0.900358 13.3333 1.11232 13.3333 1.33333V2.16667H6.66667V1.33333C6.66667 1.11232 6.57887 0.900358 6.42259 0.744078C6.26631 0.587797 6.05435 0.5 5.83333 0.5C5.61232 0.5 5.40036 0.587797 5.24408 0.744078C5.0878 0.900358 5 1.11232 5 1.33333V2.16667H4.16667C3.062 2.16799 2.00296 2.6074 1.22185 3.38852C0.440735 4.16963 0.00132321 5.22867 0 6.33333L0 7.16667H20V6.33333C19.9987 5.22867 19.5593 4.16963 18.7782 3.38852C17.997 2.6074 16.938 2.16799 15.8333 2.16667Z" fill="#1D1E21" />
                    </g>
                    <defs>
                      <clipPath id="clip0_608_33737">
                        <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="grow">Année de naissance</div>
                </div>{" "}
                <div className={`w-full flex flex-col justify-center py-px mt-2 w-full border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${errors.date_naissance ? '!border-red-500 ' : ''}`}>
                  <div className="py-3.5 rounded-md w-full">
                    <Controller
                      control={control}
                      name="date_naissance"
                      className=""
                      render={({ field }) => (
                        <DatePicker
                          wrapperClassName="w-full cursor-pointer"
                          PlaceHolder="Année de naissance"
                          name="date_naissance"
                          dateFormat="yyyy"
                          selected={field.value}
                          showYearPicker
                          {...field}
                          yearDropdownItemNumber={10} // Set the maximum selectable year to 2012
                          maxDate={new Date(2012, 0, 1)}
                          className="w-full text-zinc-600 px-4"
                        />
                      )}
                    />
                  </div>
                </div>{" "}
              </div>
              {errors.date_naissance && <div className="text-red-500 text-sm mt-1">{errors.date_naissance?.message}</div>}
            </div>
            <div className="lg:flex-1 w-full ">
              <div className="flex gap-4 items-center justify-between px-4 text-lg items-base">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_608_33774)">
                    <path d="M19.9924 1.33333C19.9924 1.11232 19.9047 0.900358 19.7484 0.744078C19.5921 0.587797 19.3801 0.5 19.1591 0.5H15.3516C15.1868 0.500035 15.0257 0.548928 14.8887 0.640499C14.7517 0.732069 14.6449 0.862205 14.5819 1.01445C14.5188 1.1667 14.5023 1.33423 14.5345 1.49586C14.5666 1.65749 14.6459 1.80596 14.7625 1.9225L15.7866 2.94667L14.0883 4.645C13.2239 4.10723 12.2244 3.82617 11.2064 3.83458C10.1884 3.84299 9.19371 4.14052 8.33828 4.6925C7.67523 4.26727 6.92736 3.9919 6.14687 3.88559C5.36639 3.77928 4.57211 3.84461 3.81948 4.07702C3.06686 4.30942 2.37403 4.70329 1.78937 5.23114C1.2047 5.75899 0.742299 6.40809 0.434435 7.13313C0.126571 7.85816 -0.0193327 8.64165 0.00691152 9.42891C0.0331557 10.2162 0.230915 10.9882 0.586382 11.6911C0.941849 12.394 1.44646 13.0109 2.06498 13.4986C2.6835 13.9864 3.40102 14.3332 4.16745 14.515V15.5H3.33412C3.0026 15.5 2.68465 15.6317 2.45023 15.8661C2.21581 16.1005 2.08412 16.4185 2.08412 16.75C2.08412 17.0815 2.21581 17.3995 2.45023 17.6339C2.68465 17.8683 3.0026 18 3.33412 18H4.16745V19.25C4.16745 19.5815 4.29915 19.8995 4.53357 20.1339C4.76799 20.3683 5.08593 20.5 5.41745 20.5C5.74897 20.5 6.06691 20.3683 6.30133 20.1339C6.53575 19.8995 6.66745 19.5815 6.66745 19.25V18H7.50078C7.8323 18 8.15025 17.8683 8.38467 17.6339C8.61909 17.3995 8.75078 17.0815 8.75078 16.75C8.75078 16.4185 8.61909 16.1005 8.38467 15.8661C8.15025 15.6317 7.8323 15.5 7.50078 15.5H6.66745V14.5075C7.25848 14.3697 7.82197 14.1331 8.33412 13.8075C9.3656 14.4701 10.5917 14.7624 11.8111 14.6366C13.0306 14.5108 14.1712 13.9742 15.0456 13.115C15.9201 12.2557 16.4766 11.1248 16.6238 9.90771C16.771 8.69061 16.5002 7.45962 15.8558 6.41667L17.5541 4.71833L18.5783 5.7425C18.6952 5.85937 18.8442 5.93883 19.0064 5.97079C19.1685 6.00274 19.3365 5.98575 19.489 5.92197C19.6415 5.85818 19.7716 5.75049 19.8627 5.61258C19.9539 5.47468 20.0019 5.31279 20.0008 5.1475L19.9924 1.33333ZM2.50078 9.25C2.49882 8.76821 2.61671 8.2935 2.84385 7.86861C3.07099 7.44372 3.40024 7.08199 3.80195 6.816C4.20367 6.55001 4.66523 6.38811 5.14508 6.34487C5.62493 6.30164 6.108 6.37843 6.55078 6.56833C6.08127 7.38408 5.83416 8.30879 5.83416 9.25C5.83416 10.1912 6.08127 11.1159 6.55078 11.9317C6.108 12.1216 5.62493 12.1984 5.14508 12.1551C4.66523 12.1119 4.20367 11.95 3.80195 11.684C3.40024 11.418 3.07099 11.0563 2.84385 10.6314C2.61671 10.2065 2.49882 9.73179 2.50078 9.25ZM11.2508 12.1667C10.6739 12.1667 10.11 11.9956 9.63037 11.6751C9.15073 11.3546 8.77689 10.8991 8.55613 10.3662C8.33538 9.83321 8.27762 9.24676 8.39016 8.68099C8.5027 8.11521 8.78049 7.59551 9.18839 7.18761C9.59629 6.7797 10.116 6.50192 10.6818 6.38938C11.2475 6.27684 11.834 6.3346 12.3669 6.55535C12.8999 6.77611 13.3554 7.14994 13.6759 7.62959C13.9964 8.10923 14.1674 8.67314 14.1674 9.25C14.1674 10.0235 13.8602 10.7654 13.3132 11.3124C12.7662 11.8594 12.0243 12.1667 11.2508 12.1667Z" fill="#1D1E21" />
                  </g>
                  <defs>
                    <clipPath id="clip0_608_33774">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="grow">Sexe</div>
              </div>{" "}
              <div className="">
                <select
                  {...register('gender')}
                  name="gender"
                  placeholder="Sexe"

                  className={` text-zinc-600 h-[53px] w-full md:w-full form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 max-w-full text-base whitespace-nowrap border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] w-[379px] ${errors.sexe ? "is-invalid" : ""
                    }`}

                >
                  <option value="" disabled>Sexe</option>
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
          <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-base">
            <div className="lg:flex-1 w-full">
              <div className="flex gap-4 items-center justify-between px-4 text-lg">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_608_33800)">
                    <path d="M10 0.5C4.48583 0.5 0 4.98583 0 10.5C0 16.0142 4.48583 20.5 10 20.5C15.5142 20.5 20 16.0142 20 10.5C20 4.98583 15.5142 0.5 10 0.5ZM12.945 11.7592L11.0775 15.8058C10.9292 16.1275 10.6075 16.3333 10.2533 16.3333H10.0758C9.57417 16.3333 9.1675 15.9267 9.1675 15.425V13.4542C9.1675 13.1633 9.05167 12.8842 8.84583 12.6783L7.85417 11.6867C7.6275 11.46 7.5 11.1525 7.5 10.8325V10.03C7.5 9.7975 7.4075 9.57417 7.2425 9.40917L6.93167 9.09833C6.76167 8.92833 6.53167 8.83333 6.29167 8.83333H4.6675C4.3475 8.83333 4.04167 8.7025 3.82083 8.47L2.43917 7.0175C3.76167 4.15917 6.64917 2.16667 10 2.16667C10.1717 2.16667 10.3392 2.1825 10.5075 2.1925C10.0633 2.86583 9.66083 3.485 9.41667 3.86333C9.2625 4.10083 9.25917 4.40333 9.405 4.64667L10.1025 5.81C10.2875 6.1175 10.2383 6.51167 9.985 6.76583L9.9825 6.76833C9.74417 7.00667 9.38083 7.06583 9.07917 6.915L8.34583 6.54833C8.09 6.42 7.78083 6.47083 7.57833 6.6725L7.1375 7.11333C6.8775 7.37333 6.8775 7.79417 7.1375 8.05333L7.63083 8.54667C7.81417 8.73 8.06333 8.83333 8.3225 8.83333H9.515C9.8325 8.83333 10.1433 8.9225 10.4125 9.09083L12.5475 10.425C12.9967 10.7058 13.1675 11.2775 12.945 11.7592ZM16.27 10.7167C15.9933 10.5792 15.7908 10.3275 15.7158 10.0275L15.1933 7.93833C15.0792 7.48167 15.2817 7.00417 15.6892 6.76917L17.0083 6.00833C17.8433 7.30583 18.3333 8.84583 18.3333 10.5C18.3333 10.9067 18.2942 11.3025 18.2375 11.6933L16.27 10.7167Z" fill="#1D1E21" />
                  </g>
                  <defs>
                    <clipPath id="clip0_608_33800">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>

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
                          className={"is-invalid w-full"}
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
                              width: "100%",
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
              <div className="flex gap-4 items-center justify-between px-4 text-lg">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_608_33833)">
                    <path d="M10 0.5C4.48583 0.5 0 4.98583 0 10.5C0 16.0142 4.48583 20.5 10 20.5C15.5142 20.5 20 16.0142 20 10.5C20 4.98583 15.5142 0.5 10 0.5ZM10 18.8333C5.405 18.8333 1.66667 15.095 1.66667 10.5C1.66667 9.255 1.94167 8.07333 2.43333 7.01083L3.82167 8.47C4.0425 8.70167 4.34833 8.83333 4.66833 8.83333H6.2925C6.5325 8.83333 6.7625 8.92833 6.9325 9.09833L7.24333 9.40917C7.40833 9.57417 7.50083 9.7975 7.50083 10.03V10.8325C7.50083 11.1533 7.62833 11.46 7.855 11.6867L8.84667 12.6783C9.0525 12.8842 9.16833 13.1633 9.16833 13.4542V15.425C9.16833 15.9267 9.575 16.3333 10.0767 16.3333H10.2542C10.6083 16.3333 10.93 16.1275 11.0783 15.8058L12.9458 11.7592C13.1683 11.2775 12.9975 10.7067 12.5483 10.425L10.4133 9.09083C10.1442 8.9225 9.83333 8.83333 9.51583 8.83333H8.32333C8.06417 8.83333 7.815 8.73 7.63167 8.54667L7.13833 8.05333C6.87833 7.79333 6.87833 7.3725 7.13833 7.11333L7.57917 6.6725C7.78167 6.47 8.09083 6.42 8.34667 6.54833L9.08 6.915C9.38083 7.06583 9.745 7.00667 9.98333 6.76833L9.98583 6.76583C10.24 6.51167 10.2883 6.1175 10.1033 5.81L9.40583 4.64667C9.26 4.40333 9.26333 4.10167 9.4175 3.86333C9.66417 3.4825 10.0675 2.86167 10.5142 2.18333C13.2408 2.35 15.6183 3.83333 17.015 6.005L15.69 6.76917C15.2817 7.00417 15.0792 7.48167 15.1942 7.93833L15.7167 10.0275C15.7917 10.3275 15.9942 10.5792 16.2708 10.7167L18.2483 11.6983C17.6658 15.7275 14.1892 18.8333 10.0017 18.8333H10Z" fill="black" />
                  </g>
                  <defs>
                    <clipPath id="clip0_608_33833">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="grow">Pays de résidence</div>
              </div>{" "}
              <div className={`flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${errors.country ? 'border !border-red-500' : ''}`}>
                <div className="flex gap-5 justify-between px-4  w-full rounded-md">
                  <div className="flex gap-4 justify-between w-full">
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
              {errors.country && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </div>
              )}
            </div>
          </div>


          <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-base">

          <div className="lg:flex-1 w-full">
            <div className="flex gap-4 items-center px-4 text-lg text-zinc-900">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_608_33866)">
                  <path d="M15 5.5C15 2.7425 12.7575 0.5 10 0.5C7.2425 0.5 5 2.7425 5 5.5C5 7.9725 6.80583 10.0258 9.16667 10.425V20.5H10.8333V10.425C13.1942 10.0267 15 7.97333 15 5.5Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_608_33866">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>

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

          <div className="lg:flex-1 w-full">
  <div className="flex gap-4 items-center px-4 text-lg text-zinc-900">
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_608_33866)">
        <path d="M15 5.5C15 2.7425 12.7575 0.5 10 0.5C7.2425 0.5 5 2.7425 5 5.5C5 7.9725 6.80583 10.0258 9.16667 10.425V20.5H10.8333V10.425C13.1942 10.0267 15 7.97333 15 5.5Z" fill="black" />
      </g>
      <defs>
        <clipPath id="clip0_608_33866">
          <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>

    <div className="flex-auto">Langue</div>
  </div>{" "}
 
  {/* <Controller
  control={control}
  name="langueparlee"
  render={({ field }) => (
    <Select
      options={optionsLangue}
      isMulti
      value={selectedLanguages}
      {...register("langueparlee")}
      onChange={handleLanguageChange}
      className="w-full "
      placeholder="Langue parlée"
      {...field}
    />
  )}
/> */}
  <Controller
    control={control}
    name="langueparlee"
    render={({ field }) => (
      <Select
        options={optionsLangue}
        isMulti
        value={selectedLanguages}
        onChange={handleLanguageChange}
        className="w-full"
        placeholder="Langue parlée"
        {...field}
      />
    )}
  />

  
</div>

          </div>
        
        
        
        
        
        
        
        
          <div className="flex  justify-between py-2 mr-4 w-full text-base font-medium flex-nowrap">
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

export default Personal;
