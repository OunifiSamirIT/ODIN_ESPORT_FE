import React, { useState, useEffect } from "react";

import AdminHeader from "./Components/AdminHeader";
import Appfooter from "../../components/Appfooter";
import Popupchat from "../../components/Popupchat";
import Pagetitle from "../../components/Pagetitle";
import { Link } from "react-router-dom";
import { Config } from "../../config";
const Event = () => {
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [article, setArticle] = useState([]);
  const fetchBlogArticles = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/blog`);
    const result = await response.json();
    setArticle(result.blog);
  };
  const handleDeleteBlog = async (id) => {
    const response = await fetch(`${Config.LOCAL_URL}/api/blog/delete/${id}`, {
      method: "DELETE",
    });
    fetchBlogArticles();
  };

  useEffect(() => {
    fetchBlogArticles();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <a
                  href="/admin/blog/create"
                  className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 mb-4 text-uppercase rounded-3 ls-2 bg-info d-inline-block text-white me-1"
                >
                  Create New article
                </a>
              </div>
              <div className="row">
                <Pagetitle title="Blog" />
              </div>
              <div className="row">
                <div class="overflow-x-auto">
                  <table class="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead class="align-bottom">
                      <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                        <th class="pb-3 text-start min-w-[175px]">Title</th>
                        <th class="pb-3 text-start min-w-[100px]">Writer</th>
                        <th class="pb-3 pr-12 text-start min-w-[175px]">
                          STATUS
                        </th>
                        <th class="pb-3 pr-12 text-start min-w-[100px]">
                          DEADLINE
                        </th>
                        <th class="pb-3 text-start min-w-[50px]">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {article.map((item) => {
                        return (
                          <tr
                            key={item.id}
                            class="border-b border-dashed last:border-b-0"
                          >
                            <td class="p-3 pl-0">
                              <div class="flex items-center">
                                <div class="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img
                                    src={item.imageUrl}
                                    class="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                    alt=""
                                  />
                                </div>
                                <div class="flex flex-col justify-start">
                                  <a
                                    href="javascript:void(0)"
                                    class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    {" "}
                                    {item.title}{" "}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td class="p-3 pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                Admin
                              </span>
                            </td>
                            <td class="p-3 pr-12 text-start">
                              <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {" "}
                                {item.status === 1
                                  ? "pending "
                                  : "published"}{" "}
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                {item.createdAt}
                              </span>
                            </td>
                            <td class="pr-0 text-start relative">
                              <div className="absolute size-20 top-10">
                                <ul className="flex flex-col gap-y-4 ">
                                  <Link to={`/admin/blog/edit/${item.id}`}>
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => handleDeleteBlog(item.id)}
                                  >
                                    Delete
                                  </button>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
