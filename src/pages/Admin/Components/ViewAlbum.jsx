import React, { useEffect , useState } from "react";
import { useParams } from 'react-router-dom';
import Header from './AdminHeader';

import Pagetitle from '../../../components/Pagetitle';
import Appfooter from '../../../components/Appfooter';

const storyList = [
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    
]

const ViewAlbum = () => {
    const { id } = useParams();
    const [album , setAlbum] = useState([])
    const [isLoading , setIsLoading] = useState(true)
   
    const fetchAlbumData = async () => {
        setIsLoading(true);
        const url = "https://odine-sport.com/api/album/" + id;
        try {
          const response = await fetch(url);
          const result = await response.json();
          setAlbum(result.data);
          setIsLoading(false);
          console.log(album)
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      
      useEffect(() => {
        fetchAlbumData();
      }, [id]);

return(
    <>      
             <Header />
                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    
                                    <Pagetitle title={album.album_name}/>
                                    
                                    <div className="row ps-2 pe-1">
                                    <div  className="col-md-3 col-xss-6 pe-2 ps-2 ">
                                            <div className="card h300 d-flex justify-items-center align-items-center cursor-pointer border-0 bg-light shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{backgroundImage: `url("assets/images/bgImage.png")`}}>
                                                <div className="card-body d-block w-100 position-absolute bottom-0 text-center bg-light ">
                                                   <i className="feather-plus font-lg mr-2"></i>
                                                </div>
                                            </div>
                                        </div>
                                        {album.ImagesAlbums &&  album.ImagesAlbums.map((value , index) => (

                                        <div key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
                                            <div className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{backgroundImage: `url("${value.image_url}")`}}>
                                                <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                                                    <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src={value.image_url} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                                                    <div className="clearfix"></div>
                                                    <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">ds</h4>
                                                </div>
                                            </div>
                                        </div>

                                        ))}

                                        
                                    </div>
                                </div>               
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Appfooter /> 
            </>
)
            
}

export default ViewAlbum ;