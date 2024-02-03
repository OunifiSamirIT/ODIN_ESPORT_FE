// import React, { useEffect , useState } from "react";
// import { useParams } from 'react-router-dom';
// import Header from '../components/Header';

// import Pagetitle from '../components/Pagetitle';
// import Appfooter from '../components/Appfooter';



// const ViewAlbum = () => {
//     const { id } = useParams();
//     const [album , setAlbum] = useState([])
//     const [isLoading , setIsLoading] = useState(true)
   
//     const fetchAlbumData = async () => {
//         setIsLoading(true);
//         const url = "https://odine-sport.com/api/album/" + id;
//         try {
//           const response = await fetch(url);
//           const result = await response.json();
//           setAlbum(result.data);
//           setIsLoading(false);
//           console.log(album)
//         } catch (error) {
//           console.error("Error fetching user:", error);
//         }
//       };
      
//       useEffect(() => {
//         fetchAlbumData();
//       }, [id]);

// return(
//     <>      
//              <Header />
//                 <div className="main-content right-chat-active">
//                     <div className="middle-sidebar-bottom">
//                         <div className="middle-sidebar-left pe-0">
//                             <div className="row">
//                                 <div className="col-xl-12">
                                    
//                                     <Pagetitle title={album.album_name}/>
                                    
//                                     <div className="row ps-2 pe-1">
//                                     {/* <div  className="col-md-3 col-xss-6 pe-2 ps-2 ">
//                                             <div className="card h300 d-flex justify-items-center align-items-center cursor-pointer border-0 bg-light shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{backgroundImage: `url("assets/images/bgImage.png")`}}>
//                                                 <div className="card-body d-block w-100 position-absolute bottom-0 text-center bg-light ">
//                                                    <i className="feather-plus font-lg mr-2"></i>
//                                                 </div>
//                                             </div>
//                                         </div> */}
//                                         {album.ImagesAlbums &&  album.ImagesAlbums.map((value , index) => (

//                                         <div key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
//                                             <div className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{backgroundImage: `url("${value.image_url}")`}}>
//                                                 <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
//                                                     <div className="clearfix"></div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         ))}

                                        
//                                     </div>
//                                 </div>               
//                             </div>
//                         </div>
                        
//                     </div>
//                 </div>
//                 <Appfooter /> 
//             </>
// )
            
// }

// export default ViewAlbum ;


import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Modal from 'react-modal'; // Import the modal component

const ViewAlbum = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); // To keep track of the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal state

    const fetchAlbumData = async () => {
        setIsLoading(true);
        const url = `https://odine-sport.com/api/album/${id}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            setAlbum(result.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchAlbumData();
    }, [id]);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Header />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <Pagetitle title={album.album_name} />
                                <div className="row ps-2 pe-1">
                                    {album.ImagesAlbums && album.ImagesAlbums.map((value, index) => (
                                        <div key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
                                            <div
                                                className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover relative"
                                                style={{ backgroundImage: `url("${value.image_url}")` }}
                                                onClick={() => openModal(value)}
                                            >
                                                <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                                                    <div className="clearfix"></div>
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
            <Appfooter />

            {/* Modal for displaying the image */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
                    <div className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto relative">
                        {selectedImage && (
                            <img src={selectedImage.image_url} alt="Full size" className="max-w-full max-h-screen object-contain" />
                        )}
                        <button className="absolute top-2 bg-red-500 rounded-full w-6 h-6 right-2 text-white font-extrabold" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewAlbum;
