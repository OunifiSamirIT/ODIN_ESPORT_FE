import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import Terrain from "../../components/Terrain";
import ProfileLayout from "../../Layout/ProfileLayout";
import PlaceHolder from "../../assets/placeholder.jpg";

import { useForm } from "react-hook-form";
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
import { BsFiletypeGif, BsPersonFillAdd, BsTypeH1 } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../config";
import { Context } from "../../index";
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
import { Link, useParams } from "react-router-dom";
import AdminImg from "../../assets/ODIN22.png";
import SlideMenu from "../../components/SlideMenu";
import Logo from "../../assets/ODIN22.png";
import placeholder from "../../assets/placeholder.jpg";
import { UserTag } from "../../components/UserTag";
import moment from "moment";
const Index = () => {
  const { id } = useParams();
  const [profileFeed, SetProfileFeed] = useState("pubs");
  useEffect(() => {
    SetProfileFeed("pubs");
  }, []);

  const handleProfileFeed = (data) => {
    SetProfileFeed(data);
  };
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { _currentLang, _setLang, getTranslation } = React.useContext(Context)

  const [posting, setPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const fileInputRef = useRef(null);
  const [articles, setArticles] = useState([]); // New state for articles
  const [articlesWithPhoto, setArticleWithPhoto] = useState([]);
  const [articlesWithVideo, setArticleWithVideo] = useState([]);
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
  // const [isActive, setIsActive] = useState()
  const [owner, setOwner] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (LocalStorageID.id == id) {
      setOwner(true);
    }
  }, [id]);
  useEffect(() => {
    setArticleWithPhoto(
      articles.filter((item) => {
        return item.image !== null && item.userId == id;
      })
    );
    setArticleWithVideo(
      articles.filter((item) => {
        return item.video !== null && item.userId == id;
      })
    );
  }, [profileFeed, articles, id]);
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
            userId: LocalStorageID.id,
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
            userId: id,
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
            userId: id,
            replyId: replyId,
            emoji: 1, // Assuming 1 for liking
          }),

        }

      );

      if (response.ok) {
        console.log("aaaaaadhia", response)
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

  const LocalStorageID = JSON.parse(localStorage.getItem("user"));
  const isOwner = LocalStorageID.id == id;
  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/articles/byUser/${id}`
      );
      const result = await response.json();

      const reversedArticles = result.rows.reverse();
      const articlesWithLikesCount = [];

      for (const article of reversedArticles) {
        const userId = article.userId;
        const comt = article.id;

        const userResponse = await fetch(
          `${Config.LOCAL_URL}/api/user/${userId}`
        );
        const userData = await userResponse.json();

        const comtResponse = await fetch(
          `${Config.LOCAL_URL}/api/commentaires/article/${comt}`
        );
        const commentsData = await comtResponse.json();

        const likesCountResponse = await fetch(
          `${Config.LOCAL_URL}/api/likes/article/allLikes`
        );
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
      if (!LocalStorageID.id) {
        // Handle validation errors or missing user data
        return;
      }
      if (!data.description && !file) {
        // Handle validation errors or missing user data
        return;
      }
      setPosting(true);
      const formData = new FormData();
      formData.append("titre", "Your default title");
      formData.append("description", data.description);
      formData.append("userId", LocalStorageID.id);
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
      setValue("description", "");
      window.location.reload()
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
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    if (id) {
      const userId = id;
      // Fetch gallery items for the specific user ID
      fetch(`${Config.LOCAL_URL}/api/articles/gallery/${userId}`)
        .then((response) => response.json())
        .then((data) => setGalleryItems(data.gallery))
        .catch((error) => console.error(error));
    }
  }, [profileFeed]);

  useEffect(() => {
    fetchArticles();
    // fetchComments();
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
        throw new Error(`HTTP error! Status: ${response?.status}`);
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


  useEffect(() => {
    console.log(articleComments)

  }, [articleComments])

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
    toggleOpen(!isOpen);
    setSelectedArticle(article);
    setShowDropdown(article.id);
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
            throw new Error(`HTTP error! Status: ${response?.status}`);
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
          window.location.reload()
          // Close the dropdown after deleting
          setShowDropdown(null);
        });
    } else {
      // User canceled the deletion
      setShowDropdown(null);
    }
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // Format the date object into the desired format
    return dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();




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

    // fetchArticles();
    // fetchAlbums();
  }, []);
  return (
    <>
      <ProfileLayout onChange={handleProfileFeed} user={LocalStorageID}>
        {owner && (
          <div className="mt-4 card w-100  rounded-[10px]   border-0 p-3">
            <div className="card-body p-2 position-relative">
            <CreatePostModal/>

            </div>
          </div>

        )}
        {profileFeed === "pubs" && (
          <div className="w-full">
            <div>
              
            {
                        articles.map((item, index) => (
                          <div key={`item-${index}`}>
                            {
                            <>
                                <Post article={item} setArticles={setArticles}   /> 
                              </>
                            }
                          </div>
                        ))
                      }
               
             
            </div>
          </div>
        )}
        {profileFeed === "photo" && (
          <div className="w-full mt-3">
            <div>
              <div>
                {articles.length > 0 ? (
                  articlesWithPhoto.map((article) => (
                    <div
                      key={article.id}
                      className="card w-100 shadow-xss rounded-xxl border-0 px-4 py-2 mt-3"
                    >
                      <div className="card-body p-0 d-flex">
                        <figure className="avatar me-3">
                          <img
                            src={
                              article?.user?.user?.image
                                ? article?.user?.user?.image
                                : PlaceHolder
                            }
                            className="avatar me-3shadow-sm rounded-full aspect-square w-16 h-16 mr-2"
                            alt="post"
                          />
                        </figure>
                        <div className="flex flex-col">
                          <span className="text-base text-grey-900">
                            {article.user.user.nom} {article.user.user.prenom}
                          </span>
                          <span className="d-block font-xssss fw-500 text-grey-500">
                            {article.user.user.profil == "other"
                              ? article.user.other?.profession
                              : ""}
                            {article.user.user.profil == "player"
                              ? " Joueur"
                              : ""}
                            {article.user.user.profil == "agent" &&
                              article.user.agent?.typeresponsable == "players"
                              ? "Manager de Joueur"
                              : ""}
                            {article.user.user.profil == "agent" &&
                              article.user.agent?.typeresponsable == "club"
                              ? "Manager de CLub"
                              : ""}
                            {article.user.user.profil == "scout" ? "Scout" : ""}
                          </span>
                          <span className="d-block font-xssss fw-500 text-grey-500">
                            {formatDate(
                              article.user.user.createdAt
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">
                    Aucun Photo pour le moment
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {profileFeed === "video" && (
          <div className="w-full mt-4 text-center">
            <div>
              <div>
                {articles.length > 0 ? (
                  articlesWithVideo.map((article) => (
                    <div
                      key={article.id}
                      className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                    >
                      <div className="card-body p-0 d-flex">
                        <figure className="avatar me-3">
                          <img
                            src={
                              article?.user?.user.image
                                ? article?.user?.user.image
                                : PlaceHolder
                            }
                            className="avatar me-3shadow-sm rounded-full aspect-square w-16 h-16 mr-2"
                            alt="post"
                          />
                        </figure>
                        <div className="flex flex-col">
                          <span className="text-base text-grey-900">
                            {article.user.user.nom} {article.user.user.prenom}
                          </span>
                          <span className="d-block font-xssss fw-500 text-grey-500">
                            {article.user.user.profil == "other"
                              ? article.user.other?.profession
                              : ""}
                            {article.user.user.profil == "player"
                              ? " Joueur"
                              : ""}
                            {article.user.user.profil == "agent" &&
                              article.user.agent?.typeresponsable == "players"
                              ? "Manager de Joueur"
                              : ""}
                            {article.user.user.profil == "agent" &&
                              article.user.agent?.typeresponsable == "club"
                              ? "Manager de CLub"
                              : ""}
                            {article.user.user.profil == "scout" ? "Scout" : ""}
                          </span>
                          <span className="d-block font-xssss fw-500 text-grey-500">
                            {formatDate(
                              article.user.user.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            {article.video ? (
                              <div className="card-body p-0 mb-3  overflow-hidden">
                                <video controls
                                  className=" w-100 md:max-h-[600px] max-h-[350px]"

                                >
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
                                    Aucun Video Pour Le Moment
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">
                    Aucun Video pour le moment
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </ProfileLayout>
    </>
  );
};

export default Index;
