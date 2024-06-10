import React, {useState} from 'react'
import ringing from "../assets/ringing2.png"
import bellNotification from "../assets/bellNotification.png";
import noNot from "../assets/noNot.png";
import gsap from "gsap"
import SelfNot from "../components/selfNotification";

export default function MobileNotification({popupNotificationIsHidden,setPopupNotificationHidden,  setHumberger, notificationData, deleteNotData, setnotificationData, NotificationService, setMobileNotificationPopUpContainer}) {

  
     // notification

     let unreadedNotification = notificationData.filter( raw => {
      if(raw.isReaded == "0"){ return raw }
      

     })
     let togglePopupNotification = () => {
      
      if (!popupNotificationIsHidden) 
        {
       
        gsap
            .timeline()
            .to(".mobilePopUpNotificationCon", {
              duration: 0.2,
              opacity: 0,
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
            .to(".mobilePopUpNotificationCon .showAllnot", {
              duration: 0,
              display: "none",
            })
            .to(".mobilePopUpNotificationCon .showAllnot", {
              duration: 0,
              opacity: 0,
              onComplete: () => {
        setMobileNotificationPopUpContainer(false)
  
              }
            })
          }
          else {
            
            setHumberger(false)
            setMobileNotificationPopUpContainer(true)
            setTimeout(() => {
              gsap
              .timeline()
              .to(".mobilePopUpNotificationCon", {
                duration: 0.2,
    
                opacity: 1,
                pointerEvents: "all",
                y: 5,
    
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
              .to(".mobilePopUpNotificationCon .showAllnot", {
                duration: 0,
                display: "block",
              })
              .to(".mobilePopUpNotificationCon .showAllnot", {
                duration: 0.1,
                opacity: 1,
              });
    
            }, 500)
          }
  
      setPopupNotificationHidden(!popupNotificationIsHidden);
  
    };


  return (
    <span className="max-sm:flex md:hidden notificationOuterContainer -translate-x-6 -translate-y-0 ">
    <div style={{
      display: notificationData.length ? "flex": "none"
    }} className="countableContainer ">
      {unreadedNotification.length}
    </div>
    <div className="notifyContainer" style={{
      transform: "scale(.95) ",
      right: -70,
      top: 40,
      minWidth: "300px"
    }}>
      <img src={ringing} alt="" />
    Vous avez une nouvelle notification
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
      <div className="imgcon" onClick={togglePopupNotification}>
        <img
          // style={{
          //   filter:
          //     notificationData.length > 0
          //       ? "invert(1)"
          //       : "invert(0.5)",
          // }}
          className='bellImageBlueX21Notification'
          src={bellNotification}
          alt=""
        />
      </div>
      
    </div>
  </span>  )
}
