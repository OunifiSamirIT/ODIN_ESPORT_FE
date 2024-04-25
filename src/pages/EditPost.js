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
  console.log("Article ID:", articleId); 
    const navigate = useNavigate();
  const [editArticle, setEditArticle] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileType, setFileType] = useState("");
  const [posting, setPosting] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
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

          // Set preview image if there's an existing image
          if (article.image) {
              setPreviewImage(article.image);
          }

          // Set preview video if there's an existing video
          if (article.video) {
              setVideoPreviewUrl(article.video);
          }
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




    const Redirect = () =>{
      window.location.href = "/home";
    }
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

      if (file) {
        formData.append("file", file);
        formData.append("fileType", fileType || "");
      }

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
      } else {
        console.error("Error updating article:", response.statusText);
        const errorData = await response.json();
        setErrMsg({
          status: "failed",
          message: errorData.message || "Error updating article",
        });
      }
    } catch (error) {
      console.error("Error updating article:", error);
      setErrMsg({ status: "failed", message: "Error updating article" });
    } finally {
      setPosting(false);
    }
  };

  if (!editArticle) {
    return <p>Loading...</p>;
  }



  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;


  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player", "other"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);
  return (
    <Fragment>
   
     
              

                  <div className="card w-100 shadow-xss rounded-md  border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                    <div className="card-body gap-3 p-0 mt-3 position-relative">
                     
                      {previewImage && (
                        <div className="mt-3">
                          <img
                            src={previewImage}
                            className="rounded-xxl "
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
                      <form onSubmit={handleUpdateArticle}>
                      <div className="card-body flex items-center mt-4">
    <div className="rounded-full overflow-hidden flex-shrink-0">
        <img
            src={storedUserData.image}
            alt="icon"
            className="shadow-sm w-14 h-14 object-cover object-center"
        />
    </div>
    <input
        name="description"
        className="h50 border-0 w-full ml-3 rounded-xxl bg-gray-100 p-2 ps-1 font-xssss text-black-500 fw-500 border-light-md theme-dark-bg"
        type="text"
        value={editArticle?.description}
        onChange={(e) =>
            setEditArticle((prev) => ({
                ...prev,
                description: e.target.value,
            }))
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
       <div className="flex flex-wrap justify-between items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark px-4">
    <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <label
            htmlFor="imgUpload"
            className="flex items-center font-xssss fw-600 ls-1 mt-1 text-grey-700 text-dark"
        >
            <input
                type="file"
                onChange={(e) => handleFileChange(e, "image")}
                className="hidden"
                id="imgUpload"
                accept=".jpg, .png, .jpeg"
            />
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e551e68fdbcd650c5d3478899a198aaa88ca7d52f6efdc1e5c1cb201ebab45?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="aspect-square w-6 md:w-7 mr-2"
            />{" "}
            <span className="md:inline-block">Photo</span>
        </label>

        <label
            htmlFor="videoUpload"
            className="flex items-center font-xssss fw-600 ls-1 text-grey-700 text-dark"
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
                className="aspect-square w-6 md:w-7 mr-2"
            />{" "}
            <span className="md:inline-block">Video</span>
        </label>

        <label
            htmlFor="vgifUpload"
            className="flex items-center font-xssss mt-1 fw-600 ls-1 text-grey-700 text-dark"
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
                className="aspect-square w-7 fill-slate-500 mr-2"
            />{" "}
            <span className="md:inline-block">GIF</span>
        </label>
    </div>

    <div className="w-full flex items-center justify-center md:w-auto md:text-center">
        <button 
                type="submit"
                // onClick={() => Redirect()}
            >
enrigstrer </button>      
    </div>
</div>



                      </form>
                    </div>
                  </div>
               
      
    </Fragment>
  );
}

export default EditPost;
