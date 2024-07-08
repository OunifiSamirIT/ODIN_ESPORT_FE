import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Context } from "../../index";

const SkeletonArticleCard = () => {
  const { _currentLang, _setLang, getTranslation, dark_light_bg, dark_fill_svg, dark_img, dark_bg, dark_border, dark_gray_color, dark_gray_svg, _currentTheme } = React.useContext(Context);

  return (
    <div style={dark_light_bg} className="card ml-0  w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <Skeleton circle width={40} height={40} duration={0.5} />
        </figure>
        <div className="flex-grow-1">
          <h4 className="fw-700 text-gray-200 font-xssss mt-1">
            <Skeleton width={100} duration={0.5} />
          </h4>
          <p className="text-gray-200 font-xssss mb-2">
          {/* <SkeletonTheme baseColor={_currentTheme ? "#ddd" : "#444"} highlightColor={_currentTheme ? "#f1f1f1" : "#888"} >  */}
                <p>
                <Skeleton width={80} duration={0.5} />
                </p>
         {/* </SkeletonTheme> */}
          </p>
        </div>
      </div>

      <div className="card-body d-block p-0 mb-3">
        <div className="row ps-2 pe-2">
          <div className="col-sm-12 p-1">
            <div className="card-body position-relative h200 bg-image-cover bg-image-center cover">
              <Skeleton height={200} duration={0.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 font-thin lh-26 md:ml-8 ml-0 rounded-md font-xssss w-100 mb-2 text-gray-200 theme-dark-bg">
          <Skeleton count={2} duration={0.5} />
        </p>
      </div>
    </div>
  );
};

export default SkeletonArticleCard;
