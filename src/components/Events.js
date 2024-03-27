import React, {  useState,  useEffect } from "react";

function Events() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("https://odine-sport.com/api/albumc");
        const result = await response.json();
        setAlbums(result.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className="card w-100 shadow-xss mt-3 rounded-md border-0 mb-3">
      <div className="flex flex-col mt-6 w-full bg-white rounded-md shadow-sm">
        <div className="flex gap-5 justify-between px-6 pt-4 max-md:px-5">
          <div className="text-xl font-bold text-zinc-900">
            Camps qui pourraient vous intéresser
          </div>
          <div className="self-end mt-10 text-sm font-medium text-blue-600 underline">
            Voir Tout
          </div>
        </div>
        <div className="flex flex-col flex-wrap content-start p-6 mt-8 w-full bg-white rounded-xl max-md:px-5">
          {albums.map((album) => (
     <div>  <div key={album.id} className="flex gap-2  justify-between text-xs font-light text-zinc-900">
       <img
                loading="lazy"
                src={album.ImagesAlbumcamps[0].image_url} // Assuming at least one image exists
                alt={album.album_name}
                className="self-start w-20 aspect-[0.69] rounded-md"
              />
              <div className="flex flex-col flex-1">
                <div className="text-base font-semibold whitespace-nowrap">
                  {album.album_name}
                </div>
                <div className="flex gap-2 self-start mt-1 whitespace-nowrap">
                  <div className="grow">{album.date_debut}</div>
                  <div>-</div>
                  <div className="grow">{album.date_fin}</div>
                </div>
                <div className="self-start ">{album.payscamps}</div>
                <div className="mt-2 text-xs">{album.description}</div>
              </div>
            
            </div>  
            <div className="justify-center items-center px-16 py-2 mt-4 mb-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
          En Savoir Plus
        </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
