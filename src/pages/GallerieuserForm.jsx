import React, { useState, useEffect } from "react";
import Header from "../components/Header";
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';
import Pagetitle from "../components/Pagetitle";
// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';
import Load from "../components/Load";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Modal from "react-modal";
import SlideMenu from "../components/SlideMenu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Logo from "../assets/ODIN22.png";
import { paysAllInfo } from "../assets/data/Country";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { Config } from "../config";





const schema = yup.object().shape({
  passport: yup
    .string()
    .required("Ce Champs est obligatoire !"),
  date_validation: yup.string().when('passport', {
    is: 'Oui',  // Add the condition here
    then: () =>  yup.string().required("Ce Champs est obligatoire !"),
    otherwise: () => yup.string(), // Validation is skipped when passport is 'Non'
  }),
  fraisinscrit: yup.string().required("Veuillez confirmer votre engagement !"),
});




const Album = () => {
  const [isActive, setIsActive] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTermsLinkClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


const handelretourform = () => {
   
  navigate("/defaultgroup")

}

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUsers(userData);
          console.log(users);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/albumc`);
        const result = await response.json();

        setAlbum(result.data);

        console.log(album);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchAlbums();
  }, []);

  const matchingCountry = paysAllInfo.find(
    (country) => country.nationalite === users?.user?.nationality
  );

  const matchingCountryPays = paysAllInfo.find(
    (country) => country.name === users?.user?.countryresidence
  );







  const [errors, setErrors] = useState({});

  const validateField = async (name, value) => {
    try {
      // Only validate date_validation if passport is set to "Oui"
      if (name === "date_validation" && formData.passport === "Non") {
        setErrors((prevErrors) => ({ ...prevErrors, date_validation: null }));
      } else {
        await schema.validateAt(name, { [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };
  










  const [formData, setFormData] = useState({
    emailsecondaire: "",
    passport: "",
    date_validation: "",
    fraisinscrit: "",
    status: "Encours",
    champsoptionnel: "",
    campsId: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };


  

 
  const handleSubmit = async () => {
    try {
    
    
    
      // Validate form data
      schema.validate(formData, { abortEarly: false }).then(() => {
        // If validation passes, proceed with form submission
  
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        const userId = storedUserData ? storedUserData.id : null;
        const campsId = id;
  
        fetch(`${Config.LOCAL_URL}/api/inscrit/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailsecondaire: formData.emailsecondaire,
            passport: formData.passport,
            date_validation: formData.date_validation,
            fraisinscrit: formData.fraisinscrit,
            status: formData.status,
            champsoptionnel: formData.champsoptionnel,
            campsId: campsId,
            userId: userId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
  
            // Reset form data after successful submission
            setFormData({
              emailsecondaire: "",
              passport: "",
              date_validation: "",
              fraisinscrit: "",
              status: "",
              champsoptionnel: "",
              campsId: "",
              userId: "",
            });




            navigate(`/thanks/${id}`);
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
        }).catch((validationErrors) => {
          // Handle validation errors
          const newErrors = {};
        
          if (validationErrors.inner && Array.isArray(validationErrors.inner)) {
            validationErrors.inner.forEach((error) => {
              newErrors[error.path] = error.message;
            });
          } else {
            // Handle the case where validationErrors.inner is not as expected
            console.error("Unexpected validationErrors structure:", validationErrors);
            // You might want to set a generic error message or handle this case differently
          }
        
          setErrors(newErrors);
        });
    
    
    
    
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <>
      <div className="nav-header bg-white shadow-xs border-0">
        <div className=" flex justify-between items-center w-full">
          <Link to="/home">
            <img src={Logo} className="ml-3 h-28 w-28 " />
            <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">
              {" "}
            </span>{" "}
          </Link>
        </div>
        <SlideMenu setIsActive={setIsActive} />
      </div>

      <div className="flex flex-col pt-8 mt-14 bg-white rounded-xl  max-md:my-10 max-md:max-w-full">
        <div className=" mt-20 md:text-5xl    w-full text-2xl text-center font-bold text-black max-md:max-w-full">
          Pré-inscription
        </div>
        <div className="flex flex-col flex-wrap gap-y-8 justify-between content-start px-20 py-8 mt-6 max-md:px-5 max-md:max-w-full">
          <div className="max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                  <div className="flex gap-4 justify-between px-4 text-lg">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/59df83238ff310e910628d8bd3168c058bfa88fb66b3c5c55211fd65db4a7a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="my-auto aspect-[0.75] w-[15px]"
                    />
                    <div className="grow">Nom</div>
                  </div>
                  <input
                    value={users?.user?.nom}
                    disabled
                    type="text"
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                  <div className="flex gap-4 justify-between px-4 text-lg">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b6804daf216040b510e3588d74469399244a1b90572a01c90b865359dc5ac0?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="my-auto aspect-[0.75] w-[15px]"
                    />
                    <div className="grow">Prénom</div>
                  </div>
                  <input
                    value={users?.user?.prenom}
                    disabled
                    type="text"
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                  <div className="flex gap-4 justify-between px-4 text-lg">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/60a94d426897782b7365b8c8850daade691e593a3866944a1df0ca4473099960?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="my-auto w-5 aspect-square"
                    />
                    <div className="grow">Année de naissance</div>
                  </div>
                  <input
                    value={users?.user?.date_naissance}
                    disabled
                    type="text"
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5"
                  />

                  <div className="self-center mt-2 text-zinc-800">
                    Vous devez avoir au moins 13 ans.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-8 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ecca3927dfc3bd6c59dddb415b118548d59fe896ac45d6ba08dcf9dbb25cc49?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">Sexe</div>
              </div>

              <input
                className="flex flex-col justify-center px-4 py-3.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]"
                type="text"
                disabled
                value={users?.user?.gender}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/092f94cce37a29c49e173094ae8127519c329952195acf18c964dff918bd9544?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">Nationalité</div>
              </div>
              <div className="flex flex-col justify-center py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                <div className="flex gap-5 justify-between px-4 py-2 w-full rounded-md">
                  <div className="flex gap-4 justify-between">
                    {/* <div className="flex-auto">Tunisienne</div> */}

                    {matchingCountry && matchingCountry.iso && (
                      <div>
                        <span
                          className={`flag-icon flag-icon-${matchingCountry.iso[
                            "alpha-2"
                          ].toLowerCase()}`}
                          style={{
                            marginRight: "8px",
                            height: "20px",
                            width: "50px",
                          }}
                        ></span>
                        {matchingCountry.nationalite}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/657b7b4e3e42d05cbea3c45510522b76cf86b06b0a1d47ec41abf0a57ff40cdd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">Pays de résidence</div>
              </div>
              <div className="flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                <div className="flex gap-5 justify-between px-4 py-2 w-full rounded-md">
                  <div className="flex gap-4 justify-between">
                    {matchingCountryPays && matchingCountryPays.iso && (
                      <div>
                        <span
                          className={`flag-icon flag-icon-${matchingCountryPays.iso[
                            "alpha-2"
                          ].toLowerCase()}`}
                          style={{
                            marginRight: "8px",
                            height: "20px",
                            width: "50px",
                          }}
                        ></span>
                        {matchingCountryPays.countryresidence}
                      </div>
                    )}{" "}
                    {users?.user?.countryresidence}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-8 text-zinc-900 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/be4ad2608224289b1e42bc2da7f2cc573989cbb43db9b54c7ae9749f3309ff69?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="flex-auto">Ville de résidence</div>
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                {users?.user?.cityresidence}
              </div>
            </div>
            <div className="flex flex-col flex-1 mt-1 whitespace-nowrap">
              <div className="flex gap-4 px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/84ca92032564e90dd6df0c0ed8bb0f3f4a94a871fdc2b5d33d592d1bfc078fd3?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto aspect-[1.05] w-[21px]"
                />
                <div className="grow">Email</div>
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-1 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                {users?.user?.email}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-2 ml-6 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc00c5eaa5821ce5ae54c0d94595d6f32479f2489001ac728b02aebe3f1e1e68?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto aspect-[1.1] w-[22px]"
                />
                <div className="flex-auto">Email Secondaire (Facultative)</div>
              </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                <input
                  type="text"
                  name="emailsecondaire"
                  placeholder="Exemple jhon@gmail.com"
                  value={formData.emailsecondaire}
                  onChange={handleChange}
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between items-start mt-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-stretch text-zinc-900">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/77e0a9d5a9615e1a8589a669ca89cdae1507fb53a73dae9ebb1ad43aaa156c03?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="w-6 aspect-square"
                />
                <div className="grow">N° Whatsapp</div>
              </div>
              <div className="flex gap-4 justify-between mt-2 text-base">
                <div className="grow justify-center items-start py-3.5 pr-16 pl-4 border border-solid border-neutral-200 rounded-[30px] max-md:pr-5">
                  {users?.user?.numWSup}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 text-zinc-900">
              <div className="flex gap-4 justify-between px-4 text-lg">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bf2ef649448b0d66ed482eea95f865c88a2d95fa6ccdf076dec39eb896daea2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">Avez-vous un Passport ?</div>
              </div>
              <div className="flex flex-col justify-center py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                <div htmlFor="passport" className="flex gap-5 justify-between px-4 py-2 rounded-md">
                  <select
                    name="passport"
                    value={formData.passport}
                    onChange={handleChange}
                    className="w-full"
                  >
                    <option>Oui / Non</option>
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </div>
              </div>  <p className="text-red text-md">{errors.passport}</p>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-4 justify-between px-4 text-lg text-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d25aba1d49146125c002c91e072e49db818d43215feceb4a7555ff8fa612d13d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="my-auto w-5 aspect-square"
                />
                <div className="grow">Date d’expiration</div>
              </div>
                  <DatePicker
                   selected={formData.date_validation}
                   onChange={(date) => setFormData({ ...formData, date_validation: date })}
                   dateFormat="yyyy-MM-dd"

                    className="flex flex-col justify-center px-2 py-3.5 mt-2 w-full text-base border-solid  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-neutral-500"
                  />
            <p className="text-red text-md">{errors.date_validation}</p>
            </div>
          </div>
          <div className="self-start mt-10 text-xl text-zinc-900 max-md:max-w-full">
            Je confirme que je peux payer les{" "}
            <span className="font-bold">frais de participation</span> de ce
            camp.
            <div className="flex gap-5 justify-between self-start mt-2 text-lg leading-7 whitespace-nowrap text-zinc-900 max-md:ml-2">
            <label htmlFor="fraisinscrit">
              <div>
                <label>
                  <input
                    type="radio"
                    name="fraisinscrit"
                    value="Oui"
                    className="mr-3"
                    checked={formData.fraisinscrit === "Oui"}
                    onChange={handleChange}
                  />
                  Oui , je confirme
                </label>
                <label>
                  <input
                    type="radio"
                    name="fraisinscrit"
                    value="Non"
                    className=" ml-4 mr-3"

                    checked={formData.fraisinscrit === "Non"}
                    onChange={handleChange}
                  />
                  Non
                </label>
              </div>

            </label>        

          </div>
          <p className="text-red text-base">{errors.fraisinscrit}</p>
          </div>

       

          <div className="flex gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/782d8b9c4e26c6ae2faa75f1bad14c148b0b27ad2722daea1be1e990d6d99625?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="my-auto aspect-square fill-white w-[15px]"
              />
             <button onClick={handelretourform} className="grow">Annuler</button>
            </div>
            <div className="flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
              <div className="grow" onClick={handleSubmit}>
                Confirmer
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/baaf729ca2403013e4685351338f1da226bf86e312b0177a0235a267f7f3c2f3?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="w-5 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Album;
