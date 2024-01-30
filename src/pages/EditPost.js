import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Load from "../components/Load";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import ReactPlayer from "react-player";
import TextInput from "../components/TextInput"; // Assuming you have a TextInput component
import CustomButton from "../components/CustomButton"; // Assuming you have a CustomButton component
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { BsFiletypeGif } from "react-icons/bs";
import Loading from "../components/Loading";

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

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8088/api/articles/${articleId}`
        );
        if (response.ok) {
          const article = await response.json();
          setEditArticle(article);
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
        `http://localhost:8088/api/articles/${editArticle.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedArticle = await response.json();
        setEditArticle(updatedArticle);
        navigate("/");
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
                  <form onSubmit={handleUpdateArticle}>
                    <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                      {/* <img
                        src={user.image}
                        alt="User Image"
                        className="w-20 h-16 rounded-full object-fill"
                      /> */}
                      <label>{storedUserData.login}</label>
                      <input
            className={` rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-6 py-3 placeholder:text-[#666] `}
            placeholder="Show your Skills here, your dream begins from here...."
                        name="description"
                        type="text"
                        value={editArticle.description}
                        onChange={(e) =>
                          setEditArticle((prev) => ({ ...prev, description: e.target.value }))
                        
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

                      {/* Your other code for file uploads */}

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
                  </form>
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
