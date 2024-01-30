import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropzone from '../Components/Dropzone';
import Header from '../Components/AdminHeader';
import Appfooter from '../../../components/Appfooter';
import Popupchat from '../../../components/Popupchat';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset
    } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState([])
    const [loadStatus, setLoadStatus] = useState(false)

    const { id } = useParams();
    const reformateDate = (date) => {
        const originalDate = new Date(date);
        return originalDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }
    useEffect(() => {
        const fetchUserData = async () => {
            const url = "http://localhost:8088/api/user/" + id;
            try {
                const response = await fetch(url);
                const result = await response.json();
                setUser(result);
                // Reset the form with new values after user data is fetched
                reset({
                    nom: result.nom,
                    prenom: result.prenom,
                    date: reformateDate(result.date_naissance),
                    tel: result.tel,
                    profile: result.profil,
                    gender: result.gender,
                    nationality: result.nationality,
                    countryresidence: result.countryresidence,
                    cityresidence: result.cityresidence,
                    verification: result.isVerified,
                    password: '',
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUserData()
        console.log('render')
    }, [id, reset]);

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        setValue('userId', storedUserData.id)
        const url =  "http://localhost:8088/api/user/edit/" + storedUserData.id

        await fetch(url , {
            method: 'POST',
            body: formData,
          });
    }
    const generateRandomPassword =  (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        const passwordArray = [];
        const randomValues = new Uint32Array(length);

        crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            const randomIndex = randomValues[i] % charset.length;
            passwordArray.push(charset.charAt(randomIndex));
        }

        return passwordArray.join("");
    };

    const [password, setPassword] = useState("");

    const handleGeneratePassword = (e) => {
      e.preventDefault();
      const newPassword = generateRandomPassword(12);
      setValue('password' , newPassword)
    };

    return (
        <>
            <Header />

            <div className="main-content bg-lightblue theme-dark-bg">

                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                    <Link to="/admin/users" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Edit User</h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className="row">

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Name</label>
                                                    <input  {...register("nom")} type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Last Name</label>
                                                    <input   {...register("prenom")} type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group icon-input">
                                                    <label className="mont-font fw-600 font-xsss">Date de naissance</label>
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
                                                    <label className="mont-font fw-600 font-xsss">Phone</label>
                                                    <input  {...register("tel")} type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Gender</label>
                                                    <select {...register("gender")} id="" class="form-select">
                                                        <option value="male" >Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Profile</label>
                                                    <select {...register("profile")} id="" class="form-select">
                                                        <option value="player">Player</option>
                                                        <option value="coach">Coach</option>
                                                        <option value="agent">Agent</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="advertiser">Advertiser</option>
                                                        <option value="scout">Scout</option>
                                                        <option value="other">other</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Nationality</label>
                                                    <input {...register("nationality")} type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Country</label>
                                                    <input {...register("countryresidence")} type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">City</label>
                                                    <input {...register("cityresidence")} type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Verification</label>
                                                    <input  {...register("verification")} type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Password</label>
                                                    <input  {...register("password")} type="text"  className="form-control" disabled />
                                                </div>
                                                
                                            </div>
                                            <div className="col-lg-6 mb-3 d-flex align-items-end ">
                                                <button type='submit' className="btn btn-outline-warning " onClick={handleGeneratePassword}>Generate New Password</button>
                                            </div>
                                            </div>

                                            <div className="col-lg-12 mb-0 mt-2">
                                                <button  type="submit" className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</button>
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
export default EditUser;