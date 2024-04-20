import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import Placeholder from "../../../assets/placeholder.jpg"
import { Config } from "../../../config";
import {Context} from "../../../index"

const Scout = ({ userInfo }) => {

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const isOwner = storedUserData.id == id
    const [acceptedFriend, setAcceptedFriend] = useState(false)
    const [invitationSend, setInvitationSend] = useState(false);
    const [Invitation, setInvitation] = useState([]);
    const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);

    const isFriendAccepted = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/checkFriends/${storedUserData.id}`)
        const result = await response.json();
        setAcceptedFriend(result.exists)
    }
    const getWhatsappPrefix = (string) => {
        return string.split(',')[0].substring(1);
      }
      const {_currentLang, _setLang, getTranslation} = React.useContext(Context)

    const sendFriendRequest = async () => {

        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserData.id}`, {
            method: "POST",
        });
        isFriendAccepted()
        const result = await response.json();
        console.log('friend request sent')
    }

    const CheckIfInvitationIsSend = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/friend-requests`, {
            method: "GET",
        });
        const result = await response.json();

        setInvitation(result.receiver)

        // const isFriend = result.receiver.filter((item) => {
        //     console.log(item.id)
        //     return item.id === LocalStorageID.id
        // })
        // setInvitationSend(isFriend)
    }
    const copyLinkToClipboard = (articleId) => {
        // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
        const number = userInfo.user.numWSup;
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
        isFriendAccepted()
    }, [id])

    return (
        <>
            <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px]">
                <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
                    <div className="flex items-center md:w-fit w-full justify-center  md:mx-[0px] ">
                        <img
                            alt="profile"
                            loading="lazy"
                            srcSet={userInfo?.user.image ? userInfo?.user.image : Placeholder}
                            className="max-w-full rounded-full aspect-square w-[100px] md:w-[120px]"
                        />
                        <div className="flex-col items-center  max-w-full pl-[16px] h-full md:pt-[5px]">
                            <div className="text-xl font-bold text-zinc-900 flex gap-2 flex-wrap whitespace-normal">
                                <p className="break-all">{userInfo?.user.nom} {userInfo?.user.prenom}</p>
                            </div>
                            <div className="text-base font-medium text-blue-600">
                                Scout
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-full md:w-fit w-full">
                        <div className="flex md:justify-end md:pt-[5px]">
                            {isOwner ?
                                <div className="w-full md:w-[157px] flex gap-2 justify-center self-start px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                                        className="shrink-0 my-auto aspect-square w-[15px]"
                                    />
                                    <Link to={'/setting/personal'} className="flex items-center hover:text-blue-900"><p>{
             getTranslation(
              `Edit`,  // -----> Englais
              `Modifier`, //  -----> Francais
            //   ``,  //  -----> Turkey
            //   `` ,  //  -----> Allemagne
              ) 

            }</p></Link>
                                </div> :
                                <>
                                    <div className="flex items-center gap-3 md:w-fit w-full">
                                        <div className={`w-full max-sm:w-full items-center flex gap-2  justify-center px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]`}>
                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_61_30243)">
                                                    <path d="M7.16569 10C9.92319 10 12.1657 7.7575 12.1657 5C12.1657 2.2425 9.92319 0 7.16569 0C4.40819 0 2.16569 2.2425 2.16569 5C2.16569 7.7575 4.40819 10 7.16569 10ZM9.66569 11.6667H4.66569C2.36819 11.6667 0.499023 13.5358 0.499023 15.8333V20H13.8324V15.8333C13.8324 13.5358 11.9632 11.6667 9.66569 11.6667ZM20.4632 7.9L16.3582 12.005C16.0282 12.3342 15.5957 12.4992 15.1632 12.4992C14.7307 12.4992 14.2982 12.3342 13.969 12.0058L11.5765 9.61333L12.7549 8.435L15.1465 10.8275L19.284 6.7225L20.4624 7.90083L20.4632 7.9Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_61_30243">
                                                        <rect width="20" height="20" fill="white" transform="translate(0.499023)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            {acceptedFriend ? <div className="">{acceptedFriend?.status == 'pending' ? 'En Atente' : 'ami(e)'}</div> :
                                                <button className="flex items-center " onClick={sendFriendRequest}><p>{
                                                    getTranslation(
                                                     `Add`,  // -----> Englais
                                                     `Ajouter`, //  -----> Francais
                                                   //   ``,  //  -----> Turkey
                                                   //   `` ,  //  -----> Allemagne
                                                     ) 
                                       
                                                   }</p></button>}
                                        </div>
                                        {acceptedFriend?.status === 'accepted' ? <div>
                                            <a href={`https://wa.me/${getWhatsappPrefix(userInfo.user.optionalattributs)}${userInfo.user.numWSup}`} target="_blank">
                                                <svg className='fill-white' width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className={acceptedFriend?.status === 'accepted' ? 'fill-green-500' : 'fill-gray-500'} d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z" fill="#65676B" />
                                                    <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z" fill="#D0D0D0" />
                                                    <path className={acceptedFriend?.status === 'accepted' ? 'fill-white' : 'fill-gray-200'} d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z" fill="#D0D0D0" />
                                                </svg>
                                            </a>
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
                                            </div>
                                        }
                                    </div>


                                </>
                            }


                        </div>
                    </div>
                </div>
                <div className="gap-x-8 md:ml-[10px] max:lg-[150px] md:-mt-12 flex justify-center md:justify-between flex-wrap text-sm self-end">
                    <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5578ac17241460884f81bfecaeacebd3031f2ffd1b2203855765a3b934a027?"
                            className="aspect-[1.49] w-[30px]"
                        />
                        <div className="grow self-start mt-1">Tunisie</div>
                    </div>

                    <div className="flex gap-2 justify-center p-2 whitespace-nowrap items-center">
                        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.983 9.2711L19.6399 15.6698L14.2165 19.7378C12.8621 20.7541 10.9991 20.7541 9.64466 19.7378L3.80316 15.3564C3.30883 14.9859 2.70687 14.7849 2.08872 14.7849H1.45342C0.926706 14.7849 0.5 14.3582 0.5 13.8325V3.29531C0.5 2.81145 0.860986 2.40856 1.34198 2.35427C2.63448 2.21044 3.7984 1.69135 4.98899 0.997952C6.70153 0.116918 8.9484 0.431232 10.3381 1.73326L10.9257 2.29807L7.10918 6.02318C6.08719 7.04423 5.92431 8.65866 6.7301 9.774C7.22539 10.4626 8.12166 10.9732 9.05794 10.9732C9.81324 10.9732 10.5381 10.676 11.0619 10.1512L11.983 9.27015V9.2711ZM19.5056 0.997952C17.8959 0.193115 15.8881 0.402658 14.4499 1.5199L8.44645 7.3795C8.09309 7.73382 8.01308 8.30053 8.27405 8.66247C8.4455 8.90059 8.69409 9.04346 8.97793 9.06727C9.25891 9.09108 9.53131 8.98917 9.72848 8.79106L13.1745 5.52504C14.0784 4.66686 15.388 6.03651 14.4918 6.90136L13.3669 7.94622L21.5515 14.7859H22.4058C22.9316 14.7859 23.3583 14.3592 23.3583 13.8334V3.26292C23.3583 2.79621 23.0173 2.41046 22.5573 2.3276C20.9438 2.03614 19.5046 0.998904 19.5046 0.998904L19.5056 0.997952Z" fill="#1D1E21" />
                        </svg>

                        <div className="grow self-start mt-1">
                            {userInfo?.scout?.engagement}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center p-2 whitespace-nowrap items-center">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2149_4318)">
                                <path d="M11.3449 13.8333H9.36993C8.92992 13.834 8.50105 13.695 8.14508 13.4364C7.78911 13.1778 7.52441 12.8128 7.38909 12.3942L6.77909 10.5167C6.64124 10.0978 6.64026 9.64589 6.7763 9.22641C6.91233 8.80692 7.17832 8.44161 7.53576 8.18333L9.13243 7.02667C9.48783 6.76715 9.91652 6.62729 10.3566 6.62729C10.7967 6.62729 11.2254 6.76715 11.5808 7.02667L13.1783 8.18667C13.5358 8.44485 13.8019 8.81016 13.9379 9.22968C14.074 9.64919 14.0729 10.1011 13.9349 10.52L13.3258 12.3975C13.1892 12.8151 12.9241 13.1789 12.5683 13.4368C12.2125 13.6947 11.7843 13.8335 11.3449 13.8333ZM20.3574 10.5C20.3574 12.4778 19.7709 14.4112 18.6721 16.0557C17.5733 17.7002 16.0115 18.9819 14.1843 19.7388C12.357 20.4957 10.3463 20.6937 8.40652 20.3079C6.46671 19.922 4.68488 18.9696 3.28636 17.5711C1.88783 16.1725 0.935426 14.3907 0.549574 12.4509C0.163721 10.5111 0.361755 8.50043 1.11863 6.67317C1.87551 4.8459 3.15723 3.28412 4.80172 2.1853C6.44622 1.08649 8.37961 0.5 10.3574 0.5C13.0087 0.502868 15.5506 1.55736 17.4253 3.4321C19.3001 5.30684 20.3546 7.84872 20.3574 10.5ZM10.3574 18C10.7889 17.9975 11.2194 17.9579 11.6441 17.8817L12.3508 15.5642C12.5111 15.0606 12.8274 14.6211 13.2538 14.3089C13.6802 13.9968 14.1948 13.8282 14.7233 13.8275L17.0708 13.8233C17.4487 13.065 17.6942 12.2477 17.7966 11.4067L15.9233 10.1567C15.4909 9.85323 15.1661 9.42034 14.9957 8.92041C14.8253 8.42048 14.818 7.87933 14.9749 7.375L15.6858 5.23083C15.0898 4.63169 14.3974 4.13702 13.6374 3.7675L11.8274 5.0225C11.4006 5.33392 10.8858 5.50173 10.3574 5.50173C9.82903 5.50173 9.31429 5.33392 8.88743 5.0225L7.12576 3.7425C6.37737 4.10002 5.69316 4.57868 5.10076 5.15917L5.73993 7.37333C5.89687 7.87767 5.88959 8.41881 5.71915 8.91874C5.54872 9.41867 5.22392 9.85156 4.79159 10.155L2.92993 11.4842C3.03698 12.298 3.27832 13.0885 3.64409 13.8233L5.99076 13.8275C6.51926 13.828 7.03395 13.9963 7.46054 14.3083C7.88712 14.6203 8.20353 15.0598 8.36409 15.5633L9.08493 17.8833C9.50496 17.9586 9.9307 17.9977 10.3574 18Z" fill="#1D1E21" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2149_4318">
                                    <rect width="20" height="20" fill="white" transform="translate(0.357422 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>


                        <div className="grow self-start mt-1">
                            {userInfo?.scout?.nb_joueurdetecter}    


                            {
             getTranslation(
              `Players Detected`,  // -----> Englais
              `Joueurs Détectés`, //  -----> Francais
            //   ``,  //  -----> Turkey
            //   `` ,  //  -----> Allemagne
              ) 

            } 


                        </div>
                    </div>
                </div>

                <div className="self-stretch mt-8 text-break font-light text-center text-neutral-900 max-md:max-w-full">
                    {userInfo?.user.discreptionBio}
                </div>

                <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                        className="shrink-0 self-start w-5 aspect-square"
                    />
                    <div className="grow">{
             getTranslation(
              `Skills`,  // -----> Englais
              `Compétences`, //  -----> Francais
            //   ``,  //  -----> Turkey
            //   `` ,  //  -----> Allemagne
              ) 

            } </div>
                </div>
                <div className="flex justify-center gap-2  mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">

                    {userInfo?.scout?.skillsscout.split(',').filter(item => item.trim() !== '').map((item) => {
                        return (<div className="text-center justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                            {item}
                        </div>)
                    })}

                </div>
                <div className="flex gap-5 justify-between">
                    {userInfo?.user.liensSM && <a target="_blank" href={`https://www.instagram.com/${userInfo?.user.liensSM}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                            className="shrink-0 aspect-square w-[25px]"
                        />
                    </a>}
                    {userInfo?.user.tiktok && <a target="_blank" href={`https://www.tiktok.com/${userInfo?.user.tiktok}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                            className="shrink-0 w-6 aspect-[0.96]"
                        />
                    </a>}
                    {userInfo?.user.linkedin && <a target="_blank" href={`https://www.linkedin.com/in/${userInfo?.user.linkedin}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                            className="shrink-0 w-6 aspect-[0.96]"
                        />
                    </a>}
                    {userInfo?.user.fb && <a target="_blank" href={`https://www.facebook.com/${userInfo?.user.fb}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                            className="shrink-0 aspect-square w-[25px]"
                        />
                    </a>}
                    {userInfo?.user.x && <a target="_blank" href={`https://www.facebook.com/${userInfo?.user.fb}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                            className="shrink-0 w-6 aspect-[0.96]"
                        />
                    </a>}
                </div>
                <div className="flex justify-center items-center px-16 py-2 mt-4 max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
                    <div className="flex gap-4 items-center">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2fbc01810223be1770f84ab0be35b3b52448631192553972949fcfd687661f3?"
                            className="shrink-0 self-start w-4 aspect-[0.94]"
                        />
                        <a href={`/profile/more/${id}`}>{
             getTranslation(
              `See more`,  // -----> Englais
              ` Voir Plus`, //  -----> Francais
            //   ``,  //  -----> Turkey
            //   `` ,  //  -----> Allemagne
              ) 

            }</a>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Scout