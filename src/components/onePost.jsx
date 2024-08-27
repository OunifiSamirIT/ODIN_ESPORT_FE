import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Post from "../components/Post";
import Albumsadmin from "../components/Albumsadmin";
import Header from "../components/Header2";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Friends from "../components/Friends";
import Contacts from "../components/Contacts";
import Group from "../components/Group";
import Events from "../components/Events";
import Createpost from "../components/Createpost";
import Memberslider from "../components/Memberslider";
import Friendsilder from "../components/Friendsilder";
import Storyslider from "../components/Storyslider";
import Postview from "../components/Postview";
import Load from "../components/Load";
import Profilephoto from "../components/Profilephoto";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd, BsTypeH1 } from "react-icons/bs";
import placeholder from "../assets/placeholder.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../config";
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
import Loading from "../components/Loading";
import {
  Link,
  Navigate,
  useNavigate,
  useLocation,
  json,
  useParams,
} from "react-router-dom";
import AdminImg from "../assets/ODIN22.png";
import CreatePost from "../components/CreatePostss";
import CreatePostModal from "../components/CreatePostModal";
import secureLocalStorage from "react-secure-storage";

function OnePost() {
  const { idP } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventHasMore, setEventHasMore] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const addNewArticle = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };
  let onDeleteFromListAcceuillFront = function (id) {
    setData([]);
    setP(0);
    fetchData(sizeOfPostsToget, p);
    window.location.replace("/home");
  };

  let elementRef = useRef(null);
  const [product, setProduct] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [p, setP] = useState(0);
  let sizeOfPostsToget = 1;
  let fetchMoreItems = async () => {
    fetchData(sizeOfPostsToget, p);
  };
  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
    }
  }
  useEffect(() => {
    if (!isLoaded) {
      fetchData(sizeOfPostsToget, p);
      setLoaded(true);
    }
  }, []);

  const fetchAlbums = async (size, page) => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/album?size=${size}&page=${page}`
      );
      const result = await response.json();
      if (!result.data) {
        setEventHasMore(false);
      }

      return [];
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
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchArticles = async (size, page) => {
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/articles/` + idP);

      const res = await response.json();
      let dt = res.createdAt.split(" ")[0];
      let tm = res.createdAt.split(" ")[1];
      let dd = dt.split("-")[0];
      let mm = dt.split("-")[1];
      let yy = dt.split("-")[2];

      const result = {
        currentPage: 0,
        rows: [
          {
            ...res,
            // "createdAt": "2024-06-01T02:33:06.000Z",
            // "createdAt":  yy + "-"  + mm + "-" + dd + "T" +tm
          },
        ],
        totalItems: 1,
        totalPages: 1,
      };

      if (result.rows == 0) {
        setHasMore(false);
      }
      const articlesWithPromises = result.rows.map(async (article) => {
        const userId = article.userId;
        const comt = article.id;

        const [userDataResponse, commentsResponse, likesCountResponse] =
          await Promise.all([
            fetch(`${Config.LOCAL_URL}/api/user/${userId}`).then((res) =>
              res.json()
            ),
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

  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData.token;

    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const id = storedUserDatad ? storedUserDatad.id : null;
    console.log("eeeeeeeeeeeee", tokenn);

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      }).then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

  // const addNewArticle = (newArticleResponse) => {
  //   const newArticle = newArticleResponse.data;

  //   setData((prevData) => [newArticle, ...prevData]);
  //   console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ addNewArticle ~ setData:", newArticle)

  // };

  return (
    <>
      {/* <Header />
       */}
      <div className="flex flex-col pb-20  ">
        <Header />
        <div className="self-center px-3 md:px-1  mt-24 w-full  max-w-[1280px] mt-10 max-md:max-w-full">
          <div className="flex relative justify-center gap-3 max-md:flex-col max-md:gap-0 ">
            {/* create post */}
            <div className="flex md:w-[50%]  flex-col">
              <div className="flex flex-1 flex-col">
                <div>
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
                </div>
              </div>
            </div>

            {/* <div style={{
                display: "flex"
                ,flexDirection: "column"
              }}>

              {product.map((item) => 
                <p
                style={{minHeight: 150}}>
                  {item.description} sdfsdfsdfsd
                </p>
              )}     
                            {hasMore &&
         
              <div ref={elementRef}> 

              Load more items ...
              </div>
                            }

              </div> */}
          </div>
        </div>
      </div>
          
    </>
  );
}

export default OnePost;
