import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import Terrain from "../../components/Terrain";
import ProfileLayout from "../../Layout/ProfileLayout";
import PlaceHolder from "../../assets/placeholder.jpg";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';
import { Pagination, Navigation } from "swiper/modules";
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
import CreatePostModal from "../../components/CreatePostModalProfile";
import Post from "../../components/Post";
import secureLocalStorage from "react-secure-storage";

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

  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModaldOpenGallery, setIsModaldOpenGallery] = useState(false);

  const [isModaldOpenGalleryvideo, setIsModaldOpenGalleryVideo] =
    useState(false);
  const [currentImageIndexvideo, setCurrentImageIndexvideo] = useState(0);
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
  const refGallery = useRef(null);
  const refGalleryVideo = useRef(null);
  const handlePlusClick = (index) => {
    setCurrentImageIndex(index);
    setIsModaldOpenGallery(true);
  };
  const handleClickOutsideGallery = (event) => {
    if (refGallery.current && !refGallery.current.contains(event.target)) {
      setIsModaldOpenGallery(false);
    }
  };

  const handlePlusClickvideo = (index) => {
    setCurrentImageIndexvideo(index);
    setIsModaldOpenGalleryVideo(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideGallery);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideGallery);
    };
  }, []);
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutsideGalleryvideo);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutsideGalleryvideo);
  //   };

  // }, []);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const [originalArticle, setOriginalArticle] = useState(null);
  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;

  const fetchArticleById = async (id) => {
    // Replace with your API call
    return fetch(`${Config.LOCAL_URL}/api/articles/${storedUserDatad.id}`,
      {
        credentials: "include",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },

      }
    )
      .then((response) => response.json())
      .then((data) => data);
  };

  useEffect(() => {
    if (articles.sharedFrom) {
      fetchArticleById(articles.sharedFrom)
        .then((data) => setOriginalArticle(data))
        .catch((err) => console.error("Error fetching original article:", err));
    }
  }, [articles.sharedFrom]);
  const displayArticle = originalArticle || articles;
  useEffect(() => {
    if (LocalStorageID.id == id) {
      setOwner(true);
    }
  }, [id]);
  useEffect(() => {
    setArticleWithPhoto(
      // displayArticle.filter((item) => {        return item.image !== null && item.userId == id;      })
      articles.filter(
        (item) => item.image !== null && item.image !== "" && item.userId == id
      )
    );
    setArticleWithVideo(
      articles.filter(
        (item) => item.video !== null && item.video !== "" && item.userId == id
      )
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
            Authorization: `Bearer ${tokenn}`,

          },
          body: JSON.stringify({
            userId: LocalStorageID.id,
            articleId: articleId,
            emoji: emoji,
          }),
        }
      );
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      if (response.ok) {
        const responseData = await response.json();

        // Fetch allLikes to get the updated likes counts for all articles
        const allLikesResponse = await fetch(
          `${Config.LOCAL_URL}/api/likes/article/allLikes`,{
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          }
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
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/comment/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,

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
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const handleLikeReply = async (replyId) => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/reply/${replyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,

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
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/likes/comment/${commentId}/count?emoji=${emoji}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
  
        }
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
        `${Config.LOCAL_URL}/api/likes/reply/${replyId}/count?emoji=${emoji}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
  
        }
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
        `${Config.LOCAL_URL}/api/likes/article/${articleId}/count?emoji=${emoji}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
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

  const LocalStorageID = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const isOwner = LocalStorageID.id == id;

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/articles/byUser/${id}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      const result = await response.json();

      const reversedArticles = result.rows.reverse();
      const articlesWithLikesCount = [];

      for (const article of reversedArticles) {
        const userId = article.userId;
        const comt = article.id;

        const userResponse = await fetch(
          `${Config.LOCAL_URL}/api/user/${userId}`,{
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          }
        );
        const userData = await userResponse.json();

        const comtResponse = await fetch(
          `${Config.LOCAL_URL}/api/commentaires/article/${comt}`,{
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          }
        );
        const commentsData = await comtResponse.json();

        const likesCountResponse = await fetch(
          `${Config.LOCAL_URL}/api/likes/article/allLikes`,{
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          }
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
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      });

      // After creating the article, fetch the updated list of articles
      const response = await fetch(`${Config.LOCAL_URL}/api/articles/`,{
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      });
      const updatedPostsData = await response.json();

      // Update the list of posts and reset the preview image
      setPostsData(updatedPostsData);
      setPreviewImage(null);

      setPosting(false);
      setValue("description", "");
      window.location.reload();
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
        `${Config.LOCAL_URL}/api/commentaires/article/${articleId}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      const commentsData = await response.json();
      return commentsData;
    } catch (error) {
      throw error;
    }
  };

  const fetchCommentsForArticle = async (articleId) => {
    try {
      const commentsResponse = await fetch(
        `${Config.LOCAL_URL}/api/commentaires/?articleId=${articleId}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      const commentsData = await commentsResponse.json();

      const commentsWithLikes = await Promise.all(
        commentsData.map(async (comment) => {
          // Fetch likes count for each comment
          const likesCountResponse = await fetch(
            `${Config.LOCAL_URL}/api/likes/comment/${comment.id}/count` ,{
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${tokenn}`,
              },
            }
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
            `${Config.LOCAL_URL}/api/user/${comment.userId}`,{
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${tokenn}`,
              },
            }
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
        `${Config.LOCAL_URL}/api/replies/${commentId}`,{
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      const repliesData = await repliesResponse.json();

      const repliesWithUserData = await Promise.all(
        repliesData.map(async (reply) => {
          const userResponse = await fetch(
            `${Config.LOCAL_URL}/api/user/${reply.userId}`,{
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${tokenn}`,
              },
            }
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
      fetch(`${Config.LOCAL_URL}/api/articles/gallery/${userId}`,{
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      })
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
      const response = await fetch(`${Config.LOCAL_URL}/api/album`,{
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      });
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
      const response = await fetch(`${Config.LOCAL_URL}/api/commentaires/`,{
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      });
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
        const user = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

        const response = await fetch(`${Config.LOCAL_URL}/api/commentaires/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,

          },
          body: JSON.stringify({
            description: comment,
            userId: user.id,
            articleId: articleId,
          }),
        });

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

  useEffect(() => {}, [articleComments]);

  const handleEditClick = (article) => {
    setEditArticle(article);
  };

  const addReply = async (commentId, replyText) => {
    try {
      if (commentId && replyText) {
        const user = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

        const response = await fetch(`${Config.LOCAL_URL}/api/replies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,

          },
          body: JSON.stringify({
            description: replyText,
            userId: user.id,
            nom: user.login,
            imageuser: user.image,
            commentaireId: commentId,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          await fetchRepliesForComment(commentId);
        }

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
      getTranslation(
        `Are you sure you want to delete this post?`, // -----> Englais
        ` Êtes-vous sûr de vouloir supprimer cette publication ?` //  -----> Francais
        //   ``,  //  -----> Turkey
        //   `` ,  //  -----> Allemagne
      )
    );

    if (confirmDelete) {
      fetch(`${Config.LOCAL_URL}/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,

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
          window.location.reload();
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
    return dateObject.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
//-----------------------------------------------------------

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const token1 = secureLocalStorage.getItem("cryptedUser");
//       if (!token1) {
//         throw new Error("Token not found in storage.");
//       }

//       const parsedToken1 = JSON.parse(token1);
//       const id = parsedToken1?.id;

//       if (!id) {
//         throw new Error("No user ID provided!");
//       }

//       const tokenn = parsedToken1?.token;

//       if (!tokenn) {
//         throw new Error("No token provided!");
//       }

//       if (id) {
//         const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${tokenn}`,
//           },
//         });

//         // You can use the response here if needed
//         // console.log(response);
//       }

//       // fetchArticles();
//       // fetchAlbums();
//     } catch (error) {
//       console.error(error);
//       // Handle the error more gracefully, e.g., display an error message to the user
//     }
//   }

//   fetchData();
// }, []);
  const storedLanguage = localStorage.getItem("language");
  const language = storedLanguage ? storedLanguage.toLowerCase() : "";

  // Set the locale based on the stored language or default to English
  moment.locale(language === "fr" ? "fr" : "en");

  Modal.setAppElement("#root");

  // const PhotoGrid = ({ articlesWithPhoto }) => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //   const allPhotos = [];
  //   articlesWithPhoto.forEach((article) => {
  //     article.image.split(";").forEach((imageUrl) => {
  //       allPhotos.push({ url: imageUrl });
  //     });
  //   });

  //   allPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));

  //   const handlePlusClick = (index) => {
  //     setCurrentImageIndex(index);

  //     setIsOpen(true);
  //   };

  //   const closeModal = () => {
  //     setIsOpen(false);
  //   };

  //   return (
  //     <div>
  //       <div className="flex flex-wrap md:gap-x-3 md:gap-y-3 md:m-4 gap-3 m-2 md:pl-2 pt-4 md:pt-4 ">
  //         {allPhotos.map((photo, index) => (
  //           <div key={index} className="w-[30%] md:w-[31%] h-48 md:h-72">
  //             <img
  //               src={photo.url}
  //               alt={`Photo ${index}`}
  //               className="w-full h-full object-cover rounded-lg cursor-pointer"
  //               onClick={() => handlePlusClick(index)}
  //             />
  //           </div>
  //         ))}
  //       </div>

  //       {isOpen && (
  //         // <div className="bg-black/95 fixed inset-0 z-50 h-full w-full  flex justify-center items-center">
  //         //   <button
  //         //     onClick={closeModal}
  //         //     className=" hidden absolute md:top-5 top-2     md:right-0 right-6  text-white rounded-full w-12 h-12 md:flex items-center justify-center"
  //         //   >
  //         //     <svg
  //         //       className="  mt-2 float-right "
  //         //       xmlns="http://www.w3.org/2000/svg"
  //         //       viewBox="0 0 62 62"
  //         //       width="150"
  //         //       height="150"
  //         //       fill="#fff"
  //         //     >
  //         //       <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
  //         //     </svg>
  //         //   </button>
  //         //   <div className="relative flex flex-col w-full   bg-black    -py-10 ">
  //         //     {" "}
  //         //     <Swiper
  //         //         navigation
  //         //         initialSlide={currentImageIndex}
  //         //         onSlideChange={(swiper) => {
  //         //           setCurrentImageIndex(swiper.activeIndex);
  //         //         }}
  //         //         centeredSlides
  //         //         spaceBetween={80}
  //         //         className="mySwiper  !h-screen flex justify-center items-center"
  //         //       >
  //         //         {allPhotos.map((photo, index) => (
  //         //           <SwiperSlide
  //         //             key={index}
  //         //             className="flex justify-center items-center relative"
  //         //           >
  //         //             <div className="imageswiper-container mt-28">
  //         //               <img
  //         //                 src={photo.url}
  //         //                 alt={`Image ${index}`}
  //         //                 className=" self-center -ml-28 -mt-52 md:mt-12 md:ml-[780px]  w-[59%]  max-h-[1200px] md:w-full "
  //         //               />
  //         //               <button
  //         //                 onClick={closeModal}
  //         //                 className="md:hidden absolute md:top-5 top-4     md:right-0 right-6  text-white rounded-full w-12 h-12 flex items-center justify-center"
  //         //               >
  //         //                 <svg
  //         //                   className="   mt-2 float-right  "
  //         //                   xmlns="http://www.w3.org/2000/svg"
  //         //                   viewBox="0 0 62 62"
  //         //                   width="150"
  //         //                   height="150"
  //         //                   fill="#fff"
  //         //                 >
  //         //                   <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
  //         //                 </svg>
  //         //               </button>
  //         //             </div>
  //         //           </SwiperSlide>
  //         //         ))}
  //         //       </Swiper>

  //         //   </div>
  //         // </div>

  //         <div className="bg-black/70 fixed inset-0 z-50 h-full w-full   flex justify-center items-center ">
  //           {/* <button
  //            className=" float-left "
  //         >

  //         </button> */}
  //           <div
  //             ref={refGallery}
  //             className="relative flex flex-col py-2    rounded-[10px] md:w-full w-[425px]  max-md:my-10"
  //           >
  //             <div className="flex flex-row h-screen pr-[90px] bg-black md:pr-0">
  //               <div className="bg-black  ">
  //                 <svg
  //                   onClick={closeModal}
  //                   className=" ml-10 md:mx-0 -mr-8 cursor-pointer  mt-2 md:size-14 size-14  "
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   viewBox="0 0 62 62"
  //                   width="80"
  //                   height="80"
  //                   fill="#fff"
  //                 >
  //                   <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
  //
  //                 </svg>
  //
  //               </div>
  //               <div className="flex flex-col w-[90%] md:ml-4    md:w-[95%] bg-black    -py-10">
  //                 <Swiper
  //                   navigation={true}
  //                   initialSlide={currentImageIndex}
  //                   onSlideChange={(swiper) =>
  //                     setCurrentImageIndex(swiper.activeIndex)
  //                   }
  //                   centeredSlides={true}
  //                   spaceBetween={80}
  //                   className=" mySwiperprofile flex items-center justify-between w-full h-full my-2"
  //                 >
  //                   {allPhotos.map((photo, index) => (
  //                     <SwiperSlide
  //                       key={index}
  //                       className="flex justify-center items-center "
  //                     >
  //                       <div className="flex justify-between items-center w-full h-full ">
  //                         <img
  //                           src={photo.url}
  //                           alt={`Image ${index}`}
  //                           className="  w-full h-full object-contain      "
  //                         />
  //                       </div>
  //                     </SwiperSlide>
  //                   ))}
  //                 </Swiper>
  //               </div>
  //             </div>
  //           </div>
  //
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  const getPhotoClass = (numPhotos) => {
    if (numPhotos === 1) {
      return "w-[100%] max-md:h-full md:w-[63%]";
    } else if (numPhotos === 2) {
      return "w-[100%] md:w-[35%]";
    } else if (numPhotos === 3) {
      return "w-[100%] md:w-[31.2%]";
    }
    return "w-[100%] md:w-[31.2%]"; // default case for more than 3 photos
  };

  const PhotoGrid = ({ articlesWithPhoto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const allPhotos = [];
    articlesWithPhoto.forEach((article) => {
      article.image.split(";").forEach((imageUrl) => {
        allPhotos.push({ url: imageUrl });
      });
    });

    allPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));

    const handlePlusClick = (index) => {
      setCurrentImageIndex(index);
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    const photoClass = getPhotoClass(allPhotos.length);

    return (
      <div>
        <div className="flex flex-wrap md:gap-x-3 md:gap-y-3 md:m-4 gap-3 m-2 md:pl-2 pt-1 md:pt-1 ">
          {allPhotos.map((photo, index) => (
            <div key={index} className={`h-48 md:h-72 ${photoClass}`}>
              <img
                src={photo.url}
                alt={`Photo ${index}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handlePlusClick(index)}
              />
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="bg-black/70 fixed inset-0 z-50 h-full w-full flex justify-center items-center ">
            <div className="relative flex flex-col py-2 rounded-[10px] md:w-full w-[100%]  h-full max-md:my-10">
              <div className="flex flex-col h-screen  bg-black md:pr-0  h-full">
              <div className="    max-md:flex items-center  h-full justify-end max-md:-translate-x-7   ">
              <svg
                    onClick={closeModal}
                    className="  ml-1 md:fixed z-50 -mr-[50px] cursor-pointer  mt-2 max-md:translate-y-3  md:size-14 size-14  "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 62 62"
                    width="80"
                    height="80"
                    fill="#fff"
                  >
                    <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
                  </svg>
                </div>
                <div className="flex flex-col w-[100%] h-full md:ml-4 md:w-[95%]  py-10">
                  <Swiper
                    navigation={true}
                    initialSlide={currentImageIndex}
                    onSlideChange={(swiper) =>
                      setCurrentImageIndex(swiper.activeIndex)
                    }
                    centeredSlides={true}
                    spaceBetween={80}
                    className="mySwiperprofile flex items-center justify-center w-full h-full my-2"
                  >
                    {allPhotos.map((photo, index) => (
                      <SwiperSlide
                        key={index}
                        className="flex justify-center items-center"
                      >
                        <div className="flex justify-between items-center w-full h-full">
                          <img
                            src={photo.url}
                            alt={`Image ${index}`}
                            className="w-full -mt-10 h-full object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  SwiperCore.use([Pagination, Navigation]);

  const VideoGrid = ({ articlesWithVideo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndexVideo, setCurrentImageIndexVideo] = useState(0);
    const refGalleryVideo = useRef(null);
    const videoRefs = useRef([]);

    const handlePlusClickVideo = (index, event) => {
      event.preventDefault();
      setCurrentImageIndexVideo(index);
      setIsOpen(true);
    };

    const handleClickOutsideGalleryVideo = (event) => {
      if (
        refGalleryVideo.current &&
        !refGalleryVideo.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutsideGalleryVideo);
      document.addEventListener("touchstart", handleClickOutsideGalleryVideo);
      return () => {
        document.removeEventListener(
          "mousedown",
          handleClickOutsideGalleryVideo
        );
        document.removeEventListener(
          "touchstart",
          handleClickOutsideGalleryVideo
        );
      };
    }, []);

    const closeModalVideo = () => {
      setIsOpen(false);
    };

    const allVideos = [];
    articlesWithVideo.forEach((article) => {
      article.video.split(";").forEach((videoUrl) => {
        allVideos.push({ url: videoUrl, date: article.date });
      });
    });
    allVideos.sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleVideoPlay = (index) => {
      videoRefs.current.forEach((videoRef, idx) => {
        if (videoRef) {
          if (idx === index) {
            videoRef.play();
          } else {
            videoRef.pause();
          }
        }
      });
    };

    const handleSlideChange = (swiper) => {
      setCurrentImageIndexVideo(swiper.activeIndex);
      handleVideoPlay(swiper.activeIndex);
    };
    const getVideoClass = (numVideos) => {
      if (numVideos === 1) {
        return "w-[57%] md:w-[63%]";
      } else if (numVideos === 2) {
        return "w-[33%] md:w-[35%]";
      } else if (numVideos === 3) {
        return "w-[30%] md:w-[31.2%]";
      }
      return "w-[30%] md:w-[31.2%]"; // default case for more than 3 videos
    };

    const videoClass = getVideoClass(allVideos.length);
    return (
      <div>
        <div className="flex flex-wrap md:gap-x-2 md:gap-y-3 md:m-3 gap-3 m-2 md:pl-2 pt-3 md:pt-4 rounded-2xl">
          {allVideos.map((video, index) => (
            <div
              key={index}
              className={`relative 
                ${videoClass}`}
            >
              <video
                className="object-cover md:w-full md:h-72 h-40 rounded-md aspect-square"
                src={video.url}
                onClick={(event) => handlePlusClickVideo(index, event)}
              />
              <svg
                onClick={(event) => handlePlusClickVideo(index, event)}
                className="absolute flex cursor-pointer md:top-[37%] md:left-[32%] md:w-20 md:h-20 top-[37%] left-[32%] w-10 max:h-10"
                viewBox="0 0 79 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z"
                  fill="white"
                />
                <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
              </svg>
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="bg-black/100 fixed inset-0 z-50 h-full w-full overflow-auto flex justify-center items-center px-8">
            <button
              onClick={closeModalVideo}
              className="hidden absolute md:top-5 top-2 md:right-0 right-6 text-white rounded-full w-12 h-12 md:flex items-center justify-center"
            >
              <svg
                className="mt-2 float-right"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 62 62"
                width="150"
                height="150"
                fill="#fff"
              >
                <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
              </svg>
            </button>
            <div
              ref={refGalleryVideo}
              className="relative flex flex-col p-2 rounded-[10px] md:w-[725px] w-[385px] max-md:px-5 max-md:my-10"
            >
              <Swiper
                navigation={true}
                initialSlide={currentImageIndexVideo}
                onSlideChange={handleSlideChange}
                centeredSlides={true}
                slidesPerView={1}
                spaceBetween={10}
                className="mySwiperprofile"
              >
                {allVideos.map((video, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center relative"
                  >
                    <div className="imageswiper-container -mt-8">
                      <video
                        src={video.url}
                        controls
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        className="imageswipe -ml-[127px] max-h-[450px] md:w-full w-[50%] h-full md:ml-[212px]"
                        onLoadedMetadata={() =>
                          handleVideoPlay(currentImageIndexVideo)
                        }
                      />
                      <button
                        onClick={closeModalVideo}
                        className="md:hidden absolute md:top-5 top-2 md:right-0 right-6 text-white rounded-full w-12 h-12 flex items-center justify-center"
                      >
                        <svg
                          className="mt-2 float-right"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 62 62"
                          width="150"
                          height="150"
                          fill="#fff"
                        >
                          <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
                        </svg>
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <ProfileLayout onChange={handleProfileFeed} user={LocalStorageID}>
        {owner && (
          <div className="mt-4 card w-100  rounded-[10px]   border-0 p-3 mb-3">
            <div className="card-body p-2 position-relative">
              <CreatePostModal />
            </div>
          </div>
        )}

        {profileFeed === "pubs" && (
          <div className="w-full ">
            <div>
              {articles.map((item, index) => (
                <div key={`item-${index}`}>
                  {
                    <>
                      <Post article={item} setArticles={setArticles} />
                    </>
                  }
                </div>
              ))}
            </div>
          </div>
        )}
        {/* {profileFeed === "photo" && (
          <div className="w-full mt-3">
            <div>
              <div>
                {articles.length > 0 ?
                  (
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

                              {moment(article?.createdAt).format('DD MMMM YYYY')} {'  -  '}
                              {
                                moment(article?.createdAt).isAfter(moment().subtract(1, 'hour')) ?
                                  moment(article?.createdAt).fromNow(true) :
                                  moment(article?.createdAt).fromNow()
                              }

                            </span>
                          </div>
                        </div>

                        <div className="card-body d-block p-0 mb-3">
                          <div className="row ps-2 pe-2">
                            <div className="col-sm-12 p-1">
                              <div className="card-body d-block p-0 mb-3">
                                <div className="row ps-2 pe-2">
                                  {article?.image.split(';').map((imageUrl, index) => (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-4 p-1">
                                      <img
                                        className="w-100 h-auto rounded-lg mb-2"
                                        src={imageUrl}
                                        alt={`Image ${index}`}
                                      />
                                    </div>
                                  ))}
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
        )} */}

        {/* <div>
          {profileFeed === "photo" && (
            <div className="w-full mt-3">
              {articlesWithPhoto.length > 0 ? (
                <PhotoGrid articlesWithPhoto={articlesWithPhoto} />
              ) : (
                <div className="w-full mt-4 text-center">
                  Aucun Photo pour le moment
                </div>
              )}
            </div>
          )}
        </div> */}
        <div>
          {profileFeed === "photo" && (
            <div className="w-full bg-white mt-3 rounded-[12px] flex ">
              {articlesWithPhoto.length > 0 ? (
                <PhotoGrid articlesWithPhoto={articlesWithPhoto} />
              ) : (
                <div className="w-full mt-4 text-center">
                  {getTranslation(
                    `No photos at the moment.`, // -----> Englais
                    ` Aucune Photo pour le moment.` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {profileFeed === "video" && (
            // <div className="w-full mt-4 text-center">
            //   <div>
            //     <div>
            //       {articlesWithVideo.length > 0 ? (
            //         articlesWithVideo.map((article) => (
            //           <div
            //             key={article.id}
            //             className="card w-100 shadow-xss rounded-xxl  border-0 p-4 mb-3"
            //           >
            //             <div className="card-body p-0 d-flex">
            //               <figure className="avatar me-3">
            //                 <img
            //                   src={
            //                     article?.user?.user.image
            //                       ? article?.user?.user.image
            //                       : PlaceHolder
            //                   }
            //                   className="shadow-sm rounded-full w-[52px] aspect-square"
            //                   alt="post"
            //                 />
            //               </figure>
            //               <div className="flex flex-col items-start space-y-1">
            //                 <span className="text-base text-grey-900 font-semibold">
            //                   {article.user.user.nom} {article.user.user.prenom}
            //                 </span>
            //                 <span className="text-sm text-grey-500">
            //                   {article.user.user.profil === "other"
            //                     ? article.user.other?.profession
            //                     : ""}
            //                   {article.user.user.profil === "player"
            //                     ? " Joueur"
            //                     : ""}
            //                   {article.user.user.profil === "agent" &&
            //                     article.user.agent?.typeresponsable === "players"
            //                     ? "Manager de Joueur"
            //                     : ""}
            //                   {article.user.user.profil === "agent" &&
            //                     article.user.agent?.typeresponsable === "club"
            //                     ? "Manager de Club"
            //                     : ""}
            //                   {article.user.user.profil === "scout"
            //                     ? "Scout"
            //                     : ""}
            //                 </span>
            //                 <span className="text-sm text-grey-500">
            //                   {moment(article?.createdAt).format('DD MMMM YYYY')} {' - '}
            //                   {
            //                     moment(article?.createdAt).isAfter(moment().subtract(1, 'hour'))
            //                       ? moment(article?.createdAt).fromNow(true)
            //                       : moment(article?.createdAt).fromNow()
            //                   }
            //                 </span>
            //               </div>

            //               {/* <div className=" flex flex-col">
            //               <span className="text-base text-grey-900">
            //                 {article.user.user.nom} {article.user.user.prenom}
            //               </span>
            //               <span className="d-block font-xssss fw-500 text-grey-500">
            //                 {article.user.user.profil === "other"
            //                   ? article.user.other?.profession
            //                   : ""}
            //                 {article.user.user.profil === "player"
            //                   ? " Joueur"
            //                   : ""}
            //                 {article.user.user.profil === "agent" &&
            //                   article.user.agent?.typeresponsable === "players"
            //                   ? "Manager de Joueur"
            //                   : ""}
            //                 {article.user.user.profil === "agent" &&
            //                   article.user.agent?.typeresponsable === "club"
            //                   ? "Manager de CLub"
            //                   : ""}
            //                 {article.user.user.profil === "scout"
            //                   ? "Scout"
            //                   : ""}
            //               </span>
            //               <span className="d-block font-xssss fw-500 text-grey-500">
            //                 {moment(article?.createdAt).format('DD MMMM YYYY')} {'  -  '}
            //                 {
            //                   moment(article?.createdAt).isAfter(moment().subtract(1, 'hour'))
            //                     ? moment(article?.createdAt).fromNow(true)
            //                     : moment(article?.createdAt).fromNow()
            //                 }
            //               </span>
            //             </div> */}
            //             </div>
            //             <div className="card-body d-block mt-2 p-0 mb-3">
            //               <div className="row ps-2 pe-2">
            //                 <div className="col-sm-12 p-1">
            //                   {article.video && (
            //                     <div className="card-body p-0 mb-3 overflow-hidden">
            //                       <video controls className="w-100 md:max-h-[600px] max-h-[350px]">
            //                         <source src={article.video} type="video/mp4" />
            //                         Your browser does not support the video tag.
            //                       </video>
            //                     </div>
            //                   )}
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         ))
            //       ) : (
            //         <div className="w-full mt-4 col-xl-8 col-xxl-9 col-lg-8 text-center">
            //           Aucun Video pour le moment
            //         </div>
            //       )}
            //     </div>
            //   </div>
            // </div>

            <div className="w-full bg-white mt-3 rounded-[12px] flex ">
              {articlesWithVideo.length > 0 ? (
                <VideoGrid articlesWithVideo={articlesWithVideo} />
              ) : (
                <div className="w-full mt-4 text-center">
                  {getTranslation(
                    `No Video at the moment.`, // -----> Englais
                    ` Aucune vedeo pour le moment.` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </ProfileLayout>
    </>
  );
};

export default Index;
