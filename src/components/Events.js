import React, { useState, useEffect } from "react";
import { Config } from "../config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";

function Events() {

  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg } = React.useContext(Context);

  
  const [albums, setAlbums] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    setSelectedCard(id);
    navigate(`/defaultgroup/${id}`);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/albumc`);
        const result = await response.json();

        setAlbums(result.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1].padStart(2, "0"); // Ensure two-digit month
      const day = dateParts[2].padStart(2, "0"); // Ensure two-digit day
      return `${day}-${month}-${year}`;
    } else {
      return null; // Invalid date string
    }
  };

  return (
    <div style={dark_light_bg} className="card w-100 shadow-xss mt-1 rounded-md border-0 mb-3">
      <div   className="flex flex-col mt-1 w-full rounded-md shadow-sm">
        <div className="flex justify-between items-center px-6 pt-2 max-md:px-5">
          <div style={dark_light_bg} className="text-lg font-bold text-zinc-900">
            {getTranslation(
              `Camps that might interest you.`, // -----> Englais
              `Camps qui pourraient vous intéresser` //  -----> Francais
            )}
          </div>
          <div className="flex">
            <div className="text-sm  mx-1 font-medium text-blue-600">
              <a href="/defaultgroup">
                {getTranslation(
                  `See`, // -----> Englais
                  `Voir` //  -----> Francais
                )}
              </a>
            </div>
            <div className="text-sm font-medium text-blue-600 ">
              <a href="/defaultgroup">
                {getTranslation(
                  `All`, // -----> Englais
                  `Tout` //  -----> Francais
                )}
              </a>
            </div>
          </div>
        </div>

        <div style={dark_light_bg} className="flex flex-col flex-wrap content-start px-4 mt-4 w-full  rounded-xl ">
          {albums.map((album) => (
            <div>
              {" "}
              <div
              style={dark_light_bg}

                key={album.id}
                className="flex gap-2  justify-between text-xs font-light text-zinc-900"
              >
                <img
                  loading="lazy"
                  src={album.ImagesAlbumcamps[0].image_url} // Assuming at least one image exists
                  // alt={album.album_name}
                  className="self-start w-20 object-cover aspect-[0.69] rounded-md"
                />
                <div className="flex flex-col  flex-1">
                  <div className="text-base  font-semibold break-before-avoid-page">
                    {album.album_name}
                  </div>
                  <div className="">
                    {getTranslation(
                      `Start Date `, // -----> Englais
                      `Date Début` //  -----> Francais
                    )}
                  </div>
                  <div className="flex gap-2 self-start mt-1 whitespace-nowrap">
                    <div className="grow">{formatDate(album.date_debut)}</div>
                    <div>-</div>
                    <div className="grow">{album.Duree}</div>
                  </div>
                  <p className="self-start text-capitalize ">
                    {album.payscamps}
                  </p>
                  <div className="mt-2  text-xs break-before-avoid-page ">
                    {album.description.length > 100
                      ? album.description.slice(0, 100) + "..."
                      : album.description}
                  </div>
                </div>
              </div>
              <button onClick={() => handleCardClick(album.id)}>
                {" "}
                <div className="justify-center items-center px-16 md:ml-0 ml-20 py-2 mt-4 mb-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                  {getTranslation(
                    `Learn More`, // -----> Englais
                    `En Savoir Plus` //  -----> Francais
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
