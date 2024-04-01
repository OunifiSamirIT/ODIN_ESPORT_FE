import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import Header from '../../components/Header';
import Terrain from "../../components/Terrain";
import ProfileLayout from "../../Layout/ProfileLayout";
import PlaceHolder from "../../assets/placeholder.jpg"

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

const Index = () => {
  const { id } = useParams();
  const [profileFeed, SetProfileFeed] = useState('pubs')
  useEffect(() => {
    SetProfileFeed('pubs');
  }, [])


  const handleProfileFeed = (data) => {
    SetProfileFeed(data)
  }
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const fileInputRef = useRef(null);
  const [articles, setArticles] = useState([]); // New state for articles
  const [articlesWithPhoto, setArticleWithPhoto] = useState([])
  const [articlesWithVideo, setArticleWithVideo] = useState([])
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


  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setArticleWithPhoto(articles.filter((item) => {
      return item.image !== null && item.userId === id
    }))

    setArticleWithVideo(articles.filter((item) => {
      return item.video !== null && item.userId === id
    }))

  }, [profileFeed, articles])
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

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/articles/`);

      const result = await response.json();
      // Extract userIds from articles
      const userIds = result.rows.map((article) => article.userId);
      // Fetch user information for each userId
      const usersResponse = await Promise.all(
        userIds.map((userId) =>
          fetch(`${Config.LOCAL_URL}/api/user/${userId}`).then((response) =>
            response.json()
          )
        )
      );

      const articlesWithUsers = result.rows
        .map((article, index) => ({
          ...article,
          user: usersResponse[index],
        }))
        .filter((article) => article.userId == id); // Filter articles based on userId
      setArticles(articlesWithUsers);

      // Fetch comments for each article
      const commentsPromises = articlesWithUsers.map(async (article) => {
        const response = await fetch(
          `${Config.LOCAL_URL}/api/commentaires/?articleId=${article.id}`
        );
        const comments = await response.json();
        return { articleId: article.id, comments };
      });

      const commentsResults = await Promise.all(commentsPromises);

      const articleCommentsData = commentsResults.reduce(
        (acc, { articleId, comments }) => {
          acc[articleId] = comments;
          return acc;
        },
        {}
      );

      setArticleCommentsCounts(articleCommentsData);
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
      setPosting(true);

      const formData = new FormData();
      formData.append("titre", "Your default title");
      formData.append("description", data.description);
      formData.append("userId", id);
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFeed, setImageFeed] = useState([]);
  const [videoFeed, setVideoFeed] = useState([]);

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
    navigator.clipboard.writeText(articleUrl)
      .then(() => {
        console.log('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy link to clipboard', err);
      });
  };

  const handleMoreClick = (article) => {
    toggleOpen(!isOpen);
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
          // Close the dropdown after deleting
          setShowDropdown(null);
        });
    } else {
      // User canceled the deletion
      setShowDropdown(null);
    }
  };

  return (
    <>
      <ProfileLayout onChange={handleProfileFeed} user={LocalStorageID}>
        {profileFeed === 'pubs' && <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8">
          <div>
            <div>
              {articles.length > 0 ? articles.map((article) => (
                <div
                  key={article.id}
                  className="card w-100 shadow-xss flex rounded-xxl border-0 p-4 mb-3"
                >
                  <div className="card-body p-0 d-flex items-center mb-3">
                    <figure className="avatar me-3">
                      <img
                        src={article.user.user.image ? article.user.user.image : PlaceHolder}
                        className="shadow-sm rounded-full  w-10 h-10"
                        alt="post"
                      />{" "}
                    </figure>

                    <h4 className="flex flex-col fw-700 text-grey-900 font-xssss mt-1">
                      {article.user.user.nom}
                      <span className="d-block font-xssss fw-500 text-grey-500">
                        {article.user.user.profil}
                      </span>
                      <span className="d-block font-xssss fw-500 text-grey-500">
                        {new Date(article.user.user.createdAt).toLocaleDateString()}
                      </span>
                    </h4>
                    <div className="ms-auto relative">
                      <svg onClick={() => handleMoreClick(article)} width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 13C3.88071 13 5 11.8807 5 10.5C5 9.11929 3.88071 8 2.5 8C1.11929 8 0 9.11929 0 10.5C0 11.8807 1.11929 13 2.5 13Z" fill="#1D1E21" />
                        <path d="M15.5 13C16.8807 13 18 11.8807 18 10.5C18 9.11929 16.8807 8 15.5 8C14.1193 8 13 9.11929 13 10.5C13 11.8807 14.1193 13 15.5 13Z" fill="#1D1E21" />
                        <path d="M28.5 13C29.8807 13 31 11.8807 31 10.5C31 9.11929 29.8807 8 28.5 8C27.1193 8 26 9.11929 26 10.5C26 11.8807 27.1193 13 28.5 13Z" fill="#1D1E21" />
                      </svg>


                      {showDropdown === article.id && isOpen ? (
                        <div className="absolute top-4 right-5 mt-2 w-32 bg-white border rounded-md shadow-lg">
                          {/* Your dropdown menu content */}
                          <button
                            className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
                            onClick={() => handleEditClick(selectedArticle)}
                          >
                            <label
                              className="flex items-center w-full gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                              onClick={() => handleEditClick(article)}
                            >
                              <Link to={`/editPost/${article.id}`}>
                                <span>Modifier</span>
                              </Link>{" "}
                            </label>
                          </button>
                          <button
                            className="flex gap-1 items-center px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                            onClick={() => handleDeleteClick(article.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : ''}
                    </div>
                  </div>
                  <div className="card-body p-0 me-lg-5">
                    <p className="font-light text-base rounded-md  w-full text-dark theme-dark-bg text-pretty">
                      {article.description}
                    </p>
                  </div>





                  {article.video && (
                    <div className="card-body d-block p-0 mb-3">
                      <div className="row ps-2 pe-2">
                        <div className="col-sm-12 p-1">
                          <div className="card-body p-0 mb-3  overflow-hidden uttam-die">
                            <video controls className="float-right w-100">
                              <source
                                src={article.video}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>{" "}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                  {article.image && (
                    (
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            <img
                              className=" max-w-full w-full"
                              src={article.image}
                              alt={article.titre}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}


                  <div className="  rounded-lg">
                    <span className="flex justify-between items-center mb-3 ml-0 p-0 font-bold w-full">
                      <button
                        className="flex gap-2"
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
                      <span className="ml-0 p-0 font-bold ml-2 mt-1">
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
                          <div className="grow">Copier le lien</div>
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


                              <div className="ml-12 flex items-center gap-2">
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
                                <span className="ml-0 p-0 font-bold mr-4">
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
                                    className="bg-gray-200 rounded-md w-[300px] md:w-full pl-3 h-12 mt-3 ml-16"
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
                                  src={
                                    reply.user &&
                                    reply.user.user.image
                                  }
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
              )) : <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">Aucun publication pour le moment</div>}
            </div>
          </div>
        </div>}
        {profileFeed === 'photo' && <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">
          <div>
            <div>
              {articles.length > 0 ? articlesWithPhoto.map((article) => (
                <div
                  key={article.id}
                  className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                >
                  <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3">
                      <img
                        src={article.user?.user.image}
                        className="shadow-sm rounded-full  w-10 h-10"
                        alt="post"
                      />{" "}
                    </figure>

                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                      {article.user?.user.nom}
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {article.user?.user.profil}
                      </span>
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {new Date(article.user?.user.createdAt).toLocaleDateString()}
                      </span>
                    </h4>

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
              )) : <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">Aucun Photo pour le moment</div>}
            </div>
          </div>
        </div>}
        {profileFeed === 'video' && <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">
          <div>
            <div>
              {articles.length > 0 ? articlesWithVideo.map((article) => (
                <div
                  key={article.id}
                  className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                >
                  <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3">
                      <img
                        src={article.user?.image}
                        className="shadow-sm rounded-full  w-10 h-10"
                        alt="post"
                      />{" "}
                    </figure>

                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                      {article.user?.nom}
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {article.user?.profil}
                      </span>
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {new Date(article.user?.createdAt).toLocaleDateString()}
                      </span>
                    </h4>

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
                                Aucun Video Pour Le Moment
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              )) : <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">Aucun Video pour le moment</div>}











            </div>
          </div>
        </div>}
      </ProfileLayout>
    </>
  )
}

export default Index