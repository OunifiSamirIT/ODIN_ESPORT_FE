import React, { Component, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../assets/Loggin.png";
import Logo from "../assets/logo.png";
import Logo1 from "../assets/1.png";
import Logo2 from "../assets/2.png";
import Logo3 from "../assets/3.png";
import Logo4 from "../assets/4.png";
import Logo5 from "../assets/5.png";
// import pays from "./Pays.json";

const pays = [
  {
    id: 1,
    nationalite: "afghane",
    libelle: "Afghanistan",
  },
  {
    id: 2,
    nationalite: "sudafricaine",
    libelle: "Afrique du Sud",
  },
  {
    id: 3,
    nationalite: "albanaise",
    libelle: "Albanie",
  },
  {
    id: 4,
    nationalite: "algérienne",
    libelle: "Algérie",
  },
  {
    id: 5,
    nationalite: "allemande",
    libelle: "Allemagne",
  },
  {
    id: 6,
    nationalite: "andorrane",
    libelle: "Andorre",
  },
  {
    id: 7,
    nationalite: "angolaise",
    libelle: "Angola",
  },
  {
    id: 8,
    nationalite: "antiguayenne",
    libelle: "Antigua-et-Barbuda",
  },
  {
    id: 9,
    nationalite: "saoudienne",
    libelle: "Arabie saoudite",
  },
  {
    id: 10,
    nationalite: "argentine",
    libelle: "Argentine",
  },
  {
    id: 11,
    nationalite: "arménienne",
    libelle: "Arménie",
  },
  {
    id: 12,
    nationalite: "australienne",
    libelle: "Australie",
  },
  {
    id: 13,
    nationalite: "autrichienne",
    libelle: "Autriche",
  },
  {
    id: 14,
    nationalite: "azerbaïdjanaise",
    libelle: "Azerbaïdjan",
  },
  {
    id: 15,
    nationalite: "bahaméenne",
    libelle: "Bahamas",
  },
  {
    id: 16,
    nationalite: "bahreïnienne",
    libelle: "Bahreïn",
  },
  {
    id: 17,
    nationalite: "bangladaise",
    libelle: "Bangladesh",
  },
  {
    id: 18,
    nationalite: "barbadienne",
    libelle: "Barbade",
  },
  {
    id: 19,
    nationalite: "belge",
    libelle: "Belgique",
  },
  {
    id: 20,
    nationalite: "bélizienne",
    libelle: "Belize",
  },
  {
    id: 22,
    nationalite: "bhoutanaise",
    libelle: "Bhoutan",
  },
  {
    id: 24,
    nationalite: "birmane",
    libelle: "Birmanie",
  },
  {
    id: 23,
    nationalite: "biélorusse",
    libelle: "Biélorussie",
  },
  {
    id: 25,
    nationalite: "bolivienne",
    libelle: "Bolivie",
  },
  {
    id: 26,
    nationalite: "bosnienne",
    libelle: "Bosnie-Herzégovine",
  },
  {
    id: 27,
    nationalite: "botswanaise",
    libelle: "Botswana",
  },
  {
    id: 29,
    nationalite: "brunéienne",
    libelle: "Brunei",
  },
  {
    id: 28,
    nationalite: "brésilienne",
    libelle: "Brésil",
  },
  {
    id: 30,
    nationalite: "bulgare",
    libelle: "Bulgarie",
  },
  {
    id: 31,
    nationalite: "burkinabé",
    libelle: "Burkina",
  },
  {
    id: 32,
    nationalite: "burundaise",
    libelle: "Burundi",
  },
  {
    id: 21,
    nationalite: "béninoise",
    libelle: "Bénin",
  },
  {
    id: 33,
    nationalite: "cambodgienne",
    libelle: "Cambodge",
  },
  {
    id: 34,
    nationalite: "camerounaise",
    libelle: "Cameroun",
  },
  {
    id: 35,
    nationalite: "canadienne",
    libelle: "Canada",
  },
  {
    id: 36,
    nationalite: "cap-verdienne",
    libelle: "Cap-Vert",
  },
  {
    id: 144,
    nationalite: "centrafricaine",
    libelle: "Centrafrique",
  },
  {
    id: 37,
    nationalite: "chilienne",
    libelle: "Chili",
  },
  {
    id: 38,
    nationalite: "chinoise",
    libelle: "Chine",
  },
  {
    id: 39,
    nationalite: "chypriote",
    libelle: "Chypre",
  },
  {
    id: 40,
    nationalite: "colombienne",
    libelle: "Colombie",
  },
  {
    id: 41,
    nationalite: "comorienne",
    libelle: "Comores",
  },
  {
    id: 42,
    nationalite: "congolaise",
    libelle: "Congo",
  },
  {
    id: 43,
    nationalite: "nord-coréenne",
    libelle: "Corée du Nord",
  },
  {
    id: 44,
    nationalite: "sud-coréenne",
    libelle: "Corée du Sud",
  },
  {
    id: 45,
    nationalite: "costaricienne",
    libelle: "Costa Rica",
  },
  {
    id: 47,
    nationalite: "croate",
    libelle: "Croatie",
  },
  {
    id: 48,
    nationalite: "cubaine",
    libelle: "Cuba",
  },
  {
    id: 46,
    nationalite: "ivoirienne",
    libelle: "Côte d'Ivoire",
  },
  {
    id: 49,
    nationalite: "danoise",
    libelle: "Danemark",
  },
  {
    id: 50,
    nationalite: "djiboutienne",
    libelle: "Djibouti",
  },
  {
    id: 51,
    nationalite: "dominiquaise",
    libelle: "Dominique",
  },
  {
    id: 52,
    nationalite: "egyptienne",
    libelle: "Egypte",
  },
  {
    id: 53,
    nationalite: "emirienne",
    libelle: "Emirats arabes unis",
  },
  {
    id: 54,
    nationalite: "equatorienne",
    libelle: "Equateur",
  },
  {
    id: 55,
    nationalite: "erythréenne",
    libelle: "Erythrée",
  },
  {
    id: 56,
    nationalite: "espagnole",
    libelle: "Espagne",
  },
  {
    id: 57,
    nationalite: "estonienne",
    libelle: "Estonie",
  },
  {
    id: 58,
    nationalite: "américaine",
    libelle: "Etats-Unis",
  },
  {
    id: 59,
    nationalite: "ethiopienne",
    libelle: "Ethiopie",
  },
  {
    id: 60,
    nationalite: "fidjienne",
    libelle: "Fidji",
  },
  {
    id: 61,
    nationalite: "finlandaise",
    libelle: "Finlande",
  },
  {
    id: 62,
    nationalite: "française",
    libelle: "France",
  },
  {
    id: 63,
    nationalite: "gabonaise",
    libelle: "Gabon",
  },
  {
    id: 64,
    nationalite: "gambienne",
    libelle: "Gambie",
  },
  {
    id: 66,
    nationalite: "ghanéenne",
    libelle: "Ghana",
  },
  {
    id: 68,
    nationalite: "grenadienne",
    libelle: "Grenade",
  },
  {
    id: 67,
    nationalite: "grecque",
    libelle: "Grèce",
  },
  {
    id: 69,
    nationalite: "guatémaltèque",
    libelle: "Guatemala",
  },
  {
    id: 70,
    nationalite: "guinéenne",
    libelle: "Guinée",
  },
  {
    id: 71,
    nationalite: "equatoguinéenne",
    libelle: "Guinée équatoriale",
  },
  {
    id: 72,
    nationalite: "bissaoguinéenne",
    libelle: "Guinée-Bissao",
  },
  {
    id: 73,
    nationalite: "guyanienne",
    libelle: "Guyana",
  },
  {
    id: 65,
    nationalite: "géorgienne",
    libelle: "Géorgie",
  },
  {
    id: 74,
    nationalite: "haïtienne",
    libelle: "Haïti",
  },
  {
    id: 75,
    nationalite: "hondurienne",
    libelle: "Honduras",
  },
  {
    id: 77,
    nationalite: "hongroise",
    libelle: "Hongrie",
  },
  {
    id: 79,
    nationalite: "indienne",
    libelle: "Inde",
  },
  {
    id: 80,
    nationalite: "indonésienne",
    libelle: "Indonésie",
  },
  {
    id: 81,
    nationalite: "irakienne",
    libelle: "Irak",
  },
  {
    id: 82,
    nationalite: "iranienne",
    libelle: "Iran",
  },
  {
    id: 83,
    nationalite: "irlandaise",
    libelle: "Irlande",
  },
  {
    id: 84,
    nationalite: "islandaise",
    libelle: "Islande",
  },
  {
    id: 85,
    nationalite: "israélienne",
    libelle: "Israël",
  },
  {
    id: 86,
    nationalite: "italienne",
    libelle: "Italie",
  },
  {
    id: 87,
    nationalite: "jamaïquaine",
    libelle: "Jamaïque",
  },
  {
    id: 88,
    nationalite: "japonaise",
    libelle: "Japon",
  },
  {
    id: 90,
    nationalite: "jordanienne",
    libelle: "Jordanie",
  },
  {
    id: 89,
    nationalite: "palestinienne",
    libelle: "Jérusalem - Territoires palestiniens",
  },
  {
    id: 91,
    nationalite: "kazakhstanais",
    libelle: "Kazakhstan",
  },
  {
    id: 92,
    nationalite: "kényane",
    libelle: "Kenya",
  },
  {
    id: 93,
    nationalite: "kirghize",
    libelle: "Kirghizstan",
  },
  {
    id: 94,
    nationalite: "kiribatienne",
    libelle: "Kiribati",
  },
  {
    id: 198,
    nationalite: "kosovare",
    libelle: "Kosovo",
  },
  {
    id: 95,
    nationalite: "koweïtienne",
    libelle: "Koweït",
  },
  {
    id: 96,
    nationalite: "laotienne",
    libelle: "Laos",
  },
  {
    id: 97,
    nationalite: "lesothienne",
    libelle: "Lesotho",
  },
  {
    id: 98,
    nationalite: "lettone",
    libelle: "Lettonie",
  },
  {
    id: 99,
    nationalite: "libanaise",
    libelle: "Liban",
  },
  {
    id: 100,
    nationalite: "libérienne",
    libelle: "Liberia",
  },
  {
    id: 101,
    nationalite: "libyenne",
    libelle: "Libye",
  },
  {
    id: 102,
    nationalite: "liechtensteinoise",
    libelle: "Liechtenstein",
  },
  {
    id: 103,
    nationalite: "lituanienne",
    libelle: "Lituanie",
  },
  {
    id: 104,
    nationalite: "luxembourgeoise",
    libelle: "Luxembourg",
  },
  {
    id: 105,
    nationalite: "macédonienne",
    libelle: "Macédoine",
  },
  {
    id: 106,
    nationalite: "malgache",
    libelle: "Madagascar",
  },
  {
    id: 107,
    nationalite: "malaisienne",
    libelle: "Malaisie",
  },
  {
    id: 108,
    nationalite: "malawienne",
    libelle: "Malawi",
  },
  {
    id: 109,
    nationalite: "maldivienne",
    libelle: "Maldives",
  },
  {
    id: 110,
    nationalite: "malienne",
    libelle: "Mali",
  },
  {
    id: 111,
    nationalite: "maltaise",
    libelle: "Malte",
  },
  {
    id: 112,
    nationalite: "marocaine",
    libelle: "Maroc",
  },
  {
    id: 113,
    nationalite: "marshallaise",
    libelle: "Marshall",
  },
  {
    id: 114,
    nationalite: "mauricienne",
    libelle: "Maurice",
  },
  {
    id: 115,
    nationalite: "mauritanienne",
    libelle: "Mauritanie",
  },
  {
    id: 116,
    nationalite: "mexicaine",
    libelle: "Mexique",
  },
  {
    id: 117,
    nationalite: "micronésienne",
    libelle: "Micronésie",
  },
  {
    id: 118,
    nationalite: "moldave",
    libelle: "Moldavie",
  },
  {
    id: 119,
    nationalite: "monégasque",
    libelle: "Monaco",
  },
  {
    id: 120,
    nationalite: "mongole",
    libelle: "Mongolie",
  },
  {
    id: 197,
    nationalite: "monténégrine",
    libelle: "Monténégro",
  },
  {
    id: 121,
    nationalite: "mozambicaine",
    libelle: "Mozambique",
  },
  {
    id: 122,
    nationalite: "namibienne",
    libelle: "Namibie",
  },
  {
    id: 123,
    nationalite: "nauruane",
    libelle: "Nauru",
  },
  {
    id: 125,
    nationalite: "nicaraguayenne",
    libelle: "Nicaragua",
  },
  {
    id: 126,
    nationalite: "nigérienne",
    libelle: "Niger",
  },
  {
    id: 127,
    nationalite: "nigériane",
    libelle: "Nigeria",
  },
  {
    id: 128,
    nationalite: "norvégienne",
    libelle: "Norvège",
  },
  {
    id: 129,
    nationalite: "néo-zélandaise",
    libelle: "Nouvelle-Zélande",
  },
  {
    id: 124,
    nationalite: "népalaise",
    libelle: "Népal",
  },
  {
    id: 130,
    nationalite: "omanaise",
    libelle: "Oman",
  },
  {
    id: 131,
    nationalite: "ougandaise",
    libelle: "Ouganda",
  },
  {
    id: 132,
    nationalite: "ouzbèke",
    libelle: "Ouzbékistan",
  },
  {
    id: 133,
    nationalite: "pakistanaise",
    libelle: "Pakistan",
  },
  {
    id: 134,
    nationalite: "palaoise",
    libelle: "Palaos",
  },
  {
    id: 135,
    nationalite: "panaméenne",
    libelle: "Panama",
  },
  {
    id: 136,
    nationalite: "papouasienne",
    libelle: "Papouasie-Nouvelle-Guinée",
  },
  {
    id: 137,
    nationalite: "paraguayenne",
    libelle: "Paraguay",
  },
  {
    id: 138,
    nationalite: "néerlandaise",
    libelle: "Pays-Bas",
  },
  {
    id: 140,
    nationalite: "philippine",
    libelle: "Philippines",
  },
  {
    id: 141,
    nationalite: "polonaise",
    libelle: "Pologne",
  },
  {
    id: 142,
    nationalite: "portugaise",
    libelle: "Portugal",
  },
  {
    id: 139,
    nationalite: "péruvienne",
    libelle: "Pérou",
  },
  {
    id: 143,
    nationalite: "qatarienne",
    libelle: "Qatar",
  },
  {
    id: 148,
    nationalite: "roumaine",
    libelle: "Roumanie",
  },
  {
    id: 149,
    nationalite: "britannique",
    libelle: "Royaume-Uni",
  },
  {
    id: 150,
    nationalite: "russe",
    libelle: "Russie",
  },
  {
    id: 151,
    nationalite: "rwandaise",
    libelle: "Rwanda",
  },
  {
    id: 146,
    nationalite: "dominicaine",
    libelle: "République dominicaine",
  },
  {
    id: 145,
    nationalite: "congolaise (RDC)",
    libelle: "République démocratique du Congo",
  },
  {
    id: 147,
    nationalite: "tchèque",
    libelle: "République tchèque",
  },
  {
    id: 152,
    nationalite: "christophienne",
    libelle: "Saint-Christophe-et-Niévès",
  },
  {
    id: 154,
    nationalite: "marinaise",
    libelle: "Saint-Marin",
  },
  {
    id: 155,
    nationalite: null,
    libelle: "Saint-Siège",
  },
  {
    id: 156,
    nationalite: "vincentaise",
    libelle: "Saint-Vincent-et-les Grenadines",
  },
  {
    id: 153,
    nationalite: "lucienne",
    libelle: "Sainte-Lucie",
  },
  {
    id: 157,
    nationalite: "salomonaise",
    libelle: "Salomon",
  },
  {
    id: 158,
    nationalite: "salvadorienne",
    libelle: "Salvador",
  },
  {
    id: 159,
    nationalite: "samoene",
    libelle: "Samoa",
  },
  {
    id: 160,
    nationalite: "santoméenne",
    libelle: "Sao Tomé-et-Principe",
  },
  {
    id: 162,
    nationalite: "serbe",
    libelle: "Serbie",
  },
  {
    id: 163,
    nationalite: "seychelloise",
    libelle: "Seychelles",
  },
  {
    id: 164,
    nationalite: "sierraléonaise",
    libelle: "Sierra Leone",
  },
  {
    id: 165,
    nationalite: "singapourienne",
    libelle: "Singapour",
  },
  {
    id: 166,
    nationalite: "slovaque",
    libelle: "Slovaquie",
  },
  {
    id: 167,
    nationalite: "slovène",
    libelle: "Slovénie",
  },
  {
    id: 168,
    nationalite: "somalienne",
    libelle: "Somalie",
  },
  {
    id: 169,
    nationalite: "soudanaise",
    libelle: "Soudan",
  },
  {
    id: 170,
    nationalite: "srilankaise",
    libelle: "Sri Lanka",
  },
  {
    id: 172,
    nationalite: "suisse",
    libelle: "Suisse",
  },
  {
    id: 173,
    nationalite: "surinamaise",
    libelle: "Suriname",
  },
  {
    id: 171,
    nationalite: "suédoise",
    libelle: "Suède",
  },
  {
    id: 174,
    nationalite: "swazie",
    libelle: "Swaziland",
  },
  {
    id: 175,
    nationalite: "syrienne",
    libelle: "Syrie",
  },
  {
    id: 161,
    nationalite: "sénégalaise",
    libelle: "Sénégal",
  },
  {
    id: 176,
    nationalite: "tadjike",
    libelle: "Tadjikistan",
  },
  {
    id: 178,
    nationalite: "tanzanienne",
    libelle: "Tanzanie",
  },
  {
    id: 177,
    nationalite: "taïwanaise",
    libelle: "Taïwan",
  },
  {
    id: 179,
    nationalite: "tchadienne",
    libelle: "Tchad",
  },
  {
    id: 180,
    nationalite: "thaïlandaise",
    libelle: "Thaïlande",
  },
  {
    id: 181,
    nationalite: "timoraise",
    libelle: "Timor oriental",
  },
  {
    id: 182,
    nationalite: "togolaise",
    libelle: "Togo",
  },
  {
    id: 183,
    nationalite: "tongienne",
    libelle: "Tonga",
  },
  {
    id: 184,
    nationalite: "trinidadienne",
    libelle: "Trinité-et-Tobago",
  },
  {
    id: 185,
    nationalite: "tunisienne",
    libelle: "Tunisie",
  },
  {
    id: 186,
    nationalite: "turkmène",
    libelle: "Turkménistan",
  },
  {
    id: 187,
    nationalite: "turque",
    libelle: "Turquie",
  },
  {
    id: 188,
    nationalite: "tuvaluane",
    libelle: "Tuvalu",
  },
  {
    id: 189,
    nationalite: "ukrainienne",
    libelle: "Ukraine",
  },
  {
    id: 190,
    nationalite: "uruguayenne",
    libelle: "Uruguay",
  },
  {
    id: 191,
    nationalite: "vanuataise",
    libelle: "Vanuatu",
  },
  {
    id: 192,
    nationalite: "vénézuélienne",
    libelle: "Venezuela",
  },
  {
    id: 193,
    nationalite: "vietnamienne",
    libelle: "Viêt Nam",
  },
  {
    id: 194,
    nationalite: "yéménite",
    libelle: "Yémen",
  },
  {
    id: 195,
    nationalite: "zambienne",
    libelle: "Zambie",
  },
  {
    id: 196,
    nationalite: "zimbabwéenne",
    libelle: "Zimbabwe",
  },
];

function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({});
  const [profileError, setProfileError] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [validationError, setValidationError] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [skillsError, setSkillsError] = useState(false);
  const [coachSkillsError, setCoachSkillsError] = useState(false);

  const profilesData = [
    {
      profile: "player",
      logo: Logo2,
      description: "Joueur",
    },
    {
      profile: "coach",
      logo: Logo1,
      description: "Entraineur",
    },
    {
      profile: "agent",
      logo: Logo3,
      description: "Manager",
    },
    {
      profile: "scout",
      logo: Logo4,
      description: "Scout",
    },
    {
      profile: "other",
      logo: Logo5,
      description: "Autre",
    },
  ];

  const handleSkillToggle = (skill) => {
    let updatedSkills = formData.skillsInProfile.split(","); // Convert string to array

    if (updatedSkills.includes(skill)) {
      // Remove skill if already selected
      updatedSkills = updatedSkills.filter((s) => s !== skill);
    } else {
      // Add skill if not selected and the limit is not reached
      if (updatedSkills.length < 10) {
        updatedSkills.push(skill);
      }
    }

    setFormData({
      ...formData,
      skillsInProfile: updatedSkills.join(","), // Convert back to string
    });
    setSkillsError(updatedSkills.length >= 10);
  };

  const generateOptions = (field) => {
    return pays.map((country) => (
      <option key={country.id} value={country[field]}>
        {country[field]}
      </option>
    ));
  };

  const handleSkillToggleAutre = (skill) => {
    let updatedSkills = formData.skillsAutre.split(","); // Convert string to array

    if (updatedSkills.includes(skill)) {
      // Remove skill if already selected
      updatedSkills = updatedSkills.filter((s) => s !== skill);
    } else {
      // Add skill if not selected and the limit is not reached
      if (updatedSkills.length < 10) {
        updatedSkills.push(skill);
      }
    }

    setFormData({
      ...formData,
      skillsAutre: updatedSkills.join(","), // Convert back to string
    });
    setSkillsError(updatedSkills.length >= 10);
  };

  const handleCoachSkillToggle = (coachSkill) => {
    let updatedCoachSkills = formData.skills.split(",");

    if (updatedCoachSkills.includes(coachSkill)) {
      updatedCoachSkills = updatedCoachSkills.filter((s) => s !== coachSkill);
    } else {
      if (updatedCoachSkills.length < 10) {
        updatedCoachSkills.push(coachSkill);
      }
    }

    setFormData({
      ...formData,
      skills: updatedCoachSkills.join(","),
    });
    setCoachSkillsError(updatedCoachSkills.length >= 10);
  };

  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(formData.password);
  };

  const handleInputChange = (e) => {
    setValidationError("");

    // Check if the input being changed is the profile field
    if (e.target.name === "profil") {
      // Get the selected profile value
      const selectedProfileValue = e.target.value;

      // Map the selected profile value to the corresponding role
      const profileRoleMap = {
        player: "player",
        coach: "coach",
        agent: "agent",
        scout: "scout",
        other: "other",
      };
      const selectedRole = profileRoleMap[selectedProfileValue];

      // Update the form data with the selected role
      setFormData({
        ...formData,
        [e.target.name]: selectedProfileValue,
        roles: [selectedRole], // Set the roles field to the selected role
      });

      // Reset any profile error state since a profile has been selected
      setProfileError(false);
    } else {
      // For other input fields, update the form data as usual
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

      // Reset any input errors for the changed field
      setInputErrors({
        ...inputErrors,
        [e.target.name]: undefined,
      });
    }
  };

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    gender: "",
    nationality: "",
    countryresidence: "",
    cityresidence: "",
    tel: "",
    email: "",
    login: "",
    profil: "",
    password: "",
    // Additional fields for player
    height: "",
    weight: "",
    PiedFort: "",
    Licence: "",
    NumeroWhatsup: "",
    positionPlay: "",
    positionSecond: "",
    skillsInProfile: "",

    // Additional fields for coach
    totalTeam: "",
    countryCoachedIn: "",
    footballTactic: "",
    skills: "",
    // Additional fields for agent
    totalCareerTransfers: "",
    clubCovered: "",
    totalPlayer: "",
    typeresponsable: "",
    skillsagent: "",
    pays: "",
    paysclub: "",
    //scout
    engagement: "",
    nb_joueurdetecter: "",
    paysscout: "",
    skillsscout: "",
    //other
    profession: "",
    skillsAutre: "",
    //role
    roles: [],
  });

  //   const handleInputChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleNextStep1 = () => {
    // Password validation
    if (!isPasswordValid()) {
      setValidationError(
        "Password must be at least 8 characters long and include one uppercase letter and one special character"
      );
      return;
    }

    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    // Required fields for step 1
    const requiredFields = [
      "nom",
      "prenom",
      "date_naissance",
      "gender",
      "nationality",
      "countryresidence",
      "cityresidence",
      "tel",
      "email",
      "login",
      "password",
    ];

    // Check if all required fields are filled in
    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );

    if (areAllFieldsFilled) {
      // Your existing code for setting formData

      // Example: Navigate to the next step
      setStep(step + 1);
    } else {
      // Set error messages for empty fields
      const errors = {};
      requiredFields.forEach((field) => {
        if (formData[field] === "") {
          errors[field] = "This field is required";
        }
      });
      setInputErrors(errors);

      // Alert the user or provide feedback that some fields are missing
      console.log("Please fill in all required fields.");
    }
  };

  const handleNextStep = () => {
    if (!isPasswordValid()) {
      setValidationError(
        "Password must be at least 8 characters long and include one uppercase letter and one special character"
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    const profileRoleMap = {
      player: "player",
      coach: "coach",
      agent: "agent",
      scout: "scout",
      other: "other",
    };

    const selectedProfile = formData.profil;
    const selectedRole = profileRoleMap[selectedProfile];

    // Check if all required fields are filled in
    const requiredFields = [
      "nom",
      "prenom",
      "date_naissance",
      "gender",
      "nationality",
      "countryresidence",
      "cityresidence",
      "tel",
      "email",
      "login",
      "profil",
      "password",
    ];
    const isProfileSelected = selectedProfile !== "";
    setProfileError(!isProfileSelected); // Set profile error state

    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );

    console.log("Selected Profile:", selectedProfile);
    console.log("Form Data:", formData);
    console.log("Are All Fields Filled:", areAllFieldsFilled);
    console.log("Is Profile Selected:", isProfileSelected);

    if (areAllFieldsFilled && isProfileSelected) {
      if (
        selectedProfile === "player" ||
        selectedProfile === "coach" ||
        selectedProfile === "agent" ||
        selectedProfile === "scout" ||
        selectedProfile === "other"
      ) {
        setFormData({
          ...formData,
          roles: [selectedRole],
        });
        setStep(3); // Navigate to step 2 if the selected profile is "player"
      } else {
        setFormData({
          ...formData,
          roles: [selectedRole],
        });
        setStep(step + 1);
      }
    } else {
      // Set error messages for empty fields
      const errors = {};
      requiredFields.forEach((field) => {
        if (formData[field] === "") {
          errors[field] = "This field is required";
        }
      });
      setInputErrors(errors);

      // Alert the user or provide feedback that some fields are missing
      console.log("Please fill in all required fields.");
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleRoleChange = (selectedRoles) => {
    setFormData({
      ...formData,
      roles: selectedRoles,
    });
  };

  const getRequiredFields = (step) => {
    if (step === 3) {
      if (selectedProfile === "player") {
        return [
          "height",
          "weight",
          "PiedFort",
          "Licence",
          "NumeroWhatsup",
          "positionPlay",
          "positionSecond",
          // Add other required fields for player...
        ];
      } else if (selectedProfile === "coach") {
        return [
          "totalTeam",
          "countryCoachedIn",
          "footballTactic",
          "skills",
          // Add other required fields for coach...
        ];
      } else if (selectedProfile === "agent") {
        if (formData.typeresponsable === "club") {
          return [
            "clubCovered",
            "paysclub",
            // Add other required fields for club...
          ];
        } else if (formData.typeresponsable === "players") {
          return [
            "totalPlayer",
            "pays",
            "totalCareerTransfers",

            // Add other required fields for players...
          ];
        }
      } else if (selectedProfile === "scout") {
        return [
          "engagement",
          "nb_joueurdetecter",
          "paysscout",
          "skillsscout",

          // Add other required fields for players...
        ];
      } else if (selectedProfile === "other") {
        return [
          "profession",
          "skillsAutre",

          // Add other required fields for players...
        ];
      }
    }
    return [];
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Submit button clicked!"); // Add this line

  //   const selectedCoachSkills = formData.skills.split(",");

  //   if (selectedCoachSkills.length === 0) {
  //     setSkillsError(true);
  //     return;
  //   } else {
  //     setSkillsError(false);
  //   }
  //   if (selectedSkills.length > 1) {
  //     console.log("Skills error detected");
  //   }

  //   // Validate other fields
  //   const requiredFields = getRequiredFields(step);

  //   const areAllFieldsFilled = requiredFields.every(
  //     (field) => formData[field] !== ""
  //   );

  //   if (areAllFieldsFilled) {
  //     try {
  //       const response = await fetch("http://localhost:8088/api/auth/signup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (response.ok) {
  //         const responseData = await response.json();

  //         console.log("Server Response Data:", responseData);
  //         navigate("/login");
  //         console.log("User registered successfully!");
  //       } else {
  //         console.error("Registration failed.");
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   } else {
  //     // Set error messages for empty fields
  //     const errors = {};
  //     requiredFields.forEach((field) => {
  //       if (formData[field] === "") {
  //         errors[field] = "This field is required";
  //       }
  //     });
  //     setInputErrors(errors);

  //     if (selectedCoachSkills.length === 0) {
  //       setSkillsError(true);
  //       return;
  //     } else {
  //       setSkillsError(false);
  //     }
  //     // Log the errors to the console
  //     console.log("Input Errors:", errors);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");
  
    const selectedCoachSkills = formData.skills.split(",");
  
    if (selectedCoachSkills.length === 0) {
      setSkillsError(true);
      return;
    } else {
      setSkillsError(false);
    }
    if (selectedSkills.length > 1) {
      console.log("Skills error detected");
    }
  
    // Validate other fields
    const requiredFields = getRequiredFields(step);
  
    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );
  
    if (areAllFieldsFilled) {
      try {
        const response = await fetch("https://odine-sport.com/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
  
          console.log("Server Response Data:", responseData);
          navigate("/login");
          console.log("User registered successfully!");
        } else {
          // Check if the email is already in use
          if (response.status === 409) {
            // Assuming status code 409 indicates a conflict, i.e., email already in use
            setValidationError("Email is already in use. Please use a different email.");
          } else {
            console.error("Registration failed.");
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      // Set error messages for empty fields
      const errors = {};
      requiredFields.forEach((field) => {
        if (formData[field] === "") {
          errors[field] = "This field is required";
        }
      });
      setInputErrors(errors);
  
      if (selectedCoachSkills.length === 0) {
        setSkillsError(true);
        return;
      } else {
        setSkillsError(false);
      }
      // Log the errors to the console
      console.log("Input Errors:", errors);
    }
  };
  
  return (
    <Fragment>
      <div className="main-wrap bg-slate-100 ">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <Link to="/">
              <img src={Logo} className="h-14 w-14 " />
              <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">
                ODIN E-SPORT{" "}
              </span>{" "}
            </Link>

            <button className="nav-menu me-0 ms-auto"></button>

            <a
              href="/login"
              className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
            >
              Se connecter
            </a>
            <a
              href="/register"
              className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
            >
              Register
            </a>
          </div>
        </div>

        <div className="row ">
          <div className="col-xl-4 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat">
            <div className="h-full flex items-center justify-center mt-14 ml-10">
              <img
                src={Login}
                className="object-contain max-h-full "
                alt="Login Image"
              />
            </div>
          </div>
          <div className="col-xl-8 h-full  align-items-center d-flex bg-slate-100 rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ml-6 me-auto login-card bg-slate-100 ">
              <div className="card-body rounded-0 text-center ml-6    ">
                <h2 className="text-center items-center text-3xl font-bold mt-6  bg-slate-100 ">
                  Creer une compte
                </h2>
                <div className="sm:h-[340] sm:w-[350px] lg:h-[680px] lg:w-[750px] xl:h-[680px] xl:w-[700px] lg:mt-10 overflow-y-visible  overflow-x-hidden ">
                  <form
                    className="w-auto h-full sm:w-full  "
                    onSubmit={handleSubmit}
                  >
                    {step === 1 && (
                      <div className="h-max lg:w-full  ">
                        {/* <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                        <input
                          type="text"
                          className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="Profil"
                        />
                      </div> */}

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["nom"] ? "is-invalid" : ""
                            }`}
                            placeholder="Your Name"
                          />
                          {inputErrors["nom"] && (
                            <div className="invalid-feedback">
                              {inputErrors["nom"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.prenom}
                            id="prenom"
                            name="prenom"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["prenom"] ? "is-invalid" : ""
                            }`}
                            placeholder="Your Prenom"
                            onChange={handleInputChange}
                          />
                          {inputErrors["prenom"] && (
                            <div className="invalid-feedback">
                              {inputErrors["prenom"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-email text-grey-500 pe-0"></i>
                          <input
                            type="email"
                            value={formData.email}
                            id="email"
                            name="email"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["email"] ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                            onChange={handleInputChange}
                          />
                          {inputErrors["email"] && (
                            <div className="invalid-feedback">
                              {inputErrors["email"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                          <input
                            type="password"
                            value={formData.password}
                            id="password"
                            name="password"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              validationError ? "is-invalid" : ""
                            }`}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          {validationError && (
                            <div className="invalid-feedback">
                              {validationError}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              validationError ? "is-invalid" : ""
                            }`}
                            placeholder="Confirm Password"
                            onChange={handleInputChange}
                          />
                          {validationError && (
                            <div className="invalid-feedback">
                              {validationError}
                            </div>
                          )}
                        </div>

                        {/* Additional form fields */}

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-calendar text-grey-500 pe-0"></i>
                          <input
                            type="date"
                            value={formData.date_naissance}
                            name="date_naissance"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Date of Birth"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["gender"] ? "is-invalid" : ""
                            }`}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {inputErrors["gender"] && (
                            <div className="invalid-feedback">
                              {inputErrors["gender"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <select
                            name="nationality"
                            value={formData.nationality}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["nationality"] ? "is-invalid" : ""
                            }`}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select Nationality
                            </option>
                            {generateOptions("nationalite")}
                          </select>
                          {inputErrors["nationality"] && (
                            <div className="invalid-feedback">
                              {inputErrors["nationality"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <select
                            name="countryresidence"
                            value={formData.countryresidence}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["countryresidence"]
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select Country of Residence
                            </option>
                            {generateOptions("libelle")}
                          </select>
                          {inputErrors["countryresidence"] && (
                            <div className="invalid-feedback">
                              {inputErrors["countryresidence"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-location-pin text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            name="cityresidence"
                            value={formData.cityresidence}
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["cityresidence"] ? "is-invalid" : ""
                            }`}
                            placeholder="City of Residence"
                            onChange={handleInputChange}
                          />
                          {inputErrors["cityresidence"] && (
                            <div className="invalid-feedback">
                              {inputErrors["cityresidence"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-mobile text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.tel}
                            id="tel"
                            name="tel"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["tel"] ? "is-invalid" : ""
                            }`}
                            placeholder="Phone Number"
                            onChange={handleInputChange}
                          />
                          {inputErrors["tel"] && (
                            <div className="invalid-feedback">
                              {inputErrors["tel"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            value={formData.login}
                            id="login"
                            name="login"
                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["login"] ? "is-invalid" : ""
                            }`}
                            placeholder="Login"
                            onChange={handleInputChange}
                          />
                          {inputErrors["login"] && (
                            <div className="invalid-feedback">
                              {inputErrors["login"]}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-1">
                          <button
                            type="button"
                            onClick={handleNextStep1}
                            className="form-control flex  items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                          >
                            Suivant
                          </button>
                        </div>
                      </div>
                    )}

                    {/* {step === 2 && (
                      <div className="h-max w-full ">
                        <div className="row">
                          <label className="mb-2 text-2xl font-serif">
                            Choisir une Profile :
                          </label>
                          {["player", "coach", "agent", "scout", "other"].map(
                            (profile) => (
                              <div
                                key={profile}
                                className="col-6 col-md-2 mb-3"
                              >
                                <div
                                  className={`bg-white w-28 h-40 rounded-lg p-4  ${
                                    selectedProfile === profile
                                      ? "border-y-indigo-800"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    id={profile}
                                    name="profil"
                                    value={profile}
                                    checked={selectedProfile === profile}
                                    onChange={() => {
                                      const selectedProfileValue = profile;
                                      console.log(
                                        "Selected Profile Value:",
                                        selectedProfileValue
                                      );
                                      setSelectedProfile(selectedProfileValue);
                                      handleInputChange({
                                        target: {
                                          name: "profil",
                                          value: selectedProfileValue,
                                        },
                                      });
                                    }}
                                    className="form-check-input"
                                  />
                                  <label
                                    htmlFor={profile}
                                    className="form-check-label text-2xl text-black "
                                  >
                                    {profile.charAt(0).toUpperCase() +
                                      profile.slice(1)}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                          {console.log(profileError)}
                          {profileError && (
                            <div className="text-danger mt-2">
                              Please select a profile before proceeding.
                            </div>
                          )}
                        </div>

                      

                        <div
                          className="form-group mb-1 mt-48 "
                          style={{ display: "flex" }}
                        >
                          {" "}
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="form-control flex  items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )} */}
                    {step === 2 && (
                      <div className="h-max w-full">
                        <div className="row">
                          <label className="mb-2 text-2xl font-serif">
                            Choisir une Profile :
                          </label>
                          {profilesData.map((data) => (
                            <div
                              key={data.profile}
                              className="col-6 col-md-2 mb-3"
                            >
                              <div
                                className={`bg-white w-32 h-40 rounded-lg p-2  cursor-pointer ${
                                  selectedProfile === data.profile
                                    ? "bg-blue-500 "
                                    : ""
                                }`}
                                onClick={() => {
                                  const selectedProfileValue = data.profile;
                                  console.log(
                                    "Selected Profile Value:",
                                    selectedProfileValue
                                  );
                                  setSelectedProfile(selectedProfileValue);
                                  handleInputChange({
                                    target: {
                                      name: "profil",
                                      value: selectedProfileValue,
                                    },
                                  });
                                }}
                              >
                                {/* <label
                                  className={`text-2xl  ${
                                    selectedProfile === data.profile
                                      ? "text-blue-600 animate-pulse"
                                      : "text-black "
                                  }`}
                                >
                                  {data.profile.charAt(0).toUpperCase() +
                                    data.profile.slice(1)}
                                </label> */}
                                <div
                                  className={`text-2xl  ${
                                    selectedProfile === data.profile
                                      ? "bg-blue-600  rounded-3xl"
                                      : "text-black "
                                  }`}
                                >
                                  {" "}
                                  <img
                                    src={data.logo}
                                    alt="Logo"
                                    className="w-16 h-16 mt-2"
                                  />
                                </div>
                                <p className="text-base mt-2">
                                  {data.description}
                                </p>
                              </div>
                            </div>
                          ))}
                          {console.log(profileError)}
                          {profileError && (
                            <div className="text-danger mt-2">
                              Please select a profile before proceeding.
                            </div>
                          )}
                        </div>

                        <div
                          className="form-group mb-1 mt-48"
                          style={{ display: "flex" }}
                        >
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                          >
                            Retour
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="form-control flex  items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                          >
                            Suivant
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        {formData.profil === "player" && (
                          <div style={{ maxHeight: "1000px" }}>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-arrow-up text-grey-500 pe-0"></i>
                              <input
                                type="number" // Use type "number" for weight input
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["weight"] ? "is-invalid" : ""
                                }`}
                                placeholder="Weight (kg)"
                                onChange={handleInputChange}
                              />
                              {inputErrors["weight"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["weight"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-anchor text-grey-500 pe-0"></i>
                              <input
                                type="number" // Use type "number" for height input
                                id="height"
                                name="height"
                                value={formData.height}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["height"] ? "is-invalid" : ""
                                }`}
                                placeholder="Height (cm)"
                                onChange={handleInputChange}
                              />
                              {inputErrors["height"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["height"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-thumb-up text-grey-500 pe-0"></i>
                              <select
                                id="PiedFort"
                                name="PiedFort"
                                value={formData.PiedFort}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["PiedFort"] ? "is-invalid" : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Pied Forte
                                </option>
                                <option value="PiedGauche">Pied Gauche</option>
                                <option value="PiedDroit">Pied Droit</option>
                                <option value="DeuxPieds">
                                  Les deux pieds
                                </option>
                              </select>
                              {inputErrors["PiedFort"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["PiedFort"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-id-badge text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="Licence"
                                name="Licence"
                                value={formData.Licence}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["Licence"] ? "is-invalid" : ""
                                }`}
                                placeholder="Licence"
                                onChange={handleInputChange}
                              />
                              {inputErrors["Licence"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["Licence"]}
                                </div>
                              )}
                            </div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-headphone-alt text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="NumeroWhatsup"
                                name="NumeroWhatsup"
                                value={formData.NumeroWhatsup}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["NumeroWhatsup"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Numero Whatsup"
                                onChange={handleInputChange}
                              />
                              {inputErrors["NumeroWhatsup"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["NumeroWhatsup"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-pin text-grey-500"></i>
                              <select
                                id="positionPlay"
                                name="positionPlay"
                                value={formData.positionPlay}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["positionPlay"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Primary Position
                                </option>
                                <option value="Gardien de but">
                                  Gardien de but
                                </option>
                                <option value="Défenseur central">
                                  Défenseur central
                                </option>
                                <option value="Arrière droit">
                                  Arrière droit
                                </option>
                                <option value="Arrière gauche">
                                  Arrière gauche
                                </option>
                                <option value="Milieu défensif">
                                  Milieu défensif
                                </option>
                                <option value="Milieu central">
                                  Milieu central
                                </option>
                                <option value="Milieu offensif">
                                  Milieu offensif
                                </option>
                                <option value="Ailier droit">
                                  Ailier droit
                                </option>
                                <option value="Ailier gauche">
                                  Ailier gauche
                                </option>
                                <option value="Attaquant de pointe">
                                  Attaquant de pointe
                                </option>
                                <option value="Attaquant polyvalent">
                                  Attaquant polyvalent
                                </option>
                              </select>
                              {inputErrors["positionPlay"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["positionPlay"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-pin text-grey-500"></i>
                              <select
                                id="positionSecond"
                                name="positionSecond"
                                value={formData.positionSecond}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["positionSecond"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Secondary Position
                                </option>
                                <option value="Gardien de but (GK)">
                                  Gardien de but (GK)
                                </option>
                                <option value="Arrière droit (RB)">
                                  Arrière droit (RB)
                                </option>
                                <option value="Arrière gauche( LB)">
                                  Arrière gauche( LB)
                                </option>
                                <option value="Défenseur central (CB)">
                                  Défenseur central (CB)
                                </option>
                                <option value="Milieu défensif (CDM)">
                                  Milieu défensif (CDM)
                                </option>
                                <option value="Milieu central ( CM)">
                                  Milieu central ( CM)
                                </option>
                                <option value="Milieu offensif ( CAM)">
                                  Milieu offensif ( CAM)
                                </option>
                                <option value="Ailier droit (RW)">
                                  Ailier droit (RW)
                                </option>
                                <option value="Ailier gauche ( LW)">
                                  Ailier gauche ( LW)
                                </option>
                                <option value="Avant-centre ">
                                  Avant-centre ( ST)
                                </option>
                              </select>
                              {inputErrors["positionSecond"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["positionSecond"]}
                                </div>
                              )}
                            </div>
                            <div className="form-group icon-input mb-3">
                              {[
                                "Rapidite",
                                "Tacle",
                                "Defence",
                                "Tirs de loin",
                                "jeu en une touche",
                                "Rapidite de la prise de désicion",
                                "Frappe puissante",
                                "Agilité",
                                "Controller du Ballon",
                                "Dribble",
                                "Exploitation de l'espace",
                                "Evaluation des risques sur les terrain",
                                "Endurance",
                                "Equilibre et Coordination",
                                "Auto-Motivation",
                                // Add other skills...
                              ].map((skillsInProfile) => (
                                <div
                                  key={skillsInProfile}
                                  className="form-check form-check-inline me-2 mb-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={skillsInProfile}
                                    name="skillsInProfile"
                                    checked={selectedSkills.includes(
                                      skillsInProfile
                                    )}
                                    onChange={() =>
                                      handleSkillToggle(skillsInProfile)
                                    }
                                    className="form-check-input d-none"
                                  />
                                  <label
                                    htmlFor={skillsInProfile}
                                    className={`form-check-label btn ${
                                      formData.skillsInProfile
                                        .split(",")
                                        .includes(skillsInProfile)
                                        ? "btn-secondary" // Change this to the color you want after selecting
                                        : "btn-light" // Change this to the color you want before selecting
                                    }`}
                                  >
                                    {skillsInProfile}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {skillsError && (
                              <div className="text-danger mt-2">
                                Please select at least one skill (up to 10)
                                before proceeding.
                              </div>
                            )}

                            <div
                              className="form-group mb-1"
                              style={{ display: "flex" }}
                            >
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {formData.profil === "coach" && (
                          <div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-medall text-grey-500 pe-0"></i>
                              <input
                                type="number"
                                id="totalTeam"
                                name="totalTeam"
                                value={formData.totalTeam}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["totalTeam"] ? "is-invalid" : ""
                                }`}
                                placeholder="Total Team"
                                onChange={handleInputChange}
                              />
                              {inputErrors["totalTeam"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["totalTeam"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-strategy text-grey-500 pe-0"></i>
                              <select
                                name="footballTactic"
                                value={formData.footballTactic}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["footballTactic"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Football Tactic
                                </option>
                                <option value="4-4-2">4-4-2</option>
                                <option value="4-3-3">4-3-3</option>
                                <option value="4-2-3-1">4-2-3-1</option>
                                <option value="5-3-2">5-3-2</option>
                                <option value="5-4-1">5-4-1</option>
                                <option value="catenaccio">3-4-3</option>
                              </select>
                              {inputErrors["footballTactic"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["footballTactic"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-world text-grey-500 pe-0"></i>
                              <select
                                name="countryCoachedIn"
                                value={formData.countryCoachedIn}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["countryCoachedIn"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Country Coached In
                                </option>
                                {generateOptions("libelle")}
                              </select>
                              {inputErrors["countryCoachedIn"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["countryCoachedIn"]}
                                </div>
                              )}
                            </div>

                            {/* <div className="form-group icon-input mb-3">
            <input
              type="text"
              id="skills"
              name="skills"
              
              className={` ${
                inputErrors["skills"] ? "is-invalid" : ""
              }`}
              onChange={handleInputChange}
            />
            {inputErrors["skills"] && (
              <div className="invalid-feedback">{inputErrors["skills"]}</div>
            )}
          </div> */}

                            <div className="form-group icon-input mb-3">
                              {[
                                "Connaissance Tactique",
                                "Competence Technique",
                                "Leadership",
                                "Communication",
                                "Gestion de groupe",
                                "Analyse",
                                "Planification",
                                "Adaptabilité",
                                "Ethique",
                                "Connaissance des regles",
                                "Gestion de stress",
                                "Developpement individuel",
                                "Empathie",
                                // Add other coach-specific skills...
                              ].map((coachSkill) => (
                                <div
                                  key={coachSkill}
                                  className="form-check form-check-inline me-2 mb-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={coachSkill}
                                    name="coachSkillsInProfile"
                                    checked={formData.skills
                                      .split(",")
                                      .includes(coachSkill)}
                                    onChange={() =>
                                      handleCoachSkillToggle(coachSkill)
                                    }
                                    className="form-check-input d-none"
                                  />
                                  <label
                                    htmlFor={coachSkill}
                                    className={`form-check-label btn ${
                                      formData.skills
                                        .split(",")
                                        .includes(coachSkill)
                                        ? "btn-secondary"
                                        : "btn-light"
                                    } ${
                                      !formData.skills
                                        .split(",")
                                        .includes(coachSkill) &&
                                      coachSkillsError
                                        ? "border-danger"
                                        : ""
                                    }`}
                                  >
                                    {coachSkill}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {!formData.skills
                              .split(",")
                              .some((skill) => skill.trim() !== "") && (
                              <div className="text-danger mt-2">
                                Please select at least one coach skill before
                                proceeding (up to 10).
                              </div>
                            )}

                            <div
                              className="form-group mb-1"
                              style={{ display: "flex" }}
                            >
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {formData.profil === "agent" && (
                          <div>
                            <label
                              htmlFor="typeresponsable"
                              className="block mb-2"
                            >
                              Type Responsable:
                            </label>
                            <select
                              id="typeresponsable"
                              name="typeresponsable"
                              className={`w-full p-2 mb-4 ${
                                inputErrors["typeresponsable"]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleInputChange}
                              value={formData.typeresponsable}
                              required
                            >
                              <option value="">
                                Select Le Type De Responsabilité
                              </option>
                              <option value="club">Club</option>
                              <option value="players">Players</option>
                            </select>
                            {inputErrors["typeresponsable"] && (
                              <div className="invalid-feedback">
                                {inputErrors["typeresponsable"]}
                              </div>
                            )}

                            {formData.typeresponsable && (
                              <div>
                                {formData.typeresponsable === "club" && (
                                  <div>
                                    <label
                                      htmlFor="clubCovered"
                                      className="block text-left mb-2"
                                    >
                                      Nom du Club:
                                    </label>
                                    <div className="form-group icon-input mb-3">
                                      <i className="font-sm ti-flag-alt-2 text-grey-500 pe-0"></i>
                                      <input
                                        type="text"
                                        id="clubCovered"
                                        name="clubCovered"
                                        className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                          inputErrors["clubCovered"]
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        onChange={handleInputChange}
                                        value={formData.clubCovered}
                                        placeholder="Enter club covered"
                                      />
                                      {inputErrors["clubCovered"] && (
                                        <div className="invalid-feedback">
                                          {inputErrors["clubCovered"]}
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="paysclub"
                                        className="block text-left mb-2"
                                      >
                                        Nom du Pays:
                                      </label>
                                      <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-flag-alt-2 text-grey-500 pe-0"></i>
                                        <select
                                          name="paysclub"
                                          value={formData.paysclub}
                                          className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                            inputErrors["paysclub"]
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          onChange={handleInputChange}
                                        >
                                          <option value="" disabled>
                                            Select Country
                                          </option>
                                          {generateOptions("libelle")}
                                        </select>
                                        {inputErrors["paysclub"] && (
                                          <div className="invalid-feedback">
                                            {inputErrors["paysclub"]}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {formData.typeresponsable === "players" && (
                                  <div>
                                    <label
                                      htmlFor="totalPlayer"
                                      className="block mb-2"
                                    >
                                      Totale du Joueurs:
                                    </label>
                                    <input
                                      type="number"
                                      id="totalPlayer"
                                      name="totalPlayer"
                                      className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                        inputErrors["totalPlayer"]
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      onChange={handleInputChange}
                                      value={formData.totalPlayer}
                                      placeholder="Enter total players managed"
                                    />
                                    {inputErrors.totalPlayer && (
                                      <div className="invalid-feedback">
                                        {inputErrors.totalPlayer}
                                      </div>
                                    )}

                                    <label
                                      htmlFor="totalCareerTransfers"
                                      className="block mb-2"
                                    >
                                      Total Career Transfers:
                                    </label>
                                    <input
                                      type="number"
                                      id="totalCareerTransfers"
                                      name="totalCareerTransfers"
                                      className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                        inputErrors["totalCareerTransfers"]
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      onChange={handleInputChange}
                                      value={formData.totalCareerTransfers}
                                      placeholder="Enter total career transfers for club"
                                    />
                                    {inputErrors.totalCareerTransfers && (
                                      <div className="invalid-feedback">
                                        {inputErrors.totalCareerTransfers}
                                      </div>
                                    )}

                                    <div>
                                      <label
                                        htmlFor="pays"
                                        className="block mb-2"
                                      >
                                        Nom du Pays:
                                      </label>
                                      <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-flag-alt-2 text-grey-500 pe-0"></i>
                                        <select
                                          name="pays"
                                          value={formData.pays}
                                          className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                            inputErrors["pays"]
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          onChange={handleInputChange}
                                        >
                                          <option value="" disabled>
                                            Select Country
                                          </option>
                                          {generateOptions("libelle")}
                                        </select>
                                        {inputErrors["pays"] && (
                                          <div className="invalid-feedback">
                                            {inputErrors["pays"]}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            <div
                              className="form-group mb-1"
                              style={{ display: "flex" }}
                            >
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {formData.profil === "scout" && (
                          <div>
                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-ticket text-grey-500 pe-0"></i>
                              <select
                                name="engagement"
                                value={formData.engagement}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["engagement"] ? "is-invalid" : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Engagement
                                </option>
                                <option value="plein-temps">Plein Temps</option>
                                <option value="mi-temps">Mi-Temps</option>
                                <option value="volontaire">Volontaire</option>
                              </select>
                              {inputErrors["engagement"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["engagement"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-basketball text-grey-500 pe-0"></i>
                              <input
                                type="number"
                                id="nb_joueurdetecter"
                                name="nb_joueurdetecter"
                                value={formData.nb_joueurdetecter}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["nb_joueurdetecter"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Nomber des joueurs detecter"
                                onChange={handleInputChange}
                              />
                              {inputErrors["nb_joueurdetecter"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["nb_joueurdetecter"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-map-alt text-grey-500 pe-0"></i>
                              <select
                                name="paysscout"
                                value={formData.paysscout}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["paysscout"] ? "is-invalid" : ""
                                }`}
                                onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  Select Pays
                                </option>
                                {generateOptions("libelle")}
                              </select>
                              {inputErrors["paysscout"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["paysscout"]}
                                </div>
                              )}
                            </div>

                            <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-user text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="skillsscout"
                                name="skillsscout"
                                onChange={handleInputChange}
                                value={formData.skillsscout}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["skillsscout"] ? "is-invalid" : ""
                                }`}
                                placeholder="Skill"
                              />
                              {inputErrors["skillsscout"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["skillsscout"]}
                                </div>
                              )}
                            </div>

                            <div
                              className="form-group mb-1"
                              style={{ display: "flex" }}
                            >
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {formData.profil === "other" && (
                          <div>
                            <label htmlFor="profession" className="block mb-2">
                              Profession
                            </label>
                            <select
                              id="profession"
                              name="profession"
                              className={`w-full p-2 mb-4 ${
                                inputErrors["profession"] ? "is-invalid" : ""
                              }`}
                              onChange={handleInputChange}
                              value={formData.profession}
                              required
                            >
                              <option value="">Select Type Responsable</option>
                              <option value="Fan Football">Fan Football</option>
                              <option value="Journaliste Sportif">
                                Journaliste Sportif
                              </option>
                              <option value="Arbitre Football">
                                Arbitre Football
                              </option>
                              <option value="Analyste de performance ">
                                Analyste de performance
                              </option>
                              <option value="Nutrtitionniste">
                                Nutrtitionniste
                              </option>
                              <option value="Physiotherpeute">
                                Physiotherpeute
                              </option>
                              <option value="Analyste de football">
                                Analyste de football
                              </option>
                              <option value="Médecin d'équipe">
                                Médecin d'équipe
                              </option>
                              <option value="Prof de fitnesse">
                                Prof de fitnesse
                              </option>
                            </select>
                            {inputErrors["Profession"] && (
                              <div className="invalid-feedback">
                                {inputErrors["Profession"]}
                              </div>
                            )}

                            {formData.profession && (
                              <div>
                                {formData.profession === "Fan Football" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Engagement emotionnel",
                                      "Fidelité",
                                      "Defence",
                                      "Esprit Sportif",
                                      "Réseautage Social",
                                      "Rapidite de la prise de désicion",
                                      "Adabtabilité",
                                      "Motivation",
                                      "Respecter",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession ===
                                  "Journaliste Sportif" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Rechercher",
                                      "Rédaction",
                                      "Communication",
                                      "Maitrise des Medias sociaux",
                                      "Rédactivé",
                                      "Gestion du Temps",
                                      "Analyse critique",
                                      "Adaptabilité",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession === "Arbitre Football" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Encouragement",
                                      "Ecoute",
                                      "Communication",
                                      "Leadership",
                                      "motivation",
                                      "Autorité et respect",
                                      "Gestion des Conflits",
                                      "Réactivité",
                                      "Gestion de stress",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession ===
                                  "Analyste de performance" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Esprit Equipe",
                                      "Adaptabilité",
                                      "Communication",
                                      "Collaboration",
                                      "Analyse vidéo",
                                      "Gestion du temps",
                                      "Gestion de stress",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession === "Nutrtitionniste" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Evaluation nutrionnelle",
                                      "Planfication de régimes",
                                      "Communication",
                                      "Ecoute",
                                      "Encouragement",
                                      "Compréhension des besoin",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession === "Physiotherpeute" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Ethique professionnelle",
                                      "Gestion du temps",
                                      "Empathy",
                                      "Compétences Physiothérapeute",
                                      "Analyse des mouvements sportifs",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession ===
                                  "Analyste de football" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Compétences analytiques",
                                      "Compétences statstiques",
                                      "Connaissance tactique",
                                      "Communication Efficace",
                                      "Adabtabilité",
                                      "Compréension des adversaires",
                                      "Rapports détaillés",
                                      "Collaboration",
                                      "Gestion du temps",
                                      "Ethique professionnelle",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {formData.profession === "Médecin d'équipe" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Diagnostic des blessures",
                                      "Prévention des blessures",
                                      "Gestion du stress",
                                      "Technologie médicale",
                                      "Empathy",
                                      "Calme",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {formData.profession === "Prof de fitnesse" && (
                                  <div className="form-group icon-input mb-3">
                                    {[
                                      "Adaptabilité",
                                      "Communication",
                                      "Motivation",
                                      "Encadrement en groupe",
                                      "Ecoute",
                                      "Encouragement",
                                      "Leadership",
                                    ].map((skillsAutre) => (
                                      <div
                                        key={skillsAutre}
                                        className="form-check form-check-inline me-2 mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          id={skillsAutre}
                                          name="skillsAutre"
                                          checked={selectedSkills.includes(
                                            skillsAutre
                                          )}
                                          onChange={() =>
                                            handleSkillToggleAutre(skillsAutre)
                                          }
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${
                                            formData.skillsAutre
                                              .split(",")
                                              .includes(skillsAutre)
                                              ? "btn-secondary" // Change this to the color you want after selecting
                                              : "btn-light" // Change this to the color you want before selecting
                                          }`}
                                        >
                                          {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* <div className="form-group icon-input mb-3">
                              <i className="font-sm ti-basketball text-grey-500 pe-0"></i>
                              <input
                                type="text"
                                id="skillsAutre"
                                name="skillsAutre"
                                value={formData.skillsAutre}
                                className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 ${
                                  inputErrors["skillsAutre"] ? "is-invalid" : ""
                                }`}
                                placeholder="Nomber des joueurs detecter"
                                onChange={handleInputChange}
                              />
                              {inputErrors["skillsAutre"] && (
                                <div className="invalid-feedback">
                                  {inputErrors["skillsAutre"]}
                                </div>
                              )}
                            </div> */}

                            <div
                              className="form-group mb-1"
                              style={{ display: "flex" }}
                            >
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Retour
                              </button>
                              <button
                                type="submit"
                                className="form-control flex items-center justify-between w-28 text-center style2-input text-white fw-600 bg-dark border-0 p-0 me-2"
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>

                <div className="col-sm-12 p-0 text-left">
                  {/* <div className="form-group mb-1"><a href="/register" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Register</a></div> */}
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Already have account{" "}
                    <a href="/login" className="fw-700 ms-1">
                      Login
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
