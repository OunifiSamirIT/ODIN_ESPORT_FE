import React from "react";

const Error = () => {
  return (
    <>
      <div className="flex flex-col justify-center px-6 py-12 bg-white h-screen ">
        <div className="flex justify-center items-center bg-white rounded-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col items-center mb-16 max-w-full w-[749px] max-md:mb-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e3b1d64058ea70b7cc72d91240f6c09f1ffa90e041366056f04a5c9ca115108?"
              className="aspect-square w-[70px]"
            />
            <div className="mt-6 text-2xl font-bold whitespace-nowrap text-zinc-900">
              Oops! Aucun résultat trouvé
            </div>
            <div className="self-stretch text-xl leading-6 text-center text-neutral-500 max-md:max-w-full">
              Continuez à explorer ! Nous ajoutons toujours de nouvelles
              expériences. Essayez d'affiner votre recherche ou revenez plus
              tard pour les mises à jour.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
