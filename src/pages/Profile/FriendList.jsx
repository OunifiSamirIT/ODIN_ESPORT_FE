import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import Placeholder from '../../assets/placeholder.jpg';
import {Link} from 'react-router-dom'
const FriendList = () => {

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [FriendRequest, setFriendRequest] = useState([])
    const fetchFriendRequest = async () => {
        const response = await fetch(`http://localhost:5000/api/user/${storedUserData.id}/getFriends`);
        const result = await response.json()
        setFriendRequest(result)
    }
    const deleteInviation = async (id) => {
        console.log(`http://localhost:5000/api/user/${id}/delete/${storedUserData.id}`)
        const response = await fetch(`http://localhost:5000/api/user/${storedUserData.id}/delete/${id}`, {
            method: "DELETE",
        });
        if(response.status === 200)
        {window.location.reload()}
    }
    const acceptInvitation = async (id) => {
        console.log(`http://localhost:5000/api/user/${id}/acceptFriend/${storedUserData.id}`)
        const response = await fetch(`http://localhost:5000/api/user/${storedUserData.id}/acceptFriend/${id}`, {
            method: "PUT",
        });
        if(response.status === 200)
        {window.location.reload()}
    }
    useEffect(() => {
        fetchFriendRequest()
    }, [])





    return (<HomeLayout>
        <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="hidden md:col-span-3 md:block">
                <div className="flex flex-col gap-y-4 justify-start py-4 mx-auto w-full bg-white rounded-[10px] px-4">
                    <div className="flex items-center gap-4 px-6 py-2 text-xl font-medium text-blue-600 whitespace-nowrap max-md:px-5">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.3299 12.7729V9.6701C26.3299 9.21019 25.9575 8.83693 25.4967 8.83693C25.036 8.83693 24.6635 9.21019 24.6635 9.6701V11.6414L20.3285 8.71612C18.913 7.76129 17.0833 7.76129 15.6677 8.71612L9.83549 12.652C8.68654 13.4277 8 14.7183 8 16.1056V23.8341C8 26.1312 9.86882 28 12.1659 28H13.8322C14.293 28 14.6654 27.6267 14.6654 27.1668V19.6682C14.6654 19.2091 15.0387 18.8351 15.4986 18.8351H20.4977C20.9576 18.8351 21.3308 19.2091 21.3308 19.6682V27.1668C21.3308 27.6267 21.7033 28 22.164 28H23.8304C26.1274 28 27.9963 26.1312 27.9963 23.8341V16.1056C27.9963 14.7883 27.3764 13.5577 26.3299 12.7729Z" fill="#2E71EB" />
                        </svg>

                        <div>Acceuil</div>
                    </div>
                    <div className="flex gap-4  px-6 py-2 max-md:px- items-center">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.973 8.00156C16.3698 8.07968 16.7746 8.13072 17.1617 8.23958C19.5468 8.91663 21.1307 11.0067 20.9915 13.2769C20.8518 15.5628 18.9976 17.4919 16.5353 17.9122C13.4482 18.4413 10.4957 16.5226 10.0554 13.7024C9.62018 10.916 11.7985 8.35988 14.885 8.03333C14.9335 8.02554 14.9814 8.01439 15.0281 8L15.973 8.00156Z" fill="#1D1E21" />
                            <path d="M8 27.9985C8 26.6737 8 25.3492 8 24.0251C8 22.0514 9.36257 20.4523 11.3767 20.0693C11.6453 20.0224 11.9179 20.0005 12.1909 20.0038C14.3972 19.9987 16.6032 19.9987 18.8089 20.0038C20.907 20.0083 22.5633 21.3379 22.9409 23.3186C22.982 23.5588 23.001 23.8021 22.9977 24.0456C23.0029 25.3638 22.9977 26.6819 22.9977 28L8 27.9985Z" fill="#1D1E21" />
                        </svg>

                        <Link to={`/profile/${storedUserData.id}`}  className="my-auto text-xl font-medium text-zinc-900">Profil</Link>
                    </div>
                    <div className="flex gap-4  px-6 py-2  text-xl font-medium whitespace-nowrap text-zinc-900 max-md:px-5">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.1667 15.5C17.1667 15.279 17.2545 15.067 17.4107 14.9107C17.567 14.7545 17.779 14.6667 18 14.6667C18.221 14.6667 18.433 14.7545 18.5893 14.9107C18.7455 15.067 18.8333 15.279 18.8333 15.5C18.8333 15.721 18.7455 15.933 18.5893 16.0893C18.433 16.2455 18.221 16.3333 18 16.3333C17.779 16.3333 17.567 16.2455 17.4107 16.0893C17.2545 15.933 17.1667 15.721 17.1667 15.5ZM26.3333 12.1667V23.8333C26.332 24.938 25.8926 25.997 25.1115 26.7782C24.3304 27.5593 23.2713 27.9987 22.1667 28H13.8333C13.0235 27.9989 12.2316 27.7619 11.5543 27.3179C10.8771 26.8739 10.3439 26.2422 10.02 25.5H8.83333C8.61232 25.5 8.40036 25.4122 8.24408 25.2559C8.0878 25.0996 8 24.8877 8 24.6667C8 24.4457 8.0878 24.2337 8.24408 24.0774C8.40036 23.9211 8.61232 23.8333 8.83333 23.8333H9.66667V22.1667H8.83333C8.61232 22.1667 8.40036 22.0789 8.24408 21.9226C8.0878 21.7663 8 21.5543 8 21.3333C8 21.1123 8.0878 20.9004 8.24408 20.7441C8.40036 20.5878 8.61232 20.5 8.83333 20.5H9.66667V18.8333H8.83333C8.61232 18.8333 8.40036 18.7455 8.24408 18.5893C8.0878 18.433 8 18.221 8 18C8 17.779 8.0878 17.567 8.24408 17.4107C8.40036 17.2545 8.61232 17.1667 8.83333 17.1667H9.66667V15.5H8.83333C8.61232 15.5 8.40036 15.4122 8.24408 15.2559C8.0878 15.0996 8 14.8877 8 14.6667C8 14.4457 8.0878 14.2337 8.24408 14.0774C8.40036 13.9211 8.61232 13.8333 8.83333 13.8333H9.66667V12.1667H8.83333C8.61232 12.1667 8.40036 12.0789 8.24408 11.9226C8.0878 11.7663 8 11.5543 8 11.3333C8 11.1123 8.0878 10.9004 8.24408 10.7441C8.40036 10.5878 8.61232 10.5 8.83333 10.5H10.02C10.3439 9.7578 10.8771 9.12608 11.5543 8.68208C12.2316 8.23809 13.0235 8.00107 13.8333 8H22.1667C23.2713 8.00132 24.3304 8.44073 25.1115 9.22185C25.8926 10.003 26.332 11.062 26.3333 12.1667ZM15.5 15.5C15.5 16.163 15.7634 16.7989 16.2322 17.2678C16.7011 17.7366 17.337 18 18 18C18.663 18 19.2989 17.7366 19.7678 17.2678C20.2366 16.7989 20.5 16.163 20.5 15.5C20.5 14.837 20.2366 14.2011 19.7678 13.7322C19.2989 13.2634 18.663 13 18 13C17.337 13 16.7011 13.2634 16.2322 13.7322C15.7634 14.2011 15.5 14.837 15.5 15.5ZM22.1667 23C21.9908 17.4933 14.0075 17.495 13.8333 23C13.8333 23.221 13.9211 23.433 14.0774 23.5893C14.2337 23.7455 14.4457 23.8333 14.6667 23.8333C14.8877 23.8333 15.0996 23.7455 15.2559 23.5893C15.4122 23.433 15.5 23.221 15.5 23C15.5 22.337 15.7634 21.7011 16.2322 21.2322C16.7011 20.7634 17.337 20.5 18 20.5C18.663 20.5 19.2989 20.7634 19.7678 21.2322C20.2366 21.7011 20.5 22.337 20.5 23C20.5 23.221 20.5878 23.433 20.7441 23.5893C20.9004 23.7455 21.1123 23.8333 21.3333 23.8333C21.5543 23.8333 21.7663 23.7455 21.9226 23.5893C22.0789 23.433 22.1667 23.221 22.1667 23Z" fill="#1D1E21" />
                        </svg>

                        <Link to={'/defaultgroupagent'}>Agents</Link>
                    </div>
                    <div className="flex gap-4  px-6 py-2  text-xl font-medium whitespace-nowrap text-zinc-900 max-md:px-5">

                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.5708 26.0501H24.9916C24.8626 26.0505 24.7368 26.0099 24.6324 25.9342C24.528 25.8585 24.4503 25.7516 24.4106 25.6288L24.2323 25.0794C24.1919 24.9568 24.1916 24.8246 24.2313 24.7018C24.2711 24.579 24.3489 24.472 24.4534 24.3964L24.9208 24.0579C25.0248 23.982 25.1503 23.9411 25.279 23.9411C25.4078 23.9411 25.5333 23.982 25.6373 24.0579L26.105 24.3975C26.2096 24.473 26.2874 24.5799 26.3273 24.7026C26.3671 24.8254 26.3668 24.9576 26.3265 25.0802L26.1493 25.6299C26.1092 25.7523 26.0314 25.8589 25.927 25.9344C25.8226 26.0098 25.6971 26.0504 25.5683 26.0501H25.5708ZM28.2072 25.0743C28.2072 25.6532 28.0356 26.2192 27.7141 26.7005C27.3925 27.1819 26.9354 27.5571 26.4006 27.7787C25.8658 28.0003 25.2773 28.0583 24.7095 27.9454C24.1417 27.8325 23.6202 27.5538 23.2108 27.1444C22.8015 26.7351 22.5227 26.2136 22.4097 25.6458C22.2967 25.0781 22.3547 24.4896 22.5762 23.9547C22.7977 23.4199 23.1729 22.9628 23.6542 22.6411C24.1355 22.3195 24.7014 22.1478 25.2803 22.1478C26.0565 22.1478 26.8009 22.4562 27.3498 23.005C27.8987 23.5538 28.2071 24.2982 28.2072 25.0743ZM25.2803 27.2695C25.4066 27.2683 25.5326 27.2562 25.6569 27.2332L25.8639 26.5559C25.9108 26.4085 26.0033 26.2798 26.1281 26.1885C26.2529 26.0971 26.4035 26.0477 26.5582 26.0475H27.2452C27.3564 25.8256 27.4287 25.5862 27.4591 25.3398L26.9108 24.9741C26.7838 24.8855 26.6884 24.7587 26.6383 24.6122C26.5881 24.4657 26.5859 24.3071 26.6319 24.1592L26.8418 23.5325C26.6673 23.3572 26.4646 23.2123 26.2423 23.104L25.7106 23.4715C25.5857 23.5626 25.4351 23.6118 25.2805 23.6118C25.1259 23.6118 24.9752 23.5626 24.8504 23.4715L24.3362 23.0967C24.1171 23.2013 23.9168 23.3414 23.7435 23.5114L23.9291 24.1592C23.9751 24.3068 23.973 24.4652 23.9231 24.6116C23.8732 24.7579 23.7782 24.8846 23.6516 24.9734L23.1069 25.3623C23.1383 25.6007 23.2089 25.8322 23.3157 26.0475H24.0024C24.1572 26.0477 24.3078 26.097 24.4327 26.1884C24.5576 26.2798 24.6502 26.4085 24.6971 26.5559L24.9081 27.235C25.031 27.2569 25.1555 27.2687 25.2803 27.2695Z" fill="black" />
                            <path d="M27.576 22.036L21.7608 10.4102C21.5306 9.91459 21.2049 9.46915 20.8025 9.09934C20.4001 8.72954 19.9288 8.44262 19.4155 8.25496C18.9022 8.06731 18.357 7.98259 17.811 8.00566C17.265 8.02873 16.7288 8.15912 16.2332 8.3894C15.3494 8.79973 14.6377 9.50719 14.2221 10.3885L8.38946 22.0625C8.15928 22.5576 8.02888 23.0932 8.0057 23.6387C7.98252 24.1841 8.06702 24.7289 8.25438 25.2417C8.44173 25.7545 8.72826 26.2254 9.09762 26.6275C9.46698 27.0296 9.91192 27.3549 10.407 27.5851C10.938 27.8319 11.5152 27.9638 12.1007 27.9722L15.7629 21.0457C15.9046 20.7535 16.1026 20.4921 16.3454 20.2764C16.5882 20.0607 16.8711 19.8949 17.178 19.7886C17.4849 19.6824 17.8097 19.6376 18.1339 19.6569C18.4581 19.6762 18.7753 19.7592 19.0674 19.9011C19.5795 20.15 19.99 20.568 20.2295 21.0846L21.8512 24.4617C21.8883 23.787 22.1298 23.1395 22.5437 22.6053C22.9576 22.0711 23.5242 21.6755 24.1683 21.4711C24.8124 21.2667 25.5035 21.2631 26.1497 21.4608C26.7958 21.6586 27.3665 22.0483 27.7859 22.5782C27.7286 22.3928 27.6584 22.2117 27.576 22.036ZM18.7243 21.7905C18.6444 21.6142 18.5038 21.4724 18.3281 21.3911C18.134 21.3008 17.912 21.2912 17.7108 21.3644C17.5097 21.4376 17.3458 21.5875 17.255 21.7814L13.981 27.9722H21.6907L18.7243 21.7905Z" fill="black" />
                        </svg>

                        <Link to={'/defaultgroup'} >Camps</Link>
                    </div>
                </div>

            </div>
            <div className="col-span-12 md:col-span-9  flex flex-col px-4 md:px-0 ">
                <div className="justify-center items-start px-8 py-6 text-3xl font-bold whitespace-nowrap bg-white rounded-[10px] text-zinc-900 max-md:px-5 max-md:max-w-full">
                    List des amis
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
                    {FriendRequest.length <= 0 && <div className="text-lg text-center col-span-3">Vous n'avez pas aucune ami pour le moment !</div>}
                    {FriendRequest.map((item) => {
                        return (
                            <div className="col-span-1">
                                <div className="flex flex-col grow p-6 mx-auto w-full text-xs bg-white rounded-[10px] text-zinc-900 max-md:px-5 max-md:mt-6">
                                    <img
                                        loading="lazy"
                                        src={item.receiver?.image ? item?.receiver.image : Placeholder }
                                        className="self-center max-w-full rounded-full aspect-square w-[120px]"
                                    />
                                    <div className="self-center mt-4 text-xl font-medium text-black">
                                        {item?.receiver?.nom}
                                    </div>
                                    <div className="flex gap-4 justify-between mt-4 w-full">
                                        <div className="flex gap-4 justify-between px-1 font-light whitespace-nowrap">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/576404c583a66cbb5fc431ad30a1cd490dd50b47c1745b9e924980a529366444?"
                                                className="shrink-0 w-3.5 aspect-[0.74]"
                                            />
                                            <div className="my-auto">Profil</div>
                                        </div>
                                        <div className="my-auto font-medium">{item?.receiver?.profil}</div>
                                    </div>
                                    <div className="flex gap-4 justify-between mt-4 w-full whitespace-nowrap">
                                        <div className="flex gap-4 font-light">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa5eae7f20e92fe11b1e7f70f0906a949d8f8881426a877620d101145fd278e5?"
                                                className="shrink-0 w-5 aspect-square"
                                            />
                                            <div className="my-auto">Nationnalité</div>
                                        </div>
                                        <div className="flex font-medium">
                                        <div className="flex font-medium whitespace-nowrap">
                                            <span
                                                className={`flag-icon flag-icon-tn size-5 `}
                                                style={{ marginRight: "8px"}}
                                            ></span>
                                            <div>{item.receiver?.nationality}</div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-between mt-4 w-full">
                                        <div className="flex gap-4 font-light">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/21f587236071e7a0f2d23e61c4ab1e76c6f570ba11f92ab8223dcd126ac03865?"
                                                className="shrink-0 my-auto w-5 aspect-square"
                                            />
                                            <div>
                                                Pays de
                                                résidence
                                            </div>
                                        </div>
                                        <div className="flex font-medium whitespace-nowrap">
                                            <span
                                                className={`flag-icon flag-icon-us size-5 `}
                                                style={{ marginRight: "8px"}}
                                            ></span>
                                            <div>{item.receiver?.countryresidence}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-between mt-4 text-base font-medium text-white whitespace-nowrap">
                                        <Link to={`/profile/${item.receiver.id}`}   className="justify-center px-6 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                            Voir Profil
                                        </Link>
                                        <button  onClick={()=>deleteInviation(item.receiverId)} className="justify-center px-6 py-2 bg-orange-500 rounded-[30px] max-md:px-5">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </HomeLayout>)





}
export default FriendList