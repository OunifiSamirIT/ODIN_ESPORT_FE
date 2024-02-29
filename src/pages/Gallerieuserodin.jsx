import React , {useState , useEffect} from "react";
import Header from '../components/Header';
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';
import Load from '../components/Load';
import { Link } from "react-router-dom";



const  Album =  () =>  {
    
    const [album, setAlbum] = useState([]);


    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch("https://odine-sport.com/api/albumc");
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
            <> 
                <Header />
                {/* <Leftnav />
                <Rightchat /> */}

{/* <div className="flex flex-col mt-12 pb-12 bg-zinc-100">
      
      <div className="self-center mt-12 w-full max-w-[1344px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
           
          </div>
          <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
              <div className="justify-between px-8 py-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0ffe1c577b3b5721fd838dec5945ee8e8b3e85d9ed00256fee971f6dbbe6b4c2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.7] max-md:mt-10"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-10 max-md:max-w-full">
                      <div className="text-3xl font-bold max-md:max-w-full">
                      {album?.album_name}
                      </div>
                      <div className="mt-4 font-light max-md:max-w-full">
                        Experience an action-packed summer at our premier
                        football camp! Against the backdrop of state-of-the-art
                        facilities and expert coaching staff, immerse yourself
                        in the world's most beloved sport. From intensive
                        training sessions focused on skill development and
                        tactical gameplay to friendly scrimmages and
                        tournaments, our program is designed to elevate players'
                        abilities and passion for the game. Join us for an
                        unforgettable summer of camaraderie, competition, and
                        football excellence. Lace up your boots and reserve your
                        spot today!
                      </div>
                      <div className="flex gap-2 justify-between p-4 mt-4 whitespace-nowrap rounded-xl border border-solid border-neutral-200 max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28072299919cd6610830b1b847db76fa736c975769fafa1e967a25837aa2c386?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">2 Semaines</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7fe0f54388243cde5eda2567d634e20fcaedc6593a7e131847cf26794a55f35?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">Tunisie</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/545e939511a47d6db83d17be743c494bcd9b7824f609f0def7b7a0a0da2ac415?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">01/02/2023</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3d803e2aa84cc65dafa06294cf90b747ef51e660e2c45f13da33c1f8a6c4b0e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center w-5 aspect-square"
                          />
                          <div className="mt-2">14/02/2023</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                        />
                        <div className="flex flex-col flex-1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dff4dfbc9781a939e5690bf8f047fdfc420dbf36c9e00ec905ac56bf410a2e14?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-center aspect-[0.9] fill-zinc-900 w-[18px]"
                          />
                          <div className="mt-2">1200 €</div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center px-16 py-2 mt-4 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4185b5905b50428887ea8bc5135f9d41832f7a4a61c88cd3baa7301b1591ace2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 aspect-square"
                          />
                          <div className="grow">Pré-inscrire</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9e4292690abf902731be78799f3dbd52f22d35be1bc252f69bac521aa47ea10d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9268e72bff13442f17066e8479da1f90960eee4dd409b36bb6f01602f8edcbbb?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a5904a18b10dd9e14880432ac46d3e21d3b93a83441190d8b7ee03e0aa6aeb7d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/caf69f560627ecdeaf65ccf9f3d1c27d3f0cbe4f590294c33ad2699a740e7fd4?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/db5536f9dd844b088dfc3946b7cf32f14acf71e7b8a85d7c7d3e330f35b6998d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d80b0b685e825e2ceae28838e14c1910cbf900e38f222e13cc0b265096e88d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="grow w-full aspect-[0.78] max-md:mt-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}





<div className="flex flex-col pb-12 bg-zinc-100">
    
      <div className="self-center mt-24 w-full max-w-[1344px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
           
          </div>
          <div className="flex flex-col ml-5 w-[80%] max-md:ml-0 max-md:w-full">
            <div className="flex-wrap grow content-start px-5 max-md:mt-6 max-md:max-w-full">
              <div className="flex gap-2 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-wrap justify-center">
  {album.map((value, index) => (
    <div key={index} className="flex flex-col grow items-center pb-4 mx-auto w-full bg-white rounded-xl max-md:mt-6 sm:w-1/2  lg:w-1/4 xl:w-1/4 p-4">
                    <img
                      loading="lazy"
                      srcSet={value.ImagesAlbumcamps[0]?.image_url}
                      className="self-stretch w-full aspect-[1.1]"
                    />
                    <div className="mt-4 text-base font-semibold text-zinc-900">
                      Summer Camp 2024
                    </div>
                    <div className="flex gap-5 justify-between mt-1 max-w-full text-xs font-light whitespace-nowrap text-zinc-900 w-[282px]">
                      <div className="flex gap-2">
                        <div className="grow">21 Jul 2024</div>
                        <div>-</div>
                        <div className="grow">21 Août 2024</div>
                      </div>
                      <div>Tunisie</div>
                    </div>
                    <div className="mt-2 text-xs font-light text-zinc-900">
                      Experience an action-packed summer at our premier football
                      camp! Against the backdrop of state-of-the-art facilities
                      and expert coaching staff, immerse yourself in the world's
                      most beloved sport...
                    </div>
                    <div className="flex gap-5 justify-between mt-2 max-w-full w-[282px]">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900">
                        <div className="text-xs font-light">Price</div>
                        <div className="mt-1 text-base font-semibold">
                          1240 €
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-3 bg-blue-600 rounded-xl aspect-[1.13]">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/688459f573915c74266dcb5eb0235120d7e93fd088c5102dd26fe0420b9723d9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="w-5 aspect-[1.33] fill-white"
                        />
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
    </div>
                {/* <Popupchat />
                <Appfooter />  */}
            </>
        );
    }

export default Album;