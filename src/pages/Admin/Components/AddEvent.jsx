import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/AdminHeader";
import Dropzone from "../Components/Dropzone";
import Appfooter from "../../../components/Appfooter";
import Popupchat from "../../../components/Popupchat";
import { useForm } from "react-hook-form";
import { Config } from "../../../config";
import secureLocalStorage from "react-secure-storage";

const AddEvent = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onSubmit = async (data) => {
    const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
    setValue("userId", storedUserData.id);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    data.file.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userID", storedUserData.id);
    await fetch(`${Config.LOCAL_URL}/api/event/upload`, {
      method: "POST",
      body: formData,
    });
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
                  <Link to="/admin/events" className="d-inline-block mt-2">
                    <i className="ti-arrow-left font-sm text-white"></i>
                  </Link>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    Create Event
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Event Name
                          </label>
                          <input
                            {...register("EventName")}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Country
                          </label>
                          <input
                            {...register("country")}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Address
                          </label>
                          <input
                            {...register("address")}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Twon / City
                          </label>
                          <input
                            {...register("town")}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div className="form-group icon-input">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Date
                          </label>
                          <div className="form-group icon-input mb-3">
                            <i className="font-sm ti-calendar text-grey-500 pe-0"></i>
                            <input
                              {...register("date")}
                              type="date"
                              className=" ps-5 form-control font-xsss fw-600"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Postcode
                          </label>
                          <input
                            {...register("Postcode")}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Cover photo
                          </label>
                          <Dropzone
                            multiple={true}
                            onChange={handleFileChange}
                            setUploadedFiles={setUploadedFiles}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                          rows="5"
                          placeholder="Write your message..."
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
