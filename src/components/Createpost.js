// Createpost.js

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Config } from '../config';
import Userdefault from "../assets/userdefault.jpg";

const Createpost = ({ setPostsData, storedUserData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };

  const handlePostSubmit = async (data) => {
    try {
      if (!data.description || !storedUserData || !storedUserData.id) {
        // Handle validation errors or missing user data
        return;
      }
  
      setPosting(true);
  
      const formData = new FormData();
      formData.append("titre", "Your default title");
      formData.append("description", data.description);
      formData.append("userId", storedUserData.id);
      formData.append("type", "Your default type");
      formData.append("file", file);
      formData.append("fileType", fileType);
  
      // Make a POST request to create a new article
      await fetch(`${Config.LOCAL_URL}/api/articles/`, {
        method: "POST",
        body: formData,
      });
  
      // After creating the article, fetch the updated list of articles
      const response = await fetch(`${Config.LOCAL_URL}/api/articles/`);
      const updatedPostsData = await response.json();
  
      // Update the list of posts and reset the preview image
      setPostsData(updatedPostsData);
      setPreviewImage(null);
  
      setPosting(false);
    } catch (error) {
      console.error("Error submitting post:", error);
      setPosting(false);
    }
  };
  
  const menuClass = `${isOpen ? " show" : ""}`;

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
      <div className="card-body p-0">
        {/* ... other elements in card-body */}
      </div>
      <div className="card-body p-0 mt-3 position-relative">
        <figure className="avatar position-absolute ms-2 mt-1 top-5">
          {
            <img
            src={localStorage.getItem("user").image || Userdefault}
            className="rounded-full object-fill w-10 h-10"
          />

          }
        </figure>
        <form onSubmit={handleSubmit(handlePostSubmit)}>
          <textarea
            {...register("description", { required: true })}
            className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
            cols="30"
            rows="10"
            placeholder="What's on your mind?"
          ></textarea>

          <input
            type="file"
            onChange={(e) => handleFileChange(e, "image")}
          />

          <button type="submit">Create Post</button>
        </form>
      </div>
      <div className="card-body d-flex p-0 mt-0">
        {/* ... other elements in card-body */}
        <a href="#video" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
          <i className="font-md text-danger feather-video me-2"></i><span className="d-none-xs">Live Video</span>
        </a>
        <a href="#photo" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
          <i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Photo/Video</span>
        </a>
        <a href="#activity" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
          <i className="font-md text-warning feather-camera me-2"></i><span className="d-none-xs">Feeling/Activity</span>
        </a>
        <div className={`ms-auto pointer ${menuClass}`} id="dropdownMenu4" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleOpen}>
          <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
        </div>
        <div className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${menuClass}`} aria-labelledby="dropdownMenu4">
          {/* ... other elements in dropdown-menu */}
        </div>
      </div>
    </div>
  );
};

export default Createpost;
