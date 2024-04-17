import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/AdminHeader';
import Dropzone from '../Components/Dropzone';
import Appfooter from '../../../components/Appfooter';
import Popupchat from '../../../components/Popupchat';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../../config";
const AddArticle = () => {
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const [imageSrc, setImageSrc] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [article, setArticle] = useState('');
    const quillRef = useRef(null);
    const navigate = useNavigate()
    useEffect(() => {
        console.log(JSON.stringify(article))
    }, [article])


    const handleArticlechange = (e) => {
        setArticle(e)
        setValue('article', JSON.stringify(e))
    }



    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('startDate',data.startDate)
        formData.append('endDate',data.endDate)
        formData.append('tags',data.tags)
        formData.append('files',data.video[0])
        const response = await fetch(`${Config.LOCAL_URL}/api/challenges/create`, {
            method: 'POST',

            body: formData,
        });
        if (response.status === 200) {
            setValue('name', '')
            setValue('article', '')
            setValue('tags', '')
            toast.success('Challenge ete ajoutée', {
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
            // navigate('/admin/blog')

        }
    }
    const handleFileChange = async (e) => {
        console.log('fileee')
        const file = e.target.files[0];
        console.log('file',file)
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'video/mp4,video/x-m4v,video/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            console.log(file)
            const formData = new FormData();
            formData.append('video', file);
        };
    };
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
                                    <Link to="/admin/blog" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Create Challenge</h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss mb-2">Title</label>
                                                    <input {...register("name")} type="text" className="form-control" />
                                                </div>

                                                <div className="form-group mt-4">
                                                    <label className="mont-font fw-600 font-xsss mb-2">Challenge description</label>
                                                    <input  {...register("description")} type="text" className="form-control" placeholder="Enter challenge description" />

                                                </div>
                                                <div className="form-group mt-4">
                                                    <label className="mont-font fw-600 font-xsss mb-2">Video</label>
                                                    <input  name="video" {...register("video")} type="file" accept="video/mp4,video/x-m4v,video/*"  onchange={handleFileChange} className="form-control" placeholder="Enter tags separated by commas" />
                                                </div>
                                                <div className="form-group mt-4">
                                                    <label className="mont-font fw-600 font-xsss mb-2">Start Date</label>
                                                    <input
                                                        type="datetime-local"
                                                        id="startDate"
                                                        className="form-control"
                                                        name="startDate"
                                                        {...register("startDate")}
                                                    />
                                                </div>
                                                <div className="form-group mt-4">
                                                    <label className="mont-font fw-600 font-xsss mb-2">End Date</label>
                                                    <input
                                                        type="datetime-local"
                                                        id="endDate"
                                                        className="form-control"
                                                        name="endDate"
                                                        {...register("endDate")}
                                                    />
                                                </div>
                                                <div className="form-group mt-4">
                                                    <label className="mont-font fw-600 font-xsss mb-2">Tags</label>
                                                    <input style={{
                                                        '::-webkit-calendar-picker-indicator': {
                                                            background: 'orange',
                                                        },
                                                    }} name="tags" {...register("tags")} type="text" className="form-control" placeholder="Enter tags separated by commas" />
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
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
        </>
    );
}
export default AddArticle;