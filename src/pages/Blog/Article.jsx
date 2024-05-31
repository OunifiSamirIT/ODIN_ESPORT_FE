import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewsLetter from "../../assets/newsletter.png";
import banner from "../../assets/banner.png";
import { Config } from "../../config";
import { Context } from "../../index";

const Article = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [recommandation, setRecommandation] = useState([]);
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  const fetchRecommandation = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/blog`);
    const result = await response.json();

    setRecommandation(shuffle(result.blog).slice(0, 3));
  };
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const fetchBlogArticles = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/blog/${articleId}`);
    const result = await response.json();
    setArticle(result.blog);
  };

  useEffect(() => {
    fetchRecommandation();
    fetchBlogArticles();
  }, []);
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
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
              {getTranslation(
                `Contact`, // -----> Englais
                `Contact` //  -----> Francais
              )}
            </div>
            <div className="justify-center self-stretch px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[10px] max-md:px-5">
              {getTranslation(
                `Sign Up`, // -----> Englais
                `S'inscrire` //  -----> Francais
              )}
            </div>
            <div className="justify-center self-stretch px-8 py-2 text-base font-medium border-2 border-solid border-zinc-900 border-opacity-50 rounded-[10px] text-zinc-900 max-md:px-5">
              {getTranslation(
                `Log In`, // -----> Englais
                `Se connecter` //  -----> Francais
              )}
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
      {article[0] && (
        <div className=" px-4 flex flex-col items-center gap-y-32 w-full h-fit flex justify-center text-center">
          <div className="self-center mt-12 w-full max-w-[1344px] max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-2 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col p-6 bg-white rounded-[10px] text-zinc-900 max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-wrap gap-1 py-2">
                      {article[0]?.tags.split(",").map((e) => {
                        return (
                          <div className="justify-center self-start px-3 py-1.5 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-md">
                            {e}
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-left mt-4 text-3xl font-bold max-md:max-w-full">
                      {article[0]?.title}
                    </div>
                    <div className="flex gap-5 justify-between self-start mt-5 text-zinc-500">
                      <div className="flex gap-2 text-base">
                        <img
                          loading="lazy"
                          srcSet={article[0]?.imageUrl}
                          className="shrink-0 w-7 aspect-square rounded-full"
                        />
                        <div className="my-auto">Admin | Odine</div>
                      </div>
                      <div className="my-auto text-xs font-light">
                        {formatDate(article[0]?.createdAt)}
                      </div>
                    </div>
                    <div
                      className="text-left mt-4 font-sans"
                      dangerouslySetInnerHTML={{
                        __html: JSON.parse(article[0]?.content),
                      }}
                    />
                  </div>
                  <div className="flex flex-col px-8 pt-6 pb-7 mt-8 bg-white rounded-[10px] max-md:px-5 max-md:max-w-full">
                    <div
                      style={{ backgroundImage: `url(${banner})` }}
                      className="bg-cover relative flex-col justify-center py-14 pr-20 pl-20 text-2xl font-bold text-white min-h-[147px] max-md:pr-8 max-md:pl-5 max-md:mr-2 max-md:max-w-full"
                    >
                      {getTranslation(
                        `Elevate Your Game, Seize Your Future!`, // -----> Englais
                        `Élevez votre jeu, saisissez votre avenir !` //  -----> Francais
                      )}
                    </div>
                    <div className="mt-6 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow px-4 py-6 rounded-[10px] border border-solid border-zinc-900 text-zinc-900 max-md:mt-6">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/be60dfa8804dfaf18e18a6cf7a6143279eef50392729252eeffc9aaea26321f1?"
                              className="aspect-square w-[30px]"
                            />
                            <div className="tal2 mt-6 text-xl font-bold">
                              {getTranslation(
                                `Direct`, // -----> Englais
                                `Accès` //  -----> Francais
                              )}

                              <br />

                              {getTranslation(
                                `Agent Access`, // -----> Englais
                                `direct aux agents` //  -----> Francais
                              )}
                            </div>
                            <div className="mt-1 text-xs leading-4">
                              {getTranslation(
                                `Connect directly with agents for representation and
            career opportunities.`, // -----> Englais
                                `Connectez-vous directement avec des agents pour la représentation et les opportunités de carrière.` //  -----> Francais
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow px-4 py-6 rounded-[10px] border border-solid border-zinc-900 text-zinc-900 max-md:mt-6">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e34d5112fe6253e1a728388a63b19053ec8d6757cd03327f134cb3d945931ce8?"
                              className="aspect-[1.3] w-[39px]"
                            />
                            <div className="mt-6 text-xl font-bold">
                              {getTranslation(
                                `Enhanced`, // -----> Englais
                                `Visibilité` //  -----> Francais
                              )}

                              <br />

                              {getTranslation(
                                `Visibility`, // -----> Englais
                                `Améliorée` //  -----> Francais
                              )}
                            </div>
                            <div className="tal2 mt-1 text-xs leading-4">
                              {getTranslation(
                                `Showcase skills and achievements to a wide audience of
              scouts and recruiters.`, // -----> Englais
                                `Exposez vos compétences et réalisations à un large public de recruteurs et de scouts` //  -----> Francais
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow px-4 py-6 rounded-[10px] border border-solid border-zinc-900 text-zinc-900 max-md:mt-6">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/61fdddb91401a6201db15fc40c67998a08f8c69e58b6ae1230e802e1f8ebccc0?"
                              className="aspect-[1.14] fill-blue-600 w-[34px]"
                            />
                            <div className="tal2 mt-6 text-xl font-bold">
                              {getTranslation(
                                `Community`, // -----> Englais
                                `Communauté` //  -----> Francais
                              )}
                              <br />

                              {getTranslation(
                                `Engagement`, // -----> Englais
                                `Engagement` //  -----> Francais
                              )}
                            </div>
                            <div className="tal2 mt-1 text-xs leading-4">
                              {getTranslation(
                                `Network with fellow players, coaches, and mentors for
              support and guidance.`, // -----> Englais
                                `Réseau de joueurs, entraîneurs et guides pour obtenir du soutien et des conseils.` //  -----> Francais
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tal2 justify-center self-center px-8 py-2 mt-6 text-base font-medium text-white bg-blue-600 rounded-[10px] max-md:px-5">
                      {getTranslation(
                        `Start Your Journey Now!`, // -----> Englais
                        `Commencez votre aventure!` //  -----> Francais
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col px-5 mt-2.5 max-md:mt-10">
                  <div className="tal2 text-3xl font-bold text-zinc-900">
                    {getTranslation(
                      `Newsletter`, // -----> Englais
                      `Newsletter` //  -----> Francais
                    )}
                  </div>
                  <div className="text-left flex flex-col justify-center px-4 py-6 mt-2.5 text-base bg-white rounded-[10px] text-zinc-900">
                    <img
                      loading="lazy"
                      srcSet={NewsLetter}
                      className="w-full aspect-[1.49]"
                    />
                    <div className="tal2 mt-6 text-xl font-bold">
                      {getTranslation(
                        ` Stay in the Game:`, // -----> Englais
                        `Restez dans le jeu :` //  -----> Francais
                      )}
                      <br />
                      {getTranslation(
                        ` Subscribe to Our Newsletter! `, // -----> Englais
                        `Inscrivez-vous à notre Newsletter!` //  -----> Francais
                      )}
                    </div>
                    <div className="tal2 mt-2 font-light">
                      {getTranslation(
                        ` Don't miss out on the latest football news and updates.
              Subscribe to our newsletter for exclusive content straight to
              your inbox!`, // -----> Englais
                        ` Ne manquez pas les dernières nouvelles et mises à jour du football.
              Inscrivez-vous à notre newsletter pour du contenu exclusif directement dans votre boîte de réception !` //  -----> Francais
                      )}
                    </div>
                    <div className="justify-center items-start px-4 py-2 mt-4 whitespace-nowrap bg-white border border-solid border-stone-300 rounded-[10px] text-neutral-500 max-md:pr-5">
                      johndoe@gmail.com
                    </div>
                    <div className="justify-center text-center items-center px-8 py-2 mt-4 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[10px] max-md:px-5">
                      {getTranslation(
                        `Subscribe`, // -----> Englais
                        `S'inscrire` //  -----> Francais
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold text-zinc-900">
                    {getTranslation(
                      `Similar Articles`, // -----> Englais
                      `Articles Similaires` //  -----> Francais
                    )}
                  </div>
                  {recommandation &&
                    recommandation.map((item) => {
                      return (
                        <a href={`/blog/${item.id}`}>
                          <div className="flex flex-col justify-center px-2 py-4 mt-2 bg-white rounded-[10px] border border-gray-200 border-solid">
                            <img
                              loading="lazy"
                              srcSet={item.imageUrl}
                              className="w-full aspect-[1.52]"
                            />
                            <div className="flex flex-col py-2 mt-4">
                              <div className="flex gap-4 justify-between text-sm text-blue-600 max-md:mr-1">
                                {item?.tags.split(",").map((e) => {
                                  return (
                                    <div className="flex-wrap justify-center px-4 py-1 rounded-2xl bg-blue-600 bg-opacity-10">
                                      {e}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="mt-4 text-2xl font-semibold text-zinc-900 max-md:mr-1">
                                {item.title}
                              </div>
                              <div className="flex gap-5 mt-6 text-neutral-400">
                                <div className="flex gap-2 text-base">
                                  <img
                                    loading="lazy"
                                    srcSet={item?.imageUrl}
                                    className="shrink-0 w-7 aspect-square rounded-full"
                                  />
                                  <div className="my-auto">Admin | Odine</div>
                                </div>
                                <div className="my-auto text-xs font-light">
                                  {formatDate(item?.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex mt-8 justify-center items-center self-stretch px-16 py-6 w-full bg-blue-600 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
          <div className="flex gap-5 justify-between py-2 w-full max-md:flex-wrap max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d9a5157737e60ab06daba1a7dd1777fe2730f176a2e03e7da55c1b8e0683609?"
              className="shrink-0 my-auto w-36 max-w-full aspect-[2.78]"
            />
            <div className="flex gap-5 justify-center items-center py-4 max-md:flex-wrap">
              <div className="tal1 self-stretch my-auto text-base font-medium text-white">
                {getTranslation(
                  `Contact`, // -----> Englais
                  `Contact` //  -----> Francais
                )}
              </div>
              <div className="tal1 self-stretch my-auto text-base font-medium text-white">
                {getTranslation(
                  `Blog`, // -----> Englais
                  `Blog` //  -----> Francais
                )}
              </div>
              <div className="tal1 justify-center self-stretch px-8 py-2 text-base font-medium text-blue-600 bg-white rounded-[10px] max-md:px-5">
                {getTranslation(
                  `Sign Up`, // -----> Englais
                  `S'inscrire` //  -----> Francais
                )}
              </div>
              <div className="tal1 justify-center self-stretch px-8 py-2 text-base font-medium text-white border-2 border-white border-solid rounded-[10px] max-md:px-5">
                {getTranslation(
                  `Log In`, // -----> Englais
                  `Se connecter` //  -----> Francais
                )}
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
              {getTranslation(
                ` All Rights Reserved © 2024 Odin Esport `, // -----> Englais
                `Tous droits réservés © 2024 Odin Esport ` //  -----> Francais
              )}
            </div>
            <div className="text-base font-medium text-white underline">
              {getTranslation(
                ` Privacy Policy  `, // -----> Englais
                `Politique de confidentialité ` //  -----> Francais
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
