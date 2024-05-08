import { React, useRef } from 'react';
import CreatePost from './CreatePostss';
import { useState } from 'react';
import { useEffect } from 'react';
import FriendsSlider from './Friendsilderacceuil';
import placeholder from "../assets/placeholder.jpg"
import { Config } from "../config";


function CreatePostModal() {
  const [user, setUser] = useState([]);

  const ref = useRef(null);
  const [isModaldOpen, setIsModaldOpen] = useState(false)
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log(!ref.current.contains(event.target))
      setIsModaldOpen(false)
      

    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCloseModal = () => {
    setIsModaldOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 3 seconds delay
  };
  const handleOpenModal = () => {
    setIsModaldOpen(true);
  };
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          // console.log("dhaw " , response)
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

  }, []);

  return (
    <div>

      <div className="flex flex-col  w-full md:mt-0 mt-12 max-md:ml-0 max-md:w-full">
        <div className=" card w-100  rounded-[10px] pt-2 md:pt-2   border-0 mb-3">
          <div className="card-body p-2 position-relative">

            <div className="card-body d-flex p-0">
              <div className="flex w-full">
                <img
                  srcSet={user?.user?.image ? user?.user.image : placeholder}
                  alt="icon"
                  className="shadow-sm rounded-full aspect-square w-11 h-11 md:w-16 md:h-16 mr-2"
                />
                <div className="flex flex-col w-full gap-y-2">
                  <button
                    className="grow px-2 h-[50px] justify-center  bg-gray-100 rounded-[30px] theme-dark-bg"
                    onClick={handleOpenModal}
                  >Quoi de neuf ? </button>


                  <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4]" />

                  <div className="d-flex w-full mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark">
                    <div className="flex w-full justify-between mr-3">
                      <label
                        htmlFor="imgUpload"
                        className="d-flex align-items-center mt-1 font-xssss fw-600 ls-1 text-grey-700 text-dark"
                      >

                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e551e68fdbcd650c5d3478899a198aaa88ca7d52f6efdc1e5c1cb201ebab45?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="aspect-square w-[25px]"
                        />
                        <span className="d-none-xs ml-2">Photo</span>
                      </label>

                      <label
                        className="d-flex align-items-center font-xssss fw-600 mt-1 ls-1 text-grey-700 text-dark"
                        htmlFor="videoUpload"
                      >

                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ffe4c02d10f8aca8808ca37b8b31a51ff0c4dddae4b08967ea4dcd59524f9e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="aspect-square w-[25px]"
                        />
                        <span className="d-none-xs ml-2"> Video</span>
                      </label>

                      <label
                        className="d-flex align-items-center font-xssss mt-1 fw-600 ls-1 text-grey-700 text-dark"
                        htmlFor="vgifUpload"
                      >

                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fd85c3858d242f0bd6e516abd285a594ec826065eceea3da7e87a2de6745740?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="aspect-[1.2] fill-slate-500 w-[30px]"
                        />{" "}
                        <span className="d-none-xs ml-2">GIF</span>
                      </label>
                    </div>

                    <div>
                      {/* {posting ? (
                        <Loading />
                      ) : (
                        <CustomButton
                          type="submit"
                          title="Publier"
                          containerStyles="bg-blue-600 text-white mt-1 py-1 px-8 rounded-full font-semibold text-sm"
                        />
                      )} */}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex md:w-[730px] w-[100%] md:ml-0  mb-2 -mt-2 '><FriendsSlider /></div>
      </div>


      {isModaldOpen && (
        <div className="bg-black/70 fixed inset-0 z-50 h-full w-full overflow-auto flex justify-center items-center px-8">

          <div ref={ref} className="relative  flex flex-col overflow-auto md:mt-0 p-2 max-w-full bg-white rounded-[10px] w-[705px] h-[425px] max-md:px-5 max-md:my-10">
            <h4 className='self-center  text-xl md:text-2xl py-2.5 font-sora font-semibold'>Créer une Publication</h4>

            <CreatePost onClose={handleCloseModal} />

          </div>

        </div>
      )
      }
    </div >
  )
}

export default CreatePostModal
