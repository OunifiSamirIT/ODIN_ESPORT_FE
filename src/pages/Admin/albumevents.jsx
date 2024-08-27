import React, { useState, useEffect } from "react";
import Header from "../Admin/Components/AdminHeader";
import Leftnav from "../../components/Leftnav";
import Rightchat from "../../components/Rightchat";
import Pagetitle from "../../components/Pagetitle";
import Appfooter from "../../components/Appfooter";
import Popupchat from "../../components/Popupchat";
import Load from "../../components/Load";
import { Link } from "react-router-dom";
import { Config } from "../../config";
import secureLocalStorage from "react-secure-storage";

const Album = () => {
  const [album, setAlbum] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData.token;

  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const id = storedUserDatad ? storedUserDatad.id : null;
  console.log("eeeeeeeeeeeee", tokenn);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${Config.LOCAL_URL}/api/albumevent`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        });

        const result = await response.json();

        setAlbum(result.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchAlbums();
  }, []);
  return (
    <>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <Link
                  to="/admin/albumevents/create"
                  className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 mb-4 text-uppercase rounded-3 ls-2 bg-info d-inline-block text-white me-1"
                >
                  Create New Events
                </Link>
              </div>
              <div className="col-xl-12">
                <Pagetitle title="EventsOdin" />
                <div className="row ps-2 pe-1">
                  {album.map((value, index) => (
                    <div key={index} className="col-md-6 col-sm-6 pe-2 ps-2">
                      <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                        <div
                          className="card-body position-relative h200 bg-image-cover bg-image-center cover"
                          style={{
                            backgroundImage: `url(${value.ImagesAlbumevents[0]?.image_url})`,
                          }}
                        ></div>
                        <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                          <div className="clearfix"></div>
                          <h4 className="fw-700 font-xsss mt-3 mb-1">
                            {value.album_name}
                          </h4>
                          <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">
                            {value?.description}
                          </p>
                          <span className="position-absolute right-15 top-0 d-flex align-items-center">
                            <a
                              href={"/gallery/view/" + value.id}
                              className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                            >
                              View
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Load />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popupchat />
      <Appfooter />
    </>
  );
};

export default Album;
