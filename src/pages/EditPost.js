import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header2";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Load from "../components/Load";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import ReactPlayer from "react-player";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton"; // Assuming you have a CustomButton component
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { BsFiletypeGif } from "react-icons/bs";
import Loading from "../components/Loading";
import { useForm } from "react-hook-form";
import { Config } from "../config";
function EditPost({ articleId, onClose }) {
  // const { articleId } = useParams();

  const navigate = useNavigate();
  const [editArticle, setEditArticle] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileType, setFileType] = useState("");
  const [posting, setPosting] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [originalArticle, setOriginalArticle] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchArticle();
  }, [articleId]);
  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/articles/${articleId}`
      );
      if (response.ok) {
        const article = await response.json();
        setEditArticle(article);

        // if (article.image) {
        //     setPreviewImage(article.image);
        // }

        // // Set preview video if there's an existing video
        // if (article.video) {
        //     setVideoPreviewUrl(article.video);
        // }
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };

  const Redirect = () => {
    window.location.href = "/home";
  };
  const handleUpdateArticle = async (e) => {
    e.preventDefault();

    try {
      if (!editArticle.description) {
        setErrMsg({
          status: "failed",
          message: "Fill all the information",
        });
        return;
      }

      setPosting(true);

      const formData = new FormData();
      formData.append("titre", editArticle.titre);
      formData.append("description", editArticle.description);

      // if (file) {
      //   formData.append("file", file);
      //   formData.append("fileType", fileType || "");
      // }

      const response = await fetch(
        `${Config.LOCAL_URL}/api/articles/${editArticle.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedArticle = await response.json();
        setEditArticle(updatedArticle);
        setIsFormSubmitted(true);
        window.location.href = "/home";
      } else {
        const errorData = await response.json();
        setErrMsg({
          status: "failed",
          message: errorData.message || "Error updating article",
        });
      }
    } catch (error) {
      setErrMsg({ status: "failed", message: "Error updating article" });
    } finally {
      setPosting(false);
    }
  };

  if (!editArticle) {
    return <p>Loading...</p>;
  }

  const handleResetDescription = () => {
    // Reset the description to its original value
    setEditArticle((prev) => ({
      ...prev,
      description: "", // Change this to the initial value of the description if available
    }));
  };
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player", "other"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);
  return (
    <Fragment>
      <div className="flex flex-col items-center px-10 py-2 w-full  text-base bg-white rounded-xl max-w-[772px] max-md:px-5">
        <div className="text-xl text-center md:text-3xl flex justify-center items-center font-bold text-black w-full">
          Modifier votre publication
        </div>
        <form className="w-full" onSubmit={handleUpdateArticle}>
          <div className="flex flex-col justify-center py-2 mt-6 w-full font-light bg-white rounded-xl text-neutral-500 max-md:max-w-full">
            <div className="flex flex-col md:flex-row md:gap-4  ">
              <img
                src={storedUserData.image}
                alt="icon"
                className="  w-14 h-14 mb-2 object-cover rounded-full aspect-square  object-center"
              />
              <div className="flex-1 justify-center py-4 pr-1 pl-1 bg-gray-100 rounded-[30px] max-md:pl-5 max-md:max-w-full">
                <div className=" flex  ">
                  <textarea
                    name="description"
                    className="flex-1 justify-center pb-10 w-full pr-1 pl-1  bg-gray-100   "
                    value={editArticle?.description}
                    onChange={(e) =>
                      setEditArticle((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  >
                    {" "}
                  </textarea>
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
              </div>
            </div>
          </div>
          {isFormSubmitted && (
            <div className="flex self-center justify-center items-center text-center px-2.5 py-2 mt-6 md:text-md  text:sm md:mx-12 font-medium text-gray-800 bg-green-200 rounded-lg">
              Votre Poste a éte modifie avec succès
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-y-2 justify-between py-2 mr-4 w-full text-base font-medium flex-nowrap">
            <div className="hidden md:flex gap-2 items-center justify-center  px-4 py-2 text-orange-600 border-2 border-solid border-orange-600 rounded-[30px] max-md:px-5">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                  fill="#FF7F00"
                />
              </svg>
              <button onClick={() => handleResetDescription()} className="">
                Annuler
              </button>
            </div>
            <div className="flex gap-2 items-center justify-center   px-4 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                className="w-5 aspect-square"
              />
              <button type="submit" className="">
                Confirmer
              </button>
            </div>
            <div className="md:hidden flex gap-2 items-center justify-center  px-4 py-2 text-orange-600 border-2 border-solid border-orange-600 rounded-[30px] max-md:px-5">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                  fill="#FF7F00"
                />
              </svg>
              <button onClick={() => handleResetDescription()} className="">
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default EditPost;
