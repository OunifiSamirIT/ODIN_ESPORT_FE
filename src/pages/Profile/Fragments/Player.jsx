import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Terrain from "../../../components/Terrain";
import { useParams } from "react-router-dom";
import Placeholder from "../../../assets/placeholder.jpg"
import { useNavigate } from 'react-router-dom';
import { Config } from "../../../config";
import { paysAllInfo } from "../../../assets/data/Country";

const PlayerCard = ({ userInfo }) => {

  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const isOwner = storedUserData.id == id
  const navigate = useNavigate();
  if (!userInfo) {
    navigate('/404')
  }
  const [acceptedFriend, setAcceptedFriend] = useState(false)
  // const [invitationSend, setInvitationSend] = useState(false);
  // const [Invitation, setInvitation] = useState([]);
  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);

  const isFriendAccepted = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/checkFriends/${storedUserData.id}`)
    const result = await response.json();
    setAcceptedFriend(result.exists)
  }
  const sendFriendRequest = async () => {

    const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserData.id}`, {
      method: "POST",
    });
    isFriendAccepted()
    const result = await response.json();
    console.log('friend request sent')
  }

  // const CheckIfInvitationIsSend = async () => {
  //   const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}/friend-requests`, {
  //     method: "GET",
  //   });
  //   const result = await response.json();
  //   console.log(result)
  //   setInvitation(result.receiver)

  //   // const isFriend = result.receiver.filter((item) => {
  //   //     console.log(item.id)
  //   //     return item.id === LocalStorageID.id
  //   // })
  //   // setInvitationSend(isFriend)
  // }
  // const getCountryFlagFromCountryName = () => {
  //   paysAllInfo.map()
  // }
  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo.find(country => country.name.toLowerCase() === countryName.toLowerCase());
    return country ? country.iso["alpha-2"].toLowerCase() : null;
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
      <div className="flex gap-y-4 flex-col items-center px-[30px] py-6 bg-white rounded-[10px] ">
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
                Joueur
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
                  <Link to={'/setting/personal'} className="flex items-center"><p>Modifier</p></Link>
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
                        <button className="flex items-center " onClick={sendFriendRequest}><p>Ajouter</p></button>}
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
                          Numero whatsapp éte copier
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
          </div>
        </div>
        <div className="md:gap-16 md:ml-[125px] max:lg-[150px] md:-mt-16 flex justify-center md:justify-between flex-wrap text-sm">
          <div className="flex gap-2 justify-between items-center py-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ad5d0e7c1cc757b7d699a58b21f17f4dfeb3117bc9f1e3f4d361257cb7cc63?"
              className="self-stretch w-5 aspect-[1.3]"
            />
            <div className="my-auto">Licence :</div>

            {userInfo.player.Licence ? <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f75f221781125db60fd42377c75c439dc592852bf0ba8d19fbf4b35ca04660?"
              className="self-stretch my-auto aspect-[1.3] w-[13px]"
            /> : 'No' }
          </div>
          <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
            <span
              className={`flag-icon flag-icon-${getCountryFlagFromCountryName(userInfo.user.countryresidence)}`}
              style={{ marginRight: "8px", width: "25px" }}
            ></span>
            { }
            <div className="grow self-start mt-1">Tunisie</div>
          </div>

          <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
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


        <div className="self-stretch text-base font-light text-center text-neutral-900 max-md:max-w-full">
          <div className="flex justify-center mt-2">
            <svg width="366" height="1" viewBox="0 0 366 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0.5" x2="365.5" y2="0.499968" stroke="#D9E6F7" stroke-linecap="round" />
            </svg>
          </div>
          <div className="py-4">
            {userInfo?.user.discreptionBio}
          </div>
          <div className="flex justify-center mt-2">
            <svg width="366" height="1" viewBox="0 0 366 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0.5" x2="365.5" y2="0.499968" stroke="#D9E6F7" stroke-linecap="round" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-y-4">
          <div className="flex justify-center gap-1 px-4  text-lg whitespace-nowrap text-zinc-900">
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
          <Terrain positionPlay={userInfo?.player?.positionPlay} positionSecond={userInfo?.player?.positionSecond} />
        </div>
        <div className="flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
            className="shrink-0 self-start w-5 aspect-square"
          />
          <div className="grow">Compétences</div>
        </div>
        <div className="flex gap-2  text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">

          {userInfo?.player?.skillsInProfile.split(',').filter(item => item.trim() !== '').map((item, index) => {
            return (<div key={index} className="grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
              {item}
            </div>)
          })}
        </div>

        <div className="flex gap-5 justify-between">
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
        <div className="flex justify-center items-center px-16 py-2  max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
          <div className="flex gap-4 items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2fbc01810223be1770f84ab0be35b3b52448631192553972949fcfd687661f3?"
              className="shrink-0 w-4 aspect-[0.94]"
            />
            <a href={`/profile/more/${id}`}>Voir Plus</a>
          </div>
        </div>
      </div>
    </>
  )


}

export default PlayerCard