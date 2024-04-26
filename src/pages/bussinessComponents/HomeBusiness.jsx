import React from "react";
import Header from "../../components/Header2";
import { Context } from "../../index";
import gsap from "gsap";
import verified from "../../assets/verified.png"
import add from "../../assets/add.png"

function HomeBusiness() {
  {/* tebde kdmet IHEB */}
  const {getTranslation } = React.useContext(Context);
  
  let _handleFollow = () =>  {
    gsap.timeline()
    .to("#followBTN", {
      duration: .2,
      background: "#3f8e43"
    })
    .to("#addImg", {
      duration: .2,
      scale: .5,
      opacity: 0,
    })
    .to("#addImg", {
     duration: 0,
     display: "none"
    })
    .to("#verifiedImg", {
      duration: 0,
      display: "block"
     })
    .to("#verifiedImg", {
      duration: .2,
      scale: 1,
      opacity: 1
      
    })
  } 

  {/* toufa khedmet IHEB */}
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center pb-8 md:mt-20 w-full bg-zinc-100">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d3c2ad355f32a58ce392b5d36c4442dd6994849628b361f078e5b8e2b14e54f?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
          className="md:mt-6 mt-24 w-full aspect-[3.33]  max-w-[1344px] max-md:max-w-full"
        />
        {/* first of page*/}

        <div className="flex flex-col justify-center px-20 py-4 mt-4 w-full bg-white rounded-xl max-w-[1344px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 px-2 max-md:flex-wrap">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/29a67165fd6b97ca3b9ba190ac91b7871c2ce851654f0c5ebefde706622540ff?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 max-w-full rounded-full aspect-square w-[100px]"
            />
            <div className="flex flex-1 gap-0 justify-between my-auto max-md:flex-wrap">
              <div className="flex flex-col flex-1 pr-4 max-md:max-w-full">
                <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                  Barça Academy
                </div>
                <div className="mt-1 text-base text-neutral-900 text-opacity-70 max-md:max-w-full tal1">
                  {getTranslation(`Subscribers`, `Abonnés`)}
                </div>
              </div>
              <div onClick={_handleFollow} id="followBTN" className="  flex tal2 items-center gap-2 justify-center cursor-pointer px-8 py-2 my-auto text-lg font-semibold text-white whitespace-nowrap bg-blue-600 hover:bg-blue-700   rounded-[30px] max-md:px-5">
               
                <div>{getTranslation(`Follow`, `Suivre`)}</div>
                <img
                  src={verified}
                  id="verifiedImg"
                  className="w-7 h-7  hidden   opacity-0 scale-150   aspect-square invert"
                />
                <img
                  src={add}
                  id="addImg"
                  className="w-7 h-7 aspect-square invert"
                />
              </div>
            </div>
          </div>
          <div className="flex  flex-col justify-center px-2 mt-6 text-zinc-900 max-md:max-w-full">
            <div className=" tal1 text-lg font-semibold max-md:max-w-full">
              {getTranslation(`Introduction`, `Introduction`)}
            </div>
            <div className="tal1 mt-2 text-base font-light max-md:max-w-full">
              {getTranslation(
                `Discover the essence of football excellence at Barça Academy!
                Proudly affiliated with FC Barcelona, we're committed to nurturing
                the next generation of soccer talent while fostering character,
                discipline, and sportsmanship. Join our vibrant community where
                players of all levels learn and grow, guided by the world-renowned
                Barça methodology. Embrace the spirit of teamwork, dedication, and
                passion for the beautiful game with us. ⚽🔵🔴 #BarçaAcademy
                #MoreThanAClub`,
                `Découvrez l'essence de l'excellence du football à la Barça Academy ! Fièrement affiliés au FC Barcelone, nous nous engageons à former la prochaine génération de talents du football tout en favorisant le caractère, la discipline et l'esprit sportif. Rejoignez notre communauté dynamique où les joueurs de tous niveaux apprennent et grandissent, guidés par la méthodologie de renommée mondiale du Barça. Embrassez l’esprit de travail d’équipe, le dévouement et la passion pour le beau jeu avec nous. ⚽🔵🔴 #BarçaAcademy #MoreThanAClub`
              )}
            </div>
          </div>
        </div>
        {/*middle of page */}

        <div className="flex md:gap-5 gap-2 md:justify-between justify-center px-20 py-4 mt-4 w-full text-base font-medium bg-white rounded-xl max-w-[1344px] text-zinc-900 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex  cursor-pointer items-center gap-2 justify-center p-2 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eb3ffaf47d9307813fe40650440bf16c7601182e97158646b1cbe957d15e565?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className=" shrink-0 w-5 aspect-square"
            />
            <div className="tal1">{getTranslation(`Introduction`, `Introduction`)}</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 my-auto w-px border border-gray-200 border-solid aspect-[0.04] stroke-[1px] stroke-gray-200"
          />
          <div className=" flex cursor-pointer items-center gap-2 justify-center p-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/30daad81b5ea019d7026e74d2a552ee6d3c8c7f699f416b98ea5e33456eb7610?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 w-5 aspect-square"
            />
            <div className="tal1">{getTranslation(`About`, `À propos`)}</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 my-auto w-px border border-gray-200 border-solid aspect-[0.04] stroke-[1px] stroke-gray-200"
          />
          <div className="flex cursor-pointer items-center gap-2 justify-center p-2 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/70d0fb9f10feb268ee30fe5e162bfe8329aa05e21122d68adf37fa12cae0c704?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 w-5 aspect-square"
            />
            <div className="tal1">{getTranslation(`Videos`, `Vidéos`)}</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 my-auto w-px border border-gray-200 border-solid aspect-[0.04] stroke-[1px] stroke-gray-200"
          />
          <div className="flex items-center cursor-pointer gap-2 justify-center p-2 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/caa23bc270d2f3c9e3fa441aba3d751d050b6dda8134692eefc2c8430e550012?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 w-5 aspect-square"
            />
            <div className="tal1">{getTranslation(`Pictures`, `Photos`)}</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 my-auto w-px border border-gray-200 border-solid aspect-[0.04] stroke-[1px] stroke-gray-200"
          />
          <div className="flex items-center cursor-pointer gap-2 justify-center p-2 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/522d49efc15087d551059fe9a9c4f48cb148f52bd06fcb2e261b0f14bdfb0ef5?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 w-5 aspect-square fill-zinc-900"
            />
            <div className="tal1">{getTranslation(`Events`, `Événements`)}</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            className="shrink-0 my-auto w-px border border-gray-200 border-solid aspect-[0.04] stroke-[1px] stroke-gray-200"
          />
          <button className="flex  items-center cursor-pointer gap-2 justify-center p-2 text-blue-600">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e54c5415ebd80091f1807c9fded8511fdfebe35b7782c1290e7615ea3fa0dae8?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
            />
            <div className="tal1">
              {getTranslation(`Our Members`, `Nos Adhérents`)}
            </div>
          </button>
        </div>

        {/* end of page - cards*/}
        <div className="flex MembersContainer  flex-col p-8 mt-4 w-full bg-white rounded-xl max-w-[1344px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 text-3xl font-bold  text-zinc-900 max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7135affdd06f3fbac69b0df37a76ea08fa8144f3bf6594ff2df6a7c09202ff53?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
              className="shrink-0 my-auto w-10 aspect-[1.33] fill-zinc-900"
            />
            <div className="flex-1 max-md:max-w-full tal1">
              {" "}
              {getTranslation(`Our Members`, `Nos Adhérents`)}
            </div>
          </div>
          <div className="justify-between mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-6 mx-auto w-full text-xs bg-white rounded-xl border-2 border-solid border-neutral-200 text-zinc-900 max-md:px-5 max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f2f61b9e09caee0c0275ca7f5aa46c5d31501ee35a1f2f42cb6ad183822f5daa?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                    className="self-center max-w-full rounded-full aspect-square w-[120px]"
                  />
                  <div className="self-center mt-4 text-xl font-medium text-black">
                    Wael Toukebri
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full">
                    <div className="flex gap-4 font-light whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f5c971633b7d71333b95aac76ccedd0b48fdb7dcfc5820fda23898cfc0fb980?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {getTranslation(`Position`, `Position`)}
                      </div>
                    </div>
                    <div className="my-auto font-medium">Ailier Gauche</div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f39b74284acd827c170be7938faac541e9980202cd132ee230bf59f73832f8b?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 self-start w-5 aspect-[1.54]"
                      />
                      <div className="tal1">
                        {getTranslation(`Strong foot`, `Pied Fort`)}
                      </div>
                    </div>
                    <div className="font-medium">Pied Gauche</div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full whitespace-nowrap">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4972a2e096ed8c68bb6b3944dd6b9519d996e67fbaed0fcc5d573b84266b3586?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {getTranslation(`Sex`, `Sexe`)}
                      </div>
                    </div>
                    <div className="my-auto font-medium">Homme</div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full whitespace-nowrap">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f02f9341db9a37b662e7522046cd4e40fe7828990d8e60957be6c648b8f7e46?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {getTranslation(`Nationality`, `Nationalité`)}
                      </div>
                    </div>
                    <div className="flex gap-2.5 my-auto font-medium">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/115ecb46221e7341baad5f6f6c3169ec45a4eb97da0ca61f3fa92aa3423e93f5?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 self-start w-5 aspect-[1.43]"
                      />
                      <div>Tunisienne</div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbff5304cb2026be21a3660ca1de39b912c1f7b45de43dd308b1a531bcf3a2f0?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {" "}
                        {getTranslation(`year of birth`, `Année de naissance`)}
                      </div>
                    </div>
                    <div className="my-auto font-medium">2010</div>
                  </div>
                </div>
              </div>
   
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-6 mx-auto w-full text-xs bg-white rounded-xl border-2 border-solid border-neutral-200 text-zinc-900 max-md:px-5 max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d48626780564f5a125ef540eb12a97156921550dd5709779348e0933d7b8a27c?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                    className="self-center max-w-full rounded-full aspect-square w-[120px]"
                  />
                  <div className="self-center mt-4 text-xl font-medium text-black">
                    Wael Toukebri
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full">
                    <div className="flex gap-4 font-light whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f5c971633b7d71333b95aac76ccedd0b48fdb7dcfc5820fda23898cfc0fb980?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {getTranslation(`Position`, `Position`)}
                      </div>
                    </div>
                    <div className="my-auto font-medium">Ailier Gauche</div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f39b74284acd827c170be7938faac541e9980202cd132ee230bf59f73832f8b?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 self-start w-5 aspect-[1.54]"
                      />
                      <div className="tal1">
                        {getTranslation(`Strong foot`, `Pied Fort`)}
                      </div>
                    </div>
                    <div className="font-medium">Pied Gauche</div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full whitespace-nowrap">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4972a2e096ed8c68bb6b3944dd6b9519d996e67fbaed0fcc5d573b84266b3586?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {getTranslation(`Sex`, `Sexe`)}
                      </div>
                    </div>
                    <div className="my-auto font-medium">Homme</div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full whitespace-nowrap">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f02f9341db9a37b662e7522046cd4e40fe7828990d8e60957be6c648b8f7e46?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {getTranslation(`Nationality`, `Nationalité`)}
                      </div>
                    </div>
                    <div className="flex gap-2.5 my-auto font-medium">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/115ecb46221e7341baad5f6f6c3169ec45a4eb97da0ca61f3fa92aa3423e93f5?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 self-start w-5 aspect-[1.43]"
                      />
                      <div>Tunisienne</div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-4 w-full">
                    <div className="flex gap-4 font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbff5304cb2026be21a3660ca1de39b912c1f7b45de43dd308b1a531bcf3a2f0?apiKey=3852610df1e148bb99f71ca6c48f37ee&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto tal1">
                        {" "}
                        {getTranslation(`year of birth`, `Année de naissance`)}
                      </div>
                    </div>
                    <div className="my-auto font-medium">2010</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBusiness;
