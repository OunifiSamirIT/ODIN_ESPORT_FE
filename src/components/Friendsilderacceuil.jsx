import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Config } from '../config';
function FriendsSlider() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users error');
                }
                const data = await response.json();
                setAgents(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const friendSettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
    };

    const sliderRef = React.createRef();

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="flex flex-col mt-6 ml-1 w-full bg-white rounded-md shadow-sm">
            {/* <div className="flex gap-2 justify-between px-6 pt-4 max-md:px-5">
                <div className="text-lg font-bold text-zinc-900">
                    Personnes que
                    vous pourriez
                    connaître
                </div>
              
            </div> */}
            {/* <div className="flex justify-between items-center px-6 pt-0 max-md:px-5">
                <div className="text-lg font-bold text-zinc-900">
                    Personnes que
                    vous pourriez
                    connaître
                </div>
                <div className="flex">
                    <div className="text-sm  mx-1 font-medium text-blue-600">
                        <a href=""> Voir</a>
                    </div>
                    <div className="text-sm font-medium text-blue-600 ">
                        <a href="">
                            Tout
                        </a>
                    </div>
                </div>
            </div> */}
            <div className="flex  justify-between items-center pr-2 pl-1 mt-3">
                <button onClick={prevSlide} className="prev-slide-button text-2xl">&#10094;</button>  <Slider ref={sliderRef} style={{ width: '93%' }} {...friendSettings}>
                    {agents.map((value, index) => (
                        <div key={index} className="card w150 d-block border-0 bg-gray-100  rounded-3 overflow-hidden mb-3 me-3 ">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center w-100 ps-3 pe-3 pb-4 text-center">
                                <Link to={`/profile/${value.id}`}>
                                    <figure className="avatar mb-1  d-flex justify-content-center align-items-center">
                                        <img src={value.image} alt="avater" className="shadow-sm rounded-circle w-16 h-16" />
                                    </figure>
                                </Link>
                                <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {value.nom} {value.prenom} </h4>
                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{value.profil}</p>
                                <a href={`/profile/${value.id}`} className=" justify-center px-6 py-2  text-white text-center bg-blue-600 rounded-[30px] max-md:px-5">Voir Profil</a>
                            </div>
                        </div>
                    ))}
                </Slider>

                <button onClick={nextSlide} className="next-slide-button text-2xl">&#10095;</button>
            </div>
        </div>
    );
}

export default FriendsSlider;
