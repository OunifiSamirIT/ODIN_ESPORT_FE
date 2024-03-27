import React, { element, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client

import "./main.scss";



import Profile from './pages/Profile/Index'
import FriendRequest from './pages/Profile/FriendRequest'
import FriendList from './pages/Profile/FriendList'
import MoreProfile from './pages/Profile/MoreProfile'
import Information from "./pages/informationProfile";
import Parametre from "./pages/Parametre"
import ProfilSocial from "./pages/ProfileSocial";
import Blog from "./pages/Blog/index"
import AdminBlog from "./pages/Admin/Blog"
import AddArticle from "./pages/Admin/Components/AddArticle"
import SingleArticle from "./pages/Blog/Article.jsx"
import EditBlog from "./pages/Admin/Components/editArticle.jsx"


import Demo from "./demo/Demo";

import Home from "./pages/Home";
import Homee from "./pages/Homecopy";

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
import Login from "./pages/Login";
import Loginreset from "./pages/Loginrestpassword";
import Loginemail from "./pages/Loginemail";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Notfound from "./pages/Notfound";
import Gallery from "./pages/Gallerie";
import Galleryuser from "./pages/Gallerieuserodin";

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

import ProfileSetting from "./pages/Setting/index"



import AdminHome from './pages/Admin/Home';
import Users from './pages/Admin/Users';
import EventA from './pages/Admin/Event';
import Album from './pages/Admin/Gallerie'
import Albumcamps from './pages/Admin/Galleriecamps'
import AddEvent from './pages/Admin/Components/AddEvent'
import AddAlbum from './pages/Admin/Components/AddAlbum'
import AddAlbumcamps from './pages/Admin/Components/AddAlbumCamps'
import EditUser from './pages/Admin/Components/EditUser'
import CreateUser from './pages/Admin/Components/CreateUser'

import UserEvent from './pages/UserEvent';
import ViewAlbum from './pages/Admin/Components/ViewAlbum';
import ViewAlbumodinuser from './pages/ViewAlbumOdin';
import Error from './pages/404';


import { BrowserRouter, Switch, Route, Navigate } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Routes } from "react-router-dom/dist";
import { BsTruckFlatbed } from "react-icons/bs";
const rootElement = document.getElementById("root");

function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Define a function to set authentication status
  const setAuthStatus = (status, token) => {
    setIsAuthenticated(status);

    if (status) {
      // If authenticated, store the token in localStorage
      localStorage.setItem('accessToken', token);
    } else {
      // If not authenticated, remove the token from localStorage
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <React.StrictMode>
      <BrowserRouter basename={"/"}>
        <Routes>
          <Route exact path="/" element={<Demo />} />
          <Route exact path="/Test" element={<Test />} />
          <Route exact
            path="/login"
            element={<Login setAuthStatus={setAuthStatus} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/postview" element={<PostView />} />




          <Route exact path={"/login/:token"} element={<Loginreset />} />
          <Route exact path={"/api/auth/verify-email"} element={<Login />} />
          <Route exact path={"/forgot"} element={<Forgot />} />
          <Route exact path={`/password`} element={<Password />} />

          {/* Private Routes - Only accessible when authenticated */}


          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/users/create" element={<CreateUser />} />
          <Route exact path="/admin/users/edit/:id" element={<EditUser />} />
          <Route exact path="admin/events" element={<EventA />} />
          <Route exact path="/gallery/view/:id" element={<ViewAlbum />} />

          {/* changement 02/02 */}
          <Route exact path="/odingallery/view/:id" element={<ViewAlbumodinuser />} />
          {/* <Route exact  path="/" element={<Demo />} /> */}

          <Route exact path={`/events`} element={<UserEvent />} />

          <Route exact path="/admin/album" element={<Album />} />
          <Route exact path="/admin/albumcamps" element={<Albumcamps />} />

          {/* 02/02 */}
          <Route exact path="/odin/album" element={<Galleryuser />} />
          <Route exact path="/admin/events/create" element={<AddEvent />} />
          <Route exact path="/admin/album/create" element={<AddAlbum />} />
          <Route exact path="/admin/albumcamps/create" element={<AddAlbumcamps />} />
          <Route exact path="/admin/blog" element={<AdminBlog />} />
          <Route exact path="/admin/blog/create" element={<AddArticle />} />
          <Route exact path="/admin/blog/edit/:articleId" element={<EditBlog />} />






          {isAuthenticated ? (
            <>
              <Route exact path="/home" element={<Homee />} />
              <Route exact path={`/defaultsettings`} element={<Settings setAuthStatus={setAuthStatus} />} />
              <Route exact path={`/defaultbadge`} element={<Badge />} />
              <Route exact path={`/defaultgroupagent`} element={<Badgeagent />} />
              <Route exact path="/gallery" element={<Gallery />} />
              <Route exact path={`/defaultgroup`} element={<Galleryuser />} />
              <Route exact path={`/defaultstorie`} element={<Storie />} />
              <Route exact path={`/defaultemailbox`} element={<Email />} />
              <Route exact path={`/defaultemailopen`} element={<Emailopen />} />
              <Route exact path={`/defaultvideo`} element={<Videos />} />
              {/* <Route exact path="/edit/:articleId" element={<EditPage />} /> */}

              {/* nader */}
              <Route exact path="/setting/:tab?" element={<ProfileSetting />} />



              <Route exact path="/404" element={<Error />} />
              {/* Profile routes */}

              <Route exact path="/profile/:id" element={<Profile />} />
              <Route exact path="/profile/more/:id" element={<MoreProfile />} />
              <Route exact path={`/friends`} element={<FriendRequest />} />
              <Route exact path={`/friendsList`} element={<FriendList />} />
              {/* blog routes */}

              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/blog/:articleId" element={<SingleArticle />} />









              <Route exact path="/editPost/:articleId" element={<EditPost />} />
              <Route exact path={`/defaultanalytics`} element={<Analytics />} />

              <Route exact path={"/accountinformation"} element={<Account />} />
              <Route exact path={`/defaultmember`} element={<Member />} />
              <Route exact path="/contactinformation" element={<Contactinfo />} />
              <Route exact path={`/socialaccount`} element={<Socialaccount />} />
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
              <Route exact path={`/singleproduct`} element={<Singleproduct />} />
              <Route exact path={`/cart`} element={<Cart />} />
              <Route exact path={`/checkout`} element={<Checkout />} />
              <Route exact path={`/defaultmessage`} element={<Chat />} />
              <Route exact path={`/defaultlive`} element={<Live />} />

              <Route exact path={`/defaultjob`} element={<Job />} />
              <Route exact path={`/defaultevent`} element={<Event />} />
              <Route exact path={`/defaulthotel`} element={<Hotel />} />
              <Route exact path={`/grouppage`} element={<Grouppage />} />
              <Route exact path="/userpage" element={<Userpage />} />
              <Route exact path="PlayerInfo/:iduser" element={<Userpageee />} />
              <Route exact path={`/authorpage`} element={<Authorpage />} />
              <Route exact path={`/comingsoon`} element={<Comingsoon />} />
              <Route exact path={`/defaulthoteldetails`} element={<Hotelsingle />} />
            </>
          ) : (
            <Route exact path="*" element={<Navigate to="/home" replace />} />
          )}

        </Routes>
      </BrowserRouter>
    </React.StrictMode>

  );
}

const root = createRoot(rootElement);
root.render(<Root />);
serviceWorker.register();
