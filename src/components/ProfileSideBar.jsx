import React  from "react";
import { Link , NavLink } from 'react-router-dom';

const ProfileSideBar = () => {

return (
    <div className="flex-col px-4 py-5 mt-4 w-full bg-white rounded-xl text-zinc-900 hidden md:flex">
    {/* <div className="text-blue-600">Informations Personnelles</div> */}
    <Link to="/accountinformation" className="mt-4">Informations Personnelles</Link>
    <div className="shrink-0 mt-4 h-px bg-blue-100" />
    <Link to="/informationProfile" className="mt-4">Informations du Profil</Link>
    <div className="shrink-0 mt-4 h-px bg-blue-100" />
    <Link to="/parametrecompte" className="mt-4">Paramètres du compte</Link>
    <div className="shrink-0 mt-4 h-px bg-blue-100" />
    <Link to="/social" className="mt-4">Réseaux Sociaux</Link>
    <div className="shrink-0 mt-4 h-px bg-blue-100" />
    <div className="flex gap-4 justify-between px-3.5 py-2 mt-2 text-orange-500 whitespace-nowrap">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cded10bad9b00bba1f301a02f5bfc764d8bff607a7af5b3849d13ad9750d0472?"
        className="w-5 aspect-square"
      />
      <button type="submit"  onClick={() => console.log('logout')} className="flex-auto">Déconnexion</button>
    </div>
  </div>
)

}
export default ProfileSideBar