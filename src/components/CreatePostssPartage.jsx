import React from "react";
import { Config } from "../config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import Loading from "./Loading";
import placeholder from "../assets/placeholder.jpg";
import { useRef } from "react";
import { Context } from "../index";
import { Link } from "react-router-dom";
import moment from "moment/moment";
// import 'moment/locale/fr';
// import 'moment/locale/en';
import "../../node_modules/moment/locale/fr";
import "../../node_modules/moment/locale/en-ca";
import secureLocalStorage from "react-secure-storage";

function CreatePost({ setArticles, onClose }) {
  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [user, setUser] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({ description: "", otherField: "" });
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]); // State for storing media files

  const [fileType, setFileType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const loadRemainingArticles = (remainingArticles) => {
    setArticles((prevArticles) => [...prevArticles, ...remainingArticles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Filter out media files based on type
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const videoFile = selectedFiles.find((file) =>
      file.type.startsWith("video/")
    );

    // Update state with media files
    setMediaFiles([...imageFiles, videoFile].filter(Boolean));

    // Set preview images for each uploaded image
    const imagePreviewURLs = imageFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImage(imagePreviewURLs);

    // Set video preview URL
    if (videoFile) {
      const videoPreviewURL = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(videoPreviewURL);
    } else {
      setVideoPreviewUrl(null);
    }
  };

  const _ref_previewImage = useRef(null);
  const _ref_previewVideo = useRef(null);

  const [originalArticle, setOriginalArticle] = useState(null);
  const [articlesPartage, setArticlesPartage] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("${Config.LOCAL_URL}/api/articles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedArticles = await response.json();
        setArticlesPartage(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);
  const fetchArticleById = async (id) => {
    // Replace with your API call
    return fetch(`${Config.LOCAL_URL}/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  };
  useEffect(() => {
    if (articlesPartage.sharedFrom) {
      fetchArticleById(articlesPartage.sharedFrom)
        .then((data) => setOriginalArticle(data))
        .catch((err) => console.error("Error fetching original article:", err));
    }
  }, [articlesPartage.sharedFrom]);
  const displayArticle = originalArticle || articlesPartage;

  const handlePostSubmitPartage = async (data) => {
    try {
      setPosting(true);

      const formData = new FormData();
      formData.append("description", data.description || ""); // Append empty string if description is null
      formData.append("userId", storedUserData.id);

      // Determine the original article to be shared
      if (originalArticle) {
        formData.append("sharedFrom", originalArticle.id);
      } else {
        formData.append("sharedFrom", article.id);
      }

      await fetch(`${Config.LOCAL_URL}/api/articles/`, {
        method: "POST",
        body: formData,
      });

      setValue("description", "");
      setPosting(false);
    } catch (error) {
      setPosting(false);
    }
  };

  const hendelrest = () => {
    setData("");
  };
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData.token;

    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const id = storedUserDatad ? storedUserDatad.id : null;
    console.log("eeeeeeeeeeeee", tokenn);

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      }).then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    // fetchArticles();
  }, []);
  const [textareaHeight, setTextareaHeight] = useState("70px");
  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    if (e && textAreaRef.current) {
      const newHeight = e.target.value
        ? `${textAreaRef.current.scrollHeight}px`
        : `${textAreaRef.current.scrollHeight}px`;
      setTextareaHeight(newHeight);
      setValue("description", e.target.value); // Update the form value
    }
  };

  useEffect(() => {
    handleChange(); // Initial calculation of height
  }, []); // Run only once after component mounted
  const [showFullText, setShowFullText] = useState(false);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const storedLanguage = localStorage.getItem("language");
  const language = storedLanguage ? storedLanguage.toLowerCase() : "";

  // Set the locale based on the stored language or default to English
  moment.locale(language === "fr" ? "fr" : "en");
  return (
    <div className="flex flex-col ml-5 w-[90%] h-[425px]  md:mt-0  max-md:ml-0 max-md:w-full">
      <div className=" card w-100  rounded-[10px] pt-2 md:pt-2   border-0 mb-3">
        <div className="card-body p-2 position-relative">
          <div className="flex flex-col">
            <form
              className="h-[695px] mb-2 flex flex-col"
              onSubmit={handleSubmit(handlePostSubmitPartage)}
            >
              <div className="card-body flex flex-col  d-flex p-0">
                <div className="flex flex-col w-full mb-2">
                  <div className="flex flex-row mb-3 ">
                    <img
                      srcSet={
                        user?.user?.image ? user?.user.image : placeholder
                      }
                      alt="icon"
                      className="shadow-sm rounded-full aspect-square w-11 h-11 md:w-16 md:h-16 mr-2"
                    />
                    <div className="mt-[5px] md:mt-3  text-xs  ">
                      <div className="flex  flex-row">
                        {" "}
                        <div className="font-bold mr-1"> {user?.user?.nom}</div>
                        <span> </span>
                        <div className="font-bold"> {user?.user?.prenom}</div>
                      </div>

                      {
                        <div className="text-gray-400 font-sans">
                          {user?.user?.profil === "other" &&
                            user?.other?.profession}
                          {user?.user?.profil === "player" && "Joueur"}
                          {user?.user?.profil === "agent" &&
                            user?.agent?.typeresponsable === "players" &&
                            "Manager de Joueur"}
                          {user?.user?.profil === "agent" &&
                            user?.agent?.typeresponsable === "club" &&
                            "Manager de Club"}
                          {user?.user?.profil === "scout" && "Scout"}
                        </div>
                      }
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-y-2">
                    <textarea
                      className="flex max-h-fit px-2 pt-2 h-28 justify-center bg-gray-100 rounded-[8px] md:rounded-[10px] theme-dark-bg"
                      placeholder="Quoi de neuf ?"
                      name="description"
                      {...register("description")}
                      onChange={handleChange} // Handle change
                    ></textarea>
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
                  </div>
                </div>

                {displayArticle === originalArticle && (
                  <div
                    key={originalArticle?.id}
                    className="card w-100 flex flex-col shadow-xss rounded-xxl border-1 p-4 mb-3"
                  >
                    <div className="card-body p-0 d-flex">
                      <Link
                        to={`/profile/${originalArticle?.userspartage?.id}`}
                      >
                        <figure className="avatar me-3">
                          <img
                            srcSet={
                              originalArticle?.userspartage?.image
                                ? originalArticle?.userspartage?.image
                                : placeholder
                            }
                            className="shadow-sm rounded-full w-[52px] aspect-square"
                            alt="post"
                          />
                        </figure>
                      </Link>

                      <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        <Link
                          to={`/profile/${originalArticle?.userspartage?.id}`}
                        >
                          {originalArticle?.userspartage?.nom} {"   "}
                          {originalArticle?.userspartage?.prenom}
                        </Link>
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {originalArticle?.userspartage?.profil == "other"
                            ? originalArticle?.userspartage?.other?.profession
                            : ""}
                          {originalArticle?.userspartage?.profil == "player"
                            ? " Joueur"
                            : ""}
                          {originalArticle?.userspartage?.profil == "coach"
                            ? " Entraîneur"
                            : ""}
                          {originalArticle?.userspartage?.profil == "agent" &&
                          originalArticle?.userspartage?.agent
                            ?.typeresponsable == "players"
                            ? "Manager de Joueur"
                            : ""}
                          {originalArticle?.userspartage?.profil == "agent" &&
                          originalArticle?.userspartage?.agent
                            ?.typeresponsable == "club"
                            ? "Manager de Club"
                            : ""}
                          {originalArticle?.userspartage?.profil == "scout"
                            ? "Scout"
                            : ""}
                        </span>
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {moment(originalArticle?.createdAt).format(
                            "DD MMMM YYYY"
                          )}{" "}
                          {"  -  "}
                          {moment(originalArticle?.createdAt).isAfter(
                            moment().subtract(1, "hour")
                          )
                            ? moment(originalArticle?.createdAt).fromNow(true)
                            : moment(originalArticle?.createdAt).fromNow()}
                        </span>
                      </h4>
                    </div>

                    <div className="p-0 mt-2">
                      <p className="rounded-md break-inside-avoid-page text-wrap text-base w-full mb-2 text-dark">
                        {!showFullText &&
                        originalArticle?.description?.length > 295
                          ? originalArticle?.description?.substring(0, 295) +
                            "..."
                          : originalArticle.description}
                        {originalArticle?.description?.length > 295 && (
                          <button
                            onClick={toggleText}
                            className="text-blue-600 hover:text-blue-400 focus:outline-none"
                          >
                            {showFullText ? "Voir moins" : "Voir plus"}
                          </button>
                        )}
                      </p>
                    </div>

                    {originalArticle?.image && (
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            <img
                              className="md:max-h-[600px] max-h-[350px] w-100 object-contain"
                              src={originalArticle?.image}
                              alt={originalArticle?.titre}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {originalArticle?.video && (
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            <div className="card-body p-0 mb-3 overflow-hidden">
                              <video
                                controls
                                className="w-100 md:max-h-[600px] max-h-[350px]"
                              >
                                <source
                                  src={originalArticle?.video}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {displayArticle === articlesPartage && (
                  <div
                    key={articlesPartage?.id}
                    className="card w-100 flex flex-col shadow-xss rounded-xxl border-1 p-4 mb-3"
                  >
                    <div className="card-body p-0 d-flex">
                      <Link to={`/profile/${articlesPartage?.user?.user?.id}`}>
                        <figure className="avatar me-3">
                          <img
                            srcSet={
                              articlesPartage?.user?.user?.image
                                ? articlesPartage?.user?.user?.image
                                : placeholder
                            }
                            className="shadow-sm rounded-full w-[52px] aspect-square"
                            alt="post"
                          />{" "}
                        </figure>
                      </Link>

                      <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        <Link
                          to={`/profile/${articlesPartage?.user?.user?.id}`}
                        >
                          {articlesPartage?.user?.user?.nom} {"   "}
                          {articlesPartage?.user?.user?.prenom}{" "}
                        </Link>
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {articlesPartage?.user?.user?.profil == "other"
                            ? articlesPartage?.user?.other?.profession
                            : ""}
                          {articlesPartage?.user?.user?.profil == "player"
                            ? " Joueur"
                            : ""}
                          {articlesPartage?.user?.user?.profil == "coach"
                            ? " Entraîneur"
                            : ""}
                          {articlesPartage?.user?.user?.profil == "agent" &&
                          articlesPartage?.user?.agent?.typeresponsable ==
                            "players"
                            ? "Manager de Joueur"
                            : ""}
                          {articlesPartage?.user?.user?.profil == "agent" &&
                          articlesPartage?.user?.agent?.typeresponsable ==
                            "club"
                            ? "Manager de CLub"
                            : ""}
                          {articlesPartage?.user?.user?.profil == "scout"
                            ? "Scout"
                            : ""}
                        </span>

                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {moment(articlesPartage?.createdAt).format(
                            "DD MMMM YYYY"
                          )}{" "}
                          {"  -  "}
                          {moment(articlesPartage?.createdAt).isAfter(
                            moment().subtract(1, "hour")
                          )
                            ? moment(articlesPartage?.createdAt).fromNow(true)
                            : moment(articlesPartage?.createdAt).fromNow()}
                        </span>
                      </h4>
                    </div>

                    <div class=" p-0  mt-2">
                      <p className="rounded-md break-inside-avoid-page text-wrap text-base w-full mb-2 text-dark">
                        {!showFullText &&
                        articlesPartage?.description?.length > 295
                          ? articlesPartage?.description?.substring(0, 295) +
                            "..."
                          : articlesPartage?.description}
                        {articlesPartage?.description?.length > 295 && (
                          <button
                            onClick={toggleText}
                            className="text-blue-600  hover:text-blue-400 focus:outline-none"
                          >
                            {showFullText ? "Voir moins" : "Voir plus"}
                          </button>
                        )}
                      </p>
                    </div>

                    {articlesPartage?.image && (
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1 ">
                            <img
                              className=" md:max-h-[600px]   max-h-[350px]   w-100 object-contain "
                              src={articlesPartage.image}
                              alt={articlesPartage.titre}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {articlesPartage?.video && (
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            <div className="card-body p-0 mb-3  overflow-hidden ">
                              <video
                                controls
                                className=" w-100 md:max-h-[600px] max-h-[350px]"
                              >
                                <source
                                  src={articlesPartage.video}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {posting ? (
                  <Loadingpartage />
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 self-center mb-2  items-center text-center w-full py-2.5 m text-white mt-3  px-8 rounded-full font-semibold text-sm"
                  >
                    {getTranslation(
                      `Share`, // -----> Englais
                      `Partager` //  -----> Francais
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
