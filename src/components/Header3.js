import React, { Component, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Darkbutton from "../components/Darkbutton";
import Logo from "../assets/ODIN22.png";
import SlideMenu from "./SlideMenuregister";
import "../components/Hamburger.css";
import BurgerMenuLink from "../components/BurgerMenuLink";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Profilesearch from "../assets/Profilesearch.png";
import Football from "../assets/Football.png";
import Parametre from "../assets/Parametre.png";
import Userdefault from "../assets/userdefault.jpg";
import LanguageToggler from "../fixDesignComponents/languageToggler";

function Header() {
  const [isOpen, setIsOpen] = useState(null);

  const [isActive, setIsActive] = useState(null);
  const [isNoti, setisNoti] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setHumberger(false);
  }, [location]);

  const navigate = useNavigate();

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
  return (
    <>
      <div
        className={`w-full bg-white fixed mb-20 z-50 shadow-xs ${
          Hamburger ? "fixed top-0 h-screen overflow-hidden z-50" : ""
        }`}
      >
        <div className="flex ">
          {" "}
          <div className="max-sm:px-4 max-w-[1200px] h-[80px] w-full bg-white  border-0 flex items-center justify-between mx-auto py-2 ">
            <div className="flex flex-row ">
              <Link to="/" className="mt-3  ">
                <svg
                  width="73"
                  height="64"
                  className="md:w-[100%] w-[80%]"
                  viewBox="0 0 73 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          ".cls-1{fill:#2e71eb;}.cls-2{fill:#ff7f00;}.cls-3{fill:none;stroke:#2e71eb;stroke-miterlimit:10;stroke-width:0.25px;}",
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
                <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">
                  {" "}
                </span>
              </Link>
            </div>
            <div className="flex md:flex hidden  gap-2">
              <div className="flex flex-row items-center">
                {/* <div className="flex items-center gap-2.5 p-1">
                  <svg
                    width={15}
                    height={16}
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0.804688C6.01664 0.804688 4.5666 1.24455 3.33323 2.06867C2.09986 2.89278 1.13856 4.06412 0.570907 5.43456C0.00324965 6.80501 -0.145275 8.31301 0.144114 9.76787C0.433503 11.2227 1.14781 12.5591 2.1967 13.608C3.2456 14.6569 4.58197 15.3712 6.03683 15.6606C7.49168 15.95 8.99968 15.8014 10.3701 15.2338C11.7406 14.6661 12.9119 13.7048 13.736 12.4715C14.5601 11.2381 15 9.78805 15 8.30469C14.9979 6.31622 14.207 4.40982 12.8009 3.00376C11.3949 1.59771 9.48847 0.806838 7.5 0.804688ZM12.9044 5.17969H10.8913C10.4406 4.1353 9.84724 3.15849 9.12813 2.27719C10.7197 2.71027 12.0765 3.75311 12.9044 5.17969ZM10.3125 8.30469C10.3074 8.94102 10.2071 9.57302 10.015 10.1797H4.985C4.79291 9.57302 4.69263 8.94102 4.6875 8.30469C4.69263 7.66835 4.79291 7.03636 4.985 6.42969H10.015C10.2071 7.03636 10.3074 7.66835 10.3125 8.30469ZM5.48625 11.4297H9.51375C8.98328 12.477 8.3051 13.4427 7.5 14.2972C6.69461 13.443 6.0164 12.4772 5.48625 11.4297ZM5.48625 5.17969C6.01673 4.13236 6.69491 3.16666 7.5 2.31219C8.3054 3.16642 8.9836 4.13216 9.51375 5.17969H5.48625ZM5.875 2.27719C5.15479 3.1583 4.56037 4.13512 4.10875 5.17969H2.09563C2.92429 3.75246 4.28229 2.70953 5.875 2.27719ZM1.53813 6.42969H3.6875C3.52548 7.04165 3.44148 7.67165 3.4375 8.30469C3.44148 8.93773 3.52548 9.56772 3.6875 10.1797H1.53813C1.15397 8.9592 1.15397 7.65017 1.53813 6.42969ZM2.09563 11.4297H4.10875C4.56037 12.4743 5.15479 13.4511 5.875 14.3322C4.28229 13.8998 2.92429 12.8569 2.09563 11.4297ZM9.12813 14.3322C9.84724 13.4509 10.4406 12.4741 10.8913 11.4297H12.9044C12.0765 12.8563 10.7197 13.8991 9.12813 14.3322ZM13.4619 10.1797H11.3125C11.4745 9.56772 11.5585 8.93773 11.5625 8.30469C11.5585 7.67165 11.4745 7.04165 11.3125 6.42969H13.4606C13.8448 7.65017 13.8448 8.9592 13.4606 10.1797H13.4619Z"
                      fill="black"
                    />
                  </svg>
                </div> */}
                {/* <div className="text-[#1d1e21] font-['Sora'] font-medium leading-[normal]">
                  FR
                </div> */}
                <span className="px-4">
                  <LanguageToggler color={true} />
                </span>
                {/* <div className="scroll_right flex justify-center items-center p-1">
                  <svg
                    width={15}
                    height={8}
                    viewBox="0 0 15 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.935867 0.599609C1.18471 0.599828 1.42327 0.698856 1.59912 0.874922L6.39957 5.67537C6.54483 5.82067 6.71729 5.93593 6.90711 6.01457C7.09692 6.09321 7.30037 6.13368 7.50583 6.13368C7.71128 6.13368 7.91473 6.09321 8.10454 6.01457C8.29436 5.93593 8.46682 5.82067 8.61208 5.67537L13.4094 0.881179C13.5864 0.710212 13.8235 0.61561 14.0696 0.617748C14.3157 0.619886 14.5511 0.718594 14.7251 0.892612C14.8991 1.06663 14.9978 1.30203 15 1.54812C15.0021 1.79421 14.9075 2.03129 14.7365 2.20831L9.94297 7.0025C9.29707 7.64713 8.42181 8.00917 7.50927 8.00917C6.59673 8.00917 5.72146 7.64713 5.07557 7.0025L0.275117 2.20205C0.143957 2.07098 0.0545616 1.90399 0.0182114 1.72216C-0.0181389 1.54033 0.000185013 1.35181 0.0708704 1.18039C0.141556 1.00896 0.261436 0.862314 0.415381 0.758952C0.569327 0.655589 0.750441 0.600143 0.935867 0.599609Z"
                      fill="#1D1E21"
                    />
                  </svg>
                </div> */}
              </div>
              <Link to="/login">
                <div className=" px-2 mt-2  py-2 pl-2 md:px-2 md:py-2 my-auto bg-zinc-900 text-white rounded-[30px] ">
                  Se connecter
                </div>
              </Link>
            </div>
          </div>{" "}
          <div className="flex mr-4 items-center">
            <SlideMenu
              setIsActive={setIsActive}
              setHumberger={setHumberger}
              Hamburger={Hamburger}
            />
          </div>
        </div>
        {Hamburger && (
          <div className="bg-zinc-100 fixed  left-0 z-0 py-4 md:hidden w-screen h-screen overflow-y-scroll z-90">
            <div className="flex flex-col items-center pb-12 mx-auto w-full max-w-[480px]  overflow-hidden ">
              <div className="flex flex-col gap-y-4 items-center pb-12 mx-auto w-full max-w-[480px] h-[1000px] ">
                <div className="flex flex-col items-center pb-12 mx-auto w-full bg-zinc-100 max-w-[480px]">
                  <div className="px-4 w-full">
                    {" "}
                    <Link to="/login">
                      {" "}
                      <div className="justify-center items-center text-center px-8 py-2 mt-10 w-full text-base font-medium text-white bg-blue-600 max-w-[360px] rounded-[30px]">
                        Se connecter
                      </div>{" "}
                    </Link>{" "}
                  </div>
                  <div className="px-4 w-full">
                    {" "}
                    <Link to="/register">
                      {" "}
                      <div className="flex justify-center  items-center text-center px-8 py-2 mt-3 w-full text-base font-medium text-white bg-orange-500  max-w-[360px] rounded-[30px]">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/782d8b9c4e26c6ae2faa75f1bad14c148b0b27ad2722daea1be1e990d6d99625?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto aspect-square fill-white w-[15px] mr-3"
                        />
                        <div>Fermer le menu</div>
                      </div>
                    </Link>
                  </div>
                  {/* <div className="flex gap-2 justify-between px-4 py-2 mt-6 w-full text-base whitespace-nowrap bg-white rounded-xl max-w-[366px] text-zinc-900">
        <div className="flex gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7bf75bc9df886f5006778abefeb515829a739a66656af1dc69083ba7c0d4f7b?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 aspect-[1.49] fill-blue-600 w-[30px]"
          />
          <div>Français</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7b208d956b9826aef6bd24397df2c27186d4bfaaa7cee401d87b7031a9c2eb?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
          className="shrink-0 w-5 aspect-square"
        />
      </div> */}
                  {/* <div className=" flex justify-center items-center px-8 py-2 mt-6 w-full text-base font-medium text-white bg-orange-500 max-w-[360px] rounded-[30px]">
                    <Link to="/register">
                      {" "}
                      <div className="flex gap-4  mx-12 justify-center ">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/782d8b9c4e26c6ae2faa75f1bad14c148b0b27ad2722daea1be1e990d6d99625?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                          className="shrink-0 my-auto aspect-square fill-white w-[15px]"
                        />
                        <div>Fermer le menu</div>
                      </div>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Header;
