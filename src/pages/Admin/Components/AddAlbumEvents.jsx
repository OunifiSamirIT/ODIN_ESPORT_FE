import React, { useState, useEffect } from "react";
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import Dropzone from '../Components/Dropzone';
import Header from '../Components/AdminHeader';
import Appfooter from '../../../components/Appfooter';
import Popupchat from '../../../components/Popupchat';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Config } from "../../../config";

import { io } from 'socket.io-client';
import NotificationService from "../../../api/notification.server";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

const AddEvent = () => {




    //initialize socket

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(Config.LOCAL_URL);
        setSocket(socketInstance);

    }, []);




    //send odin event notification 
    let sendNotification = ( postId, content, eventImage)  => 
       { console.log("evvvent", eventImage, "con",content )
        {NotificationService.instantSend(socket, 
        {
          toUser_id: "-1",
          forWichAction: "event",
          actionId: "0",
          postId: postId,
          postImage: eventImage,
          fromUser_id: "X1X223XF",
          content: content,
          fromUser_name: "event",
          fromUser_image: "",

        })
    }}
    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
    } = useForm();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

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
        const response = await fetch(`${Config.LOCAL_URL}/api/albumeventodin/upload`, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 200) {
            const res = await fetch(`${Config.LOCAL_URL}/api/lastOdinEvent`)
            const result = await res.json()
            const lastEventCreated = await result
            const eventId = lastEventCreated.event[0].id
            const eventImage = lastEventCreated.event[0].ImagesAlbumevents[0].image_url
            console.log("🚀 ~ onSubmit ~ result:",  lastEventCreated.event[0].id)
            console.log("🚀 ~ onSubmit ~ resultimage:",  eventImage)
            let content=data.AlbumName
            sendNotification(eventId, content, eventImage)

            toast.success('Event ete ajoutée', {
                position: "top-right",
                autoClose: 5000,
                type: 'success',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
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
                                            <Dropzone onChange={handleFileChange} multiple={true} setUploadedFiles={setUploadedFiles} />
                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">Description</label>
                                                <textarea {...register("Description")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" ></textarea>
                                            </div>



                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">Duree</label>
                                                <input {...register("Duree")} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message... (optional)" />
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss mb-2 text-dark">paysEvent</label>
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
                                                <DatePicker
                                                    {...register("date_fin")}
                                                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                                                    placeholderText="Select date_debut"
                                                    dateFormat="yyyy-MM-dd"
                                                    selected={getValues("date_fin") ? new Date(getValues("date_fin")) : null}
                                                    onChange={(date) => setValue("date_fin", date ? date.toISOString().split('T')[0] : null)}
                                                />



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