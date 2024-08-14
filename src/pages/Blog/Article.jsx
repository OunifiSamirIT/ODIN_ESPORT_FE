import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogLayout from "../../Layout/BlogLayout";
import banner from "../../assets/banner.png";
import NewsLetter from "../../assets/newsletter.png";
import { Config } from "../../config";
import { Context } from "../../index";
import Logo from "../../assets/odin.png"
const Article = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [recommandation, setRecommandation] = useState([]);
  const [newsletter , setNewsletter] = useState();
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
      <BlogLayout>
      {article[0] && (
        <div className=" px-4 flex flex-col items-center gap-y-32 w-full h-fit flex justify-center text-center">
          <div className="self-center mt-12 w-full max-w-[1344px] max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-2 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col p-6 bg-white rounded-[10px] text-zinc-900 max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-wrap gap-1 py-2">
                      {article[0]?.tags.split(",").filter((e) => e != '').map((e) => {
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
                    <div className="flex gap-2 max-sm:justify-between max-sm:w-full self-start mt-5 text-zinc-500">
                      <div className="flex gap-2 text-base">
                        <img
                          loading="lazy"
                          srcSet={Logo}
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
                      className="bg-cover rounded-[10px] relative flex-col justify-center py-14 pr-20 pl-20 text-2xl font-bold text-white min-h-[147px] max-md:pr-8 max-md:pl-5 max-md:mr-2 max-md:max-w-full"
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
                    <a href="/register" className="tal2 justify-center self-center px-8 py-2 mt-6 text-base font-medium text-white bg-blue-600 rounded-[10px] max-md:px-5">
                      {getTranslation(
                        `Start Your Journey Now!`, // -----> Englais
                        `Commencez votre aventure!` //  -----> Francais
                      )}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col md:px-5 mt-2.5 max-md:mt-10">
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
                    <input type="text" onChange={(e) => setNewsletter(e.target.value)} value={newsletter} placeholder="johndoe@gmail.com" className="justify-center items-start px-4 py-2 mt-4 whitespace-nowrap bg-white border border-solid border-stone-300 rounded-[10px] text-neutral-500 max-md:pr-5"/>
                    <button className="justify-center text-center items-center px-8 py-2 mt-4 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[10px] max-md:px-5">
                      {getTranslation(
                        `Subscribe`, // -----> Englais
                        `S'inscrire` //  -----> Francais
                      )}
                    </button>
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
      </BlogLayout>
    );}


export default Article;
