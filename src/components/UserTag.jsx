import React from 'react'

export const UserTag = ({ name, surname, profil, date, image }) => {
    
    return (
        <div className="flex gap-4 justify-between px-1 max-w-[659px] max-md:flex-wrap max-md:px-2">
            <div className="flex gap-2 justify-between font-light text-zinc-900">
             
                 <figure className="avatar me-3">
                    <img
                      srcSet={image}

                      // src={article.user.user?.image}
                      className="shadow-sm rounded-full w-[52px] aspect-square"
                      alt="post"
                    />{" "}
                  </figure>
                <div className="flex flex-col py-1">
                    <div className="text-base font-semibold">{name} {surname}</div>
                    <div className="mt-1 text-xs">{profil}</div>
                    <div className="mt-1 text-xs">{date}</div>
                </div>
            </div>
        </div>
    )
}
