import React from "react";
import { useState } from "react";
import Football from "../assets/Football.png";
import Parametre from "../assets/Parametre.png";
import Userdefault from "../assets/userdefault.jpg";
import Profilesearch from "../assets/Profilesearch.png";
import { useEffect } from "react";
import { Config } from "../config";
import Header from "./Header2";
import secureLocalStorage from "react-secure-storage";

function Searchpage() {
  const iconImages = {
    Profilesearch,
    Football,
    Parametre,
    // Add other icon-image mappings here
  };
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;

  useEffect(() => {
    fetch(`${Config.LOCAL_URL}/api/AllTarget`, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },

    })
      .then((response) => response.json())
      .then((data) => {
        setSearch(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch users
    fetch(`${Config.LOCAL_URL}/api/user`, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },

    })
      .then((response) => response.json())
      .then((userData) => {
        setUsers(userData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearchTerm(searchString);
    if (searchString.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredTargets = search
        .filter((item) => item.titre.toLowerCase().includes(searchString))
        .map((target) => ({ ...target, origin: "Page" }));

      const filteredUsers = users
        .filter((user) => {
          const fullName =
            `${user?.user?.nom} ${user?.user?.prenom}`.toLowerCase();
          return fullName.includes(searchString);
        })
        .map((user) => ({ ...user.user, origin: "Personne" }));

      setSearchResults([...filteredTargets, ...filteredUsers]);
    }
  };

  return (
    <>
      <div className=" ">
        <Header />
        <div className=" md:flex pl-7 pr-2 pt-4 w-full min-w-[200px]">
          <div className="flex md:hidden items-center mt-16 relative ">
            <div className="flex items-center whitespace-nowrap bg-gray-100 pr-2 pl-2 h-11 w-[250px] rounded-full mr-4 border border-black absolute top-0">
              <input
                type="text"
                onChange={handleSearch}
                value={searchTerm}
                placeholder="Search"
                className="bg-gray-100 w-[230px]"
              />
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0787 17.871L16.2077 13.9984C19.1041 10.1278 18.3144 4.64195 14.4437 1.74551C10.5731 -1.15092 5.08726 -0.361157 2.19083 3.50949C-0.705607 7.38013 0.0841559 12.866 3.9548 15.7624C7.06402 18.0891 11.3345 18.0891 14.4437 15.7624L18.3163 19.635C18.803 20.1216 19.592 20.1216 20.0786 19.635C20.5653 19.1483 20.5653 18.3593 20.0786 17.8727L20.0787 17.871ZM9.23154 15.015C5.7915 15.015 3.00282 12.2263 3.00282 8.78623C3.00282 5.34618 5.7915 2.55751 9.23154 2.55751C12.6716 2.55751 15.4603 5.34618 15.4603 8.78623C15.4566 12.2247 12.6701 15.0113 9.23154 15.015Z"
                  fill="#65676B"
                />
              </svg>
            </div>
            <div className="">
              {searchResults.length > 0 && (
                <ul className="bg-white shadow-md rounded-md mt-1 px-4 py-2 max-h-[600px] absolute top-[40px]  min-w-[350px] overflow-y-scroll ">
                  {searchResults.map((item, index) => (
                    <React.Fragment key={index}>
                      {index === 0 ||
                        searchResults[index - 1].origin !== item.origin ? (
                        <li className="text-gray-500 text-sm px-2 py-1">
                          {item.origin === "Page" ? "Pages" : "Personnes"}
                        </li>
                      ) : null}
                      <li
                        key={item.id}
                        className="flex items-center py-1 space-x-4 "
                      >
                        {item.icon ? (
                          <img
                            src={iconImages[item.icon]}
                            alt={item.titre}
                            width="20"
                            height="20"
                            className=""
                          />
                        ) : (
                          <img
                            src={item.image || Userdefault}
                            alt={item.nom}
                            className="rounded-full object-fill w-10 h-10"
                          />
                        )}
                        <a href={`/profile/${item.id}`} className="pr-4">
                          {item.titre || item.nom + " " + item.prenom}
                        </a>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchpage;
