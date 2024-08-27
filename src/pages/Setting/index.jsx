import React, { useState, useEffect } from "react";
import SettingsLayout from "../../Layout/SettingsLayout";
import Social from "./Social";
import Parametre from "./Parametre";
import Experience from "./Experience";
import Information from "./Information";
import Personal from "./Personal";
import { useParams } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import { Config } from "../../config";
import { Context } from "../../index";
import { ToastContainer } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

const Index = () => {
  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const [currentTab, setCurrentTab] = useState("personal");

  const { tab } = useParams();

  useEffect(() => {
    setCurrentTab(tab);
  }, [tab]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    gender: "",
    nationality: "",
    countryresidence: "",
    cityresidence: "",
    tel: "",
    email: "",
    login: "",
    profil: "",
    password: "",
    // Additional fields for player
    height: "",
    weight: "",
    club: "FC bayern",
    strongSkill: "",
    positionPlay: "",
    positionSecond: "",
    skillsInProfile: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [CurrentUser, setCurrentUser] = useState([]);
  const [PlayerData, setPlyerData] = useState([]);
  const [profile, setUserProfile] = useState([]);
  const [file, setFile] = useState(null);
  const fetchUserInfo = async () => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const storedUserDatad = JSON.parse(
        secureLocalStorage.getItem("cryptedUser")
      );
      const id = storedUserDatad ? storedUserDatad?.id : null;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/user/${storedUserDatad.id}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [storedUserData.id]);
  useEffect(() => {}, [currentTab]);

  const [deleteModal, setDeleteModal] = useState();
  return (
    <>
      <HomeLayout>
        <SettingsLayout
          setCurrentTab={setCurrentTab}
          setDeleteModal={setDeleteModal}
          tab={tab}
        >
          {currentTab === "social" && <Social userInfo={userInfo} />}
          {currentTab === "parametre" && (
            <Parametre
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              userInfo={userInfo}
            />
          )}
          {currentTab === "experience" && <Experience userInfo={userInfo} />}
          {currentTab === "personal" && <Personal userInfo={userInfo} />}
          {currentTab === "information" && (
            <Information userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
          )}
        </SettingsLayout>
      </HomeLayout>
    </>
  );
};

export default Index;
