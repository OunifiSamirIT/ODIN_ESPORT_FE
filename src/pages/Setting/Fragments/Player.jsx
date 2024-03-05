import React, { useState, useEffect } from "react";


const Player = ({ userInfo }) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [imagePreviewlic, setImagePreviewlic] = useState(null);
    const [formData, setFormData] = useState({
        height: "",
        weight: "",
        club: "",
        licence: "non",
        strongSkill: "",
        positionPlay: "",
        positionSecond: "",
        skillsInProfile: "",
    });

    const [errMsg, setErrMsg] = useState("");
    const [CurrentUser, setCurrentUser] = useState([]);
    const [PlayerData, setPlyerData] = useState([]);
    const [profile, setUserProfile] = useState([]);
    const [skills, setSkills] = useState([]);
    const [file, setFile] = useState(null);
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleFileChangeLicense = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Convert the selected image to a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewlic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUserUpdate = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const formDataToUpdate = new FormData();
            formDataToUpdate.append("height", formData.height);
            formDataToUpdate.append("weight", formData.weight);
            formDataToUpdate.append("club", formData.club || "");
            formDataToUpdate.append("licence", formData.licence || "");
            formDataToUpdate.append("strongSkill", formData.strongSkill || "");
            formDataToUpdate.append("positionPlay", formData.positionPlay || "");
            formDataToUpdate.append("positionSecond", formData.positionSecond || "");
            formDataToUpdate.append("skillsInProfile", formData.skillsInProfile);
            formDataToUpdate.append("file", file);
            // Make a PUT request to update the user profile
            const response = await fetch(
                `http://localhost:5000/api/player/${storedUserData.id}`,
                {
                    method: "PUT",
                    body: formDataToUpdate,
                }
            );

            if (response.ok) {
                const updatedUser = await response.json();
                // setUserData(updatedUser);

                // Handle other state updates or redirects as needed
            } else {
                // Handle errors
                console.error("Error updating user profile:", response.statusText);
                const errorData = await response.json();
                setErrMsg({ status: "failed", message: errorData.message || "Error updating user profile" });
            }
        } catch (error) {
            console.error("Error updating user profile:", error);
            setErrMsg({ status: "failed", message: "Error updating user profile" });
        }
    };



    const [selectedSkills , setSelectedSkills] = useState('Négociation,Connaissance approfondie du sport,Réseautage'.split(','))
    // const [selectedSkills, setSelectedSkills] = useState(['Négociation']);

    const toggleSkill = (skill) => {
        const skillExists = selectedSkills.includes(skill);
        if (!skillExists) {
          const updatedSkills = [...selectedSkills, skill];
          setSelectedSkills(updatedSkills);
        } else {
          const updatedSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
          setSelectedSkills(updatedSkills);
        }
        console.log(selectedSkills)
      };
   
      const skillsList = [
        "Rapidité",
        "Tacle",
        "Défense",
        "Tir de loin",
        "Jeu en une touche",
        "Rapidité de la prise de décision",
        "Frappe puissante",
        "Agilité",
        "Contrôle du ballon",
        "Dribble",
        "Exploitation de l'espace",
        "Évaluation des risques sur le terrain",
        "Endurance",
        "Équilibre et coordination",
        "Auto-Motivation"
      ];

    return (
        <>
            <div className="flex flex-col flex-wrap grow gap-y-6 justify-between content-start py-8 pr-4 pl-8 w-full bg-white rounded-xl max-md:pl-5 max-md:mt-6 max-md:max-w-full">
                <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                    <div className="lg:flex-1 w-full">
                        <div className="flex gap-4 justify-between px-4">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48be6745725217387de9710be0a193a4d08011e72ce73951c9268683bb1b223?"
                                className="my-auto w-5 aspect-square"
                            />
                            <div className="grow">Club Actuelle</div>
                        </div>
                        <input name='club' type='text' value={formData.club} onChange={handleInputChange} className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                    </div>
                    <div className="lg:flex-1 w-full">
                        <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/67cc44c5147e294e812e8e6e60b5a03612a46374164925d1ed48b3daf7f65514?"
                                className="my-auto aspect-[0.85] w-[17px]"
                            />
                            <div className="grow">Taille</div>
                        </div>
                        <input name='height' type='number' value={formData.height} onChange={handleInputChange} className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                    </div>
                </div>
                <div className="mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-center items-baseline">
                    <div className="lg:flex-1 w-full">
                        <div className="flex gap-4 justify-between px-4">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b051312f4e1495e14e7b1235b0b1ebab3cae89f347c699d855c048d1aa427fb4?"
                                className="my-auto w-5 aspect-square"
                            />
                            <div className="grow">Position Principale</div>
                        </div>
                        <input name='positionPlay' type='text' value={formData.positionPlay} onChange={handleInputChange} className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />

                    </div>
                    <div className="lg:flex-1 w-full">
                        <div className="flex gap-4 justify-between px-4 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0429914b2011b359d596fb98535f53efdbc45dbc0fdd5f58a08f96ed307459cd?"
                                className="my-auto w-5 aspect-square"
                            />
                            <div className="grow">Position Secondaire</div>
                        </div>
                        <input name="positionSecond" value={formData.positionSecond} onChange={handleInputChange} className="w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                    </div>
                </div>
                <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap items-end">
                    <div className="lg:flex-1 w-full">
                        <div className="flex gap-4 justify-between px-4 mt-4">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7a97c9bcd4cc04810a57119703304622116c26ca19187ab06a1368043f945f4?"
                                className="my-auto w-5 aspect-square"
                            />
                            <div className="grow">Avez-vous une licence ?</div>
                        </div>
                        <div className="flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <select onChange={handleInputChange} className="flex gap-5 justify-between px-4 py-2 rounded-md" name="licence" id="licence" defaultChecked={formData.licence}>
                                <option>Select a value</option>
                                <option value="oui">OUI</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                    </div>
                    <div className="lg:flex-1 w-full">
                        {formData.licence === 'oui' &&
                            <div>
                                <div className="flex gap-4 justify-between mt-4">
                                    <div className="flex gap-2 justify-between px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe64f313a3ed145b5b50abb8a5dc1b51163bf8cf0e41b5232900227b0ae2686?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                            className="w-6 aspect-square fill-white"
                                        />
                                        <label>
                                            {" "}
                                            <input
                                                type="file"
                                                name="file"
                                                onChange={handleFileChangeLicense}
                                                className="grow my-auto w-2 inset-0 opacity-0"
                                            />
                                            Importer une photo
                                        </label>
                                    </div>
                                </div>

                            </div>

                        }
                        {formData.licence === 'non' &&
                            <div>
                                <div className="flex gap-4 justify-between mt-4">
                                    <div className="flex gap-2 justify-between px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-gray-300 rounded-[30px] max-md:px-5">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe64f313a3ed145b5b50abb8a5dc1b51163bf8cf0e41b5232900227b0ae2686?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                            className="w-6 aspect-square fill-white"
                                        />
                                        <label>
                                            {" "}
                                            <input
                                                type="file"
                                                disabled
                                                name="file"
                                                className="grow my-auto w-2 inset-0 opacity-0"
                                            />
                                            Importer une Licence
                                        </label>
                                    </div>
                                </div>

                            </div>
                        }


                    </div>
                </div>

                <div className="flex gap-4 self-start px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
                    <div className="flex gap-4 self-start px-4 mt-4 text-lg text-black whitespace-nowrap">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a53452f15bd5895da162bb03bb52c137da8fbcc9d687ab358a7d4d0a05729b5?"
                            className="my-auto w-5 aspect-square"
                        />
                        <div className="flex-auto">Compétences</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2  mt-4 mr-3 text-lg text-blue-600 max-md:flex-wrap max-md:pr-5 max-md:mr-2.5 max-md:max-w-full">
                    <div className="form-group icon-input  mb-3">
                        {skillsList.map((skill,index) => (
                            <div key={skill} className="form-check rounded-[30px] form-check-inline me-2 mb-2">
                                <input
                                    type="checkbox"
                                    id={'skill' + index}
                                    name="coachSkillsInProfile"
                                    checked={selectedSkills.includes(skill)}
                                    className="form-check-input d-none rounded-[30px] "
                                    onChange={() => toggleSkill(skill)}
                                />
                                <label
                                    htmlFor={'skill' + index}
                                    className={`form-check-label btn ${selectedSkills.includes(skill) ? "flex gap-4 text-white justify-between px-4 py-2 bg-blue-600 rounded-[30px]" : "flex gap-4 justify-between px-4 py-2 text-blue-600 bg-gray-100 rounded-[30px]"
                                        }`}
                                >
                                   <div className="text-[18px] font-light"> {selectedSkills.includes(skill) ? "-" : "+"} {skill} </div> 
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-5 justify-between py-2 mt-6 mr-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
                    <div className="flex gap-2 justify-between px-8 py-2 text-blue-600 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e237a106a6aae9aaedb87131a5b6a9cefc6631b6b0b800569f8639d3cbb6941?"
                            className="w-5 aspect-square"
                        />
                        <div className="grow">Annuler</div>
                    </div>
                    <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                            className="w-5 aspect-square"
                        />
                        <div className="grow" onClick={handleUserUpdate}>Confirmer</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;