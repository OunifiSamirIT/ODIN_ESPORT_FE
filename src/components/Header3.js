import React, { Component, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Darkbutton from "../components/Darkbutton";
import Logo from "../assets/ODIN22.png";
import SlideMenu from "./SlideMenuregister";
import '../components/Hamburger.css'
import BurgerMenuLink from '../components/BurgerMenuLink'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import Profilesearch from "../assets/Profilesearch.png"
import Football from "../assets/Football.png";
import Parametre from "../assets/Parametre.png";
import Userdefault from "../assets/userdefault.jpg";

function Header() {
  const iconImages = {
    Profilesearch,
    Football,
    Parametre
    // Add other icon-image mappings here
  };
  const handleClick = () => {
    // Use setState to update showMenu
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };
  // Fetch user information based on the id from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const id = storedUserData.id ? storedUserData.id : 54;
  const [isOpen, setIsOpen] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [search, setSearch] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);






  const [isActive, setIsActive] = useState(null)
  const [isNoti, setisNoti] = useState(null)
  const location = useLocation();
  useEffect(() => {
    setHumberger(false)
  }, [location])

  useEffect(() => {
    // Replace the API endpoint with your actual endpoint for fetching user data
    fetch(`http://localhost:5000/api/user/${storedUserData.id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData)
        console.log(user)
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [])



  useEffect(() => {
    fetch(`http://localhost:5000/api/AllTarget`)
      .then((response) => response.json())
      .then((data) => {
        setSearch(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

        // Fetch users
  fetch(`http://localhost:5000/api/user`)
  .then((response) => response.json())
  .then((userData) => {
    setUsers(userData)
        console.log(userData);
  })
  .catch((error) => console.error("Error fetching users:", error));
  }, []);



  const handleSearch = (event) => {
    const searchString = event.target.value;
    setSearchTerm(searchString);
    if (searchString.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredTargets = search.filter((item) =>
        item.titre.toLowerCase().startsWith(searchString.toLowerCase()) || item.titre.toLowerCase().includes(searchString.toLowerCase())
      ).map(target => ({...target, origin: 'Page'})); // Adding origin property to filtered targets
      
      const filteredUsers = users.filter((user) =>
        user.nom.toLowerCase().startsWith(searchString.toLowerCase())  ||   user.nom.toLowerCase().includes(searchString.toLowerCase())
      ).map(user => ({...user, origin: 'Personne'})); // Adding origin property to filtered users
      
      setSearchResults([...filteredTargets, ...filteredUsers]);
    }
  };
  


  // const handleSearch = (event) => {
  //   const searchString = event.target.value;
  //   setSearchTerm(searchString);
  //   if (searchString.trim() === '') {
  //     setSearchResults([]);
  //   } else {
  //     const filteredResults = search.filter((item) =>
  //       item.titre.toLowerCase().includes(searchString.toLowerCase())
  //     );
  //     setSearchResults(filteredResults);
  //     console.log("ddddddddd", searchResults
  //     )

  //   }
  // };

 

  // const handleSearch = (event) => {
  //   const searchString = event.target.value;
  //   setSearchTerm(searchString);
  //   if (searchString.trim() === '') {
  //     setSearchResults([]);
  //   } else {
  //     const filteredResults = search.filter((item) =>
  //       item.titre.toLowerCase().includes(searchString.toLowerCase())
  //     );
  //     setSearchResults(filteredResults);
      
  //   }
  // };





  const toggleActive = () => setIsOpen(!isActive);
  const toggleisNoti = () => setisNoti(!isNoti);
  const navClass = `${isOpen ? " nav-active" : ""}`;
  const buttonClass = `${isOpen ? " active" : ""}`;
  const searchClass = `${isActive ? " show" : ""}`;
  const notiClass = `${isNoti ? " show" : ""}`;
  const userProfileType = storedUserData ? storedUserData.profil : null;


  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player", "other"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);



  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Update the authentication state to false

    // Redirect to the login page or another route
    navigate("/login");
  };
  const [Hamburger, setHumberger] = useState(false)

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
      <div className={`w-full bg-white fixed mb-20 z-50 shadow-xs ${Hamburger ? 'fixed top-0 h-screen overflow-hidden z-50' : ''}`}>
      <div className="flex ">  <div className="max-sm:px-4 max-w-[1200px] h-[80px] w-full bg-white  border-0 flex items-center justify-between mx-auto py-2 ">
         <div className="flex flex-row">
           <Link to="/home" className="mt-3">
            <svg width="209" height="53" viewBox="0 0 209 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_983_61844)">
                <path d="M66.8102 14.0668V52.3118H40.5283L38.1046 47.5324L35.7149 42.7481L33.3204 37.9687L30.9307 33.1893L33.3204 28.4099L35.7149 23.6256L38.1046 18.8656L40.5283 14.0668H66.8102ZM42.9034 18.8656L40.5283 23.6256L38.1046 28.4099L35.7149 33.1893L38.1046 37.9687L40.4943 42.7481L42.884 47.5324H62.0066V18.8656H42.9034Z" fill="#2E71EB" />
                <path d="M26.2965 14.0668L28.6862 18.8462L31.0759 23.6256L33.4656 28.4099L35.8601 33.1893L33.4656 37.9687L31.0759 42.7481L28.6862 47.5324L26.2965 52.3118H0V14.0668H26.2965ZM4.78426 18.8656V47.5518H23.9068L26.2965 42.7675L28.6862 37.9881L31.0759 33.2087L28.6862 28.4292L26.2965 23.645L23.9068 18.8656H4.78426Z" fill="#2E71EB" />
                <path d="M73.1696 0H68.3369V4.60491H73.1696V0Z" fill="#FF7F00" />
                <path d="M80.5764 29.1129C79.5627 29.1388 78.5564 28.9332 77.6341 28.5118C76.8426 28.1445 76.1399 27.6104 75.574 26.9461C75.0476 26.3249 74.6342 25.6162 74.3525 24.8521C74.0952 24.1566 73.9591 23.4221 73.9502 22.6805V22.3024C73.9549 21.5218 74.0943 20.7478 74.3622 20.0145C74.6438 19.2285 75.0825 18.508 75.6517 17.8972C76.2209 17.2863 76.9087 16.7978 77.6729 16.4615C79.5284 15.716 81.6002 15.716 83.4557 16.4615C84.2212 16.7958 84.9099 17.2837 85.4794 17.8948C86.0488 18.5059 86.4869 19.2274 86.7664 20.0145C87.0369 20.7471 87.1764 21.5215 87.1784 22.3024V22.6805C87.1719 23.4223 87.0357 24.1572 86.7761 24.8521C86.4981 25.6169 86.0861 26.3259 85.5594 26.9461C84.9926 27.6094 84.2901 28.1433 83.4993 28.5118C82.5834 28.9318 81.5837 29.1374 80.5764 29.1129ZM80.5764 26.8492C81.1679 26.858 81.7546 26.7407 82.2972 26.505C82.7973 26.2807 83.2423 25.9499 83.6011 25.5356C83.9632 25.1296 84.2431 24.6571 84.4252 24.1444C84.6168 23.6145 84.7136 23.055 84.7112 22.4915C84.7169 21.9009 84.6201 21.3137 84.4252 20.7562C84.2474 20.2472 83.9669 19.7803 83.6011 19.3844C83.235 18.9906 82.7887 18.6798 82.2923 18.4731C81.1827 18.0399 79.9507 18.0399 78.8411 18.4731C78.344 18.6811 77.8964 18.9916 77.5275 19.3844C77.1633 19.7815 76.883 20.2481 76.7034 20.7562C76.5102 21.314 76.415 21.9011 76.4223 22.4915C76.4182 23.0547 76.5134 23.6142 76.7034 24.1444C76.8874 24.6562 77.167 25.1283 77.5275 25.5356C77.8898 25.9502 78.3381 26.281 78.8411 26.505C79.3888 26.7407 79.9802 26.858 80.5764 26.8492Z" fill="#2E71EB" />
                <path d="M89.5293 28.8558V16.1753H91.9529V28.8558H89.5293ZM91.6233 28.8558V26.5921H94.2118C94.8071 26.6017 95.3989 26.4998 95.9568 26.2916C96.4443 26.1054 96.8858 25.816 97.251 25.4433C97.6071 25.0713 97.8841 24.6311 98.0653 24.1491C98.2607 23.6185 98.3576 23.0567 98.3513 22.4913C98.3596 21.9147 98.2627 21.3414 98.0653 20.7996C97.8873 20.3217 97.6098 19.8872 97.251 19.5248C96.8849 19.1624 96.4428 18.8859 95.9568 18.7153C95.3947 18.5266 94.8046 18.4348 94.2118 18.4438H91.6233V16.1753H94.0469C95.0573 16.1518 96.0632 16.3162 97.0135 16.66C97.8063 16.9568 98.5255 17.4215 99.122 18.0221C99.6753 18.5873 100.106 19.2606 100.387 19.9998C100.663 20.7309 100.805 21.5061 100.804 22.2877V22.6658C100.802 23.4282 100.661 24.1839 100.387 24.8955C100.086 25.6646 99.6294 26.363 99.0455 26.9469C98.4615 27.5309 97.7631 27.9877 96.9941 28.2886C96.051 28.6634 95.0421 28.8447 94.0276 28.8218L91.6233 28.8558Z" fill="#2E71EB" />
                <path d="M103.058 28.7879V16.2626H105.482V28.7879H103.058Z" fill="#2E71EB" />
                <path d="M108.593 28.7879V16.2626H112.587L117.856 26.7618H118.424L118.079 27.072V16.2626H120.377V28.7879H116.363L111.094 18.2887H110.513L110.857 17.9785V28.7879H108.593Z" fill="#2E71EB" />
                <path d="M74.687 49.4034V36.8538H77.0767V49.4034H74.687ZM76.7326 38.9332V36.878H82.273V38.9332H76.7326ZM76.7326 44.0665V42.0064H81.9628V44.0665H76.7326ZM76.7326 49.3985V47.319H82.4087V49.4034L76.7326 49.3985Z" fill="#2E71EB" />
                <path d="M89.0832 49.704C88.1201 49.7321 87.1624 49.5502 86.2767 49.1708C85.5699 48.8618 84.9661 48.3573 84.5365 47.7166C84.1341 47.0841 83.9252 46.3479 83.9354 45.5984H86.3203C86.3229 45.9406 86.4184 46.2756 86.5966 46.5678C86.8049 46.9077 87.113 47.1752 87.4788 47.3337C87.9858 47.5471 88.5336 47.6464 89.0832 47.6245C89.593 47.6394 90.1007 47.5521 90.5762 47.3676C90.9316 47.2302 91.2409 46.9949 91.4681 46.689C91.6655 46.4049 91.7674 46.0654 91.7589 45.7195C91.7625 45.5075 91.7129 45.2979 91.6147 45.11C91.5165 44.922 91.3728 44.7616 91.1967 44.6434C90.6638 44.3363 90.0617 44.1695 89.4468 44.1587L88.3465 44.0715C87.2896 44.0281 86.2777 43.6322 85.472 42.9469C85.1172 42.6235 84.8375 42.2264 84.6525 41.7834C84.4674 41.3405 84.3815 40.8624 84.4008 40.3827C84.3758 39.6661 84.568 38.9587 84.952 38.3533C85.3361 37.7478 85.8941 37.2725 86.553 36.9896C87.3205 36.668 88.1444 36.5024 88.9766 36.5024C89.8088 36.5024 90.6327 36.668 91.4002 36.9896C92.0543 37.2929 92.6078 37.7774 92.995 38.3856C93.3835 39.0244 93.5804 39.7613 93.5621 40.5087H91.1772C91.1825 40.1693 91.0971 39.8347 90.93 39.5393C90.7539 39.2415 90.499 38.9983 90.1933 38.8364C89.8068 38.6448 89.3785 38.5531 88.9475 38.5698C88.5335 38.5566 88.122 38.6396 87.7454 38.8122C87.4463 38.9534 87.1952 39.1793 87.0231 39.4617C86.8653 39.7323 86.7833 40.0404 86.7856 40.3536C86.7843 40.544 86.8213 40.7327 86.8946 40.9085C86.9679 41.0842 87.0759 41.2434 87.2122 41.3764C87.5913 41.6965 88.0733 41.8687 88.5694 41.8611L89.6698 41.9629C90.4786 42.0154 91.2723 42.2072 92.0158 42.53C92.6435 42.7983 93.1865 43.2323 93.5864 43.7855C93.9697 44.3452 94.165 45.0124 94.1438 45.6905C94.1581 46.4321 93.9431 47.16 93.5282 47.7748C93.0875 48.399 92.4767 48.8836 91.7686 49.1708C90.9204 49.5337 90.0057 49.7153 89.0832 49.704Z" fill="#2E71EB" />
                <path d="M96.3784 49.4035V36.8005H98.8021V49.4035H96.3784ZM98.4676 45.5596V43.4462H100.891C101.325 43.4597 101.754 43.3595 102.137 43.1553C102.467 42.9683 102.735 42.6885 102.908 42.3507C103.083 41.9802 103.174 41.5754 103.174 41.1655C103.174 40.7556 103.083 40.3508 102.908 39.9804C102.735 39.6449 102.467 39.3682 102.137 39.1854C101.753 38.985 101.324 38.8866 100.891 38.8994H98.4676V36.7908H100.702C101.623 36.7642 102.537 36.9396 103.383 37.3047C104.08 37.6085 104.669 38.1152 105.074 38.7588C105.475 39.4412 105.676 40.2219 105.656 41.0128V41.2891C105.676 42.08 105.475 42.8607 105.074 43.5431C104.671 44.1938 104.082 44.7087 103.383 45.0215C102.539 45.3925 101.623 45.5713 100.702 45.545L98.4676 45.5596Z" fill="#2E71EB" />
                <path d="M113.552 49.7039C112.539 49.7274 111.533 49.522 110.61 49.1028C109.819 48.7321 109.117 48.1967 108.55 47.5323C108.021 46.9125 107.608 46.2034 107.328 45.4383C107.07 44.7429 106.934 44.0083 106.926 43.2667V42.8935C106.93 42.1112 107.069 41.3355 107.338 40.6007C107.614 39.8374 108.037 39.1358 108.584 38.5358C109.159 37.8995 109.863 37.3923 110.648 37.0477C112.504 36.3021 114.576 36.3021 116.431 37.0477C117.196 37.3837 117.884 37.8721 118.453 38.483C119.022 39.094 119.461 39.8145 119.742 40.6007C120.013 41.3348 120.152 42.111 120.154 42.8935V43.2667C120.148 44.0085 120.012 44.7435 119.752 45.4383C119.476 46.2041 119.064 46.9135 118.535 47.5323C117.967 48.1956 117.265 48.7309 116.475 49.1028C115.558 49.5206 114.559 49.726 113.552 49.7039ZM113.552 47.4402C114.144 47.449 114.73 47.3317 115.273 47.0961C115.773 46.8715 116.218 46.5407 116.577 46.1266C116.939 45.7224 117.219 45.2515 117.401 44.7403C117.592 44.2086 117.689 43.6476 117.687 43.0825C117.693 42.4934 117.596 41.9078 117.401 41.352C117.223 40.8416 116.943 40.3731 116.577 39.9754C116.21 39.5831 115.764 39.274 115.268 39.069C114.158 38.6358 112.926 38.6358 111.817 39.069C111.32 39.2751 110.872 39.584 110.503 39.9754C110.139 40.3743 109.858 40.8425 109.679 41.352C109.485 41.9081 109.39 42.4937 109.398 43.0825C109.394 43.6473 109.489 44.2083 109.679 44.7403C109.863 45.2506 110.143 45.7212 110.503 46.1266C110.866 46.5409 111.314 46.8716 111.817 47.0961C112.363 47.3401 112.954 47.4656 113.552 47.4645V47.4402Z" fill="#2E71EB" />
                <path d="M122.505 49.4035V36.8005H124.929V49.4035H122.505ZM124.221 45.2154V43.2426H127.411C127.815 43.2537 128.214 43.1584 128.569 42.9663C128.893 42.7876 129.159 42.5202 129.335 42.1956C129.523 41.8476 129.619 41.4569 129.611 41.0613C129.619 40.661 129.524 40.2655 129.335 39.9125C129.159 39.5879 128.893 39.3204 128.569 39.1418C128.214 38.9497 127.815 38.8544 127.411 38.8655H124.221V36.7909H127.154C128.047 36.7714 128.935 36.9227 129.771 37.2368C130.468 37.5004 131.064 37.9749 131.478 38.594C131.9 39.2768 132.109 40.07 132.079 40.8723V41.1486C132.111 41.9532 131.9 42.749 131.473 43.4316C131.049 44.0382 130.453 44.504 129.762 44.7695C128.929 45.0839 128.044 45.2353 127.154 45.2154H124.221ZM130.159 49.4035L126.325 43.9212H129.054L133.005 49.4035H130.159Z" fill="#2E71EB" />
                <path d="M133.382 38.9963V36.8538H143.077V38.9963H133.382ZM136.989 49.4034V38.6521H139.412V49.4034H136.989Z" fill="#2E71EB" />
                <rect x="148.288" y="33.7975" width="60.3486" height="18.1507" rx="4.48373" stroke="#0D055B" stroke-width="0.727092" />
                <path d="M169.267 46.5707C168.724 46.5707 168.247 46.4505 167.836 46.2101C167.433 45.9696 167.115 45.6323 166.882 45.1979C166.657 44.7636 166.537 44.2634 166.521 43.6972H166.789V46.3729H166.091V37.8805H166.963V42.1267L166.626 42.9062C166.641 42.2857 166.766 41.7622 166.998 41.3356C167.239 40.9013 167.557 40.5717 167.952 40.3468C168.355 40.1219 168.813 40.0094 169.325 40.0094C169.775 40.0094 170.182 40.0947 170.546 40.2654C170.911 40.436 171.221 40.6686 171.477 40.9634C171.741 41.2581 171.939 41.5993 172.07 41.9871C172.21 42.3671 172.28 42.7704 172.28 43.197V43.3599C172.28 43.7787 172.21 44.182 172.07 44.5697C171.931 44.9498 171.729 45.291 171.466 45.5935C171.21 45.896 170.895 46.1364 170.523 46.3148C170.151 46.4854 169.732 46.5707 169.267 46.5707ZM169.174 45.8029C169.639 45.8029 170.038 45.6904 170.372 45.4655C170.705 45.2406 170.961 44.9381 171.14 44.5581C171.318 44.1781 171.407 43.7515 171.407 43.2784C171.407 42.7976 171.314 42.371 171.128 41.9987C170.95 41.6187 170.69 41.3201 170.349 41.103C170.015 40.8858 169.624 40.7772 169.174 40.7772C168.755 40.7772 168.375 40.8703 168.034 41.0564C167.692 41.2426 167.421 41.5063 167.219 41.8475C167.025 42.181 166.928 42.5765 166.928 43.0341V43.6042C166.928 44.0385 167.025 44.4224 167.219 44.7559C167.421 45.0816 167.692 45.3375 168.034 45.5237C168.375 45.7098 168.755 45.8029 169.174 45.8029ZM176.614 46.5707C176.087 46.5707 175.629 46.4815 175.242 46.3031C174.854 46.117 174.536 45.8727 174.288 45.5702C174.04 45.26 173.853 44.9149 173.729 44.5348C173.613 44.1548 173.555 43.7632 173.555 43.3599V43.197C173.555 42.8015 173.613 42.4137 173.729 42.0336C173.853 41.6536 174.04 41.3124 174.288 41.0099C174.536 40.7074 174.846 40.467 175.218 40.2886C175.598 40.1025 176.04 40.0094 176.545 40.0094C177.188 40.0094 177.723 40.1529 178.15 40.4399C178.584 40.7268 178.91 41.0952 179.127 41.545C179.344 41.9871 179.453 42.4641 179.453 42.976V43.4297H173.95V42.7549H178.848L178.627 43.0923C178.627 42.6347 178.546 42.2353 178.383 41.894C178.228 41.545 177.995 41.2736 177.685 41.0797C177.382 40.8781 177.002 40.7772 176.545 40.7772C176.064 40.7772 175.664 40.8897 175.346 41.1146C175.028 41.3395 174.788 41.6381 174.625 42.0104C174.47 42.3826 174.392 42.8053 174.392 43.2784C174.392 43.7438 174.47 44.1703 174.625 44.5581C174.788 44.9381 175.032 45.2406 175.358 45.4655C175.691 45.6904 176.11 45.8029 176.614 45.8029C177.15 45.8029 177.584 45.6827 177.917 45.4422C178.251 45.1941 178.456 44.9032 178.534 44.5697H179.348C179.271 44.9808 179.108 45.3375 178.86 45.64C178.611 45.9347 178.297 46.1635 177.917 46.3264C177.537 46.4893 177.103 46.5707 176.614 46.5707ZM183.366 46.4427C182.94 46.4427 182.571 46.3807 182.261 46.2566C181.951 46.1325 181.71 45.9231 181.54 45.6284C181.369 45.3259 181.284 44.9226 181.284 44.4185V38.276H182.121V44.5465C182.121 44.9032 182.218 45.1786 182.412 45.3724C182.606 45.5586 182.881 45.6516 183.238 45.6516H184.343V46.4427H183.366ZM180.179 40.8819V40.2188H184.343V40.8819H180.179ZM189.752 46.3729V44.5232H189.613V42.3361C189.613 41.8785 189.493 41.5295 189.252 41.2891C189.012 41.0409 188.639 40.9168 188.135 40.9168C187.903 40.9168 187.666 40.9207 187.426 40.9285C187.193 40.9362 186.968 40.9479 186.751 40.9634C186.541 40.9711 186.355 40.9828 186.192 40.9983V40.2305C186.363 40.2149 186.538 40.1994 186.716 40.1839C186.894 40.1684 187.077 40.1607 187.263 40.1607C187.457 40.1529 187.643 40.149 187.821 40.149C188.449 40.149 188.953 40.2266 189.334 40.3817C189.721 40.5368 190.004 40.7811 190.183 41.1146C190.361 41.4403 190.45 41.8747 190.45 42.4175V46.3729H189.752ZM187.67 46.5358C187.236 46.5358 186.852 46.4582 186.518 46.3031C186.185 46.148 185.925 45.9231 185.739 45.6284C185.56 45.3337 185.471 44.9769 185.471 44.5581C185.471 44.1471 185.564 43.7981 185.75 43.5111C185.944 43.2241 186.22 43.007 186.576 42.8596C186.941 42.7045 187.379 42.6269 187.891 42.6269H189.694V43.2901H187.833C187.344 43.2901 186.968 43.4103 186.704 43.6507C186.448 43.8834 186.32 44.1897 186.32 44.5697C186.32 44.9575 186.456 45.2677 186.728 45.5004C186.999 45.7253 187.367 45.8378 187.833 45.8378C188.12 45.8378 188.395 45.7874 188.659 45.6866C188.922 45.578 189.143 45.3996 189.322 45.1514C189.5 44.8955 189.597 44.5465 189.613 44.1044L189.869 44.465C189.838 44.9226 189.729 45.3065 189.543 45.6167C189.357 45.9192 189.105 46.148 188.787 46.3031C188.469 46.4582 188.096 46.5358 187.67 46.5358Z" fill="#0D055B" />
              </g>
              <defs>
                <clipPath id="clip0_983_61844">
                  <rect width="209" height="52.3118" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0"> </span>
          </Link>
          
         
        
          </div>
          <div className="flex md:flex hidden  gap-2">
          <div className="flex flex-row items-center">
  <div className="flex items-center gap-2.5 p-1">
    <svg width={15} height={16} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 0.804688C6.01664 0.804688 4.5666 1.24455 3.33323 2.06867C2.09986 2.89278 1.13856 4.06412 0.570907 5.43456C0.00324965 6.80501 -0.145275 8.31301 0.144114 9.76787C0.433503 11.2227 1.14781 12.5591 2.1967 13.608C3.2456 14.6569 4.58197 15.3712 6.03683 15.6606C7.49168 15.95 8.99968 15.8014 10.3701 15.2338C11.7406 14.6661 12.9119 13.7048 13.736 12.4715C14.5601 11.2381 15 9.78805 15 8.30469C14.9979 6.31622 14.207 4.40982 12.8009 3.00376C11.3949 1.59771 9.48847 0.806838 7.5 0.804688ZM12.9044 5.17969H10.8913C10.4406 4.1353 9.84724 3.15849 9.12813 2.27719C10.7197 2.71027 12.0765 3.75311 12.9044 5.17969ZM10.3125 8.30469C10.3074 8.94102 10.2071 9.57302 10.015 10.1797H4.985C4.79291 9.57302 4.69263 8.94102 4.6875 8.30469C4.69263 7.66835 4.79291 7.03636 4.985 6.42969H10.015C10.2071 7.03636 10.3074 7.66835 10.3125 8.30469ZM5.48625 11.4297H9.51375C8.98328 12.477 8.3051 13.4427 7.5 14.2972C6.69461 13.443 6.0164 12.4772 5.48625 11.4297ZM5.48625 5.17969C6.01673 4.13236 6.69491 3.16666 7.5 2.31219C8.3054 3.16642 8.9836 4.13216 9.51375 5.17969H5.48625ZM5.875 2.27719C5.15479 3.1583 4.56037 4.13512 4.10875 5.17969H2.09563C2.92429 3.75246 4.28229 2.70953 5.875 2.27719ZM1.53813 6.42969H3.6875C3.52548 7.04165 3.44148 7.67165 3.4375 8.30469C3.44148 8.93773 3.52548 9.56772 3.6875 10.1797H1.53813C1.15397 8.9592 1.15397 7.65017 1.53813 6.42969ZM2.09563 11.4297H4.10875C4.56037 12.4743 5.15479 13.4511 5.875 14.3322C4.28229 13.8998 2.92429 12.8569 2.09563 11.4297ZM9.12813 14.3322C9.84724 13.4509 10.4406 12.4741 10.8913 11.4297H12.9044C12.0765 12.8563 10.7197 13.8991 9.12813 14.3322ZM13.4619 10.1797H11.3125C11.4745 9.56772 11.5585 8.93773 11.5625 8.30469C11.5585 7.67165 11.4745 7.04165 11.3125 6.42969H13.4606C13.8448 7.65017 13.8448 8.9592 13.4606 10.1797H13.4619Z" fill="black" />
    </svg>
  </div>
  <div className="text-[#1d1e21] font-['Sora'] font-medium leading-[normal]">FR</div>
  <div className="scroll_right flex justify-center items-center p-1">
    <svg width={15} height={8} viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.935867 0.599609C1.18471 0.599828 1.42327 0.698856 1.59912 0.874922L6.39957 5.67537C6.54483 5.82067 6.71729 5.93593 6.90711 6.01457C7.09692 6.09321 7.30037 6.13368 7.50583 6.13368C7.71128 6.13368 7.91473 6.09321 8.10454 6.01457C8.29436 5.93593 8.46682 5.82067 8.61208 5.67537L13.4094 0.881179C13.5864 0.710212 13.8235 0.61561 14.0696 0.617748C14.3157 0.619886 14.5511 0.718594 14.7251 0.892612C14.8991 1.06663 14.9978 1.30203 15 1.54812C15.0021 1.79421 14.9075 2.03129 14.7365 2.20831L9.94297 7.0025C9.29707 7.64713 8.42181 8.00917 7.50927 8.00917C6.59673 8.00917 5.72146 7.64713 5.07557 7.0025L0.275117 2.20205C0.143957 2.07098 0.0545616 1.90399 0.0182114 1.72216C-0.0181389 1.54033 0.000185013 1.35181 0.0708704 1.18039C0.141556 1.00896 0.261436 0.862314 0.415381 0.758952C0.569327 0.655589 0.750441 0.600143 0.935867 0.599609Z" fill="#1D1E21" />
    </svg>
  </div>
</div>
             <Link to="/login">
               <div className=" px-2 mt-2  py-2 pl-2 md:px-2 md:py-2 my-auto bg-zinc-900 text-white rounded-[30px] ">
                Se connecter
              </div>
              </Link></div>

         
       
         
        </div>   <div className="flex mr-4 items-center">
            <SlideMenu setIsActive={setIsActive} setHumberger={setHumberger} Hamburger={Hamburger} />
          </div></div>
        {Hamburger && <div className='bg-zinc-100 fixed left-0 z-0 py-4 md:hidden w-screen h-screen overflow-y-scroll z-90'>
          <div className="flex flex-col items-center pb-12 mx-auto w-full max-w-[480px]  overflow-hidden ">
            <div className="flex flex-col gap-y-4 items-center pb-12 mx-auto w-full max-w-[480px] h-[1000px] ">
             
            <div className="flex flex-col items-center pb-20 mx-auto w-full bg-zinc-100 max-w-[480px]">
     
            <div className="justify-center items-center px-8 py-2 mt-10 w-full text-base font-medium text-white bg-blue-600 max-w-[366px] rounded-[30px]">
        Se connecter
      </div>
      <div className="flex gap-2 justify-between px-4 py-2 mt-6 w-full text-base whitespace-nowrap bg-white rounded-xl max-w-[366px] text-zinc-900">
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
      </div>
      <div className="flex justify-center items-center px-8 py-2 mt-6 w-full text-base font-medium text-white bg-orange-500 max-w-[366px] rounded-[30px]">
        <div className="flex gap-4 justify-center px-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/782d8b9c4e26c6ae2faa75f1bad14c148b0b27ad2722daea1be1e990d6d99625?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 my-auto aspect-square fill-white w-[15px]"
          />
          <div>Fermer le menu</div>
        </div>
      </div>
    </div>
            </div>
          </div>
        </div>}
      </div>

    </>

  );
}
export default Header;




