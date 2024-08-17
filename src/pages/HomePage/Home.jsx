// import React, { Component, Fragment, useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";

// import Header from "../components/Header";
// import Leftnav from "../components/Leftnav";
// import Rightchat from "../components/Rightchat";
// import Appfooter from "../components/Appfooter";
// import Popupchat from "../components/Popupchat";

// import Friends from "../components/Friends";
// import Contacts from "../components/Contacts";
// import Group from "../components/Group";
// import Events from "../components/Events";
// import Createpost from "../components/Createpost";
// import Memberslider from "../components/Memberslider";
// import Friendsilder from "../components/Friendsilder";
// import Storyslider from "../components/Storyslider";
// import Postview from "../components/Postview";
// import Load from "../components/Load";
// import Profilephoto from "../components/Profilephoto";

// function Home() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("");
//   const [previewImage, setPreviewImage] = useState(null);
//   const [posting, setPosting] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [postsData, setPostsData] = useState([]);
//   const fileInputRef = useRef(null);
//   const [articles, setArticles] = useState([]); // New state for articles
//   const [isActive, setIsActive] = useState(false);

//   const toggleActive = () => setIsActive(!isActive);

//   const emojiClass = `${isActive ? "active" : ""}`;
//   const toggleOpen = () => setIsOpen(!isOpen);

//   const handleFileChange = (e, type) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileType(type);

//     const previewURL = URL.createObjectURL(selectedFile);
//     setPreviewImage(previewURL);
//   };
//   const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

//   const handlePostSubmit = async (data) => {
//     try {
//       if (!data.description || !storedUserData || !storedUserData.id) {
//         // Handle validation errors or missing user data
//         return;
//       }

//       setPosting(true);

//       const formData = new FormData();
//       formData.append("titre", "Your default title");
//       formData.append("description", data.description);
//       formData.append("userId", storedUserData.id);
//       formData.append("type", "Your default type");
//       formData.append("file", file);
//       formData.append("fileType", fileType);

//       // Make a POST request to create a new article
//       await fetch("https://odine-sport.com/api/articles/", {
//         method: "POST",
//         body: formData,
//       });

//       // After creating the article, fetch the updated list of articles
//       const response = await fetch("https://odine-sport.com/api/articles/");
//       const updatedPostsData = await response.json();

//       // Update the list of posts and reset the preview image
//       setPostsData(updatedPostsData);
//       setPreviewImage(null);

//       setPosting(false);
//     } catch (error) {
//       console.error("Error submitting post:", error);
//       setPosting(false);
//     }
//   };
//   const handlePhotoVideoClick = () => {
//     // Trigger click event on the file input
//     fileInputRef.current.click();
//   };
//   const menuClass = `${isOpen ? " show" : ""}`;

//   // useEffect(() => {
//   //   const fetchArticles = async () => {
//   //     try {
//   //       const response = await fetch("https://odine-sport.com/api/articles/");
//   //       const result = await response.json();

//   //       // Extract userIds from articles
//   //       const userIds = result.rows.map((article) => article.userId);

//   //       // Fetch user information for each userId
//   //       const usersResponse = await Promise.all(
//   //         userIds.map((userId) =>
//   //           fetch(`https://odine-sport.com/api/user/${userId}`).then((response) =>
//   //             response.json()
//   //           )
//   //         )
//   //       );
//   //       console.log(usersResponse);

//   //       const articlesWithUsers = result.rows.map((article, index) => ({
//   //         ...article,
//   //         user: usersResponse[index],
//   //       }));

//   //       setArticles(articlesWithUsers);
//   //     } catch (error) {
//   //       console.error("Error fetching articles:", error);
//   //     }
//   //   };

//   //   fetchArticles();
//   // }, []);

//   return (
//     <Fragment>
//     <Header />
//     <Leftnav />
//     <Rightchat />

//     <div className="main-content right-chat-active">
//       <div className="middle-sidebar-bottom">
//         <div className="middle-sidebar-left">
//           <div className="row feed-body">
//             <div className="col-xl-8 col-xxl-9 col-lg-8">
//               {/* <Storyslider /> */}
//               {/* <Createpost /> */}

//               {/* update 01/02/2023 */}
//               <div>
//                 <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
//                   <div className="card-body p-0 mt-3 position-relative">
//                     <figure className="avatar position-absolute ms-2 mt-1 top-5">
//                       <img
//                         src={user.image}
//                         alt="icon"
//                         className="shadow-sm rounded-full  w-10 h-10"
//                       />
//                     </figure>
//                     {previewImage && (
//                       <div className="mt-3">
//                         <img
//                           src={previewImage}
//                           alt="Preview"
//                           className="rounded-xxl"
//                           style={{ maxWidth: "100%", maxHeight: "200px" }}
//                         />
//                       </div>
//                     )}
//                     {videoPreviewUrl && (
//                       <div className="mt-3">
//                         <video
//                           controls
//                           src={videoPreviewUrl}
//                           className="rounded-xxl"
//                           style={{ maxWidth: "100%", maxHeight: "200px" }}
//                         ></video>
//                       </div>
//                     )}
//                     <form onSubmit={handleSubmit(handlePostSubmit)}>
//                       <div className="card-body d-flex p-0 mt-4">
//                         {/* <img
//                         src={user.image}
//                         alt="User Image"
//                         className="w-20 h-16 rounded-full object-fill"
//                       /> */}
//                         {/* <label>{storedUserData.login}</label> */}
//                         <TextInput
//                           className="h100 bor-0 w-100 rounded-xxl p-2 mt-1 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
//                           cols="30"
//                           rows="10"
//                           placeholder="What's on your mind?"
//                           // styles="w-full rounded-full py-5 text-bl"
//                           // placeholder="Show your Skills here , your dream begin from here...."
//                           name="description"
//                           register={register("description", {
//                             required: "Write something about post",
//                           })}
//                           error={
//                             errors.description
//                               ? errors.description.message
//                               : ""
//                           }
//                         />
//                       </div>

//                       {errMsg?.message && (
//                         <span
//                           role="alert"
//                           className={`text-sm ${
//                             errMsg?.status === "failed"
//                               ? "text-[#f64949fe]"
//                               : "text-[#2ba150fe]"
//                           } mt-0.5`}
//                         >
//                           {errMsg?.message}
//                         </span>
//                       )}
//                       <div className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
//                         <label
//                           htmlFor="imgUpload"
//                           className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
//                         >
//                           <input
//                             type="file"
//                             onChange={handleFileChange}
//                             className="hidden"
//                             id="imgUpload"
//                             accept=".jpg, .png, .jpeg"
//                           />
//                           <i className="font-md text-success feather-image me-2"></i>
//                           <span className="d-none-xs">Photo</span>
//                         </label>

//                         <label
//                           className="d-flex align-items-center font-xssss fw-600 mt-1 ls-1 text-grey-700 text-dark pe-4"
//                           htmlFor="videoUpload"
//                         >
//                           <input
//                             type="file"
//                             onChange={(e) => handleFileChange(e, "video")}
//                             className="hidden"
//                             id="videoUpload"
//                             accept=".mp4, .wav"
//                           />
//                           <i className="font-md text-danger feather-video me-2"></i>
//                           <span className="d-none-xs"> Video</span>
//                         </label>

//                         <label
//                           className="d-flex align-items-center font-xssss mt-1 fw-600 ls-1 text-grey-700 text-dark pe-4"
//                           htmlFor="vgifUpload"
//                         >
//                           <input
//                             type="file"
//                             onChange={(e) => handleFileChange(e, "gif")}
//                             className="hidden"
//                             id="vgifUpload"
//                             accept=".gif"
//                           />
//                           <i className="font-md text-warning feather-camera me-2"></i>
//                           <span className="d-none-xs">GIF</span>
//                         </label>

//                         <div>
//                           {posting ? (
//                             <Loading />
//                           ) : (
//                             <CustomButton
//                               type="submit"
//                               title="Post"
//                               containerStyles="bg-[#0444a4] text-white mt-1 py-1 px-10 rounded-full font-semibold text-sm"
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>

//                 {/* update 01/02/2023 */}

//                 <div>
//                   {articles.map((article) => (
//                     <div
//                       key={article.id}
//                       className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
//                     >
//                       <div className="card-body p-0 d-flex">
//                         <figure className="avatar me-3">
//                           <img
//                             src={article.user.image}
//                             className="shadow-sm rounded-circle w-10 h-10"
//                             alt="post"
//                           />{" "}
//                         </figure>

//                         <h4 className="fw-700 text-grey-900 font-xssss mt-1">
//                           {article.user.nom}
//                           <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
//                             {calculateTimeDifference(article.createdAt)}
//                           </span>
//                         </h4>
//                         <div className="ms-auto pointer">
//                           <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
//                         </div>
//                       </div>



//                       <div className="card-body p-0 me-lg-5">
//                             <p className="fw-500 font-thin lh-26 ml-8  rounded-md font-xssss w-100 mb-2 text-dark theme-dark-bg">
//                               {article.description}{" "}
//                             </p>
//                           </div>
//                       <div className="card-body d-block p-0 mb-3">
//                         <div className="row ps-2 pe-2">
//                           <div className="col-sm-12 p-1">
//                             {/* <img
//                           src={article.image}
//                           className="rounded-3 w-100"
//                           alt="post"
//                         /> */}
//                             {article.video ? (
//                               <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
//                                 <video controls className="float-right w-100">
//                                   <source
//                                     src={article.video}
//                                     type="video/mp4"
//                                   />
//                                   Your browser does not support the video tag.
//                                 </video>{" "}
//                               </div>
//                             ) : (
//                               <div className="card-body d-block p-0 mb-3">
//                                 <div className="row ps-2 pe-2">
//                                   <div className="col-sm-12 p-1">
//                                     <img
//                                       className="rounded-3 h-96 w-100 object-cover"
//                                       src={article.image}
//                                       alt={article.titre}
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
                          
//                         </div>
//                       </div>
//                       <div className="  rounded-lg">
//                         {article.user &&
//                           article.user.id === storedUserData.id && (
//                             <div className="flex items-center justify-end mt-2">
//                               <label
//                                 className="flex items-center  gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
//                                 onClick={() => handleEditClick(article)}
//                               >
//                                 <BiEditAlt />
//                                 <Link to={`/editPost/${article.id}`}>
//                                   <span>Edit</span>
//                                 </Link>{" "}
//                               </label>
//                             </div>
//                           )}
//                         <button
//                           onClick={() => {
//                             // If comments are already visible, close them
//                             if (selectedArticleId === article.id) {
//                               setCommentInputVisible(false);
//                               setSelectedArticleId(null); // Reset selectedArticleId
//                             } else {
//                               // Otherwise, fetch and display comments
//                               fetchCommentsForArticle(article.id);
//                               setSelectedArticleId(article.id);
//                               setCommentInputVisible(true);
//                             }
//                           }}
//                         >
//                           {selectedArticleId === article.id ? (
//                             <BiMessageRounded className="w-8 h-7 text-cyan-700" /> 
//                           ) : (
//                             <BiMessageRounded className="w-8 h-7 text-cyan-700" />
//                           )}
//                         </button>
                        
                        
                        
                        
                        
//                         <span className="mb-3 ml-0 p-0 font-bold mr-4">

//                         {article.commentsCount} {article.commentsCount === 1 ? "" : ""}</span>
//                         <button
// onClick={() => {
//   handleLikeClick(article.id, 1); 
// }}
// >
// {article.likesCount === 0 ? (
//   <BiHeart className="size-7 text-red-600" />
// ) : (
//   <BiSolidHeart className="size-7 text-red-600" />
// )}
// </button>{" "}
// <span className="mb-3 ml-0 p-0 font-bold mr-4">
// {article.likesCount} {article.likesCount === 1 ? "" : ""}{" "}
// </span>

//                         {selectedArticleId === article.id && (
//                           <div className="comments-section">
//                             {article.comments &&
//                               article.comments.map((comment) => (
//                                 <div key={comment.id} className="comment">
//                                   {/* Display comment information */}
//                                   <div className="flex items-center ">
//                                     <figure className="avatar me-3">
//                                       <img
//                                         src={
//                                           comment.user && comment.user.image
//                                         }
//                                         className="shadow-sm rounded-circle w-10 h-10 "
//                                         alt="post"
//                                       />
//                                     </figure>
//                                     <div className="flex flex-col justify-between ml-2 ">
//                                       <strong className="mb-2 mt-10">
//                                         {comment.user && comment.user.login}
//                                       </strong>
//                                       <span className="bg-gray-200 p-2 rounded-md  h-9">
//                                         {comment.description}
//                                       </span>
//                                     </div>
//                                   </div>

//                                   <div className="ml-12">
//                                     <button
//                                       onClick={() =>
//                                         handleReplyClick(comment.id)
//                                       }
//                                       className="w-20 font-semibold ml-4"
//                                     >
//                                       Répondre
//                                     </button>





//                                    <button onClick={() => handleLikeComment(comment.id)}>
//     {comment.likesCount === 0 ? (
//       <BiHeart className="size-7 text-red-600" />
//     ) : (
//       <BiSolidHeart className="size-7 text-red-600" />
//     )}
//   </button>
//   {/* <span>{comment.likesCount} Likes</span> */}
// <span className="mb-3 ml-0 p-0 font-bold mr-4">
// {comment.likesCount} {comment.likesCount === 1 ? "" : ""}
// </span>

//                                   </div>
                                 
                                 
//                                   {replyingToCommentId === comment.id && (
//                                     <div>
//                                       <input
//                                         type="text"
//                                         value={replyInput}
//                                         onChange={(e) =>
//                                           setReplyInput(e.target.value)
//                                         }
//                                         className="bg-gray-200 rounded-md w-96 pl-3 h-12 mt-3 ml-16"
//                                       />
//                                       <button
//                                         onClick={() =>
//                                           addReply(comment.id, replyInput)
//                                         }
//                                       >
//                                         <BiSolidSend className="size-12 pt-8 text-cyan-600" />
//                                       </button>
//                                     </div>
//                                   )}
//                                   {repliesVisible[comment.id] && (
//                                     <div className="replies-section ml-16 mt-3">
//                                       {articleComments[comment.id] &&
//                                         articleComments[comment.id].map(
//                                           (reply) => (
//                                             <div
//                                               key={reply.id}
//                                               className="reply"
//                                             >
//                                               {/* Display reply information */}
//                                               <div className="flex items-center">
//                                                 <figure className="avatar me-3">
//                                                   <img
//                                                     src={
//                                                       reply.user &&
//                                                       reply.user.image
//                                                     }
//                                                     className="shadow-sm rounded-circle w-10 h-10"
//                                                     alt="post"
//                                                   />
//                                                 </figure>
//                                                 <div className="flex flex-col justify-between ml-2 ">
//                                                   <strong className="mb-2 mt-10">
//                                                     {reply.user &&
//                                                       reply.user.login}
//                                                   </strong>
//                                                   <span className="bg-gray-200 p-2 rounded-md  h-9">
//                                                     {reply.description}
//                                                   </span>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           )
//                                         )}
//                                     </div>
//                                   )}
//                                 </div>
//                               ))}

//                             {/* Add Comment Input */}
//                             {commentInputVisible && (
//                               <div>
//                                 <div className="flex items-center">
//                                   <figure className="avatar me-3">
//                                     <img
//                                       src={user.image}
//                                       className="shadow-sm rounded-circle w-10 h-10"
//                                       alt="post"
//                                     />
//                                   </figure>
//                                   <input
//                                     type="text"
//                                     className="bg-gray-200 p-2 rounded-md w-96 h-12 mt-3 ml-2"
//                                     value={comment}
//                                     onChange={(e) =>
//                                       setComment(e.target.value)
//                                     }
//                                   />{" "}
//                                   <button
//                                     onClick={() => addComment(article.id)}
//                                     className="ml-2"
//                                   >
//                                     {" "}
//                                     <BiSolidSend className="size-7 mt-3 text-cyan-600" />
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                         {/* Display comments when selectedArticleId matches the current article's id */}
//                         {/* <div className="comments-section">
//                           {article.comments &&
//                             article.comments.map((comment) => (
//                               <div key={comment.id} className="comment">
//                                 <figure className="avatar me-3">
//                                   <img
//                                     src={comment.user && comment.user.image}
//                                     className="shadow-sm rounded-circle w-10 h-10"
//                                     alt="post"
//                                   />{" "}
//                                 </figure>{" "}
//                                 <strong>
//                                   {comment.user && comment.user.login}
//                                 </strong>
//                                 : {comment.description}
//                               </div>
//                             ))}
//                         </div> */}
//                       </div>
//                     </div>
//                   ))}

//                   {latestItemType !== "album" &&
//                     album.map((albums) => (
//                       <div
//                         key={albums.id}
//                         className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
//                       >
//                         <div className="card-body p-0 d-flex">
//                           <figure className="avatar me-3">
//                             <img
//                               src={AdminImg}
//                               className="shadow-sm rounded-circle w-10 h-10"
//                               alt="post"
//                             />{" "}
//                           </figure>
//                           <h4 className="fw-700 text-grey-900 font-xssss mt-1">
//                             ODIN Sport
//                             <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
//                               {calculateTimeDifference(albums.createdAt)}
//                             </span>
//                           </h4>
//                         </div>

//                         <div className="card-body d-block p-0 mb-3">
//                           <div className="row ps-2 pe-2">
//                             <div className="col-sm-12 p-1">
//                               <div
//                                 className="card-body position-relative h200 bg-image-cover bg-image-center cover"
//                                 style={{
//                                   backgroundImage: `url(${albums.ImagesAlbums[0]?.image_url})`,
//                                 }}
//                               ></div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="card-body p-0 me-lg-5">
//                           <p className="fw-500 font-thin lh-26 ml-8 rounded-md font-xssss w-100 mb-2 text-dark theme-dark-bg">
//                             {album.description}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               {/* {articles.map((article) => (
//                 <Postview
//                   key={article?.id} // Make sure to provide a unique key for each Postview
//                   id={article?.id}
//                   postvideo={article?.postvideo}
//                   postimage={article?.image}
//                   // avater={article.user.avatar} // Assuming user avatar is stored in 'avatar' property
//                   // user={article.user.username} // Assuming username is stored in 'username' property
//                   // time={article.time}
//                   des={article.description}
//                 />
               
//               ))} */}
//               {/* <GallerieOdin /> */}
//               {/* <Memberslider /> */}

//               <Friendsilder />

//               <Load />
//             </div>
//             <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
//               <Friends />
//               <Contacts />
//               <Group />
//               <Events />
//               <Profilephoto />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <Popupchat />
//     <Appfooter />
//   </Fragment>
//   );
// }

// export default Home;
