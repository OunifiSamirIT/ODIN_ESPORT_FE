import React, { Component, Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../assets/Loggin.png";
import Logo from "../assets/logo.png";
import Logo1 from "../assets/1.png";
import Logo2 from "../assets/2.png";
import Logo3 from "../assets/3.png";
import Logo4 from "../assets/4.png";
import Logo5 from "../assets/5.png";
import paysAll from "../../Pays.json";
// import pays from "./Pays.json";
import { v4 as uuidv4 } from "uuid";
import ReactFlagsSelect from "react-flags-select";
import "./flags.css";
import Select from "react-select";

import "flag-icon-css/css/flag-icons.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
const paysAllInfo = [
  {
    name: "Andorra",
    region: "Europe",
    timezones: {
      "Europe/Andorra": "+02:00",
    },
    iso: {
      "alpha-2": "AD",
      "alpha-3": "AND",
      numeric: "020",
    },
    phone: ["+376"],
    emoji: "🇦🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg",
    phoneLength: 6,
  },
  {
    name: "United Arab Emirates",
    region: "Asia",
    timezones: {
      "Asia/Dubai": "+04:00",
    },
    iso: {
      "alpha-2": "AE",
      "alpha-3": "ARE",
      numeric: "784",
    },
    phone: ["+971"],
    emoji: "🇦🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
    phoneLength: 9,
  },
  {
    name: "Afghanistan",
    region: "Asia",
    timezones: {
      "Asia/Kabul": "+04:30",
    },
    iso: {
      "alpha-2": "AF",
      "alpha-3": "AFG",
      numeric: "004",
    },
    phone: ["+93"],
    emoji: "🇦🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg",
    phoneLength: 9,
  },
  {
    name: "Antigua and Barbuda",
    region: "Americas",
    timezones: {
      "America/Antigua": "-04:00",
    },
    iso: {
      "alpha-2": "AG",
      "alpha-3": "ATG",
      numeric: "028",
    },
    phone: ["+1-268"],
    emoji: "🇦🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg",
    phoneLength: 10,
  },
  {
    name: "Anguilla",
    region: "Americas",
    timezones: {
      "America/Anguilla": "-04:00",
    },
    iso: {
      "alpha-2": "AI",
      "alpha-3": "AIA",
      numeric: "660",
    },
    phone: ["+1-264"],
    emoji: "🇦🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg",
    phoneLength: 10,
  },
  {
    name: "Albania",
    region: "Europe",
    timezones: {
      "Europe/Tirane": "+02:00",
    },
    iso: {
      "alpha-2": "AL",
      "alpha-3": "ALB",
      numeric: "008",
    },
    phone: ["+355"],
    emoji: "🇦🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg",
    phoneLength: 9,
  },
  {
    name: "Armenia",
    region: "Asia",
    timezones: {
      "Asia/Yerevan": "+04:00",
    },
    iso: {
      "alpha-2": "AM",
      "alpha-3": "ARM",
      numeric: "051",
    },
    phone: ["+374"],
    emoji: "🇦🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg",
    phoneLength: 6,
  },
  {
    name: "Angola",
    region: "Africa",
    timezones: {
      "Africa/Luanda": "+01:00",
    },
    iso: {
      "alpha-2": "AO",
      "alpha-3": "AGO",
      numeric: "024",
    },
    phone: ["+244"],
    emoji: "🇦🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg",
    phoneLength: 9,
  },
  {
    name: "Antarctica",
    region: "",
    timezones: {
      "Antarctica/Casey": "+11:00",
      "Antarctica/Davis": "+07:00",
      "Antarctica/DumontDUrville": "+10:00",
      "Antarctica/Mawson": "+05:00",
      "Antarctica/McMurdo": "+12:00",
      "Antarctica/Palmer": "-03:00",
      "Antarctica/Rothera": "-03:00",
      "Antarctica/Syowa": "+03:00",
      "Antarctica/Troll": "+02:00",
      "Antarctica/Vostok": "+06:00",
    },
    iso: {
      "alpha-2": "AQ",
      "alpha-3": "ATA",
      numeric: "010",
    },
    phone: ["+"],
    emoji: "🇦🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg",
    phoneLength: 6,
  },
  {
    name: "Argentina",
    region: "Americas",
    timezones: {
      "America/Argentina/Buenos_Aires": "-03:00",
      "America/Argentina/Catamarca": "-03:00",
      "America/Argentina/Cordoba": "-03:00",
      "America/Argentina/Jujuy": "-03:00",
      "America/Argentina/La_Rioja": "-03:00",
      "America/Argentina/Mendoza": "-03:00",
      "America/Argentina/Rio_Gallegos": "-03:00",
      "America/Argentina/Salta": "-03:00",
      "America/Argentina/San_Juan": "-03:00",
      "America/Argentina/San_Luis": "-03:00",
      "America/Argentina/Tucuman": "-03:00",
      "America/Argentina/Ushuaia": "-03:00",
    },
    iso: {
      "alpha-2": "AR",
      "alpha-3": "ARG",
      numeric: "032",
    },
    phone: ["+54"],
    emoji: "🇦🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg",
    phoneLength: [6, 7, 8],
  },
  {
    name: "American Samoa",
    region: "Oceania",
    timezones: {
      "Pacific/Pago_Pago": "-11:00",
    },
    iso: {
      "alpha-2": "AS",
      "alpha-3": "ASM",
      numeric: "016",
    },
    phone: ["+1-684"],
    emoji: "🇦🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg",
    phoneLength: 10,
  },
  {
    name: "Austria",
    region: "Europe",
    timezones: {
      "Europe/Vienna": "+02:00",
    },
    iso: {
      "alpha-2": "AT",
      "alpha-3": "AUT",
      numeric: "040",
    },
    phone: ["+43"],
    emoji: "🇦🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg",
    phoneLength: [10, 11],
  },
  {
    name: "Australia",
    region: "Oceania",
    timezones: {
      "Antarctica/Macquarie": "+10:00",
      "Australia/Adelaide": "+09:30",
      "Australia/Brisbane": "+10:00",
      "Australia/Broken_Hill": "+09:30",
      "Australia/Darwin": "+09:30",
      "Australia/Eucla": "+08:45",
      "Australia/Hobart": "+10:00",
      "Australia/Lindeman": "+10:00",
      "Australia/Lord_Howe": "+10:30",
      "Australia/Melbourne": "+10:00",
      "Australia/Perth": "+08:00",
      "Australia/Sydney": "+10:00",
    },
    iso: {
      "alpha-2": "AU",
      "alpha-3": "AUS",
      numeric: "036",
    },
    phone: ["+61"],
    emoji: "🇦🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg",
    phoneLength: 9,
  },
  {
    name: "Aruba",
    region: "Americas",
    timezones: {
      "America/Aruba": "-04:00",
    },
    iso: {
      "alpha-2": "AW",
      "alpha-3": "ABW",
      numeric: "533",
    },
    phone: ["+297"],
    emoji: "🇦🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg",
    phoneLength: 7,
  },
  {
    name: "Åland Islands",
    region: "Europe",
    timezones: {
      "Europe/Mariehamn": "+03:00",
    },
    iso: {
      "alpha-2": "AX",
      "alpha-3": "ALA",
      numeric: "248",
    },
    phone: ["+358-18"],
    emoji: "🇦🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg",
  },
  {
    name: "Azerbaijan",
    region: "Asia",
    timezones: {
      "Asia/Baku": "+04:00",
    },
    iso: {
      "alpha-2": "AZ",
      "alpha-3": "AZE",
      numeric: "031",
    },
    phone: ["+994"],
    emoji: "🇦🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg",
    phoneLength: 9,
  },
  {
    name: "Bosnia and Herzegovina",
    region: "Europe",
    timezones: {
      "Europe/Sarajevo": "+02:00",
    },
    iso: {
      "alpha-2": "BA",
      "alpha-3": "BIH",
      numeric: "070",
    },
    phone: ["+387"],
    emoji: "🇧🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg",
    phoneLength: 8,
  },
  {
    name: "Barbados",
    region: "Americas",
    timezones: {
      "America/Barbados": "-04:00",
    },
    iso: {
      "alpha-2": "BB",
      "alpha-3": "BRB",
      numeric: "052",
    },
    phone: ["+1-246"],
    emoji: "🇧🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg",
    phoneLength: 10,
  },
  {
    name: "Bangladesh",
    region: "Asia",
    timezones: {
      "Asia/Dhaka": "+06:00",
    },
    iso: {
      "alpha-2": "BD",
      "alpha-3": "BGD",
      numeric: "050",
    },
    phone: ["+880"],
    emoji: "🇧🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg",
    phoneLength: 10,
  },
  {
    name: "Belgium",
    region: "Europe",
    timezones: {
      "Europe/Brussels": "+02:00",
    },
    iso: {
      "alpha-2": "BE",
      "alpha-3": "BEL",
      numeric: "056",
    },
    phone: ["+32"],
    emoji: "🇧🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg",
    phoneLength: 9,
  },
  {
    name: "Burkina Faso",
    region: "Africa",
    timezones: {
      "Africa/Ouagadougou": "+00:00",
    },
    iso: {
      "alpha-2": "BF",
      "alpha-3": "BFA",
      numeric: "854",
    },
    phone: ["+226"],
    emoji: "🇧🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg",
    phoneLength: 8,
  },
  {
    name: "Bulgaria",
    region: "Europe",
    timezones: {
      "Europe/Sofia": "+03:00",
    },
    iso: {
      "alpha-2": "BG",
      "alpha-3": "BGR",
      numeric: "100",
    },
    phone: ["+359"],
    emoji: "🇧🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg",
    phoneLength: 9,
  },
  {
    name: "Bahrain",
    region: "Asia",
    timezones: {
      "Asia/Bahrain": "+03:00",
    },
    iso: {
      "alpha-2": "BH",
      "alpha-3": "BHR",
      numeric: "048",
    },
    phone: ["+973"],
    emoji: "🇧🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg",
    phoneLength: 8,
  },
  {
    name: "Burundi",
    region: "Africa",
    timezones: {
      "Africa/Bujumbura": "+02:00",
    },
    iso: {
      "alpha-2": "BI",
      "alpha-3": "BDI",
      numeric: "108",
    },
    phone: ["+257"],
    emoji: "🇧🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg",
    phoneLength: 8,
  },
  {
    name: "Benin",
    region: "Africa",
    timezones: {
      "Africa/Porto-Novo": "+01:00",
    },
    iso: {
      "alpha-2": "BJ",
      "alpha-3": "BEN",
      numeric: "204",
    },
    phone: ["+229"],
    emoji: "🇧🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg",
    phoneLength: 8,
  },
  {
    name: "Saint Barthélemy",
    region: "Americas",
    timezones: {
      "America/St_Barthelemy": "-04:00",
    },
    iso: {
      "alpha-2": "BL",
      "alpha-3": "BLM",
      numeric: "652",
    },
    phone: ["+590"],
    emoji: "🇧🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg",
    phoneLength: 9,
  },
  {
    name: "Bermuda",
    region: "Americas",
    timezones: {
      "Atlantic/Bermuda": "-03:00",
    },
    iso: {
      "alpha-2": "BM",
      "alpha-3": "BMU",
      numeric: "060",
    },
    phone: ["+1-441"],
    emoji: "🇧🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg",
    phoneLength: 10,
  },
  {
    name: "Brunei Darussalam",
    region: "Asia",
    timezones: {
      "Asia/Brunei": "+08:00",
    },
    iso: {
      "alpha-2": "BN",
      "alpha-3": "BRN",
      numeric: "096",
    },
    phone: ["+673"],
    emoji: "🇧🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg",
    phoneLength: 7,
  },
  {
    name: "Bolivia, Plurinational State of",
    region: "Americas",
    timezones: {
      "America/La_Paz": "-04:00",
    },
    iso: {
      "alpha-2": "BO",
      "alpha-3": "BOL",
      numeric: "068",
    },
    phone: ["+591"],
    emoji: "🇧🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg",
    phoneLength: 9,
  },
  {
    name: "Brazil",
    region: "Americas",
    timezones: {
      "America/Araguaina": "-03:00",
      "America/Bahia": "-03:00",
      "America/Belem": "-03:00",
      "America/Boa_Vista": "-04:00",
      "America/Campo_Grande": "-04:00",
      "America/Cuiaba": "-04:00",
      "America/Eirunepe": "-05:00",
      "America/Fortaleza": "-03:00",
      "America/Maceio": "-03:00",
      "America/Manaus": "-04:00",
      "America/Noronha": "-02:00",
      "America/Porto_Velho": "-04:00",
      "America/Recife": "-03:00",
      "America/Rio_Branco": "-05:00",
      "America/Santarem": "-03:00",
      "America/Sao_Paulo": "-03:00",
    },
    iso: {
      "alpha-2": "BR",
      "alpha-3": "BRA",
      numeric: "076",
    },
    phone: ["+55"],
    emoji: "🇧🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg",
    phoneLength: 11,
  },
  {
    name: "Bahamas",
    region: "Americas",
    timezones: {
      "America/Nassau": "-04:00",
    },
    iso: {
      "alpha-2": "BS",
      "alpha-3": "BHS",
      numeric: "044",
    },
    phone: ["+1-242"],
    emoji: "🇧🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg",
    phoneLength: 10,
  },
  {
    name: "Bhutan",
    region: "Asia",
    timezones: {
      "Asia/Thimphu": "+06:00",
    },
    iso: {
      "alpha-2": "BT",
      "alpha-3": "BTN",
      numeric: "064",
    },
    phone: ["+975"],
    emoji: "🇧🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg",
    phoneLength: 7,
  },
  {
    phoneLength: 10,
  },
  {
    name: "Botswana",
    region: "Africa",
    timezones: {
      "Africa/Gaborone": "+02:00",
    },
    iso: {
      "alpha-2": "BW",
      "alpha-3": "BWA",
      numeric: "072",
    },
    phone: ["+267"],
    emoji: "🇧🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg",
    phoneLength: 7,
  },
  {
    name: "Belarus",
    region: "Europe",
    timezones: {
      "Europe/Minsk": "+03:00",
    },
    iso: {
      "alpha-2": "BY",
      "alpha-3": "BLR",
      numeric: "112",
    },
    phone: ["+375"],
    emoji: "🇧🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg",
    phoneLength: 9,
  },
  {
    name: "Belize",
    region: "Americas",
    timezones: {
      "America/Belize": "-06:00",
    },
    iso: {
      "alpha-2": "BZ",
      "alpha-3": "BLZ",
      numeric: "084",
    },
    phone: ["+501"],
    emoji: "🇧🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg",
    phoneLength: 7,
  },
  {
    name: "Canada",
    region: "Americas",
    timezones: {
      "America/Atikokan": "-05:00",
      "America/Blanc-Sablon": "-04:00",
      "America/Cambridge_Bay": "-06:00",
      "America/Creston": "-07:00",
      "America/Dawson": "-07:00",
      "America/Dawson_Creek": "-07:00",
      "America/Edmonton": "-06:00",
      "America/Fort_Nelson": "-07:00",
      "America/Glace_Bay": "-03:00",
      "America/Goose_Bay": "-03:00",
      "America/Halifax": "-03:00",
      "America/Inuvik": "-06:00",
      "America/Iqaluit": "-04:00",
      "America/Moncton": "-03:00",
      "America/Rankin_Inlet": "-05:00",
      "America/Regina": "-06:00",
      "America/Resolute": "-05:00",
      "America/St_Johns": "-02:30",
      "America/Swift_Current": "-06:00",
      "America/Toronto": "-04:00",
      "America/Vancouver": "-07:00",
      "America/Whitehorse": "-07:00",
      "America/Winnipeg": "-05:00",
    },
    iso: {
      "alpha-2": "CA",
      "alpha-3": "CAN",
      numeric: "124",
    },
    phone: ["+1"],
    emoji: "🇨🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg",
    phoneLength: 10,
  },
  {
    name: "Cocos (Keeling) Islands",
    region: "Oceania",
    timezones: {
      "Indian/Cocos": "+06:30",
    },
    iso: {
      "alpha-2": "CC",
      "alpha-3": "CCK",
      numeric: "166",
    },
    phone: ["+61"],
    emoji: "🇨🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg",
    phoneLength: 10,
  },
  {
    name: "Congo, the Democratic Republic of the",
    region: "Africa",
    timezones: {
      "Africa/Kinshasa": "+01:00",
      "Africa/Lubumbashi": "+02:00",
    },
    iso: {
      "alpha-2": "CD",
      "alpha-3": "COD",
      numeric: "180",
    },
    phone: ["+243"],
    emoji: "🇨🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg",
    phoneLength: 7,
  },
  {
    name: "Central African Republic",
    region: "Africa",
    timezones: {
      "Africa/Bangui": "+01:00",
    },
    iso: {
      "alpha-2": "CF",
      "alpha-3": "CAF",
      numeric: "140",
    },
    phone: ["+236"],
    emoji: "🇨🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg",
    phoneLength: 8,
  },
  {
    name: "Congo",
    region: "Africa",
    timezones: {
      "Africa/Brazzaville": "+01:00",
    },
    iso: {
      "alpha-2": "CG",
      "alpha-3": "COG",
      numeric: "178",
    },
    phone: ["+242"],
    emoji: "🇨🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg",
    phoneLength: 9,
  },
  {
    name: "Switzerland",
    region: "Europe",
    timezones: {
      "Europe/Zurich": "+02:00",
    },
    iso: {
      "alpha-2": "CH",
      "alpha-3": "CHE",
      numeric: "756",
    },
    phone: ["+41"],
    emoji: "🇨🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg",
    phoneLength: 9,
  },
  {
    name: "Côte d'Ivoire",
    region: "Africa",
    timezones: {
      "Africa/Abidjan": "+00:00",
    },
    iso: {
      "alpha-2": "CI",
      "alpha-3": "CIV",
      numeric: "384",
    },
    phone: ["+225"],
    emoji: "🇨🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg",
    phoneLength: 8,
  },
  {
    name: "Cook Islands",
    region: "Oceania",
    timezones: {
      "Pacific/Rarotonga": "-10:00",
    },
    iso: {
      "alpha-2": "CK",
      "alpha-3": "COK",
      numeric: "184",
    },
    phone: ["+682"],
    emoji: "🇨🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg",
    phoneLength: 5,
  },
  {
    name: "Chile",
    region: "Americas",
    timezones: {
      "America/Punta_Arenas": "-03:00",
      "America/Santiago": "-04:00",
      "Pacific/Easter": "-06:00",
    },
    iso: {
      "alpha-2": "CL",
      "alpha-3": "CHL",
      numeric: "152",
    },
    phone: ["+56"],
    emoji: "🇨🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg",
    phoneLength: 9,
  },
  {
    name: "Cameroon",
    region: "Africa",
    timezones: {
      "Africa/Douala": "+01:00",
    },
    iso: {
      "alpha-2": "CM",
      "alpha-3": "CMR",
      numeric: "120",
    },
    phone: ["+237"],
    emoji: "🇨🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg",
    phoneLength: 9,
  },
  {
    name: "China",
    region: "Asia",
    timezones: {
      "Asia/Shanghai": "+08:00",
      "Asia/Urumqi": "+06:00",
    },
    iso: {
      "alpha-2": "CN",
      "alpha-3": "CHN",
      numeric: "156",
    },
    phone: ["+86"],
    emoji: "🇨🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg",
    phoneLength: 11,
  },
  {
    name: "Colombia",
    region: "Americas",
    timezones: {
      "America/Bogota": "-05:00",
    },
    iso: {
      "alpha-2": "CO",
      "alpha-3": "COL",
      numeric: "170",
    },
    phone: ["+57"],
    emoji: "🇨🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg",
    phoneLength: 10,
  },
  {
    name: "Costa Rica",
    region: "Americas",
    timezones: {
      "America/Costa_Rica": "-06:00",
    },
    iso: {
      "alpha-2": "CR",
      "alpha-3": "CRI",
      numeric: "188",
    },
    phone: ["+506"],
    emoji: "🇨🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg",
    phoneLength: 8,
  },
  {
    name: "Cuba",
    region: "Americas",
    timezones: {
      "America/Havana": "-04:00",
    },
    iso: {
      "alpha-2": "CU",
      "alpha-3": "CUB",
      numeric: "192",
    },
    phone: ["+53"],
    emoji: "🇨🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg",
    phoneLength: 8,
  },
  {
    name: "Cape Verde",
    region: "Africa",
    timezones: {
      "Atlantic/Cape_Verde": "-01:00",
    },
    iso: {
      "alpha-2": "CV",
      "alpha-3": "CPV",
      numeric: "132",
    },
    phone: ["+238"],
    emoji: "🇨🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg",
    phoneLength: 7,
  },
  {
    name: "Curaçao",
    region: "Americas",
    timezones: {
      "America/Curacao": "-04:00",
    },
    iso: {
      "alpha-2": "CW",
      "alpha-3": "CUW",
      numeric: "531",
    },
    phone: ["+599"],
    emoji: "🇨🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg",
    phoneLength: 7,
  },
  {
    name: "Christmas Island",
    region: "Oceania",
    timezones: {
      "Indian/Christmas": "+07:00",
    },
    iso: {
      "alpha-2": "CX",
      "alpha-3": "CXR",
      numeric: "162",
    },
    phone: ["+61"],
    emoji: "🇨🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg",
    phoneLength: 9,
  },
  {
    name: "Cyprus",
    region: "Asia",
    timezones: {
      "Asia/Famagusta": "+03:00",
      "Asia/Nicosia": "+03:00",
    },
    iso: {
      "alpha-2": "CY",
      "alpha-3": "CYP",
      numeric: "196",
    },
    phone: ["+357"],
    emoji: "🇨🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg",
    phoneLength: 8,
  },
  {
    name: "Czech Republic",
    region: "Europe",
    timezones: {
      "Europe/Prague": "+02:00",
    },
    iso: {
      "alpha-2": "CZ",
      "alpha-3": "CZE",
      numeric: "203",
    },
    phone: ["+420"],
    emoji: "🇨🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg",
    phoneLength: 9,
  },
  {
    name: "Germany",
    region: "Europe",
    timezones: {
      "Europe/Berlin": "+02:00",
      "Europe/Busingen": "+02:00",
    },
    iso: {
      "alpha-2": "DE",
      "alpha-3": "DEU",
      numeric: "276",
    },
    phone: ["+49"],
    emoji: "🇩🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg",
    phoneLength: 10,
  },
  {
    name: "Djibouti",
    region: "Africa",
    timezones: {
      "Africa/Djibouti": "+03:00",
    },
    iso: {
      "alpha-2": "DJ",
      "alpha-3": "DJI",
      numeric: "262",
    },
    phone: ["+253"],
    emoji: "🇩🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg",
    phoneLength: 10,
  },
  {
    name: "Denmark",
    region: "Europe",
    timezones: {
      "Europe/Copenhagen": "+02:00",
    },
    iso: {
      "alpha-2": "DK",
      "alpha-3": "DNK",
      numeric: "208",
    },
    phone: ["+45"],
    emoji: "🇩🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg",
    phoneLength: 8,
  },
  {
    name: "Dominica",
    region: "Americas",
    timezones: {
      "America/Dominica": "-04:00",
    },
    iso: {
      "alpha-2": "DM",
      "alpha-3": "DMA",
      numeric: "212",
    },
    phone: ["+1-767"],
    emoji: "🇩🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg",
    phoneLength: 10,
  },
  {
    name: "Dominican Republic",
    region: "Americas",
    timezones: {
      "America/Santo_Domingo": "-04:00",
    },
    iso: {
      "alpha-2": "DO",
      "alpha-3": "DOM",
      numeric: "214",
    },
    phone: ["+1-809", "+1-829"],
    emoji: "🇩🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg",
    phoneLength: 10,
  },
  {
    name: "Algeria",
    nationalite: "algérienne",

    region: "Africa",
    timezones: {
      "Africa/Algiers": "+01:00",
    },
    iso: {
      "alpha-2": "DZ",
      "alpha-3": "DZA",
      numeric: "012",
    },
    phone: ["+213"],
    emoji: "🇩🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg",
    phoneLength: 9,
  },
  {
    name: "Ecuador",
    region: "Americas",
    timezones: {
      "America/Guayaquil": "-05:00",
      "Pacific/Galapagos": "-06:00",
    },
    iso: {
      "alpha-2": "EC",
      "alpha-3": "ECU",
      numeric: "218",
    },
    phone: ["+593"],
    emoji: "🇪🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg",
    phoneLength: 9,
  },
  {
    name: "Estonia",
    region: "Europe",
    timezones: {
      "Europe/Tallinn": "+03:00",
    },
    iso: {
      "alpha-2": "EE",
      "alpha-3": "EST",
      numeric: "233",
    },
    phone: ["+372"],
    emoji: "🇪🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg",
    phoneLength: 8,
  },
  {
    name: "Egypt",
    region: "Africa",
    timezones: {
      "Africa/Cairo": "+02:00",
    },
    iso: {
      "alpha-2": "EG",
      "alpha-3": "EGY",
      numeric: "818",
    },
    phone: ["+20"],
    emoji: "🇪🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg",
    phoneLength: 10,
  },
  {
    phoneLength: 9,
  },
  {
    name: "Eritrea",
    region: "Africa",
    timezones: {
      "Africa/Asmara": "+03:00",
    },
    iso: {
      "alpha-2": "ER",
      "alpha-3": "ERI",
      numeric: "232",
    },
    phone: ["+291"],
    emoji: "🇪🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg",
    phoneLength: 7,
  },
  {
    name: "Spain",
    region: "Europe",
    timezones: {
      "Africa/Ceuta": "+02:00",
      "Atlantic/Canary": "+01:00",
      "Europe/Madrid": "+02:00",
    },
    iso: {
      "alpha-2": "ES",
      "alpha-3": "ESP",
      numeric: "724",
    },
    phone: ["+34"],
    emoji: "🇪🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg",
    phoneLength: 9,
  },
  {
    name: "Ethiopia",
    region: "Africa",
    timezones: {
      "Africa/Addis_Ababa": "+03:00",
    },
    iso: {
      "alpha-2": "ET",
      "alpha-3": "ETH",
      numeric: "231",
    },
    phone: ["+251"],
    emoji: "🇪🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg",
    phoneLength: 9,
  },
  {
    name: "Finland",
    region: "Europe",
    timezones: {
      "Europe/Helsinki": "+03:00",
    },
    iso: {
      "alpha-2": "FI",
      "alpha-3": "FIN",
      numeric: "246",
    },
    phone: ["+358"],
    emoji: "🇫🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg",
  },
  {
    name: "Fiji",
    region: "Oceania",
    timezones: {
      "Pacific/Fiji": "+12:00",
    },
    iso: {
      "alpha-2": "FJ",
      "alpha-3": "FJI",
      numeric: "242",
    },
    phone: ["+679"],
    emoji: "🇫🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg",
    phoneLength: 7,
  },
  {
    name: "Falkland Islands (Malvinas)",
    region: "Americas",
    timezones: {
      "Atlantic/Stanley": "-03:00",
    },
    iso: {
      "alpha-2": "FK",
      "alpha-3": "FLK",
      numeric: "238",
    },
    phone: ["+500"],
    emoji: "🇫🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg",
    phoneLength: 5,
  },
  {
    name: "Micronesia, Federated States of",
    region: "Oceania",
    timezones: {
      "Pacific/Chuuk": "+10:00",
      "Pacific/Kosrae": "+11:00",
      "Pacific/Pohnpei": "+11:00",
    },
    iso: {
      "alpha-2": "FM",
      "alpha-3": "FSM",
      numeric: "583",
    },
    phone: ["+691"],
    emoji: "🇫🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg",
    phoneLength: 7,
  },
  {
    name: "Faroe Islands",
    region: "Europe",
    timezones: {
      "Atlantic/Faroe": "+01:00",
    },
    iso: {
      "alpha-2": "FO",
      "alpha-3": "FRO",
      numeric: "234",
    },
    phone: ["+298"],
    emoji: "🇫🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg",
    phoneLength: 5,
  },
  {
    name: "France",
    region: "Europe",
    timezones: {
      "Europe/Paris": "+02:00",
    },
    iso: {
      "alpha-2": "FR",
      "alpha-3": "FRA",
      numeric: "250",
    },
    phone: ["+33"],
    emoji: "🇫🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg",
    phoneLength: 9,
  },
  {
    name: "Gabon",
    region: "Africa",
    timezones: {
      "Africa/Libreville": "+01:00",
    },
    iso: {
      "alpha-2": "GA",
      "alpha-3": "GAB",
      numeric: "266",
    },
    phone: ["+241"],
    emoji: "🇬🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg",
    phoneLength: 7,
  },
  {
    name: "United Kingdom",
    region: "Europe",
    timezones: {
      "Europe/London": "+01:00",
    },
    iso: {
      "alpha-2": "GB",
      "alpha-3": "GBR",
      numeric: "826",
    },
    phone: ["+44"],
    emoji: "🇬🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
    phoneLength: 10,
  },
  {
    name: "Grenada",
    region: "Americas",
    timezones: {
      "America/Grenada": "-04:00",
    },
    iso: {
      "alpha-2": "GD",
      "alpha-3": "GRD",
      numeric: "308",
    },
    phone: ["+1-473"],
    emoji: "🇬🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg",
    phoneLength: 10,
  },
  {
    name: "Georgia",
    region: "Asia",
    timezones: {
      "Asia/Tbilisi": "+04:00",
    },
    iso: {
      "alpha-2": "GE",
      "alpha-3": "GEO",
      numeric: "268",
    },
    phone: ["+995"],
    emoji: "🇬🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg",
    phoneLength: 9,
  },
  {
    name: "French Guiana",
    region: "Americas",
    timezones: {
      "America/Cayenne": "-03:00",
    },
    iso: {
      "alpha-2": "GF",
      "alpha-3": "GUF",
      numeric: "254",
    },
    phone: ["+594"],
    emoji: "🇬🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg",
    phoneLength: 9,
  },
  {
    name: "Guernsey",
    region: "Europe",
    timezones: {
      "Europe/Guernsey": "+01:00",
    },
    iso: {
      "alpha-2": "GG",
      "alpha-3": "GGY",
      numeric: "831",
    },
    phone: ["+44-1481"],
    emoji: "🇬🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg",
    phoneLength: 10,
  },
  {
    name: "Ghana",
    region: "Africa",
    timezones: {
      "Africa/Accra": "+00:00",
    },
    iso: {
      "alpha-2": "GH",
      "alpha-3": "GHA",
      numeric: "288",
    },
    phone: ["+233"],
    emoji: "🇬🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg",
    phoneLength: 9,
  },
  {
    name: "Gibraltar",
    region: "Europe",
    timezones: {
      "Europe/Gibraltar": "+02:00",
    },
    iso: {
      "alpha-2": "GI",
      "alpha-3": "GIB",
      numeric: "292",
    },
    phone: ["+350"],
    emoji: "🇬🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg",
    phoneLength: 8,
  },
  {
    name: "Greenland",
    region: "Americas",
    timezones: {
      "America/Danmarkshavn": "+00:00",
      "America/Nuuk": "-02:00",
      "America/Scoresbysund": "+00:00",
      "America/Thule": "-03:00",
    },
    iso: {
      "alpha-2": "GL",
      "alpha-3": "GRL",
      numeric: "304",
    },
    phone: ["+299"],
    emoji: "🇬🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg",
    phoneLength: 6,
  },
  {
    name: "Gambia",
    region: "Africa",
    timezones: {
      "Africa/Banjul": "+00:00",
    },
    iso: {
      "alpha-2": "GM",
      "alpha-3": "GMB",
      numeric: "270",
    },
    phone: ["+220"],
    emoji: "🇬🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg",
    phoneLength: 7,
  },
  {
    name: "Guinea",
    region: "Africa",
    timezones: {
      "Africa/Conakry": "+00:00",
    },
    iso: {
      "alpha-2": "GN",
      "alpha-3": "GIN",
      numeric: "324",
    },
    phone: ["+224"],
    emoji: "🇬🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg",
    phoneLength: 9,
  },
  {
    name: "Guadeloupe",
    region: "Americas",
    timezones: {
      "America/Guadeloupe": "-04:00",
    },
    iso: {
      "alpha-2": "GP",
      "alpha-3": "GLP",
      numeric: "312",
    },
    phone: ["+590"],
    emoji: "🇬🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg",
    phoneLength: 9,
  },
  {
    name: "Equatorial Guinea",
    region: "Africa",
    timezones: {
      "Africa/Malabo": "+01:00",
    },
    iso: {
      "alpha-2": "GQ",
      "alpha-3": "GNQ",
      numeric: "226",
    },
    phone: ["+240"],
    emoji: "🇬🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg",
    phoneLength: 9,
  },
  {
    name: "Greece",
    region: "Europe",
    timezones: {
      "Europe/Athens": "+03:00",
    },
    iso: {
      "alpha-2": "GR",
      "alpha-3": "GRC",
      numeric: "300",
    },
    phone: ["+30"],
    emoji: "🇬🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg",
    phoneLength: 10,
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    region: "Americas",
    timezones: {
      "Atlantic/South_Georgia": "-02:00",
    },
    iso: {
      "alpha-2": "GS",
      "alpha-3": "SGS",
      numeric: "239",
    },
    phone: ["+"],
    emoji: "🇬🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg",
    phoneLength: 5,
  },
  {
    name: "Guatemala",
    region: "Americas",
    timezones: {
      "America/Guatemala": "-06:00",
    },
    iso: {
      "alpha-2": "GT",
      "alpha-3": "GTM",
      numeric: "320",
    },
    phone: ["+502"],
    emoji: "🇬🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg",
    phoneLength: 8,
  },
  {
    name: "Guam",
    region: "Oceania",
    timezones: {
      "Pacific/Guam": "+10:00",
    },
    iso: {
      "alpha-2": "GU",
      "alpha-3": "GUM",
      numeric: "316",
    },
    phone: ["+1-671"],
    emoji: "🇬🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg",
    phoneLength: 10,
  },
  {
    name: "Guinea-Bissau",
    region: "Africa",
    timezones: {
      "Africa/Bissau": "+00:00",
    },
    iso: {
      "alpha-2": "GW",
      "alpha-3": "GNB",
      numeric: "624",
    },
    phone: ["+245"],
    emoji: "🇬🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg",
    phoneLength: 9,
  },
  {
    name: "Guyana",
    region: "Americas",
    timezones: {
      "America/Guyana": "-04:00",
    },
    iso: {
      "alpha-2": "GY",
      "alpha-3": "GUY",
      numeric: "328",
    },
    phone: ["+592"],
    emoji: "🇬🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg",
    phoneLength: 7,
  },
  {
    name: "Hong Kong",
    region: "Asia",
    timezones: {
      "Asia/Hong_Kong": "+08:00",
    },
    iso: {
      "alpha-2": "HK",
      "alpha-3": "HKG",
      numeric: "344",
    },
    phone: ["+852"],
    emoji: "🇭🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg",
    phoneLength: 8,
  },
  {
    phoneLength: 10,
  },
  {
    name: "Honduras",
    region: "Americas",
    timezones: {
      "America/Tegucigalpa": "-06:00",
    },
    iso: {
      "alpha-2": "HN",
      "alpha-3": "HND",
      numeric: "340",
    },
    phone: ["+504"],
    emoji: "🇭🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg",
    phoneLength: 8,
  },
  {
    name: "Croatia",
    region: "Europe",
    timezones: {
      "Europe/Zagreb": "+02:00",
    },
    iso: {
      "alpha-2": "HR",
      "alpha-3": "HRV",
      numeric: "191",
    },
    phone: ["+385"],
    emoji: "🇭🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg",
    phoneLength: 9,
  },
  {
    name: "Haiti",
    region: "Americas",
    timezones: {
      "America/Port-au-Prince": "-04:00",
    },
    iso: {
      "alpha-2": "HT",
      "alpha-3": "HTI",
      numeric: "332",
    },
    phone: ["+509"],
    emoji: "🇭🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg",
    phoneLength: 8,
  },
  {
    name: "Hungary",
    region: "Europe",
    timezones: {
      "Europe/Budapest": "+02:00",
    },
    iso: {
      "alpha-2": "HU",
      "alpha-3": "HUN",
      numeric: "348",
    },
    phone: ["+36"],
    emoji: "🇭🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg",
    phoneLength: 9,
  },
  {
    name: "Indonesia",
    region: "Asia",
    timezones: {
      "Asia/Jakarta": "+07:00",
      "Asia/Jayapura": "+09:00",
      "Asia/Makassar": "+08:00",
      "Asia/Pontianak": "+07:00",
    },
    iso: {
      "alpha-2": "ID",
      "alpha-3": "IDN",
      numeric: "360",
    },
    phone: ["+62"],
    emoji: "🇮🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg",
    phoneLength: 11,
  },
  {
    name: "Ireland",
    region: "Europe",
    timezones: {
      "Europe/Dublin": "+01:00",
    },
    iso: {
      "alpha-2": "IE",
      "alpha-3": "IRL",
      numeric: "372",
    },
    phone: ["+353"],
    emoji: "🇮🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg",
    phoneLength: 9,
  },
  {
    name: "Israel",
    region: "Asia",
    timezones: {
      "Asia/Jerusalem": "+03:00",
    },
    iso: {
      "alpha-2": "IL",
      "alpha-3": "ISR",
      numeric: "376",
    },
    phone: ["+972"],
    emoji: "🇮🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg",
    phoneLength: 9,
  },
  {
    name: "Isle of Man",
    region: "Europe",
    timezones: {
      "Europe/Isle_of_Man": "+01:00",
    },
    iso: {
      "alpha-2": "IM",
      "alpha-3": "IMN",
      numeric: "833",
    },
    phone: ["+44-1624"],
    emoji: "🇮🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg",
    phoneLength: 10,
  },
  {
    name: "India",
    region: "Asia",
    timezones: {
      "Asia/Kolkata": "+05:30",
    },
    iso: {
      "alpha-2": "IN",
      "alpha-3": "IND",
      numeric: "356",
    },
    phone: ["+91"],
    emoji: "🇮🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
    phoneLength: 10,
  },
  {
    name: "British Indian Ocean Territory",
    region: "Africa",
    timezones: {
      "Indian/Chagos": "+06:00",
    },
    iso: {
      "alpha-2": "IO",
      "alpha-3": "IOT",
      numeric: "086",
    },
    phone: ["+246"],
    emoji: "🇮🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg",
    phoneLength: 7,
  },
  {
    name: "Iraq",
    region: "Asia",
    timezones: {
      "Asia/Baghdad": "+03:00",
    },
    iso: {
      "alpha-2": "IQ",
      "alpha-3": "IRQ",
      numeric: "368",
    },
    phone: ["+964"],
    emoji: "🇮🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg",
    phoneLength: 10,
  },
  {
    name: "Iran, Islamic Republic of",
    region: "Asia",
    timezones: {
      "Asia/Tehran": "+03:30",
    },
    iso: {
      "alpha-2": "IR",
      "alpha-3": "IRN",
      numeric: "364",
    },
    phone: ["+98"],
    emoji: "🇮🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg",
    phoneLength: 11,
  },
  {
    name: "Iceland",
    region: "Europe",
    timezones: {
      "Atlantic/Reykjavik": "+00:00",
    },
    iso: {
      "alpha-2": "IS",
      "alpha-3": "ISL",
      numeric: "352",
    },
    phone: ["+354"],
    emoji: "🇮🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg",
    phoneLength: 7,
  },
  {
    name: "Italy",
    region: "Europe",
    timezones: {
      "Europe/Rome": "+02:00",
    },
    iso: {
      "alpha-2": "IT",
      "alpha-3": "ITA",
      numeric: "380",
    },
    phone: ["+39"],
    emoji: "🇮🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg",
    phoneLength: 10,
  },
  {
    name: "Jersey",
    region: "Europe",
    timezones: {
      "Europe/Jersey": "+01:00",
    },
    iso: {
      "alpha-2": "JE",
      "alpha-3": "JEY",
      numeric: "832",
    },
    phone: ["+44-1534"],
    emoji: "🇯🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg",
    phoneLength: 10,
  },
  {
    name: "Jamaica",
    region: "Americas",
    timezones: {
      "America/Jamaica": "-05:00",
    },
    iso: {
      "alpha-2": "JM",
      "alpha-3": "JAM",
      numeric: "388",
    },
    phone: ["+1-876"],
    emoji: "🇯🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg",
    phoneLength: 10,
  },
  {
    name: "Jordan",
    region: "Asia",
    timezones: {
      "Asia/Amman": "+03:00",
    },
    iso: {
      "alpha-2": "JO",
      "alpha-3": "JOR",
      numeric: "400",
    },
    phone: ["+962"],
    emoji: "🇯🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Japan",
    region: "Asia",
    timezones: {
      "Asia/Tokyo": "+09:00",
    },
    iso: {
      "alpha-2": "JP",
      "alpha-3": "JPN",
      numeric: "392",
    },
    phone: ["+81"],
    emoji: "🇯🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg",
  },
  {
    name: "Kenya",
    region: "Africa",
    timezones: {
      "Africa/Nairobi": "+03:00",
    },
    iso: {
      "alpha-2": "KE",
      "alpha-3": "KEN",
      numeric: "404",
    },
    phone: ["+254"],
    emoji: "🇰🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg",
    phoneLength: 10,
  },
  {
    name: "Kyrgyzstan",
    region: "Asia",
    timezones: {
      "Asia/Bishkek": "+06:00",
    },
    iso: {
      "alpha-2": "KG",
      "alpha-3": "KGZ",
      numeric: "417",
    },
    phone: ["+996"],
    emoji: "🇰🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg",
    phoneLength: 9,
  },
  {
    name: "Cambodia",
    region: "Asia",
    timezones: {
      "Asia/Phnom_Penh": "+07:00",
    },
    iso: {
      "alpha-2": "KH",
      "alpha-3": "KHM",
      numeric: "116",
    },
    phone: ["+855"],
    emoji: "🇰🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg",
    phoneLength: 9,
  },
  {
    name: "Kiribati",
    region: "Oceania",
    timezones: {
      "Pacific/Kanton": "+13:00",
      "Pacific/Kiritimati": "+14:00",
      "Pacific/Tarawa": "+12:00",
    },
    iso: {
      "alpha-2": "KI",
      "alpha-3": "KIR",
      numeric: "296",
    },
    phone: ["+686"],
    emoji: "🇰🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg",
    phoneLength: 8,
  },
  {
    name: "Comoros",
    region: "Africa",
    timezones: {
      "Indian/Comoro": "+03:00",
    },
    iso: {
      "alpha-2": "KM",
      "alpha-3": "COM",
      numeric: "174",
    },
    phone: ["+269"],
    emoji: "🇰🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg",
    phoneLength: 7,
  },
  {
    name: "Saint Kitts and Nevis",
    region: "Americas",
    timezones: {
      "America/St_Kitts": "-04:00",
    },
    iso: {
      "alpha-2": "KN",
      "alpha-3": "KNA",
      numeric: "659",
    },
    phone: ["+1-869"],
    emoji: "🇰🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg",
    phoneLength: 10,
  },
  {
    name: "Korea, Democratic People's Republic of",
    region: "Asia",
    timezones: {
      "Asia/Pyongyang": "+09:00",
    },
    iso: {
      "alpha-2": "KP",
      "alpha-3": "PRK",
      numeric: "408",
    },
    phone: ["+850"],
    emoji: "🇰🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg",
    phoneLength: [4, 6, 7, 13],
  },
  {
    name: "Korea, Republic of",
    region: "Asia",
    timezones: {
      "Asia/Seoul": "+09:00",
    },
    iso: {
      "alpha-2": "KR",
      "alpha-3": "KOR",
      numeric: "410",
    },
    phone: ["+82"],
    emoji: "🇰🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg",
    phoneLength: [7, 8],
  },
  {
    name: "Kuwait",
    region: "Asia",
    timezones: {
      "Asia/Kuwait": "+03:00",
    },
    iso: {
      "alpha-2": "KW",
      "alpha-3": "KWT",
      numeric: "414",
    },
    phone: ["+965"],
    emoji: "🇰🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg",
    phoneLength: 8,
  },
  {
    name: "Cayman Islands",
    region: "Americas",
    timezones: {
      "America/Cayman": "-05:00",
    },
    iso: {
      "alpha-2": "KY",
      "alpha-3": "CYM",
      numeric: "136",
    },
    phone: ["+1-345"],
    emoji: "🇰🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg",
    phoneLength: 7,
  },
  {
    name: "Kazakhstan",
    region: "Asia",
    timezones: {
      "Asia/Almaty": "+06:00",
      "Asia/Aqtau": "+05:00",
      "Asia/Aqtobe": "+05:00",
      "Asia/Atyrau": "+05:00",
      "Asia/Oral": "+05:00",
      "Asia/Qostanay": "+06:00",
      "Asia/Qyzylorda": "+05:00",
    },
    iso: {
      "alpha-2": "KZ",
      "alpha-3": "KAZ",
      numeric: "398",
    },
    phone: ["+7"],
    emoji: "🇰🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg",
    phoneLength: 10,
  },
  {
    name: "Lao People's Democratic Republic",
    region: "Asia",
    timezones: {
      "Asia/Vientiane": "+07:00",
    },
    iso: {
      "alpha-2": "LA",
      "alpha-3": "LAO",
      numeric: "418",
    },
    phone: ["+856"],
    emoji: "🇱🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Lebanon",
    region: "Asia",
    timezones: {
      "Asia/Beirut": "+03:00",
    },
    iso: {
      "alpha-2": "LB",
      "alpha-3": "LBN",
      numeric: "422",
    },
    phone: ["+961"],
    emoji: "🇱🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg",
    phoneLength: [7, 8],
  },
  {
    name: "Saint Lucia",
    region: "Americas",
    timezones: {
      "America/St_Lucia": "-04:00",
    },
    iso: {
      "alpha-2": "LC",
      "alpha-3": "LCA",
      numeric: "662",
    },
    phone: ["+1-758"],
    emoji: "🇱🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg",
    phoneLength: 7,
  },
  {
    name: "Liechtenstein",
    region: "Europe",
    timezones: {
      "Europe/Vaduz": "+02:00",
    },
    iso: {
      "alpha-2": "LI",
      "alpha-3": "LIE",
      numeric: "438",
    },
    phone: ["+423"],
    emoji: "🇱🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg",
    phoneLength: 7,
  },
  {
    name: "Sri Lanka",
    region: "Asia",
    timezones: {
      "Asia/Colombo": "+05:30",
    },
    iso: {
      "alpha-2": "LK",
      "alpha-3": "LKA",
      numeric: "144",
    },
    phone: ["+94"],
    emoji: "🇱🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg",
    phoneLength: 7,
  },
  {
    name: "Liberia",
    region: "Africa",
    timezones: {
      "Africa/Monrovia": "+00:00",
    },
    iso: {
      "alpha-2": "LR",
      "alpha-3": "LBR",
      numeric: "430",
    },
    phone: ["+231"],
    emoji: "🇱🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Lesotho",
    region: "Africa",
    timezones: {
      "Africa/Maseru": "+02:00",
    },
    iso: {
      "alpha-2": "LS",
      "alpha-3": "LSO",
      numeric: "426",
    },
    phone: ["+266"],
    emoji: "🇱🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg",
    phoneLength: 8,
  },
  {
    name: "Lithuania",
    region: "Europe",
    timezones: {
      "Europe/Vilnius": "+03:00",
    },
    iso: {
      "alpha-2": "LT",
      "alpha-3": "LTU",
      numeric: "440",
    },
    phone: ["+370"],
    emoji: "🇱🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg",
    phoneLength: 8,
  },
  {
    name: "Luxembourg",
    region: "Europe",
    timezones: {
      "Europe/Luxembourg": "+02:00",
    },
    iso: {
      "alpha-2": "LU",
      "alpha-3": "LUX",
      numeric: "442",
    },
    phone: ["+352"],
    emoji: "🇱🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg",
    phoneLength: 9,
  },
  {
    name: "Latvia",
    region: "Europe",
    timezones: {
      "Europe/Riga": "+03:00",
    },
    iso: {
      "alpha-2": "LV",
      "alpha-3": "LVA",
      numeric: "428",
    },
    phone: ["+371"],
    emoji: "🇱🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg",
    phoneLength: 8,
  },
  {
    name: "Libya",
    region: "Africa",
    timezones: {
      "Africa/Tripoli": "+02:00",
    },
    iso: {
      "alpha-2": "LY",
      "alpha-3": "LBY",
      numeric: "434",
    },
    phone: ["+218"],
    emoji: "🇱🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg",
    phoneLength: 10,
  },
  {
    name: "Morocco",
    region: "Africa",
    timezones: {
      "Africa/Casablanca": "+00:00",
      "Africa/El_Aaiun": "+00:00",
    },
    iso: {
      "alpha-2": "MA",
      "alpha-3": "MAR",
      numeric: "504",
    },
    phone: ["+212"],
    emoji: "🇲🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg",
    phoneLength: 9,
  },
  {
    name: "Monaco",
    region: "Europe",
    timezones: {
      "Europe/Monaco": "+02:00",
    },
    iso: {
      "alpha-2": "MC",
      "alpha-3": "MCO",
      numeric: "492",
    },
    phone: ["+377"],
    emoji: "🇲🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg",
    phoneLength: 8,
  },
  {
    name: "Moldova, Republic of",
    region: "Europe",
    timezones: {
      "Europe/Chisinau": "+03:00",
    },
    iso: {
      "alpha-2": "MD",
      "alpha-3": "MDA",
      numeric: "498",
    },
    phone: ["+373"],
    emoji: "🇲🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg",
    phoneLength: 8,
  },
  {
    name: "Montenegro",
    region: "Europe",
    timezones: {
      "Europe/Podgorica": "+02:00",
    },
    iso: {
      "alpha-2": "ME",
      "alpha-3": "MNE",
      numeric: "499",
    },
    phone: ["+382"],
    emoji: "🇲🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg",
    phoneLength: 8,
  },
  {
    name: "Saint Martin (French part)",
    region: "Americas",
    timezones: {
      "America/Marigot": "-04:00",
    },
    iso: {
      "alpha-2": "MF",
      "alpha-3": "MAF",
      numeric: "663",
    },
    phone: ["+590"],
    emoji: "🇲🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg",
    phoneLength: 6,
  },
  {
    name: "Madagascar",
    region: "Africa",
    timezones: {
      "Indian/Antananarivo": "+03:00",
    },
    iso: {
      "alpha-2": "MG",
      "alpha-3": "MDG",
      numeric: "450",
    },
    phone: ["+261"],
    emoji: "🇲🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg",
    phoneLength: 7,
  },
  {
    name: "Marshall Islands",
    region: "Oceania",
    timezones: {
      "Pacific/Kwajalein": "+12:00",
      "Pacific/Majuro": "+12:00",
    },
    iso: {
      "alpha-2": "MH",
      "alpha-3": "MHL",
      numeric: "584",
    },
    phone: ["+692"],
    emoji: "🇲🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg",
    phoneLength: 7,
  },
  {
    name: "Macedonia, the Former Yugoslav Republic of",
    region: "Europe",
    timezones: {
      "Europe/Skopje": "+02:00",
    },
    iso: {
      "alpha-2": "MK",
      "alpha-3": "MKD",
      numeric: "807",
    },
    phone: ["+389"],
    emoji: "🇲🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg",
    phoneLength: 8,
  },
  {
    name: "Mali",
    region: "Africa",
    timezones: {
      "Africa/Bamako": "+00:00",
    },
    iso: {
      "alpha-2": "ML",
      "alpha-3": "MLI",
      numeric: "466",
    },
    phone: ["+223"],
    emoji: "🇲🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg",
    phoneLength: 8,
  },
  {
    name: "Myanmar",
    region: "Asia",
    timezones: {
      "Asia/Yangon": "+06:30",
    },
    iso: {
      "alpha-2": "MM",
      "alpha-3": "MMR",
      numeric: "104",
    },
    phone: ["+95"],
    emoji: "🇲🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg",
  },
  {
    name: "Mongolia",
    region: "Asia",
    timezones: {
      "Asia/Choibalsan": "+08:00",
      "Asia/Hovd": "+07:00",
      "Asia/Ulaanbaatar": "+08:00",
    },
    iso: {
      "alpha-2": "MN",
      "alpha-3": "MNG",
      numeric: "496",
    },
    phone: ["+976"],
    emoji: "🇲🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg",
    phoneLength: 8,
  },
  {
    name: "Macao",
    region: "Asia",
    timezones: {
      "Asia/Macau": "+08:00",
    },
    iso: {
      "alpha-2": "MO",
      "alpha-3": "MAC",
      numeric: "446",
    },
    phone: ["+853"],
    emoji: "🇲🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MO.svg",
    phoneLength: 8,
  },
  {
    name: "Northern Mariana Islands",
    region: "Oceania",
    timezones: {
      "Pacific/Saipan": "+10:00",
    },
    iso: {
      "alpha-2": "MP",
      "alpha-3": "MNP",
      numeric: "580",
    },
    phone: ["+1-670"],
    emoji: "🇲🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg",
    phoneLength: 7,
  },
  {
    name: "Martinique",
    region: "Americas",
    timezones: {
      "America/Martinique": "-04:00",
    },
    iso: {
      "alpha-2": "MQ",
      "alpha-3": "MTQ",
      numeric: "474",
    },
    phone: ["+596"],
    emoji: "🇲🇶",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg",
    phoneLength: 9,
  },
  {
    name: "Mauritania",
    region: "Africa",
    timezones: {
      "Africa/Nouakchott": "+00:00",
    },
    iso: {
      "alpha-2": "MR",
      "alpha-3": "MRT",
      numeric: "478",
    },
    phone: ["+222"],
    emoji: "🇲🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg",
    phoneLength: 8,
  },
  {
    name: "Montserrat",
    region: "Americas",
    timezones: {
      "America/Montserrat": "-04:00",
    },
    iso: {
      "alpha-2": "MS",
      "alpha-3": "MSR",
      numeric: "500",
    },
    phone: ["+1-664"],
    emoji: "🇲🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg",
    phoneLength: 10,
  },
  {
    name: "Malta",
    region: "Europe",
    timezones: {
      "Europe/Malta": "+02:00",
    },
    iso: {
      "alpha-2": "MT",
      "alpha-3": "MLT",
      numeric: "470",
    },
    phone: ["+356"],
    emoji: "🇲🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg",
    phoneLength: 8,
  },
  {
    name: "Mauritius",
    region: "Africa",
    timezones: {
      "Indian/Mauritius": "+04:00",
    },
    iso: {
      "alpha-2": "MU",
      "alpha-3": "MUS",
      numeric: "480",
    },
    phone: ["+230"],
    emoji: "🇲🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg",
    phoneLength: 8,
  },
  {
    name: "Maldives",
    region: "Asia",
    timezones: {
      "Indian/Maldives": "+05:00",
    },
    iso: {
      "alpha-2": "MV",
      "alpha-3": "MDV",
      numeric: "462",
    },
    phone: ["+960"],
    emoji: "🇲🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg",
    phoneLength: 7,
  },
  {
    name: "Malawi",
    region: "Africa",
    timezones: {
      "Africa/Blantyre": "+02:00",
    },
    iso: {
      "alpha-2": "MW",
      "alpha-3": "MWI",
      numeric: "454",
    },
    phone: ["+265"],
    emoji: "🇲🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg",
    phoneLength: [7, 8, 9],
  },
  {
    name: "Mexico",
    region: "Americas",
    timezones: {
      "America/Bahia_Banderas": "-06:00",
      "America/Cancun": "-05:00",
      "America/Chihuahua": "-06:00",
      "America/Ciudad_Juarez": "-06:00",
      "America/Hermosillo": "-07:00",
      "America/Matamoros": "-05:00",
      "America/Mazatlan": "-07:00",
      "America/Merida": "-06:00",
      "America/Mexico_City": "-06:00",
      "America/Monterrey": "-06:00",
      "America/Ojinaga": "-05:00",
      "America/Tijuana": "-07:00",
    },
    iso: {
      "alpha-2": "MX",
      "alpha-3": "MEX",
      numeric: "484",
    },
    phone: ["+52"],
    emoji: "🇲🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg",
    phoneLength: 10,
  },
  {
    name: "Malaysia",
    region: "Asia",
    timezones: {
      "Asia/Kuala_Lumpur": "+08:00",
      "Asia/Kuching": "+08:00",
    },
    iso: {
      "alpha-2": "MY",
      "alpha-3": "MYS",
      numeric: "458",
    },
    phone: ["+60"],
    emoji: "🇲🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg",
    phoneLength: 7,
  },
  {
    name: "Mozambique",
    region: "Africa",
    timezones: {
      "Africa/Maputo": "+02:00",
    },
    iso: {
      "alpha-2": "MZ",
      "alpha-3": "MOZ",
      numeric: "508",
    },
    phone: ["+258"],
    emoji: "🇲🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg",
    phoneLength: 12,
  },
  {
    name: "Namibia",
    region: "Africa",
    timezones: {
      "Africa/Windhoek": "+02:00",
    },
    iso: {
      "alpha-2": "NA",
      "alpha-3": "NAM",
      numeric: "516",
    },
    phone: ["+264"],
    emoji: "🇳🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg",
    phoneLength: 7,
  },
  {
    name: "New Caledonia",
    region: "Oceania",
    timezones: {
      "Pacific/Noumea": "+11:00",
    },
    iso: {
      "alpha-2": "NC",
      "alpha-3": "NCL",
      numeric: "540",
    },
    phone: ["+687"],
    emoji: "🇳🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg",
    phoneLength: 6,
  },
  {
    name: "Niger",
    region: "Africa",
    timezones: {
      "Africa/Niamey": "+01:00",
    },
    iso: {
      "alpha-2": "NE",
      "alpha-3": "NER",
      numeric: "562",
    },
    phone: ["+227"],
    emoji: "🇳🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg",
    phoneLength: 8,
  },
  {
    name: "Norfolk Island",
    region: "Oceania",
    timezones: {
      "Pacific/Norfolk": "+11:00",
    },
    iso: {
      "alpha-2": "NF",
      "alpha-3": "NFK",
      numeric: "574",
    },
    phone: ["+672"],
    emoji: "🇳🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg",
    phoneLength: 6,
  },
  {
    name: "Nigeria",
    region: "Africa",
    timezones: {
      "Africa/Lagos": "+01:00",
    },
    iso: {
      "alpha-2": "NG",
      "alpha-3": "NGA",
      numeric: "566",
    },
    phone: ["+234"],
    emoji: "🇳🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg",
    phoneLength: 8,
  },
  {
    name: "Nicaragua",
    region: "Americas",
    timezones: {
      "America/Managua": "-06:00",
    },
    iso: {
      "alpha-2": "NI",
      "alpha-3": "NIC",
      numeric: "558",
    },
    phone: ["+505"],
    emoji: "🇳🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg",
    phoneLength: 8,
  },
  {
    name: "Netherlands",
    region: "Europe",
    timezones: {
      "Europe/Amsterdam": "+02:00",
    },
    iso: {
      "alpha-2": "NL",
      "alpha-3": "NLD",
      numeric: "528",
    },
    phone: ["+31"],
    emoji: "🇳🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg",
    phoneLength: 9,
  },
  {
    name: "Norway",
    region: "Europe",
    timezones: {
      "Europe/Oslo": "+02:00",
    },
    iso: {
      "alpha-2": "NO",
      "alpha-3": "NOR",
      numeric: "578",
    },
    phone: ["+47"],
    emoji: "🇳🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg",
    phoneLength: 8,
  },
  {
    name: "Nepal",
    region: "Asia",
    timezones: {
      "Asia/Kathmandu": "+05:45",
    },
    iso: {
      "alpha-2": "NP",
      "alpha-3": "NPL",
      numeric: "524",
    },
    phone: ["+977"],
    emoji: "🇳🇵",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg",
    phoneLength: 10,
  },
  {
    name: "Nauru",
    region: "Oceania",
    timezones: {
      "Pacific/Nauru": "+12:00",
    },
    iso: {
      "alpha-2": "NR",
      "alpha-3": "NRU",
      numeric: "520",
    },
    phone: ["+674"],
    emoji: "🇳🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg",
    phoneLength: 7,
  },
  {
    name: "Niue",
    region: "Oceania",
    timezones: {
      "Pacific/Niue": "-11:00",
    },
    iso: {
      "alpha-2": "NU",
      "alpha-3": "NIU",
      numeric: "570",
    },
    phone: ["+683"],
    emoji: "🇳🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg",
    phoneLength: 4,
  },
  {
    name: "New Zealand",
    region: "Oceania",
    timezones: {
      "Pacific/Auckland": "+12:00",
      "Pacific/Chatham": "+12:45",
    },
    iso: {
      "alpha-2": "NZ",
      "alpha-3": "NZL",
      numeric: "554",
    },
    phone: ["+64"],
    emoji: "🇳🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Oman",
    region: "Asia",
    timezones: {
      "Asia/Muscat": "+04:00",
    },
    iso: {
      "alpha-2": "OM",
      "alpha-3": "OMN",
      numeric: "512",
    },
    phone: ["+968"],
    emoji: "🇴🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg",
    phoneLength: 8,
  },
  {
    name: "Panama",
    region: "Americas",
    timezones: {
      "America/Panama": "-05:00",
    },
    iso: {
      "alpha-2": "PA",
      "alpha-3": "PAN",
      numeric: "591",
    },
    phone: ["+507"],
    emoji: "🇵🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg",
    phoneLength: 8,
  },
  {
    name: "Peru",
    region: "Americas",
    timezones: {
      "America/Lima": "-05:00",
    },
    iso: {
      "alpha-2": "PE",
      "alpha-3": "PER",
      numeric: "604",
    },
    phone: ["+51"],
    emoji: "🇵🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg",
    phoneLength: 9,
  },
  {
    name: "French Polynesia",
    region: "Oceania",
    timezones: {
      "Pacific/Gambier": "-09:00",
      "Pacific/Marquesas": "-09:30",
      "Pacific/Tahiti": "-10:00",
    },
    iso: {
      "alpha-2": "PF",
      "alpha-3": "PYF",
      numeric: "258",
    },
    phone: ["+689"],
    emoji: "🇵🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg",
    phoneLength: 8,
  },
  {
    name: "Papua New Guinea",
    region: "Oceania",
    timezones: {
      "Pacific/Bougainville": "+11:00",
      "Pacific/Port_Moresby": "+10:00",
    },
    iso: {
      "alpha-2": "PG",
      "alpha-3": "PNG",
      numeric: "598",
    },
    phone: ["+675"],
    emoji: "🇵🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg",
    phoneLength: 8,
  },
  {
    name: "Philippines",
    region: "Asia",
    timezones: {
      "Asia/Manila": "+08:00",
    },
    iso: {
      "alpha-2": "PH",
      "alpha-3": "PHL",
      numeric: "608",
    },
    phone: ["+63"],
    emoji: "🇵🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg",
    phoneLength: 10,
  },
  {
    name: "Pakistan",
    region: "Asia",
    timezones: {
      "Asia/Karachi": "+05:00",
    },
    iso: {
      "alpha-2": "PK",
      "alpha-3": "PAK",
      numeric: "586",
    },
    phone: ["+92"],
    emoji: "🇵🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg",
    phoneLength: 10,
  },
  {
    name: "Poland",
    region: "Europe",
    timezones: {
      "Europe/Warsaw": "+02:00",
    },
    iso: {
      "alpha-2": "PL",
      "alpha-3": "POL",
      numeric: "616",
    },
    phone: ["+48"],
    emoji: "🇵🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg",
    phoneLength: 9,
  },
  {
    name: "Saint Pierre and Miquelon",
    region: "Americas",
    timezones: {
      "America/Miquelon": "-02:00",
    },
    iso: {
      "alpha-2": "PM",
      "alpha-3": "SPM",
      numeric: "666",
    },
    phone: ["+508"],
    emoji: "🇵🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg",
    phoneLength: 6,
  },
  {
    name: "Pitcairn",
    region: "Oceania",
    timezones: {
      "Pacific/Pitcairn": "-08:00",
    },
    iso: {
      "alpha-2": "PN",
      "alpha-3": "PCN",
      numeric: "612",
    },
    phone: ["+870"],
    emoji: "🇵🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg",
    phoneLength: 9,
  },
  {
    name: "Puerto Rico",
    region: "Americas",
    timezones: {
      "America/Puerto_Rico": "-04:00",
    },
    iso: {
      "alpha-2": "PR",
      "alpha-3": "PRI",
      numeric: "630",
    },
    phone: ["+1-787", "+1-939"],
    emoji: "🇵🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg",
    phoneLength: 10,
  },
  {
    name: "Palestine, State of",
    region: "Asia",
    timezones: {
      "Asia/Gaza": "+02:00",
      "Asia/Hebron": "+02:00",
    },
    iso: {
      "alpha-2": "PS",
      "alpha-3": "PSE",
      numeric: "275",
    },
    phone: ["+970"],
    emoji: "🇵🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg",
    phoneLength: 9,
  },
  {
    name: "Portugal",
    region: "Europe",
    timezones: {
      "Atlantic/Azores": "+00:00",
      "Atlantic/Madeira": "+01:00",
      "Europe/Lisbon": "+01:00",
    },
    iso: {
      "alpha-2": "PT",
      "alpha-3": "PRT",
      numeric: "620",
    },
    phone: ["+351"],
    emoji: "🇵🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg",
    phoneLength: 9,
  },
  {
    name: "Palau",
    region: "Oceania",
    timezones: {
      "Pacific/Palau": "+09:00",
    },
    iso: {
      "alpha-2": "PW",
      "alpha-3": "PLW",
      numeric: "585",
    },
    phone: ["+680"],
    emoji: "🇵🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg",
    phoneLength: 7,
  },
  {
    name: "Paraguay",
    region: "Americas",
    timezones: {
      "America/Asuncion": "-04:00",
    },
    iso: {
      "alpha-2": "PY",
      "alpha-3": "PRY",
      numeric: "600",
    },
    phone: ["+595"],
    emoji: "🇵🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg",
    phoneLength: 9,
  },
  {
    name: "Qatar",
    region: "Asia",
    timezones: {
      "Asia/Qatar": "+03:00",
    },
    iso: {
      "alpha-2": "QA",
      "alpha-3": "QAT",
      numeric: "634",
    },
    phone: ["+974"],
    emoji: "🇶🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg",
    phoneLength: 8,
  },
  {
    name: "Réunion",
    region: "Africa",
    timezones: {
      "Indian/Reunion": "+04:00",
    },
    iso: {
      "alpha-2": "RE",
      "alpha-3": "REU",
      numeric: "638",
    },
    phone: ["+262"],
    emoji: "🇷🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg",
    phoneLength: 10,
  },
  {
    name: "Romania",
    region: "Europe",
    timezones: {
      "Europe/Bucharest": "+03:00",
    },
    iso: {
      "alpha-2": "RO",
      "alpha-3": "ROU",
      numeric: "642",
    },
    phone: ["+40"],
    emoji: "🇷🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg",
    phoneLength: 10,
  },
  {
    name: "Serbia",
    region: "Europe",
    timezones: {
      "Europe/Belgrade": "+02:00",
    },
    iso: {
      "alpha-2": "RS",
      "alpha-3": "SRB",
      numeric: "688",
    },
    phone: ["+381"],
    emoji: "🇷🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg",
    phoneLength: 9,
  },
  {
    name: "Russian Federation",
    region: "Europe",
    timezones: {
      "Asia/Anadyr": "+12:00",
      "Asia/Barnaul": "+07:00",
      "Asia/Chita": "+09:00",
      "Asia/Irkutsk": "+08:00",
      "Asia/Kamchatka": "+12:00",
      "Asia/Khandyga": "+09:00",
      "Asia/Krasnoyarsk": "+07:00",
      "Asia/Magadan": "+11:00",
      "Asia/Novokuznetsk": "+07:00",
      "Asia/Novosibirsk": "+07:00",
      "Asia/Omsk": "+06:00",
      "Asia/Sakhalin": "+11:00",
      "Asia/Srednekolymsk": "+11:00",
      "Asia/Tomsk": "+07:00",
      "Asia/Ust-Nera": "+10:00",
      "Asia/Vladivostok": "+10:00",
      "Asia/Yakutsk": "+09:00",
      "Asia/Yekaterinburg": "+05:00",
      "Europe/Astrakhan": "+04:00",
      "Europe/Kaliningrad": "+02:00",
      "Europe/Kirov": "+03:00",
      "Europe/Moscow": "+03:00",
      "Europe/Samara": "+04:00",
      "Europe/Saratov": "+04:00",
      "Europe/Ulyanovsk": "+04:00",
      "Europe/Volgograd": "+03:00",
    },
    iso: {
      "alpha-2": "RU",
      "alpha-3": "RUS",
      numeric: "643",
    },
    phone: ["+7"],
    emoji: "🇷🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg",
    phoneLength: 10,
  },
  {
    name: "Rwanda",
    region: "Africa",
    timezones: {
      "Africa/Kigali": "+02:00",
    },
    iso: {
      "alpha-2": "RW",
      "alpha-3": "RWA",
      numeric: "646",
    },
    phone: ["+250"],
    emoji: "🇷🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg",
    phoneLength: 9,
  },
  {
    name: "Saudi Arabia",
    region: "Asia",
    timezones: {
      "Asia/Riyadh": "+03:00",
    },
    iso: {
      "alpha-2": "SA",
      "alpha-3": "SAU",
      numeric: "682",
    },
    phone: ["+966"],
    emoji: "🇸🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg",
    phoneLength: 9,
  },
  {
    name: "Solomon Islands",
    region: "Oceania",
    timezones: {
      "Pacific/Guadalcanal": "+11:00",
    },
    iso: {
      "alpha-2": "SB",
      "alpha-3": "SLB",
      numeric: "090",
    },
    phone: ["+677"],
    emoji: "🇸🇧",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg",
    phoneLength: 7,
  },
  {
    name: "Seychelles",
    region: "Africa",
    timezones: {
      "Indian/Mahe": "+04:00",
    },
    iso: {
      "alpha-2": "SC",
      "alpha-3": "SYC",
      numeric: "690",
    },
    phone: ["+248"],
    emoji: "🇸🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg",
    phoneLength: 7,
  },
  {
    name: "Sudan",
    region: "Africa",
    timezones: {
      "Africa/Khartoum": "+02:00",
    },
    iso: {
      "alpha-2": "SD",
      "alpha-3": "SDN",
      numeric: "729",
    },
    phone: ["+249"],
    emoji: "🇸🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg",
    phoneLength: 7,
  },
  {
    name: "Sweden",
    region: "Europe",
    timezones: {
      "Europe/Stockholm": "+02:00",
    },
    iso: {
      "alpha-2": "SE",
      "alpha-3": "SWE",
      numeric: "752",
    },
    phone: ["+46"],
    emoji: "🇸🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg",
    phoneLength: 7,
  },
  {
    name: "Singapore",
    region: "Asia",
    timezones: {
      "Asia/Singapore": "+08:00",
    },
    iso: {
      "alpha-2": "SG",
      "alpha-3": "SGP",
      numeric: "702",
    },
    phone: ["+65"],
    emoji: "🇸🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg",
    phoneLength: 8,
  },
  {
    name: "Saint Helena, Ascension and Tristan da Cunha",
    region: "Africa",
    timezones: {
      "Atlantic/St_Helena": "+00:00",
    },
    iso: {
      "alpha-2": "SH",
      "alpha-3": "SHN",
      numeric: "654",
    },
    phone: ["+290"],
    emoji: "🇸🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg",
    phoneLength: 4,
  },
  {
    name: "Slovenia",
    region: "Europe",
    timezones: {
      "Europe/Ljubljana": "+02:00",
    },
    iso: {
      "alpha-2": "SI",
      "alpha-3": "SVN",
      numeric: "705",
    },
    phone: ["+386"],
    emoji: "🇸🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg",
    phoneLength: 9,
  },
  {
    name: "Svalbard and Jan Mayen",
    region: "Europe",
    timezones: {
      "Arctic/Longyearbyen": "+02:00",
    },
    iso: {
      "alpha-2": "SJ",
      "alpha-3": "SJM",
      numeric: "744",
    },
    phone: ["+47"],
    emoji: "🇸🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg",
    phoneLength: 8,
  },
  {
    name: "Slovakia",
    region: "Europe",
    timezones: {
      "Europe/Bratislava": "+02:00",
    },
    iso: {
      "alpha-2": "SK",
      "alpha-3": "SVK",
      numeric: "703",
    },
    phone: ["+421"],
    emoji: "🇸🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg",
    phoneLength: 9,
  },
  {
    name: "Sierra Leone",
    region: "Africa",
    timezones: {
      "Africa/Freetown": "+00:00",
    },
    iso: {
      "alpha-2": "SL",
      "alpha-3": "SLE",
      numeric: "694",
    },
    phone: ["+232"],
    emoji: "🇸🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg",
    phoneLength: 8,
  },
  {
    name: "San Marino",
    region: "Europe",
    timezones: {
      "Europe/San_Marino": "+02:00",
    },
    iso: {
      "alpha-2": "SM",
      "alpha-3": "SMR",
      numeric: "674",
    },
    phone: ["+378"],
    emoji: "🇸🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg",
    phoneLength: 10,
  },
  {
    name: "Senegal",
    region: "Africa",
    timezones: {
      "Africa/Dakar": "+00:00",
    },
    iso: {
      "alpha-2": "SN",
      "alpha-3": "SEN",
      numeric: "686",
    },
    phone: ["+221"],
    emoji: "🇸🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg",
    phoneLength: 9,
  },
  {
    name: "Somalia",
    region: "Africa",
    timezones: {
      "Africa/Mogadishu": "+03:00",
    },
    iso: {
      "alpha-2": "SO",
      "alpha-3": "SOM",
      numeric: "706",
    },
    phone: ["+252"],
    emoji: "🇸🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg",
    phoneLength: [8, 9],
  },
  {
    name: "Suriname",
    region: "Americas",
    timezones: {
      "America/Paramaribo": "-03:00",
    },
    iso: {
      "alpha-2": "SR",
      "alpha-3": "SUR",
      numeric: "740",
    },
    phone: ["+597"],
    emoji: "🇸🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg",
    phoneLength: [6, 7],
  },
  {
    name: "South Sudan",
    region: "Africa",
    timezones: {
      "Africa/Juba": "+02:00",
    },
    iso: {
      "alpha-2": "SS",
      "alpha-3": "SSD",
      numeric: "728",
    },
    phone: ["+211"],
    emoji: "🇸🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg",
    phoneLength: 7,
  },
  {
    name: "Sao Tome and Principe",
    region: "Africa",
    timezones: {
      "Africa/Sao_Tome": "+00:00",
    },
    iso: {
      "alpha-2": "ST",
      "alpha-3": "STP",
      numeric: "678",
    },
    phone: ["+239"],
    emoji: "🇸🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg",
    phoneLength: 7,
  },
  {
    name: "El Salvador",
    region: "Americas",
    timezones: {
      "America/El_Salvador": "-06:00",
    },
    iso: {
      "alpha-2": "SV",
      "alpha-3": "SLV",
      numeric: "222",
    },
    phone: ["+503"],
    emoji: "🇸🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg",
    phoneLength: 8,
  },
  {
    name: "Sint Maarten (Dutch part)",
    region: "Americas",
    timezones: {
      "America/Lower_Princes": "-04:00",
    },
    iso: {
      "alpha-2": "SX",
      "alpha-3": "SXM",
      numeric: "534",
    },
    phone: ["+599"],
    emoji: "🇸🇽",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg",
    phoneLength: 10,
  },
  {
    name: "Syrian Arab Republic",
    region: "Asia",
    timezones: {
      "Asia/Damascus": "+03:00",
    },
    iso: {
      "alpha-2": "SY",
      "alpha-3": "SYR",
      numeric: "760",
    },
    phone: ["+963"],
    emoji: "🇸🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg",
    phoneLength: 7,
  },
  {
    name: "Swaziland",
    region: "Africa",
    timezones: {
      "Africa/Mbabane": "+02:00",
    },
    iso: {
      "alpha-2": "SZ",
      "alpha-3": "SWZ",
      numeric: "748",
    },
    phone: ["+268"],
    emoji: "🇸🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg",
    phoneLength: 8,
  },
  {
    name: "Turks and Caicos Islands",
    region: "Americas",
    timezones: {
      "America/Grand_Turk": "-04:00",
    },
    iso: {
      "alpha-2": "TC",
      "alpha-3": "TCA",
      numeric: "796",
    },
    phone: ["+1-649"],
    emoji: "🇹🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg",
    phoneLength: 10,
  },
  {
    name: "Chad",
    region: "Africa",
    timezones: {
      "Africa/Ndjamena": "+01:00",
    },
    iso: {
      "alpha-2": "TD",
      "alpha-3": "TCD",
      numeric: "148",
    },
    phone: ["+235"],
    emoji: "🇹🇩",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg",
    phoneLength: 6,
  },
  {
    name: "French Southern Territories",
    region: "Africa",
    timezones: {
      "Indian/Kerguelen": "+05:00",
    },
    iso: {
      "alpha-2": "TF",
      "alpha-3": "ATF",
      numeric: "260",
    },
    phone: ["+"],
    emoji: "🇹🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TF.svg",
    phoneLength: 10,
  },
  {
    name: "Togo",
    region: "Africa",
    timezones: {
      "Africa/Lome": "+00:00",
    },
    iso: {
      "alpha-2": "TG",
      "alpha-3": "TGO",
      numeric: "768",
    },
    phone: ["+228"],
    emoji: "🇹🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg",
    phoneLength: 8,
  },
  {
    name: "Thailand",
    region: "Asia",
    timezones: {
      "Asia/Bangkok": "+07:00",
    },
    iso: {
      "alpha-2": "TH",
      "alpha-3": "THA",
      numeric: "764",
    },
    phone: ["+66"],
    emoji: "🇹🇭",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg",
    phoneLength: 9,
  },
  {
    name: "Tajikistan",
    region: "Asia",
    timezones: {
      "Asia/Dushanbe": "+05:00",
    },
    iso: {
      "alpha-2": "TJ",
      "alpha-3": "TJK",
      numeric: "762",
    },
    phone: ["+992"],
    emoji: "🇹🇯",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg",
    phoneLength: 9,
  },
  {
    name: "Tokelau",
    region: "Oceania",
    timezones: {
      "Pacific/Fakaofo": "+13:00",
    },
    iso: {
      "alpha-2": "TK",
      "alpha-3": "TKL",
      numeric: "772",
    },
    phone: ["+690"],
    emoji: "🇹🇰",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg",
    phoneLength: 5,
  },
  {
    name: "Timor-Leste",
    region: "Asia",
    timezones: {
      "Asia/Dili": "+09:00",
    },
    iso: {
      "alpha-2": "TL",
      "alpha-3": "TLS",
      numeric: "626",
    },
    phone: ["+670"],
    emoji: "🇹🇱",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg",
    phoneLength: 7,
  },
  {
    name: "Turkmenistan",
    region: "Asia",
    timezones: {
      "Asia/Ashgabat": "+05:00",
    },
    iso: {
      "alpha-2": "TM",
      "alpha-3": "TKM",
      numeric: "795",
    },
    phone: ["+993"],
    emoji: "🇹🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg",
    phoneLength: 8,
  },
  {
    name: "Tunisia",
    nationalite: "tunisienne",
    region: "Africa",
    timezones: {
      "Africa/Tunis": "+01:00",
    },
    iso: {
      "alpha-2": "TN",
      "alpha-3": "TUN",
      numeric: "788",
    },
    phone: ["+216"],
    emoji: "🇹🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg",
    phoneLength: 8,
  },
  {
    name: "Tonga",
    nationalite: "tongienne",

    region: "Oceania",
    timezones: {
      "Pacific/Tongatapu": "+13:00",
    },
    iso: {
      "alpha-2": "TO",
      "alpha-3": "TON",
      numeric: "776",
    },
    phone: ["+676"],
    emoji: "🇹🇴",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg",
    phoneLength: 5,
  },
  {
    name: "Turkey",
    region: "Asia",
    timezones: {
      "Europe/Istanbul": "+03:00",
    },
    iso: {
      "alpha-2": "TR",
      "alpha-3": "TUR",
      numeric: "792",
    },
    phone: ["+90"],
    emoji: "🇹🇷",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg",
    phoneLength: 11,
  },
  {
    name: "Trinidad and Tobago",
    region: "Americas",
    timezones: {
      "America/Port_of_Spain": "-04:00",
    },
    iso: {
      "alpha-2": "TT",
      "alpha-3": "TTO",
      numeric: "780",
    },
    phone: ["+1-868"],
    emoji: "🇹🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg",
    phoneLength: 7,
  },
  {
    name: "Tuvalu",
    region: "Oceania",
    timezones: {
      "Pacific/Funafuti": "+12:00",
    },
    iso: {
      "alpha-2": "TV",
      "alpha-3": "TUV",
      numeric: "798",
    },
    phone: ["+688"],
    emoji: "🇹🇻",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg",
    phoneLength: 5,
  },
  {
    name: "Taiwan, Province of China",
    region: "Asia",
    timezones: {
      "Asia/Taipei": "+08:00",
    },
    iso: {
      "alpha-2": "TW",
      "alpha-3": "TWN",
      numeric: "158",
    },
    phone: ["+886"],
    emoji: "🇹🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg",
    phoneLength: 9,
  },
  {
    name: "Tanzania, United Republic of",
    region: "Africa",
    timezones: {
      "Africa/Dar_es_Salaam": "+03:00",
    },
    iso: {
      "alpha-2": "TZ",
      "alpha-3": "TZA",
      numeric: "834",
    },
    phone: ["+255"],
    emoji: "🇹🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg",
    phoneLength: 7,
  },
  {
    name: "Ukraine",
    region: "Europe",
    timezones: {
      "Europe/Kyiv": "+03:00",
      "Europe/Simferopol": "+03:00",
    },
    iso: {
      "alpha-2": "UA",
      "alpha-3": "UKR",
      numeric: "804",
    },
    phone: ["+380"],
    emoji: "🇺🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg",
    phoneLength: 9,
  },
  {
    name: "Uganda",
    region: "Africa",
    timezones: {
      "Africa/Kampala": "+03:00",
    },
    iso: {
      "alpha-2": "UG",
      "alpha-3": "UGA",
      numeric: "800",
    },
    phone: ["+256"],
    emoji: "🇺🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg",
    phoneLength: 7,
  },
  {
    name: "United States",
    region: "Americas",
    timezones: {
      "America/Adak": "-09:00",
      "America/Anchorage": "-08:00",
      "America/Boise": "-06:00",
      "America/Chicago": "-05:00",
      "America/Denver": "-06:00",
      "America/Detroit": "-04:00",
      "America/Indiana/Indianapolis": "-04:00",
      "America/Indiana/Knox": "-05:00",
      "America/Indiana/Marengo": "-04:00",
      "America/Indiana/Petersburg": "-04:00",
      "America/Indiana/Tell_City": "-05:00",
      "America/Indiana/Vevay": "-04:00",
      "America/Indiana/Vincennes": "-04:00",
      "America/Indiana/Winamac": "-04:00",
      "America/Juneau": "-08:00",
      "America/Kentucky/Louisville": "-04:00",
      "America/Kentucky/Monticello": "-04:00",
      "America/Los_Angeles": "-07:00",
      "America/Menominee": "-05:00",
      "America/Metlakatla": "-08:00",
      "America/New_York": "-04:00",
      "America/Nome": "-08:00",
      "America/North_Dakota/Beulah": "-05:00",
      "America/North_Dakota/Center": "-05:00",
      "America/North_Dakota/New_Salem": "-05:00",
      "America/Phoenix": "-07:00",
      "America/Sitka": "-08:00",
      "America/Yakutat": "-08:00",
      "Pacific/Honolulu": "-10:00",
    },
    iso: {
      "alpha-2": "US",
      "alpha-3": "USA",
      numeric: "840",
    },
    phone: ["+1"],
    emoji: "🇺🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
    phoneLength: 10,
  },
  {
    name: "Uruguay",
    region: "Americas",
    timezones: {
      "America/Montevideo": "-03:00",
    },
    iso: {
      "alpha-2": "UY",
      "alpha-3": "URY",
      numeric: "858",
    },
    phone: ["+598"],
    emoji: "🇺🇾",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg",
    phoneLength: 8,
  },
  {
    name: "Uzbekistan",
    region: "Asia",
    timezones: {
      "Asia/Samarkand": "+05:00",
      "Asia/Tashkent": "+05:00",
    },
    iso: {
      "alpha-2": "UZ",
      "alpha-3": "UZB",
      numeric: "860",
    },
    phone: ["+998"],
    emoji: "🇺🇿",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg",
    phoneLength: 9,
  },
  {
    name: "Holy See (Vatican City State)",
    region: "Europe",
    timezones: {
      "Europe/Vatican": "+02:00",
    },
    iso: {
      "alpha-2": "VA",
      "alpha-3": "VAT",
      numeric: "336",
    },
    phone: ["+379"],
    emoji: "🇻🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg",
    phoneLength: 10,
  },
  {
    name: "Saint Vincent and the Grenadines",
    region: "Americas",
    timezones: {
      "America/St_Vincent": "-04:00",
    },
    iso: {
      "alpha-2": "VC",
      "alpha-3": "VCT",
      numeric: "670",
    },
    phone: ["+1-784"],
    emoji: "🇻🇨",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg",
    phoneLength: 7,
  },
  {
    name: "Venezuela, Bolivarian Republic of",
    region: "Americas",
    timezones: {
      "America/Caracas": "-04:00",
    },
    iso: {
      "alpha-2": "VE",
      "alpha-3": "VEN",
      numeric: "862",
    },
    phone: ["+58"],
    emoji: "🇻🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg",
    phoneLength: 7,
  },
  {
    name: "Virgin Islands, British",
    region: "Americas",
    timezones: {
      "America/Tortola": "-04:00",
    },
    iso: {
      "alpha-2": "VG",
      "alpha-3": "VGB",
      numeric: "092",
    },
    phone: ["+1-284"],
    emoji: "🇻🇬",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg",
    phoneLength: 7,
  },
  {
    name: "Virgin Islands, U.S.",
    region: "Americas",
    timezones: {
      "America/St_Thomas": "-04:00",
    },
    iso: {
      "alpha-2": "VI",
      "alpha-3": "VIR",
      numeric: "850",
    },
    phone: ["+1-340"],
    emoji: "🇻🇮",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg",
    phoneLength: 10,
  },
  {
    name: "Viet Nam",
    region: "Asia",
    timezones: {
      "Asia/Ho_Chi_Minh": "+07:00",
    },
    iso: {
      "alpha-2": "VN",
      "alpha-3": "VNM",
      numeric: "704",
    },
    phone: ["+84"],
    emoji: "🇻🇳",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg",
    phoneLength: 9,
  },
  {
    name: "Vanuatu",
    region: "Oceania",
    timezones: {
      "Pacific/Efate": "+11:00",
    },
    iso: {
      "alpha-2": "VU",
      "alpha-3": "VUT",
      numeric: "548",
    },
    phone: ["+678"],
    emoji: "🇻🇺",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg",
    phoneLength: 5,
  },
  {
    name: "Wallis and Futuna",
    region: "Oceania",
    timezones: {
      "Pacific/Wallis": "+12:00",
    },
    iso: {
      "alpha-2": "WF",
      "alpha-3": "WLF",
      numeric: "876",
    },
    phone: ["+681"],
    emoji: "🇼🇫",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg",
    phoneLength: 6,
  },
  {
    name: "Samoa",
    region: "Oceania",
    timezones: {
      "Pacific/Apia": "+13:00",
    },
    iso: {
      "alpha-2": "WS",
      "alpha-3": "WSM",
      numeric: "882",
    },
    phone: ["+685"],
    emoji: "🇼🇸",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg",
    phoneLength: [5, 6, 7],
  },
  {
    phoneLength: 8,
  },
  {
    name: "Yemen",
    region: "Asia",
    timezones: {
      "Asia/Aden": "+03:00",
    },
    iso: {
      "alpha-2": "YE",
      "alpha-3": "YEM",
      numeric: "887",
    },
    phone: ["+967"],
    emoji: "🇾🇪",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
    phoneLength: 9,
  },
  {
    name: "Mayotte",
    region: "Africa",
    timezones: {
      "Indian/Mayotte": "+03:00",
    },
    iso: {
      "alpha-2": "YT",
      "alpha-3": "MYT",
      numeric: "175",
    },
    phone: ["+262"],
    emoji: "🇾🇹",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg",
    phoneLength: 9,
  },
  {
    name: "South Africa",
    region: "Africa",
    timezones: {
      "Africa/Johannesburg": "+02:00",
    },
    iso: {
      "alpha-2": "ZA",
      "alpha-3": "ZAF",
      numeric: "710",
    },
    phone: ["+27"],
    emoji: "🇿🇦",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
    phoneLength: 9,
  },
  {
    name: "Zambia",
    region: "Africa",
    timezones: {
      "Africa/Lusaka": "+02:00",
    },
    iso: {
      "alpha-2": "ZM",
      "alpha-3": "ZMB",
      numeric: "894",
    },
    phone: ["+260"],
    emoji: "🇿🇲",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
    phoneLength: 9,
  },
  {
    name: "Zimbabwe",
    region: "Africa",
    timezones: {
      "Africa/Harare": "+02:00",
    },
    iso: {
      "alpha-2": "ZW",
      "alpha-3": "ZWE",
      numeric: "716",
    },
    phone: ["+263"],
    emoji: "🇿🇼",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
    phoneLength: 9,
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
  const [emailError, setEmailError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [select, setSelect] = useState("");
  const onSelect = (code) => setSelect(code);

  const allCountries = [
    "Ad",
    "Ae",
    "Af",
    "Ag",
    "Ai",
    "Al",
    "Am",
    "Ao",
    "Aq",
    "Ar",
    "As",
    "At",
    "Au",
    "Aw",
    "Az",
    "Ba",
    "Bb",
    "Bd",
    "Be",
    "Bf",
    "Bg",
    "Bh",
    "Bi",
    "Bj",
    "Bm",
    "Bo",
    "Br",
    "Bs",
    "Bt",
    "Bw",
    "By",
    "Bz",
    "Ca",
    "Cd",
    "Cf",
    "Cg",
    "Ch",
    "Ci",
    "Ck",
    "Cl",
    "Cm",
    "Cn",
    "Co",
    "Cr",
    "Cu",
    "Cv",
    "Cw",
    "Cy",
    "Cz",
    "De",
    "Dj",
    "Dk",
    "Dm",
    "Do",
    "Dz",
    "Ec",
    "Ee",
    "Eg",
    "Er",
    "Es",
    "Et",
    "Fi",
    "Fj",
    "Fk",
    "Fm",
    "Fo",
    "Fr",
    "Ga",
    "Gb",
    "Gd",
    "Ge",
    "Gg",
    "Gh",
    "Gi",
    "Gl",
    "Gm",
    "Gn",
    "Gq",
    "Gr",
    "Gt",
    "Gu",
    "Gw",
    "Hk",
    "Hn",
    "Hr",
    "Ht",
    "Hu",
    "Id",
    "Ie",
    "Il",
    "Im",
    "In",
    "Io",
    "Iq",
    "Ir",
    "Is",
    "It",
    "Je",
    "Jm",
    "Jo",
    "Jp",
    "Ke",
    "Kg",
    "Kh",
    "Ki",
    "Km",
    "Kn",
    "Kp",
    "Kr",
    "Kw",
    "Ky",
    "Kz",
    "La",
    "Lb",
    "Lc",
    "Li",
    "Lk",
    "Lr",
    "Ls",
    "Lt",
    "Lu",
    "Lv",
    "Ly",
    "Ma",
    "Mc",
    "Md",
    "Me",
    "Mg",
    "Mh",
    "Mk",
    "Ml",
    "Mm",
    "Mn",
    "Mo",
    "Mp",
    "Mq",
    "Mr",
    "Ms",
    "Mt",
    "Mu",
    "Mv",
    "Mw",
    "Mx",
    "My",
    "Mz",
    "Na",
    "Ne",
    "Nf",
    "Ng",
    "Ni",
    "Nl",
    "No",
    "Np",
    "Nr",
    "Nu",
    "Nz",
    "Om",
    "Pa",
    "Pe",
    "Pf",
    "Pg",
    "Ph",
    "Pk",
    "Pl",
    "Pn",
    "Pr",
    "Ps",
    "Pt",
    "Pw",
    "Py",
    "Qa",
    "Ro",
    "Rs",
    "Ru",
    "Rw",
    "Sa",
    "Sb",
    "Sc",
    "Sd",
    "Se",
    "Sg",
    "Si",
    "Sk",
    "Sl",
    "Sm",
    "Sn",
    "So",
    "Sr",
    "Ss",
    "St",
    "Sv",
    "Sx",
    "Sy",
    "Sz",
    "Tc",
    "Td",
    "Tg",
    "Th",
    "Tj",
    "Tk",
    "Tm",
    "Tn",
    "To",
    "Tr",
    "Tt",
    "Tv",
    "Tw",
    "Tz",
    "Ua",
    "Ug",
    "Us",
    "Uy",
    "Uz",
    "Ve",
    "Vi",
    "Vn",
    "Vu",
    "Ws",
    "Ye",
    "Za",
    "Zm",
    "Zw",
  ];

  // const countryList = [
  //   { name: 'USA', code: 'us' },
  //   { name: 'INDIA', code: 'in' },
  //   { name: 'UK', code: 'gb' }
  // ]
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      width: "100%",
      textAlign: "left",
    }),
  };
  const customStylesphone = {
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
      width: "500px",
      padding: "10px",
    }),
  };

  const options = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

    return {
      value: countryCode,
      label: (
        <div>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "8px", width: "40px" }}
            ></span>
          )}
          {country.nationalite}
        </div>
      ),
    };
  });
  const handleCountryChange = (selectedOption) => {
    // Update the formData state with the selected nationality
    setFormData({
      ...formData,
      nationality: selectedOption ? selectedOption.label.props.children[1] : "",
    });

    // Access the nationalite value from the selected option (if needed)
    const selectedNationalityValue = selectedOption
      ? selectedOption.label.props.children[1]
      : null;
  };

  const optionsPays = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase

    return {
      value: countryCode,
      label: (
        <div>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "8px", width: "40px" }}
            ></span>
          )}
          {country.name}
        </div>
      ),
    };
  });
  const handleCountryChangePaysResidence = (selectedOption) => {
    // Update the formData state with the selected nationality
    setFormData({
      ...formData,
      countryresidence: selectedOption
        ? selectedOption.label.props.children[1]
        : "",
    });

    // Access the nationalite value from the selected option (if needed)
    const selectedValue = selectedOption
      ? selectedOption.label.props.children[1]
      : null;
  };

  const [selectedCountryphone, setSelectedCountryphone] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangephone = (selectedOption) => {
    setSelectedCountryphone(selectedOption);
  };
  const handleChangePhoneNumber = (e) => {
    const inputValue = e.target.value;
    // Check if the entered value exceeds the maximum length
    if (inputValue.length <= selectedCountryphone.phoneLength) {
      setPhoneNumber(inputValue);
      setFormData({ ...formData, tel: inputValue });
    }
  };

  const optionsphone = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase();

    return {
      value: countryCode,
      label: (
        <div style={{ textAlign: "left" }}>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{
                marginRight: "2px",
                textAlign: "left",
              }}
            ></span>
          )}
          ({country.phone})
        </div>
      ),
      countryCode: countryCode,
      phoneLength: country.phoneLength,
    };
  });

  // ///////////////////////
  const [selectedCountryphoneWS, setSelectedCountryphoneWS] = useState(null);
  const [phoneNumberWS, setPhoneNumberWS] = useState("");

  const handleChangephoneWS = (selectedOptionWS) => {
    setSelectedCountryphoneWS(selectedOptionWS);
  };
  const handleChangePhoneNumberWS = (e) => {
    const inputValueWS = e.target.value;
    // Check if the entered value exceeds the maximum length
    setPhoneNumberWS((prevValue) => {
      if (inputValueWS.length <= selectedCountryphoneWS.phoneLength) {
        setFormData({ ...formData, numWSup: inputValueWS });
        return inputValueWS;
      }
      return prevValue;
    });
  };

  const optionsphoneWS = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase();

    return {
      value: countryCode,
      label: (
        <div style={{ textAlign: "left" }}>
          {countryCode && (
            <div
              className={`flag-icon flag-icon-${countryCode}`}
              style={{
                marginRight: "1px",
                textAlign: "left",
                rounded: "30px",
              }}
            ></div>
          )}
          ({country.phone})
        </div>
      ),
      countryCode: countryCode,
      phoneLength: country.phoneLength,
    };
  });

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

  const generateOptions = () => {
    return pays.map((country, index) => (
      <option key={index} value={country.nationalite}>
        {country.nationalite}
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Convert the selected image to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFileChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     image: event.target.files[0],
  //   });
  // };
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
  const handleYearChange = (year) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date_naissance: year ? `${year}-01-01` : null,
    }));
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
    image: null,
    numWSup: "",
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
      "numWSup",
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
      "numWSup",
      "password",
    ];
    const isProfileSelected = selectedProfile !== "";
    setProfileError(!isProfileSelected); // Set profile error state

    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Append all form data fields
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        // Append image file separately
        formDataToSubmit.append("image", formData.image);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("https://odine-sport.com/api/auth/signup", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        const responseData = await response.json();

        navigate("/login");
      } else {
        const errorData = await response.json(); // Parse the error response
        setEmailError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Fragment>
      <div className="main-wrap bg-slate-100 mt-16  md:mt:10 lg:mt-10 ">
        <div className="nav-header bg-slate-100   shadow-none border-0">
          <div className="nav-top mb-0 w-100">
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

        <div className="row  ">
          <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat">
            <div className="h-full flex items-center justify-center mt-14 ml-10">
              <img
                src={Login}
                className="object-contain max-h-full "
                alt="Login Image"
              />
            </div>
          </div>
          <div
            className="col-xl-6 align-items-center lg:h-[1480px] lg:mt-56 d-flex bg-slate-100 rounded-3"
            style={{ height: "1000px" }}
          >
            <div className="card shadow-none border-0 ml-6 me-auto login-card bg-slate-100 lg:mt-60 ">
              <div className="card-body rounded-0 text-center ml-6    ">
                <h2 className="text-center items-center text-3xl font-bold mt-14  bg-slate-100 ">
                  Creer une compte
                </h2>
                <div className="sm:h-[540] sm:w-[350px] md:h-[840] md:w-[350px] lg:h-[1480px]  lg:w-[550px] xl:h-[1480px] xl:w-[700px] ">
                  <form
                    className="w-auto h-full sm:w-full "
                    onSubmit={handleSubmit}
                  >
                    {step === 1 && (
                      <div className="h-max lg:w-full  ">
                        <label className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-300">
                          {/* Show the image preview if available */}
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="object-fill w-full h-full"
                            />
                          )}

                          {/* Input for selecting the image */}
                          <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0"
                          />
                        </label>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-user text-grey-500 pe-0"></i>
                          <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            className={`style2-input ps-5  form-control text-grey-900 font-xsss fw-600 ${
                              inputErrors["nom"] ? "is-invalid" : ""
                            }`}
                            placeholder="Votre Nom"
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
                            placeholder="Votre Prenom"
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
                            placeholder="Votre Mot de passe "
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
                            placeholder="Confirmer votre mot de passe"
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
                            <option value="">Select Sexe </option>
                            <option value="male">Homme</option>
                            <option value="female">Femme</option>
                          </select>
                          {inputErrors["gender"] && (
                            <div className="invalid-feedback">
                              {inputErrors["gender"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>

                          <div>
                            <Select
                              options={options}
                              placeholder="Select a country"
                              styles={customStyles}
                              onChange={handleCountryChange}
                              value={options.find(
                                (option) =>
                                  option.value === formData.nationality
                              )} // Set the value from formData
                            />
                          </div>
                          {inputErrors["nationality"] && (
                            <div className="invalid-feedback">
                              {inputErrors["nationality"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group icon-input mb-3">
                          <i className="font-sm ti-world text-grey-500 pe-0"></i>
                          <Select
                            options={optionsPays}
                            placeholder="Select a country"
                            styles={customStyles}
                            onChange={handleCountryChangePaysResidence}
                            value={optionsPays.find(
                              (option) =>
                                option.value === formData.countryresidence
                            )} // Set the value from formData
                          />
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
                            placeholder="Ville"
                            onChange={handleInputChange}
                          />
                          {inputErrors["cityresidence"] && (
                            <div className="invalid-feedback">
                              {inputErrors["cityresidence"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group   icon-input mb-3 d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <Select
                              styles={{
                                // Add or modify the styles as needed
                                control: (provided, state) => ({
                                  ...provided,
                                  width: "130px",
                                  textAlign: "left",
                                  // Set the desired width
                                }),
                              }}
                              options={optionsphone}
                              value={selectedCountryphone}
                              onChange={handleChangephone}
                              placeholder="Select a country"
                            />
                            {selectedCountryphone && (
                              <div
                                style={{
                                  position: "relative",
                                  marginTop: "5px",
                                }}
                              >
                                <input
                                  type="number"
                                  max={selectedCountryphone.phoneLength}
                                  onChange={handleChangePhoneNumber}
                                  placeholder={`Enter phone number for ${selectedCountryphone.label}`}
                                  value={phoneNumber}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    borderTop: "2px solid blue", // Change color as needed
                                  }}
                                >
                                  {/* You can render lines here if needed */}
                                </div>
                              </div>
                            )}
                          </div>
                          {inputErrors["tel"] && (
                            <div className="invalid-feedback">
                              {inputErrors["tel"]}
                            </div>
                          )}
                        </div>

                        <div className="form-group   icon-input mb-3 d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <Select
                              styles={{
                                // Add or modify the styles as needed
                                control: (provided, state) => ({
                                  ...provided,
                                  width: "130px",
                                  textAlign: "left",
                                  // Set the desired width
                                }),
                              }}
                              options={optionsphoneWS}
                              value={selectedCountryphoneWS}
                              onChange={handleChangephoneWS}
                              placeholder="Select a country"
                            />
                            {selectedCountryphoneWS && (
                              <div
                                style={{
                                  position: "relative",
                                  marginTop: "5px",
                                }}
                              >
                                <input
                                  type="number"
                                  max={selectedCountryphoneWS.phoneLength}
                                  onChange={handleChangePhoneNumberWS}
                                  placeholder={`Enter phone number for ${selectedCountryphoneWS.label}`}
                                  value={phoneNumberWS}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    borderTop: "2px solid blue", // Change color as needed
                                  }}
                                >
                                  {/* You can render lines here if needed */}
                                </div>
                              </div>
                            )}
                          </div>
                          {inputErrors["numWSup"] && (
                            <div className="invalid-feedback">
                              {inputErrors["numWSup"]}
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
                            placeholder="Votre nom utlisateur"
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
                            {emailError && (
                              <p className="bg-red-500 rounded-lg text-white font-bold">
                                {emailError}
                              </p>
                            )}
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

      <div className="flex flex-col items-center pb-12 bg-slate-200">
        <div className="flex gap-5 justify-between py-6 w-full text-base font-medium text-white whitespace-nowrap max-w-[1184px] max-md:flex-wrap max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ef89762805ea20b57e15dc704cb093ee6bf4bc12ed244f2cea4bd5c4773e2d5?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="w-36 max-w-full aspect-[2.7]"
          />
          <div className="justify-center px-8 py-2 my-auto bg-zinc-900 rounded-[30px] max-md:px-5">
            Log In
          </div>
        </div>
        <div className="mt-6 text-5xl font-bold text-zinc-900 max-md:max-w-full">
          Informations Personelles
        </div>
        <div className="flex justify-center items-center px-16 mt-8 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between">
            <div className="h-2 bg-blue-600 rounded-md w-[178px]" />
            <div className="h-2 bg-blue-600 rounded-md w-[77px]" />
            <div className="h-2 bg-blue-600 rounded-md w-[77px]" />
          </div>
        </div>
        <form className="w-auto h-full sm:w-full " onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch px-16 mt-8 w-full max-md:px-5 max-md:max-w-full">
              <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                {/* image */}
                <div className="flex justify-center items-center px-16 max-md:px-5 max-md:max-w-full">
                  <div className="max-w-full w-[539px]">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                      <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
                        <label className="max-w-full rounded-full border-2 aspect-square w-[178px] max-md:mt-10">
                          {imagePreview && (
                            <img
                              loading="lazy"
                              src={imagePreview}
                              alt="Preview"
                              className="max-w-full rounded-full border-2 aspect-square w-[178px] max-md:mt-10"
                            />
                          )}
                          <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0"
                          />{" "}
                        </label>
                      </div>

                      <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col self-stretch my-auto max-md:mt-10">
                          <div className="text-3xl font-bold text-black">
                            Photo de profile
                          </div>
                          <div className="flex gap-4 justify-between mt-4">
                            <div className="flex gap-2 justify-between px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe64f313a3ed145b5b50abb8a5dc1b51163bf8cf0e41b5232900227b0ae2686?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-6 aspect-square fill-white"
                              />
                              <div className="grow my-auto">
                                Importer une photo
                              </div>
                            </div>
                            <div className="flex justify-center items-center px-3 w-10 h-10 bg-white aspect-square rounded-[37.5px]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a9522db6cdc53b42ff83146c85938d2c84eda0890550c2fba1c629b88863dbf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="w-full aspect-square"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* nom */}
                <div className="mt-8 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/50144aa4c9c958bc6174b7ad65e5d7ec150f9518fc697ad703a581fae6aaa421?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[0.75] w-[15px]"
                          />
                          <div className="grow">Nom</div>
                        </div>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          className={`   form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                            inputErrors["nom"] ? "is-invalid" : ""
                          }`}
                          placeholder="Votre Nom"
                        />
                        {inputErrors["nom"] && (
                          <div className="invalid-feedback">
                            {inputErrors["nom"]}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* prenom */}
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b682aacddfd9d405027bfc2ee157c55aecce42a1e46ef3db6e893769755f24c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[0.75] w-[15px]"
                          />
                          <div className="grow">Prénom</div>
                        </div>
                        <input
                          className={`form-control  justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                            inputErrors["prenom"] ? "is-invalid" : ""
                          }`}
                          type="text"
                          value={formData.prenom}
                          id="prenom"
                          name="prenom"
                          placeholder="Votre Prenom"
                          onChange={handleInputChange}
                        />
                        {inputErrors["prenom"] && (
                          <div className="invalid-feedback">
                            {inputErrors["prenom"]}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* login */}
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9ff538eb3525a962642dcaaa2fd0b0e9242f70955c91034cc60b37fd70611a6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[0.75] w-[15px]"
                          />
                          <div className="grow">Nom d’utilisateur</div>
                        </div>
                        <input
                          type="text"
                          value={formData.login}
                          id="login"
                          name="login"
                          className={` form-control flex flex-col justify-center items-start py-3.5 pr-16 pl-4 mt-2 w-full whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5${
                            inputErrors["login"] ? "is-invalid" : ""
                          }`}
                          placeholder="Votre nom utlisateur"
                          onChange={handleInputChange}
                        />
                        {inputErrors["login"] && (
                          <div className="invalid-feedback">
                            {inputErrors["login"]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* email */}
                <div className="mt-8 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/09a82f75a3f5ad07251e935f0542b94f6a1090b5b638fd072d492c0015d91f30?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[1.1] w-[22px]"
                          />{" "}
                          <div className="grow">Email</div>
                        </div>{" "}
                        <input
                          type="email"
                          value={formData.email}
                          id="email"
                          name="email"
                          className={` form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
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
                    </div>{" "}
                    {/* password */}
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/45acb82395fb4729e918c514329bcfe86fc6ac2c1d1965aacc2ddbb66aa3a508?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />{" "}
                          <div className="grow">Mot de passe</div>
                        </div>{" "}
                        <input
                          type="password"
                          value={formData.password}
                          id="password"
                          name="password"
                          className={` form-control flex flex-col justify-center mt-2 w-full whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                            validationError ? "is-invalid" : ""
                          }`}
                          placeholder="Votre Mot de passe "
                          onChange={handleInputChange}
                        />
                        {validationError && (
                          <div className="invalid-feedback">
                            {validationError}
                          </div>
                        )}
                      </div>
                    </div>{" "}
                    {/* confirm ps */}
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/432367a9ce53fa928e33c05ceeee1bf97c2f47f8c05b710ff90c8532ae4d2aad?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />{" "}
                          <div className="grow">Confirmer le mot de passe</div>
                        </div>{" "}
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          id="confirmPassword"
                          name="confirmPassword"
                          className={` form-control flex flex-col justify-center mt-2 w-full whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                            validationError ? "is-invalid" : ""
                          }`}
                          placeholder="Confirmer votre mot de passe"
                          onChange={handleInputChange}
                        />
                        {validationError && (
                          <div className="invalid-feedback">
                            {validationError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* whtsup */}
                <div className="mt-8 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bb22266cd8479023296ff915cc3ee01660f7b93f73a8cf204b02d1f132be75c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-6 aspect-square"
                          />{" "}
                          <div className="grow">N° Whatsapp</div>
                        </div>{" "}
                        <div className="flex gap-4 justify-between mt-2 text-base">
                          <Select
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                borderRadius: "0.375rem", // You can adjust the radius as needed
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "30px",

                                width: "100%",
                                fontSize: "1rem", // Set the desired font size
                                backgroundColor: "#f5f5f5", // Set the background color
                                borderWidth: "none",
                              }),
                            }}
                            className="flex  py-2.5 border-solid border-[0.5px]  rounded-[30px]"
                            options={optionsphoneWS}
                            value={selectedCountryphoneWS}
                            onChange={handleChangephoneWS}
                          />{" "}
                          {selectedCountryphoneWS && (
                            <div
                              style={{ position: "relative", marginTop: "5px" }}
                            >
                              <input
                                type="number"
                                max={selectedCountryphoneWS.phoneLength}
                                onChange={handleChangePhoneNumberWS}
                                placeholder={`Entrer numero `}
                                value={phoneNumberWS}
                                className="grow justify-center gap-3 items-start py-3.5 pl-1 border-solid bg-zinc-100 border-[0.5px] border-neutral-200 rounded-[30px] max-md:pr-5"
                              />
                            </div>
                          )}{" "}
                          {inputErrors["numWSup"] && (
                            <div className="invalid-feedback">
                              {inputErrors["numWSup"]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>{" "}
                    {/* num tel  */}
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8b3f9f9ce91abda956cebd8c4890e6a17fde7ecb10f630388688447199195a8?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />{" "}
                          <div className="flex-auto">N° </div>{" "}
                          <div className="grow">(Facultative)</div>
                        </div>{" "}
                        <div className="flex gap-4 justify-between mt-2 text-base whitespace-nowrap">
                          <div className="flex gap-4 justify-between mt-3 text-base">
                            <Select
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  borderRadius: "0.375rem", // You can adjust the radius as needed
                                  display: "flex",
                                  justifyContent: "center",
                                  borderRadius: "30px",

                                  width: "100%",
                                  fontSize: "1rem", // Set the desired font size
                                  backgroundColor: "#f5f5f5", // Set the background color
                                  borderWidth: "none",
                                }),
                              }}
                              options={optionsphone}
                              value={selectedCountryphone}
                              onChange={handleChangephone}
                              placeholder="Select a country"
                            />
                          </div>{" "}
                          {selectedCountryphone && (
                            <div
                              style={{ position: "relative", marginTop: "5px" }}
                            >
                              <input
                                type="number"
                                max={selectedCountryphone.phoneLength}
                                onChange={handleChangePhoneNumber}
                                placeholder={`Enter phone number for ${selectedCountryphone.label}`}
                                value={phoneNumber}
                                className="grow justify-center gap-3 items-start py-3.5 pl-1 border-solid bg-zinc-100 border-[0.5px] border-neutral-200 rounded-[30px] max-md:pr-5"
                              />
                            </div>
                          )}
                          {inputErrors["tel"] && (
                            <div className="invalid-feedback">
                              {inputErrors["tel"]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>{" "}
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-base whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/424750770a24c4c2e5f786593b06fdc9d9137ae4f454f3cda3580afabec0922e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />{" "}
                          <div className="grow">Année de naissance</div>
                        </div>{" "}
                        <div className="flex flex-col justify-center py-px mt-2 w-full border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                          <div className="flex gap-5 justify-between px-5 py-3.5 rounded-md">
                            <DatePicker
                              selected={
                                formData.date_naissance
                                  ? new Date(formData.date_naissance)
                                  : null
                              }
                              onChange={(date) =>
                                handleYearChange(date?.getFullYear())
                              }
                              dateFormat="yyyy"
                              showYearPicker
                              yearDropdownItemNumber={10} // Set the maximum selectable year to 2012
                              maxDate={new Date(2012, 0, 1)}
                              className="bg-zinc-100"
                            />
                            {inputErrors.date_naissance && (
                              <span className="text-red-500 text-sm">
                                {inputErrors.date_naissance}
                              </span>
                            )}
                          </div>
                        </div>{" "}
                        <div className="self-center mt-2 text-zinc-800">
                          Vous devez avoir au moins 13 ans.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* gender */}
                <div className="flex gap-5 justify-between mt-8 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex flex-col flex-1">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81299e0229e715d9789e71faf61b6931d61c805b7fbce9b340cc4b0fd8493cf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                        className="self-start w-5 aspect-square"
                      />{" "}
                      <div className="grow">Sexe</div>
                    </div>{" "}
                    <div>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`form-control flex flex-col justify-center pl-3 pt-3 px-px py-1.5 mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                          inputErrors["gender"] ? "is-invalid" : ""
                        }`}
                      >
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                      </select>
                      {inputErrors["gender"] && (
                        <div className="invalid-feedback">
                          {inputErrors["gender"]}
                        </div>
                      )}
                    </div>{" "}
                  </div>{" "}
                  {/* nationalité */}
                  <div className="flex flex-col flex-1">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc2223db27c0d33870f85928116ea4a9a4b038fc39e2a16c1efd0448f4f6523d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                        className="self-start w-5 aspect-square"
                      />{" "}
                      <div className="grow">Nationalité</div>
                    </div>{" "}
                    <div className="flex flex-col justify-center py-1.5 mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                      <div className="flex gap-5 justify-between px-4  w-full rounded-md">
                        <div className="flex gap-5 justify-between">
                          {/* <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a6550b011e676e8207b4a8f28665fc86fb3002fb604721c44fedb862f9bc7bd?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="aspect-[1.49] w-[30px]"
                    />{" "} */}
                          <div className=" flex flex-auto sm:flex-1  ">
                            <Select
                              options={options}
                              placeholder="Select a country"
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  borderRadius: "0.375rem", // You can adjust the radius as needed
                                  display: "flex",
                                  justifyContent: "center",
                                  borderRadius: "30px",

                                  width: "100%",
                                  fontSize: "1rem", // Set the desired font size
                                  backgroundColor: "#f5f5f5", // Set the background color
                                  borderWidth: "none",
                                }),
                              }}
                              onChange={handleCountryChange}
                              value={options.find(
                                (option) =>
                                  option.value === formData.nationality
                              )}
                            />
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex flex-col flex-1">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a128d306f388b8fe1ee6ab08de9c65c1f7200283d1682fac379e573167086b34?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                        className="self-start w-5 aspect-square"
                      />{" "}
                      <div className="grow">Pays de résidence</div>
                    </div>{" "}
                    <div className="flex flex-col justify-center px-px py-1.5 mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                      <div className="flex gap-5 justify-between px-4  w-full rounded-md">
                        <div className="flex gap-4 justify-between">
                          <div className="flex-auto">
                            {" "}
                            <Select
                              options={optionsPays}
                              placeholder="Select a country"
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  borderRadius: "0.375rem", // You can adjust the radius as needed
                                  display: "flex",
                                  justifyContent: "center",
                                  borderRadius: "30px",

                                  width: "100%",
                                  fontSize: "1rem", // Set the desired font size
                                  backgroundColor: "#f5f5f5", // Set the background color
                                  borderWidth: "none",
                                }),
                              }}
                              onChange={handleCountryChangePaysResidence}
                              value={optionsPays.find(
                                (option) =>
                                  option.value === formData.countryresidence
                              )} // Set the value from formData
                            />
                            {inputErrors["countryresidence"] && (
                              <div className="invalid-feedback">
                                {inputErrors["countryresidence"]}
                              </div>
                            )}
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* ville residence  */}
                <div className="flex gap-4 self-start px-4 mt-8 text-lg text-zinc-900">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/26bf7a353dc8ba12a2c588e612f061c37dd22cdccf246eec44650d1580269c48?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start w-5 aspect-square"
                  />{" "}
                  <div className="flex-auto">Ville de résidence</div>{" "}
                  <div className="grow">(Facultative)</div>
                </div>{" "}
                <input
                  type="text"
                  name="cityresidence"
                  value={formData.cityresidence}
                  className={` form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 max-w-full text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 w-[379px] max-md:pr-5 ${
                    inputErrors["cityresidence"] ? "is-invalid" : ""
                  }`}
                  placeholder="Ville"
                  onChange={handleInputChange}
                />
                {inputErrors["cityresidence"] && (
                  <div className="invalid-feedback">
                    {inputErrors["cityresidence"]}
                  </div>
                )}
                <div className="flex gap-5 justify-between mt-8 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-2 justify-between px-8 py-2 text-blue-600 bg-white rounded-[30px] max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e533b035fdc55aea149414a8782b6f661296bb286de77461db00c1e53282c2f7?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="w-5 aspect-square"
                    />{" "}
                    <div className="grow">Précédent</div>
                  </div>{" "}
                  <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                    <button type="submit" className="grow">
                      Suivant
                    </button>{" "}
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/009067a802ece7a987067a80c9d2bb609c7928469c28602c59a52ec0bbdb4632?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="w-5 aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
}

export default Register;
