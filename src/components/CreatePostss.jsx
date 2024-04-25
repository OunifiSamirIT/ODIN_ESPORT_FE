import React from 'react'
import { Config } from "../config";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import CustomButton from "../components/CustomButton";
import Loading from './Loading';
import placeholder from "../assets/placeholder.jpg"

function CreatePost({ setArticles }) {
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
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Config.LOCAL_URL}/api/articles`);
      const result = await response.json();

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

      let newArticles = await Promise.all(articlesWithPromises);
      newArticles = newArticles.reverse(); // Reverse the order of all articles
      const initialArticles = newArticles.slice(0, 50); // Get the first 10 articles
      setArticles(initialArticles);
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);

      // Load the remaining articles after initial set is loaded
      const remainingArticles = newArticles.slice(50);
      if (remainingArticles.length > 0) {
        await loadRemainingArticles(remainingArticles.reverse()); // Reverse the order of remaining articles
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadRemainingArticles = (remainingArticles) => {
    setArticles((prevArticles) => [...prevArticles, ...remainingArticles]);
  };

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    if (type === "video") {
      const videoPreviewURL = URL.createObjectURL(selectedFile);
      setVideoPreviewUrl(videoPreviewURL);
      // Clear the image preview if there was one
      setPreviewImage(null);
    } else {
      const imagePreviewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(imagePreviewURL);
      // Clear the video preview if there was one
      setVideoPreviewUrl(null);
    }
  };
  const handlePostSubmit = async (data) => {
    try {
      if (!storedUserData.id) {
        // Handle validation errors or missing user data
        return;
      }
      if (!data.description && !file) {
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
      await fetch(`${Config.LOCAL_URL}/api/articles/`, {
        method: "POST",
        body: formData,
      });

      // After creating the article, fetch the updated list of articles
      const response = await fetch(`${Config.LOCAL_URL}/api/articles/`);
      const updatedPostsData = await response.json();
      hendelrest()
      // Update the list of posts and reset the preview image
      setPostsData(updatedPostsData);
      setPreviewImage(null);
      setValue("description", "");

      setPosting(false);
      fetchArticles();
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
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    fetchArticles();
  }, []);
  return (
    <div className="flex flex-col ml-5 w-full md:mt-0 mt-12 max-md:ml-0 max-md:w-full">
      <div className=" card w-100  rounded-[10px] pt-2 md:pt-2   border-0 mb-3">
        <div className="card-body p-2 position-relative">
          {previewImage && (
            <div className="mb-3">
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-xxl"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
          {videoPreviewUrl && (
            <div className="mt-3">
              <video
                controls
                src={videoPreviewUrl}
                className="rounded-xxl"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              ></video>
            </div>
          )}
          <form onSubmit={handleSubmit(handlePostSubmit)}>
            <div className="card-body d-flex p-0">
              <div className="flex w-full">
                <img
                  srcSet={user?.user?.image ? user?.user.image : placeholder}
                  alt="icon"
                  className="shadow-sm rounded-full aspect-square w-16 h-16 mr-2"
                />
                <div className="flex flex-col w-full gap-y-2">
                  <input
                    className="grow px-2 h-[50px] justify-center  bg-gray-100 rounded-[30px] theme-dark-bg"
                    placeholder="Quoi de neuf ? "
                    name="description"
                    {...register("description")}
                  />
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

                  <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4]" />

                  <div className="d-flex w-full mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark">
                    <div className="flex w-full justify-between mr-3">
                      <label
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
                        <span className="d-none-xs ml-2"> Video</span>
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
                        <span className="d-none-xs ml-2">GIF</span>
                      </label>
                    </div>

                    <div>
                      {posting ? (
                        <Loading />
                      ) : (
                        <CustomButton
                          type="submit"
                          title="Publier"
                          containerStyles="bg-blue-600 text-white mt-1 py-1 px-8 rounded-full font-semibold text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
