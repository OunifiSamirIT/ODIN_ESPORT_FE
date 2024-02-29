import React, { Component, useState } from "react";

import "./demo.css";
import Hero from "../assets/ODIN2.png";

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
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  const toggleButtons = () => {
    setIsButtonsVisible(!isButtonsVisible);
  };
    return (
      <div className="flex flex-col bg-slate-200">
      <div className="flex overflow-hidden relative flex-col justify-center w-full min-h-[560px] max-md:max-w-full" >
       
       
       
       
       
       
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d311b2f484e3e8a12e868afb62b46fe3098a29000e14b42dd432d8d4babb5ebd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
          className="object-cover absolute inset-0 size-full"
        />

        <div className="flex relative flex-col items-center px-16 pb-3 w-full  max-md:px-5 max-md:max-w-full"
             style={{ background: 'linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),  center/cover no-repeat' }}>
             
          <div className="flex gap-1 justify-between py-2 w-full max-w-[1184px] max-md:flex-wrap max-md:mb-10 max-md:max-w-full">
          <svg width="209" height="53" viewBox="0 0 209 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_983_61844)">
<path d="M66.8102 14.0668V52.3118H40.5283L38.1046 47.5324L35.7149 42.7481L33.3204 37.9687L30.9307 33.1893L33.3204 28.4099L35.7149 23.6256L38.1046 18.8656L40.5283 14.0668H66.8102ZM42.9034 18.8656L40.5283 23.6256L38.1046 28.4099L35.7149 33.1893L38.1046 37.9687L40.4943 42.7481L42.884 47.5324H62.0066V18.8656H42.9034Z" fill="#2E71EB"/>
<path d="M26.2965 14.0668L28.6862 18.8462L31.0759 23.6256L33.4656 28.4099L35.8601 33.1893L33.4656 37.9687L31.0759 42.7481L28.6862 47.5324L26.2965 52.3118H0V14.0668H26.2965ZM4.78426 18.8656V47.5518H23.9068L26.2965 42.7675L28.6862 37.9881L31.0759 33.2087L28.6862 28.4292L26.2965 23.645L23.9068 18.8656H4.78426Z" fill="#2E71EB"/>
<path d="M73.1696 0H68.3369V4.60491H73.1696V0Z" fill="#FF7F00"/>
<path d="M80.5764 29.1129C79.5627 29.1388 78.5564 28.9332 77.6341 28.5118C76.8426 28.1445 76.1399 27.6104 75.574 26.9461C75.0476 26.3249 74.6342 25.6162 74.3525 24.8521C74.0952 24.1566 73.9591 23.4221 73.9502 22.6805V22.3024C73.9549 21.5218 74.0943 20.7478 74.3622 20.0145C74.6438 19.2285 75.0825 18.508 75.6517 17.8972C76.2209 17.2863 76.9087 16.7978 77.6729 16.4615C79.5284 15.716 81.6002 15.716 83.4557 16.4615C84.2212 16.7958 84.9099 17.2837 85.4794 17.8948C86.0488 18.5059 86.4869 19.2274 86.7664 20.0145C87.0369 20.7471 87.1764 21.5215 87.1784 22.3024V22.6805C87.1719 23.4223 87.0357 24.1572 86.7761 24.8521C86.4981 25.6169 86.0861 26.3259 85.5594 26.9461C84.9926 27.6094 84.2901 28.1433 83.4993 28.5118C82.5834 28.9318 81.5837 29.1374 80.5764 29.1129ZM80.5764 26.8492C81.1679 26.858 81.7546 26.7407 82.2972 26.505C82.7973 26.2807 83.2423 25.9499 83.6011 25.5356C83.9632 25.1296 84.2431 24.6571 84.4252 24.1444C84.6168 23.6145 84.7136 23.055 84.7112 22.4915C84.7169 21.9009 84.6201 21.3137 84.4252 20.7562C84.2474 20.2472 83.9669 19.7803 83.6011 19.3844C83.235 18.9906 82.7887 18.6798 82.2923 18.4731C81.1827 18.0399 79.9507 18.0399 78.8411 18.4731C78.344 18.6811 77.8964 18.9916 77.5275 19.3844C77.1633 19.7815 76.883 20.2481 76.7034 20.7562C76.5102 21.314 76.415 21.9011 76.4223 22.4915C76.4182 23.0547 76.5134 23.6142 76.7034 24.1444C76.8874 24.6562 77.167 25.1283 77.5275 25.5356C77.8898 25.9502 78.3381 26.281 78.8411 26.505C79.3888 26.7407 79.9802 26.858 80.5764 26.8492Z" fill="#2E71EB"/>
<path d="M89.5293 28.8558V16.1753H91.9529V28.8558H89.5293ZM91.6233 28.8558V26.5921H94.2118C94.8071 26.6017 95.3989 26.4998 95.9568 26.2916C96.4443 26.1054 96.8858 25.816 97.251 25.4433C97.6071 25.0713 97.8841 24.6311 98.0653 24.1491C98.2607 23.6185 98.3576 23.0567 98.3513 22.4913C98.3596 21.9147 98.2627 21.3414 98.0653 20.7996C97.8873 20.3217 97.6098 19.8872 97.251 19.5248C96.8849 19.1624 96.4428 18.8859 95.9568 18.7153C95.3947 18.5266 94.8046 18.4348 94.2118 18.4438H91.6233V16.1753H94.0469C95.0573 16.1518 96.0632 16.3162 97.0135 16.66C97.8063 16.9568 98.5255 17.4215 99.122 18.0221C99.6753 18.5873 100.106 19.2606 100.387 19.9998C100.663 20.7309 100.805 21.5061 100.804 22.2877V22.6658C100.802 23.4282 100.661 24.1839 100.387 24.8955C100.086 25.6646 99.6294 26.363 99.0455 26.9469C98.4615 27.5309 97.7631 27.9877 96.9941 28.2886C96.051 28.6634 95.0421 28.8447 94.0276 28.8218L91.6233 28.8558Z" fill="#2E71EB"/>
<path d="M103.058 28.7879V16.2626H105.482V28.7879H103.058Z" fill="#2E71EB"/>
<path d="M108.593 28.7879V16.2626H112.587L117.856 26.7618H118.424L118.079 27.072V16.2626H120.377V28.7879H116.363L111.094 18.2887H110.513L110.857 17.9785V28.7879H108.593Z" fill="#2E71EB"/>
<path d="M74.687 49.4034V36.8538H77.0767V49.4034H74.687ZM76.7326 38.9332V36.878H82.273V38.9332H76.7326ZM76.7326 44.0665V42.0064H81.9628V44.0665H76.7326ZM76.7326 49.3985V47.319H82.4087V49.4034L76.7326 49.3985Z" fill="#2E71EB"/>
<path d="M89.0832 49.704C88.1201 49.7321 87.1624 49.5502 86.2767 49.1708C85.5699 48.8618 84.9661 48.3573 84.5365 47.7166C84.1341 47.0841 83.9252 46.3479 83.9354 45.5984H86.3203C86.3229 45.9406 86.4184 46.2756 86.5966 46.5678C86.8049 46.9077 87.113 47.1752 87.4788 47.3337C87.9858 47.5471 88.5336 47.6464 89.0832 47.6245C89.593 47.6394 90.1007 47.5521 90.5762 47.3676C90.9316 47.2302 91.2409 46.9949 91.4681 46.689C91.6655 46.4049 91.7674 46.0654 91.7589 45.7195C91.7625 45.5075 91.7129 45.2979 91.6147 45.11C91.5165 44.922 91.3728 44.7616 91.1967 44.6434C90.6638 44.3363 90.0617 44.1695 89.4468 44.1587L88.3465 44.0715C87.2896 44.0281 86.2777 43.6322 85.472 42.9469C85.1172 42.6235 84.8375 42.2264 84.6525 41.7834C84.4674 41.3405 84.3815 40.8624 84.4008 40.3827C84.3758 39.6661 84.568 38.9587 84.952 38.3533C85.3361 37.7478 85.8941 37.2725 86.553 36.9896C87.3205 36.668 88.1444 36.5024 88.9766 36.5024C89.8088 36.5024 90.6327 36.668 91.4002 36.9896C92.0543 37.2929 92.6078 37.7774 92.995 38.3856C93.3835 39.0244 93.5804 39.7613 93.5621 40.5087H91.1772C91.1825 40.1693 91.0971 39.8347 90.93 39.5393C90.7539 39.2415 90.499 38.9983 90.1933 38.8364C89.8068 38.6448 89.3785 38.5531 88.9475 38.5698C88.5335 38.5566 88.122 38.6396 87.7454 38.8122C87.4463 38.9534 87.1952 39.1793 87.0231 39.4617C86.8653 39.7323 86.7833 40.0404 86.7856 40.3536C86.7843 40.544 86.8213 40.7327 86.8946 40.9085C86.9679 41.0842 87.0759 41.2434 87.2122 41.3764C87.5913 41.6965 88.0733 41.8687 88.5694 41.8611L89.6698 41.9629C90.4786 42.0154 91.2723 42.2072 92.0158 42.53C92.6435 42.7983 93.1865 43.2323 93.5864 43.7855C93.9697 44.3452 94.165 45.0124 94.1438 45.6905C94.1581 46.4321 93.9431 47.16 93.5282 47.7748C93.0875 48.399 92.4767 48.8836 91.7686 49.1708C90.9204 49.5337 90.0057 49.7153 89.0832 49.704Z" fill="#2E71EB"/>
<path d="M96.3784 49.4035V36.8005H98.8021V49.4035H96.3784ZM98.4676 45.5596V43.4462H100.891C101.325 43.4597 101.754 43.3595 102.137 43.1553C102.467 42.9683 102.735 42.6885 102.908 42.3507C103.083 41.9802 103.174 41.5754 103.174 41.1655C103.174 40.7556 103.083 40.3508 102.908 39.9804C102.735 39.6449 102.467 39.3682 102.137 39.1854C101.753 38.985 101.324 38.8866 100.891 38.8994H98.4676V36.7908H100.702C101.623 36.7642 102.537 36.9396 103.383 37.3047C104.08 37.6085 104.669 38.1152 105.074 38.7588C105.475 39.4412 105.676 40.2219 105.656 41.0128V41.2891C105.676 42.08 105.475 42.8607 105.074 43.5431C104.671 44.1938 104.082 44.7087 103.383 45.0215C102.539 45.3925 101.623 45.5713 100.702 45.545L98.4676 45.5596Z" fill="#2E71EB"/>
<path d="M113.552 49.7039C112.539 49.7274 111.533 49.522 110.61 49.1028C109.819 48.7321 109.117 48.1967 108.55 47.5323C108.021 46.9125 107.608 46.2034 107.328 45.4383C107.07 44.7429 106.934 44.0083 106.926 43.2667V42.8935C106.93 42.1112 107.069 41.3355 107.338 40.6007C107.614 39.8374 108.037 39.1358 108.584 38.5358C109.159 37.8995 109.863 37.3923 110.648 37.0477C112.504 36.3021 114.576 36.3021 116.431 37.0477C117.196 37.3837 117.884 37.8721 118.453 38.483C119.022 39.094 119.461 39.8145 119.742 40.6007C120.013 41.3348 120.152 42.111 120.154 42.8935V43.2667C120.148 44.0085 120.012 44.7435 119.752 45.4383C119.476 46.2041 119.064 46.9135 118.535 47.5323C117.967 48.1956 117.265 48.7309 116.475 49.1028C115.558 49.5206 114.559 49.726 113.552 49.7039ZM113.552 47.4402C114.144 47.449 114.73 47.3317 115.273 47.0961C115.773 46.8715 116.218 46.5407 116.577 46.1266C116.939 45.7224 117.219 45.2515 117.401 44.7403C117.592 44.2086 117.689 43.6476 117.687 43.0825C117.693 42.4934 117.596 41.9078 117.401 41.352C117.223 40.8416 116.943 40.3731 116.577 39.9754C116.21 39.5831 115.764 39.274 115.268 39.069C114.158 38.6358 112.926 38.6358 111.817 39.069C111.32 39.2751 110.872 39.584 110.503 39.9754C110.139 40.3743 109.858 40.8425 109.679 41.352C109.485 41.9081 109.39 42.4937 109.398 43.0825C109.394 43.6473 109.489 44.2083 109.679 44.7403C109.863 45.2506 110.143 45.7212 110.503 46.1266C110.866 46.5409 111.314 46.8716 111.817 47.0961C112.363 47.3401 112.954 47.4656 113.552 47.4645V47.4402Z" fill="#2E71EB"/>
<path d="M122.505 49.4035V36.8005H124.929V49.4035H122.505ZM124.221 45.2154V43.2426H127.411C127.815 43.2537 128.214 43.1584 128.569 42.9663C128.893 42.7876 129.159 42.5202 129.335 42.1956C129.523 41.8476 129.619 41.4569 129.611 41.0613C129.619 40.661 129.524 40.2655 129.335 39.9125C129.159 39.5879 128.893 39.3204 128.569 39.1418C128.214 38.9497 127.815 38.8544 127.411 38.8655H124.221V36.7909H127.154C128.047 36.7714 128.935 36.9227 129.771 37.2368C130.468 37.5004 131.064 37.9749 131.478 38.594C131.9 39.2768 132.109 40.07 132.079 40.8723V41.1486C132.111 41.9532 131.9 42.749 131.473 43.4316C131.049 44.0382 130.453 44.504 129.762 44.7695C128.929 45.0839 128.044 45.2353 127.154 45.2154H124.221ZM130.159 49.4035L126.325 43.9212H129.054L133.005 49.4035H130.159Z" fill="#2E71EB"/>
<path d="M133.382 38.9963V36.8538H143.077V38.9963H133.382ZM136.989 49.4034V38.6521H139.412V49.4034H136.989Z" fill="#2E71EB"/>
<rect x="148.288" y="33.7975" width="60.3486" height="18.1507" rx="4.48373" stroke="#0D055B" stroke-width="0.727092"/>
<path d="M169.267 46.5707C168.724 46.5707 168.247 46.4505 167.836 46.2101C167.433 45.9696 167.115 45.6323 166.882 45.1979C166.657 44.7636 166.537 44.2634 166.521 43.6972H166.789V46.3729H166.091V37.8805H166.963V42.1267L166.626 42.9062C166.641 42.2857 166.766 41.7622 166.998 41.3356C167.239 40.9013 167.557 40.5717 167.952 40.3468C168.355 40.1219 168.813 40.0094 169.325 40.0094C169.775 40.0094 170.182 40.0947 170.546 40.2654C170.911 40.436 171.221 40.6686 171.477 40.9634C171.741 41.2581 171.939 41.5993 172.07 41.9871C172.21 42.3671 172.28 42.7704 172.28 43.197V43.3599C172.28 43.7787 172.21 44.182 172.07 44.5697C171.931 44.9498 171.729 45.291 171.466 45.5935C171.21 45.896 170.895 46.1364 170.523 46.3148C170.151 46.4854 169.732 46.5707 169.267 46.5707ZM169.174 45.8029C169.639 45.8029 170.038 45.6904 170.372 45.4655C170.705 45.2406 170.961 44.9381 171.14 44.5581C171.318 44.1781 171.407 43.7515 171.407 43.2784C171.407 42.7976 171.314 42.371 171.128 41.9987C170.95 41.6187 170.69 41.3201 170.349 41.103C170.015 40.8858 169.624 40.7772 169.174 40.7772C168.755 40.7772 168.375 40.8703 168.034 41.0564C167.692 41.2426 167.421 41.5063 167.219 41.8475C167.025 42.181 166.928 42.5765 166.928 43.0341V43.6042C166.928 44.0385 167.025 44.4224 167.219 44.7559C167.421 45.0816 167.692 45.3375 168.034 45.5237C168.375 45.7098 168.755 45.8029 169.174 45.8029ZM176.614 46.5707C176.087 46.5707 175.629 46.4815 175.242 46.3031C174.854 46.117 174.536 45.8727 174.288 45.5702C174.04 45.26 173.853 44.9149 173.729 44.5348C173.613 44.1548 173.555 43.7632 173.555 43.3599V43.197C173.555 42.8015 173.613 42.4137 173.729 42.0336C173.853 41.6536 174.04 41.3124 174.288 41.0099C174.536 40.7074 174.846 40.467 175.218 40.2886C175.598 40.1025 176.04 40.0094 176.545 40.0094C177.188 40.0094 177.723 40.1529 178.15 40.4399C178.584 40.7268 178.91 41.0952 179.127 41.545C179.344 41.9871 179.453 42.4641 179.453 42.976V43.4297H173.95V42.7549H178.848L178.627 43.0923C178.627 42.6347 178.546 42.2353 178.383 41.894C178.228 41.545 177.995 41.2736 177.685 41.0797C177.382 40.8781 177.002 40.7772 176.545 40.7772C176.064 40.7772 175.664 40.8897 175.346 41.1146C175.028 41.3395 174.788 41.6381 174.625 42.0104C174.47 42.3826 174.392 42.8053 174.392 43.2784C174.392 43.7438 174.47 44.1703 174.625 44.5581C174.788 44.9381 175.032 45.2406 175.358 45.4655C175.691 45.6904 176.11 45.8029 176.614 45.8029C177.15 45.8029 177.584 45.6827 177.917 45.4422C178.251 45.1941 178.456 44.9032 178.534 44.5697H179.348C179.271 44.9808 179.108 45.3375 178.86 45.64C178.611 45.9347 178.297 46.1635 177.917 46.3264C177.537 46.4893 177.103 46.5707 176.614 46.5707ZM183.366 46.4427C182.94 46.4427 182.571 46.3807 182.261 46.2566C181.951 46.1325 181.71 45.9231 181.54 45.6284C181.369 45.3259 181.284 44.9226 181.284 44.4185V38.276H182.121V44.5465C182.121 44.9032 182.218 45.1786 182.412 45.3724C182.606 45.5586 182.881 45.6516 183.238 45.6516H184.343V46.4427H183.366ZM180.179 40.8819V40.2188H184.343V40.8819H180.179ZM189.752 46.3729V44.5232H189.613V42.3361C189.613 41.8785 189.493 41.5295 189.252 41.2891C189.012 41.0409 188.639 40.9168 188.135 40.9168C187.903 40.9168 187.666 40.9207 187.426 40.9285C187.193 40.9362 186.968 40.9479 186.751 40.9634C186.541 40.9711 186.355 40.9828 186.192 40.9983V40.2305C186.363 40.2149 186.538 40.1994 186.716 40.1839C186.894 40.1684 187.077 40.1607 187.263 40.1607C187.457 40.1529 187.643 40.149 187.821 40.149C188.449 40.149 188.953 40.2266 189.334 40.3817C189.721 40.5368 190.004 40.7811 190.183 41.1146C190.361 41.4403 190.45 41.8747 190.45 42.4175V46.3729H189.752ZM187.67 46.5358C187.236 46.5358 186.852 46.4582 186.518 46.3031C186.185 46.148 185.925 45.9231 185.739 45.6284C185.56 45.3337 185.471 44.9769 185.471 44.5581C185.471 44.1471 185.564 43.7981 185.75 43.5111C185.944 43.2241 186.22 43.007 186.576 42.8596C186.941 42.7045 187.379 42.6269 187.891 42.6269H189.694V43.2901H187.833C187.344 43.2901 186.968 43.4103 186.704 43.6507C186.448 43.8834 186.32 44.1897 186.32 44.5697C186.32 44.9575 186.456 45.2677 186.728 45.5004C186.999 45.7253 187.367 45.8378 187.833 45.8378C188.12 45.8378 188.395 45.7874 188.659 45.6866C188.922 45.578 189.143 45.3996 189.322 45.1514C189.5 44.8955 189.597 44.5465 189.613 44.1044L189.869 44.465C189.838 44.9226 189.729 45.3065 189.543 45.6167C189.357 45.9192 189.105 46.148 188.787 46.3031C188.469 46.4582 188.096 46.5358 187.67 46.5358Z" fill="#0D055B"/>
</g>
<defs>
<clipPath id="clip0_983_61844">
<rect width="209" height="52.3118" fill="white"/>
</clipPath>
</defs>
</svg>

            <div className="flex gap-3 justify-between py-4 max-md:flex-wrap max-md:max-w-full">
              <div className="grow my-auto text-base font-medium text-white">
                Contact
              </div>
              <a href="/signup"><div className="grow justify-center px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                Sign Up
              </div></a>
              <a href="/login"> <div className="grow justify-center px-8 py-2 text-base font-medium text-white whitespace-nowrap border-2 border-solid border-[color:var(--White,#FFF)] rounded-[30px] max-md:px-5">
                Log In
              </div></a>
              <div className="flex gap-4 justify-center my-auto max-md:ml-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c294fcf1de9791b7cc7a7ea59f519f34881fd89bedd3c34ffbc14a194a386647?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px] "
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed0b5afbea6f3ee1ff7750be61407dd135c8206ee4285dc442e2b66a5521378a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f4c8c2f14922be957a230e311105d52174d739d00c1cdb30e34782adb34a495?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1ddbd4823c2269fdc4d3afdc47f29398120dbf66b92c4b957a1d5f222285ddd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a94ca88b4480c20e8759399130a1d1bdf2148ae02fdf76f833a37ff869abcb1c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
              </div>
              
            </div>
            
          </div>
          

        </div>
        <div className="flex z-10 flex-col justify-center items-center self-center px-7 mt-0 w-full text-white max-w-full max-md:px-5 max-md:text-center max-md:mt-0 max-md:max-w-full"
     style={{ background: 'linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),  center/cover no-repeat' }}>
  <div className="self-stretch mt-28 text-5xl text-center  font-bold max-md:mt-10 max-md:max-w-full max-md:text-2xl">
    ELEVATE YOUR GAME, SEIZE YOUR FUTURE
  </div>
  <div className="mt-2 text-xl text-center w-[924px] max-md:max-w-full">
    Connect with top football scouts and trainers, showcase your skills,
    and take the next step in your soccer journey. Your future in football
    starts here.
  </div>
  <div className="justify-center px-8 py-2 mt-4 mb-64 text-base font-medium whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:mb-10">
    Start Your Journey Now!
  </div>
</div>
      </div>
     
      <div className="flex justify-center items-center px-16 py-12 w-full bg-blue-600 max-md:px-5 max-md:max-w-full">
        <div className="my-1.5 w-full max-w-[1184px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-5xl font-bold max-md:max-w-full">
                  Unlocking
                  <br />
                  Football Dreams
                </div>
                <div className="mt-2 text-2xl font-light max-md:max-w-full">
                  A Comprehensive Experience for All
                </div>
                <div className="mt-12 text-lg max-md:mt-10 max-md:max-w-full">
                  ODIN E-SPORT offers a comprehensive experience for all
                  stakeholders in the football ecosystem, from young talents to
                  player agents, coaches, and football clubs. Whether you're a
                  young talent seeking to shine or a football professional
                  looking for the next star, our platform is the place where
                  dreams come true and opportunities materialize.
                </div>{" "}
                <div className="justify-center self-start px-8 py-2 mt-12 text-base font-medium whitespace-nowrap bg-zinc-900 rounded-[30px] max-md:px-5 max-md:mt-10">
                  Begin Your Adventure !
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/14eca3b22cadb072d1d657fddadc00a1caf359a25c5f8a86810634853a27e0ab?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="grow w-full aspect-[0.78] max-md:mt-10 max-md:max-w-full"
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
                <div className="text-5xl font-bold max-md:max-w-full">
                  Who is <br />
                  ODIN E-SPORT For?
                </div>{" "}
                <div className="mt-2 text-lg max-md:max-w-full">
                  ODIN E-SPORT welcomes football enthusiasts of all levels, from
                  aspiring young talents to seasoned professionals. Whether
                  you're a player, coach, agent, or club representative, our
                  platform provides a tailored experience to elevate your
                  football journey. Join our inclusive community and unlock
                  endless opportunities in the world of football.
                </div>
                <div className="justify-center self-start px-8 py-2 mt-8 text-base font-medium whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                  Join Us Now!
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col flex-wrap grow content-start py-px max-md:mt-10 max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b62ede3bac7974b182424eabb5de98a761aca162764cd0bde70f45c7c4c0358?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="w-full aspect-[1.45] max-md:max-w-full"
                />
                <div className="flex gap-5 justify-between p-4 mt-8 w-full max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/035fa9bb65e80eacce77d30b7fc58aaf474672630056281ef89d31e16cb9dcfd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="aspect-[0.51] fill-white w-[30px]"
                  />
                  <div className="flex gap-5 justify-between items-center my-auto">
                    <div className="self-stretch my-auto w-4 h-4 bg-white rounded-full" />
                    <div className="self-stretch w-6 h-6 bg-white rounded-full" />
                    <div className="self-stretch my-auto w-4 h-4 bg-white rounded-full" />
                    <div className="self-stretch my-auto w-4 h-4 bg-white rounded-full" />
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b6a5a483da43ce6d4f579321137d537488b149a47b96e818fd3561001a45ab0?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="aspect-[0.51] fill-white w-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-16 py-12 w-full max-md:px-5 max-md:max-w-full">
        <div className="my-1.5 w-full max-w-[1184px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow mt-32 text-black max-md:mt-10 max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cfe1a6e577c03b6dce3c2ef7036d1538a488f92a22efd339161f01b185c84a84?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="max-w-full aspect-square w-[161px]"
                />
                <div className="mt-8 text-5xl font-bold max-md:max-w-full">
                  How can we help?
                </div>
                <div className="mt-4 text-xl max-md:max-w-full">
                  Feel free to ask questions or share feedback about Odin
                  Esport, the premier community for football players and
                  entities. Your input is vital <br />
                  as we cultivate an inclusive space for football professionals
                  worldwide.
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d248d374105c734203eeadc5fb8bd71c1dbc492c9e7f4c916125a010c20b4c88?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="mt-8 max-w-full aspect-[2.08] w-[100px]"
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex grow justify-center items-center px-16 py-9 w-full text-base bg-white rounded-[30px] text-zinc-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col max-w-full w-[378px]">
                  <div className="text-5xl font-bold text-black">
                    Contact Us
                  </div>
                  Full Name
 <input type="text" className="justify-center items-start py-2 pr-16 pl-4 mt-4 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:pr-5"/>
 Email  <input className="justify-center items-start py-2 pr-16 pl-4 mt-4 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:pr-5"/>
                    
 Message...
  <input type="text" className="items-start pt-6 pr-16 pb-20 pl-6 mt-4 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:px-5"/>
                  <button type="submit" className="justify-center items-center px-16 py-2 mt-6 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-16 py-6 w-full bg-blue-600 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
          <div className="flex gap-5 justify-between py-2 w-full max-md:flex-wrap max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/467963995befdf6ef0dba3777efc055cf22e363dc56d063717f180ec01e2eb39?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
              className="my-auto w-36 max-w-full aspect-[2.78]"
            />
            <div className="flex gap-5 justify-between py-4 max-md:flex-wrap max-md:max-w-full">
              <div className="grow my-auto text-base font-medium text-white">
                Contact
              </div>
              <div className="grow justify-center px-8 py-2 text-base font-medium text-blue-600 whitespace-nowrap bg-white rounded-[30px] max-md:px-5">
                Sign Up
              </div>
              <div className="grow justify-center px-8 py-2 text-base font-medium text-white whitespace-nowrap border-2 border-solid border-[color:var(--White,#FFF)] rounded-[30px] max-md:px-5">
                Log In
              </div>
              <div className="flex gap-4 justify-center my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1ec6d35f3b05f2288199e26db2c539db4d86385ab9a57004c311861d328435f?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/dddd3fcf87932a1463ba7bac327bac5109e9e9441e978fa2511da846a9c7993d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9e9c988d693d28053e7cff95fe3f509f5cfe178500df1879f17e6a568543898?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ded6f1f8186678141fa4d5e8a61c7ff8642d0ffa91d9a0fa9cfc3687fe89ddde?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4857c033cb6a449624d6b626ffe4059967e4f136086d3dea8553cce8c36be04c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="aspect-square w-[25px]"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between py-2 mt-6 max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto self-start mt-1 text-xs text-white">
              All Rights Reserved © 2024 Odin Esport
            </div>
            <div className="flex-auto text-base font-medium text-white underline">
              Terms & Conditions 
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  
}

export default Demo;
