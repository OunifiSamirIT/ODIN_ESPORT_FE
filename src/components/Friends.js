import React, { Component, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Config } from "../config";
import Placeholder from "../assets/placeholder.jpg";
import FriendRequest from "./../pages/Profile/FriendRequest";
import { Context } from "../index";

import { io } from "socket.io-client";
import NotificationService from "../api/notification.server";
import secureLocalStorage from "react-secure-storage";
import CryptoJS from "crypto-js";
import { AuthContext } from "../AuthContext";
function Friends() {
  //initialize socket
  const { checkTokenExpiration } = useContext(AuthContext);

  useEffect(() => {
    checkTokenExpiration();
  }, []);

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
  // const [friendRequests, setFriendRequests] = useState(null);
  const [userpf, setUserpf] = useState(null);

  const [friendRequests, setFriendRequests] = useState([]);
  const {
    _currentLang,
    _setLang,
    getTranslation,
    dark_light_bg,
    dark_fill_svg,
    dark_img,
  } = React.useContext(Context);

  const acceptInvitation = async (id) => {
    const storedUserDataa = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserDataa?.token;
    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${storedUserDatad.id}/acceptFriend/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  };
  const deleteInviation = async (idd) => {
    const storedUserDataa = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserDataa?.token;
    const storedUserData = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const id = storedUserData ? storedUserData.id : null;
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/delete/${idd}`,
      {
        method: "DELETE",
        // credentials: "include",
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
  useEffect(() => {
    // Get user ID from local storage
    const userId = JSON.parse(secureLocalStorage.getItem("cryptedUser"))?.id;
    const storedUserDataa = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserDataa?.token;
    // Fetch user info using user ID
    if (userId) {
      fetch(`${Config.LOCAL_URL}/api/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserpf(data);
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }

    const fetchFriendRequest = async () => {
      const storedUserData = JSON.parse(
        secureLocalStorage.getItem("cryptedUser")
      );
      const id = storedUserData ? storedUserData.id : null;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/user/${id}/getPendingFriends`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      const result = await response.json();

      setFriendRequests(result);
    };

    fetchFriendRequest();
  }, []);

  // const pendingFriendRequests = friendRequests?.receiver || [];

  return (
    <div
      style={dark_light_bg}
      className="card w-100 shadow-xss rounded-md border-0 mb-3"
    >
      <div className="card-body d-flex align-items-center p-4">
        <h4 style={dark_light_bg} className=" mb-0 font-bold text-lg  mr-2">
          {getTranslation(
            `Requests`, // -----> Englais
            `Demandes` //  -----> Francais
          )}
        </h4>
        {/* <span className='ml-2 font-bold text-red-500 bg-slate-300 rounded-full h-8 w-6'><p className='ml-2'>{pendingFriendRequests?.length}</p> </span> */}
        <a
          href="/friends"
          className=" ms-auto text-sm font-medium text-blue-600"
        >
          {getTranslation(
            `See All`, // -----> Englais
            `Voir Tout` //  -----> Francais
          )}
        </a>
      </div>

      {friendRequests?.friendRequests?.length ? (
        friendRequests.friendRequests?.map((item) => (
          <>
            <div className="wrap" key={item?.friendRequest?.receiver?.id}>
              <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
                <Link to={`/profile/${item?.friendRequest?.receiver?.id}`}>
                  <figure className="avatar mb-1 me-3">
                    <img
                      src={
                        item?.friendRequest?.receiver?.image
                          ? item?.friendRequest?.receiver?.image
                          : Placeholder
                      }
                      alt="avater"
                      className="shadow-sm rounded-circle w-16 h-16"
                    />
                  </figure>
                </Link>
                <div>
                  <Link to={`/profile/${item?.friendRequest?.receiver?.id}`}>
                    <h4
                      style={dark_light_bg}
                      className="fw-700  mb-1 font-xssss mt-4"
                    >
                      {item?.friendRequest?.receiver?.nom}{" "}
                      {item?.friendRequest?.receiver?.prenom}
                    </h4>
                  </Link>
                  <h3
                    style={dark_light_bg}
                    className="fw-700 mb-1 font-xssss mt-2"
                  >
                    {item.receiverUserProfile?.user?.profil === "other" &&
                      item?.receiverUserProfile?.other?.profession}
                    {item.receiverUserProfile?.user?.profil === "player" &&
                      "Joueur"}
                    {item.receiverUserProfile?.user?.profil == "coach"
                      ? " Entraineur"
                      : ""}
                    {item.receiverUserProfile?.user?.profil === "agent" &&
                      item?.receiverUserProfile?.agent?.typeresponsable ===
                        "players" &&
                      "Manager de Joueur"}
                    {item.receiverUserProfile?.user?.profil === "agent" &&
                      item?.receiverUserProfile?.agent?.typeresponsable ===
                        "club" &&
                      "Manager de Club"}
                    {item.receiverUserProfile?.user?.profil === "scout" &&
                      "Scout"}{" "}
                  </h3>
                </div>
              </div>

              <div className="card-body d-flex align-items-center pt-0 ps-4 mt-2 pe-4 pb-4">
                <button
                  onClick={() => {
                    sendNotification(item?.friendRequest?.receiver?.id);
                    acceptInvitation(item?.friendRequest?.receiver?.id);
                  }}
                  className="grow justify-center px-6 py-2 mr-3 text-white text-center bg-blue-600 rounded-[30px] max-md:px-5"
                >
                  Accepter
                </button>
                <button
                  onClick={() =>
                    deleteInviation(item?.friendRequest?.receiver?.id)
                  }
                  className="grow justify-center px-6 text-white py-2 text-center bg-orange-500 rounded-[30px] max-md:px-5"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </>
        ))
      ) : (
        <p className="text-center pb-4">Aucune invitation pour le moment.</p>
      )}
    </div>
  );
}

export default Friends;
