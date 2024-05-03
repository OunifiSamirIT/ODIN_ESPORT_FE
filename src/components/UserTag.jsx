import React from 'react'

export const UserTag = ({ name, surname, profil, date, image }) => {
    return (
        <div className="flex gap-4 justify-between px-8 max-w-[659px] max-md:flex-wrap max-md:px-5">
            <div className="flex gap-5 justify-between font-light text-zinc-900">
                <img
                    loading="lazy"
                    srcSet={image}
                    alt='avatar'
                    className="shrink-0 w-16 aspect-square"
                />
                <div className="flex flex-col py-1">
                    <div className="text-base font-semibold">James Mitchell</div>
                    <div className="mt-1 text-xs">Joueur</div>
                    <div className="mt-1 text-xs">21 Septembre 2024</div>
                </div>
            </div>
        </div>
    )
}
