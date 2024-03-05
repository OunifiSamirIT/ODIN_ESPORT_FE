import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
const SettingsLayout = ({ children, setCurrentTab ,tab }) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    // const [currentTab, setCurrentTab] = useState('')
    return (
        <>
            <div className="flex gap-x-5 gap-y-2 max-md:flex-col w-full px-4 max-md:px-2">
                <div className="flex flex-col max-md:ml-0">
                    <div className="flex md:w-[345px] flex-col text-base font-medium max-md:mt-6">
                        <div className="flex gap-2 justify-center text-center py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5 w-full">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac20d9bf5dc01e69f2a6e82df157e82794a74dd3d3c80d0437777183828a95ba?"
                                className="my-auto aspect-square w-[15px]"
                            />
                            <Link to={`/profile/${storedUserData.id}`} className="hover:text-orange-300">Revenir au Profil</Link>
                        </div>
                        <div className=" flex-col px-4 py-4 mt-4 w-full bg-white rounded-[10px] text-zinc-900 hidden md:flex items-left">
                            {/* <div className="text-blue-600">Informations Personnelles</div> */}
                            <a href={`/setting/personal`} className={`mt-4 text-left`} >Informations Personnelles</a>
                            <div className="shrink-0 mt-4 h-px bg-blue-100" />
                            <a href={`/setting/information`} className="mt-4 text-left">Informations du Profil</a>
                            <div className="shrink-0 mt-4 h-px bg-blue-100" />
                            <a href={`/setting/parametre`} className="mt-4 text-left">Paramètres du compte</a>
                            <div className="shrink-0 mt-4 h-px bg-blue-100" />
                            <a href={`/setting/social`}className="mt-4 text-left" >Réseaux Sociaux</a>
                            <div className="shrink-0 mt-4 h-px bg-blue-100" />
                            <div className="flex justify-between px-3.5 py-4 text-orange-500 whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cded10bad9b00bba1f301a02f5bfc764d8bff607a7af5b3849d13ad9750d0472?"
                                    className="w-5 aspect-square"
                                />
                                <button type="submit" onClick={() => console.log('logout')} className="flex-auto">Déconnexion</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col flex-wrap gap-y-2 justify-between  py-8 pr-4 pl-8 bg-white rounded-[10px] max-md:pl-5 max-md:mt-6 max-md:max-w-full">
                    {children}
                </div>

            </div>
        </>

    )

}

export default SettingsLayout 