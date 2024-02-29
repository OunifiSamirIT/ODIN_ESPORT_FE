import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
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

function EditPost() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [editArticle, setEditArticle] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileType, setFileType] = useState("");
  const [posting, setPosting] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchArticle = async () => {
        try {
            const response = await fetch(
                `https://odine-sport.com/api/articles/${articleId}`
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

    fetchArticle();
}, [articleId]);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
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

      if (file) {
        formData.append("file", file);
        formData.append("fileType", fileType || "");
      }

      const response = await fetch(
        `https://odine-sport.com/api/articles/${editArticle.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedArticle = await response.json();
        setEditArticle(updatedArticle);
        navigate("/home");
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

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card-body p-0 mt-3 position-relative">
                  {/* {previewImage && (
                    <div className="mt-3">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="rounded-xxl"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    </div>
                  )} */}

                  {/* <form onSubmit={handleUpdateArticle}>
                    <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                     
                      <label>{storedUserData.login}</label>
                      <input
                        className={` rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-6 py-3 placeholder:text-[#666] `}
                        placeholder="Show your Skills here, your dream begins from here...."
                        name="description"
                        type="text"
                        value={editArticle.description}
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
                    <div className="flex items-center justify-between py-4">
                      <label
                        htmlFor="imgUpload"
                        className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                      >
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "image")}
                          className="hidden"
                          id="imgUpload"
                          accept=".jpg, .png, .jpeg"
                        />
                        <BiImages />
                        <span>Image</span>
                      </label>

                      <label
                        className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                        htmlFor="videoUpload"
                      >
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "video")}
                          className="hidden"
                          id="videoUpload"
                          accept=".mp4, .wav"
                        />
                        <BiSolidVideo />
                        <span>Video</span>
                      </label>


                      <div>
                        {posting ? (
                          <Loading />
                        ) : (
                          <CustomButton
                            type="submit"
                            title="Update Post"
                            containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </form> */}

                  {/*                     dddddddddddddddddddddddddddddddddd */}

                  <div className="card w-100 shadow-xss rounded-md  border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                    <div className="card-body p-0 mt-3 position-relative">
                      {/* <figure className="avatar position-absolute ms-2 mt-1 top-5">
                      <img
                        src={user.image}
                        alt="icon"
                        className="shadow-sm rounded-full  w-10 h-10"
                      />
                    </figure> */}
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
                      <form onSubmit={handleUpdateArticle}>
                        <div className="card-body d-flex p-0 mt-4">
                          <img
                            src={storedUserData.image}
                            alt="icon"
                            className="shadow-sm rounded-full  w-14 h-14 mr-2"
                          />
                          {/* <label>{storedUserData.login}</label> */}
                          <input
                               name="description"
                               className="h50 bor-0 w-100 rounded-xxl bg-gray-100 p-2 ps-5 font-xssss text-black-500 fw-500 border-light-md theme-dark-bg"
                               type="text"
                               value={editArticle?.description }
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
                        <div className="d-flex align-items-center justify-content-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                          <label
                            htmlFor="imgUpload"
                            className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
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
                              className="aspect-square w-[25px]"
                            />{" "}
                            <span className="d-none-xs ml-2">Photo</span>
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
                            />{" "}
                            <span className="d-none-xsml-2 ml-2"> Video</span>
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
                            />{" "}
                            <span className="d-none-xs ml-2">GIF</span>
                          </label>

                          <div>
                            {posting ? (
                              <Loading />
                            ) : (
                              <CustomButton
                              type="submit"
                              title="Update Post"
                                containerStyles="bg-[#0444a4] text-white mt-1 py-1 px-10 rounded-full font-semibold text-sm"
                              />
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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

export default EditPost;
