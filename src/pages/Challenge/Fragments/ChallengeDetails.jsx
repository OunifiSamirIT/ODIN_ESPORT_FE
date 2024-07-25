import React, { useRef, useState, useEffect } from "react";
import image from "../../../assets/Image.png"
import { Link, useParams } from "react-router-dom";
import { Config } from "../../../config";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Timer from "../Component/Timer";
import placeholder from '../../../assets/placeholder.jpg'
import { Context } from "../../../index"
import ParticipantCard from "../Component/ParticipantCard";
import moment from "moment/moment";
import '../../../../node_modules/moment/locale/fr';
import '../../../../node_modules/moment/locale/en-ca';


import NotificationService from "../../../api/notification.server";
import { io } from 'socket.io-client';
import { BiSolidHeart } from "react-icons/bi";

const ChallengeDetais = () => {




    //initialize socket

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(Config.LOCAL_URL);
        setSocket(socketInstance);

    }, []);


    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const ref = useRef(null);
    const ref2 = useRef(null);
    const { _currentLang, _setLang, getTranslation } = React.useContext(Context)
    const { challengeId } = useParams();
    const [isOpen, setIsOpen] = useState(false)
    const [showCase, setShowCase] = useState(false)
    const [challenges, setChallenges] = useState([])
    const [expired, setExpired] = useState(false)
    const [commentaire, setCommentaire] = useState([]);
    const [commentairetext, setCommentairetext] = useState([]);
    const [isVoted, setIsVoted] = useState(false);
    const [commentShow, setCommentShow] = useState(false);
    const [hasParticipated, setHasParticipated] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayingPa, setIsPlayingPa] = useState(false);
    const [deleted, setDelete] = useState(false)
    const [rerangeparticipants, setreRangeParticipants] = useState([]);
    const [ReplyText, setReplyText] = useState([]);
    const [ReplyShow, setReplyShow] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState(false);
    const [showDropdownlikes, setShowDropdownlikes] = useState(false);
    const [videoModal, setvideoModal] = useState(false);
    const video = useRef();
    const participantVideo = useRef();
    const handleEditComment = (comment) => {
        console.log('sdfsdfsdgsdf', comment);
        setEditedComment(comment.description)
        setCommentToEdit(comment)

    }
    const submitUpdatedComment = async (comment) => {
        console.log(comment)
        const formData = new FormData();
        formData.append('text', editedComment)
        formData.append('id', comment.id)

        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/edit`, {
            method: 'PUT',
            body: formData,
        })
        const result = await response.json()
        setCommentToEdit(false)
        fetchCommentaire()
        setEditedComment(editedComment)
        console.log(result)

    }
    const playVideoPa = () => {
        if (isPlayingPa) {
            participantVideo.current.pause();
        } else {
            participantVideo.current.play();
        }
        setIsPlayingPa(!isPlayingPa);
    }
    const playVideoPaMobile = () => {
        if (isPlayingPa) {
            participantVideoMobile.current.pause();
        } else {
            participantVideoMobile.current.play();
        }
        setIsPlayingPa(!isPlayingPa);
    }
    const playVideo = () => {
        if (isPlaying) {
            video.current.pause();
        } else {
            setvideoModal(true)
            setTimeout(() => {
                
            video.current.play();
            }, 500);

        }
        setIsPlaying(!isPlaying);
    }

    const handleVote = async () => {
        const formData = new FormData();
        formData.append('challengesId', challengeId)
        formData.append('userId', storedUserData.id)
        formData.append('participantId', showCase.id)
        const response = await fetch(`${Config.LOCAL_URL}/api/participant/vote`, {
            method: 'PUT',
            body: formData,
        })
        const result = await response.json()
        setIsVoted(!isVoted)
        setVote(result.count)
        console.log('voted')

    }
    const checkVote = async () => {
        const formData = new FormData();
        formData.append('challengesId', challengeId)
        formData.append('userId', storedUserData.id)
        formData.append('participantId', showCase.id)
        console.log('fg')
        const response = await fetch(`${Config.LOCAL_URL}/api/participant/checkVote`, {
            method: 'POST',
            body: formData,
        })
        const result = await response.json()
    }
    const handleDelete = async (id) => {
        console.log(showCase)

        const response = fetch(`${Config.LOCAL_URL}/api/participant/delete/${id}`, {
            method: 'DELETE'
        })
        const result = await response

        if (result.status === 200) {

            setShowCase(false)
            setHasParticipated(false)
            fetchChallenges()
        }
    }
    const handleDeleteComment = async (id) => {
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/delete/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()
        console.log(response)
        if (response.status === 200) {
            fetchCommentaire()
        }
    }
    const handleClickOutside = (event) => {

        if (ref.current && !ref.current.contains(event.target)) {
            console.log(!ref.current.contains(event.target))
            setIsOpen(false)
            setShowCase(false)
            console.log(ref, 'clicked outside')
        }
        if (ref2.current && !ref2.current.contains(event.target)) {
            console.log(!ref2.current.contains(event.target))
            setDelete(false)
            console.log('clicked outside')
        }
        if (EditDropDown.current && !EditDropDown.current.contains(event.target)) {
            console.log(!EditDropDown.current.contains(event.target))
            setDropdown(false)
            console.log('clicked outside')
        }
        if (myVideoRef.current && !myVideoRef.current.contains(event.target)) {
            console.log(!myVideoRef.current.contains(event.target))
            setDropdown(false)
            console.log('clicked outside')
        }
        if (likeModelRef.current && !likeModelRef.current.contains(event.target)) {
            setShowDropdownlikes(false)
        }
        if (VoteModelRef.current && !VoteModelRef.current.contains(event.target)) {
            setShowDropdownVotes(false)
        }
    };
    const reRange = () => {

        let myParticipants = []
        let otherParticipants = []
        console.log(challenges.participants, "dddddddddiheb")
        challenges?.participants?.map((item) => {

            if (isOwner(item.userId)) {
                myParticipants.push(item)
            }
            else {
                otherParticipants.push(item)

            }
        })

        setreRangeParticipants([...myParticipants, ...otherParticipants])

    }
    const fetchChallenges = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/challenges/${challengeId}`)
        const result = await response.json()
        console.log("alooo ", result)
        const connectedUserId = JSON.parse(localStorage.getItem("user"));
        console.log(connectedUserId, "effhehehhee")

        // Vérifier si l'ID du participant connecté est dans la liste des participants
        const connectedParticipant = challenges?.participants?.find(participant => participant?.user?.id === connectedUserId?.id);

        if (connectedParticipant) {
            console.log('Participant connecté trouvé :', connectedParticipant);
            // Faire quelque chose avec le participant connecté trouvé
        } else {
            console.log('Aucun participant connecté trouvé.');
        }

        //isOwner(connectedParticipant.userId)
        setChallenges(result.challenges)

    }
    const [error, setError] = useState(false)

    const sortByVote = (vote) => {
        if (vote) { return vote.sort((a, b) => b.votes - a.votes) }
    }
    const [likePerContectedUser, setLikesPerContectedUser] = useState([])
    const fetchCommentaire = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/fetch/${showCase.id}`)
        const result = await response.json()
        let connectedUserLikes = [];
        const useee = result.commentaire.map((item) => {
            console.log('sfkjgjsfgj', item)
            item.like.map((i) => {
                if (i.userId == storedUserData.id) {
                    connectedUserLikes.push(i)
                    setLikesPerContectedUser(connectedUserLikes)
                }
            })

        })
        console.log('yoo efhsjdfkjllsd', connectedUserLikes)
        setCommentaire(result.commentaire)
    }
    useEffect(() => {
        fetchChallenges()
        fetchCommentaire(showCase.id)

    }, [showCase])
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);
    useEffect(() => {
        reRange()
    }
        , [challenges])
    const isOwner = (id) => {
        return storedUserData.id == id
    }
    const checkIfParticipate = (challenges) => {
        console.log(challenges)
        if (challenges.participants) {
            if (challenges.participants.length > 0) {
                challenges.participants.map((item) => {
                    if (item.userId == storedUserData.id) {
                        setHasParticipated(true)
                    }
                })
            }
        }

    }
    const likeModelRef = useRef();
    const VoteModelRef = useRef();
    const [loading, setIsLoading] = useState(false)
    useEffect(() => {
        checkIfParticipate(challenges)
        console.log('changed')
    }, [challenges])
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const onSubmit = async (data) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('challengeId', challengeId)
        formData.append('userId', storedUserData.id)
        formData.append('description', data.description)
        formData.append('files', data.video[0])
        const response = await fetch(`${Config.LOCAL_URL}/api/participant/create`, {
            method: 'POST',
            body: formData,
        });
        if (response.status === 200) {
            setValue('challengeId', '')
            setValue('userId', '')
            setValue('files', '')
            setIsOpen(false)
            fetchChallenges()
            toast.success('Challenge ete ajoutée', {
                position: "top-right",
                autoClose: 5000,
                type: 'success',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setIsLoading(false)
            // navigate('/admin/blog')

        } else {
            setError('vous pouvez participer une suele fois ')
        }
    }

    useEffect(() => {
        setreRangeParticipants(sortByVote(challenges?.participants))
        //   console.log(sortByVote(challenges?.participants))
    }, [challenges])

    const onDelete = async (data) => {
        console.log('delete')
        let myParticipants = []

        challenges?.participants?.map((item) => {
            if (isOwner(item.userId)) {
                myParticipants.push(item)
            }
        })
        const response = await fetch(`${Config.LOCAL_URL}/api/participant/delete/${myParticipants[0].id}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
            window.location.reload()

        }
        fetchChallenges()
    }
    const myVideoRef = useRef()
    const [likes, setLikes] = useState(0)
    const [vote, setVote] = useState(0)
    const [userslikearticle, setUserslikearticle] = useState([]);
    const EditDropDown = useRef()
    const handleCommentaire = async () => {
        const formData = new FormData()
        formData.append('participantId', showCase.id)
        formData.append('description', commentairetext)
        formData.append('challengeId', challengeId)
        formData.append('userId', storedUserData.id)
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/create`, {
            method: 'POST',
            body: formData
        })
        if (response.status === 200) {
            fetchCommentaire()
        }
        setCommentShow(true)
        setCommentairetext('')
    }
    const participantVideoMobile = useRef();
    const handleReply = async (commentId, replyText) => {
        console.log(commentId, replyText);
        try {
            if (commentId && replyText) {
                // Retrieve user information from local storage
                const user = JSON.parse(localStorage.getItem("user"));

                const response = await fetch(
                    `${Config.LOCAL_URL}/api/commentaire/reply/create`, // Update the endpoint here
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            description: replyText,
                            challengeId: challengeId,
                            participantId: showCase.id,
                            userId: user.id,
                            nom: user.login,
                            imageuser: user.image,
                            commentaireId: commentId,
                        }),
                    }
                );

                const data = await response.json();

                console.log("Reply created:", data);

                // Update the state with the new reply
                // setArticleComments((prevComments) => {
                //   const updatedComments = { ...prevComments };
                //   updatedComments[commentId] = [
                //     ...(updatedComments[commentId] || []),
                //     data,
                //   ];
                //   return updatedComments;
                // });

                // Reset the reply input field and replyingToCommentId
                setReplyText("");
            }
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    }
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        // Format the date object into the desired format
        return dateObject.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    const [hasLiked, setHasLiked] = useState(false)
    const [hasLikedReply, setHasLikedReply] = useState([])
    const handleLike = async () => {
        const formData = new FormData()
        formData.append('participantId', showCase.id)
        formData.append('challengeId', challengeId)
        formData.append('userId', storedUserData.id)
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/like`, {
            method: 'PUT',
            body: formData
        })
        const result = await response.json()
        console.log(result)
        setLikes(result.likeCount)
        setHasLiked(result.hasLiked ? true : false)
    }
    const handleReplyLike = async (commentId) => {
        const formData = new FormData()
        setHasLikedReply((prevHasLikedReply) => {
            if (!Array.isArray(prevHasLikedReply)) {
                return [commentId];
            }
            if (prevHasLikedReply.includes(commentId)) {
                return prevHasLikedReply.filter(id => id !== commentId);
            }

            // Add the commentId if it does not exist
            return [...prevHasLikedReply, commentId];
        });
        formData.append('participantId', showCase.id)
        formData.append('commentId', commentId)
        formData.append('challengeId', challengeId)
        formData.append('userId', storedUserData.id)
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/likeChallengesReply`, {
            method: 'PUT',
            body: formData
        })
        fetchCommentaire()
        const result = await response.json()
        console.log(hasLikedReply)
        // setLikes(result.likeCount)


    }
    const checkLike = async (participantId) => {
        const formData = new FormData()
        formData.append('participantId', participantId)
        formData.append('challengeId', challengeId)
        formData.append('userId', storedUserData.id)
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/checklike`, {
            method: 'PUT',
            body: formData
        })
        const didIlikedTheChallenge = await response.json()
        if (didIlikedTheChallenge.hasLiked == true) {
            setHasLiked(true)
        } else {
            setHasLiked(false)
        }
        console.log(didIlikedTheChallenge, 'this is new commentaire')
    }
    const [editedComment, setEditedComment] = useState('')
    const [showDropdownVotes, setShowDropdownVotes] = useState(false)
    const [userVote, setUserVote] = useState([])
    const hasUserLiked = (likeArray, userId) => {
        if (!Array.isArray(likeArray)) {
            console.error('Input is not an array.');
            return false;
        }

        // Check if any object in the array has a userId equal to the given userId
        return likeArray.some(like => like.userId == userId);
    }
    const openModel = async (item) => {
        console.log('hello from here' + item)
        const formData = new FormData();
        formData.append('challengesId', challengeId)
        formData.append('userId', storedUserData.id)
        formData.append('participantId', item.id)

        const response = await fetch(`${Config.LOCAL_URL}/api/participant/checkVote`, {
            method: 'POST',
            body: formData,
        })
        const result = await response.json()
        console.log('this tabnine', hasLiked)
        setIsVoted(result.res)
        setVote(item.votes)
        setLikes(item.likes)
        checkLike(item.id)
        setShowCase(item)
        fetchCommentaire()
    }
    const handleClicklikeshow = async (id) => {
        try {
            const response = await fetch(
                `${Config.LOCAL_URL}/api/like/fetchLikelist/${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch users who liked the article");
            }
            const data = await response.json();
            console.log("🚀 ~ handleClicklikeshow ~ data:", data);
            setUserslikearticle(data.like);
            console.log(userslikearticle)
            setShowDropdownlikes(!showDropdownlikes);
        } catch (error) {
            console.error(error);
        }
    }
    const handleClickVoteshow = async (id) => {
        try {
            const response = await fetch(
                `${Config.LOCAL_URL}/api/like/fetchVotelist/${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch users who liked the article");
            }
            const data = await response.json();
            console.log("🚀 ~ handleClicklikeshow ~ data:", data);
            setUserVote(data.like)
            console.log(data.like)
            setShowDropdownVotes(!showDropdownlikes);
        } catch (error) {
            console.error(error);
        }
    }
    const [videoName, setVideoName] = useState()
    return (<>
        {
            videoModal && <div style={{
                backdropFilter: "blur(3px)",
            }} className="videmodal fixed top-20 bg-[#11111140]   left-0 z-40 h-full w-full">
                <button onClick={() => {setvideoModal(false) ;video.current.play(); setIsPlaying(false);} } className="absolute z-50  top-3 border-2 border-white p-2  w-12 h-12 rounded-full left-1/2 text-white  bg-orange-400 -translate-x-1/2 rotate-45">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>
                </button >
                    <video  onClick={playVideo} ref={video} class="object-contain w-full h-full aspect-square"
                        src={`${challenges.video}`}
                    >
                    </video>
                    {!isPlaying && <svg onClick={playVideo} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[40px]  flex  cursor-pointer" width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z" fill="white" />
                        <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
                    </svg>}
            </div>
        }
        {
            isOpen && <div className="bg-black/70  fixed inset-0  z-50 h-full w-full  overflow-hidden flex justify-center items-center px-8 ">
                <div ref={ref} className="flex flex-col px-4 py-8 max-w-full bg-white rounded-[10px] w-[936px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  text-base bg-white rounded-xl max-w-[936px] text-zinc-900 ">
                        <div className="self-center mt-6 text-3xl font-bold text-center">
                            {
                                getTranslation(
                                    `Share your video`,  // -----> Englais
                                    `Partagez votre vidéo`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            } <br />
                            {
                                getTranslation(
                                    ` and embrace the challenge.`,  // -----> Englais
                                    `et relevez le défi !`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            }
                        </div>
                        <div className="flex gap-4 self-start px-4 mt-8 text-lg whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1632032c4b9cc0a36a580eeb6d59c230aeaf9df1d716cf481033bcffcdc30506?"
                                className="shrink-0 my-auto w-5 aspect-square"
                            />
                            <div> {
                                getTranslation(
                                    `Description`,  // -----> Englais
                                    `Description`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            } </div>
                        </div>
                        <textarea type="text" name="description" {...register("description")} className="justify-center p-4 mt-2 h-full min-h-4 font-light rounded-[10px] border border-solid border-neutral-200 max-md:max-w-full" placeholder="📢 Big News! Thrilled to announce my signing with FC Barcelona! Grateful" />
                        <div className="flex justify-center items-center px-8 py-10 mt-8 font-medium text-white rounded-[10px] border-2 border-blue-600 border-dashed max-md:px-5 max-md:max-w-full">
                            <div className="relative ">
                                <div className="w-full   flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7123def0a3472b3c80be2e883ea0924a14fd3bb7a77eac6c4c15dc33e92f9d35?"
                                        className="shrink-0 aspect-[1.45] fill-white w-[29px]"
                                    />
                                    <div className="overflow-hidden">

                                        {
                                            videoName ? videoName :
                                                getTranslation(
                                                    `Import your video`,  // -----> Englais
                                                    `Importer votre vidéo`, //  -----> Francais
                                                    //   ``,  //  -----> Turkey
                                                    //   `` ,  //  -----> Allemagne
                                                )

                                        } </div>
                                </div>
                                <input type="file" name="video" {...register("video")} onChange={(e) => setVideoName(e.target.files[0].name)} className="!appearance-none top-0 !opacity-0 absolute flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5" />

                            </div>
                        </div>
                        <div className="flex gap-2 self-center mt-8 font-light max-md:flex-wrap">
                            <div className="flex gap-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/18d5ab46a9a614282d78f6472fee72d2c6c7772c52c783a98afd3ca7bb3dd6cb?"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <div> {
                                    getTranslation(
                                        `Please take note:`,  // -----> Englais
                                        `Noter bien :`, //  -----> Francais
                                        //   ``,  //  -----> Turkey
                                        //   `` ,  //  -----> Allemagne
                                    )

                                } </div>
                            </div>
                            <div>{
                                getTranslation(
                                    ` Only vertical videos shall be accepted.`,  // -----> Englais
                                    `Seules les vidéos verticales seront acceptées.`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            }</div>
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                                {
                                    loading && !error &&
                                    <div className="loaderCOn w-[60%]  h-5 rounded-full bg-gray-400 mx-auto" >
                                        <div className="innerLoadShareVIdeo bg-blue-600 w-8 h-5 rounded-full ">

                                        </div>
                                    </div>
                                }
                        <div className="flex flex-col">
                            <div className="flex gap-2 justify-center self-center px-8 py-2 mt-8 font-medium cursor-pointer bg-blue-600 hover:bg-blue-500 text-white whitespace-nowrap border-2 border-blue-500 border-solid rounded-[30px] max-md:px-5">
                                <button type="submit" disabled={loading}> {loading ? 'loading ...'  :
                                    getTranslation(
                                        `Submit`,  // -----> Englais
                                        `Confirmer`, //  -----> Francais
                                        //   ``,  //  -----> Turkey
                                        //   `` ,  //  -----> Allemagne
                                    )

                                } </button>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_203_8700)">
                                        <path d="M6.45766 17.2188C5.88994 17.2191 5.34547 16.9934 4.94438 16.5916L0.369217 12.0182C-0.123072 11.5257 -0.123072 10.7275 0.369217 10.235C0.861665 9.74274 1.65992 9.74274 2.15237 10.235L6.45766 14.5403L17.8476 3.15035C18.3401 2.65806 19.1383 2.65806 19.6308 3.15035C20.1231 3.64279 20.1231 4.44105 19.6308 4.9335L7.97094 16.5916C7.56984 16.9934 7.02538 17.2191 6.45766 17.2188Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_203_8700">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <div className="flex gap-2 justify-center self-center px-8 py-2 mt-8 font-medium text-orange-500 whitespace-nowrap border-2 border-orange-500 border-solid rounded-[30px] max-md:px-5">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c125ccff0f979c2c50f9e8e6ac7098bbfb8c561a23d75e86e0eaa57843568d61?"
                                    className="shrink-0 my-auto aspect-square fill-orange-500 w-[15px]"
                                />
                                <button onClick={() => setIsOpen(false)}> {
                                    getTranslation(
                                        `Cancel`,  // -----> Englais
                                        `Annuler`, //  -----> Francais
                                        //   ``,  //  -----> Turkey
                                        //   `` ,  //  -----> Allemagne
                                    )

                                } </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        }
        {
            deleted && <div className="bg-black/70  fixed inset-0  z-50 h-full w-full  overflow-hidden flex justify-center items-center px-8 ">
                <div ref={ref2} className="flex flex-col px-4 py-8 max-w-full bg-white rounded-[10px] w-[936px]">
                    <form onSubmit={handleSubmit(onDelete)} className="flex flex-col  text-base bg-white rounded-xl max-w-[936px] text-zinc-900 ">
                        <div className="self-center mt-6 text-2xl md:text-3xl font-bold text-center mb-2">
                            {
                                getTranslation(
                                    `Delete your participation`,  // -----> Englais
                                    `Supprimer votre particiption`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            }
                        </div>
                        <p className="text-center text-gray-500 text-sm md:text-base">


                            {
                                getTranslation(
                                    `Do you confirm that you want to delete your participation in the challenge?`,  // -----> Englais
                                    `Confimez-vous que vous voulez supprimer votre participation au challenge ?`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            }
                        </p>

                        <div className="flex flex-col">
                            <div className="flex gap-2 justify-center self-center px-4 py-1 md:py-2 mt-8 font-medium bg-blue-500 text-white whitespace-nowrap border-2 border-blue-500 border-solid rounded-[30px]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_203_8700)">
                                        <path d="M6.45766 17.2188C5.88994 17.2191 5.34547 16.9934 4.94438 16.5916L0.369217 12.0182C-0.123072 11.5257 -0.123072 10.7275 0.369217 10.235C0.861665 9.74274 1.65992 9.74274 2.15237 10.235L6.45766 14.5403L17.8476 3.15035C18.3401 2.65806 19.1383 2.65806 19.6308 3.15035C20.1231 3.64279 20.1231 4.44105 19.6308 4.9335L7.97094 16.5916C7.56984 16.9934 7.02538 17.2191 6.45766 17.2188Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_203_8700">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <button type="submit"> {
                                    getTranslation(
                                        `Submit`,  // -----> Englais
                                        `Confirmer`, //  -----> Francais
                                        //   ``,  //  -----> Turkey
                                        //   `` ,  //  -----> Allemagne
                                    )

                                } </button>


                            </div>
                            <div onClick={() => setDelete(false)} className="flex gap-2 justify-center self-center px-[35px] py-1 md:py-2 mt-3 font-medium text-orange-500 whitespace-nowrap border-2 border-orange-500 border-solid rounded-[30px]">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c125ccff0f979c2c50f9e8e6ac7098bbfb8c561a23d75e86e0eaa57843568d61?"
                                    className="shrink-0 my-auto aspect-square fill-orange-500 w-[15px]"
                                />
                                <button onClick={() => setIsOpen(false)}> {
                                    getTranslation(
                                        `Cancel`,  // -----> Englais
                                        `Annuler`, //  -----> Francais
                                        //   ``,  //  -----> Turkey
                                        //   `` ,  //  -----> Allemagne
                                    )

                                } </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        }
        {
            /* desktop view */
            showCase && <div className="bg-black/70  fixed inset-0  z-50 h-full w-full  md:flex justify-center items-center px-4 md:px-8 ">
                <svg onClick={() => setShowCase(false)} className="md:hidden my-4 absolute right-0 z-50 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 62" width="60" height="60" fill="#fff">
                    <path d="M13.292 12L21.774 1.633c.35-.427.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407.142L12 10.421 3.774.367c-.351-.429-.98-.49-1.407-.142-.428.351-.491.98-.142 1.407L10.708 12 2.226 22.367c-.35.427-.286 1.057.142 1.407.425.348 1.056.288 1.407-.142L12 13.579l8.226 10.053c.351.43.982.489 1.407.142.428-.351.491-.98.142-1.407L13.292 12z" />
                </svg>
                <div ref={ref} className="relative md:overflow-hidden flex h-[80%] md:h-[600px] flex-col justify-between items-center  max-w-full  mt-20 bg-white overflow-y-scroll   rounded-[10px] w-[936px]">
                    <div className="flex max-md:flex-col  md:h-[600px] w-full  relative">
                        <div className="hidden md:flex md:fixed md:flex-col md:w-[400px] md:h-[600px] max-md:ml-0 max-md:w-full">
                            <video ref={participantVideo} onClick={playVideoPa} preload="metadata" class="md:rounded-s-[10px] bg-gray-900 object-cover max-md:scale-75 size-full"
                                src={`${showCase.video}`}
                            >
                            </video>
                            {!isPlayingPa && <svg onClick={playVideoPa} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[70px]  flex  cursor-pointer" width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z" fill="white" />
                                <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
                            </svg>}
                        </div>
                        <div className="flex flex-col  justify-self-end w-full ">
                            <div className="md:w-[calc(100%_-_400px)] h-full flex flex-col justify-self-start md:self-end justify-start  pt-6 rounded-none ">
                                <div className="flex gap-4 justify-between  w-full max-md:max-w-full px-4 mb-3">
                                    <div className="flex gap-4 justify-between font-light text-zinc-900">
                                        <img
                                            alt="avatar"
                                            loading="lazy"
                                            srcSet={showCase.user.image}
                                            className="shrink-0 w-16 h-16 aspect-square rounded-full"
                                        />
                                        <div className="flex flex-col py-1">
                                            <div className="text-base font-semibold">{showCase.user.nom} {showCase.user.prenom}</div>
                                            <div className="mt-1 text-xs">{showCase.user.profil}</div>
                                            <div className="mt-1 text-xs">{formatDate(showCase.createdAt)}</div>
                                        </div>
                                    </div>
                                    {isOwner(showCase.user.id) && <div className="relative flex gap-2 self-start py-2">
                                        <svg className={'pointer'} onClick={() => isOwner(showCase.user.id) == true ? setDropdown(showCase.user.id) : setDropdown(false)} width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_2800_8736)">
                                                <path d="M3.375 13C4.75571 13 5.875 11.8807 5.875 10.5C5.875 9.11929 4.75571 8 3.375 8C1.99429 8 0.875 9.11929 0.875 10.5C0.875 11.8807 1.99429 13 3.375 13Z" fill="#1D1E21" />
                                                <path d="M16.375 13C17.7557 13 18.875 11.8807 18.875 10.5C18.875 9.11929 17.7557 8 16.375 8C14.9943 8 13.875 9.11929 13.875 10.5C13.875 11.8807 14.9943 13 16.375 13Z" fill="#1D1E21" />
                                                <path d="M29.375 13C30.7557 13 31.875 11.8807 31.875 10.5C31.875 9.11929 30.7557 8 29.375 8C27.9943 8 26.875 9.11929 26.875 10.5C26.875 11.8807 27.9943 13 29.375 13Z" fill="#1D1E21" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2800_8736">
                                                    <rect width="31" height="21" fill="white" transform="translate(0.875)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        {dropdown == showCase.user.id ? (
                                            <div ref={myVideoRef} className="absolute top-4 right-5 mt-2 w-32 bg-white border rounded-md shadow-lg">
                                                <button
                                                    onClick={() => handleDelete(showCase.id)}
                                                    className="flex gap-1 items-center px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                                                >
                                                    {
                                                        getTranslation(
                                                            `Delete`,  // -----> Englais
                                                            `Supprimer`, //  -----> Francais
                                                            //   ``,  //  -----> Turkey
                                                            //   `` ,  //  -----> Allemagne
                                                        )
                                                    }
                                                </button>
                                            </div>
                                        ) : ''}
                                    </div>}
                                </div>
                                <div className="relative md:hidden flex md:fixed  md:flex-col w-[270px] h-[600px]  max-md:w-full">
                                    {!isPlayingPa && <svg onClick={playVideoPaMobile} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[70px]  flex  cursor-pointer" width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z" fill="white" />
                                        <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
                                    </svg>}
                                    <video ref={participantVideoMobile} onClick={playVideoPaMobile} preload="metadata" class="md:rounded-s-[10px] bg-gray-900 object-cover md:scale-75 size-full"
                                        src={`${showCase.video}#t=0.2`}
                                    >
                                    </video>
                                </div>
                                <div className="mx-4  text-base font-light text-zinc-900 max-md:mr-2.5 max-md:max-w-full">
                                    {showCase.description}
                                </div>
                                <div onClick={() => {
                                    NotificationService.instantSend(socket,
                                        {
                                            toUser_id: showCase.user.id,
                                            forWichAction: "voteChallenge",
                                            actionId: "0",
                                            postId: challengeId,
                                            content: challenges.name,
                                            postImage: showCase.video ? showCase.video : " "
                                        }
                                    )
                                    handleVote()
                                }} className={`flex cursor-pointer max-h-10 overflow-hidden justify-center items-center flex-col px-4 py-2 mx-2 md:mt-8 mt-2 text-base font-medium text-white whitespace-nowrap duration-500 rounded-[30px] ${!isVoted ? "bg-blue-600" : "bg-blue-200" } `}>
                                    <div style={{
                                        transition: ".2s",
                                        transform: !isVoted ? "translateY(33%)" : "translateY(-30%)"
                                    }}>
                                    <div className="flex gap-2">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a71ea75149c9710418976dfe985f413899a5dbaed4d67b4d3d9fb84cadc66712?"
                                            className="shrink-0 w-6 border-0 border-white border-solid aspect-[1.2] fill-white stroke-[0.4px] stroke-white"
                                        />

                                        
                                        <button >{
                                            getTranslation(
                                                `Vote`,  // -----> Englais
                                                `Voter`, //  -----> Francais
                                                //   ``,  //  -----> Turkey
                                                //   `` ,  //  -----> Allemagne
                                            )

                                        }</button>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.875 0H9.875C7.665 0 5.875 1.79 5.875 4V14C5.875 14.55 6.325 15 6.875 15H18.875C19.425 15 19.875 14.55 19.875 14V4C19.875 1.79 18.085 0 15.875 0ZM16.585 7.56L13.875 10.27C13.385 10.76 12.745 11 12.105 11C11.465 11 10.825 10.76 10.335 10.27L9.165 9.1C8.775 8.71 8.775 8.08 9.165 7.69C9.555 7.3 10.185 7.3 10.575 7.69L11.745 8.86C11.945 9.06 12.255 9.05 12.455 8.86L15.165 6.15C15.555 5.76 16.185 5.76 16.575 6.15C16.965 6.54 16.965 7.17 16.575 7.56H16.585ZM24.875 14V16C24.875 18.21 23.085 20 20.875 20H4.875C2.665 20 0.875 18.21 0.875 16V14C0.875 12.14 2.155 10.59 3.875 10.14V14C3.875 15.65 5.225 17 6.875 17H18.875C20.525 17 21.875 15.65 21.875 14V10.14C23.595 10.59 24.875 12.14 24.875 14Z" fill="#2E71EB" />
                                        </svg>
                                        <button className="text-blue-600">{
                                            getTranslation(
                                                `Voted`,  // -----> Englais
                                                `Voté`, //  -----> Francais
                                                //   ``,  //  -----> Turkey
                                                //   `` ,  //  -----> Allemagne
                                            )

                                        } </button>
                                    </div>
                                    </div>
                                </div> 
                                <div className="flex gap-5 justify-between px-4 mt-2 w-full text-base text-zinc-900 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                    <div className="flex w-full gap-5 justify-between whitespace-nowrap">
                                        <div className="flex gap-2 py-2">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class={`size-6 ${hasLiked ? 'text-orange-500' : ''}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
                                            <button onClick={
                                                () => {
                                                    NotificationService.instantSend(socket,
                                                        {
                                                            toUser_id: showCase.user.id,
                                                            forWichAction: "likeChallenge",
                                                            actionId: "0",
                                                            postId: challengeId,
                                                            content: challenges.name,
                                                            postImage: showCase.video ? showCase.video : " "
                                                        }
                                                    )
                                                    handleLike()
                                                }} className={`${hasLiked ? 'text-orange-500' : ''}`}>{
                                                    getTranslation(
                                                        `Like`,  // -----> Englais
                                                        `J’aime`, //  -----> Francais
                                                        //   ``,  //  -----> Turkey
                                                        //   `` ,  //  -----> Allemagne
                                                    )

                                                }</button>
                                        </div>
                                        {/* <div className="flex gap-2 py-2"> */}
                                        <div className="flex gap-2 py-2">
                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3686_67289)">
                                                    <path d="M16.6973 2.30069C15.6416 1.42219 14.4154 0.771861 13.096 0.390693C11.7765 0.00952499 10.3924 -0.0942237 9.03087 0.0859844C6.51209 0.413206 4.21225 1.68675 2.59832 3.64802C0.984402 5.60929 0.177381 8.11126 0.341127 10.6459C0.504872 13.1806 1.62711 15.5579 3.47997 17.2952C5.33283 19.0325 7.77742 19.9996 10.3174 20H16.1349C17.2394 19.9987 18.2983 19.5593 19.0793 18.7783C19.8604 17.9973 20.2997 16.9384 20.301 15.8339V9.42557V9.37308C20.2128 8.01113 19.8478 6.68148 19.2282 5.46545C18.6085 4.24941 17.7474 3.17254 16.6973 2.30069ZM6.96947 5.83522H10.3024C10.5233 5.83522 10.7353 5.923 10.8915 6.07926C11.0478 6.23552 11.1356 6.44746 11.1356 6.66844C11.1356 6.88943 11.0478 7.10136 10.8915 7.25762C10.7353 7.41388 10.5233 7.50166 10.3024 7.50166H6.96947C6.74849 7.50166 6.53656 7.41388 6.3803 7.25762C6.22404 7.10136 6.13625 6.88943 6.13625 6.66844C6.13625 6.44746 6.22404 6.23552 6.3803 6.07926C6.53656 5.923 6.74849 5.83522 6.96947 5.83522ZM13.6353 14.1674H6.96947C6.74849 14.1674 6.53656 14.0797 6.3803 13.9234C6.22404 13.7671 6.13625 13.5552 6.13625 13.3342C6.13625 13.1132 6.22404 12.9013 6.3803 12.745C6.53656 12.5888 6.74849 12.501 6.96947 12.501H13.6353C13.8562 12.501 14.0682 12.5888 14.2244 12.745C14.3807 12.9013 14.4685 13.1132 14.4685 13.3342C14.4685 13.5552 14.3807 13.7671 14.2244 13.9234C14.0682 14.0797 13.8562 14.1674 13.6353 14.1674ZM13.6353 10.8346H6.96947C6.74849 10.8346 6.53656 10.7468 6.3803 10.5905C6.22404 10.4342 6.13625 10.2223 6.13625 10.0013C6.13625 9.78035 6.22404 9.56841 6.3803 9.41215C6.53656 9.25589 6.74849 9.16811 6.96947 9.16811H13.6353C13.8562 9.16811 14.0682 9.25589 14.2244 9.41215C14.3807 9.56841 14.4685 9.78035 14.4685 10.0013C14.4685 10.2223 14.3807 10.4342 14.2244 10.5905C14.0682 10.7468 13.8562 10.8346 13.6353 10.8346Z" fill="#1D1E21" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3686_67289">
                                                        <rect width="19.9807" height="20" fill="white" transform="translate(0.320312)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <button onClick={() => setCommentShow(!commentShow)}> {
                                                getTranslation(
                                                    `Comment`,  // -----> Englais
                                                    `Commenter`, //  -----> Francais
                                                    //   ``,  //  -----> Turkey
                                                    //   `` ,  //  -----> Allemagne
                                                )

                                            }</button>
                                        </div>

                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-between items-center px-4 mt-2 w-full text-xs font-light whitespace-nowrap text-neutral-500 max-md:flex-wrap">
                                    <div onClick={() => handleClickVoteshow(showCase.id)} className="cursor-pointer relative flex gap-2.5 justify-center self-stretch py-2 my-auto">
                                        <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.125 0H7.625C5.9675 0 4.625 1.3425 4.625 3V10.5C4.625 10.9125 4.9625 11.25 5.375 11.25H14.375C14.7875 11.25 15.125 10.9125 15.125 10.5V3C15.125 1.3425 13.7825 0 12.125 0ZM12.6575 5.67L10.625 7.7025C10.2575 8.07 9.7775 8.25 9.2975 8.25C8.8175 8.25 8.3375 8.07 7.97 7.7025L7.0925 6.825C6.8 6.5325 6.8 6.06 7.0925 5.7675C7.385 5.475 7.8575 5.475 8.15 5.7675L9.0275 6.645C9.1775 6.795 9.41 6.7875 9.56 6.645L11.5925 4.6125C11.885 4.32 12.3575 4.32 12.65 4.6125C12.9425 4.905 12.9425 5.3775 12.65 5.67H12.6575ZM18.875 10.5V12C18.875 13.6575 17.5325 15 15.875 15H3.875C2.2175 15 0.875 13.6575 0.875 12V10.5C0.875 9.105 1.835 7.9425 3.125 7.605V10.5C3.125 11.7375 4.1375 12.75 5.375 12.75H14.375C15.6125 12.75 16.625 11.7375 16.625 10.5V7.605C17.915 7.9425 18.875 9.105 18.875 10.5Z" fill="#65676B" />
                                        </svg>

                                        <div>{vote}</div>
                                        {showDropdownVotes && userVote.length > 0 ? (<div ref={VoteModelRef} className="absolute  overflow-y-scroll hiddenScrollRightMenu translate-x-[38%] md:translate-x-4  top-0 md:top-0 z-[3] h-[180px] mt-4 md:mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                            <div className="py-2 px-4">
                                                <h3 className="md:text-lg text-md text-wrap w-[200px] md:w-[300px]   font-semibold">
                                                    {getTranslation(
                                                        `Who Voted for this post?`, // -----> Englais
                                                        `Qui a Voté sur cette publication?`, //  -----> Francais
                                                        ``, //  -----> Turkey
                                                        `` //  -----> Allemagne
                                                    )}
                                                </h3>
                                                <ul>
                                                    {userVote.map((like, index) => (
                                                        <li
                                                            key={index}
                                                            className="mt-1 py-2 flex flex-row  items-center"
                                                        >
                                                            <Link to={`/profile/${like.userId}`}>
                                                                <figure className="avatar me-3">
                                                                    <img
                                                                        srcSet={
                                                                            like?.user?.image
                                                                                ? like?.user?.image
                                                                                : placeholder
                                                                        }
                                                                        alt="avatar"
                                                                        // src={article?.user?.user??.image}
                                                                        className="shadow-sm rounded-full w-[32px] aspect-square"
                                                                    />{" "}
                                                                </figure>
                                                            </Link>
                                                            {like?.user?.nom} {like?.user?.prenom}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>) : ''}
                                    </div>
                                    <div onClick={() => handleClicklikeshow(showCase.id)} className="cursor-pointer relative flex gap-2.5 justify-center self-stretch py-2 my-auto">
                                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5665 0C11.8122 0.0117335 11.0743 0.222313 10.4274 0.610472C9.78043 0.998631 9.24737 1.55062 8.88203 2.21071C8.51669 1.55062 7.98363 0.998631 7.3367 0.610472C6.68977 0.222313 5.95187 0.0117335 5.19752 0C3.99498 0.0522469 2.862 0.578304 2.0461 1.46324C1.2302 2.34818 0.7977 3.52007 0.843087 4.72288C0.843087 9.26153 8.18264 14.5036 8.49482 14.726L8.88203 15L9.26924 14.726C9.58142 14.5049 16.921 9.26153 16.921 4.72288C16.9664 3.52007 16.5339 2.34818 15.718 1.46324C14.9021 0.578304 13.7691 0.0522469 12.5665 0Z" fill="#65676B" />
                                        </svg>

                                        <div>{likes}</div>

                                        {showDropdownlikes && userslikearticle.length > 0 ? (<div ref={likeModelRef} className="absolute overflow-y-scroll hiddenScrollRightMenu translate-x-0 md:translate-x-4 top-0 md:top-0 z-[3] h-[180px] mt-4 md:mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                            <div className="py-2 px-4">
                                                <h3 className="md:text-lg text-md text-wrap w-[200px] md:w-[300px]  font-semibold">
                                                    {getTranslation(
                                                        `Who liked this post?`, // -----> Englais
                                                        `Qui a aimé cette publication?`, //  -----> Francais
                                                        ``, //  -----> Turkey
                                                        `` //  -----> Allemagne
                                                    )}
                                                </h3>
                                                <ul>
                                                    {userslikearticle.map((like, index) => (
                                                        <li
                                                            key={index}
                                                            className="mt-1 py-2 flex flex-row  items-center"
                                                        >
                                                            <Link to={`/profile/${like.userId}`}>
                                                                <figure className="avatar me-3">
                                                                    <img
                                                                        srcSet={
                                                                            like?.user?.image
                                                                                ? like?.user?.image
                                                                                : placeholder
                                                                        }
                                                                        alt="avatar"
                                                                        // src={article?.user?.user??.image}
                                                                        className="shadow-sm rounded-full w-[32px] aspect-square"
                                                                    />{" "}
                                                                </figure>
                                                            </Link>
                                                            {like?.user?.nom} {like?.user?.prenom}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>) : ''}


                                    </div>
                                    <div className="flex gap-2.5 justify-center self-stretch py-2.5">
                                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_3620_18442)">
                                                <path d="M13.1734 1.72552C12.3816 1.06664 11.462 0.578896 10.4724 0.29302C9.48278 0.00714375 8.4447 -0.0706678 7.42354 0.0644883C5.53446 0.309904 3.80958 1.26506 2.59913 2.73601C1.38869 4.20696 0.783427 6.08345 0.906236 7.98444C1.02904 9.88544 1.87072 11.6684 3.26037 12.9714C4.65001 14.2744 6.48345 14.9997 8.38841 15H12.7516C13.58 14.999 14.3741 14.6695 14.9599 14.0837C15.5457 13.498 15.8752 12.7038 15.8762 11.8754V7.06918V7.02981C15.81 6.00835 15.5362 5.01111 15.0715 4.09908C14.6068 3.18706 13.9609 2.3794 13.1734 1.72552ZM5.8775 4.37641H8.37716C8.5429 4.37641 8.70185 4.44225 8.81905 4.55945C8.93624 4.67664 9.00208 4.83559 9.00208 5.00133C9.00208 5.16707 8.93624 5.32602 8.81905 5.44321C8.70185 5.56041 8.5429 5.62625 8.37716 5.62625H5.8775C5.71176 5.62625 5.55281 5.56041 5.43561 5.44321C5.31842 5.32602 5.25258 5.16707 5.25258 5.00133C5.25258 4.83559 5.31842 4.67664 5.43561 4.55945C5.55281 4.44225 5.71176 4.37641 5.8775 4.37641ZM10.8768 10.6256H5.8775C5.71176 10.6256 5.55281 10.5597 5.43561 10.4425C5.31842 10.3254 5.25258 10.1664 5.25258 10.0007C5.25258 9.83493 5.31842 9.67598 5.43561 9.55878C5.55281 9.44159 5.71176 9.37575 5.8775 9.37575H10.8768C11.0426 9.37575 11.2015 9.44159 11.3187 9.55878C11.4359 9.67598 11.5017 9.83493 11.5017 10.0007C11.5017 10.1664 11.4359 10.3254 11.3187 10.4425C11.2015 10.5597 11.0426 10.6256 10.8768 10.6256ZM10.8768 8.12591H5.8775C5.71176 8.12591 5.55281 8.06008 5.43561 7.94288C5.31842 7.82569 5.25258 7.66674 5.25258 7.501C5.25258 7.33526 5.31842 7.17631 5.43561 7.05912C5.55281 6.94192 5.71176 6.87608 5.8775 6.87608H10.8768C11.0426 6.87608 11.2015 6.94192 11.3187 7.05912C11.4359 7.17631 11.5017 7.33526 11.5017 7.501C11.5017 7.66674 11.4359 7.82569 11.3187 7.94288C11.2015 8.06008 11.0426 8.12591 10.8768 8.12591Z" fill="#65676B" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3620_18442">
                                                    <rect width="14.9855" height="15" fill="white" transform="translate(0.890625)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <div>{commentaire.length ? commentaire.length : 0}</div>
                                    </div>
                                </div>
                                <div className="overflow-x-hidden overflow-y-scroll max-h-[300px]">
                                    {commentShow && commentaire && commentaire.map((item, index) => {
                                        return (
                                            <div key={index} className="flex  px-2  gap-2 md:ml-4 mx-2 mt-2">
                                                <img
                                                    alt="cover"
                                                    loading="lazy"
                                                    srcSet={item.user.image}
                                                    className="bg-black shrink-0 relative inline-block object-cover aspect-square md:h-[64px] md:w-[64px] h-[38px] w-[38px] cursor-pointer rounded-full object-fit object-center"
                                                />
                                                <div className="w-full flex flex-col">
                                                    <div className="flex flex-col py-2 bg-zinc-100 rounded-[10px] w-full">
                                                        <div className="relative flex gap-4 justify-between px-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                                            <div className="flex flex-col py-1 font-light text-zinc-900">
                                                                <div className="text-sm font-semibold">{item.user.nom} {item.user.prenom}</div>
                                                                <div className="mt-1 text-xs">
                                                                    {item?.user?.profil === 'other' && item?.user?.other_user[0]?.profession}
                                                                    {item?.user?.profil === 'player' && 'Joueur'}
                                                                    {item?.user?.profil === 'agent' && item?.user?.agent_user[0]?.typeresponsable === 'players' && 'Manager de Joueur'}
                                                                    {item?.user?.profil === 'agent' && item?.user?.agent_user[0]?.typeresponsable === 'club' && 'Manager de Club'}
                                                                    {item?.user?.profil === 'scout' && 'Scout'}</div>
                                                                <div className="mt-1 text-[10px]">{moment(item?.createdAt).format('DD MMMM YYYY')} {'  -  '}
                                                                    {
                                                                        moment(item?.createdAt).isAfter(moment().subtract(1, 'hour')) ?
                                                                            moment(item?.createdAt).fromNow(true) :
                                                                            moment(item?.createdAt).fromNow()
                                                                    }</div>
                                                            </div>

                                                            {isOwner(item.user.id) && <svg onClick={() => isOwner(item.user.id) == true ? setDropdown(item) : setDropdown(false)} width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clip-path="url(#clip0_3670_67312)">
                                                                    <path d="M2.875 13C4.25571 13 5.375 11.8807 5.375 10.5C5.375 9.11929 4.25571 8 2.875 8C1.49429 8 0.375 9.11929 0.375 10.5C0.375 11.8807 1.49429 13 2.875 13Z" fill="#1D1E21" />
                                                                    <path d="M15.875 13C17.2557 13 18.375 11.8807 18.375 10.5C18.375 9.11929 17.2557 8 15.875 8C14.4943 8 13.375 9.11929 13.375 10.5C13.375 11.8807 14.4943 13 15.875 13Z" fill="#1D1E21" />
                                                                    <path d="M28.875 13C30.2557 13 31.375 11.8807 31.375 10.5C31.375 9.11929 30.2557 8 28.875 8C27.4943 8 26.375 9.11929 26.375 10.5C26.375 11.8807 27.4943 13 28.875 13Z" fill="#1D1E21" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_3670_67312">
                                                                        <rect width="31" height="21" fill="white" transform="translate(0.375)" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            }
                                                            {dropdown && dropdown.id == item.id && dropdown.user.id == storedUserData.id ? (
                                                                <div ref={EditDropDown} className="absolute top-4 right-5 mt-2 w-32 bg-white border rounded-md shadow-lg">
                                                                    <button
                                                                        onClick={() => handleEditComment(item)}
                                                                        className="flex gap-1 items-center px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                                                                    >
                                                                        {
                                                                            getTranslation(
                                                                                `Edit`,  // -----> Englais
                                                                                `Modifier`, //  -----> Francais
                                                                                //   ``,  //  -----> Turkey
                                                                                //   `` ,  //  -----> Allemagne
                                                                            )
                                                                        }
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteComment(item.id)}
                                                                        className="flex gap-1 items-center px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                                                                    >
                                                                        {
                                                                            getTranslation(
                                                                                `Delete`,  // -----> Englais
                                                                                `Supprimer`, //  -----> Francais
                                                                                //   ``,  //  -----> Turkey
                                                                                //   `` ,  //  -----> Allemagne
                                                                            )
                                                                        }
                                                                    </button>

                                                                </div>
                                                            ) : ''}

                                                        </div>
                                                        <div className="mt-2 text-break font-light text-zinc-900 px-4" >
                                                            {item.id === commentToEdit.id ? (
                                                                <textarea
                                                                    className="bg-gray-100 border-2 border-gray-300 rounded-[30px] px-3 py-2 w-full"
                                                                    style={{ resize: 'none', maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'none' }}
                                                                    value={editedComment}
                                                                    onChange={(e) => setEditedComment(e.target.value)}
                                                                ></textarea>
                                                            ) : (
                                                                <div className="text-wrap" style={{ resize: 'none', maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'none' }}
                                                                >
                                                                    {item.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {item.id === commentToEdit.id ? (
                                                            <div className="my-2 px-[26px] flex w-full justify-between">

                                                                <button className="bg-orange-500 rounded-[30px] px-2 py-1 md:py-1.5 text-white md:px-3" onClick={() => setCommentToEdit(false)}> {getTranslation(
                                                                    `Cancel`,  // -----> Englais
                                                                    `Annuler`, //  -----> Francais
                                                                )}</button>
                                                                <button className="bg-blue-600 rounded-[30px] py-0 px-2 md:py-1.5 text-white md:px-3" onClick={() => {
                                                                    submitUpdatedComment(item)
                                                                }
                                                                }>{getTranslation(
                                                                    `Update`,  // -----> Englais
                                                                    `Modifier`, //  -----> Francais
                                                                )}
                                                                </button>

                                                            </div>
                                                        ) : (
                                                            <div className="my-2 flex w-full justify-between">


                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-0  justify-between text-base text-zinc-900">

                                                        <div onClick={() => {
                                                            //notlike
                                                            NotificationService.instantSend(socket,
                                                                {
                                                                    toUser_id: item.userId,
                                                                    forWichAction: "likeCommentChallenge",
                                                                    actionId: "0",
                                                                    postId: challengeId,
                                                                    content: challenges.name,
                                                                    postImage: "postImage"
                                                                }
                                                            )
                                                            handleReplyLike(item.id)
                                                        }
                                                        } className={`flex items-center gap-2 py-2 whitespace-nowrap cursor-pointer`}>
                                                            <span className="flex flex-row items-center">
                                                                <BiSolidHeart className="size-5 " />
                                                                <div className="flex items-center gap-2">
                                                                    <span
                                                                        className="text-xs md:text-md"
                                                                        style={{
                                                                            marginLeft: "1px",
                                                                            marginTop: "2px",
                                                                            color: "#f97316",
                                                                        }}
                                                                    ></span>
                                                                </div>
                                                                <div className="flex-col mt-1 ml-2 text-sm ">
                                                                    {item.like.length}
                                                                </div>
                                                            </span>
                                                        </div>
                                                        {/* <div onClick={() => ReplyShow == false ? setReplyShow(item.id) : setReplyShow(false)} className="items-center cursor-pointer flex gap-2 py-2 whitespace-nowrap">
                                                            <svg className="size-5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clip-path="url(#clip0_3686_48176)">
                                                                    <path d="M16.6973 2.30069C15.6416 1.42219 14.4154 0.771861 13.096 0.390693C11.7765 0.00952499 10.3924 -0.0942237 9.03087 0.0859844C6.51209 0.413206 4.21225 1.68675 2.59832 3.64802C0.984402 5.60929 0.177381 8.11126 0.341127 10.6459C0.504872 13.1806 1.62711 15.5579 3.47997 17.2952C5.33283 19.0325 7.77742 19.9996 10.3174 20H16.1349C17.2394 19.9987 18.2983 19.5593 19.0793 18.7783C19.8604 17.9973 20.2997 16.9384 20.301 15.8339V9.42557V9.37308C20.2128 8.01113 19.8478 6.68148 19.2282 5.46545C18.6085 4.24941 17.7474 3.17254 16.6973 2.30069ZM6.96947 5.83522H10.3024C10.5233 5.83522 10.7353 5.923 10.8915 6.07926C11.0478 6.23552 11.1356 6.44746 11.1356 6.66844C11.1356 6.88943 11.0478 7.10136 10.8915 7.25762C10.7353 7.41388 10.5233 7.50166 10.3024 7.50166H6.96947C6.74849 7.50166 6.53656 7.41388 6.3803 7.25762C6.22404 7.10136 6.13625 6.88943 6.13625 6.66844C6.13625 6.44746 6.22404 6.23552 6.3803 6.07926C6.53656 5.923 6.74849 5.83522 6.96947 5.83522ZM13.6353 14.1674H6.96947C6.74849 14.1674 6.53656 14.0797 6.3803 13.9234C6.22404 13.7671 6.13625 13.5552 6.13625 13.3342C6.13625 13.1132 6.22404 12.9013 6.3803 12.745C6.53656 12.5888 6.74849 12.501 6.96947 12.501H13.6353C13.8562 12.501 14.0682 12.5888 14.2244 12.745C14.3807 12.9013 14.4685 13.1132 14.4685 13.3342C14.4685 13.5552 14.3807 13.7671 14.2244 13.9234C14.0682 14.0797 13.8562 14.1674 13.6353 14.1674ZM13.6353 10.8346H6.96947C6.74849 10.8346 6.53656 10.7468 6.3803 10.5905C6.22404 10.4342 6.13625 10.2223 6.13625 10.0013C6.13625 9.78035 6.22404 9.56841 6.3803 9.41215C6.53656 9.25589 6.74849 9.16811 6.96947 9.16811H13.6353C13.8562 9.16811 14.0682 9.25589 14.2244 9.41215C14.3807 9.56841 14.4685 9.78035 14.4685 10.0013C14.4685 10.2223 14.3807 10.4342 14.2244 10.5905C14.0682 10.7468 13.8562 10.8346 13.6353 10.8346Z" fill="#1D1E21" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_3686_48176">
                                                                        <rect width="19.9807" height="20" fill="white" transform="translate(0.320312)" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            <div className="w-20 font-semibold flex gap-2 text-xs md:text-md">Répondre</div>
                                                        </div> */}
                                                    </div>
                                                    {/* {ReplyShow && ReplyShow == item.id ?
                                                        <>
                                                            {commentaire && item.replies.length > 0 && item.replies.map((item, index) => {
                                                                <>
                                                                    <div key={index} className="flex  px-2  gap-2 md:ml-4 mx-2 mt-2">
                                                                        <img
                                                                            alt="cover"
                                                                            loading="lazy"
                                                                            srcSet={item?.user?.image}
                                                                            className="bg-black shrink-0 relative inline-block object-cover aspect-square md:h-[64px] md:w-[64px] h-[38px] w-[38px] cursor-pointer rounded-full object-fit object-center"
                                                                        />
                                                                        <div className="w-full flex flex-col">
                                                                            <div className="flex flex-col py-2 bg-zinc-100 rounded-[10px] w-full">
                                                                                <div className="relative flex gap-4 justify-between px-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                                                                    

                                                                                </div>
                                                                                <div className="px-4 text-break mt-2 w-full text-sm font-light text-zinc-900 max-md:mr-2.5 max-md:max-w-full">
                                                                                    {item.description}
                                                                                </div>
                                                                                {item.id === commentToEdit.id ? (
                                                                                    <div className="my-2 px-[26px] flex w-full justify-between">

                                                                                        <button className="bg-orange-500 rounded-[30px] px-2 py-1 md:py-1.5 text-white md:px-3" onClick={() => setCommentToEdit(false)}> {getTranslation(
                                                                                            `Cancel`,  // -----> Englais
                                                                                            `Annuler`, //  -----> Francais
                                                                                        )}</button>
                                                                                        <button className="bg-blue-600 rounded-[30px] py-0 px-2 md:py-1.5 text-white md:px-3" onClick={() => {
                                                                                            console.log('ok')
                                                                                        }
                                                                                        }>Modifier</button>

                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="my-2 flex w-full justify-between">


                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex gap-0  justify-between text-base text-zinc-900">
                                                                                <div className="flex items-center gap-2 py-2 whitespace-nowrap cursor-pointer">
                                                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="size-6 text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
                                                                                    <div className="text-orange-500 w-20 font-semibold flex gap-2 text-xs">J’aime</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </>
                                                            })}
                                                            <div className="flex items-center gap-3 mt-3 py-2">
                                                                <img
                                                                    src={
                                                                        showCase.user.image ? showCase.user?.image : placeholder
                                                                    }
                                                                    className="shadow-sm rounded-full  shrink-0 md:h-[64px] md:w-[64px] h-[38px] w-[38px] object-cover"
                                                                    alt="post"
                                                                />
                                                                <div className="flex flex-col w-full">
                                                                    <div className="w-full flex items-center">
                                                                        <input
                                                                            type="text"
                                                                            value={ReplyText}
                                                                            onChange={(e) => setReplyText(e.target.value)}
                                                                            placeholder="Ecrire un commentaire .."
                                                                            className="w-full bg-gray-100 rounded-[30px] px-2 mr-3 h-12"
                                                                        />
                                                                        <button
                                                                            className="ml-2"
                                                                            onClick={() => handleReply(item.id, ReplyText)}
                                                                        >
                                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M0.141013 3.09153C-0.18232 2.20653 0.0610132 1.22653 0.761847 0.595693C1.46101 -0.0326407 2.45685 -0.174307 3.30185 0.236526L18.3768 7.27319C19.1852 7.65153 19.7635 8.34236 19.9977 9.16736H3.37101L0.188513 3.19736C0.171013 3.16319 0.15518 3.12736 0.141013 3.09153ZM3.38268 10.8349L0.25518 16.814C0.23768 16.8474 0.22268 16.8807 0.21018 16.9157C-0.11232 17.8015 0.133513 18.7799 0.834347 19.4099C1.26851 19.799 1.81685 19.9999 2.36851 19.9999C2.70935 19.9999 3.05101 19.9232 3.36935 19.7674L18.3785 12.7357C19.1893 12.3557 19.7668 11.6624 19.9993 10.8357H3.38268V10.8349Z" fill="#2E71EB" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>



                                                        : ''} */}
                                                </div>

                                            </div>)
                                    })}

                                </div>
                                <div className="flex items-center gap-3 px-3 mt-3 py-2">

                                    <img
                                        src={
                                            storedUserData.image ? storedUserData.image : placeholder
                                        }
                                        className="shadow-sm rounded-full  shrink-0 md:h-[64px] md:w-[64px] h-[38px] w-[38px] object-cover"
                                        alt="post"
                                    />
                                    <div className="flex flex-col w-full">
                                        <div className="w-full flex items-center">
                                            <input
                                                type="text"
                                                value={commentairetext}
                                                onChange={(e) => setCommentairetext(e.target.value)}
                                                placeholder="Ecrire un commentaire .."
                                                className="w-full bg-gray-100 rounded-[30px] px-2 mr-3 h-12"
                                            />
                                            <button
                                                className="ml-2"
                                                onClick={
                                                    () => {
                                                        //notlike
                                                        NotificationService.instantSend(socket,
                                                            {
                                                                toUser_id: showCase.user.id,
                                                                forWichAction: "commentChallenge",
                                                                actionId: "0",
                                                                postId: challengeId,
                                                                content: challenges.name,
                                                                postImage: showCase.video ? showCase.video : " "
                                                            }
                                                        )
                                                        handleCommentaire()
                                                    }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.141013 3.09153C-0.18232 2.20653 0.0610132 1.22653 0.761847 0.595693C1.46101 -0.0326407 2.45685 -0.174307 3.30185 0.236526L18.3768 7.27319C19.1852 7.65153 19.7635 8.34236 19.9977 9.16736H3.37101L0.188513 3.19736C0.171013 3.16319 0.15518 3.12736 0.141013 3.09153ZM3.38268 10.8349L0.25518 16.814C0.23768 16.8474 0.22268 16.8807 0.21018 16.9157C-0.11232 17.8015 0.133513 18.7799 0.834347 19.4099C1.26851 19.799 1.81685 19.9999 2.36851 19.9999C2.70935 19.9999 3.05101 19.9232 3.36935 19.7674L18.3785 12.7357C19.1893 12.3557 19.7668 11.6624 19.9993 10.8357H3.38268V10.8349Z" fill="#2E71EB" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            /* desktop view */
        }
        <div className="col-span-3 flex flex-col ">
            <Link to="/challenges">   <div className="md:hidden flex gap-2 justify-center px-8 py-2 text-base font-medium text-white bg-orange-500 rounded-[30px]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9336 18.7504C14.9333 18.419 14.8014 18.1013 14.5669 17.8671L8.17359 11.4738C7.98008 11.2803 7.82657 11.0506 7.72184 10.7978C7.61711 10.545 7.56321 10.2741 7.56321 10.0004C7.56321 9.72679 7.61711 9.45584 7.72184 9.20304C7.82657 8.95024 7.98008 8.72055 8.17359 8.52709L14.5586 2.13792C14.7863 1.90217 14.9123 1.58642 14.9094 1.25867C14.9066 0.930924 14.7751 0.617408 14.5434 0.385648C14.3116 0.153888 13.9981 0.0224265 13.6703 0.0195785C13.3426 0.0167305 13.0268 0.142723 12.7911 0.370421L6.40609 6.75459C5.54756 7.61481 5.06539 8.7805 5.06539 9.99584C5.06539 11.2112 5.54756 12.3769 6.40609 13.2371L12.7994 19.6304C12.974 19.8051 13.1964 19.9242 13.4386 19.9726C13.6807 20.021 13.9318 19.9966 14.1601 19.9024C14.3884 19.8083 14.5837 19.6486 14.7214 19.4436C14.859 19.2386 14.9329 18.9974 14.9336 18.7504Z" fill="white" />
                </svg>

                <div>{
                    getTranslation(
                        `Back to Challenge`,  // -----> Englais
                        `Revenir au challenge`, //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                    )

                } </div>
            </div></Link>
            <div className="flex flex-col mt-3 md:mt-0 px-8 py-10 bg-white rounded-[10px]  col-span-2">
                <div className="flex overflow-hidden relative flex-col justify-center items-center">
                    <video style={{

}} onClick={playVideo}  class="object-cover w-full h-[320px] aspect-square"
                        src={`${challenges.video}`}
                    >
                    </video>
                    {!isPlaying && <svg onClick={playVideo} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[40px]  flex  cursor-pointer" width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z" fill="white" />
                        <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
                    </svg>}
                </div>



                <div className="flex flex-wrap items-center  justify-between mt-4 text-zinc-900">
                    <div className="my-auto text-2xl font-bold px-2">{challenges.name}</div>
                    <div className="  flex max-sm:w-full max-sm:mb-2 items-center  py-2 px-3 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-200">
                        <div className="flex gap-2  items-center">
                            {/* <div>{challenges.startDate}</div> */}
                            <Timer startDate={challenges.startDate} endDate={challenges.endDate} setExpired={setExpired} />
                        </div>
                    </div>
                </div>



                {/* <div className="flex gap-4  justify-between  mt-4 text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                    <div className="my-auto text-2xl font-bold  px-2" >{challenges.name}</div>
                    <div className="mb-4  flex flex-col justify-center py-2 px-3 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-200">
                        <div className="flex gap-2 justify-center items-center">


                            <Timer startDate={challenges.startDate} endDate={challenges.endDate} setExpired={setExpired} />
                        </div>
                    </div>
                </div> */}
                {hasParticipated && !expired ? <div className="flex justify-center items-center md:mt-4 font-medium">
                    <div onClick={() => setDelete(true)} className="w-full flex justify-center items-center px-6 py-2 text-base font-medium text-white bg-orange-500  rounded-[30px] max-md:px-5">
                        <button className="flex items-center gap-2" >
                            <svg width="10" height="10" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z" fill="white" />
                            </svg>
                            {
                                getTranslation(
                                    `Cancel your participation !`,  // -----> Englais
                                    `Annuler la participation ! `, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )
                            }
                        </button>
                    </div>
                </div> :
                    <div className="flex justify-center items-center px-6 py-2 mt-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-2">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_171_1899)">
                                    <path d="M19.25 2.5C18.56 2.5 18 3.06 18 3.75V9.16667C18 9.62667 17.6267 10 17.1667 10C16.7067 10 16.3333 9.62667 16.3333 9.16667V2.08333C16.3333 1.39333 15.7733 0.833333 15.0833 0.833333C14.3933 0.833333 13.8333 1.39333 13.8333 2.08333V9.16667C13.8333 9.62667 13.46 10 13 10C12.54 10 12.1667 9.62667 12.1667 9.16667V1.25C12.1667 0.56 11.6067 0 10.9167 0C10.2267 0 9.66667 0.56 9.66667 1.25V9.16667C9.66667 9.62667 9.29334 10 8.83334 10C8.37334 10 8.00001 9.62667 8.00001 9.16667V2.98333C8.00001 2.36083 7.57417 1.78333 6.96001 1.68333C6.17667 1.55583 5.50001 2.15667 5.50001 2.91583V13.4608L3.32917 11.2525C3.25584 11.1792 3.12917 11.085 2.96167 10.975C2.25917 10.5833 1.33334 10.7383 0.808339 11.4425C0.305006 12.1175 0.444172 13.08 1.03834 13.6758L3.97417 16.705C6.01501 18.8108 8.82167 19.9992 11.7533 19.9992H13.8325C17.5142 19.9992 20.4992 17.0142 20.4992 13.3325V3.75C20.4992 3.06 19.94 2.5 19.25 2.5Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_171_1899">
                                        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {expired ? <div> {
                                getTranslation(
                                    `Challenge completed!`,  // -----> Englais
                                    `Challenge terminé!`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            } </div> : <button onClick={() => setIsOpen(true)}>  {
                                getTranslation(
                                    `Participate`,  // -----> Englais
                                    `Participer`, //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                )

                            } </button>}
                        </div>
                    </div>
                }
            </div>
        </div>
        <div className="flex flex-col p-6 bg-white rounded-[10px] max-md:px-5 col-span-3">
            <div className="flex gap-2.5 self-start px-6 text-xl md:text-2xl font-bold text-zinc-900 max-md:px-5">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_926_65157)">
                        <path d="M29.6331 2.11844L17.1331 14.6184C16.8894 14.8622 16.5694 14.9847 16.2494 14.9847C15.9294 14.9847 15.6094 14.8622 15.3656 14.6184C14.8769 14.1297 14.8769 13.3397 15.3656 12.8509L27.8656 0.350938C28.3544 -0.137813 29.1444 -0.137813 29.6331 0.350938C30.1219 0.839688 30.1219 1.62969 29.6331 2.11844ZM9.99937 11.2347C10.3194 11.2347 10.6394 11.1122 10.8831 10.8684L17.1331 4.61844C17.6219 4.12969 17.6219 3.33969 17.1331 2.85094C16.6444 2.36219 15.8544 2.36219 15.3656 2.85094L9.11562 9.10094C8.62687 9.58969 8.62687 10.3797 9.11562 10.8684C9.35937 11.1122 9.67937 11.2347 9.99937 11.2347ZM25.3656 12.8509L19.1156 19.1009C18.6269 19.5897 18.6269 20.3797 19.1156 20.8684C19.3594 21.1122 19.6794 21.2347 19.9994 21.2347C20.3194 21.2347 20.6394 21.1122 20.8831 20.8684L27.1331 14.6184C27.6219 14.1297 27.6219 13.3397 27.1331 12.8509C26.6444 12.3622 25.8544 12.3622 25.3656 12.8509ZM13.7494 19.9847H9.99812L8.67062 16.4197C8.48812 15.9309 8.02062 15.6059 7.49937 15.6059C6.97812 15.6059 6.50937 15.9309 6.32812 16.4197L5.00062 19.9847H1.24937C0.725623 19.9847 0.256873 20.3122 0.0768732 20.8034C-0.104377 21.2959 0.0418732 21.8472 0.441873 22.1872L3.41312 24.6047L2.23687 28.3747C2.07812 28.8809 2.25562 29.4322 2.67937 29.7509C2.90062 29.9172 3.16437 30.0009 3.42937 30.0009C3.67187 30.0009 3.91437 29.9309 4.12437 29.7897L7.50937 27.5247L10.9519 29.7659C11.3956 30.0547 11.9756 30.0322 12.3969 29.7084C12.8181 29.3847 12.9881 28.8297 12.8206 28.3259L11.5969 24.6009L14.5544 22.1922C14.9556 21.8534 15.1031 21.3009 14.9231 20.8072C14.7431 20.3134 14.2731 19.9847 13.7494 19.9847Z" fill="#2E71EB" />
                    </g>
                    <defs>
                        <clipPath id="clip0_926_65157">
                            <rect width="30" height="30" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <div>  {
                    getTranslation(
                        `Challenge Showcase`,  // -----> Englais
                        `Galerie Challenge `, //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                    )
                } </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3  flex-wrap gap-y-6 justify-between content-start mt-6 max-md:max-w-full">
                {(rerangeparticipants && rerangeparticipants?.length > 0) ? rerangeparticipants?.map((item, index) => (
                    <ParticipantCard isOwner={isOwner} item={item} index={index} expired={expired} getTranslation={getTranslation} openModel={openModel} />
                )) : (
                    <p>{getTranslation(`Be the first to participate!`, `Soyez le premier à participer!`)}</p>
                )}
            </div>
        </div>
    </>
    )


}
export default ChallengeDetais