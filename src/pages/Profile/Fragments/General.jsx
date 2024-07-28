import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Terrain from "../../../components/Terrain";
import { useParams } from "react-router-dom";
import Placeholder from "../../../assets/placeholder.jpg";
import { Config } from "../../../config";
import { paysAllInfo } from "../../../assets/data/Country";
import Modal from "react-modal";
import { Context } from "../../../index";
import Social from "../components/social";

const General = ({ userInfo, sendNotification }) => {
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const isOwner = storedUserData.id == id;

  const [acceptedFriend, setAcceptedFriend] = useState(false);
  // const [invitationSend, setInvitationSend] = useState(false);
  // const [Invitation, setInvitation] = useState([]);
  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
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

  const isFriendAccepted = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/checkFriends/${storedUserData.id}`
    );
    const result = await response.json();
    setAcceptedFriend(result.exists);
  };
  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo.find((country) => country.name == countryName);
    return country ? country.iso["alpha-2"].toLowerCase() : null;
  };

  const sendFriendRequest = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserData.id}`,
      {
        method: "POST",
      }
    );
    isFriendAccepted();

    const result = await response.json();
  };
  const getWhatsappPrefix = (string) => {
    return string.split(",")[0].substring(1);
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
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px]">
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <div className="flex items-center md:w-fit w-full justify-center  md:mx-[0px] ">
            <div>
              {/* Bouton/image cliquable */}
              <a
                href="#"
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
            <div className="flex-col items-center pl-[16px]  max-w-full h-full md:pt-[5px]">
              <div className="text-xl font-bold text-zinc-900 flex gap-2 flex-wrap whitespace-normal">
                <p className="">
                  {userInfo?.user.nom} {userInfo?.user.prenom}
                </p>
              </div>
              <div className="text-base font-medium text-blue-600">
                {userInfo.agent && (
                  <p>
                    {userInfo.agent.typeresponsable === "players"
                      ? "Manager de Joueurs"
                      : "Manager de Club"}
                  </p>
                )}
                {userInfo.other && <p>{userInfo.other.profession}</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full md:w-fit w-full">
            <div className="flex md:justify-end md:pt-[5px]">
              {isOwner ? (
                <div className="w-full md:w-[157px] flex gap-2 justify-center self-start px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                    className="shrink-0 my-auto aspect-square w-[15px]"
                  />
                  <Link to={"/setting/personal"} className="flex items-center">
                    <p>
                      {" "}
                      {getTranslation(
                        `Edit`, // -----> Englais
                        `Modifier` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "}
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
                        <div className="">
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
        <div className=" grid grid-cols-2 lg:w-9/12  md:gap-x-2 md:ml-[125px] md:-mt-16 flex justify-center md:justify-between text-sm flex-wrap md:flex-nowrap">
          <div className="self-end flex gap-2 justify-left py-2 ">
            <span
              className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                userInfo.user.countryresidence
              )}`}
              style={{
                marginRight: "8px",
                width: "25px",
              }}
            ></span>
            {}
            <div className="">{userInfo.user.countryresidence}</div>
          </div>
          <div className="self-end h-full items-center flex gap-2 justify-left p-2 ">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z"
                fill="#1D1E21"
              />
            </svg>
            {}
            <div className="self-stretch my-auto">
              {userInfo.user.gender == "male" ? "Homme" : "Femme"}
            </div>
          </div>
          <div className="flex gap-2 justify-left items-center self-stretch py-2">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_87_12064)">
                <path
                  d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z"
                  fill="#1D1E21"
                />
                <path
                  d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z"
                  fill="#1D1E21"
                />
              </g>
              <defs>
                <clipPath id="clip0_87_12064">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.112793 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="self-stretch my-auto">
              {userInfo.user.date_naissance}
            </div>
          </div>
          <div className="flex gap-2 justify-left flex-row items-center self-stretch py-2">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_87_12069)">
                <path
                  d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_87_12069">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.168945 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="">
              {userInfo.user.countryresidence}{" "}
              {userInfo?.user?.cityresidence
                ? `,${userInfo?.user?.cityresidence}`
                : ""}
            </div>
          </div>
          {userInfo.agent?.typeresponsable == "player" && (
            <div className="flex gap-2 justify-center p-2 whitespace-normal">
              {" "}
              <>
                <div className="flex gap-2 justify-center items-center self-stretch py-2">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_121_29079)">
                      <mask
                        id="mask0_121_29079"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="21"
                      >
                        <path d="M20 0.5H0V20.5H20V0.5Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_121_29079)">
                        <path
                          d="M10.9875 13.8333H9.0125C8.5725 13.834 8.14363 13.695 7.78766 13.4364C7.43169 13.1778 7.16699 12.8128 7.03167 12.3942L6.42167 10.5167C6.28382 10.0978 6.28284 9.64589 6.41887 9.2264C6.55491 8.80692 6.82089 8.44161 7.17834 8.18333L8.775 7.02667C9.13041 6.76715 9.5591 6.62729 9.99917 6.62729C10.4392 6.62729 10.8679 6.76715 11.2233 7.02667L12.8208 8.18667C13.1784 8.44485 13.4444 8.81016 13.5805 9.22968C13.7165 9.64919 13.7155 10.1011 13.5775 10.52L12.9683 12.3975C12.8318 12.8151 12.5666 13.1789 12.2109 13.4368C11.8551 13.6947 11.4269 13.8335 10.9875 13.8333ZM20 10.5C20 12.4778 19.4135 14.4112 18.3147 16.0557C17.2159 17.7002 15.6541 18.9819 13.8268 19.7388C11.9996 20.4957 9.98891 20.6937 8.0491 20.3079C6.10929 19.922 4.32746 18.9696 2.92894 17.5711C1.53041 16.1725 0.578004 14.3907 0.192152 12.4509C-0.193701 10.5111 0.00433302 8.50043 0.761209 6.67317C1.51809 4.8459 2.79981 3.28412 4.4443 2.1853C6.08879 1.08649 8.02219 0.5 10 0.5C12.6513 0.502868 15.1932 1.55736 17.0679 3.4321C18.9426 5.30684 19.9971 7.84872 20 10.5ZM10 18C10.4315 17.9975 10.862 17.9579 11.2867 17.8817L11.9933 15.5642C12.1537 15.0606 12.4699 14.6211 12.8964 14.3089C13.3228 13.9968 13.8374 13.8282 14.3658 13.8275L16.7133 13.8233C17.0913 13.065 17.3367 12.2477 17.4392 11.4067L15.5658 10.1567C15.1335 9.85323 14.8087 9.42034 14.6383 8.92041C14.4678 8.42047 14.4606 7.87933 14.6175 7.375L15.3283 5.23083C14.7324 4.63169 14.04 4.13702 13.28 3.7675L11.47 5.0225C11.0431 5.33392 10.5284 5.50173 10 5.50173C9.47161 5.50173 8.95687 5.33392 8.53 5.0225L6.76834 3.7425C6.01995 4.10002 5.33574 4.57868 4.74334 5.15917L5.3825 7.37333C5.53944 7.87767 5.53217 8.41881 5.36173 8.91874C5.19129 9.41867 4.8665 9.85156 4.43417 10.155L2.5725 11.4842C2.67956 12.298 2.92089 13.0885 3.28667 13.8233L5.63334 13.8275C6.16184 13.828 6.67653 13.9963 7.10311 14.3083C7.5297 14.6203 7.84611 15.0598 8.00667 15.5633L8.7275 17.8833C9.14754 17.9586 9.57328 17.9977 10 18Z"
                          fill="#1D1E21"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_121_29079">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="grow self-start mt-1">
                    {userInfo.agent.totalPlayer}{" "}
                    {getTranslation(
                      `Players`, // -----> Englais
                      `Joueurs` //  -----> Francais
                      //   ``,  //  -----> Turkey
                      //   `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <div className="grow self-start mt-1">
                    {userInfo.agent.totalPlayer}
                    {getTranslation(
                      `Players`, // -----> Englais
                      `Joueurs` //  -----> Francais
                      //   ``,  //  -----> Turkey
                      //   `` ,  //  -----> Allemagne
                    )}{" "}
                  </div>
                </div>
              </>
            </div>
          )}
          {userInfo.agent && userInfo.agent.typeresponsable === "club" ? (
            <div className="flex gap-2 justify-left flex-row items-center self-stretch py-2">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_878_79171)">
                  <mask
                    id="mask0_878_79171"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="21"
                    height="20"
                  >
                    <path d="M20.5 0H0.5V20H20.5V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_878_79171)">
                    <path
                      d="M11.4875 13.3333H9.5125C9.0725 13.334 8.64363 13.195 8.28766 12.9364C7.93169 12.6778 7.66699 12.3128 7.53167 11.8942L6.92167 10.0167C6.78382 9.59778 6.78284 9.14589 6.91887 8.7264C7.05491 8.30692 7.32089 7.94161 7.67834 7.68333L9.275 6.52667C9.63041 6.26715 10.0591 6.12729 10.4992 6.12729C10.9392 6.12729 11.3679 6.26715 11.7233 6.52667L13.3208 7.68667C13.6784 7.94485 13.9444 8.31016 14.0805 8.72968C14.2165 9.14919 14.2155 9.60112 14.0775 10.02L13.4683 11.8975C13.3318 12.3151 13.0666 12.6789 12.7109 12.9368C12.3551 13.1947 11.9269 13.3335 11.4875 13.3333ZM20.5 10C20.5 11.9778 19.9135 13.9112 18.8147 15.5557C17.7159 17.2002 16.1541 18.4819 14.3268 19.2388C12.4996 19.9957 10.4889 20.1937 8.5491 19.8079C6.60929 19.422 4.82746 18.4696 3.42894 17.0711C2.03041 15.6725 1.078 13.8907 0.692152 11.9509C0.306299 10.0111 0.504333 8.00043 1.26121 6.17317C2.01809 4.3459 3.29981 2.78412 4.9443 1.6853C6.58879 0.58649 8.52219 0 10.5 0C13.1513 0.00286757 15.6932 1.05736 17.5679 2.9321C19.4426 4.80684 20.4971 7.34872 20.5 10ZM10.5 17.5C10.9315 17.4975 11.362 17.4579 11.7867 17.3817L12.4933 15.0642C12.6537 14.5606 12.9699 14.1211 13.3964 13.8089C13.8228 13.4968 14.3374 13.3282 14.8658 13.3275L17.2133 13.3233C17.5913 12.565 17.8367 11.7477 17.9392 10.9067L16.0658 9.65667C15.6335 9.35323 15.3087 8.92034 15.1383 8.42041C14.9678 7.92047 14.9606 7.37933 15.1175 6.875L15.8283 4.73083C15.2324 4.13169 14.54 3.63702 13.78 3.2675L11.97 4.5225C11.5431 4.83392 11.0284 5.00173 10.5 5.00173C9.97161 5.00173 9.45687 4.83392 9.03 4.5225L7.26834 3.2425C6.51995 3.60002 5.83574 4.07868 5.24334 4.65917L5.8825 6.87333C6.03944 7.37767 6.03217 7.91881 5.86173 8.41874C5.69129 8.91867 5.3665 9.35156 4.93417 9.655L3.0725 10.9842C3.17956 11.798 3.42089 12.5885 3.78667 13.3233L6.13334 13.3275C6.66184 13.328 7.17653 13.4963 7.60311 13.8083C8.0297 14.1203 8.34611 14.5598 8.50667 15.0633L9.2275 17.3833C9.64754 17.4586 10.0733 17.4977 10.5 17.5Z"
                      fill="#1D1E21"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_878_79171">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>

              {}
              <div className="grow mt-1">{userInfo.agent?.clubCovered}</div>
            </div>
          ) : (
            ""
          )}
          {userInfo.agent && userInfo.agent.typeresponsable === "club" ? (
            <div className="self-end flex gap-2 justify-center p-2 h-full">
              <span
                className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                  userInfo.agent?.paysclub
                )}`}
                style={{ marginRight: "8px", width: "25px" }}
              ></span>
              {}
              <div className="grow self-start mt-1">
                {userInfo.agent?.paysclub} (
                {getTranslation(
                  `Club's Country`, // -----> Englais
                  `Pays du club` //  -----> Francais
                  //   ``,  //  -----> Turkey
                  //   `` ,  //  -----> Allemagne
                )}
                )
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {userInfo.user.discreptionBio && (
          <div className="self-stretch text-break font-light text-center text-neutral-900 max-md:max-w-full">
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
            <div className="py-4">{userInfo?.user.discreptionBio}</div>
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

        {/* hidden Compétences serction */}
        {/* <div className="flex items-center gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
          <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.89051 13.4889C2.01163 12.6771 1.34125 11.6655 0.936109 10.5397C0.53097 9.41394 0.402993 8.20713 0.56301 7.02143C0.721232 5.81915 1.16862 4.67316 1.86683 3.68169C2.56505 2.69022 3.49326 1.88283 4.57191 1.32874C5.65056 0.774639 6.84748 0.490355 8.06009 0.50025C9.2727 0.510144 10.4648 0.813923 11.5343 1.38555C12.6038 1.95717 13.5187 2.7796 14.2006 3.78233C14.8825 4.78506 15.3112 5.9382 15.4498 7.1429C15.5883 8.3476 15.4327 9.56794 14.9963 10.6993C14.5599 11.8307 13.8556 12.8394 12.9438 13.6389C12.3567 14.1437 11.9009 14.7834 11.6155 15.5031H8.83384V9.51643C9.3196 9.34469 9.74043 9.02707 10.0388 8.60701C10.3371 8.18695 10.4984 7.68498 10.5005 7.16976C10.5005 6.94875 10.4127 6.73678 10.2564 6.5805C10.1002 6.42422 9.88819 6.33643 9.66718 6.33643C9.44616 6.33643 9.2342 6.42422 9.07792 6.5805C8.92164 6.73678 8.83384 6.94875 8.83384 7.16976C8.83384 7.39077 8.74605 7.60274 8.58977 7.75902C8.43349 7.9153 8.22152 8.00309 8.00051 8.00309C7.7795 8.00309 7.56753 7.9153 7.41125 7.75902C7.25497 7.60274 7.16718 7.39077 7.16718 7.16976C7.16718 6.94875 7.07938 6.73678 6.9231 6.5805C6.76682 6.42422 6.55486 6.33643 6.33384 6.33643C6.11283 6.33643 5.90087 6.42422 5.74459 6.5805C5.58831 6.73678 5.50051 6.94875 5.50051 7.16976C5.50265 7.68498 5.66391 8.18695 5.96225 8.60701C6.26059 9.02707 6.68142 9.34469 7.16718 9.51643V15.5031H4.30301C3.98442 14.7369 3.50236 14.0495 2.89051 13.4889ZM4.66718 17.1698V17.4281C4.66806 18.2434 4.99231 19.025 5.5688 19.6015C6.14528 20.178 6.92691 20.5022 7.74218 20.5031H8.25884C9.07411 20.5022 9.85574 20.178 10.4322 19.6015C11.0087 19.025 11.333 18.2434 11.3338 17.4281V17.1698H4.66718Z" fill="#1D1E21" />
          </svg>

          <div className="grow">Compétences</div>
        </div>
        <div className="flex gap-2  justify-center mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
          {userInfo?.user.profil === 'agent' &&
            userInfo?.agent?.skillsagent.split(',').filter(item => item.trim()).map((item) => {
              return (<div className="text-center justify-center max-sm:px-1 md:px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                {item}
              </div>)
            })}
          {userInfo?.user.profil === 'other' &&
            userInfo?.other?.skillsAutre.split(',').filter(item => item.trim()).map((item) => {
              return (<div className="text-center justify-center px-2 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                {item}
              </div>)
            })}

        </div> */}
        {/* 
         hidden dynamic social media icons */}
        {/* <div className="flex gap-5 justify-between">
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
        </div> */}
        {/* social icons */}

        <Social userInfo={userInfo} />

        {/* social icons */}
        <div className="flex justify-center items-center px-16 py-2 mt-2 max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
          <div className="flex gap-4 items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2fbc01810223be1770f84ab0be35b3b52448631192553972949fcfd687661f3?"
              className="shrink-0 self-start w-4 aspect-[0.94]"
            />
            <a href={`/profile/more/${id}`}>
              {" "}
              {getTranslation(
                `See more`, // -----> Englais
                ` Voir Plus` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
