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
        <Route path="/" element={<Demo />} />
        <Route
          path="/login"
          element={<Login setAuthStatus={setAuthStatus} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path={"/login/:token"} element={<Loginreset />} />
        <Route path={"/api/auth/verify-email"} element={<Loginemail />} />
        <Route path={"/forgot"} element={<Forgot />} />
        <Route path={`/password`} element={<Password />} />
        
        {/* Private Routes - Only accessible when authenticated */}


                    <Route  path="/admin" element={<AdminHome />} />
                    <Route  path="/admin/users" element={<Users />} />
                    <Route  path="/admin/users/create" element={<CreateUser />} />
                    <Route  path="/admin/users/edit/:id" element={<EditUser />} />
                    <Route  path="admin/events" element={<EventA />} />
                    <Route  path="/gallery/view/:id" element={<ViewAlbum />} />
                    {/* <Route  path="/" element={<Demo />} /> */}

                    <Route  path={`/events`} element={<UserEvent/>}/>
                    
                    <Route  path="/admin/album" element={<Album/>}/>
                    <Route  path="/admin/events/create" element={<AddEvent/>}/>
                    <Route  path="/admin/album/create" element={<AddAlbum/>}/>









        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Homee />} />
            <Route path={`/defaultsettings`} element={<Settings setAuthStatus={setAuthStatus}/>} />
            <Route path={`/defaultbadge`} element={<Badge />} />
            <Route path="/gallery" element={<Gallery />} />
        <Route path={`/defaultgroup`} element={<Group />} />
        <Route path={`/defaultstorie`} element={<Storie />} />
        <Route path={`/defaultemailbox`} element={<Email />} />
        <Route path={`/defaultemailopen`} element={<Emailopen />} />
        <Route path={`/defaultvideo`} element={<Videos />} />
        {/* <Route path="/edit/:articleId" element={<EditPage />} /> */}

        <Route path="/editPost/:articleId" element={<EditPost />} />
        <Route path={`/defaultanalytics`} element={<Analytics />} />

        <Route path={"/accountinformation"} element={<Account />} />
        <Route path={`/defaultmember`} element={<Member />} />
        <Route path="/contactinformation" element={<Contactinfo />} />
        <Route path={`/socialaccount`} element={<Socialaccount />} />
        <Route path={`/payment`} element={<Payment />} />
        <Route path={`/defaultnoti`} element={<Notification />} />
        <Route path={`/helpbox`} element={<Helpbox />} />
        {/* <Route
          path={"/login"}
          element={<Login setAuthStatus={setAuthStatus} />}
        /> */}
       
        <Route path={`/notfound`} element={<Notfound />} />

        <Route path={`/shop1`} element={<ShopOne />} />
        <Route path={`/shop2`} element={<ShopTwo />} />
        <Route path={`/shop3`} element={<ShopThree />} />
        <Route path={`/singleproduct`} element={<Singleproduct />} />
        <Route path={`/cart`} element={<Cart />} />
        <Route path={`/checkout`} element={<Checkout />} />
        <Route path={`/defaultmessage`} element={<Chat />} />
        <Route path={`/defaultlive`} element={<Live />} />

        <Route path={`/defaultjob`} element={<Job />} />
        <Route path={`/defaultevent`} element={<Event />} />
        <Route path={`/defaulthotel`} element={<Hotel />} />
        <Route path={`/grouppage`} element={<Grouppage />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path={`/authorpage`} element={<Authorpage />} />
        <Route path={`/comingsoon`} element={<Comingsoon />} />
        <Route path={`/defaulthoteldetails`} element={<Hotelsingle />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/home" replace />} />
        )}
       
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(rootElement);
root.render(<Root />);
serviceWorker.register();
