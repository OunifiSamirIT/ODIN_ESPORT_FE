import React, { useState, useEffect } from "react";
import SettingsLayout from "./Layout/SettingsLayout";
import Social from "./Social";
import Parametre from "./Parametre";
import Information from "./Information";
import Personal from "./Personal";
import { useParams } from "react-router-dom";
const Index = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [currentTab , setCurrentTab] = useState('personal')

    const { tab } = useParams() ; 
    const setDirectTab = () => {
        setCurrentTab(tab)
    }

    useEffect(() => {
        setDirectTab()
    },[tab])
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
    const [CurrentUser , setCurrentUser] = useState([]);
    const [PlayerData , setPlyerData] = useState([]);
    const [profile , setUserProfile] = useState([]);
      const [file, setFile] = useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://odine-sport.com/api/user/${storedUserData.id}`);
                const data = await response.json();
                setUserInfo(data);
                console.log("eeeeeeeeeeeeeee", userInfo);
                setFormData({
                    nom: data.nom || "",
                    discreptionBio: data.discreptionBio | "Passionate forward with a knack for finding the back of the net! Currently shining at Esperance Sportif, known for speed, agility, and deadly finishing. 5 years pro experience, proudly represented Tunisia National Team. Dedicated to pushing boundaries on and off the field. Let's make every match memorable! 💥",
                    prenom: data.prenom || "",
                    date_naissance: data.date_naissance || "",
                    gender: data.gender || "",
                    nationality: data.nationality || "",
                    countryresidence: data.countryresidence || "",
                    cityresidence: data.cityresidence || "",
                    tel: data.tel || "",
                    login: data.login || "",
                    profil: data.profil || "",
                    password: "",
                    image: data.image || "",
                });
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };

        fetchUserInfo();
    }, [storedUserData.id]);
    useEffect(() => {
        console.log(currentTab)
    },[currentTab])
    useEffect(() => {
        fetch(`https://odine-sport.com/api/user/${storedUserData.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
          fetch(`https://odine-sport.com/api/player/${storedUserData.id}`).then(
            (resp) => resp.json()
          ).then(setPlyerData)
          setUserProfile(data.profil)
          console.log('manager Role',data)
        })
        .catch((error) => console.error(error));
      },[])
    return (
        <>
            <SettingsLayout setCurrentTab={setCurrentTab}>
                { currentTab === 'social' && <Social/>}
                { currentTab === 'parametre' && <Parametre/>}
                { currentTab === 'personal' && <Personal/>}
                { currentTab === 'information' && <Information/>}
            </SettingsLayout>
        </>
    );
}

export default Index;