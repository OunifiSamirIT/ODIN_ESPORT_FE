// import React, { Component, Fragment, useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import Post from "../../components/Post";
// import Albumsadmin from "../../components/Albumsadmin";
// import Header from "../../components/Header2";
// import Leftnav from "../../components/Leftnav";
// import Rightchat from "../../components/Rightchat";
// import Appfooter from "../../components/Appfooter";
// import Popupchat from "../../components/Popupchat";
// import LeftMenu from "../../components/HomePage/LeftMenuHomePage";
// import RightMenu from "../../components/RightMenu";
// import Friends from "../../components/Friends";
// import Contacts from "../../components/Contacts";
// import Group from "../../components/Group";
// import Events from "../../components/Events";
// import Createpost from "../../components/Createpost";
// import Memberslider from "../../components/Memberslider";
// import Friendsilder from "../../components/Friendsilder";
// import Storyslider from "../../components/Storyslider";
// import Postview from "../../components/Postview";
// import Load from "../../components/Load";
// import Profilephoto from "../../components/Profilephoto";
// import TextInput from "../../components/TextInput";
// import CustomButton from "../../components/CustomButton";
// import { BsFiletypeGif, BsPersonFillAdd, BsTypeH1 } from "react-icons/bs";
// import placeholder from "../../assets/placeholder.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Config } from "../../config";
// import {
//   BiEditAlt,
//   BiHeart,
//   BiImages,
//   BiLike,
//   BiMessageRounded,
//   BiSend,
//   BiSolidCommentCheck,
//   BiSolidHeart,
//   BiSolidSend,
//   BiSolidVideo,
//   BiLogInCircle,
//   BiUndo,
// } from "react-icons/bi";
// import Loading from "../../components/Loading";
// import {
//   Link,
//   Navigate,
//   useNavigate,
//   useLocation,
//   json,
// } from "react-router-dom";

// import AdminImg from "../../assets/ODIN22.png";
// import SkeletonArticleCard from "./HomeSkeletonPost";
// import CreatePost from "../../components/CreatePostss";
// import CreatePostModal from "../../components/CreatePostModal";
// import Card from "./../Challenge/Component/Card";
// import { Context } from "../../index";
// import secureLocalStorage from "react-secure-storage";
// import CryptoJS from "crypto-js";
// function Home() {
//   const { dark_bg } = React.useContext(Context);

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [eventHasMore, setEventHasMore] = useState(true);
//   const [articles, setArticles] = useState([]);

//   const addNewArticle = (newArticle) => {
//     setArticles([newArticle, ...articles]);
//   };
//   let onDeleteFromListAcceuillFront = function (id) {
//     setData([]);
//     setP(0);
//     fetchData(sizeOfPostsToget, p);
//   };

//   let elementRef = useRef(null);
//   const [product, setProduct] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [p, setP] = useState(0);
//   let sizeOfPostsToget = 10;
//   let fetchMoreItems = async () => {
//     fetchData(sizeOfPostsToget, p);
//   };
//   function onIntersection(entries) {
//     const firstEntry = entries[0];
//     if (firstEntry.isIntersecting && hasMore) {
//       fetchMoreItems();
//     }
//   }
//   useEffect(() => {
//     const observer = new IntersectionObserver(onIntersection);

//     setTimeout(() => {
//       setLoading(false);
//     }, 500);

//     if (observer && elementRef.current) {
//       observer.observe(elementRef.current);
//     }
//     return () => {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [data]);

//   const fetchAlbums = async (size, page) => {
//     try {
//       const response = await fetch(
//         `${Config.LOCAL_URL}/api/album?size=${size}&page=${page}`
//       );
//       const result = await response.json();
//       if (!result.data) {
//         setEventHasMore(false);
//       }

//       return result.data;
//     } catch (error) {
//       console.error("Error fetching albums:", error);
//     }
//   };
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     const hours = String(d.getHours()).padStart(2, "0");
//     const minutes = String(d.getMinutes()).padStart(2, "0");
//     const seconds = String(d.getSeconds()).padStart(2, "0");

//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
//   };

//   const fetchData = async (size, page) => {
//     try {
//       // Fetch articles (posts) and albums
//       const articlesResponse = await fetchArticles(size, page);

//       // Parse createdAt for articles
//       const parsedArticles = articlesResponse.map((article) => {
//         // Assuming createdAt is in mm-dd-yyyy format, split and rearrange the date
//         const [month, day, year] = article.createdAt.split("T");
//         const formattedDate = `${day}-${month}-${year}`;
//         let time = article.createdAt.split("T")[1].split(".")[0];
//         let dt = article.createdAt.split("T")[0].split("-");
//         let correctDT = dt[2] + "-" + dt[1] + "-" + dt[0];
//         //

//         return {
//           ...article,
//           createdAt: formatDate(article.createdAt),
//         };
//       });

//       // Combine articles and albums into a single array
//       const combinedData = [...data, ...parsedArticles];

//       setP((prevPage) => prevPage + 1);

//       // Update state with sorted data
//       setData(combinedData);

//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const fetchArticles = async (size, page) => {
//     try {
//       const response = await fetch(
//         `${Config.LOCAL_URL}/api/articles?size=${size}&page=${page}`
//       );
//       const result = await response.json();

//       if (result.rows == 0) {
//         setHasMore(false);
//       }
//       const articlesWithPromises = result.rows.map(async (article) => {
//         const userId = article.userId;
//         const comt = article.id;

//         const [userDataResponse, commentsResponse, likesCountResponse] =
//           await Promise.all([
//             fetch(`${Config.LOCAL_URL}/api/user/${userId}`).then((res) =>
//               res.json()
//             ),
//             fetch(`${Config.LOCAL_URL}/api/commentaires/article/${comt}`).then(
//               (res) => res.json()
//             ),
//             fetch(`${Config.LOCAL_URL}/api/likes/article/allLikes`).then(
//               (res) => res.json()
//             ),
//           ]);

//         const likesCount = likesCountResponse.find(
//           (count) =>
//             count.articleId === article.articleId ||
//             count.articleId === article.id
//         );

//         return {
//           ...article,
//           user: userDataResponse,
//           comments: commentsResponse.commentsData,
//           commentsCount: commentsResponse.commentCount,
//           likesCount: likesCount ? likesCount.likesCount : 0,
//         };
//       });

//       const reversedArticlesWithPromises = articlesWithPromises; // Reverse the order

//       const articlesWithLikesCount = await Promise.all(
//         reversedArticlesWithPromises
//       );

//       return articlesWithLikesCount;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // challange event
//   const [challenges, setChallenges] = useState([]);
//   const fetchChallenges = async () => {
//     const response = await fetch(`${Config.LOCAL_URL}/api/challenges`);
//     const result = await response.json();
//     console.log(result);
//     setChallenges(result.challenges);
//   };
//   useEffect(() => {
//     console.log(challenges);
//     fetchChallenges();
//   }, []);
//   const decryptString = (encryptedText, secret) => {
//     try {
//       const ciphertext = CryptoJS.enc.Hex.parse(encryptedText);
//       const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000"); // Assurez-vous que cela correspond à l'IV utilisé côté serveur
//       const decrypted = CryptoJS.AES.decrypt(
//         { ciphertext: ciphertext },
//         CryptoJS.enc.Hex.parse(secret),
//         { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
//       );
//       return decrypted.toString(CryptoJS.enc.Utf8);
//     } catch (error) {
//       console.error("Decryption error:", error);
//       return null;
//     }
//   };

//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem("Secret"));
//     let idd = storedUserData.id;
//     const decryptedId = decryptString(
//       idd,
//       process.env.REACT_APP_ENCRYPTION_SECRET
//     );
//     const id = decryptedId ? decryptedId : null;
//     console.log(id, "alooo idddd");
//     if (id) {
//       fetch(`${Config.LOCAL_URL}/api/user/${id}`)
//         .then((response) => response.json())
//         .then((userData) => {
//           setUser(userData);
//         })
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, []);

//   const storedUserData = JSON.parse(localStorage.getItem("Secret"));
//   const idd = storedUserData.id;
//   const decryptedId = decryptString(
//     idd,
//     process.env.REACT_APP_ENCRYPTION_SECRET
//   );
//   console.log(storedUserData, "User data______________");

//   const id = decryptedId ? decryptedId : null;
//   console.log(id, "alooo id 2222");

//   const userProfileType = storedUserData ? storedUserData.profil : null;

//   const shouldHideForProfiles = ["other", "player"];
//   const shouldShowAgentItem = ["player"].includes(userProfileType);

//   const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

//   const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

//   return (
//     <>
//       {/* <Header />
//        */}

//       <div style={dark_bg} className="flex flex-col pb-20 ">
//         <Header />
//         <div className="self-center px-3 md:px-1  mt-24 w-full  max-w-[1280px] max-md:mt-10 max-md:max-w-full">
//           <div className="flex relative gap-3 max-md:flex-col max-md:gap-0 ">
//             {/* left menu */}
//             <LeftMenu
//               id={id}
//               shouldShowAgentItem={shouldShowAgentItem}
//               shouldShowForProfile={shouldShowForProfile}
//               setEventTogglerIsOpenned={setEventTogglerIsOpenned}
//               eventTogglerIsOpenned={eventTogglerIsOpenned}
//               user={user}
//               userProfileType={userProfileType}
//             />

//             {/* left menu */}

//             {/* create post */}
//             <div className="flex md:w-[50%]  flex-col">
//               <div className="flex flex-1 flex-col">
//                 <CreatePostModal
//                   fetchDataOnbegin={() => {
//                     setData([]);
//                     setP(0);
//                     fetchData(sizeOfPostsToget, p);
//                   }}
//                 />

//                 {loading &&
//                   // Render skeleton loading effect while data is being fetched
//                   Array(10)
//                     .fill()
//                     .map((_, index) => <SkeletonArticleCard key={index} />)}

//                 <div>
//                   {/* <div className="bg-white rounded-md shadow-md  h-[450px] mb-6">
//   {(() => {
//     const item = challenges[challenges.length - 1]; // Get the last item in the array
//     return (
//       <div key={item?.id}>
//           <video
//                           controls
//                           className=" w-100 md:max-h-[350px] max-h-[350px]"
//                         >
//                           <source src={item?.video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//         {item?.description.length > 100
//           ? item?.description.slice(0, 100) + '...'
//           : item?.description}
//       </div>
//     );
//   })()}
// </div> */}

//                   {data.map((item, index) => (
//                     <div key={`item-${index}`}>
//                       {
//                         <Post
//                           onDeleteFromListAcceuillFront={() => {
//                             onDeleteFromListAcceuillFront(id);
//                           }}
//                           article={item}
//                           setArticles={setData}
//                         />
//                       }
//                     </div>
//                   ))}
//                   {hasMore ? (
//                     <div ref={elementRef}>
//                       <Load />{" "}
//                     </div>
//                   ) : (
//                     <div className=" w-6 h-1 bg-blue-600 rounded-full mt-3 mx-auto"></div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* start right cont */}
//             <RightMenu />
//             {/* end right cont */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;
import React, {
  Component,
  Fragment,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { useForm } from "react-hook-form";
import Post from "../../components/Post";
import Albumsadmin from "../../components/Albumsadmin";
import Header from "../../components/Header2";
import Leftnav from "../../components/Leftnav";
import Rightchat from "../../components/Rightchat";
import Appfooter from "../../components/Appfooter";
import Popupchat from "../../components/Popupchat";
import LeftMenu from "../../components/HomePage/LeftMenuHomePage";
import RightMenu from "../../components/RightMenu";
import Friends from "../../components/Friends";
import Contacts from "../../components/Contacts";
import Group from "../../components/Group";
import Events from "../../components/Events";
import Createpost from "../../components/Createpost";
import Memberslider from "../../components/Memberslider";
import Friendsilder from "../../components/Friendsilder";
import Storyslider from "../../components/Storyslider";
import Postview from "../../components/Postview";
import Load from "../../components/Load";
import Profilephoto from "../../components/Profilephoto";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd, BsTypeH1 } from "react-icons/bs";
import placeholder from "../../assets/placeholder.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../config";
import {
  BiEditAlt,
  BiHeart,
  BiImages,
  BiLike,
  BiMessageRounded,
  BiSend,
  BiSolidCommentCheck,
  BiSolidHeart,
  BiSolidSend,
  BiSolidVideo,
  BiLogInCircle,
  BiUndo,
} from "react-icons/bi";
import Loading from "../../components/Loading";
import {
  Link,
  Navigate,
  useNavigate,
  useLocation,
  json,
} from "react-router-dom";

import AdminImg from "../../assets/ODIN22.png";
import SkeletonArticleCard from "./HomeSkeletonPost";
import CreatePost from "../../components/CreatePostss";
import CreatePostModal from "../../components/CreatePostModal";
import Card from "./../Challenge/Component/Card";
import { Context } from "../../index";
import secureLocalStorage from "react-secure-storage";
import { AuthContext } from "../../AuthContext";
function Home() {
  const { dark_bg } = React.useContext(Context);
  const { checkTokenExpiration } = useContext(AuthContext);

  useEffect(() => {
    checkTokenExpiration();
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventHasMore, setEventHasMore] = useState(true);
  const [articles, setArticles] = useState([]);

  const addNewArticle = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };
  let onDeleteFromListAcceuillFront = function (id) {
    setData([]);
    setP(0);
    fetchData(sizeOfPostsToget, p);
  };

  let elementRef = useRef(null);
  const [product, setProduct] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [p, setP] = useState(0);
  let sizeOfPostsToget = 10;
  let fetchMoreItems = async () => {
    fetchData(sizeOfPostsToget, p);
  };
  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data]);

  const fetchAlbums = async (size, page) => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/album?size=${size}&page=${page}`
      );
      const result = await response.json();
      if (!result.data) {
        setEventHasMore(false);
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const fetchData = async (size, page) => {
    try {
      // Fetch articles (posts) and albums
      const articlesResponse = await fetchArticles(size, page);

      // Parse createdAt for articles
      const parsedArticles = articlesResponse.map((article) => {
        // Assuming createdAt is in mm-dd-yyyy format, split and rearrange the date
        const [month, day, year] = article.createdAt.split("T");
        const formattedDate = `${day}-${month}-${year}`;
        let time = article.createdAt.split("T")[1].split(".")[0];
        let dt = article.createdAt.split("T")[0].split("-");
        let correctDT = dt[2] + "-" + dt[1] + "-" + dt[0];
        //

        return {
          ...article,
          createdAt: formatDate(article.createdAt),
        };
      });

      // Parse createdAt for albums

      // Combine articles and albums into a single array
      const combinedData = [...data, ...parsedArticles];

      setP((prevPage) => prevPage + 1);

      // Sort the combined array by createdAt
      // combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // let combinedDataTemps = combinedData.sort((a, b) => new Date(b.temps) - new Date(a.temps));
      //

      // Update state with sorted data
      setData(combinedData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchArticles = async (size, page) => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/articles?size=${size}&page=${page}`
      );
      const result = await response.json();

      if (result.rows == 0) {
        setHasMore(false);
      }
      const articlesWithPromises = result.rows.map(async (article) => {
        const userId = article.userId;
        const comt = article.id;

        const storedUserData = JSON.parse(localStorage.getItem("Secret"));
        const tokenn = storedUserData.token;
        const [userDataResponse, commentsResponse, likesCountResponse] =
          await Promise.all([
            fetch(`${Config.LOCAL_URL}/api/user/${userId}`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenn}`,
              },
            }).then((res) => res.json()),
            fetch(`${Config.LOCAL_URL}/api/commentaires/article/${comt}`).then(
              (res) => res.json()
            ),
            fetch(`${Config.LOCAL_URL}/api/likes/article/allLikes`).then(
              (res) => res.json()
            ),
          ]);

        const likesCount = likesCountResponse.find(
          (count) =>
            count.articleId === article.articleId ||
            count.articleId === article.id
        );

        return {
          ...article,
          user: userDataResponse,
          comments: commentsResponse.commentsData,
          commentsCount: commentsResponse.commentCount,
          likesCount: likesCount ? likesCount.likesCount : 0,
        };
      });

      const reversedArticlesWithPromises = articlesWithPromises; // Reverse the order

      const articlesWithLikesCount = await Promise.all(
        reversedArticlesWithPromises
      );

      return articlesWithLikesCount;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // challange event
  const [challenges, setChallenges] = useState([]);
  const fetchChallenges = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/challenges`);
    const result = await response.json();
    console.log(result);
    setChallenges(result.challenges);
  };
  useEffect(() => {
    console.log(challenges);
    fetchChallenges();
  }, []);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const id = storedUserDatad ? storedUserDatad?.id : null;

    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData.token;
    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  console.log(storedUserData, "User data______________");

  const id = storedUserData?.id ? storedUserData?.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

  return (
    <>
      {/* <Header />
       */}

      <div style={dark_bg} className="flex flex-col pb-20 ">
        <Header />
        <div className="self-center px-3 md:px-1  mt-24 w-full  max-w-[1280px] max-md:mt-10 max-md:max-w-full">
          <div className="flex relative gap-3 max-md:flex-col max-md:gap-0 ">
            {/* left menu */}
            <LeftMenu
              id={id}
              shouldShowAgentItem={shouldShowAgentItem}
              shouldShowForProfile={shouldShowForProfile}
              setEventTogglerIsOpenned={setEventTogglerIsOpenned}
              eventTogglerIsOpenned={eventTogglerIsOpenned}
              user={user}
              userProfileType={userProfileType}
            />

            {/* left menu */}

            {/* create post */}
            <div className="flex md:w-[50%]  flex-col">
              <div className="flex flex-1 flex-col">
                <CreatePostModal
                  fetchDataOnbegin={() => {
                    setData([]);
                    setP(0);
                    fetchData(sizeOfPostsToget, p);
                  }}
                />

                {loading &&
                  // Render skeleton loading effect while data is being fetched
                  Array(10)
                    .fill()
                    .map((_, index) => <SkeletonArticleCard key={index} />)}

                <div>
                  {/* <div className="bg-white rounded-md shadow-md  h-[450px] mb-6">
  {(() => {
    const item = challenges[challenges.length - 1]; // Get the last item in the array
    return (
      <div key={item?.id}>
          <video
                          controls
                          className=" w-100 md:max-h-[350px] max-h-[350px]"
                        >
                          <source src={item?.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
        {item?.description.length > 100
          ? item?.description.slice(0, 100) + '...'
          : item?.description}
      </div>
    );
  })()}
</div> */}

                  {data.map((item, index) => (
                    <div key={`item-${index}`}>
                      {
                        <Post
                          onDeleteFromListAcceuillFront={() => {
                            onDeleteFromListAcceuillFront(id);
                          }}
                          article={item}
                          setArticles={setData}
                        />
                      }
                    </div>
                  ))}
                  {hasMore ? (
                    <div ref={elementRef}>
                      <Load />{" "}
                    </div>
                  ) : (
                    <div className=" w-6 h-1 bg-blue-600 rounded-full mt-3 mx-auto"></div>
                  )}
                </div>
              </div>
            </div>

            {/* start right cont */}
            <RightMenu />
            {/* end right cont */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
