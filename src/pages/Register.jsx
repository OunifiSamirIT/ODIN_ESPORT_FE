import React, { Component, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../assets/Loggin.png"
import Logo from '../assets/logo.png'

function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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
    // Additional fields for coach
    totalTeam: "",
    countryCoachedIn: "",
    skills: "",
    // Additional fields for agent
    totalCareerTransfers: "",
    clubCovered: "",
    totalPlayer: "",
    typeresponsable: "",
    roles: [],
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    const profileRoleMap = {
      player: "player",
      coach: "coach",
      agent: "agent",
      scout: "scout",
      advertise: "advertise",
    };
  
    const selectedProfile = formData.profil;
    const selectedRole = profileRoleMap[selectedProfile];
  
    setFormData({
      ...formData,
      roles: [selectedRole], 
    });
  
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleRoleChange = (selectedRoles) => {
    setFormData({
      ...formData,
      roles: selectedRoles,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data

    try {
      const response = await fetch("http://localhost:8088/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully!");
        navigate("/login");
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Fragment>
      <div className="main-wrap ">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
              <Link to="/"><img src={Logo} className='h-14 w-14 '/><span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">ODIN E-SPORT </span> </Link>

            <button className="nav-menu me-0 ms-auto"></button>

            <a
              href="/login"
              className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
            >
              Login
            </a>
            <a
              href="/register"
              className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
            >
              Register
            </a>
          </div>
        </div>

        <div className="row ">
        <div className="col-xl-4 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat">
    <div className="h-full flex items-center justify-center mt-14 ml-10">
      <img src={Login} className="object-contain max-h-full " alt="Login Image" />
    </div>
  </div>
          <div className="col-xl-8 h-full  align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0  me-auto login-card">
              <div className="card-body rounded-0 text-left    ">
                <h2 className="text-center items-center text-3xl font-bold mt-6 ">
                  Create your account
                </h2>
                <div className=" h-[680px] w-[700px] lg:mt-10 overflow-y-scroll overflow-x-hidden ">
                  <form
                    className="xl:w-auto h-full  "
                    onSubmit={handleSubmit}
                  >
                    {step === 1 && (
                      <div className="h-max w-full ">
                        <div className="row">
                        <label className="mb-2 text-2xl font-serif">Please Select Your Profil:</label>

                          <div className="col-7 col-md-2 mb-3">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="player"
                                name="profile"
                                value="player"
                                checked={formData.profil === "player"}
                                onChange={() =>
                                  setFormData({ ...formData, profil: "player" })
                                }
                                className="form-check-input"
                              />
                              <label
                                htmlFor="player"
                                className="form-check-label"
                              >
                                Player
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-md-2 mb-3">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="coach"
                                name="profile"
                                value="coach"
                                checked={formData.profil === "coach"}
                                onChange={() =>
                                  setFormData({ ...formData, profil: "coach" })
                                }
                                className="form-check-input"
                              />
                              <label
                                htmlFor="coach"
                                className="form-check-label"
                              >
                                Coach
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-md-2 mb-3">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="agent"
                                name="profile"
                                value="agent"
                                checked={formData.profil === "agent"}
                                onChange={() =>
                                  setFormData({ ...formData, profil: "agent" })
                                }
                                className="form-check-input"
                              />
                              <label
                                htmlFor="agent"
                                className="form-check-label"
                              >
                                Agent
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-md-2 mb-3">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="scout"
                                name="profile"
                                value="scout"
                                checked={formData.profil === "scout"}
                                onChange={() =>
                                  setFormData({ ...formData, profil: "scout" })
                                }
                                className="form-check-input"
                              />
                              <label
                                htmlFor="scout"
                                className="form-check-label"
                              >
                                Scout
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-md-3 mb-3">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="advertise"
                                name="profile"
                                value="advertise"
                                checked={formData.profil === "advertise"}
                                onChange={() =>
                                  setFormData({
                                    ...formData,
                                    profil: "advertise",
                                  })
                                }
                                className="form-check-input"
                              />
                              <label
                                htmlFor="advertise"
                                className="form-check-label"
                              >
                                Advertise
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                        <input
                          type="text"
                          className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="Profil"
                        />
                      </div> */}

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>

                          <input
                            type="text"
                            value={formData.prenom}
                            id="prenom"
                            name="prenom"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Your Prenom"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-email text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.email}
                            id="email"
                            name="email"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Email"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <input
                            type="password"
                            value={formData.password}
                            id="password"
                            name="password"
                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                        </div>
                        <div className="form-group icon-input mb-1">
                          <input
                            type="password"
                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                            placeholder="Confirm Password"
                          />
                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                        </div>

                        {/* Additional form fields */}

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-calendar text-grey-500 pe-0"></i>
                          <input
                            type="date"
                            value={formData.date_naissance}
                            name="date_naissance"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Date of Birth"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>

                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Nationality"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="countryresidence"
                            value={formData.countryresidence}
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Country of Residence"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-location-pin text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="cityresidence"
                            value={formData.cityresidence}
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="City of Residence"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-mobile text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.tel}
                            id="tel"
                            name="tel"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Phone Number"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.login}
                            id="login"
                            name="login"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Login"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group mb-1">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="form-control flex  items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        {formData.profil === "player" && (
                          <div
                            style={{ maxHeight: "300px", overflowY: "auto" }}
                          >
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="height"
                                name="height"
                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                placeholder="Height"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                placeholder="Weight"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="strongSkill"
                                name="strongSkill"
                                value={formData.strongSkill}
                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                placeholder="Strong Skill"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="positionPlay"
                                name="positionPlay"
                                value={formData.positionPlay}
                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                placeholder="Position Play"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="positionSecond"
                                name="positionSecond"
                                value={formData.positionSecond}
                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                placeholder="Position Second"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="skillsInProfile"
                                name="skillsInProfile"
                                value={formData.skillsInProfile}
                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                placeholder="Skills in Profile"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group mb-1">
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="form-check text-left mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input mt-2"
                            id="exampleCheck2"
                          />
                          <label className="form-check-label font-xsss text-grey-500">
                            Accept Term and Conditions
                          </label>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                <div className="col-sm-12 p-0 text-left">
                  {/* <div className="form-group mb-1"><a href="/register" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Register</a></div> */}
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Already have account{" "}
                    <a href="/login" className="fw-700 ms-1">
                      Login
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
