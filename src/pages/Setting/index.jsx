import React, { useState, useEffect } from "react";
import SettingsLayout from "../../Layout/SettingsLayout";
import Social from "./Social";
import Parametre from "./Parametre";
import Experience from "./Experience";
import Information from "./Information";
import Personal from "./Personal";
import { useParams } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
const Index = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [currentTab, setCurrentTab] = useState('personal')

    const { tab } = useParams();


    useEffect(() => {
        setCurrentTab(tab)
    }, [tab])
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
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${storedUserData.id}`);
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };

        fetchUserInfo();
    }, [storedUserData.id]);
    useEffect(() => {
        console.log(currentTab)
    }, [currentTab])
    // useEffect(() => {
<<<<<<< HEAD
    //     fetch(`http://localhost:5000/api/user/${storedUserData.id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCurrentUser(data);
    //             fetch(`http://localhost:5000/api/player/${storedUserData.id}`).then(
=======
    //     fetch(`https://odine-sport.com/api/user/${storedUserData.id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCurrentUser(data);
    //             fetch(`https://odine-sport.com/api/player/${storedUserData.id}`).then(
>>>>>>> a137c1d2c1a9b134fb024a06a6f838c3723e75b4
    //                 (resp) => resp.json()
    //             ).then(setPlyerData)
    //             setUserProfile(data.profil)
    //             console.log('manager Role', data)
    //         })
    //         .catch((error) => console.error(error));
    // }, [])
    return (
        <>
            <HomeLayout>
                <SettingsLayout setCurrentTab={setCurrentTab} tab={tab}>
                    {currentTab === 'social' && <Social userInfo={userInfo}/>}
                    {currentTab === 'parametre' && <Parametre userInfo={userInfo} />}
<<<<<<< HEAD
                    {currentTab === 'experience' && <Experience userInfo={userInfo} />}
=======
>>>>>>> a137c1d2c1a9b134fb024a06a6f838c3723e75b4
                    {currentTab === 'personal' && <Personal userInfo={userInfo} />}
                    {currentTab === 'information' && <Information userInfo={userInfo} />}
                </SettingsLayout>
            </HomeLayout>

        </>
    );
}

export default Index;