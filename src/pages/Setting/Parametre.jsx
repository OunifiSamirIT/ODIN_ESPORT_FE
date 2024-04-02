import React, { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Config } from "../../config";

















const Parametre = ({ userInfo }) => {

  const ref = useRef(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [step1, setStep1] = useState(false)
  const [step0, setStep0] = useState(true)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const schema = yup
    .object({
      password: yup.string().required('Le mot de passe est requis')
        .min(8, 'Le mot de passe doit contenir au moins 6 caractères')
        .matches(
          /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!$@%]).*$/,
          'Le mot de passe doit contenir une combinaison de chiffres, de lettres et de caractères spéciaux ( !$@%)'
        ),
      newpassword: yup.string().required('Le mot de passe est requis')
        .min(8, 'Le mot de passe doit contenir au moins 6 caractères')
        .notOneOf([yup.ref('password'), null], 'Le nouveau mot de passe ne doit pas être identique à l\'ancien mot de passe')
        .matches(
          /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!$@%]).*$/,
          'Le mot de passe doit contenir une combinaison de chiffres, de lettres et de caractères spéciaux ( !$@%)'
        ),
      confirmpassword: yup.string()
        .required('La confirmation du mot de passe est requise')
        .oneOf([yup.ref('newpassword'), null], 'Les mots de passe doivent correspondre')
        .min(8, 'Le mot de passe de confirmation doit contenir au moins 6 caractères')
        .matches(
          /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!$@%]).*$/,
          'Le mot de passe de confirmation doit contenir une combinaison de chiffres, de lettres et de caractères spéciaux ( !$@%)'
        ),
    })

  const navigate = useNavigate();
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

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log(!ref.current.contains(event.target))
      setIsPasswordOpen(false)
      handleClose()
    }
  };
  const handleClose = () => {
    setStep0(false)
    setIsEmailOpen(false)
    setStep1(false)
    setStep2(false)
    setStep3(false)
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = async (data) => {
    const formDataToUpdate = new FormData();
    formDataToUpdate.append("password", data.newpassword);
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${storedUserData.id}`,
      {
        method: "PUT",
        body: formDataToUpdate,
      }
    ).then((r) => {
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
        setTimeout(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/login");
        }, 1000);
      }
    })
  }









  return (
    <>
      <div>
        <ToastContainer />
      </div>
      {
        isPasswordOpen && <div className="bg-black/70  fixed inset-0  z-50 h-full w-full  overflow-hidden flex justify-center items-center px-8 ">
          <div ref={ref} className="flex flex-col p-8 max-w-full bg-white rounded-[10px] w-[625px] max-md:px-5 max-md:my-10">

            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                Changement de mot de passe
              </div>
              <div className="mt-2 text-zinc-900 max-md:max-w-full">
                Votre mot de passe doit contenir au moins 6 caractères ainsi qu’une
                combinaison de chiffres, de lettres et de caractères spéciaux ( !$@%).
              </div>
              <div className="flex gap-4 px-6 mt-6 text-lg text-zinc-900 max-md:flex-wrap max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9b83235dcf72c09520e36abb0c835a12fcc97fd51d2b5644ab1be7e8f2d9094?"
                  className="shrink-0 my-auto w-5 aspect-square"
                />
                <div className="flex-auto max-md:max-w-full">Mot de passe actuel</div>
              </div>
              <div className="w-full  flex-col flex items-center">
                <input  {...register('password')} name='password' className={`form-control flex grow px-5 py-3.5 w-full flex-col justify-center mt-2 whitespace-nowrap border border-solid border-neutral-200 rounded-[30px] text-zinc-900 max-md:max-w-full ${errors.password ? 'is-invalid !border-red-500' : ''}`} type="password" placeholder="*********" />
                {errors.password && <span className="invalid-feedback block py-2 px-2">{errors.password?.message}</span>}

              </div>
              <div className="flex gap-4 px-6 mt-4 text-lg text-zinc-900 max-md:flex-wrap max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4ef12c3e38e0a77c5f6e8cccfe0418318f174e33bd12b20ae49840d8c06c3ad?"
                  className="shrink-0 my-auto w-5 aspect-square"
                />
                <div className="flex-auto max-md:max-w-full">Nouveau mot de passe</div>
              </div>
              <div className="w-full flex flex-col items-center">
                <input {...register('newpassword')} name='newpassword' className={`form-control flex grow px-5 py-3.5 w-full flex-col justify-center mt-2 whitespace-nowrap border border-solid border-neutral-200 rounded-[30px] text-zinc-900 max-md:max-w-full ${errors.newpassword ? 'is-invalid !border-red-500' : ''}`} type="password" placeholder="*********" />
                {errors.newpassword && <span className="invalid-feedback block py-2 px-2">{errors.newpassword?.message}</span>}
              </div>
              <div className="flex gap-4 px-6 mt-4 text-lg text-zinc-900 max-md:flex-wrap max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe35aa59581d36ea9dce93bcb749cbda2c7b4843c8ff4666dfaaf55be426a279?"
                  className="shrink-0 my-auto w-5 aspect-square"
                />
                <div className="flex-auto max-md:max-w-full">
                  Confirmer le mot de passe
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <input {...register('confirmpassword')} name='confirmpassword' className={`form-control flex grow px-5 py-3.5 w-full flex-col justify-center mt-2 whitespace-nowrap border border-solid border-neutral-200 rounded-[30px] text-zinc-900 max-md:max-w-full ${errors.confirmpassword ? 'is-invalid !border-red-500' : ''}`} type="password" placeholder="*********" />
                {errors.confirmpassword && <span className="invalid-feedback block py-2 px-2">{errors.confirmpassword?.message}</span>}
              </div>
              <div className="flex gap-5 justify-between mt-4 w-full font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <button onClick={() => setIsPasswordOpen(false)} className="flex flex-1 gap-2 justify-center px-8 py-2 text-orange-500 border-2 border-orange-500 border-solid rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/36783b2bbc0c4d8acd402a87827fbf522d3e413b9d2fd96d908a05709d3b2242?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="">Annuler</div>
                </button>
                <button className="flex flex-1 gap-2 justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/534a656afb5625680d54ff4ea52bbe985ada0762ba3c4cc382181406f743d9e8?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="">Confirmer</div>
                </button>
              </div>
            </form>

          </div>
        </div>
      }






      {
        isEmailOpen &&
        <div  className="bg-black/70  fixed inset-0  z-50 h-full w-full  overflow-hidden flex justify-center items-center px-8 ">
          {step0 &&
            <div  ref={ref} className="flex flex-col px-8 py-7 mt-64 mb-48 max-w-full bg-white rounded-[10px] w-[625px] max-md:px-5 max-md:my-10">
              <div className="flex gap-5 justify-between py-2 max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2628356ecf0e05ecac3a574eb1bba236f2bd8863ed95221e05661bac9af47567?"
                  className="shrink-0 w-2.5 aspect-[0.5] fill-zinc-900"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b39555239103cf52c04ccf5d99c736c1ee6f0f4ae8acc93f658d16db3f422a5b?"
                  className="shrink-0 w-5 aspect-square fill-black"
                />
              </div>
              <div className="mt-4 text-3xl font-bold text-zinc-900 max-md:max-w-full">
                Gérer vos adresses e-mails
              </div>
              <div className="flex gap-5 justify-between px-6 py-2 mt-5 w-full text-lg whitespace-nowrap rounded-xl border-blue-600 border-solid border-[0.7px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <div className="flex gap-4 justify-center py-1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e09570032be593cf08aab5625d1e2fef5e61923ca471c998e3ecb03def59297e?"
                    className="shrink-0 my-auto w-5 aspect-[1.05]"
                  />
                  <div className="grow bg-clip-text bg-[linear-gradient(90deg,#2E71EB_0%,#10419B_100%)]">
                    {userInfo.user.email}
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e2d76b3d42c4bbd38f7afc1d9cbd1370d5053303cca003f8fbc20a511889bac?"
                  className="shrink-0 my-auto w-2.5 aspect-[0.5] fill-[linear-gradient(90deg,#2E71EB_0%,#10419B_100%)]"
                />
              </div>
              <button onClick={() => { setStep1(true); setStep0(false) }} className="justify-center text-center items-center px-16 py-2 mt-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full">
                Ajouter une nouvelle adresse e-mail
              </button>
            </div>}
          {step1 &&

            <div  ref={ref} className="flex flex-col p-8 mt-72 mb-56 max-w-full bg-white rounded-xl w-[625px] max-md:px-5 max-md:my-10">
              <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                Ajouter un e-mail
              </div>
              <div className="flex gap-4 px-6 mt-6 text-lg text-zinc-900 max-md:flex-wrap max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c858a82cf16a859a744a1d83f6e54d82120e6304f01ab0888fde057abc7b068?"
                  className="shrink-0 my-auto aspect-[1.1] w-[22px]"
                />
                <div className="flex-auto max-md:max-w-full">Nouveau Email</div>
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 whitespace-nowrap border border-solid border-neutral-200 rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full">
                johndoe@gmail.com
              </div>
              <div className="flex gap-5 justify-between mt-4 w-full font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <button onClick={handleClose} className="flex flex-1 gap-2 justify-center px-8 py-2 text-orange-500 border-2 border-orange-500 border-solid rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a16a87d6940e2db9a1e70f4606483f083c35a35f113608fd1077bbd3df410fe5?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="grow">Annuler</div>
                </button>
                <div onClick={() => { setStep2(true); setStep1(false) }} className="flex flex-1 gap-2 justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f5c3f587bdfa0c06dddee1e4ab1580b5c0bfd515433ac8e505193f72fb13b8?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="grow">Confirmer</div>
                </div>
              </div>
            </div>}
          {
            step2 &&
            <div  ref={ref} className="flex flex-col p-8 mt-72 mb-56 max-w-full bg-white rounded-xl w-[625px] max-md:px-5 max-md:my-10">
              <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                Saisir votre mot de passe
              </div>
              <div className="flex gap-4 px-6 mt-6 text-lg text-zinc-900 max-md:flex-wrap max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/784e4a785eb762c3295ee4d39b8d1601afb74fa467574753ca93ac06f38301a9?"
                  className="shrink-0 my-auto w-5 aspect-square"
                />
                <div className="flex-auto max-md:max-w-full">Mot de passe</div>
              </div>
              <div className="flex flex-col justify-center mt-2 whitespace-nowrap border border-solid border-neutral-200 rounded-[30px] text-zinc-900 max-md:max-w-full">
                <div className="flex gap-5 justify-between px-5 py-3.5 rounded-md max-md:flex-wrap max-md:max-w-full">
                  <div className="flex-auto">**********************</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/78b2058ec1f4240105889922e6a0c34a3e41d160744081eef455832875c9eabf?"
                    className="shrink-0 my-auto w-4 aspect-square"
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-4 w-full font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <button onClick={handleClose} className="flex flex-1 gap-2 justify-center px-8 py-2 text-orange-500 border-2 border-orange-500 border-solid rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/029dbea0684be609a614a7fd509f212d0a9aa9110c49439e3d43764db16e2c25?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="grow">Annuler</div>
                </button>
                <button onClick={() => { setStep3(true); setStep2(false) }} className="flex flex-1 gap-2 justify-center px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/448bf14bfc599fa4746059e1744892548705d521caf33cc64e777d47b39b61e4?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="grow">Confirmer</div>
                </button>
              </div>
            </div>
          }

          {step3 &&
            <div  ref={ref} className="flex justify-center flex-col p-8  max-w-full bg-white rounded-[10px] w-[564px] max-md:px-5 max-md:my-10">
              <div className="flex justify-end">
                <img
                  onClick={handleClose}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b39555239103cf52c04ccf5d99c736c1ee6f0f4ae8acc93f658d16db3f422a5b?"
                  className=" w-5 aspect-square fill-black"
                />
              </div>

              <div className="flex flex-col items-center justify-center items-end max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d98118b4df8a973379a706d6e4ff7822cbe7273b3d4feb57e98b4b724b533770?"
                  className="self-center mt-4 w-10 aspect-square"
                />
              </div>

              <div className="self-center mt-6 text-3xl font-bold whitespace-nowrap text-zinc-900">
                Email envoyé
              </div>
              <div className="mt-4 text-2xl text-center text-zinc-900 max-md:max-w-full">
                Vérifiez votre e-mail et ouvrez le lien que nous vous avons envoyé pour
                finaliser la réinitialisation de votre mot de passe.
              </div>
            </div>}
        </div>
      }

      <div className="flex flex-col px-8 py-9 text-lg bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:max-w-full w-full">
        <div className="flex gap-4 self-start px-4 whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0f2ace319a8a40362513aebe5b9d3895ee695350e8c08fdf2d1f81c2a6111bf?"
            className="my-auto aspect-[1.1] w-[22px]"
          />
          <div className="grow">Email Principale</div>
        </div>
        <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border border-solid bg-zinc-100 border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 max-md:max-w-full">
          {userInfo?.user.email}
        </div>
        <div className="flex gap-4 justify-between px-4 mt-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/948c756af05f9aea12c0006315a48a0862850f46651f81448082c23d1eb93da2?"
            className="my-auto aspect-[1.1] w-[22px]"
          />
          <div className="grow max-md:max-w-full">Email</div>
        </div>
        <button onClick={() => {setIsEmailOpen(true) ; setStep0(true)}} className="justify-center text-center items-center px-16 py-2 mt-2 text-base font-medium text-blue-600 whitespace-nowrap bg-white border border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5 max-md:max-w-full">
          Ajouter un autre email
        </button>
        <div className="flex gap-4 justify-between px-4 mt-6 max-md:flex-wrap max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a85b62b66ecf00095664baf16a200ba7858326683afa2b2f6a03ae7601c2701?"
            className="my-auto w-5 aspect-square"
          />
          <div className="grow max-md:max-w-full">Mot de passe</div>
        </div>
        <button onClick={() => setIsPasswordOpen(true)} className="justify-center text-center items-center px-16 py-2 mt-2 text-base font-medium text-blue-600 whitespace-nowrap bg-white border border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5 max-md:max-w-full">
          Changer votre mot de passe
        </button>
      </div>
    </>
  )
}

export default Parametre