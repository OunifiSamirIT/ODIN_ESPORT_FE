import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import Header from "../components/Header2";
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
import { BsFiletypeGif, BsPersonFillAdd, BsTypeH1 } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../config";
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
import Loading from "../components/Loading";
import { Link, Navigate, useNavigate ,useLocation} from "react-router-dom";
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
  const [showMenu, setShowMenu] = useState(false);
  const [selectedArticleForCopy, setSelectedArticleForCopy] = useState(null);
  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);







  const handleClick = () => {
    setShowMenu(!showMenu);
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
        `${Config.LOCAL_URL}/api/likes/article/${articleId}`,
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
          `${Config.LOCAL_URL}/api/likes/article/allLikes`
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
        `${Config.LOCAL_URL}/api/likes/comment/${commentId}`,
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
          `${Config.LOCAL_URL}/api/likes/comment/${commentId}/count`
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
      console.error("Error adding like to comment:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
      });
    }
  };

  // const handleLikeComment = async (commentId) => {
  //   try {
  //     const response = await fetch(
  //       `${Config.LOCAL_URL}/api/likes/comment/${commentId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: storedUserData.id,
  //           commentId: commentId,
  //           emoji: 1,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("API response:", await response.json());

  //     } else {
  //       toast.error("Error liking/unliking the comment. Please try again.", {
  //         position: "top-right",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding like to comment:", error);
  //     toast.error("An unexpected error occurred. Please try again later.", {
  //       position: "top-right",
  //     });
  //   }
  // };

  const handleLikeReply = async (replyId) => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/reply/${replyId}`,
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
        `${Config.LOCAL_URL}/api/likes/comment/${commentId}/count?emoji=${emoji}`
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
        `${Config.LOCAL_URL}/api/likes/reply/${replyId}/count?emoji=${emoji}`
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
        `${Config.LOCAL_URL}/api/likes/article/${articleId}/count?emoji=${emoji}`
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
      const response = await fetch(`${Config.LOCAL_URL}/api/articles/`);
      const result = await response.json();
  
      const reversedArticles = result.rows.reverse();
      const articlesWithLikesCount = [];
  
      for (const article of reversedArticles) {
        const userId = article.userId;
        const comt = article.id;
  
        const userResponse = await fetch(`${Config.LOCAL_URL}/api/user/${userId}`);
        const userData = await userResponse.json();
  
        const comtResponse = await fetch(`${Config.LOCAL_URL}/api/commentaires/article/${comt}`);
        const commentsData = await comtResponse.json();
  
        const likesCountResponse = await fetch(`${Config.LOCAL_URL}/api/likes/article/allLikes`);
        const likesCountData = await likesCountResponse.json();
  
        const likesCount = likesCountData.find(
          (count) =>
            count.articleId === article.articleId ||
            count.articleId === article.id
        );
  
        const articleWithLikesCount = {
          ...article,
          user: userData,
          comments: commentsData.commentsData,
          commentsCount: commentsData.commentCount,
          likesCount: likesCount ? likesCount.likesCount : 0,
        };
  
        articlesWithLikesCount.push(articleWithLikesCount);
      }
  
      setArticles(articlesWithLikesCount);
      console.log("articles : ", articlesWithLikesCount);
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
      await fetch(`${Config.LOCAL_URL}/api/articles/`, {
        method: "POST",
        body: formData,
      });

      // After creating the article, fetch the updated list of articles
      const response = await fetch("${Config.LOCAL_URL}/api/articles/");
      const updatedPostsData = await response.json();

      // Update the list of posts and reset the preview image
      setPostsData(updatedPostsData);
      setPreviewImage(null);

      setPosting(false);
      fetchArticles();
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
  const fetchCommentsByArticleId = async (articleId) => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/commentaires/article/${articleId}`
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
        `${Config.LOCAL_URL}/api/commentaires/?articleId=${articleId}`
      );
      const commentsData = await commentsResponse.json();

      const commentsWithLikes = await Promise.all(
        commentsData.map(async (comment) => {
          // Fetch likes count for each comment
          const likesCountResponse = await fetch(
            `${Config.LOCAL_URL}/api/likes/comment/${comment.id}/count`
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
            `${Config.LOCAL_URL}/api/user/${comment.userId}`
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

  // const fetchCommentsForArticle = async (articleId) => {
  //   try {
  //     const commentsResponse = await fetch(
  //       `${Config.LOCAL_URL}/api/commentaires/?articleId=${articleId}`
  //     );
  //     const commentsData = await commentsResponse.json();

  //     const commentsWithUserData = await Promise.all(
  //       commentsData.map(async (comment) => {
  //         const userResponse = await fetch(
  //           `${Config.LOCAL_URL}/api/user/${comment.userId}`
  //         );
  //         const userData = await userResponse.json();
  //         return {
  //           ...comment,
  //           user: userData,

  //         };
  //       })
  //     );

  //     setArticles((prevArticles) => {
  //       return prevArticles.map((prevArticle) =>
  //         prevArticle.id === articleId
  //           ? { ...prevArticle, comments: commentsWithUserData }
  //           : prevArticle
  //       );
  //     });
  //     // handleLikeComment();
  //   } catch (error) {
  //     console.error(`Error fetching comments for article ${articleId}:`, error);
  //   }
  // };
  const fetchRepliesForComment = async (commentId) => {
    try {
      const repliesResponse = await fetch(
        `${Config.LOCAL_URL}/api/replies/${commentId}`
      );
      const repliesData = await repliesResponse.json();

      const repliesWithUserData = await Promise.all(
        repliesData.map(async (reply) => {
          const userResponse = await fetch(
            `${Config.LOCAL_URL}/api/user/${reply.userId}`
          );
          const userData = await userResponse.json();
          console.log("replyyyyyyyyyyyy", userData);
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



  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    fetchArticles();
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/album`);
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
      const response = await fetch(`${Config.LOCAL_URL}/api/commentaires/`);
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
          `${Config.LOCAL_URL}/api/commentaires/`,
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
  };

  const addReply = async (commentId, replyText) => {
    try {
      if (commentId && replyText) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          `${Config.LOCAL_URL}/api/replies`, // Update the endpoint here
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
        console.log("Reply created:", data);

        // Update the state with the new reply
        // setArticleComments((prevComments) => {
        //   const updatedComments = { ...prevComments };
        //   updatedComments[commentId] = [
        //     ...(updatedComments[commentId] || []),
        //     data,
        //   ];
        //   return updatedComments;
        // });

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





  const copyLinkToClipboard = (articleId) => {
    // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
    const articleUrl = `${Config.LOCAL_URL}/articles/${articleId}`;
  
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(articleUrl)
      .then(() => {
        console.log('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy link to clipboard', err);
      });
  };






  const handleMoreClick = (article) => {
    console.log('More clicked', article.id);
    setSelectedArticle(article);
    setShowDropdown(article.id);
  };
  
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?');
  
    if (confirmDelete) {
      console.log('Deleting article...');
      
      fetch(`${Config.LOCAL_URL}/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
          // Optionally, you can update your UI or state to reflect the deleted article
        })
        .catch((error) => {
          console.error(error.message);
          // Handle the error or show a notification to the user
        })
        .finally(() => {
          // Close the dropdown after deleting
          setShowDropdown(null);
        });
    } else {
      // User canceled the deletion
      setShowDropdown(null);
    }
  };


  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;


  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player", "other"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);
  return (
    <>   
      

 <Header/>

      <div className="nav-header">
    
  
   
   
   
   
   
   
   
   
      <nav className="navigation scroll-bar" >
        <div className="container ps-0 pe-0">
          <div className="nav-content">
            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl  pt-3 pb-1 mb-2 mt-2">
              <ul className="mb-1 top-content">
                <li className="logo d-none d-xl-block d-lg-block"></li>
                <li>
                  <Link to="/home" className="nav-content-bttn open-font">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3299 4.77286V1.6701C18.3299 1.21019 17.9575 0.836926 17.4967 0.836926C17.036 0.836926 16.6635 1.21019 16.6635 1.6701V3.6414L12.3285 0.716116C10.913 -0.238705 9.0833 -0.238705 7.66773 0.716116L1.83549 4.65204C0.686538 5.42773 0 6.71832 0 8.10556V15.8341C0 18.1312 1.86882 20 4.16589 20H5.83224C6.29299 20 6.66542 19.6267 6.66542 19.1668V11.6682C6.66542 11.2091 7.03868 10.8351 7.49859 10.8351H12.4977C12.9576 10.8351 13.3308 11.2091 13.3308 11.6682V19.1668C13.3308 19.6267 13.7033 20 14.164 20H15.8304C18.1274 20 19.9963 18.1312 19.9963 15.8341V8.10556C19.9963 6.78831 19.3764 5.55771 18.3299 4.77286Z"
                        fill="#1D1E21"
                      />
                    </svg>
                    <span className="ml-3">Acceuil</span>
                  </Link>
                </li>

                <li>
                  <Link to={`/profile/${id}`} className="nav-content-bttn open-font">
                    <svg
                      width="15"
                      height="21"
                      viewBox="0 0 15 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_478_8732)">
                        <path
                          d="M0.000488281 20.1103C0.000488281 18.7304 0.000488281 17.3509 0.000488281 15.9717C0.000488281 13.916 1.36299 12.2504 3.37705 11.8514C3.64559 11.8026 3.9182 11.7798 4.19111 11.7832C6.39736 11.778 8.60327 11.778 10.8088 11.7832C12.9067 11.7879 14.563 13.1728 14.9406 15.2358C14.9817 15.4861 15.0007 15.7395 14.9974 15.9931C15.0026 17.366 14.9974 18.7389 14.9974 20.1119L0.000488281 20.1103Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M8.43266 0.610937C8.7936 0.689062 9.16183 0.740104 9.51391 0.848959C11.6832 1.52604 13.1238 3.61615 12.9972 5.88646C12.8702 8.1724 11.1837 10.1016 8.94412 10.5219C6.13631 11.051 3.45089 9.13229 3.05037 6.31198C2.65454 3.52552 4.63579 0.96927 7.44308 0.642708C7.48726 0.634911 7.53079 0.623769 7.57329 0.609375L8.43266 0.610937Z"
                          fill="#1D1E21"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_478_8732">
                          <rect
                            width="15.001"
                            height="20"
                            fill="white"
                            transform="translate(0 0.109375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="ml-3">Profile </span>
                  </Link>
                </li>
                {shouldShowAgentItem && (
                  <li>
                    <Link
                      to="/defaultgroupagent"
                      className="nav-content-bttn open-font"
                    >
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.16667 7.5C9.16667 7.27899 9.25446 7.06702 9.41074 6.91074C9.56703 6.75446 9.77899 6.66667 10 6.66667C10.221 6.66667 10.433 6.75446 10.5893 6.91074C10.7455 7.06702 10.8333 7.27899 10.8333 7.5C10.8333 7.72101 10.7455 7.93297 10.5893 8.08926C10.433 8.24554 10.221 8.33333 10 8.33333C9.77899 8.33333 9.56703 8.24554 9.41074 8.08926C9.25446 7.93297 9.16667 7.72101 9.16667 7.5ZM18.3333 4.16667V15.8333C18.332 16.938 17.8926 17.997 17.1115 18.7782C16.3304 19.5593 15.2713 19.9987 14.1667 20H5.83333C5.02353 19.9989 4.23158 19.7619 3.55434 19.3179C2.8771 18.8739 2.34392 18.2422 2.02 17.5H0.833333C0.61232 17.5 0.400358 17.4122 0.244078 17.2559C0.0877973 17.0996 0 16.8877 0 16.6667C0 16.4457 0.0877973 16.2337 0.244078 16.0774C0.400358 15.9211 0.61232 15.8333 0.833333 15.8333H1.66667V14.1667H0.833333C0.61232 14.1667 0.400358 14.0789 0.244078 13.9226C0.0877973 13.7663 0 13.5543 0 13.3333C0 13.1123 0.0877973 12.9004 0.244078 12.7441C0.400358 12.5878 0.61232 12.5 0.833333 12.5H1.66667V10.8333H0.833333C0.61232 10.8333 0.400358 10.7455 0.244078 10.5893C0.0877973 10.433 0 10.221 0 10C0 9.77899 0.0877973 9.56702 0.244078 9.41074C0.400358 9.25446 0.61232 9.16667 0.833333 9.16667H1.66667V7.5H0.833333C0.61232 7.5 0.400358 7.4122 0.244078 7.25592C0.0877973 7.09964 0 6.88768 0 6.66667C0 6.44565 0.0877973 6.23369 0.244078 6.07741C0.400358 5.92113 0.61232 5.83333 0.833333 5.83333H1.66667V4.16667H0.833333C0.61232 4.16667 0.400358 4.07887 0.244078 3.92259C0.0877973 3.76631 0 3.55435 0 3.33333C0 3.11232 0.0877973 2.90036 0.244078 2.74408C0.400358 2.5878 0.61232 2.5 0.833333 2.5H2.02C2.34392 1.7578 2.8771 1.12608 3.55434 0.682083C4.23158 0.238088 5.02353 0.00106531 5.83333 0L14.1667 0C15.2713 0.00132321 16.3304 0.440735 17.1115 1.22185C17.8926 2.00296 18.332 3.062 18.3333 4.16667ZM7.5 7.5C7.5 8.16304 7.76339 8.79893 8.23223 9.26777C8.70107 9.73661 9.33696 10 10 10C10.663 10 11.2989 9.73661 11.7678 9.26777C12.2366 8.79893 12.5 8.16304 12.5 7.5C12.5 6.83696 12.2366 6.20107 11.7678 5.73223C11.2989 5.26339 10.663 5 10 5C9.33696 5 8.70107 5.26339 8.23223 5.73223C7.76339 6.20107 7.5 6.83696 7.5 7.5ZM14.1667 15C13.9908 9.49333 6.0075 9.495 5.83333 15C5.83333 15.221 5.92113 15.433 6.07741 15.5893C6.23369 15.7455 6.44565 15.8333 6.66667 15.8333C6.88768 15.8333 7.09964 15.7455 7.25592 15.5893C7.4122 15.433 7.5 15.221 7.5 15C7.5 14.337 7.76339 13.7011 8.23223 13.2322C8.70107 12.7634 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.7634 11.7678 13.2322C12.2366 13.7011 12.5 14.337 12.5 15C12.5 15.221 12.5878 15.433 12.7441 15.5893C12.9004 15.7455 13.1123 15.8333 13.3333 15.8333C13.5543 15.8333 13.7663 15.7455 13.9226 15.5893C14.0789 15.433 14.1667 15.221 14.1667 15Z"
                          fill="#1D1E21"
                        />
                      </svg>
                      <span className="ml-3"> Agents</span>
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    to="/defaultgroup"
                    className="nav-content-bttn open-font"
                  >
                    {" "}
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5689 18.0481H16.9897C16.8607 18.0485 16.7349 18.008 16.6305 17.9323C16.526 17.8565 16.4484 17.7496 16.4086 17.6269L16.2303 17.0775C16.19 16.9549 16.1896 16.8226 16.2294 16.6998C16.2691 16.577 16.3469 16.4701 16.4515 16.3944L16.9188 16.056C17.0229 15.98 17.1483 15.9391 17.2771 15.9391C17.4059 15.9391 17.5313 15.98 17.6353 16.056L18.103 16.3955C18.2076 16.4711 18.2855 16.5779 18.3253 16.7007C18.3651 16.8234 18.3649 16.9556 18.3245 17.0782L18.1473 17.628C18.1072 17.7504 18.0294 17.857 17.9251 17.9324C17.8207 18.0079 17.6951 18.0484 17.5663 18.0481H17.5689ZM20.2052 17.0724C20.2053 17.6513 20.0337 18.2172 19.7121 18.6986C19.3906 19.1799 18.9335 19.5551 18.3987 19.7767C17.8639 19.9983 17.2754 20.0563 16.7076 19.9434C16.1398 19.8305 15.6182 19.5518 15.2089 19.1425C14.7995 18.7332 14.5207 18.2117 14.4078 17.6439C14.2948 17.0761 14.3527 16.4876 14.5742 15.9528C14.7958 15.4179 15.1709 14.9608 15.6522 14.6392C16.1336 14.3176 16.6995 14.1459 17.2784 14.1459C18.0545 14.1459 18.7989 14.4542 19.3478 15.003C19.8967 15.5518 20.2051 16.2962 20.2052 17.0724ZM17.2784 19.2675C17.4047 19.2664 17.5307 19.2542 17.6549 19.2312L17.8619 18.554C17.9088 18.4066 18.0013 18.2779 18.1261 18.1865C18.2509 18.0951 18.4015 18.0458 18.5562 18.0456H19.2433C19.3544 17.8236 19.4268 17.5842 19.4572 17.3378L18.9088 16.9722C18.7819 16.8835 18.6864 16.7568 18.6363 16.6103C18.5862 16.4638 18.5839 16.3051 18.6299 16.1573L18.8398 15.5305C18.6653 15.3552 18.4627 15.2104 18.2403 15.102L17.7087 15.4695C17.5838 15.5607 17.4332 15.6098 17.2785 15.6098C17.1239 15.6098 16.9733 15.5607 16.8484 15.4695L16.3342 15.0948C16.1151 15.1994 15.9149 15.3395 15.7416 15.5095L15.9271 16.1573C15.9731 16.3049 15.971 16.4633 15.9212 16.6096C15.8713 16.7559 15.7762 16.8826 15.6497 16.9714L15.105 17.3604C15.1363 17.5987 15.2069 17.8302 15.3138 18.0456H16.0005C16.1552 18.0458 16.3059 18.0951 16.4307 18.1865C16.5556 18.2779 16.6482 18.4065 16.6952 18.554L16.9061 19.233C17.029 19.2549 17.1535 19.2667 17.2784 19.2675Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M19.5741 14.034L13.7589 2.40829C13.5286 1.91264 13.203 1.46719 12.8006 1.09739C12.3982 0.727584 11.9269 0.440663 11.4136 0.253008C10.9003 0.0653542 10.3551 -0.0193581 9.80903 0.00370844C9.263 0.026775 8.72686 0.157169 8.23122 0.387444C7.34749 0.797776 6.63579 1.50524 6.22018 2.3865L0.387512 14.0606C0.15733 14.5556 0.0269271 15.0912 0.00374815 15.6367C-0.0194308 16.1822 0.0650693 16.7269 0.252422 17.2397C0.439776 17.7526 0.726312 18.2234 1.09567 18.6255C1.46503 19.0276 1.90997 19.353 2.40509 19.5831C2.93608 19.83 3.51323 19.9619 4.09875 19.9702L7.76096 13.0438C7.90268 12.7516 8.1006 12.4901 8.34341 12.2744C8.58621 12.0587 8.86914 11.893 9.17603 11.7867C9.48292 11.6804 9.80775 11.6356 10.132 11.6549C10.4562 11.6742 10.7734 11.7572 11.0655 11.8992C11.5776 12.148 11.9881 12.5661 12.2275 13.0826L13.8493 16.4598C13.8863 15.785 14.1278 15.1375 14.5417 14.6033C14.9556 14.0691 15.5222 13.6736 16.1664 13.4691C16.8105 13.2647 17.5015 13.2611 18.1477 13.4589C18.7939 13.6566 19.3646 14.0463 19.784 14.5762C19.7266 14.3909 19.6565 14.2097 19.5741 14.034ZM10.7223 13.7886C10.6424 13.6122 10.5018 13.4704 10.3261 13.3891C10.132 13.2988 9.91006 13.2892 9.70889 13.3624C9.50772 13.4356 9.3438 13.5856 9.25308 13.7795L5.97906 19.9702H13.6888L10.7223 13.7886Z"
                        fill="#1D1E21"
                      />
                    </svg>
                    <span className="ml-3"> Camps</span>
                  </Link>
                </li>
                {shouldShowForProfile && (
                  <li>
                    <Link
                      to="/defaultbadge"
                      className="nav-content-bttn open-font"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_488_16850)">
                          <path
                            d="M10.9875 13.3333H9.0125C8.5725 13.334 8.14363 13.195 7.78766 12.9364C7.43169 12.6778 7.16699 12.3128 7.03167 11.8942L6.42167 10.0167C6.28382 9.59778 6.28284 9.14589 6.41887 8.7264C6.55491 8.30692 6.82089 7.94161 7.17834 7.68333L8.775 6.52667C9.13041 6.26715 9.5591 6.12729 9.99917 6.12729C10.4392 6.12729 10.8679 6.26715 11.2233 6.52667L12.8208 7.68667C13.1784 7.94485 13.4444 8.31016 13.5805 8.72968C13.7165 9.14919 13.7155 9.60112 13.5775 10.02L12.9683 11.8975C12.8318 12.3151 12.5666 12.6789 12.2109 12.9368C11.8551 13.1947 11.4269 13.3335 10.9875 13.3333ZM20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433286 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C6.08879 0.58649 8.02219 0 10 0C12.6513 0.00286757 15.1932 1.05736 17.0679 2.9321C18.9426 4.80684 19.9971 7.34872 20 10ZM10 17.5C10.4315 17.4975 10.862 17.4579 11.2867 17.3817L11.9933 15.0642C12.1537 14.5606 12.4699 14.1211 12.8964 13.8089C13.3228 13.4968 13.8374 13.3282 14.3658 13.3275L16.7133 13.3233C17.0913 12.565 17.3367 11.7477 17.4392 10.9067L15.5658 9.65667C15.1335 9.35323 14.8087 8.92034 14.6383 8.42041C14.4678 7.92047 14.4606 7.37933 14.6175 6.875L15.3283 4.73083C14.7324 4.13169 14.04 3.63702 13.28 3.2675L11.47 4.5225C11.0431 4.83392 10.5284 5.00173 10 5.00173C9.47161 5.00173 8.95687 4.83392 8.53 4.5225L6.76834 3.2425C6.01995 3.60002 5.33574 4.07868 4.74334 4.65917L5.3825 6.87333C5.53944 7.37767 5.53217 7.91881 5.36173 8.41874C5.19129 8.91867 4.8665 9.35156 4.43417 9.655L2.5725 10.9842C2.67956 11.798 2.92089 12.5885 3.28667 13.3233L5.63334 13.3275C6.16184 13.328 6.67653 13.4963 7.10311 13.8083C7.5297 14.1203 7.84611 14.5598 8.00667 15.0633L8.7275 17.3833C9.14754 17.4586 9.57328 17.4977 10 17.5Z"
                            fill="#1D1E21"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_488_16850">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="ml-3">Joueur Recherche</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    



      
    </div>




























  

        <div className="main-content right-chat-active bg-zinc-100">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row feed-body">
            <div className="col-xl-8 col-xxl-9 col-lg-8">
            
              
              <div>




          











                {/* creation poste  */}
                <div className="card w-100 shadow-xss rounded-md   border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                  <div className="card-body p-0 mt-3 position-relative">
                 
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
                      <img
                        src={user?.user?.image}
                        alt="icon"
                        className="shadow-sm rounded-full  w-16 h-14 mr-2"
                      />
                        {/* <label>{storedUserData.login}</label> */}
                        <TextInput
                          className="grow justify-center p-2 bg-gray-100 rounded-[30px] max-md:pr-5 max-md:max-w-full theme-dark-bg"
                          
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
<div className="d-flex align-items-center justify-content-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
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
<img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e551e68fdbcd650c5d3478899a198aaa88ca7d52f6efdc1e5c1cb201ebab45?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="aspect-square w-[25px]"
          />                          <span className="d-none-xs ml-2">Photo</span>
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
 <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ffe4c02d10f8aca8808ca37b8b31a51ff0c4dddae4b08967ea4dcd59524f9e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="aspect-square w-[25px]"
          />                            <span className="d-none-xs ml-2"> Video</span>
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
 <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fd85c3858d242f0bd6e516abd285a594ec826065eceea3da7e87a2de6745740?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="aspect-[1.2] fill-slate-500 w-[30px]"
          />                           <span className="d-none-xs ml-2">GIF</span>
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


                {/* show post  */}
                <div>
                

                {articles && articles.length > 0 ? (
                                  <> 
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                    >
                      <div className="card-body p-0 d-flex">
                      <Link to={`/profile/${article.user.user.id}`}>
                            <figure className="avatar me-3">
                              <img
                                src={article.user.user.image}
                                className="shadow-sm rounded-full  w-10 h-10"
                                alt="post"
                              />{" "}
                            </figure>
                          </Link>

                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                          {article.user.user.nom}  {'   '}
                          {article.user.user.prenom} 
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {article.user.user.profil}

                          </span>
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {new Date(article.user.user.createdAt).toLocaleDateString()}                          
                          </span>
                        </h4>
                        <div className="ms-auto relative">
              <i
                className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss cursor-pointer"
                onClick={() => handleMoreClick(article)}
              ></i>
             

{showDropdown === article.id && article.user.user && article.user.user.id === storedUserData.id && (
  <div className="absolute top-4 right-5 mt-2 w-32 bg-white border rounded-md shadow-lg">
    {/* Your dropdown menu content */}
    <button
      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      onClick={() => handleEditClick(selectedArticle)}
    >
      <label
        className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
        onClick={() => handleEditClick(article)}
      >
        <BiEditAlt />
        <Link to={`/editPost/${article.id}`}>
          <span>Edit</span>
        </Link>{" "}
      </label>
    </button>
   
    <button
      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      onClick={() => handleDeleteClick(article.id)}
    >
      Delete
    </button>
  </div>
)}

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
                           
                            {article.video ? (
                              <div className="card-body p-0 mb-3  overflow-hidden uttam-die">
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
                                      className=" h-96 w-100 object-cover"
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
                        
                        
                        
                        
                        
                        


<span className="mb-3 ml-0 p-0 font-bold mr-4">
  <button
    onClick={() => {
      handleLikeClick(article.id, 1); 
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {article.likesCount === 0 ? (
        <BiHeart className="size-6 text-black" />
      ) : (
        <BiSolidHeart className="size-6 text-black" />
      )}
      <span style={{ marginLeft: '1px', marginTop: '2px' }}>Jaime</span>
    </span>
  </button>{" "}
  <span className="mb-3 ml-0 p-0 font-bold mr-2">
    {article.likesCount} {article.likesCount === 1 ? "" : ""}{" "}
  </span>

  <button
    onClick={() => {
      if (selectedArticleId === article.id) {
        setCommentInputVisible(false);
        setSelectedArticleId(null); 
      } else {
        fetchCommentsForArticle(article.id);
        setSelectedArticleId(article.id);
        setCommentInputVisible(true);
        setSelectedArticleForCopy(article.id);
      }
    }}
  >
    {selectedArticleId === article.id ? (
      <div className="flex gap-2 justify-between py-2 md:ml-6">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/032d07496a162fcc1dacc68205935d5de475ec8fa549523d67ab13f0fd7e026d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
          className="w-5 aspect-square fill-zinc-900"
        />
        <div className="grow">Commenter</div>
      </div>
    ) : (
      <div className="flex gap-2 justify-between py-2 md:ml-6">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/032d07496a162fcc1dacc68205935d5de475ec8fa549523d67ab13f0fd7e026d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
          className="w-5 aspect-square fill-zinc-900"
        />
        <div className="grow">Commenter</div>
      </div>
    )}
  </button>

  {article.commentsCount} {article.commentsCount === 1 ? "" : ""}

  <button
  onClick={() => {
    copyLinkToClipboard(article.id);
    setIsCopyLinkPopupVisible(true);
    setTimeout(() => {
      setIsCopyLinkPopupVisible(false);
    }, 2000); // Hide the popup after 2 seconds
  }}
  className="md:ml-44"
>
  <div className="flex gap-2 justify-between py-2">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3384d54fc4420ffcd2096bc1ad93b25131710f1205c2746005f8d733e81e3bcb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
      className="w-5 aspect-square fill-zinc-900"
    />
    <div className="grow"></div>
  </div>
  {isCopyLinkPopupVisible && (
    <div className="copy-link-popup">
      lien copié!
    </div>
  )}
</button>

</span>


                        








                        {selectedArticleId === article.id && (
                          <div className="comments-section ">
                            {article.comments &&
                              article.comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                  {/* Display comment information */}
                                  <div className="flex items-center ">
                                    <figure className="avatar me-3 mb-8">
                                      <img
                                        src={
                                          comment.user && comment.user.user.image
                                        }
                                        className="shadow-sm rounded-circle w-12 h-12 "
                                        alt="post"
                                      />
                                    </figure>
                                    <span className="flex flex-col flex-1 mt-5  bg-gray-100 md:w-[580px] rounded-3xl max-md:max-w-full">
                               
                                   <strong className="mb-1 ml-2 mt-3">
                                        {comment.user && comment.user.user.login}
                                      </strong>
                                      <h1 className=" text-gray-500 ml-2 mt-1 mb-1">
                                      {comment.user && comment.user.user.profil}     
                                       </h1> 
                                       {comment.user && comment.user.createdAt && (
      <p className="text-gray-500 text-sm mt-0 ml-2 mb-4">
        {new Date(comment.user.createdAt).toLocaleDateString()}
      </p>
    )}
                                      
                                      <div className="mx-3 mb-3">{comment.description}</div>
                                      </span>
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





                                   <button onClick={() => handleLikeComment(comment.id)}>
    {comment.likesCount === 0 ? (
      <BiHeart className="size-7 text-black" />
    ) : (
      <BiSolidHeart className="size-7 text-black" />
    )}
  </button>
  {/* <span>{comment.likesCount} Likes</span> */}
<span className="mb-3 ml-0 p-0 font-bold mr-4">
{comment.likesCount} {comment.likesCount === 1 ? "" : ""}
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
                                                      reply.user.user.image
                                                    }
                                                    className="shadow-sm rounded-circle w-10 h-10"
                                                    alt="post"
                                                  />
                                                </figure>
                                                <span className="flex flex-col flex-1 mt-3   bg-gray-100 md:w-[460px]  rounded-3xl max-md:max-w-full">

                                                <div className="flex flex-col justify-between ml-2 ">
                                                  <strong className="mb-2 mt-10">
                                                    {reply.user &&
                                                      reply.user.user.login}
                                                  </strong>
                                                  <h1 className=" text-gray-500 ml-2 mt-1 mb-1">
                                      {reply.user && reply.user.user.profil}     
                                       </h1> 
                                       {reply.user && reply.user.user.createdAt && (
      <p className="text-gray-500 text-sm mt-0 ml-2 mb-4">
        {new Date(reply.user.user.createdAt).toLocaleDateString()}
      </p>
    )}                                                      <div className="m-2">{reply.description}</div>

                                                </div>                                      </span>

                                               

                                              </div>
                                              
                                              {/* <span className="flex flex-col flex-1  bg-gray-100 md:w-[520px] rounded-3xl max-md:max-w-full">
                                        <div className="m-2">{reply.description}</div>
                                      </span> */}
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
                        
                      </div>
                    </div>
                  ))}

                  </>) : (<> <p>Loading ...</p></>)}







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

              {/* <Friendsilder /> */}

              {/* <Load /> */}
            </div>
            <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
              <Friends />
              {/* <Contacts /> */}
              <Friendsilder />

              {/* <Group /> */}
              <Events />
              {/* <Profilephoto /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    
    
    
    
    </>
  );
}

export default Home;
