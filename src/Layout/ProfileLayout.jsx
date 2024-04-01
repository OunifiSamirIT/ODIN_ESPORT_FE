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
const ProfileLayout = ({ children, onChange, user }) => {
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
    const LocalStorageID = JSON.parse(localStorage.getItem("user"));
    const [owner, setOwner] = useState(false)
    const [acceptedFriend, setAcceptedFriend] = useState(false)
    const [invitationSend, setInvitationSend] = useState(false);
    const [Invitation, setInvitation] = useState([]);
    const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
    const navigate = useNavigate()
    const userInfo = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`);
        const result = await response.json();
        if (result.message) { navigate('/404') } else {
            setCurrentUser(result)
        }
    }
    const isFriendAccepted = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${user}/checkFriends/${LocalStorageID.id}`)
        const result = await response.json();
        setAcceptedFriend(result.exists)
    }

    useEffect(() => {
        isFriendAccepted()
        fetchAllFriendRequest()
        if (LocalStorageID.id == id) {
            setOwner(true)
        }
    }, [id, user])

    const fetchAllFriendRequest = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/getFriends`, {
            method: "GET",
        });
        const result = await response.json();
        setInvitation(result)
    }

    const deleteInviation = async (id) => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${LocalStorageID.id}/delete/${id}`, {
            method: "DELETE",
        });
        if (response.status === 200) { window.location.reload() }
    }
    // useEffect(() => {
    //     CheckIfInvitationIsSend()
    //     console.log('curren', Invitation)
    // }, [user])
    return (
        <>
            <HomeLayout>
                <div className="self-center mt-[100px] w-full max-w-[1344px]">
                    <div className="flex gap-2 max-md:flex-col max-md:gap-0 max-md:">
                        <div className="flex flex-col w-full md:w-1/2 max-sm:px-4 ">
                            <div className="flex flex-col">
                                {CurrentUser?.user.profil === 'player' && <Player userInfo={CurrentUser} />}
                                {CurrentUser?.user.profil === 'coach' && <Entraineur userInfo={CurrentUser} />}
                                {CurrentUser?.user.profil === 'agent' && <General userInfo={CurrentUser} />}
                                {CurrentUser?.user.profil === 'other' && <General userInfo={CurrentUser} />}
                                {CurrentUser?.user.profil === 'scout' && <General userInfo={CurrentUser} />}

                                {Invitation.length > 0 && <div className="flex flex-col flex-wrap justify-center content-start px-3 py-6 mt-6 mb-6 bg-white rounded-[10px] max-md:px-5 max-md:max-w-full">
                                    <div className="flex gap-5 justify-between font-medium whitespace-nowrap w-full">
                                        <div className="flex flex-auto gap-4 py-2 text-base text-zinc-900">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/acf026b2812ede237d9ec012ac71ee4afc067d2787b50070a71f03ae3078c0b6?"
                                                className="shrink-0 w-5 aspect-square"
                                            />
                                            <div className="flex-auto max-md:max-w-full">Friends</div>
                                        </div>
                                        {owner && <Link to={'/friendsList'} className="my-auto text-sm text-blue-600 underline justify-end">
                                            Voir Tout
                                        </Link>}
                                    </div>
                                    <div className="mt-8 max-md:max-w-full">
                                        <div className="flex gap-4 md:gap-8 flex-wrap ">
                                            {Invitation.map((item, index) => {
                                                return (<div key={index} className="flex flex-col max-sm:flex-1">
                                                    <div className="flex flex-col grow items-center px-2 py-4 w-full text-base whitespace-nowrap rounded-[10px] bg-zinc-100 text-zinc-900">
                                                        <img
                                                            loading="lazy"
                                                            srcSet={item.receiver.image ? item.receiver.image : PlaceHolder}
                                                            className="w-20 aspect-square rounded-full"
                                                        />
                                                        <div className="mt-4 font-semibold">{item.receiver.nom}</div>
                                                        <div className="text-xs font-light">{item.receiver.profil}</div>
                                                        <div className="text-center justify-center self-stretch px-10 py-2 mt-4 font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                                                            <a href={`/profile/${item.receiver.id}`}> Voir Plus</a>
                                                        </div>
                                                        {owner && <div className="text-center justify-center self-stretch px-10 py-2 mt-4 font-medium text-white bg-orange-500 rounded-[30px] max-md:px-5">
                                                            <button onClick={() => deleteInviation(item.receiver.id)}>Supprimer</button>
                                                        </div>}
                                                    </div>
                                                </div>)
                                            })}

                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col  grow text-base font-medium whitespace-nowrap text-zinc-900 max-md:mt-6 max-md:max-w-full">
                                <div className="flex  justify-between  px-2 py-4 bg-white rounded-[10px] max-md:max-w-full">
                                    <div className={`flex  flex-col flex-1 md:flex-row gap-2 items-center  justify-center p-2 ${feed === 'pubs' ? 'text-blue-600' : ''}`}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_965_19030)">
                                                <path className={`${feed === 'pubs' ? 'fill-blue-500' : ''}`} d="M16.6667 12.5H3.33333C1.49167 12.5 0 11.0083 0 9.16667V3.33333C0 1.49167 1.49167 0 3.33333 0H16.6667C18.5083 0 20 1.49167 20 3.33333V9.16667C20 11.0083 18.5083 12.5 16.6667 12.5ZM2.91667 20H2.08333C0.933333 20 0 19.0667 0 17.9167V17.0833C0 15.9333 0.933333 15 2.08333 15H2.91667C4.06667 15 5 15.9333 5 17.0833V17.9167C5 19.0667 4.06667 20 2.91667 20ZM17.9167 20H17.0833C15.9333 20 15 19.0667 15 17.9167V17.0833C15 15.9333 15.9333 15 17.0833 15H17.9167C19.0667 15 20 15.9333 20 17.0833V17.9167C20 19.0667 19.0667 20 17.9167 20ZM10.4167 20H9.58333C8.43333 20 7.5 19.0667 7.5 17.9167V17.0833C7.5 15.9333 8.43333 15 9.58333 15H10.4167C11.5667 15 12.5 15.9333 12.5 17.0833V17.9167C12.5 19.0667 11.5667 20 10.4167 20Z" fill="#1D1E21" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_965_19030">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <div className=" cursor-pointer" onClick={() => setFeed('pubs')}>Publications</div>
                                    </div>
                                    <div className={`flex gap-2 items-center flex-col md:flex-row flex-1 justify-center p-2 ${feed === 'video' ? 'text-blue-600' : ''}`}>
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${feed === 'video' ? 'fill-blue-500' : ''}`} d="M12.8525 9.75667C12.896 9.78045 12.9321 9.81572 12.957 9.85863C12.9818 9.90153 12.9944 9.95043 12.9933 10C12.9959 10.0423 12.9881 10.0845 12.9706 10.1232C12.9532 10.1618 12.9267 10.1956 12.8933 10.2217L8.41667 12.4617C8.37403 12.4852 8.326 12.4973 8.27729 12.4967C8.22858 12.4961 8.18087 12.4828 8.13884 12.4582C8.09681 12.4335 8.06192 12.3984 8.03757 12.3562C8.01323 12.314 8.00028 12.2662 8 12.2175V7.7825C7.99906 7.73305 8.01159 7.68428 8.03625 7.64142C8.06092 7.59855 8.09678 7.5632 8.14 7.53917C8.17978 7.51622 8.22491 7.50415 8.27083 7.50417C8.33803 7.50614 8.40353 7.52568 8.46083 7.56083L12.8525 9.75667ZM20.5 4.16667V15.8333C20.4987 16.938 20.0593 17.997 19.2782 18.7782C18.497 19.5593 17.438 19.9987 16.3333 20H4.66667C3.562 19.9987 2.50296 19.5593 1.72185 18.7782C0.940735 17.997 0.501323 16.938 0.5 15.8333L0.5 4.16667C0.501323 3.062 0.940735 2.00296 1.72185 1.22185C2.50296 0.440735 3.562 0.00132321 4.66667 0L16.3333 0C17.438 0.00132321 18.497 0.440735 19.2782 1.22185C20.0593 2.00296 20.4987 3.062 20.5 4.16667ZM14.66 10C14.6603 9.64888 14.5655 9.30425 14.3856 9.00272C14.2057 8.70118 13.9474 8.45402 13.6383 8.2875L9.24 6.09167C8.94375 5.9217 8.60801 5.83263 8.26646 5.83339C7.92492 5.83416 7.58958 5.92474 7.2941 6.09603C6.99861 6.26733 6.75337 6.51332 6.58298 6.80933C6.4126 7.10534 6.32305 7.44095 6.32333 7.7825V12.2175C6.32133 12.559 6.41009 12.8949 6.58053 13.1908C6.75096 13.4867 6.99695 13.732 7.29333 13.9017C7.59334 14.0768 7.93427 14.1697 8.28167 14.1708C8.60305 14.1723 8.91917 14.0892 9.19833 13.93L13.6783 11.6908C13.9779 11.5221 14.2269 11.2764 14.3995 10.9791C14.5721 10.6818 14.662 10.3438 14.66 10Z" fill="#1D1E21" />
                                        </svg>
                                        <div className=" cursor-pointer" onClick={() => setFeed('video')} >Vidéos</div>
                                    </div>
                                    <div className={`flex gap-2 items-center flex-col flex-1 md:flex-row justify-center p-2 ${feed === 'photo' ? 'text-blue-600' : ''}`}>

                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${feed === 'photo' ? 'fill-blue-500' : ''}`} d="M15.8333 0H4.16667C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 13.8217L4.55333 9.26833C4.94026 8.88131 5.39964 8.57429 5.90523 8.36483C6.41083 8.15537 6.95273 8.04756 7.5 8.04756C8.04727 8.04756 8.58917 8.15537 9.09477 8.36483C9.60036 8.57429 10.0597 8.88131 10.4467 9.26833L19.3058 18.1275C19.7583 17.4479 19.9998 16.6498 20 15.8333V4.16667C19.9987 3.062 19.5593 2.00296 18.7782 1.22185C17.997 0.440735 16.938 0.00132321 15.8333 0ZM15 8.33333C14.3407 8.33333 13.6963 8.13784 13.1481 7.77157C12.5999 7.40529 12.1727 6.8847 11.9204 6.27561C11.6681 5.66652 11.6021 4.9963 11.7307 4.3497C11.8593 3.7031 12.1768 3.10915 12.643 2.64298C13.1092 2.1768 13.7031 1.85933 14.3497 1.73072C14.9963 1.6021 15.6665 1.66811 16.2756 1.9204C16.8847 2.17269 17.4053 2.59994 17.7716 3.1481C18.1378 3.69626 18.3333 4.34073 18.3333 5C18.3333 5.88406 17.9821 6.7319 17.357 7.35702C16.7319 7.98214 15.8841 8.33333 15 8.33333Z" fill="#1D1E21" />
                                        </svg>

                                        <div className="cursor-pointer" onClick={() => setFeed('photo')}>Photos</div>
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