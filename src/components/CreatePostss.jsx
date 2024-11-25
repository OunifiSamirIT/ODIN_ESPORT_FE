import React, { useState, useRef, useEffect, useContext } from 'react';
import { Config } from "../config";
import { useForm } from 'react-hook-form';
import CustomButton from "../components/CustomButton";
import Loading from './Loading';
import placeholder from "../assets/placeholder.jpg";
import { Context } from "../index";
import secureLocalStorage from "react-secure-storage";
import DOMPurify from 'dompurify';

const CreatePost = ({ setArticles, onClose }) => {
  const { getTranslation, dark_light_bg } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const [user, setUser] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]); // Combined state for all media files
  const [previewImage, setPreviewImage] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [posting, setPosting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const textAreaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState('70px');

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const storedToken = JSON.parse(localStorage.getItem("Secret"))?.token;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    const videoFile = selectedFiles.find(file => file.type.startsWith('video/'));

    // Update media files state
    const newMediaFiles = [...mediaFiles];
    
    // Add new image files
    imageFiles.forEach(file => {
      newMediaFiles.push({
        file,
        type: 'image',
        preview: URL.createObjectURL(file)
      });
    });

    // Add video file if exists
    if (videoFile) {
      newMediaFiles.push({
        file: videoFile,
        type: 'video',
        preview: URL.createObjectURL(videoFile)
      });
    }

    setMediaFiles(newMediaFiles);
    
    // Update preview states
    const newPreviewImages = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewImage(prev => [...prev, ...newPreviewImages]);
    
    if (videoFile) {
      setVideoPreviewUrl(URL.createObjectURL(videoFile));
    }
  };

  const handleRemoveMedia = (e, index) => {
    // Prevent form submission and event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Clean up object URL to prevent memory leaks
    URL.revokeObjectURL(mediaFiles[index].preview);
    
    // Remove the media file from the array
    setMediaFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    // Update preview states based on media type
    if (mediaFiles[index].type === 'image') {
      setPreviewImage(prev => {
        const newPreviews = [...prev];
        newPreviews.splice(index, 1);
        return newPreviews;
      });
    } else if (mediaFiles[index].type === 'video') {
      setVideoPreviewUrl(null);
    }
  };

  const handlePostSubmit = async (data) => {
    try {
      if (!storedUserData?.id) {
        setErrMsg(getTranslation("User not authenticated", "Utilisateur non authentifié"));
        return;
      }

      if (!data.description && !mediaFiles.length) {
        setErrMsg(getTranslation("Add something to post", "Ajoutez quelque chose pour publier"));
        return;
      }

      setPosting(true);
      setErrMsg("");

      const formData = new FormData();
      formData.append("titre", sanitizeInput("Your default title"));
      formData.append("description", sanitizeInput(data.description || ""));
      formData.append("type", sanitizeInput("Your default type"));
      formData.append("userId", storedUserData.id);

      // Append only the file objects to formData
      mediaFiles.forEach((mediaItem, index) => {
        formData.append("media", mediaItem.file);
      });

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${Config.LOCAL_URL}/api/articles/`);
      xhr.setRequestHeader("Authorization", `Bearer ${storedToken}`);

      xhr.upload.onprogress = (event) => {
        const percentage = (event.loaded / event.total) * 100;
        setUploadProgress(Math.trunc(percentage));
      };

      xhr.onload = function() {
        if (xhr.status === 201 || xhr.status === 200) {
          const newPost = JSON.parse(xhr.responseText);
          setArticles(newPost);
          
          // Clean up all previews and reset states
          mediaFiles.forEach(media => URL.revokeObjectURL(media.preview));
          setMediaFiles([]);
          setPreviewImage([]);
          setVideoPreviewUrl(null);
          setValue("description", "");
          setPosting(false);
          setErrMsg("");
          
          setTimeout(() => {
            onClose();
          }, 2800);
        } else {
          setPosting(false);
          handleError(xhr);
        }
      };

      xhr.onerror = function() {
        setPosting(false);
        setErrMsg(getTranslation("Network error occurred", "Une erreur réseau s'est produite"));
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error submitting post:", error);
      setPosting(false);
      setErrMsg(getTranslation("An error occurred", "Une erreur s'est produite"));
    }
  };
  const _ref_previewImage = useRef(null);
  const _ref_previewVideo = useRef(null);
  const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      // Remove any potential SQL injection attempts
      input = input.replace(/'/g, "''");
      // Use DOMPurify to remove any potential XSS
      return DOMPurify.sanitize(input);
    }
    return input;
  };
  

 

  const hendelrest = () => {
    setData("")
  }
  useEffect(() => {
    const storedUserDatad = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
    const id = storedUserDatad ? storedUserDatad.id : null;
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData.token;
    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`

      , {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      }
      )
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          // console.log("dhaw " , response)
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    // fetchArticles();
  }, []);
 

  const handleChange = (e) => {
    if (e && textAreaRef.current) {
      const newHeight = e.target.value ? `${textAreaRef.current.scrollHeight}px` : `${textAreaRef.current.scrollHeight}px`;
      setTextareaHeight(newHeight);
      setValue("description", e.target.value); // Update the form value
    }
  };

  useEffect(() => {
    handleChange(); // Initial calculation of height
  }, []); // Run only once after component mounted

  return (
    <div className="flex flex-col ml-5 w-[90%] h-[425px]  md:mt-0  max-md:ml-0 max-md:w-full">
      <div style={dark_light_bg} className=" card w-100  rounded-[10px] pt-2 md:pt-2   border-0 mb-3">
        <div className="card-body p-2 position-relative">

          <form className="h-[300px] flex flex-col" onSubmit={handleSubmit(handlePostSubmit)}>
            <div className="card-body d-flex p-0">
              <div className="flex flex-col w-full">
                <div className='flex flex-row mb-3 '>
                  <img
                    srcSet={user?.user?.image ? user?.user.image : placeholder}
                    alt="icon"
                    className="shadow-sm rounded-full aspect-square w-11 h-11 md:w-16 md:h-16 mr-2"
                  />
                  <div className='mt-[5px] md:mt-3  text-xs  '>
                    <div className="flex  flex-row"> <div className="font-bold mr-1"> {
                      user?.user?.nom}</div>
                      <span> {' '}</span>
                      <div className="font-bold">  {
                        user?.user?.prenom}</div></div>

                    {
                      <div className='text-gray-400 font-sans'>
                        {user?.user?.profil === 'other' && user?.other?.profession}
                        {user?.user?.profil === 'player' && 'Joueur'}
                        {user?.user?.profil === 'agent' && user?.agent?.typeresponsable === 'players' && 'Manager de Joueur'}
                        {user?.user?.profil === 'agent' && user?.agent?.typeresponsable === 'club' && 'Manager de Club'}
                        {user?.user?.profil === 'scout' && 'Scout'}
                      </div>
                    }
                  </div>

                </div>
                <div className="flex flex-col w-full gap-y-2">

                  <textarea
                    className="flex max-h-fit px-2 pt-2 h-28 justify-center bg-gray-100 rounded-[8px] md:rounded-[10px] theme-dark-bg"
                    placeholder="Quoi de neuf ?"
                    name="description"
                    {...register("description")}
                    ref={textAreaRef}
                    style={{ height: textareaHeight }} // Set height dynamically
                    onChange={handleChange} // Handle change
                  ></textarea>
                  {errMsg?.message && (
                    <span
                      role="alert"
                      className={`text-sm ${errMsg?.status === "failed"
                        ? "text-[#f64949fe]"
                        : "text-[#2ba150fe]"
                        } mt-0.5`}
                    >
                      {errMsg?.message}
                    </span>
                  )}
                  {/* {previewImage && previewImage.map((image, index) => (
                    <div key={index} className="relative mb-3">
                      <button
                        onClick={() => {
                          const updatedPreviewImages = [...previewImage];
                          updatedPreviewImages.splice(index, 1); // Remove the clicked image from the array
                          setPreviewImage(updatedPreviewImages);
                          const updatedFiles = [...file];
                          updatedFiles.splice(index, 1); // Remove the corresponding file from the array
                          setFile(updatedFiles);
                          setFileType(null); // Clear the fileType when removing images
                        }}
                        className="absolute top-0 right-0 z-10 bg-white rounded-full p-[3px] text-white"
                      > */}

                      
{previewImage && previewImage.map((image, index) => (
          <div key={index} className="relative mb-3">
            <button
              type="button" // Explicitly set button type to prevent form submission
              onClick={(e) => handleRemoveMedia(e, index)}
              className="absolute top-0 right-0 z-10 bg-white rounded-full p-[3px] text-white"
            >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 bg-orange-500 rounded-full"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image}
                        alt="Preview"
                        className="rounded-xxl self-center md:max-h-[600px] max-h-[350px] w-100 object-contain"
                      />
                    </div>
                  ))}
              
                  {videoPreviewUrl && (
                    <div className="w-full rounded-xl px-1 bg-gray-200">
                      <div
                        className="bg-blue-600 text-xs rounded-xl leading-none py-1 text-center  text-white"
                        style={{ width: `${uploadProgress}%` }}
                        role="progressbar"
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  {videoPreviewUrl && (
                    <div className="relative mt-3">
                      <button
                        onClick={() => {
                          setVideoPreviewUrl(null);
                          setFile(null);
                          setFileType(null);
                          setMediaFiles(prev => prev.filter(item => item.type !== 'video'));


                        }}
                        className="absolute top-0 right-0 z-10 bg-white rounded-full p-[3px] text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 bg-orange-500 rounded-full"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <video
                        controls
                        src={videoPreviewUrl}
                        className="rounded-xxl self-center md:max-h-[600px]   max-h-[350px]   w-100 object-contain"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      ></video>
                    </div>
                  )}

                </div>
              </div>



            </div>
            <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4]" />

            <div className="flex flex-col w-full   mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark">
              <div className="flex w-full justify-between  mr-3">
              
                <label htmlFor="imgUpload" className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "image")} // Change to "image"
                    className="hidden"
                    id="imgUpload"
                    accept=".jpg, .png, .jpeg"
                    multiple // Enable multiple file selection
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e551e68fdbcd650c5d3478899a198aaa88ca7d52f6efdc1e5c1cb201ebab45?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="aspect-square w-[25px]"
                  />
                  <span style={dark_light_bg} className="d-none-xs ml-2">Photo</span>
                </label>
                <label
                  className="d-flex align-items-center font-xssss fw-600 mt-1 ls-1 text-grey-700 text-dark"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4, .wav"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ffe4c02d10f8aca8808ca37b8b31a51ff0c4dddae4b08967ea4dcd59524f9e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="aspect-square w-[25px]"
                  />
                  <span style={dark_light_bg} className="d-none-xs ml-2">  {getTranslation(
                    `Video`,  // -----> Englais
                    `Vidéo`, //  -----> Francais
                  )}</span>
                </label>

                <label
                  className="d-flex align-items-center font-xssss mt-1 fw-600 ls-1 text-grey-700 text-dark"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "gif")}
                    className="hidden"
                    id="vgifUpload"
                    accept=".gif"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fd85c3858d242f0bd6e516abd285a594ec826065eceea3da7e87a2de6745740?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="aspect-[1.2] fill-slate-500 w-[30px]"
                  />{" "}
                  <span style={dark_light_bg} className="d-none-xs ml-2">
                    {getTranslation(
                      `GIF`,  // -----> Englais
                      `GIF`, //  -----> Francais
                    )}

                  </span>
                </label>
              </div>
              {errMsg && (
                <div className="flex justify-center mt-2">
                  <span className="text-sm text-[#f64949fe]">{errMsg}</span>
                </div>
              )}
              <div>
                {posting ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 self-center mb-2  items-center text-center w-full py-2.5 m text-white mt-3  px-8 rounded-full font-semibold text-sm"
                  >

                    {getTranslation(
                      `Post`,  // -----> Englais
                      `Publier`, //  -----> Francais
                    )}

                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
