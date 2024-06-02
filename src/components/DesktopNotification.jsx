import React, {useState} from 'react'
import ringing from "../assets/ringing2.png"
import bellNotification from "../assets/bellNotification.png";
import noNot from "../assets/noNot.png";
import gsap from "gsap"
import SelfNot from "../components/selfNotification";

export default function DesktopNotification({notificationData, deleteNotData, setnotificationData, NotificationService}) {
     // notification
     let unreadedNotification = notificationData.filter( raw => {
      if(raw.isReaded == "0"){ return raw}
      

     })
  let togglePopupNotification = () => {

    !popupNotificationIsHidden
      ? gsap
          .timeline()
          .to(".desktopPopUpNotificationCon", {
            duration: 0.2,
            // opacity: 0,
            pointerEvents: "none",
            y: 0,
          })
          .to(".loadingNot .loaderCon .inner", {
            duration: 0,
            width: "0%",
          })
          .to(".loadingNot .loaderCon .inner", {
            duration: 0,
            opacity: 1,
          })
          .to(".loadingNot .loaderCon .inner", {
            duration: 0,
            display: "block",
          })
          .to(".desktopPopUpNotificationCon .showAllnot", {
            duration: 0,
            display: "none",
          })
          .to(".desktopPopUpNotificationCon .showAllnot", {
            duration: 0,
            opacity: 0,
          })
      : gsap
          .timeline()
          .to(".desktopPopUpNotificationCon", {
            duration: 0.4,
            ease: "none",

            opacity: 1,
            pointerEvents: "all",
            y: "103%",
          })

          .to(".loadingNot .loaderCon .inner", {
            duration: 0.2,
            width: "100%",
          })
          .to(".loadingNot .loaderCon .inner", {
            duration: 0.1,
            opacity: 0,
          })
          .to(".loadingNot .loaderCon .inner", {
            duration: 0,
            display: "none",
          })
          .to(".desktopPopUpNotificationCon .showAllnot", {
            duration: 0,
            display: "block",
          })
          .to(".desktopPopUpNotificationCon .showAllnot", {
            duration: 0.1,
            opacity: 1,
          });

    setPopupNotificationHidden(!popupNotificationIsHidden);
  };

  let [popupNotificationIsHidden, setPopupNotificationHidden] = useState(true);

  return (
    <span className="max-sm:hidden md:flex notificationOuterContainer -translate-x-6 -translate-y-1">
    <div style={{
      display: notificationData.length ? "flex": "none"
    }} className="countableContainer ">
      {unreadedNotification.length}
    </div>
    <div className="notifyContainer" style={{
    minWidth: 300,
    right: 50


    }}>
      <img src={ringing} alt="" />
    vous avez une nouvelle notification
    </div>
    <div
      className="notificationCon "
      // style={
      //   notificationData.length > 0
      //     ? {
      //         backgroundColor: "#2563eb",
      //         border: " none",
      //       }
      //     : {
      //         backgroundColor: "#2563eb00",
      //         boxShadow: " 0 0 12px -1px #2563eb00",
      //         border: " 1px solid #bbb",
      //       }
      // }
    >
      <div className="imgcon " onClick={togglePopupNotification}>
        <img
          // style={{
          //   filter:
          //     notificationData.length > 0
          //       ? "invert(1)"
          //       : "invert(0.5)",
          // }}
          className="bellImageBlueX21Notification"
          src={bellNotification}
          alt=""
        />
      </div>
    
    </div>
  </span>  )
}