import React, { useEffect, useState } from "react";
import notificationIcon from "../assets/usernot.png";
import remove from "../assets/remove.png";
import arrow from "../assets/down-arrow.png";
import gsap from "gsap";
import { Config } from "../config";
import blueRequest from "../assets/blueRequest.png";
import greenRequest from "../assets/greenRequest.png";
import NotificationService from "../api/notification.server";
import campImg from "../assets/campImg.png";
import challengeImg from "../assets/challengeImg.png";
import eventImg from "../assets/eventImg.png";
import { Context } from "../index";

import postContentImg from "../assets/postContentImg.png";
import campContentImg from "../assets/campContentImg.png";
import notContentPlay from "../assets/notContentplay.png";
import eventContentImg from "../assets/eventContentImg.png";
import { Navigate } from 'react-router-dom';

export default function SelfNot({
  deleteNotContent,
  notData,
  getNotificationForCurrentUser,
}) {
  let [isNotificationOppened, setPopupNotIsOpened] = useState(false);
  let uniqueClass = (Math.random() + 1)
    .toString(32)
    .substring(2)
    .replace(/[0-9]/g, "");
  console.log("uniqueClass", uniqueClass);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [currentUser, setCurrentUser] = useState([])
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user)
  }, [])
  let moreNotContent = () => {
    gsap
      .timeline()
      .to(`.SelfNotification.${uniqueClass} .content`, {
        duration: 0.3,
        height: isNotificationOppened ? 15 : "auto",
      })
      .to(`.SelfNotification.${uniqueClass} .inner ~ .arrowcon .notarrow`, {
        duration: 0.3,

        rotate: isNotificationOppened ? "0deg" : "180deg",
      });
    setPopupNotIsOpened(!isNotificationOppened);
  };

  let time = notData.createdAt.split("T")[1].split(".")[0];
  let date = notData.createdAt.split("T")[0];
  let [isDeleteButtonAppear, setShowHideDeleteBtnStatus] = useState(false);

  let showHideDeltebtn = () => {
    gsap.to(`.SelfNotification.${uniqueClass} .inner`, {
      x: isDeleteButtonAppear ? 0 : -124,
    });
    setShowHideDeleteBtnStatus(!isDeleteButtonAppear);
  };
  let deleteSelfNot = () => {
    gsap
      .timeline()
      .to(`.SelfNotification.${uniqueClass}`, {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
      })
      .to(`.SelfNotification.${uniqueClass}`, {
        display: "none",
        onComplete: () => {
          deleteNotContent(notData.id);
        },
      });
  };
  function getLink() {
    const url = {

      LOCAL_URL :  'http://localhost:3000',
      HOST_URL :  'https://odinesport.com/home',
  }
    if (notData.forWichAction == "share" ||
    notData.forWichAction == "like" ||
    notData.forWichAction == "comment" ||
    notData.forWichAction == "reply" ||
    notData.forWichAction == "likeComment") {
      return  url.LOCAL_URL + "/onepost/" + notData.postId
    }
    
    if(
    
      notData.forWichAction == "AcceptRequest") {
        return  url.LOCAL_URL + "/profile/" + notData.fromUser_id
      }
      if(
        notData.forWichAction == "AddRequest" ) {
          return  url.LOCAL_URL + "/friends/" 
        }
    if(
    notData.forWichAction == "likeChallenge" ||
    notData.forWichAction == "commentChallenge"||
    notData.forWichAction == "voteChallenge"||
    notData.forWichAction == "likeCommentChallenge") {
      return  url.LOCAL_URL + "/challenges/details/" + notData.postId
    }

    if (notData.forWichAction == "camp" ) {
      return  url.LOCAL_URL + "/defaultgroup/" 
    }   
    if (notData.forWichAction == "challenge" ) {
      return  url.LOCAL_URL + "/challenges"
    } 
    if (notData.forWichAction == "event" ) {
      return  url.LOCAL_URL + "/defaultgroupEvents/" 
    }  
  }
  return (
    <div
      className={`SelfNotification ${uniqueClass}`}
      onClick={() => {
        NotificationService.setNotificationReaded(notData.id);
        getNotificationForCurrentUser();
        window.open(getLink(), '_blank')
      }}
    >
      <div className="innercon">
        <div className="inner">
          {notData.forWichAction != "camp" &&
            notData.forWichAction != "challenge" &&
            notData.forWichAction != "event" && (
              <img
                className="userImg"
                src={
                  notData.fromUser_image
                }
                alt=""
              />
            )}

          {notData.forWichAction == "camp" && (
            <img className="userImg" src={campImg} alt="" />
          )}

          {notData.forWichAction == "challenge" && (
            <img className="userImg" src={challengeImg} alt="" />
          )}
          {notData.forWichAction == "event" && (
            <img className="userImg" src={eventImg} alt="" />
          )}

          <div className="content">
            {notData.forWichAction != "camp" &&
              notData.forWichAction != "challenge" &&
              notData.forWichAction != "event" && (
                <div className="userName">
                  {notData.fromUser_id == currentUser.id
                    ? "Tu"
                    : notData.fromUser_name}
                </div>
              )}
            <div>
              {notData.forWichAction == "like" && (
                <span>
                  {" "}
                  <span className="font-bold">{getTranslation(

                    "Liked",
                    "A aimé"
                  )} </span>{getTranslation(

"your post",
"votre publication"
)} 
                </span>
              )}

              {notData.forWichAction == "camp" && (
                <span>
                  {" "}
                  <span className="font-bold">Camp </span> 
                  {getTranslation(

"available",
"disponible"
)}
                  {" "}
                  <span className="font-bold"> "{notData.content}"</span>{" "}
                </span>
              )}

              {notData.forWichAction == "challenge" && (
                <span>
                  {" "}
                  <span className="font-bold">Challenge</span>   {getTranslation(

"available",
"disponible"
)}{" "}
                  <span className="font-bold"> "{notData.content}" </span>{" "}
                </span>
              )}
              {notData.forWichAction == "likeChallenge" && (
                <span>
                  {" "}
                  <span className="font-bold"> {getTranslation(
                'Liked ',
                "A aimé "
              )}</span>{getTranslation(

"for your entry in the ",
"votre participation au "
)}
                  {" "}
                  <span className="font-bold"> "Challenge {notData.content}" </span>{" "}
                </span>
              )}

              {notData.forWichAction == "commentChallenge" && (
                <span>
                  {" "}
                  <span className="font-bold">{getTranslation(
                    "Commented ",
                    "A commenté "
                  )}</span>{getTranslation(

"for your entry in the ",
"votre participation au "
)}{" "}
                  <span className="font-bold"> "Challenge {notData.content}" </span>{" "}
                </span>
              )}
              {notData.forWichAction == "voteChallenge" && (
                <span>
                  {" "}
                  <span className="font-bold">{getTranslation(
                    "Voted ",
                    "A voté "
                  )}</span>{getTranslation(

"for your entry in the ",
"votre participation au "
)}
                  {" "}
                  <span className="font-bold"> "Challenge {notData.content}" </span>{" "}
                </span>
              )}
              {notData.forWichAction == "likeCommentChallenge" && (
                <span>
                  {" "}
                  <span className="font-bold"> {getTranslation(
                'Liked "',
                "A aimé "
              )}</span> {getTranslation(

"your comment at your entry in the ",
"votre commentaire a participation au "
)}
                  {" "}
                  <span className="font-bold"> "Challenge {notData.content}" </span>{" "}
                </span>
              )}
              {notData.forWichAction == "event" && (
                <span>
                  {" "}
                  <span className="font-bold">Odin event</span>  {getTranslation(

"available",
"disponible"
)}{" "}
                  <span className="font-bold"> "{notData.content}" </span>{" "}
                </span>
              )}
              {notData.forWichAction == "likeComment" && (
                <span>
                  <span>
                    {" "}
                    <span className="font-bold">{getTranslation(
                      "Liked",
                      "A aimé"
                    )}</span> {getTranslation(
                      "Your comment:",
                      "votre commentaire:"
                    )}
                  </span>{" "}
                  <span className="font-bold">
                    {" "}
                    {notData.content.substring(0, 10)}...{" "}
                  </span>
                </span>
              )}

              {notData.forWichAction == "comment" && (
                <span>
                  <span>
                    {" "}
                    <span className="font-bold">{
                      getTranslation(
                        "Commented ",
                        "A commenté "
                      )
                    } </span> {getTranslation(
                      "your post:",
                      "votre publication:"
                    )}
                  </span>{" "}
                  <span className="font-bold">
                    {" "}
                    {notData.content.substring(0, 10)}...
                  </span>
                </span>
              )}

              {notData.forWichAction == "reply" && (
                <span>
                  <span>
                    {" "}
                    <span className="font-bold">{getTranslation(
                      "Replyed ",
                      "A répondu "
                    )}</span>{
                      getTranslation(
                        "Your comment",
                        "votre commentaire:"
                      )
                    }
                  </span>{" "}
                  <span className="font-bold">
                    {" "}
                    {notData.content.substring(0, 10)}...
                  </span>
                </span>
              )}

              {notData.forWichAction == "AcceptRequest" && (
                <span>
                  <span>
                    {" "}
                    <span className="font-bold">{getTranslation(
                      "Accepted",
                      "A accepté"
                    )}</span> {getTranslation(" your invitation",
                    " votre invitation"
                    )}
                  </span>
                </span>
              )}
              {notData.forWichAction == "AddRequest" && (
                <span>
                  <span>
                    {" "}
                    <span className="font-bold">{getTranslation
                    ("Sent ", "A envoyé ")}</span> {getTranslation("you an invitation", "à vous une invitation")}
                  </span>
                </span>
              )}
              {notData.forWichAction == "share" && (
                <span>
                  <span>
                    {" "}
                    <span className="font-bold"> {getTranslation(
                      'Shared ',
                      "A partagé "
                    )}  </span> {getTranslation(
                      'your post.',
                      'votre publication.'
                    )}
                  </span>
                </span>
              )}
            </div>
            <div className="timeNotCon text-[#9E9E9E]">
              {time.split(":")[0] + ":" + time.split(":")[1]}
            </div>
          </div>
          {/* <img src={remove} alt="" onClick={showHideDeltebtn}/> */}
          {/* <button onClick={deleteSelfNot}>Delete</button> */}
        </div>
        <div
          className="postImageAndStatusCon"
          style={{
            width: 80,
            margin: "10px 25px 10px 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {(notData.forWichAction == "like" ||
            notData.forWichAction == "share" ||
            notData.forWichAction == "comment"||
            notData.forWichAction == "likeComment"||
            notData.forWichAction == "replyComment") && (

<>
{
  (notData.actionId == 0 && notData.postImage == "") &&
  <div className="relative flex justify-center items-center  w-[50px] h-[50px]">
  <img
    src={postContentImg}
    alt=""
    
    className="absolute"

    style={{
      borderRadius: 5,
      // filter: "blur(2px)",
      marginBottom: 7,
      marginTop: 7,
      filter: "brightness(0) ",
      opacity: .1
    }}
  />
  <img
    src={notContentPlay}
    alt=""
    className="absolute"
    style={{
      // filter: "blur(2px)",
      marginBottom: 7,
      marginTop: 7,
      width: 20
    }}
  />
</div>

}

{
  notData.postImage  &&
  <img
  loading="lazy"
  src={notData.postImage.indexOf(';') > -1 ? notData.postImage.split(';')[0] : notData.postImage }
  alt=""
  style={{
    borderRadius: 5,
  }}
/>

}
            
</>

            
          )}
          {notData.forWichAction == "camp" && (
            <img
              src={campContentImg}
              alt=""
              style={{
                borderRadius: 5,
                // filter: "blur(2px)",
                marginBottom: 7,
                marginTop: 7,
              }}
            />
          )}
          {(notData.forWichAction == "challenge" ||
            notData.forWichAction == "likeChallenge" ||
            notData.forWichAction == "commentChallenge" ||
            notData.forWichAction == "voteChallenge" ||
            notData.forWichAction == "likeCommentChallenge") && (
            <div className="relative flex justify-center items-center  w-[50px] h-[50px]">
              <img
                src={postContentImg}
                alt=""
                
                className="absolute"

                style={{
                  borderRadius: 5,
                  // filter: "blur(2px)",
                  marginBottom: 7,
                  marginTop: 7,
                  filter: "brightness(0) ",
                  opacity: .1
                }}
              />
              <img
                src={notContentPlay}
                alt=""
                className="absolute"
                style={{
                  // filter: "blur(2px)",
                  marginBottom: 7,
                  marginTop: 7,
                  width: 20
                }}
              />
            </div>
          )}
          {notData.forWichAction == "event" && (
            <img
              src={eventContentImg}
              alt=""
              style={{
                borderRadius: 5,
                // filter: "blur(2px)",
                marginBottom: 7,
                marginTop: 7,
              }}
            />
          )}
          {notData.forWichAction == "AddRequest" && (
            <img
              src={blueRequest}
              style={{
                width: 30,
              }}
            />
          )}
          {notData.forWichAction == "AcceptRequest" && (
            <img
              src={greenRequest}
              style={{
                width: 30,
              }}
            />
          )}
          {notData.isReaded == 0 && (
            <div className="orangeStatusIsReaded"></div>
          )}
        </div>
      </div>
      <div className="endline"></div>
    </div>
  );
}

//   const Oldnot = () => (

//   <div className="innercon">
//   <div className="inner">
//     <img className='userImg' style={{
//      borderRadius: "50%"
//     }} src={notData.fromUser_image ? Config.LOCAL_URL+notData.fromUser_image : notificationIcon} alt="" />
//    <div className="content">
//      <p>
//        <span className="userName">{notData.fromUser_id == currentUser.id ? "Tu" : notData.fromUser_name }</span>
//          {" "}
//        {notData.forWichAction == "like" && `faire une j'aime ❤️ pour ${notData.fromUser_id == currentUser.id ? "un" : "votre" } article.`}
//        {notData.forWichAction == "likeComment" && `faire une j'aime ❤️ pour ${notData.fromUser_id == currentUser.id ? "un" : "votre" } commentaire "${notData.content}"`}
//        {notData.forWichAction == "comment" && `faire une commentaire 💬 "${notData.content}" pour ${notData.fromUser_id == currentUser.id ? "un" : "votre" } article.`}
//        {notData.forWichAction == "reply" && `replyed 💬 "${notData.content}" pour votre commentaire .`}
//        {notData.forWichAction == "share" && `faire une partage 🔗 pour ${notData.fromUser_id == currentUser.id ? "un" : "votre" } article.`}
//      </p>
//    </div>
//    <img src={remove} alt="" onClick={showHideDeltebtn}/>
//    <button onClick={deleteSelfNot}>Delete</button>
//   </div>
//    <div className="arrowcon">
//      <div className="timeNotCon">{time+ " "+ date}</div>
//      {/* <div className="OpenBtn">Ouvrir</div> */}
//      <img src={arrow} className="notarrow" alt="" onClick={moreNotContent} />
//    </div>
//  </div>) ;