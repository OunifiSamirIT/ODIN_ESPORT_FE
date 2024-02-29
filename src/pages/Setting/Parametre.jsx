import React from "react";

const Parametre = () => {

    return (
        <div className="flex flex-col px-8 py-9 text-lg bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:max-w-full w-full">
      <div className="flex gap-4 self-start px-4 whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0f2ace319a8a40362513aebe5b9d3895ee695350e8c08fdf2d1f81c2a6111bf?"
          className="my-auto aspect-[1.1] w-[22px]"
        />
        <div className="grow">Email Principale</div>
      </div>
      <div className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border border-solid bg-zinc-100 border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 max-md:max-w-full">
        joeyleblanc@gmail.com
      </div>
      <div className="flex gap-4 justify-between px-4 mt-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/948c756af05f9aea12c0006315a48a0862850f46651f81448082c23d1eb93da2?"
          className="my-auto aspect-[1.1] w-[22px]"
        />
        <div className="grow max-md:max-w-full">Email</div>
      </div>
      <div className="justify-center text-center items-center px-16 py-2 mt-2 text-base font-medium text-blue-600 whitespace-nowrap bg-white border border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5 max-md:max-w-full">
        Ajouter un autre email
      </div>
      <div className="flex gap-4 justify-between px-4 mt-6 max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a85b62b66ecf00095664baf16a200ba7858326683afa2b2f6a03ae7601c2701?"
          className="my-auto w-5 aspect-square"
        />
        <div className="grow max-md:max-w-full">Mot de passe</div>
      </div>
      <div className="justify-center text-center items-center px-16 py-2 mt-2 text-base font-medium text-blue-600 whitespace-nowrap bg-white border border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5 max-md:max-w-full">
        Changer votre mot de passe
      </div>
    </div>
    )
}

export default Parametre