import React, { Component, Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

function Account() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(formData.password);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setValidationError("");
    setIsModalOpen(false);
  };

  const handleNextStep = () => {
    if (!isPasswordValid()) {
      setValidationError(
        "Password must be at least 8 characters long and include one uppercase letter and one special character"
      );
      openModal();
      return;
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    strongSkill: "",
    positionPlay: "",
    positionSecond: "",
    skillsInProfile: "",
  });
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
    // Update formData to include the selected image
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const [userInfo, setUserInfo] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const id = storedUserData.id;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/user/${id}`);
        const data = await response.json();
        setUserInfo(data);
        console.log("eeeeeeeeeeeeeee", userInfo);
        setFormData({
          nom: data.nom || "",
          prenom: data.prenom || "",
          date_naissance: data.date_naissance || "",
          gender: data.gender || "",
          nationality: data.nationality || "",
          countryresidence: data.countryresidence || "",
          cityresidence: data.cityresidence || "",
          tel: data.tel || "",
          login: data.login || "",
          profil: data.profil || "",
          password: "",

          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [id]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password.length < 8) {
  //     setValidationError("Password must be at least 8 characters long.");
  //     // setIsModalOpen(true);
  //     return; // Don't proceed with the form submission
  //   }
  //   try {
  //     // Update user information

  //     const formDataWithImage = new FormData();
  // Object.entries(formData).forEach(([key, value]) => {
  //   formDataWithImage.append(key, value);
  // });
  // formDataWithImage.append("image", picture);

  //     const userResponse = await fetch(`http://localhost:8088/api/user/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: formDataWithImage,
  //     });

  //     if (!userResponse.ok) {
  //       console.error("User update failed.");
  //       // Handle the failure case for user update
  //       return;
  //     }

  //     // Update player information
  //     const playerResponse = await fetch(
  //       `http://localhost:8088/api/player/${id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           height: formData.height,
  //           weight: formData.weight,
  //           strongSkill: formData.strongSkill,
  //           positionPlay: formData.positionPlay,
  //           positionSecond: formData.positionSecond,
  //           skillsInProfile: formData.skillsInProfile,
  //           // Add other player fields as needed
  //         }),
  //       }
  //     );

  //     if (playerResponse.ok) {
  //       console.log("User and player information updated successfully!");
  //       navigate("/");
  //     } else {
  //       console.error("Update failed.");
  //       // Handle other error cases
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     // Handle the error case, e.g., show an error message
  //   }
  // };
 
 
  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };
 
  const handleUserUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    try {
      // Check if required fields are filled
      if (!formData.nom || !formData.prenom || !formData.tel) {
        setErrMsg({ status: "failed", message: "Fill all the required information" });
        return;
      }
  
      const formDataToUpdate = new FormData();
      formDataToUpdate.append("nom", formData.nom);
      formDataToUpdate.append("prenom", formData.prenom);
      formDataToUpdate.append("date_naissance", formData.date_naissance || "");
      formDataToUpdate.append("gender", formData.gender || "");
      formDataToUpdate.append("nationality", formData.nationality || "");
      formDataToUpdate.append("countryresidence", formData.countryresidence || "");
      formDataToUpdate.append("cityresidence", formData.cityresidence || "");
      formDataToUpdate.append("tel", formData.tel);
      formDataToUpdate.append("login", formData.login);
      formDataToUpdate.append("password", formData.password || "");
      formDataToUpdate.append("image", file);
  
      // Make a PUT request to update the user profile
      const response = await fetch(
        `http://localhost:8088/api/user/${storedUserData.id}`,
        {
          method: "PUT",
          body: formDataToUpdate,
        }
      );
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
  
        // Handle other state updates or redirects as needed
      } else {
        // Handle errors
        console.error("Error updating user profile:", response.statusText);
        const errorData = await response.json();
        setErrMsg({ status: "failed", message: errorData.message || "Error updating user profile" });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      setErrMsg({ status: "failed", message: "Error updating user profile" });
    }
  };
  
  
  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                  <Link to="/defaultsettings" className="d-inline-block mt-2">
                    <i className="ti-arrow-left font-sm text-white"></i>
                  </Link>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    Account Details {userInfo.nom} {userInfo.prenom}
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                        <img
                          src="https://via.placeholder.com/300x300.png"
                          alt="avater"
                          className="shadow-sm rounded-3 w-100"
                        />
                      </figure>
                      <h2 className="fw-700 font-sm text-grey-900 mt-3">
                        {userInfo.nom}
                      </h2>
                      <h4 className="text-grey-500 fw-500  font-xsss mb-4">
                        {userInfo.prenom}
                      </h4>
                    </div>
                  </div>

                  <form onSubmit={handleUserUpdate}>
                      <div>
                        {" "}
                        {validationError && (
                          <div className="error-message">{validationError}</div>
                        )}{" "}
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                First Name
                              </label>
                              <input  type="text"
                            id="nom"
                            name="nom"
                            onChange={handleInputChange}
                            value={formData.nom}
                            placeholder="Enter your first name"
                            required className="form-control" />
                            </div>
                          </div>

                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Last Name
                              </label>
                              <input   type="text"
                            id="prenom"
                            name="prenom"
                            onChange={handleInputChange}
                            value={formData.prenom}
                            placeholder="Enter your last name"
                            required className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Sexe
                              </label>
                              <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                            </div>
                          </div>

                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Phone
                              </label>
                              <input  type="tel"
                            id="tel"
                            name="tel"
                            onChange={handleInputChange}
                            value={formData.tel}
                            placeholder="Enter your phone number"
                            required className="form-control" />
                            </div>
                          </div>
                          <div className="row">

                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Date de Naissance 
                              </label>
                              <input
                            type="date"
                            name="date_naissance"
                            value={formData.date_naissance}
                            onChange={handleInputChange}
                            placeholder="Date de Naissance"
                            className="form-control w-48"                          />

                            </div>
                            </div>
                            

                          </div>

                        </div>
                        <div className="row">
                          <div className="col-lg-8 mb-3">
                          <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                              Nationalite
                              </label>
                              <input type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            placeholder="Nationality" className="form-control" />
                            </div>

                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Country
                              </label>
                              <input  type="text"
                            name="countryresidence"
                            value={formData.countryresidence}
                            onChange={handleInputChange}
                            placeholder="Country of Residence"
                             className="form-control" />
                            </div>

                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                City Residence
                              </label>
                              <input type="text"
                            name="cityresidence"
                            value={formData.cityresidence}
                            onChange={handleInputChange}
                            placeholder="City of Residence" className="form-control" />
                            </div>
                          </div>

                          
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                          <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Login 
                              </label>
                              <input type="text"
                            id="login"
                            name="login"
                            onChange={handleInputChange}
                            value={formData.login}
                            placeholder="Choose a username"
                            required className="form-control " />
                            </div>

                          </div>

                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                Mot de Passe
                              </label>
                              <input  type="password"
                              id="password"
                              name="password"
                              onChange={handleInputChange}
                              value={formData.password}
                              placeholder="Enter your password"
                              required className="form-control" />
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="card mt-3 border-0">
                              <div className="card-body d-flex justify-content-between align-items-end p-0">
                                <div className="form-group mb-0 w-100">
                       
        <input
  type="file"
  name="file"
  accept="image/*"

  id="file"
  onChange={(e) => handleFileChange(e, "image")}
  className="input-file"
/>{previewImage && <img src={previewImage} alt="Preview" />}
                                  <label
                                    htmlFor="file"
                                    className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed"
                                  >
                                    <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                    <span className="js-fileName">
                                      Drag and drop or click to replace
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                              Description
                            </label>
                            <textarea
                              className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                              rows="5"
                              placeholder="Write your message..."
                            ></textarea>
                          </div>

                          <div className="col-lg-12">
                          <button
                            type="submit"
                              className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>







                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popupchat />
      <Appfooter />
    </Fragment>
  );
}

export default Account;
