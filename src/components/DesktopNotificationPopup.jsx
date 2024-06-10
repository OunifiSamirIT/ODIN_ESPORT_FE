import React, { useState } from "react";
import noNot from "../assets/noNot.png";
import SelfNot from "./selfNotification";
import { Context } from "../index";

export default function DesktopNotificationPopup({
  notificationData,
  deleteNotData,
  setnotificationData,
  NotificationService,
  activeBtn, setActiveBtn,
  getNotificationForCurrentUser
}) {
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  return (
    <div className="max-sm:hidden md:flex desktopPopUpNotificationCon">
      <div className="loadingNot">
        <div className="loaderCon">
          <div className="inner"></div>
        </div>
      </div>
      <div className="showAllnot">
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
          {/* <button
          onClick={() => {
            setnotificationData([]);
            NotificationService.deleteAll();
          }}
        > 
          Supprimer tous
        </button> */}
        </header>
        {notificationData.length > 0 ? (
          <>
            {notificationData.map((oneNotData) => {
              return (
                <SelfNot
                  key={oneNotData.id}
                  deleteNotContent={deleteNotData}
                  notData={oneNotData}
                  getNotificationForCurrentUser={getNotificationForCurrentUser}
                ></SelfNot>
              );
            })}
            <div className="h-[15px]"></div>
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
