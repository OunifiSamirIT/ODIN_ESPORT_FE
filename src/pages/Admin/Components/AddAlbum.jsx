import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Dropzone from "../Components/Dropzone";
import Header from "../Components/AdminHeader";
import Appfooter from "../../../components/Appfooter";
import Popupchat from "../../../components/Popupchat";
import { useForm } from "react-hook-form";
import { Config } from "../../../config";
const AddEvent = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("AlbumName", data.AlbumName);
    formData.append("Description", data.Description);
    data.file.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userID", storedUserData.id);
    await fetch(`${Config.LOCAL_URL}/api/album/upload`, {
      method: "POST",
      body: formData,
    });
    navigate("/home");
  };

  const handleFileChange = async () => {
    setValue("file", uploadedFiles);
  };
  return (
    <>
      <Header />

      <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                  <a href="/admin/album" className="d-inline-block mt-2">
                    <i className="ti-arrow-left font-sm text-white"></i>
                  </a>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    Create New Album
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Album Name
                          </label>
                          <input
                            {...register("AlbumName")}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Dropzone
                        onChange={handleFileChange}
                        multiple={true}
                        setUploadedFiles={setUploadedFiles}
                      />
                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                          Description
                        </label>
                        <textarea
                          {...register("Description")}
                          className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                          rows="5"
                          placeholder="Write your message... (optional)"
                        ></textarea>
                      </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popupchat />
      <Appfooter />
    </>
  );
};
export default AddEvent;
