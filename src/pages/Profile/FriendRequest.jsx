import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import Placeholder from "../../assets/placeholder.jpg";
import { Config } from "../../config";
import { paysAllInfo } from "../../assets/data/Country";
import { Link } from "react-router-dom";
import Header from "../../components/Header2";
import { Context } from "../../index";

import { io } from "socket.io-client";
import NotificationService from "../../api/notification.server";
import LeftMenu from "../../components/LeftMenu";
import secureLocalStorage from "react-secure-storage";

const FriendRequest = () => {
  //initialize socket

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(Config.LOCAL_URL);
    setSocket(socketInstance);
  }, []);

  //send accepted request notification
  let sendNotification = (id) => {
    NotificationService.instantSend(socket, {
      toUser_id: id,
      forWichAction: "AcceptRequest",
      actionId: "0",
      postId: "",
      postImage: "",
    });
  };

  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);
  const [user, setUser] = useState([]);
  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg, dark_border, dark_gray_color, dark_gray_svg, _currentTheme } = React.useContext(Context);

  useEffect(() => {
    const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);
  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const [FriendRequest, setFriendRequest] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;

  const fetchFriendRequest = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${storedUserDatad.id}/getPendingFriends`,{
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },

      }
    );
    const result = await response.json();
    setFriendRequest(result);
  };
  const deleteInviation = async (id) => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${storedUserData.id}/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },

      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  };
  const acceptInvitation = async (id) => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${storedUserDatad.id}/acceptFriend/${id}`,
      {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },

      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo?.find(
      (country) => country?.name == countryName
    );
    return country ? country.iso["alpha-2"].toLowerCase() : null;
  };

  useEffect(() => {
    fetchFriendRequest();
  }, []);

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  return (
    <>
      <Header />

      <div style={dark_bg} className="flex flex-col pb-12    mt-0 lg:mt-8 ">
        <div className="self-center md:mt-20  w-full max-w-[1344px]  max-md:max-w-full">
          <div className="flex max-md:flex-col max-md:gap-0">
            {/* left menu */}
            <LeftMenu
              id={id}
              shouldShowAgentItem={shouldShowAgentItem}
              shouldShowForProfile={shouldShowForProfile}
              setEventTogglerIsOpenned={setEventTogglerIsOpenned}
              eventTogglerIsOpenned={eventTogglerIsOpenned}
              user={user}
              userProfileType={userProfileType}
              style={{marginTop: "25px", marginRight: "-30px", marginLeft: "10px"}}
            />

            {/* left menu */}

            <div className="flex flex-col md:px-0 px-3 ml-5 mr-7 mt-20 md:mt-2 w-[76%] max-md:ml-0 max-md:w-full">
              <div  style={dark_light_bg}   className="items-start px-8 py-6 text-3xl md:mt-4 font-bold whitespace-nowrap rounded-[10px] max-md:px-5 max-md:max-w-full">
                {getTranslation(
                  `Request`, // -----> English
                  `Demandes` // -----> French
                  // ``,  // -----> Turkish
                  // ``,  // -----> German
                )}
              </div>
              <div   className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {FriendRequest?.friendRequests?.length === 0 ? (
                  <div style={dark_bg}  className="text-lg text-center col-span-3">
                    {getTranslation(
                      `No invitations at the moment!`, // -----> English
                      `Aucune invitation pour le moment!` // -----> French
                      // ``,  // -----> Turkish
                      // ``,  // -----> German
                    )}
                  </div>
                ) : (
                  FriendRequest?.friendRequests?.map((item, index) => {
                    return (
                      <div key={index} className="col-span-1">
                        <div  style={dark_light_bg}  className="flex flex-col items-center grow p-6 mx-auto w-full text-xs  rounded-[10px]  max-md:px-5 max-md:mt-6">
                          <Link
    className="flex items-center flex-col "
to={`/profile/${item?.friendRequest?.receiver?.id}`}
                          >
                            <img
                              loading="lazy"
                              src={
                                item?.friendRequest?.receiver?.image
                                  ? item?.friendRequest?.receiver.image
                                  : Placeholder
                              }
                              className=" max-w-full rounded-full aspect-square w-[120px]"
                            />
                            <div className="self-center h-16 md:flex items-center justify-center text-center mt-4 text-xl font-medium">
                              {item?.friendRequest?.receiver?.nom}{" "}
                              {item?.friendRequest?.receiver?.prenom}
                            </div>
                          </Link>
                          <div className="flex gap-2 justify-between mt-4 w-full">
                            <div className="flex gap-y-4 gap-x-2 justify-between px-1 font-light whitespace-nowrap">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/576404c583a66cbb5fc431ad30a1cd490dd50b47c1745b9e924980a529366444?"
                                className="shrink-0 w-3.5 aspect-[0.74]"
                                style={dark_img}
                              />
                              <div className="my-auto">Profil</div>
                            </div>
                            <div className="my-auto font-medium">
                              {item.receiverUserProfile?.user?.profil ===
                                "other" &&
                                item?.receiverUserProfile?.other?.profession}
                              {item.receiverUserProfile?.user?.profil ===
                                "player" && "Joueur"}
                              {item.receiverUserProfile?.user?.profil ===
                                "coach" && "Entraineur"}
                              {item.receiverUserProfile?.user?.profil ===
                                "agent" &&
                                item?.receiverUserProfile?.agent
                                  ?.typeresponsable === "players" &&
                                "Manager de Joueur"}
                              {item.receiverUserProfile?.user?.profil ===
                                "agent" &&
                                item?.receiverUserProfile?.agent
                                  ?.typeresponsable === "club" &&
                                "Manager de Club"}
                              {item.receiverUserProfile?.user?.profil ===
                                "scout" && "Scout"}
                            </div>
                          </div>
                          <div className="flex gap-2 justify-between mt-4 w-full whitespace-nowrap">
                            <div className="flex gap-2 font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5eae7f20e92fe11b1e7f70f0906a949d8f8881426a877620d101145fd278e5?"
                                className="shrink-0 w-5 aspect-square"
                                style={dark_img}

                              />
                              <div className="my-auto">
                                {getTranslation(
                                  `Nationality`, // -----> English
                                  `Nationalité` // -----> French
                                  // ``, // -----> Turkish
                                  // ``, // -----> German
                                )}
                              </div>
                            </div>
                            <div className="flex font-medium">
                              <div className="flex font-medium whitespace-nowrap">
                                <span
                                  className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                                    item?.friendRequest?.receiver
                                      ?.countryresidence
                                  )}`}
                                  style={{ marginRight: "8px" }}
                                ></span>
                                <div>
                                  {item?.friendRequest?.receiver?.nationality}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-between mt-4 w-full">
                            <div className="flex gap-2 font-light">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5eae7f20e92fe11b1e7f70f0906a949d8f8881426a877620d101145fd278e5?"
                                className="shrink-0 w-5 aspect-square"
                                style={dark_img}
                              />
                              <div className="">
                                {getTranslation(
                                  `Country of`, // -----> English
                                  `Pays de` // -----> French
                                  // ``, // -----> Turkish
                                  // ``, // -----> German
                                )}
                                <br />
                                {getTranslation(
                                  ` residence`, // -----> English
                                  ` résidence` // -----> French
                                  // ``, // -----> Turkish
                                  // ``, // -----> German
                                )}
                              </div>
                            </div>
                            <div className="flex font-medium whitespace-nowrap">
                              <span
                                className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                                  item?.friendRequest?.receiver
                                    ?.countryresidence
                                )}`}
                                style={{ marginRight: "8px" }}
                              ></span>
                              <div>
                                {
                                  item?.friendRequest?.receiver
                                    ?.countryresidence
                                }
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-between mt-4 text-base font-medium text-white whitespace-nowrap">
                            <button
                              onClick={() => {
                                sendNotification(
                                  item?.friendRequest?.receiver?.id
                                );
                                acceptInvitation(
                                  item?.friendRequest?.receiver?.id
                                );
                              }}
                              className="justify-center px-6 py-2 bg-blue-600 rounded-[30px] max-md:px-5"
                            >
                              {getTranslation(
                                `Accept`, // -----> English
                                `Accepter` // -----> French
                                // ``, // -----> Turkish
                                // ``, // -----> German
                              )}
                            </button>
                            <button
                              onClick={() =>
                                deleteInviation(
                                  item?.friendRequest?.receiver?.id
                                )
                              }
                              className="justify-center px-6 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                            >
                              {getTranslation(
                                `Delete`, // -----> English
                                `Supprimer` // -----> French
                                // ``, // -----> Turkish
                                // ``, // -----> German
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FriendRequest;
