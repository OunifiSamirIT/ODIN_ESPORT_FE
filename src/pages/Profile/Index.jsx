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


  const [originalArticle, setOriginalArticle] = useState(null);
  const storedUserDatad = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;

  const fetchArticleById = async (id) => {
    // Replace with your API call
    return fetch(`${Config.LOCAL_URL}/api/articles/${storedUserDatad.id}`, {
      credentials: "include",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },
    })
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


 

  

 

  const LocalStorageID = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  // const isOwner = LocalStorageID.id == id;

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/articles/byUser/${id}`,
        {
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
          `${Config.LOCAL_URL}/api/user/${userId}`,
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          }
        );
        const userData = await userResponse.json();

        const comtResponse = await fetch(
          `${Config.LOCAL_URL}/api/commentaires/article/${comt}`,
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          }
        );
        const commentsData = await comtResponse.json();

        const likesCountResponse = await fetch(
          `${Config.LOCAL_URL}/api/likes/article/allLikes`,
          {
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



  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    if (id) {
      const userId = id;
      // Fetch gallery items for the specific user ID
      fetch(`${Config.LOCAL_URL}/api/articles/gallery/${userId}`, {
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
      const response = await fetch(`${Config.LOCAL_URL}/api/album`, {
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



  useEffect(() => {}, [articleComments]);

 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const storedLanguage = localStorage.getItem("language");
  const language = storedLanguage ? storedLanguage.toLowerCase() : "";

  // Set the locale based on the stored language or default to English
  moment.locale(language === "fr" ? "fr" : "en");

  Modal.setAppElement("#root");

  const getPhotoClass = (numPhotos) => {
    if (numPhotos === 0) {
      return "w-[57%] max-md:h-full md:w-[63%]";
    } else if (numPhotos === 1) {
      return "w-[33%] md:w-[35%]";
    } else if (numPhotos === 2) {
      return "w-[29.5%] md:w-[31.2%]";
    }
    return "w-[29.5%] md:w-[31.2%]"; // default case for more than 3 photos
  };
//   const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

//   const goToNextSlide = () => {
//     if (currentIndex < allPhotos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };
  
//   const goToPrevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };
//   const PhotoGrid = ({ articlesWithPhoto }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const allPhotos = [];
//     articlesWithPhoto.forEach((article) => {
//       article.image.split(";").forEach((imageUrl) => {
//         allPhotos.push({ url: imageUrl });
//       });
//     });

//     allPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));

//     const handlePlusClick = (index) => {
//       setCurrentImageIndex(index);
//       setIsOpen(true);
//     };

//     const closeModal = () => {
//       setIsOpen(false);
//     };

//     const photoClass = getPhotoClass(allPhotos.length);

//     return (
//       <div>
//         <div className="flex flex-wrap md:gap-x-3 md:gap-y-3 md:m-4 gap-3 m-2 md:pl-2 pt-1 md:pt-1 ">
//           {allPhotos.map((photo, index) => (
//             <div key={index} className={`h-48 md:h-72 ${photoClass}`}>
//               <img
//                 src={photo.url}
//                 alt={`Photo ${index}`}
//                 className="w-full h-full object-cover rounded-lg cursor-pointer"
//                 onClick={() => handlePlusClick(index)}
//               />
//             </div>
//           ))}
//         </div>

//         {isOpen && (
//           <div className="bg-black/70 fixed inset-0 z-50 h-full w-full flex justify-center items-center ">
//             <div className="relative flex flex-col py-2 rounded-[10px] md:w-full w-[100%]  h-full max-md:my-10">
//               <div className="flex flex-col h-screen  bg-black md:pr-0  ">
//                 <div className="    max-md:flex items-center  h-full justify-end max-md:-translate-x-7   ">
//                   <svg
//                     onClick={closeModal}
//                     className="  ml-1 md:fixed z-50 -mr-[50px] cursor-pointer  mt-2 max-md:translate-y-3  md:size-14 size-14  "
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 62 62"
//                     width="80"
//                     height="80"
//                     fill="#fff"
//                   >
//                     <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
//                   </svg>
//                 </div>
//                 <div className="flex flex-col w-[100%] h-full md:ml-4 md:w-[95%]  py-10">
//                 <Swiper
//   modules={[Pagination, Navigation]}
//   navigation={{
//     prevEl: '.custom-prev',
//     nextEl: '.custom-next',
//     enabled: true,
//   }}
//   initialSlide={currentIndex}
//   controller={{ control: true }}
//   onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
//   slidesPerView={1}
//   allowTouchMove={false}
//   speed={300}
//   spaceBetween={0}
//   className="mySwiperprofile flex items-center justify-center w-full h-full my-2"
// >
//   <button 
//     className="custom-prev absolute left-4 z-50 bg-black/50 rounded-full p-2"
//     onClick={goToPrevSlide}
//   >
//     <svg width="24" height="24" viewBox="0 0 24 24">
//       <path fill="white" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
//     </svg>
//   </button>
//   <button 
//     className="custom-next absolute right-4 z-50 bg-black/50 rounded-full p-2"
//     onClick={goToNextSlide}
//   >
//     <svg width="24" height="24" viewBox="0 0 24 24">
//       <path fill="white" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
//     </svg>
//   </button>
  
//   {allPhotos.map((photo, index) => (
//     <SwiperSlide
//       key={index}
//       className="flex justify-center items-center"
//     >
//       <div className="flex justify-between items-center w-full h-full">
//         <img
//           src={photo.url}
//           alt={`Image ${index}`}
//           className="w-full -mt-10 h-screen md:h-full object-contain"
//         />
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };
  // SwiperCore.use([Pagination, Navigation]);
  const PhotoGrid = ({ articlesWithPhoto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const allPhotos = [];
    articlesWithPhoto.forEach((article) => {
      article.image.split(";").forEach((imageUrl) => {
        allPhotos.push({ url: imageUrl });
      });
    });
  
    allPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const handlePlusClick = (index) => {
      setCurrentIndex(index);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const goToNextSlide = () => {
      if (currentIndex < allPhotos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const goToPrevSlide = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    const photoClass = getPhotoClass(allPhotos.length);
  
    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (!isOpen) return;
        
        if (e.key === 'ArrowRight') {
          goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
          goToPrevSlide();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, isOpen]);
  
    return (
      <div>
        <div className="flex flex-wrap md:gap-x-3 md:gap-y-3 md:m-4 gap-3 m-2 md:pl-2 pt-1 md:pt-1">
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
          <div className="bg-black/70 fixed inset-0 z-50 h-full w-full flex justify-center items-center">
            <div className="relative flex flex-col py-2 rounded-[10px] md:w-full w-[100%] h-full max-md:my-10">
              <div className="flex flex-col h-screen bg-black md:pr-0">
                {/* Close button */}
                <div className="max-md:flex items-center h-full justify-end max-md:-translate-x-7">
                  <svg
                    onClick={closeModal}
                    className="ml-1 md:fixed z-50 -mr-[50px] cursor-pointer mt-2 max-md:translate-y-3 md:size-14 size-14"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 62 62"
                    width="80"
                    height="80"
                    fill="#fff"
                  >
                    <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
                  </svg>
                </div>
  
                {/* Main image container */}
                <div className="flex flex-col w-[100%] h-full md:ml-4 md:w-[95%] py-10 relative">
                  <div className="flex items-center justify-center h-full">
                    {/* Previous button */}
                    <button
                      className="absolute left-4 z-50 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                      onClick={goToPrevSlide}
                      disabled={currentIndex === 0}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="white" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
  
                    {/* Current image */}
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={allPhotos[currentIndex].url}
                        alt={`Image ${currentIndex}`}
                        className="w-full -mt-10 h-screen md:h-full object-contain"
                      />
                    </div>
  
                    {/* Next button */}
                    <button
                      className="absolute right-4 z-50 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                      onClick={goToNextSlide}
                      disabled={currentIndex === allPhotos.length - 1}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="white" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                      </svg>
                    </button>
                  </div>
  
                  {/* Optional: Image counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                    {currentIndex + 1} / {allPhotos.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
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
      <ProfileLayout onChange={handleProfileFeed} user={LocalStorageID?.id}>
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
