import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserImage from "../assets/placeholder.jpg"
import { Config } from "../config";
import LanguageToggler from "../fixDesignComponents/languageToggler";
import { Context } from "../index";
import gsap from "gsap";

const SlideMenu = ({isActive, setPopupNotificationHidden,setIsActive, setHumberger, Hamburger, notificationData, deleteNotData, setnotificationData, NotificationService }) => {
  const [lang, setLang] = useState('Français')
  const [user, setUser] = useState({})
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const {_currentLang, _setLang, getTranslation} = React.useContext(Context)

  useEffect(() => {
    // Replace the API endpoint with your actual endpoint for fetching user data
    fetch(`${Config.LOCAL_URL}/api/user/${storedUserData.id}`)
      .then((response) => response.json())
      .then((userData) => {
        console.log(user)
        setUser(userData.user)
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [])
  const toggleLanguage = () => {
    if (lang === 'Français') {
      setLang('English')
    } else {
      setLang('Français')
    }
  }
  const toggleExpand = () => {
    setIsActive(!isActive);
    !isActive &&
    setPopupNotificationHidden(true)
   !isActive &&
   gsap
   .timeline()
   .to(".desktopPopUpNotificationCon", {
     duration: 0.2,
     // opacity: 0,
     pointerEvents: "none",
     y: 0,
   })
   .to(".loadingNot .loaderCon .inner", {
     duration: 0,
     width: "0%",
   })
   .to(".loadingNot .loaderCon .inner", {
     duration: 0,
     opacity: 1,
   })
   .to(".loadingNot .loaderCon .inner", {
     duration: 0,
     display: "block",
   })
   .to(".desktopPopUpNotificationCon .showAllnot", {
     duration: 0,
     display: "none",
   })
   .to(".desktopPopUpNotificationCon .showAllnot", {
     duration: 0,
     opacity: 0,
   })
  };
  const navigate = useNavigate();
  // Logout function
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Update the authentication state to false
    // Redirect to the login page or another route
    navigate("/login");
  };
  return (
    <>
      <div className=" relative flex  justify-end">
        
        <img
          alt="user iamge"
          loading="lazy"
          onClick={() => setHumberger(!Hamburger)}
          srcSet={user?.image ? user?.image : UserImage}
          className="md:hidden  self-stretch aspect-square  rounded-full h-[60px] h-[60px] relative pointer"
        />
        <img
          alt="user iamge"
          onClick={toggleExpand}
          loading="lazy"
          srcSet={user?.image ? user?.image : UserImage}
          className="hidden  border-2   md:block self-stretch  aspect-square  rounded-full w-[60px] z-10 relative pointer"
        />
        <div className={`hidden  gap-y-2 py-2 md:flex absolute  h-[300px] top-16 z-1 flex w-[200px]  flex-column items-center bg-blue-600 rounded-[8px] max-md:flex-wrap  ${isActive ? 'expand  pointer-events-auto' : ' expand pointer-events-none'}`}
          style={{
            transition: ".3s",
            opacity: isActive ? 1: 0,
            transform: isActive ? "translateY(0px)" : " translateY(-3px)"
          }}
        >  
         <div className="absolute translate-y-1 -translate-x-9">
         
         </div>
          {/* <div className="flex justify-center items-center self-stretch px-2 my-auto bg-white aspect-square h-[31px] rounded-[50px] w-[31px]">
            <img
              onClick={toggleExpand}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e421640b44d79030333aa0e7d550b1a45839b69b89faba54735b0a4ce6c4b706?"
              className="w-full aspect-square fill-blue-600 pointer"
            />
          </div> */}

<div className="w-[90%] flex-1 flex justify-center ">
          <a className="flex gap-2  h-[100%]  my-auto text-base font-medium text-white whitespace-nowrap slideMenuBtn" href={'/home'}> 
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e13bde84fa9b2785556220b4a439b162b51401e76b4b6dbacca76198fd0f64c0?"
              className="w-4 aspect-square"
            />
            { getTranslation(
            `Home`,  // -----> Englais
              `Accueil`, //  -----> Francais
                           )  } </a>
          </div>
          <div className="w-[90%] flex-1 flex justify-center ">
          <a className="flex gap-2  h-[100%]  my-auto text-base font-medium text-white whitespace-nowrap slideMenuBtn" href={`/profile/${user?.id}`}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc3698e77abea2c6c7f4158984e72cc84fccffa79005aaacb0a8148c7fc2d112?"
              className="aspect-[0.75] w-[13px]"
            />
            { getTranslation(
            `Profile`,  // -----> Englais
              `Profil`, //  -----> Francais
                           )  } </a>
          </div>
          <div className="w-[90%] flex-1 flex justify-center ">
          <a className="flex gap-2  h-[100%]  my-auto text-base font-medium text-white whitespace-nowrap slideMenuBtn" href={'/setting/personal'}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/927661d7ec160577838c28e1e039b5d465c8c91f54895e62de4603b16322853d?"
              className="w-4 aspect-square"
            />
            { getTranslation(
            `Settings`,  // -----> Englais
              `Paramètres`, //  -----> Francais
                           )  }</a>
          </div>
          
         
          <div onClick={handleLogout} className="flex gap-2  slideMenuBtn logoutBtn  my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e89f8c7eb51a481e293bc932ceeb5782dea45f8469a1e16a1753ed7be9f6c3e?"
              className="w-4 aspect-square"
            />
            <div   >{ getTranslation(
            `Log Out`,  // -----> Englais
              `Déconnexion`, //  -----> Francais
                           )  }</div>
          </div>
       
        </div>
      </div>
    </>
  )
}
export default SlideMenu