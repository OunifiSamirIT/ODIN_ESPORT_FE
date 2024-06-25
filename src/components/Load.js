import React, { Component } from "react";
import { Context } from "../index";

function Load(){

  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg, dark_border, dark_gray_color, dark_gray_svg, _currentTheme } = React.useContext(Context);

    return (
      <div style={dark_light_bg}  className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
        <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
          <div className="stage">
            <div   className="dot-typing"></div>
          </div>
        </div>
      </div>
    );
}

export default Load;
