import React, { useState, useEffect } from "react";
import image from '../../assets/Image.png'
import {Config} from '../../config'

const Index = () => {
    const [article, setArticle] = useState([])
    const fetchBlogArticles = async () => {
        const response = await fetch(`${Config.BASE_URL}/api/blog`)
        const result = await response.json()
        console.log(result.blog)
        setArticle(result.blog)
    }
    useEffect(() => {
        fetchBlogArticles()
        console.log(Config.BASE_URL)
    }, [])

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;

    }
    return (
        <div className="flex flex-col justify-center w-full bg-gray-200 max-h-fit">
            <div className="w-full flex justify-center bg-white shadow-sm">
                <div className="max-w-[1344px] flex gap-5 justify-between w-full  max-md:flex-wrap max-md:max-w-full">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a75ed34d5c19415cab78b345b0d5336760c4e7969ac95ce58c0988fa6ca72f6?"
                        className="shrink-0 my-auto w-36 max-w-full aspect-[2.78]"
                    />
                    <div className="flex gap-5 justify-center items-center py-4 max-md:flex-wrap">
                        <div className="self-stretch my-auto text-base font-medium text-zinc-900">
                            Contact
                        </div>
                        <div className="justify-center self-stretch px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px] max-md:px-5">
                            Sign Up
                        </div>
                        <div className="justify-center self-stretch px-8 py-2 text-base font-medium border-2 border-solid border-zinc-900 border-opacity-50 rounded-[30px] text-zinc-900 max-md:px-5">
                            Log In
                        </div>
                        <div className="flex gap-1 items-center self-stretch px-1 py-0.5 my-auto text-base font-medium whitespace-nowrap text-zinc-900">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2c4a63d30029455ac7463db8ddec033b20fbe12764ee2e85c2ce8db495dbd38?"
                                className="shrink-0 self-stretch my-auto aspect-square w-[15px]"
                            />
                            <div className="self-stretch">FR</div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/04ac61c32c73166c8b9f3152bb2bb21b87c4d0ee9441d92c84b5666c94e77ec4?"
                                className="shrink-0 self-stretch my-auto aspect-[1.89] fill-zinc-900 w-[15px]"
                            />
                        </div>
                        <div className="flex gap-4 justify-center self-stretch my-auto">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3351d138ecd362085903908891e6778efbf44224595854c1f8370410a5b6e36?"
                                className="shrink-0 aspect-square w-[25px]"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f6fbdc92bd752c095b3edc0fd0f189c5bdd37ffcd9ad2dadd50a77eb50c59c9?"
                                className="shrink-0 aspect-square w-[25px]"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/38f75e0064def8be48c51667f3094724720685e3d1e87de4bda8b43980ab29f2?"
                                className="shrink-0 aspect-square w-[25px]"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/474ee8d077d5f772e184a4d56f1c1f8579b86c33c8b7127e55ba939ae58a20bc?"
                                className="shrink-0 aspect-square w-[25px]"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4920bdfd459b25e1b8b46fc404ed67e3b6c913f64a1ac833125b83540b01c14d?"
                                className="shrink-0 aspect-square w-[25px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-32 w-full h-fit flex justify-center text-center">
                <div className="flex  relative flex-col items-center px-16 pt-20 mt-14 w-full max-w-[1184px] h-[600px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    <img
                        loading="lazy"
                        src={image}
                        className="object-cover absolute inset-0 size-full"
                    />
                    <div className="flex relative z-10 flex-col p-10 mt-72 -mb-6 max-w-full bg-white rounded-[10px] border border-gray-200 border-solid shadow-lg w-[628px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
                        <div className="flex gap-4 justify-between flex-wrap max-w-full">

                            {article[0]?.tags.split(',').map((e) => {
                                return (<div className="justify-center px-4 py-1 text-base font-medium text-white bg-blue-600 rounded-2xl">
                                    {e}
                                </div>)
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
                                    src={article[0]?.imageUrl}
                                    className="shrink-0 w-9 aspect-square rounded-full"
                                />
                                <div className="my-auto">Admin</div>
                            </div>
                            <div className="my-auto text-xs font-light">{formatDate(article[0]?.createdAt)}</div>
                        </div>
                    </div>
                </div>
                <div className="justify-between w-full max-w-[1184px] max-md:max-w-full px-4">
                    <div className="flex flex-col gap-y-8 text-3xl font-bold text-zinc-900 max-md:mt-10 max-md:max-w-full">
                        <div className="flex justify-start">Latest Articles</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-md:flex-col max-md:gap-0">
                            {article.map((item) => {
                                return (
                                    <a href={`/blog/${item.id}`}>
                                        <div className="flex col-span-1 flex-col justify-between h-full ">
                                            <div className="relative flex flex-col grow px-4 py-4 w-full bg-white rounded-[10px] border border-gray-200 border-solid">
                                                <img
                                                    loading="lazy"
                                                    src={item?.imageUrl}
                                                    className="w-full aspect-[1.5]"
                                                />
                                                <div className="flex flex-col py-2 mt-4 text-left">
                                                    <div className="flex gap-4 items-center justify-between text-sm text-blue-600 max-md:mr-1">
                                                        <div className="flex flex-wrap gap-1 py-2 max-w-[155px]">
                                                            {item?.tags.split(',').map((e) => {
                                                                return (<div className="justify-center items-center px-2 py-1 rounded-2xl bg-blue-600 bg-opacity-10">
                                                                    {e}
                                                                </div>)
                                                            })}
                                                        </div>
                                                        <div className="py-2">NEW ARTICLE</div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-2xl font-semibold text-zinc-900 mb-5">
                                                            {item.title}
                                                        </div>
                                                        <div className="absolute bottom-0 my-4 flex items-end gap-5 text-neutral-400">
                                                            <div className="flex gap-3 text-base">
                                                                <img
                                                                    loading="lazy"
                                                                    src={item.imageUrl}
                                                                    className="rounded-full shrink-0 w-9 aspect-square"
                                                                />
                                                                <div className="my-auto">Admin | odine </div>
                                                            </div>
                                                            <div className="my-auto text-xs font-light">{formatDate(item.createdAt)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-8 justify-center items-center self-stretch px-16 py-6 w-full bg-blue-600 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                    <div className="flex gap-5 justify-between py-2 w-full max-md:flex-wrap max-md:max-w-full">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d9a5157737e60ab06daba1a7dd1777fe2730f176a2e03e7da55c1b8e0683609?"
                            className="shrink-0 my-auto w-36 max-w-full aspect-[2.78]"
                        />
                        <div className="flex gap-5 justify-center items-center py-4 max-md:flex-wrap">
                            <div className="self-stretch my-auto text-base font-medium text-white">
                                Contact
                            </div>
                            <div className="self-stretch my-auto text-base font-medium text-white">
                                Blog
                            </div>
                            <div className="justify-center self-stretch px-8 py-2 text-base font-medium text-blue-600 bg-white rounded-[30px] max-md:px-5">
                                Sign Up
                            </div>
                            <div className="justify-center self-stretch px-8 py-2 text-base font-medium text-white border-2 border-white border-solid rounded-[30px] max-md:px-5">
                                Log In
                            </div>
                            <div className="flex gap-1 items-center self-stretch px-1 py-0.5 my-auto text-base font-medium text-white whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02fcaf74568ed6cae17a4cfea06fe3a743e2638ff68a32034bcc388457a56a8?"
                                    className="shrink-0 self-stretch my-auto aspect-square w-[15px]"
                                />
                                <div className="self-stretch">FR</div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b14a756e6f1b65f22854328381a428fbb0c36693ecead144e76135aaa22f6c84?"
                                    className="shrink-0 self-stretch my-auto aspect-[1.89] fill-white w-[15px]"
                                />
                            </div>
                            <div className="flex gap-4 justify-center self-stretch my-auto">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7b70aacc8389036f7a0f030228a7cca93292b91bccd6e6f1e7c9f2dc0445e8a?"
                                    className="shrink-0 aspect-square w-[25px]"
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/69c2999828553289a852c163dcf2dcb73a5a9b0cde905c1600e4d640e10df9ea?"
                                    className="shrink-0 aspect-square w-[25px]"
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/086ca203c0c49861414fd7751bca85fddfa84895e8932788855b274c017ad8e8?"
                                    className="shrink-0 aspect-square w-[25px]"
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3efc58d7512b4b6168ed6951e8eed4914e14ee066db5f5a082bbffc12f1e277d?"
                                    className="shrink-0 aspect-square w-[25px]"
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c0d535dec073828d67e962fdb5e4a0fc42321ebba0f6a0df002daa3c4fb9e3f?"
                                    className="shrink-0 aspect-square w-[25px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-between py-2 mt-6 max-md:flex-wrap max-md:max-w-full">
                        <div className="my-auto text-xs font-light text-white">
                            All Rights Reserved © 2024 Odin Esport
                        </div>
                        <div className="text-base font-medium text-white underline">
                            Privacy Policy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index
