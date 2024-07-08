import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import ChallengeSideBar from "./ChallengeSideBar";
import EventSideBar from "./EventSideBar";

export default function LeftMenu({
  id,
  classothercomponent,
  shouldShowAgentItem,
  shouldShowForProfile,
  setEventTogglerIsOpenned,
  eventTogglerIsOpenned,
  userProfileType,
  user,
  style
}) {
  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img } = React.useContext(Context);

  return (
    <>
      <div
        style={style}
        className={` ${
          classothercomponent ? "mt-6" : ""
        } xs:hidden sm:hidden hidden  md:flex md:flex-col  md:min-w-[25%] md:-ml-2 md:mr-3 max-md:ml-0 max-md:w-full`}
      >
        <div className=" fixed xs:hidden sm:hidden hidden max-h-[82vh] hiddenScrollLeftMenu overflow-y-scroll overflow-x-hidden md:flex md:flex-col md:max-w-[22%] max-md:ml-0 max-md:w-full ">
          <div className="flex flex-col max-w-full mr-4">
           <ChallengeSideBar/>
           <EventSideBar/>
          </div>
        </div>
      </div>
    </>
  );
}
