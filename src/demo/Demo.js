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
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/45e43d6a1b0a07e1d3fcd7e8750669b17a89d4dfcf62f6dd50606f4e181008cb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
              className="my-auto w-36 max-w-full aspect-[2.78]"
            />
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
