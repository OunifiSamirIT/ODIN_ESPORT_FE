import React, { Component, Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import D from "../assets/userdefault.jpg";
import Logo from "../assets/logo.png";
import Logo1 from "../assets/1.png";
import Logo2 from "../assets/2.png";
import Logo3 from "../assets/3.png";
import Logo4 from "../assets/4.png";
import Logo5 from "../assets/5.png";
import paysAll from "./Pays.json";
// import pays from "./Pays.json";
import { v4 as uuidv4 } from "uuid";
import ReactFlagsSelect from "react-flags-select";
import "./flags.css";
import Select, { components } from "react-select";
import * as yup from "yup";
import { Config } from "../config";
import RP from "../assets/Rolepersonne.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "react-modal";
import Header from "../components/Header3";
import { Context } from "../index";
// import "react-modal/styles.css";
import checkedMark from "../assets/check-mark.png";
import PdfModal from '../pages/PdfModal';

const paysAllInfo = [
  {
    name: "Andorre",
    nationalite: "Andorrane",
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
    emoji: "AD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg",
    phoneLength: 6,
  },
  {
    name: "Emirats arabes unis",
    nationalite: "Emirienne",
    region: "Asie",
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
    nationalite: "Afghane",
    region: "Asie",
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
    name: "Antigua et Barbuda",
    nationalite: "Antiguayenne",
    region: "Amerique",
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
    nationalite: "Anguillan",
    region: "Amerique",
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
    name: "Albanie",
    nationalite: "Albanaise",
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
    name: "Arménie",
    nationalite: "Arménienne",
    region: "Asie",
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
    nationalite: "Angolaise",
    region: "Afrique",
    timezones: {
      "Afrique/Luanda": "+01:00",
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
    name: "Argentine",
    nationalite: "Argentine",
    region: "Amerique",
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
    name: "Samoa américaines",
    nationalite: "samoane",
    region: "Océanie",
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
    name: "Austriche",
    nationalite: "Autrichienne",
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
    name: "Australie",
    nationalite: "Australienne",
    region: "Océanie",
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
    nationalite: "Arubéens",
    region: "Amérique",
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
    name: "Aaland",
    nationalite: "Aalandaise",
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
    nationalite: "azerbaïdjanaise",
    region: "Asie",
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
    name: "Bosnie-Herzégovine",
    nationalite: "Bosnienne",
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
    name: "Barbade",
    nationalite: "Barbadienne",
    region: "Amérique",
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
    nationalite: "Bangladaise",
    region: "Asie",
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
    name: "Belgique",
    nationalite: "Belge",
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
    nationalite: "Burkinabé",
    region: "Afrique",
    timezones: {
      "Afrique/Ouagadougou": "+00:00",
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
    name: "Bulgarie",
    nationalite: "Bulgare",
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
    name: "Bahrein",
    nationalite: "Bahreïnienne",
    region: "Asie",
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
    nationalite: "Burundaise",
    region: "Afrique",
    timezones: {
      "Afrique/Bujumbura": "+02:00",
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
    name: "Bénin",
    nationalite: "Béninoise",
    region: "Afrique",
    timezones: {
      "Afrique/Porto-Novo": "+01:00",
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
    nationalite: "Barthéloméenne",
    region: "Amérique",
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
    name: "Bermudes",
    nationalite: "Bermudienne",
    region: "Amérique",
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
    nationalite: "Brunéienne",
    region: "Asie",
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
    name: "Bolivie",
    nationalite: "Bolivienne",
    region: "Amérique",
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
    name: "Brésil",
    nationalite: "Brésilienne",
    region: "Amérique",
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
    nationalite: "Bahaméenne",
    region: "Amérique",
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
    name: "Bhoutan",
    nationalite: "Bhoutanaise",
    region: "Asie",
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
    nationalite: "Botswanaise",
    region: "Afrique",
    timezones: {
      "Afrique/Gaborone": "+02:00",
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
    name: "Biélorussie",
    nationalite: "Biélorusse",
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
    nationalite: "Bélizienne",
    region: "Amérique",
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
    nationalite: "Canadienne",
    region: "Amérique",
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
    name: "République démocratique du Congo",
    nationalite: "Congolaise (RDC)",
    region: "Afrique",
    timezones: {
      "Afrique/Kinshasa": "+01:00",
      "Afrique/Lubumbashi": "+02:00",
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
    name: "Republique Centrafricaine",
    nationalite: "Centrafricaine",
    region: "Afrique",
    timezones: {
      "Afrique/Bangui": "+01:00",
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
    nationalite: "Congolaise",
    region: "Afrique",
    timezones: {
      "Afrique/Brazzaville": "+01:00",
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
    name: "Suisse",
    nationalite: "Suisse",
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
    nationalite: "Ivoirienne",
    region: "Afrique",
    timezones: {
      "Afrique/Abidjan": "+00:00",
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
    name: "Chili",
    nationalite: "Chilienne",
    region: "Amérique",
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
    name: "Cameroun",
    nationalite: "Camerounaise",
    region: "Afrique",
    timezones: {
      "Afrique/Douala": "+01:00",
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
    name: "Chine",
    nationalite: "Chinoise",
    region: "Asie",
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
    name: "Colombie",
    nationalite: "Colombienne",
    region: "Amérique",
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
    nationalite: "Costaricienne",
    region: "Amérique",
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
    nationalite: "Cubaine",
    region: "Amérique",
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
    name: "Cap Vert",
    nationalite: "Cap-verdienne",
    region: "Afrique",
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
    nationalite: "Curacien",
    region: "Amérique",
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
    name: "Île Christmas",
    nationalite: "Île Christmas",
    region: "Océanie",
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
    name: "Chypre",
    nationalite: "Chypriote",
    region: "Asie",
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
    name: "République tchèque",
    nationalite: "Tchèque",
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
    name: "Allemagne",
    nationalite: "allemande",
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
    nationalite: "Djiboutienne",
    region: "Afrique",
    timezones: {
      "Afrique/Djibouti": "+03:00",
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
    name: "Danemark",
    nationalite: "Danoise",
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
    name: "Dominique",
    nationalite: "Dominiquaise",
    region: "Amérique",
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
    name: "République dominicaine",
    nationalite: "Dominicaine",
    region: "Amérique",
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
    name: "Algerie",
    nationalite: "Algérienne",
    region: "Afrique",
    timezones: {
      "Afrique/Algiers": "+01:00",
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
    name: "Equateur",
    nationalite: "Equatorienne",
    region: "Amérique",
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
    name: "Estonie",
    nationalite: "Estonienne",
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
    name: "Egypte",
    nationalite: "Egyptienne",
    region: "Afrique",
    timezones: {
      "Afrique/Cairo": "+02:00",
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
    name: "Erythrée",
    nationalite: "Erythréenne",
    region: "Afrique",
    timezones: {
      "Afrique/Asmara": "+03:00",
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
    name: "Espagne",
    nationalite: "Espagnole",
    region: "Europe",
    timezones: {
      "Afrique/Ceuta": "+02:00",
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
    name: "Ethiopie",
    nationalite: "Ethiopienne",
    region: "Afrique",
    timezones: {
      "Afrique/Addis_Ababa": "+03:00",
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
    name: "Finlande",
    nationalite: "Finlandaise",
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
    name: "Fidji",
    nationalite: "Fidjienne",
    region: "Océanie",
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
    name: "îles Malouines",
    nationalite: "Malouine",
    region: "Amérique",
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
    name: "Micronésie",
    nationalite: "Micronésienne",
    region: "Océanie",
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
    name: "Iles Féroé",
    nationalite: "Féroïenne",
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
    nationalite: "Française",
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
    nationalite: "Gabonaise",
    region: "Afrique",
    timezones: {
      "Afrique/Libreville": "+01:00",
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
    name: "Royaume-Uni",
    nationalite: "Britannique",
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
    name: "Grenade",
    nationalite: "Grenadienne",
    region: "Amérique",
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
    name: "Géorgie",
    nationalite: "Géorgienne",
    region: "Asie",
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
    name: "Guyane",
    nationalite: "Guyanaise",
    region: "Amérique",
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
    nationalite: "Guernesiaise",
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
    nationalite: "Ghanéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Accra": "+00:00",
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
    nationalite: "Gibraltarienne",
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
    nationalite: "Greenlandaise",
    region: "Amérique",
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
    name: "Gambie",
    nationalite: "Gambienne",
    region: "Afrique",
    timezones: {
      "Afrique/Banjul": "+00:00",
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
    name: "Guinée",
    nationalite: "Guinéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Conakry": "+00:00",
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
    nationalite: "Guadeloupéenne",
    region: "Amérique",
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
    name: "Guinée équatoriale",
    nationalite: "Equatoguinéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Malabo": "+01:00",
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
    name: "Grèce",
    nationalite: "Grecque",
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
    name: "Guatemala",
    nationalite: "Guatémaltèque",
    region: "Amérique",
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
    name: "Guinée-Bissau",
    nationalite: "Bissaoguinéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Bissau": "+00:00",
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
    nationalite: "Guyanienne",
    region: "Amérique",
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
    nationalite: "Hongkongaise",
    region: "Asie",
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
    nationalite: "Hondurienne",
    region: "Amérique",
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
    name: "Croatie",
    nationalite: "Croate",
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
    name: "Haïti",
    nationalite: "Haïtienne",
    region: "Amérique",
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
    name: "Hongrie",
    nationalite: "Hongroise",
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
    name: "Indonésie",
    nationalite: "Indonésienne",
    region: "Asie",
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
    name: "Irlande",
    nationalite: "Irlandaise",
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
    name: "Inde",
    nationalite: "Indienne",
    region: "Asie",
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
    name: "Irak",
    nationalite: "Irakienne",
    region: "Asie",
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
    name: "Iran",
    nationalite: "Iranienne",
    region: "Asie",
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
    name: "Islande",
    nationalite: "Islandaise",
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
    name: "Italie",
    nationalite: "Italienne",
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
    nationalite: "Jersiaise",
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
    name: "Jamaique",
    nationalite: "Jamaïquaine",
    region: "Amérique",
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
    name: "Jordane",
    nationalite: "Jordanienne",
    region: "Asie",
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
    nationalite: "Japonaise",
    region: "Asie",
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
    nationalite: "Kényane",
    region: "Afrique",
    timezones: {
      "Afrique/Nairobi": "+03:00",
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
    name: "Kirghizistan",
    nationalite: "kirghize",
    region: "Asie",
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
    name: "Cambodge",
    nationalite: "Cambodgienne",
    region: "Asie",
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
    nationalite: "Kiribatienne",
    region: "Océanie",
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
    name: "Comores",
    nationalite: "Comorienne",
    region: "Afrique",
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
    name: "Saint-Christophe-et-Niévès",
    nationalite: "Christophienne",
    region: "Amérique",
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
    name: "Corée du Nord",
    nationalite: "Nord-coréenne",
    region: "Asie",
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
    name: "Corée du Sud",
    nationalite: "Sud-coréenne",
    region: "Asie",
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
    name: "Koweït",
    nationalite: "koweïtienne",
    region: "Asie",
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
    name: "Kazakhstan",
    nationalite: "Kazakhstanais",
    region: "Asie",
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
    name: "Laos",
    nationalite: "laotienne",
    region: "Asie",
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
    name: "Liban",
    nationalite: "Libanaise",
    region: "Asie",
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
    name: "Sainte-Lucie",
    ationalite: "lucienne",
    region: "Amérique",
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
    nationalite: "liechtensteinoise",
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
    nationalite: "srilankaise",
    region: "Asie",
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
    nationalite: "libérienne",
    region: "Afrique",
    timezones: {
      "Afrique/Monrovia": "+00:00",
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
    nationalite: "lesothienne",
    region: "Afrique",
    timezones: {
      "Afrique/Maseru": "+02:00",
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
    nationalite: "lituanienne",
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
    nationalite: "luxembourgeoise",
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
    name: "Lettonie",
    nationalite: "lettone",
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
    name: "Libye",
    nationalite: "Libyenne",
    region: "Afrique",
    timezones: {
      "Afrique/Tripoli": "+02:00",
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
    name: "Maroc",
    nationalite: "Marocaine",
    region: "Afrique",
    timezones: {
      "Afrique/Casablanca": "+00:00",
      "Afrique/El_Aaiun": "+00:00",
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
    nationalite: "monégasque",
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
    name: "Moldavie",
    nationalite: "moldave",
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
    name: "Monténégro",
    nationalite: "monténégrine",
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
    name: "Madagascar",
    nationalite: "malgache",
    region: "Afrique",
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
    name: "Marshall",
    nationalite: "marshallaise",
    region: "Océanie",
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
    name: "Macédoine",
    nationalite: "macédonienne",
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
    nationalite: "Malienne",
    region: "Afrique",
    timezones: {
      "Afrique/Bamako": "+00:00",
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
    name: "Birmanie",
    nationalite: "birmane",
    region: "Asie",
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
    name: "Mongolie",
    nationalite: "mongole",
    region: "Asie",
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
    name: "Martinique",
    nationalite: "Martiniquaise",
    region: "Amérique",
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
    name: "Mauritanie",
    nationalite: "Mauritanienne",
    region: "Afrique",
    timezones: {
      "Afrique/Nouakchott": "+00:00",
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
    name: "Malta",
    nationalite: "maltaise",
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
    name: "Maurice",
    nationalite: "mauricienne",
    region: "Afrique",
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
    nationalite: "maldivienne",
    region: "Asie",
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
    nationalite: "malawienne",
    region: "Afrique",
    timezones: {
      "Afrique/Blantyre": "+02:00",
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
    name: "Mexique",
    nationalite: "mexicaine",
    region: "Amérique",
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
    nationalite: "malaisienne",
    region: "Asie",
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
    nationalite: "mozambicaine",
    region: "Afrique",
    timezones: {
      "Afrique/Maputo": "+02:00",
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
    name: "Namibie",
    nationalite: "namibienne",
    region: "Afrique",
    timezones: {
      "Afrique/Windhoek": "+02:00",
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
    name: "Niger",
    nationalite: "Nigérienne",
    region: "Afrique",
    timezones: {
      "Afrique/Niamey": "+01:00",
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
    name: "Nigéria",
    nationalite: "Nigériane",
    region: "Afrique",
    timezones: {
      "Afrique/Lagos": "+01:00",
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
    nationalite: "nicaraguayenne",
    region: "Amérique",
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
    name: "Pays-Bas",
    nationalite: "Néerlandaise",
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
    name: "Norvège",
    nationalite: "norvégienne",
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
    nationalite: "népalaise",
    region: "Asie",
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
    nationalite: "nauruane",
    region: "Océanie",
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
    name: "Nouvelle-Zélande",
    nationalite: "néo-zélandaise",
    region: "Océanie",
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
    nationalite: "omanaise",
    region: "Asie",
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
    nationalite: "panaméenne",
    region: "Amérique",
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
    name: "Pérou",
    nationalite: "péruvienne",
    region: "Amérique",
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
    name: "Papouasie-Nouvelle-Guinée",
    nationalite: "papouasienne",
    region: "Océanie",
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
    nationalite: "philippine",
    region: "Asie",
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
    nationalite: "pakistanaise",
    region: "Asie",
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
    name: "Pologne",
    nationalite: "polonaise",
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
    name: "Poto Rico",
    nationalite: "Américaine",
    region: "Amérique",
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
    name: "Palestine",
    nationalite: "Palestinienne",
    region: "Asie",
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
    nationalite: "portugaise",
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
    name: "Palaos",
    nationalite: "palaoise",
    region: "Océanie",
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
    nationalite: "paraguayenne",
    region: "Amérique",
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
    nationalite: "qatarienne",
    region: "Asie",
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
    name: "Roumanie",
    nationalite: "roumaine",
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
    name: "Serbie",
    nationalite: "serbe",
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
    name: "Russie",
    nationalite: "russe",
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
    nationalite: "rwandaise",
    region: "Afrique",
    timezones: {
      "Afrique/Kigali": "+02:00",
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
    name: "Arabie saoudite",
    nationalite: "saoudienne",
    region: "Asie",
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
    name: "Solomon",
    nationalite: "salomonaise",
    region: "Océanie",
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
    nationalite: "seychelloise",
    region: "Afrique",
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
    name: "Soudan",
    nationalite: "Soudanaise",
    region: "Afrique",
    timezones: {
      "Afrique/Khartoum": "+02:00",
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
    name: "Suède",
    nationalite: "suédoise",
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
    name: "Singapour",
    nationalite: "singapourienne",
    region: "Asie",
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
    name: "Slovénie",
    nationalite: "slovène",
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
    name: "Slovaquie",
    nationalite: "slovaque",
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
    nationalite: "sierraléonaise",
    region: "Afrique",
    timezones: {
      "Afrique/Freetown": "+00:00",
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
    name: "Saint-Marin",
    nationalite: "marinaise",
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
    name: "Sénégal",
    nationalite: "Sénégalaise",
    region: "Afrique",
    timezones: {
      "Afrique/Dakar": "+00:00",
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
    name: "Somalie",
    nationalite: "somalienne",
    region: "Afrique",
    timezones: {
      "Afrique/Mogadishu": "+03:00",
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
    nationalite: "surinamaise",
    region: "Amérique",
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
    name: "Sao Tomé-et-Principe",
    nationalite: "santoméenne",
    region: "Afrique",
    timezones: {
      "Afrique/Sao_Tome": "+00:00",
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
    name: "Salvador",
    nationalite: "salvadorienne",
    region: "Amérique",
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
    name: "Syrie",
    nationalite: "syrienne",
    region: "Asie",
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
    nationalite: "swazie",
    region: "Afrique",
    timezones: {
      "Afrique/Mbabane": "+02:00",
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
    region: "Amérique",
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
    name: "Tchad",
    nationalite: "Tchadienne",
    region: "Afrique",
    timezones: {
      "Afrique/Ndjamena": "+01:00",
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
    name: "Togo",
    nationalite: "Togolaise",
    region: "Afrique",
    timezones: {
      "Afrique/Lome": "+00:00",
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
    name: "Thaïlande",
    nationalite: "thaïlandaise",
    region: "Asie",
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
    name: "Tadjikistan",
    nationalite: "tadjike",
    region: "Asie",
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
    name: "Timor oriental",
    nationalite: "timoraise",
    region: "Asie",
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
    name: "Turkménistan",
    nationalite: "turkmène",
    region: "Asie",
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
    name: "Tunisie",
    nationalite: "Tunisienne",
    region: "Afrique",
    timezones: {
      "Afrique/Tunis": "+01:00",
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
    nationalite: "Tongienne",

    region: "Océanie",
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
    name: "Turquie",
    nationalite: "Turque",
    region: "Asie",
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
    name: "Trinité-et-Tobago",
    nationalite: "trinidadienne",
    region: "Amérique",
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
    nationalite: "tuvaluane",
    region: "Océanie",
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
    name: "Taiwan",
    nationalite: "taïwanaise",
    region: "Asie",
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
    name: "Tanzanie",
    nationalite: "tanzanienne",
    region: "Afrique",
    timezones: {
      "Afrique/Dar_es_Salaam": "+03:00",
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
    nationalite: "ukrainienne",
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
    name: "Ouganda",
    nationalite: "ougandaise",
    region: "Afrique",
    timezones: {
      "Afrique/Kampala": "+03:00",
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
    name: "Etats-Unis",
    nationalite: "Américaine",
    region: "Amérique",
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
    nationalite: "uruguayenne",
    region: "Amérique",
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
    name: "Ouzbékistan",
    nationalite: "ouzbèke",
    region: "Asie",
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
    name: "Saint-Vincent-et-les Grenadines",
    nationalite: "vincentaise",
    region: "Amérique",
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
    name: "Venezuela",
    nationalite: "vénézuélienne",
    region: "Amérique",
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
    name: "Viêt Nam",
    nationalite: "vietnamienne",
    region: "Asie",
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
    nationalite: "vanuataise",
    region: "Océanie",
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
    nationalite: "Française",
    region: "Océanie",
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
    nationalite: "samoene",
    region: "Océanie",
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
    nationalite: "yéménite",
    region: "Asie",
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
    name: "Afrique du Sud",
    nationalite: "Sudafricaine",
    region: "Afrique",
    timezones: {
      "Afrique/Johannesburg": "+02:00",
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
    name: "Zambie",
    nationalite: "zambienne",
    region: "Afrique",
    timezones: {
      "Afrique/Lusaka": "+02:00",
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
    nationalite: "zimbabwéenne",
    region: "Afrique",
    timezones: {
      "Afrique/Harare": "+02:00",
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
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({});
  const [profileError, setProfileError] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [scoutSkillsError, setScoutSkillsError] = useState(false);

  const [validationError, setValidationError] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [skillsError, setSkillsError] = useState(false);
  const [coachSkillsError, setCoachSkillsError] = useState(false);
  const [agentSkillsError, setagentSkillsError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewlic, setImagePreviewlic] = useState(null);
  const [select, setSelect] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isUploadEnabled, setUploadEnabled] = useState(false);
  const [File, setFile] = useState("");

  // list pays
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [optionalAttributsValue, setOptionalAttributsValue] = useState("");
  const handleOptionalAttributsChange = (selectedOption) => {
    setOptionalAttributsValue(selectedOption.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      optionalattributs: selectedOption.value,
    }));
  };

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTermsLinkClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const handleSelection = (selectedValue) => {
  //   setFormData({
  //     ...formData,
  //     Licence: selectedValue,
  //   });
  //   setUploadEnabled(selectedValue === "Oui");
  //   // Clear the image preview when the selection changes
  //   setImagePreviewlic(null);
  // };

  const handleSelection = (selectedValue) => {
    // Set formData.Licence to the selected value
    setFormData({
      ...formData,
      Licence: selectedValue === "Oui" ? "Oui" : "Non", // Set to "Oui" if selected value is "Oui", otherwise set to "Non"
    });

    // Enable or disable upload based on the selected value
    setUploadEnabled(selectedValue === "Oui");

    // Clear the image preview when the selection changes
    setImagePreviewlic(null);
  };

  const onSelect = (code) => setSelect(code);
  console.log("SELECT", select);
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
  const defaultImageSrcSet =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c3262ca73af40633bbe9ebec770a2f5b68f0d5fa1fab6effe307ba7c4b620?apiKey=1233a7f4653a4a1e9373ae2effa8babd&";

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
    const countryCode =
      country.iso && country.iso["alpha-2"]
        ? country.iso["alpha-2"].toLowerCase()
        : null;
    const nationalite = country.nationalite ? country.nationalite : "";

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
          {nationalite}
        </div>
      ),
    };
  });

  // Handle country change
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
    console.log("Selected Nationality:", selectedNationalityValue);
  };

  const optionsPays = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase
    const paysRS = country.name ? country.name : "";

    return {
      value: countryCode,
      label: (
        <div>
          {countryCode && (
            <span
              className={`flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "2px", width: "40px" }}
            ></span>
          )}
          {paysRS}
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
    console.log("Selected residence:", selectedValue);
  };

  ///////////////////////////////////////region
  const regionOptions = Array.from(
    new Set(paysAllInfo.map((country) => country.region))
  ).map((region) => ({
    value: region,
    label: region,
  }));

  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleChangeRegion = (event) => {
    const clickedOption = event.target.value;
    const isOptionSelected = selectedRegions.includes(clickedOption);

    if (isOptionSelected) {
      const updatedSelectedRegions = selectedRegions.filter(
        (region) => region !== clickedOption
      );
      setSelectedRegions(updatedSelectedRegions);
    } else {
      setSelectedRegions([...selectedRegions, clickedOption]);
    }
  };

  const handleRemoveRegion = (regionToRemove) => {
    const updatedSelectedRegions = selectedRegions.filter(
      (region) => region !== regionToRemove
    );
    setSelectedRegions(updatedSelectedRegions);
  };

  //////////////////mangerclubpays
  const handleCountryChangePaysAgentclub = (selectedOption) => {
    // Update the formData state with the selected nationality
    setFormData({
      ...formData,
      paysclub: selectedOption ? selectedOption.label.props.children[1] : "",
    });

    // Access the nationalite value from the selected option (if needed)
    const selectedValue = selectedOption
      ? selectedOption.label.props.children[1]
      : null;
    console.log("Selected pays club:", selectedValue);
  };
  /////////coach*******************/
  const handleCountryPaysEntrainement = (selectedOptions) => {
    setSelectedCountries(selectedOptions);

    // Update the formData state with the selected countries
    const selectedCountryLabels = selectedOptions.map(
      (option) => option.label.props.children[1]
    );
    setFormData({
      ...formData,
      countryCoachedIn: selectedCountryLabels.join(", "), // Join selected countries as a string
    });
  };

  const MultiValueContainer = ({ children, ...props }) => {
    return (
      <components.MultiValueContainer {...props}>
        {children}
        {selectedCountries.length > 1 && (
          <span
            onClick={() =>
              setSelectedCountries(
                selectedCountries.slice(0, selectedCountries.length - 1)
              )
            }
            style={{ cursor: "pointer", marginLeft: "5px" }}
          ></span>
        )}
      </components.MultiValueContainer>
    );
  };

  ////////////////**************** */

  const getCombinedPrefix = (whatsAppPrefix, telephonePrefix) => {
    return `${whatsAppPrefix},${telephonePrefix}`;
  };

  const [selectedCountryphone, setSelectedCountryphone] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangephone = (selectedOption) => {
    setSelectedCountryphone(selectedOption);

    const combinedPrefix = getCombinedPrefix(
      selectedCountryphoneWS ? selectedCountryphoneWS.phone : "", // WhatsApp prefix
      selectedOption.phone // Telephone prefix
    );

    // Check if phone number is provided, if not, set it to null
    const tel = formData.tel ? formData.tel : null;

    setFormData((prevFormData) => ({
      ...prevFormData,
      optionalattributs: combinedPrefix,
      tel: tel, // Set tel to null if it's not provided
    }));
  };

  const handleChangePhoneNumber = (e) => {
    const inputValue = e.target.value;

    // Check if the entered value is empty or null
    if (inputValue === "" || inputValue === null) {
      setPhoneNumber(""); // Clear the phone number state
      setFormData({ ...formData, tel: null }); // Set tel field in formData to null
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        tel: "", // Clear any error message
      }));
    } else if (inputValue.length <= selectedCountryphone.phoneLength) {
      // Check if the entered value does not exceed the maximum length
      setPhoneNumber(inputValue);
      setFormData({ ...formData, tel: inputValue });
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        tel: "", // Clear any error message
      }));
    } else {
      // If it exceeds the maximum length, set an error message
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        tel: getTranslation(
          `the Number must be with ${selectedCountryphone.phoneLength} caracters.`,
          `Le Numéro doit être avec ${selectedCountryphone.phoneLength} chiffres.`,
          ``,``
        ),
      }));
    }
  };

  const optionsphone = paysAllInfo
    .map((country) => {
      const countryCode =
        country.iso && country.iso["alpha-2"]
          ? country.iso["alpha-2"].toLowerCase()
          : "unknown";
      const phonePrefix =
        country.phone && country.phone[0] !== undefined
          ? country.phone[0]
          : "No prefix";
      const label =
        countryCode !== "unknown" ? (
          <div style={{ textAlign: "left", width: "350%", lineHeight: "1" }}>
            <div
              className={` flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "1px", textAlign: "left", rounded: "30px" }}
            ></div>
            ({phonePrefix}) &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            {country.name}
          </div>
        ) : (
          `Unknown (${phonePrefix})`
        );
      return {
        value: countryCode,
        label: label,
        countryCode: countryCode,
        phoneLength: country.phoneLength,
        phone: phonePrefix,
        name: country.name,
      };
    })
    .filter((country) => country.name !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));
  //   return {
  //     value: countryCode,
  //     label: (
  //       <div style={{ textAlign: "left" }}>
  //         {countryCode !== 'unknown' && (
  //           <div
  //             className={`flag-icon flag-icon-${countryCode}`}
  //             style={{ marginRight: "1px", textAlign: "left", rounded: "30px" }}
  //           ></div>
  //         )}
  //         ({phonePrefix})
  //       </div>
  //     ),
  //     countryCode: countryCode,
  //     phoneLength: country.phoneLength,
  //     phone: phonePrefix
  //   };
  // });

  // ///////////////////////

  const [selectedCountryphoneWS, setSelectedCountryphoneWS] = useState(null);
  const [phoneNumberWS, setPhoneNumberWS] = useState("");

  const handleChangephoneWS = (selectedOptionWS) => {
    setSelectedCountryphoneWS(selectedOptionWS);

    setFormData((prevFormData) => ({
      ...prevFormData,
      optionalattributs: getCombinedPrefix(
        selectedOptionWS.phone, // WhatsApp prefix
        selectedCountryphone ? selectedCountryphone.phone : "" // Telephone prefix
      ),
    }));
  };

  const handleChangePhoneNumberWS = (e) => {
    const inputValueWS = e.target.value;

    setPhoneNumberWS(inputValueWS);
    setFormData((prevFormData) => ({
      ...prevFormData,
      numWSup: inputValueWS,
    }));

    // Check if the entered value does not match the expected length
    if (inputValueWS.length !== selectedCountryphoneWS.phoneLength) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        numWSup: `Le Numéro doit étre avec  ${selectedCountryphoneWS.phoneLength} chiffres.`,
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        numWSup: "",
      }));
    }
  };

  const optionsphoneWS = paysAllInfo
    .map((country) => {
      const countryCode =
        country.iso && country.iso["alpha-2"]
          ? country.iso["alpha-2"].toLowerCase()
          : "unknown";
      const phonePrefix =
        country.phone && country.phone[0] !== undefined
          ? country.phone[0]
          : "No prefix";

      // Construct the label JSX element
      const label =
        countryCode !== "unknown" ? (
          <div style={{ textAlign: "left" }}>
            <div
              className={` flag-icon flag-icon-${countryCode}`}
              style={{ marginRight: "1px", textAlign: "left", rounded: "30px" }}
            ></div>
            ({phonePrefix}) &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            {country.name}
          </div>
        ) : (
          `Unknown (${phonePrefix})`
        );

      return {
        value: countryCode,
        label: label,
        countryCode: countryCode,
        phoneLength: country.phoneLength,
        phone: phonePrefix,
        name: country.name,
      };
    })
    .filter((country) => country.name !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));

  const profilesData = [
    {
      role: "player",
      profile: "player",
      logo: RP,
      description: "Joueur",
    },
    {
      role: "coach",
      profile: "coach",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a0cc293ae1c9014fe1919fea61ad4023a8567a014058579b69f92ed11744ba6?apiKey=1233a7f4653a4a1e9373ae2effa8babd&",
      description: "Entraineur",
    },
    {
      role: "agent",
      profile: "agent",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f7289581458e0355c5444afa99b74514b801ee79fd13a3730fd6eebebdbef61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&",
      description: "Manager",
    },
    {
      role: "scout",
      profile: "scout",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ffd5a087d071efc0830bacc02194e4ed7fd37e5d3e6b7365b5f71f0172034bf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&",
      description: "Scout",
    },
    {
      role: "other",
      profile: "other",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b82ab55a525d80fe9e3e7cce5b1ed322644f7bcb6112c4247783f337a8b03f6a?apiKey=1233a7f4653a4a1e9373ae2effa8babd&",
      description: "Autre",
    },
  ];

  const handleSkillToggle = (skill) => {
    let updatedSkills = formData.skillsInProfile.split(","); // Convert string to array

    if (updatedSkills.includes(skill)) {
      const index = updatedSkills.indexOf(skill);
      updatedSkills.splice(index, 1);
    } else {
      if (updatedSkills.length <= 10) {
        updatedSkills.push(skill);
      }
    }
    setSelectedSkills(updatedSkills);

    setFormData({
      ...formData,
      skillsInProfile: updatedSkills.join(","), // Convert back to string
    });
    setSkillsError(updatedSkills.length >= 11);
  };

  const [skillsAutreError, setSkillsAutreError] = useState(false);

  const handleSkillToggleAutre = (skillsAutre) => {
    let updatedSkills = formData.skillsAutre.split(",");

    if (updatedSkills.includes(skillsAutre)) {
      updatedSkills = updatedSkills.filter((s) => s !== skillsAutre);
    } else {
      if (updatedSkills.length <= 10) {
        updatedSkills.push(skillsAutre);
      }
    }

    setFormData({
      ...formData,
      skillsAutre: updatedSkills.join(","),
    });
    setSkillsAutreError(updatedSkills.length >= 10);
  };

  const handleCoachSkillToggle = (coachSkill) => {
    let updatedCoachSkills = formData.skills.split(",");

    if (updatedCoachSkills.includes(coachSkill)) {
      updatedCoachSkills = updatedCoachSkills.filter((s) => s !== coachSkill);
    } else {
      if (updatedCoachSkills.length <= 10) {
        updatedCoachSkills.push(coachSkill);
      }
    }

    setFormData({
      ...formData,
      skills: updatedCoachSkills.join(","), // Correct the property name here
    });
    setSkillsError(updatedCoachSkills.length >= 11);
  };

  const handleagentSkillToggle = (agentSkill) => {
    let updatedSkills = formData.skillsagent.split(",");

    if (updatedSkills.includes(agentSkill)) {
      updatedSkills = updatedSkills.filter((s) => s !== agentSkill);
    } else {
      if (updatedSkills.length <= 10) {
        updatedSkills.push(agentSkill);
      }
    }

    setFormData({
      ...formData,
      skillsagent: updatedSkills.join(","), // Correct the property name here
    });
    setagentSkillsError(updatedSkills.length >= 11);
  };

  const handleScoutSkillToggle = (scoutSkill) => {
    let updatedSkills = formData.skillsscout.split(",");

    if (updatedSkills.includes(scoutSkill)) {
      updatedSkills = updatedSkills.filter((s) => s !== scoutSkill);
    } else {
      if (updatedSkills.length <= 10) {
        updatedSkills.push(scoutSkill);
      }
    }

    setFormData({
      ...formData,
      skillsscout: updatedSkills.join(","), // Correct the property name here
    });
    setScoutSkillsError(updatedSkills.length >= 11);
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

  const handleFileChangeLicense = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      // Convert the selected image to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewlic(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      const inputValue = e.target.value;

      // Check if the input is a number and apply additional validation
      if (e.target.type === "number") {
        // Ensure the input is a valid number, non-negative, and has at most 3 digits
        if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
          // If the input is a valid number, update the form data
          setFormData({
            ...formData,
            [e.target.name]: inputValue,
          });

          // Reset any input errors for the changed field
          setInputErrors({
            ...inputErrors,
            [e.target.name]: undefined,
          });
        } else {
          // If the input is not valid, set the value to 0 and show an error message
          setFormData({
            ...formData,
            [e.target.name]: "0",
          });

          setInputErrors({
            ...inputErrors,
            [e.target.name]: "",
          });
        }
      } else {
        // For non-numeric fields, update the form data as usual
        setFormData({
          ...formData,
          [e.target.name]: inputValue,
        });

        // Reset any input errors for the changed field
        setInputErrors({
          ...inputErrors,
          [e.target.name]: undefined,
        });
      }
    }
  };

  const handleYearChange = (year) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date_naissance: year ? `${year}` : null,
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
    optionalattributs: "",
    termesConditions: "",
    partagehorsPL: "",
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
    champsoptionelle: "", //equipe actuel

    // Additional fields for coach
    totalTeam: "",
    countryCoachedIn: "",
    footballTactic: "",
    skills: "",
    ClubActuelCoach: "",
    // Additional fields for agent
    totalCareerTransfers: "",
    clubCovered: "",
    totalPlayer: "",
    typeresponsable: "club",
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
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleNextStep1 = () => {
    const errors = {};

    const requiredFields = [
      "nom",
      "prenom",
      "date_naissance",
      "gender",
      "nationality",
      "countryresidence",
      "email",
      "login",
      "numWSup",
      "password",
    ];

    let errorFound = false;

    requiredFields.forEach((field) => {
      if (formData[field] === "") {
        errors[field] = "Ce champ est obligatoire ";
        setInputErrors({ [field]: errors[field] });
        errorFound = true;
        return; // Stop processing if an error is found
      }
    });
    setInputErrors(errors);
    if (!isPasswordValid()) {
      setValidationError(
        "Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 symbole et 1 chiffre !"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer une adresse e-mail valide";
      setInputErrors({ ...inputErrors, email: errors.email });
      errorFound = true;
    }
    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Les mots de passe ne sont pas identiques !");
      return;
    }
    if (errorFound) {
      console.log("formData:", formData);
      console.log("errors:", errors);
      setButtonClicked(true);
      return;
    }

    setStep(step + 1);
  };

  const handleNextStep = () => {
    if (!isPasswordValid()) {
      setValidationError(
        "Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 symbole et 1 chiffre !"
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Les mots de passe ne sont pas identiques !");
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

    const requiredFields = [
      "nom",
      "prenom",
      "date_naissance",
      "gender",
      "nationality",
      "countryresidence",
      "email",
      "login",
      "profil",
      "password",
    ];

    const isProfileSelected = selectedProfile !== "";
    setProfileError(!isProfileSelected);

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
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   termesConditions: false
    // })

    // )
  };

  const step3ValidationSchema = yup.object().shape({
    champsoptionelle: yup.string().when("profil", {
      is: "player",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    height: yup.string().when("profil", {
      is: "player",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    weight: yup.string().when("profil", {
      is: "player",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    PiedFort: yup.string().when("profil", {
      is: "player",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    positionPlay: yup.string().when("profil", {
      is: "player",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    // Licence: yup.string().when('profil', {
    //   is: 'player',
    //   then: () => yup.string().required("Ce champ est obligatoire !"),
    // }),
    skillsInProfile: yup.string().when("profil", {
      is: "player",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    // coach

    ClubActuelCoach: yup.string().when("profil", {
      is: "coach",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    totalTeam: yup.string().when("profil", {
      is: "coach",
      then: () =>
        yup
          .string()
          .required("Ce champ est obligatoire !")
          .min(0, "La valeur doit être supérieure ou égale à 0"),
    }),
    footballTactic: yup.string().when("profil", {
      is: "coach",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    countryCoachedIn: yup.string().when("profil", {
      is: "coach",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    skills: yup.string().when("profil", {
      is: "coach",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    ///agent club

    clubCovered: yup.string().when(["profil", "typeresponsable"], {
      is: (profil, typeresponsable) =>
        profil === "agent" && typeresponsable === "club",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    paysclub: yup.string().when(["profil", "typeresponsable"], {
      is: (profil, typeresponsable) =>
        profil === "agent" && typeresponsable === "club",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    skillsagent: yup.string().when(["profil", "typeresponsable"], {
      is: (profil, typeresponsable) =>
        profil === "agent" && typeresponsable === "club",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    // skillsagent: yup.string().when(['profil', 'typeresponsable'], {
    //   is: (profil, typeresponsable) => profil === 'agent' && typeresponsable === 'club',
    //   then: () => yup.string().required(" Vous pouvez selectionner au minmum 1 compétence et  au maximum 10 compétences !"),
    // }),

    ///player

    totalPlayer: yup.string().when(["profil", "typeresponsable"], {
      is: (profil, typeresponsable) =>
        profil === "agent" && typeresponsable === "players",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    totalCareerTransfers: yup.string().when(["profil", "typeresponsable"], {
      is: (profil, typeresponsable) =>
        profil === "agent" && typeresponsable === "players",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),

    skillsagent: yup.string().when(["profil", "typeresponsable"], {
      is: (profil, typeresponsable) =>
        profil === "agent" && typeresponsable === "players",
      then: () =>
        yup
          .string()
          .required(
            " Vous pouvez selectionner au minmum 1 compétence et  au maximum 10 compétences !"
          ),
    }),

    ///scout
    engagement: yup.string().when("profil", {
      is: "scout",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    nb_joueurdetecter: yup.string().when("profil", {
      is: "scout",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
    paysscout: yup.string().when("profil", {
      is: "scout",
      then: () => yup.string(),
    }),
    skillsscout: yup.string().when("profil", {
      is: "scout",
      then: () => yup.string().required("Ce champ est obligatoire !"),
    }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await step3ValidationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      // Handle validation errors and update the inputErrors state
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setInputErrors(errors);
      return;
    }

    if (formData.termesConditions !== "Oui") {
      // If not, display an error or prevent form submission
      setErrorMessage("Veuillez accepter les Termes et Conditions .");
      // You can also set an error state or display a message to the user
      return;
    }

    setErrorMessage("");

    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        // Append image file separately
        formDataToSubmit.append("image", formData.image);
      } else if (key === "paysscout") {
        // Concatenate selected regions into a single string separated by commas
        formDataToSubmit.append("paysscout", selectedRegions.join(", "));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Append file to the form data
    formDataToSubmit.append("file", File || null);

    //prob
    try {
      const response = await fetch(`${Config.LOCAL_URL}/api/auth/signup`, {
        method: "POST",
        body: formDataToSubmit,
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("🚀 ~ handleSubmit ~ responseData:", responseData)

        console.log("Server Response Data:", responseData);
        const idusercode = responseData.user.id;
        localStorage.setItem("idusercode", idusercode);
        navigate("/codeverification");
        console.log("User registered successfully!");
      } else {
        const errorData = await response.json();
        console.error("Server Error Message:", errorData.message);

        // Check for specific error messages related to email or login
        if (errorData.message.includes("Email")) {
          setEmailError("Adresse e-mail déjà utilisée.");
          setLoginError("");
        } else if (errorData.message.includes("Login")) {
          setLoginError("Login is already taken.");
          setEmailError("");
        } else {
          // Display a generic error message for any other registration failure
          setEmailError("");
          setLoginError(errorData.message); // Set the backend error message

          // setLoginError("");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);

      // Handle generic registration failure
      // setEmailError("Registration failed.");
      setLoginError("");
    }
  };

let [showModal, setShowModal] = useState(false)
let [wichContent, setWichContent] = useState(1)
var years = Array.from(Array(2012 - 1949), (_, i) => (i + 1950).toString())
let [isCalenderPopShow, setCalenderShow] = useState(false)
  return (
    <Fragment>
      <div
        className="flex flex-col items-center pb-12 bg-gray-200"
        style={{ margin: 0, padding: 0 }}
      >
        <Header />
     <PdfModal showModal={showModal} setShowModal={setShowModal} wichContent={wichContent}/>

        <div className="bg-white px-10 flex justify-center items-center w-full ">
          <div className="flex gap-4 justify-between max-w-[1200px]  py-2 w-full text-base font-medium text-white whitespace-nowrap   ">
            <Link to="/">
              {" "}
              <svg
                width="190"
                height="53"
                viewBox="0 0 209 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_983_61844)">
                  <path
                    d="M66.8102 14.0668V52.3118H40.5283L38.1046 47.5324L35.7149 42.7481L33.3204 37.9687L30.9307 33.1893L33.3204 28.4099L35.7149 23.6256L38.1046 18.8656L40.5283 14.0668H66.8102ZM42.9034 18.8656L40.5283 23.6256L38.1046 28.4099L35.7149 33.1893L38.1046 37.9687L40.4943 42.7481L42.884 47.5324H62.0066V18.8656H42.9034Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M26.2965 14.0668L28.6862 18.8462L31.0759 23.6256L33.4656 28.4099L35.8601 33.1893L33.4656 37.9687L31.0759 42.7481L28.6862 47.5324L26.2965 52.3118H0V14.0668H26.2965ZM4.78426 18.8656V47.5518H23.9068L26.2965 42.7675L28.6862 37.9881L31.0759 33.2087L28.6862 28.4292L26.2965 23.645L23.9068 18.8656H4.78426Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M73.1696 0H68.3369V4.60491H73.1696V0Z"
                    fill="#FF7F00"
                  />
                  <path
                    d="M80.5764 29.1129C79.5627 29.1388 78.5564 28.9332 77.6341 28.5118C76.8426 28.1445 76.1399 27.6104 75.574 26.9461C75.0476 26.3249 74.6342 25.6162 74.3525 24.8521C74.0952 24.1566 73.9591 23.4221 73.9502 22.6805V22.3024C73.9549 21.5218 74.0943 20.7478 74.3622 20.0145C74.6438 19.2285 75.0825 18.508 75.6517 17.8972C76.2209 17.2863 76.9087 16.7978 77.6729 16.4615C79.5284 15.716 81.6002 15.716 83.4557 16.4615C84.2212 16.7958 84.9099 17.2837 85.4794 17.8948C86.0488 18.5059 86.4869 19.2274 86.7664 20.0145C87.0369 20.7471 87.1764 21.5215 87.1784 22.3024V22.6805C87.1719 23.4223 87.0357 24.1572 86.7761 24.8521C86.4981 25.6169 86.0861 26.3259 85.5594 26.9461C84.9926 27.6094 84.2901 28.1433 83.4993 28.5118C82.5834 28.9318 81.5837 29.1374 80.5764 29.1129ZM80.5764 26.8492C81.1679 26.858 81.7546 26.7407 82.2972 26.505C82.7973 26.2807 83.2423 25.9499 83.6011 25.5356C83.9632 25.1296 84.2431 24.6571 84.4252 24.1444C84.6168 23.6145 84.7136 23.055 84.7112 22.4915C84.7169 21.9009 84.6201 21.3137 84.4252 20.7562C84.2474 20.2472 83.9669 19.7803 83.6011 19.3844C83.235 18.9906 82.7887 18.6798 82.2923 18.4731C81.1827 18.0399 79.9507 18.0399 78.8411 18.4731C78.344 18.6811 77.8964 18.9916 77.5275 19.3844C77.1633 19.7815 76.883 20.2481 76.7034 20.7562C76.5102 21.314 76.415 21.9011 76.4223 22.4915C76.4182 23.0547 76.5134 23.6142 76.7034 24.1444C76.8874 24.6562 77.167 25.1283 77.5275 25.5356C77.8898 25.9502 78.3381 26.281 78.8411 26.505C79.3888 26.7407 79.9802 26.858 80.5764 26.8492Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M89.5293 28.8558V16.1753H91.9529V28.8558H89.5293ZM91.6233 28.8558V26.5921H94.2118C94.8071 26.6017 95.3989 26.4998 95.9568 26.2916C96.4443 26.1054 96.8858 25.816 97.251 25.4433C97.6071 25.0713 97.8841 24.6311 98.0653 24.1491C98.2607 23.6185 98.3576 23.0567 98.3513 22.4913C98.3596 21.9147 98.2627 21.3414 98.0653 20.7996C97.8873 20.3217 97.6098 19.8872 97.251 19.5248C96.8849 19.1624 96.4428 18.8859 95.9568 18.7153C95.3947 18.5266 94.8046 18.4348 94.2118 18.4438H91.6233V16.1753H94.0469C95.0573 16.1518 96.0632 16.3162 97.0135 16.66C97.8063 16.9568 98.5255 17.4215 99.122 18.0221C99.6753 18.5873 100.106 19.2606 100.387 19.9998C100.663 20.7309 100.805 21.5061 100.804 22.2877V22.6658C100.802 23.4282 100.661 24.1839 100.387 24.8955C100.086 25.6646 99.6294 26.363 99.0455 26.9469C98.4615 27.5309 97.7631 27.9877 96.9941 28.2886C96.051 28.6634 95.0421 28.8447 94.0276 28.8218L91.6233 28.8558Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M103.058 28.7879V16.2626H105.482V28.7879H103.058Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M108.593 28.7879V16.2626H112.587L117.856 26.7618H118.424L118.079 27.072V16.2626H120.377V28.7879H116.363L111.094 18.2887H110.513L110.857 17.9785V28.7879H108.593Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M74.687 49.4034V36.8538H77.0767V49.4034H74.687ZM76.7326 38.9332V36.878H82.273V38.9332H76.7326ZM76.7326 44.0665V42.0064H81.9628V44.0665H76.7326ZM76.7326 49.3985V47.319H82.4087V49.4034L76.7326 49.3985Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M89.0832 49.704C88.1201 49.7321 87.1624 49.5502 86.2767 49.1708C85.5699 48.8618 84.9661 48.3573 84.5365 47.7166C84.1341 47.0841 83.9252 46.3479 83.9354 45.5984H86.3203C86.3229 45.9406 86.4184 46.2756 86.5966 46.5678C86.8049 46.9077 87.113 47.1752 87.4788 47.3337C87.9858 47.5471 88.5336 47.6464 89.0832 47.6245C89.593 47.6394 90.1007 47.5521 90.5762 47.3676C90.9316 47.2302 91.2409 46.9949 91.4681 46.689C91.6655 46.4049 91.7674 46.0654 91.7589 45.7195C91.7625 45.5075 91.7129 45.2979 91.6147 45.11C91.5165 44.922 91.3728 44.7616 91.1967 44.6434C90.6638 44.3363 90.0617 44.1695 89.4468 44.1587L88.3465 44.0715C87.2896 44.0281 86.2777 43.6322 85.472 42.9469C85.1172 42.6235 84.8375 42.2264 84.6525 41.7834C84.4674 41.3405 84.3815 40.8624 84.4008 40.3827C84.3758 39.6661 84.568 38.9587 84.952 38.3533C85.3361 37.7478 85.8941 37.2725 86.553 36.9896C87.3205 36.668 88.1444 36.5024 88.9766 36.5024C89.8088 36.5024 90.6327 36.668 91.4002 36.9896C92.0543 37.2929 92.6078 37.7774 92.995 38.3856C93.3835 39.0244 93.5804 39.7613 93.5621 40.5087H91.1772C91.1825 40.1693 91.0971 39.8347 90.93 39.5393C90.7539 39.2415 90.499 38.9983 90.1933 38.8364C89.8068 38.6448 89.3785 38.5531 88.9475 38.5698C88.5335 38.5566 88.122 38.6396 87.7454 38.8122C87.4463 38.9534 87.1952 39.1793 87.0231 39.4617C86.8653 39.7323 86.7833 40.0404 86.7856 40.3536C86.7843 40.544 86.8213 40.7327 86.8946 40.9085C86.9679 41.0842 87.0759 41.2434 87.2122 41.3764C87.5913 41.6965 88.0733 41.8687 88.5694 41.8611L89.6698 41.9629C90.4786 42.0154 91.2723 42.2072 92.0158 42.53C92.6435 42.7983 93.1865 43.2323 93.5864 43.7855C93.9697 44.3452 94.165 45.0124 94.1438 45.6905C94.1581 46.4321 93.9431 47.16 93.5282 47.7748C93.0875 48.399 92.4767 48.8836 91.7686 49.1708C90.9204 49.5337 90.0057 49.7153 89.0832 49.704Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M96.3784 49.4035V36.8005H98.8021V49.4035H96.3784ZM98.4676 45.5596V43.4462H100.891C101.325 43.4597 101.754 43.3595 102.137 43.1553C102.467 42.9683 102.735 42.6885 102.908 42.3507C103.083 41.9802 103.174 41.5754 103.174 41.1655C103.174 40.7556 103.083 40.3508 102.908 39.9804C102.735 39.6449 102.467 39.3682 102.137 39.1854C101.753 38.985 101.324 38.8866 100.891 38.8994H98.4676V36.7908H100.702C101.623 36.7642 102.537 36.9396 103.383 37.3047C104.08 37.6085 104.669 38.1152 105.074 38.7588C105.475 39.4412 105.676 40.2219 105.656 41.0128V41.2891C105.676 42.08 105.475 42.8607 105.074 43.5431C104.671 44.1938 104.082 44.7087 103.383 45.0215C102.539 45.3925 101.623 45.5713 100.702 45.545L98.4676 45.5596Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M113.552 49.7039C112.539 49.7274 111.533 49.522 110.61 49.1028C109.819 48.7321 109.117 48.1967 108.55 47.5323C108.021 46.9125 107.608 46.2034 107.328 45.4383C107.07 44.7429 106.934 44.0083 106.926 43.2667V42.8935C106.93 42.1112 107.069 41.3355 107.338 40.6007C107.614 39.8374 108.037 39.1358 108.584 38.5358C109.159 37.8995 109.863 37.3923 110.648 37.0477C112.504 36.3021 114.576 36.3021 116.431 37.0477C117.196 37.3837 117.884 37.8721 118.453 38.483C119.022 39.094 119.461 39.8145 119.742 40.6007C120.013 41.3348 120.152 42.111 120.154 42.8935V43.2667C120.148 44.0085 120.012 44.7435 119.752 45.4383C119.476 46.2041 119.064 46.9135 118.535 47.5323C117.967 48.1956 117.265 48.7309 116.475 49.1028C115.558 49.5206 114.559 49.726 113.552 49.7039ZM113.552 47.4402C114.144 47.449 114.73 47.3317 115.273 47.0961C115.773 46.8715 116.218 46.5407 116.577 46.1266C116.939 45.7224 117.219 45.2515 117.401 44.7403C117.592 44.2086 117.689 43.6476 117.687 43.0825C117.693 42.4934 117.596 41.9078 117.401 41.352C117.223 40.8416 116.943 40.3731 116.577 39.9754C116.21 39.5831 115.764 39.274 115.268 39.069C114.158 38.6358 112.926 38.6358 111.817 39.069C111.32 39.2751 110.872 39.584 110.503 39.9754C110.139 40.3743 109.858 40.8425 109.679 41.352C109.485 41.9081 109.39 42.4937 109.398 43.0825C109.394 43.6473 109.489 44.2083 109.679 44.7403C109.863 45.2506 110.143 45.7212 110.503 46.1266C110.866 46.5409 111.314 46.8716 111.817 47.0961C112.363 47.3401 112.954 47.4656 113.552 47.4645V47.4402Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M122.505 49.4035V36.8005H124.929V49.4035H122.505ZM124.221 45.2154V43.2426H127.411C127.815 43.2537 128.214 43.1584 128.569 42.9663C128.893 42.7876 129.159 42.5202 129.335 42.1956C129.523 41.8476 129.619 41.4569 129.611 41.0613C129.619 40.661 129.524 40.2655 129.335 39.9125C129.159 39.5879 128.893 39.3204 128.569 39.1418C128.214 38.9497 127.815 38.8544 127.411 38.8655H124.221V36.7909H127.154C128.047 36.7714 128.935 36.9227 129.771 37.2368C130.468 37.5004 131.064 37.9749 131.478 38.594C131.9 39.2768 132.109 40.07 132.079 40.8723V41.1486C132.111 41.9532 131.9 42.749 131.473 43.4316C131.049 44.0382 130.453 44.504 129.762 44.7695C128.929 45.0839 128.044 45.2353 127.154 45.2154H124.221ZM130.159 49.4035L126.325 43.9212H129.054L133.005 49.4035H130.159Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M133.382 38.9963V36.8538H143.077V38.9963H133.382ZM136.989 49.4034V38.6521H139.412V49.4034H136.989Z"
                    fill="#2E71EB"
                  />
                  <rect
                    x="148.288"
                    y="33.7975"
                    width="60.3486"
                    height="18.1507"
                    rx="4.48373"
                    stroke="#0D055B"
                    stroke-width="0.727092"
                  />
                  <path
                    d="M169.267 46.5707C168.724 46.5707 168.247 46.4505 167.836 46.2101C167.433 45.9696 167.115 45.6323 166.882 45.1979C166.657 44.7636 166.537 44.2634 166.521 43.6972H166.789V46.3729H166.091V37.8805H166.963V42.1267L166.626 42.9062C166.641 42.2857 166.766 41.7622 166.998 41.3356C167.239 40.9013 167.557 40.5717 167.952 40.3468C168.355 40.1219 168.813 40.0094 169.325 40.0094C169.775 40.0094 170.182 40.0947 170.546 40.2654C170.911 40.436 171.221 40.6686 171.477 40.9634C171.741 41.2581 171.939 41.5993 172.07 41.9871C172.21 42.3671 172.28 42.7704 172.28 43.197V43.3599C172.28 43.7787 172.21 44.182 172.07 44.5697C171.931 44.9498 171.729 45.291 171.466 45.5935C171.21 45.896 170.895 46.1364 170.523 46.3148C170.151 46.4854 169.732 46.5707 169.267 46.5707ZM169.174 45.8029C169.639 45.8029 170.038 45.6904 170.372 45.4655C170.705 45.2406 170.961 44.9381 171.14 44.5581C171.318 44.1781 171.407 43.7515 171.407 43.2784C171.407 42.7976 171.314 42.371 171.128 41.9987C170.95 41.6187 170.69 41.3201 170.349 41.103C170.015 40.8858 169.624 40.7772 169.174 40.7772C168.755 40.7772 168.375 40.8703 168.034 41.0564C167.692 41.2426 167.421 41.5063 167.219 41.8475C167.025 42.181 166.928 42.5765 166.928 43.0341V43.6042C166.928 44.0385 167.025 44.4224 167.219 44.7559C167.421 45.0816 167.692 45.3375 168.034 45.5237C168.375 45.7098 168.755 45.8029 169.174 45.8029ZM176.614 46.5707C176.087 46.5707 175.629 46.4815 175.242 46.3031C174.854 46.117 174.536 45.8727 174.288 45.5702C174.04 45.26 173.853 44.9149 173.729 44.5348C173.613 44.1548 173.555 43.7632 173.555 43.3599V43.197C173.555 42.8015 173.613 42.4137 173.729 42.0336C173.853 41.6536 174.04 41.3124 174.288 41.0099C174.536 40.7074 174.846 40.467 175.218 40.2886C175.598 40.1025 176.04 40.0094 176.545 40.0094C177.188 40.0094 177.723 40.1529 178.15 40.4399C178.584 40.7268 178.91 41.0952 179.127 41.545C179.344 41.9871 179.453 42.4641 179.453 42.976V43.4297H173.95V42.7549H178.848L178.627 43.0923C178.627 42.6347 178.546 42.2353 178.383 41.894C178.228 41.545 177.995 41.2736 177.685 41.0797C177.382 40.8781 177.002 40.7772 176.545 40.7772C176.064 40.7772 175.664 40.8897 175.346 41.1146C175.028 41.3395 174.788 41.6381 174.625 42.0104C174.47 42.3826 174.392 42.8053 174.392 43.2784C174.392 43.7438 174.47 44.1703 174.625 44.5581C174.788 44.9381 175.032 45.2406 175.358 45.4655C175.691 45.6904 176.11 45.8029 176.614 45.8029C177.15 45.8029 177.584 45.6827 177.917 45.4422C178.251 45.1941 178.456 44.9032 178.534 44.5697H179.348C179.271 44.9808 179.108 45.3375 178.86 45.64C178.611 45.9347 178.297 46.1635 177.917 46.3264C177.537 46.4893 177.103 46.5707 176.614 46.5707ZM183.366 46.4427C182.94 46.4427 182.571 46.3807 182.261 46.2566C181.951 46.1325 181.71 45.9231 181.54 45.6284C181.369 45.3259 181.284 44.9226 181.284 44.4185V38.276H182.121V44.5465C182.121 44.9032 182.218 45.1786 182.412 45.3724C182.606 45.5586 182.881 45.6516 183.238 45.6516H184.343V46.4427H183.366ZM180.179 40.8819V40.2188H184.343V40.8819H180.179ZM189.752 46.3729V44.5232H189.613V42.3361C189.613 41.8785 189.493 41.5295 189.252 41.2891C189.012 41.0409 188.639 40.9168 188.135 40.9168C187.903 40.9168 187.666 40.9207 187.426 40.9285C187.193 40.9362 186.968 40.9479 186.751 40.9634C186.541 40.9711 186.355 40.9828 186.192 40.9983V40.2305C186.363 40.2149 186.538 40.1994 186.716 40.1839C186.894 40.1684 187.077 40.1607 187.263 40.1607C187.457 40.1529 187.643 40.149 187.821 40.149C188.449 40.149 188.953 40.2266 189.334 40.3817C189.721 40.5368 190.004 40.7811 190.183 41.1146C190.361 41.4403 190.45 41.8747 190.45 42.4175V46.3729H189.752ZM187.67 46.5358C187.236 46.5358 186.852 46.4582 186.518 46.3031C186.185 46.148 185.925 45.9231 185.739 45.6284C185.56 45.3337 185.471 44.9769 185.471 44.5581C185.471 44.1471 185.564 43.7981 185.75 43.5111C185.944 43.2241 186.22 43.007 186.576 42.8596C186.941 42.7045 187.379 42.6269 187.891 42.6269H189.694V43.2901H187.833C187.344 43.2901 186.968 43.4103 186.704 43.6507C186.448 43.8834 186.32 44.1897 186.32 44.5697C186.32 44.9575 186.456 45.2677 186.728 45.5004C186.999 45.7253 187.367 45.8378 187.833 45.8378C188.12 45.8378 188.395 45.7874 188.659 45.6866C188.922 45.578 189.143 45.3996 189.322 45.1514C189.5 44.8955 189.597 44.5465 189.613 44.1044L189.869 44.465C189.838 44.9226 189.729 45.3065 189.543 45.6167C189.357 45.9192 189.105 46.148 188.787 46.3031C188.469 46.4582 188.096 46.5358 187.67 46.5358Z"
                    fill="#0D055B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_983_61844">
                    <rect width="209" height="52.3118" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </div>

        <form className="w-full h-full sm:w-full  " onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="flex flex-wrap gap-y-4 justify-center content-start items-center self-stretch px-2 sm:px-16  w-full max-md:px-5 max-md:max-w-full">
              <div className="flex flex-col w-full mt-2 max-w-[1184px] max-md:max-w-full">
                <div className="tal1 mt-3 md:text-3xl text-3xl  text-center font-bold text-zinc-900 max-md:max-w-full">
                  {getTranslation(
                    `Personal information`, // -----> Englais
                    `Informations Personelles`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>
                <div className="flex justify-center items-center mt-2 px-8 sm:px-16 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-3 justify-between mr-2 ml-2">
                    <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />
                    <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                    <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch px-16 mt-4 w-full max-md:px-5 max-md:max-w-full">
                  <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                    <img
                      loading="lazy"
                      srcSet={imagePreview ? imagePreview : D}
                      className="self-center max-w-full rounded-full aspect-square w-[178px]"
                    />

                    <div className="tal1 self-center mt-1 text-2xl font-bold text-black whitespace-nowrap">
                      {getTranslation(
                        `Profile picture`, // -----> Englais
                        `Photo de profile`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>

                    <label className=" flex cursor-pointer items-center justify-center self-center w-[266px]">
                      {" "}
                      {/* Center the label section */}
                      <div className="cursor-pointer flex gap-2 justify-center items-center px-8 py-2 mt-2 max-w-full text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] w-[266px] max-md:px-5">
                        {" "}
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe64f313a3ed145b5b50abb8a5dc1b51163bf8cf0e41b5232900227b0ae2686?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="w-6 aspect-square fill-white"
                        />
                        <input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          className="flex absolute opacity-0"
                        />
                        <span className="tal2">
                          
                        {getTranslation(
                          `Import a photo`, // -----> Englais
                          `Importer une photo`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                        </span>

                      </div>
                    </label>
                  </div>
                </div>
                <div className="mt-3 md:mt-8 max-md:max-w-full">
                  <div className="flex gap-2 md:gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/50144aa4c9c958bc6174b7ad65e5d7ec150f9518fc697ad703a581fae6aaa421?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[0.75] w-[15px] mt-1"
                          />
                          <label className="tal1 grow">
                            {getTranslation(
                              `Last name`, // -----> Englais
                              `Nom`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </label>
                        </div>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          style={{ fontSize: "14px" }}
                          onChange={handleInputChange}
                          className={`   form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                            inputErrors["nom"] ? "is-invalid" : ""
                          }`}
                          placeholder={getTranslation(
                            `Your last name`, // -----> Englais
                            `Votre nom`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        />
                        {inputErrors["nom"] && (
                          <div className="invalid-feedback text-xs">
                            {inputErrors["nom"]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b682aacddfd9d405027bfc2ee157c55aecce42a1e46ef3db6e893769755f24c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[0.75] w-[15px] mt-1"
                          />
                          <div className="tal1 grow">
                            {getTranslation(
                              `First name`, // -----> Englais
                              `Prénom`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}{" "}
                          </div>
                        </div>
                        <input
                          className={`form-control  justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                            inputErrors["prenom"] ? "is-invalid" : ""
                          }`}
                          type="text"
                          value={formData.prenom}
                          id="prenom"
                          name="prenom"
                          style={{ fontSize: "14px" }}
                          placeholder={getTranslation(
                            `Your first name`, // -----> Englais
                            `Votre prénom`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                          onChange={handleInputChange}
                        />
                        {inputErrors["prenom"] && (
                          <div className="invalid-feedback text-xs">
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
                            className="self-start aspect-[0.75] w-[15px] mt-1"
                          />
                          <div className=" tal1 grow">
                            {getTranslation(
                              `Username`, // -----> Englais
                              `Nom d’utilisateur`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}{" "}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={formData.login}
                          id="login"
                          name="login"
                          style={{ fontSize: "14px" }}
                          className={`form-control flex flex-col justify-center items-start py-3.5 pr-16 pl-4 mt-2 w-full whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                            inputErrors["login"] ? "is-invalid" : "" // Apply a red border if there's an error
                          }`}
                          placeholder={getTranslation(
                            `Your username`, // -----> Englais
                            `Votre Nom d’utilisateur`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                          onChange={handleInputChange}
                        />
                        {inputErrors["login"] && (
                          <div className="invalid-feedback text-xs text-xs">
                            {inputErrors["login"]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* email */}
                <div className="mt-8 max-md:max-w-full">
                  <div className="flex gap-2 md:gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-2">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/09a82f75a3f5ad07251e935f0542b94f6a1090b5b638fd072d492c0015d91f30?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start aspect-[1.1] w-[22px] mt-1"
                          />{" "}
                          <div className="tal1 grow">
                            {getTranslation(
                              `Email`, // -----> Englais
                              `Email`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>{" "}
                        <input
                          type="email"
                          value={formData.email}
                          id="email"
                          name="email"
                          style={{ fontSize: "14px" }}
                          className={`form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                            inputErrors["email"] ? "is-invalid" : ""
                          }`}
                          placeholder={getTranslation(
                            `Your Email`, // -----> Englais
                            `Votre adresse email`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                          onChange={handleInputChange}
                          required
                        />
                        {inputErrors["email"] && (
                          <div className="invalid-feedback text-xs text-xs">
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
                            className="self-start w-5 aspect-square mt-1"
                          />{" "}
                          <div className=" tal1 grow">
                            {getTranslation(
                              `Password`, // -----> Englais
                              `Mot de passe`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>{" "}
                        <input
                          type="password"
                          value={formData.password}
                          id="password"
                          name="password"
                          className={` form-control flex flex-col justify-center mt-2 w-full whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                            validationError ? "is-invalid" : ""
                          }`}
                          placeholder={getTranslation(
                            `Your password [Aexemple@exemple]`, // -----> Englais
                            `Votre mot de passe [Aexemple@exemple]`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                          onChange={handleInputChange}
                        />
                        {validationError ? (
                          <div className="invalid-feedback text-xs text-xs">
                            {validationError}
                          </div>
                        ) : (
                          <div className="text-sm">
                            Le mot de passe doit contenir au moins 8 caractères
                            dont 1 majuscule, 1 symbole et 1 chiffre !
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
                            className="self-start w-5 aspect-square mt-1"
                          />{" "}
                          <div className="tal1 grow">
                            {getTranslation(
                              `Confirm password`, // -----> Englais
                              `Confirmer le mot de passe`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>{" "}
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          id="confirmPassword"
                          name="confirmPassword"
                          className={` form-control flex flex-col justify-center mt-2 w-full whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                            validationError ? "is-invalid" : ""
                          }`}
                          placeholder={getTranslation(
                            `Confirm your password`, // -----> Englais
                            `Confirmer votre mot de passe`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                          onChange={handleInputChange}
                        />
                        {validationError && (
                          <div className="invalid-feedback text-xs">
                            {validationError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* whtsup */}
                <div className="mt-8   max-md:max-w-full">
                  <div className="flex gap-4  max-md:flex-col  ">
                    <div className="flex gap-1 flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6 w-full">
                        <div className="flex  gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bb22266cd8479023296ff915cc3ee01660f7b93f73a8cf204b02d1f132be75c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-6 aspect-square "
                          />{" "}
                          <div className="tal1 grow">
                            {getTranslation(
                              `N° Whatsapp`, // -----> Englais
                              `N° Whatsapp`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>{" "}
                        <div className="flex   justify-between  text-base">
                          <Select
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                borderRadius: "0.375rem",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "30px",
                                width: "130px",
                                fontSize: "1rem",
                                backgroundColor: "#f5f5f5",
                                borderWidth: "none",
                                paddingTop: "6px", // Adjust paddingTop to match the desired height
                                paddingBottom: "6px",
                              }),
                            }}
                            className="flex  py-2.5 border-solid border-[0.5px]  rounded-[30px]"
                            placeholder={getTranslation(
                              `Prefix`, // -----> Englais
                              `Prefix`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                            options={optionsphoneWS}
                            value={selectedCountryphoneWS}
                            onChange={handleChangephoneWS}
                            isSearchable={true} // Enable search functionality
                            filterOption={(option, inputValue) => {
                              const labelContent =
                                typeof option.label === "string"
                                  ? option.label
                                  : option.label.props.children;

                              const labelString =
                                typeof labelContent === "string"
                                  ? labelContent.toLowerCase()
                                  : labelContent.join("").toLowerCase(); // Join children of JSX element if it's an array
                              const name = option.name
                                ? option.name.toLowerCase()
                                : ""; // Check if name property exists

                              const labelIncludesInput = labelString.includes(
                                inputValue.toLowerCase()
                              );
                              const nameIncludesInput = name.includes(
                                inputValue.toLowerCase()
                              );

                              return labelIncludesInput || nameIncludesInput;
                            }}
                          />

                          <div
                            style={{
                              position: "relative",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            <input
                              type="number"
                              max={
                                selectedCountryphoneWS
                                  ? selectedCountryphoneWS.phoneLength
                                  : 0
                              }
                              onChange={handleChangePhoneNumberWS}
                              placeholder={getTranslation(
                                `Enter number`, // -----> Englais
                                `Entrer votre numéro`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                              value={phoneNumberWS.slice(
                                0,
                                selectedCountryphoneWS
                                  ? selectedCountryphoneWS.phoneLength
                                  : 0
                              )}
                              className={`form-control grow justify-center w-full md:ml-0 md:w-full gap-2  mt-1 items-start py-3.5 pl-3 border-solid border-[0.5px] border-neutral-200 rounded-[30px] ${
                                inputErrors["numWSup"] ? "is-invalid" : ""
                              }`}
                              disabled={!selectedCountryphoneWS}
                            />
                          </div>

                          <div className="text-red-500 text-xs mt-1">
                            {buttonClicked &&
                              !selectedCountryphoneWS &&
                              "Veuillez sélectionner un pays"}
                          </div>
                        </div>
                      </div>{" "}
                      {inputErrors["numWSup"] && (
                        <div className="text-red-500 text-xs mt-1">
                          {inputErrors["numWSup"]}
                        </div>
                      )}
                    </div>{" "}
                    {/* num tel  */}
                   <div className="flex  gap-1 flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6 w-full">
                          <div className="flex gap-2 px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8b3f9f9ce91abda956cebd8c4890e6a17fde7ecb10f630388688447199195a8?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square mt-1"
                          />{" "}
                          <div className="tal1 flex-auto">
                            {getTranslation(
                              `Phone number`, // -----> Englais
                              `N° Téléphone`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}{" "}
                          </div>{" "}
                          <div className="tal1 grow ">
                            (
                            {getTranslation(
                              `Optional`, // -----> Englais
                              `Facultatif`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                            )
                          </div>
                        </div>{" "}
                        <div className="flex  text-base ">
                          <Select
                            // styles={{
                            //   control: (provided, state) => ({
                            //     ...provided,
                            //     borderRadius: "0.375rem",
                            //     display: "flex",
                            //     justifyContent: "center",
                            //     borderRadius: "30px",
                            //     width: "130px",
                            //     fontSize: "1rem",
                            //     backgroundColor: "#f5f5f5",
                            //     borderWidth: "none",
                            //     paddingTop: "6px", // Adjust paddingTop to match the desired height
                            //     paddingBottom: "6px",
                            //   }),
                            // }}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                borderRadius: "0.375rem",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "30px",
                                width: "130px",
                                fontSize: "1rem",
                                backgroundColor: "#f5f5f5",
                                borderWidth: "none",
                                paddingTop: "6px", // Adjust paddingTop to match the desired height
                                paddingBottom: "6px",
                              }),
                            }}
                            className="flex  py-2.5 border-solid border-[0.5px]  rounded-[30px]"
                            options={optionsphone}
                            value={selectedCountryphone}
                            onChange={handleChangephone}
                            isSearchable={true} // Enable search functionality
                            filterOption={(option, inputValue) => {
                              const labelContent =
                                typeof option.label === "string"
                                  ? option.label
                                  : option.label.props.children;

                              const labelString =
                                typeof labelContent === "string"
                                  ? labelContent.toLowerCase()
                                  : labelContent.join("").toLowerCase(); // Join children of JSX element if it's an array
                              const name = option.name
                                ? option.name.toLowerCase()
                                : ""; // Check if name property exists

                              const labelIncludesInput = labelString.includes(
                                inputValue.toLowerCase()
                              );
                              const nameIncludesInput = name.includes(
                                inputValue.toLowerCase()
                              );

                              return labelIncludesInput || nameIncludesInput;
                            }}
                            placeholder={getTranslation(
                              `Prefix`, // -----> Englais
                              `Préfixe`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          />

                          <div
                            style={{
                              position: "relative",
                              marginTop: "5px",
                              width: "100%",
                              
                            }}
                          >
                            {" "}
                            <input
                              type="number"
                              max={
                                selectedCountryphone
                                  ? selectedCountryphone.phoneLength
                                  : 0
                              }
                              onChange={handleChangePhoneNumber}
                              placeholder={getTranslation(
                                `Enter number`, // -----> Englais
                                `Entrer votre numéro`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                              disabled={!selectedCountryphone}

                              value={phoneNumber.slice(
                                0,
                                phoneNumber
                                  ? selectedCountryphone.phoneLength
                                  : 0
                              )}
                              className={` form-control grow justify-center w-full  items-start py-2.5  mt-1 border-solid  border-[0.5px] border-neutral-200 rounded-[30px] max-md:pr-2 ${
                                inputErrors["tel"] ? "is-invalid" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      {inputErrors["tel"] && (
                        <div className="text-red-500 text-xs mt-1">
                          {inputErrors["tel"]}
                        </div>
                      )}
                    </div>{" "}
                    <div className="flex bg-white-400 gap-1 flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col whitespace-nowrap text-zinc-900 max-md:mt-6 w-full">
                       <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/424750770a24c4c2e5f786593b06fdc9d9137ae4f454f3cda3580afabec0922e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square mt-1"
                          />{" "}
                          <div className="tal1 grow">
                            {getTranslation(
                              `Year of birth`, // -----> Englais
                              `Année de naissance`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>{" "}

                        
                        <div className="flex flex-col justify-center items-center relative py-px mt-2 w-full border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] form-control  rounded-[30px] flex flex-col justify-center w-full text-sm border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                         <span onClick={() => {setCalenderShow(!isCalenderPopShow)}} className="flex cursor-pointer h-full flex-row   items-center w-full">
                         <img src='https://cdn-icons-png.flaticon.com/512/9926/9926396.png' className="w-6 mr-5 h-6 absolute right-2"/>
                         <span>
                          {formData.date_naissance
                                ? formData.date_naissance
                                :" Your year of birth" }
                         </span>
                         </span>

                         <div style={{
                          opacity: !isCalenderPopShow ? "0" :"1",
                          scale: !isCalenderPopShow ? ".9" :"1",
                          pointerEvents: !isCalenderPopShow ? "none" :"all"
                         }} className="allyearsContainerPopUp border-1 overflow-hidden duration-100 z-50 zindex-111 w-[70%]  rounded-2xl border-blue-600 absolute top-[120%] ">
                              <header className="min-h-10 bg-blue-600 flex items-center justify-center">
                              <img className="w-6 h-6 invert" src={require("../assets/calendar.png")}/>
                              </header>
                              <main className="overflow-y-scroll items-center justify-center bg-white flex flex-wrap max-h-40">
                                {
                                  years.map( (year) => {
                                    return <span onClick={() => {
                                      console.log(year, "y")
                                      handleYearChange(year);
                                      setCalenderShow(false)
                                      // Update border color here
                                      setInputErrors({
                                        ...inputErrors,
                                        date_naissance: "", // Clear any existing error
                                      });
                                    }} style={{border: "2px solid #2563eb"}} className="py-2 px-3 hover:bg-blue-600 hover:text-white cursor-pointer duration-500  my-2 mx-2  rounded-full text-blue-600  ">{year}</span>
                                  } )
                                }
                              </main>
                         </div>
                          {/* <DatePicker
                            selected={
                              formData.date_naissance
                                ? new Date(formData.date_naissance)
                                : null
                            }
                            onChange={(date) => {
                              handleYearChange(date?.getFullYear());
                              // Update border color here
                              setInputErrors({
                                ...inputErrors,
                                date_naissance: "", // Clear any existing error
                              });
                            }}
                            dateFormat="yyyy"
                            showYearPicker
                            yearDropdownItemNumber={10}
                            maxDate={new Date(2012, 0, 1)}
                            placeholderText={getTranslation(
                              `Your Year of birth`, // -----> Englais
                              `Votre Année de naissance`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                            className={`form-control flex flex-col justify-center w-full text-sm border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                              inputErrors["date_naissance"] ? "is-invalid" : ""
                            }`}
                          /> */}
                        </div>{" "}
                        <div className="tal1 self-center mt-2 text-zinc-800">
                          {getTranslation(
                            `You must be at least 13 years old .`, // -----> Englais
                            `Vous devez avoir au moins 13 ans .`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </div>
                      </div>
                      {inputErrors.date_naissance && (
                        <span className="text-red-500 text-xs">
                          {inputErrors.date_naissance}
                        </span>
                      )}
                    </div>
                  </div>
                </div>{" "}
                {/* gender */}
                <div className="mt-2  md:mt-8 max-md:max-w-full">
                  <div className="flex md:gap-2 gap-7 max-md:flex-col  ">
                    <div className="flex flex-col  pr-0 md:pr-6 flex-1">
                      <div className="flex  flex-col whitespace-nowrap text-zinc-900 max-md:mt-6">
                        <div className="flex gap-4 justify-between px-4 text-lg">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81299e0229e715d9789e71faf61b6931d61c805b7fbce9b340cc4b0fd8493cf?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square mt-1"
                          />{" "}
                          <div className="tal1 grow">
                            {getTranslation(
                              `Gender`, // -----> Englais
                              `Sexe`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>{" "}
                        <div className="w-full">
                          <span className="relative ">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`form-control flex flex-col  justify-center pl-3 pt-3 pr-2  py-1.5 mt-2 w-full text-sm border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                              inputErrors["gender"] ? "is-invalid" : ""
                            }`}
                          >
                            <option value="">
                              {getTranslation(
                                `Your gender`, // -----> Englais
                                `Votre sexe`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="male">
                              {getTranslation(
                                `Male`, // -----> Englais
                                `Homme`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="female">
                              {getTranslation(
                                `Female`, // -----> Englais
                                `Femme`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                          </select>
                          
                          <span className="absolute right-[4px] bottom-0 h-[80%] w-10   flex items-center justify-center">
                                <span style={{
                                  borderLeft: "2px solid #ddd"
                                }} className="pl-1 h-5 ">
                                <img src={require("../assets/down.png")} 
                                  className="w-5  invert-[.8]"
                                />
                                </span>

                          </span>
                          </span>
                          {inputErrors["gender"] && (
                            <div className="invalid-feedback text-xs mt-2">
                              {inputErrors["gender"]}
                            </div>
                          )}
                          
                        </div>{" "}
                        {inputErrors.gender && (
                        <span className="text-red-500 text-xs mt-1">
                          {inputErrors.gender}
                        </span>
                      )}
                      </div>{" "}
                    </div>{" "}
                    {/* nationalité */}
                    <div className="flex flex-col mr-0 md:mr-5 flex-1">
                      <div className="flex gap-2  px-4 text-lg">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc2223db27c0d33870f85928116ea4a9a4b038fc39e2a16c1efd0448f4f6523d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="self-start w-5 aspect-square mt-1"
                        />{" "}
                        <div className="tal1 ml-2">
                          {getTranslation(
                            `Nationality`, // -----> Englais
                            `Nationalité`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </div>
                      </div>{" "}
                      {/* <Select
                        options={options}
                        placeholder={
                          getTranslation(
                            `Your nationality`,  // -----> Englais
                            `Votre nationalité`, //  -----> Francais
                            ``,  //  -----> Turkey
                            ``,  //  -----> Allemagne
                          )

                        }
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderRadius: "0.375rem", // You can adjust the radius as needed
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "30px",

                            // width: "230px",
                            fontSize: "14px", // Set the desired font size
                            backgroundColor: "#f5f5f5", // Set the background color
                            borderWidth: "none",



                            paddingTop: "8px",
                            paddingBottom: "8px",
                            marginTop: "8px",
                            width: "100%",

                            border: "0.5px solid #E5E5E5",
                          }),
                        }}
                        onChange={handleCountryChange}
                        value={options.find(
                          (option) =>
                            option.value === formData.nationality
                        )}
                      /> */}
                      <Select
                        options={options}
                        placeholder={getTranslation(
                          `Your nationality`, // -----> English
                          `Votre nationalité`, //  -----> French
                          ``, //  -----> Turkish
                          `` //  -----> German
                        )}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderRadius: "0.375rem", // You can adjust the radius as needed
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "30px",
                            fontSize: "14px", // Set the desired font size
                            backgroundColor: "#f5f5f5", // Set the background color
                            borderWidth: "none",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            marginTop: "8px",
                            width: "100%",
                            border: "0.5px solid #E5E5E5",
                          }),
                        }}
                        onChange={handleCountryChange}
                        value={options.find(
                          (option) => option.value === formData.nationality
                        )}
                        // Enable searching by nationalite
                        filterOption={(option, inputValue) => {
                          const nationalite = option.label.props.children; // Assuming nationalite is directly the children of label

                          const nationaliteString =
                            typeof nationalite === "string"
                              ? nationalite.toLowerCase()
                              : nationalite.join("").toLowerCase(); // Join children of JSX element if it's an array

                          return nationaliteString.includes(
                            inputValue.toLowerCase()
                          );
                        }}
                        // Ensure that all options are displayed even when filtered
                        isSearchable
                      />
                      {inputErrors["nationality"] && (
                        <div className="text-red-500 text-xs mt-1">
                          {inputErrors["nationality"]}
                        </div>
                      )}
                    </div>{" "}
                    <div className="flex flex-col  flex-1">
                      <div className="flex gap-4 justify-between px-4 text-lg">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a128d306f388b8fe1ee6ab08de9c65c1f7200283d1682fac379e573167086b34?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="self-start w-5 aspect-square mt-1"
                        />{" "}
                        <div className="grow">
                          {getTranslation(
                            `Country of residence`, // -----> Englais
                            `Pays de résidence`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </div>
                      </div>{" "}
                      <Select
                        options={optionsPays}
                        placeholder={getTranslation(
                          `Country of residence`, // -----> Englais
                          `Pays de résidence`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                        // onChange={(selectedOption) => console.log(selectedOption)}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderRadius: "0.375rem", // You can adjust the radius as needed
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "30px",

                            fontSize: "14px", // Set the desired font size
                            backgroundColor: "#f5f5f5", // Set the background color
                            borderWidth: "none",

                            paddingTop: "8px",
                            paddingBottom: "8px",
                            marginTop: "8px",
                            width: "100%",

                            border: "0.5px solid #E5E5E5",
                          }),
                          menu: (provided, state) => ({
                            ...provided,
                            width: "100%", // Adjust the width as needed
                          }),
                        }}
                        onChange={handleCountryChangePaysResidence}
                        value={optionsPays.find(
                          (option) => option.value === formData.countryresidence
                        )}
                        filterOption={(option, inputValue) => {
                          const paysRS = option.label.props.children; // Assuming nationalite is directly the children of label

                          const paysRSString =
                            typeof paysRS === "string"
                              ? paysRS.toLowerCase()
                              : paysRS.join("").toLowerCase(); // Join children of JSX element if it's an array

                          return paysRSString.includes(
                            inputValue.toLowerCase()
                          );
                        }}
                        // Ensure that all options are displayed even when filtered
                        isSearchable
                      />
                      {inputErrors["countryresidence"] && (
                        <div className="text-red-500 text-xs mt-1">
                          {inputErrors["countryresidence"]}
                        </div>
                      )}
                    </div>
                  </div>{" "}
                </div>{" "}
                {/* ville residence  */}
                <div className="flex gap-2 self-start mr-0 md:mr-2 w-full md:w-[33%] mt-8 text-lg text-zinc-900">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/26bf7a353dc8ba12a2c588e612f061c37dd22cdccf246eec44650d1580269c48?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start w-5 aspect-square mt-1 ml-5"
                  />{" "}
                  <div className="tal1 flex">
                    {getTranslation(
                      `City of residence`, // -----> Englais
                      `Ville de résidence`, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  </div>
                  <div className="tal1 grow">
                    (
                    {getTranslation(
                      `Optional`, // -----> Englais
                      `Facultatif`, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                    )
                  </div>
                </div>{" "}
                <input
                  type="text"
                  name="cityresidence"
                  value={formData.cityresidence}
                  className={` form-control justify-center items-start py-2.5 pr-0 w-full md:pr-2  mt-2 max-w-full text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 md:w-[32%]  ${
                    inputErrors["cityresidence"] ? "is-invalid" : ""
                  }`}
                  placeholder={getTranslation(
                    `City of residence`, // -----> Englais
                    `Ville de résidence`, //  -----> Francais
                    ``, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                  onChange={handleInputChange}
                />
                {inputErrors["cityresidence"] && (
                  <div className="invalid-feedback text-xs">
                    {inputErrors["cityresidence"]}
                  </div>
                )}
                <div className="flex gap-5 justify-between mt-8 mb-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                  <Link to="/">
                    <div className="flex gap-2 justify-between   px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5">
                      <div className="tal1 flex flex-row text-white">
                        <svg
                          width={20}
                          height={21}
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_2249_46735)">
                            <path
                              d="M14.9341 19.3598C14.9338 19.0284 14.8019 18.7107 14.5674 18.4765L8.17408 12.0831C7.98057 11.8897 7.82706 11.66 7.72233 11.4072C7.6176 11.1544 7.56369 10.8834 7.56369 10.6098C7.56369 10.3362 7.6176 10.0652 7.72233 9.81241C7.82706 9.55962 7.98057 9.32993 8.17408 9.13646L14.5591 2.7473C14.7868 2.51154 14.9128 2.19579 14.9099 1.86804C14.9071 1.5403 14.7756 1.22678 14.5439 0.995023C14.3121 0.763263 13.9986 0.631802 13.6708 0.628954C13.3431 0.626105 13.0273 0.752098 12.7916 0.979796L6.40658 7.36396C5.54805 8.22418 5.06588 9.38988 5.06588 10.6052C5.06588 11.8206 5.54805 12.9862 6.40658 13.8465L12.7999 20.2398C12.9745 20.4145 13.1969 20.5335 13.439 20.5819C13.6812 20.6304 13.9323 20.606 14.1606 20.5118C14.3889 20.4177 14.5842 20.258 14.7219 20.053C14.8595 19.848 14.9334 19.6068 14.9341 19.3598Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2249_46735">
                              <rect
                                width={20}
                                height={20}
                                fill="white"
                                transform="matrix(-1 0 0 1 20 0.609375)"
                              />
                            </clipPath>
                          </defs>
                        </svg>

                        {getTranslation(
                          `Previous`, // -----> Englais
                          `Retour`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                      </div>
                    </div>{" "}
                  </Link>
                  <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      className="tal2 grow"
                    >
                      {getTranslation(
                        `Next`, // -----> Englais
                        `Suivant`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </button>{" "}
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2249_46740)">
                        <path
                          d="M5.06543 19.3598C5.06572 19.0284 5.19761 18.7107 5.4321 18.4765L11.8254 12.0831C12.0189 11.8897 12.1725 11.66 12.2772 11.4072C12.3819 11.1544 12.4358 10.8834 12.4358 10.6098C12.4358 10.3362 12.3819 10.0652 12.2772 9.81241C12.1725 9.55962 12.0189 9.32993 11.8254 9.13646L5.44043 2.7473C5.21273 2.51154 5.08674 2.19579 5.08959 1.86804C5.09244 1.5403 5.2239 1.22678 5.45566 0.995023C5.68742 0.763263 6.00093 0.631802 6.32868 0.628954C6.65642 0.626105 6.97218 0.752098 7.20793 0.979796L13.5929 7.36396C14.4515 8.22418 14.9336 9.38988 14.9336 10.6052C14.9336 11.8206 14.4515 12.9862 13.5929 13.8465L7.1996 20.2398C7.02503 20.4145 6.80263 20.5335 6.56047 20.5819C6.31831 20.6304 6.06723 20.606 5.83892 20.5118C5.61061 20.4177 5.41531 20.258 5.27764 20.053C5.13998 19.848 5.06614 19.6068 5.06543 19.3598Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2249_46740">
                          <rect
                            width={20}
                            height={20}
                            fill="white"
                            transform="translate(0 0.609375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center pb-12 pl-2 pr-5 bg-gray-200">
              <div className="tal1 mt-6 text-2xl text-center font-bold text-zinc-900 max-md:max-w-full sm:text-3xl sm:text-center xs:text-2xl">
                {getTranslation(
                  `Choose the Profile Type`, // -----> Englais
                  `Choisissez Le Type de Profil`, //  -----> Francais
                  ``, //  -----> Turkey
                  `` //  -----> Allemagne
                )}
              </div>
              <div className="flex justify-center items-center px-6 mt-3 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full sm:px-2 xs:px-2">
                <div className="flex gap-3 justify-between mr-2 ml-2">
                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />

                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {profilesData.map((data, index) => (
                  <div
                    key={data.role}
                    className={`max-w-full ${
                      index === profilesData.length - 1
                        ? "md:col-span-2  md:flex md:justify-center  "
                        : ""
                    }`}
                  >
                    {" "}
                    <div className="justify-center mt-4 mx-2 sm:mx-0 max-w-full md:mx-6 ">
                      <div className="flex flex-col sm:flex-row gap-4 max-md:flex-col max-md:gap-0 focus hover:scale-[.96]     duration-500 pointer">
                        <div className="flex w-full ">
                          <div 
             
                          className="flex flex-col bg-white max-md:ml-0 w-full rounded-l-3xl duration-300">
                            
                            <img
                              loading="lazy"
                              srcSet={data.logo}
                              style={{
  
                              }}
                              className="grow max-w-full aspect-[1.3] object-cover  rounded-l-3xl duration-300 "
                            />
                          </div>
                          <div className="flex flex-col max-md:ml-0 w-full">
                            <div
                              style={{
                                background:
                                  selectedProfile === data.role
                                    ? "#2E71EB"
                                    : "white",
                                  borderLeft: "3px solid #2E71EB30 "
                              }}
                              className={` ${ selectedProfile === data.role ?  "text-white" : "text-zinc-900"} relative overflow-hidden flex flex-col grow justify-center focus:bg-[#2E71EB]   duration-500  items-center  w-full text-xl md:text-2xl text-center rounded-r-3xl  `}
                              onClick={() => {
                                const selectedProfileValue = data.role;
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
                              {data.role === "player" && (
                                <React.Fragment>
                                  {getTranslation(
                                    `Player`, // -----> Englais
                                    `Joueur`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}

                                </React.Fragment>
                              )}
                              {data.role === "coach" && (
                                <React.Fragment>
                                  {getTranslation(
                                    `Coach`, // -----> Englais
                                    `Entraîneur`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </React.Fragment>
                              )}
                              {data.role === "agent" && (
                                <React.Fragment>
                                  {getTranslation(
                                    `Manager`, // -----> Englais
                                    `Manager`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}{" "}
                                </React.Fragment>
                              )}
                              {data.role === "scout" && (
                                <React.Fragment>
                                  {getTranslation(
                                    `Scout`, // -----> Englais
                                    `Scout`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </React.Fragment>
                              )}
                              {data.role === "other" && (
                                <React.Fragment>
                                  {getTranslation(
                                    `Other`, // -----> Englais
                                    `Autre`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </React.Fragment>
                              )}
                             <img src={checkedMark}
                              style= {{
                                bottom: selectedProfile === data.role ? "15%" : "-25%"

                              }}
                                className="absolute invert  w-5 h-5 md:w-10 md:h-10  opacity-80 delay-200 duration-200"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {profileError && (
                  <div className="text-danger mt-2">
                    {getTranslation(
                      `Please select a profile.`, // -----> Englais
                      `Veuillez choisir un profil s'il vous plait!`, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center content-start items-center self-stretch px-16 mt-8 w-full text-base font-medium whitespace-nowrap gap-y-[768px] max-md:px-5 max-md:max-w-full">
                <div className="flex gap-3 md:gap-5 justify-between w-full max-w-[1192px] max-md:flex-wrap max-md:max-w-full">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                  >
                    <div className="flex flex-row text-white">
                      <svg
                        width={20}
                        height={21}
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2249_46735)">
                          <path
                            d="M14.9341 19.3598C14.9338 19.0284 14.8019 18.7107 14.5674 18.4765L8.17408 12.0831C7.98057 11.8897 7.82706 11.66 7.72233 11.4072C7.6176 11.1544 7.56369 10.8834 7.56369 10.6098C7.56369 10.3362 7.6176 10.0652 7.72233 9.81241C7.82706 9.55962 7.98057 9.32993 8.17408 9.13646L14.5591 2.7473C14.7868 2.51154 14.9128 2.19579 14.9099 1.86804C14.9071 1.5403 14.7756 1.22678 14.5439 0.995023C14.3121 0.763263 13.9986 0.631802 13.6708 0.628954C13.3431 0.626105 13.0273 0.752098 12.7916 0.979796L6.40658 7.36396C5.54805 8.22418 5.06588 9.38988 5.06588 10.6052C5.06588 11.8206 5.54805 12.9862 6.40658 13.8465L12.7999 20.2398C12.9745 20.4145 13.1969 20.5335 13.439 20.5819C13.6812 20.6304 13.9323 20.606 14.1606 20.5118C14.3889 20.4177 14.5842 20.258 14.7219 20.053C14.8595 19.848 14.9334 19.6068 14.9341 19.3598Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2249_46735">
                            <rect
                              width={20}
                              height={20}
                              fill="white"
                              transform="matrix(-1 0 0 1 20 0.609375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>{" "}
                      {getTranslation(
                        `Previous`, // -----> Englais
                        `Retour`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="tal2 flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5"
                  >
                    <div>
                      {getTranslation(
                        `Next`, // -----> Englais
                        `Suivant`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2249_46740)">
                        <path
                          d="M5.06543 19.3598C5.06572 19.0284 5.19761 18.7107 5.4321 18.4765L11.8254 12.0831C12.0189 11.8897 12.1725 11.66 12.2772 11.4072C12.3819 11.1544 12.4358 10.8834 12.4358 10.6098C12.4358 10.3362 12.3819 10.0652 12.2772 9.81241C12.1725 9.55962 12.0189 9.32993 11.8254 9.13646L5.44043 2.7473C5.21273 2.51154 5.08674 2.19579 5.08959 1.86804C5.09244 1.5403 5.2239 1.22678 5.45566 0.995023C5.68742 0.763263 6.00093 0.631802 6.32868 0.628954C6.65642 0.626105 6.97218 0.752098 7.20793 0.979796L13.5929 7.36396C14.4515 8.22418 14.9336 9.38988 14.9336 10.6052C14.9336 11.8206 14.4515 12.9862 13.5929 13.8465L7.1996 20.2398C7.02503 20.4145 6.80263 20.5335 6.56047 20.5819C6.31831 20.6304 6.06723 20.606 5.83892 20.5118C5.61061 20.4177 5.41531 20.258 5.27764 20.053C5.13998 19.848 5.06614 19.6068 5.06543 19.3598Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2249_46740">
                          <rect
                            width={20}
                            height={20}
                            fill="white"
                            transform="translate(0 0.609375)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              {formData.profil === "player" && (
                <div className="flex flex-col items-center pb-12 w-full bg-gray-200">
                  <div className=" text-5xl font-bold text-zinc-900 max-md:max-w-full">
                    <div className="tal1 text-center max-w-xl mx-auto mt-4">
                      <p className=" text-3xl text-zinc-900 ">
                        {getTranslation(
                          `Profile Information`, // -----> Englais
                          ` Informations du Profil`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                      </p>
                    </div>
                    <div className="flex justify-center items-center px-16 mt-2 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-3 justify-between mr-2 ml-2">
                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />

                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />

                </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch px-8 md:px-16 mt-8 w-full max-md:px-2 max-md:max-w-full">
                    <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                      <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-4  justify-between px-4 text-lg">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ec3a1cc3b9a3012e6a2edef9cd4e023c9016540e0fc86b9417135ccff83ce39?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Current Club`, // -----> Englais
                                ` Club Actuel`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>
                          <input
                            type="text"
                            id="champsoptionelle"
                            name="champsoptionelle"
                            value={formData.champsoptionelle}
                            className={`form-control mt-2 flex gap-5 justify-between border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] px-4 py-3.5 rounded-xl ${
                              inputErrors["champsoptionelle"]
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={getTranslation(
                              `Current Club`, // -----> Englais
                              ` Club Actuel`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                            onChange={handleInputChange}
                          />

                          {inputErrors["champsoptionelle"] && (
                            <div className="error-message text-red-600 mt-1">
                              {inputErrors["champsoptionelle"]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-4 justify-between px-4 text-lg">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dde2d3eac90bf18968d914655f675d631cc969fb869e731c4dbe98f730d2e3e3?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-4 aspect-[0.8]"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Height`, // -----> Englais
                                `Taille`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>
                          <div className=" flex flex-col justify-center mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <input
                              type="number" // Use type "number" for height input
                              id="height"
                              name="height"
                              value={formData.height}
                              className={`form-control flex gap-5 bg-zinc-100 justify-between px-4 py-3.5 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-xl ${
                                inputErrors["height"] ? "is-invalid" : ""
                              }`}
                              placeholder={getTranslation(
                                `Your height (cm)`, // -----> Englais
                                `Votre taille (cm)`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                              onChange={handleInputChange}
                            />
                          </div>
                          {inputErrors["height"] && (
                            <div className="error-message text-red-600">
                              {inputErrors["height"]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-4 justify-between px-4 text-lg">
                            <img
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/965d241cd8aba884d3ff4396d1686ccf28be6724052e6a16c2ae5eab335e2540?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Weight (kg)`, // -----> Englais
                                `Poids (kg)`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <input
                              type="number" // Use type "number" for weight input
                              id="weight"
                              name="weight"
                              value={formData.weight}
                              className={`form-control flex gap-5 bg-zinc-100 justify-between px-4 py-3.5 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-xl ${
                                inputErrors["weight"] ? "is-invalid" : ""
                              }`}
                              placeholder={getTranslation(
                                `Your weight (kg)`, // -----> Englais
                                `Votre poids (kg)`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                              onChange={handleInputChange}
                            />
                          </div>
                          {inputErrors["weight"] && (
                            <div className="error-message text-red-600">
                              {inputErrors["weight"]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 md:gap-5 justify-between mt-8 text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-4  justify-between px-4 text-lg whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/879dad4025b82bfa9c58ea4433c8475e1b0e7b7c4d4fbc93c2a536c9671b6622?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-8 aspect-[1.59]"
                            />
                            <div className="grow">
                              {getTranslation(
                                `Strong foot`, // -----> Englais
                                `Pied fort`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>
                          </div>
                          <div className="flex  flex-col justify-center mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <select
                              id="PiedFort"
                              name="PiedFort"
                              value={formData.PiedFort}
                              className={`flex gap-5 bg-zinc-100 justify-between  mr-5 px-4 py-3.5 rounded-xl ${
                                inputErrors["PiedFort"] ? "is-invalid" : ""
                              }`}
                              onChange={handleInputChange}
                            >
                              <option value="" disabled>
                                {getTranslation(
                                  `Strong foot`, // -----> Englais
                                  `Pied fort`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </option>
                              <option value="PiedGauche">
                                {getTranslation(
                                  `Left foot`, // -----> Englais
                                  `Pied Gauche`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}{" "}
                              </option>
                              <option value="PiedDroit">
                                {getTranslation(
                                  `Right foot`, // -----> Englais
                                  `Pied droit`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </option>
                              <option value="DeuxPieds">
                                {getTranslation(
                                  `booth feet`, // -----> Englais
                                  `Les deux pieds`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}{" "}
                              </option>
                            </select>
                          </div>
                          {inputErrors["PiedFort"] && (
                            <div className="error-message text-red-600">
                              {inputErrors["PiedFort"]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 whitespace-nowrap">
                          <div className="flex gap-4 justify-between px-4 text-lg">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/16a18eafd08ffb5ec4c2a087bd33d4431bd6e830c000a50df46dcfb15ae38c65?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Primary Position`, // -----> Englais
                                ` Position Principale`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center  mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <select
                              id="positionPlay"
                              name="positionPlay"
                              value={formData.positionPlay}
                              className={`flex gap-5 bg-zinc-100 mr-5 justify-between px-4 py-3.5 rounded-xl ${
                                inputErrors["positionPlay"] ? "is-invalid" : ""
                              }`}
                              onChange={handleInputChange}
                            >
                              <option value="" disabled>
                                Position Principale
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
                              <option value="Milieu central (CM)">
                                Milieu central (CM)
                              </option>
                              <option value="Milieu offensif (MO)">
                                Milieu offensif (MO)
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
                          </div>
                          {inputErrors["positionPlay"] && (
                            <div className="error-message text-red-600">
                              {inputErrors["positionPlay"]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-4 justify-between px-4 text-lg whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d28253fa6cc8f9ecc5cb75e6cbca192ddf52f545a3fe16fae0bf99d195b10b41?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="grow">Position Secondaire</div>
                          </div>
                          <div className="flex flex-col justify-center px-px  mt-2 w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <select
                              id="positionSecond"
                              name="positionSecond"
                              value={formData.positionSecond}
                              className={`flex gap-5 bg-zinc-100 mr-5 justify-between px-4 py-3.5 rounded-xl ${
                                inputErrors["positionSecond"]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={handleInputChange}
                            >
                              <option value="" disabled>
                                Position Secondaire
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
                          </div>
                        </div>
                      </div>

                      {/* license */}
                      <div className="flex justify-between mt-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col  w-full md:w-[32%] text-zinc-900">
                          <div className="flex w-full gap-4 justify-between px-4 text-lg">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec3bc7c1a4fe3e2b05035509aa7b6b7bdc539b4798d878532d353d835b6ec863?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="grow">
                              {getTranslation(
                                `Do you have a license?`, // -----> Englais
                                `Avez-vous une licence ?`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>

                          <div className="bg-zinc-100 rounded-[30px] h-12 md:pr-4 pr-5   mt-2  border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] ">
                          <select
                            className=" px-2  flex flex-col  bg-transparent  justify-center px-4 py-3.5  text-base border-solid  w-full rounded-[30px]"
                            onChange={(e) => handleSelection(e.target.value)}
                          >
                            <option className=" w-full" value="Non">
                              {getTranslation(
                                `No`, // -----> Englais
                                `Non`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Oui">
                              {getTranslation(
                                `Yes`, // -----> Englais
                                `Oui`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </option>
                          </select>
                          </div>

                          {inputErrors["Licence"] && (
                            <div className="error-message text-red-600">
                              {inputErrors["Licence"]}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col max-md:mt-3 w-full md:w-[32%] ">
                          <div className="flex gap-4 justify-between px-4 text-lg w-full text-zinc-900">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1094978de2a7b90ea910c9743ca3b54f27d963af3ebd2f54f91c3bc96843c0b2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `License`, // -----> Englais
                                `Licence`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>
                          {isUploadEnabled && (
                            <div
                              className={`flex gap-4 mt-2  w-full h-12 justify-center items-center w-full  px-8 py-2 text-base font-medium text-blue-500 whitespace-nowrap border-1 border-blue-600 rounded-[30px] max-md:px-5 `}
                            >
                              <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_1342_45742)">
                                  <path
                                    d="M12.167 5.84589V0.395052C12.9278 0.683385 13.6278 1.12755 14.2212 1.72005L17.1245 4.62505C17.7178 5.21755 18.162 5.91755 18.4503 6.67839H13.0003C12.5403 6.67839 12.167 6.30505 12.167 5.84589ZM18.8137 8.34589H13.0003C11.622 8.34589 10.5003 7.22422 10.5003 5.84589V0.0317188C10.3662 0.0225521 10.232 0.0117188 10.0962 0.0117188H6.33366C4.03616 0.0125521 2.16699 1.88172 2.16699 4.17922V15.8459C2.16699 18.1434 4.03616 20.0126 6.33366 20.0126H14.667C16.9645 20.0126 18.8337 18.1434 18.8337 15.8459V8.75005C18.8337 8.61422 18.8228 8.48005 18.8137 8.34589ZM13.5895 14.0792C13.427 14.2417 13.2137 14.3234 13.0003 14.3234C12.787 14.3234 12.5737 14.2417 12.4112 14.0792L11.3337 13.0017V16.6667C11.3337 17.1267 10.9603 17.5001 10.5003 17.5001C10.0403 17.5001 9.66699 17.1267 9.66699 16.6667V13.0017L8.58949 14.0792C8.26366 14.4051 7.73699 14.4051 7.41116 14.0792C7.08533 13.7534 7.08533 13.2267 7.41116 12.9009L8.75616 11.5559C9.71783 10.5942 11.2828 10.5942 12.2453 11.5559L13.5903 12.9009C13.9162 13.2267 13.9162 13.7534 13.5903 14.0792H13.5895Z"
                                    fill="#2E71EB"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1342_45742">
                                    <rect
                                      width="20"
                                      height="20"
                                      fill="white"
                                      transform="translate(0.5)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <label className="relative block max-w-full overflow-hidden">
                                <input
                                  type="file"
                                  name="file"
                                  accept="*"
                                  onChange={handleFileChangeLicense}
                                  className="absolute inset-0 opacity-0 md:w-full h-full cursor-pointer"
                                />
                                <span className="block overflow-hidden whitespace-nowrap  max-w-full">
                                  {File ? File.name : "Importer une Licence"}
                                </span>
                              </label>
                            </div>
                          )}
                          {!isUploadEnabled && (
                            <div>
                              <div
                                className="flex w-full h-12 mt-2  gap-4 justify-center items-center w-full"
                              >
                                <div
                                  style={{
                                    backgroundColor: "#B3B3B3",
                                    fontFamily: "Sora",
                                  }}
                                  className={`font-sans w-full h-12  w-full flex justify-center gap-2 bg-zinc-100 items-center px-4 py-3.5 rounded-xl `}
                                >
                                  <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_1342_20565)">
                                      <path
                                        d="M12.167 5.84589V0.395052C12.9278 0.683385 13.6278 1.12755 14.2212 1.72005L17.1245 4.62505C17.7178 5.21755 18.162 5.91755 18.4503 6.67839H13.0003C12.5403 6.67839 12.167 6.30505 12.167 5.84589ZM18.8137 8.34589H13.0003C11.622 8.34589 10.5003 7.22422 10.5003 5.84589V0.0317188C10.3662 0.0225521 10.232 0.0117188 10.0962 0.0117188H6.33366C4.03616 0.0125521 2.16699 1.88172 2.16699 4.17922V15.8459C2.16699 18.1434 4.03616 20.0126 6.33366 20.0126H14.667C16.9645 20.0126 18.8337 18.1434 18.8337 15.8459V8.75005C18.8337 8.61422 18.8228 8.48005 18.8137 8.34589ZM13.5895 14.0792C13.427 14.2417 13.2137 14.3234 13.0003 14.3234C12.787 14.3234 12.5737 14.2417 12.4112 14.0792L11.3337 13.0017V16.6667C11.3337 17.1267 10.9603 17.5001 10.5003 17.5001C10.0403 17.5001 9.66699 17.1267 9.66699 16.6667V13.0017L8.58949 14.0792C8.26366 14.4051 7.73699 14.4051 7.41116 14.0792C7.08533 13.7534 7.08533 13.2267 7.41116 12.9009L8.75616 11.5559C9.71783 10.5942 11.2828 10.5942 12.2453 11.5559L13.5903 12.9009C13.9162 13.2267 13.9162 13.7534 13.5903 14.0792H13.5895Z"
                                        fill="#5A5A5A"
                                      ></path>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_1342_20565">
                                        <rect
                                          width="20"
                                          height="20"
                                          fill="white"
                                          transform="translate(0.5)"
                                        ></rect>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <label>
                                    <input
                                      type="file"
                                      name="file"
                                      disabled
                                      onChange={handleFileChangeLicense}
                                      className={`grow my-auto w-2 inset-0 opacity-0`}
                                    />
                                    {"Importer une Licence"}
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="w-full max-w-sm mx-auto"></div>
                        </div>
                      </div>

                      <div className="flex gap-4 self-start px-4 mt-8 text-lg text-black whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d9e1688ed79638d921ae945bc404a38397f807147a71c1acde94d77aab89cd2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="self-start w-5 aspect-square"
                        />
                        <div className="flex-auto">
                          {getTranslation(
                            `Skills`, // -----> Englais
                            `Compétences`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}{" "}
                        </div>
                      </div>

                      <div className="form-group rounded-full  icon-input mb-3">
                        {[
                          getTranslation(`speed`, `Rapidité`),
                          // "Rapidite",
                          getTranslation(`Tackle`, `Tacle`),
                          getTranslation(`Defense`, `Défence`),

                          getTranslation(`Tirs de loin`, `Long Shots`),
                          getTranslation(`One-touch play`, `Tirs de loin`),

                          getTranslation(
                            `Quick Decision Making`,
                            `Rapidite de la prise de désicion`
                          ),

                          getTranslation(`Powerful Strike`, `Frappe puissante`),

                          getTranslation(`Agility`, `Agilité`),
                          getTranslation(
                            `Ball Control`,
                            `Controller du Ballon`
                          ),

                          getTranslation(`Dribbling`, `Dribble`),

                          getTranslation(
                            `Space Exploitation`,
                            `Exploitation de l'espace`
                          ),

                          getTranslation(
                            `Risk Assessment on the Field`,
                            `Evaluation des risques sur le terrain`
                          ),
                          "Endurance",
                          getTranslation(
                            `Balance and Coordination`,
                            `Equilibre et Coordination`
                          ),
                          getTranslation(`Self-Motivation`, `Auto-Motivation`),
                          // Add other skills...
                        ].map((skillsInProfile) => (
                          <div
                            key={skillsInProfile}
                            className="form-check form-check-inline text-2xl me-2 mb-2"
                          >
                            <input
                              type="checkbox"
                              id={skillsInProfile}
                              name="skillsInProfile"
                              checked={selectedSkills.includes(skillsInProfile)}
                              onChange={() =>
                                handleSkillToggle(skillsInProfile)
                              }
                              className="form-check-input text-2xl d-none rounded-full"
                            />

                            <label
                              htmlFor={skillsInProfile}
                              className={`form-check-label btn ${
                                formData.skillsInProfile
                                  .split(",")
                                  .includes(skillsInProfile)
                                  ? "bg-blue-600 py-2.5 rounded-full text-white "
                                  : "bg-white  py-2.5 rounded-full"
                              } 
                                   ${
                                     !formData.skillsInProfile
                                       .split(",")
                                       .includes(skillsInProfile) && skillsError
                                       ? "border-danger"
                                       : ""
                                   }`}
                            >
                              {selectedSkills.includes(skillsInProfile)
                                ? "-"
                                : "+"}{" "}
                              {skillsInProfile}
                            </label>
                          </div>
                        ))}
                      </div>
                      {skillsError && (
                        <div className="text-danger mt-2">
                          {getTranslation(
                            `You can select up to 10 skills!`, // -----> Englais
                            `Vous pouvez selectionner au maximum 10 compétences !`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </div>
                      )}
                      {inputErrors["skillsInProfile"] && (
                        <div className="error-message text-red-600">
                          {inputErrors["skillsInProfile"]}
                        </div>
                      )}

                      <div className="flex flex-col gap-2 md:gap-5 mt-2 text-lg max-md:flex-wrap max-md:max-w-full">
                        <div className="flex gap-1 justify-between whitespace-nowrap text-zinc-900">
                          <div className="flex md:flex-row gap-2 flex-row">
                            <div className="flex md:flex-col gap-2 flex-row ">
                              <label className="">
                                <input
                                  type="checkbox"
                                  checked={formData.termesConditions === "Oui"}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      termesConditions: e.target.checked
                                        ? "Oui"
                                        : "Non",
                                    })
                                  }
                                />
                              </label>
                            </div>
                            <div
                              className="flex flex-row  gap-2 md:gap-3  flex-wrap underline mb-2 sm:mb-0 sm:order-1"
                                                     >
                              J'accepte les{" "}
                              <span  onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                Termes & Conditions
                              </span>
                               {" "}
                              et
                              {" "}

                              <span  onClick={() => {
                                setWichContent(2)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                politique de confidentialité
                              </span>
                            </div>
                          </div>
                        </div>
                        {errorMessage && (
                          <div className="error-message align-center text-red-600">
                            {errorMessage}
                          </div>
                        )}

                        <div className="mt-2 gap-2    flex flex-row items-center">
                          {/* <div className="flex flex-row itmes-center ">
                            <label>
                              <input
                                type="checkbox"
                                checked={formData.partagehorsPL === "Oui"}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    partagehorsPL: e.target.checked
                                      ? "Oui"
                                      : "Non",
                                  })
                                }
                              />
                            </label>
                          </div> */}

                          {/* <div className="md:w-auto w-[90%]">
                            <label className="tal1 underline cursor-pointer block mb-2 " 
                             onClick={() => {
                              setWichContent(2)
                              setShowModal(true)
                            }}>
                              {getTranslation(
                                `J'accept privacy & policy.`, // -----> Englais
                                `J'accept privacy & policy. `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </label>
                          </div> */}
                        </div>
                      </div>

                      {(emailError || loginError) && (
                        <div className="inline-block text-center text-white bg-orange-500 border-0.5 p-2 rounded">
                          {emailError && <p>{emailError}</p>}
                          {loginError && <p>{loginError}</p>}
                        </div>
                      )}

                      <div className="flex gap-2 md:gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9772a7a53b18b6a8d736b49ecb35ea60754bc1c1cb822d5108c85c04ca43d092?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 aspect-square"
                          />
                          <div className="grow text-white">
                            {" "}
                            &nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        </button>
                        <div className="tal2 flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                          <button type="submit" className="flex flex-row">
                            {" "}
                            <span className="px-2">
                              {getTranslation(
                                `Submit`, // -----> Englais
                                `Confirmer`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </span>{" "}
                            <svg
                              width={21}
                              height={16}
                              viewBox="0 0 21 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.92986 15.1094C6.34004 15.1096 5.77436 14.8752 5.35764 14.4578L0.6043 9.70618C0.0928374 9.19455 0.0928374 8.36521 0.6043 7.85358C1.11593 7.34212 1.94527 7.34212 2.4569 7.85358L6.92986 12.3265L18.7634 0.492972C19.2751 -0.0184907 20.1044 -0.0184907 20.616 0.492972C21.1275 1.0046 21.1275 1.83394 20.616 2.34557L8.50208 14.4578C8.08536 14.8752 7.51969 15.1096 6.92986 15.1094Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formData.profil === "coach" && (
                <div className="flex flex-col items-center  bg-gray-200">
                  <div className=" text-5xl font-bold text-zinc-900 max-md:max-w-full">
                    <div className="tal1 text-center max-w-xl mx-auto mt-4">
                      <p className=" text-3xl text-zinc-900 ">
                        {getTranslation(
                          `Profile Information`, // -----> Englais
                          ` Informations du Profil`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                      </p>
                    </div>
                    <div className="flex justify-center items-center px-16 mt-2 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-3 justify-between mr-2 ml-2">
                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />

                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />

                </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch px-16 mt-8 w-full max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                      <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-1 whitespace-nowrap text-zinc-900">
                          <div className="flex gap-2  justify-center items-center text-lg">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6759924d092dd539c2a5e31a573201abbd73cb3b21abd2a1c36c03266185a25?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className=" w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Current Club`, // -----> Englais
                                ` Club Actuel`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>
                          <input
                            type="text"
                            id="ClubActuelCoach"
                            name="ClubActuelCoach"
                            value={formData.ClubActuelCoach}
                            onChange={handleInputChange}
                            className={`form-control flex gap-5 bg-zinc-100 justify-between px-4 py-3.5 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-xl ${
                              inputErrors["ClubActuelCoach"] ? "is-invalid" : ""
                            }`}
                            placeholder={getTranslation(
                              `Current Club`, // -----> Englais
                              ` Club Actuel`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          />

                          {inputErrors["ClubActuelCoach"] && (
                            <div className="error-message text-red-600 mt-1">
                              {inputErrors["ClubActuelCoach"]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-2 justify-between text-lg whitespace-nowrap text-zinc-900">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/266bb942964e742c53f6ca48c049053cbf3cb990338dd01906f5558f218c1b7b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Number of teams coached`, // -----> Englais
                                ` Nombre de clubs entraînées `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>
                          </div>
                          <input
                            type="number"
                            id="totalTeam"
                            name="totalTeam"
                            value={formData.totalTeam}
                            className={`form-control flex gap-5 bg-zinc-100 justify-between px-4 py-3.5 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-xl ${
                              inputErrors["totalTeam"] ? "is-invalid" : ""
                            }`}
                            placeholder="Total Equipes"
                            onChange={handleInputChange}
                            min="0"
                          />

                          {inputErrors["totalTeam"] && (
                            <div className="error-message text-red-600 mt-1">
                              {inputErrors["totalTeam"]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 whitespace-nowrap text-zinc-900">
                          <div className="flex gap-2 justify-between text-lg">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ef90a0f4cfe5f2905efbdeddd8db64c65b72d6df992e427f3335ecc4b800002?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow">
                              {getTranslation(
                                `Preferred tactic`, // -----> Englais
                                `Tactique préférée`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </div>
                          </div>
                          <span className="relative ">

                          <select
                            name="footballTactic"
                            value={formData.footballTactic}
                            className={`form-control flex gap-5 justify-between  px-4 pb-2 pt-0 border-[0.5px]  mb-2 rounded-xl bg-zinc-100 ${
                              inputErrors["footballTactic"] ? "is-invalid" : ""
                            }`}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              {getTranslation(
                                `Preferred tactic`, // -----> Englais
                                `Tactique préférée`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="4-4-2">4-4-2</option>
                            <option value="4-3-3">4-3-3</option>
                            <option value="4-2-3-1">4-2-3-1</option>
                            <option value="5-3-2">5-3-2</option>
                            <option value="5-4-1">5-4-1</option>
                            <option value="catenaccio">3-4-3</option>
                          </select>

                          <span className="absolute right-[12px] bottom-[13%] h-[80%] w-10   flex items-center justify-center">
      <span style={{
        borderLeft: "2px solid #ddd"
      }} className="pl-2 h-5 ">
      <img src={require("../assets/down.png")} 
        className="w-5  invert-[.7]"
      />
      </span>

</span>
</span>
                          {inputErrors["footballTactic"] && (
                            <div className="error-message text-red-600 -mt-1">
                              {inputErrors["footballTactic"]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 self-start  mt-8 text-lg text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ece96b5f61d0b17c400b934b07ea1b22e3a96c08930599d41b7fac9d66b1b647?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="self-start w-5 aspect-square"
                        />
                        <div className="tal1 grow max-md:max-w-full">
                          {getTranslation(
                            `Training country`, // -----> Englais
                            `Pays d’entraînement`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}{" "}
                        </div>
                      </div>
                      <div className="flex flex-col bg-white rounded-[30px] justify-center px-px mt-2 max-w-full text-base text-white whitespace-nowrap rounded-[30px] w-full md:w-[30.5%]">
                        {/* <div className="flex gap-4 justify-between px-4 py-1.5 rounded-md max-md:flex-wrap max-md:max-w-full"> */}

                        <Select
                          options={optionsPays}
                          placeholder={getTranslation(
                            `Training countries`, // -----> Englais
                            `Les pays d’entraînement`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                          isMulti // Enable multiple selection
                          components={{ MultiValueContainer }}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              borderRadius: "0.375rem",
                              display: "flex",
                              justifyContent: "center",
                              borderRadius: "30px",
                              width: "97%",
                              color: "black", // Set text color to black
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              border: "none",

                              backgroundColor: "transparent",
                            }),
                            menu: (provided, state) => ({
                              ...provided,
                              width: "100%",
                              color: "black",
                            }),
                          }}
                          onChange={handleCountryPaysEntrainement}
                          value={selectedCountries} // Set the value from component state
                        />
                      </div>{" "}
                      {inputErrors["countryCoachedIn"] && (
                        <div className="error-message text-red-600 mt-1">
                          {inputErrors["countryCoachedIn"]}
                        </div>
                      )}
                      <div className="flex gap-2  self-start  mt-8 text-lg text-black whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b1aceaa458ae0813ba851a1899314ccc41fda7b9f83817505dcc26c5116673c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className=" w-5 aspect-square"
                        />
                        <div className="flex-auto">
                          {getTranslation(
                            `Skills`, // -----> Englais
                            `Compétences`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}{" "}
                        </div>
                      </div>
                      <div className="form-group icon-input  mb-3">
                        {[
                          getTranslation(
                            `Knowledge of tactics`,
                            `Connaissance des tactiques`
                          ),

                          getTranslation(
                            `technical skills`,
                            `Compétences techniques`
                          ),
                          "Leadership",
                          "Communication",

                          getTranslation(
                            `Group management`,
                            `Gestion de groupe`
                          ),

                          getTranslation(`Analysis`, `Analyse`),

                          getTranslation(`Scheduling`, `Planification`),

                          getTranslation(`Adaptability`, `Adaptabilité`),

                          getTranslation(`Ethics`, `Ethique`),

                          getTranslation(
                            `Knowledge of the rules of the game`,
                            `Connaissance des règles du jeu`
                          ),

                          getTranslation(
                            `Stress management`,
                            `Gestion de stress`
                          ),

                          getTranslation(
                            `Individual development`,
                            `Développement individuel`
                          ),
                          getTranslation(`Empathy`, `Empathie`),
                          // Add other skills...
                        ].map((coachSkill) => (
                          <div
                            key={coachSkill}
                            className="form-check  rounded-[30px] form-check-inline me-2 mb-2"
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
                              className="form-check-input d-none rounded-[30px]"
                            />

                            <label
                              htmlFor={coachSkill}
                              className={`form-check-label btn ${
                                formData.skills.split(",").includes(coachSkill)
                                  ? "bg-blue-600 py-2.5 rounded-full text-white"
                                  : "bg-white py-2.5 rounded-full"
                              } 
                                   ${
                                     !formData.skills
                                       .split(",")
                                       .includes(coachSkill) && skillsError
                                       ? "border-danger"
                                       : ""
                                   }`}
                            >
                              {!formData.skills.split(",").includes(coachSkill)
                                ? "+" // Display "+" when not selected
                                : "-"}{" "}
                              {coachSkill}
                            </label>
                          </div>
                        ))}

                        {skillsError && (
                          <div className="tal1 text-danger mt-2">
                            {getTranslation(
                              `You can select up to 10 skills!`, // -----> Englais
                              `Vous pouvez selectionner au maximum 10 compétences !`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        )}
                        {inputErrors["skills"] && (
                          <div className="error-message text-red-600">
                            {inputErrors["skills"]}
                          </div>
                        )}
                      </div>
                      {/*                      
                       {inputErrors['coachSkill'] && (
            <div className="error-message text-red-600">{inputErrors['coachSkill']}</div>
          )} 
          
          */}
                      <div className="flex flex-col gap-2 md:gap-5 mt-2 text-lg max-md:flex-wrap max-md:max-w-full">
                        <div className="flex gap-1 justify-between whitespace-nowrap text-zinc-900">
                          <div className="flex md:flex-row gap-2 flex-row">
                            <div className="flex md:flex-col gap-2 flex-row ">
                              <label className="">
                                <input
                                  type="checkbox"
                                  checked={formData.termesConditions === "Oui"}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      termesConditions: e.target.checked
                                        ? "Oui"
                                        : "Non",
                                    })
                                  }
                                />
                              </label>
                            </div>
                            <div
                              className="flex flex-row gap-2  md:gap-3 flex-wrap  underline mb-2 sm:mb-0 sm:order-1"
                              onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}                            >
                              J'accepte les{" "}
                              <span  onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                Termes & Conditions
                              </span>
                              {" "}

                              et
                              {" "}

                              <span  onClick={() => {
                                setWichContent(2)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                politique de confidentialité
                              </span>
                            </div>
                          </div>
                        </div>
                        {errorMessage && (
                          <div className="error-message align-center text-red-600">
                            {errorMessage}
                          </div>
                        )}

                        <div className="mt-2 gap-2    flex flex-row items-center">
                          {/* <div className="flex flex-row itmes-center">
                            <label>
                              <input
                                type="checkbox"
                                checked={formData.partagehorsPL === "Oui"}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    partagehorsPL: e.target.checked
                                      ? "Oui"
                                      : "Non",
                                  })
                                }
                              />
                            </label>
                          </div>

                          <div className="md:w-auto w-[90%]">
                          <label className="tal1 underline cursor-pointer block mb-2 " 
                             onClick={() => {
                              setWichContent(2)
                              setShowModal(true)
                            }}>
                              {getTranslation(
                                `J'accept privacy & policy.`, // -----> Englais
                                `J'accept privacy & policy. `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </label>
                          </div> */}
                        </div>
                      </div>
                      {(emailError || loginError) && (
                        <div className="inline-block text-center text-white bg-orange-500 border-0.5 p-2 rounded">
                          {emailError && <p>{emailError}</p>}
                          {loginError && <p>{loginError}</p>}
                        </div>
                      )}
                      <div class="flex mb-3 md:gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9772a7a53b18b6a8d736b49ecb35ea60754bc1c1cb822d5108c85c04ca43d092?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 aspect-square"
                          />
                          <div className="grow text-white">
                            {" "}
                            &nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        </button>
                        <div className="tal2 flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                          <button type="submit" className="flex flex-row">
                            {" "}
                            <span className="px-2">
                              {getTranslation(
                                `Submit`, // -----> Englais
                                `Confirmer`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </span>{" "}
                            <svg
                              width={21}
                              height={16}
                              viewBox="0 0 21 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.92986 15.1094C6.34004 15.1096 5.77436 14.8752 5.35764 14.4578L0.6043 9.70618C0.0928374 9.19455 0.0928374 8.36521 0.6043 7.85358C1.11593 7.34212 1.94527 7.34212 2.4569 7.85358L6.92986 12.3265L18.7634 0.492972C19.2751 -0.0184907 20.1044 -0.0184907 20.616 0.492972C21.1275 1.0046 21.1275 1.83394 20.616 2.34557L8.50208 14.4578C8.08536 14.8752 7.51969 15.1096 6.92986 15.1094Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formData.profil === "agent" && (
                <div className="flex flex-col items-center pb-12 h-full bg-gray-200">
                  <div className="mt-6 text-5xl font-bold text-zinc-900 max-md:max-w-full">
                    <div className="tal1 text-center max-w-xl mx-auto mt-0">
                      <p className="text-3xl text-zinc-900 ">
                        {getTranslation(
                          `Profile Information`, // -----> Englais
                          ` Informations du Profil`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                      </p>
                    </div>
                    <div className="flex justify-center items-center px-16  mt-2 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-3 justify-between mr-2 ml-2">
                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />

                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />

                </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch px-16 mt-8 w-full max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                      <div className="flex gap-5 justify-between  max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-1 text-zinc-900">
                          <div className="flex gap-4   justify-between px-4 text-lg whitespace-nowrap">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c24f47cfa257b3f53d051885328d947d57043bd4fe7c525389b014b09dd5e753?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-start w-5 aspect-square"
                            />
                            <div className="tal1 grow">
                              {getTranslation(
                                `Type of responsibility `, // -----> Englais
                                `Type de responsabilité `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col justify-center  mt-2 mb-6 md:w-[49%] w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                            <div className="flex gap-5 justify-between px-4 py-3.5 rounded-md">
                              <select
                                id="typeresponsable"
                                name="typeresponsable"
                                className={`w-full bg-zinc-100 w-[270px]${
                                  inputErrors["typeresponsable"]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={handleInputChange}
                                value={formData.typeresponsable}
                                required
                              >
                                <option value="">
                                  {getTranslation(
                                    `Your type of responsibility `, // -----> Englais
                                    `Votre Type De Responsabilité `, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </option>
                                <option value="club">
                                  {getTranslation(
                                    `Club Manager `, // -----> Englais
                                    `Manager d'équipe `, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </option>
                                <option value="players">
                                  {getTranslation(
                                    `Player Manager `, // -----> Englais
                                    `Manager de Joueur `, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </option>
                              </select>
                              {inputErrors["typeresponsable"] && (
                                <div className="invalid-feedback text-xs">
                                  {inputErrors["typeresponsable"]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {formData.typeresponsable && (
                        <div>
                          {formData.typeresponsable === "club" && (
                            <>
                              <div className="flex flex-wrap gap-4">
                                {/* First Block */}
                                <div className="flex flex-col flex-1  whitespace-nowrap">
                                  <div className="flex gap-4 justify-between px-4 text-lg">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/528f3940d205594823841dbde668c399246e5dc37eb606f331e300f6be94c70e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                      className="self-start w-5 aspect-square"
                                    />
                                    <div className="tal1 grow">
                                      {getTranslation(
                                        `Current Club`, // -----> Englais
                                        ` Club Actuel`, //  -----> Francais
                                        ``, //  -----> Turkey
                                        `` //  -----> Allemagne
                                      )}
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    id="clubCovered"
                                    name="clubCovered"
                                    className={`form-control justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5${
                                      inputErrors["clubCovered"]
                                        ? " is-invalid"
                                        : ""
                                    }`}
                                    onChange={handleInputChange}
                                    value={formData.clubCovered}
                                    placeholder={getTranslation(
                                      `Current Club`, // -----> Englais
                                      ` Club Actuel`, //  -----> Francais
                                      ``, //  -----> Turkey
                                      `` //  -----> Allemagne
                                    )}
                                  />

                                  {inputErrors["clubCovered"] && (
                                    <div className="error-message text-red-600">
                                      {inputErrors["clubCovered"]}
                                    </div>
                                  )}
                                </div>

                                {/* Second Block */}
                                <div className="flex flex-col flex-1 whitespace-nowrap">
                                  <div className="flex gap-4 justify-between px-4 text-lg">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d35929db3da0f679cb37c2aa46e37529472e2286df1cbb9c382a5ca5cd3dee8b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                      className="self-start w-5 aspect-square"
                                    />
                                    <div className="tal1 grow">
                                      {getTranslation(
                                        `Club's country`, // -----> Englais
                                        `Pays du Club`, //  -----> Francais
                                        ``, //  -----> Turkey
                                        `` //  -----> Allemagne
                                      )}
                                    </div>
                                  </div>
                                  <Select
                                    options={optionsPays}
                                    placeholder={getTranslation(
                                      `Club's country`, // -----> Englais
                                      `Pays du Club`, //  -----> Francais
                                      ``, //  -----> Turkey
                                      `` //  -----> Allemagne
                                    )}
                                    styles={{
                                      control: (provided, state) => ({
                                        ...provided,
                                        borderRadius: "0.375rem", // You can adjust the radius as needed
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: "30px",

                                        // width: "230px",
                                        fontSize: "1rem", // Set the desired font size
                                        backgroundColor: "#f5f5f5", // Set the background color
                                        borderWidth: "none",

                                        paddingTop: "8px",
                                        paddingBottom: "8px",
                                        marginTop: "8px",
                                        width: "100%",

                                        border: "0.5px solid #E5E5E5",
                                      }),
                                      menu: (provided, state) => ({
                                        ...provided,
                                        width: "100%",
                                      }),
                                    }}
                                    onChange={handleCountryChangePaysAgentclub}
                                    value={optionsPays.find(
                                      (option) =>
                                        option.value === formData.paysclub
                                    )}
                                    filterOption={(option, inputValue) => {
                                      const paysRS =
                                        option.label.props.children; // Assuming nationalite is directly the children of label

                                      const paysRSString =
                                        typeof paysRS === "string"
                                          ? paysRS.toLowerCase()
                                          : paysRS.join("").toLowerCase(); // Join children of JSX element if it's an array

                                      return paysRSString.includes(
                                        inputValue.toLowerCase()
                                      );
                                    }}
                                    // Ensure that all options are displayed even when filtered
                                    isSearchable
                                  />

                                  {inputErrors["paysclub"] && (
                                    <div className="error-message text-red-600">
                                      {inputErrors["paysclub"]}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-4 self-start px-4 mt-8 mb-2 text-lg text-black whitespace-nowrap">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b1aceaa458ae0813ba851a1899314ccc41fda7b9f83817505dcc26c5116673c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="self-start w-5 aspect-square"
                                />
                                <div className="tal1 flex-auto">
                                  {getTranslation(
                                    `Skills`, // -----> Englais
                                    `Compétences`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </div>
                              </div>

                              <div className="form-group icon-input  mb-3">
                                {[
                                  "Leadership",

                                  getTranslation(
                                    `Financial Management`,
                                    `Gestion financière`
                                  ),
                                  getTranslation(`Negotiation`, `Négociation`),
                                  getTranslation(
                                    `Human Resources Management`,
                                    `Gestion des ressources humaines`
                                  ),
                                  "Communication",

                                  getTranslation(
                                    `Football Market Knowledge`,
                                    `Connaissance du marché du football`
                                  ),
                                  getTranslation(
                                    `Marketing Strategy`,
                                    `Stratégie marketing`
                                  ),
                                  getTranslation(
                                    `Strategic Planning`,
                                    `Planification stratégique`
                                  ),
                                  getTranslation(
                                    `Facilities Management`,
                                    `Gestion des installations`
                                  ),
                                  getTranslation(
                                    `Legal and Compliance`,
                                    `Juridique et conformité`
                                  ),
                                  getTranslation(
                                    `Analyse des performances`,
                                    `Performance Analysis`
                                  ),

                                  getTranslation(`Empathy`, `Empathie`),
                                  getTranslation(
                                    `Crisis Management`,
                                    `Gestion de crise`
                                  ),
                                  // Add other skills...
                                ].map((agentSkill) => (
                                  <div
                                    key={agentSkill}
                                    className="form-check  rounded-[30px] form-check-inline me-2 mb-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={agentSkill}
                                      name="coachSkillsInProfile"
                                      checked={formData.skillsagent
                                        .split(",")
                                        .includes(agentSkill)}
                                      onChange={() =>
                                        handleagentSkillToggle(agentSkill)
                                      }
                                      className="form-check-input d-none rounded-[30px]"
                                    />
                                    <label
                                      htmlFor={agentSkill}
                                      className={`form-check-label btn ${
                                        formData.skillsagent
                                          .split(",")
                                          .includes(agentSkill)
                                          ? "bg-blue-600 py-2.5 rounded-full text-white"
                                          : "bg-white py-2.5 rounded-full"
                                      } 
                                          ${
                                            !formData.skillsagent
                                              .split(",")
                                              .includes(agentSkill) &&
                                            agentSkillsError
                                              ? "border-danger"
                                              : ""
                                          }`}
                                    >
                                      {!formData.skillsagent
                                        .split(",")
                                        .includes(agentSkill)
                                        ? "+" // Display "+" when not selected
                                        : "-"}{" "}
                                      {agentSkill}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {agentSkillsError && (
                                <div className="text-danger mt-2">
                                  {getTranslation(
                                    `You can select up to 10 skills!`, // -----> Englais
                                    `Vous pouvez selectionner au maximum 10 compétences !`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </div>
                              )}
                              {inputErrors["skillsagent"] && (
                                <div className="error-message text-red-600">
                                  {inputErrors["skillsagent"]}
                                </div>
                              )}

                              <div className="flex flex-col gap-2 md:gap-5 mt-2 text-lg max-md:flex-wrap max-md:max-w-full">
                                <div className="flex gap-1 justify-between whitespace-nowrap text-zinc-900">
                                  <div className="flex md:flex-row gap-2 flex-row">
                                    <div className="flex md:flex-col gap-2 flex-row ">
                                      <label className="">
                                        <input
                                          type="checkbox"
                                          checked={
                                            formData.termesConditions === "Oui"
                                          }
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              termesConditions: e.target.checked
                                                ? "Oui"
                                                : "Non",
                                            })
                                          }
                                        />
                                      </label>
                                    </div>
                                    <div
                                      className="flex flex-row gap-2  md:gap-3 flex-wrap underline mb-2 sm:mb-0 sm:order-1"
                                      onClick={() => {
                                        setWichContent(1)
                                        setShowModal(true)
                                      }}                                      >
                                      J'accepte les{" "}
                                      <span  onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                Termes & Conditions
                              </span>
                              {" "}

                              et
                              {" "}

                              <span  onClick={() => {
                                setWichContent(2)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                politique de confidentialité
                              </span>
                                    </div>
                                  </div>
                                </div>
                                {errorMessage && (
                                  <div className="error-message align-center text-red-600">
                                    {errorMessage}
                                  </div>
                                )}

                                {/* <div className="mt-2 gap-2    flex flex-row items-center">
                                  <div className="flex flex-row itmes-center">
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={
                                          formData.partagehorsPL === "Oui"
                                        }
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            partagehorsPL: e.target.checked
                                              ? "Oui"
                                              : "Non",
                                          })
                                        }
                                      />
                                    </label>
                                  </div>

                                  <div className="md:w-auto w-[90%]">
                                  <label className="tal1 underline cursor-pointer block mb-2 " 
                             onClick={() => {
                              setWichContent(2)
                              setShowModal(true)
                            }}>
                              {getTranslation(
                                `J'accept privacy & policy.`, // -----> Englais
                                `J'accept privacy & policy. `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </label>
                                  </div>
                                </div> */}
                              </div>

                              {(emailError || loginError) && (
                                <div className="inline-block text-center text-white bg-orange-500 border-0.5 p-2 rounded">
                                  {emailError && <p>{emailError}</p>}
                                  {loginError && <p>{loginError}</p>}
                                </div>
                              )}

                              <div className="flex  md:gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                <button
                                  type="button"
                                  onClick={handlePrevStep}
                                  className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                                >
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9772a7a53b18b6a8d736b49ecb35ea60754bc1c1cb822d5108c85c04ca43d092?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                    className="w-5 aspect-square"
                                  />
                                  <div className="grow text-white">
                                    {" "}
                                    &nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </button>
                                <div className="tal2 flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                  <button
                                    type="submit"
                                    className="flex flex-row"
                                  >
                                    {" "}
                                    <span className="px-2">
                                      {getTranslation(
                                        `Submit`, // -----> Englais
                                        `Confirmer`, //  -----> Francais
                                        ``, //  -----> Turkey
                                        `` //  -----> Allemagne
                                      )}
                                    </span>{" "}
                                    <svg
                                      width={21}
                                      height={16}
                                      viewBox="0 0 21 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.92986 15.1094C6.34004 15.1096 5.77436 14.8752 5.35764 14.4578L0.6043 9.70618C0.0928374 9.19455 0.0928374 8.36521 0.6043 7.85358C1.11593 7.34212 1.94527 7.34212 2.4569 7.85358L6.92986 12.3265L18.7634 0.492972C19.2751 -0.0184907 20.1044 -0.0184907 20.616 0.492972C21.1275 1.0046 21.1275 1.83394 20.616 2.34557L8.50208 14.4578C8.08536 14.8752 7.51969 15.1096 6.92986 15.1094Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </>
                          )}

                          {formData.typeresponsable === "players" && (
                            <>
                              <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                                <div className="flex gap-4 justify-between max-md:flex-wrap max-md:max-w-full">
                                  <div className="flex flex-col flex-1">
                                    <div className="flex gap-4 justify-between px-4 text-lg whitespace-nowrap text-zinc-900">
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/40ce3f4dbc1ac29eaa66d4104bf3f6dc7733f2c8c57fa093cc6ba3e58fe3361f?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                        className="self-start w-5 aspect-square"
                                      />
                                      <div className="grow">
                                        {getTranslation(
                                          `Number of managed players`, // -----> Englais
                                          ` Nombre de joueurs gérés`, //  -----> Francais
                                          ``, //  -----> Turkey
                                          `` //  -----> Allemagne
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-col justify-center mt-2 w-full border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                                      <div className="flex gap-5 justify-between px-4 py-3 rounded-md">
                                        <input
                                          type="number"
                                          id="totalPlayer"
                                          name="totalPlayer"
                                          className={`bg-zinc-100 w-full ${
                                            inputErrors["totalPlayer"]
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          onChange={handleInputChange}
                                          value={formData.totalPlayer}
                                          placeholder={getTranslation(
                                            `Number of managed players`, // -----> Englais
                                            ` Nombre de joueurs gérés`, //  -----> Francais
                                            ``, //  -----> Turkey
                                            `` //  -----> Allemagne
                                          )}
                                        />
                                      </div>
                                    </div>
                                    {inputErrors["totalPlayer"] && (
                                      <div className="error-message text-red-600">
                                        {inputErrors["totalPlayer"]}
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex flex-col flex-1 max-md:-mt-4">
                                    <div className="flex gap-4   justify-between px-4 text-lg whitespace-nowrap text-zinc-900">
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bad4ca2b38add0c4edb31196ef177dc9940dcd65460ae94b7a9f136cb548fb20?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                        className="self-start w-5 aspect-square"
                                      />
                                      <div className="tal1 grow text-wrap whitespace-wrap ">
                                        {getTranslation(
                                          `Number of transfers made `, // -----> Englais
                                          ` Nombre de transferts effectués`, //  -----> Francais
                                          ``, //  -----> Turkey
                                          `` //  -----> Allemagne
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-col justify-center mt-2 w-full border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px]">
                                      <div className="flex gap-5 justify-between  py-3 rounded-md">
                                        <input
                                          type="number"
                                          id="totalCareerTransfers"
                                          name="totalCareerTransfers"
                                          className={`bg-zinc-100 mx-4 pl-3 w-[80%] ${
                                            inputErrors["totalCareerTransfers"]
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          onChange={handleInputChange}
                                          value={formData.totalCareerTransfers}
                                          placeholder="Nombre des joueurs transferés"
                                        />
                                      </div>
                                    </div>
                                    {inputErrors["totalCareerTransfers"] && (
                                      <div className="error-message text-red-600">
                                        {inputErrors["totalCareerTransfers"]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-4 self-start px-4 mt-8 mb-2 text-lg text-black whitespace-nowrap">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b1aceaa458ae0813ba851a1899314ccc41fda7b9f83817505dcc26c5116673c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="self-start w-5 aspect-square"
                                />
                                <div className="tal1 flex-auto">
                                  {getTranslation(
                                    `Skills!`, // -----> Englais
                                    `Compétences !`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </div>
                              </div>

                              <div className="form-group icon-input  mb-3">
                                {[
                                  getTranslation(`Negotiation`, `Négociation`),

                                  getTranslation(
                                    `In-depth Sports Knowledge`,
                                    `Connaissance approfondie du sport`
                                  ),
                                  getTranslation(`Empathy`, `Empathie`),

                                  getTranslation(
                                    `Legal Skills`,
                                    `Compétences juridiques`
                                  ),
                                  getTranslation(
                                    `Career Management`,
                                    `Gestion des carrières`
                                  ),
                                  "Communication",

                                  getTranslation(
                                    `Financial Advisory`,
                                    `Conseil financier`
                                  ),
                                  getTranslation(
                                    `Market Analysis`,
                                    `Analyse du marché`
                                  ),
                                  getTranslation(
                                    `Stress Management`,
                                    `Gestion du stress`
                                  ),
                                  getTranslation(
                                    `Professional Ethics`,
                                    `Éthique professionnelle`
                                  ),

                                  getTranslation(
                                    `Conflict Management`,
                                    `Gestion de conflits`
                                  ),
                                  getTranslation(
                                    `Adaptability`,
                                    `Adaptabilité`
                                  ),
                                  getTranslation(
                                    `Marketing Skills`,
                                    `Compétences marketing`
                                  ),
                                  // Add other skills...
                                ].map((agentSkill) => (
                                  <div
                                    key={agentSkill}
                                    className="form-check  rounded-[30px] form-check-inline me-2 mb-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={agentSkill}
                                      name="coachSkillsInProfile"
                                      checked={formData.skillsagent
                                        .split(",")
                                        .includes(agentSkill)}
                                      onChange={() =>
                                        handleagentSkillToggle(agentSkill)
                                      }
                                      className="form-check-input d-none rounded-[30px]"
                                    />
                                    <label
                                      htmlFor={agentSkill}
                                      className={`form-check-label btn ${
                                        formData.skillsagent
                                          .split(",")
                                          .includes(agentSkill)
                                          ? "bg-blue-600 py-2.5 rounded-full text-white"
                                          : "bg-white py-2.5 rounded-full"
                                      } 
                                          ${
                                            !formData.skillsagent
                                              .split(",")
                                              .includes(agentSkill) &&
                                            agentSkillsError
                                              ? "border-danger"
                                              : ""
                                          }`}
                                    >
                                      {!formData.skillsagent
                                        .split(",")
                                        .includes(agentSkill)
                                        ? "+" // Display "+" when not selected
                                        : "-"}{" "}
                                      {agentSkill}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {agentSkillsError && (
                                <div className="text-danger mt-2">
                                  {getTranslation(
                                    `You can select up to 10 skills!`, // -----> Englais
                                    `Vous pouvez selectionner au maximum 10 compétences !`, //  -----> Francais
                                    ``, //  -----> Turkey
                                    `` //  -----> Allemagne
                                  )}
                                </div>
                              )}

                              <div className="flex flex-col gap-2 md:gap-5 mt-2 text-lg max-md:flex-wrap max-md:max-w-full">
                                <div className="flex gap-1 justify-between whitespace-nowrap text-zinc-900">
                                  <div className="flex md:flex-row gap-2 flex-row">
                                    <div className="flex md:flex-col gap-2 flex-row ">
                                      <label className="">
                                        <input
                                          type="checkbox"
                                          checked={
                                            formData.termesConditions === "Oui"
                                          }
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              termesConditions: e.target.checked
                                                ? "Oui"
                                                : "Non",
                                            })
                                          }
                                        />
                                      </label>
                                    </div>
                                    <div
                                      className="flex flex-row gap-2 md:gap-3 flex-wrap underline mb-2 sm:mb-0 sm:order-1"
                                      onClick={() => {
                                        setWichContent(1)
                                        setShowModal(true)
                                      }}                                      >
                                      J'accepte les{" "}
                                      <span  onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                Termes & Conditions
                              </span>
                              {" "}

                              et
                              {" "}

                              <span  onClick={() => {
                                setWichContent(2)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                politique de confidentialité
                              </span>
                                    </div>
                                  </div>
                                </div>
                                {errorMessage && (
                                  <div className="error-message align-center text-red-600">
                                    {errorMessage}
                                  </div>
                                )}

                                {/* <div className="mt-2 gap-2    flex flex-row items-center">
                                  <div className="flex flex-row itmes-center ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={
                                          formData.partagehorsPL === "Oui"
                                        }
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            partagehorsPL: e.target.checked
                                              ? "Oui"
                                              : "Non",
                                          })
                                        }
                                      />
                                    </label>
                                  </div>

                                  <div className="md:w-auto w-[90%]">
                                  <label className="tal1 underline cursor-pointer block mb-2 " 
                             onClick={() => {
                              setWichContent(2)
                              setShowModal(true)
                            }}>
                              {getTranslation(
                                `J'accept privacy & policy.`, // -----> Englais
                                `J'accept privacy & policy. `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </label>
                                  </div>
                                </div> */}
                              </div>

                              {(emailError || loginError) && (
                                <div className="inline-block text-center text-white bg-orange-500 border-0.5 p-2 rounded">
                                  {emailError && <p>{emailError}</p>}
                                  {loginError && <p>{loginError}</p>}
                                </div>
                              )}

                              <div className="flex  md:gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                <button
                                  type="button"
                                  onClick={handlePrevStep}
                                  className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                                >
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9772a7a53b18b6a8d736b49ecb35ea60754bc1c1cb822d5108c85c04ca43d092?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                    className="w-5 aspect-square"
                                  />
                                  <div className="grow text-white">
                                    {" "}
                                    &nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </button>
                                <div className="tal2 flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                                  <button
                                    type="submit"
                                    className="flex flex-row"
                                  >
                                    {" "}
                                    <span className=" px-2">
                                      {getTranslation(
                                        `Submit`, // -----> Englais
                                        `Confirmer`, //  -----> Francais
                                        ``, //  -----> Turkey
                                        `` //  -----> Allemagne
                                      )}
                                    </span>{" "}
                                    <svg
                                      width={21}
                                      height={16}
                                      viewBox="0 0 21 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.92986 15.1094C6.34004 15.1096 5.77436 14.8752 5.35764 14.4578L0.6043 9.70618C0.0928374 9.19455 0.0928374 8.36521 0.6043 7.85358C1.11593 7.34212 1.94527 7.34212 2.4569 7.85358L6.92986 12.3265L18.7634 0.492972C19.2751 -0.0184907 20.1044 -0.0184907 20.616 0.492972C21.1275 1.0046 21.1275 1.83394 20.616 2.34557L8.50208 14.4578C8.08536 14.8752 7.51969 15.1096 6.92986 15.1094Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {formData.profil === "scout" && (
                <>
                  <div className="flex flex-col items-center pb-52 -mb-px bg-gray-200">
                    <div className="mt-6 text-5xl font-bold text-zinc-900 max-md:max-w-full">
                      <div className="tal1 text-center max-w-xl mx-auto mt-0">
                        <p className="text-3xl text-zinc-900 ">
                          {getTranslation(
                            `Profile Information`, // -----> Englais
                            ` Informations du Profil`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </p>
                      </div>
                      <div className="flex justify-center items-center px-16  mt-2 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-3 justify-between mr-2 ml-2">
                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />

                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />

                </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch px-16 mt-8 mb-40 w-full max-md:px-5 max-md:max-w-full">
                      <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                        <div className="flex  gap-3  md:gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                          <div className="flex  flex-col w-full md:w-[50%]  text-zinc-900">
                            <div className="flex gap-4 mb-2 justify-between px-4 text-lg whitespace-nowrap">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/61c6155cdb7cedb8428209197c5325af5b02bf7ecb94533f0ee5c2b47c1c2444?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="self-start aspect-[1.15] w-[23px]"
                              />
                              <div className="tal1 grow">
                                {getTranslation(
                                  `Type of commitment`, // -----> Englais
                                  `Type d’engagement`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}{" "}
                              </div>
                            </div>
                            <span className="relative ">

                            <select
                              name="engagement"
                              value={formData.engagement}
                              className={`form-control flex justify-between border-[0.5px] px-4 pb-3 mb-2 bg-zinc-100 rounded-[30px] ${
                                inputErrors["engagement"] ? "is-invalid" : ""
                              }`}
                              style={{
                                paddingTop: "1px",
                                paddingBottom: "10px",
                              }} // Adjust padding as needed
                              onChange={handleInputChange}
                            >
                              <option value="" disabled>
                                {getTranslation(
                                  `Your type of commitment`, // -----> Englais
                                  `Votre type d’engagement`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </option>
                              <option value="plein-temps">
                                {getTranslation(
                                  `Full-Time`, // -----> Englais
                                  `Plein Temps`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </option>
                              <option value="mi-temps">
                                {getTranslation(
                                  `Part-Time`, // -----> Englais
                                  `Mi-Temps`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}{" "}
                              </option>
                              <option value="volontaire">
                                {getTranslation(
                                  `Volunteer`, // -----> Englais
                                  `Volontaire`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </option>
                            </select>

                            <span className="absolute right-[4px] bottom-[13%] h-[80%] w-10   flex items-center justify-center">
      <span style={{
        borderLeft: "2px solid #ddd"
      }} className="pl-1 h-5 ">
      <img src={require("../assets/down.png")} 
        className="w-5  invert-[.8]"
      />
      </span>

</span>
</span>
                            {inputErrors["engagement"] && (
                              <div className="error-message text-red-600">
                                {inputErrors["engagement"]}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col w-full md:w-[50%] ">
                            <div className="flex gap-4 justify-between px-4  mb-2 text-lg whitespace-nowrap text-zinc-900">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/905ceacb3a78358a7e57864a93688890f119c8869b3ab4c3558735affbc2aa60?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                className="self-start w-5 aspect-square"
                              />
                              <div className="grow">
                                {getTranslation(
                                  `Number of players scouted`, // -----> Englais
                                  `Nombre de joueurs détectés`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </div>
                            </div>

                            <input
                              type="number"
                              id="nb_joueurdetecter"
                              name="nb_joueurdetecter"
                              value={formData.nb_joueurdetecter}
                              className={` form-control flex gap-5 justify-between border-[0.5px] mb-1 bg-zinc-100 w-full px-4 py-2 rounded-xl ${
                                inputErrors["nb_joueurdetecter"]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder={getTranslation(
                                `Number of players scouted`, // -----> Englais
                                `Nombre de joueurs détectés`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                              onChange={handleInputChange}
                            />

                            {inputErrors["nb_joueurdetecter"] && (
                              <div className="error-message text-red-600">
                                {inputErrors["nb_joueurdetecter"]}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 md:gap-4 w-full md:w-[50%]  self-start px-4 mt-8 text-lg text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f48abcee21a3194921563739310f0764132a8c52ff33636c5ffa29d102dc978c?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />
                          <div className="grow max-md:max-w-full">
                            {getTranslation(
                              `Exploration regions`, // -----> Englais
                              `Régions d’explorations`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>

                        <div className="flex md:flex-row flex-col md:gap-x-20   md:w-[100%]  ">
                          <div className="flex  w-full  md:w-[50%] flex-col justify-center px-1 mt-2 max-w-full text-lg text-white whitespace-nowrap w-full md:w-[33%]">
                            <div className="flex  w-full flex-col justify-center px-0.5 border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:max-w-full">
                              <div className="flex  w-full flex-col justify-center py-1.5 pl-4 rounded-md max-md:max-w-full">
                                <div className="flexw-full md:gap-5 justify-between pr-4  max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                                  <div className="w-full ">
                                    <select
                                      onChange={handleChangeRegion}
                                      // multiple
                                      className="w-full bg-zinc-100 border-[0px] text-black w-full text-base"
                                      style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        fontSize: "sm",
                                        width: "full",
                                      }}
                                      value={selectedRegions}
                                    >
                                      <option value="">Région</option>
                                      <option value="Europe">Europe</option>
                                      <option value="Asia">Asia</option>

                                      <option value="Afrique">Afrique</option>
                                      <option value="Océanie">Océanie</option>
                                      <option value="Amérique">Amérique</option>
                                    </select>
                                  </div>

                                  <div></div>

                                  {/* <Select
                                  options={regionOptions}
                                  onChange={handleChangeregion}
                                  placeholder={
                                    getTranslation(
                                      `The Exploration regions`,  // -----> Englais
                                      `Les Régions d’explorations`, //  -----> Francais
                                      ``,  //  -----> Turkey
                                      ``,  //  -----> Allemagne
                                    )

                                  }

                                  isMulti
                                  className="w-full bg-zinc-100 border-[0px] text-base"
                                  styles={{
                                    option: (provided, state) => ({
                                      ...provided,
                                      color: state.isSelected ? 'black' : 'black', // Change colors as needed
                                    }),
                                    control: (provided, state) => ({
                                      ...provided,
                                      backgroundColor: '#F4F4F5',
                                      border: 'none',
                                      fontSize: 'sm',
                                      width: "full"
                                    }),
                                  }}
                                /> */}
                                </div>
                              </div>
                            </div>
                            {/* {inputErrors['paysscout'] && (
                            <div className="error-message text-red-600 text-sm mt-2">{inputErrors['paysscout']}</div>
                          )} */}
                          </div>

                          {/* <div className="mt-2  flex flex-row">   
    <h2>Regions Choisi:</h2>
                        <div className="w-full h-[0.3px] opacity-[0.2] bg-[#a3a3a4] " />

        <ul className="flex flex-row gap-y-2">
          {selectedRegions.map(region => (
            <li className="text-black bg-blue-600 mx-2 rounded-[30px] gap-y-2 " key={region}>
           <div className="flex flex-row gap-x-2 "> 

             <div className="flex-col text-white w-[50%] pl-2 pt-2"> {region}</div>

          <div className="flex-col pt-2 flex-wrap"> <button className="transition mx-3 ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 rounded-md hover:scale-110 hover:bg-blue-400 duration-300  w-6 h-6 text-white text-xs" onClick={() => handleRemoveRegion(region)}>X</button></div>
         
          </div>
            </li>
          ))}
        </ul>
      </div> */}

                          <div class=" flex max-md:mt-5 ml-2 flex-col sm:flex-row">
                            <h2>
                              {getTranslation(
                                `Selected Regions`, // -----> Englais
                                `Régions Choisies:` //  -----> Francais
                                //   ``,  //  -----> Turkey
                                //   `` ,  //  -----> Allemagne
                              )}
                            </h2>

                            <ul class="flex flex-row  mt-2 flex-wrap gap-y-2">
                              {selectedRegions.map((region) => (
                                <li
                                  class="text-black bg-blue-600 mx-2 rounded-[30px] flex items-center"
                                  key={region}
                                >
                                  <div class="flex md:flex-row gap-x-2">
                                    <div class="text-white w-[50%] pl-2 pt-1">
                                      {" "}
                                      {region}
                                    </div>
                                    <div class="pt-1 flex-col flex-wrap">
                                      <button
                                        class="transition mx-3 ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 rounded-md hover:scale-110 hover:bg-blue-400 duration-300 w-6 h-6 text-white text-xs"
                                        onClick={() =>
                                          handleRemoveRegion(region)
                                        }
                                      >
                                        X
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-4 self-start px-4  mt-8 text-lg text-black whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eed879260ca15ccfad0d945395a8221b41159b944d63d78bddd58557acc9c58e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />
                          <div className="flex-auto">
                            {getTranslation(
                              `Skills`, // -----> Englais
                              `Compétences`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}{" "}
                          </div>
                        </div>
                        {/* <div className="flex flex-col justify-center content-start items-center mt-4 text-lg text-blue-600 whitespace-nowrap max-md:max-w-full">

                          <div className="form-group icon-input mb-3 flex flex-wrap justify-between">
                            {[
                              "Analyse tactique",
                              "Connaissance approfondie du sport",
                              "Réseautage",
                              "Observation",
                              "Analyse des données",
                              "Compétence en communication",
                              "Connaissance des marchés",
                              "Rapports détaillés",
                              "Gestion du temps",
                              "Éthique professionnelle",
                              "Compétences informatiques",
                              "Adaptabilité",
                              "Évaluation psychologique",

                              // Add other skills...
                            ].map((skillsscout) => (
                              <div
                                key={skillsscout}
                                className="form-check rounded-[30px] mb-2 md:w-1/2 lg:w-1/3 xl:w-1/4"
                              >
                                <input
                                  type="checkbox"
                                  id={skillsscout}
                                  name="skillsscout"
                                  checked={formData.skillsscout
                                    .split(",")
                                    .includes(skillsscout)}
                                  onChange={() =>
                                    handleScoutSkillToggle(skillsscout)
                                  }
                                  className="form-check-input d-none rounded-[30px]"
                                />

                                <label
                                  htmlFor={skillsscout}
                                  className={`form-check-label btn ${formData.skillsscout
                                      .split(",")
                                      .includes(skillsscout)
                                      ? "bg-blue-600 text-white"
                                      : "btn-light"
                                    } ${!formData.skillsscout
                                      .split(",")
                                      .includes(skillsscout) &&
                                      scoutSkillsError
                                      ? "border-danger"
                                      : ""
                                    }`}
                                >
                                  {!formData.skillsscout
                                    .split(",")
                                    .includes(skillsscout)
                                    ? "+" // Display "+" when not selected
                                    : "-"}{" "}
                                  {skillsscout}
                                </label>
                              </div>
                            ))}
                          </div>

                        </div>
                        {scoutSkillsError && (
                          <div className="text-danger mt-2">
                            Vous pouvez selectionner au maximum 10 compétences !  </div>
                        )} */}

                        <div className="form-group icon-input  mb-3">
                          {[
                            getTranslation(
                              `Tactical analysis`,
                              `Analyse tactique`
                            ),
                            getTranslation(
                              `In-depth knowledge of the sport`,
                              `Connaissance approfondie du sport`
                            ),

                            getTranslation(`networking`, `Réseautage`),
                            "Observation",

                            getTranslation(
                              `data analysis`,
                              `Analyse des données`
                            ),
                            getTranslation(
                              `communication skills`,
                              `Compétence en communication`
                            ),

                            getTranslation(
                              `Commercial knowledge`,
                              `Connaissance des marchés`
                            ),
                            getTranslation(
                              `detailed reporting`,
                              `Rapports détaillés`
                            ),
                            getTranslation(
                              `time management`,
                              `Gestion du temps`
                            ),

                            getTranslation(
                              `Professional ethics`,
                              `Éthique professionnelle`
                            ),

                            getTranslation(
                              `Computer skills`,
                              `Compétences informatiques`
                            ),

                            getTranslation(`adaptability`, `Adaptabilité`),

                            getTranslation(
                              `Psychological assessment`,
                              `Évaluation psychologique`
                            ),

                            // Add other skills...
                          ].map((skillsscout) => (
                            <div
                              key={skillsscout}
                              className="form-check  rounded-[30px] form-check-inline me-2 mb-2"
                            >
                              <input
                                type="checkbox"
                                id={skillsscout}
                                name="skillsscout"
                                checked={formData.skillsscout
                                  .split(",")
                                  .includes(skillsscout)}
                                onChange={() =>
                                  handleScoutSkillToggle(skillsscout)
                                }
                                className="form-check-input d-none rounded-[30px]"
                              />
                              <label
                                htmlFor={skillsscout}
                                className={`form-check-label btn ${
                                  formData.skillsscout
                                    .split(",")
                                    .includes(skillsscout)
                                    ? "bg-blue-600 py-2.5 rounded-full text-white"
                                    : "bg-white py-2.5 rounded-full"
                                } 

                                     ${
                                       !formData.skillsscout
                                         .split(",")
                                         .includes(skillsscout) &&
                                       scoutSkillsError
                                         ? "border-danger"
                                         : ""
                                     }`}
                              >
                                {!formData.skillsscout
                                  .split(",")
                                  .includes(skillsscout)
                                  ? "+" // Display "+" when not selected
                                  : "-"}{" "}
                                {skillsscout}
                              </label>
                            </div>
                          ))}
                        </div>
                        {scoutSkillsError && (
                          <div className="text-danger mt-2">
                            {getTranslation(
                              `You can select up to 10 skills!`, // -----> Englais
                              `Vous pouvez selectionner au maximum 10 compétences !`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        )}

                        <div className="flex flex-col gap-2 md:gap-5 mt-2 text-lg max-md:flex-wrap max-md:max-w-full">
                          <div className="flex gap-1 justify-between whitespace-nowrap text-zinc-900">
                            <div className="flex md:flex-row gap-2 flex-row">
                              <div className="flex md:flex-col gap-2 flex-row ">
                                <label className="">
                                  <input
                                    type="checkbox"
                                    checked={
                                      formData.termesConditions === "Oui"
                                    }
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        termesConditions: e.target.checked
                                          ? "Oui"
                                          : "Non",
                                      })
                                    }
                                  />
                                </label>
                              </div>
                              <div
                                className="flex flex-row gap-2 md:gap-3 flex-wrap underline mb-2 sm:mb-0 sm:order-1"
                                onClick={() => {
                                  setWichContent(1)
                                  setShowModal(true)
                                }}                               >
                                J'accepte les{" "}
                                <span  onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                Termes & Conditions
                              </span>
                              {" "}

                              et
                              {" "}

                              <span  onClick={() => {
                                setWichContent(2)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                politique de confidentialité
                              </span>
                              </div>
                            </div>
                          </div>
                          {errorMessage && (
                            <div className="error-message align-center text-red-600">
                              {errorMessage}
                            </div>
                          )}

                          {/* <div className="mt-2 gap-2    flex flex-row items-center">
                            <div className="flex flex-row itmes-center">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={formData.partagehorsPL === "Oui"}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      partagehorsPL: e.target.checked
                                        ? "Oui"
                                        : "Non",
                                    })
                                  }
                                />
                              </label>
                            </div>

                            <div className="md:w-auto w-[90%]">
                            <label className="tal1 underline cursor-pointer block mb-2 " 
                             onClick={() => {
                              setWichContent(2)
                              setShowModal(true)
                            }}>
                              {getTranslation(
                                `J'accept privacy & policy.`, // -----> Englais
                                `J'accept privacy & policy. `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </label>
                            </div>
                          </div> */}
                        </div>

                        {(emailError || loginError) && (
                          <div className="inline-block text-center text-white bg-orange-500 border-0.5 p-2 rounded">
                            {emailError && <p>{emailError}</p>}
                            {loginError && <p>{loginError}</p>}
                          </div>
                        )}

                        <div class="flex  md:gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                          >
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9772a7a53b18b6a8d736b49ecb35ea60754bc1c1cb822d5108c85c04ca43d092?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow text-white">
                              {" "}
                              &nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                          </button>
                          <div className=" tal2 flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                            <button type="submit" className="flex flex-row">
                              {" "}
                              <span className="px-2">
                                {getTranslation(
                                  `Submit`, // -----> Englais
                                  `Confirmer`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </span>{" "}
                              <svg
                                width={21}
                                height={16}
                                viewBox="0 0 21 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.92986 15.1094C6.34004 15.1096 5.77436 14.8752 5.35764 14.4578L0.6043 9.70618C0.0928374 9.19455 0.0928374 8.36521 0.6043 7.85358C1.11593 7.34212 1.94527 7.34212 2.4569 7.85358L6.92986 12.3265L18.7634 0.492972C19.2751 -0.0184907 20.1044 -0.0184907 20.616 0.492972C21.1275 1.0046 21.1275 1.83394 20.616 2.34557L8.50208 14.4578C8.08536 14.8752 7.51969 15.1096 6.92986 15.1094Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {formData.profil === "other" && (
                <>
                  <div className="flex flex-col items-center  h-full bg-gray-200">
                    <div className="mt-6 text-5xl font-bold text-zinc-900 max-md:max-w-full">
                      <div className="tal1 text-center max-w-xl mx-auto mt-1">
                        <p className="text-3xl text-zinc-900 ">
                          {getTranslation(
                            `Profile Information`, // -----> Englais
                            ` Informations du Profil`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </p>
                      </div>
                      <div className="flex justify-center items-center px-16  mt-2 w-full max-w-[1184px] max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-3 justify-between mr-2 ml-2">
                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />

                  <div className="h-2 bg-blue-300 rounded-md w-[45px] sm:w-[50px] lg:w-[67px] xl:w-[100px] xxl:w-[120px]" />
                  <div className="h-2 bg-blue-600 rounded-md w-[150px] sm:w-[120px] lg:w-[158px] xl:w-[200px] xxl:w-[250px]" />

                </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-y-8 justify-center content-start items-center self-stretch rounded-3xl px-16 mt-8 mb-52 w-full text-lg max-md:px-5 max-md:max-w-full">
                      <div className="flex flex-col w-full max-w-[1184px] max-md:max-w-full">
                        <div className="flex gap-4 self-start px-4 whitespace-nowrap  text-zinc-900">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d9b00671f5c6adfdf6ed3be7a7b9734acc3f6ea0ee7c51e1fe7326d623f7566?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />
                          <div className="grow">
                            {getTranslation(
                              `The profession`, // -----> Englais
                              `La profession`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center mt-2 max-w-full text-base border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 w-[379px]">
                          <select
                            id="profession"
                            name="profession"
                            className={`flex gap-5 justify-between px-4 py-3.5 rounded-3xl mr-4 bg-zinc-100 ${
                              inputErrors["profession"] ? "is-invalid" : ""
                            }`}
                            onChange={handleInputChange}
                            value={formData.profession}
                          >
                            <option value="">
                              {getTranslation(
                                `Your profession`, // -----> Englais
                                `Votre profession`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Fan Football">
                              {getTranslation(
                                `Football Fan`, // -----> Englais
                                `Fan de Football`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}{" "}
                            </option>
                            <option value="Journaliste Sportif">
                              {getTranslation(
                                `Sports Journalist`, // -----> Englais
                                `Journaliste Sportif`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Arbitre Football">
                              {getTranslation(
                                `Football Referee`, // -----> Englais
                                `Arbitre Football`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            {/* <option value="Analyste de performance ">

                              {
                                getTranslation(
                                  `Performance Analyst`,  // -----> Englais
                                  `Analyste de performance`, //  -----> Francais
                                  ``,  //  -----> Turkey
                                  ``,  //  -----> Allemagne
                                )

                              }
                            </option> */}
                            <option value="Nutrtitionniste">
                              {getTranslation(
                                `Nutritionist`, // -----> Englais
                                `Nutrtitionniste`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Physiotherpeute">
                              {getTranslation(
                                `Physiotherapist`, // -----> Englais
                                `Physiothérapeute`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Analyste de football">
                              {getTranslation(
                                `Football Analyst`, // -----> Englais
                                `Analyste de Football`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Médecin d'équipe">
                              {getTranslation(
                                `Team Doctor`, // -----> Englais
                                `Médecin d'équipe`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                            <option value="Prof de fitnesse">
                              {getTranslation(
                                `Fitness Trainer`, // -----> Englais
                                `Préparateur Physique`, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </option>
                          </select>
                          {inputErrors["Profession"] && (
                            <div className="invalid-feedback text-xs">
                              {inputErrors["Profession"]}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-4 self-start px-4 mt-8 text-black whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/086c2fa012e3785486cfccd51151394483bfd7732b8e22ba3dbf33beaf66bf59?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="self-start w-5 aspect-square"
                          />
                          <div className="tal1 flex-auto">
                            {getTranslation(
                              `Skills`, // -----> Englais
                              `Compétences`, //  -----> Francais
                              ``, //  -----> Turkey
                              `` //  -----> Allemagne
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col flex-wrap justify-center content-start px-3.5 mt-4 text-blue-600 whitespace-nowrap max-md:max-w-full">
                          {formData.profession && (
                            <div>
                              {formData.profession === "Fan Football" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    getTranslation(
                                      `Emotional Engagement`,
                                      `Engagement émotionnel`
                                    ),

                                    getTranslation(`Loyalty`, `Fidélité`),

                                    getTranslation(
                                      `Sportsmanship`,
                                      `Esprit sportif`
                                    ),

                                    getTranslation(
                                      `Social networking`,
                                      `Réseautage social`
                                    ),

                                    getTranslation(
                                      `Flexibility`,
                                      `Adaptabilité`
                                    ),
                                    "Motivation",
                                    "Respect",

                                    // Add other skills...
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        }  ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {formData.profession ===
                                "Journaliste Sportif" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    getTranslation(`Research`, `Recherche`),

                                    getTranslation(`Writing`, `Rédaction`),
                                    "Communication",

                                    getTranslation(
                                      `Expertise in social media`,
                                      `Maîtrise des médias sociaux`
                                    ),

                                    getTranslation(`Reactivity`, `Réactivité`),

                                    getTranslation(
                                      `Time management`,
                                      `Gestion du temps`
                                    ),

                                    getTranslation(
                                      `Critical analysis`,
                                      `Analyse critique`
                                    ),

                                    getTranslation(
                                      `Flexibility`,
                                      `Adaptabilité`
                                    ),
                                    // Add other skills...
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        }  ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {formData.profession === "Arbitre Football" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    "Encouragement",

                                    getTranslation(`Listening`, `Ecoute`),
                                    "Communication",
                                    "Leadership",
                                    "Motivation",

                                    getTranslation(
                                      `Respect and authority`,
                                      `Autorité et respect`
                                    ),

                                    getTranslation(
                                      `Conflict Management`,
                                      `Gestion des conflits`
                                    ),

                                    getTranslation(`Reactivity`, `Réactivité`),

                                    getTranslation(
                                      `Stress management`,
                                      `Gestion du stress`
                                    ),
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        }  ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* {formData.profession ===
                                "Analyste de performance" && (
                                  <div className="form-group icon-input mb-3 flex flex-wrap">
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
                                          checked={selectedSkills.includes(skillsAutre)}
                                          onChange={() => handleSkillToggleAutre(skillsAutre)}
                                          className="form-check-input d-none"
                                        />
                                        <label
                                          htmlFor={skillsAutre}
                                          className={`form-check-label btn ${formData.skillsAutre.split(',').includes(skillsAutre)
                                            ? "bg-blue-600 py-2.5 rounded-full text-white" : "bg-white py-2.5 rounded-full"} ${!formData.skillsAutre.split(',').includes(skillsAutre) && skillsAutreError
                                              ? "border-danger"
                                              : ""
                                            }`}
                                        >
                                          {!formData.skillsAutre.split(',').includes(skillsAutre) ? "+" : "-"} {skillsAutre}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )} */}

                              {formData.profession === "Nutrtitionniste" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    getTranslation(
                                      `Nutritional assessment`,
                                      `Évaluation nutritionnelle`
                                    ),

                                    getTranslation(
                                      `Diet planning`,
                                      `Planification de régimes`
                                    ),

                                    getTranslation(
                                      `Understanding of Needs`,
                                      `Compréhension des besoins`
                                    ),

                                    getTranslation(
                                      `Flexibility`,
                                      `Adaptabilité`
                                    ),
                                    "Communication",

                                    getTranslation(`Listening`, `Écoute`),
                                    "Encouragement",
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        }  ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {formData.profession === "Physiotherpeute" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    getTranslation(
                                      `Physiotherapist skills`,
                                      `Compétences Physiothérapeute`
                                    ),

                                    getTranslation(
                                      `Time management`,
                                      `Gestion du temps`
                                    ),

                                    getTranslation(
                                      `Professional attitude`,
                                      `Éthique professionnelle`
                                    ),
                                    getTranslation(`Empathy`, `Empathie`),
                                    getTranslation(
                                      `Analyse des mouvements sportifs`,
                                      `Analysis of sports movements`
                                    ),
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        }  ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {formData.profession ===
                                "Analyste de football" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    getTranslation(
                                      `Team spirit`,
                                      `Esprit d'équipe`
                                    ),

                                    getTranslation(
                                      `Time management`,
                                      `Gestion du temps`
                                    ),
                                    "Communication",

                                    getTranslation(
                                      `Video analysis`,
                                      `Analyse vidéo`
                                    ),

                                    getTranslation(
                                      `Analytical skills`,
                                      `Compétences analytiques`
                                    ),

                                    getTranslation(
                                      `Tactical knowledge`,
                                      `Connaissance des tactiques`
                                    ),
                                    "Communication",

                                    getTranslation(
                                      `Adaptability`,
                                      `Adaptabilité`
                                    ),

                                    getTranslation(
                                      `Understanding competitors`,
                                      `Compréhension des adversaires`
                                    ),

                                    getTranslation(
                                      `Detailed reporting`,
                                      `Rapports détaillés`
                                    ),
                                    "Collaboration",

                                    getTranslation(
                                      `Computer skills`,
                                      `Compétences informatiques`
                                    ),

                                    getTranslation(
                                      `Professional ethics`,
                                      `Éthique professionnelle`
                                    ),
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        } ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {formData.profession === "Médecin d'équipe" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    getTranslation(
                                      `Injury diagnosis`,
                                      `Diagnostic des blessures`
                                    ),

                                    getTranslation(
                                      `Injury prevention`,
                                      `Prévention des blessures`
                                    ),

                                    getTranslation(
                                      `Stress management`,
                                      `Gestion du stress`
                                    ),

                                    getTranslation(
                                      `Medical technology`,
                                      `Technologie médicale`
                                    ),
                                    getTranslation(`Empathy`, `Empathie`),
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        }  ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {formData.profession === "Prof de fitnesse" && (
                                <div className="form-group icon-input mb-3 flex flex-wrap">
                                  {[
                                    "Leadership",
                                    "Collaboration",
                                    "Communication",

                                    getTranslation(
                                      `Football knowledge`,
                                      `Connaissance du football`
                                    ),

                                    getTranslation(
                                      `Physical therapy`,
                                      `Rééducation`
                                    ),
                                    "Motivation",

                                    getTranslation(
                                      `Stress management`,
                                      `Gestion du stress`
                                    ),

                                    getTranslation(
                                      `Fitness assessment`,
                                      `Évaluation de condition physique`
                                    ),

                                    getTranslation(
                                      `Training planning`,
                                      `Planification de l'entraînement`
                                    ),
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
                                            ? "bg-blue-600 py-2.5 rounded-full text-white"
                                            : "bg-white py-2.5 rounded-full"
                                        } ${
                                          !formData.skillsAutre
                                            .split(",")
                                            .includes(skillsAutre) &&
                                          skillsAutreError
                                            ? "border-danger"
                                            : ""
                                        }`}
                                      >
                                        {!formData.skillsAutre
                                          .split(",")
                                          .includes(skillsAutre)
                                          ? "+"
                                          : "-"}{" "}
                                        {skillsAutre}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 md:gap-5 mt-2 text-lg max-md:flex-wrap max-md:max-w-full">
                          <div className="flex gap-1 justify-between whitespace-nowrap text-zinc-900">
                            <div className="flex md:flex-row gap-2 flex-row">
                              <div className="flex md:flex-col gap-2 flex-row ">
                                <label className="">
                                  <input
                                    type="checkbox"
                                    checked={
                                      formData.termesConditions === "Oui"
                                    }
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        termesConditions: e.target.checked
                                          ? "Oui"
                                          : "Non",
                                      })
                                    }
                                  />
                                </label>
                              </div>
                              <div
                                className="flex flex-row gap-2 md:gap-3 flex-wrap  underline mb-2 sm:mb-0 sm:order-1"
                                onClick={() => {
                                  setWichContent(1)
                                  setShowModal(true)
                                }}                               >
                                J'accepte les{" "}
                                <span  onClick={() => {
                                setWichContent(1)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                Termes & Conditions
                              </span>
                              {" "}

                              et
                              {" "}

                              <span  onClick={() => {
                                setWichContent(2)
                                setShowModal(true)
                              }}     className="text-blue-600 cursor-pointer block">
                                politique de confidentialité
                              </span>
                              </div>
                            </div>
                          </div>
                          {errorMessage && (
                            <div className="error-message align-center text-red-600">
                              {errorMessage}
                            </div>
                          )}

                          {/* <div className="mt-2 gap-2    flex flex-row items-center">
                            <div className="flex flex-row itmes-center">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={formData.partagehorsPL === "Oui"}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      partagehorsPL: e.target.checked
                                        ? "Oui"
                                        : "Non",
                                    })
                                  }
                                />
                              </label>
                            </div>

                            <div className="md:w-auto w-[90%]">
                            <label className="tal1 underline cursor-pointer block mb-2 " 
                             onClick={() => {
                              setWichContent(2)
                              setShowModal(true)
                            }}>
                              {getTranslation(
                                `J'accept privacy & policy.`, // -----> Englais
                                `J'accept privacy & policy. `, //  -----> Francais
                                ``, //  -----> Turkey
                                `` //  -----> Allemagne
                              )}
                            </label>
                            </div>
                          </div> */}
                        </div>

                        {(emailError || loginError) && (
                          <div className="inline-block text-center text-white bg-orange-500 border-0.5 p-2 rounded">
                            {emailError && <p>{emailError}</p>}
                            {loginError && <p>{loginError}</p>}
                          </div>
                        )}

                        <div class="flex  md:gap-5 justify-between mt-8 w-full text-base font-medium text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="flex gap-2 justify-between px-8 py-2 bg-orange-500 rounded-[30px] max-md:px-5"
                          >
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9772a7a53b18b6a8d736b49ecb35ea60754bc1c1cb822d5108c85c04ca43d092?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="w-5 aspect-square"
                            />
                            <div className="grow text-white">
                              {" "}
                              &nbsp;&nbsp;Retour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                          </button>
                          <div className="tal2 flex gap-2 justify-between px-8 py-2 bg-blue-600 rounded-[30px] max-md:px-5">
                            <button type="submit" className="flex flex-row">
                              {" "}
                              <span className="px-2">
                                {getTranslation(
                                  `Submit`, // -----> Englais
                                  `Confirmer`, //  -----> Francais
                                  ``, //  -----> Turkey
                                  `` //  -----> Allemagne
                                )}
                              </span>{" "}
                              <svg
                                width={21}
                                height={16}
                                viewBox="0 0 21 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.92986 15.1094C6.34004 15.1096 5.77436 14.8752 5.35764 14.4578L0.6043 9.70618C0.0928374 9.19455 0.0928374 8.36521 0.6043 7.85358C1.11593 7.34212 1.94527 7.34212 2.4569 7.85358L6.92986 12.3265L18.7634 0.492972C19.2751 -0.0184907 20.1044 -0.0184907 20.616 0.492972C21.1275 1.0046 21.1275 1.83394 20.616 2.34557L8.50208 14.4578C8.08536 14.8752 7.51969 15.1096 6.92986 15.1094Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </form>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Terms and Conditions Modal"
          style={{
            overlay: {
              // Overlay styles
            },
            content: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
              padding: "20px",
              maxWidth: "1000px", // Adjust the maximum width as needed
            },
          }}
        >
          {/* Close button (X) */}
          <div
            className="text-4xl sm:text-2xl absolute top-2 right-6 text-red md:text-3xl cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </div>

          {/* Your modal content goes here */}
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-4 mt-4 sm:mb-8 lg:mb-12">
            This is your terms and conditions content. The Company is not
            responsible for the content of the Service's users. You expressly
            understand and agree that You are solely responsible for the Content
            and for all activity that occurs under your account, whether done so
            by You or any third person using Your account. You may not transmit
            any Content that is unlawful, offensive, upsetting, intended to
            disgust, threatening, libelous, defamatory, obscene or otherwise
            objectionable. Examples of such objectionable Content include, but
            are not limited to, the following: ● Unlawful or promoting unlawful
            activity. ● Defamatory, discriminatory, or mean-spirited content,
            including references or commentary about religion, race, sexual
            orientation, gender, national/ethnic origin, or other targeted
            groups. ● Spam, machine – or randomly – generated, constituting
            unauthorized or unsolicited advertising, chain letters, any other
            form of unauthorized solicitation, or any form of lottery or
            gambling. ● Containing or installing any viruses, worms, malware,
            trojan horses, or other content that is designed or intended to
            disrupt, damage, or limit the functioning of any software, hardware
            or telecommunications equipment or to damage or obtain unauthorized
            access to any data or other information of a third person. ●
            Infringing on any proprietary rights of any party, including patent,
            trademark, trade secret, copyright, right of publicity or other
            rights. ● Impersonating any person or entity including the Company
            and its employees or representatives. ● Violating the privacy of any
            third person. ● False information and features. The Company reserves
            the right, but not the obligation, to, in its sole discretion,
            determine whether or not any Content is appropriate and complies
            with this Terms, refuse or remove this Content. The Company further
            reserves the right to make formatting and edits and change the
            manner of any Content. The Company can also limit or revoke the use
            of the Service if You post such objectionable Content. As the
            Company cannot control all content posted by users and/or third
            parties on the Service, you agree to use the Service at your own
            risk. You understand that by using the Service You may be exposed to
            content that You may find offensive, indecent, incorrect or
            objectionable, and You agree that under no circumstances will the
            Company be liable in any way for any content, including any errors
            or omissions in any content, or any loss or damage of any kind
            incurred as a result of your use of any content. Content Backups
            Although regular backups of Content are performed, the Company does
            not guarantee there will be no loss or corruption of data. Corrupt
            or invalid backup points may be caused by, without limitation,
            Content that is corrupted prior to being backed up or that changes
            during the time a backup is performed. The Company will provide
            support and attempt to troubleshoot any known or discovered issues
            that may affect the backups of Content. But You acknowledge that the
            Company has no liability related to the integrity of Content or the
            failure to successfully restore Content to a usable state. You agree
            to maintain a complete and accurate copy of any Content in a
            location independent of the Service. Copyright Policy Intellectual
            Property Infringement We respect the intellectual property rights of
            others. It is Our policy to respond to any claim that Content posted
            on the Service infringes a copyright or other intellectual property
            infringement of any person. If You are a copyright owner, or
            authorized on behalf of one, and You believe that the copyrighted
            work has been copied in a way that constitutes copyright
            infringement that is taking place through the Service, You must
            submit Your notice in writing to the attention of our copyright
            agent via email ([COPYRIGHT_AGENT_CONTACT_EMAIL]) and include in
            Your notice a detailed description of the alleged infringement. You
            may be held accountable for damages (including costs and attorneys'
            fees) for misrepresenting that any Content is infringing Your
            copyright. DMCA Notice and DMCA Procedure for Copyright Infringement
            Claims You may submit a notification pursuant to the Digital
            Millennium Copyright Act (DMCA) by providing our Copyright Agent
            with the following information in writing (see 17 U.S.C 512(c)(3)
            for further detail): ● An electronic or physical signature of the
            person authorized to act on behalf of the owner of the copyright's
            interest. ● A description of the copyrighted work that You claim has
            been infringed, including the URL (i.e., web page address) of the
            location where the copyrighted work exists or a copy of the
            copyrighted work. ● Identification of the URL or other specific
            location on the Service where the material that You claim is
            infringing is located. ● Your address, telephone number, and email
            address. ● A statement by You that You have a good faith belief that
            the disputed use is not authorized by the copyright owner, its
            agent, or the law. ● A statement by You, made under penalty of
            perjury, that the above information in Your notice is accurate and
            that You are the copyright owner or authorized to act on the
            copyright owner's behalf
          </p>
        </Modal>
      </div>
    </Fragment>
  );
}

export default Register;
