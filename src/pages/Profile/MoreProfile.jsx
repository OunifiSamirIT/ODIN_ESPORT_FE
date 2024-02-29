import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import Terrain from "../../components/Terrain";
import SlideMenu from "../../components/SlideMenu";
import Logo from "../../assets/ODIN22.png";
import { Link, useParams } from "react-router-dom";

const More = () => {
  let { id } = useParams();
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

  // const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=> {
    if (LocalStorageID.id) {
      // Replace the API endpoint with your actual endpoint for fetching user data
      fetch(`https://odine-sport.com/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
      }
  },[])

  const fetchUserInfo = async () => {
      const response = await fetch(`https://odine-sport.com/api/user/${id}`);
      const result = await response.json();
      setCurrentUser(result)
      console.log(result)
      if (result.profil === 'player') {
          const response = await fetch(`https://odine-sport.com/api/player/${id}`);
          const result = await response.json();
          console.log('error' , result.message)

          if(result.message) {
          window.location.href = "/home";
          }
          setPlayer(result)
          console.log(result)
          if(result.skillsInProfile != '') {
              setSkills(result?.skillsInProfile.split(',').filter((items) => {
                  return items !== ''
              }))
          }

      }
      if (result.profil === 'agent') {
          const response = await fetch(`https://odine-sport.com/api/player/${id}`);
          const result = await response.json();
          console.log('agent', result)
          setAgent(result)
          
          if(result.skillsInProfile !== '') {
              setSkills(result?.skillsInProfile.split(',').filter((items) => {
                  return items !== ''
              }))
          }
          setSkills([])
      }
      if (result.profil === 'scout') {
          const response = await fetch(`https://odine-sport.com/api/player/${id}`);
          const result = await response.json();
          setAgent(result)
          if(result.skillsInProfile !== '') {
              setSkills(result?.skillsInProfile.split(',').filter((items) => {
                  return items !== ''
              }))
          }
      }
  }
  const copyLinkToClipboard = (articleId) => {
    // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
    const number = CurrentUser.tel;

    // Copy the URL to the clipboard
    if(acceptedFriend.status === 'accepted') {
        navigator.clipboard.writeText(number)
        .then(() => {
            console.log('Link copied to clipboard');
        })
        .catch((err) => {
            console.error('Failed to copy link to clipboard', err);
        });
    }else{
        console.log('add as friend to copy number')
    }

};
  const isFriendAccepted = async () => {
      const response = await fetch(`https://odine-sport.com/api/user/${user}/checkFriends/${LocalStorageID.id}`)
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
      
      const response = await fetch(`https://odine-sport.com/api/user/${user}/sendFriendRequest/${LocalStorageID.id}`, {
          method: "POST",
      });

      const result = await response.json();
      console.log('friend request sent')
  }



  return (
    <>
      {/* <Header /> */}
      <div className="nav-header bg-white shadow-xs border-0">
        <div className=" flex justify-between items-center w-full">
          <Link to="/home"><img src={Logo} className='ml-3 h-28 w-28 ' /><span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0"> </span> </Link>

        </div>
        <SlideMenu setIsActive={setIsActive} />
      </div>
      {/* <Header /> */}

      <div className="flex flex-col pb-12 bg-zinc-100">
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
      </div>

    </>
  )
}

export default More