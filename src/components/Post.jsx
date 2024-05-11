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
import placeholder from "../assets/placeholder.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../config";
import Modal from "react-modal";
import moment from "moment/moment";
// import 'moment/locale/fr';
// import 'moment/locale/en';
import '../../node_modules/moment/locale/fr';
import '../../node_modules/moment/locale/en-ca';


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
  BiLogInCircle,
  BiUndo,
} from "react-icons/bi";
import Loading from "../components/Loading";
import { Link, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import GallerieOdin from "../pages/Gallerieuserodin";
import AdminImg from "../assets/ODIN22.png";
import SkeletonArticleCard from "../pages/HomeSkeletonPost";
import EditPost from "../pages/EditPost";
import { Context } from "../index";
function Post({ article, setArticles, onDeleteFromListAcceuillFront }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const fileInputRef = useRef(null);
  //   const [articles, setArticles] = useState([]); // New state for articles
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
  const [userimg, setUserimg] = useState([]);
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [reply, setReply] = useState([]);
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
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDropdownedit, setShowDropdownedit] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context)
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userslikearticle, setUserslikearticle] = useState([]);
  const [showDropdownlikes, setShowDropdownlikes] = useState(false);
  const reff = useRef(null);
  const handleClickOutsidelike = (event) => {
    if (reff.current && !reff.current.contains(event.target)) {
      console.log(!reff.current.contains(event.target))
      setShowDropdownlikes(false)
      

    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidelike);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidelike);
    };

  }, []);
  const handleClicklikeshow = async (articleId) => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/articlessUser/${articleId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch users who liked the article');
      }
      const data = await response.json();
      console.log("🚀 ~ handleClicklikeshow ~ data:", data)
      setUserslikearticle(data);
      
      setShowDropdownlikes(!showDropdownlikes);
    } catch (error) {
      console.error(error);
    }
  };

  

  let _ref_toggelcomment = useRef(null)

  const ref = useRef(null);

  const [isModaldOpen, setIsModaldOpen] = useState(false)
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log(!ref.current.contains(event.target))
      setIsModaldOpen(false)
      fetchArticles()
      setCommentInputVisible(false);

    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // const handleEdit = (articleId) => {
  //   console.log("Editing article with ID:", articleId); // Add this line to debug
  //   setSelectedArticleId(articleId);
  //   setIsModaldOpen(true);
  //   setCommentInputVisible(false);
  //   if (_ref_toggelcomment.current) {
  //     _ref_toggelcomment.current.setCommentInputVisible(false);
  //   } 
  //  };
  const handleEdit = (articleId) => {
    console.log("Editing article with ID:", articleId); // Debugging line

    // Close the comment input section
    setCommentInputVisible(false);

    // Select the article and open the modal for editing
    setSelectedArticleId(articleId);
    setIsModaldOpen(true);
    // Optionally, close any other comment input sections if needed
    if (_ref_toggelcomment.current) {
      const button = _ref_toggelcomment.current.button; // Assigning to a variable
      console.log("dddddddddddddddddddddddddddggggg", button);
      // Now you can use the button variable or do something else with it
    }
  };


  const handleCloseModal = () => {
    fetchArticles()
    setIsModaldOpen(false);

    setCommentInputVisible(false);

  };



  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  const toggleActive = () => setIsActive(!isActive);

  const emojiClass = `${isActive ? "active" : ""}`;
  const toggleOpen = () => setIsOpen(!isOpen);

  const [repliesVisible, setRepliesVisible] = useState({});

  const [likesData, setLikesData] = useState(null); // State to store likes data
  const [likesDataComment, setLikesDataComment] = useState(null); // State to store likes data
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  //   const fetchLikesForArticle = async (articleId) => {
  //     const userId = storedUserData.id ? storedUserData.id : null;

  //     try {
  //         const response = await fetch(
  //             `${Config.LOCAL_URL}/api/likes/articless/${articleId}/`
  //         );

  //         if (response.ok) {
  //             const likeData = await response.json();
  //             setLikesData(likeData); 
  //             console.log("dddddddddddddddddd", likesData)
  //             // Update state with fetched like data
  //         } else {
  //             throw new Error("Error fetching like data.");
  //         }
  //     } catch (error) {
  //         console.error("Error fetching like data:", error);
  //     }
  // };
  const fetchLikesForArticle = async (articleId) => {
    const userId = storedUserData.id ? storedUserData.id : null;

    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/articless/${articleId}/`
      );

      if (response.ok) {
        const likeData = await response.json();
        setLikesData(likeData);

        // Check if userId exists in the fetched data
        const userLiked = likeData.some(like => like.userId === userId);

        if (userLiked) {
          console.log("User has liked this article.");
        } else {
          console.log("User has not liked this article.");
        }
        // Update state with fetched like data
      } else {
        throw new Error("Error fetching like data.");
      }
    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  };



  const fetchLikesForComment = async (commentId) => {
    const userId = storedUserData.id ? storedUserData.id : null;

    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/articlesscommentId/${commentId}/`
      );

      if (response.ok) {
        const likeData = await response.json();
        setLikesDataComment(likeData);

        // Check if userId exists in the fetched data
        const userLiked = likeData.some(like => like.userId === userId);

        if (userLiked) {
          console.log("User has liked this article.");
        } else {
          console.log("User has not liked this article.");
        }
        // Update state with fetched like data
      } else {
        throw new Error("Error fetching like data.");
      }
    } catch (error) {
      console.error("Error fetching like data:", error);
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
        // Fetch the updated likes data for the article
        await fetchLikesForArticle(articleId);

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
              ? {
                ...article,
                likesCount: updatedLikesCount,
              }
              : article;
          })
        );
      } else {
        toast.error(
          "Error liking/unliking the article. Please try again.",
          {
            position: "top-right",
          }
        );
      }
    } catch (error) {
      console.error("Error adding like:", error);
      toast.error(
        "An unexpected error occurred. Please try again later.",
        {
          position: "top-right",
        }
      );
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
        await fetchLikesForComment(commentId);

        const likesCountResponse = await fetch(
          `${Config.LOCAL_URL}/api/likes/comment/${commentId}/count`
        );
        const likesCountData = await likesCountResponse.json();

        // Update the state with the new likes count
        // setArticles((prevArticles) =>
        //   prevArticles.map((article) => {
        //     const updatedComments = article.comments.map((c) =>
        //       c.id === commentId
        //         ? { ...c, likesCount: likesCountData.count }
        //         : c
        //     );
        //     return article.id === selectedArticleId
        //       ? { ...article, comments: updatedComments }
        //       : article;
        //   })
        // );
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            // Check if article is defined and if it has comments
            if (article && article.comments) {
              const updatedComments = article.comments.map((c) =>
                c.id === commentId
                  ? { ...c, likesCount: likesCountData.count }
                  : c
              );
              // Return updated article object with updated comments
              return article.id === selectedArticleId
                ? { ...article, comments: updatedComments }
                : article;
            } else {
              // Return the original article if it doesn't have comments
              return article;
            }
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


  // const storedUserData = JSON.parse(localStorage.getItem("user"));



  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Config.LOCAL_URL}/api/articles`);
      const result = await response.json();
      console.log(response, "arttttt")
      const articlesWithPromises = result.rows.map(async (article) => {
        const userId = article.userId;
        const comt = article.id;
        const rep = article.commentaire[0]
        console.log(rep, "ssssssssssssssssssssssss")

        const [userDataResponse, commentsResponse, likesCountResponse, replyresponse, likesCountResponseReply] =
          await Promise.all([
            fetch(`${Config.LOCAL_URL}/api/user/${userId}`).then((res) =>
              res.json()
            ),
            fetch(`${Config.LOCAL_URL}/api/commentaires/article/${comt}`).then(
              (res) => res.json()
            ),
            fetch(`${Config.LOCAL_URL}/api/likes/article/allLikes`).then(
              (res) => res.json()
            ),
            fetch(`${Config.LOCAL_URL}/api/replies/${rep}`).then(
              (res) => res.json()
            ),
            fetch(`${Config.LOCAL_URL}/api/likes/comment/allLikes`).then(
              (res) => res.json()
            ),
          ]);

        const likesCount = likesCountResponse.find(
          (count) =>
            count.articleId === article.articleId ||
            count.articleId === article.id
        );
        const likesCountreplys = likesCountResponseReply.find(
          (count) =>
            count.commentId === article.comments.comm_id ||
            count.commentId === comments.comm_id
        );
        return {
          ...article,
          user: userDataResponse,
          comments: commentsResponse.commentsData,
          commentsCount: commentsResponse.commentCount,
          likesCount: likesCount ? likesCount.likesCount : 0,
          replys: replyresponse.replysData,
          likecomentcount: likesCountreplys ? likesCountreplys.likecomentcount : 0,
        };
      });

      let newArticles = await Promise.all(articlesWithPromises);
      newArticles = newArticles.reverse(); // Reverse the order of all articles
      const initialArticles = newArticles.slice(0, 50); // Get the first 10 articles
      setArticles(initialArticles);
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);

      // Load the remaining articles after initial set is loaded
      const remainingArticles = newArticles.slice(50);
      if (remainingArticles.length > 0) {
        await loadRemainingArticles(remainingArticles.reverse()); // Reverse the order of remaining articles
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const loadRemainingArticles = (remainingArticles) => {
    setArticles((prevArticles) => [...prevArticles, ...remainingArticles]);
  };

  const handleReplyClick = async (replyId) => {
    setReplyInput(""); // Clear the reply input
    setReplyingToCommentId(replyId);
    setRepliesVisible((prevVisibility) => ({
      ...prevVisibility,
      [replyId]: !prevVisibility[replyId],
    }));

    // Fetch replies if not already loaded
    if (!repliesVisible[replyId]) {
      await fetchRepliesForComment(replyId);
    }
  };
  const handlePostSubmit = async (data) => {
    try {
      if (!storedUserData.id) {
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
    fetchLikesForComment(article.comments.id)
    fetchLikesForArticle(article.id);
    console.log("mmmmmmmmmm", article)
    // fetchArticles();
    // fetchAlbums();
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
      if (articleId && comment !== '') {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(`${Config.LOCAL_URL}/api/commentaires/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: comment,
            userId: user.id,
            articleId: articleId,
          }),
        });

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
              console.log(article)
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
    setShowMenu(!showMenu);
  };

  const addReply = async (commentId, replyText) => {
    console.log(commentId, replyText);
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
    navigator.clipboard
      .writeText(articleUrl)
      .then(() => {
        console.log("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link to clipboard", err);
      });
  };

  const handleMoreClick = (article) => {
    console.log("More clicked", article.id);
    // setSelectedArticle(article);

    // Toggle the dropdown visibility
    setShowDropdown((prevState) =>
      prevState === article.id ? null : article.id
    );
  };
  const handleMoreClickreply = (reply) => {
    console.log("More clicked", reply.id);
    // setSelectedArticle(article);

    // Toggle the dropdown visibility
    setShowDropdownReply((prevState) =>
      prevState === reply.id ? null : reply.id
    );
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette publication ?"
    );

    if (confirmDelete) {
      console.log("Deleting article...");

      fetch(`${Config.LOCAL_URL}/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          onDeleteFromListAcceuillFront(id)
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
  // function formatDate(isoDate) {
  //   const date = new Date(isoDate);
  //   return date.toISOString().split('T')[0];
  // }



  const [selectedComment, setSelectedComment] = useState(null);
  const [showDropdownComment, setShowDropdownComment] = useState(null);
  const [showDropdownReply, setShowDropdownReply] = useState(null);


  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [editingReplyId, setEditingReplyComment] = useState(null);
  const [editedReply, setEditedReply] = useState('');


  const handleMoreClickComment = (comment) => {
    console.log("More clicked", comment.id);
    setSelectedComment(comment);

    // Toggle the dropdown visibility
    setShowDropdownComment((prevState) =>
      prevState === comment.id ? null : comment.id
    );
  };

  const handleDeleteCommentClick = async (id, articleId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?");

    if (confirmDelete) {
      try {
        await fetch(`${Config.LOCAL_URL}/api/commentaires/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Update the article count in the state
        setArticles((prevArticles) => {
          return prevArticles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                commentsCount: (article.commentsCount || 0) - 1, // Decrement commentsCount
              };
            }
            return article;
          });
        });

        setShowDropdownComment();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    } else {
      // User canceled the deletion
      // setCommentInputVisible()
    }
  };
  // const handleDeleteCommentClick = (id, articleId) => {
  //   const confirmDelete = window.confirm(
  //     "Êtes-vous sûr de vouloir supprimer cette publication ?",

  //   );

  //   if (confirmDelete) {
  //     console.log("Deleting article...");

  //     fetch(`${Config.LOCAL_URL}/api/commentaires/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Add any additional headers if needed
  //       },
  //     })
  //       .then(async (response) => {
  //         const x = await response.json()
  //         fetchArticles()

  //         // window.location.reload()

  //         console.log("nedaerr", x)
  //         if (response.ok) {
  //           setArticles((prevArticles) => {
  //             return prevArticles.map((article) => {
  //               if (article.id === articleId) {
  //                 return {
  //                   ...article,
  //                   commentsCount: (article.commentsCount || 0) - 1, 
  //                 };
  //               }
  //               return article;
  //             });
  //           });
  //           setShowDropdownComment();

  //           await fetchCommentsForArticle(articleId);

  //         }

  //         else if (!response.ok) {

  //           setArticleComments()

  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         return response.json();

  //       })
  //       .then((data) => {

  //         console.log(data.message);
  //         // Optionally, you can update your UI or state to reflect the deleted article
  //       })
  //       .catch((error) => {
  //         console.error(error.message);
  //         // Handle the error or show a notification to the user
  //       })
  //       .finally(() => {
  //         // Close the dropdown after deleting
  //         // setShowDropdownComment(null);
  //         // fetchCommentsByArticleId()
  //         // fetchArticles()
  //         // setSelectedComment(false)




  //       });
  //   } else {
  //     // User canceled the deletion
  //     // setCommentInputVisible()


  //   }


  // };
  const handleDeleteReplyClick = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette publication ?",

    );

    if (confirmDelete) {
      console.log("Deleting article...");

      fetch(`${Config.LOCAL_URL}/api/repliesdelete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
      })
        .then(async (response) => {
          const x = await response.json()

          console.log("DELLLETTT REPLY", response)

          fetchArticles()
          setArticleComments()
          // window.location.reload()


          if (response.ok) {

            // setShowDropdownReply();

          }

          else if (!response.ok) {
            console.log("sssss", response)
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();

        })
        .then((data) => {

          console.log(data.message);
          // Optionally, you can update your UI or state to reflect the deleted article
        })
        .catch((error) => {

          // Handle the error or show a notification to the user
        })
        .finally(() => {
          // Close the dropdown after deleting
          // setShowDropdownComment(null);
          // fetchCommentsByArticleId()
          // fetchArticles()
          // setSelectedComment(false)




        });
    } else {
      // User canceled the deletion
      // setCommentInputVisible()


    }


  };

  const updateComment = async (commentId, updatedText) => {
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/commentaires/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  };


  const saveEditedComment = async (commentId) => {
    try {
      await updateComment(commentId, editedComment);

      setComments(prevComments => prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            description: editedComment
          };
        }
        return comment;
      }));

      setEditingCommentId(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }

  };



  const handleEditClickComment = (commentId) => {

    const commentToEdit = article.comments.find(comment => comment.id === commentId);
    console.log(commentToEdit, "comment to edit")
    setEditingCommentId(commentId);
    setEditedComment(commentToEdit.description);
  };


  const cancelEdit = () => {
    setEditingCommentId(null);
  };


  const updateReply = async (replyId, updatedText) => {
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/replies/${replyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  };


  const saveEditedReply = async (replyId) => {
    try {
      await updateReply(replyId, editedReply);

      setReply(prevComments => prevComments.map(reply => {
        if (reply.id === replyId) {
          return {
            ...reply,
            description: editedReply
          };
        }
        return reply;
      }));

      setEditingReplyComment(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }

  };



  const handleEditClickreply = async (replyId) => {

    const likesCountResponse = await fetch(
      `${Config.LOCAL_URL}/api/repliesss/${replyId}`
    );
    const dataresultreplyofcomment = await likesCountResponse.json()
    console.log("heloo reply", dataresultreplyofcomment)
    const replyToEdit = article?.replys?.find(reply => reply.id === replyId);
    console.log(replyToEdit, "ffff")
    setEditingReplyComment(replyId);
    setEditedReply(dataresultreplyofcomment?.description);
  };


  const cancelEditreply = () => {
    setEditingReplyComment(null);
  };


  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // Format the date object into the desired format
    return dateObject.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  const formatDatearticle = (dateString) => {
    // Extract year, month, and day from the dateString
    const [month, year, day] = dateString.split('-');

    // Create a new Date object with the extracted parts
    const dateObject = new Date(`${year}-${month}-${day}`);

    // Format the date object into the desired format
    return dateObject.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  const [showFullText, setShowFullText] = useState(false);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const storedLanguage = localStorage.getItem('language');
  const language = storedLanguage ? storedLanguage.toLowerCase() : '';

  // Set the locale based on the stored language or default to English
  moment.locale(language === 'fr' ? 'fr' : 'en');
  return (
    <>


      <div className="flex flex-col  w-full md:mt-4 mt-0 max-md:ml-0 max-md:w-full">


        {/* show post  */}

        <div>
          <>

            <div
              key={article.id}
              className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
            >
              <div className="card-body p-0 d-flex">
                <Link to={`/profile/${article.user.user.id}`}>
                  <figure className="avatar me-3">
                    <img
                      srcSet={article?.user?.user?.image ? article?.user?.user?.image : placeholder}

                      // src={article.user.user?.image}
                      className="shadow-sm rounded-full w-[52px] aspect-square"
                      alt="post"
                    />{" "}
                  </figure>
                </Link>

 <h4 className="fw-700 text-grey-900 font-xssss mt-1">
 <Link to={`/profile/${article?.user?.user?.id}`}>
   {article.user.user.nom} {"   "} 
                  {article.user.user.prenom} </Link>
                  <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                    {article.user.user.profil == 'other' ? article.user.other?.profession : ''}
                    {article.user.user.profil == 'player' ? ' Joueur' : ''}
                    {article.user.user.profil == 'coach' ? ' Entraîneur' : ''}
                    {article.user.user.profil == 'agent' && article.user.agent?.typeresponsable == 'players' ? 'Manager de Joueur' : ''}
                    {article.user.user.profil == 'agent' && article.user.agent?.typeresponsable == 'club' ? 'Manager de CLub' : ''}
                    {article.user.user.profil == 'scout' ? 'Scout' : ''}
                  </span>
                  {/* <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                  {article?.createdAt}

</span> */}
                  <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                    {moment(article?.createdAt).format('DD MMMM YYYY')} {'  -  '}
                    {
                      moment(article?.createdAt).isAfter(moment().subtract(1, 'hour')) ?
                        moment(article?.createdAt).fromNow(true) :
                        moment(article?.createdAt).fromNow()
                    }
                  </span>




                </h4>
                {storedUserData.id == article?.user?.user?.id &&

                  (
                    <div
                      className="ms-auto relative cursor-pointer"
                      onClick={() => handleMoreClick(article)}
                    >
                      <svg
                        width="31"
                        height="21"
                        viewBox="0 0 31 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 13C3.88071 13 5 11.8807 5 10.5C5 9.11929 3.88071 8 2.5 8C1.11929 8 0 9.11929 0 10.5C0 11.8807 1.11929 13 2.5 13Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M15.5 13C16.8807 13 18 11.8807 18 10.5C18 9.11929 16.8807 8 15.5 8C14.1193 8 13 9.11929 13 10.5C13 11.8807 14.1193 13 15.5 13Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M28.5 13C29.8807 13 31 11.8807 31 10.5C31 9.11929 29.8807 8 28.5 8C27.1193 8 26 9.11929 26 10.5C26 11.8807 27.1193 13 28.5 13Z"
                          fill="#1D1E21"
                        />
                      </svg>

                      {showDropdown === article.id &&
                        article.user.user &&
                        article.user.user.id === storedUserData.id && (
                          <div className="absolute top-4 right-5 mt-2 w-32 bg-white border rounded-md shadow-lg">






                            <button
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
                              // onClick={() =>
                              //   handleEditClick(selectedArticle)
                              // }
                              ref={_ref_toggelcomment}
                              onClick={() => handleEdit(article.id)}

                            >

                              <label
                                className="flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                              // onClick={() => handleEditClick(article)}
                              >

                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_3133_71907)">
                                    <path d="M1.2325 12.4487C0.763627 12.9175 0.500142 13.5533 0.5 14.2163L0.5 15.4994H1.78312C2.44611 15.4992 3.08189 15.2357 3.55062 14.7669L11.89 6.4275L9.57187 4.10938L1.2325 12.4487Z" fill="black" />
                                    <path d="M14.9651 1.03527C14.8129 0.882917 14.6322 0.762055 14.4332 0.679593C14.2343 0.597132 14.0211 0.554688 13.8057 0.554688C13.5904 0.554687 13.3771 0.597132 13.1782 0.679593C12.9793 0.762055 12.7985 0.882917 12.6463 1.03527L10.4551 3.22715L12.7732 5.54527L14.9651 3.35402C15.1174 3.20183 15.2383 3.0211 15.3208 2.82216C15.4032 2.62323 15.4457 2.40999 15.4457 2.19465C15.4457 1.9793 15.4032 1.76606 15.3208 1.56713C15.2383 1.36819 15.1174 1.18746 14.9651 1.03527Z" fill="black" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3133_71907">
                                      <rect width="15" height="15" fill="black" transform="translate(0.5 0.5)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span  >Edit</span>

                                {/* <Link to={`/editPost/${article.id}`}>
                                          <span>Edit</span>
                                        </Link>{" "} */}
                              </label>
                            </button>

                            <button
                              className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
                              onClick={() =>
                                handleDeleteClick(article.id)
                              }
                            >
                              <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 3.33333H14.0825C13.695 1.43417 12.0125 0 10 0H8.33333C6.32167 0 4.63833 1.43417 4.25083 3.33333H0.833333C0.373333 3.33333 0 3.70583 0 4.16667C0 4.6275 0.373333 5 0.833333 5H1.55L2.63 16.2325C2.83667 18.3808 4.62 20 6.7775 20H11.55C13.7108 20 15.4942 18.3775 15.6983 16.2267L16.7617 5H17.4992C17.9592 5 18.3325 4.6275 18.3325 4.16667C18.3325 3.70583 17.96 3.33333 17.5 3.33333ZM8.33333 1.66667H10C11.085 1.66667 12.0017 2.36583 12.3467 3.33333H5.9875C6.3325 2.36583 7.24833 1.66667 8.33333 1.66667ZM12.2558 13.5775C12.5817 13.9033 12.5817 14.43 12.2558 14.7558C12.0933 14.9183 11.88 15 11.6667 15C11.4533 15 11.24 14.9183 11.0775 14.7558L9.16667 12.845L7.25583 14.7558C7.09333 14.9183 6.88 15 6.66667 15C6.45333 15 6.24 14.9183 6.0775 14.7558C5.75167 14.43 5.75167 13.9033 6.0775 13.5775L7.98833 11.6667L6.0775 9.75583C5.75167 9.43 5.75167 8.90333 6.0775 8.5775C6.40333 8.25167 6.93 8.25167 7.25583 8.5775L9.16667 10.4883L11.0775 8.5775C11.4033 8.25167 11.93 8.25167 12.2558 8.5775C12.5817 8.90333 12.5817 9.43 12.2558 9.75583L10.345 11.6667L12.2558 13.5775Z" fill="black" />
                              </svg>
                              <span className="text-base">Delete</span>
                            </button>
                          </div>
                        )}
                    </div>)}
              </div>

              <div class=" p-0  mt-2">
                <p className="rounded-md break-inside-avoid-page text-wrap text-base w-full mb-2 text-dark">
                  {!showFullText && article.description.length > 295 ? article.description.substring(0, 295) + "..." : article.description}
                  {article.description.length > 295 && (
                    <button
                      onClick={toggleText}
                      className="text-blue-600  hover:text-blue-400 focus:outline-none"
                    >
                      {showFullText ? 'Voir moins' : 'Voir plus'}
                    </button>
                  )}

                </p>

              </div>


              {article?.video && (
                <div className="card-body d-block p-0 mb-3">
                  <div className="row ps-2 pe-2">
                    <div className="col-sm-12 p-1">
                      <div className="card-body p-0 mb-3  overflow-hidden ">
                        <video
                          controls
                          className=" w-100 md:max-h-[600px] max-h-[350px]"
                        >
                          <source
                            src={article.video}
                            type="video/mp4"
                          />
                          Your browser does not support the video
                          tag.
                        </video>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {article?.image && (
                <div className="card-body d-block p-0 mb-3">
                  <div className="row ps-2 pe-2">

                    <div className="col-sm-12 p-1 ">
                      <img
                        className=" md:max-h-[600px]   max-h-[350px]   w-100 object-contain "
                        src={article.image}
                        alt={article.titre}
                      />

                    </div>
                  </div>
                </div>
              )}
              <div className="  rounded-lg">
                <div className="flex gap-4 justify-between  w-full text-xs font-light whitespace-nowrap text-neutral-500 ">
                  <div     onClick={() => handleClicklikeshow(article.id)}
 className="flex gap-2.5 items-center justify-center no-underline hover:underline decoration-blue-600 decoration-2 cursor-pointer py-2.5">
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7267 0C10.9723 0.0117335 10.2344 0.222313 9.58752 0.610472C8.94058 0.998631 8.40753 1.55062 8.04219 2.21071C7.67684 1.55062 7.14379 0.998631 6.49686 0.610472C5.84993 0.222313 5.11203 0.0117335 4.35767 0C3.15514 0.0522469 2.02216 0.578304 1.20626 1.46324C0.390358 2.34818 -0.0421438 3.52007 0.00324311 4.72288C0.00324311 9.26153 7.3428 14.5036 7.65498 14.726L8.04219 15L8.4294 14.726C8.74158 14.5049 16.0811 9.26153 16.0811 4.72288C16.1265 3.52007 15.694 2.34818 14.8781 1.46324C14.0622 0.578304 12.9292 0.0522469 11.7267 0Z"
                        fill="#65676B"
                      />
                    </svg>
                    {/* <span className="text-md py-1">
                      {article.likesCount}
                    </span> */}
      <div>
  <span
    className="text-md py-1 px-2 relative z-[988] "
  >
   <div className=""> {article.likesCount}</div>
   
    {showDropdownlikes && (
      <div ref={reff} className="absolute overflow-y-scroll hiddenScrollRightMenu translate-x-0 md:translate-x-4 top-0 md:top-0 z-[999] h-[180px] mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
        <div className="py-2 px-4">
          <h3 className="md:text-lg text-md text-wrap w-[200px] md:w-[300px]  font-semibold">Personne aimé cette publication</h3>
          <ul>
            {userslikearticle.map((like, index) => (
              <li key={index} className="mt-1 py-2 flex flex-row  items-center">
                 <Link to={`/profile/${like.userId}`}>
                  <figure className="avatar me-3">
                    <img
                      srcSet={like?.user?.image ? like?.user?.image : placeholder}

                      // src={article.user.user?.image}
                      className="shadow-sm rounded-full w-[32px] aspect-square"
                    />{" "}
                  </figure>
                </Link>
                {like?.user?.nom} {like?.user?.prenom}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </span>
</div>

                  </div>
                  <div className="flex gap-2.5 items-center justify-center py-2.5">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2974 1.72552C11.5056 1.06664 10.586 0.578896 9.5964 0.29302C8.6068 0.00714375 7.56872 -0.0706678 6.54756 0.0644883C4.65848 0.309904 2.9336 1.26506 1.72316 2.73601C0.512716 4.20696 -0.0925499 6.08345 0.0302592 7.98444C0.153068 9.88544 0.994746 11.6684 2.38439 12.9714C3.77403 14.2744 5.60748 14.9997 7.51244 15H11.8756C12.704 14.999 13.4982 14.6695 14.0839 14.0837C14.6697 13.498 14.9992 12.7038 15.0002 11.8754V7.06918V7.02981C14.934 6.00835 14.6602 5.01111 14.1955 4.09908C13.7308 3.18706 13.0849 2.3794 12.2974 1.72552ZM5.00152 4.37641H7.50119C7.66693 4.37641 7.82588 4.44225 7.94307 4.55945C8.06026 4.67664 8.1261 4.83559 8.1261 5.00133C8.1261 5.16707 8.06026 5.32602 7.94307 5.44321C7.82588 5.56041 7.66693 5.62625 7.50119 5.62625H5.00152C4.83578 5.62625 4.67683 5.56041 4.55964 5.44321C4.44244 5.32602 4.3766 5.16707 4.3766 5.00133C4.3766 4.83559 4.44244 4.67664 4.55964 4.55945C4.67683 4.44225 4.83578 4.37641 5.00152 4.37641ZM10.0009 10.6256H5.00152C4.83578 10.6256 4.67683 10.5597 4.55964 10.4425C4.44244 10.3254 4.3766 10.1664 4.3766 10.0007C4.3766 9.83493 4.44244 9.67598 4.55964 9.55878C4.67683 9.44159 4.83578 9.37575 5.00152 9.37575H10.0009C10.1666 9.37575 10.3255 9.44159 10.4427 9.55878C10.5599 9.67598 10.6258 9.83493 10.6258 10.0007C10.6258 10.1664 10.5599 10.3254 10.4427 10.4425C10.3255 10.5597 10.1666 10.6256 10.0009 10.6256ZM10.0009 8.12591H5.00152C4.83578 8.12591 4.67683 8.06008 4.55964 7.94288C4.44244 7.82569 4.3766 7.66674 4.3766 7.501C4.3766 7.33526 4.44244 7.17631 4.55964 7.05912C4.67683 6.94192 4.83578 6.87608 5.00152 6.87608H10.0009C10.1666 6.87608 10.3255 6.94192 10.4427 7.05912C10.5599 7.17631 10.6258 7.33526 10.6258 7.501C10.6258 7.66674 10.5599 7.82569 10.4427 7.94288C10.3255 8.06008 10.1666 8.12591 10.0009 8.12591Z"
                        fill="#65676B"
                      />
                    </svg>
                    <span className="text-md py-1">
                      {article.commentsCount}
                    </span>
                  </div>
                </div>
                <span className="h-[0.5px] block bg-gray-200 w-full mb-3"></span>

                <span className="flex justify-between items-center mb-0 ml-0 p-0 font-bold w-full">
                  <button
                    onClick={async () => {
                      await handleLikeClick(article.id, 1);
                      await fetchLikesForArticle(article.id);
                    }}
                  >






                    <span className="flex items-center flex-col md:flex-row gap-2 ">
                      {likesData && likesData.some(like => like.userId === storedUserData.id) ? (
                        < span className="flex flex-row">  <BiSolidHeart className="size-6 text-orange-500" />
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs md:text-md"

                              style={{
                                marginLeft: "1px",
                                marginTop: "2px",
                                color: "#f97316"

                              }}
                            >

                              Jaime
                            </span>
                          </div>
                        </span>
                      ) : (
                        <span className="flex flex-row"> <BiHeart className="size-6 text-black" />
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs md:text-md"
                              style={{
                                marginLeft: "1px",
                                marginTop: "2px",
                                color: "black"

                              }}
                            >

                              Jaime
                            </span>
                          </div>

                        </span>
                      )
                      }
                    </span>
                  </button>{" "}


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
                      <div className="flex gap-2 flex-row md:flex-row items-center">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/032d07496a162fcc1dacc68205935d5de475ec8fa549523d67ab13f0fd7e026d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="w-5 aspect-square fill-zinc-900"
                        />
                        <div className="flex gap-2 text-xs md:text-md">Commenter</div>
                      </div>
                    ) : (
                      <div className="flex gap-2 flex-row md:flex-row items-center">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/032d07496a162fcc1dacc68205935d5de475ec8fa549523d67ab13f0fd7e026d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="w-5 aspect-square fill-zinc-900"
                        />
                        <div className="flex gap-2 text-xs md:text-md">
                          {" "}
                          <span>Commenter</span>
                        </div>
                      </div>
                    )}
                  </button>

                </span>

                {selectedArticleId === article?.id && (
                  <div className="comments-section mt-2 ">
                    {article?.comments &&
                      article?.comments?.map((comment) => (
                        <div key={comment.id} className="comment">
                          <div className="flex w-full">
                          <Link to={`/profile/${comment?.user?.user?.id}`}>  <figure className="avatar me-3 mb-8">
                             


                              <img
                                src={comment?.user?.user?.image ? comment?.user?.user?.image : placeholder}

                                className="shadow-sm rounded-full w-[52px] aspect-square"
                                alt="post"
                              />
                            </figure></Link>
                            <div className="flex flex-col w-full">
                              <div className="w-full flex flex-col py-2 bg-gray-100 rounded-[15px] md:rounded-[20px] max-w-[510px]">
                                <div className="flex gap-4 justify-between px-3 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                  <div className="flex flex-col py-1 font-light text-zinc-900">
                                  <Link to={`/profile/${comment?.user?.user?.id}`}>
                                   <div className="fw-700 text-grey-900 font-xssss mt-1">
                                      {comment.user &&
                                        comment.user.user.nom}{" "}
                                      {comment.user &&
                                        comment.user.user.prenom}
                                    </div> </Link>
                                    <div className="mt-1 text-xs">
                                      {/* {comment.user && comment.user.user.profil === "other" ? (
    <div>{comment.user.user.profession}</div>
) : (
    <div>{comment.user.user.profil}</div>
)} */}
                                      {comment.user && (
                                        <div>
                                          {comment?.user?.user?.profil === 'other' && comment?.user?.other?.profession}
                                          {comment?.user?.user?.profil === 'player' && 'Joueur'}
                                          {comment?.user?.user?.profil === 'agent' && comment?.user?.agent?.typeresponsable === 'players' && 'Manager de Joueur'}
                                          {comment?.user?.user?.profil === 'agent' && comment?.user?.agent?.typeresponsable === 'club' && 'Manager de Club'}
                                          {comment?.user?.user?.profil === 'scout' && 'Scout'}
                                        </div>
                                      )}

                                      {/* {comment.user &&
                                        comment.user.user.profil} */}
                                    </div>
                                    <div className="mt-1 text-xs">
                                    {moment(comment?.createdAt).format('DD MMMM YYYY')} {'  -  '}
                    {
                      moment(comment?.createdAt).isAfter(moment().subtract(1, 'hour')) ?
                        moment(comment?.createdAt).fromNow(true) :
                        moment(comment?.createdAt).fromNow()
                    }
                                    
                                    </div>
                                  </div>


                                  {storedUserData.id == comment?.user?.user?.id &&

                                    (<div
                                      className="ms-auto relative cursor-pointer"
                                      onClick={() => handleMoreClickComment(comment)}
                                    >

                                      <svg
                                        width="31"
                                        height="21"
                                        viewBox="0 0 31 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M2.5 13C3.88071 13 5 11.8807 5 10.5C5 9.11929 3.88071 8 2.5 8C1.11929 8 0 9.11929 0 10.5C0 11.8807 1.11929 13 2.5 13Z"
                                          fill="#1D1E21"
                                        />
                                        <path
                                          d="M15.5 13C16.8807 13 18 11.8807 18 10.5C18 9.11929 16.8807 8 15.5 8C14.1193 8 13 9.11929 13 10.5C13 11.8807 14.1193 13 15.5 13Z"
                                          fill="#1D1E21"
                                        />
                                        <path
                                          d="M28.5 13C29.8807 13 31 11.8807 31 10.5C31 9.11929 29.8807 8 28.5 8C27.1193 8 26 9.11929 26 10.5C26 11.8807 27.1193 13 28.5 13Z"
                                          fill="#1D1E21"
                                        />
                                      </svg>

                                      {showDropdownComment === comment?.id &&
                                        comment?.user?.user &&
                                        comment?.user?.user?.id === storedUserData.id && (
                                          <div className="absolute top-0 right-8 mt-2 w-32 bg-white border rounded-md shadow-lg">
                                            <button
                                              className="block px-4 py-1 text-gray-800 hover:bg-gray-200 w-full"
                                              onClick={() => handleEditClickComment(comment.id)
                                              }
                                            >
                                              <label
                                                className="flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                              // onClick={() => handleEditClickComment(comment)}
                                              >
                                                <BiEditAlt />
                                                {/* <Link to={`/editPost/${comment.id}`}> */}
                                                <span>Edit</span>
                                                {/* </Link>{" "} */}
                                              </label>
                                            </button>


                                            <button
                                              className="block px-4 py-1 text-gray-800 hover:bg-gray-200 w-full"

                                              onClick={() => {
                                                handleDeleteCommentClick(comment.id, article.id)

                                                setCommentInputVisible(false);
                                                setSelectedArticleId(null);

                                              }}
                                            >
                                              <label
                                                className="flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                              // onClick={() => handleEditClickComment(comment)}
                                              >
                                                <BiLogInCircle />
                                                <span className="text-base">Delete</span></label>
                                            </button>
                                          </div>
                                        )}

                                    </div>)}







                                </div>
                                <div className="mt-2 text-break font-light text-zinc-900 px-4" >
                                  {comment.id === editingCommentId ? (
                                    <textarea
                                      className="bg-gray-100 border-2 border-gray-300 rounded-[30px] px-3 py-2 w-full"
                                      style={{ resize: 'none', maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'none' }}
                                      value={editedComment}
                                      onChange={(e) => setEditedComment(e.target.value)}
                                    ></textarea>
                                  ) : (
                                    <div className="text-wrap" style={{ resize: 'none', maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'none' }}
                                    >

                                      {comment.description} 
                                    </div>
                                  )}
                                </div>



                                {comment.id === editingCommentId ? (
                                  <div className="my-2 px-[26px] flex w-full justify-between">

                                    <button className="bg-orange-500 rounded-[30px] px-2 py-1 md:py-1.5 text-white md:px-3" onClick={() => cancelEdit()}>Annuler</button>
                                    <button className="bg-blue-600 rounded-[30px] py-0 px-2 md:py-1.5 text-white md:px-3" onClick={() => {
                                      saveEditedComment(comment.id)


                                      setCommentInputVisible(false);
                                      setSelectedArticleId(null);
                                    }



                                    }>Modifier</button>

                                  </div>
                                ) : (
                                  <div className="my-2 flex w-full justify-between">


                                  </div>
                                )}


                              </div>

                              <div className="my-2 flex flex-row  w-full justify-between">
                                <div className="flex flex-row">  <button
                                  className="flex-row"
                                  onClick={async () => {
                                    await fetchLikesForComment(comment.id);

                                    await handleLikeComment(comment.id);
                                  }}

                                >
                                  <div className="flex-col">



                                    {likesDataComment && (
                                      likesDataComment.some(like => like.userId === storedUserData.id && like.commentId === comment.id) ? (
                                        <span className="flex flex-row">
                                          <BiSolidHeart className="size-6 text-orange-500" />
                                          <div className="flex items-center gap-2">
                                            <span
                                              className="text-xs md:text-md"
                                              style={{
                                                marginLeft: "1px",
                                                marginTop: "2px",
                                                color: "#f97316"
                                              }}
                                            ></span>
                                          </div>
                                          <div className="flex-col mt-1 ml-2 text-orange-500">{comment.likesCount}</div>
                                        </span>
                                      ) : (
                                        <span className="flex flex-row">
                                          <BiHeart className="size-6 text-black" />
                                          <div className="flex items-center gap-2">
                                            <span
                                              className="text-xs md:text-md"
                                              style={{
                                                marginLeft: "1px",
                                                marginTop: "2px",
                                                color: "black"
                                              }}
                                            ></span>
                                          </div>
                                          <div className="flex-col mt-1 ml-2 text-black">{comment.likesCount}</div>
                                        </span>
                                      )
                                    )}



                                  </div>
                                </button>
                                  {/* <div className="flex-col mt-1 ml-2 text-orange-500"> {comment.likesCount}</div> */}

                                </div>
                                <button
                                  onClick={() =>
                                    handleReplyClick(comment.id)
                                  }
                                  className="w-20 font-semibold ml-2  mt-2 flex gap-2 text-xs md:text-md"
                                >
                                  Répondre
                                </button>
                              </div>
                            </div>
                          </div>


                          {repliesVisible[comment?.id] && (
                            <div className="replies-section ml-6 md:ml-16 mt-0">
                              {articleComments[comment?.id] &&
                                articleComments[comment?.id].map(
                                  (reply) => (
                                    <div
                                      key={reply.id}
                                      className="reply mb-0"
                                    >

                                      <div className="flex space-x-2 items-start py-2">
                                        <figure className="avatar me-2 mb-8">
                                          <img
                                            src={
                                              //  reply.user?.user?.image
                                              reply?.user?.user?.image ? reply?.user?.user?.image : placeholder

                                            }
                                            className="shadow-sm rounded-full w-[52px] aspect-square"
                                            alt="post"
                                          />
                                        </figure>
                                        <div className="w-full flex flex-col py-2 bg-gray-100 rounded-[20px] max-w-[510px]">
                                          <div className="flex gap-4 justify-between px-2 md:px-6 w-full max-md:flex-nowrap max-md:px-5 max-md:max-w-full">
                                            <div className="flex flex-col py-1 font-light text-zinc-900">
                                              <div className="fw-700 text-grey-900 font-xssss mt-1">
                                                {reply.user &&
                                                  reply.user.user
                                                    .nom}{" "}
                                                {reply.user &&
                                                  reply.user.user
                                                    .prenom}
                                              </div>
                                              <div className="mt-1 text-xs">
                                                {/* {reply.user &&
                                                  reply.user.user
                                                    .profil} */}
                                                {reply.user && (
                                                  <div>
                                                    {reply?.user?.user?.profil === 'other' && reply?.user?.other?.profession}
                                                    {reply?.user?.user?.profil === 'player' && 'Joueur'}
                                                    {reply?.user?.user?.profil === 'agent' && reply?.user?.agent?.typeresponsable === 'players' && 'Manager de Joueur'}
                                                    {reply?.user?.user?.profil === 'agent' && reply?.user?.agent?.typeresponsable === 'club' && 'Manager de Club'}
                                                    {reply?.user?.user?.profil === 'scout' && 'Scout'}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="mt-1 text-xs">
                                              {moment(reply?.createdAt).format('DD MMMM YYYY')} {'  -  '}
                    {
                      moment(reply?.createdAt).isAfter(moment().subtract(1, 'hour')) ?
                        moment(reply?.createdAt).fromNow(true) :
                        moment(reply?.createdAt).fromNow()
                    }
                                               
                                               

                                              </div>

                                            </div>
                                            {storedUserData.id == reply?.user?.user?.id &&
                                              (
                                                <div
                                                  className="ms-auto relative cursor-pointer"
                                                  onClick={() => handleMoreClickreply(reply)}
                                                >

                                                  <svg
                                                    width="31"
                                                    height="21"
                                                    viewBox="0 0 31 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M2.5 13C3.88071 13 5 11.8807 5 10.5C5 9.11929 3.88071 8 2.5 8C1.11929 8 0 9.11929 0 10.5C0 11.8807 1.11929 13 2.5 13Z"
                                                      fill="#1D1E21"
                                                    />
                                                    <path
                                                      d="M15.5 13C16.8807 13 18 11.8807 18 10.5C18 9.11929 16.8807 8 15.5 8C14.1193 8 13 9.11929 13 10.5C13 11.8807 14.1193 13 15.5 13Z"
                                                      fill="#1D1E21"
                                                    />
                                                    <path
                                                      d="M28.5 13C29.8807 13 31 11.8807 31 10.5C31 9.11929 29.8807 8 28.5 8C27.1193 8 26 9.11929 26 10.5C26 11.8807 27.1193 13 28.5 13Z"
                                                      fill="#1D1E21"
                                                    />
                                                  </svg>

                                                  {showDropdownReply === reply.id &&
                                                    reply?.user?.user &&
                                                    reply?.user?.user?.id === storedUserData.id && (
                                                      <div className="absolute top-0 right-8 mt-2 w-32 bg-white border rounded-md shadow-lg">
                                                        <button
                                                          className="block px-4 py-1 text-gray-800 hover:bg-gray-200 w-full"
                                                          onClick={() => handleEditClickreply(reply.id)
                                                          }
                                                        >
                                                          <label
                                                            className="flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                                          // onClick={() => handleEditClickComment(comment)}
                                                          >
                                                            <BiEditAlt />
                                                            {/* <Link to={`/editPost/${comment.id}`}> */}
                                                            <span>Edit</span>
                                                            {/* </Link>{" "} */}
                                                          </label>
                                                        </button>


                                                        <button
                                                          className="block px-4 py-1 text-gray-800 hover:bg-gray-200 w-full"

                                                          onClick={() => {
                                                            handleDeleteReplyClick(reply.id)
                                                            fetchRepliesForComment(reply.commentaireId)
                                                            setRepliesVisible(false);
                                                            setSelectedArticleId(null);


                                                          }}
                                                        >
                                                          <label
                                                            className="flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                                          // onClick={() => handleEditClickComment(comment)}
                                                          >
                                                            <BiLogInCircle />
                                                            <span className="text-base">Delete</span></label>
                                                        </button>
                                                      </div>
                                                    )}

                                                </div>)
                                            }

                                          </div>
                                          <div className="mt-2 text-break font-light text-zinc-900 px-4" >
                                            {reply.id === editingReplyId ? (
                                              <textarea
                                                className="bg-gray-100 border-2 border-gray-300 rounded-[30px] px-3 py-2 w-full"
                                                style={{ resize: 'none', maxHeight: '300px', height: '150px', overflowY: 'auto', scrollbarWidth: 'none' }}
                                                value={editedReply}
                                                onChange={(e) => setEditedReply(e.target.value)}
                                              ></textarea>
                                            ) : (
                                              <div className="text-wrap" style={{ resize: 'none', maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'none' }}
                                              >

                                                {reply.description}
                                              </div>
                                            )}
                                          </div>
                                          {/* ok */}
                                          {reply.id === editingReplyId ? (
                                            <div className="my-2 px-[26px] flex w-full justify-between ">
                                              <button className="bg-orange-500 rounded-[30px] px-2 py-1 md:py-1.5 text-white md:px-3" onClick={() => cancelEditreply()}>Annuler</button>

                                              <button className="bg-blue-600 rounded-[30px] py-0 px-2 md:py-1.5 text-white md:px-3" onClick={() => {
                                                saveEditedReply(reply.id)
                                                // fetchRepliesForComment(reply.commentaireId)

                                                // setCommentInputVisible(false);
                                                // setSelectedArticleId(null);
                                                fetchRepliesForComment(reply.commentaireId)
                                                setRepliesVisible(false);
                                                setSelectedArticleId(null);
                                              }



                                              }>Modifier</button>
                                            </div>
                                          ) : (
                                            <div className="my-2 flex w-full justify-between">

                                              {/* <button onClick={() => handleEditClickComment(comment.id)}>Edit</button> */}

                                            </div>
                                          )}




                                        </div>

                                      </div>

                                    </div>
                                  )
                                )}
                              {replyingToCommentId ==
                                comment.id && (
                                  <div className="flex items-center gap-3 ">
                                    <figure className="avatar">
                                      <img
                                        src={
                                          user?.user?.image ? user?.user?.image : placeholder
                                        }
                                        className="shadow-sm rounded-full w-[52px] aspect-square"
                                        alt="post"
                                      />
                                    </figure>
                                    <div className="flex flex-col w-full">
                                      <div className="w-full flex items-center">
                                        <input
                                          type="text"
                                          value={replyInput}
                                          placeholder="Ecrire un reponse .."
                                          onChange={(e) =>
                                            setReplyInput(
                                              e.target.value
                                            )
                                          }
                                          className="w-full px-2 bg-gray-100 rounded-[15px] md:rounded-[30px]  mr-3 h-12"
                                        />
                                        <button
                                          onClick={() =>
                                            addReply(
                                              replyingToCommentId,
                                              replyInput
                                            )
                                          }
                                        >
                                          <svg
                                            className="w-4 h-5 md:w-5"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M0.141013 3.09153C-0.18232 2.20653 0.0610132 1.22653 0.761847 0.595693C1.46101 -0.0326407 2.45685 -0.174307 3.30185 0.236526L18.3768 7.27319C19.1852 7.65153 19.7635 8.34236 19.9977 9.16736H3.37101L0.188513 3.19736C0.171013 3.16319 0.15518 3.12736 0.141013 3.09153ZM3.38268 10.8349L0.25518 16.814C0.23768 16.8474 0.22268 16.8807 0.21018 16.9157C-0.11232 17.8015 0.133513 18.7799 0.834347 19.4099C1.26851 19.799 1.81685 19.9999 2.36851 19.9999C2.70935 19.9999 3.05101 19.9232 3.36935 19.7674L18.3785 12.7357C19.1893 12.3557 19.7668 11.6624 19.9993 10.8357H3.38268V10.8349Z"
                                              fill="#2E71EB"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      ))}

                    {/* Add Comment Input */}
                    {commentInputVisible && (
                      <div
                      >
                        <div className="flex items-center gap-2 md:gap-3 mt-3">
                          <figure className="avatar">
                            <img
                              src={
                                user.user.image
                                  ? user.user?.image
                                  : placeholder
                              }
                              className="shadow-sm rounded-full w-[52px] aspect-square"
                              alt="post"
                            />
                          </figure>
                          <div className="flex flex-col w-full">
                            <div className="w-full flex items-center">
                              <input
                                type="text"
                                value={comment}
                                placeholder="Ecrire un commentaire .."
                                onChange={(e) =>
                                  setComment(e.target.value)
                                }
                                className="w-full bg-gray-100 rounded-[15px] md:rounded-[30px] px-2 mr-1 md:mr-3 h-12"
                              />
                              <button
                                onClick={() => {
                                  addComment(article.id);
                                  console.log("🚀 ~ Post ~ article.id:", article.id)
                                }
                                }
                                className="ml-1"
                              >
                                <svg
                                  className="w-4 h-5 md:w-5 "
                                  // width="20"
                                  // height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0.141013 3.09153C-0.18232 2.20653 0.0610132 1.22653 0.761847 0.595693C1.46101 -0.0326407 2.45685 -0.174307 3.30185 0.236526L18.3768 7.27319C19.1852 7.65153 19.7635 8.34236 19.9977 9.16736H3.37101L0.188513 3.19736C0.171013 3.16319 0.15518 3.12736 0.141013 3.09153ZM3.38268 10.8349L0.25518 16.814C0.23768 16.8474 0.22268 16.8807 0.21018 16.9157C-0.11232 17.8015 0.133513 18.7799 0.834347 19.4099C1.26851 19.799 1.81685 19.9999 2.36851 19.9999C2.70935 19.9999 3.05101 19.9232 3.36935 19.7674L18.3785 12.7357C19.1893 12.3557 19.7668 11.6624 19.9993 10.8357H3.38268V10.8349Z"
                                    fill="#2E71EB"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </>

          {isModaldOpen && (
            <div className="bg-black/70 fixed inset-0 z-50 h-full w-full overflow-auto flex justify-center items-center px-8">
              <div ref={ref} className="relative  flex flex-col overflow-auto md:mt-0 p-2 max-w-full bg-white rounded-[10px] w-[625px] max-md:px-5 max-md:my-10">

                <EditPost articleId={selectedArticleId} setArticles={setArticles} onClose={handleCloseModal} />
                <button
                  className=" absolute bottom-6 ri opacity-0 w-36 h-10 left-11    py-2 text-white  rounded-full "
                  onClick={() => handleCloseModal(true)}> X </button>
              </div>
            </div>
          )}


        </div>

      </div>
    </>
  )
}

export default Post