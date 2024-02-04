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
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";

import {
  BiEditAlt,
  BiImages,
  BiLike,
  BiSolidCommentCheck,
  BiSolidVideo,
  BiUndo,
} from "react-icons/bi";
import Loading from "../components/Loading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GallerieOdin from "./Gallerieuserodin"
import AdminImg from "../assets/ODIN22.png"
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
  const [comment, setComment] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [articleComments, setArticleComments] = useState({});
  const [articleCommentsCounts, setArticleCommentsCounts] = useState({});
  const [editArticle, setEditArticle] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentReply, setCommentReply] = useState("");
  const [newComment, setNewComment] = useState(null); // New state for the newly added comment
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);

  const [latestItemType, setLatestItemType] = useState(null);

  //02/02
  const [album, setAlbum] = useState([]);
  // const [albums, setAlbums] = useState([]);

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







  const fetchArticles = async () => {
    try {
      const response = await fetch("https://odine-sport.com/api/articles/");
      const result = await response.json();

      // Extract userIds from articles
      // const userIds = result.rows.map((article) => article.userId);
      const reversedArticles = result.rows.reverse();
      const userIds = reversedArticles.map((article) => article.userId);

      // Fetch user information for each userId
      const usersResponse = await Promise.all(
        userIds.map((userId) =>
          fetch(`https://odine-sport.com/api/user/${userId}`).then((response) =>
            response.json()
          )
        )
      );
      const articlesWithUsers = reversedArticles.map((article, index) => ({
        ...article,
        user: usersResponse[index],
      }));

      setArticles(articlesWithUsers);

      // Fetch comments for each article
      // const commentsPromises = articlesWithUsers.map(async (article) => {
      //   const response = await fetch(
      //     `https://odine-sport.com/api/commentaires/?articleId=${article.id}`
      //   );
      //   const comments = await response.json();
      //   return { articleId: article.id, comments };
      // });

      // const commentsResults = await Promise.all(commentsPromises);

      // const articleCommentsData = commentsResults.reduce(
      //   (acc, { articleId, comments }) => {
      //     acc[articleId] = comments;
      //     return acc;
      //   },
      //   {}
      // );
      // if (album.length > 0 && articlesWithUsers.length > 0) {
      //   const latestAlbumCreatedAt = new Date(album[0].createdAt);
      //   const latestArticleCreatedAt = new Date(articlesWithUsers[0].createdAt);
  
      //   // Determine which type is the latest based on creation dates
      //   setLatestItemType(
      //     latestAlbumCreatedAt > latestArticleCreatedAt ? 'album' : 'article'
      //   );
      // }
      // setArticleCommentsCounts(articleCommentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  // const fetchArticles = async () => {
  //   try {
  //     const response = await fetch("https://odine-sport.com/api/articles/");
  //     const result = await response.json();

  //     // Extract userIds from articles
  //     // const userIds = result.rows.map((article) => article.userId);
  //     const reversedArticles = result.rows.reverse();
  //     const userIds = reversedArticles.map((article) => article.userId);

  //     // Fetch user information for each userId
  //     const usersResponse = await Promise.all(
  //       userIds.map((userId) =>
  //         fetch(`https://odine-sport.com/api/user/${userId}`).then((response) =>
  //           response.json()
  //         )
  //       )
  //     );
  //     const articlesWithUsers = reversedArticles.map((article, index) => ({
  //       ...article,
  //       user: usersResponse[index],
  //     }));

  //     setArticles(articlesWithUsers);

  //     // Fetch comments for each article
  //     // const commentsPromises = articlesWithUsers.map(async (article) => {
  //     //   const response = await fetch(
  //     //     `https://odine-sport.com/api/commentaires/?articleId=${article.id}`
  //     //   );
  //     //   const comments = await response.json();
  //     //   return { articleId: article.id, comments };
  //     // });

  //     // const commentsResults = await Promise.all(commentsPromises);

  //     // const articleCommentsData = commentsResults.reduce(
  //     //   (acc, { articleId, comments }) => {
  //     //     acc[articleId] = comments;
  //     //     return acc;
  //     //   },
  //     //   {}
  //     // );
  //     // if (album.length > 0 && articlesWithUsers.length > 0) {
  //     //   const latestAlbumCreatedAt = new Date(album[0].createdAt);
  //     //   const latestArticleCreatedAt = new Date(articlesWithUsers[0].createdAt);
  
  //     //   // Determine which type is the latest based on creation dates
  //     //   setLatestItemType(
  //     //     latestAlbumCreatedAt > latestArticleCreatedAt ? 'album' : 'article'
  //     //   );
  //     // }
  //     // setArticleCommentsCounts(articleCommentsData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const handlePhotoVideoClick = () => {
    // Trigger click event on the file input
    fileInputRef.current.click();
  };
  const menuClass = `${isOpen ? " show" : ""}`;

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      // Replace the API endpoint with your actual endpoint for fetching user data
      fetch(`https://odine-sport.com/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

   
    fetchArticles()
    // fetchComments();
    fetchAlbums() 

  }, []);
  const fetchAlbums = async () => {
    try {
      const response = await fetch("https://odine-sport.com/api/album");
      const result = await response.json();

      setAlbum(result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };
  // change 02/02


//   const fetchAlbums = async () => {
//     try {
//         const response = await fetch("https://odine-sport.com/api/album");
//         const result = await response.json();

//         setAlbum(result.data);

//         console.log(album);
//     } catch (error) {
//         console.error("Error fetching articles:", error);
//     }
// };
  const fetchComments = async () => {
    try {
      const response = await fetch("https://odine-sport.com/api/commentaires/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };
  const addComment = async (articleId) => {
    try {
      if (articleId) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          "https://odine-sport.com/api/commentaires/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: comment,
              userId: user.id,
              articleId: articleId,
            }),
          }
        );

        const newComment = await response.json();
        console.log("Comment created:", newComment);

        // Update the state with the new comment immediately
        setArticleComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[articleId] = [
            ...(updatedComments[articleId] || []),
            newComment,
          ];
          return updatedComments;
        });

        // Clear the comment input
        setComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleEditClick = (article) => {
    setEditArticle(article);
    // Navigate to the edit page with the article ID
  };

  const addReply = async (commentId, replyText) => {
    try {
      if (commentId && replyText) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          `https://odine-sport.com/api/replies`, // Update the endpoint here
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: replyText,
              userId: user.id,
              nom: user.login,
              imageuser: user.image,
              commentaireId: commentId,
            }),
          }
        );

        const data = await response.json();
        console.log("Reply created:", data);

        // Update the state with the new reply
        setArticleComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[commentId] = [
            ...(updatedComments[commentId] || []),
            data,
          ];
          return updatedComments;
        });

        // Clear the reply input
        setCommentReply("");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

// Define a function to calculate the time difference
function calculateTimeDifference(createdAt) {
  const currentDate = new Date();
  const articleDate = new Date(createdAt);

  const timeDifferenceInSeconds = Math.floor((currentDate - articleDate) / 1000);

  const hours = Math.floor(timeDifferenceInSeconds / 3600);
  const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
  const seconds = timeDifferenceInSeconds % 60;

  // Format the time as HH:mm:ss
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

  return formattedTime;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}



  
  
  
  
  
  
  
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
                {/* <Storyslider /> */}
                {/* <Createpost /> */}










                {/* update 01/02/2023 */}
                <div>
                <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                  <div className="card-body p-0 mt-3 position-relative">
                    <figure className="avatar position-absolute ms-2 mt-1 top-5">
          <img src={user.image} alt="icon" className="shadow-sm rounded-full  w-10 h-10" />
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
                      <div className="card-body d-flex p-0 mt-4">
                        {/* <img
                          src={user.image}
                          alt="User Image"
                          className="w-20 h-16 rounded-full object-fill"
                        /> */}
                        {/* <label>{storedUserData.login}</label> */}
                        <TextInput
                         className="h100 bor-0 w-100 rounded-xxl p-2 mt-1 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                         cols="30"
                         rows="10"
                         placeholder="What's on your mind?"
                          // styles="w-full rounded-full py-5 text-bl"
                          // placeholder="Show your Skills here , your dream begin from here...."
                          name="description"
                          register={register("description", {
                            required: "Write something about post",
                          })}
                          error={
                            errors.description ? errors.description.message : ""
                          }
                        />
                      </div>

                      {errMsg?.message && (
                        <span
                          role="alert"
                          className={`text-sm ${
                            errMsg?.status === "failed"
                              ? "text-[#f64949fe]"
                              : "text-[#2ba150fe]"
                          } mt-0.5`}
                        >
                          {errMsg?.message}
                        </span>
                      )}
                      <div className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                        <label
                          htmlFor="imgUpload"
                          className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                        >
                          <input
    type="file"
    onChange={handleFileChange}
    className="hidden"
    id="imgUpload"
    accept=".jpg, .png, .jpeg"
    size="5000000" 
/>
                                    <i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Photo</span>

                        </label>

                        <label
                          className="d-flex align-items-center font-xssss fw-600 mt-1 ls-1 text-grey-700 text-dark pe-4"
                          htmlFor="videoUpload"
                        >
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "video")}
                            className="hidden"
                            id="videoUpload"
                            accept=".mp4, .wav"
                          />
                                    <i className="font-md text-danger feather-video me-2"></i><span className="d-none-xs"> Video</span>

                        </label>

                        <label
                          className="d-flex align-items-center font-xssss mt-1 fw-600 ls-1 text-grey-700 text-dark pe-4"
                          htmlFor="vgifUpload"
                        >
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "gif")}
                            className="hidden"
                            id="vgifUpload"
                            accept=".gif"
                          />
                                    <i className="font-md text-warning feather-camera me-2"></i><span className="d-none-xs">GIF</span>

                        </label>

                        <div>
                          {posting ? (
                            <Loading />
                          ) : (
                            <CustomButton
                              type="submit"
                              title="Post"
                              containerStyles="bg-[#0444a4] text-white mt-1 py-1 px-10 rounded-full font-semibold text-sm"
                            />
                          )}
                        </div>
                      </div>
                    </form>
                    </div>
                  </div>

{/* update 01/02/2023 */}  



<div>



                
         

{latestItemType !== 'article' && articles.map((article) => (
                    <div
                      key={article.id}
                      className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                    >
                      <div className="card-body p-0 d-flex">
                        <figure className="avatar me-3">
                          <img
                            src={article.user.image}
                            className="shadow-sm rounded-circle w-10 h-10"
                            alt="post"
                          />{" "}
                        </figure>

                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                          {article.user.nom}
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
{article.createdAt.slice(11, 19)}                      </span>
                        </h4>
                        <div className="ms-auto pointer">
                          <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                        </div>
                      </div>
                      
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            {/* <img
                            src={article.image}
                            className="rounded-3 w-100"
                            alt="post"
                          /> */}
                            {article.video ? (
                                              <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">

                              <video controls className="float-right w-100">
                                <source src={article.video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video> </div>
                            ) : (
                              <div className="card-body d-block p-0 mb-3">
                         <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                              <img
                                className="rounded-3 h-96 w-100 object-cover"
                                src={article.image}
                                alt={article.titre}
                              />
                              </div>
                              </div>
                              </div>
                            )}
                          </div>
                          <div className="card-body p-0 me-lg-5">
                         <p className="fw-500 font-thin lh-26 ml-8  rounded-md font-xssss w-100 mb-2 text-dark theme-dark-bg">
                          {article.description}{" "}
                         
                         </p>
                         </div>
                         </div>
                      </div>


{/* update */}






















                      <div className="  rounded-lg">
                        {article.user &&
                          article.user.id === storedUserData.id && (
                            <div className="flex items-center justify-end mt-2">
                              <label
                                className="flex items-center  gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                onClick={() => handleEditClick(article)}
                              >
                                <BiEditAlt  />
                                <Link to={`/editPost/${article.id}`}>
                                  <span>Edit</span>
                                </Link>{" "}
                              </label>
                            </div>
                          )}

                        {selectedArticleId === article.id && (
                          <div className="  bg-slate-100 rounded-lg ">
                            {(() => {
                              if (!articleComments[article.id]) {
                                fetchComments();

                                fetch(
                                  `https://odine-sport.com/commentaires/article/${article.id}`
                                )
                                  .then((response) => response.json())
                                  .then((response) => {
                                    setArticleComments((prevComments) => ({
                                      ...prevComments,
                                      [article.id]: response,
                                    }));
                                    console.log(
                                      "------------------",
                                      articleComments
                                    );
                                  })

                                  .catch((error) =>
                                    console.error(
                                      "Error fetching comments:",
                                      error
                                    )
                                  );

                                return <p>Loading comments...</p>;
                              }

                              // Render all comments for the selected article after fetching
                              return (
                                <>
                                  {articleComments[article.id]?.map(
                                    (commentItem) => (
                                      <div
                                        key={commentItem.comm_id}
                                        className="mb-2"
                                      >
                                        {/* Display comment details */}
                                        <div className="flex flex-col">
                                          <div className="flex items-center mb-1">
                                            <div className="bg-white rounded-full text-black w-20 h-10 mr-4 border-2">
                                              {commentItem?.user_login}
                                            </div>
                                            <div className="bg-white w-10 h-10 text-black rounded-sm flex-grow">
                                              {commentItem?.comm_desc}{" "}
                                              {commentItem?.description}
                                            </div>
                                          </div>

                                          {/* Display Reply button */}
                                          <label className="flex items-center  gap-14 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                                            {/* <span className="text-ascent-2 hover:text-ascent-1 cursor-pointer">
                                            </span> */}
                                            <span
                                              onClick={async () => {
                                                setCommentReply("");
                                                setSelectedCommentId(
                                                  selectedCommentId ===
                                                    commentItem.comm_id
                                                    ? null
                                                    : commentItem.comm_id
                                                );

                                                // Fetch replies for the selected comment
                                                if (
                                                  !articleComments[
                                                    commentItem.comm_id
                                                  ]
                                                ) {
                                                  try {
                                                    const response =
                                                      await fetch(
                                                        `https://odine-sport.com/api/replies/${commentItem.comm_id}`
                                                      );
                                                    const replies =
                                                      await response.json();

                                                    // Update the state with the fetched replies
                                                    setArticleComments(
                                                      (prevComments) => ({
                                                        ...prevComments,
                                                        [commentItem.comm_id]:
                                                          replies,
                                                      })
                                                    );
                                                  } catch (error) {
                                                    console.error(
                                                      "Error fetching replies:",
                                                      error
                                                    );
                                                  }
                                                }
                                              }}
                                            >
                                              {selectedCommentId ===
                                              commentItem.comm_id
                                                ? "Cancel Reply"
                                                : "Reply"}
                                            </span>
                                          </label>
                                        </div>

                                        {/* Display replies for the comment */}
                                        {articleComments[
                                          commentItem.comm_id
                                        ]?.map((reply) => (
                                          <div
                                            key={reply.id}
                                            className="ml-8 mb-2"
                                          >
                                            {/* <div className="bg-white w-10 h-10 rounded-sm float-left mr-4 border-2">
                                              {reply.nom}
                                            
                                            </div> */}
                                            <div className="bg-white rounded-sm ml-20 ">
                                              {reply.description}
                                            </div>
                                          </div>
                                        ))}

                                        {/* Display reply input */}
                                        {selectedCommentId ===
                                          commentItem.comm_id && (
                                          <div className="bg-gray-200 p-4 rounded-lg mt-4">
                                            <textarea
                                              value={commentReply}
                                              onChange={(e) =>
                                                setCommentReply(e.target.value)
                                              }
                                              placeholder="Type your reply here..."
                                              className="w-full h-16 p-2 border rounded"
                                            />

                                            <button
                                              type="button"
                                              onClick={() => {
                                                addReply(
                                                  commentItem.comm_id,
                                                  commentReply
                                                );
                                                setCommentReply("");
                                              }}
                                              className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
                                            >
                                              Add Reply
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}

                                  {/* Comment input */}
                                  <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Type your comment here..."
                                    className="w-full h-16 p-2 border rounded"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => {
                                      addComment(article.id);
                                      // Reset the comment input after adding a comment
                                      setComment("");
                                      fetchComments();
                                    }}
                                    className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
                                  >
                                    Add Comment
                                  </button>
                                </>
                              );
                            })()}
                          </div>
                        )}

                        {/* Button to select the article for comments */}
                        <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                          <BiSolidCommentCheck />
                          <span
                            onClick={() =>
                              setSelectedArticleId(
                                selectedArticleId === article.id
                                  ? null
                                  : article.id
                              )
                            }
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div className="mr-4">
                                {" "}
                                {articleCommentsCounts[article.id]
                                  ? `${
                                      articleCommentsCounts[article.id].length
                                    } `
                                  : "Loading comments..."}
                              </div>
                              <div className="">
                                {selectedArticleId === article.id
                                  ? "Close Comments"
                                  : "Comment"}
                              </div>
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                
                {latestItemType !== 'album' && album.map((albums) => (
  <div key={albums.id} className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
    <div className="card-body p-0 d-flex">
    <figure className="avatar me-3">
                          <img
                            src={AdminImg}
                            className="shadow-sm rounded-circle w-10 h-10"
                            alt="post"
                          />{" "}
                        </figure>
    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                          ODIN Sport
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {calculateTimeDifference(albums.createdAt)}
                      </span>
                        </h4> 
      
     
    </div>

    <div className="card-body d-block p-0 mb-3">
      <div className="row ps-2 pe-2">
        <div className="col-sm-12 p-1">
        <div className="card-body position-relative h200 bg-image-cover bg-image-center cover" style={{backgroundImage: `url(${(albums.ImagesAlbums[0]?.image_url)})`}}></div>

        </div>
      </div>
    </div>

    <div className="card-body p-0 me-lg-5">
      <p className="fw-500 font-thin lh-26 ml-8 rounded-md font-xssss w-100 mb-2 text-dark theme-dark-bg">
        {album.description}
      </p>
    </div>
  </div>
))}                
                 
                 
                 
                 
                 
                
                </div>
</div>
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
{/* <GallerieOdin /> */}
                {/* <Memberslider /> */}
                
                <Friendsilder />
               
                {/* <Load /> */}
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
