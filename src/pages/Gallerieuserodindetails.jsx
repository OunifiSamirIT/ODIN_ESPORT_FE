import React, { useState, useEffect } from "react";
import Header from "../components/Header";
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';
import Pagetitle from "../components/Pagetitle";
// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';
import Load from "../components/Load";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { Config } from "../config";
const Album = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);



  const [modalHeight, setModalHeight] = useState('70%');
  const [modalWidth, setModalWidth] = useState('70%');

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      setModalHeight(isMobile ? '50%' : '70%');
      setModalWidth(isMobile ? '90%' : '70%');
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleCardClick = (index) => {
    setSelectedImageIndex(index + 1); // Increment index by 1 to start from index 1
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const navigate = useNavigate();
  const { id: campsId } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const userId = storedUserData ? storedUserData.id : null;
  const [isUserPreinscribed, setIsUserPreinscribed] = useState(false);  // Add this line

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/albumc/${campsId}`);
        const result = await response.json();

        if (result.message === "done" && result.data) {
          setAlbumDetails(result.data);
        } else {
          console.error("No data received from the API for album details");
        }
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };

    const fetchInscriptions = async () => {
      try {
        const response = await fetch("https://odine-sport.com/api/inscritinfo");
        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          setInscriptions(result);

          const userPreinscribed = result.find(
            (inscription) => inscription.userId === userId && inscription.campsId === parseInt(campsId)
          );

          if (userPreinscribed) {
            setIsUserPreinscribed(true);
          }
        } else {
          console.error("No data received for inscriptions");
        }
      } catch (error) {
        console.error("Error fetching inscriptions:", error);
      }
    };

    fetchAlbumDetails();
    fetchInscriptions();
  }, [campsId, userId]);

  if (!albumDetails) {
    return <div>Loading...</div>;
  }
  
  
  
  
  const handleAlbumButtonClick = () => {
  
      navigate(`/FormCamps/${campsId}`);
   
  };
  
  
  
  







  
  
  return (
    <>
      <Header />
      {/* <Leftnav />
                <Rightchat /> */}

      <div className="flex flex-col mt-12 pb-12 bg-zinc-100">
      
      <div className="self-center mt-12 w-full max-w-[1344px] max-md:mt-10 max-md:max-w-full">
        <div className="flex mr-2 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
           
          </div>
          <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
              <div className="justify-between px-8 py-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      src={albumDetails.ImagesAlbumcamps[0]?.image_url}
                      className="grow w-full aspect-[0.7] object-cover max-md:mt-10"
                    />
                  </div>
                       <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-10 max-md:max-w-full">
                      <div className="text-3xl font-bold max-md:max-w-full">
                      {albumDetails.album_name}
                      </div>
                      <div className="mt-4 font-light max-md:max-w-full">
                      {albumDetails.description}
                      </div>
                      <div className="flex gap-3 justify-between p-4 mt-4 whitespace-nowrap rounded-xl border border-solid border-neutral-200 max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28072299919cd6610830b1b847db76fa736c975769fafa1e967a25837aa2c386?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">{albumDetails.Duree}</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7fe0f54388243cde5eda2567d634e20fcaedc6593a7e131847cf26794a55f35?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">{albumDetails.payscamps}</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/545e939511a47d6db83d17be743c494bcd9b7824f609f0def7b7a0a0da2ac415?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">{albumDetails.date_debut}</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3d803e2aa84cc65dafa06294cf90b747ef51e660e2c45f13da33c1f8a6c4b0e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">{albumDetails.date_fin}</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dff4dfbc9781a939e5690bf8f047fdfc420dbf36c9e00ec905ac56bf410a2e14?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center aspect-[0.9] fill-zinc-900 w-[18px] mr-3"
                          />
                          <div className="mt-2">{albumDetails.prix} €</div>
                        </div>
                      </div>
                      {!isUserPreinscribed && (<div className="flex justify-center items-center px-16 py-2 mt-4 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4185b5905b50428887ea8bc5135f9d41832f7a4a61c88cd3baa7301b1591ace2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 aspect-square"
                          />
  
  
  <button className="grow" onClick={handleAlbumButtonClick}>
    Pré-inscrire
  </button>

                        </div>
                      </div>)}  {isUserPreinscribed && (
          <div className="flex justify-center items-center p-4 mt-4 font-medium text-green-600 bg-green-100 rounded-md">
            Vous étes deja pré-inscrit !
          </div>
        )} 
                    </div>
                  </div>  
                </div>
              </div>









       








<div className="px-4 mt-6 max-md:max-w-full">
  <div className="flex flex-wrap gap-1">
    {albumDetails.ImagesAlbumcamps.slice(1).map((image, index) => (
      <div key={index} className="ml-3 w-[45%] md:w-[30%] lg:w-[30%]">
        <img
          loading="lazy"
          src={image.image_url}
          className="w-full aspect-square "
          onClick={() => handleCardClick(index)}

        />
      </div>
    ))}
  </div>
</div>










         
             
             
            </div>
          </div>
        </div>
      </div>
    </div>

     

    {/* <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Image Modal"
  style={{
    content: {
      overflow: 'hidden', // Hide scroll
      position: 'absolute',
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-40%, -50%)', // Center the modal
      width: '50%', // Set width
      height: '80%', // Set height
      marginTop: '3%', // Adjust margin top
      padding: '0', // Remove default padding
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Add overlay color
    },
  }}
>
  <button onClick={closeModal}>Close Modal</button>
  {albumDetails.ImagesAlbumcamps.slice(selectedImageIndex).map((image, index) => (
    <img
      key={index + selectedImageIndex}
      loading="lazy"
      src={image.image_url}
      alt={`Image ${index + selectedImageIndex}`}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ))}
</Modal> */}



<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Image Modal"
  className="custom-modalCamps" // Add the desired class name

  style={{
    content: {
      overflow: 'hidden', // Hide scroll
      position: 'absolute',
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      width: modalWidth,
      height: modalHeight,
      margin: '0', // Remove default margin
      padding: '0', // Remove default padding
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Add overlay color
    },
  }}
>
  <button onClick={closeModal}>Close Modal</button>
  {albumDetails.ImagesAlbumcamps[selectedImageIndex] && (
    <img
      loading="lazy"
      src={albumDetails.ImagesAlbumcamps[selectedImageIndex].image_url}
      alt={`Image ${selectedImageIndex}`}
      style={{
        width: '100%', // Set width to 100% for responsiveness
        height: '100%', // Set height to 100% for responsiveness
        objectFit: 'contain', // Maintain aspect ratio and cover the container
      }}
    />
  )}
  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1%', cursor: 'pointer' }} onClick={() => setSelectedImageIndex((prevIndex) => Math.max(prevIndex - 1, 0))}>
   <p className="bg-amber-500 text-white p-2 rounded-full text-2xl"> {`<`}</p> 
  </div>
  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '1%', cursor: 'pointer'  }} onClick={() => setSelectedImageIndex((prevIndex) => Math.min(prevIndex + 1, albumDetails.ImagesAlbumcamps.length - 1))}>
  <p className="bg-amber-500 text-white p-2 rounded-full text-2xl "> {`>`}</p> 
  </div>
</Modal>


    
    </>
  );
};

export default Album;
