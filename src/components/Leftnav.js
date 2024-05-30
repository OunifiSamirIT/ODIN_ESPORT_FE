import React, { Component } from "react";
import { Link } from "react-router-dom";

function Leftnav() {
  return (
    <div className="navigation scroll-bar bg-zinc-100">
      <div className="container ps-0 pe-0 ">
        <div className="nav-content ">
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-6">
            <ul className="mb-1 top-content">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <Link to="/userpage" className="nav-content-bttn open-font">
                  <i className="feather-user btn-round-md bg-primary-gradiant me-3"></i>
                  <span>Mon Profile </span>
                </Link>
              </li>

              <li>
                <Link to="/home" className="nav-content-bttn open-font">
                  <i className="feather-tv btn-round-md bg-blue-gradiant me-3"></i>
                  <span>Acceuil</span>
                </Link>
              </li>
              <li>
                <Link to="/defaultbadge" className="nav-content-bttn open-font">
                  <i className="feather-award btn-round-md bg-red-gradiant me-3"></i>
                  <span>Badges</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/defaultstorie"
                  className="nav-content-bttn open-font"
                >
                  <i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i>
                  <span>Explore Stories</span>
                </Link>
              </li>
              <li>
                <Link to="/defaultgroup" className="nav-content-bttn open-font">
                  <i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i>
                  <span>Popular Groups</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftnav;
