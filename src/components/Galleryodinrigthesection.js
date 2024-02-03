import React,{Component, useEffect, useState} from 'react';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
import { Link } from 'react-router-dom';
import GalleryOdinForuser from "../pages/Gallerieuserodin"


const ImageModal = ({ imageUrl, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="w-auto  h-[70%] overflow-auto">
          <img src={imageUrl} alt="Full-sized Image" className="w-[100%] h-[100%]" />
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
function  Profilephoto () {
    const [galleryItems, setGalleryItems] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem('user'));
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    if (storedUserData) {
      const userId = storedUserData.id;
      // Fetch gallery items for the specific user ID
      fetch(`http://localhost:5000/api/articles/gallery/${userId}`)
        .then(response => response.json())
        .then(data => setGalleryItems(data.gallery))
        .catch(error => console.error(error));
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
        (filterType === 'image' && item.image) ||
        (filterType === 'video' && item.video)) &&
      item.userId === storedUserData.id
    );
  };

  const filterByType = (type) => {
    setFilterType(type);
  };


        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center  p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
                    <a href="/home" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                {/* <div className="card-body d-block pt-0 pb-2">
                    <div className="row ps-3 pe-3">
                    {galleryItems.filter(filterByTypeAndUser).map(item => (
                            <div className="col-6 mb-1 p-1" key={item.id}>
                                    
                                   <Link to='/gallery'>     {item.image && filterType !== 'video' && (
                                            <img
                                              src={item.image}
                                              alt="Image"
                                              className="mb-2 rounded-md h-20 w-48 md:h-20  object-cover transition-transform duration-300 transform hover:scale-110 cursor-pointer"
                                              onClick={() => openModal(item.image)}
                                            />
                                          )} 
                                         
                                
                                 
                                        {item.video && filterType !== 'image' && (
                                            <video
                                              src={item.video}
                                              controls
                                              className="mb-2 rounded-md h-48 md:h-64 w-full object-cover"
                                            >
                                              Your browser does not support the video tag.
                                            </video>
                                          )}
                                          </Link>
                                         
                                
                                
                               
                            
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-body d-block w-100 pt-0">
                    <a href="/home" className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> More</a>
                </div> */}
<GalleryOdinForuser/>
            </div>
        );
    
}

export default Profilephoto;