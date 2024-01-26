import React, { Component, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../assets/Loggin.png";
import Logo from "../assets/logo.png";

function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({});
  const [profileError, setProfileError] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [validationError, setValidationError] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [skillsError, setSkillsError] = useState(false);
  const [coachSkillsError, setCoachSkillsError] = useState(false);

  const handleSkillToggle = (skill) => {
    let updatedSkills = formData.skillsInProfile.split(','); // Convert string to array
  
    if (updatedSkills.includes(skill)) {
      // Remove skill if already selected
      updatedSkills = updatedSkills.filter((s) => s !== skill);
    } else {
      // Add skill if not selected and the limit is not reached
      if (updatedSkills.length < 10) {
        updatedSkills.push(skill);
      }
    }
  
    setFormData({
      ...formData,
      skillsInProfile: updatedSkills.join(','), // Convert back to string
    });
    setSkillsError(updatedSkills.length >= 10);
  };
  
  

// Function to toggle coach skills
// Function to toggle coach skills
const handleCoachSkillToggle = (coachSkill) => {
  let updatedCoachSkills = formData.skills.split(',');

  if (updatedCoachSkills.includes(coachSkill)) {
    updatedCoachSkills = updatedCoachSkills.filter((s) => s !== coachSkill);
  } else {
    if (updatedCoachSkills.length < 10) {
      updatedCoachSkills.push(coachSkill);
    }
  }

  setFormData({
    ...formData,
    skills: updatedCoachSkills.join(','),
  });
  setCoachSkillsError(updatedCoachSkills.length >= 10 );
};


  
  
  
  
  
    
  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(formData.password);
  };
 
  
  const handleInputChange = (e) => {
    setValidationError(""); 

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "profil") {
      
      setProfileError(false);
    } else {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: undefined,
      });
    }
  };

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
    PiedFort: "",
    Licence: "",
    NumeroWhatsup: "",
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

  //   const handleInputChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleNextStep = () => {
    if (!isPasswordValid()) {
      setValidationError(
        "Password must be at least 8 characters long and include one uppercase letter and one special character"
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    const profileRoleMap = {
      player: "player",
      coach: "coach",
      agent: "agent",
      scout: "scout",
      advertise: "advertise",
    };

    const selectedProfile = formData.profil;
    const selectedRole = profileRoleMap[selectedProfile];

    // Check if all required fields are filled in
    const requiredFields = [
      "nom",
      "prenom",
      "date_naissance",
      "gender",
      "nationality",
      "countryresidence",
      "cityresidence",
      "tel",
      "email",
      "login",
      "profil",
      "password",
    ];
    const isProfileSelected = selectedProfile !== "";
    setProfileError(!isProfileSelected); // Set profile error state

    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );

    console.log("Selected Profile:", selectedProfile);
    console.log("Form Data:", formData);
    console.log("Are All Fields Filled:", areAllFieldsFilled);
    console.log("Is Profile Selected:", isProfileSelected);

    if (areAllFieldsFilled && isProfileSelected) {
      if (selectedProfile === "player" || selectedProfile === "coach" || selectedProfile === "agent" || selectedProfile ==="scout" || selectedProfile === "advertise"
      ) {
        setFormData({
          ...formData,
          roles: [selectedRole],
        });
        setStep(2); // Navigate to step 2 if the selected profile is "player"
      } else {
        setFormData({
          ...formData,
          roles: [selectedRole],
        });
        setStep(step + 1);
      }
    } else {
      // Set error messages for empty fields
      const errors = {};
      requiredFields.forEach((field) => {
        if (formData[field] === "") {
          errors[field] = "This field is required";
        }
      });
      setInputErrors(errors);

      // Alert the user or provide feedback that some fields are missing
      console.log("Please fill in all required fields.");
    }
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









  const getRequiredFields = (step) => {
    if (step === 2) {
      if (selectedProfile === "player") {
        return [
          "height",
          "weight",
          "PiedFort",
          "Licence",
          "NumeroWhatsup",
          "positionPlay",
          "positionSecond",
          // Add other required fields for player...
        ];
      } else if (selectedProfile === "coach") {
        return [
          "totalTeam",
          "countryCoachedIn",
          "skills",
          // Add other required fields for coach...
        ];
      }
    }
    return [];
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!"); // Add this line
   
    const selectedCoachSkills = formData.skills.split(',');

    if (selectedCoachSkills.length === 0) {
      setSkillsError(true);
      return;
    } else {
      setSkillsError(false);
    }
    if ( selectedSkills.length > 1) {
      console.log("Skills error detected");
    }
  
    // Validate other fields
    const requiredFields = getRequiredFields(step);
  
    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );
  
    if (areAllFieldsFilled) {
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
    } else {
      // Set error messages for empty fields
      const errors = {};
      requiredFields.forEach((field) => {
        if (formData[field] === "") {
          errors[field] = "This field is required";
        }
      });
      setInputErrors(errors);
      
      if (selectedCoachSkills.length === 0) {
        setSkillsError(true);
        return;
      } else {
        setSkillsError(false);
      }
      // Log the errors to the console
      console.log("Input Errors:", errors);
    }
    
  };
  
 

  return (
    <Fragment>
      <div className="main-wrap ">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <Link to="/">
              <img src={Logo} className="h-14 w-14 " />
              <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">
                ODIN E-SPORT{" "}
              </span>{" "}
            </Link>

            <button className="nav-menu me-0 ms-auto"></button>

            <a
              href="/login"
              className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
            >
              Se connecter

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
              <img
                src={Login}
                className="object-contain max-h-full "
                alt="Login Image"
              />
            </div>
          </div>
          <div className="col-xl-8 h-full  align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0  me-auto login-card">
              <div className="card-body rounded-0 text-left    ">
                <h2 className="text-center items-center text-3xl font-bold mt-6 ">
                 Creer un compte 
                </h2>
                <div className=" h-[680px] w-[700px] lg:mt-10 overflow-y-scroll overflow-x-hidden ">
                  <form className="xl:w-auto h-full  " onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="h-max w-full ">
                        <div className="row">
                          <label className="mb-2 text-2xl font-serif">
                           Choisir une Profile :
                          </label>
                          {[
                            "player",
                            "coach",
                            "agent",
                            "scout",
                            "advertise",
                          ].map((profile) => (
                            <div key={profile} className="col-6 col-md-2 mb-3">
                              <div className="form-check">
                                <input
                                  type="radio"
                                  id={profile}
                                  name="profil"
                                  value={profile}
                                  checked={selectedProfile === profile}
                                  onChange={() => {
                                    const selectedProfileValue = profile;
                                    console.log(
                                      "Selected Profile Value:",
                                      selectedProfileValue
                                    );
                                    setSelectedProfile(selectedProfileValue);
                                    handleInputChange({
                                      target: {
                                        name: "profil",
                                        value: selectedProfileValue,
                                      },
                                    });
                                  }}
                                  className="form-check-input"
                                />

                                <label
                                  htmlFor={profile}
                                  className="form-check-label"
                                >
                                  {profile.charAt(0).toUpperCase() +
                                    profile.slice(1)}
                                </label>
                              </div>
                            </div>
                          ))}

                          {console.log(profileError)}
                          {profileError && (
                            <div className="text-danger mt-2">
                              Please select a profile before proceeding.
                            </div>
                          )}
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
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["nom"] ? "is-invalid" : ""
                            }`}
                            placeholder="Your Name"
                          />
                          {inputErrors["nom"] && (
                            <div className="invalid-feedback">
                              {inputErrors["nom"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.prenom}
                            id="prenom"
                            name="prenom"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["prenom"] ? "is-invalid" : ""
                            }`}
                            placeholder="Your Prenom"
                            onChange={handleInputChange}
                          />
                          {inputErrors["prenom"] && (
                            <div className="invalid-feedback">
                              {inputErrors["prenom"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-email text-grey-500 pe-0"></i>
                          <input
                            type="email"
                            value={formData.email}
                            id="email"
                            name="email"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["email"] ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                            onChange={handleInputChange}
                          />
                          {inputErrors["email"] && (
                            <div className="invalid-feedback">
                              {inputErrors["email"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                          <input
                            type="password"
                            value={formData.password}
                            id="password"
                            name="password"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              validationError ? "is-invalid" : ""
                            }`}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          {validationError && (
                            <div className="invalid-feedback">
                              {validationError}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              validationError ? "is-invalid" : ""
                            }`}
                            placeholder="Confirm Password"
                            onChange={handleInputChange}
                          />
                          {validationError && (
                            <div className="invalid-feedback">
                              {validationError}
                            </div>
                          )}
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
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["gender"] ? "is-invalid" : ""
                            }`}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {inputErrors["gender"] && (
                            <div className="invalid-feedback">
                              {inputErrors["gender"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["nationality"] ? "is-invalid" : ""
                            }`}
                            placeholder="Nationality"
                            onChange={handleInputChange}
                          />
                          {inputErrors["nationality"] && (
                            <div className="invalid-feedback">
                              {inputErrors["nationality"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="countryresidence"
                            value={formData.countryresidence}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["countryresidence"]
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Country of Residence"
                            onChange={handleInputChange}
                          />
                          {inputErrors["countryresidence"] && (
                            <div className="invalid-feedback">
                              {inputErrors["countryresidence"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-location-pin text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="cityresidence"
                            value={formData.cityresidence}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["cityresidence"] ? "is-invalid" : ""
                            }`}
                            placeholder="City of Residence"
                            onChange={handleInputChange}
                          />
                          {inputErrors["cityresidence"] && (
                            <div className="invalid-feedback">
                              {inputErrors["cityresidence"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-mobile text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.tel}
                            id="tel"
                            name="tel"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["tel"] ? "is-invalid" : ""
                            }`}
                            placeholder="Phone Number"
                            onChange={handleInputChange}
                          />
                          {inputErrors["tel"] && (
                            <div className="invalid-feedback">
                              {inputErrors["tel"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.login}
                            id="login"
                            name="login"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["login"] ? "is-invalid" : ""
                            }`}
                            placeholder="Login"
                            onChange={handleInputChange}
                          />
                          {inputErrors["login"] && (
                            <div className="invalid-feedback">
                              {inputErrors["login"]}
                            </div>
                          )}
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
                          <div style={{ maxHeight: "1000px" }}>
                            <div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="height"
    name="height"
    value={formData.height}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["height"] ? "is-invalid" : ""
    }`}
    placeholder="Height"
    onChange={handleInputChange}
  />
  {inputErrors["height"] && (
    <div className="invalid-feedback">{inputErrors["height"]}</div>
  )}
</div>
<div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="weight"
    name="weight"
    value={formData.weight}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["weight"] ? "is-invalid" : ""
    }`}
    placeholder="Weight"
    onChange={handleInputChange}
  />
  {inputErrors["weight"] && (
    <div className="invalid-feedback">{inputErrors["weight"]}</div>
  )}
</div>

<div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="PiedFort"
    name="PiedFort"
    value={formData.PiedFort}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["PiedFort"] ? "is-invalid" : ""
    }`}
    placeholder="Pied Forte"
    onChange={handleInputChange}
  />
  {inputErrors["PiedFort"] && (
    <div className="invalid-feedback">{inputErrors["PiedFort"]}</div>
  )}
</div>

<div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="Licence"
    name="Licence"
    value={formData.Licence}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["Licence"] ? "is-invalid" : ""
    }`}
    placeholder="Licence"
    onChange={handleInputChange}
  />
  {inputErrors["Licence"] && (
    <div className="invalid-feedback">{inputErrors["Licence"]}</div>
  )}
</div>
<div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="NumeroWhatsup"
    name="NumeroWhatsup"
    value={formData.NumeroWhatsup}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["NumeroWhatsup"] ? "is-invalid" : ""
    }`}
    placeholder="Numero Whatsup"
    onChange={handleInputChange}
  />
  {inputErrors["NumeroWhatsup"] && (
    <div className="invalid-feedback">{inputErrors["NumeroWhatsup"]}</div>
  )}
</div>

<div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="positionPlay"
    name="positionPlay"
    value={formData.positionPlay}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["positionPlay"] ? "is-invalid" : ""
    }`}
    placeholder="Position Play"
    onChange={handleInputChange}
  />
  {inputErrors["positionPlay"] && (
    <div className="invalid-feedback">{inputErrors["positionPlay"]}</div>
  )}
</div>

<div className="form-group icon-input mb-3">
  <i className="font-sm ti-user text-grey-500 pe-0"></i>
  <input
    type="text"
    id="positionSecond"
    name="positionSecond"
    value={formData.positionSecond}
    className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
      inputErrors["positionSecond"] ? "is-invalid" : ""
    }`}
    placeholder="Position Second"
    onChange={handleInputChange}
  />
  {inputErrors["positionSecond"] && (
    <div className="invalid-feedback">{inputErrors["positionSecond"]}</div>
  )}
</div>

                            <div className="form-group icon-input mb-3">
  {[
    'Rapidite',
    'Tacle',
    'Defence',
    'Tirs de loin',
    'jeu en une touche',
    'Rapidite de la prise de désicion',
    'Frappe puissante',
    'Agilité',
    'Controller du Ballon',
    'Dribble',
    'Exploitation de l\'espace',
    'Evaluation des risques sur les terrain',
    'Endurance',
    'Equilibre et Coordination',
    'Auto-Motivation',
    // Add other skills...
  ].map((skillsInProfile) => (
  <div key={skillsInProfile} className="form-check form-check-inline me-2 mb-2">
    <input
      type="checkbox"
      id={skillsInProfile}
      name="skillsInProfile"
      checked={selectedSkills.includes(skillsInProfile)}
      onChange={() => handleSkillToggle(skillsInProfile)}
      className="form-check-input d-none"
    />
      <label
            htmlFor={skillsInProfile}
            className={`form-check-label btn ${
              formData.skillsInProfile.split(',').includes(skillsInProfile)
                ? 'btn-secondary' // Change this to the color you want after selecting
                : 'btn-light' // Change this to the color you want before selecting
            }`}
          >
      {skillsInProfile}
    </label>
  </div>
))}
  
</div>
{skillsError && (
    <div className="text-danger mt-2">
      Please select at least one skill (up to 10) before proceeding.
    </div>
  )}

                            <div
                              className="form-group mb-1"
                              style={{ display: "flex" }}
                            >
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



{formData.profil === "coach" && (
        <div>
          <div className="form-group icon-input mb-3">
            <i className="font-sm ti-user text-grey-500 pe-0"></i>
            <input
              type="text"
              id="totalTeam"
              name="totalTeam"
              value={formData.totalTeam}
              className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                inputErrors["totalTeam"] ? "is-invalid" : ""
              }`}
              placeholder="Total Team"
              onChange={handleInputChange}
            />
            {inputErrors["totalTeam"] && (
              <div className="invalid-feedback">{inputErrors["totalTeam"]}</div>
            )}
          </div>

          <div className="form-group icon-input mb-3">
            <i className="font-sm ti-user text-grey-500 pe-0"></i>
            <input
              type="text"
              id="countryCoachedIn"
              name="countryCoachedIn"
              value={formData.countryCoachedIn}
              className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                inputErrors["countryCoachedIn"] ? "is-invalid" : ""
              }`}
              placeholder="Country Coached In"
              onChange={handleInputChange}
            />
            {inputErrors["countryCoachedIn"] && (
              <div className="invalid-feedback">{inputErrors["countryCoachedIn"]}</div>
            )}
          </div>

          {/* <div className="form-group icon-input mb-3">
            <input
              type="text"
              id="skills"
              name="skills"
              
              className={` ${
                inputErrors["skills"] ? "is-invalid" : ""
              }`}
              onChange={handleInputChange}
            />
            {inputErrors["skills"] && (
              <div className="invalid-feedback">{inputErrors["skills"]}</div>
            )}
          </div> */}




       <div className="form-group icon-input mb-3">
       {[
  'Connaissance Tactique',
  'Competence Technique',
  'Leadership',
  'Communication',
  'Gestion de groupe',
  'Analyse',
  'Planification',
  'Adaptabilité',
  'Ethique',
  'Connaissance des regles',
  'Gestion de stress',
  'Developpement individuel',
  'Empathie',
  // Add other coach-specific skills...
].map((coachSkill) => (
  <div key={coachSkill} className="form-check form-check-inline me-2 mb-2">
    <input
      type="checkbox"
      id={coachSkill}
      name="coachSkillsInProfile"
      checked={formData.skills.split(',').includes(coachSkill)}
      onChange={() => handleCoachSkillToggle(coachSkill)}
      className="form-check-input d-none"
    />
    <label
      htmlFor={coachSkill}
      className={`form-check-label btn ${
        formData.skills.split(',').includes(coachSkill)
          ? 'btn-secondary'
          : 'btn-light'
      } ${!formData.skills.split(',').includes(coachSkill) && coachSkillsError ? 'border-danger' : ''}`}
    >
      {coachSkill}
    </label>
  </div>
))}


</div>
{!formData.skills.split(',').some(skill => skill.trim() !== '') && (
  <div className="text-danger mt-2">
    Please select at least one coach skill before proceeding (up to 10).
  </div>
)}






          <div className="form-group mb-1" style={{ display: "flex" }}>
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
