import React, { Component, Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar"
import Header from "../components/Header";
import "flag-icon-css/css/flag-icons.min.css";
import "react-datepicker/dist/react-datepicker.css";
import UserImage from "../assets/User Menu.png"


const Social = () => {

    return (
        <>
            <Header />
            <div className="flex flex-col pb-10 bg-gray-200">
                <div className="self-center mt-6 w-full max-w-[1344px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                        <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col text-base font-medium max-md:mt-6">
                                <div className="flex gap-2 justify-between px-20 py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px] max-md:px-5">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/02282bb1f0c32b671d51f2531113e64ee168087841382b334f851cb3179c7886?"
                                        className="my-auto aspect-square w-[15px]"
                                    />
                                    <div className="grow">Revenir au Profil</div>
                                </div>
                                <span className="hidden md:flex">
                                    <ProfileSideBar />
                                </span>

                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col px-8 py-9 text-lg bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:max-w-full">
                                <div className="grid gap-16 grid-cols-1 md:grid-cols-2">
                                    <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                                        <div className="flex gap-4 justify-between px-4 text-lg">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/610ff97783601126cf82626b726a5214ac720356e2a6880017639eddd02926fb?"
                                                className="aspect-square w-[25px]"
                                            />
                                            <div className="grow">Facebook</div>
                                        </div>
                                        <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                                            www.facebook.com/joeyleblanc
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                                        <div className="flex gap-4 justify-between px-4 text-lg">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/610ff97783601126cf82626b726a5214ac720356e2a6880017639eddd02926fb?"
                                                className="aspect-square w-[25px]"
                                            />
                                            <div className="grow">Facebook</div>
                                        </div>
                                        <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                                            www.facebook.com/joeyleblanc
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                                        <div className="flex gap-4 justify-between px-4 text-lg">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcef9f58670f22c90a13162086a1adaccd2a9caa430692a705a3c8de859baf70?"
                                                className="aspect-square w-[25px]"
                                            />
                                            <div className="grow">Instagram</div>
                                        </div>
                                        <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                                            www.instagram.com/joeyleblanc
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                                        <div className="flex gap-4 justify-between px-4 text-lg">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcef9f58670f22c90a13162086a1adaccd2a9caa430692a705a3c8de859baf70?"
                                                className="aspect-square w-[25px]"
                                            />
                                            <div className="grow">Instagram</div>
                                        </div>
                                        <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                                            www.instagram.com/joeyleblanc
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                                        <div className="flex gap-4 justify-between px-4 text-lg">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcef9f58670f22c90a13162086a1adaccd2a9caa430692a705a3c8de859baf70?"
                                                className="aspect-square w-[25px]"
                                            />
                                            <div className="grow">Instagram</div>
                                        </div>
                                        <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5">
                                            www.instagram.com/joeyleblanc
                                        </div>
                                    </div>

                                </div>
                                <div className="flex gap-5 justify-between py-2 mt-6 mr-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
                                    <div className="flex gap-2 justify-between px-8 py-2 text-blue-600 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e237a106a6aae9aaedb87131a5b6a9cefc6631b6b0b800569f8639d3cbb6941?"
                                            className="w-5 aspect-square"
                                        />
                                        <div className="grow">Annuler</div>
                                    </div>
                                    <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                                            className="w-5 aspect-square"
                                        />
                                        <button type="submit" className="grow">Confirmer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Social;
