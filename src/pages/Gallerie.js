import React, { Component, Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Pagetitle from "../components/Pagetitle";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-auto  h-[70%] overflow-auto">
        <img
          src={imageUrl}
          alt="Full-sized Image"
          className="w-[100%] h-[100%]"
        />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

function Storie() {
  const [galleryItems, setGalleryItems] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    if (storedUserData) {
      const userId = storedUserData.id;
      // Fetch gallery items for the specific user ID
      fetch(`https://odine-sport.com/api/articles/gallery/${userId}`)
        .then((response) => response.json())
        .then((data) => setGalleryItems(data.gallery))
        .catch((error) => console.error(error));
    }
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const filterByTypeAndUser = (item) => {
    return (
      (!filterType ||
        (filterType === "image" && item.image) ||
        (filterType === "video" && item.video)) &&
      item.userId === storedUserData.id
    );
  };

  const filterByType = (type) => {
    setFilterType(type);
  };

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <Pagetitle title="Gallerie" />
                <div className="mb-4">
      <button onClick={() => filterByType(null)} className="mr-4 w-10 bg-slate-100 rounded-md">
        All
      </button>
      <button onClick={() => filterByType('image')} className="mr-4 w-14 bg-slate-100 rounded-md">
        Images
      </button>
      <button onClick={() => filterByType('video')} className="mr-4 w-14 bg-slate-100 rounded-md">
        Videos
      </button>
    </div>
                <div className="row ps-2 pe-1">
                {galleryItems.filter(filterByTypeAndUser).map(item => (
                    <div key={item.id} className="col-md-3 col-xss-6 pe-2 ps-2">
                      <div
                        className="card h300 d-block border-0 shadow-xss rounded-3  overflow-hidden mb-3 bg-image-cover"
                        style={{
                        }}
                      >
                        <div className="card-body d-block w-60 h-80 position-absolute bottom-0 text-center">
                          {item.image && filterType !== 'video' && (
            <img
              src={item.image}
              alt="Image"
              className="float-right p-0 bg-white h-100 w-80 shadow-xss object-cover transition-transform duration-300 transform hover:scale-110 cursor-pointer"
              onClick={() => openModal(item.image)}
            />
          )}
          {item.video && filterType !== 'image' && (
            <video
              src={item.video}
              controls
              className="float-right p-0 bg-white  w-full shadow-xss"            >
              Your browser does not support the video tag.
            </video>
          )}
                          
                          
                          
                            
                          <div className="clearfix"></div>
                          <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">
                            {/* {value.name} */}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Storie;
