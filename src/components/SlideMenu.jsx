import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserImage from "../assets/placeholder.jpg"
import { Config } from "../config";
import LanguageToggler from "../fixDesignComponents/languageToggler";
import Sun from "../assets/sun.png"
import Moon from "../assets/moon.png"
import { Context } from "../index";
import DesktopNotification from "./DesktopNotification";

const SlideMenu = ({ setIsActive, setHumberger, Hamburger, notificationData, deleteNotData, setnotificationData, NotificationService }) => {
  const [expanded, setExpanded] = useState(false);
  const [lang, setLang] = useState('Français')
  const [user, setUser] = useState({})
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const {_currentLang, _setLang, getTranslation} = React.useContext(Context)

  let { handleDarkModeToggler } = React.useContext(Context)
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
    setExpanded(!expanded);
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
      <div className=" relative flex justify-end">
        
        <img
          alt="user iamge"
          loading="lazy"
          onClick={() => setHumberger(!Hamburger)}
          srcSet={user?.image ? user?.image : UserImage}
          className="md:hidden  self-stretch aspect-square  rounded-full w-[60px] relative pointer"
        />
        <img
          alt="user iamge"
          onClick={toggleExpand}
          loading="lazy"
          srcSet={user?.image ? user?.image : UserImage}
          className="hidden  border-2   md:block self-stretch  aspect-square  rounded-full w-[60px] z-10 relative pointer"
        />
        <div className={`hidden md:flex absolute  h-[60px] top-0 z-1 flex  gap-4 items-center pl-4 pr-[145px] bg-blue-600 rounded-[80px] max-md:flex-wrap  ${expanded ? 'w-fit expand  pointer-events-auto' : 'w-fit expand pointer-events-none'}`}
          style={{
            transition: ".3s",
            opacity: expanded ? 1: 0
          }}
        >  
         <div className="absolute translate-y-1 -translate-x-9">
         <DesktopNotification 
        
        deleteNotData={deleteNotData}
        notificationData={notificationData}
        setnotificationData={setnotificationData} 
        NotificationService={NotificationService} 
        />
         </div>
          {/* <div className="flex justify-center items-center self-stretch px-2 my-auto bg-white aspect-square h-[31px] rounded-[50px] w-[31px]">
            <img
              onClick={toggleExpand}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e421640b44d79030333aa0e7d550b1a45839b69b89faba54735b0a4ce6c4b706?"
              className="w-full aspect-square fill-blue-600 pointer"
            />
          </div> */}

          <div className="flex gap-2 slideMenuBtn justify-center p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e13bde84fa9b2785556220b4a439b162b51401e76b4b6dbacca76198fd0f64c0?"
              className="w-5 aspect-square"
            />
            <a className="hover:text-white" href={'/home'}> { getTranslation(
            `Home`,  // -----> Englais
              `Accueil`, //  -----> Francais
                           )  } </a>
          </div>
          <div className="flex gap-2 slideMenuBtn justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc3698e77abea2c6c7f4158984e72cc84fccffa79005aaacb0a8148c7fc2d112?"
              className="aspect-[0.75] w-[15px]"
            />
            <a className="hover:text-white" href={`/profile/${user?.id}`}> { getTranslation(
            `Profile`,  // -----> Englais
              `Profil`, //  -----> Francais
                           )  } </a>
          </div>
          <div className="flex gap-2 slideMenuBtn justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/927661d7ec160577838c28e1e039b5d465c8c91f54895e62de4603b16322853d?"
              className="w-5 aspect-square"
            />
            <a className="hover:text-white" href={'/setting/personal'}>{ getTranslation(
            `Settings`,  // -----> Englais
              `Paramètres`, //  -----> Francais
                           )  }</a>
          </div>
          <div className="flex gap-2  justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fb21d1ad3af303c8fe8ca3c06f84fa81ac2ef681719a85f8aae751c3eb5e1ef?"
              className="aspect-[1.49] w-[30px]"
            />
            <LanguageToggler hide={true} color2={true} />

          </div>
          {/* <div onClick={handleDarkModeToggler} className="darkModeSwitcher  flex w-10 h-10 bg-[#11111120] cursor-pointer rounded-full justify-center items-center -ml-4">
            <img
              src={Moon}
              className="w-5 h-5 invert moon "
            />
            <img
              src={Sun}
              className="w-5 h-5 invert sun scale-50 opacity-0 absolute"
            />
          </div> */}
          <div className="flex gap-2 slideMenuBtn justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e89f8c7eb51a481e293bc932ceeb5782dea45f8469a1e16a1753ed7be9f6c3e?"
              className="w-5 aspect-square"
            />
            <div className="grow" onClick={handleLogout} >{ getTranslation(
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