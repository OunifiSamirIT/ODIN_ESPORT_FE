import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Terrain from "../../../components/Terrain";
import { useParams } from "react-router-dom";
import Placeholder from "../../../assets/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { Config } from "../../../config";
import { paysAllInfo } from "../../../assets/data/Country";
import Modal from "react-modal";
import { Context } from "../../../index";
import Social from "../components/social";
import VerifyBadge from "../../../assets/badgeVerify.svg";
import secureLocalStorage from "react-secure-storage";

const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

const PlayerCard = ({ userInfo, sendNotification, premuim }) => {
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const { id } = useParams();
  const isOwner = storedUserData.id == id;
  const navigate = useNavigate();
  if (!userInfo) {
    navigate("/404");
  }
  const [acceptedFriend, setAcceptedFriend] = useState(false);
  // const [invitationSend, setInvitationSend] = useState(false);
  // const [Invitation, setInvitation] = useState([]);
  
  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const tokenn = storedUserData?.token;

  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
  const getWhatsappPrefix = (string) => {
    return string.split(",")[0].substring(1);
  };
  const isFriendAccepted = async () => {
    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/checkFriends/${storedUserDatad.id}`,{
        headers :{
          Authorization: `Bearer ${tokenn}`,
        }
      }
    );
    const result = await response.json();
    setAcceptedFriend(result.exists);
  };
  const sendFriendRequest = async () => {
    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserDatad.id}`,
      {
        method: "POST",
        headers :{
          "Authorization": `Bearer ${tokenn}`,
        }
      }
    );
    isFriendAccepted();
    const result = await response.json();
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  // Styles pour la modale
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent", // Fond transparent
      border: "none", // Supprimer les bordures
      // borderRadius: '50%', // Modal circulaire
      padding: 0, // Pas de padding
      width: "80vw", // Largeur relative de la fenêtre
      height: "80vw", // Hauteur relative de la fenêtre
      maxWidth: "400px", // Limite la largeur maximale
      maxHeight: "400px", // Limite la hauteur maximale
      overflow: "hidden", // Cacher tout contenu dépassant
      animation: "fadeIn 0.3s ease-out", // Animation d'apparition
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

  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo.find((country) => country.name == countryName);
    return country.iso["alpha-2"].toLowerCase();
  };

  const copyLinkToClipboard = (articleId) => {
    // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
    const number = userInfo.user.numWSup;
    // Copy the URL to the clipboard
    if (acceptedFriend?.status === "accepted") {
      navigator.clipboard
        .writeText(number)
        .then(() => {
          console.log("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy link to clipboard", err);
        });
    } else {
      console.log("add as friend to copy number");
    }
  };
  useEffect(() => {
    isFriendAccepted();
  }, [id]);

  return (
    <>
      <div className="flex gap-y-4 flex-col items-center md:px-[30px] max-sm:px-2 py-6 bg-white rounded-[10px] ">
      {userInfo?.user.profil === 'player' && userInfo?.user.isPremuim ? <a href={`/professionalprofile/${id}`} className="md:hidden w-full flex cursor-pointer gap-2 text-white items-center justify-center px-2 py-2 bg-[linear-gradient(180deg,#3C8AF5_0.06%,#2E71EB_24.43%,#1E56D7_75.66%,#1F46AE_99.53%)] rounded-[10px] mb-2">
                                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="13.5" cy="13" r="13" fill="white" />
                                        <path d="M14.2704 15.6002H12.7299C12.3867 15.6007 12.0522 15.4923 11.7746 15.2906C11.4969 15.0889 11.2904 14.8042 11.1849 14.4776L10.7091 13.0132C10.6016 12.6865 10.6008 12.334 10.7069 12.0068C10.813 11.6796 11.0205 11.3946 11.2993 11.1932L12.5447 10.291C12.8219 10.0886 13.1563 9.97948 13.4995 9.97948C13.8428 9.97948 14.1772 10.0886 14.4544 10.291L15.7004 11.1958C15.9793 11.3972 16.1869 11.6821 16.293 12.0093C16.3991 12.3366 16.3983 12.6891 16.2906 13.0158L15.8155 14.4802C15.709 14.806 15.5022 15.0897 15.2247 15.2909C14.9472 15.492 14.6132 15.6003 14.2704 15.6002ZM21.3002 13.0002C21.3002 14.5429 20.8427 16.0509 19.9857 17.3336C19.1286 18.6163 17.9104 19.6161 16.4851 20.2065C15.0599 20.7968 13.4915 20.9513 11.9785 20.6503C10.4654 20.3494 9.07561 19.6065 7.98477 18.5156C6.89392 17.4248 6.15104 16.035 5.85007 14.5219C5.54911 13.0088 5.70357 11.4405 6.29394 10.0153C6.8843 8.59 7.88405 7.37181 9.16675 6.51473C10.4495 5.65766 11.9575 5.2002 13.5002 5.2002C15.5682 5.20243 17.5509 6.02493 19.0132 7.48723C20.4755 8.94953 21.298 10.9322 21.3002 13.0002ZM13.5002 18.8502C13.8368 18.8482 14.1725 18.8174 14.5038 18.7579L15.055 16.9502C15.1801 16.5575 15.4267 16.2146 15.7594 15.9711C16.092 15.7277 16.4933 15.5962 16.9055 15.5956L18.7366 15.5924C19.0314 15.0009 19.2228 14.3634 19.3027 13.7074L17.8415 12.7324C17.5043 12.4957 17.251 12.1581 17.118 11.7681C16.9851 11.3782 16.9794 10.9561 17.1018 10.5627L17.6563 8.89024C17.1915 8.42292 16.6514 8.03707 16.0586 7.74885L14.6468 8.72774C14.3138 8.97065 13.9123 9.10154 13.5002 9.10154C13.0881 9.10154 12.6866 8.97065 12.3536 8.72774L10.9795 7.72935C10.3958 8.00821 9.86207 8.38156 9.4 8.83434L9.89855 10.5614C10.021 10.9548 10.0153 11.3769 9.88235 11.7668C9.7494 12.1568 9.49606 12.4944 9.15885 12.7311L7.70675 13.7678C7.79025 14.4026 7.97849 15.0192 8.2638 15.5924L10.0942 15.5956C10.5064 15.596 10.9079 15.7273 11.2406 15.9707C11.5734 16.2141 11.8202 16.5568 11.9454 16.9496L12.5076 18.7592C12.8353 18.8179 13.1674 18.8484 13.5002 18.8502Z" fill="#2E71EB" />
                                    </svg>
                                    Professional Profile
                                </a> : null}
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <div className="flex items-center md:w-fit w-full justify-center  md:mx-[0px] ">
            <div className="shrink-0">
              {/* Bouton/image cliquable */}
              <a
                href="#"
                className="relative"
                onClick={() =>
                  openModal(
                    userInfo?.user.image ? userInfo?.user.image : Placeholder
                  )
                }
              >
                <img
                  alt="profile"
                  loading="lazy"
                  srcSet={
                    userInfo?.user.image ? userInfo?.user.image : Placeholder
                  }
                  className="max-w-full object-cover rounded-full aspect-square w-[100px] md:w-[120px]"
                />
                {userInfo?.user.profil === "player" &&
                  userInfo?.user.isPremuim && (
                    <img
                      className="absolute right-0 bottom-1 w-[30px] h-[30px] md:w-[40px] md:h-[40px] "
                      src={VerifyBadge}
                      alt="verification Badge"
                    />
                  )}
              </a>

              {/* Modale d'agrandissement de l'image */}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                style={modalStyle} // Styles personnalisés pour la modale
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <img
                    alt="profile"
                    loading="lazy"
                    srcSet={imageSrc ? imageSrc : Placeholder}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }} // Remplir tout l'espace disponible
                  />
                </div>
              </Modal>
            </div>
            {/* <img
              alt="profile"
              loading="lazy"
              srcSet={userInfo.user.image ? userInfo?.user.image : Placeholder}
              className="max-w-full rounded-full aspect-square w-[100px] md:w-[120px]"
            /> */}
            <div className="flex-col items-center  max-w-full pl-[16px] h-full md:pt-[5px]">
              <div className="text-xl font-bold text-zinc-900 flex gap-2 flex-wrap whitespace-normal">
                <p className="">
                  {userInfo?.user.nom} {userInfo?.user.prenom}
                </p>
              </div>

              <div className="text-base font-medium text-blue-600">
                {getTranslation(
                  `Player`, // -----> Englais
                  `Joueur` //  -----> Francais
                  //   ``,  //  -----> Turkey
                  //   `` ,  //  -----> Allemagne
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full md:w-fit w-full">
            <div className="flex md:justify-end md:pt-[5px]">
              {isOwner ? (
                <div className="w-full md:w-[157px] flex gap-2 justify-center self-start px-8 py-2 text-base font-medium text-white  bg-blue-600 rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                    className="shrink-0 my-auto aspect-square w-[15px]"
                  />
                  <Link to={"/setting/personal"} className="flex items-center">
                    <p>
                      {getTranslation(
                        `Edit`, // -----> Englais
                        `Modifier` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}
                    </p>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 md:w-fit w-full">
                    <div
                      className={`w-full max-sm:w-full items-center flex gap-2  justify-center px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]`}
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_61_30243)">
                          <path
                            d="M7.16569 10C9.92319 10 12.1657 7.7575 12.1657 5C12.1657 2.2425 9.92319 0 7.16569 0C4.40819 0 2.16569 2.2425 2.16569 5C2.16569 7.7575 4.40819 10 7.16569 10ZM9.66569 11.6667H4.66569C2.36819 11.6667 0.499023 13.5358 0.499023 15.8333V20H13.8324V15.8333C13.8324 13.5358 11.9632 11.6667 9.66569 11.6667ZM20.4632 7.9L16.3582 12.005C16.0282 12.3342 15.5957 12.4992 15.1632 12.4992C14.7307 12.4992 14.2982 12.3342 13.969 12.0058L11.5765 9.61333L12.7549 8.435L15.1465 10.8275L19.284 6.7225L20.4624 7.90083L20.4632 7.9Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_61_30243">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(0.499023)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      {acceptedFriend ? (
                        <div className="text-nowrap">
                          {acceptedFriend?.status == "pending"
                            ? "En Atente"
                            : "ami(e)"}
                        </div>
                      ) : (
                        <button
                          className="flex items-center "
                          onClick={() => {
                            sendNotification(id);
                            sendFriendRequest();
                          }}
                        >
                          <p>
                            {getTranslation(
                              `Add`, // -----> Englais
                              `Ajouter` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}{" "}
                          </p>
                        </button>
                      )}
                    </div>
                    {acceptedFriend?.status === "accepted" ? (
                      <div>
                        <a
                          href={`https://wa.me/${getWhatsappPrefix(
                            userInfo.user.optionalattributs
                          )}${userInfo.user.numWSup}`}
                          target="_blank"
                        >
                          <svg
                            className="fill-white"
                            width="37"
                            height="36"
                            viewBox="0 0 37 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-green-500"
                                  : "fill-gray-500"
                              }
                              d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z"
                              fill="#65676B"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z"
                              fill="#D0D0D0"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z"
                              fill="#D0D0D0"
                            />
                          </svg>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => {}}>
                          <svg
                            className="fill-white"
                            width="37"
                            height="36"
                            viewBox="0 0 37 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-green-500"
                                  : "fill-gray-500"
                              }
                              d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z"
                              fill="#65676B"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z"
                              fill="#D0D0D0"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z"
                              fill="#D0D0D0"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="pl-[16px] md:pl-[0px] grid grid-cols-2   md:gap-x-2 max-md:gap-x-4 md:ml-[100px] max:lg-[150px] md:-mt-8 flex justify-center md:justify-between text-sm flex-wrap md:flex-nowrap">
          <div className="flex gap-2 justify-left items-center py-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ad5d0e7c1cc757b7d699a58b21f17f4dfeb3117bc9f1e3f4d361257cb7cc63?"
              className="self-stretch w-5 aspect-[1.3]"
            />
            <div className="my-auto">
              {getTranslation(
                `License :`, // -----> Englais
                `Licence :` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </div>

            {userInfo.player?.Licence ? "✔️" : "❌"}
          </div>
          <div className="flex gap-2 justify-center p-2 ">
            <span
              className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                userInfo.user.countryresidence
              )}`}
              style={{ marginRight: "8px", width: "25px" }}
            ></span>
            {}
            <div className="grow self-start mt-1">
              {userInfo.user.countryresidence}
            </div>
          </div>

          <div className="md:ml-0 flex col-span-2 md:col-span-2  gap-2 justify-center py-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d609bf65a79e970c6866ad932e5fdd62a603a912852f0024386dcf0730b04895?"
              className="w-5 aspect-square"
            />
            <div className="grow self-start mt-1">
              {userInfo?.player?.champsoptionelle}
            </div>
          </div>
        </div>

        {userInfo?.user.discreptionBio && (
          <div className="self-stretch text-break font-light text-center text-neutral-900 max-md:max-w-full">
            <div className="flex justify-center  mt-2">
              <svg
                width="366"
                height="1"
                viewBox="0 0 366 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="0.5"
                  x2="365.5"
                  y2="0.499968"
                  stroke="#D9E6F7"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="py-4 text-break">
              {userInfo?.user.discreptionBio}
            </div>
            <div className="flex justify-center mt-2">
              <svg
                width="366"
                height="1"
                viewBox="0 0 366 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="0.5"
                  x2="365.5"
                  y2="0.499968"
                  stroke="#D9E6F7"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        )}

        <span className="md:block hidden">
          <div className="flex flex-col justify-center gap-y-4">
            <div className="flex justify-center gap-1 px-4  text-lg  text-zinc-900">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_878_80013)">
                  <path
                    d="M20.1242 17.1658C20.1242 19.0042 18.6292 20.4992 16.7909 20.4992H6.66925L8.37341 18.8325H16.7917C17.7109 18.8325 18.4584 18.085 18.4584 17.1658C18.4584 16.2467 17.7109 15.4992 16.7917 15.4992H12.6251C10.7867 15.4992 9.29175 14.0042 9.29175 12.1658C9.29175 10.56 10.4334 9.21667 11.9476 8.9025L13.5801 10.4992H12.6251C11.7059 10.4992 10.9584 11.2467 10.9584 12.1658C10.9584 13.085 11.7059 13.8325 12.6251 13.8325H16.7917C18.6301 13.8325 20.1242 15.3275 20.1242 17.1658ZM18.9034 7.6125L15.9576 10.4942L13.0176 7.61917C11.3867 5.9875 11.3867 3.345 13.0109 1.72C13.7984 0.933333 14.8451 0.5 15.9576 0.5C17.0701 0.5 18.1167 0.933333 18.9034 1.72C20.5284 3.345 20.5284 5.98833 18.9034 7.6125ZM7.23675 11.72C8.86175 13.345 8.86175 15.9883 7.23675 17.6125L4.29091 20.4942L1.35091 17.6192C-0.279921 15.9875 -0.279921 13.345 1.34425 11.72C2.13175 10.9333 3.17841 10.5 4.29091 10.5C5.40341 10.5 6.45008 10.9333 7.23675 11.72Z"
                    fill="#1D1E21"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_878_80013">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.125 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <div className="">Positions</div>
            </div>
            <Terrain
              positionPlay={userInfo?.player?.positionPlay}
              positionSecond={userInfo?.player?.positionSecond}
            />
          </div>
          <div className=" px-4  hidden   items-center justify-center text-center my-2 text-lg  text-zinc-900">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
              className="shrink-0 self-center w-5 aspect-square"
            />
            <div className="grow">Compétences </div>
            <div className="grow">
              {getTranslation(
                `Skills`, // -----> Englais
                ` Compétences` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}{" "}
            </div>
          </div>
          <div className="flex gap-2  hidden  justify-center text-base font-semibold text-blue-600  flex-wrap">
            {userInfo?.player?.skillsInProfile
              .split(",")
              .filter((item) => item.trim() !== "")
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" text-center justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]"
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        </span>

        <Social userInfo={userInfo} />

        {/* social icons */}

        <div
          div
          className="flex justify-center items-center px-16 py-2  max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5 mr-15"
        >
          <div className="flex  gap-2 items-center ">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2fbc01810223be1770f84ab0be35b3b52448631192553972949fcfd687661f3?"
              className="shrink-0 w-4 aspect-[0.94]"
            />
            <a href={`/profile/more/${id}`}>
              {getTranslation(
                `See more`, // -----> Englais
                ` Voir Plus` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
