import React, { useState, useRef, useEffect } from "react";
import Header from '../../../components/Header'
import ProfileSideBar from "../../../components/ProfileSideBar";
import { Link } from "react-router-dom";
import SlideMenu from "../../../components/SlideMenu";
import Logo from "../../../assets/ODIN22.png";
const SettingsLayout = ({ children, setCurrentTab }) => {
    const [isActive, setIsActive] = useState(false);
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    // const [currentTab, setCurrentTab] = useState('')
    const toggleActive = () => setIsActive(!isActive);
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Replace the API endpoint with your actual endpoint for fetching user data
        fetch(`https://odine-sport.com/api/user/${storedUserData.id}`)
            .then((response) => response.json())
            .then((userData) => {
                setUser(userData)
                console.log(user)
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [])
    const [Hamburger, setHumberger] = useState(false);
    const rect1Ref = useRef(null);
    const rect2Ref = useRef(null);
    const rect3Ref = useRef(null);

    const handleClickHamburger = () => {
        setHumberger(!Hamburger);
        // Start animation for rectangle 1
        if (Hamburger === true) {
            rect1Ref.current.classList.remove('animate-rect1');
            rect2Ref.current.classList.remove('animate-rect2');
            rect3Ref.current.classList.remove('animate-rect3');
        } else {
            rect1Ref.current.classList.add('animate-rect1');
            rect2Ref.current.classList.add('animate-rect2');
            rect3Ref.current.classList.add('animate-rect3');
        }

    };

    return (
        <>
            <div className="nav-header bg-white shadow-xs border-0">
                <div className=" flex justify-between items-center w-full">
                    <Link to="/home"><img src={Logo} className='ml-3 h-28 w-28 ' /><span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0"> </span> </Link>
                </div>
                <SlideMenu setIsActive={setIsActive} />
                <div className='md:hidden ml-5'>
                    <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClickHamburger}>
                        <rect ref={rect1Ref} width="59.0909" height="4.54545" rx="2.27273" fill="#1D1E21" />
                        <rect ref={rect2Ref} y="22.7272" width="59.0909" height="4.54545" rx="2.27273" fill="#1D1E21" />
                        <rect ref={rect3Ref} y="45.4546" width="59.0909" height="4.54545" rx="2.27273" fill="#1D1E21" />
                    </svg>
                </div>
                {Hamburger && <div className='mt-6 bg-gray-300 absolute top-[98px] left-0 z-0 py-4 md:hidden w-screen h-[1300] overflow-y-scroll'>
                    <div className="flex flex-col items-center pb-12 mx-auto w-full max-w-[480px]  overflow-hidden ">
                        <div className="flex flex-col items-center pb-12 mx-auto w-full max-w-[480px] h-[1000px] overflow-scroll">
                            <div className="flex gap-5 justify-between p-6 mt-8 w-full text-base bg-white rounded-xl max-w-[366px] text-zinc-900">
                                <img
                                    loading="lazy"
                                    srcSet="..."
                                    className="my-auto rounded-full aspect-square w-[35px]"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="text-lg">{user.nom + '' + user.prenom}</div>
                                    <Link to={`/profile/${user.id}`} className="text-sm">Accueil</Link>
                                </div>
                            </div>
                            <div className="flex gap-5 justify-between p-6 mt-8 w-full text-base bg-white rounded-xl max-w-[366px] text-zinc-900">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0ab2d660a4bed5ccd3ba2e94f2bd43df0f30616b7036e713ca833e1076d6f17?"
                                    className="aspect-[0.84] fill-blue-600 w-[21px]"
                                />
                                <Link to={`/setting/personal`} className="flex-auto self-start mt-1">Profile</Link>
                            </div>
                            <div className="flex gap-5 justify-between p-6 mt-8 w-full text-base bg-white rounded-xl max-w-[366px] text-zinc-900">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b73f9bafae69cac1d28837ad4130e0325d3eaf9e4dce1419bac2b5bab698855?"
                                    className="aspect-[0.88] fill-blue-600 w-[22px]"
                                />
                                <Link to={`/setting/parametre`} className="flex-auto self-start mt-1">Information profile</Link>
                            </div>
                            <div className="flex gap-5 justify-between p-7 mt-8 w-full text-base bg-white rounded-xl max-w-[366px] text-zinc-900">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb14a73c3e24ce27da737e9c41873a9a281a489de051a06b08a9dd7c92b339dc?"
                                    className="aspect-[0.78] fill-blue-600 w-[18px]"
                                />
                                <Link to={`/setting/parametre`} className="flex-auto self-start mt-1">Information Personnel </Link>
                            </div>
                            <div className="flex gap-5 justify-between p-7 mt-8 w-full text-base bg-white rounded-xl max-w-[366px] text-zinc-900">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb14a73c3e24ce27da737e9c41873a9a281a489de051a06b08a9dd7c92b339dc?"
                                    className="aspect-[0.78] fill-blue-600 w-[18px]"
                                />
                                <Link to={`/setting/parametre`} className="flex-auto self-start mt-1">Parametres du Compte</Link>
                            </div>
                            <div className="flex gap-5 justify-between p-6 mt-8 w-full text-base bg-white rounded-xl max-w-[366px] text-zinc-900">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c4620f78cdeeedfb64cec61ac3cf11c24772169d5ea932189e3af5e0a59b9e2?"
                                    className="aspect-square fill-blue-600 w-[25px]"
                                />
                                <Link to={`/setting/parametre`} className="flex-auto self-start mt-1">Réseaux Sociaux</Link>
                            </div>
                            <div className="flex justify-center items-center px-16 py-2 mt-10 w-full text-base font-medium text-white whitespace-nowrap bg-orange-500 max-w-[366px] rounded-[30px]">
                                <div className="flex gap-4 justify-center px-2">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30585a5bb8d62f74b1b9c52dc172f1b6ee4a54abd3586b6ad999e50fc95fae16?"
                                        className="w-5 aspect-square"
                                    />
                                    <div className="flex-auto">Déconnexion</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center px-16 py-2 mt-10 w-full text-base font-medium text-white whitespace-nowrap bg-orange-500 max-w-[366px] rounded-[30px]">
                                <div className="flex gap-4 justify-center px-2">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30585a5bb8d62f74b1b9c52dc172f1b6ee4a54abd3586b6ad999e50fc95fae16?"
                                        className="w-5 aspect-square"
                                    />
                                    <div className="flex-auto">Déconnexion</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center px-16 py-2 mt-10 w-full text-base font-medium text-white whitespace-nowrap bg-orange-500 max-w-[366px] rounded-[30px]">
                                <div className="flex gap-4 justify-center px-2">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30585a5bb8d62f74b1b9c52dc172f1b6ee4a54abd3586b6ad999e50fc95fae16?"
                                        className="w-5 aspect-square"
                                    />
                                    <div className="flex-auto">Déconnexion</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center px-16 py-2 mt-10 w-full text-base font-medium text-white whitespace-nowrap bg-orange-500 max-w-[366px] rounded-[30px]">
                                <div className="flex gap-4 justify-center px-2">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30585a5bb8d62f74b1b9c52dc172f1b6ee4a54abd3586b6ad999e50fc95fae16?"
                                        className="w-5 aspect-square"
                                    />
                                    <div className="flex-auto">Déconnexion</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            <div className="flex flex-col pb-10 bg-gray-200 mt-52 md:mt-10">
                <div className="self-center mt-6 w-full max-w-[1344px] max-md:max-w-full sm:mt-20 px-4">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                        <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col text-base font-medium max-md:mt-6">
                                <div className="flex gap-2 justify-between px-20 py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac20d9bf5dc01e69f2a6e82df157e82794a74dd3d3c80d0437777183828a95ba?"
                                        className="my-auto aspect-square w-[15px]"
                                    />
                                    <Link to={`/profile/${storedUserData.id}`} className="grow hover:text-orange-300">Revenir au Profil</Link>
                                </div>
                                <div className="flex-col px-4 py-5 mt-4 w-full bg-white rounded-xl text-zinc-900 hidden md:flex items-left">
                                    {/* <div className="text-blue-600">Informations Personnelles</div> */}
                                    <a className={`mt-4 text-left`} onClick={() => setCurrentTab('personal')}>Informations Personnelles</a>
                                    <div className="shrink-0 mt-4 h-px bg-blue-100" />
                                    <a className="mt-4 text-left" onClick={() => setCurrentTab('information')}>Informations du Profil</a>
                                    <div className="shrink-0 mt-4 h-px bg-blue-100" />
                                    <a className="mt-4 text-left" onClick={() => setCurrentTab('parametre')}>Paramètres du compte</a>
                                    <div className="shrink-0 mt-4 h-px bg-blue-100" />
                                    <a className="mt-4 text-left" onClick={() => setCurrentTab('social')}>Réseaux Sociaux</a>
                                    <div className="shrink-0 mt-4 h-px bg-blue-100" />
                                    <div className="flex justify-between px-3.5 py-2 mt-2 text-orange-500 whitespace-nowrap">
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

                        <div className="flex flex-col flex-wrap grow gap-y-2 justify-between content-start py-8 pr-4 pl-8 w-full bg-white rounded-xl max-md:pl-5 max-md:mt-6 max-md:max-w-full">

                            {children}

                        </div>

                    </div>
                </div>
            </div>
        </>

    )

}

export default SettingsLayout 