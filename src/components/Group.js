import React,{Component, useEffect, useState} from 'react';
import Pagetitle from '../components/Pagetitle';
import Load from '../components/Load';

const groupList = [
    {
        imageUrl: 'story.png',
        name: 'Studio Express',
        friend: '12',
    },
    {
        imageUrl: 'story.png',
        name: 'Armany Design',
        friend: '18',
    },
]

function Group () {

    const [album, setAlbum] = useState([]);


    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch("https://odine-sport.com/api/album");
                const result = await response.json();

                setAlbum(result.data);

                console.log(album);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchAlbums()
    }, [])  
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Gallerie Albums</h4>
                    <a href="/odin/album" className="fw-600 ms-auto font-xssss text-primary">Voir Tous</a>
                </div>
                {/* {groupList.map((value , index) => (
                <div className="wrap" key={index}>
                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 overflow-hidden  bor-0">
                        <img src={`assets/images/${value.imageUrl}`} alt="group" className="img-fluid rounded-xxl mb-2" />
                    </div>
                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                        <a href="/defaultgroup" className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> Like Page</a>
                    </div>
                </div>

                ))} */}
                 {/* <Pagetitle title="Gallery"/> */}
                                    <div className="row ps-2 pe-1">
                                        {album.map((value , index) => (
                                                                           <a href={"/odingallery/view/" + value.id} > 
                                        <div key={index} className="col-md-12 col-sm-6 pe-2 ps-2">
                                        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                                                <div className="card-body position-relative h200 bg-image-cover bg-image-center cover" style={{backgroundImage: `url(${(value.ImagesAlbums[0]?.image_url)})`}}></div>
                                                <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                                                    <div className="clearfix"></div>
                                                    {/* <h4 className="fw-700 font-xsss mt-3 mb-1">{value.album_name}</h4> */}
                                                    {/* <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{value?.description}</p> */}
                                                    <span className="position-absolute right-15 top-0 d-flex align-items-center">
                                                        
                                                    </span>
                                                </div>
                                            </div>
                                        </div></a>

                                        ))}

                                        {/* <Load /> */}
                                        

                                        
                                    </div>


                
            </div>
        );
    
}

export default Group;