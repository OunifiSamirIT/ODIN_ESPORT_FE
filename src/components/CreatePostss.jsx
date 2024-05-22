import React from 'react'
import { Config } from "../config";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import CustomButton from "../components/CustomButton";
import Loading from './Loading';
import placeholder from "../assets/placeholder.jpg"
import { useRef } from 'react';
import {Context} from "../index";


function CreatePost({ setArticles , onClose}) {
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const [user, setUser] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({ description: "", otherField: "" });
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]); // State for storing media files

  const [fileType, setFileType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {_currentLang, _setLang, getTranslation} = React.useContext(Context)

 
  const loadRemainingArticles = (remainingArticles) => {
    setArticles((prevArticles) => [...prevArticles, ...remainingArticles]);
  };

 
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Filter out media files based on type
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    const videoFile = selectedFiles.find(file => file.type.startsWith('video/'));
  
    // Update state with media files
    setMediaFiles([...imageFiles, videoFile].filter(Boolean));
  
    // Set preview images for each uploaded image
    const imagePreviewURLs = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewImage(imagePreviewURLs);
  
    // Set video preview URL
    if (videoFile) {
      const videoPreviewURL = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(videoPreviewURL);
    } else {
      setVideoPreviewUrl(null);
    }
  }; 
  
  
  const _ref_previewImage = useRef(null);
  const _ref_previewVideo = useRef(null);

  const handlePostSubmit = async (data) => {
    try {
      if (!storedUserData.id) {
        // Handle validation errors or missing user data
        return;
      }
  
      // Check if neither description nor files are provided
      if (!data.description && !mediaFiles.length) {
        setErrMsg("Ajouter quelque chose pour publier "); // Set error message
        return; // Exit the function without submitting
      }
  
      setPosting(true);
      const formData = new FormData();
      formData.append("titre", "Your default title");
      formData.append("description", data.description || ""); // Append empty string if description is null
      formData.append("userId", storedUserData.id);
      formData.append("type", "Your default type");
  
      // Append media files if they exist
      if (mediaFiles.length) {
        mediaFiles.forEach((file, index) => {
          formData.append("media", file); // Assuming "file" is the media file
        });
      }
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${Config.LOCAL_URL}/api/articles/`);
  
      // Attach event listener to monitor upload progress
      xhr.upload.onprogress = (event) => {
        console.log("Progress event triggered:", event.loaded, event.total);
        const percentage = (event.loaded / event.total) * 100;
        console.log("Progress percentage:", percentage);
        setUploadProgress(Math.trunc(percentage));
      };
  
      // Send the FormData with XMLHttpRequest
      xhr.send(formData);
  
      // Reset state after successful submission
      setMediaFiles([]);
      setValue("description", "");
  
      setPosting(false);
      setErrMsg(""); // Clear error message
  
      // Close the modal after a delay
      setTimeout(() => {
        onClose();
      }, 2800);
    } catch (error) {
      console.error("Error submitting post:", error);
      setPosting(false);
    }
  };
  
  
  const hendelrest = () => {
    setData("")
  }
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          // console.log("dhaw " , response)
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    // fetchArticles();
  }, []);
  const [textareaHeight, setTextareaHeight] = useState('70px');
  const textAreaRef = useRef(null);

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
      <div className=" card w-100  rounded-[10px] pt-2 md:pt-2   border-0 mb-3">
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
 {previewImage && previewImage.map((image, index) => (
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
          {/* {previewImage && (
  <div className="relative mb-3">
    <button
       onClick={() => {
        setPreviewImage(null);
        setFile(null);
        setFileType(null);
        
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
    <img
      src={previewImage}
            alt="Preview"
      className="rounded-xxl self-center md:max-h-[600px] max-h-[350px] w-100 object-contain"
    />
  </div>
)} */}
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
    {/* <label
      htmlFor="imgUpload"
      className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark"
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="imgUpload"
        accept=".jpg, .png, .jpeg"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e551e68fdbcd650c5d3478899a198aaa88ca7d52f6efdc1e5c1cb201ebab45?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
        className="aspect-square w-[25px]"
      />
      <span className="d-none-xs ml-2">{ getTranslation(
            `Photo`,  // -----> Englais
              `Photo`, //  -----> Francais
                           )  }</span>
    </label> */}
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
  <span className="d-none-xs ml-2">Photo</span>
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
      <span className="d-none-xs ml-2">  { getTranslation(
            `Video`,  // -----> Englais
              `Vidéo`, //  -----> Francais
                           )  }</span>
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
      <span className="d-none-xs ml-2">
      { getTranslation(
            `GIF`,  // -----> Englais
              `GIF`, //  -----> Francais
                           )  }

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
      
      { getTranslation(
            `Post`,  // -----> Englais
              `Publier`, //  -----> Francais
                           )  } 

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
