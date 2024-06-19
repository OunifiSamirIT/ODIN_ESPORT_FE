
import React, { useState, useEffect, useRef } from "react";
import image from "../../assets/Image.png";
import { Config } from "../../config";
import LanguageToggler from "../../fixDesignComponents/languageToggler";
import Logo from "../../assets/odin.png"
// // wehed
import { Context } from "../../index";
import { Link } from "react-router-dom";
import PdfModal from "../PdfModal";
import BlogLayout from "../../Layout/BlogLayout";
const Index = () => {
  const [article, setArticle] = useState([]);
  const rect1Ref = useRef(null);
  const rect2Ref = useRef(null);
  const rect3Ref = useRef(null);

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
  const [Hamburger, setHumberger] = useState(false);

  let [showModal, setShowModal] = useState(false);
  let [wichContent, setWichContent] = useState(1);

  const handleClickHamburger = () => {
    setHumberger(!Hamburger);
    // Start animation for rectangle 1
    if (Hamburger === true) {
      rect1Ref.current.classList.remove("animate-rect1");
      rect2Ref.current.classList.remove("animate-rect2");
      rect3Ref.current.classList.remove("animate-rect3");
    } else {
      rect1Ref.current.classList.add("animate-rect1");
      rect2Ref.current.classList.add("animate-rect2");
      rect3Ref.current.classList.add("animate-rect3");
    }
  };

  const fetchBlogArticles = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/blog`);
    const result = await response.json();

    setArticle(result.blog);
  };
  useEffect(() => {
    fetchBlogArticles();
  }, []);

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const contactUsRef = useRef();
  return (
    <BlogLayout>
      <div className=" flex-col items-center gap-y-2 mt-0  md:gap-y-12 w-full h-fit flex justify-center text-center">
        <div className="flex  relative flex-col items-center px-16 pt-20 mt-14 w-full max-w-[1184px] h-[600px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <img
            loading="lazy"
            src={image}
            alt="cover"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative z-10 flex-col p-10 mt-72 -mb-6 max-w-full bg-white rounded-[10px] border border-gray-200 border-solid shadow-lg w-[628px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
            <div className="flex gap-4 justify-between flex-wrap max-w-full">
              {article[0]?.tags.split(",").filter((a) => a !== '').map((e) => {
                return (
                  <div className="justify-center px-4 py-1 text-base font-medium text-white bg-blue-600 rounded-2xl">
                    {e}
                  </div>
                );
              })}
              <div className="my-auto text-sm text-blue-600">NEW ARTICLE</div>
            </div>
            <div className="mt-4 text-3xl font-bold text-zinc-900 max-md:max-w-full">
              {article[0]?.title}
            </div>
            <div className="flex gap-5 self-start mt-6 text-neutral-400">
              <div className="flex gap-3 text-base">
                <img
                  loading="lazy"
                  src={Logo}
                  className="shrink-0 w-9 aspect-square rounded-full"
                />
                <div className="my-auto">Admin</div>
              </div>
              <div className="my-auto text-xs font-light">
                {formatDate(article[0]?.createdAt)}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-between  w-full max-w-[1184px] max-md:max-w-full px-4">
          <div className="flex flex-col gap-y-5 text-3xl font-bold text-zinc-900 max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-start">Latest Articles</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-md:flex-col max-md:gap-0">
              {article.map((item) => {
                return (
                  <a href={`/blog/${item.id}`}>
                    <div className="flex col-span-1 flex-col justify-between h-full ">
                      <div className="relative flex flex-col  grow px-4 py-4 w-full bg-white rounded-[10px] border border-gray-200 border-solid">
                        <img
                          loading="lazy"
                          src={item?.imageUrl}
                          className="w-full aspect-[1.5]"
                        />
                        <div className="flex flex-col py-2 mt-4 text-left">
                          <div className="flex gap-4 items-center justify-between text-sm text-blue-600 max-md:mr-1">
                            <div className="flex flex-wrap gap-1 py-2 max-w-[155px]">
                              {item?.tags.split(",").filter((a) => a !== '').map((e) => {
                                return (
                                  <div className="justify-center items-center px-2 py-1 rounded-2xl bg-blue-600 bg-opacity-10">
                                    {e}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="py-2">NEW ARTICLE</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-2xl font-semibold text-zinc-900 mb-5">
                              {item.title}
                            </div>
                            <div className="absolute bottom-0 my-4 flex items-end gap-2 md:gap-5 text-neutral-400">
                              <div className="flex gap-3 text-xs">
                                <img
                                  loading="lazy"
                                  src={Logo}
                                  className="rounded-full shrink-0 w-9 aspect-square"
                                />
                                <div className="my-auto">Admin | odine </div>
                              </div>
                              <div className="my-auto text-xs font-light">
                                {formatDate(item.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};
export default Index;