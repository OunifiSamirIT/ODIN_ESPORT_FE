import React, { useState} from "react";
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import Dropzone from '../Components/Dropzone';
import Header from '../Components/AdminHeader';
import Appfooter from '../../../components/Appfooter';
import Popupchat from '../../../components/Popupchat';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddEvent = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues, 
      } = useForm(); 
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    const onSubmit = async (data) => {
          const formData = new FormData();
          console.log(data.file)
          formData.append("AlbumName", data.AlbumName);
          formData.append("Description", data.Description);
          formData.append("Duree", data.Duree);
          formData.append("payscamps", data.payscamps);
          formData.append("prix", data.prix);
          formData.append("date_debut", data.date_debut);
          formData.append("date_fin", data.date_fin);
          data.file.forEach((file) => {
            formData.append('files', file);
          }); 
          formData.append("userId", storedUserData.id);         
        await fetch("https://odine-sport.com/api/albumc/upload", {
            method: 'POST',
            body: formData,
          });
          navigate("/home");

          
    }
    const handleFileChange = async () => {
        setValue('file', uploadedFiles)
        
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
                                    <a href="/admin/album" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></a>
                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Create New Album</h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss mb-2">Album Name</label>
                                                    <input {...register("AlbumName")} type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Dropzone onChange={handleFileChange} multiple={true} setUploadedFiles={setUploadedFiles}/>
                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">Description</label>
                                                <textarea {...register("Description")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" ></textarea>
                                            </div>



                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">Duree</label>
                                                <input {...register("Duree")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" />
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">payscamps</label>
                                                <input {...register("payscamps")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" />
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">prix</label>
                                                <input {...register("prix")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" />
                                            </div>

                                            <div className="col-lg-12 mb-3">
    <label className="mont-font fw-600 font-xsss mb-2 text-dark">date_debut</label>
    <DatePicker
    {...register("date_debut")}
    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
    placeholderText="Select date_debut"
    dateFormat="yyyy-MM-dd"
    selected={getValues("date_debut") ? new Date(getValues("date_debut")) : null}
    onChange={(date) => setValue("date_debut", date ? date.toISOString().split('T')[0] : null)}
/>

</div>



                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">date_fin</label>
                                                <input {...register("date_fin")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" />
                                            </div>

                                           

                                            <div className="col-lg-12">
                                                <button type="submit" className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</button>
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
}
export default AddEvent;