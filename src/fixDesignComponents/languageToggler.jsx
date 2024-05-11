import React, { useState, useContext } from "react";
import gsap from "gsap";
import { Context } from "../index";
import frensh from "../assets/france.png"
import england from "../assets/united-kingdom.png"

export default function LanguageToggler( {color=false, hide=false, color2=false, Right=false, isCenter=false}) {
  //start _________ translation context
  const { _currentLang, _setLang } = useContext(Context);
  //end _________ translation context

  let [isOpened, setOpenedPopUp] = useState(true);

  let setLang = (lang) => {
    localStorage.setItem("language", lang);
    console.log("fr language", localStorage.getItem("language"));
    _setLang(lang);
  };

  let openPopUp = () => {
    gsap
      .timeline()
      .to(".switcherLanguageCon .togglerCon", {
        duration: 0,
        display: "flex",
      })
      .to(".switcherLanguageCon .togglerCon", {
        y: isOpened ? 7 : -5,
        opacity: isOpened ? 1 : 0,
        duration: 0.2,
      })
      .to(".switcherLanguageCon .togglerCon", {
        duration: 0,
        display: !isOpened ? "none" : "flex",
      });
    setOpenedPopUp(!isOpened);
  };
  let _swichLanguageHandler = (lang) => {
    gsap
      .timeline()

      .to(".tal1, .tal2", {
        x: -5,
        opacity: 0,
        duration: 0.2,
        stagger: 0.1,
        onComplete: () => {
          setLang(lang);
        },
      })
      .to(".tal1 , .tal2", {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.2,
      });

  };
  return (
    <div 
      style={hide ? {
        width: "100%",
        textAlign: "left"
      } : { showdaw: "none"}}
    className="switcherLanguageCon"  onClick={openPopUp}>
      <label 
       style={hide ? {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        fontWeight: 500,
        transform: "translateX(-7px)",
          fontSize: 12,
      } : { showdaw: "none"}}
      className="currentLangCon">
        {!hide &&
        
<svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2412 4.5C10.7579 4.5 9.30781 4.93987 8.07444 5.76398C6.84107 6.58809 5.87978 7.75943 5.31212 9.12987C4.74446 10.5003 4.59594 12.0083 4.88532 13.4632C5.17471 14.918 5.88902 16.2544 6.93791 17.3033C7.98681 18.3522 9.32318 19.0665 10.778 19.3559C12.2329 19.6453 13.7409 19.4968 15.1113 18.9291C16.4818 18.3614 17.6531 17.4001 18.4772 16.1668C19.3013 14.9334 19.7412 13.4834 19.7412 12C19.7391 10.0115 18.9482 8.10513 17.5421 6.69907C16.1361 5.29302 14.2297 4.50215 12.2412 4.5ZM17.6456 8.875H15.6325C15.1818 7.83062 14.5885 6.8538 13.8693 5.9725C15.4609 6.40558 16.8177 7.44842 17.6456 8.875ZM15.0537 12C15.0486 12.6363 14.9483 13.2683 14.7562 13.875H9.72621C9.53412 13.2683 9.43385 12.6363 9.42871 12C9.43385 11.3637 9.53412 10.7317 9.72621 10.125H14.7562C14.9483 10.7317 15.0486 11.3637 15.0537 12ZM10.2275 15.125H14.255C13.7245 16.1723 13.0463 17.138 12.2412 17.9925C11.4358 17.1383 10.7576 16.1725 10.2275 15.125ZM10.2275 8.875C10.7579 7.82767 11.4361 6.86197 12.2412 6.0075C13.0466 6.86173 13.7248 7.82747 14.255 8.875H10.2275ZM10.6162 5.9725C9.896 6.85362 9.30158 7.83044 8.84996 8.875H6.83684C7.6655 7.44777 9.0235 6.40485 10.6162 5.9725ZM6.27934 10.125H8.42871C8.26669 10.737 8.18269 11.367 8.17871 12C8.18269 12.633 8.26669 13.263 8.42871 13.875H6.27934C5.89518 12.6545 5.89518 11.3455 6.27934 10.125ZM6.83684 15.125H8.84996C9.30158 16.1696 9.896 17.1464 10.6162 18.0275C9.0235 17.5952 7.6655 16.5522 6.83684 15.125ZM13.8693 18.0275C14.5885 17.1462 15.1818 16.1694 15.6325 15.125H17.6456C16.8177 16.5516 15.4609 17.5944 13.8693 18.0275ZM18.2031 13.875H16.0537C16.2157 13.263 16.2997 12.633 16.3037 12C16.2997 11.367 16.2157 10.737 16.0537 10.125H18.2018C18.586 11.3455 18.586 12.6545 18.2018 13.875H18.2031Z"
            fill={color ? "#111" : "#fff"}
          />
        </svg>

        }
        <span style={{
          color: color ? "#222" : "",
          fontWeight: hide ? 500 : "",
        }}>{_currentLang}</span>

{!hide &&
        
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.67708 4.29541C5.92592 4.29563 6.16448 4.39466 6.34033 4.57072L11.1408 9.37117C11.286 9.51647 11.4585 9.63173 11.6483 9.71037C11.8381 9.78901 12.0416 9.82948 12.247 9.82948C12.4525 9.82948 12.6559 9.78901 12.8458 9.71037C13.0356 9.63173 13.208 9.51647 13.3533 9.37117L18.1506 4.57698C18.3276 4.40601 18.5647 4.31141 18.8108 4.31355C19.0569 4.31569 19.2923 4.4144 19.4663 4.58841C19.6403 4.76243 19.739 4.99783 19.7412 5.24392C19.7433 5.49001 19.6487 5.7271 19.4777 5.90411L14.6842 10.6983C14.0383 11.3429 13.163 11.705 12.2505 11.705C11.3379 11.705 10.4627 11.3429 9.81678 10.6983L5.01633 5.89785C4.88517 5.76678 4.79577 5.59979 4.75942 5.41796C4.72307 5.23613 4.7414 5.04761 4.81208 4.87619C4.88277 4.70476 5.00265 4.55812 5.15659 4.45475C5.31054 4.35139 5.49165 4.29594 5.67708 4.29541Z"
            fill={color ? "#111" : "#fff"}
          />
        </svg>
       
                }
      </label>

      <div className="togglerCon"
       style={
        { 
          top:  isCenter ? -15 : "100%",
          color: color2  ? "#111" : "",
          right: Right ? 0 : "auto"

        }
      }>
        <label
          onClick={() => {
            _swichLanguageHandler("Fr");
          }}
        >

{/* <svg id="emoji" className="scale-x-125"  viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <g id="color">
    <rect x="5" y="17" width="62" height="38" fill="#fff"/>
    <rect x="5" y="17" width="21" height="38" fill="#1e50a0"/>
    <rect x="46" y="17" width="21" height="38" fill="#d22f27"/>
  </g>
  <g id="line">
    <rect x="5" y="17" width="62" height="38" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg> */}

            <img src={frensh} />

          Francais

        </label>
        <label 
          onClick={() => {
            _swichLanguageHandler("Eng");
          }}
        >
{/* 
<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <g id="color">
    <rect x="5" y="17" width="62" height="38" fill="#fff"/>
    <polygon fill="#d22f27" stroke="#d22f27" stroke-miterlimit="10" stroke-width="2" points="67 33 39 33 39 17 33 17 33 33 5 33 5 39 33 39 33 55 39 55 39 39 67 39 67 33"/>
  </g>
  <g id="line">
    <rect x="5" y="17" width="62" height="38" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg> */}

            <img src={england} />
          Englais
        </label>
        {/* <label onClick={() => { _swichLanguageHandler("Tr") }}>Turqey</label> */}
        {/* <label onClick={() => { _swichLanguageHandler("Ger") }}>Germany</label> */}
      </div>
    </div>
  );
}
