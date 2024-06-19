import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import Hero2 from "../assets/Frame 18.png";
import Hero from "../assets/Frame 182.png";
import Hero1 from "../assets/Frame 183.png";
import jr from "../assets/jr.png";
import "../components/Hamburger.css";
import { Config } from "../config";
import LanguageToggler from "../fixDesignComponents/languageToggler";
import "./demo.css";
// wehed
import gsap from "gsap";
import { Context } from "../index";
import PdfModal from "../pages/PdfModal";

const newDemoList = [
  {
    imageUrl: "home.jpg",
    title: "Home",
    url: "home",
  },
  {
    imageUrl: "badge.jpg",
    title: "Badge",
    url: "defaultbadge",
  },
  {
    imageUrl: "member.jpg",
    title: "Member",
    url: "defaultmember",
  },
  {
    imageUrl: "story.jpg",
    title: "Storie",
    url: "defaultstorie",
  },

  {
    imageUrl: "group.jpg",
    title: "Group",
    url: "defaultgroup",
  },
  {
    imageUrl: "group-page.jpg",
    title: "Group Page",
    url: "grouppage",
  },
  {
    imageUrl: "user.jpg",
    title: "User",
    url: "userpage",
  },
  {
    imageUrl: "author.jpg",
    title: "Group",
    url: "authorpage",
  },
  {
    imageUrl: "email.jpg",
    title: "Email",
    url: "defaultemailbox",
  },
  {
    imageUrl: "email-open.jpg",
    title: "Email Open",
    url: "defaultemailopen",
  },
  {
    imageUrl: "message.jpg",
    title: "Message",
    url: "defaultmessage",
  },
  {
    imageUrl: "job.jpg",
    title: "Job",
    url: "defaultjob",
  },
  {
    imageUrl: "hotel.jpg",
    title: "Hotel",
    url: "defaulthotel",
  },
  {
    imageUrl: "hotel-open.jpg",
    title: "Hotel Page",
    url: "defaulthoteldetails",
  },
  {
    imageUrl: "event.jpg",
    title: "Event",
    url: "defaultevent",
  },
  {
    imageUrl: "live.jpg",
    title: "Live",
    url: "defaultlive",
  },
  {
    imageUrl: "noti.jpg",
    title: "Notification",
    url: "defaultnotification",
  },
  {
    imageUrl: "video.jpg",
    title: "Video",
    url: "defaultvideo",
  },
  {
    imageUrl: "analytics.jpg",
    title: "Analytics",
    url: "defaultanalytics",
  },

  {
    imageUrl: "shop-3.jpg",
    title: "Shop One",
    url: "shop1",
  },
  {
    imageUrl: "shop-1.jpg",
    title: "Shop two",
    url: "shop2",
  },

  {
    imageUrl: "cart.jpg",
    title: "Cart",
    url: "cart",
  },
  {
    imageUrl: "checkout.jpg",
    title: "Checkout",
    url: "checkout",
  },
  {
    imageUrl: "single-product.jpg",
    title: "Single Product 2",
    url: "singleproduct",
  },
  {
    imageUrl: "login.jpg",
    title: "Login",
    url: "login",
  },
  {
    imageUrl: "register.jpg",
    title: "Register",
    url: "register",
  },
  {
    imageUrl: "forgot.jpg",
    title: "Forgot",
    url: "forgot",
  },
  {
    imageUrl: "coming-soon.jpg",
    title: "Coming Soon",
    url: "comingsoon",
  },
  {
    imageUrl: "404.jpg",
    title: "404",
    url: "notfound",
  },
  {
    imageUrl: "help-box.jpg",
    title: "Help",
    url: "helpbox",
  },
  {
    imageUrl: "d-17.jpg",
    title: "Settings",
    url: "defaultsettings",
  },
  {
    imageUrl: "d-15.jpg",
    title: "Contact",
    url: "contactinformation",
  },
  {
    imageUrl: "d-16.jpg",
    title: "Account",
    url: "accountinformation",
  },
  {
    imageUrl: "d-19.jpg",
    title: "Payment",
    url: "payment",
  },
  {
    imageUrl: "d-18.jpg",
    title: "Password",
    url: "password",
  },
  {
    imageUrl: "d-20.jpg",
    title: "Social",
    url: "socialaccount",
  },
];

function Demo() {
  // thnen

  //start _________ translation context
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
  //end _________ translation context

  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const contactUsRef = useRef();

  const toggleButtons = () => {
    setIsButtonsVisible(!isButtonsVisible);
  };

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [formData, setFormData] = useState({
    emailuser: "",
    nomPrenom: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Email envoyer avec  success", {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Reset form fields or show success message
        setFormData({
          emailuser: "",
          nomPrenom: "",
          message: "",
        });
      } else {
        console.error("Failed to submit contact form");
        // Handle error (e.g., display error message)
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Handle error (e.g., display error message)
    }
  };

  // const friendsettings = {
  //   arrows: true,
  //   dots: true,
  //   infinite: true,
  //   speed: 400,
  //   slidesToShow: 1,
  //   centerMode: false,
  //   variableWidth: false,
  //   autoplay: true,
  //   autoplaySpeed: 3500,
  //   adaptiveHeight: true,
  // };
  const friendsettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 3500,
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div className="absolute bottom-[-80px] w-full flex justify-center">
        <ul> {dots} </ul>
      </div>
    ),
  };

  const [Hamburger, setHumberger] = useState(false);

  const handleClickHamburger = () => {
    setHumberger(!Hamburger);
    // Start animation for rectangle 1
    if (Hamburger === true) {
      rect1Ref.current.classList.remove("animate-rect1");
      rect2Ref.current.classList.remove("animate-rect2");
      rect3Ref.current.classList.remove("animate-rect3");
    } else {
      rect1Ref.current.classList.add("animate-rect1");
      rect2Ref.current.classList.add("animate-rect2");
      rect3Ref.current.classList.add("animate-rect3");
    }
  };
  const rect1Ref = useRef(null);
  const rect2Ref = useRef(null);
  const rect3Ref = useRef(null);

  let animateWelcomingOdinLogo = () => {
    gsap
      .timeline()

      .to(".odinAnimation .animatedImageContainer", {
        delay: 0.5,
        duration: 0.8,
        opacity: 1,
        scale: 1,
      })
      // .to(".odinAnimation .odinLogoAnimation", {
      //   delay: .2,

      //   duration: .5,
      //   x: 0 ,

      // })
      // .to(".odinAnimation .textContent", {
      //   delay: .2,
      //   duration: .5,

      //   opacity: 1 ,

      // })
      .to(".odinAnimation .odinloader .inner", {
        delay: 0.2,
        duration: 1,
        width: "100%",
        // ease: "linear"
      })
      .to(".odinloader", {
        delay: 0.6,
        duration: 0.6,
        // x: 5,
        opacity: 0,
        scacle: 0.7,
      })
      .to(".animatedImageContainer", {
        // delay: -.2,
        duration: 0.7,
        scacle: 0.7,
        opacity: 0,
        onComplete: () => {
          window.scrollTo({
            top: 0,
            behavior: "instant",
          });
        },
      })
      .to(".odinAnimation", {
        delay: 0.2,
        duration: 0.6,
        opacity: 0,
      })

      .to(".odinAnimation", {
        delay: 0,
        duration: 0,
        display: "none",
      });
  };
  {
    /* ihebb_____________ khedmti */
  }
  useEffect(() => {
    animateWelcomingOdinLogo();
  }, []);

  let [showModal, setShowModal] = useState(false);
  let [wichContent, setWichContent] = useState(1);
  {
    /* ihebb_____________ khedmti */
  }

  return (
    <>
      <div className="odinAnimation ">
        <div className="animatedImageContainer">
          <svg
            id="Calque_1"
            className="odinLogoAnimation animate-pulse"
            data-name="Calque 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 73 52"
          >
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html: ".cls-1{fill:#fff;}.cls-2{fill:#ff7f00;}",
                }}
              />
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1-2">
                <path
                  className="cls-1"
                  d="M66.81,19.94V58.18H40.53L38.1,53.4l-2.39-4.78-2.39-4.75-2.39-4.78,2.39-4.78,2.39-4.78,2.39-4.76L40.53,20ZM42.9,24.74,40.53,29.5,38.1,34.28l-2.39,4.78,2.39,4.81,2.39,4.78,2.39,4.78H62V24.74Z"
                  transform="translate(0 -5.87)"
                />
                <path
                  className="cls-1"
                  d="M26.3,19.94l2.39,4.78,2.39,4.78,2.39,4.78,2.39,4.79-2.39,4.8-2.39,4.78-2.39,4.78L26.3,58.18H0V19.94ZM4.78,24.74V53.42H23.91l2.39-4.78,2.39-4.77,2.39-4.78-2.39-4.78L26.3,29.52l-2.39-4.78Z"
                  transform="translate(0 -5.87)"
                />
                <path
                  className="cls-2"
                  d="M73.17,5.87H68.34v4.6h4.83Z"
                  transform="translate(0 -5.87)"
                />
              </g>
            </g>
          </svg>

          {/* <h2 className="textContent">
          <span>ODIN</span>
          <span>ESPORT</span>
        </h2> */}
        </div>
        <div className="odinloader">
          <div className="inner"></div>
        </div>
      </div>
      <div className="demoContainer flex flex-col bg-slate-200">
        <PdfModal
          showModal={showModal}
          setShowModal={setShowModal}
          wichContent={wichContent}
        />
        <div className="flex overflow-hidden relative flex-col justify-center w-full min-h-full max-md:max-w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="object-cover absolute inset-0 size-full"
          />

          <div
            className="flex relative flex-col items-center px-16 pb-3 w-full  max-md:px-5 max-md:max-w-full"
            style={{
              background:
                "linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),  center/cover no-repeat",
            }}
          >
            <div className="w-full flex justify-center bg-transparent ">
              <div className="max-w-[1344px] flex gap-5 justify-between w-full  max-md:flex-wrap max-md:max-w-full">
                <div className="pt-2 max-sm:flex max-sm:justify-between max-sm:items-center max-sm:w-full">
                  {/* logo */}

                  <svg
                    width="73"
                    height="64"
                    viewBox="0 0 73 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            ".cls-1{fill:#fff;}.cls-2{fill:#ff7f00;}.cls-3{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:0.25px;}",
                        }}
                      />
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          className="cls-1"
                          d="M66.81,14.07V52.31H40.53L38.1,47.53l-2.39-4.78L33.32,38l-2.39-4.78,2.39-4.78,2.39-4.78,2.39-4.76,2.43-4.8ZM42.9,18.87l-2.37,4.76L38.1,28.41l-2.39,4.78L38.1,38l2.39,4.78,2.39,4.78H62V18.87Z"
                        />
                        <path
                          className="cls-1"
                          d="M26.3,14.07l2.39,4.78,2.39,4.78,2.39,4.78,2.39,4.78L33.47,38l-2.39,4.78-2.39,4.78L26.3,52.31H0V14.07ZM4.78,18.87V47.55H23.91l2.39-4.78L28.69,38l2.39-4.78-2.39-4.78L26.3,23.65l-2.39-4.78Z"
                        />
                        <path className="cls-2" d="M73.17,0H68.34V4.6h4.83Z" />
                        <rect
                          className="cls-3"
                          x="16.62"
                          y="56.56"
                          width="34.34"
                          height="7.37"
                          rx="2.83"
                        />
                        <path
                          className="cls-1"
                          d="M28.48,62.1a1.13,1.13,0,0,1-.61-.16,1,1,0,0,1-.4-.43,1.4,1.4,0,0,1-.16-.63h.12V62h-.3V58.4h.37v1.81l-.14.33a1.38,1.38,0,0,1,.16-.67,1.08,1.08,0,0,1,.4-.42,1.25,1.25,0,0,1,.59-.14,1.06,1.06,0,0,1,.51.11,1.18,1.18,0,0,1,.4.29,1.2,1.2,0,0,1,.25.44,1.44,1.44,0,0,1,.09.51v.07a1.44,1.44,0,0,1-.09.51,1.36,1.36,0,0,1-.25.44A1.27,1.27,0,0,1,29,62,1.25,1.25,0,0,1,28.48,62.1Zm0-.33a.93.93,0,0,0,.51-.14,1,1,0,0,0,.33-.39,1.33,1.33,0,0,0,.11-.54,1.2,1.2,0,0,0-.12-.55.87.87,0,0,0-.33-.38.92.92,0,0,0-.5-.14,1,1,0,0,0-.48.12.88.88,0,0,0-.35.34,1,1,0,0,0-.12.5v.25a1,1,0,0,0,.12.48.93.93,0,0,0,.35.33A1,1,0,0,0,28.44,61.77Z"
                        />
                        <path
                          className="cls-1"
                          d="M32.59,62.1A1.34,1.34,0,0,1,32,62a1.13,1.13,0,0,1-.4-.31,1.26,1.26,0,0,1-.24-.44,1.69,1.69,0,0,1-.08-.5v-.07a1.62,1.62,0,0,1,.08-.49,1.26,1.26,0,0,1,.24-.44,1.1,1.1,0,0,1,.39-.31,1.4,1.4,0,0,1,.56-.11,1.22,1.22,0,0,1,.69.18,1.16,1.16,0,0,1,.41.47,1.4,1.4,0,0,1,.14.61v.19H31.46v-.29h2.08l-.09.15a1.13,1.13,0,0,0-.1-.51.79.79,0,0,0-.3-.35.91.91,0,0,0-.49-.13.8.8,0,0,0-.5.15.83.83,0,0,0-.31.38,1.51,1.51,0,0,0,0,1.08.92.92,0,0,0,.31.39,1,1,0,0,0,.53.14.89.89,0,0,0,.56-.16.6.6,0,0,0,.26-.36h.35a1.17,1.17,0,0,1-.21.45,1.06,1.06,0,0,1-.4.29A1.4,1.4,0,0,1,32.59,62.1Z"
                        />
                        <path
                          className="cls-1"
                          d="M35.1,59.68V59.4h1.77v.28ZM36.45,62A1.13,1.13,0,0,1,36,62a.62.62,0,0,1-.31-.27,1,1,0,0,1-.1-.51V58.57h.35v2.67a.5.5,0,0,0,.12.35.51.51,0,0,0,.36.12h.47V62Z"
                        />
                        <path
                          className="cls-1"
                          d="M39.27,62.08a1.07,1.07,0,0,1-.49-.1.75.75,0,0,1-.33-.28.85.85,0,0,1-.12-.46.72.72,0,0,1,.13-.44.66.66,0,0,1,.35-.28,1.32,1.32,0,0,1,.55-.1h.77v.28h-.79a.69.69,0,0,0-.48.15.51.51,0,0,0-.16.4.48.48,0,0,0,.17.39.68.68,0,0,0,.47.15,1,1,0,0,0,.35-.07.62.62,0,0,0,.28-.23.72.72,0,0,0,.12-.44l.11.15a1,1,0,0,1-.14.49.65.65,0,0,1-.32.29A1,1,0,0,1,39.27,62.08Zm.88-.07v-.78h-.06V60.3a.61.61,0,0,0-.15-.45.65.65,0,0,0-.47-.16h-.59l-.24,0V59.4l.22,0h.47a1.67,1.67,0,0,1,.65.1.69.69,0,0,1,.36.31,1.22,1.22,0,0,1,.11.55V62Z"
                        />
                      </g>
                    </g>
                  </svg>

                  {/* toggel */}
                  <div className="md:hidden">
                    <svg
                      width="40"
                      height="30"
                      viewBox="0 0 60 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleClickHamburger}
                    >
                      <rect
                        ref={rect1Ref}
                        width="59.0909"
                        height="4.54545"
                        rx="2.27273"
                        fill="#ffffff"
                      />
                      <rect
                        ref={rect2Ref}
                        y="22.7272"
                        width="59.0909"
                        height="4.54545"
                        rx="2.27273"
                        fill="#ffffff"
                      />
                      <rect
                        ref={rect3Ref}
                        y="45.4546"
                        width="59.0909"
                        height="4.54545"
                        rx="2.27273"
                        fill="#ffffff"
                      />
                    </svg>
                  </div>
                </div>

                {Hamburger && (
                  <div className="flex  gap-5 justify-center items-center py-4 max-md:flex-wrap">
                    <div
                      onClick={() => scrollToRef(contactUsRef)}
                      className=" tal1 self-stretch my-auto text-base font-medium text-white"
                    >
                      Contact
                    </div>
                    <a href="/blog">
                      {" "}
                      <div className="tal1 self-stretch my-auto text-base font-medium text-white">
                        {getTranslation(
                          `Blog`, // -----> Englais
                          `Blog ` //  -----> Francais
                        )}
                      </div>
                    </a>
                    <div className="flex gap-1 items-center self-stretch px-1 py-0.5 my-auto text-base font-medium whitespace-nowrap text-zinc-900">
                      <LanguageToggler Right={true} />
                    </div>
                    <Link to="/register">
                      {" "}
                      <div className="tal2 hoveredBtnToWhitebg justify-center self-stretch px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                        {getTranslation(
                          `Sign Up`, // -----> Englais
                          `S'inscrire ` //  -----> Francais
                          // ``,  //  -----> Turkey
                          // `` ,  //  -----> Allemagne
                        )}
                      </div>
                    </Link>
                    <Link to="login">
                      <div className=" tal2 hoveredBtnToWhitebg justify-center self-stretch px-8 py-2 text-base font-medium border-2 border-solid border-white border-opacity-50 rounded-[30px] text-white max-md:px-5">
                        {getTranslation(
                          `Log In`, // -----> Englais
                          `Se connecter ` //  -----> Francais
                          // ``,  //  -----> Turkey
                          // `` ,  //  -----> Allemagne
                        )}
                      </div>
                    </Link>

                    <div className="flex gap-4 justify-center self-stretch my-auto">
                      <a href="https://www.facebook.com/share/ySvTnpGkPzbwaycW/?mibextid=qi2Omg">
                        {" "}
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          className="socialMediaIcon"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.7412 12.9996C25.7412 19.3128 21.0612 24.5319 14.982 25.3791C14.4134 25.4583 13.8318 25.4993 13.2416 25.4993C12.5599 25.4993 11.8913 25.4446 11.2392 25.3395C5.2866 24.3815 0.741211 19.2214 0.741211 12.9996C0.741211 6.09627 6.33748 0.5 13.2409 0.5C20.1442 0.5 25.7405 6.09627 25.7405 12.9996H25.7412Z"
                            fill="white"
                          />
                          <path
                            d="M14.9822 10.5363V13.2593H18.3508L17.8174 16.928H14.9822V25.3796C14.4136 25.4588 13.832 25.4998 13.2418 25.4998C12.5602 25.4998 11.8915 25.4451 11.2394 25.34V16.928H8.13281V13.2593H11.2394V9.92813C11.2394 7.86093 12.915 6.18457 14.9829 6.18457V6.18673C14.9887 6.18673 14.9944 6.18457 15.0002 6.18457H18.3515V9.35663H16.1619C15.5105 9.35663 14.9829 9.88422 14.9829 10.5356L14.9822 10.5363Z"
                            fill="#1D1E21"
                          />
                        </svg>
                      </a>

                      <a href="https://www.instagram.com/odinesportapp/">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          className="socialMediaIcon"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.7412 13C25.7412 19.3133 21.0611 24.5326 14.9817 25.3798C14.413 25.459 13.8314 25.5 13.2412 25.5C12.5596 25.5 11.8909 25.4453 11.2387 25.3402C5.28745 24.3822 0.741211 19.2212 0.741211 12.9993C0.741211 6.09642 6.33763 0.5 13.2412 0.5C20.1448 0.5 25.7412 6.09642 25.7412 13Z"
                            fill="white"
                          />
                          <path
                            d="M17.1557 5.49609H9.32648C7.16349 5.49609 5.4043 7.25528 5.4043 9.41827V16.581C5.4043 18.744 7.16349 20.5031 9.32648 20.5031H17.1557C19.3187 20.5031 21.0779 18.744 21.0779 16.581V9.41827C21.0779 7.25528 19.3187 5.49609 17.1557 5.49609ZM6.78775 9.41827C6.78775 8.01826 7.92647 6.87954 9.32648 6.87954H17.1557C18.5557 6.87954 19.6944 8.01826 19.6944 9.41827V16.581C19.6944 17.981 18.5557 19.1197 17.1557 19.1197H9.32648C7.92647 19.1197 6.78775 17.981 6.78775 16.581V9.41827Z"
                            fill="#1D1E21"
                          />
                          <path
                            d="M13.2404 16.6484C15.2523 16.6484 16.8891 15.0116 16.8891 12.9997C16.8891 10.9879 15.2523 9.35107 13.2404 9.35107C11.2286 9.35107 9.5918 10.9879 9.5918 12.9997C9.5918 15.0116 11.2286 16.6484 13.2404 16.6484ZM13.2404 10.7352C14.4893 10.7352 15.5049 11.7509 15.5049 12.9997C15.5049 14.2486 14.4893 15.2642 13.2404 15.2642C11.9916 15.2642 10.976 14.2486 10.976 12.9997C10.976 11.7509 11.9916 10.7352 13.2404 10.7352Z"
                            fill="#1D1E21"
                          />
                          <path
                            d="M17.2274 9.94012C17.7694 9.94012 18.2106 9.49888 18.2106 8.95688C18.2106 8.41487 17.7694 7.97363 17.2274 7.97363C16.6854 7.97363 16.2441 8.41487 16.2441 8.95688C16.2441 9.49888 16.6854 9.94012 17.2274 9.94012Z"
                            fill="#1D1E21"
                          />
                        </svg>
                      </a>

                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="socialMediaIcon"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.7405 13.0004C25.7405 19.3135 21.0605 24.5326 14.9813 25.3798C14.4126 25.459 13.8311 25.5 13.2409 25.5C12.5592 25.5 11.8905 25.4453 11.2384 25.3402C5.28732 24.3822 0.741211 19.2214 0.741211 12.9996C0.741211 6.09626 6.33748 0.5 13.2409 0.5C20.1442 0.5 25.7405 6.09626 25.7405 12.9996V13.0004Z"
                          fill="white"
                        />
                        <path
                          d="M19.3574 9.50278V11.891C18.9392 11.8507 18.3979 11.7557 17.7969 11.5354C17.0131 11.2482 16.4293 10.8552 16.0479 10.5508V15.379L16.0385 15.3639C16.045 15.4596 16.0479 15.5568 16.0479 15.6554C16.0479 18.0537 14.0973 20.005 11.6982 20.005C9.29922 20.005 7.34863 18.053 7.34863 15.6554C7.34863 13.2579 9.29922 11.3051 11.6982 11.3051C11.9329 11.3051 12.1632 11.3238 12.3885 11.3598V13.7142C12.1718 13.6365 11.9401 13.5947 11.6982 13.5947C10.5624 13.5947 9.63752 14.5189 9.63752 15.6554C9.63752 16.792 10.5624 17.7161 11.6982 17.7161C12.834 17.7161 13.759 16.7912 13.759 15.6554C13.759 15.613 13.7582 15.5705 13.7554 15.528V6.14502H16.1429C16.1515 6.34728 16.1601 6.55097 16.168 6.75323C16.1839 7.15127 16.3257 7.53347 16.5726 7.84657C16.8626 8.21438 17.2902 8.64192 17.8919 8.9831C18.4548 9.30196 18.9831 9.43872 19.3574 9.5035V9.50278Z"
                          fill="#1D1E21"
                        />
                      </svg>

                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="socialMediaIcon"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.7395 13.0004C25.7395 19.3135 21.0595 24.5326 14.9803 25.3798C14.4117 25.459 13.8301 25.5 13.2399 25.5C12.5582 25.5 11.8896 25.4453 11.2375 25.3402C5.28635 24.3822 0.740234 19.2214 0.740234 12.9996C0.740234 6.09626 6.33649 0.5 13.2399 0.5C20.1432 0.5 25.7395 6.09626 25.7395 12.9996V13.0004Z"
                          fill="white"
                        />
                        <path
                          d="M21.1834 10.3869C21.0848 9.42814 20.871 8.36935 20.085 7.81224C19.4754 7.38038 18.675 7.36454 17.9279 7.36525C16.348 7.36669 14.768 7.36814 13.1881 7.36958C11.6687 7.37102 10.1492 7.37245 8.62979 7.37389C7.99495 7.37389 7.3781 7.32495 6.7886 7.59918C6.28188 7.83527 5.886 8.28369 5.64847 8.7825C5.31738 9.47708 5.24756 10.2631 5.20797 11.0311C5.13455 12.4289 5.14247 13.831 5.23101 15.2274C5.29507 16.2473 5.45845 17.3738 6.24661 18.0237C6.94551 18.5995 7.93161 18.6276 8.83708 18.6283C11.7133 18.6305 14.5895 18.6326 17.4658 18.6355C17.8343 18.6355 18.2194 18.629 18.5951 18.588C19.335 18.5081 20.0397 18.2965 20.5147 17.7488C20.9941 17.1967 21.1172 16.4272 21.1906 15.6995C21.3677 13.9347 21.3655 12.1511 21.1834 10.3869ZM11.5247 15.4757V10.5251L15.8124 13.0004L11.5247 15.4757Z"
                          fill="#1D1E21"
                        />
                      </svg>

                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="socialMediaIcon"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.7395 13.0004C25.7395 19.3135 21.0595 24.5326 14.9803 25.3798C14.4117 25.459 13.8301 25.5 13.2399 25.5C12.5582 25.5 11.8896 25.4453 11.2375 25.3402C5.28634 24.3822 0.740234 19.2214 0.740234 12.9996C0.740234 6.09626 6.33649 0.5 13.2399 0.5C20.1432 0.5 25.7395 6.09626 25.7395 12.9996V13.0004Z"
                          fill="white"
                        />
                        <path
                          d="M9.29449 5.11084L6.47656 7.92877V18.0726H9.85807V20.8905L12.676 18.0726H14.9303L20.0026 13.0003V5.11084H9.29521H9.29449ZM18.8747 12.4367L16.6204 14.6911H14.366L12.3938 16.6633V14.6911H9.85807V6.23801H18.8747V12.4367Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M17.1838 8.20996H16.0566V11.5915H17.1838V8.20996Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M14.0842 8.20996H12.957V11.5915H14.0842V8.20996Z"
                          fill="#1D1E21"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="  gap-5 justify-center md:flex hidden items-center py-4 max-md:flex-wrap">
                  <div
                    onClick={() => scrollToRef(contactUsRef)}
                    className="tal1 hoveredButtonTransparency self-stretch my-auto text-base font-medium text-white"
                  >
                    {getTranslation(
                      `Contact`, // -----> Englais
                      `Contact` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <a href="/blog">
                    {" "}
                    <div className="tal1 self-stretch hoveredButtonTransparency my-auto text-base font-medium text-white">
                      {getTranslation(
                        `Blog`, // -----> Englais
                        `Blog` //  -----> Francais
                      )}
                    </div>
                  </a>
                  {/* <div className=" flex gap-1  items-center self-stretch px-1 py-0.5 my-auto text-base font-medium whitespace-nowrap text-zinc-900">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2412 4.5C10.7579 4.5 9.30781 4.93987 8.07444 5.76398C6.84107 6.58809 5.87978 7.75943 5.31212 9.12987C4.74446 10.5003 4.59594 12.0083 4.88532 13.4632C5.17471 14.918 5.88902 16.2544 6.93791 17.3033C7.98681 18.3522 9.32318 19.0665 10.778 19.3559C12.2329 19.6453 13.7409 19.4968 15.1113 18.9291C16.4818 18.3614 17.6531 17.4001 18.4772 16.1668C19.3013 14.9334 19.7412 13.4834 19.7412 12C19.7391 10.0115 18.9482 8.10513 17.5421 6.69907C16.1361 5.29302 14.2297 4.50215 12.2412 4.5ZM17.6456 8.875H15.6325C15.1818 7.83062 14.5885 6.8538 13.8693 5.9725C15.4609 6.40558 16.8177 7.44842 17.6456 8.875ZM15.0537 12C15.0486 12.6363 14.9483 13.2683 14.7562 13.875H9.72621C9.53412 13.2683 9.43385 12.6363 9.42871 12C9.43385 11.3637 9.53412 10.7317 9.72621 10.125H14.7562C14.9483 10.7317 15.0486 11.3637 15.0537 12ZM10.2275 15.125H14.255C13.7245 16.1723 13.0463 17.138 12.2412 17.9925C11.4358 17.1383 10.7576 16.1725 10.2275 15.125ZM10.2275 8.875C10.7579 7.82767 11.4361 6.86197 12.2412 6.0075C13.0466 6.86173 13.7248 7.82747 14.255 8.875H10.2275ZM10.6162 5.9725C9.896 6.85362 9.30158 7.83044 8.84996 8.875H6.83684C7.6655 7.44777 9.0235 6.40485 10.6162 5.9725ZM6.27934 10.125H8.42871C8.26669 10.737 8.18269 11.367 8.17871 12C8.18269 12.633 8.26669 13.263 8.42871 13.875H6.27934C5.89518 12.6545 5.89518 11.3455 6.27934 10.125ZM6.83684 15.125H8.84996C9.30158 16.1696 9.896 17.1464 10.6162 18.0275C9.0235 17.5952 7.6655 16.5522 6.83684 15.125ZM13.8693 18.0275C14.5885 17.1462 15.1818 16.1694 15.6325 15.125H17.6456C16.8177 16.5516 15.4609 17.5944 13.8693 18.0275ZM18.2031 13.875H16.0537C16.2157 13.263 16.2997 12.633 16.3037 12C16.2997 11.367 16.2157 10.737 16.0537 10.125H18.2018C18.586 11.3455 18.586 12.6545 18.2018 13.875H18.2031Z"
                      fill="white"
                    />
                  </svg>

                  <div className="self-stretch text-white">FR_*</div>
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.67708 4.29541C5.92592 4.29563 6.16448 4.39466 6.34033 4.57072L11.1408 9.37117C11.286 9.51647 11.4585 9.63173 11.6483 9.71037C11.8381 9.78901 12.0416 9.82948 12.247 9.82948C12.4525 9.82948 12.6559 9.78901 12.8458 9.71037C13.0356 9.63173 13.208 9.51647 13.3533 9.37117L18.1506 4.57698C18.3276 4.40601 18.5647 4.31141 18.8108 4.31355C19.0569 4.31569 19.2923 4.4144 19.4663 4.58841C19.6403 4.76243 19.739 4.99783 19.7412 5.24392C19.7433 5.49001 19.6487 5.7271 19.4777 5.90411L14.6842 10.6983C14.0383 11.3429 13.163 11.705 12.2505 11.705C11.3379 11.705 10.4627 11.3429 9.81678 10.6983L5.01633 5.89785C4.88517 5.76678 4.79577 5.59979 4.75942 5.41796C4.72307 5.23613 4.7414 5.04761 4.81208 4.87619C4.88277 4.70476 5.00265 4.55812 5.15659 4.45475C5.31054 4.35139 5.49165 4.29594 5.67708 4.29541Z"
                      fill="white"
                    />
                  </svg>
                </div> */}
                  <LanguageToggler
                    _currentLang={_currentLang}
                    _setLang={_setLang}
                  />

                  <Link to="/register">
                    {" "}
                    <div className="tal2 hoveredBtnToWhitebg justify-center self-stretch px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                      {getTranslation(
                        `Sign Up`, // -----> Englais
                        `S'inscrire` //  -----> Francais
                        // ``,  //  -----> Turkey
                        // `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </Link>
                  <Link to="login">
                    <div className="tal2  justify-center hoveredBtnToWhitebg self-stretch px-8 py-2 text-base font-medium border-2 border-solid border-white border-opacity-50 rounded-[30px] text-white max-md:px-5">
                      {getTranslation(
                        `Log In`, // -----> Englais
                        `Se connecter ` //  -----> Francais
                        // ``,  //  -----> Turkey
                        // `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </Link>

                  <div className="flex gap-4 justify-center self-stretch my-auto">
                    <a href="https://www.facebook.com/share/ySvTnpGkPzbwaycW/?mibextid=qi2Omg">
                      {" "}
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="socialMediaIcon"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.7412 12.9996C25.7412 19.3128 21.0612 24.5319 14.982 25.3791C14.4134 25.4583 13.8318 25.4993 13.2416 25.4993C12.5599 25.4993 11.8913 25.4446 11.2392 25.3395C5.2866 24.3815 0.741211 19.2214 0.741211 12.9996C0.741211 6.09627 6.33748 0.5 13.2409 0.5C20.1442 0.5 25.7405 6.09627 25.7405 12.9996H25.7412Z"
                          fill="white"
                        />
                        <path
                          d="M14.9822 10.5363V13.2593H18.3508L17.8174 16.928H14.9822V25.3796C14.4136 25.4588 13.832 25.4998 13.2418 25.4998C12.5602 25.4998 11.8915 25.4451 11.2394 25.34V16.928H8.13281V13.2593H11.2394V9.92813C11.2394 7.86093 12.915 6.18457 14.9829 6.18457V6.18673C14.9887 6.18673 14.9944 6.18457 15.0002 6.18457H18.3515V9.35663H16.1619C15.5105 9.35663 14.9829 9.88422 14.9829 10.5356L14.9822 10.5363Z"
                          fill="#1D1E21"
                        />
                      </svg>
                    </a>

                    <a href="https://www.instagram.com/odinesportapp/">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="socialMediaIcon"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.7412 13C25.7412 19.3133 21.0611 24.5326 14.9817 25.3798C14.413 25.459 13.8314 25.5 13.2412 25.5C12.5596 25.5 11.8909 25.4453 11.2387 25.3402C5.28745 24.3822 0.741211 19.2212 0.741211 12.9993C0.741211 6.09642 6.33763 0.5 13.2412 0.5C20.1448 0.5 25.7412 6.09642 25.7412 13Z"
                          fill="white"
                        />
                        <path
                          d="M17.1557 5.49609H9.32648C7.16349 5.49609 5.4043 7.25528 5.4043 9.41827V16.581C5.4043 18.744 7.16349 20.5031 9.32648 20.5031H17.1557C19.3187 20.5031 21.0779 18.744 21.0779 16.581V9.41827C21.0779 7.25528 19.3187 5.49609 17.1557 5.49609ZM6.78775 9.41827C6.78775 8.01826 7.92647 6.87954 9.32648 6.87954H17.1557C18.5557 6.87954 19.6944 8.01826 19.6944 9.41827V16.581C19.6944 17.981 18.5557 19.1197 17.1557 19.1197H9.32648C7.92647 19.1197 6.78775 17.981 6.78775 16.581V9.41827Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M13.2404 16.6484C15.2523 16.6484 16.8891 15.0116 16.8891 12.9997C16.8891 10.9879 15.2523 9.35107 13.2404 9.35107C11.2286 9.35107 9.5918 10.9879 9.5918 12.9997C9.5918 15.0116 11.2286 16.6484 13.2404 16.6484ZM13.2404 10.7352C14.4893 10.7352 15.5049 11.7509 15.5049 12.9997C15.5049 14.2486 14.4893 15.2642 13.2404 15.2642C11.9916 15.2642 10.976 14.2486 10.976 12.9997C10.976 11.7509 11.9916 10.7352 13.2404 10.7352Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M17.2274 9.94012C17.7694 9.94012 18.2106 9.49888 18.2106 8.95688C18.2106 8.41487 17.7694 7.97363 17.2274 7.97363C16.6854 7.97363 16.2441 8.41487 16.2441 8.95688C16.2441 9.49888 16.6854 9.94012 17.2274 9.94012Z"
                          fill="#1D1E21"
                        />
                      </svg>
                    </a>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      className="socialMediaIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.7405 13.0004C25.7405 19.3135 21.0605 24.5326 14.9813 25.3798C14.4126 25.459 13.8311 25.5 13.2409 25.5C12.5592 25.5 11.8905 25.4453 11.2384 25.3402C5.28732 24.3822 0.741211 19.2214 0.741211 12.9996C0.741211 6.09626 6.33748 0.5 13.2409 0.5C20.1442 0.5 25.7405 6.09626 25.7405 12.9996V13.0004Z"
                        fill="white"
                      />
                      <path
                        d="M19.3574 9.50278V11.891C18.9392 11.8507 18.3979 11.7557 17.7969 11.5354C17.0131 11.2482 16.4293 10.8552 16.0479 10.5508V15.379L16.0385 15.3639C16.045 15.4596 16.0479 15.5568 16.0479 15.6554C16.0479 18.0537 14.0973 20.005 11.6982 20.005C9.29922 20.005 7.34863 18.053 7.34863 15.6554C7.34863 13.2579 9.29922 11.3051 11.6982 11.3051C11.9329 11.3051 12.1632 11.3238 12.3885 11.3598V13.7142C12.1718 13.6365 11.9401 13.5947 11.6982 13.5947C10.5624 13.5947 9.63752 14.5189 9.63752 15.6554C9.63752 16.792 10.5624 17.7161 11.6982 17.7161C12.834 17.7161 13.759 16.7912 13.759 15.6554C13.759 15.613 13.7582 15.5705 13.7554 15.528V6.14502H16.1429C16.1515 6.34728 16.1601 6.55097 16.168 6.75323C16.1839 7.15127 16.3257 7.53347 16.5726 7.84657C16.8626 8.21438 17.2902 8.64192 17.8919 8.9831C18.4548 9.30196 18.9831 9.43872 19.3574 9.5035V9.50278Z"
                        fill="#1D1E21"
                      />
                    </svg>

                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      className="socialMediaIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.7395 13.0004C25.7395 19.3135 21.0595 24.5326 14.9803 25.3798C14.4117 25.459 13.8301 25.5 13.2399 25.5C12.5582 25.5 11.8896 25.4453 11.2375 25.3402C5.28635 24.3822 0.740234 19.2214 0.740234 12.9996C0.740234 6.09626 6.33649 0.5 13.2399 0.5C20.1432 0.5 25.7395 6.09626 25.7395 12.9996V13.0004Z"
                        fill="white"
                      />
                      <path
                        d="M21.1834 10.3869C21.0848 9.42814 20.871 8.36935 20.085 7.81224C19.4754 7.38038 18.675 7.36454 17.9279 7.36525C16.348 7.36669 14.768 7.36814 13.1881 7.36958C11.6687 7.37102 10.1492 7.37245 8.62979 7.37389C7.99495 7.37389 7.3781 7.32495 6.7886 7.59918C6.28188 7.83527 5.886 8.28369 5.64847 8.7825C5.31738 9.47708 5.24756 10.2631 5.20797 11.0311C5.13455 12.4289 5.14247 13.831 5.23101 15.2274C5.29507 16.2473 5.45845 17.3738 6.24661 18.0237C6.94551 18.5995 7.93161 18.6276 8.83708 18.6283C11.7133 18.6305 14.5895 18.6326 17.4658 18.6355C17.8343 18.6355 18.2194 18.629 18.5951 18.588C19.335 18.5081 20.0397 18.2965 20.5147 17.7488C20.9941 17.1967 21.1172 16.4272 21.1906 15.6995C21.3677 13.9347 21.3655 12.1511 21.1834 10.3869ZM11.5247 15.4757V10.5251L15.8124 13.0004L11.5247 15.4757Z"
                        fill="#1D1E21"
                      />
                    </svg>

                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      className="socialMediaIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.7395 13.0004C25.7395 19.3135 21.0595 24.5326 14.9803 25.3798C14.4117 25.459 13.8301 25.5 13.2399 25.5C12.5582 25.5 11.8896 25.4453 11.2375 25.3402C5.28634 24.3822 0.740234 19.2214 0.740234 12.9996C0.740234 6.09626 6.33649 0.5 13.2399 0.5C20.1432 0.5 25.7395 6.09626 25.7395 12.9996V13.0004Z"
                        fill="white"
                      />
                      <path
                        d="M9.29449 5.11084L6.47656 7.92877V18.0726H9.85807V20.8905L12.676 18.0726H14.9303L20.0026 13.0003V5.11084H9.29521H9.29449ZM18.8747 12.4367L16.6204 14.6911H14.366L12.3938 16.6633V14.6911H9.85807V6.23801H18.8747V12.4367Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M17.1838 8.20996H16.0566V11.5915H17.1838V8.20996Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M14.0842 8.20996H12.957V11.5915H14.0842V8.20996Z"
                        fill="#1D1E21"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex z-10 flex-col justify-center items-center self-center px-7 mt-0 w-full text-white max-w-full max-md:px-5 max-md:text-center max-md:mt-0 max-md:max-w-full"
            style={{
              background:
                "linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),  center/cover no-repeat",
            }}
          >
            <div className=" tal1 self-stretch mt-28 text-5xl text-center  font-bold max-md:mt-10 max-md:max-w-full max-md:text-2xl">
              {getTranslation(
                `ELEVATE YOUR GAME, SEIZE YOUR FUTURE`,
                ` ÉLEVEZ VOTRE JEU, SAISISSEZ VOTRE AVENIR`
              )}
            </div>
            <div className=" tal1 mt-2 text-xl text-center w-[924px] max-md:max-w-full">
              {getTranslation(
                `Connect with top football scouts and coaches,
              showcase your skills and take the next step
              of your journey in football. Your future in football
              starts here.`,
                ` Connectez-vous avec les meilleurs scouts et entraîneurs de football,
              mettez en valeur vos compétences et franchissez la prochaine étape
              de votre parcours dans le football. Votre avenir dans le football
              commence ici.`
              )}
            </div>
            <a href="/register">
              {" "}
              <div className="tal2 hoveredBtnToWhitebg justify-center  px-8 py-2 mt-4 mb-64 text-base font-medium whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:mb-10">
                {getTranslation(
                  `Start your adventure!`, // -----> Englais
                  `Commencez votre aventure !` //  -----> Francais
                )}

                {getTranslation(
                  ``, // -----> Englais
                  `` //  -----> Francais
                )}
              </div>
            </a>
          </div>
        </div>
        {/* <div class="flex justify-center items-center px-6 py-8 bg-neutral-900 max-md:px-3">
        <div class="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
          <div class="tal1 self-center text-3xl md:text-5xl font-bold text-white max-md:max-w-full">
            
            {
             getTranslation(
              `Meet Our Valued Partners`,  // -----> Englais
              `Découvrez nos partenaires précieux`, //  -----> Francais
             
              ) 

            }         

          </div>
          <div class="grid grid-cols-3 md:grid-cols-6   justify-center   mt-6 max-md:mt-4">
            <div class="flex  justify-center mb-4 max-md:w-full">
              <div class="flex justify-center items-center px-4 rounded-lg bg-zinc-900 h-[130px] w-[130px] max-md:px-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cabdba2955b431b6df950d1ef8ab89f709b0c402395de2b1a3807bd0720519f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                  class="w-[80px] "
                />
              </div>
            </div>

            <div class="flex  justify-center mb-4 max-md:w-full">
              <div class="flex justify-center items-center px-4 rounded-lg bg-zinc-900 h-[130px] w-[130px] max-md:px-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cabdba2955b431b6df950d1ef8ab89f709b0c402395de2b1a3807bd0720519f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                  class="w-[80px] "
                />
              </div>
            </div>

            <div class="flex  justify-center mb-4 max-md:w-full">
              <div class="flex justify-center items-center px-4 rounded-lg bg-zinc-900 h-[130px] w-[130px] max-md:px-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cabdba2955b431b6df950d1ef8ab89f709b0c402395de2b1a3807bd0720519f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                  class="w-[80px] "
                />
              </div>
            </div>

            <div class="flex  justify-center mb-4 max-md:w-full">
              <div class="flex justify-center items-center px-4 rounded-lg bg-zinc-900 h-[130px] w-[130px] max-md:px-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cabdba2955b431b6df950d1ef8ab89f709b0c402395de2b1a3807bd0720519f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                  class="w-[80px] "
                />
              </div>
            </div>

            <div class="flex  justify-center mb-4 max-md:w-full">
              <div class="flex justify-center items-center px-4 rounded-lg bg-zinc-900 h-[130px] w-[130px] max-md:px-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cabdba2955b431b6df950d1ef8ab89f709b0c402395de2b1a3807bd0720519f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                  class="w-[80px] "
                />
              </div>
            </div>

            <div class="flex  justify-center mb-4 max-md:w-full">
              <div class="flex justify-center items-center px-4 rounded-lg bg-zinc-900 h-[130px] w-[130px] max-md:px-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cabdba2955b431b6df950d1ef8ab89f709b0c402395de2b1a3807bd0720519f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                  class="w-[80px] md:w-[100px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
        <div className="flex justify-center items-center px-16 py-12 w-full bg-blue-600 max-md:px-5 max-md:max-w-full">
          <div className="my-1.5 w-full max-w-[1184px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10">
                  <div className="tal1 text-2xl md:text-3xl space-y-1 font-bold max-md:max-w-full">
                    <div>
                      {getTranslation(
                        `Who are we ?`, // -----> Anglais
                        `Qui Sommes-Nous?` //  -----> Français
                        // ``,  //  -----> Turc
                        // `` ,  //  -----> Allemand
                      )}
                    </div>
                    <div className="mt-2">
                      {" "}
                      {/* Utiliser mt-4 pour ajouter une marge supérieure */}
                      {getTranslation(
                        `Unlocking Football Dreams`, // -----> Anglais
                        `Débloquez vos rêves de football` //  -----> Français
                        // ``,  //  -----> Turc
                        // `` ,  //  -----> Allemand
                      )}
                    </div>
                  </div>
                  <div className="tal1 mt-2  text-2xl font-light max-md:max-w-full">
                    {getTranslation(
                      `A Comprehensive Experience for All`, // -----> Englais
                      `Une Expérience Exceptionnelle Pour Tous` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <div className="tal1 mt-8 text-lg  max-md:max-w-full">
                    {getTranslation(
                      `ODIN E-SPORT offers a comprehensive experience for all stakeholders 
              in the football ecosystem, from young talents to player agents, coaches, 
              and football clubs. Whether you're a young talent seeking to shine or a football 
              professional looking for the next star, our platform is the place where dreams come 
              true and opportunities materialize.`, // -----> Englais
                      `ODIN E-SPORT offre une expérience exceptionnelle pour tous les
              profils de l'écosyst-ème du football, des jeunes talents aux
              agents de joueurs, aux entraîneurs et aux clubs de football.
              Que vous soyez un jeune talent cherchant à rayonner ou un
              professionnel du football à la recherche de la prochaine
              étoile, notre plateforme est l'endroit où les rêves se
              réalisent et les opportunités se concrétisent.` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>{" "}
                  <a href="/register">
                    <div class="tal2 hoveredBtnToWhitebg justify-center w-full  max-w-max self-start px-8 py-2 mt-12 text-base font-medium whitespace-nowrap bg-zinc-900 rounded-[30px] max-md:px-5 max-md:mt-10 inline-block ">
                      {getTranslation(
                        `Begin your Adventure ! `, // -----> Englais
                        `Lancez Votre Parcours !` //  -----> Francais
                        // ``,  //  -----> Turkey
                        // `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </a>
                </div>
              </div>{" "}
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <img
                  src={jr}
                  className="grow w-full aspect-[0.78] -mb-[53.4px] -mt-10 -md:mb-[53.4px] md:-mt-8"
                />
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-wrap gap-y-8 justify-center content-center items-center px-16 py-12 w-full bg-neutral-900 max-md:px-5 max-md:max-w-full">
          <div className="my-1.5 w-full max-w-[1184px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col justify-center self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
                  <div className="tal1 text-2xl md:text-3xl font-bold max-md:max-w-full">
                    {getTranslation(
                      `Who is `, // -----> Englais
                      `Pour qui est ` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}

                    <br />

                    {getTranslation(
                      ` ODIN E-SPORT for ?`, // -----> Englais
                      `ODIN E-SPORT? ` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                    <br />
                  </div>{" "}
                  <div className="tal1 mt-8 text-lg max-md:max-w-full">
                    {getTranslation(
                      `ODIN E-SPORT welcomes football enthusiasts of all levels,
               from aspiring young talents to seasoned professionals. 
               Whether you're a player, coach, agent, or club representative, 
               our platform provides a tailored experience to elevate your 
               football journey. Join our inclusive community and unlock endless 
               opportunities in the world of football. `, // -----> Englais
                      `ODIN E-SPORT accueille les passionnés de football de tous
              niveaux, des jeunes talents ambitieux aux joueurs
              professionnels. Que vous soyez joueur, entraîneur, agent ou
              représentant de club, notre plateforme offre une expérience
              personnalisée pour sublimer votre parcours de football.
              Rejoignez notre communauté inclusive et débloquez un nombre
              infini d'opportunités dans le monde de professionnalisme de
              football. ` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <a href="/register">
                    <div className="tal1 hoveredBtnToWhitebg inline-block max-w-max justify-center self-start px-8 py-2 mt-8 text-base font-medium whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                      {getTranslation(
                        ` Join us !`, // -----> Englais
                        `Rejoignez Nous! ` //  -----> Francais
                        // ``,  //  -----> Turkey
                        // `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="grow md:mt-2 pt-10 max-md:max-w-full ">
                  <Slider
                    style={{ width: "100%", height: "80%" }}
                    {...friendsettings}
                  >
                    <div style={{ width: "100%", height: "80%" }}>
                      <img src={Hero} />
                    </div>
                    <div style={{ width: "100%", height: "80%" }}>
                      <img src={Hero1} />
                    </div>
                    <div style={{ width: "100%", height: "80%" }}>
                      <img src={Hero2} />
                    </div>
                    <div style={{ width: "100%", height: "80%" }}>
                      <img src={Hero} />
                    </div>
                    <div style={{ width: "100%", height: "80%" }}>
                      <img src={Hero1} />
                    </div>
                    <div style={{ width: "100%", height: "80%" }}>
                      <img src={Hero2} />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={contactUsRef}
          className="flex justify-center items-center px-16 py-12 w-full max-md:px-5 max-md:max-w-full"
        >
          <div className="my-1.5 w-full max-w-[1184px] max-md:max-w-full">
            <div className="flex gap-2 md:gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow md:mt-0 text-black  max-md:max-w-full">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="max-w-full aspect-square w-[161px]"
                  />
                  <div className="tal1 mt-8 text-2xl md:text-4xl font-bold max-md:max-w-full">
                    {getTranslation(
                      `How can we help?`, // -----> Englais
                      `Comment on peut vous aider?` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <div className="tal1 mt-4 text-xl max-md:max-w-full">
                    {getTranslation(
                      `Feel free to ask questions or share feedback about Odin 
              Esport, the premier community for football players and entities. 
              Your input is vital as we cultivate an inclusive space for football 
              professionals worldwide.`, // -----> Englais
                      `N'hésitez pas à poser vos questions ou à partager vos
              commentaires sur Odin E-sport, la première communauté des
              joueurs de football et des entités associées. Votre feedback
              est essentiel alors que nous construisons un espace inclusif
              pour les professionnels du football du monde entier.` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d248d374105c734203eeadc5fb8bd71c1dbc492c9e7f4c916125a010c20b4c88?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className=" md:mt-24 mt-4 max-w-full aspect-[2.08] w-[60px] md:w-[100px]"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex grow justify-center items-center px-16 py-9 w-full text-base bg-white rounded-[30px] text-zinc-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col max-w-full w-[378px]">
                    <div className="tal2 text-4xl md:text-5xl font-bold text-black">
                      {getTranslation(
                        `Contact us `, // -----> Englais
                        `Contactez Nous` //  -----> Francais
                        // ``,  //  -----> Turkey
                        // `` ,  //  -----> Allemagne
                      )}
                    </div>
                    <div>
                      <ToastContainer />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                      <label htmlFor="nomPrenom" className="tal1 mt-6">
                        {getTranslation(
                          `Full name `, // -----> Englais
                          `Nom et Prénom` //  -----> Francais
                          // ``,  //  -----> Turkey
                          // `` ,  //  -----> Allemagne
                        )}
                      </label>
                      <input
                        type="text"
                        id="nomPrenom"
                        name="nomPrenom"
                        value={formData.nomPrenom}
                        onChange={handleChange}
                        className="justify-center items-start py-2 pr-16 pl-4 mt-2 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:pr-5"
                        required
                      />
                      <label htmlFor="emailuser" className="tal1 mt-2">
                        {getTranslation(
                          `Email`, // -----> Englais
                          `Email` //  -----> Francais
                          // ``,  //  -----> Turkey
                          // `` ,  //  -----> Allemagne
                        )}
                      </label>
                      <input
                        type="email"
                        id="emailuser"
                        name="emailuser"
                        value={formData.emailuser}
                        onChange={handleChange}
                        className="justify-center items-start py-2 pr-16 pl-4 mt-2 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:pr-5"
                        required
                      />
                      <label htmlFor="message" className="tal1 mt-2">
                        {getTranslation(
                          `Message`, // -----> Englais
                          `Message` //  -----> Francais
                          // ``,  //  -----> Turkey
                          // `` ,  //  -----> Allemagne
                        )}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="items-start pt-6 pr-16 pb-20 pl-6 mt-2 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:px-5"
                        required
                      />
                      <button
                        type="submit"
                        className="tal2 hoveredBtnToWhitebgWithBorder justify-center items-center px-16 py-2 mt-6 font-medium whitespace-nowrap rounded-[30px] max-md:px-5"
                      >
                        {getTranslation(
                          `Submit`, // -----> Englais
                          `Envoyer` //  -----> Francais
                          // ``,  //  -----> Turkey
                          // `` ,  //  -----> Allemagne
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center px-16 py-6 w-full bg-blue-600 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
            <div className="flex gap-4 md:justify-between justify-center py-2 w-full max-md:flex-wrap max-md:max-w-full">
              <svg
                width="73"
                height="64"
                viewBox="0 0 73 64"
                fill="none"
                className="cursor-pointer "
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  window.scroll({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".cls-1{fill:#fff;}.cls-2{fill:#ff7f00;}.cls-3{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:0.25px;}",
                    }}
                  />
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className="cls-1"
                      d="M66.81,14.07V52.31H40.53L38.1,47.53l-2.39-4.78L33.32,38l-2.39-4.78,2.39-4.78,2.39-4.78,2.39-4.76,2.43-4.8ZM42.9,18.87l-2.37,4.76L38.1,28.41l-2.39,4.78L38.1,38l2.39,4.78,2.39,4.78H62V18.87Z"
                    />
                    <path
                      className="cls-1"
                      d="M26.3,14.07l2.39,4.78,2.39,4.78,2.39,4.78,2.39,4.78L33.47,38l-2.39,4.78-2.39,4.78L26.3,52.31H0V14.07ZM4.78,18.87V47.55H23.91l2.39-4.78L28.69,38l2.39-4.78-2.39-4.78L26.3,23.65l-2.39-4.78Z"
                    />
                    <path className="cls-2" d="M73.17,0H68.34V4.6h4.83Z" />
                    <rect
                      className="cls-3"
                      x="16.62"
                      y="56.56"
                      width="34.34"
                      height="7.37"
                      rx="2.83"
                    />
                    <path
                      className="cls-1"
                      d="M28.48,62.1a1.13,1.13,0,0,1-.61-.16,1,1,0,0,1-.4-.43,1.4,1.4,0,0,1-.16-.63h.12V62h-.3V58.4h.37v1.81l-.14.33a1.38,1.38,0,0,1,.16-.67,1.08,1.08,0,0,1,.4-.42,1.25,1.25,0,0,1,.59-.14,1.06,1.06,0,0,1,.51.11,1.18,1.18,0,0,1,.4.29,1.2,1.2,0,0,1,.25.44,1.44,1.44,0,0,1,.09.51v.07a1.44,1.44,0,0,1-.09.51,1.36,1.36,0,0,1-.25.44A1.27,1.27,0,0,1,29,62,1.25,1.25,0,0,1,28.48,62.1Zm0-.33a.93.93,0,0,0,.51-.14,1,1,0,0,0,.33-.39,1.33,1.33,0,0,0,.11-.54,1.2,1.2,0,0,0-.12-.55.87.87,0,0,0-.33-.38.92.92,0,0,0-.5-.14,1,1,0,0,0-.48.12.88.88,0,0,0-.35.34,1,1,0,0,0-.12.5v.25a1,1,0,0,0,.12.48.93.93,0,0,0,.35.33A1,1,0,0,0,28.44,61.77Z"
                    />
                    <path
                      className="cls-1"
                      d="M32.59,62.1A1.34,1.34,0,0,1,32,62a1.13,1.13,0,0,1-.4-.31,1.26,1.26,0,0,1-.24-.44,1.69,1.69,0,0,1-.08-.5v-.07a1.62,1.62,0,0,1,.08-.49,1.26,1.26,0,0,1,.24-.44,1.1,1.1,0,0,1,.39-.31,1.4,1.4,0,0,1,.56-.11,1.22,1.22,0,0,1,.69.18,1.16,1.16,0,0,1,.41.47,1.4,1.4,0,0,1,.14.61v.19H31.46v-.29h2.08l-.09.15a1.13,1.13,0,0,0-.1-.51.79.79,0,0,0-.3-.35.91.91,0,0,0-.49-.13.8.8,0,0,0-.5.15.83.83,0,0,0-.31.38,1.51,1.51,0,0,0,0,1.08.92.92,0,0,0,.31.39,1,1,0,0,0,.53.14.89.89,0,0,0,.56-.16.6.6,0,0,0,.26-.36h.35a1.17,1.17,0,0,1-.21.45,1.06,1.06,0,0,1-.4.29A1.4,1.4,0,0,1,32.59,62.1Z"
                    />
                    <path
                      className="cls-1"
                      d="M35.1,59.68V59.4h1.77v.28ZM36.45,62A1.13,1.13,0,0,1,36,62a.62.62,0,0,1-.31-.27,1,1,0,0,1-.1-.51V58.57h.35v2.67a.5.5,0,0,0,.12.35.51.51,0,0,0,.36.12h.47V62Z"
                    />
                    <path
                      className="cls-1"
                      d="M39.27,62.08a1.07,1.07,0,0,1-.49-.1.75.75,0,0,1-.33-.28.85.85,0,0,1-.12-.46.72.72,0,0,1,.13-.44.66.66,0,0,1,.35-.28,1.32,1.32,0,0,1,.55-.1h.77v.28h-.79a.69.69,0,0,0-.48.15.51.51,0,0,0-.16.4.48.48,0,0,0,.17.39.68.68,0,0,0,.47.15,1,1,0,0,0,.35-.07.62.62,0,0,0,.28-.23.72.72,0,0,0,.12-.44l.11.15a1,1,0,0,1-.14.49.65.65,0,0,1-.32.29A1,1,0,0,1,39.27,62.08Zm.88-.07v-.78h-.06V60.3a.61.61,0,0,0-.15-.45.65.65,0,0,0-.47-.16h-.59l-.24,0V59.4l.22,0h.47a1.67,1.67,0,0,1,.65.1.69.69,0,0,1,.36.31,1.22,1.22,0,0,1,.11.55V62Z"
                    />
                  </g>
                </g>
              </svg>

              <div className="flex gap-4 justify-center items-center py-1 md:py-4 max-md:flex-wrap">
                <div
                  onClick={() => scrollToRef(contactUsRef)}
                  className="tal1 hoveredButtonTransparency self-stretch my-auto text-base font-medium text-white"
                >
                  {getTranslation(
                    `Contact`, // -----> Englais
                    `Contact` //  -----> Francais
                    // ``,  //  -----> Turkey
                    // `` ,  //  -----> Allemagne
                  )}
                </div>
                <a href="/blog">
                  {" "}
                  <div className="tal2 hoveredButtonTransparency self-stretch my-auto text-base font-medium text-white">
                    {getTranslation(
                      `Blog`, // -----> Englais
                      `Blog ` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                </a>
                <span
                  style={{
                    zIndex: 111,
                  }}
                >
                  <LanguageToggler
                    Right={true}
                    _currentLang={_currentLang}
                    _setLang={_setLang}
                  />
                </span>

                <a href="/register">
                  {" "}
                  <div className="tal2 hoveredBtnToWhitebg justify-center self-stretch px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                    {getTranslation(
                      `Sign Up`, // -----> Englais
                      `S'inscrire ` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                </a>
                <a href="/login">
                  {" "}
                  <div className="tal2 hoveredBtnToWhitebg justify-center self-stretch px-8 py-2 text-base font-medium border-2 border-solid border-white border-opacity-50 rounded-[30px] text-white max-md:px-5">
                    {getTranslation(
                      `Log In`, // -----> Englais
                      `Se connecter ` //  -----> Francais
                      // ``,  //  -----> Turkey
                      // `` ,  //  -----> Allemagne
                    )}
                  </div>
                </a>

                <div className="flex gap-4 justify-center self-stretch my-auto">
                  <a href="https://www.facebook.com/share/ySvTnpGkPzbwaycW/?mibextid=qi2Omg">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      className="socialMediaIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.7412 12.9996C25.7412 19.3128 21.0612 24.5319 14.982 25.3791C14.4134 25.4583 13.8318 25.4993 13.2416 25.4993C12.5599 25.4993 11.8913 25.4446 11.2392 25.3395C5.2866 24.3815 0.741211 19.2214 0.741211 12.9996C0.741211 6.09627 6.33748 0.5 13.2409 0.5C20.1442 0.5 25.7405 6.09627 25.7405 12.9996H25.7412Z"
                        fill="white"
                      />
                      <path
                        d="M14.9822 10.5363V13.2593H18.3508L17.8174 16.928H14.9822V25.3796C14.4136 25.4588 13.832 25.4998 13.2418 25.4998C12.5602 25.4998 11.8915 25.4451 11.2394 25.34V16.928H8.13281V13.2593H11.2394V9.92813C11.2394 7.86093 12.915 6.18457 14.9829 6.18457V6.18673C14.9887 6.18673 14.9944 6.18457 15.0002 6.18457H18.3515V9.35663H16.1619C15.5105 9.35663 14.9829 9.88422 14.9829 10.5356L14.9822 10.5363Z"
                        fill="#1D1E21"
                      />
                    </svg>{" "}
                  </a>

                  <a href="https://www.instagram.com/odinesportapp/">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      className="socialMediaIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.7412 13C25.7412 19.3133 21.0611 24.5326 14.9817 25.3798C14.413 25.459 13.8314 25.5 13.2412 25.5C12.5596 25.5 11.8909 25.4453 11.2387 25.3402C5.28745 24.3822 0.741211 19.2212 0.741211 12.9993C0.741211 6.09642 6.33763 0.5 13.2412 0.5C20.1448 0.5 25.7412 6.09642 25.7412 13Z"
                        fill="white"
                      />
                      <path
                        d="M17.1557 5.49609H9.32648C7.16349 5.49609 5.4043 7.25528 5.4043 9.41827V16.581C5.4043 18.744 7.16349 20.5031 9.32648 20.5031H17.1557C19.3187 20.5031 21.0779 18.744 21.0779 16.581V9.41827C21.0779 7.25528 19.3187 5.49609 17.1557 5.49609ZM6.78775 9.41827C6.78775 8.01826 7.92647 6.87954 9.32648 6.87954H17.1557C18.5557 6.87954 19.6944 8.01826 19.6944 9.41827V16.581C19.6944 17.981 18.5557 19.1197 17.1557 19.1197H9.32648C7.92647 19.1197 6.78775 17.981 6.78775 16.581V9.41827Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M13.2404 16.6484C15.2523 16.6484 16.8891 15.0116 16.8891 12.9997C16.8891 10.9879 15.2523 9.35107 13.2404 9.35107C11.2286 9.35107 9.5918 10.9879 9.5918 12.9997C9.5918 15.0116 11.2286 16.6484 13.2404 16.6484ZM13.2404 10.7352C14.4893 10.7352 15.5049 11.7509 15.5049 12.9997C15.5049 14.2486 14.4893 15.2642 13.2404 15.2642C11.9916 15.2642 10.976 14.2486 10.976 12.9997C10.976 11.7509 11.9916 10.7352 13.2404 10.7352Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M17.2274 9.94012C17.7694 9.94012 18.2106 9.49888 18.2106 8.95688C18.2106 8.41487 17.7694 7.97363 17.2274 7.97363C16.6854 7.97363 16.2441 8.41487 16.2441 8.95688C16.2441 9.49888 16.6854 9.94012 17.2274 9.94012Z"
                        fill="#1D1E21"
                      />
                    </svg>{" "}
                  </a>

                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    className="socialMediaIcon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.7405 13.0004C25.7405 19.3135 21.0605 24.5326 14.9813 25.3798C14.4126 25.459 13.8311 25.5 13.2409 25.5C12.5592 25.5 11.8905 25.4453 11.2384 25.3402C5.28732 24.3822 0.741211 19.2214 0.741211 12.9996C0.741211 6.09626 6.33748 0.5 13.2409 0.5C20.1442 0.5 25.7405 6.09626 25.7405 12.9996V13.0004Z"
                      fill="white"
                    />
                    <path
                      d="M19.3574 9.50278V11.891C18.9392 11.8507 18.3979 11.7557 17.7969 11.5354C17.0131 11.2482 16.4293 10.8552 16.0479 10.5508V15.379L16.0385 15.3639C16.045 15.4596 16.0479 15.5568 16.0479 15.6554C16.0479 18.0537 14.0973 20.005 11.6982 20.005C9.29922 20.005 7.34863 18.053 7.34863 15.6554C7.34863 13.2579 9.29922 11.3051 11.6982 11.3051C11.9329 11.3051 12.1632 11.3238 12.3885 11.3598V13.7142C12.1718 13.6365 11.9401 13.5947 11.6982 13.5947C10.5624 13.5947 9.63752 14.5189 9.63752 15.6554C9.63752 16.792 10.5624 17.7161 11.6982 17.7161C12.834 17.7161 13.759 16.7912 13.759 15.6554C13.759 15.613 13.7582 15.5705 13.7554 15.528V6.14502H16.1429C16.1515 6.34728 16.1601 6.55097 16.168 6.75323C16.1839 7.15127 16.3257 7.53347 16.5726 7.84657C16.8626 8.21438 17.2902 8.64192 17.8919 8.9831C18.4548 9.30196 18.9831 9.43872 19.3574 9.5035V9.50278Z"
                      fill="#1D1E21"
                    />
                  </svg>

                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    className="socialMediaIcon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.7395 13.0004C25.7395 19.3135 21.0595 24.5326 14.9803 25.3798C14.4117 25.459 13.8301 25.5 13.2399 25.5C12.5582 25.5 11.8896 25.4453 11.2375 25.3402C5.28635 24.3822 0.740234 19.2214 0.740234 12.9996C0.740234 6.09626 6.33649 0.5 13.2399 0.5C20.1432 0.5 25.7395 6.09626 25.7395 12.9996V13.0004Z"
                      fill="white"
                    />
                    <path
                      d="M21.1834 10.3869C21.0848 9.42814 20.871 8.36935 20.085 7.81224C19.4754 7.38038 18.675 7.36454 17.9279 7.36525C16.348 7.36669 14.768 7.36814 13.1881 7.36958C11.6687 7.37102 10.1492 7.37245 8.62979 7.37389C7.99495 7.37389 7.3781 7.32495 6.7886 7.59918C6.28188 7.83527 5.886 8.28369 5.64847 8.7825C5.31738 9.47708 5.24756 10.2631 5.20797 11.0311C5.13455 12.4289 5.14247 13.831 5.23101 15.2274C5.29507 16.2473 5.45845 17.3738 6.24661 18.0237C6.94551 18.5995 7.93161 18.6276 8.83708 18.6283C11.7133 18.6305 14.5895 18.6326 17.4658 18.6355C17.8343 18.6355 18.2194 18.629 18.5951 18.588C19.335 18.5081 20.0397 18.2965 20.5147 17.7488C20.9941 17.1967 21.1172 16.4272 21.1906 15.6995C21.3677 13.9347 21.3655 12.1511 21.1834 10.3869ZM11.5247 15.4757V10.5251L15.8124 13.0004L11.5247 15.4757Z"
                      fill="#1D1E21"
                    />
                  </svg>

                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    className="socialMediaIcon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.7395 13.0004C25.7395 19.3135 21.0595 24.5326 14.9803 25.3798C14.4117 25.459 13.8301 25.5 13.2399 25.5C12.5582 25.5 11.8896 25.4453 11.2375 25.3402C5.28634 24.3822 0.740234 19.2214 0.740234 12.9996C0.740234 6.09626 6.33649 0.5 13.2399 0.5C20.1432 0.5 25.7395 6.09626 25.7395 12.9996V13.0004Z"
                      fill="white"
                    />
                    <path
                      d="M9.29449 5.11084L6.47656 7.92877V18.0726H9.85807V20.8905L12.676 18.0726H14.9303L20.0026 13.0003V5.11084H9.29521H9.29449ZM18.8747 12.4367L16.6204 14.6911H14.366L12.3938 16.6633V14.6911H9.85807V6.23801H18.8747V12.4367Z"
                      fill="#1D1E21"
                    />
                    <path
                      d="M17.1838 8.20996H16.0566V11.5915H17.1838V8.20996Z"
                      fill="#1D1E21"
                    />
                    <path
                      d="M14.0842 8.20996H12.957V11.5915H14.0842V8.20996Z"
                      fill="#1D1E21"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between py-2 mt-4 md:mt-6 max-md:flex-wrap border-t-white border-t-2 max-md:max-w-full">
              <div className="flex flex-col md:flex-row w-full gap-2 md:gap-3 self-end items-center justify-between ">
                <a
                  onClick={() => {
                    setWichContent(1);
                    setShowModal(true);
                  }}
                  className="tal1 cursor-pointer flex text-sm font-medium text-white underline"
                >
                  {getTranslation(
                    `Terms & Conditions`, // -----> Englais
                    `Termes & Conditions` //  -----> Francais
                    // ``,  //  -----> Turkey
                    // `` ,  //  -----> Allemagne
                  )}
                </a>
                <a
                  onClick={() => {
                    setWichContent(2);
                    setShowModal(true);
                  }}
                  className="tal1 cursor-pointer flex text-sm font-medium text-white underline"
                >
                  {getTranslation(
                    `Privacy Policy`, // -----> Englais
                    `Politique de Confidentialité` //  -----> Francais
                    // ``,  //  -----> Turkey
                    // `` ,  //  -----> Allemagne
                  )}
                </a>
              </div>
            </div>{" "}
            <div className="tal1 cursor-pointer flex flex-col items-center justify-between mt-1 text-xs text-white">
              {getTranslation(
                ` All Rights Reserved © 2024 Odin Esport`, // -----> Englais
                `Tous droits réservés © 2024 Odin Esport` //  -----> Francais
                // ``,  //  -----> Turkey
                // `` ,  //  -----> Allemagne
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
