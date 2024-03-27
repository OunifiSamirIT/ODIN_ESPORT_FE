import React, { useState, useEffect } from "react";

import Logo from "../assets/ODIN22.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import SlideMenu from "../components/SlideMenu";


const Album = () => {
  const [isActive, setIsActive] = useState(false);

  const [album, setAlbum] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setSelectedCard(id);
    // Navigate to the details page with the selected card's id
    navigate(`/defaultgroup/${id}`);
  };
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const userId = storedUserData ? storedUserData.id : null;
  
    const fetchAlbums = async () => {
      try {
        const response = await fetch("https://odine-sport.com/api/albumc");
        const result = await response.json();
  
        // Convert id to a number before filtering
        const numericId = parseInt(id, 10);
  
        // Filter out the current camp based on the numeric id from useParams
        const filteredAlbums = result.data.filter(value => value.id !== numericId);
  
        setAlbum(filteredAlbums);
  
        console.log(filteredAlbums);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
  
    fetchAlbums();
  }, [id]); // Include id in the dependency array to re-run the effect when id changes
  
  return (
    <>
      <div className="nav-header  bg-white shadow-xs border-0">
        <div className=" flex justify-between items-center w-full">
          <Link to="/home">
            <img src={Logo} className="ml-3 h-28 w-28 " />
            <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">
              {" "}
            </span>{" "}
          </Link>
        </div>
        <SlideMenu setIsActive={setIsActive} />
      </div>

      <div className="flex flex-col items-center pb-9  bg-zinc-100">
   
      <div className="flex justify-center items-center mx-16  px-10  py-10 mt-24 w-[1120px] bg-white rounded-xl ">
        <div className="w-full max-w-[1120px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto text-base max-md:max-w-full">
                <div className="text-7xl font-bold text-blue-600 max-md:max-w-full max-md:text-4xl">
                  THANK YOU !
                </div>
                <div className="text-zinc-900 max-md:max-w-full">
                  Votre préinscription au camp de soccer est enregistrée !
                  N'oubliez pas de vérifier vos e-mails pour la confirmation
                  finale. Nous avons hâte de vous retrouver sur le terrain !
                </div>
                <div className="flex gap-4 justify-center self-start px-8 py-2 mt-6 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9cb7dcd8e4198fc85a3fd9f3a4a89f77f8d22cc38535f84baf50f8089f909e1?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="w-5 aspect-square fill-white"
                  />
                  <Link to="/home"><div className="grow">Revenir au page d’acceuil</div></Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="grow w-full aspect-[0.79] max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-16 mt-6 w-[1120px] bg-white rounded-xl shadow-sm max-w-[1344px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1115px] max-md:max-w-full">
          <div className="flex gap-5 justify-between pt-4 max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-3xl font-bold text-zinc-900 max-md:max-w-full">
              Camps qui pourraient vous intéresser
            </div>
            <div className="self-start mt-3 text-sm font-medium text-blue-600 underline">
              Voir Tout
            </div>
          </div>
          <div className="px-5 mt-6 max-md:max-w-full ">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-md:flex-col max-md:gap-0">
                    {album.map((value, index) => (
                      <div key={index} className="flex flex-col">
                        <div onClick={() => handleCardClick(value.id)}  className="flex flex-col grow items-center pb-4 mx-auto w-full bg-white rounded-xl">
                          <img
                            loading="lazy"
                            srcSet={value.ImagesAlbumcamps[0]?.image_url}
                            className="self-stretch  w-full aspect-square object-cover"
                          />
                          <div className="mt-4 text-base font-semibold text-zinc-900">
                          {value.album_name}
                          </div>
                          <div className="flex  justify-between mt-1 px-2 max-w-full text-xs font-light whitespace-nowrap text-zinc-900 w-[282px]">
                            <div className="flex gap-2">
                              <div className="grow">                          {value.date_debut}
</div>
                              <div>-</div>
                              <div className="grow">{value.date_fin}</div>
                            </div>
                            <div>{value.payscamps}</div>
                          </div>
                          <div className="mt-2 text-xs mx-2 font-light text-zinc-900">
                          {value.description}
                          
                          </div>
                          <div className="flex gap-5 px-2 justify-between mt-2 max-w-full w-[282px]">
                            <div className="flex flex-col whitespace-nowrap text-zinc-900">
                              <div className="text-xs font-light">Prix</div>
                              <div className="mt-1 text-base font-semibold">
                              {value.prix} €
                              </div>
                            </div>
                            <div className="flex justify-center items-center p-3 bg-blue-600 rounded-xl aspect-[1.13]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/688459f573915c74266dcb5eb0235120d7e93fd088c5102dd26fe0420b9723d9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-5 h-3 aspect-[1.33] fill-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Album;
