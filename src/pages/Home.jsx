import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

import Friends from "../components/Friends";
import Contacts from "../components/Contacts";
import Group from "../components/Group";
import Events from "../components/Events";
import Createpost from "../components/Createpost";
import Memberslider from "../components/Memberslider";
import Friendsilder from "../components/Friendsilder";
import Storyslider from "../components/Storyslider";
import Postview from "../components/Postview";
import Load from "../components/Load";
import Profilephoto from "../components/Profilephoto";

function Home() {
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
  const [postsData, setPostsData] = useState([]);
  const fileInputRef = useRef(null);
  const [articles, setArticles] = useState([]); // New state for articles
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  const emojiClass = `${isActive ? "active" : ""}`;
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };
  const storedUserData = JSON.parse(localStorage.getItem("user"));

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
      await fetch("https://odine-sport.com/api/articles/", {
        method: "POST",
        body: formData,
      });

      // After creating the article, fetch the updated list of articles
      const response = await fetch("https://odine-sport.com/api/articles/");
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
  const handlePhotoVideoClick = () => {
    // Trigger click event on the file input
    fileInputRef.current.click();
  };
  const menuClass = `${isOpen ? " show" : ""}`;

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const response = await fetch("https://odine-sport.com/api/articles/");
  //       const result = await response.json();

  //       // Extract userIds from articles
  //       const userIds = result.rows.map((article) => article.userId);

  //       // Fetch user information for each userId
  //       const usersResponse = await Promise.all(
  //         userIds.map((userId) =>
  //           fetch(`https://odine-sport.com/api/user/${userId}`).then((response) =>
  //             response.json()
  //           )
  //         )
  //       );
  //       console.log(usersResponse);

  //       const articlesWithUsers = result.rows.map((article, index) => ({
  //         ...article,
  //         user: usersResponse[index],
  //       }));

  //       setArticles(articlesWithUsers);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row feed-body">
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <Storyslider />
                {/* <Createpost /> */}
                <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                  <div className="card-body p-0">
                    {/* ... other elements in card-body */}
                  </div>
                  <div className="card-body p-0 mt-3 position-relative">
                    <figure className="avatar position-absolute ms-2 mt-1 top-5">
                      <img
                        src="assets/images/user.png"
                        alt="icon"
                        className="shadow-sm rounded-circle w30"
                      />
                     </figure>
                     {previewImage && (
                      <div className="mt-3">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="rounded-xxl"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      </div>
                     )}
                     <form onSubmit={handleSubmit(handlePostSubmit)}>
                      <textarea
                        {...register("description", { required: true })}
                        className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                        cols="30"
                        rows="10"
                        placeholder="What's on your mind?"
                      ></textarea>
                      <div className="card-body d-flex p-0 mt-0">
                        <label className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "image")}
                          />
                          <i className="font-md text-success feather-image me-2"></i>
                          <span className="d-none-xs">Photo</span>
                        </label>
                        <label className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "video")}
                          />{" "}
                          <i className="font-md text-danger feather-video me-2"></i>
                          <span className="d-none-xs">Video</span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="bg-sky-400 rounded-lg p-1 float-right"
                      >
                        Create Post
                      </button>
                    </form>
                  </div>
                </div>
                {/* ------------------------ */}
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                  >
                    <div className="card-body p-0 d-flex">
                      <figure className="avatar me-3"></figure>
                      <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        {article.titre}{" "}
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {article.time}
                        </span>
                      </h4>
                      <div className="ms-auto pointer">
                        <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                      </div>
                    </div>

                    {/* <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
      <a href="/defaultvideo" className="video-btn">
        <video autoPlay loop className="float-right w-100">
          <source src={article.video} type="video/mp4" />
        </video>
      </a>
    </div> */}

                    <div className="card-body p-0 me-lg-5">
                      <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                        {article.description}{" "}
                        <a
                          href="/defaultvideo"
                          className="fw-600 text-primary ms-2"
                        >
                          See more
                        </a>
                      </p>
                    </div>

                    <div className="card-body d-block p-0 mb-3">
                      <div className="row ps-2 pe-2">
                        <div className="col-sm-12 p-1">
                          <img
                            src={article.image}
                            className="rounded-3 w-100"
                            alt="post"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* {articles.map((article) => (
                  <Postview
                    key={article?.id} // Make sure to provide a unique key for each Postview
                    id={article?.id}
                    postvideo={article?.postvideo}
                    postimage={article?.image}
                    // avater={article.user.avatar} // Assuming user avatar is stored in 'avatar' property
                    // user={article.user.username} // Assuming username is stored in 'username' property
                    // time={article.time}
                    des={article.description}
                  />
                 
                ))} */}

                <Memberslider />
                <Postview
                  id="35"
                  postvideo=""
                  postimage="post.png"
                  avater="user.png"
                  user="Victor Exrixon"
                  time="3 hour ago"
                  des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <Friendsilder />
                <Postview
                  id="36"
                  postvideo=""
                  postimage="post.png"
                  avater="user.png"
                  user="Victor Exrixon"
                  time="12 hour ago"
                  des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <Load />
              </div>
              <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                <Friends />
                <Contacts />
                <Group />
                <Events />
                <Profilephoto />
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

export default Home;
