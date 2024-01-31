import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [editArticle, setEditArticle] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileType, setFileType] = useState(""); // Add this state

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8088/api/articles/${articleId}`
        );
        if (response.ok) {
          const article = await response.json();
          setEditArticle(article);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const handleUpdateArticle = async () => {
    try {
      if (!editArticle.description) {
        // setErrMsg({ status: "failed", message: "Fill all the information" });
        return;
      }

      const formData = new FormData();
      formData.append("titre", editArticle.titre);
      formData.append("description", editArticle.description);
      formData.append("userId", storedUserData.id);

      // Check if file and fileType are present before appending to FormData
      if (file) {
        formData.append("file", file);
        formData.append("fileType", fileType || ""); // Ensure fileType is always present
      }

      // Make a PUT request to update the article
      const response = await fetch(
        `http://localhost:8088/api/articles/${editArticle.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("........................" , response)
        const updatedArticle = await response.json();
        setEditArticle(null);

        // Redirect to the home page after successful update
        navigate("/");
      } else {
        // Handle errors
        console.error("Error updating article:", response.statusText);
        const errorData = await response.json();
        // setErrMsg({ status: "failed", message: errorData.message || "Error updating article" });
      }
    } catch (error) {
      console.error("Error updating article:", error);
      // setErrMsg({ status: "failed", message: "Error updating article" });
    }
  };
  

  if (!editArticle) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Article</h2>
      <form>
        {/* Render form fields with pre-filled values from editArticle */}
        <label>Title:</label>
        <input
          type="text"
          value={editArticle.titre}
          onChange={(e) =>
            setEditArticle((prev) => ({ ...prev, titre: e.target.value }))
          }
        />

        <label>Description:</label>
        <input
          type="text"
          value={editArticle.description}
          onChange={(e) =>
            setEditArticle((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        {/* Add file input for image */}
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "image")}
        />
        {previewImage && <img src={previewImage} alt="Preview" />}

        {/* Add file input for video */}
        <label>Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, "video")}
        />
        {previewImage && <video controls src={previewImage} alt="Preview" />}

        <button type="button" onClick={handleUpdateArticle}>
          Update Article
        </button>
      </form>
    </div>
  );
};

export default EditPage;
