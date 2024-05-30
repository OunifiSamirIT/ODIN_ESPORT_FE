import React, { Component, Fragment, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

import Profiledetail from "../components/Profiledetail";
import Profilephoto from "../components/Profilephoto";
import ProfilecardThree from "../components/ProfilecardThree";
import Createpost from "../components/Createpost";
import Events from "../components/Events";
import Postview from "../components/Postview";
import Load from "../components/Load";
import { useParams } from "react-router-dom";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";

import {
  BiImages,
  BiLike,
  BiSolidCommentCheck,
  BiSolidVideo,
  BiUndo,
} from "react-icons/bi";
import Loading from "../components/Loading";
import { useForm } from "react-hook-form";
function Userpage() {
  const { iduser } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userInfoPL, setUserInfoPL] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (iduser) {
      fetch(`https://odine-sport.com/api/user/${iduser}`)
        .then((response) => response.json())
        .then((userData) => {
          setUserInfo(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
    if (iduser) {
      fetch(`https://odine-sport.com/api/player/${iduser}`)
        .then((response) => response.json())
        .then((userData) => {
          setUserInfoPL(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [iduser]);

  // Log userInfo when it is updated
  useEffect(() => {}, [userInfo]);

  const toggleActive = () => setIsActive(!isActive);

  const emojiClass = `${isActive ? "active" : ""}`;
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12 mb-3">
                {/* <ProfilecardThree /> */}

                <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                  <div className="card-body bg-odin1 p-0 rounded-xxl overflow-hidden m-3">
                    <img
                      src={userInfo.image}
                      className="h-52 w-full object-cover"
                      alt="avater"
                    />
                  </div>
                  <div className="card-body p-0 position-relative">
                    <figure
                      className="avatar position-absolute  z-index-1"
                      style={{ top: "-40px", left: "30px" }}
                    >
                      <img
                        src={userInfo.image}
                        alt="avater"
                        className="float-right p-1 bg-white rounded-circle w-28 h-28"
                      />
                    </figure>
                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                      {userInfo.nom}{" "}
                      <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                        {userInfo.profil} -- {userInfo.nationality}
                      </span>
                    </h4>
                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                      {" "}
                      <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 -ml-4 d-block">
                        {userInfo.email}
                      </span>
                    </h4>
                    <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                      <a
                        href="/defaultmember"
                        className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                      >
                        Ajouter
                      </a>
                      <a
                        href="/defaultemailbox"
                        className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                      >
                        <i className="feather-mail font-md"></i>
                      </a>
                      <a
                        href="/home"
                        id="dropdownMenu4"
                        className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti-more font-md tetx-dark"></i>
                      </a>
                    </div>
                  </div>

                  <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                    <ul
                      className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="active list-inline-item me-5">
                        <a
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                          data-toggle="tab"
                        >
                          Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                  <div className="card-body d-block p-4">
                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">
                      Détails
                    </h4>
                    <h2 className="mb-2">
                      Profile:
                      <span className="ml-2 font-bold">{userInfo.profil}</span>
                    </h2>
                    <h2 className="mb-2">
                      Sexe:
                      <span className="ml-2 font-bold">{userInfo.gender}</span>
                    </h2>
                    <h2 className="mb-2">
                      Taille:
                      <span className="ml-2 font-bold">
                        {userInfoPL.height}
                      </span>
                    </h2>
                    <h2 className="mb-2">
                      Poids:
                      <span className="ml-2 font-bold">
                        {userInfoPL.weight}
                      </span>
                    </h2>
                    <h2 className="mb-2">
                      Competences technique:
                      <span className="ml-2 font-bold">
                        {userInfoPL.skillsInProfile}
                      </span>
                    </h2>
                  </div>

                  <div className="card-body d-flex pt-0">
                    <i className="feather-eye text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        Anyone can find you
                      </span>
                    </h4>
                  </div>
                  <div className="card-body d-flex pt-0">
                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                      {userInfo.nationality}{" "}
                    </h4>
                  </div>
                </div>

                {/* <Profilephoto /> */}
              </div>
              <div>
                <Load />
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

export default Userpage;
