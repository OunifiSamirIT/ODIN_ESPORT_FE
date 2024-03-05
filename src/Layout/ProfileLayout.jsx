import React, { useEffect, useState } from "react";
import ProfilePicture from "../assets/Profile_Picture.png"
import Terrain from "../components/Terrain";
import Tactic from "./../assets/Frame.png"
import { Link, redirect, useParams, navigate } from "react-router-dom";
import HomeLayout from "./HomeLayout";
const ProfileLayout = ({ children, onChange, user }) => {
    const [CurrentUser, setCurrentUser] = useState(null)
    const { id } = useParams()
    // Function to send data to parent
    const [feed, setFeed] = useState('pubs')
    useEffect(() => {
        // isFriendAccepted()
        try {
            fetchUserInfo()
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
    const fetchUserInfo = async () => {
        const response = await fetch(`http://localhost:5000/api/user/${id}`);
        const result = await response.json();
        console.log(result)
        setCurrentUser(result)
        if (result.profil === 'player') {
            const response = await fetch(`http://localhost:5000/api/player/${id}`);
            const result = await response.json();
            console.log('error', result.message)
            if (result.message) {
                window.location.href = "/home";
            }
            setPlayer(result)
            if (result.skillsInProfile != '') {
                setSkills(result?.skillsInProfile.split(',').filter((items) => {
                    return items !== ''
                }))
            }

        }
        if (result.profil === 'agent') {
            const response = await fetch(`http://localhost:5000/api/player/${id}`);
            const result = await response.json();
            setAgent(result)

            if (result.skillsInProfile !== '') {
                setSkills(result?.skillsInProfile.split(',').filter((items) => {
                    return items !== ''
                }))
            }
            setSkills([])
        }
        if (result.profil === 'scout') {
            const response = await fetch(`http://localhost:5000/api/player/${id}`);
            const result = await response.json();
            setAgent(result)
            if (result.skillsInProfile !== '') {
                setSkills(result?.skillsInProfile.split(',').filter((items) => {
                    return items !== ''
                }))
            }
        }
    }
    const isFriendAccepted = async () => {
        const response = await fetch(`http://localhost:5000/api/user/${user}/checkFriends/${LocalStorageID.id}`)
        const result = await response.json();
        setAcceptedFriend(result.exists)
        console.log('this cidfjk', acceptedFriend)
    }

    useEffect(() => {
        isFriendAccepted()
        console.log('test', acceptedFriend)
        if (LocalStorageID.id == user.toString()) {
            setOwner(true)
        }
    }, [user])

    const sendFriendRequest = async () => {

        const response = await fetch(`http://localhost:5000/api/user/${user}/sendFriendRequest/${LocalStorageID.id}`, {
            method: "POST",
        });

        const result = await response.json();
        console.log('friend request sent')
    }
    const [showInvitation, setShowInvitation] = useState()
    const CheckIfInvitationIsSend = async () => {
        const response = await fetch(`http://localhost:5000/api/user/${user}/friend-requests`, {
            method: "GET",
        });
        const result = await response.json();
        console.log(result)
        setInvitation(result.receiver)

        // const isFriend = result.receiver.filter((item) => {
        //     console.log(item.id)
        //     return item.id === LocalStorageID.id
        // })
        // setInvitationSend(isFriend)
    }

    const copyLinkToClipboard = (articleId) => {
        // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
        const number = CurrentUser.tel;

        // Copy the URL to the clipboard
        if (acceptedFriend?.status === 'accepted') {
            navigator.clipboard.writeText(number)
                .then(() => {
                    console.log('Link copied to clipboard');
                })
                .catch((err) => {
                    console.error('Failed to copy link to clipboard', err);
                });
        } else {
            console.log('add as friend to copy number')
        }

    };
    useEffect(() => {
        CheckIfInvitationIsSend()
        console.log('curren', Invitation)
    }, [user])
    return (
        <>
            <HomeLayout>
                <div className="self-center mt-20 w-full max-w-[1344px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
                                {CurrentUser?.profil === 'player' && <div className="flex flex-col items-center  py-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                                    {/* <p>this comment</p> */}
                                    <div className="max-md:max-w-full px-[30px]">
                                        <div className="self-stretch max-md:max-w-full">
                                            <div className="flex gap-2 max-md:flex-col max-md:gap-0 mt-[24px]">
                                                <div className="flex flex-col justify-center max-md:ml-0 max-md:w-full">
                                                    <img src={CurrentUser?.image} alt="profile pic" className="max-w-full rounded-full aspect-square w-[120px] max-md:mt-4" />
                                                </div>
                                                <div className="flex flex-col items-center max-md:ml-0 max-md:w-full">
                                                    <div className="flex flex-col py-6 self-stretch my-auto max-md:mt-8 max-md:max-w-full">
                                                        <div className="flex gap-4 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                                            <div className="flex flex-col flex-1">
                                                                <div className="text-xl font-bold text-left text-zinc-900">
                                                                    {CurrentUser?.nom}
                                                                </div>
                                                                <div className="mt-1 text-base font-medium text-blue-600">
                                                                    {CurrentUser?.profil}
                                                                </div>
                                                            </div>
                                                            {showInvitation || !owner ? (
                                                                <div className="flex gap-4 self-start px-px text-base font-medium text-white">
                                                                    <div className="flex gap-[16px] justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                                                        <img
                                                                            loading="lazy"
                                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28e6ba6256949e6a3dc6010c4e7b43beb00ed279c42bf8ee0a22c90053ad1f50?"
                                                                            className="w-5 aspect-square"
                                                                        />
                                                                        {acceptedFriend ?
                                                                            <div className="grow">{acceptedFriend?.status}</div>
                                                                            : <button onClick={sendFriendRequest} className="grow">Ajouter ami(e) </button>}
                                                                    </div>

                                                                    {acceptedFriend?.status === 'accepted' ? <div>
                                                                        <button onClick={() => {
                                                                            copyLinkToClipboard();
                                                                            setIsCopyLinkPopupVisible(true);
                                                                            setTimeout(() => {
                                                                                setIsCopyLinkPopupVisible(false);
                                                                            }, 2000); // Hide the popup after 2 seconds
                                                                        }}>
                                                                            <svg className='fill-white' width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path className={acceptedFriend?.status === 'accepted' ? 'fill-green-500' : 'fill-gray-500'} d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z" fill="#65676B" />
                                                                                <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z" fill="#D0D0D0" />
                                                                                <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z" fill="#D0D0D0" />
                                                                            </svg>
                                                                        </button>
                                                                        {isCopyLinkPopupVisible && (
                                                                            <div className="text-black copy-link-popup flex items-center">
                                                                                lien copié!
                                                                            </div>
                                                                        )}
                                                                    </div> :

                                                                        <div>
                                                                            <button onClick={() => {
                                                                            }}>
                                                                                <svg className='fill-white' width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path className={acceptedFriend?.status === 'accepted' ? 'fill-green-500' : 'fill-gray-500'} d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z" fill="#65676B" />
                                                                                    <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z" fill="#D0D0D0" />
                                                                                    <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z" fill="#D0D0D0" />
                                                                                </svg>
                                                                            </button>
                                                                            {isCopyLinkPopupVisible && (
                                                                                <div className="text-black copy-link-popup flex items-center">
                                                                                    lien copié!
                                                                                </div>
                                                                            )}

                                                                        </div>

                                                                    }



                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="flex gap-2 items-start mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                                                            <div className="flex justify-center items-center self-stretch py-2">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ad5d0e7c1cc757b7d699a58b21f17f4dfeb3117bc9f1e3f4d361257cb7cc63?"
                                                                    className="self-stretch w-4 aspect-[1.3]"
                                                                />
                                                                <div className="self-stretch flex">Licence :</div>
                                                                {player?.Licence}   <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f75f221781125db60fd42377c75c439dc592852bf0ba8d19fbf4b35ca04660?"
                                                                    className="self-stretch my-auto aspect-[1.3] w-[13px]"
                                                                />
                                                            </div>
                                                            <div className="flex gap-2 justify-center p-2 whitespace-nowrap">

                                                                <div className="grow self-start mt-1">{CurrentUser?.nationality}</div>
                                                            </div>
                                                            <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d609bf65a79e970c6866ad932e5fdd62a603a912852f0024386dcf0730b04895?"
                                                                    className="w-5 aspect-square"
                                                                />
                                                                <div className="grow self-start mt-1">
                                                                    {player?.champsoptionelle}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {CurrentUser?.discreptionBio && <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full px-5">
                                        {CurrentUser?.discreptionBio} 💥
                                    </div>}

                                    <div className="flex gap-4 px-4 mt-8 text-lg whitespace-nowrap text-zinc-900 ">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6536ab3d03191ac5b7abe9faf755957e24f289e2bad0355abb7667f6767ce773?"
                                            className="my-auto w-5 aspect-square"
                                        />
                                        <div>Positions</div>

                                    </div>
                                    <div className="mt-2">
                                        <Terrain positionPlay={player?.positionPlay} positionSecond={player?.positionSecond} />
                                    </div>
                                    <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b1c71f1aa122ee7778a9eae0f75e4ea7c7b8b3201bfa91fccac0a1e396c367b?"
                                            className="self-start w-5 aspect-square"
                                        />
                                        <div className="grow">Compétences</div>
                                    </div>
                                    <div className="flex gap-2 px-5 justify-between self-stretch mt-4 text-base font-semibold text-blue-600 flex-wrap whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                        {skills.map((skill, index) => {
                                            return (
                                                <div key={index} className="grow justify-center text-center px-4 py-2 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px]">
                                                    {skill}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex gap-5 justify-between mt-4 max-w-full">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d48767f34c0f5eeb5b136d6fa841306141e666e984505709b948351356b8c0a?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4edccddd34ae855e8b823ca95ec43db0895afda31dfb64866ce37d726c06459?"
                                            className="flex-1 shrink-0 w-full aspect-[0.96]"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/51679bc07454148ecc223f937ceb3813d8de851f3bd1d063f492d082c3a1e855?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2686a6af72883580063be4a13ebf1b9e1f0d4f86985cb635ce8e8d46ff66d545?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e740b6125745592d6108027bfb6f20b03e6e7cbe80faff8883bb7ebb310c29f3?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center py-2 mt-4 max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
                                        <div className="flex gap-3">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d9e982fd23ce780b6690e06294838b0bae53c64efd8d5ce059ebb4030011a1f?"
                                                className="w-4 aspect-[0.94]"
                                            />
                                            <Link to={`/profile/more/${id}`}><div>Voir Plus</div></Link>
                                        </div>
                                    </div>
                                </div>}
                                {CurrentUser?.profil === 'coach' && <div className="flex flex-col items-center  py-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                                    {/* <p>this comment</p> */}
                                    <div className="max-md:max-w-full px-[30px]">
                                        <div className="self-stretch max-md:max-w-full">
                                            <div className="flex gap-2 max-md:flex-col max-md:gap-0 mt-[24px]">
                                                <div className="flex flex-col justify-center max-md:ml-0 max-md:w-full">
                                                    <img src={ProfilePicture} alt="profile pic" className="max-w-full rounded-full aspect-square w-[120px] max-md:mt-4" />
                                                </div>
                                                <div className="flex flex-col items-center max-md:ml-0 max-md:w-full">
                                                    <div className="flex flex-col py-6 self-stretch my-auto max-md:mt-8 max-md:max-w-full">
                                                        <div className="flex gap-4 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                                            <div className="flex flex-col flex-1">
                                                                <div className="text-xl font-bold text-left text-zinc-900">
                                                                    {CurrentUser?.nom}
                                                                </div>
                                                                <div className="mt-1 text-base font-medium text-blue-600">
                                                                    {CurrentUser?.profil}
                                                                </div>
                                                            </div>
                                                            {showInvitation || !owner ? (
                                                                <div className="flex gap-4 self-start px-px text-base font-medium text-white">
                                                                    <div className="flex gap-[16px] justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                                                        <img
                                                                            loading="lazy"
                                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28e6ba6256949e6a3dc6010c4e7b43beb00ed279c42bf8ee0a22c90053ad1f50?"
                                                                            className="w-5 aspect-square"
                                                                        />
                                                                        {acceptedFriend ?
                                                                            <div className="grow">{acceptedFriend?.status}</div>
                                                                            : <button onClick={sendFriendRequest} className="grow">Ajouter ami(e) </button>}
                                                                    </div>

                                                                    <button onClick={() => {
                                                                        copyLinkToClipboard('2003960');
                                                                        setIsCopyLinkPopupVisible(true);
                                                                        setTimeout(() => {
                                                                            setIsCopyLinkPopupVisible(false);
                                                                        }, 2000); // Hide the popup after 2 seconds
                                                                    }}>
                                                                        <svg className='fill-white' width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path className={acceptedFriend?.status === 'accepted' ? 'fill-green-500' : 'fill-gray-500'} d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z" fill="#65676B" />
                                                                            <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z" fill="#D0D0D0" />
                                                                            <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z" fill="#D0D0D0" />
                                                                        </svg>
                                                                    </button>
                                                                    {isCopyLinkPopupVisible && (
                                                                        <div className="text-black copy-link-popup flex items-center">
                                                                            Numéro coupé !
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                        <div className="flex gap-3 items-start mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                                                            <div className="flex gap-2 justify-center items-center self-stretch py-2">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ad5d0e7c1cc757b7d699a58b21f17f4dfeb3117bc9f1e3f4d361257cb7cc63?"
                                                                    className="self-stretch w-5 aspect-[1.3]"
                                                                />
                                                                <div className="self-stretch my-auto">Licence :</div>
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f75f221781125db60fd42377c75c439dc592852bf0ba8d19fbf4b35ca04660?"
                                                                    className="self-stretch my-auto aspect-[1.3] w-[13px]"
                                                                />
                                                            </div>
                                                            <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5578ac17241460884f81bfecaeacebd3031f2ffd1b2203855765a3b934a027?"
                                                                    className="aspect-[1.49] w-[30px]"
                                                                />
                                                                <div className="grow self-start mt-1">Tunisie</div>
                                                            </div>
                                                            <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d609bf65a79e970c6866ad932e5fdd62a603a912852f0024386dcf0730b04895?"
                                                                    className="w-5 aspect-square"
                                                                />
                                                                <div className="grow self-start mt-1">
                                                                    Espérance Sportive de Tunis
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {CurrentUser?.discreptionBio && <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full px-5">
                                        {CurrentUser?.discreptionBio} 💥
                                    </div>}

                                    <div className="flex gap-4 px-4 mt-8 text-lg whitespace-nowrap text-zinc-900 ">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6536ab3d03191ac5b7abe9faf755957e24f289e2bad0355abb7667f6767ce773?"
                                            className="my-auto w-5 aspect-square"
                                        />
                                        <div>Tactiques Préférée</div>

                                    </div>
                                    <div className="mt-2">
                                        <img src={Tactic} alt='tactics football' />
                                    </div>
                                    {/* <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b1c71f1aa122ee7778a9eae0f75e4ea7c7b8b3201bfa91fccac0a1e396c367b?"
                                        className="self-start w-5 aspect-square"
                                    />
                                    <div className="grow">Compétences</div>
                                </div> */}
                                    {/* <div className="flex gap-2 px-5 justify-between self-stretch mt-4 text-base font-semibold text-blue-600 flex-wrap whitespace-nowrap max-md:flex-wrap max-md:max-w-full">

                                    {skills.map((skill, index) => {
                                        return (
                                            <div key={index} className="grow justify-center text-center px-4 py-2 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px]">
                                                {skill}
                                            </div>
                                        )
                                    })}
                                </div> */}
                                    <div className="flex gap-5 justify-between mt-4 max-w-full">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d48767f34c0f5eeb5b136d6fa841306141e666e984505709b948351356b8c0a?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4edccddd34ae855e8b823ca95ec43db0895afda31dfb64866ce37d726c06459?"
                                            className="flex-1 shrink-0 w-full aspect-[0.96]"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/51679bc07454148ecc223f937ceb3813d8de851f3bd1d063f492d082c3a1e855?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2686a6af72883580063be4a13ebf1b9e1f0d4f86985cb635ce8e8d46ff66d545?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e740b6125745592d6108027bfb6f20b03e6e7cbe80faff8883bb7ebb310c29f3?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center py-2 mt-4 max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
                                        <div className="flex gap-3">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d9e982fd23ce780b6690e06294838b0bae53c64efd8d5ce059ebb4030011a1f?"
                                                className="w-4 aspect-[0.94]"
                                            />
                                            <div>Voir Plus</div>
                                        </div>
                                    </div>
                                </div>}
                                {CurrentUser?.profil === 'scout' && <div className="flex flex-col items-center  py-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                                    {/* <p>this comment</p> */}
                                    <div className="max-md:max-w-full px-[30px]">
                                        <div className="self-stretch max-md:max-w-full">
                                            <div className="flex gap-2 max-md:flex-col max-md:gap-0 mt-[24px]">
                                                <div className="flex flex-col justify-center max-md:ml-0 max-md:w-full">
                                                    <img src={ProfilePicture} alt="profile pic" className="max-w-full rounded-full aspect-square w-[120px] max-md:mt-4" />
                                                </div>
                                                <div className="flex flex-col items-center max-md:ml-0 max-md:w-full">
                                                    <div className="flex flex-col py-6 self-stretch my-auto max-md:mt-8 max-md:max-w-full">
                                                        <div className="flex gap-4 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                                            <div className="flex flex-col flex-1">
                                                                <div className="text-xl font-bold text-left text-zinc-900">
                                                                    {CurrentUser?.nom}
                                                                </div>
                                                                <div className="mt-1 text-base font-medium text-blue-600">
                                                                    {CurrentUser?.profil}
                                                                </div>
                                                            </div>
                                                            {showInvitation || !owner ? (
                                                                <div className="flex gap-4 self-start px-px text-base font-medium text-white">
                                                                    <div className="flex gap-[16px] justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                                                        <img
                                                                            loading="lazy"
                                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28e6ba6256949e6a3dc6010c4e7b43beb00ed279c42bf8ee0a22c90053ad1f50?"
                                                                            className="w-5 aspect-square"
                                                                        />
                                                                        {acceptedFriend ?
                                                                            <div className="grow">{acceptedFriend?.status}</div>
                                                                            : <button onClick={sendFriendRequest} className="grow">Ajouter ami(e) </button>}
                                                                    </div>
                                                                    <button onClick={() => {
                                                                        copyLinkToClipboard('2003960');
                                                                        setIsCopyLinkPopupVisible(true);
                                                                        setTimeout(() => {
                                                                            setIsCopyLinkPopupVisible(false);
                                                                        }, 2000); // Hide the popup after 2 seconds
                                                                    }}>
                                                                        <svg className='fill-white' width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path className={acceptedFriend ? 'fill-green-500' : 'fill-gray-500'} d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z" fill="#65676B" />
                                                                            <path className={acceptedFriend ? 'fill-white' : 'fill-gray-200'} d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z" fill="#D0D0D0" />
                                                                            <path className={acceptedFriend ? 'fill-white' : 'fill-gray-200'} d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z" fill="#D0D0D0" />
                                                                        </svg>
                                                                    </button>
                                                                    {isCopyLinkPopupVisible && (
                                                                        <div className="text-black copy-link-popup flex items-center">
                                                                            Numéro coupé !
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                        <div className="flex gap-3 items-start mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                                                            <div className="flex gap-2 justify-center items-center self-stretch py-2">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ad5d0e7c1cc757b7d699a58b21f17f4dfeb3117bc9f1e3f4d361257cb7cc63?"
                                                                    className="self-stretch w-5 aspect-[1.3]"
                                                                />
                                                                <div className="self-stretch my-auto">Licence :</div>
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f75f221781125db60fd42377c75c439dc592852bf0ba8d19fbf4b35ca04660?"
                                                                    className="self-stretch my-auto aspect-[1.3] w-[13px]"
                                                                />
                                                            </div>
                                                            <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5578ac17241460884f81bfecaeacebd3031f2ffd1b2203855765a3b934a027?"
                                                                    className="aspect-[1.49] w-[30px]"
                                                                />
                                                                <div className="grow self-start mt-1">Tunisie</div>
                                                            </div>
                                                            <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d609bf65a79e970c6866ad932e5fdd62a603a912852f0024386dcf0730b04895?"
                                                                    className="w-5 aspect-square"
                                                                />
                                                                <div className="grow self-start mt-1">
                                                                    Espérance Sportive de Tunis
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {CurrentUser?.discreptionBio && <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full px-5">
                                        {CurrentUser?.discreptionBio} 💥
                                    </div>}
                                    {/* <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b1c71f1aa122ee7778a9eae0f75e4ea7c7b8b3201bfa91fccac0a1e396c367b?"
                                        className="self-start w-5 aspect-square"
                                    />
                                    <div className="grow">Compétences</div>
                                </div> */}
                                    {/* <div className="flex gap-2 px-5 justify-between self-stretch mt-4 text-base font-semibold text-blue-600 flex-wrap whitespace-nowrap max-md:flex-wrap max-md:max-w-full">

                                    {skills.map((skill, index) => {
                                        return (
                                            <div key={index} className="grow justify-center text-center px-4 py-2 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px]">
                                                {skill}
                                            </div>
                                        )
                                    })}
                                </div> */}
                                    <div className="flex gap-5 justify-between mt-4 max-w-full">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d48767f34c0f5eeb5b136d6fa841306141e666e984505709b948351356b8c0a?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4edccddd34ae855e8b823ca95ec43db0895afda31dfb64866ce37d726c06459?"
                                            className="flex-1 shrink-0 w-full aspect-[0.96]"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/51679bc07454148ecc223f937ceb3813d8de851f3bd1d063f492d082c3a1e855?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2686a6af72883580063be4a13ebf1b9e1f0d4f86985cb635ce8e8d46ff66d545?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e740b6125745592d6108027bfb6f20b03e6e7cbe80faff8883bb7ebb310c29f3?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center py-2 mt-4 max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
                                        <div className="flex gap-3">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d9e982fd23ce780b6690e06294838b0bae53c64efd8d5ce059ebb4030011a1f?"
                                                className="w-4 aspect-[0.94]"
                                            />
                                            <div>Voir Plus</div>
                                        </div>
                                    </div>
                                </div>}

                                {Invitation &&
                                    <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 mt-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                                        {Invitation.map(() => {
                                            <div className="mt-8 max-md:max-w-full">
                                                <div className="flex gap-3 max-md:flex-col max-md:gap-0 max-md:">
                                                    <div className="flex flex-col w-[178px] max-md:ml-0 max-md:w-full">
                                                        <div className="flex flex-col grow items-center px-3.5 py-4 w-full text-base whitespace-nowrap rounded-xl bg-zinc-100 text-zinc-900 max-md:mt-8">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="..."
                                                                className="w-20 aspect-square"
                                                            />
                                                            <div className="mt-4 font-semibold">hbfd</div>
                                                            <div className="text-xs font-light">kjjsdf</div>
                                                            <div className="justify-center self-stretch px-10 py-2 mt-4 font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                                                                Accept invitation
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}

                                    </div>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow text-base font-medium whitespace-nowrap text-zinc-900 max-md:mt-6 max-md:max-w-full">
                                <div className="flex gap-5 justify-between  px-4 py-4 bg-white rounded-xl max-md:flex-wrap max-md:max-w-full">
                                    <div className={`flex gap-2 items-center  justify-between p-2 ${feed === 'pubs' ? 'text-blue-600' : ''}`}>
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

                                        <div className="grow cursor-pointer" onClick={() => setFeed('pubs')}>Publications</div>
                                    </div>
                                    <div className={`flex gap-2 items-center  justify-between p-2 ${feed === 'video' ? 'text-blue-600' : ''}`}>
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${feed === 'video' ? 'fill-blue-500' : ''}`} d="M12.8525 9.75667C12.896 9.78045 12.9321 9.81572 12.957 9.85863C12.9818 9.90153 12.9944 9.95043 12.9933 10C12.9959 10.0423 12.9881 10.0845 12.9706 10.1232C12.9532 10.1618 12.9267 10.1956 12.8933 10.2217L8.41667 12.4617C8.37403 12.4852 8.326 12.4973 8.27729 12.4967C8.22858 12.4961 8.18087 12.4828 8.13884 12.4582C8.09681 12.4335 8.06192 12.3984 8.03757 12.3562C8.01323 12.314 8.00028 12.2662 8 12.2175V7.7825C7.99906 7.73305 8.01159 7.68428 8.03625 7.64142C8.06092 7.59855 8.09678 7.5632 8.14 7.53917C8.17978 7.51622 8.22491 7.50415 8.27083 7.50417C8.33803 7.50614 8.40353 7.52568 8.46083 7.56083L12.8525 9.75667ZM20.5 4.16667V15.8333C20.4987 16.938 20.0593 17.997 19.2782 18.7782C18.497 19.5593 17.438 19.9987 16.3333 20H4.66667C3.562 19.9987 2.50296 19.5593 1.72185 18.7782C0.940735 17.997 0.501323 16.938 0.5 15.8333L0.5 4.16667C0.501323 3.062 0.940735 2.00296 1.72185 1.22185C2.50296 0.440735 3.562 0.00132321 4.66667 0L16.3333 0C17.438 0.00132321 18.497 0.440735 19.2782 1.22185C20.0593 2.00296 20.4987 3.062 20.5 4.16667ZM14.66 10C14.6603 9.64888 14.5655 9.30425 14.3856 9.00272C14.2057 8.70118 13.9474 8.45402 13.6383 8.2875L9.24 6.09167C8.94375 5.9217 8.60801 5.83263 8.26646 5.83339C7.92492 5.83416 7.58958 5.92474 7.2941 6.09603C6.99861 6.26733 6.75337 6.51332 6.58298 6.80933C6.4126 7.10534 6.32305 7.44095 6.32333 7.7825V12.2175C6.32133 12.559 6.41009 12.8949 6.58053 13.1908C6.75096 13.4867 6.99695 13.732 7.29333 13.9017C7.59334 14.0768 7.93427 14.1697 8.28167 14.1708C8.60305 14.1723 8.91917 14.0892 9.19833 13.93L13.6783 11.6908C13.9779 11.5221 14.2269 11.2764 14.3995 10.9791C14.5721 10.6818 14.662 10.3438 14.66 10Z" fill="#1D1E21" />
                                        </svg>
                                        <div className="grow cursor-pointer" onClick={() => setFeed('video')} >Vidéos</div>
                                    </div>
                                    <div className={`flex gap-2 items-center  justify-between p-2 ${feed === 'photo' ? 'text-blue-600' : ''}`}>

                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${feed === 'photo' ? 'fill-blue-500' : ''}`} d="M15.8333 0H4.16667C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 13.8217L4.55333 9.26833C4.94026 8.88131 5.39964 8.57429 5.90523 8.36483C6.41083 8.15537 6.95273 8.04756 7.5 8.04756C8.04727 8.04756 8.58917 8.15537 9.09477 8.36483C9.60036 8.57429 10.0597 8.88131 10.4467 9.26833L19.3058 18.1275C19.7583 17.4479 19.9998 16.6498 20 15.8333V4.16667C19.9987 3.062 19.5593 2.00296 18.7782 1.22185C17.997 0.440735 16.938 0.00132321 15.8333 0ZM15 8.33333C14.3407 8.33333 13.6963 8.13784 13.1481 7.77157C12.5999 7.40529 12.1727 6.8847 11.9204 6.27561C11.6681 5.66652 11.6021 4.9963 11.7307 4.3497C11.8593 3.7031 12.1768 3.10915 12.643 2.64298C13.1092 2.1768 13.7031 1.85933 14.3497 1.73072C14.9963 1.6021 15.6665 1.66811 16.2756 1.9204C16.8847 2.17269 17.4053 2.59994 17.7716 3.1481C18.1378 3.69626 18.3333 4.34073 18.3333 5C18.3333 5.88406 17.9821 6.7319 17.357 7.35702C16.7319 7.98214 15.8841 8.33333 15 8.33333Z" fill="#1D1E21" />
                                        </svg>

                                        <div className="grow cursor-pointer" onClick={() => setFeed('photo')}>Photos</div>
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