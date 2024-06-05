import React, { element, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client

import "./main.scss";
import ScrollToTop from "./components/Scroltop";

import Profile from "./pages/Profile/Index";
import FriendRequest from "./pages/Profile/FriendRequest";
import FriendList from "./pages/Profile/FriendList";
import MoreProfile from "./pages/Profile/MoreProfile";
import Information from "./pages/informationProfile";
import Parametre from "./pages/Parametre";
import ProfilSocial from "./pages/ProfileSocial";
import Blog from "./pages/Blog/index";
import AdminBlog from "./pages/Admin/Blog";
import AddArticle from "./pages/Admin/Components/AddArticle";
import SingleArticle from "./pages/Blog/Article.jsx";
import EditBlog from "./pages/Admin/Components/editArticle.jsx";

import Demo from "./demo/Demo";

import Home from "./pages/HomePage/Home.jsx";
import Homee from "./pages/HomePage/Home copy.jsx";

import Badge from "./pages/Badge";
import Badgeagent from "./pages/Badgeagents";
import Group from "./pages/Group";
import Storie from "./pages/Storie";
import Member from "./pages/Member";
import Email from "./pages/Email";
import Emailopen from "./pages/Emailopen";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Contactinfo from "./pages/Contactinfo";
import Socialaccount from "./pages/Socialaccount";
import Password from "./pages/Password";
import Payment from "./pages/Payment";
import Notification from "./pages/Notification";
import Helpbox from "./pages/Helpbox";
import Login from "./pages/Authentification/Login/Login";
import LoginCode from "./pages/Authentification/Login/Logincode";
import Loginreset from "./pages/Authentification/ResetPassword/Loginrestpassword";
import Loginemail from "./pages/Authentification/Login/Loginemail.jsx";
import Register from "./pages/Authentification/Register/Register";
import Forgot from "./pages/Authentification/ResetPassword/Forgot.jsx";
import Notfound from "./pages/Notfound";
import Gallery from "./pages/Gallerie";
import Galleryuser from "./pages/Camps/Gallerieuserodin.jsx";
import GalleryuserEvent from "./pages/Event/GallerieuserodinEvents.jsx";
import GalleryDetailscamps from "./pages/Camps/Gallerieuserodindetails.jsx";
import GalleryDetailsevent from "./pages/Event/GallerieEventsodindetails.jsx";
import Thankscamps from "./pages/Camps/Gallerieuserthankyou.jsx";
import Thanksodinevent from "./pages/Event/Gallerieodineventthankyou.jsx";
import OnePost from "./components/onePost";

import ShopOne from "./pages/ShopOne";
import ShopTwo from "./pages/ShopTwo";
import ShopThree from "./pages/ShopThree";
import Singleproduct from "./pages/Singleproduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Chat from "./pages/Chat";
import Live from "./pages/Live";
import Job from "./pages/Job";
import Event from "./pages/Event";
import Hotel from "./pages/Hotel";
import Videos from "./pages/Videos";
import EditPost from "./pages/EditPost";
import Comingsoon from "./pages/Comingsoon";
import PostView from "./components/Createpost";

import Grouppage from "./pages/Grouppage";
import Userpage from "./pages/Userpage";
import Userpageee from "./pages/Userpageprofile";
import Authorpage from "./pages/Authorpage";
import Hotelsingle from "./pages/Hotelsingle";
import Analytics from "./pages/Analytics";
import EditPage from "./pages/EditPageArticle";
import Test from "./pages/Testpage";

import ProfileSetting from "./pages/Setting/index";

import OffreEmploi from "./pages/emploiOffre/AcceuilOffre";
import Entrpriseemploi from "./pages/emploiOffre/Entreprise";
import Homeoffre from "./pages/emploiOffre/Homeoffre";

import AdminHome from "./pages/Admin/Home";
import Users from "./pages/Admin/Users";
import EventA from "./pages/Admin/Event";
import Album from "./pages/Admin/Gallerie";
import Albumcamps from "./pages/Admin/Galleriecamps";
import Albumevents from "./pages/Admin/albumevents";
import AddEvent from "./pages/Admin/Components/AddEvent";
import AddAlbum from "./pages/Admin/Components/AddAlbum";
import AddAlbumEvents from "./pages/Admin/Components/AddAlbumEvents";
import AddAlbumcamps from "./pages/Admin/Components/AddAlbumCamps";
import AddOffreemploi from "./pages/Admin/offreemploi/addoffre";
import EditUser from "./pages/Admin/Components/EditUser";
import CreateUser from "./pages/Admin/Components/CreateUser";
import FormCamps from "./pages/Camps/GallerieuserForm.jsx";
import FormEvent from "./pages/Event/GallerieuserFormevent.jsx";

import UserEvent from "./pages/UserEvent";
import ViewAlbum from "./pages/Admin/Components/ViewAlbum";
import ViewAlbumodinuser from "./pages/ViewAlbumOdin";
import Error from "./pages/404";
import Bussinse from "./OdinBussinse/HomeBussinsse";

import gsap from "gsap";

import { BrowserRouter, Switch, Route, Navigate } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Routes } from "react-router-dom/dist";
import { BsTruckFlatbed } from "react-icons/bs";
import Errors from "./pages/404";
import Challenges from "./pages/Challenge/index.jsx";
import AdminChallenges from "./pages/Admin/Challenges.jsx";
import AddChallenge from "./pages/Admin/Components/AddChallenge.jsx";
import ChallengeDetais from "./pages/Challenge/Details.jsx";
import Searchpage from "./components/Searchpage.jsx";
import { Professionalprofile } from "./pages/Professionalprofile/Professionalprofile.jsx";
import HomeBusiness from "./pages/bussinessComponents/HomeBusiness.jsx";
import AdminLogin from "./pages/Admin/LoginAdmin.jsx";
import { useLocation } from "react-router-dom";
const rootElement = document.getElementById("root");

export const Context = React.createContext(null);

function Root() {
  let currentUrl = window.location;
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // start ________________________translation methods and state
  let [_currentLang, _setLang] = useState("");
  let getTranslation = (lang1, lang2, lang3, lang4) => {
    if (_currentLang == "Eng") {
      return lang1;
    } else if (_currentLang == "Fr") {
      return lang2;
    } else if (_currentLang == "Tr") {
      return lang3;
    } else {
      return lang4;
    }
  };

  // end ________________________translation methods and state

  // start ________________________dark mode methods and state
  let [_currentTheme, setDarkTheme] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  let handleDarkModeToggler = () => {
    if (_currentTheme) {
      gsap
        .timeline()
        .to(".darkModeSwitcher .sun", {
          opacity: 0,
          scale: 0.5,
          rotate: "360deg",
        })
        .to(".darkModeSwitcher .moon", {
          scale: 1,
          rotate: "0deg",
          opacity: 1,
        });
      gsap.to(".dark-Wide-bg", {
        delay: 1,

        backgroundColor: "#f4f4f5",
        background: "#f4f4f5",
        color: "#111",
      });
      gsap.to("body", {
        delay: 1,

        background: "#f4f4f5",
      });
      gsap.to(".dark-text", {
        delay: 1,

        color: "#111",
      });
      gsap.to(".dark-bg", {
        delay: 1,

        backgroundColor: "#fff",
        background: "#fff",
        color: "#111",
        onComplete: () => {
          setDarkTheme(!_currentTheme);
        },
      });
      gsap.to(".dark-light-bg", {
        delay: 1,

        backgroundColor: "#fff",
        background: "#fff",
        color: "#111",
      });
      gsap.to(".dark-fill-svg", {
        delay: 1,

        fill: "#111",
      });
      gsap.to(".dark-invert-img", {
        delay: 1,

        filter: "invert(0)",
      });

      //switch logo

      gsap
        .timeline()
        .to(".odinDarkLogo", {
          delay: 0.5,

          opacity: 0,
        })
        .to(".odinDarkLogo", {
          duration: 0,

          display: "none",
        })
        .to(".odinLightLogo", {
          duration: 0,

          display: "block",
        })
        .to(".odinLightLogo", {
          opacity: 1,
        });
    } else {
      gsap
        .timeline()

        .to(".darkModeSwitcher .moon", {
          scale: 0.5,
          rotate: "360deg",
          opacity: 0,
        })
        .to(".darkModeSwitcher .sun", {
          opacity: 1,
          scale: 1,
          rotate: "0deg",
        });
      gsap.to(".dark-Wide-bg", {
        delay: 1,
        backgroundColor: "#333",
        background: "#333",
        color: "#fff",
      });
      gsap.to("body", {
        delay: 1,

        background: "#333",
      });
      gsap.to(".dark-text", {
        delay: 1,

        color: "#fff",
      });
      gsap.to(".dark-bg", {
        delay: 1,

        backgroundColor: "#333",
        background: "#333",
        color: "#fff",
        onComplete: () => {
          setDarkTheme(!_currentTheme);
        },
      });
      gsap.to(".dark-light-bg", {
        delay: 1,

        backgroundColor: "#444",
        background: "#444",
        color: "#fff",
      });
      gsap.to(".dark-fill-svg", {
        delay: 1,

        fill: "#fff",
      });
      gsap.to(".dark-invert-img", {
        delay: 1,

        filter: "invert(1)",
      });

      //switch logo

      gsap
        .timeline()
        .to(".odinLightLogo", {
          delay: 1,

          opacity: 0,
        })
        .to(".odinLightLogo", {
          duration: 0,

          display: "none",
        })
        .to(".odinDarkLogo", {
          duration: 0,

          display: "block",
        })
        .to(".odinDarkLogo", {
          opacity: 1,
        });
    }
  };

  // console.log = console.warn = console.error = () => {};
  // end ________________________dark mode methods and state
  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }

    // start ________________________initialize translation

    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "Fr");

      _setLang("Fr");
    } else {
      console.log("mawjoud", localStorage.getItem("language"));
    }
    _setLang(localStorage.getItem("language"));

    // end ________________________initialize translation
  }, []);

  // Define a function to set authentication status
  const setAuthStatus = (status, token) => {
    setIsAuthenticated(status);

    if (status) {
      // If authenticated, store the token in localStorage
      localStorage.setItem("accessToken", token);
    } else {
      // If not authenticated, remove the token from localStorage
      localStorage.removeItem("accessToken");
    }
  };
  function RootRoutes() {
    return (
      <>
        <Routes>
          {/* Admin routes */}
          <Route exact path="/admin/album" element={<Album />} />
          <Route exact path="/admin/albumcamps" element={<Albumcamps />} />
          <Route exact path="/admin/albumevents" element={<Albumevents />} />
          <Route exact path="/admin/offreemploi" element={<AddOffreemploi />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/users/create" element={<CreateUser />} />
          <Route exact path="/admin/users/edit/:id" element={<EditUser />} />
          <Route exact path="admin/events" element={<EventA />} />
          <Route exact path="/admin/album" element={<Album />} />
          <Route exact path="/admin/albumcamps" element={<Albumcamps />} />
          <Route exact path="/admin/albumevents" element={<Albumevents />} />
          <Route exact path="/admin/offreemploi" element={<AddOffreemploi />} />
          <Route
            exact
            path="/admin/albumevents/create"
            element={<AddAlbumEvents />}
          />
          <Route exact path="/admin/album/create" element={<AddAlbum />} />
          <Route
            exact
            path="/admin/albumcamps/create"
            element={<AddAlbumcamps />}
          />
          <Route exact path="/admin/blog" element={<AdminBlog />} />
          <Route exact path="/admin/blog/create" element={<AddArticle />} />
          <Route
            exact
            path="/admin/blog/edit/:articleId"
            element={<EditBlog />}
          />
          <Route exact path="/admin/challenge" element={<AdminChallenges />} />
          <Route
            exact
            path="/admin/challenge/create"
            element={<AddChallenge />}
          />
          <Route
            exact
            path="/admin/challenge/update/:articleId"
            element={<EditBlog />}
          />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/users/create" element={<CreateUser />} />
          <Route exact path="/admin/users/edit/:id" element={<EditUser />} />
          <Route exact path="admin/events" element={<EventA />} />
        </Routes>
      </>
    );
  }

  return (
    <React.StrictMode>
      <Context.Provider
        value={{
          _currentLang: _currentLang,
          _setLang: _setLang,
          getTranslation: getTranslation,
          handleDarkModeToggler: handleDarkModeToggler,
          _currentTheme: _currentTheme,
        }}
      >
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route exact path="/" element={<Demo />} />
            <Route exact path="/Test" element={<Test />} />
            <Route
              exact
              path="/login"
              element={<Login setAuthStatus={setAuthStatus} />}
            />
            <Route exact path="/codeverification" element={<LoginCode />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/postview" element={<PostView />} />

            {/* start khedmet IHEB*/}

            <Route exact path="/homeBusiness" element={<HomeBusiness />} />
            {/* end khedmet IHEB*/}

            <Route exact path={"/login/:token"} element={<Loginreset />} />
            <Route exact path={"/api/auth/verify-email"} element={<Login />} />
            <Route exact path={"/forgot"} element={<Forgot />} />
            <Route exact path={`/password`} element={<Password />} />

            {/* Private Routes - Only accessible when authenticated */}

            <Route exact path="/gallery/view/:id" element={<ViewAlbum />} />

            {/* changement 02/02 */}
            <Route
              exact
              path="/odingallery/view/:id"
              element={<ViewAlbumodinuser />}
            />
            {/* <Route exact  path="/" element={<Demo />} /> */}

            <Route exact path={`/events`} element={<UserEvent />} />
            <Route exact path={`/bussinse`} element={<Bussinse />} />

            {/* 02/02 */}
            <Route exact path="/odin/album" element={<Galleryuser />} />
            <Route exact path="/admin/login" element={<AdminLogin />} />

            {isAuthenticated ? (
              <>
                <Route exact path="/home" element={<Homee />} />
                <Route
                  exact
                  path={`/defaultsettings`}
                  element={<Settings setAuthStatus={setAuthStatus} />}
                />
                <Route exact path={`/defaultbadge`} element={<Badge />} />
                <Route
                  exact
                  path={`/defaultgroupagent`}
                  element={<Badgeagent />}
                />
                <Route
                  exact
                  path={`/defaultgroup/:id`}
                  element={<GalleryDetailscamps />}
                />
                <Route
                  exact
                  path={`/defaultgroupevent/:id`}
                  element={<GalleryDetailsevent />}
                />
                <Route exact path={`/FormCamps/:id`} element={<FormCamps />} />
                <Route exact path={`/FormEvent/:id`} element={<FormEvent />} />
                <Route exact path={`/thanks/:id`} element={<Thankscamps />} />
                <Route
                  exact
                  path={`/thanksevent/:id`}
                  element={<Thanksodinevent />}
                />

                <Route exact path="/onepost/:idP" element={<OnePost />} />

                {/* <Route exact path={`/professionalprofile`} element={<Professionalprofile />} /> */}

                <Route exact path="/gallery" element={<Gallery />} />
                <Route exact path={`/defaultgroup`} element={<Galleryuser />} />
                <Route
                  exact
                  path={`/defaultgroupevents`}
                  element={<GalleryuserEvent />}
                />
                <Route exact path={`/defaultstorie`} element={<Storie />} />
                <Route exact path={`/defaultemailbox`} element={<Email />} />
                <Route
                  exact
                  path={`/defaultemailopen`}
                  element={<Emailopen />}
                />
                <Route exact path={`/defaultvideo`} element={<Videos />} />
                {/* <Route exact path="/edit/:articleId" element={<EditPage />} /> */}

                {/* nader */}
                <Route
                  exact
                  path="/setting/:tab?"
                  element={<ProfileSetting />}
                />

                <Route exact path="/404" element={<Error />} />
                {/* Profile routes */}
                <Route exact path="/searchpage" element={<Searchpage />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route
                  exact
                  path="/profile/more/:id"
                  element={<MoreProfile />}
                />
                <Route exact path={`/friends`} element={<FriendRequest />} />
                <Route exact path={`/friendsList`} element={<FriendList />} />
                {/* blog routes */}

                <Route exact path="/blog" element={<Blog />} />
                <Route
                  exact
                  path="/blog/:articleId"
                  element={<SingleArticle />}
                />

                <Route
                  exact
                  path="/offre_emploi/:id"
                  element={<OffreEmploi />}
                />
                <Route exact path="/entreprise" element={<Entrpriseemploi />} />
                <Route exact path="/homeoffre" element={<Homeoffre />} />

                <Route exact path="/challenges" element={<Challenges />} />
                <Route
                  exact
                  path="/challenges/details/:challengeId"
                  element={<ChallengeDetais />}
                />

                <Route
                  exact
                  path="/editPost/:articleId"
                  element={<EditPost />}
                />
                <Route
                  exact
                  path={`/defaultanalytics`}
                  element={<Analytics />}
                />

                <Route
                  exact
                  path={"/accountinformation"}
                  element={<Account />}
                />
                <Route exact path={`/defaultmember`} element={<Member />} />
                <Route
                  exact
                  path="/contactinformation"
                  element={<Contactinfo />}
                />
                <Route
                  exact
                  path={`/socialaccount`}
                  element={<Socialaccount />}
                />
                <Route exact path={`/payment`} element={<Payment />} />
                <Route exact path={`/defaultnoti`} element={<Notification />} />
                <Route exact path={`/helpbox`} element={<Helpbox />} />
                {/* <Route exact
          path={"/login"}
          element={<Login setAuthStatus={setAuthStatus} />}
        /> */}

                <Route exact path={`/notfound`} element={<Notfound />} />

                <Route exact path={`/shop1`} element={<ShopOne />} />
                <Route exact path={`/shop2`} element={<ShopTwo />} />
                <Route exact path={`/shop3`} element={<ShopThree />} />
                <Route
                  exact
                  path={`/singleproduct`}
                  element={<Singleproduct />}
                />
                <Route exact path={`/cart`} element={<Cart />} />
                <Route exact path={`/checkout`} element={<Checkout />} />
                <Route exact path={`/defaultmessage`} element={<Chat />} />
                <Route exact path={`/defaultlive`} element={<Live />} />

                <Route exact path={`/defaultjob`} element={<Job />} />
                <Route exact path={`/defaultevent`} element={<Event />} />
                <Route exact path={`/defaulthotel`} element={<Hotel />} />
                <Route exact path={`/grouppage`} element={<Grouppage />} />
                <Route exact path="/userpage" element={<Userpage />} />
                <Route
                  exact
                  path="PlayerInfo/:iduser"
                  element={<Userpageee />}
                />
                <Route exact path={`/authorpage`} element={<Authorpage />} />
                <Route exact path={`/comingsoon`} element={<Comingsoon />} />
                <Route
                  exact
                  path={`/defaulthoteldetails`}
                  element={<Hotelsingle />}
                />
              </>
            ) : (
              <Route exact path="*" element={<Navigate to="/home" replace />} />
            )}
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </React.StrictMode>
  );
}

const root = createRoot(rootElement);
root.render(<Root />);
serviceWorker.register();
