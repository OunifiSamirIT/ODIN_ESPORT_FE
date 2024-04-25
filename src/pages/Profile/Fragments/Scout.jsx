import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import Placeholder from "../../../assets/placeholder.jpg"
import { Config } from "../../../config";
import { Context } from "../../../index"

const Scout = ({ userInfo }) => {

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const isOwner = storedUserData.id == id
    const [acceptedFriend, setAcceptedFriend] = useState(false)
    const [invitationSend, setInvitationSend] = useState(false);
    const [Invitation, setInvitation] = useState([]);
    const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const isFriendAccepted = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/checkFriends/${storedUserData.id}`)
        const result = await response.json();
        setAcceptedFriend(result.exists)
    }
    const getWhatsappPrefix = (string) => {
        return string.split(',')[0].substring(1);
    }
}
const { _currentLang, _setLang, getTranslation } = React.useContext(Context)

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
// Styles pour la modale
const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent', // Fond transparent
        border: 'none', // Supprimer les bordures
        // borderRadius: '50%', // Modal circulaire
        padding: 0, // Pas de padding
        width: '80vw', // Largeur relative de la fenêtre
        height: '80vw', // Hauteur relative de la fenêtre
        maxWidth: '400px', // Limite la largeur maximale
        maxHeight: '400px', // Limite la hauteur maximale
        overflow: 'hidden', // Cacher tout contenu dépassant
        animation: 'fadeIn 0.3s ease-out', // Animation d'apparition
    },
};


const openModal = (src) => {
    setImageSrc(src);
    setModalIsOpen(true);
};

// Fonction pour fermer la modale
const closeModal = () => {
    setImageSrc(null);
    setModalIsOpen(false);
};
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

                    <div>
                        {/* Bouton/image cliquable */}
                        <a href="#" onClick={() => openModal(userInfo?.user.image ? userInfo?.user.image : Placeholder)}>
                            <img
                                alt="profile"
                                loading="lazy"
                                srcSet={userInfo?.user.image ? userInfo?.user.image : Placeholder}
                                className="max-w-full rounded-full aspect-square w-[100px] md:w-[120px]"
                            />
                        </a>

                        {/* Modale d'agrandissement de l'image */}
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Image Modal"
                            style={modalStyle} // Styles personnalisés pour la modale
                        >
                            <div style={{ width: '100%', height: '100%' }}>
                                <img
                                    alt="profile"
                                    loading="lazy"
                                    srcSet={imageSrc ? imageSrc : Placeholder}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Remplir tout l'espace disponible
                                />
                            </div>
                        </Modal>
                    </div>



                    {/* <img
                            alt="profile"
                            loading="lazy"
                            srcSet={userInfo?.user.image ? userInfo?.user.image : Placeholder}
                            className="max-w-full rounded-full aspect-square w-[100px] md:w-[120px]"
                        /> */}
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
            {/* social icons */}

            <div div className="  max-w-xl flex flex gap-4 justify-between mt-2" >
                {userInfo?.user.liensSM && <a target="_blank" href={`https://www.instagram.com/${userInfo?.user.liensSM}`}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 12.5C25 18.8133 20.3199 24.0326 14.2405 24.8798C13.6718 24.959 13.0902 25 12.5 25C11.8184 25 11.1497 24.9453 10.4975 24.8402C4.54624 23.8822 0 18.7212 0 12.4993C0 5.59642 5.59642 0 12.5 0C19.4036 0 25 5.59642 25 12.5Z" fill="url(#paint0_linear_250_40236)" />
                        <path d="M16.4145 4.99609H8.58526C6.42227 4.99609 4.66309 6.75528 4.66309 8.91827V16.081C4.66309 18.244 6.42227 20.0031 8.58526 20.0031H16.4145C18.5775 20.0031 20.3367 18.244 20.3367 16.081V8.91827C20.3367 6.75528 18.5775 4.99609 16.4145 4.99609ZM6.04654 8.91827C6.04654 7.51826 7.18526 6.37954 8.58526 6.37954H16.4145C17.8145 6.37954 18.9532 7.51826 18.9532 8.91827V16.081C18.9532 17.481 17.8145 18.6197 16.4145 18.6197H8.58526C7.18526 18.6197 6.04654 17.481 6.04654 16.081V8.91827Z" fill="white" />
                        <path d="M12.4983 16.1489C14.5101 16.1489 16.1469 14.512 16.1469 12.5002C16.1469 10.4884 14.5101 8.85156 12.4983 8.85156C10.4864 8.85156 8.84961 10.4884 8.84961 12.5002C8.84961 14.512 10.4864 16.1489 12.4983 16.1489ZM12.4983 10.2357C13.7471 10.2357 14.7627 11.2514 14.7627 12.5002C14.7627 13.7491 13.7471 14.7647 12.4983 14.7647C11.2494 14.7647 10.2338 13.7491 10.2338 12.5002C10.2338 11.2514 11.2494 10.2357 12.4983 10.2357Z" fill="white" />
                        <path d="M16.4862 9.43914C17.0282 9.43914 17.4694 8.99791 17.4694 8.4559C17.4694 7.91389 17.0282 7.47266 16.4862 7.47266C15.9442 7.47266 15.5029 7.91389 15.5029 8.4559C15.5029 8.99791 15.9442 9.43914 16.4862 9.43914Z" fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_250_40236" x1="12.5" y1="0" x2="12.5" y2="25" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#E001CE" />
                                <stop offset="0.185" stop-color="#CD01BD" />
                                <stop offset="0.455" stop-color="#F61079" />
                                <stop offset="0.78" stop-color="#FF4935" />
                                <stop offset="1" stop-color="#E39816" />
                            </linearGradient>
                        </defs>
                    </svg>
                </a>}

                {userInfo?.user.tiktok ? <a target="_blank" href={`https://www.tiktok.com/${userInfo?.user.tiktok}`}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9993 12.5004C24.9993 18.8135 20.3193 24.0326 14.2401 24.8798C13.6714 24.959 13.0899 25 12.4996 25C11.818 25 11.1493 24.9453 10.4972 24.8402C4.54611 23.8822 0 18.7214 0 12.4996C0 5.59626 5.59626 0 12.4996 0C19.403 0 24.9993 5.59626 24.9993 12.4996V12.5004Z" fill="black" />
                        <path d="M18.6181 9.00229V11.3905C18.1999 11.3502 17.6587 11.2552 17.0576 11.0349C16.2738 10.7477 15.6901 10.3547 15.3086 10.0503V14.8785L15.2992 14.8634C15.3057 14.9592 15.3086 15.0563 15.3086 15.1549C15.3086 17.5532 13.358 19.5045 10.959 19.5045C8.55996 19.5045 6.60938 17.5525 6.60938 15.1549C6.60938 12.7574 8.55996 10.8046 10.959 10.8046C11.1936 10.8046 11.424 10.8233 11.6492 10.8593V13.2137C11.4326 13.136 11.2008 13.0942 10.959 13.0942C9.82317 13.0942 8.89826 14.0184 8.89826 15.1549C8.89826 16.2915 9.82317 17.2157 10.959 17.2157C12.0948 17.2157 13.0197 16.2907 13.0197 15.1549C13.0197 15.1125 13.019 15.07 13.0161 15.0275V5.64453H15.4036C15.4122 5.84679 15.4209 6.05049 15.4288 6.25274C15.4446 6.65078 15.5864 7.03298 15.8333 7.34608C16.1234 7.71389 16.5509 8.14144 17.1527 8.48261C17.7155 8.80147 18.2438 8.93823 18.6181 9.00301V9.00229Z" fill="white" />
                    </svg>
                </a> : <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.9016 13.1918C25.9016 19.5049 21.2216 24.724 15.1424 25.5712C14.5738 25.6504 13.9922 25.6914 13.402 25.6914C12.7204 25.6914 12.0517 25.6367 11.3996 25.5316C5.44845 24.5736 0.902344 19.4128 0.902344 13.191C0.902344 6.28767 6.49861 0.691406 13.402 0.691406C20.3054 0.691406 25.9016 6.28767 25.9016 13.191V13.1918Z" fill="#BBC0CE" />
                    <path d="M19.5205 9.6937V12.0819C19.1023 12.0416 18.561 11.9466 17.96 11.7263C17.1762 11.4392 16.5924 11.0462 16.2109 10.7417V15.57L16.2016 15.5548C16.2081 15.6506 16.2109 15.7477 16.2109 15.8463C16.2109 18.2446 14.2603 20.196 11.8613 20.196C9.46231 20.196 7.51172 18.2439 7.51172 15.8463C7.51172 13.4488 9.46231 11.496 11.8613 11.496C12.096 11.496 12.3263 11.5147 12.5516 11.5507V13.9051C12.3349 13.8274 12.1032 13.7856 11.8613 13.7856C10.7255 13.7856 9.8006 14.7098 9.8006 15.8463C9.8006 16.9829 10.7255 17.9071 11.8613 17.9071C12.9971 17.9071 13.922 16.9822 13.922 15.8463C13.922 15.8039 13.9213 15.7614 13.9185 15.7189V6.33594H16.3059C16.3146 6.53819 16.3232 6.74189 16.3311 6.94415C16.347 7.34219 16.4888 7.72439 16.7356 8.03749C17.0257 8.40529 17.4533 8.83284 18.055 9.17402C18.6179 9.49288 19.1462 9.62964 19.5205 9.69442V9.6937Z" fill="white" />
                </svg>
                }
                {userInfo?.user.linkedin ? <a target="_blank" href={`https://www.linkedin.com/in/${userInfo?.user.linkedin}`}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9983 12.5004C24.9983 18.8135 20.3183 24.0326 14.2391 24.8798C13.6705 24.959 13.0889 25 12.4987 25C11.817 25 11.1484 24.9453 10.4962 24.8402C4.54513 23.8822 -0.000976562 18.7214 -0.000976562 12.4996C-0.000976562 5.59626 5.59528 0 12.4987 0C19.402 0 24.9983 5.59626 24.9983 12.4996V12.5004Z" fill="#0A66C2" />
                        <path d="M6.07961 8.27762C5.74635 7.96811 5.58008 7.58519 5.58008 7.12958C5.58008 6.67396 5.74635 6.27376 6.07961 5.96426C6.41286 5.65475 6.84184 5.5 7.368 5.5C7.89416 5.5 8.30587 5.65475 8.63841 5.96426C8.97166 6.27376 9.13794 6.66244 9.13794 7.12958C9.13794 7.59671 8.97166 7.96811 8.63841 8.27762C8.30515 8.58712 7.88192 8.74188 7.368 8.74188C6.85408 8.74188 6.41286 8.58712 6.07961 8.27762ZM8.85722 10.0526V19.5371H5.86079V10.0526H8.85722Z" fill="#FEFFFC" />
                        <path d="M18.8344 10.9921C19.4872 11.7011 19.814 12.6749 19.814 13.9144V19.3732H16.9673V14.2994C16.9673 13.6747 16.8053 13.1888 16.4814 12.8426C16.1575 12.4964 15.7221 12.3237 15.175 12.3237C14.628 12.3237 14.1926 12.4971 13.8687 12.8426C13.5448 13.1888 13.3828 13.6747 13.3828 14.2994V19.3732H10.5195V10.0297H13.3828V11.2692C13.6729 10.856 14.0637 10.53 14.5553 10.2896C15.0462 10.0499 15.599 9.92969 16.213 9.92969C17.307 9.92969 18.1808 10.2845 18.8337 10.9928L18.8344 10.9921Z" fill="#FEFFFC" />
                    </svg>

                </a> : <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9983 12.5004C24.9983 18.8135 20.3183 24.0326 14.2391 24.8798C13.6705 24.959 13.0889 25 12.4987 25C11.817 25 11.1484 24.9453 10.4962 24.8402C4.54513 23.8822 -0.000976562 18.7214 -0.000976562 12.4996C-0.000976562 5.59626 5.59528 0 12.4987 0C19.402 0 24.9983 5.59626 24.9983 12.4996V12.5004Z" fill="#BBC0CE" />
                    <path d="M6.07961 8.27762C5.74635 7.96811 5.58008 7.58519 5.58008 7.12958C5.58008 6.67396 5.74635 6.27376 6.07961 5.96426C6.41286 5.65475 6.84184 5.5 7.368 5.5C7.89416 5.5 8.30587 5.65475 8.63841 5.96426C8.97166 6.27376 9.13794 6.66244 9.13794 7.12958C9.13794 7.59671 8.97166 7.96811 8.63841 8.27762C8.30515 8.58712 7.88192 8.74188 7.368 8.74188C6.85408 8.74188 6.41286 8.58712 6.07961 8.27762ZM8.85722 10.0526V19.5371H5.86079V10.0526H8.85722Z" fill="#FEFFFC" />
                    <path d="M18.8344 10.9921C19.4872 11.7011 19.814 12.6749 19.814 13.9144V19.3732H16.9673V14.2994C16.9673 13.6747 16.8053 13.1888 16.4814 12.8426C16.1575 12.4964 15.7221 12.3237 15.175 12.3237C14.628 12.3237 14.1926 12.4971 13.8687 12.8426C13.5448 13.1888 13.3828 13.6747 13.3828 14.2994V19.3732H10.5195V10.0297H13.3828V11.2692C13.6729 10.856 14.0637 10.53 14.5553 10.2896C15.0462 10.0499 15.599 9.92969 16.213 9.92969C17.307 9.92969 18.1808 10.2845 18.8337 10.9928L18.8344 10.9921Z" fill="#FEFFFC" />
                </svg>

                }
                {userInfo?.user.fb ? <a target="_blank" href={`https://www.facebook.com/${userInfo?.user.fb}`}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9997 12.5C24.9997 18.8133 20.3196 24.0326 14.2402 24.8798C13.6716 24.959 13.09 25 12.4997 25C11.8181 25 11.1494 24.9453 10.4973 24.8402C4.54454 23.8822 -0.000976562 18.7219 -0.000976562 12.5C-0.000976562 5.59642 5.59545 0 12.499 0C19.4026 0 24.999 5.59642 24.999 12.5H24.9997Z" fill="#2E71EB" />
                        <path d="M14.2392 10.0355V12.7585H17.6079L17.0745 16.4273H14.2392V24.8791C13.6706 24.9583 13.089 24.9994 12.4988 24.9994C11.8171 24.9994 11.1484 24.9446 10.4963 24.8396V16.4273H7.38965V12.7585H10.4963V9.42726C10.4963 7.36 12.172 5.68359 14.24 5.68359V5.68575C14.2457 5.68575 14.2515 5.68359 14.2572 5.68359H17.6086V8.85574H15.419C14.7676 8.85574 14.24 9.38335 14.24 10.0348L14.2392 10.0355Z" fill="white" />
                    </svg>

                </a> : <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9997 12.5C24.9997 18.8133 20.3196 24.0326 14.2402 24.8798C13.6716 24.959 13.09 25 12.4997 25C11.8181 25 11.1494 24.9453 10.4973 24.8402C4.54454 23.8822 -0.000976562 18.7219 -0.000976562 12.5C-0.000976562 5.59642 5.59545 0 12.499 0C19.4026 0 24.999 5.59642 24.999 12.5H24.9997Z" fill="#BBC0CE" />
                    <path d="M14.2392 10.0355V12.7585H17.6079L17.0745 16.4273H14.2392V24.8791C13.6706 24.9583 13.089 24.9994 12.4988 24.9994C11.8171 24.9994 11.1484 24.9446 10.4963 24.8396V16.4273H7.38965V12.7585H10.4963V9.42726C10.4963 7.36 12.172 5.68359 14.24 5.68359V5.68575C14.2457 5.68575 14.2515 5.68359 14.2572 5.68359H17.6086V8.85574H15.419C14.7676 8.85574 14.24 9.38335 14.24 10.0348L14.2392 10.0355Z" fill="white" />
                </svg>

                }
                {userInfo?.user.x ? <a target="_blank" href={`https://www.facebook.com/${userInfo?.user.x}`}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_250_40254)">
                            <circle cx="12.499" cy="12.5" r="12.5" fill="white" />
                            <path d="M7.14648 6.41406L16.3923 18.5026H17.809L8.66836 6.41406H7.14648Z" fill="#1D1E21" />
                            <path d="M12.499 0C5.5959 0 -0.000976562 5.59687 -0.000976562 12.5C-0.000976562 19.4031 5.5959 25 12.499 25C19.4021 25 24.999 19.4031 24.999 12.5C24.999 5.59687 19.4021 0 12.499 0ZM15.6896 20.0333L11.6584 14.7677L7.05215 20.0333H4.49173L10.4636 13.2062L4.16569 4.96667H9.43861L13.0782 9.78021L17.2896 4.96667H19.8469L14.2626 11.3479L20.8324 20.0323L15.6896 20.0333Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_250_40254">
                                <rect width="25" height="25" fill="white" transform="translate(-0.000976562)" />
                            </clipPath>
                        </defs>
                    </svg>
                </a> : <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_251_40304)">
                        <circle cx="12.499" cy="12.5" r="12.5" fill="white" />
                        <path d="M7.14648 6.41406L16.3923 18.5026H17.809L8.66836 6.41406H7.14648Z" fill="#BBC0CE" />
                        <path d="M12.499 0C5.5959 0 -0.000976562 5.59687 -0.000976562 12.5C-0.000976562 19.4031 5.5959 25 12.499 25C19.4021 25 24.999 19.4031 24.999 12.5C24.999 5.59687 19.4021 0 12.499 0ZM15.6896 20.0333L11.6584 14.7677L7.05215 20.0333H4.49173L10.4636 13.2062L4.16569 4.96667H9.43861L13.0782 9.78021L17.2896 4.96667H19.8469L14.2626 11.3479L20.8324 20.0323L15.6896 20.0333Z" fill="#BBC0CE" />
                    </g>
                    <defs>
                        <clipPath id="clip0_251_40304">
                            <rect width="25" height="25" fill="white" transform="translate(-0.000976562)" />
                        </clipPath>
                    </defs>
                </svg>
                }
            </div >

            {/* social icons */}
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



export default Scout