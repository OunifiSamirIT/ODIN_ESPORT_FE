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
const ChallengeDetais = () => {
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
    const [deleted, setDelete] = useState(false)
    const [connectedParticipant, setConnectedParticipant] = useState(null);
    const [matchingChallenge, setMatchingChallenge] = useState(null);
    const [rerangeparticipants, setreRangeParticipants] = useState([]);

    const video = useRef();
    const playVideo = () => {
        if (isPlaying) {
            video.current.pause();
        } else {
            video.current.play();
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
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            console.log(!ref.current.contains(event.target))
            setIsOpen(false)
            setShowCase(false)
        }
        if (ref2.current && !ref2.current.contains(event.target)) {
            console.log(!ref2.current.contains(event.target))
            setDelete(false)
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

    const fetchCommentaire = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/commentaire/fetch/${showCase.id}`)
        const result = await response.json()
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
    const [likes, setLikes] = useState(0)
    const [vote, setVote] = useState(0)

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
    const handleLike = async () => {
        console.log('liked')
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
        setLikes(result.like)
        setHasLiked(result.hasLiked ? true : false)
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
        setIsVoted(result.res)
        setVote(item.votes)
        setLikes(item.likes)
        setShowCase(item)
    }
    const [videoName, setVideoName] = useState()
    return (<>

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
                                <input type="file" name="video" {...register("video")} onChange={(e) => setVideoName(e.target.files[0].name)} className="top-0 opacity-0 absolute flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5" />

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
                        <div className="flex flex-col">
                            <div className="flex gap-2 justify-center self-center px-8 py-2 mt-8 font-medium bg-blue-500 text-white whitespace-nowrap border-2 border-blue-500 border-solid rounded-[30px] max-md:px-5">
                                <button type="submit" disabled={loading}> {loading ? loading :
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
            showCase && <div className="bg-black/70  fixed inset-0  z-50 h-full w-full  overflow-hidden flex justify-center items-center px-4 md:px-8 ">
                <div ref={ref} className="flex flex-col  max-w-full  bg-white rounded-[10px] w-[936px] overflow-hidden">
                    <div className="">
                        <div className="flex max-md:flex-col w-full  relative">
                            <div className=" flex fixed flex-col w-[400px] h-[600px] max-md:ml-0 max-md:w-full">
                                <video onClick={playVideo} preload="metadata" class="rounded-s-[10px] bg-gray-900 object-cover max-md:scale-75 size-full"
                                    src={`${showCase.video}#t=0.2`}
                                >
                                </video>
                                {!isPlaying && <svg onClick={playVideo} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[70px]  flex  cursor-pointer" width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z" fill="white" />
                                    <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
                                </svg>}
                            </div>
                            <div className="flex flex-col justify-self-end w-full">
                                <div className="h-[600px] overflow-hidden px-2  w-[calc(100%_-_400px)] flex flex-col justify-self-start self-end justify-start  pt-6 rounded-none ">
                                    <div className="flex gap-4 justify-between  w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                        <div className="flex gap-4 justify-between font-light text-zinc-900">
                                            <img
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
                                        <div className="relative flex gap-2 self-start py-2">
                                            <svg className={'pointer'} onClick={() => isOwner(showCase.user.id) == true ? setDropdown(!dropdown) : setDropdown(false)} width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                                            {dropdown ? (
                                                <div className="absolute top-4 right-5 mt-2 w-32 bg-white border rounded-md shadow-lg">
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
                                        </div>
                                    </div>
                                    <div className="mx-8 mt-4 text-base font-light text-zinc-900 max-md:mr-2.5 max-md:max-w-full">
                                        {showCase.description}
                                    </div>
                                    {!isVoted ? <div onClick={handleVote} className="flex cursor-pointer justify-center items-center px-8 py-2 mx-8 mt-8 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
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
                                    </div> : <div onClick={handleVote} className="flex cursor-pointer justify-center items-center px-8 py-2 mx-8 mt-8 text-base font-medium text-blue-600 border-2 border-blue-600 whitespace-nowrap bg-white rounded-[30px] max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
                                        <div className="flex gap-2">
                                            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.875 0H9.875C7.665 0 5.875 1.79 5.875 4V14C5.875 14.55 6.325 15 6.875 15H18.875C19.425 15 19.875 14.55 19.875 14V4C19.875 1.79 18.085 0 15.875 0ZM16.585 7.56L13.875 10.27C13.385 10.76 12.745 11 12.105 11C11.465 11 10.825 10.76 10.335 10.27L9.165 9.1C8.775 8.71 8.775 8.08 9.165 7.69C9.555 7.3 10.185 7.3 10.575 7.69L11.745 8.86C11.945 9.06 12.255 9.05 12.455 8.86L15.165 6.15C15.555 5.76 16.185 5.76 16.575 6.15C16.965 6.54 16.965 7.17 16.575 7.56H16.585ZM24.875 14V16C24.875 18.21 23.085 20 20.875 20H4.875C2.665 20 0.875 18.21 0.875 16V14C0.875 12.14 2.155 10.59 3.875 10.14V14C3.875 15.65 5.225 17 6.875 17H18.875C20.525 17 21.875 15.65 21.875 14V10.14C23.595 10.59 24.875 12.14 24.875 14Z" fill="#2E71EB" />
                                            </svg>

                                            <button >{
                                                getTranslation(
                                                    `Voted`,  // -----> Englais
                                                    `Voté`, //  -----> Francais
                                                    //   ``,  //  -----> Turkey
                                                    //   `` ,  //  -----> Allemagne
                                                )

                                            } </button>
                                        </div>
                                    </div>}
                                    <div className="flex gap-5 justify-between px-4 mt-2 w-full text-base text-zinc-900 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                        <div className="flex w-full gap-5 justify-between whitespace-nowrap">
                                            <div className="flex gap-2 py-2">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class={`size-6 ${hasLiked ? 'text-orange-500' : ''}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
                                                <button onClick={handleLike} className={`${hasLiked ? 'text-orange-500' : ''}`}>{
                                                    getTranslation(
                                                        `Like`,  // -----> Englais
                                                        `J’aime`, //  -----> Francais
                                                        //   ``,  //  -----> Turkey
                                                        //   `` ,  //  -----> Allemagne
                                                    )

                                                }</button>
                                            </div>
                                            {/* <div className="flex gap-2 py-2"> */}
                                            <button onClick={() => setCommentShow(!commentShow)}> {
                                                getTranslation(
                                                    `Comment`,  // -----> Englais
                                                    `Commenter`, //  -----> Francais
                                                    //   ``,  //  -----> Turkey
                                                    //   `` ,  //  -----> Allemagne
                                                )

                                            }</button>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-between items-center px-4 mt-2 w-full text-xs font-light whitespace-nowrap text-neutral-500 max-md:flex-wrap">
                                        <div className="flex gap-2.5 justify-center self-stretch py-2 my-auto">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2850b72d42d16c20987b2fcb06ac06c9c7ed810aa09222a1054133ca9af85431?"
                                                className="shrink-0 aspect-[1.2] fill-neutral-500 w-[18px]"
                                            />
                                            <div>{vote}</div>
                                        </div>
                                        <div className="flex gap-2.5 justify-center self-stretch py-2 my-auto">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca900fab50b2b468e8a7b00673066a6615d58962b5c0bcaea8a361061df6419c?"
                                                className="shrink-0 w-4 aspect-[1.06] fill-neutral-500"
                                            />
                                            <div>{likes}</div>
                                        </div>
                                        <div className="flex gap-2.5 justify-center self-stretch py-2.5">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd4a5d4d8ba91485509ea1f29dd98bcf5daf7700fe8f87fd6bc1d0a3a41e3aa4?"
                                                className="shrink-0 aspect-square fill-neutral-500 w-[15px]"
                                            />
                                            <div>{commentaire.length ? commentaire.length : 0}</div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-hidden overflow-y-scroll">
                                        {commentShow && commentaire && commentaire.map((item, index) => {
                                            return (<div key={index} className="flex gap-4 ml-4 max-md:flex-wrap mt-2">
                                                <img
                                                    loading="lazy"
                                                    srcSet={item.user.image}
                                                    className="relative inline-block object-cover aspect-square h-[44px] w-[44px] cursor-pointer rounded-full object-fit object-center"
                                                />
                                                <div className="flex flex-col py-2 bg-gray-100 rounded-[10px] w-full">
                                                    <div className="flex gap-4 justify-between px-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                                        <div className="flex flex-col py-1 font-light text-zinc-900">
                                                            <div className="text-sm font-semibold">{item.user.nom} {item.user.prenom}</div>
                                                            <div className="mt-1 text-xs">{item.user.profil}</div>
                                                            <div className="mt-1 text-[10px]">{formatDate(item.user.createdAt)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mx-6 mt-2 w-full text-sm font-light text-zinc-900 max-md:mr-2.5 max-md:max-w-full">
                                                        {item.description}
                                                    </div>
                                                    <div className="flex gap-4 px-8 mt-2 text-xs font-light whitespace-nowrap text-neutral-500 max-md:flex-wrap max-md:px-5">
                                                        <div className="flex gap-2.5 justify-center py-2 my-auto">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a84afc604ca91e0f00c1288ce83681cac43b37bfbe73017407a307bd527daae?"
                                                                className="shrink-0 w-4 aspect-[1.06] fill-neutral-500"
                                                            />
                                                            <div>248</div>
                                                        </div>
                                                        <div className="flex gap-2.5 justify-center py-2.5">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba52ed5ec87491c741e3910210198c2bbb8a9fca456b41b985e1508bc5d17982?"
                                                                className="shrink-0 aspect-square fill-neutral-500 w-[15px]"
                                                            />
                                                            <div>12</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        })}

                                    </div>

                                    <div className="flex items-center gap-3 px-3 mt-3 py-2">
                                        <img
                                            src={
                                                showCase.user.image ? showCase.user?.image : placeholder
                                            }
                                            className="shadow-sm rounded-full w-[44px] h-[44px] object-cover "
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
                                                    onClick={handleCommentaire}
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
            </div>
        }

        <div className="col-span-3 flex flex-col gap-y-4">
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
            <div className="flex flex-col px-8 py-10  bg-white rounded-[10px]  col-span-2">
                <div className="flex overflow-hidden relative flex-col justify-center items-center">
                    <video onClick={playVideo} ref={video} class="object-cover w-full h-[320px] aspect-square"
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
                {hasParticipated ? <div className="flex justify-center items-center md:mt-4 font-medium">
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
                                    `Challenge terminer`, //  -----> Francais
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





            <div className="grid grid-cols-1 md:grid-cols-3 gap-5  flex-wrap gap-y-6 justify-between content-start mt-6 max-md:max-w-full">
                {/* Afficher le participant trouvé */}


                {/* Afficher tous les autres participants */}
                {(rerangeparticipants && rerangeparticipants?.length > 0) ? rerangeparticipants?.map((item, index) => (
                    <div key={index} className="relative">
                        <div onClick={() => openModel(item)} className="max-md:flex-col max-md:gap-0 relative">
                            <div className="flex flex-col  max-md:ml-0 max-md:w-full rounded-[10px] overflow-hidden">
                                <div className="relative flex flex-col grow justify-center text-base text-white">
                                    <div className="flex  relative flex-col h-full w-full aspect-[0.78]">
                                        <video preload="metadata" className="h-full object-cover absolute inset-0 size-full" src={`${item.video}#t=0.2`}></video>
                                    </div>
                                </div>
                                <div className={`${isOwner(item.userId) && !expired ? '' : 'hidden'} border-3 border-orange-new rounded-[10px]  absolute top-0 bg-gradient-to-t from-orange-new from-0%  to-transparent to-30% w-full h-full`}></div>
                                <div className={`${expired && index < 3 ? '' : 'hidden'} border-3 border-blue-500 rounded-[10px]  absolute top-0 bg-gradient-to-t from-blue-500 from-0%  to-transparent to-30% w-full h-full`}></div>

                                <div className="absolute bottom-0 p-4 flex items-center gap-2 flex w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.5 11H21V4.5C21 2.57 19.43 1 17.5 1H8.5C6.57 1 5 2.57 5 4.5V11H4.5C2.57 11 1 12.57 1 14.5V17.5C1 19.43 2.57 21 4.5 21H21.5C23.43 21 25 19.43 25 17.5V14.5C25 12.57 23.43 11 21.5 11ZM6 4.5C6 3.12 7.12 2 8.5 2H17.5C18.88 2 20 3.12 20 4.5V16H6V4.5ZM24 17.5C24 18.88 22.88 20 21.5 20H4.5C3.12 20 2 18.88 2 17.5V14.5C2 13.12 3.12 12 4.5 12H5V16.5C5 16.78 5.22 17 5.5 17H20.5C20.78 17 21 16.78 21 16.5V12H21.5C22.88 12 24 13.12 24 14.5V17.5ZM9.2 9.8C9 9.6 9 9.29 9.2 9.09C9.4 8.89 9.71 8.89 9.91 9.09L11.53 10.71C11.92 11.1 12.56 11.1 12.94 10.71L16.57 7.08C16.77 6.88 17.08 6.88 17.28 7.08C17.48 7.28 17.48 7.59 17.28 7.79L13.65 11.42C13.27 11.8 12.77 12.01 12.24 12.01C11.71 12.01 11.2 11.8 10.83 11.42L9.21 9.8H9.2Z" fill="white" stroke="white" stroke-width="0.4" />
                                        </svg>
                                        <div className="text-white">{item.votes > 0 ? item.votes : 0} {getTranslation(`Votes`, `Votes `)}</div>
                                    </div>
                                    {isOwner(item.userId) && <div className="text-white">Ma Vidéo</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p>{getTranslation(`Be the first to participate!`, `Soyez le premier à participer! `)}</p>
                )}
            </div>


        </div>
    </>
    )


}
export default ChallengeDetais