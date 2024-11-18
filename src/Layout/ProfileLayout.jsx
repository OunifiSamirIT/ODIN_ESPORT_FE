import React, { useEffect, useState } from "react";
import ProfilePicture from "../assets/Profile_Picture.png"
import Terrain from "../components/Terrain";
import Tactic from "./../assets/Frame.png"
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import Player from "../pages/Profile/Fragments/Player"
import General from "../pages/Profile/Fragments/General"
import Entraineur from "../pages/Profile/Fragments/Entraineur"
import PlaceHolder from "../assets/placeholder.jpg"
import { Config } from "../config";
import Scout from "../pages/Profile/Fragments/Scout";
import { toast, ToastContainer } from 'react-toastify';
import { Context } from "../index";

import { io } from 'socket.io-client';
import NotificationService from "../api/notification.server";
import secureLocalStorage from "react-secure-storage";

const ProfileLayout = ({ children, onChange, user }) => {


    //initialize socket

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(Config.LOCAL_URL);
        setSocket(socketInstance);

    }, []);

    //send request notification
    let sendNotification = (id) => {
        NotificationService.instantSend(socket,
            {
                toUser_id: id,
                forWichAction: "AddRequest",
                actionId: "0",
                postId: "",
                postImage: ""
            })
    }
    const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg, dark_border, dark_gray_color, dark_gray_svg, _currentTheme } = React.useContext(Context);

    const [CurrentUser, setCurrentUser] = useState(null)
    const { id } = useParams()
    // Function to send data to parent
    const [feed, setFeed] = useState('pubs')
    useEffect(() => {
        // isFriendAccepted()
        try {
            userInfo()
        } catch (e) {
            console.log(e)
        }
    }, [user])
    useEffect(() => {
        onChange(feed);
    }, [onChange, feed])


    const [player, setPlayer] = useState(null)
    const [agent, setAgent] = useState(null)
    const [skills, setSkills] = useState([])
    const [owner, setOwner] = useState(false)
    const [acceptedFriend, setAcceptedFriend] = useState(false)
    const [invitationSend, setInvitationSend] = useState(false);
    const [Invitation, setInvitation] = useState([]);
    const [premuim, setPremuim] = useState(false)
    const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
    const navigate = useNavigate()
    const storedUserDatad = JSON.parse(
        secureLocalStorage.getItem("cryptedUser")
    );
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;
    const userInfo = async () => {
        try {
            const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${tokenn}`,
                },
            });

            const result = await response.json();

            if (result.message) {
                navigate('/404');
            }
            setCurrentUser(result);
        } catch (error) {
            console.error(error);
            // Handle the error more gracefully, e.g., display an error message to the user
        }
    }
    const isFriendAccepted = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${user}/checkFriends/${storedUserDatad.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenn}`,
            },
        })
        const result = await response.json();
        setAcceptedFriend(result.exists)
    }

    useEffect(() => {
        isFriendAccepted()
        fetchAllFriendRequest()
        if (storedUserDatad.id == id) {
            setOwner(true)
        }
    }, [id, user])

    // const fetchAllFriendRequest = async () => {
    //     const response = await fetch(`${Config.LOCAL_URL}/api/user/${storedUserDatad.id}/getFriends`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${tokenn}`,
    //         },
    //     });
    //     const result = await response.json();
    //     setInvitation(result.data)
    // }

    const fetchAllFriendRequest = async () => {
        try {
          const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/getFriends`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenn}`,
            },
          });
          const result = await response.json();
          setInvitation(result.data);
        } catch (error) {
          console.error("Failed to fetch friends:", error);
        }
      };
    


        console.log("🚀 ~ fetchAllFriendRequest ~ setInvitation:", Invitation)

    const deleteInviation = async (id) => {
        const storedUserDatad = JSON.parse(
            secureLocalStorage.getItem("cryptedUser")
          );
          const storedUserData = JSON.parse(localStorage.getItem("Secret"));
          const tokenn = storedUserData?.token;

        const response = await fetch(`${Config.LOCAL_URL}/api/user/${storedUserDatad.id}/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenn}`,
            },
        });
        if (response.status === 200) { window.location.reload() }
    }
    // useEffect(() => {
    //     CheckIfInvitationIsSend()
    //     console.log('curren', Invitation)
    // }, [user])

    return (
        <>
            <HomeLayout style={dark_bg}>
                {/* <div>
            <ToastContainer />
          </div> */}
                <div className="self-center mt-[100px] w-full max-w-[1344px]">
                    <div className="flex gap-2 max-md:flex-col max-md:gap-0 max-md:">
                        <div className="flex flex-col w-full md:w-1/2">
                            <div className="flex flex-col">

                                {CurrentUser?.user.profil === 'player' && <Player premuim={premuim} userInfo={CurrentUser} sendNotification={sendNotification} />}
                                {CurrentUser?.user.profil === 'coach' && <Entraineur userInfo={CurrentUser} sendNotification={sendNotification} />}
                                {CurrentUser?.user.profil === 'agent' && <General userInfo={CurrentUser} sendNotification={sendNotification} />}
                                {CurrentUser?.user.profil === 'other' && <General userInfo={CurrentUser} sendNotification={sendNotification} />}
                                {CurrentUser?.user.profil === 'scout' && <Scout userInfo={CurrentUser} sendNotification={sendNotification} />}
                                {Invitation && Invitation.length > 0 ? <div className="flex flex-col flex-wrap justify-center h-fit content-start px-3 py-6 mt-6  bg-white rounded-[10px] max-md:px-5 max-md:max-w-full">
                                    <div className="flex gap-5 justify-between font-medium whitespace-nowrap w-full">
                                        <div className="flex flex-auto gap-4 py-2 text-base text-zinc-900">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3636_16238)">
                                                    <path d="M6.25 10.8333C5.50832 10.8333 4.7833 10.6134 4.16661 10.2013C3.54993 9.78929 3.06928 9.20362 2.78545 8.5184C2.50162 7.83318 2.42736 7.07918 2.57206 6.35175C2.71675 5.62432 3.0739 4.95613 3.59835 4.43168C4.1228 3.90724 4.79098 3.55008 5.51841 3.40539C6.24584 3.2607 6.99984 3.33496 7.68506 3.61879C8.37029 3.90262 8.95596 4.38326 9.36801 4.99995C9.78007 5.61663 10 6.34166 10 7.08334C9.9989 8.07756 9.60345 9.03075 8.90043 9.73377C8.19741 10.4368 7.24422 10.8322 6.25 10.8333ZM12.5 16.6667C12.4987 15.562 12.0593 14.503 11.2781 13.7219C10.497 12.9407 9.438 12.5013 8.33333 12.5H4.16667C3.062 12.5013 2.00296 12.9407 1.22185 13.7219C0.440735 14.503 0.00132321 15.562 0 16.6667L0 20H12.5V16.6667ZM14.5833 7.5C13.8417 7.5 13.1166 7.28007 12.4999 6.86801C11.8833 6.45596 11.4026 5.87029 11.1188 5.18506C10.835 4.49984 10.7607 3.74584 10.9054 3.01841C11.0501 2.29098 11.4072 1.6228 11.9317 1.09835C12.4561 0.573904 13.1243 0.216751 13.8517 0.0720569C14.5792 -0.0726377 15.3332 0.00162482 16.0184 0.285453C16.7036 0.569282 17.2893 1.04993 17.7013 1.66661C18.1134 2.2833 18.3333 3.00832 18.3333 3.75C18.3322 4.74423 17.9368 5.69741 17.2338 6.40043C16.5307 7.10346 15.5776 7.4989 14.5833 7.5ZM15.8333 9.16667H11.6667C11.5204 9.17338 11.3746 9.18812 11.23 9.21084C10.927 9.91193 10.4795 10.5412 9.91667 11.0575C11.1386 11.4032 12.2145 12.1379 12.9814 13.15C13.7484 14.1622 14.1644 15.3968 14.1667 16.6667H20V13.3333C19.9987 12.2287 19.5593 11.1696 18.7782 10.3885C17.997 9.6074 16.938 9.16799 15.8333 9.16667Z" fill="#1D1E21" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3636_16238">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <div className="flex-auto max-md:max-w-full">  {getTranslation(
                                                `Friends`,  // -----> Englais
                                                `Amis`, //  -----> Francais
                                            )} </div>
                                        </div>
                                        {<Link to={`/friendsList/${id}`} className="my-auto text-sm text-blue-600 underline justify-end">
                                            {getTranslation(
                                                `See All`,  // -----> Englais
                                                `Voir Tout`, //  -----> Francais
                                            )}                                         
                                         </Link>}
                                    </div>
                                    <div className="mt-8 max-md:max-w-full">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 flex-wrap ">
                                            {Invitation.length > 0 && Invitation.slice(0, 4).map((item, index) => {
                                                return (<div key={index} className="flex flex-col max-sm:flex-1">
                                                    {item.receiver && <div className="bg-zinc-100 text-wrap flex flex-col grow items-center px-2 py-4 w-full text-base whitespace-nowrap rounded-[10px]  text-zinc-900">
                                                        <a className="flex flex-col items-center" href={`/profile/${item.receiver.id}`}>
                                                        <img
                                                            loading="lazy"
                                                            srcSet={item.receiver.image ? item.receiver.image : PlaceHolder}
                                                            className="w-50  aspect-square object-cover rounded-full"
                                                        />
                                                        <div className="mt-2 text-sm text-pretty font-bold text-wrap text-center">{item.receiver.nom}  {item.receiver.prenom}</div>
                                                        <div className="text-xs font-light ">
                                                            {/* {item.receiver.profil == 'other' ? item.receiver.profil.profession : ''} */}
                                                            {item.receiver.profil == 'player' ? ' Joueur' : ''}
                                                            {/* {item.receiver.profil == 'agent' && 'agent'} */}
                                                            {item.receiver.profil == 'coach' && 'Entraineur'}
                                                            {item.receiver.profil == 'agent' && 'agent'}
                                                            {item.receiver.profil == 'scout' ? 'Scout' : ''}
                                                            {item.receiver.profil == 'other' ? item?.receiver?.other_user[0]?.profession : ''}
                                                        </div>
                                                        </a>
                                                        

                                                        <div className="flex text-center md:text-base text-xs justify-center self-stretch px-7 py-2 mt-2 font-medium text-white mx-3  bg-blue-600 rounded-[30px] max-md:px-5">
                                                            <a href={`/profile/${item.receiver.id}`}>  {getTranslation(
                                                                `See More`,  // -----> Englais
                                                                `Voir Plus`, //  -----> Francais
                                                            )}</a>
                                                        </div>
                                                        {owner && <div className="flex text-center md:text-base text-xs  justify-center self-stretch px-7 py-2 mt-2 font-medium mx-3 text-white bg-orange-500 rounded-[30px] max-md:px-5">
                                                            <button onClick={() => deleteInviation(item.receiver.id)}>
                                                                {getTranslation(
                                                                    `Delete`,  // -----> Englais
                                                                    `Supprimer`, //  -----> Francais
                                                                )}</button>
                                                        </div>}
                                                    </div>}
                                                    {item.sender && <div className="w-full flex flex-col grow items-center px-2 py-4 w-full text-base text-wrap rounded-[10px] bg-zinc-100 text-zinc-900">
                                                        <a className="flex flex-col items-center" href={`/profile/${item.sender.id}`}>
                                                            <img
                                                                loading="lazy"
                                                                srcSet={item.sender.image ? item.sender.image : PlaceHolder}
                                                                className="w-50 object-cover aspect-square rounded-full"
                                                            />
                                                            <p className="mt-2 text-sm text-pretty font-bold text-wrap  text-center">{item.sender.nom} {item.sender.prenom}</p>
                                                            <div className="text-sm font-light">
                                                                {/* {item.receiver.profil == 'other' ? item.receiver.profil.profession : ''} */}
                                                                {item.sender.profil == 'player' ? ' Joueur' : ''}
                                                                {/* {item.sender.profil == 'agent' && 'Agent'} */}
                                                                {item.sender.profil == 'coach' && 'Entraineur'}
                                                                {item.sender.profil == 'agent' && 'Agent'}
                                                                {item.sender.profil == 'scout' ? 'Scout' : ''}
                                                                {item.sender.profil == 'other' ? item?.sender?.other_user[0]?.profession : ''}
                                                            </div>
                                                        </a>


                                                        <div className="hidden md:flex text-center justify-center self-stretch px-7 py-2 mt-2 font-medium text-white mx-3  bg-blue-600 rounded-[30px] max-md:px-5">
                                                            <a href={`/profile/${item.sender.id}`}>  {getTranslation(
                                                                `See More`,  // -----> Englais
                                                                `Voir Plus`, //  -----> Francais
                                                            )}</a>
                                                        </div>
                                                        {owner && <div className="hidden md:flex text-center justify-center self-stretch px-7 py-2 mt-2 font-medium mx-3 text-white bg-orange-500 rounded-[30px] max-md:px-5">
                                                            <button onClick={() => deleteInviation(item.sender.id)}>
                                                                {getTranslation(
                                                                    `Delete`,  // -----> Englais
                                                                    `Supprimer`, //  -----> Francais
                                                                )}</button>
                                                        </div>}
                                                    </div>}
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                </div> : null}

                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full ">
                            <div className="flex flex-col  grow text-base font-medium whitespace-nowrap text-zinc-900 max-md:mt-4 max-md:max-w-full">
                                {CurrentUser?.user.profil === 'player' && CurrentUser?.user.isPremuim ? <a href={`/professionalprofile/${id}`} className="hidden w-full md:flex cursor-pointer gap-2 text-white items-center justify-center px-2 py-2 bg-[linear-gradient(180deg,#3C8AF5_0.06%,#2E71EB_24.43%,#1E56D7_75.66%,#1F46AE_99.53%)] rounded-[10px] mb-2">
                                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="13.5" cy="13" r="13" fill="white" />
                                        <path d="M14.2704 15.6002H12.7299C12.3867 15.6007 12.0522 15.4923 11.7746 15.2906C11.4969 15.0889 11.2904 14.8042 11.1849 14.4776L10.7091 13.0132C10.6016 12.6865 10.6008 12.334 10.7069 12.0068C10.813 11.6796 11.0205 11.3946 11.2993 11.1932L12.5447 10.291C12.8219 10.0886 13.1563 9.97948 13.4995 9.97948C13.8428 9.97948 14.1772 10.0886 14.4544 10.291L15.7004 11.1958C15.9793 11.3972 16.1869 11.6821 16.293 12.0093C16.3991 12.3366 16.3983 12.6891 16.2906 13.0158L15.8155 14.4802C15.709 14.806 15.5022 15.0897 15.2247 15.2909C14.9472 15.492 14.6132 15.6003 14.2704 15.6002ZM21.3002 13.0002C21.3002 14.5429 20.8427 16.0509 19.9857 17.3336C19.1286 18.6163 17.9104 19.6161 16.4851 20.2065C15.0599 20.7968 13.4915 20.9513 11.9785 20.6503C10.4654 20.3494 9.07561 19.6065 7.98477 18.5156C6.89392 17.4248 6.15104 16.035 5.85007 14.5219C5.54911 13.0088 5.70357 11.4405 6.29394 10.0153C6.8843 8.59 7.88405 7.37181 9.16675 6.51473C10.4495 5.65766 11.9575 5.2002 13.5002 5.2002C15.5682 5.20243 17.5509 6.02493 19.0132 7.48723C20.4755 8.94953 21.298 10.9322 21.3002 13.0002ZM13.5002 18.8502C13.8368 18.8482 14.1725 18.8174 14.5038 18.7579L15.055 16.9502C15.1801 16.5575 15.4267 16.2146 15.7594 15.9711C16.092 15.7277 16.4933 15.5962 16.9055 15.5956L18.7366 15.5924C19.0314 15.0009 19.2228 14.3634 19.3027 13.7074L17.8415 12.7324C17.5043 12.4957 17.251 12.1581 17.118 11.7681C16.9851 11.3782 16.9794 10.9561 17.1018 10.5627L17.6563 8.89024C17.1915 8.42292 16.6514 8.03707 16.0586 7.74885L14.6468 8.72774C14.3138 8.97065 13.9123 9.10154 13.5002 9.10154C13.0881 9.10154 12.6866 8.97065 12.3536 8.72774L10.9795 7.72935C10.3958 8.00821 9.86207 8.38156 9.4 8.83434L9.89855 10.5614C10.021 10.9548 10.0153 11.3769 9.88235 11.7668C9.7494 12.1568 9.49606 12.4944 9.15885 12.7311L7.70675 13.7678C7.79025 14.4026 7.97849 15.0192 8.2638 15.5924L10.0942 15.5956C10.5064 15.596 10.9079 15.7273 11.2406 15.9707C11.5734 16.2141 11.8202 16.5568 11.9454 16.9496L12.5076 18.7592C12.8353 18.8179 13.1674 18.8484 13.5002 18.8502Z" fill="#2E71EB" />
                                    </svg>
                                    Professional Profile
                                </a> : null}
                                <div className="flex  justify-between  px-2 py-4   bg-white rounded-[10px] max-md:max-w-full">
                                    <div className={`flex  flex-col flex-1 md:flex-row gap-2 items-center  justify-center ${feed === 'pubs' ? 'text-blue-600' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_965_19030)">
                                                <path className={`${feed === 'pubs' ? 'fill-blue-500' : ''}`} d="M16.6667 12.5H3.33333C1.49167 12.5 0 11.0083 0 9.16667V3.33333C0 1.49167 1.49167 0 3.33333 0H16.6667C18.5083 0 20 1.49167 20 3.33333V9.16667C20 11.0083 18.5083 12.5 16.6667 12.5ZM2.91667 20H2.08333C0.933333 20 0 19.0667 0 17.9167V17.0833C0 15.9333 0.933333 15 2.08333 15H2.91667C4.06667 15 5 15.9333 5 17.0833V17.9167C5 19.0667 4.06667 20 2.91667 20ZM17.9167 20H17.0833C15.9333 20 15 19.0667 15 17.9167V17.0833C15 15.9333 15.9333 15 17.0833 15H17.9167C19.0667 15 20 15.9333 20 17.0833V17.9167C20 19.0667 19.0667 20 17.9167 20ZM10.4167 20H9.58333C8.43333 20 7.5 19.0667 7.5 17.9167V17.0833C7.5 15.9333 8.43333 15 9.58333 15H10.4167C11.5667 15 12.5 15.9333 12.5 17.0833V17.9167C12.5 19.0667 11.5667 20 10.4167 20Z" fill="#1D1E21" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_965_19030">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <div className=" cursor-pointer text-xs md:text-base" onClick={() => setFeed('pubs')}> {getTranslation(
                                            `Posts`,  // -----> Englais
                                            `Publications`, //  -----> Francais
                                        )}</div>
                                    </div>
                                    <div className={`flex gap-2 items-center flex-col md:flex-row flex-1 justify-center ${feed === 'video' ? 'text-blue-600' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${feed === 'video' ? 'fill-blue-500 ' : ''}`} d="M12.8525 9.75667C12.896 9.78045 12.9321 9.81572 12.957 9.85863C12.9818 9.90153 12.9944 9.95043 12.9933 10C12.9959 10.0423 12.9881 10.0845 12.9706 10.1232C12.9532 10.1618 12.9267 10.1956 12.8933 10.2217L8.41667 12.4617C8.37403 12.4852 8.326 12.4973 8.27729 12.4967C8.22858 12.4961 8.18087 12.4828 8.13884 12.4582C8.09681 12.4335 8.06192 12.3984 8.03757 12.3562C8.01323 12.314 8.00028 12.2662 8 12.2175V7.7825C7.99906 7.73305 8.01159 7.68428 8.03625 7.64142C8.06092 7.59855 8.09678 7.5632 8.14 7.53917C8.17978 7.51622 8.22491 7.50415 8.27083 7.50417C8.33803 7.50614 8.40353 7.52568 8.46083 7.56083L12.8525 9.75667ZM20.5 4.16667V15.8333C20.4987 16.938 20.0593 17.997 19.2782 18.7782C18.497 19.5593 17.438 19.9987 16.3333 20H4.66667C3.562 19.9987 2.50296 19.5593 1.72185 18.7782C0.940735 17.997 0.501323 16.938 0.5 15.8333L0.5 4.16667C0.501323 3.062 0.940735 2.00296 1.72185 1.22185C2.50296 0.440735 3.562 0.00132321 4.66667 0L16.3333 0C17.438 0.00132321 18.497 0.440735 19.2782 1.22185C20.0593 2.00296 20.4987 3.062 20.5 4.16667ZM14.66 10C14.6603 9.64888 14.5655 9.30425 14.3856 9.00272C14.2057 8.70118 13.9474 8.45402 13.6383 8.2875L9.24 6.09167C8.94375 5.9217 8.60801 5.83263 8.26646 5.83339C7.92492 5.83416 7.58958 5.92474 7.2941 6.09603C6.99861 6.26733 6.75337 6.51332 6.58298 6.80933C6.4126 7.10534 6.32305 7.44095 6.32333 7.7825V12.2175C6.32133 12.559 6.41009 12.8949 6.58053 13.1908C6.75096 13.4867 6.99695 13.732 7.29333 13.9017C7.59334 14.0768 7.93427 14.1697 8.28167 14.1708C8.60305 14.1723 8.91917 14.0892 9.19833 13.93L13.6783 11.6908C13.9779 11.5221 14.2269 11.2764 14.3995 10.9791C14.5721 10.6818 14.662 10.3438 14.66 10Z" fill="#1D1E21" />
                                        </svg>
                                        <div className=" cursor-pointer text-xs md:text-base" onClick={() => setFeed('video')} >{getTranslation(
                                            `Video`,  // -----> Englais
                                            `Vidéo`, //  -----> Francais
                                        )}</div>
                                    </div>
                                    <div className={`flex gap-2 items-center flex-col flex-1 md:flex-row justify-center  ${feed === 'photo' ? 'text-blue-600' : ''}`}>

                                        <svg width="18" height="18" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${feed === 'photo' ? 'fill-blue-500' : ''}`} d="M15.8333 0H4.16667C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 13.8217L4.55333 9.26833C4.94026 8.88131 5.39964 8.57429 5.90523 8.36483C6.41083 8.15537 6.95273 8.04756 7.5 8.04756C8.04727 8.04756 8.58917 8.15537 9.09477 8.36483C9.60036 8.57429 10.0597 8.88131 10.4467 9.26833L19.3058 18.1275C19.7583 17.4479 19.9998 16.6498 20 15.8333V4.16667C19.9987 3.062 19.5593 2.00296 18.7782 1.22185C17.997 0.440735 16.938 0.00132321 15.8333 0ZM15 8.33333C14.3407 8.33333 13.6963 8.13784 13.1481 7.77157C12.5999 7.40529 12.1727 6.8847 11.9204 6.27561C11.6681 5.66652 11.6021 4.9963 11.7307 4.3497C11.8593 3.7031 12.1768 3.10915 12.643 2.64298C13.1092 2.1768 13.7031 1.85933 14.3497 1.73072C14.9963 1.6021 15.6665 1.66811 16.2756 1.9204C16.8847 2.17269 17.4053 2.59994 17.7716 3.1481C18.1378 3.69626 18.3333 4.34073 18.3333 5C18.3333 5.88406 17.9821 6.7319 17.357 7.35702C16.7319 7.98214 15.8841 8.33333 15 8.33333Z" fill="#1D1E21" />
                                        </svg>

                                        <div className="cursor-pointer text-xs md:text-base" onClick={() => setFeed('photo')}> {getTranslation(
                                            `Photo`,  // -----> Englais
                                            `Photo`, //  -----> Francais
                                        )}</div>
                                    </div>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default ProfileLayout