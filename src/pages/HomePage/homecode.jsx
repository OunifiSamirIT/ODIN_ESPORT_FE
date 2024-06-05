import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import Rightchat from "../../components/Rightchat";
import Appfooter from "../../components/Appfooter";
import Popupchat from "../../components/Popupchat";

import Friends from "../../components/Friends";
import Contacts from "../../components/Contacts";
import Group from "../../components/Group";
import Events from "../../components/Events";
import Createpost from "../../components/Createpost";
import Memberslider from "../../components/Memberslider";
import Friendsilder from "../../components/Friendsilder";
import Storyslider from "../../components/Storyslider";
import Postview from "../../components/Postview";
import Load from "../../components/Load";
import Profilephoto from "../../components/Profilephoto";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BiEditAlt,
  BiHeart,
  BiImages,
  BiLike,
  BiMessageRounded,
  BiSend,
  BiSolidCommentCheck,
  BiSolidHeart,
  BiSolidSend,
  BiSolidVideo,
  BiUndo,
} from "react-icons/bi";
import Loading from "../../components/Loading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GallerieOdin from "./Gallerieuserodin";
import AdminImg from "../assets/ODIN22.png";
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
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [reply, setReply] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [latestItemType, setLatestItemType] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  //02/02
  const [album, setAlbum] = useState([]);
  // const [albums, setAlbums] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [emojiValue, setEmojiValue] = useState(1);
  const [lengthComment, setLengthComment] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = () => {
    // Toggle the state to show/hide animation
    setShowAnimation(!showAnimation);
  };
  const toggleActive = () => setIsActive(!isActive);

  const emojiClass = `${isActive ? "active" : ""}`;
  const toggleOpen = () => setIsOpen(!isOpen);

  const [repliesVisible, setRepliesVisible] = useState({});

  const toggleRepliesVisibility = async (commentId) => {
    setRepliesVisible((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));

    // Fetch replies if not already loaded
    if (!repliesVisible[commentId]) {
      await fetchRepliesForComment(commentId);
    }
  };

  const handleLikeClick = async (articleId, emoji) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/likes/article/${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: storedUserData.id,
            articleId: articleId,
            emoji: emoji,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        // Fetch allLikes to get the updated likes counts for all articles
        const allLikesResponse = await fetch(
          "https://odine-sport.com/api/likes/article/allLikes"
        );
        const allLikesData = await allLikesResponse.json();

        // Update the state based on the received likes count
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            const updatedLikesCount =
              allLikesData.find((like) => like.articleId === article.id)
                ?.likesCount || 0;
            return article.id === articleId
              ? { ...article, likesCount: updatedLikesCount }
              : article;
          })
        );
      } else {
        toast.error("Error liking/unliking the article. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding like:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/likes/comment/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: storedUserData.id,
            commentId: commentId,
            emoji: 1,
          }),
        }
      );

      if (response.ok) {
        // Fetch updated likes count after liking
        const likesCountResponse = await fetch(
          `https://odine-sport.com/api/likes/comment/${commentId}/count`
        );
        const likesCountData = await likesCountResponse.json();

        // Update the state with the new likes count
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            const updatedComments = article.comments.map((c) =>
              c.id === commentId
                ? { ...c, likesCount: likesCountData.count }
                : c
            );
            return article.id === selectedArticleId
              ? { ...article, comments: updatedComments }
              : article;
          })
        );
      } else {
        // Handle error
        toast.error("Error liking/unliking the comment. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const handleLikeReply = async (replyId) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/likes/reply/${replyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: storedUserData.id,
            replyId: replyId,
            emoji: 1, // Assuming 1 for liking
          }),
        }
      );

      if (response.ok) {
        // Fetch updated replies after liking
        fetchRepliesForComment(replyId);
      } else {
        // Handle error
        console.error("Error liking/unliking the reply. Please try again.");
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const fetchLikesCountForCommentWithEmoji = async (commentId, emoji) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/likes/comment/${commentId}/count?emoji=${emoji}`
      );
      const likesCountData = await response.json();

      // Display a success notification
      toast.success(
        `Likes count for comment ${commentId}: ${likesCountData.count}`
      );
    } catch (error) {
      console.error(
        `Error fetching likes count for comment ${commentId} with emoji ${emoji}:`,
        error
      );

      // Display an error notification
      toast.error("Error fetching likes count");
    }
  };

  const fetchLikesCountForReplyWithEmoji = async (replyId, emoji) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/likes/reply/${replyId}/count?emoji=${emoji}`
      );
      const likesCountData = await response.json();

      // Display a success notification
      toast.success(
        `Likes count for reply ${replyId}: ${likesCountData.count}`
      );
    } catch (error) {
      console.error(
        `Error fetching likes count for reply ${replyId} with emoji ${emoji}:`,
        error
      );

      // Display an error notification
      toast.error("Error fetching likes count");
    }
  };

  const fetchLikesCountForArticleWithEmoji = async (articleId, emoji) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/likes/article/${articleId}/count?emoji=${emoji}`
      );
      const likesCountData = await response.json();

      // Display a success notification
      toast.success(
        `Likes count for article ${articleId}: ${likesCountData.count}`
      );
    } catch (error) {
      console.error(
        `Error fetching likes count for article ${articleId} with emoji ${emoji}:`,
        error
      );

      // Display an error notification
      toast.error("Error fetching likes count");
    }
  };

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    if (type === "video") {
      const videoPreviewURL = URL.createObjectURL(selectedFile);
      setVideoPreviewUrl(videoPreviewURL);
      // Clear the image preview if there was one
      setPreviewImage(null);
    } else {
      const imagePreviewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(imagePreviewURL);
      // Clear the video preview if there was one
      setVideoPreviewUrl(null);
    }
  };

  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const fetchArticles = async () => {
    try {
      // Fetch articles
      const response = await fetch("https://odine-sport.com/api/articles/");
      const result = await response.json();

      const reversedArticles = result.rows.reverse();
      const userIds = reversedArticles.map((article) => article.userId);
      const comt = reversedArticles.map((article) => article.id);

      // Fetch user data
      const usersResponse = await Promise.all(
        userIds.map((userId) =>
          fetch(`https://odine-sport.com/api/user/${userId}`).then((response) =>
            response.json()
          )
        )
      );

      // Fetch comment data for each article
      const comtResponse = await Promise.all(
        comt.map((articleId) =>
          fetch(
            `https://odine-sport.com/api/commentaires/article/${articleId}`
          ).then((response) => response.json())
        )
      );

      const articlesWithLikesCount = await Promise.all(
        reversedArticles.map(async (article, index) => {
          // const commentsData = await commentsResponse.json();

          const likesCountResponse = await fetch(
            `https://odine-sport.com/api/likes/article/allLikes`
          );
          const likesCountData = await likesCountResponse.json();

          const likesCount = likesCountData.find(
            (count) =>
              count.articleId === article.articleId ||
              count.articleId === article.id
          );

          return {
            ...article,
            user: usersResponse[index],
            comments: comtResponse[index].commentsData,
            commentsCount: comtResponse[index].commentCount,
            likesCount: likesCount ? likesCount.likesCount : 0,
          };
        })
      );

      setArticles(articlesWithLikesCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReplyClick = async (commentId) => {
    setReplyInput(""); // Clear the reply input
    setReplyingToCommentId(commentId);
    setRepliesVisible((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));

    // Fetch replies if not already loaded
    if (!repliesVisible[commentId]) {
      await fetchRepliesForComment(commentId);
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
      fetchArticles();
    } catch (error) {
      setPosting(false);
    }
  };

  const handlePhotoVideoClick = () => {
    // Trigger click event on the file input
    fileInputRef.current.click();
  };
  const menuClass = `${isOpen ? " show" : ""}`;
  const fetchCommentsByArticleId = async (articleId) => {
    try {
      const response = await fetch(
        `https://odine-sport.com/api/commentaires/article/${articleId}`
      );
      const commentsData = await response.json();
      return commentsData;
    } catch (error) {
      console.error(`Error fetching comments for article ${articleId}:`, error);
      throw error;
    }
  };

  const fetchCommentsForArticle = async (articleId) => {
    try {
      const commentsResponse = await fetch(
        `https://odine-sport.com/api/commentaires/?articleId=${articleId}`
      );
      const commentsData = await commentsResponse.json();

      const commentsWithLikes = await Promise.all(
        commentsData.map(async (comment) => {
          // Fetch likes count for each comment
          const likesCountResponse = await fetch(
            `https://odine-sport.com/api/likes/comment/${comment.id}/count`
          );
          const likesCountData = await likesCountResponse.json();

          return {
            ...comment,
            likesCount: likesCountData.count,
          };
        })
      );

      const commentsWithUserData = await Promise.all(
        commentsWithLikes.map(async (comment) => {
          const userResponse = await fetch(
            `https://odine-sport.com/api/user/${comment.userId}`
          );
          const userData = await userResponse.json();
          return {
            ...comment,
            user: userData,
          };
        })
      );

      setArticles((prevArticles) => {
        return prevArticles.map((prevArticle) =>
          prevArticle.id === articleId
            ? { ...prevArticle, comments: commentsWithUserData }
            : prevArticle
        );
      });

      // handleLikeComment(); // You may want to remove this line depending on your requirements
    } catch (error) {
      console.error(`Error fetching comments for article ${articleId}:`, error);
    }
  };

  const fetchRepliesForComment = async (commentId) => {
    try {
      const repliesResponse = await fetch(
        `https://odine-sport.com/api/replies/${commentId}`
      );
      const repliesData = await repliesResponse.json();

      const repliesWithUserData = await Promise.all(
        repliesData.map(async (reply) => {
          const userResponse = await fetch(
            `https://odine-sport.com/api/user/${reply.userId}`
          );
          const userData = await userResponse.json();

          return {
            ...reply,
            user: userData,
          };
        })
      );

      setArticleComments((prevComments) => {
        const updatedComments = { ...prevComments };
        updatedComments[commentId] = repliesWithUserData;
        return updatedComments;
      });
    } catch (error) {
      console.error(`Error fetching replies for comment ${commentId}:`, error);
    }
  };

  // if (selectedArticleId !== null) {
  //   fetchCommentsForArticle(selectedArticleId);
  // }

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

    fetchArticles();
    // fetchComments();
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch("https://odine-sport.com/api/album");
      const result = await response.json();

      setAlbum(
        result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

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

        // Update the state with the new comment immediately
        setArticleComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[articleId] = [
            ...(updatedComments[articleId] || []),
            newComment,
          ];
          return updatedComments;
        });

        // Update the article count in the state
        setArticles((prevArticles) => {
          return prevArticles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                commentsCount: (article.commentsCount || 0) + 1,
              };
            }
            return article;
          });
        });

        // Fetch comments for the article (optional, depending on your use case)
        await fetchCommentsForArticle(articleId);

        // Reset the comment input field
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
        if (response.ok) {
          await fetchRepliesForComment(commentId);
        }

        // Reset the reply input field and replyingToCommentId
        setReplyInput("");
        setReplyingToCommentId(null);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Define a function to calculate the time difference
  const calculateTimeDifference = (createdAt) => {
    // Assuming createdAt is in the format of "MM-DD-YYYY HH:mm:ss"
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDifferenceInSeconds = Math.floor(
      (currentDate - createdAtDate) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };

  const toggleComments = (articleId) => {
    setSelectedArticleId((prevSelectedArticleId) =>
      prevSelectedArticleId === articleId ? null : articleId
    );
  };

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
                        <img
                          src={user.image}
                          alt="icon"
                          className="shadow-sm rounded-full  w-10 h-10"
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
                      {videoPreviewUrl && (
                        <div className="mt-3">
                          <video
                            controls
                            src={videoPreviewUrl}
                            className="rounded-xxl"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                          ></video>
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
                              errors.description
                                ? errors.description.message
                                : ""
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
                            />
                            <i className="font-md text-success feather-image me-2"></i>
                            <span className="d-none-xs">Photo</span>
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
                            <i className="font-md text-danger feather-video me-2"></i>
                            <span className="d-none-xs"> Video</span>
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
                            <i className="font-md text-warning feather-camera me-2"></i>
                            <span className="d-none-xs">GIF</span>
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
                    {articles.map((article) => (
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
                              {calculateTimeDifference(article.createdAt)}
                            </span>
                          </h4>
                          <div className="ms-auto pointer">
                            <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                          </div>
                        </div>

                        <div className="card-body p-0 me-lg-5">
                          <p className="fw-500 font-thin lh-26 ml-8  rounded-md font-xssss w-100 mb-2 text-dark theme-dark-bg">
                            {article.description}{" "}
                          </p>
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
                                    <source
                                      src={article.video}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>{" "}
                                </div>
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
                          </div>
                        </div>
                        <div className="  rounded-lg">
                          {article.user &&
                            article.user.id === storedUserData.id && (
                              <div className="flex items-center justify-end mt-2">
                                <label
                                  className="flex items-center  gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                  onClick={() => handleEditClick(article)}
                                >
                                  <BiEditAlt />
                                  <Link to={`/editPost/${article.id}`}>
                                    <span>Edit</span>
                                  </Link>{" "}
                                </label>
                              </div>
                            )}
                          <button
                            onClick={() => {
                              // If comments are already visible, close them
                              if (selectedArticleId === article.id) {
                                setCommentInputVisible(false);
                                setSelectedArticleId(null); // Reset selectedArticleId
                              } else {
                                // Otherwise, fetch and display comments
                                fetchCommentsForArticle(article.id);
                                setSelectedArticleId(article.id);
                                setCommentInputVisible(true);
                              }
                            }}
                          >
                            {selectedArticleId === article.id ? (
                              <BiMessageRounded className="w-8 h-7 text-cyan-700" />
                            ) : (
                              <BiMessageRounded className="w-8 h-7 text-cyan-700" />
                            )}
                          </button>
                          <span className="mb-3 ml-0 p-0 font-bold mr-4">
                            {article.commentsCount}{" "}
                            {article.commentsCount === 1 ? "" : ""}
                          </span>
                          <button
                            onClick={() => {
                              handleLikeClick(article.id, 1);
                            }}
                          >
                            {article.likesCount === 0 ? (
                              <BiHeart className="size-7 text-red-600" />
                            ) : (
                              <BiSolidHeart className="size-7 text-red-600" />
                            )}
                          </button>{" "}
                          <span className="mb-3 ml-0 p-0 font-bold mr-4">
                            {article.likesCount}{" "}
                            {article.likesCount === 1 ? "" : ""}{" "}
                          </span>
                          {selectedArticleId === article.id && (
                            <div className="comments-section">
                              {article.comments &&
                                article.comments.map((comment) => (
                                  <div key={comment.id} className="comment">
                                    {/* Display comment information */}
                                    <div className="flex items-center ">
                                      <figure className="avatar me-3">
                                        <img
                                          src={
                                            comment.user && comment.user.image
                                          }
                                          className="shadow-sm rounded-circle w-10 h-10 "
                                          alt="post"
                                        />
                                      </figure>
                                      <div className="flex flex-col justify-between ml-2 ">
                                        <strong className="mb-2 mt-10">
                                          {comment.user && comment.user.login}
                                        </strong>
                                        <span className="bg-gray-200 p-2 rounded-md  h-9">
                                          {comment.description}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="ml-12">
                                      <button
                                        onClick={() =>
                                          handleReplyClick(comment.id)
                                        }
                                        className="w-20 font-semibold ml-4"
                                      >
                                        Répondre
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleLikeComment(comment.id)
                                        }
                                      >
                                        {comment.likesCount === 0 ? (
                                          <BiHeart className="size-7 text-red-600" />
                                        ) : (
                                          <BiSolidHeart className="size-7 text-red-600" />
                                        )}
                                      </button>
                                      {/* <span>{comment.likesCount} Likes</span> */}
                                      <span className="mb-3 ml-0 p-0 font-bold mr-4">
                                        {comment.likesCount}{" "}
                                        {comment.likesCount === 1 ? "" : ""}
                                      </span>
                                    </div>

                                    {replyingToCommentId === comment.id && (
                                      <div>
                                        <input
                                          type="text"
                                          value={replyInput}
                                          onChange={(e) =>
                                            setReplyInput(e.target.value)
                                          }
                                          className="bg-gray-200 rounded-md w-96 pl-3 h-12 mt-3 ml-16"
                                        />
                                        <button
                                          onClick={() =>
                                            addReply(comment.id, replyInput)
                                          }
                                        >
                                          <BiSolidSend className="size-12 pt-8 text-cyan-600" />
                                        </button>
                                      </div>
                                    )}
                                    {repliesVisible[comment.id] && (
                                      <div className="replies-section ml-16 mt-3">
                                        {articleComments[comment.id] &&
                                          articleComments[comment.id].map(
                                            (reply) => (
                                              <div
                                                key={reply.id}
                                                className="reply"
                                              >
                                                {/* Display reply information */}
                                                <div className="flex items-center">
                                                  <figure className="avatar me-3">
                                                    <img
                                                      src={
                                                        reply.user &&
                                                        reply.user.image
                                                      }
                                                      className="shadow-sm rounded-circle w-10 h-10"
                                                      alt="post"
                                                    />
                                                  </figure>
                                                  <div className="flex flex-col justify-between ml-2 ">
                                                    <strong className="mb-2 mt-10">
                                                      {reply.user &&
                                                        reply.user.login}
                                                    </strong>
                                                    <span className="bg-gray-200 p-2 rounded-md  h-9">
                                                      {reply.description}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    )}
                                  </div>
                                ))}

                              {/* Add Comment Input */}
                              {commentInputVisible && (
                                <div>
                                  <div className="flex items-center">
                                    <figure className="avatar me-3">
                                      <img
                                        src={user.image}
                                        className="shadow-sm rounded-circle w-10 h-10"
                                        alt="post"
                                      />
                                    </figure>
                                    <input
                                      type="text"
                                      className="bg-gray-200 p-2 rounded-md w-96 h-12 mt-3 ml-2"
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    />{" "}
                                    <button
                                      onClick={() => addComment(article.id)}
                                      className="ml-2"
                                    >
                                      {" "}
                                      <BiSolidSend className="size-7 mt-3 text-cyan-600" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          {/* Display comments when selectedArticleId matches the current article's id */}
                          {/* <div className="comments-section">
                          {article.comments &&
                            article.comments.map((comment) => (
                              <div key={comment.id} className="comment">
                                <figure className="avatar me-3">
                                  <img
                                    src={comment.user && comment.user.image}
                                    className="shadow-sm rounded-circle w-10 h-10"
                                    alt="post"
                                  />{" "}
                                </figure>{" "}
                                <strong>
                                  {comment.user && comment.user.login}
                                </strong>
                                : {comment.description}
                              </div>
                            ))}
                        </div> */}
                        </div>
                      </div>
                    ))}

                    {latestItemType !== "album" &&
                      album.map((albums) => (
                        <div
                          key={albums.id}
                          className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                        >
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
                                <div
                                  className="card-body position-relative h200 bg-image-cover bg-image-center cover"
                                  style={{
                                    backgroundImage: `url(${albums.ImagesAlbums[0]?.image_url})`,
                                  }}
                                ></div>
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
