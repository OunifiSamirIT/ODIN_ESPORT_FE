import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/AdminHeader";
import Dropzone from "../Components/Dropzone";
import Appfooter from "../../../components/Appfooter";
import Popupchat from "../../../components/Popupchat";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";
const AddArticle = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [imageSrc, setImageSrc] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [article, setArticle] = useState("");
  const quillRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {}, [article]);

  const handleArticlechange = (e) => {
    setArticle(e);
    setValue("article", JSON.stringify(e));
  };
  const storedUserDatad = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserDatad.token;
  const onSubmit = async (data) => {
    const response = await fetch(`${Config.LOCAL_URL}/api/blog/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      setValue("title", "");
      setValue("article", "");
      setValue("tags", "");
      toast.success("Article ete ajoutée", {
        position: "top-right",
        autoClose: 5000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/admin/blog");
    }
  };
  const handleFileChange = async () => {
    setValue("file", uploadedFiles);
  };
  useEffect(() => {
    setValue("imageUrl", imageSrc);
  }, [imageSrc]);
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/blog/upload`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        });

        if (response.ok) {
          const imageUrl = await response.json();

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageUrl.message);
          setImageSrc((prevImageSrc) => [...prevImageSrc, imageUrl.message]);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "code-block"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    []
  );
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Header />

      <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                  <Link to="/admin/blog" className="d-inline-block mt-2">
                    <i className="ti-arrow-left font-sm text-white"></i>
                  </Link>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    Create Article
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Title
                          </label>
                          <input
                            {...register("title")}
                            type="text"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group mt-4">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Article
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={article}
                            onChange={(e) => handleArticlechange(e)}
                            ref={quillRef}
                            modules={modules}
                            placeholder="Write something..."
                          />
                        </div>
                        <div className="form-group mt-4">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Tags
                          </label>
                          <input
                            {...register("tags")}
                            type="text"
                            className="form-control"
                            placeholder="Enter tags separated by commas"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                  <div dangerouslySetInnerHTML={{ __html: article }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddArticle;
