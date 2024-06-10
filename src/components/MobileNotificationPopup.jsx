import React from "react";

import noNot from "../assets/noNot.png";
import SelfNot from "./selfNotification";
import { Context } from "../index";

export default function MobileNotificationPopup({
  notificationData,
  deleteNotData,
  setnotificationData,
  NotificationService,
  activeBtn, setActiveBtn,
  getNotificationForCurrentUser 

}) {

  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  return (
    <div
      className="mobilePopUpNotificationCon  
  "
    >
      <div className="loadingNot">
        <div className="loaderCon">
          <div className="inner"></div>
        </div>
      </div>
      <div className="showAllnot ">
        <header>
          <h1>{notificationData.length} Notification</h1>

          <div className="filterContainer">
            <button
              style={
                activeBtn
                  ? {
                      backgroundColor: "#2E71EB40",
                      color: "#2E71EB",
                    }
                  : {}
              }
              onClick={() => {
                setActiveBtn(true);
              }}
            >
              {getTranslation(
                "All",
                "tous"
              )}
            </button>
            <button
              style={
                !activeBtn
                  ? {
                      backgroundColor: "#2E71EB40",
                      color: "#2E71EB",
                    }
                  : {}
              }
              onClick={() => {
                setActiveBtn(false);
              }}
            >
              {getTranslation(
                "Unread",
                "Non lu"
              )}
            </button>
          </div>
        </header>
        {notificationData.length > 0 ? (
          <>
            {notificationData.map((oneNotData) => {
              return (
                <SelfNot
                  key={oneNotData.id}
                  deleteNotData={deleteNotData}
                  notData={oneNotData}
                  getNotificationForCurrentUser={getNotificationForCurrentUser} 

                ></SelfNot>
              );
            })}
          </>
        ) : (
          <div className="noNot">
            <img src={noNot} alt="" />
            <p>{getTranslation(
              "no notifications",
              "aucune notification"
            )}</p>
          </div>
        )}
      </div>
    </div>
  );
}
