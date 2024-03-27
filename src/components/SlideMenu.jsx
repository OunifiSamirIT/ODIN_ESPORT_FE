<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> a137c1d2c1a9b134fb024a06a6f838c3723e75b4
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserImage from "../assets/placeholder.jpg"


const SlideMenu = ({ setIsActive, setHumberger, Hamburger }) => {
  const [expanded, setExpanded] = useState(false);
<<<<<<< HEAD
  const [lang, setLang] = useState('Français')
  const [user, setUser] = useState({})
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Replace the API endpoint with your actual endpoint for fetching user data
    fetch(`http://localhost:5000/api/user/${storedUserData.id}`)

      .then((response) => response.json())
      .then((userData) => {
        console.log(user)
        setUser(userData.user)
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [])


=======
  const [user, setUser] = useState({});

  const [lang , setLang] = useState('Français')
>>>>>>> a137c1d2c1a9b134fb024a06a6f838c3723e75b4
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








  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    
      // Replace the API endpoint with your actual endpoint for fetching user data
      fetch(`https://odine-sport.com/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          
        })
        .catch((error) => console.error("Error fetching user data:", error));
    

   
  }, []);

  return (
    <>
      <div className="relative flex justify-end">
        <img
          alt="user iamge"
          loading="lazy"
<<<<<<< HEAD
          onClick={() =>setHumberger(!Hamburger) }
          srcSet={user?.image ? user?.image : UserImage}
          className="md:hidden  self-stretch aspect-square rounded-full w-[60px] relative pointer"
=======
          srcSet={user?.user?.image}
          className="self-stretch aspect-square rounded-full w-[60px] z-10 relative pointer"
>>>>>>> a137c1d2c1a9b134fb024a06a6f838c3723e75b4
        />
          <img
            alt="user iamge"
            onClick={toggleExpand}
            loading="lazy"
            srcSet={user?.image ? user?.image : UserImage}
            className="hidden md:block self-stretch aspect-square rounded-full w-[60px] z-10 relative pointer"
          />

        <div className={`hidden md:flex absolute h-[60px] top-0 z-1 flex  gap-4 items-center pl-4 pr-[65px] bg-blue-600 rounded-[80px] max-md:flex-wrap ${expanded ? 'w-fit expand' : 'hide'}`}>
          <div className="flex justify-center items-center self-stretch px-2 my-auto bg-white aspect-square h-[31px] rounded-[50px] w-[31px]">
            <img
              onClick={toggleExpand}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e421640b44d79030333aa0e7d550b1a45839b69b89faba54735b0a4ce6c4b706?"
              className="w-full aspect-square fill-blue-600 pointer"
            />
          </div>
          <div className="flex gap-2 justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e13bde84fa9b2785556220b4a439b162b51401e76b4b6dbacca76198fd0f64c0?"
              className="w-5 aspect-square"
            />
            <Link className="grow" to={'/home'}>Acceuil</Link>
          </div>
          <div className="flex gap-2 justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc3698e77abea2c6c7f4158984e72cc84fccffa79005aaacb0a8148c7fc2d112?"
              className="aspect-[0.75] w-[15px]"
            />
            <Link className="grow" to={`/profile/${user?.id}`}>Profil</Link>
          </div>
          <div className="flex gap-2 justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/927661d7ec160577838c28e1e039b5d465c8c91f54895e62de4603b16322853d?"
              className="w-5 aspect-square"
            />
            <Link className="grow" to={'/setting/personal'}>Paramètres</Link>
          </div>
          <div className="flex gap-2 justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fb21d1ad3af303c8fe8ca3c06f84fa81ac2ef681719a85f8aae751c3eb5e1ef?"
              className="aspect-[1.49] w-[30px]"
            />
            <div className="grow cursor-pointer" onClick={toggleLanguage}>{lang}</div>
          </div>
          <div className="flex gap-2 justify-center self-stretch p-2 my-auto text-base font-medium text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e89f8c7eb51a481e293bc932ceeb5782dea45f8469a1e16a1753ed7be9f6c3e?"
              className="w-5 aspect-square"
            />
            <div className="grow" onClick={handleLogout} >Déconnexion</div>
          </div>

        </div>
      </div>
    </>

  )

}
export default SlideMenu