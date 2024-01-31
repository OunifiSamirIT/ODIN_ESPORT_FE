import React, { Component } from "react";

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

class Demo extends Component {
  render() {
    return (
      <div>
        <div className="header-wrapper demo-style">
          <div className="container max-container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-5">
                {" "}
               
                <a href="/" className="logo">
                <img src={Hero} alt="Company Logo" className=" w-28 h-28" /> <span className="d-inline-block fredoka-font ls-3 fw-600 text-current  font-xxl logo-text mb-0">
                    
                  </span>{" "}
                </a>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 d-none d-lg-block"></div>
              <div className="col-lg-3 col-md-10 col-sm-3 col-xs-8  w-28 text-right ">
                <a
                  href="/login"
                  className="btn btn-lg btn-primary  sm:ml-4 text-uppercase"
                >
                  Seconnecter
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="banner-wrapper vh-100 bscover demo-style"
          style={{
            backgroundImage: `url("assets/images/demo/banner-bg-1.jpg")`,
          }}
        >
          <div className="banner-content mt-6">
            <div className="container max-container">
              <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-8">
                  <h2 className="title-text mb-5 mt-5">
                    <b>ELEVATE YOUR GAME, SEIZE YOUR FUTURE</b>
                  </h2>
                  <h4 className="d-inline-block">
                    <span>
                      Connect with top football scouts and trainers, showcase
                      your skills, and take the next step in your soccer
                      journey. Your future in football starts here.
                    </span>
                  </h4>

                  <div className="clearfix"></div>
                  <a
                    href="#demo"
                    className="btn btn-lg btn-primary mr-4 text-uppercase mt-5"
                  >
                    See DEMOs
                  </a>

                  <div className="icon-scroll pos-bottom-center icon-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section pb100 pt50 demo-style" id="feature">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img
                  src="assets/images/demo/com-1.png"
                  alt="com"
                  className="img-fluid lg:mt-44 rounded-xl"
                />
              </div>
              <div className="col-lg-5 offset-lg-1">
                <h2 className="title-text2 mb-4 mt-5">
                  <b>Unlocking Football Dreams </b>A Comprehensive Experience
                  for All
                </h2>{" "}
                <p>
                  ODIN E-SPORT offers a comprehensive experience for all
                  stakeholders in the football ecosystem, from young talents to
                  player agents, coaches, and football clubs. Whether you're a
                  young talent seeking to shine or a football professional
                  looking for the next star, our platform is the place where
                  dreams come true and opportunities materialize.
                </p>
                <a
                  href="#demo"
                  className="btn btn-lg btn-primary mr-4 text-uppercase mt-4"
                >
                  Components
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="section demo-style" id="mobile">
          <div className="container max-container">
            <div
              className="col-lg-12 p-5 rounded-2xl shadow-2xl bscover "
              style={{
                backgroundImage: `url("assets/images/demo/mobile-banner-2.jpeg")`,
                height: "450px",
              }}
            >
              <div className="container">
                <div className="row"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 ml-16 mt-5 mb-5">
            <h2 className="title-text2 mb-4">
              <b>Mobile Optimize Design for any Device</b>
            </h2>
            <p>
              With beautifully designed custom post types to show off your works
              and collections.ODIN E-SPORT part of professional community
            </p>
            <a
              href="/"
              className="btn btn-lg btn-primary mr-4 text-uppercase mt-4"
            >
              See Demo
            </a>
          </div>
        </div>

        {/* <div className="section pb50 pt100 demo-style" id="demo">
                    <div className="container-fluid max-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-4 text-center">
                                <h2 className="title-text2 mb-4"><b>Choose Demo</b></h2>
                                <p className="mb-5">Create a really awesome website, choose the version that will suit your requirements in a best way.</p>
                            </div>
                            <div className="clearfix"></div>
                            
                        </div>
                        <div className="row">
                            <div className="col-sm-12 mt-5"></div>
                            
                            {newDemoList.map((value , index) => (
                                // Start Single Demo 
                                <div key={index} className="col-lg-4 col-md-6 demo-item">
                                    <a href={`/${value.url} `}>
                                        <img src={`assets/images/demo/${value.imageUrl}`} alt="demo-i" className="w-100" />
                                        <span>{value.title}</span>
                                    </a>
                                </div>          
                                
                                // End Single Demo
                            ))}
                        </div>
                    </div>
                </div> */}

        <div className="footer-container bg-blue-600 text-white" id="footer">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6 text-center">
                {/* Logo or image */}
                <img
                  src={Hero}
                  alt="Company Logo"
                  className="footer-logo w-24 h-24"
                />
                <h2 className="footer-title mt-2">
                  <b>Connect with Us</b>
                </h2>
                <p className="footer-text font-semibold">
                  Stay updated with our latest news and products.
                </p>
                <div className="social-icons">
                  {/* Add your social media icons or links here */}
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <div className="row">
                  {/* Link to some page */}
                  <div className="col-sm-12 text-center">
                    <a href="/some-page" className="footer-link">
                      Contact
                    </a>
                  </div>
                  <div className="col-sm-12 text-center">
                    <a href="/some-page" className="footer-link">
                      Info
                    </a>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-12 text-center">
                    <p className="footer-copyright">
                      &copy; 2024 Your Company. All rights reserved.
                    </p>
                    <p className="footer-email">
                      <a href="mailto:info@yourcompany.com">
                        ODIN_Esport@info.com
                      </a>
                    </p>
                    <p className="footer-link">
                      <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
