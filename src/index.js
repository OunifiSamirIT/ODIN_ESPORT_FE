import React, { element, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client

import "./main.scss";

import Demo from "./demo/Demo";

import Home from "./pages/Home";
import Homee from "./pages/Home copy";

import Badge from "./pages/Badge";
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

import Grouppage from "./pages/Grouppage";
import Userpage from "./pages/Userpage";
import Authorpage from "./pages/Authorpage";
import Hotelsingle from "./pages/Hotelsingle";
import Analytics from "./pages/Analytics";
import EditPage from "./pages/EditPageArticle";





import AdminHome from './pages/Admin/Home';
import Users from './pages/Admin/Users';
import EventA from './pages/Admin/Event';
import Album from './pages/Admin/Gallerie'
import AddEvent from './pages/Admin/Components/AddEvent'
import AddAlbum from './pages/Admin/Components/AddAlbum'
import EditUser from './pages/Admin/Components/EditUser'
import CreateUser from './pages/Admin/Components/CreateUser'

import UserEvent from './pages/UserEvent';
import ViewAlbum from './pages/Admin/Components/ViewAlbum';



import { BrowserRouter, Switch, Route, Navigate } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Routes } from "react-router-dom/dist";
const rootElement = document.getElementById("root");

function Root() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route exact path="/" element={<Demo />} />
        <Route exact
          path="/login"
          element={<Login setAuthStatus={setAuthStatus} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path={"/login/:token"} element={<Loginreset />} />
        <Route exact path={"/api/auth/verify-email"} element={<Loginemail />} />
        <Route exact path={"/forgot"} element={<Forgot />} />
        <Route exact path={`/password`} element={<Password />} />
        
        {/* Private Routes - Only accessible when authenticated */}


                    <Route exact  path="/admin" element={<AdminHome />} />
                    <Route exact  path="/admin/users" element={<Users />} />
                    <Route exact  path="/admin/users/create" element={<CreateUser />} />
                    <Route exact  path="/admin/users/edit/:id" element={<EditUser />} />
                    <Route exact  path="admin/events" element={<EventA />} />
                    <Route exact  path="/gallery/view/:id" element={<ViewAlbum />} />
                    {/* <Route exact  path="/" element={<Demo />} /> */}

                    <Route exact  path={`/events`} element={<UserEvent/>}/>
                    
                    <Route exact  path="/admin/album" element={<Album/>}/>
                    <Route exact  path="/admin/events/create" element={<AddEvent/>}/>
                    <Route exact  path="/admin/album/create" element={<AddAlbum/>}/>









        {isAuthenticated ? (
          <>
            <Route exact path="/home" element={<Homee />} />
            <Route exact path={`/defaultsettings`} element={<Settings setAuthStatus={setAuthStatus}/>} />
            <Route exact path={`/defaultbadge`} element={<Badge />} />
            <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path={`/defaultgroup`} element={<Group />} />
        <Route exact path={`/defaultstorie`} element={<Storie />} />
        <Route exact path={`/defaultemailbox`} element={<Email />} />
        <Route exact path={`/defaultemailopen`} element={<Emailopen />} />
        <Route exact path={`/defaultvideo`} element={<Videos />} />
        {/* <Route exact path="/edit/:articleId" element={<EditPage />} /> */}

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
        <Route exact path={`/authorpage`} element={<Authorpage />} />
        <Route exact path={`/comingsoon`} element={<Comingsoon />} />
        <Route exact path={`/defaulthoteldetails`} element={<Hotelsingle />} />
          </>
        ) : (
          <Route exact path="*" element={<Navigate to="/home" replace />} />
        )}
       
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(rootElement);
root.render(<Root />);
serviceWorker.register();
