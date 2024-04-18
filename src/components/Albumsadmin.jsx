import React from 'react'
import { useEffect } from 'react';
import { Config } from "../config";
import { useState } from 'react';
import AdminImg from "../assets/ODIN22.png";

function Albumsadmin( {item} ) {
    const [album, setAlbum] = useState([]);

    useEffect(() => {
      
        
        // fetchAlbums();
      }, []);
    
      const fetchAlbums = async () => {
        try {
          const response = await fetch(`${Config.LOCAL_URL}/api/album`);
          const result = await response.json();
          console.log("----------------_-_admin--------", result)
    
          setAlbum(
            result.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
        } catch (error) {
          console.error("Error fetching albums:", error);
        }
      };
  return (
    <div className="flex flex-col ml-5 w-full md:mt-0 mt-12 max-md:ml-0 max-md:w-full">
                      <div
                        key={item.id}
                        className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                      >
                        <div className="card-body p-0 d-flex">
                          <figure className="avatar me-3">
                            <img
                              src={AdminImg}
                              className="shadow-sm rounded-circle w-10 h-10"
                              alt="post"
                            />{" "}
                          </figure>
                          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            ODIN Sport
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                              {item.createdAt}
                            </span>
                          </h4>
                        </div>

                        <div className="card-body d-block p-0 mb-3">
                          <div className="row ps-2 pe-2">
                            <div className="col-sm-12 p-1">
                              <div
                                className="card-body position-relative h200 bg-image-cover bg-image-center cover"
                                style={{
                                  backgroundImage: `url(${item.ImagesAlbums[0]?.image_url})`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body p-0 me-lg-5">
                          <p className="fw-500 font-thin lh-26 ml-8 rounded-md font-xssss w-100 mb-2 text-dark theme-dark-bg">
                            {item.description}
                          </p>
                        </div>
                      </div>
    </div>
  )
}

export default Albumsadmin