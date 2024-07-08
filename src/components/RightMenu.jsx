import React from "react";
import Friends from "../components/Friends";
import Events from "../components/Events";
import Friendsilder from "../components/Friendsilder";

export default function RightMenu() {
  return (
    <div className="flex flex-col md:pr-2 w-full  md:w-3/12 max-md:ml-0 md:max-w-[23%]">
      <div className=" flex  md:fixed  flex-col w-full  md:w-3/12 max-md:ml-0 md:max-w-[325px]">
        <div className="flex min-h-fit md:max-h-[82vh] rounded-lg pr-2  hiddenScrollRightMenu overflow-y-scroll overflow-x-hidden  flex-col grow max-md:mt-6">
          <Friends />
          {/* <Group /> */}
          <Events />
          <Friendsilder />
        </div>
      </div>

      <div className="flex flex-col grow max-md:mt-6"></div>
    </div>
  );
}
