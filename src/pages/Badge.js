import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Pagetitle from "../components/Pagetitle";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { Link, useNavigate, useParams } from "react-router-dom";

function Badge({ userpf }) {
  const [initialUsers, setInitialUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchNom, setSearchNom] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [searchSkills, setSearchSkills] = useState("");


  const [searchHeight, setSearchHeight] = useState("");
const [searchWeight, setSearchWeight] = useState("");
const [searchPiedFort, setSearchPiedFort] = useState("");
const [searchLicence, setSearchLicence] = useState("");
const [searchSexe, setSearchSexe] = useState("");
const [searchNationality, setSearchNationality] = useState("");
const [searchCountryResidence, setSearchCountryResidence] = useState("");

const navigate = useNavigate();

  useEffect(() => {

   




    const fetchUsers = async () => {
      try {
        const response = await fetch("https://odine-sport.com/api/players");
        const result = await response.json();

        setInitialUsers(result);
        setFilteredUsers(result); // Initially, show all users
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchUsers();
  }, []);


  const handleSearch = () => {
    const filtered = initialUsers.filter((user) => {
      const nomMatches = user.user.nom && user.user.nom.toLowerCase().includes(searchNom.toLowerCase());
      const prenomMatches = user.user.prenom && user.user.prenom.toLowerCase().includes(searchNom.toLowerCase());
      const positionMatches = user.positionPlay && user.positionPlay.toLowerCase().includes(searchPosition.toLowerCase());
      const skillsMatches = user.skillsInProfile && user.skillsInProfile.toLowerCase().includes(searchSkills.toLowerCase());
      const heightMatches = user.height && user.height.toLowerCase().includes(searchHeight.toLowerCase());
      const weightMatches = user.weight && user.weight.toLowerCase().includes(searchWeight.toLowerCase());
      const piedFortMatches = user.PiedFort && user.PiedFort.toLowerCase().includes(searchPiedFort.toLowerCase());
      const licenceMatches = user.Licence && user.Licence.toLowerCase().includes(searchLicence.toLowerCase());
      const sexeMatches = user.user.gender && user.user.gender.toLowerCase().includes(searchSexe.toLowerCase());
      const nationalityMatches = user.user.nationality && user.user.nationality.toLowerCase().includes(searchNationality.toLowerCase());
      const countryResidenceMatches = user.user.countryresidence && user.user.countryresidence.toLowerCase().includes(searchCountryResidence.toLowerCase());
  
      return (
        (nomMatches || prenomMatches) &&
        positionMatches &&
        skillsMatches &&
        heightMatches &&
        weightMatches &&
        piedFortMatches &&
        licenceMatches &&
        sexeMatches &&
        nationalityMatches &&
        countryResidenceMatches
      );
    });
  
    setFilteredUsers(filtered);
  };
  const handleReset = () => {
    setSearchNom("");
    setSearchPosition("");
    setSearchSkills("");
    setSearchHeight("");
    setSearchWeight("");
    setSearchPiedFort("");
    setSearchLicence("");
    setSearchSexe("");
    setSearchNationality("");
    setSearchCountryResidence("");
    setFilteredUsers(initialUsers);
  };
  

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />
      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <Pagetitle title="Joueur Filter et Recherche" />
               


                <div class="flex flex-wrap mb-2">
                <div class="flex items-center mb-2 p-2">
    <input
      class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
      type="text"
      placeholder=" nom  ou  prenom"
      value={searchNom}
      onChange={(e) => setSearchNom(e.target.value)}
    />
  </div>

  <div class="flex items-center mb-2 p-2">
    <select
        class="form-control  text-black mb-0 bg-greylight theme-dark-bg border-0"
        value={searchPosition}
        onChange={(e) => setSearchPosition(e.target.value)}
    >
        <option value="" disabled> postion</option>
        <option value="Gardien de but">Gardien de but (GK)</option>
        <option value="Arrière droit">Arrière droit (RB)</option>
        <option value="Arrière gauche">Arrière gauche( LB)</option>
        <option value="Défenseur central">Défenseur central (CB)</option>
        <option value="Milieu défensif">Milieu défensif (CDM)</option>
        <option value="Milieu central">Milieu central ( CM)</option>
        <option value="Milieu offensif">Milieu offensif ( CAM)</option>
        <option value="Ailier droit">Ailier droit (RW)</option>
        <option value="Ailier gauche">Ailier gauche ( LW)</option>
        <option value="Avant-centre">Avant-centre ( ST)</option>
    </select>
</div>


<div class="flex items-center mb-2 p-2">
    <select
        class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
        value={searchSkills}
        onChange={(e) => setSearchSkills(e.target.value)}
    >
        <option value="" disabled> Caraecterstiques</option>
        <option value="Rapidite">Rapidite</option>
        <option value="Tacle">Tacle</option>
        <option value="Defence">Defence</option>
        <option value="Tirs de loin">Tirs de loin</option>
        <option value="jeu en une touche">jeu en une touche</option>
        <option value="Rapidite de la prise de décision">Rapidite de la prise de décision</option>
        <option value="Frappe puissante">Frappe puissante</option>
        <option value="Agilité">Agilité</option>
        <option value="Controller du Ballon">Controller du Ballon</option>
        <option value="Dribble">Dribble</option>
        <option value="Exploitation de l'espace">Exploitation de l'espace</option>
        <option value="Evaluation des risques sur les terrain">Evaluation des risques sur les terrain</option>
        <option value="Endurance">Endurance</option>
        <option value="Equilibre et Coordination">Equilibre et Coordination</option>
        <option value="Auto-Motivation">Auto-Motivation</option>
    </select>
</div>

<div class="flex items-center mb-2 p-2">
    <input
      class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
      type="number"
      placeholder="Taille en CM"
      value={searchHeight}
      onChange={(e) => setSearchHeight(e.target.value)}
    />
  </div>

  <div class="flex items-center mb-2 p-2">
    <input
      class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
      type="number"
      placeholder="Poid en kg"
      value={searchWeight}
      onChange={(e) => setSearchWeight(e.target.value)}
    />
  </div>

  <div class="flex items-center mb-2 p-2">
  <select
    class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
    value={searchPiedFort}
    onChange={(e) => setSearchPiedFort(e.target.value)}
  >
    <option value="" disabled> Pied Forte</option>
    <option value="PiedGauche">Pied Gauche</option>
    <option value="PiedDroit">Pied Droit</option>
    <option value="DeuxPieds">Les deux pieds</option>
  </select>
</div>


  {/* <div class="flex items-center mb-2 p-2">
    <select
      class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
      value={searchLicence}
      onChange={(e) => setSearchLicence(e.target.value)}
    >
      <option value="" disabled>recherche avec Licence</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
    </select>
  </div> */}



  <div class="flex items-center mb-2 p-2">
  <select
    class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
    value={searchSexe}
    onChange={(e) => setSearchSexe(e.target.value)}
  >
    <option value="">Sexe</option>
    <option value="male">Homme</option>
    <option value="female">Femme</option>
  </select>
</div>


<div class="flex items-center mb-2 p-2">
  <select
    class="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
    value={searchNationality}
    onChange={(e) => setSearchNationality(e.target.value)}
  >
    <option value="" disabled selected>Nationalitée</option>
    
    <option value="afghane">Afghanistan</option>
    <option value="sudafricaine">Afrique du Sud</option>
    <option value="albanaise">Albanie</option>
    <option value="algérienne">Algérie</option>
    <option value="allemande">Allemagne</option>
    <option value="andorrane">Andorre</option>
    <option value="angolaise">Angola</option>
    <option value="antiguayenne">Antigua-et-Barbuda</option>
    <option value="saoudienne">Arabie saoudite</option>
    <option value="argentine">Argentine</option>
    <option value="arménienne">Arménie</option>
    <option value="australienne">Australie</option>
    <option value="autrichienne">Autriche</option>
    <option value="azerbaïdjanaise">Azerbaïdjan</option>
    <option value="bahaméenne">Bahamas</option>
    <option value="bahreïnienne">Bahreïn</option>
    <option value="bangladaise">Bangladesh</option>
    <option value="barbadienne">Barbade</option>
    <option value="belge">Belgique</option>
    <option value="bélizienne">Belize</option>
    <option value="bhoutanaise">Bhoutan</option>
    <option value="birmane">Birmanie</option>
    <option value="biélorusse">Biélorussie</option>
    <option value="bolivienne">Bolivie</option>
    <option value="bosnienne">Bosnie-Herzégovine</option>
    <option value="botswanaise">Botswana</option>
    <option value="brunéienne">Brunei</option>
    <option value="brésilienne">Brésil</option>
    <option value="bulgare">Bulgarie</option>
    <option value="burkinabé">Burkina</option>
    <option value="burundaise">Burundi</option>
    <option value="béninoise">Bénin</option>
    <option value="cambodgienne">Cambodge</option>
    <option value="camerounaise">Cameroun</option>
    <option value="canadienne">Canada</option>
    <option value="cap-verdienne">Cap-Vert</option>
    <option value="centrafricaine">Centrafrique</option>
    <option value="chilienne">Chili</option>
    <option value="chinoise">Chine</option>
    <option value="chypriote">Chypre</option>
    <option value="colombienne">Colombie</option>
    <option value="comorienne">Comores</option>
    <option value="congolaise">Congo</option>
    <option value="nord-coréenne">Corée du Nord</option>
    <option value="sud-coréenne">Corée du Sud</option>
    <option value="costaricienne">Costa Rica</option>
    <option value="croate">Croatie</option>
    <option value="cubaine">Cuba</option>
    <option value="ivoirienne">Côte d'Ivoire</option>
    <option value="danoise">Danemark</option>
    <option value="djiboutienne">Djibouti</option>
    <option value="dominiquaise">Dominique</option>
    <option value="egyptienne">Egypte</option>
    <option value="emirienne">Emirats arabes unis</option>
    <option value="equatorienne">Equateur</option>
    <option value="erythréenne">Erythrée</option>
    <option value="espagnole">Espagne</option>
    <option value="estonienne">Estonie</option>
    <option value="américaine">Etats-Unis</option>
    <option value="ethiopienne">Ethiopie</option>
    <option value="fidjienne">Fidji</option>
    <option value="finlandaise">Finlande</option>
    <option value="française">France</option>
    <option value="gabonaise">Gabon</option>
    <option value="gambienne">Gambie</option>
    <option value="ghanéenne">Ghana</option>
    <option value="grenadienne">Grenade</option>
    <option value="grecque">Grèce</option>
    <option value="guatémaltèque">Guatemala</option>
    <option value="guinéenne">Guinée</option>
    <option value="equatoguinéenne">Guinée équatoriale</option>
    <option value="bissaoguinéenne">Guinée-Bissao</option>
    <option value="guyanienne">Guyana</option>
    <option value="géorgienne">Géorgie</option>
    <option value="haïtienne">Haïti</option>
    <option value="hondurienne">Honduras</option>
    <option value="hongroise">Hongrie</option>
    <option value="indienne">Inde</option>
    <option value="indonésienne">Indonésie</option>
    <option value="irakienne">Irak</option>
    <option value="iranienne">Iran</option>
    <option value="irlandaise">Irlande</option>
    <option value="islandaise">Islande</option>
    <option value="israélienne">Israël</option>
    <option value="italienne">Italie</option>
    <option value="jamaïquaine">Jamaïque</option>
    <option value="japonaise">Japon</option>
    <option value="jordanienne">Jordanie</option>
    <option value="palestinienne">Jérusalem - Territoires palestiniens</option>
    <option value="kazakhstanais">Kazakhstan</option>
    <option value="kényane">Kenya</option>
    <option value="kirghize">Kirghizistan</option>
    <option value="kiribatienne">Kiribati</option>
    <option value="kuwaitienne">Koweït</option>
    <option value="laotienne">Laos</option>
    <option value="lesothane">Lesotho</option>
    <option value="lettone">Lettonie</option>
    <option value="libanaise">Liban</option>
    <option value="libérienne">Libéria</option>
    <option value="libyenne">Libye</option>
    <option value="liechtensteinoise">Liechtenstein</option>
    <option value="lituanienne">Lituanie</option>
    <option value="luxembourgeoise">Luxembourg</option>
    <option value="macédonienne">Macédoine</option>
    <option value="malgache">Madagascar</option>
    <option value="malaisienne">Malaisie</option>
    <option value="malawienne">Malawi</option>
    <option value="maldivienne">Maldives</option>
    <option value="malienne">Mali</option>
    <option value="maltaise">Malte</option>
    <option value="marocaine">Maroc</option>
    <option value="marshallaise">Marshall</option>
    <option value="mauricienne">Maurice</option>
    <option value="mauritanienne">Mauritanie</option>
    <option value="mexicaine">Mexique</option>
    <option value="micronésienne">Micronésie</option>
    <option value="moldave">Moldavie</option>
    <option value="monégasque">Monaco</option>
    <option value="mongole">Mongolie</option>
    <option value="monténégrine">Monténégro</option>
    <option value="mozambicaine">Mozambique</option>
    <option value="namibienne">Namibie</option>
    <option value="nauruane">Nauru</option>
    <option value="nepalaise">Népal</option>
    <option value="nicaraguayenne">Nicaragua</option>
    <option value="nigériane">Niger</option>
    <option value="nigérienne">Nigeria</option>
    <option value="niuéenne">Niue</option>
    <option value="norvégienne">Norvège</option>
    <option value="néo-zélandaise">Nouvelle-Zélande</option>
    <option value="omanaise">Oman</option>
    <option value="ougandaise">Ouganda</option>
    <option value="ouzbek">Ouzbékistan</option>
    <option value="pakistanaise">Pakistan</option>
    <option value="palauane">Palaos</option>
    <option value="panaméenne">Panama</option>
    <option value="papouane">Papouasie - Nouvelle Guinée</option>
    <option value="paraguayenne">Paraguay</option>
    <option value="néerlandaise">Pays-Bas</option>
    <option value="péruvienne">Pérou</option>
    <option value="philippine">Philippines</option>
    <option value="polonaise">Pologne</option>
    <option value="portugaise">Portugal</option>
    <option value="qatarienne">Qatar</option>
    <option value="roumaine">Roumanie</option>
    <option value="russe">Russie</option>
    <option value="rwandaise">Rwanda</option>
    <option value="dominicaine">République dominicaine</option>
    <option value="congolaise_RDC">République démocratique du Congo</option>
    <option value="tchèque">République tchèque</option>
    <option value="christophienne">Saint-Christophe-et-Niévès</option>
    <option value="marinaise">Saint-Marin</option>
    <option value="saint-siege">Saint-Siège</option>
    <option value="vincentaise">Saint-Vincent-et-les Grenadines</option>
    <option value="lucienne">Sainte-Lucie</option>
    <option value="salomonaise">Salomon</option>
    <option value="salvadorienne">Salvador</option>
    <option value="samoene">Samoa</option>
    <option value="santoméenne">Sao Tomé-et-Principe</option>
    <option value="serbe">Serbie</option>
    <option value="seychelloise">Seychelles</option>
    <option value="sierraléonaise">Sierra Leone</option>
    <option value="singapourienne">Singapour</option>
    <option value="slovaque">Slovaquie</option>
    <option value="slovène">Slovénie</option>
    <option value="somalienne">Somalie</option>
    <option value="soudanaise">Soudan</option>
    <option value="srilankaise">Sri Lanka</option>
    <option value="suisse">Suisse</option>
    <option value="surinamaise">Suriname</option>
    <option value="suédoise">Suède</option>
    <option value="swazie">Swaziland</option>
    <option value="syrienne">Syrie</option>
    <option value="sénégalaise">Sénégal</option>
    <option value="tadjike">Tadjikistan</option>
    <option value="tanzanienne">Tanzanie</option>
    <option value="taïwanaise">Taïwan</option>
    <option value="tchadienne">Tchad</option>
    <option value="thaïlandaise">Thaïlande</option>
    <option value="timoraise">Timor oriental</option>
    <option value="togolaise">Togo</option>
    <option value="tongienne">Tonga</option>
    <option value="trinidadienne">Trinité-et-Tobago</option>
    <option value="tunisienne">Tunisie</option>
    <option value="turkmène">Turkménistan</option>
    <option value="turque">Turquie</option>
    <option value="tuvaluane">Tuvalu</option>
    <option value="ukrainienne">Ukraine</option>
    <option value="uruguayenne">Uruguay</option>
    <option value="vanuataise">Vanuatu</option>
    <option value="vénézuélienne">Venezuela</option>
    <option value="vietnamienne">Viêt Nam</option>
    <option value="yéménite">Yémen</option>
    <option value="zambienne">Zambie</option>
    <option value="zimbabwéenne">Zimbabwe</option>
  </select>
</div>

<div class="flex items-center mb-2 p-2">

<select
  className="form-control text-black mb-0 bg-greylight theme-dark-bg border-0"
  value={searchCountryResidence}
  onChange={(e) => setSearchCountryResidence(e.target.value)}
>
  <option value="" disabled selected>Pays residence</option>
  <option value="Afghanistan">Afghanistan</option>
  <option value="Afrique du Sud">Afrique du Sud</option>
  <option value="Albanie">Albanie</option>
  <option value="Algérie">Algérie</option>
  <option value="Allemagne">Allemagne</option>
  <option value="Andorre">Andorre</option>
  <option value="Angola">Angola</option>
  <option value="Antigua-et-Barbuda">Antigua-et-Barbuda</option>
  <option value="Arabie saoudite">Arabie saoudite</option>
  <option value="Argentine">Argentine</option>
  <option value="Arménie">Arménie</option>
  <option value="Australie">Australie</option>
  <option value="Autriche">Autriche</option>
  <option value="Azerbaïdjan">Azerbaïdjan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahreïn">Bahreïn</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbade">Barbade</option>
  <option value="Belgique">Belgique</option>
  <option value="Belize">Belize</option>
  <option value="Bhoutan">Bhoutan</option>
  <option value="Birmanie">Birmanie</option>
  <option value="Biélorussie">Biélorussie</option>
  <option value="Bolivie">Bolivie</option>
  <option value="Bosnie-Herzégovine">Bosnie-Herzégovine</option>
  <option value="Botswana">Botswana</option>
  <option value="Brunei">Brunei</option>
  <option value="Brésil">Brésil</option>
  <option value="Bulgarie">Bulgarie</option>
  <option value="Burkina">Burkina</option>
  <option value="Burundi">Burundi</option>
  <option value="Bénin">Bénin</option>
  <option value="Cambodge">Cambodge</option>
  <option value="Cameroun">Cameroun</option>
  <option value="Canada">Canada</option>
  <option value="Cap-Vert">Cap-Vert</option>
  <option value="Centrafrique">Centrafrique</option>
  <option value="Chili">Chili</option>
  <option value="Chine">Chine</option>
  <option value="Chypre">Chypre</option>
  <option value="Colombie">Colombie</option>
  <option value="Comores">Comores</option>
  <option value="Congo">Congo</option>
  <option value="Corée du Nord">Corée du Nord</option>
  <option value="Corée du Sud">Corée du Sud</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Croatie">Croatie</option>
  <option value="Cuba">Cuba</option>
  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
  <option value="Danemark">Danemark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominique">Dominique</option>
  <option value="Egypte">Egypte</option>
  <option value="Emirats arabes unis">Emirats arabes unis</option>
  <option value="Equateur">Equateur</option>
  <option value="Erythrée">Erythrée</option>
  <option value="Espagne">Espagne</option>
  <option value="Estonie">Estonie</option>
  <option value="Etats-Unis">Etats-Unis</option>
  <option value="Ethiopie">Ethiopie</option>
  <option value="Fidji">Fidji</option>
  <option value="Finlande">Finlande</option>
  <option value="France">France</option>
  <option value="Gabon">Gabon</option>
  <option value="Gambie">Gambie</option>
  <option value="Ghana">Ghana</option>
  <option value="Grenade">Grenade</option>
  <option value="Grèce">Grèce</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guinée">Guinée</option>
  <option value="Guinée équatoriale">Guinée équatoriale</option>
  <option value="Guinée-Bissao">Guinée-Bissao</option>
  <option value="Guyana">Guyana</option>
  <option value="Géorgie">Géorgie</option>
  <option value="Haïti">Haïti</option>
  <option value="Honduras">Honduras</option>
  <option value="Hongrie">Hongrie</option>
  <option value="Inde">Inde</option>
  <option value="Indonésie">Indonésie</option>
  <option value="Irak">Irak</option>
  <option value="Iran">Iran</option>
  <option value="Irlande">Irlande</option>
  <option value="Islande">Islande</option>
  <option value="Italie">Italie</option>
  <option value="Jamaïque">Jamaïque</option>
  <option value="Japon">Japon</option>
  <option value="Jordanie">Jordanie</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kirghizistan">Kirghizistan</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Koweït">Koweït</option>
  <option value="Laos">Laos</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Lettonie">Lettonie</option>
  <option value="Liban">Liban</option>
  <option value="Liberia">Liberia</option>
  <option value="Libye">Libye</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lituanie">Lituanie</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Macao">Macao</option>
  <option value="Macedoine">Macedoine</option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malaisie">Malaisie</option>
  <option value="Malawi">Malawi</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malte">Malte</option>
  <option value="Maroc">Maroc</option>
  <option value="Marshall">Marshall</option>
  <option value="Maurice">Maurice</option>
  <option value="Mauritanie">Mauritanie</option>
  <option value="Mexique">Mexique</option>
  <option value="Micronesie">Micronesie</option>
  <option value="Moldavie">Moldavie</option>
  <option value="Monaco">Monaco</option>
  <option value="Mongolie">Mongolie</option>
  <option value="Montenegro">Montenegro</option>
  <option value="Mozambique">Mozambique</option>
  <option value="Namibie">Namibie</option>
  <option value="Nauru">Nauru</option>
  <option value="Nepal">Nepal</option>
  <option value="Nicaragua">Nicaragua</option>
  <option value="Niger">Niger</option>
  <option value="Nigeria">Nigeria</option>
  <option value="Niue">Niue</option>
  <option value="Norvège">Norvège</option>
  <option value="Nouvelle-Zelande">Nouvelle-Zelande</option>
  <option value="Oman">Oman</option>
  <option value="Ouganda">Ouganda</option>
  <option value="Ouzbekistan">Ouzbekistan</option>
  <option value="Pakistan">Pakistan</option>
  <option value="Palaos">Palaos</option>
  <option value="Palestine">Palestine</option>
  <option value="Panama">Panama</option>
  <option value="Papouasie-Nouvelle-Guinee">Papouasie-Nouvelle-Guinee</option>
  <option value="Paraguay">Paraguay</option>
  <option value="Pays-Bas">Pays-Bas</option>
  <option value="Perou">Perou</option>
  <option value="Philippines">Philippines</option>
  <option value="Pologne">Pologne</option>
  <option value="Portugal">Portugal</option>
  <option value="Qatar">Qatar</option>
  <option value="Roumanie">Roumanie</option>
  <option value="Royaume-Uni">Royaume-Uni</option>
  <option value="Russie">Russie</option>
  <option value="Rwanda">Rwanda</option>
  <option value="Sahara Occidental">Sahara Occidental</option>
  <option value="Saint-Christophe-et-Nieves">Saint-Christophe-et-Nieves</option>
  <option value="Saint-Marin">Saint-Marin</option>
  <option value="Saint-Vincent-et-les Grenadines">Saint-Vincent-et-les Grenadines</option>
  <option value="Sainte-Lucie">Sainte-Lucie</option>
  <option value="Salomon">Salomon</option>
  <option value="Samoa">Samoa</option>
  <option value="Sao Tomé-et-Principe">Sao Tomé-et-Principe</option>
  <option value="Serbie">Serbie</option>
  <option value="Seychelles">Seychelles</option>
  <option value="Sierra Leone">Sierra Leone</option>
  <option value="Singapour">Singapour</option>
  <option value="Slovaquie">Slovaquie</option>
  <option value="Slovénie">Slovénie</option>
  <option value="Somalie">Somalie</option>
  <option value="Soudan">Soudan</option>
  <option value="Sri Lanka">Sri Lanka</option>
  <option value="Suede">Suede</option>
  <option value="Suisse">Suisse</option>
  <option value="Suriname">Suriname</option>
  <option value="Swaziland">Swaziland</option>
  <option value="Syrie">Syrie</option>
  <option value="Sénégal">Sénégal</option>
  <option value="Tadjikistan">Tadjikistan</option>
  <option value="Tanzanie">Tanzanie</option>
  <option value="Taïwan">Taïwan</option>
  <option value="Tchad">Tchad</option>
  <option value="Thailande">Thailande</option>
  <option value="Togo">Togo</option>
  <option value="Tonga">Tonga</option>
  <option value="Trinite-et-Tobago">Trinite-et-Tobago</option>
  <option value="Tunisie">Tunisie</option>
  <option value="Turkmenistan">Turkmenistan</option>
  <option value="Turquie">Turquie</option>
  <option value="Tuvalu">Tuvalu</option>
  <option value="Ukraine">Ukraine</option>
  <option value="Uruguay">Uruguay</option>
  <option value="Vanuatu">Vanuatu</option>
  <option value="Vatican">Vatican</option>
  <option value="Venezuela">Venezuela</option>
  <option value="Vietnam">Vietnam</option>
  <option value="Yemen">Yemen</option>
  <option value="Zambie">Zambie</option>
  <option value="Zimbabwe">Zimbabwe</option>
</select>

</div>

    

</div>

<div class="flex justify-end space-x-4 mb-2">
    <button class="bg-blue-500 text-white px-4 py-2 rounded sm:w-full md:w-auto" onClick={handleSearch}>recherche</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded sm:w-full md:w-auto" onClick={handleReset}>réinstaller</button>
</div>


                <div className="row ps-2 pe-1">
                  {filteredUsers.map((user, index) => (
                    <div key={index} className="col-md-4 col-sm-6 pe-2 ps-2">
                      <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                        <div className="card-body d-block w-100 p-4 text-center">
                          <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                            <img
                              src={user.user.image}
                              alt="avatar"
                              className="float-right p-1 bg-white rounded-circle w-100"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-700 font-xss mt-3 mb-0">
                            {user.user.prenom} {user.user.nom}
                          </h4>
                          <p className="fw-500 font-xssss text-black mt-0 mb-3">
                            {user.user.nationality}
                          </p>
                          <p className="fw-500 font-xssss text-black mt-0 mb-3">
                           Sexe : {user.user.gender}
                          </p>
                          <p className="fw-500 font-xssss text-black mt-0 mb-3">
                            Position: {user.positionPlay}
                          </p>
                          <p className="fw-500 font-xssss text-black mt-0 mb-3">
                            Pied Fort : {user.PiedFort}
                          </p>
                          <p className="fw-500 font-xssss text-black mt-0 mb-3">
                            Competences Technique: {user.skillsInProfile}
                          </p>
                          {/* <p className="fw-500 font-xssss text-black mt-0 mb-3">
                            WhatsApp Number: {user.NumeroWhatsup}
                          </p> */}
                         <Link
    to={`/PlayerInfo/${user.user.id}`}
    className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
    onClick={() => navigate(`/PlayerInfo/${user.user.id}`)}
>
    voir profil
</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ... (other components) */}
    </Fragment>
  );
}

export default Badge;
