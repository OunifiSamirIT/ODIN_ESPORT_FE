import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const SettingsLayout = ({ children, setCurrentTab ,tab }) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    // const [currentTab, setCurrentTab] = useState('')
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
            <div className="flex flex-col md:flex-row gap-x-5 gap-y-2  w-full    mt-[100px]">
                <div className="flex flex-col max-md:ml-0">
                    <div className="flex md:w-[345px] flex-col text-base font-medium ">
                        <div className="flex gap-2 justify-center text-center py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5 w-full">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac20d9bf5dc01e69f2a6e82df157e82794a74dd3d3c80d0437777183828a95ba?"
                                className="my-auto aspect-square w-[15px]"
                            />
                            <Link to={`/profile/${storedUserData.id}`} className="hover:text-orange-300">Revenir au Profil</Link>
                        </div>
                        <div className=" flex-col md:px-4 py-1 mt-3 w-full bg-white rounded-[10px] text-zinc-900 hidden md:flex items-left">
                            {/* <div className="text-blue-600">Informations Personnelles</div> */}
                            <a href={`/setting/personal`} className={`mt-4 text-left`} >Informations Personnelles</a>
                            <div className="shrink-0 mt-3 h-px bg-blue-100" />
                            <a href={`/setting/information`} className="mt-4 text-left">Informations du Profil</a>
                            {storedUserData.profil == 'player' &&
                            <>
                            <div className="shrink-0 mt-3 h-px bg-blue-100" />
                             <a href={`/setting/experience`} className="mt-4 text-left">Experiences</a></>}
                            <div className="shrink-0 mt-3 h-px bg-blue-100" />
                            <a href={`/setting/parametre`} className="mt-4 text-left">Paramètres du compte</a>
                            <div className="shrink-0 mt-3 h-px bg-blue-100" />
                            <a href={`/setting/social`}className="mt-3 text-left" >Réseaux Sociaux</a>
                            <div className="shrink-0 mt-3 h-px bg-blue-100" />
                            <div className="flex items-center gap-4 px-3.5 py-3 text-orange-500 whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cded10bad9b00bba1f301a02f5bfc764d8bff607a7af5b3849d13ad9750d0472?"
                                    className="w-5 aspect-square"
                                />
                                <button type="submit" onClick={handleLogout} className="">Déconnexion</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col flex-wrap gap-y-2   px-2 bg-white rounded-[10px]">
                    {children}
                </div>
            </div>
        </>

    )

}

export default SettingsLayout 