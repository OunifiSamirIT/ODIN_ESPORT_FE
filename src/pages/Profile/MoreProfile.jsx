import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import Terrain from "../../components/Terrain";
import SlideMenu from "../../components/SlideMenu";
import Logo from "../../assets/ODIN22.png";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import ProfileLayout from "../../Layout/ProfileLayout";
import Player from "./Fragments/Player"
import General from "./Fragments/General"
import Entraineur from "./Fragments/Entraineur"
import HomeLayout from "../../Layout/HomeLayout";
import Placeholder from "../../assets/placeholder.jpg"
import T343 from "../../assets/3-4-3.png"
import T4231 from "../../assets/4-2-3-1.png"
import T433 from "../../assets/4-3-3.png"
import T442 from "../../assets/4-4-2.png"
import T532 from "../../assets/5-3-2.png"
import T541 from "../../assets/5-4-1.png"
import { Config } from "../../config";
import { paysAllInfo } from "../../assets/data/Country";
const More = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null)
  const [agent, setAgent] = useState(null)
  const [user, setUser] = useState([])
  const [skills, setSkills] = useState([])
  const [showInvitation, setShowInvitation] = useState()
  const [isActive, setIsActive] = useState()
  const [owner, setOwner] = useState(false)
  const [acceptedFriend, setAcceptedFriend] = useState(false)
  const [invitationSend, setInvitationSend] = useState(false);
  const [Invitation, setInvitation] = useState([]);
  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(null)
  const LocalStorageID = JSON.parse(localStorage.getItem("user"));
  const [profileFeed, SetProfileFeed] = useState('pubs')
  // const user = JSON.parse(localStorage.getItem("user"));
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const isOwner = storedUserData.id == id
  const sendFriendRequest = async () => {

    const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserData.id}`, {
      method: "POST",
    });

    const result = await response.json();
    console.log('friend request sent')
  }
  const copyLinkToClipboard = (articleId) => {
    // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
    const articleUrl = `${Config.LOCAL_URL}/articles/${articleId}`;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(articleUrl)
      .then(() => {
        console.log('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy link to clipboard', err);
      });
  };


  const navigate = useNavigate()
  const fetchUser = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`);
    const result = await response.json();
    console.log('sdfsdf', result)
    if (result.message) { navigate('/404') } else {
      setCurrentUser(result)
    }
  }
  useEffect(() => {
    // isFriendAccepted()
    try {
      fetchUser()
    } catch (e) {
      console.log(e)
    }
  }, [user])
  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo.find(country => country?.name == countryName);
    return country ? country.iso["alpha-2"].toLowerCase() : null;
  }



  return (
    <>
      <HomeLayout>
        <div className="flex flex-col mt-[120px] px-2">
          <div className="md:self-end items-end flex gap-2 justify-center md:w-[224px] text-center py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5 w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac20d9bf5dc01e69f2a6e82df157e82794a74dd3d3c80d0437777183828a95ba?"
              className="my-auto aspect-square w-[15px]"
            />
            <Link to={`/profile/${id}`} className="hover:text-orange-300">Revenir au Profil</Link>
          </div>
          {CurrentUser?.user.profil === 'player' && <div className="flex mt-8 gap-y-8 flex-col items-center px-4 py-6 bg-white rounded-[10px] jusitfy-center ">
            <div className="flex justify-center ">
              <div className="max-w-[1110px] flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                <div className="flex flex-col  max-md:ml-0 ">
                  <img
                    loading="lazy"
                    srcSet={CurrentUser?.user.image ? CurrentUser?.user.image : Placeholder}
                    className="max-w-full rounded-full aspect-square w-[227px] max-md:mt-4"
                  />
                </div>
                <div className="max-w-[865px] flex flex-col items-center justify-between gap-y-4">
                  <div className="flex flex-col w-full ">
                    <div className="flex gap-2 md:justify-between justify-center w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col justify-between max-sm:text-center">
                        <div className="text-xl font-bold text-zinc-900">
                          {CurrentUser?.user.nom}  {CurrentUser?.user.prenom}
                        </div>
                        <div className="text-base font-medium text-blue-600">
                          {CurrentUser?.user.profil}
                        </div>
                      </div>
                      {isOwner ?
                        <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                            className="shrink-0 my-auto aspect-square w-[15px]"
                          />
                          <Link to={'/setting/personal'} className="flex items-center"><p>Modifier</p></Link>
                        </div> :
                        <>
                          <div className="flex items-center gap-3">
                            <div className={`max-sm:w-full items-center flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]`}>
                              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_17_12)">
                                  <path d="M7.99805 10C10.7595 10 12.998 7.76142 12.998 5C12.998 2.23858 10.7595 0 7.99805 0C5.23662 0 2.99805 2.23858 2.99805 5C2.99805 7.76142 5.23662 10 7.99805 10Z" fill="white" />
                                  <path d="M11.3672 11.6667H4.62888C3.53372 11.668 2.4838 12.1036 1.7094 12.878C0.935006 13.6524 0.49937 14.7023 0.498046 15.7975L0.498046 20H15.498V15.7975C15.4967 14.7023 15.0611 13.6524 14.2867 12.878C13.5123 12.1036 12.4624 11.668 11.3672 11.6667Z" fill="white" />
                                  <path d="M17.998 8.33334V5.83334H16.3314V8.33334H13.8314V10H16.3314V12.5H17.998V10H20.498V8.33334H17.998Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_17_12">
                                    <rect width="20" height="20" fill="white" transform="translate(0.498047)" />
                                  </clipPath>
                                </defs>
                              </svg>
                              {acceptedFriend ? <div className="grow">{acceptedFriend?.status == 'pending' ? 'En Atente' : 'ami(e)'}</div> :
                                <button className="flex items-center " onClick={sendFriendRequest}><p>Ajouter ami(e)</p></button>}
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
                        </>
                      }
                    </div>
                    <div className="flex gap-x-4 gap-y-2 justify-between items-start mt-1 text-xs font-light text-center text-zinc-900 flex-wrap max-w-full">
                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <span
                          className={`flag-icon flag-icon-${getCountryFlagFromCountryName(CurrentUser.user.countryresidence)}`}
                          style={{ marginRight: "8px", width: "25px" }}
                        ></span>
                        <div className="grow self-start mt-1">{CurrentUser.user?.countryresidence}</div>
                      </div>
                      <div className="flex gap-2 justify-center items-center self-stretch py-2">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z" fill="#1D1E21" />
                        </svg>
                        <div className="self-stretch my-auto">{CurrentUser.user.gender == 'male' ? 'Homme' : 'Femme'}</div>
                      </div>
                      <div className="flex gap-2 justify-center items-center self-stretch py-2">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_87_12064)">
                            <path d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z" fill="#1D1E21" />
                            <path d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z" fill="#1D1E21" />
                          </g>
                          <defs>
                            <clipPath id="clip0_87_12064">
                              <rect width="20" height="20" fill="white" transform="translate(0.112793 0.5)" />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="self-stretch my-auto">{CurrentUser.user.date_naissance}</div>
                      </div>
                      <div className="flex gap-2 justify-center items-center self-stretch py-2">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_87_12069)">
                            <path d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z" fill="black" />
                          </g>
                          <defs>
                            <clipPath id="clip0_87_12069">
                              <rect width="20" height="20" fill="white" transform="translate(0.168945 0.5)" />
                            </clipPath>
                          </defs>
                        </svg>

                        <div className="self-stretch my-auto">{CurrentUser.user.countryresidence} ,{CurrentUser?.user?.cityresidence} </div>
                      </div>
                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.3789 6.38645L11.7674 1.77495C10.9098 0.956593 9.76995 0.5 8.58457 0.5C7.39919 0.5 6.25935 0.956593 5.40179 1.77495L0.790291 6.38645C0.428596 6.74832 0.225465 7.23904 0.225586 7.75068C0.225707 8.26231 0.429068 8.75295 0.790934 9.11464C1.1528 9.47634 1.64353 9.67947 2.15516 9.67935C2.6668 9.67923 3.15743 9.47586 3.51912 9.114L6.65561 5.97751V18.571C6.65561 19.0826 6.85884 19.5733 7.22059 19.935C7.58234 20.2968 8.07298 20.5 8.58457 20.5C9.09616 20.5 9.5868 20.2968 9.94855 19.935C10.3103 19.5733 10.5135 19.0826 10.5135 18.571V5.97751L13.65 9.114C13.8291 9.29318 14.0417 9.43532 14.2758 9.53233C14.5098 9.62933 14.7606 9.67929 15.014 9.67935C15.2673 9.67941 15.5182 9.62957 15.7523 9.53268C15.9863 9.43578 16.199 9.29373 16.3782 9.11464C16.5574 8.93555 16.6995 8.72292 16.7965 8.48889C16.8935 8.25486 16.9435 8.00402 16.9436 7.75068C16.9436 7.49734 16.8938 7.24648 16.7969 7.0124C16.7 6.77833 16.5579 6.56563 16.3789 6.38645Z" fill="#1D1E21" />
                        </svg>

                        <div className="grow self-start mt-1">{CurrentUser.player.height}cm</div>
                      </div>
                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d609bf65a79e970c6866ad932e5fdd62a603a912852f0024386dcf0730b04895?"
                          className="w-5 aspect-square"
                        />
                        <div className="grow self-start mt-1">
                          {CurrentUser.player.champsoptionelle}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <div className="grow self-start mt-1">
                          Licence
                        </div>
                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.70916 15C6.11933 15.0002 5.55366 14.7658 5.13694 14.3484L0.383597 9.59681C-0.127866 9.08518 -0.127866 8.25583 0.383597 7.74421C0.895224 7.23274 1.72457 7.23274 2.2362 7.74421L6.70916 12.2172L18.5427 0.383597C19.0544 -0.127866 19.8837 -0.127866 20.3953 0.383597C20.9068 0.895224 20.9068 1.72457 20.3953 2.2362L8.28138 14.3484C7.86466 14.7658 7.29899 15.0002 6.70916 15Z" fill="#2E71EB" />
                        </svg>

                      </div>

                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <svg width="33" height="21" viewBox="0 0 33 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_121_15800)">
                            <path d="M32.8175 17.9516C32.6757 18.4739 32.508 18.9837 32.15 19.4092C31.4993 20.1826 30.6591 20.5005 29.6654 20.4988C26.2985 20.4927 22.9334 20.4927 19.5698 20.4988H3.93179C2.54344 20.4988 1.47215 19.8314 1.00242 18.6633C0.909805 18.4347 0.852231 18.1911 0.778809 17.9549V16.4531C0.893113 16.4581 1.00742 16.4681 1.12172 16.4681H32.4746C32.5889 16.4681 32.7032 16.4581 32.8175 16.4531V17.9516Z" fill="#1D1E21" />
                            <path d="M0.778809 8.94138C0.862243 8.60764 0.926487 8.27391 1.02911 7.94935C1.34747 6.97697 1.95999 6.12747 2.78203 5.51826C3.60407 4.90905 4.59504 4.57022 5.61799 4.54858C6.26627 4.5394 6.63171 4.88231 6.66926 5.52142C6.75269 6.9398 7.42017 7.97188 8.75011 8.47999C10.0642 8.9806 11.2531 8.67523 12.2543 7.68653C13.1813 6.76876 14.0982 5.84264 15.0218 4.92236C15.464 4.48099 15.8278 4.42759 16.3693 4.72712C17.4072 5.30115 18.4426 5.87768 19.4948 6.46256C19.4113 6.54599 19.3529 6.61941 19.287 6.68449C16.7217 9.25148 14.1539 11.8168 11.5835 14.3805C11.472 14.4937 11.3245 14.5646 11.1664 14.5807C7.75613 14.5913 4.3459 14.5938 0.935665 14.5882C0.883936 14.5882 0.832208 14.579 0.780479 14.574L0.778809 8.94138Z" fill="#1D1E21" />
                            <path d="M32.8177 14.5731C32.7342 14.5781 32.6508 14.5881 32.5674 14.5881H20.4344C20.3451 14.5881 20.255 14.5781 20.1123 14.5706C20.2049 14.4696 20.2617 14.4037 20.3242 14.3394C21.8933 12.7681 23.4622 11.1965 25.0308 9.62458C25.1726 9.4819 25.2977 9.47189 25.493 9.48441C26.2923 9.53363 27.0941 9.55449 27.8959 9.56784C28.9244 9.57819 29.9245 9.90729 30.7581 10.5098C31.5918 11.1123 32.2181 11.9585 32.5507 12.9319C32.6625 13.2656 32.7301 13.6102 32.8177 13.9506V14.5731Z" fill="#1D1E21" />
                            <path d="M14.1118 14.5892L21.2596 7.44141L23.373 8.61533C23.2896 8.71127 23.222 8.78803 23.1511 8.85895C21.3094 10.7012 19.4655 12.5412 17.6194 14.379C17.4874 14.5003 17.317 14.5715 17.138 14.58C16.1401 14.6017 15.1414 14.5892 14.1118 14.5892Z" fill="#1D1E21" />
                            <path d="M10.1708 6.88219C9.44824 5.347 9.36732 3.87856 10.0239 2.4193C10.2843 1.8436 10.6914 1.32548 11.0944 0.825707C11.168 0.732494 11.2603 0.655609 11.3652 0.599935C11.4701 0.544261 11.5855 0.511015 11.704 0.502306C11.8224 0.493597 11.9414 0.509616 12.0534 0.549347C12.1653 0.589078 12.2678 0.651653 12.3543 0.733097C13.096 1.44479 13.8027 2.19236 14.5135 2.91406C13.2261 3.91527 12.1774 5.18097 10.9884 6.29148C10.7548 6.50757 10.4678 6.67444 10.1708 6.88219Z" fill="#1D1E21" />
                          </g>
                          <defs>
                            <clipPath id="clip0_121_15800">
                              <rect width="32.0387" height="20" fill="white" transform="translate(0.778809 0.5)" />
                            </clipPath>
                          </defs>
                        </svg>

                        <div className="grow self-start mt-1">
                          {CurrentUser.player.PiedFort}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-base font-light max-sm:text-center text-neutral-900">
                    {CurrentUser?.user.discreptionBio}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[1110px] justify-between w-full flex flex-col md:flex-row gap-4">
              <div className=" max-w-xl flex flex flex-col justify-center">
                <div className="flex md:justify-center gap-1 px-4  text-lg whitespace-nowrap text-zinc-900">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_878_80013)">
                      <path d="M20.1242 17.1658C20.1242 19.0042 18.6292 20.4992 16.7909 20.4992H6.66925L8.37341 18.8325H16.7917C17.7109 18.8325 18.4584 18.085 18.4584 17.1658C18.4584 16.2467 17.7109 15.4992 16.7917 15.4992H12.6251C10.7867 15.4992 9.29175 14.0042 9.29175 12.1658C9.29175 10.56 10.4334 9.21667 11.9476 8.9025L13.5801 10.4992H12.6251C11.7059 10.4992 10.9584 11.2467 10.9584 12.1658C10.9584 13.085 11.7059 13.8325 12.6251 13.8325H16.7917C18.6301 13.8325 20.1242 15.3275 20.1242 17.1658ZM18.9034 7.6125L15.9576 10.4942L13.0176 7.61917C11.3867 5.9875 11.3867 3.345 13.0109 1.72C13.7984 0.933333 14.8451 0.5 15.9576 0.5C17.0701 0.5 18.1167 0.933333 18.9034 1.72C20.5284 3.345 20.5284 5.98833 18.9034 7.6125ZM7.23675 11.72C8.86175 13.345 8.86175 15.9883 7.23675 17.6125L4.29091 20.4942L1.35091 17.6192C-0.279921 15.9875 -0.279921 13.345 1.34425 11.72C2.13175 10.9333 3.17841 10.5 4.29091 10.5C5.40341 10.5 6.45008 10.9333 7.23675 11.72Z" fill="#1D1E21" />
                    </g>
                    <defs>
                      <clipPath id="clip0_878_80013">
                        <rect width="20" height="20" fill="white" transform="translate(0.125 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="">Positions</div>
                </div>
                <Terrain positionPlay={CurrentUser?.player.positionPlay} positionSecond={CurrentUser?.player.positionSecond} />
              </div>
              <div>
                <div className=" max-w-xl flex flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                    className="shrink-0 self-start w-5 aspect-square"
                  />
                  <div className="grow">Compétences</div>
                </div>
                <div className="  max-w-xl flex flex gap-2  text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">

                  {CurrentUser?.player.skillsInProfile.split(',').filter((item) => item !== '').map((item) => {
                    return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                      {item}
                    </div>)
                  })}
                </div>
              </div>

            </div>
            <div className="  max-w-xl flex flex gap-5 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
            </div>
          </div>}
          {CurrentUser?.user.profil === 'coach' && <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px]">
            <div className="self-stretch">
              <div className="flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                <div className="flex flex-col  max-md:ml-0 ">
                  <img
                    loading="lazy"
                    srcSet={CurrentUser?.user.image ? CurrentUser?.user.image : Placeholder}
                    className="shrink-0 max-w-full rounded-full aspect-square w-[120px] max-md:mt-4"
                  />
                </div>
                <div className="flex flex-col items-center justify-between ml-5">
                  <div className="flex flex-col grow self-stretch my-auto max-md:mt-5 max-md:max-w-full">
                    <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col">
                        <div className="text-xl font-bold text-zinc-900">
                          {CurrentUser?.user.nom}  {CurrentUser?.user.prenom}
                        </div>
                        <div className="mt-1 text-base font-medium text-blue-600">
                          {CurrentUser?.user.profil}
                        </div>
                      </div>
                      {isOwner ?
                        <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                            className="shrink-0 my-auto aspect-square w-[15px]"
                          />
                          <Link to={'/setting/personal'} className="flex items-center"><p>Modifier</p></Link>
                        </div> :
                        <>
                          <div className="flex items-center gap-3">
                            <div className="max-sm:w-full items-center flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_17_12)">
                                  <path d="M7.99805 10C10.7595 10 12.998 7.76142 12.998 5C12.998 2.23858 10.7595 0 7.99805 0C5.23662 0 2.99805 2.23858 2.99805 5C2.99805 7.76142 5.23662 10 7.99805 10Z" fill="white" />
                                  <path d="M11.3672 11.6667H4.62888C3.53372 11.668 2.4838 12.1036 1.7094 12.878C0.935006 13.6524 0.49937 14.7023 0.498046 15.7975L0.498046 20H15.498V15.7975C15.4967 14.7023 15.0611 13.6524 14.2867 12.878C13.5123 12.1036 12.4624 11.668 11.3672 11.6667Z" fill="white" />
                                  <path d="M17.998 8.33334V5.83334H16.3314V8.33334H13.8314V10H16.3314V12.5H17.998V10H20.498V8.33334H17.998Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_17_12">
                                    <rect width="20" height="20" fill="white" transform="translate(0.498047)" />
                                  </clipPath>
                                </defs>
                              </svg>
                              {acceptedFriend ? <div className="grow">{acceptedFriend?.status == 'pending' ? 'En Atente' : 'ami(e)'}</div> :
                                <button className="flex items-center" onClick={sendFriendRequest}><p>Ajouter ami(e)</p></button>}
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


                        </>
                      }
                    </div>
                    <div className="flex gap-3 justify-center items-start mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">
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
                      <span
                          className={`flag-icon flag-icon-${getCountryFlagFromCountryName(CurrentUser.user.countryresidence)}`}
                          style={{ marginRight: "8px", width: "25px" }}
                        ></span>
                        <div className="grow self-start mt-1">{CurrentUser.user.countryresidence}</div>
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

            <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full">
              {CurrentUser?.user.discreptionBio}  💥
            </div>
            <div className="flex gap-4 px-4 mt-8 text-lg whitespace-nowrap text-zinc-900">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_878_80013)">
                  <path d="M20.1242 17.1658C20.1242 19.0042 18.6292 20.4992 16.7909 20.4992H6.66925L8.37341 18.8325H16.7917C17.7109 18.8325 18.4584 18.085 18.4584 17.1658C18.4584 16.2467 17.7109 15.4992 16.7917 15.4992H12.6251C10.7867 15.4992 9.29175 14.0042 9.29175 12.1658C9.29175 10.56 10.4334 9.21667 11.9476 8.9025L13.5801 10.4992H12.6251C11.7059 10.4992 10.9584 11.2467 10.9584 12.1658C10.9584 13.085 11.7059 13.8325 12.6251 13.8325H16.7917C18.6301 13.8325 20.1242 15.3275 20.1242 17.1658ZM18.9034 7.6125L15.9576 10.4942L13.0176 7.61917C11.3867 5.9875 11.3867 3.345 13.0109 1.72C13.7984 0.933333 14.8451 0.5 15.9576 0.5C17.0701 0.5 18.1167 0.933333 18.9034 1.72C20.5284 3.345 20.5284 5.98833 18.9034 7.6125ZM7.23675 11.72C8.86175 13.345 8.86175 15.9883 7.23675 17.6125L4.29091 20.4942L1.35091 17.6192C-0.279921 15.9875 -0.279921 13.345 1.34425 11.72C2.13175 10.9333 3.17841 10.5 4.29091 10.5C5.40341 10.5 6.45008 10.9333 7.23675 11.72Z" fill="#1D1E21" />
                </g>
                <defs>
                  <clipPath id="clip0_878_80013">
                    <rect width="20" height="20" fill="white" transform="translate(0.125 0.5)" />
                  </clipPath>
                </defs>
              </svg>

              <div className="grow mb-3">Tactiques Préférée</div>
            </div>
            <div className="flex flex-col justify-center text-xs text-center text-white whitespace-nowrap w-[366px]">
              <div className="relative flex relative flex-col py-9 pr-12 pl-4 w-full aspect-[1.45]">
                {CurrentUser.coach?.footballTactic == '3-4-3' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T343}
                  className="object-cover absolute inset-0 size-full"
                />}
                {CurrentUser.coach?.footballTactic == '4-3-3' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T433}
                  className="object-cover absolute inset-0 size-full"
                />}
                {CurrentUser.coach?.footballTactic === '4-4-2' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T442}
                  className="object-cover absolute inset-0 size-full"
                />}
                {CurrentUser.coach?.footballTactic === '5-4-1' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T541}
                  className="object-cover absolute inset-0 size-full"
                />}
                {CurrentUser.coach?.footballTactic === '4-2-3-1' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T4231}
                  className="object-cover absolute inset-0 size-full"
                />}
                {CurrentUser.coach?.footballTactic === '5-3-2' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T532}
                  className="object-cover absolute inset-0 size-full"
                />}
                {CurrentUser.coach?.footballTactic === '3-4-3' && <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T343}
                  className="object-cover absolute inset-0 size-full"
                />}


              </div>

            </div>
            <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                className="shrink-0 self-start w-5 aspect-square"
              />
              <div className="grow">Compétences</div>
            </div>
            <div className="flex gap-2  mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">

              {CurrentUser?.coach?.skills.split(',').filter((item) => item !== '').map((item) => {
                return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                  {item}
                </div>)
              })}

            </div>
            <div className="flex gap-5 justify-between mt-4">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
            </div>
          </div>}
          {CurrentUser?.user.profil === 'agent' && <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px] ">
            <div className="self-stretch">
              <div className="flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                <div className="flex flex-col max-md:ml-0 ">
                  <img
                    loading="lazy"
                    srcSet={CurrentUser?.user.image ? CurrentUser?.user.image : Placeholder}
                    className="shrink-0 max-w-full rounded-full aspect-square w-[227] max-md:mt-4"
                  />
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex flex-col grow self-stretch my-auto max-md:mt-5 max-md:max-w-full">
                    <div className="flex gap-2 justify-between max-sm:justify-center w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col justify-center max-sm:text-center">
                        <div className="text-xl font-bold text-zinc-900">
                          {CurrentUser?.user.nom}  {CurrentUser?.user.prenom}
                        </div>
                        <div className="mt-1 text-base font-medium text-blue-600">
                          {CurrentUser?.user.profil}
                        </div>
                      </div>
                      {isOwner ?
                        <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                            className="shrink-0 my-auto aspect-square w-[15px]"
                          />
                          <Link to={'/setting/personal'} className="flex items-center"><p>Modifier</p></Link>
                        </div> :
                        <>
                          <div className="flex items-center gap-3">
                            <div className="max-sm:w-full items-center flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_17_12)">
                                  <path d="M7.99805 10C10.7595 10 12.998 7.76142 12.998 5C12.998 2.23858 10.7595 0 7.99805 0C5.23662 0 2.99805 2.23858 2.99805 5C2.99805 7.76142 5.23662 10 7.99805 10Z" fill="white" />
                                  <path d="M11.3672 11.6667H4.62888C3.53372 11.668 2.4838 12.1036 1.7094 12.878C0.935006 13.6524 0.49937 14.7023 0.498046 15.7975L0.498046 20H15.498V15.7975C15.4967 14.7023 15.0611 13.6524 14.2867 12.878C13.5123 12.1036 12.4624 11.668 11.3672 11.6667Z" fill="white" />
                                  <path d="M17.998 8.33334V5.83334H16.3314V8.33334H13.8314V10H16.3314V12.5H17.998V10H20.498V8.33334H17.998Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_17_12">
                                    <rect width="20" height="20" fill="white" transform="translate(0.498047)" />
                                  </clipPath>
                                </defs>
                              </svg>
                              {acceptedFriend ? <div className="grow">{acceptedFriend?.status == 'pending' ? 'En Atente' : 'ami(e)'}</div> :
                                <button className="flex items-center" onClick={sendFriendRequest}><p>Ajouter ami(e)</p></button>}
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


                        </>
                      }
                    </div>
                    <div className="flex gap-3 justify-center items-start mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">

                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5578ac17241460884f81bfecaeacebd3031f2ffd1b2203855765a3b934a027?"
                          className="aspect-[1.49] w-[30px]"
                        />
                        <div className="grow self-start mt-1">Tunisie</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full">
              {CurrentUser?.user.discreptionBio}  💥
            </div>


            <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                className="shrink-0 self-start w-5 aspect-square"
              />
              <div className="grow">Compétences</div>
            </div>
            <div className="flex gap-2  mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
              {CurrentUser?.user.profil === 'agent' &&
                CurrentUser?.agent?.skillsagent.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}
              {CurrentUser?.user.profil === 'scout' &&
                CurrentUser?.scout?.skillsscout.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}
              {CurrentUser?.user.profil === 'other' &&
                CurrentUser?.other.skillsAutre.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}

            </div>

            <div className="flex gap-5 justify-between mt-4">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
            </div>
          </div>}
          {CurrentUser?.user.profil === 'other' && <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px]">
            <div className="self-stretch">
              <div className="flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                <div className="flex flex-col max-md:ml-0 ">
                  <img
                    loading="lazy"
                    srcSet={CurrentUser?.user.image ? CurrentUser?.user.image : Placeholder}
                    className="shrink-0 max-w-full rounded-full aspect-square w-[120px] max-md:mt-4"
                  />
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex flex-col grow self-stretch my-auto max-md:mt-5 max-md:max-w-full">
                    <div className="flex gap-2 justify-between max-sm:justify-center w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col justify-center max-sm:text-center">
                        <div className="text-xl font-bold text-zinc-900">
                          {CurrentUser?.user.nom}  {CurrentUser?.user.prenom}
                        </div>
                        <div className="mt-1 text-base font-medium text-blue-600">
                          {CurrentUser?.user.profil}
                        </div>
                      </div>
                      {isOwner ?
                        <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                            className="shrink-0 my-auto aspect-square w-[15px]"
                          />
                          <Link to={'/setting/personal'} className="flex items-center"><p>Modifier</p></Link>
                        </div> :
                        <>
                          <div className="flex items-center gap-3">
                            <div className="max-sm:w-full items-center flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_17_12)">
                                  <path d="M7.99805 10C10.7595 10 12.998 7.76142 12.998 5C12.998 2.23858 10.7595 0 7.99805 0C5.23662 0 2.99805 2.23858 2.99805 5C2.99805 7.76142 5.23662 10 7.99805 10Z" fill="white" />
                                  <path d="M11.3672 11.6667H4.62888C3.53372 11.668 2.4838 12.1036 1.7094 12.878C0.935006 13.6524 0.49937 14.7023 0.498046 15.7975L0.498046 20H15.498V15.7975C15.4967 14.7023 15.0611 13.6524 14.2867 12.878C13.5123 12.1036 12.4624 11.668 11.3672 11.6667Z" fill="white" />
                                  <path d="M17.998 8.33334V5.83334H16.3314V8.33334H13.8314V10H16.3314V12.5H17.998V10H20.498V8.33334H17.998Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_17_12">
                                    <rect width="20" height="20" fill="white" transform="translate(0.498047)" />
                                  </clipPath>
                                </defs>
                              </svg>
                              {acceptedFriend ? <div className="grow">{acceptedFriend?.status == 'pending' ? 'En Atente' : 'ami(e)'}</div> :
                                <button className="flex items-center" onClick={sendFriendRequest}><p>Ajouter ami(e)</p></button>}
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


                        </>
                      }
                    </div>
                    <div className="flex gap-3 items-start justify-center mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">

                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5578ac17241460884f81bfecaeacebd3031f2ffd1b2203855765a3b934a027?"
                          className="aspect-[1.49] w-[30px]"
                        />
                        <div className="grow self-start mt-1">Tunisie</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full">
              {CurrentUser?.user.discreptionBio}  💥
            </div>


            <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                className="shrink-0 self-start w-5 aspect-square"
              />
              <div className="grow">Compétences</div>
            </div>
            <div className="flex gap-2  mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
              {CurrentUser?.user.profil === 'agent' &&
                CurrentUser?.agent?.skills.split(',').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}
              {CurrentUser?.user.profil === 'scout' &&
                CurrentUser?.scout?.skillsscout.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}
              {CurrentUser?.user.profil === 'other' &&
                CurrentUser?.other.skillsAutre.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}

            </div>

            <div className="flex gap-5 justify-between mt-4">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
            </div>
          </div>}
          {CurrentUser?.user.profil === 'scout' && <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px]">
            <div className="self-stretch">
              <div className="flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                <div className="flex flex-col max-md:ml-0 ">
                  <img
                    loading="lazy"
                    srcSet={CurrentUser?.user.image ? CurrentUser?.user.image : Placeholder}
                    className="shrink-0 max-w-full rounded-full aspect-square w-[120px] max-md:mt-4"
                  />
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex flex-col grow self-stretch my-auto max-md:mt-5 max-md:max-w-full">
                    <div className="flex gap-2 justify-between max-sm:justify-center w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col justify-center max-sm:text-center">
                        <div className="text-xl font-bold text-zinc-900">
                          {CurrentUser?.user.nom}  {CurrentUser?.user.prenom}
                        </div>
                        <div className="mt-1 text-base font-medium text-blue-600">
                          {CurrentUser?.user.profil}
                        </div>
                      </div>
                      {isOwner ?
                        <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                            className="shrink-0 my-auto aspect-square w-[15px]"
                          />
                          <Link to={'/setting/personal'} className="flex items-center"><p>Modifier</p></Link>
                        </div> :
                        <>
                          <div className="flex items-center gap-3">
                            <div className="max-sm:w-full items-center flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_17_12)">
                                  <path d="M7.99805 10C10.7595 10 12.998 7.76142 12.998 5C12.998 2.23858 10.7595 0 7.99805 0C5.23662 0 2.99805 2.23858 2.99805 5C2.99805 7.76142 5.23662 10 7.99805 10Z" fill="white" />
                                  <path d="M11.3672 11.6667H4.62888C3.53372 11.668 2.4838 12.1036 1.7094 12.878C0.935006 13.6524 0.49937 14.7023 0.498046 15.7975L0.498046 20H15.498V15.7975C15.4967 14.7023 15.0611 13.6524 14.2867 12.878C13.5123 12.1036 12.4624 11.668 11.3672 11.6667Z" fill="white" />
                                  <path d="M17.998 8.33334V5.83334H16.3314V8.33334H13.8314V10H16.3314V12.5H17.998V10H20.498V8.33334H17.998Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_17_12">
                                    <rect width="20" height="20" fill="white" transform="translate(0.498047)" />
                                  </clipPath>
                                </defs>
                              </svg>
                              {acceptedFriend ? <div className="grow">{acceptedFriend?.status == 'pending' ? 'En Atente' : 'ami(e)'}</div> :
                                <button className="flex items-center" onClick={sendFriendRequest}><p>Ajouter ami(e)</p></button>}
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


                        </>
                      }
                    </div>
                    <div className="flex gap-3 items-start justify-center mt-1 text-xs font-light text-center text-zinc-900 max-md:flex-wrap max-md:max-w-full">

                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5578ac17241460884f81bfecaeacebd3031f2ffd1b2203855765a3b934a027?"
                          className="aspect-[1.49] w-[30px]"
                        />
                        <div className="grow self-start mt-1">Tunisie</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-stretch mt-8 text-base font-light text-center text-neutral-900 max-md:max-w-full">
              {CurrentUser?.user.discreptionBio}  💥
            </div>


            <div className="flex gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                className="shrink-0 self-start w-5 aspect-square"
              />
              <div className="grow">Compétences</div>
            </div>
            <div className="flex gap-2  mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
              {CurrentUser?.user.profil === 'agent' &&
                CurrentUser?.agent?.skills.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}
              {CurrentUser?.user.profil === 'scout' &&
                CurrentUser?.scout?.skillsscout.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}
              {CurrentUser?.user.profil === 'other' &&
                CurrentUser?.other.skillsAutre.split(',').filter((item) => item !== '').map((item) => {
                  return (<div className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>)
                })}

            </div>

            <div className="flex gap-5 justify-between mt-4">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                className="shrink-0 w-6 aspect-[0.96]"
              />
            </div>
          </div>}
        </div>

      </HomeLayout>
      {/* <Header /> */}

      {/* <div className="flex flex-col pb-12 bg-zinc-100">
        <div className="hidden gap-5 justify-between px-12 py-6 w-full text-base font-medium text-white whitespace-nowrap bg-white shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/715b166e5903d72bf6af9d89d399cacff372961454f110d84fb34e5b4fad56c0?"
            className="my-auto w-36 max-w-full aspect-[2.78]"
          />
          <div className="flex gap-4 items-center pl-4 rounded-[80px]">
            <div className="flex gap-2 justify-center self-stretch p-2 my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/335a84a3823183b29510dd21205458b91ae8c5ed9cc14713a383e2a80b93b1da?"
                className="w-5 aspect-square"
              />
              <div className="grow">Acceuil</div>
            </div>
            <div className="flex gap-2 justify-center self-stretch p-2 my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3470fd8910cc2b8a69c00078e7b51dceaf5ac869969e8c08f140dfbcd49cccb?"
                className="aspect-[1.49] w-[30px]"
              />
              <div className="grow">Français</div>
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="self-stretch aspect-square w-[60px]"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center self-end px-8 py-2 mt-6 mr-12 text-base font-medium text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5 max-md:mr-2.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4786f6b5c1d397bc7db5824ce7a9ef71cb4fc756bcad073d96bb22ae8dbe08c?"
            className="w-5 aspect-square"
          />
          <div className="grow">Revenir au Profil</div>
        </div>
        <div className="flex justify-center items-center self-center px-16 py-8 mt-6 w-full bg-white rounded-xl max-w-[1344px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col w-full max-w-[1116px] max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">

                  {
                    CurrentUser?.image ? <img
                      loading="lazy"
                      srcSet={CurrentUser?.image}
                      className="max-w-full rounded-full aspect-square w-[227px] max-md:mt-6"
                    /> : <div className="bg-gray-500 rounded-full w-[125px] h-[125px]"></div>
                  }
                </div>
                <div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
                    <div className="flex gap-5 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col">
                        <div className="text-xl font-bold text-center text-zinc-900">
                          {CurrentUser?.nom + CurrentUser?.prenom}
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


                        </div>
                      ) : null}
                    </div>
                    <div className="flex gap-5 justify-between items-center mt-4 text-lg text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                      <div className="flex gap-2 justify-between py-2 text-center whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b31ae678c9fa91bbf3f510be7c9fb5042aafebdcc068cb9e2db64b3a3002ea0?"
                          className="my-auto aspect-[1.49] w-[30px]"
                        />
                        <div className="grow"> {CurrentUser?.country}</div>
                      </div>
                      <div className="flex gap-4 justify-between py-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb53ffc74e3127793633b5e954f36dd06722c777c090afb740cbe1b863b1f54d?"
                          className="my-auto w-5 aspect-square"
                        />
                        <div> {CurrentUser?.gender}</div>
                      </div>
                      <div className="flex gap-4 justify-between py-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c06e10a54a29368e27c244f1a9c0335fcc97a932e5ecdaafc08ccadaa679d80?"
                          className="my-auto w-5 aspect-square"
                        />
                        <div>{CurrentUser?.date_naissance}</div>
                      </div>
                      <div className="flex gap-4 py-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a9242222633948c2670d38c61c7bead6221bbb5ff7b8a22422ec31dec476a4c?"
                          className="my-auto w-5 aspect-square"
                        />
                        <div>Ariana</div>
                      </div>
                      {CurrentUser?.profil === 'player' && <div>
                        <div className="flex gap-4 justify-between py-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ceb2acde2d8b76c41f33f5728653df1ea8faca198bf572cf19f0159f5c57008f?"
                            className="my-auto aspect-[0.85] w-[17px]"
                          />
                          <div>{player?.height}</div>
                        </div>
                      </div>}
                    </div>
                    <div className="flex gap-5 justify-between pr-20 mt-4 text-lg text-zinc-900 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                      <div className="flex gap-2 justify-center self-start py-2 text-base text-center">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a97b845101751a57af2e080374d931e7c668659555812f983ee90e01493d4725?"
                          className="w-5 aspect-[0.95]"
                        />
                        <div>Licence :</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9adc9dcd385009b732c4ac793c85f033b80e2a08c9030ab8615e953353c11863?"
                          className="my-auto aspect-[1.41] w-[21px]"
                        />
                      </div>
                      <div className="flex gap-2 justify-between py-2 text-center whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d61968e2c701b7543613ff5cd64e1f61b221fa99f2f2ffd6465b1bff21ef6b1e?"
                          className="my-auto w-5 aspect-square"
                        />
                        <div className="grow">Espérance Sportive de Tunis</div>
                      </div>
                      <div className="flex gap-4 justify-between py-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a7aa2178635058e70c73c16b67a8d88b14a96956a10fbb4257410f0cad69808?"
                          className="my-auto w-8 aspect-[1.59]"
                        />
                        <div className="grow">Pied Gauche</div>
                      </div>
                    </div>
                    <div className="mt-4 text-base font-light text-neutral-900 max-md:max-w-full">
                      {player?.bio}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 mt-4 h-2.5 bg-blue-100 max-md:max-w-full" />
            <div className="justify-center mt-4 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center whitespace-nowrap max-md:mt-10">
                    <div className="flex gap-4 self-start text-lg text-zinc-900">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c846c2c5b2911f46101b34fc1580be01feb46d47fff3e534bc35fc871502258?"
                        className="my-auto w-5 aspect-square"
                      />
                      <div className="flex-auto">Positions</div>
                    </div>
                    <Terrain positionPlay={player?.positionPlay} positionSecond={player?.positionPlay} />
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col pr-3.5 text-base font-semibold text-blue-600 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-4 self-start text-lg whitespace-nowrap text-zinc-900">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/691535fbd010fe8eba20a88606f7efa53d4a6d2ac1d453495f38cf6065376ffa?"
                        className="my-auto aspect-[0.75] w-[15px]"
                      />
                      <div className="grow">Compétences</div>
                    </div>
                    <div className="flex gap-2 justify-between pr-20 mt-4 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                      {skills.map((item) => {
                        return (
                          <div className="grow justify-center px-4 py-2 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px]">
                            {item}
                          </div>)

                      })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 mt-4 h-2.5 bg-blue-100 max-md:max-w-full" />
            <div className="flex gap-5 justify-between self-center mt-4 max-w-full w-[220px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                className="flex-1 shrink-0 w-full aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                className="flex-1 shrink-0 w-full aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                className="flex-1 shrink-0 w-full aspect-[0.96]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                className="flex-1 shrink-0 w-full aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/81cbd5108a69cea02c07a513c6153913dfbff5c1146012e38e4a50f5255a6a95?"
                className="flex-1 shrink-0 w-full aspect-[0.96]"
              />
            </div>
          </div>
        </div>
      </div> */}

    </>
  )
}

export default More