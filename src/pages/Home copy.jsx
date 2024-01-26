import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

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
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";

import {
  BiImages,
  BiLike,
  BiSolidCommentCheck,
  BiSolidVideo,
  BiUndo,
} from "react-icons/bi";
import Loading from "../components/Loading";
function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const fileInputRef = useRef(null);
  const [articles, setArticles] = useState([]); // New state for articles
  const [isActive, setIsActive] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [articleComments, setArticleComments] = useState({});
  const [articleCommentsCounts, setArticleCommentsCounts] = useState({});
  const [editArticle, setEditArticle] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentReply, setCommentReply] = useState("");
  const [newComment, setNewComment] = useState(null); // New state for the newly added comment
  const [comments, setComments] = useState([]);

  const toggleActive = () => setIsActive(!isActive);

  const emojiClass = `${isActive ? "active" : ""}`;
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const handlePostSubmit = async (data) => {
    try {
      if (!data.description || !storedUserData || !storedUserData.id) {
        // Handle validation errors or missing user data
        return;
      }

      setPosting(true);

      const formData = new FormData();
      formData.append("titre", "Your default title");
      formData.append("description", data.description);
      formData.append("userId", storedUserData.id);
      formData.append("type", "Your default type");
      formData.append("file", file);
      formData.append("fileType", fileType);

      // Make a POST request to create a new article
      await fetch("http://localhost:8088/api/articles/", {
        method: "POST",
        body: formData,
      });

      // After creating the article, fetch the updated list of articles
      const response = await fetch("http://localhost:8088/api/articles/");
      const updatedPostsData = await response.json();

      // Update the list of posts and reset the preview image
      setPostsData(updatedPostsData);
      setPreviewImage(null);

      setPosting(false);
    } catch (error) {
      console.error("Error submitting post:", error);
      setPosting(false);
    }
  };
  const handlePhotoVideoClick = () => {
    // Trigger click event on the file input
    fileInputRef.current.click();
  };
  const menuClass = `${isOpen ? " show" : ""}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8088/api/articles/");
        const result = await response.json();

        // Extract userIds from articles
        const userIds = result.rows.map((article) => article.userId);

        // Fetch user information for each userId
        const usersResponse = await Promise.all(
          userIds.map((userId) =>
            fetch(`http://localhost:8088/api/user/${userId}`).then((response) =>
              response.json()
            )
          )
        );
        console.log(usersResponse);

        const articlesWithUsers = result.rows.map((article, index) => ({
          ...article,
          user: usersResponse[index],
        }));

        setArticles(articlesWithUsers);

        // Fetch comments for each article
        const commentsPromises = articlesWithUsers.map(async (article) => {
          const response = await fetch(
            `http://localhost:8088/api/commentaires/?articleId=${article.id}`
          );
          const comments = await response.json();
          return { articleId: article.id, comments };
        });

        const commentsResults = await Promise.all(commentsPromises);

        const articleCommentsData = commentsResults.reduce(
          (acc, { articleId, comments }) => {
            acc[articleId] = comments;
            return acc;
          },
          {}
        );

        setArticleCommentsCounts(articleCommentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchComments();
    fetchArticles();
  }, []);
  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:8088/api/commentaires/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };
  const addComment = async (articleId) => {
    try {
      if (articleId) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));
  
        const response = await fetch(
          "http://localhost:8088/api/commentaires/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: comment,
              userId: user.id,
              articleId: articleId,
            }),
          }
        );
  
        const newComment = await response.json();
        console.log("Comment created:", newComment);
  
        // Update the state with the new comment immediately
        setArticleComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[articleId] = [
            ...(updatedComments[articleId] || []),
            newComment,
          ];
          return updatedComments;
        });
  
        // Clear the comment input
        setComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  

  const addReply = async (commentId, replyText) => {
    try {
      if (commentId && replyText) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          `http://localhost:8088/api/replies`, // Update the endpoint here
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: replyText,
              userId: user.id,
              nom: user.login,
              imageuser: user.image,
              commentaireId: commentId,
            }),
          }
        );

        const data = await response.json();
        console.log("Reply created:", data);

        // Update the state with the new reply
        setArticleComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[commentId] = [
            ...(updatedComments[commentId] || []),
            data,
          ];
          return updatedComments;
        });

        // Clear the reply input
        setCommentReply("");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row feed-body">
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <Storyslider />
                {/* <Createpost /> */}
                <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                  <div className="card-body p-0 mt-3 position-relative">
                    <figure className="avatar position-absolute ms-2 mt-1 top-5">
                      <img
                        src="assets/images/user.png"
                        alt="icon"
                        className="shadow-sm rounded-circle w30"
                      />
                    </figure>
                    {previewImage && (
                      <div className="mt-3">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="rounded-xxl"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                    <form onSubmit={handleSubmit(handlePostSubmit)}>
                      <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                        {/* <img
                  src={ NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                /> */}
                        <label>{storedUserData.login}</label>
                        <TextInput
                          styles="w-full rounded-full py-5 text-bl"
                          placeholder="Show your Skills here , your dream begin from here...."
                          name="description"
                          register={register("description", {
                            required: "Write something about post",
                          })}
                          error={
                            errors.description ? errors.description.message : ""
                          }
                        />
                      </div>

                      {errMsg?.message && (
                        <span
                          role="alert"
                          className={`text-sm ${
                            errMsg?.status === "failed"
                              ? "text-[#f64949fe]"
                              : "text-[#2ba150fe]"
                          } mt-0.5`}
                        >
                          {errMsg?.message}
                        </span>
                      )}
                      <div className="flex items-center justify-between py-4">
                        <label
                          htmlFor="imgUpload"
                          className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                        >
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="imgUpload"
                            data-max-size="5120"
                            accept=".jpg, .png, .jpeg"
                          />
                          <BiImages />
                          <span>Image</span>
                        </label>

                        <label
                          className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                          htmlFor="videoUpload"
                        >
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "video")}
                            className="hidden"
                            id="videoUpload"
                            data-max-size="5120"
                            accept=".mp4, .wav"
                          />
                          <BiSolidVideo />
                          <span>Video</span>
                        </label>

                        <label
                          className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                          htmlFor="vgifUpload"
                        >
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "gif")}
                            className="hidden"
                            id="vgifUpload"
                            data-max-size="5120"
                            accept=".gif"
                          />
                          <BsFiletypeGif />
                          <span>Gif</span>
                        </label>

                        <div>
                          {posting ? (
                            <Loading />
                          ) : (
                            <CustomButton
                              type="submit"
                              title="Post"
                              containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                            />
                          )}
                        </div>
                      </div>
                    </form>
                  </div>

                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                    >
                      <div className="card-body p-0 d-flex">
                        {/* <figure className="avatar me-3"></figure> */}
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                          {article.titre}
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            {/* {article.time} */}
                          </span>
                        </h4>
                        <div className="ms-auto pointer">
                          <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                        </div>
                      </div>
                      <div className="card-body p-0 me-lg-5">
                        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                          {article.description}{" "}
                          <a
                            href="/defaultvideo"
                            className="fw-600 text-primary ms-2"
                          >
                            See more
                          </a>
                        </p>
                      </div>
                      <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                          <div className="col-sm-12 p-1">
                            {/* <img
                            src={article.image}
                            className="rounded-3 w-100"
                            alt="post"
                          /> */}
                            {article.video ? (
                              <video controls className="rounded-3 w-100">
                                <source src={article.video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img
                                className="rounded-3 w-100"
                                src={article.image}
                                alt={article.titre}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className=" px-4 rounded-lg">
                        

                        {article.user &&
                          article.user.id === storedUserData.id && (
                            <div className="flex items-center justify-end mt-2">
                              <label
                                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                                onClick={() => handleEditClick(article)}
                              >
                                <BiSolidCommentCheck />
                                <span>Edit</span>
                              </label>
                            </div>
                          )}

                        {selectedArticleId === article.id && (
                          <div className=" p-4 bg-slate-100 rounded-lg mt-4">
                            {(() => {
                              if (!articleComments[article.id]) {
                                fetchComments();

                                fetch(
                                  `http://localhost:8088/api/commentaires/article/${article.id}`
                                )
                                  .then((response) => response.json())
                                  .then((response) => {
                                    setArticleComments((prevComments) => ({
                                      ...prevComments,
                                      [article.id]: response,
                                    }));
                                    console.log("------------------",articleComments)
                                  })                                 

                                  
                                  .catch((error) =>
                                    console.error(
                                      "Error fetching comments:",
                                      error
                                    )
                                  );

                                return <p>Loading comments...</p>;
                              }

                              // Render all comments for the selected article after fetching
                              return (
                                <>
                                  {articleComments[article.id]?.map(
                                    (commentItem) => (
                                      

                                      <div
                                        key={commentItem.comm_id}
                                        className="mb-2"
                                      >
                                        {/* Display comment details */}
                                        <div className="flex flex-col">
                                          <div className="flex items-center mb-1">
                                            <div className="bg-white rounded-full text-black w-20 h-10 mr-4 border-2">
                                              {commentItem?.user_login} 
                                            </div>
                                            <div className="bg-white w-10 h-10 text-black rounded-sm flex-grow">
                                              {commentItem?.comm_desc}  {commentItem?.description}
                                            </div>
                                          </div>

                                          {/* Display Reply button */}
                                          <label className="flex items-center  gap-14 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                                            {/* <span className="text-ascent-2 hover:text-ascent-1 cursor-pointer">
                                            </span> */}
                                            <span
                                              onClick={async () => {
                                                setCommentReply("");
                                                setSelectedCommentId(
                                                  selectedCommentId ===
                                                    commentItem.comm_id
                                                    ? null
                                                    : commentItem.comm_id
                                                );

                                                // Fetch replies for the selected comment
                                                if (
                                                  !articleComments[
                                                    commentItem.comm_id
                                                  ]
                                                ) {
                                                  try {
                                                    const response =
                                                      await fetch(
                                                        `http://localhost:8088/api/replies/${commentItem.comm_id}`
                                                      );
                                                    const replies =
                                                      await response.json();

                                                    // Update the state with the fetched replies
                                                    setArticleComments(
                                                      (prevComments) => ({
                                                        ...prevComments,
                                                        [commentItem.comm_id]:
                                                          replies,
                                                      })
                                                    );
                                                  } catch (error) {
                                                    console.error(
                                                      "Error fetching replies:",
                                                      error
                                                    );
                                                  }
                                                }
                                              }}
                                            >
                                              {selectedCommentId ===
                                              commentItem.comm_id
                                                ? "Cancel Reply"
                                                : "Reply"}
                                            </span>
                                          </label>
                                        </div>

                                        {/* Display replies for the comment */}
                                        {articleComments[
                                          commentItem.comm_id
                                        ]?.map((reply) => (
                                          <div
                                            key={reply.id}
                                            className="ml-8 mb-2"
                                          >
                                            {/* <div className="bg-white w-10 h-10 rounded-sm float-left mr-4 border-2">
                                              {reply.nom}
                                            
                                            </div> */}
                                            <div className="bg-white rounded-sm ml-20 ">
                                              {reply.description}
                                            </div>
                                          </div>
                                        ))}

                                        {/* Display reply input */}
                                        {selectedCommentId ===
                                          commentItem.comm_id && (
                                          <div className="bg-gray-200 p-4 rounded-lg mt-4">
                                            <textarea
                                              value={commentReply}
                                              onChange={(e) =>
                                                setCommentReply(e.target.value)
                                              }
                                              placeholder="Type your reply here..."
                                              className="w-full h-16 p-2 border rounded"
                                            />

                                            <button
                                              type="button"
                                              onClick={() => {
                                                addReply(
                                                  commentItem.comm_id,
                                                  commentReply
                                                );
                                                setCommentReply("");
                                              }}
                                              className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
                                            >
                                              Add Reply
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}

                                  {/* Comment input */}
                                  <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Type your comment here..."
                                    className="w-full h-16 p-2 border rounded"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => {
                                      addComment(article.id);
                                      // Reset the comment input after adding a comment
                                      setComment("");
                                      fetchComments(); 

                                    }}
                                    className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
                                  >
                                    Add Comment
                                  </button>
                                </>
                              );
                            })()}
                          </div>
                        )}

                        {/* Button to select the article for comments */}
                        <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                          <BiSolidCommentCheck />
                          <span
                            onClick={() =>
                              setSelectedArticleId(
                                selectedArticleId === article.id
                                  ? null
                                  : article.id
                              )
                            }
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div className="mr-4">
                                {" "}
                                {articleCommentsCounts[article.id]
                                  ? `${
                                      articleCommentsCounts[article.id].length
                                    } `
                                  : "Loading comments..."}
                              </div>
                              <div className="">
                                {selectedArticleId === article.id
                                  ? "Close Comments"
                                  : "Comment"}
                              </div>
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                  {/* {loading ? (
              <Loading />
            ) : postsData?.length > 0 ? (
              postsData?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )} */}
                </div>

                {/* {articles.map((article) => (
                  <Postview
                    key={article?.id} // Make sure to provide a unique key for each Postview
                    id={article?.id}
                    postvideo={article?.postvideo}
                    postimage={article?.image}
                    // avater={article.user.avatar} // Assuming user avatar is stored in 'avatar' property
                    // user={article.user.username} // Assuming username is stored in 'username' property
                    // time={article.time}
                    des={article.description}
                  />
                 
                ))} */}

                <Memberslider />
                <Postview
                  id="35"
                  postvideo=""
                  postimage="post.png"
                  avater="user.png"
                  user="Victor Exrixon"
                  time="3 hour ago"
                  des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <Friendsilder />
                <Postview
                  id="36"
                  postvideo=""
                  postimage="post.png"
                  avater="user.png"
                  user="Victor Exrixon"
                  time="12 hour ago"
                  des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <Load />
              </div>
              <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                <Friends />
                <Contacts />
                <Group />
                <Events />
                <Profilephoto />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popupchat />
      <Appfooter />
    </Fragment>
  );
}

export default Home;