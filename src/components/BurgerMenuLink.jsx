import React, { Children } from "react";
import { Link } from "react-router-dom";

const BurgerMenuLink = ({ Href, Title, children }) => {
  return (
    <>
      <div className="flex gap-4 px-6 py-3 items-center w-full text-base whitespace-nowrap bg-white rounded-[10px] max-w-[366px] text-zinc-900">
        {children}
        <Link to={Href} className="flex-auto">
          {Title}
        </Link>
      </div>
    </>
  );
};

export default BurgerMenuLink;
