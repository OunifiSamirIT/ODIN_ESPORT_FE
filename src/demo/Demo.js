import React, { Component, useRef, useState } from "react";

import "./demo.css";
import Hero from "../assets/ODIN2.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { toast, ToastContainer } from 'react-toastify';

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
  const contactUsRef = useRef();

  const toggleButtons = () => {
    setIsButtonsVisible(!isButtonsVisible);
  };


  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const [formData, setFormData] = useState({
    emailuser: '',
    nomPrenom: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://odine-sport.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
       
            toast.success('Email envoyer avec  success', {
              position: "top-right",
              autoClose: 5000,
              type: 'success',
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
         
        // Reset form fields or show success message
      } else {
        console.error('Failed to submit contact form');
        // Handle error (e.g., display error message)
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle error (e.g., display error message)
    }
  };


  const friendsettings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: false,
    autoplay: true, 
    autoplaySpeed: 3500, 
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
          <svg width="213" height="53" viewBox="0 0 213 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1110_63568)">
<path d="M67.1201 14.13V52.56H40.7001L38.3001 47.76L35.9001 43L33.5001 38.2L31.1001 33.4L33.5001 28.59L35.9001 23.79L38.3001 18.99L40.7001 14.18L67.1201 14.13ZM43.1201 18.94L40.7101 23.74L38.3101 28.54L35.9101 33.35L38.3101 38.15L40.7001 43L43.1101 47.81H62.3201V18.94H43.1201Z" fill="white"/>
<path d="M26.42 14.13L28.82 18.94L31.22 23.74L33.62 28.54L36 33.35L33.59 38.15L31.22 43L28.82 47.81L26.42 52.61H0V14.13H26.42ZM4.8 18.94V47.76H24L26.42 43L28.82 38.2L31.22 33.4L28.82 28.59L26.42 23.79L24 18.94H4.8Z" fill="white"/>
<path d="M73.5102 0H68.6602V4.63H73.5102V0Z" fill="#FF7F00"/>
<path d="M80.9998 29.25C79.9671 29.2822 78.9407 29.077 77.9998 28.65C77.2041 28.2785 76.498 27.7395 75.9298 27.07C75.4031 26.4581 74.99 25.7571 74.7098 25C74.4483 24.3025 74.3096 23.5649 74.2998 22.82V22.44C74.3038 21.6555 74.4424 20.8775 74.7098 20.14C74.9955 19.3491 75.4338 18.6219 75.9998 18C76.56 17.3821 77.2406 16.8853 77.9998 16.54C79.8644 15.7928 81.9452 15.7928 83.8098 16.54C84.612 16.8709 85.3346 17.3685 85.9298 18C86.4784 18.605 86.903 19.3116 87.1798 20.08C87.4472 20.8175 87.5858 21.5955 87.5898 22.38V22.76C87.5839 23.5043 87.4485 24.242 87.1898 24.94C86.9246 25.7158 86.5215 26.4374 85.9998 27.07C85.4338 27.7418 84.7272 28.2812 83.9298 28.65C83.0107 29.0679 82.0092 29.273 80.9998 29.25ZM80.9998 27C81.5981 27.0089 82.1914 26.8896 82.7398 26.65C83.2218 26.4164 83.6507 26.0862 83.9998 25.68C84.3579 25.2685 84.636 24.7936 84.8198 24.28C85.013 23.7479 85.1112 23.186 85.1098 22.62C85.1153 22.0243 85.0172 21.4321 84.8198 20.87C84.6413 20.3629 84.3624 19.8969 83.9998 19.5C83.6337 19.099 83.1828 18.7846 82.6798 18.58C82.147 18.3603 81.5761 18.2481 80.9998 18.25C80.4035 18.2415 79.8116 18.3537 79.2598 18.58C78.7596 18.7897 78.3097 19.1033 77.9398 19.5C77.5772 19.8969 77.2983 20.3629 77.1198 20.87C76.9225 21.4321 76.8243 22.0243 76.8298 22.62C76.8285 23.186 76.9266 23.7479 77.1198 24.28C77.3036 24.7936 77.5817 25.2685 77.9398 25.68C78.311 26.0826 78.7601 26.4058 79.2598 26.63C79.8073 26.8744 80.4002 27.0005 80.9998 27Z" fill="white"/>
<path d="M90 29V16.25H92.4V29H90ZM92.11 29V26.72H94.71C95.3069 26.7299 95.9005 26.6282 96.46 26.42C96.9463 26.2308 97.3868 25.9404 97.7523 25.568C98.1178 25.1956 98.4 24.7497 98.58 24.26C98.774 23.7284 98.8689 23.1658 98.86 22.6C98.8706 22.021 98.7757 21.445 98.58 20.9C98.4043 20.4181 98.1243 19.981 97.76 19.62C97.3937 19.2549 96.9491 18.9779 96.46 18.81C95.898 18.6132 95.3054 18.5184 94.71 18.53H92.11V16.25H94.5C95.5223 16.2293 96.5396 16.3988 97.5 16.75C98.2949 17.053 99.0171 17.5198 99.62 18.12C100.171 18.6948 100.599 19.3751 100.88 20.12C101.167 20.8528 101.312 21.6331 101.31 22.42V22.8C101.31 23.5671 101.164 24.3273 100.88 25.04C100.584 25.8142 100.131 26.5186 99.5492 27.1089C98.9675 27.6993 98.2697 28.1627 97.5 28.47C96.5457 28.8463 95.5254 29.0265 94.5 29H92.11Z" fill="white"/>
<path d="M103.52 28.92V16.34H106V28.92H103.52Z" fill="white"/>
<path d="M109.1 28.92V16.34H113.1L118.39 26.89H119L118.66 27.2V16.34H121V28.92H117L111.71 18.37H111L111.34 18.06V28.92H109.1Z" fill="white"/>
<path d="M75 49.61V37H77.4V49.61H75ZM77 39.1V37H82.57V39.1H77ZM77 44.25V42.18H82.26V44.25H77ZM77 49.61V47.54H82.8V49.61H77Z" fill="white"/>
<path d="M89.5 49.94C88.535 49.9693 87.5755 49.7849 86.69 49.4C85.974 49.0942 85.3649 48.5825 84.94 47.93C84.5307 47.2958 84.3185 46.5547 84.33 45.8H86.73C86.7287 46.1529 86.8257 46.4991 87.01 46.8C87.2216 47.1349 87.5279 47.3994 87.89 47.56C88.3976 47.779 88.9477 47.8815 89.5 47.86C90.0124 47.8743 90.5224 47.7859 91 47.6C91.3591 47.4644 91.6715 47.2283 91.9 46.92C92.1041 46.6276 92.206 46.2761 92.19 45.92C92.1936 45.7076 92.1443 45.4977 92.0465 45.3092C91.9488 45.1207 91.8056 44.9594 91.63 44.84C91.0965 44.5227 90.4906 44.3471 89.87 44.33L88.76 44.25C87.7015 44.2022 86.6886 43.8048 85.88 43.12C85.5226 42.7948 85.2407 42.3954 85.0541 41.9497C84.8676 41.504 84.7808 41.0228 84.8 40.54C84.7792 39.8171 84.9784 39.105 85.3713 38.4979C85.7641 37.8907 86.3321 37.4172 87 37.14C87.7712 36.8168 88.5989 36.6504 89.435 36.6504C90.2711 36.6504 91.0989 36.8168 91.87 37.14C92.528 37.4502 93.0858 37.9387 93.48 38.55C93.852 39.2035 94.0322 39.9487 94 40.7H91.61C91.6155 40.3505 91.5293 40.0058 91.36 39.7C91.1837 39.402 90.9273 39.1595 90.62 39C90.2323 38.8073 89.8027 38.7145 89.37 38.73C88.9536 38.7152 88.5393 38.7973 88.16 38.97C87.8617 39.1116 87.6114 39.3376 87.44 39.62C87.2785 39.8926 87.1922 40.2032 87.19 40.52C87.1997 40.8982 87.3577 41.2574 87.63 41.52C87.9996 41.8756 88.4875 42.0822 89 42.1L90.1 42.2C90.9141 42.2496 91.713 42.4426 92.46 42.77C93.0729 43.037 93.6042 43.4614 94 44C94.3837 44.5615 94.5798 45.2302 94.56 45.91C94.5902 46.6474 94.3948 47.3764 94 48C93.561 48.6334 92.9455 49.1237 92.23 49.41C91.3668 49.7745 90.437 49.955 89.5 49.94Z" fill="white"/>
<path d="M96.8301 49.61V36.9399H99.2801V49.61H96.8301ZM98.9301 45.75V43.63H101.38C101.815 43.6432 102.246 43.5433 102.63 43.34C102.962 43.1501 103.233 42.869 103.41 42.5299C103.594 42.1607 103.687 41.7525 103.68 41.34C103.689 40.9272 103.596 40.5185 103.41 40.15C103.237 39.8104 102.965 39.5314 102.63 39.3499C102.246 39.1466 101.815 39.0467 101.38 39.06H98.9301V36.9399H101.18C102.104 36.9129 103.023 37.0904 103.87 37.4599C104.573 37.7663 105.166 38.2789 105.57 38.93C105.974 39.6171 106.178 40.4032 106.16 41.2V41.47C106.18 42.2669 105.975 43.0534 105.57 43.74C105.163 44.3914 104.571 44.9067 103.87 45.22C103.024 45.5932 102.105 45.7742 101.18 45.75H98.9301Z" fill="white"/>
<path d="M114.09 49.94C113.057 49.9716 112.031 49.7663 111.09 49.34C110.298 48.9625 109.593 48.4245 109.02 47.76C108.492 47.1345 108.079 46.4201 107.8 45.65C107.538 44.9528 107.399 44.215 107.39 43.47V43.09C107.394 42.3047 107.537 41.5262 107.81 40.79C108.085 40.024 108.51 39.3203 109.06 38.72C109.637 38.0826 110.343 37.5748 111.13 37.23C112.051 36.833 113.047 36.6386 114.05 36.66C115.043 36.6379 116.03 36.8324 116.94 37.23C117.731 37.5746 118.44 38.0824 119.02 38.72C119.567 39.3228 119.991 40.0258 120.27 40.79C120.541 41.5267 120.679 42.3052 120.68 43.09V43.47C120.675 44.2145 120.54 44.9523 120.28 45.65C120.002 46.4224 119.585 47.1375 119.05 47.76C118.486 48.4253 117.787 48.9637 117 49.34C116.087 49.753 115.093 49.958 114.09 49.94ZM114.09 47.66C114.684 47.6713 115.274 47.5554 115.82 47.32C116.325 47.0865 116.772 46.7452 117.13 46.32C117.498 45.9367 117.793 45.4894 118 45C118.19 44.4639 118.285 43.8988 118.28 43.33C118.288 42.7382 118.193 42.1495 118 41.59C117.82 41.0785 117.537 40.609 117.17 40.21C116.801 39.8153 116.35 39.5049 115.85 39.3C114.739 38.8601 113.502 38.8601 112.39 39.3C111.89 39.5049 111.44 39.8153 111.07 40.21C110.7 40.6066 110.417 41.0768 110.24 41.59C110.044 42.1489 109.945 42.7376 109.95 43.33C109.936 43.897 110.021 44.4621 110.2 45C110.384 45.513 110.666 45.9852 111.03 46.39C111.39 46.8176 111.841 47.1592 112.35 47.39C112.904 47.6023 113.498 47.6943 114.09 47.66Z" fill="white"/>
<path d="M123.09 49.61V36.94H125.53V49.61H123.09ZM124.81 45.4V43.4H128C128.403 43.4093 128.802 43.3164 129.16 43.13C129.482 42.9443 129.748 42.6747 129.93 42.35C130.115 41.999 130.208 41.6067 130.2 41.21C130.208 40.81 130.115 40.4145 129.93 40.06C129.751 39.7333 129.484 39.4632 129.16 39.28C128.803 39.0901 128.404 38.9937 128 39H124.79V36.94H127.79C128.687 36.92 129.58 37.0727 130.42 37.39C131.117 37.6546 131.715 38.13 132.13 38.75C132.552 39.4372 132.761 40.2341 132.73 41.04V41.32C132.762 42.1274 132.55 42.9258 132.12 43.61C131.695 44.2397 131.088 44.7246 130.38 45C129.543 45.3125 128.653 45.4619 127.76 45.44L124.81 45.4ZM130.81 49.61L126.95 44.13H129.69L133.69 49.61H130.81Z" fill="white"/>
<path d="M134 39.18V37H143.73V39.15L134 39.18ZM137.64 49.61V38.84H140.09V49.61H137.64Z" fill="white"/>
<rect x="152.094" y="34.0957" width="60.3486" height="18.1507" rx="4.48373" stroke="white" stroke-width="0.727092"/>
<path d="M173.072 46.8689C172.53 46.8689 172.053 46.7487 171.642 46.5083C171.238 46.2678 170.92 45.9305 170.688 45.4962C170.463 45.0618 170.342 44.5616 170.327 43.9954H170.595V46.6711H169.897V38.1787H170.769V42.4249L170.432 43.2044C170.447 42.5839 170.571 42.0604 170.804 41.6339C171.044 41.1995 171.362 40.8699 171.758 40.645C172.161 40.4201 172.619 40.3076 173.131 40.3076C173.58 40.3076 173.988 40.3929 174.352 40.5636C174.717 40.7342 175.027 40.9669 175.283 41.2616C175.546 41.5563 175.744 41.8975 175.876 42.2853C176.016 42.6654 176.086 43.0686 176.086 43.4952V43.6581C176.086 44.0769 176.016 44.4802 175.876 44.868C175.737 45.248 175.535 45.5892 175.271 45.8917C175.015 46.1942 174.701 46.4346 174.329 46.613C173.957 46.7836 173.538 46.8689 173.072 46.8689ZM172.979 46.1011C173.445 46.1011 173.844 45.9886 174.178 45.7637C174.511 45.5388 174.767 45.2363 174.945 44.8563C175.124 44.4763 175.213 44.0497 175.213 43.5766C175.213 43.0958 175.12 42.6692 174.934 42.297C174.755 41.9169 174.496 41.6183 174.154 41.4012C173.821 41.184 173.429 41.0754 172.979 41.0754C172.561 41.0754 172.181 41.1685 171.839 41.3546C171.498 41.5408 171.227 41.8045 171.025 42.1457C170.831 42.4792 170.734 42.8748 170.734 43.3323V43.9024C170.734 44.3367 170.831 44.7206 171.025 45.0541C171.227 45.3798 171.498 45.6358 171.839 45.8219C172.181 46.008 172.561 46.1011 172.979 46.1011ZM180.42 46.8689C179.893 46.8689 179.435 46.7797 179.047 46.6013C178.66 46.4152 178.342 46.1709 178.093 45.8684C177.845 45.5582 177.659 45.2131 177.535 44.8331C177.419 44.453 177.36 44.0614 177.36 43.6581V43.4952C177.36 43.0997 177.419 42.7119 177.535 42.3319C177.659 41.9518 177.845 41.6106 178.093 41.3081C178.342 41.0056 178.652 40.7652 179.024 40.5868C179.404 40.4007 179.846 40.3076 180.35 40.3076C180.994 40.3076 181.529 40.4511 181.956 40.7381C182.39 41.025 182.716 41.3934 182.933 41.8433C183.15 42.2853 183.259 42.7623 183.259 43.2742V43.7279H177.756V43.0531H182.654L182.433 43.3905C182.433 42.9329 182.351 42.5335 182.188 42.1923C182.033 41.8433 181.801 41.5718 181.49 41.3779C181.188 41.1763 180.808 41.0754 180.35 41.0754C179.869 41.0754 179.47 41.1879 179.152 41.4128C178.834 41.6377 178.594 41.9363 178.431 42.3086C178.276 42.6809 178.198 43.1035 178.198 43.5766C178.198 44.042 178.276 44.4685 178.431 44.8563C178.594 45.2363 178.838 45.5388 179.164 45.7637C179.497 45.9886 179.916 46.1011 180.42 46.1011C180.955 46.1011 181.39 45.9809 181.723 45.7405C182.057 45.4923 182.262 45.2014 182.34 44.868H183.154C183.076 45.279 182.914 45.6358 182.665 45.9382C182.417 46.2329 182.103 46.4617 181.723 46.6246C181.343 46.7875 180.909 46.8689 180.42 46.8689ZM187.172 46.7409C186.745 46.7409 186.377 46.6789 186.067 46.5548C185.756 46.4307 185.516 46.2213 185.345 45.9266C185.175 45.6241 185.089 45.2208 185.089 44.7167V38.5743H185.927V44.8447C185.927 45.2014 186.024 45.4768 186.218 45.6707C186.412 45.8568 186.687 45.9499 187.044 45.9499H188.149V46.7409H187.172ZM183.984 41.1801V40.517H188.149V41.1801H183.984ZM193.558 46.6711V44.8214H193.418V42.6343C193.418 42.1767 193.298 41.8277 193.058 41.5873C192.817 41.3391 192.445 41.215 191.941 41.215C191.708 41.215 191.472 41.2189 191.231 41.2267C190.999 41.2344 190.774 41.2461 190.557 41.2616C190.347 41.2693 190.161 41.281 189.998 41.2965V40.5287C190.169 40.5132 190.343 40.4977 190.522 40.4821C190.7 40.4666 190.882 40.4589 191.068 40.4589C191.262 40.4511 191.448 40.4472 191.627 40.4472C192.255 40.4472 192.759 40.5248 193.139 40.6799C193.527 40.835 193.81 41.0793 193.988 41.4128C194.167 41.7386 194.256 42.1729 194.256 42.7158V46.6711H193.558ZM191.476 46.834C191.041 46.834 190.657 46.7565 190.324 46.6013C189.99 46.4462 189.731 46.2213 189.544 45.9266C189.366 45.6319 189.277 45.2751 189.277 44.8563C189.277 44.4453 189.37 44.0963 189.556 43.8093C189.75 43.5224 190.025 43.3052 190.382 43.1578C190.747 43.0027 191.185 42.9252 191.697 42.9252H193.5V43.5883H191.638C191.15 43.5883 190.774 43.7085 190.51 43.9489C190.254 44.1816 190.126 44.4879 190.126 44.868C190.126 45.2557 190.262 45.566 190.533 45.7986C190.805 46.0235 191.173 46.136 191.638 46.136C191.925 46.136 192.201 46.0856 192.464 45.9848C192.728 45.8762 192.949 45.6978 193.128 45.4496C193.306 45.1937 193.403 44.8447 193.418 44.4026L193.674 44.7633C193.643 45.2208 193.535 45.6047 193.349 45.915C193.162 46.2174 192.91 46.4462 192.592 46.6013C192.274 46.7565 191.902 46.834 191.476 46.834Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1110_63568">
<rect width="212.806" height="52.61" fill="white"/>
</clipPath>
</defs>
</svg>

            <div className="flex gap-2 justify-between py-4 max-md:flex-wrap max-md:max-w-full">
              <div     onClick={() => scrollToRef(contactUsRef)} className="grow my-auto text-base font-medium text-white">
                Contact
              </div>
              <a href="/register"><div className="grow justify-center px-6 py-2 text-base font-medium text-white whitespace-nowrap border-2 border-solid border-blue-600 bg-blue-600 rounded-[30px] max-md:px-5">
                S'inscrire
              </div></a>
              <a href="/login"> <div className="grow justify-center px-6 py-2 text-base font-medium text-white whitespace-nowrap border-2 border-solid border-[color:var(--White,#FFF)] rounded-[30px] max-md:px-5">
                Se connecter
              </div></a>
              <div className="flex gap-2 justify-center my-auto max-md:ml-10">
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
  ÉLEVEZ VOTRE JEU, SAISISSEZ VOTRE AVENIR  </div>
  <div className="mt-2 text-xl text-center w-[924px] max-md:max-w-full">
  Connectez-vous avec les meilleurs scouts et entraîneurs de football, mettez en valeur vos compétences et franchissez la prochaine étape de votre parcours dans le football. Votre avenir dans le football commence ici.
  </div>
  <a href="/register"> <div className="justify-center px-8 py-2 mt-4 mb-64 text-base font-medium whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:mb-10">
  Commencez votre aventure ! 
  </div></a>
</div>
      </div>
     
      <div className="flex justify-center items-center px-16 py-12 w-full bg-blue-600 max-md:px-5 max-md:max-w-full">
        <div className="my-1.5 w-full max-w-[1184px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10">
                <div className="text-5xl font-bold max-md:max-w-full">
                Qui Sommes-Nous?
                  <br />
                  Débloquez vos rêves de football
                </div>
                <div className="mt-2 text-2xl font-light max-md:max-w-full">
                Une Expérience Exceptionnelle Pour Tous
                </div>
                <div className="mt-12 text-lg max-md:mt-10 max-md:max-w-full">
                


ODIN E-SPORT offre une expérience exceptionnelle pour tous les profils de l'écosystème du football, des jeunes talents aux agents de joueurs, aux entraîneurs et aux clubs de football. 
Que vous soyez un jeune talent cherchant à rayonner ou un professionnel du football à la recherche de la prochaine étoile, notre plateforme est l'endroit où les rêves se réalisent et les opportunités se concrétisent.
                </div>{" "}
                <a href="/register"><div className="justify-center w-[45%] self-start px-8 py-2 mt-12 text-base font-medium whitespace-nowrap bg-zinc-900 rounded-[30px] max-md:px-5 max-md:mt-10">
                  Lancez Votre Parcours !
                </div></a>
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
                Pour qui <br />
                est ODIN E-SPORT?
                </div>{" "}
                <div className="mt-2 text-lg max-md:max-w-full">
                
ODIN E-SPORT accueille les passionnés de football de tous niveaux, des jeunes talents ambitieux aux joueurs professionnels. Que vous soyez joueur, entraîneur, agent ou représentant de club, notre plateforme offre une expérience personnalisée pour sublimer votre parcours de football. 
Rejoignez notre communauté inclusive et débloquez un nombre infini d'opportunités dans le monde de professionnalisme de  football.
                </div>
                <a href="/register"><div className="justify-center self-start px-8 py-2 mt-8 text-base font-medium whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                  Rejoignez Nous!
                </div></a>
              </div>
            </div>





<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-10 max-md:max-w-full">



              
              </div>
            </div>





          </div>
        </div>
      </div>
        <div ref={contactUsRef} className="flex justify-center items-center px-16 py-12 w-full max-md:px-5 max-md:max-w-full">
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
                  Comment on peut vous aider?
                  </div>
                  <div className="mt-4 text-xl max-md:max-w-full">
                  
  N'hésitez pas à poser vos questions ou à partager vos commentaires sur Odin E-sport, la première communauté des joueurs de football et des entités associées. Votre feedback est essentiel alors que nous construisons un espace inclusif pour les professionnels du football du monde entier.
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
          <div className="text-5xl font-bold text-black">Contactez Nous</div>
          <div>
        <ToastContainer />
      </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="nomPrenom">Nom et Prénom</label>
            <input
              type="text"
              id="nomPrenom"
              name="nomPrenom"
              value={formData.nomPrenom}
              onChange={handleChange}
              className="justify-center items-start py-2 pr-16 pl-4 mt-4 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:pr-5"
              required
            />
            <label htmlFor="emailuser">Email</label>
            <input
              type="email"
              id="emailuser"
              name="emailuser"
              value={formData.emailuser}
              onChange={handleChange}
              className="justify-center items-start py-2 pr-16 pl-4 mt-4 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:pr-5"
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="items-start pt-6 pr-16 pb-20 pl-6 mt-4 whitespace-nowrap rounded-3xl border border-solid border-[color:var(--Black,#1D1E21)] max-md:px-5"
              required
            />
            <button
              type="submit"
              className="justify-center items-center px-16 py-2 mt-6 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5"
            >
              Envoyer
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
          <div className="flex gap-2 justify-between py-2 w-full max-md:flex-wrap max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/467963995befdf6ef0dba3777efc055cf22e363dc56d063717f180ec01e2eb39?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
              className="my-auto w-36 max-w-full aspect-[2.78]"
            />
            <div className="flex gap-2 justify-between py-4 max-md:flex-wrap max-md:max-w-full">
              <div     onClick={() => scrollToRef(contactUsRef)}
 className="grow my-auto text-base font-medium text-white">
                Contact
              </div>
             <Link to="/register"> <div className="grow justify-center px-8 py-2 text-base font-medium text-blue-600 whitespace-nowrap bg-white rounded-[30px] max-md:px-5">
                S'inscrire
              </div></Link>
            <Link to="/login">  <div className="grow justify-center px-8 py-2 text-base font-medium text-white whitespace-nowrap border-2 border-solid border-[color:var(--White,#FFF)] rounded-[30px] max-md:px-5">
                Se connecter
              </div></Link>
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
            <div className="flex text-base font-medium text-white underline">
              Terms & Conditions 
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  
}

export default Demo;
