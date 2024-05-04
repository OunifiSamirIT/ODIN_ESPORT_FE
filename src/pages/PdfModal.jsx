import React, { useState } from "react";
import close from "../assets/close(2).png";

export default function PdfModal({
  wichContent = 1,
  showModal = false,
  setShowModal,
}) {
  let Conditions = {
    title: "CONDITIONS GÉNÉRALES D’UTILISATION (« CGU »)",
    content: `                   
    DE LA PLATEFORME « ODIN SPORT »
    Préambule
    En utilisant les Services Odin Sport, vous acceptez l’intégralité des présentes Conditions Générales
    d’Utilisation. Votre utilisation des Services Odin Sport est également soumise à notre Politique de
    confidentialité [ https://www.odinesport.com/politique_confidentialité/ ], qui explique nos méthodes en
    matière de collecte, d’utilisation, de partage, et de stockage de vos informations personnelles. Veuillez lire
    attentivement les Conditions Générales d’Utilisation suivantes avant d’utiliser les Services Odin Sport.
    Les présentes Conditions Générales d’Utilisation s’appliquent à toute utilisation des Services Odin Sport.
    Vous reconnaissez qu’en vous inscrivant à nos Services, en les utilisant ou simplement en y accédant,
    vous acceptez de conclure un contrat qui vous engage légalement avec Odin Sport (le “Contrat”). Si vous
    vous inscrivez en tant qu’entreprise, association ou tout autre entité juridique, vous déclarez et
    garantissez que vous êtes autorisé à lier cette entité aux Conditions Générales d’Utilisation. Le présent
    Contrat s’applique à [ odinesport.com ] , aux Services Odin Sport, à la Plateforme, aux applications de la
    marque Odin Sport, ainsi qu’aux autres sites, applications, communications et services en lien avec Odin
    Sport proposés en vertu du présent Contrat.
    1. Définitions
    “Odin Sport” désigne la société ODIN INTERNATIONAL SERVICES AND CONSULTING, société à
    responsabilité ayant son siège social sis au 000, ARIANA CENTRE A221 , ARIANA , 2080 ayant
    Identifiant Unique N 1765065B et ce pour les utilisateurs de toutes localisations géographiques.
    “Utilisateur” désigne une personne physique ou morale s’étant inscrite ou ayant recours à l’un des
    Services en tant que joueur, entraîneur, club, agent, staff technique, recruteur ou tout autre entité
    similaire, en ce compris les Partenaires.
    “Services” désigne l’ensemble des services accessibles aux Utilisateurs et aux Partenaires sur la
    Plateforme, sur le site odinsport.com ainsi qu’au travers des applications développées par Odin Sport.
    Une description des Services figure à l’article 2 des présentes Conditions Générales d’Utilisation.
    "Droits de Propriété Intellectuelle" désigne les droits d'auteur, brevets, modèles, dessins, marques,
    noms commerciaux, secrets commerciaux, savoir-faire et toute autre forme de propriété intellectuelle.
    “Partenaire” désigne une personne physique ou morale utilisant les Services en tant que sponsor,
    annonceur ou intermédiaire proposant un service aux autres Utilisateurs de la Plateforme et/ou des
    Services.
    “Plateforme” désigne la plateforme développée selon les formats informatiques utilisables sur l’Internet
    comprenant, outre les Services tels que définis par ailleurs, des données de différentes natures, et
    notamment des textes, sons, images fixes ou animées, vidéos, bases de données, destinées à être
    consultées et/ ou utilisées par les Utilisateurs.
    “Contenu d’utilisateur” désigne tout contenu posté par un Utilisateur ou rendu disponible par le biais des
    Services par un Utilisateur.
    “Conditions Générales d’Utilisation” désigne les présentes conditions générales d’utilisations qui
    s’appliquent à toute personne physique ou morale s’inscrivant aux Services, en les utilisant ou
    simplement en y accédant.
    En utilisant ou simplement en accédant aux Services et/ou à la Plateforme Odin Sport, l'Utilisateur
    déclare accepter sans réserve les présentes Conditions Générales d’Utilisation. Il déclare et reconnait, en
    conséquence, avoir lu et compris les stipulations des présentes Conditions Générales d’Utilisation. À tout
    moment, si un Utilisateur est en désaccord avec l’une des stipulations des Conditions Générales
    d’Utilisation, il doit immédiatement mettre fin à l’utilisation de la Plateforme et des Services associés.
    Les présentes Conditions Générales d’Utilisation définissent le cadre légal de l’utilisation de la Plateforme
    et/ou des Services par les Utilisateurs et les relations pouvant s’établir entre Odin Sport et les Utilisateurs.
    Les présentes Conditions Générales d’Utilisation contiennent également des informations relatives aux
    droits des Utilisateurs et aux restrictions imposées à ces droits.
    Les présentes Conditions Générales d’Utilisation constituent l'intégralité de l'accord entre l'Utilisateur et
    Odin Sport en ce qui concerne l'utilisation de la Plateforme et des Services, à l’exception de la Politique
    de confidentialité. L'Utilisateur reconnaît qu'il peut être sujet à des conditions supplémentaires applicables
    lorsqu'il utilise ou achète certains services, contenus ou logiciels tiers. Les présentes Conditions
    Générales d’Utilisation sont applicables pendant toute la durée d’utilisation de la Plateforme et/ou des
    Services.
    La dernière version des Conditions Générales d’Utilisation disponible en ligne prévaudra, le cas échéant,
    sur toute autre version des présentes Conditions Générales d’Utilisation.
    2. Description des Services
    Odin Sport agit en tant qu’intermédiaire entre les Utilisateurs et fournit une Plateforme sur laquelle les
    Utilisateurs peuvent mettre à jour leurs informations personnelles ainsi qu’interagir avec la communauté
    d’Utilisateurs. Odin Sport met à la disposition de ses Utilisateurs un espace de dialogue leur permettant
    de prendre contact et de communiquer avec un autre Utilisateur.
    Odin Sport n’est qu’un prestataire technique et ne saurait à ce titre prendre part à la conclusion de tout
    éventuel contrat liant les Utilisateurs entre eux.
    A ce titre, l’Utilisateur reconnait expressément que Odin Sport ne peut être responsable du refus soudain
    d’un autre Utilisateur de signer un contrat ou simplement qu’un Utilisateur refuse d’accepter une mise en
    relation avec autre Utilisateur.
    Les Utilisateurs fournissent les informations concernant des offres exclusives, informations, et contenu
    par l’intermédiaire des Services Odin Sport, incluant également les informations concernant les
    performances des joueurs.
    3. Compte d’Utilisateur
    Afin de profiter pleinement des outils et des Services de la Plateforme Odin Sport, une inscription à la
    Plateforme est obligatoire au travers de la création d’un compte Utilisateur (le “Compte d’Utilisateur”).
    Dans le cadre de la création de ce Compte d’Utilisateur, Odin Sport se réserve le droit de demander une
    pièce d’identité dans les cas suivants : lorsque le Compte d’Utilisateur correspondant au profil « joueur »
    déjà existant sur la Plateforme, lorsque l’Utilisateur souhaite créer un Compte d’Utilisateur « vérifié » ou
    lorsque l’Utilisateur souhaite souscrire à l’abonnements « Premium ». L’accès aux profils des Utilisateurs
    de la Plateforme ne nécessite toutefois pas la création d’un Compte d’Utilisateur.
    Dans le cadre de la création de son Compte d’Utilisateur, l’Utilisateur devra suivre les instructions
    d’inscription telles présentées sur les Services Odin Sport. L'Utilisateur veillera à ce que les informations
    d'identification de ce Compte d'Utilisateur et les informations équivalentes requises pour accéder à ce
    Compte d'Utilisateur soient gardées confidentielles et utilisées de manière sécurisée et non accessible
    par des tiers. Un Utilisateur ne peut avoir qu'un seul Compte d’Utilisateur. Odin Sport se réserve le droit
    d’accepter ou de refuser toute nouvelle création d’un Compte d’Utilisateur sur la Plateforme et ce sans
    recours possible de la part de l’Utilisateur concerné.
    A. Création d’un Compte Joueur
    En créant un « Compte Joueur », un Utilisateur ayant la qualité de joueur (un “Joueur”) pourra accéder
    aux services spécifiques de consultation d’annonces (publication d’annonces, candidatures à des
    annonces, contact avec les autres Utilisateurs dans le cas d'envoyer une demande d’invitation de mise
    en relation et qu’elle sera accepter dans ce cas un autre membre se connecte avec vous alors vous
    aurez l’avantage de la visibilité de son numéro WhatsApp et son numéro de téléphone En revanche, il a
    également le même droit , etc..) proposés par la Plateforme.
    B. Création d’un Compte Manager de Club
    En créant un « Compte Manager de Club », un Utilisateur ayant la qualité de représentant d’un club de
    football (un “Représentant du Club”) garantit qu’il protégera les renseignements relatifs à son Compte
    Club et sera entièrement responsable de toute utilisation de son compte par lui-même ou par un tiers.
    Une fois son Compte Club créé et afin de créer sa page Club lui permettant d’accéder aux services
    spécifiques de consultation d’annonces (publication d’annonces, candidatures à des annonces, contact
    avec les autres Utilisateurs dans le cas d'envoyer une demande d’invitation de mise en relation et qu’elle
    sera acceptée dans ce cas un autre membre se connecte avec vous alors vous aurez l’avantage de la
    visibilité de son numéro WhatsApp et son numéro de téléphone En revanche, etc.) proposés par la
    Plateforme, le Représentant du Club devra fournir les informations suivantes :
    - Copie de sa pièce d’identité en cours de validité,
    - Copie d’un document officiel stipulant sa position au sein du Club.
    Une fois l'inscription validée par Odin Sport, le Représentant du Club sera habilité à accéder à sa page
    Club ainsi qu’aux Services spécifiques y attachés.
    Le Représentant du Club doit accepter les Conditions Générales d'Utilisation au nom et pour le compte
    du Club qu’il représente. Le Club est par conséquent lié par les présentes Conditions Générales
    d’Utilisation.
    Après avoir accepté les Conditions Générales d’Utilisation, le Club pourra activer sa communauté
    d’entraîneurs, de joueurs et d’équipes, et les encourager à rejoindre les Services Odin Sport.
    C. Création d’un Compte Entraîneur
    En créant un « Compte Entraîneur », un Utilisateur ayant la qualité d’entraîneur (un “Entraîneur”) garantit
    qu’il protégera les renseignements relatifs à son Compte Entraîneur et sera entièrement responsable de
    toute utilisation de son compte par lui-même ou par un tiers.
    Une fois le Compte Entraîneur créé et afin d’accéder aux services spécifiques de consultation
    d’Annonces (publication d’annonces, candidatures à des annonces, contact avec les autres Utilisateurs
    dans le cas d'envoyer une demande d’invitation de mise en relation et qu’elle sera acceptée dans ce cas
    un autre membre se connecte avec vous alors vous aurez l’avantage de la visibilité de son numéro
    WhatsApp et son numéro de téléphone En revanche, etc..) proposés par la Plateforme, l’Entraîneur devra
    fournir les informations suivantes :
    - Copie de sa pièce d’identité en cours de validité,
    - Copie de sa licence d’entraîneur.
    D. Création d’un Compte Agent
    En créant un « Compte Agent », l'utilisateur ayant la qualité d’agent (un “Agent”) garantit qu’il protégera
    les renseignements relatifs à son Compte Agent et sera entièrement responsable de toute utilisation de
    son compte par lui-même ou par un tiers.
    Une fois son Compte Agent créé et afin d’accéder aux services spécifiques de consultation d’Annonces
    (publication d’annonces, candidatures à des annonces, contact avec les autres Utilisateurs dans le cas
    d'envoyer une demande d’invitation de mise en relation et qu’elle sera acceptée dans ce cas un autre
    membre se connecte avec vous alors vous aurez l’avantage de la visibilité de son numéro WhatsApp et
    son numéro de téléphone En revanche, etc..) proposés par la Plateforme, l’Agent devra fournir les
    informations suivantes :
    - Copie de sa pièce d’identité en cours de validité,
    - Copie de sa licence d’agent.
    E. Conditions d’utilisation
    S’il existe un soupçon qu'une personne non autorisée a pris connaissance des informations
    d'identification d'un Utilisateur ou a accès au Compte d'Utilisateur, l'Utilisateur concerné doit en informer
    Odin Sport immédiatement. L'Utilisateur est seul responsable de toute utilisation des Services Odin Sport
    et de toute activité réalisée sous son Compte d’Utilisateur.
    Afin d'utiliser les Services Odin Sport, l'Utilisateur doit entrer des résultats valides et précis au mieux de
    ses capacités. L'Utilisateur s'engage à respecter ces règles. L'Utilisateur qui ne bénéficie pas de mises à
    jour automatiques des statistiques est responsable de garder ses données à jour et exactes.
    Si un Utilisateur ne respecte pas ces Conditions Générales d'Utilisation, Odin Sport se donne le pouvoir
    de supprimer son compte. Si un Utilisateur choisit un identifiant pour son compte ou sa page d'équipe,
    Odin Sport se réserve le droit de l'éditer, de le supprimer ou de le récupérer si Odin Sport le juge
    inapproprié (par exemple le nom d'un Utilisateur ou le nom d’une équipe qui n’est pas de près en lien
    avec le nom, l’équipe ou le niveau actuel de l’Utilisateur).
    4. Compte pour autres Partenaires
    En créant un « Compte Autre Partenaire », l’Utilisateur garantit qu’il protégera les renseignements relatifs
    à son Compte Autres Partenaire et sera entièrement responsable de toute utilisation de son compte par
    lui-même ou par un tiers.
    Une fois son Compte Autres Partenaire créé et afin de créer sa page lui permettant d’accéder aux
    services spécifiques de consultation d’annonces (publication d’annonces, candidatures à des annonces,
    contact avec les autres Utilisateurs dans le cas d'envoyer une demande d’invitation de mise en relation et
    qu’elle sera acceptée dans ce cas un autre membre se connecte avec vous alors vous aurez l’avantage
    de la visibilité de son numéro WhatsApp et son numéro de téléphone En revanche, etc.) proposés par la
    Plateforme, l’Utilisateur devra fournir les informations suivantes :
    - Copie de sa pièce d’identité en cours de validité,
    - Copie d’un document officiel attestant de sa qualité de Partenaire.
    Une fois l'inscription validée par Odin Sport, l’Utilisateur sera habilité à accéder à sa page ainsi qu’aux
    Services spécifiques y attachés.
    Après l’acceptation des Conditions Générales d'Utilisation, le Partenaire pourra activer sa communauté
    d'influenceurs, de joueurs, d'entraîneurs et d'autres entités et les encourager à rejoindre la Plateforme et/
    ou les Services Odin Sport.
    5. Reconnaissance de talent
    En utilisant les Services Odin Sport, l'Utilisateur accepte que ses informations soient partagées avec les
    Utilisateurs concernés afin d'être profilé, sponsorisé, repéré, ou de recevoir des offres spéciales ou des
    opportunités.
    L'Utilisateur accepte également que les Services Odin Sport ont seulement la capacité de mettre en
    évidence les joueurs ou entraîneurs sur lesquels Odin Sport a des données spécifiques. Cela signifie que
    l'Utilisateur a la responsabilité de s'assurer que son profil est à jour et que les informations qu’il comporte
    sont correctes et exactes.
    6. Contenu généré par l'Utilisateur
    Les Utilisateurs peuvent poster, enregistrer, télécharger et/ou contribuer ("post") du contenu sur les
    Services Odin Sport, en ce compris des images, des vidéos et des articles.
    Les Utilisateurs conservent tous les droits et sont seuls responsables du contenu publié sur Odin Sport.
    Lors de la publication du Contenu d’Utilisateur sur Odin Sport, les Services Odin Sport bénéficient d'une
    licence mondiale, non exclusive, transférable, sous-licenciable et libre de redevance afin d’utiliser tout
    Contenu d’Utilisateur que l’Utilisateur serait amené à publier ou à diffuser sur ou en relation avec Odin
    Sport. Cette licence est applicable sur la période où l’Utilisateur possède un compte Odin Sport, ou
    jusqu’à ce que le Contenu d’Utilisateur soit supprimé. Cela ne prend pas en compte le Contenu
    d’Utilisateur qui a été partagé par d'autres tiers, y compris, mais sans s'y limiter, les Partenaires et Odin
    Sport.
    Odin Sport et ses partenaires peuvent conserver et continuer à utiliser, stocker, afficher, reproduire,
    diffuser, modifier, exécuter et distribuer tout Contenu d’Utilisateur que d'autres Utilisateurs ont stocké ou
    partagé via Odin Sport. De plus, le contenu supprimé peut subsister dans des copies de sauvegarde
    pendant une période de temps raisonnable (mais non disponible aux autres Utilisateurs).
    Odin Sport n'est pas responsable pour tout Contenu d’Utilisateur et ne soutien aucune opinion présente
    dans le Contenu de l'Utilisateur. Odin Sport se réserve le droit de supprimer et de modifier le Contenu de
    l'Utilisateur pour toute raison, y compris lorsque que le Contenu de l'Utilisateur, viendrait, selon Odin
    Sport, à enfreindre la loi, les règlements ou les présentes Conditions Générales d’Utilisation.
    Odin Sport accorde de l’importance aux retours des Utilisateurs afin d’améliorer la qualité des Services
    proposés aux Utilisateurs.
    Si les Utilisateurs venaient à soumettre des commentaires, des idées ou des retours, les Utilisateurs
    acceptent que Odin Sport demeure libre de les utiliser sans aucune restriction ou compensation.
    L’Utilisateur demeure seul responsable de l'exactitude, de la qualité, de l'intégrité, de la légalité, de la
    fiabilité, de la pertinence et de la propriété intellectuelle ou du droit d'utiliser toutes les données diffusées,
    communiquées ou mise à disposition sur la Plateforme. Odin Sport ne sera pas responsable de la
    suppression, la correction, la destruction, l'endommagement, la perte ou le non-stockage des données
    diffusées, communiquées ou mise à disposition sur la Plateforme par l’Utilisateur. Odin Sport peut
    essayer de restaurer les données perdues, mais ne saurait garantir à l’Utilisateur la récupération ou la
    restauration de telles données.
    Odin Sport ne fera preuve d’aucune tolérance pour le contenu répréhensible ou pour toute utilisation
    abusive ou illégale de la Plateforme. Si un Utilisateur est réputé agir de cette manière, son compte sera
    suspendu avec effet immédiat.
    7. Droit de Propriété Intellectuelle
    Tous les Droits de Propriété Intellectuelle relatifs ou liés aux Services Odin Sport et à la documentation
    s'y rapportant, ainsi que toutes les parties et copies de ceux-ci, restent exclusivement la propriété de
    Odin Sport et/ou de ses sous-traitants/concédants de licence.
    Les présentes Conditions Générales d'Utilisation n'accordent à l'Utilisateur aucun Droit de Propriété
    Intellectuelle sur les Services Odin Sport et tous les droits non expressément accordés en vertu des
    présentes sont réservés par Odin Sport et ses sous-traitants/concédants de licence.
    Les marques de commerce et logos utilisés en relation avec les Services appartiennent à leurs
    propriétaires respectifs. « Odin Sport » est une marque déposée par Odin Sport.
    8. Stipulations complémentaires pour l'utilisation des Services
    Les Services sont destinés uniquement pour les personnes âgées de 13 ans ou plus. Les personnes
    âgées de moins de 13 ans devront être représentées par un de leur parent.
    L’Utilisateur doit respecter toutes les règles et réglementations applicables lors de l'utilisation des
    Services Odin Sport, y compris la création ou l'adaptation du Contenu d’Utilisateur.
    Odin Sport développe constamment les Services et peut dès lors modifier ou supprimer différentes
    parties de ces Services, y compris les fonctionnalités, les produits et les Partenaires disponibles dans les
    Services en partie ou en totalité.
    En utilisant les Services Odin Sport, l'Utilisateur peut rencontrer du contenu ou des informations qui
    pourraient être inexactes, incomplètes, retardées, trompeuses, illégales, offensantes ou autrement
    préjudiciables. Odin Sport tente d'examiner tout contenu fourni par les Utilisateurs. Odin Sport n'est
    toutefois pas responsable du contenu ou de l'information des tiers (y compris les Utilisateurs) ou de tout
    dommage résultant de l'utilisation ou de la confiance de ceux-ci.
    Les Utilisateurs et les Partenaires sont responsables de l'obtention et de la maintenance des appareils ou
    équipements (tels que les téléphones mobiles) et des connexions nécessaires pour accéder et utiliser les
    Services Odin Sport, ainsi que tous les frais y afférents.
    L’Utilisateur ne devra pas :
    i. Utiliser ou tenter d'utiliser le compte Odin Sport d'une autre personne sur les Services
    Odin Sport ou utiliser les données d'entrée d'une autre personne lors de l'utilisation des
    Services Odin Sport sans le consentement de cette autre personne ;
    ii. Copier, modifier ou créer des travaux dérivés des Services Odin Sport ou de toute
    technologie connexe ;
    iii. Faire de l'ingénierie inverse, décompiler, désassembler, déchiffrer ou tenter de
    dériver le code source pour les Services Odin Sport ou toute technologie connexe, ou
    toute partie de celle-ci ;
    iv. Supprimer les mentions de droits d'auteur, marques de commerce ou autres droits
    de propriété contenus dans ou sur les Services Odin Sport ;
    v. Supprimer, couvrir ou masquer toute publicité incluse dans les Services Odin Sport
    ;
    vi. Collecter, utiliser, copier ou transférer toute information obtenue du service Odin
    Sport sans le consentement de Odin Sport ;
    vii. Utiliser des robots ou d'autres méthodes automatisées pour utiliser les Services
    Odin Sport ;
    viii. Créer un compte Odin Sport en utilisant une fausse identité ou l’identité d'une autre
    personne ;
    ix. Accéder aux Services Odin Sport à l'exception des interfaces expressément
    fournies par Odin Sport, telles que l'application Odin Sport et le site Web Odin Sport.
    Odin Sport s’engage à traiter toutes les données personnelles recueillies auprès de l'Utilisateur
    conformément à sa Politique de Confidentialité [https://www.odinesport.com/politique_confidentialité/].
    9. Durée et résiliation
    Les Conditions Générales d'Utilisation demeureront en vigueur entre l’Utilisateur et Odin Sport en tant
    que contrat exécutoire pendant toute la durée au cours de laquelle l'Utilisateur utilise les Services Odin
    Sport.
    L’Utilisateur et Odin Sport peuvent chacun mettre fin à ce Contrat à tout moment. Dès la résiliation,
    l’Utilisateur perdra le droit d’accès ou d’utilisation des Services. Les stipulations suivantes survivent à la
    résiliation :
    - Les droits des autres Utilisateurs à continuer de repartager le contenu et les informations que
    l’Utilisateur a partagé au travers des Services ;
    - Les articles 8, 10 et 12 des présentes Conditions Générales d’Utilisation ;
    - Toute somme due par l’une ou l’autre partie préalablement à la résiliation reste due après la
    résiliation.
    Sans préjudice de tous dommages et intérêts que Odin Sport pourrait solliciter, Odin Sport se réserve le
    droit de suspendre l’accès d’un Utilisateur aux Services et/ou résilier de plein droit, sans préavis ni
    indemnité, son abonnement aux Services Premium en cas de :
    - Non-respect par l’Utilisateur des présentes Conditions Générales d’Utilisation, et notamment :
    · Non-respect des Droits de Propriété Intellectuelle de Odin Sport et/ou de ses
    concédants,
    · Contournement ou tentative de contournement des mesures techniques de protection
    mises en place par Odin Sport,
    · Fourniture de fausses informations lors de son inscription aux Services Odin Sport.
    - Non-paiement total ou partiel par l’Utilisateur du prix de son abonnement aux Services Odin
    Sport ;
    - Agissements contraires aux intérêts commerciaux de Odin Sport.
    10. Limitation de responsabilité
    Odin Sport ne sera en aucun cas responsable des dommages indirects envers l'Utilisateur, y compris les
    pertes de profits, pertes de ventes ou d'affaires, perte de données ou interruption d'activité, ou de
    dommages directs résultant d'accords tiers entre Utilisateurs et Partenaires. Dans toute la mesure
    permise par la loi, Odin Sport rejette toute garantie implicite ou légale, y compris toutes les garanties
    implicites de titres, d’exactitude des données, d’absence de contrefaçon, de qualité marchande ou
    d’adéquation à un usage particulier.
    Les Services Odin Sport peuvent à tout moment être interrompus ou définitivement interrompus. Les
    Services Odin Sport peuvent également être temporairement suspendus. L’Utilisateur s’engage à ne pas
    utiliser les Services Odin Sport pour sauvegarder des données.
    L’Utilisateur est seul responsable de toute utilisation abusive des données au nom de ses membres. Odin
    Sport n'est qu'un prestataire technologique proposant via sa Plateforme des annonces des Utilisateurs.
    Odin Sport ne saurait à ce titre prendre part à la conclusion d’un contrat entre des Utilisateurs de la
    Plateforme Odin Sport. Odin Sport agit en tant qu’intermédiaire transparent. L’intermédiaire transparent a
    pour seul rôle de mettre en relation plusieurs Utilisateurs de la Plateforme. La responsabilité de Odin
    Sport ne peut être recherchée ou mise en cause à cet égard et l’Utilisateur accepte de tenir Odin Sport
    indemne du paiement de tous frais, dépens, condamnations, indemnités, honoraires ou autre au titre de
    la relation avec un autre Utilisateur.
    11. Plaintes relatives au Contenu d’Utilisateur
    Odin Sport dispose d’une politique et d’une procédure de plainte concernant le Contenu d’Utilisateur
    publié par ses Utilisateurs.
    12. Loi applicable et règlement des différends
    Les présentes Conditions Générales d'Utilisation seront régies et seront interprétées conformément au
    droit Tunisien. Les litiges découlant des présentes Conditions Générales d'Utilisation seront résolus par le
    Tribunal de Première Instance de Tunis 1.
    13. Modification
    Nous pouvons apporter des modifications aux Conditions Générales d'Utilisation de Odin Sport ainsi qu’à
    notre Politique de confidentialité.
    Odin Sport publiera les Conditions Générales d’Utilisation modifiées sur le site Internet de Odin Sport et
    informera l'Utilisateur que les Conditions Générales d’Utilisation ont été modifiées sur les Services de
    Odin Sport ou par courrier électronique à l'adresse email soumise aux Services de Odin Sport par
    l'Utilisateur ou par le Partenaire. Si l'Utilisateur n'est pas d'accord avec les Conditions Générales
    d’Utilisation modifiées, cette personne physique ou morale, doit cesser l'utilisation des Services Odin
    Sport.
    A défaut, si l’Utilisateur continue à utiliser les Services de Odin Sport après la publication ou l’envoi de
    l’avis concernant les modifications que Odin Sport a apporté aux Conditions Générales d’Utilisation, cela
    signifie que l’Utilisateur est réputé avoir accepté les Conditions Générales d’Utilisation mises à jour à
    compter de leur date d’entrée en vigueur.
    14. Transmission des droits
    Odin Sport sera en droit de céder tout ou partie de ses droits ou obligations en vertu des présentes, en
    partie ou la totalité, à un affilié, ou successeur, ou acheteur, ou acquéreur de ses actifs commerciaux
    relatifs aux Services Odin Sport sans le consentement préalable de l'Utilisateur.
    L'Utilisateur n'a pas le droit de céder tout ou partie de ses droits ou obligations en vertu des présentes.
    15. Notifications et Messages
    L’Utilisateur accepte que Odin Sport lui adresse des notifications et des messages par les moyens
    suivants : (1) directement au travers des Services Odin Sport ou (2) envoyés aux coordonnées que
    l’Utilisateur aura fourni à Odin Sport (par exemple, adresse e-mail, numéro de mobile, adresse postale).
    L’Utilisateur s’engage et accepte de tenir à jour ses coordonnées.
    16. Nullité d’une clause
    Dans l’hypothèse où l’une des stipulations des présentes Conditions Générales d’Utilisation serait
    déclarée invalide ou inopposable pour quelque cause que ce soit, les autres stipulations demeureront
    applicables sans changement. `,
  };
  let Privacy = {
    title: "POLITIQUE DE CONFIDENTIALITÉ DE LA PLATEFORME « ODIN ESPORT »",
    content: ` 
        PREAMBULE
        Odin Sport est susceptible de collecter des données à caractère personnel dans le cadre de l’utilisation
        de son site internet accessible par le biais de l’adresse suivante : www.odinsport.com
        (ci-après le « Site »).
        Accordant une attention toute particulière à la protection des données personnelles qui lui sont
        transmises, Odin Sport s’engage à respecter la Loi n°2004-63 du 27 juillet 2004 relative à la protection
        des données personnelles, et de manière générale, à faire siens les principes de base de protection des
        données.
        La présente Politique de Confidentialité a pour objet d’informer les Utilisateurs des engagements et
        mesures pris par la société Odin Sport afin de veiller à la protection de leurs données.
        IDENTITÉ DU RESPONSABLE DE TRAITEMENT
        Le responsable du traitement est la société ODIN INTERNATIONAL SERVICES AND CONSULTING
        (ci-après « Odin Sport ») , société à responsabilité ayant son siège social sis au , 000, ARIANA CENTRE
        A221 , ARIANA , 2080 , ayant Identifiant Unique no 1765065B, en la personne de son représentant légal.
        DONNEES COLLECTEES ET FINALITÉS DE LA COLLECTE
        1. Données collectées
        1.1 Données que vous nous fournissez
        Utilisation du site
        La simple navigation sur le Site www.odinsport.com entraine la collecte de données à caractère
        personnel via les cookies et les traceurs, à savoir :
        - L’adresse IP de votre support de connexion
        - L’utilisation faite du Site par l’utilisateur.
        Inscription
        Pour créer un compte, vous devez indiquer votre nom, votre adresse e-mail, votre date de naissance,
        votre poste, ainsi qu’un mot de passe. Si vous souscrivez un service premium, vous devrez fournir des
        informations de paiement (carte bancaire, par exemple) et, des données de facturation ainsi qu’une pièce
        d’identité.
        Profil
        Vous pouvez choisir les informations figurant sur votre profil, comme votre état civil, votre date et lieu de
        naissance, votre poids, votre taille, votre nationalité, les langues pratiquées, votre expérience
        professionnelle, vos compétences, votre palmarès sportif, vos photos et/ou vidéos, votre lieu de
        résidence, et vos recommandations. Toutefois, Odin Sport se réserve le droit de restreindre à l’utilisateur
        la suppression ou la modification d’informations figurant sur le profil, notamment les statistiques
        régulièrement mis à jour par Odin Sport. N’ajoutez ou ne publiez dans votre profil que des données
        personnelles que vous acceptez de rendre publiques.
        Publication et téléchargement sur la plateforme
        Nous collectons des données personnelles auprès de vous lorsque vous en indiquez, en publiez ou en
        téléchargez sur nos services. Vous n’êtes pas obligé de publier ou de télécharger des données
        personnelles. Toutefois, si vous ne le faites pas, votre capacité à développer votre réseau et à interagir
        avec vos relations par l’intermédiaire de nos services peut être limitée.
        1.2 Données de tiers
        Il est possible que vous et des tiers publiiez du contenu incluant des informations à votre sujet (dans le
        cadre d’articles, de posts, de commentaires ou de vidéos) sur nos services.
        1.3. Utilisation des services
        Nous enregistrons des données d’utilisation lorsque vous accédez à nos services (ou les utilisez d’une
        quelconque manière). Nous utilisons des identifiants de connexion, des cookies, des informations sur les
        appareils et des adresses IP pour vous identifier et pour enregistrer votre activité.
        1.4. Cookies
        Odin Sport utilise des cookies sur son Site internet. Les cookies sont des données utilisées par un
        serveur pour envoyer des informations d’état au navigateur d’un utilisateur, et par ce navigateur pour
        renvoyer des informations d’état au serveur d’origine.
        Les cookies permettent de conserver, pendant la durée de validité du cookie concerné, des informations
        d’état lorsqu’un navigateur accède aux différentes pages d’un site web ou lorsque ce navigateur retourne
        ultérieurement sur ce site web.
        Seul l’émetteur d’un cookie peut lire ou modifier les informations qui y sont contenues.
        A titre d’exemple, il existe :
        ● Des cookies de « session » : disparaissant à l’occasion de la fin de votre navigation sur ce site.
        ● Les cookies « permanents », qui eux demeurent sur votre support de connexion (jusqu’à leur fin
        de vie ou après leur suppression par le biais des fonctionnalités de votre navigateur).
        ● Et des cookies tiers : utilisés par la société Google Analytics.
        Finalités des cookies utilisés
        Ils visent à analyser la fréquentation du Site et à collecter des informations concernant votre navigation.
        Leur présence assure un fonctionnement parfaitement optimal du Site. Elle permet enfin l’établissement
        de statistiques anonymes.
        Gestion des cookies
        Les cookies utilisés sur ce site sont les cookies de tiers, auxquels la société Odin Sport a recours, et ce, à
        des fins bien précises et déterminées.
        Odin Sport utilise les services de la société américaine Google Inc, notamment ceux de Google Analytics.
        Les données sont collectées grâce aux cookies.
        Le service Google Analytics permet de comptabiliser les visiteurs pour mesurer l’audience du Site et
        d’identifier la manière dont ils utilisent le Site. Ces cookies sont déposés et lus sur votre support de
        connexion, dès lors que l’utilisateur navigue sur un site qui a recours aux services de Google Analytics.
        Plus d’informations sur le service Google Analytics en vous rendant à la page : http://
        www.google.com/analytics/learn/privacy.html
        L’utilisateur peut choisir de supprimer les cookies. Pour ce faire, l’ensemble des supports de connexion
        (tablettes, smartphones, ordinateurs etc.) devront faire l’objet d’un paramétrage. Néanmoins, la
        suppression de cookies pourrait impacter la bonne navigation sur le Site, et le bénéfice de certains
        services.
        2. Finalités de la collecte
        Nous utilisons vos données pour vous donner accès à nos services et suivre vos préférences.
        Nos services vous permettent de rester en contact avec des joueurs, entraineurs, agents, et autres
        professionnels de l’univers du football, ainsi que de vous tenir au courant de leur actualité. Pour cela,
        vous pouvez vous connecter avec les professionnels de votre choix, s’ils l’acceptent.
        Nous utilisons des données vous concernant pour aider d’autres personnes à trouver votre profil, vous
        suggérer des relations et en suggérer à d’autres personnes, et pour vous permettre d’inviter d’autres
        personnes à devenir membres et à se connecter avec vous.
        C’est à vous de décider si vous souhaitez inviter une personne à rejoindre nos services, envoyer une
        demande de mise en relation ou accepter qu’un autre membre se connecte avec vous. Si vous invitez
        quelqu’un à entrer en relation avec vous, votre invitation inclura des informations de base sur votre
        réseau et votre profil.
        DESTINATAIRES DES DONNEES
        Les destinataires des données à caractère personnel susvisées sont les services concernés de la société
        Odin Sport.
        Toutefois, Odin Sport pourra être amené à communiquer vos données à caractère personnel à des tiers si
        cette communication est nécessaire pour des raisons techniques et/ou si elle y est obligée par les lois et
        les règlements applicables notamment en matière bancaire, financière, fiscale et pénale dans les limites
        des dispositions relatives à la protection du secret professionnel.
        SECURITE
        Soucieux de garantir la sécurité des données qui lui sont transmises, Odin Sport veille à protéger et
        sécuriser les données à caractère personnel ainsi qu’à assurer leur confidentialité et empêcher qu’elles
        ne soient déformées, endommagées, détruites ou divulguées à des tiers non autorisés.
        Odin Sport a pris des mesures de protection physique, technique et organisationnelle pour prévenir toute
        perte, mauvaise utilisation, accès ou diffusion non autorisés, altération ou destruction éventuelle des
        données à caractère personnel.
        CONSERVATION DES DONNEES
        Nous conservons vos données personnelles en Tunisie. Toutefois, il est possible que les données que
        nous recueillons lorsque vous utilisez notre Site, notre Application ou nos Services soient transférées en
        dehors de la Tunisie vers des pays dont la législation applicable en matière de protection des données
        personnelles diffère de celle applicable en Tunisie, dans le cadre d’une autorisation préalable accordée
        par l’Instance Nationale de Protection des Données Personnelles (INPDP) conformément à l’article 52 de
        la Loi n°2004-63 du 27 juillet 2004 relative à la protection des données personnelles.
        Dans ce cas, nous mettons en œuvre les garanties prévues par la législation applicable en matière de
        protection des données personnelles afin d’assurer un niveau de protection adéquat des données
        transférées. D’une manière générale, les données personnelles sont conservées en base active le temps
        nécessaire à la gestion des services souscrits, ainsi que tant que le compte utilisateur reste actif, avant
        de faire l’objet d’un archivage pour répondre à nos obligations légales (à des fins probatoires
        notamment). Certaines de ces données peuvent être conservées après la fermeture de votre compte
        pour assurer la gestion de demandes ou litiges en cours.
        DROITS DES UTILISATEURS
        L’utilisateur dispose notamment d’un droit d’accès, de rectification et modification, de limitation et de
        suppression.
        Il dispose également d’un droit d’opposition au traitement de ses données personnelles pour des motifs
        légitimes, ainsi que d’un droit d’opposition à ce que ses données soient utilisées à des fins de prospection
        commerciale.
        Il dispose enfin du droit de définir des directives générales et particulières définissant la manière dont il
        entend que soient exercés, après son décès, ces droits.
        Pour exercer ses droits, l’utilisateur doit adresser un courrier au responsable du traitement, accompagné
        de la photocopie d’un titre d’identité comportant sa signature, à l’adresse postale suivante :
        000, ARIANA CENTRE A221 , ARIANA , 2080 .
        L’utilisateur dispose, en tout état de cause, du droit d’introduire une réclamation auprès de l’Instance
        Nationale de Protection des Données Personnelles (INPDP). Les plaintes, réclamations et interrogations
        peuvent être directement soumises par courrier à l’adresse suivante :
        Instance Nationale de Protection des Données Personnelles
        1, Rue Mohamed Moalla
        1002, Mutuelleville
        Tunis B.P. 525.
        MISE A JOUR DE LA POLITIQUE DE CONFIDENTIALITE
        La présente Politique de Confidentialité est susceptible d’être modifiée ou aménagée à tout moment afin
        de pouvoir garantir au quotidien la protection des données des utilisateurs ou pour assurer le respect de
        la réglementation.
        Elle pourra notamment faire l’objet de modifications en fonction des évolutions législatives et
        réglementaires, et des recommandations et positions adoptées par l’INPDP.
        Pour vérifier les mises à jour de cette politique, il convient de consulter régulièrement cette page.`,
  };

  return (
    <div
      style={{
        display: showModal ? "flex" : "none",
      }}
      className="pdfModal"
    >
      <section className=" w-full  md:w-[60%]">
        <header className="flex md:flex-row flex-col-reverse items-center relative md:justify-around justify-center">
          <p className="text-xs text-white  md:text-lg text-center">
            {wichContent == 1 ? Conditions.title : Privacy.title}
          </p>{" "}
          <img
            className="max-md:pb-4 md:absolute  right-5"
            src={close}
            onClick={() => {
              setShowModal(false);
            }}
            alt=""
          />
        </header>
        <main className="md:flex md:justify-center">
       <p className="max-md:break-before-avoid-page max-md:text-wrap max-md:break-words">
          <svg
    width={209}
    height={53}
    viewBox="0 0 209 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="my-5 mx-auto"
  >
    <g clipPath="url(#clip0_983_61844)">
      <path
        d="M66.8102 14.0668V52.3118H40.5283L38.1046 47.5324L35.7149 42.7481L33.3204 37.9687L30.9307 33.1893L33.3204 28.4099L35.7149 23.6256L38.1046 18.8656L40.5283 14.0668H66.8102ZM42.9034 18.8656L40.5283 23.6256L38.1046 28.4099L35.7149 33.1893L38.1046 37.9687L40.4943 42.7481L42.884 47.5324H62.0066V18.8656H42.9034Z"
        fill="#2E71EB"
      />
      <path
        d="M26.2965 14.0668L28.6862 18.8462L31.0759 23.6256L33.4656 28.4099L35.8601 33.1893L33.4656 37.9687L31.0759 42.7481L28.6862 47.5324L26.2965 52.3118H0V14.0668H26.2965ZM4.78426 18.8656V47.5518H23.9068L26.2965 42.7675L28.6862 37.9881L31.0759 33.2087L28.6862 28.4292L26.2965 23.645L23.9068 18.8656H4.78426Z"
        fill="#2E71EB"
      />
      <path d="M73.1696 0H68.3369V4.60491H73.1696V0Z" fill="#FF7F00" />
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
        x={148.288}
        y={33.7975}
        width={60.3486}
        height={18.1507}
        rx={4.48373}
        stroke="#0D055B"
        strokeWidth={0.727092}
      />
      <path
        d="M169.267 46.5707C168.724 46.5707 168.247 46.4505 167.836 46.2101C167.433 45.9696 167.115 45.6323 166.882 45.1979C166.657 44.7636 166.537 44.2634 166.521 43.6972H166.789V46.3729H166.091V37.8805H166.963V42.1267L166.626 42.9062C166.641 42.2857 166.766 41.7622 166.998 41.3356C167.239 40.9013 167.557 40.5717 167.952 40.3468C168.355 40.1219 168.813 40.0094 169.325 40.0094C169.775 40.0094 170.182 40.0947 170.546 40.2654C170.911 40.436 171.221 40.6686 171.477 40.9634C171.741 41.2581 171.939 41.5993 172.07 41.9871C172.21 42.3671 172.28 42.7704 172.28 43.197V43.3599C172.28 43.7787 172.21 44.182 172.07 44.5697C171.931 44.9498 171.729 45.291 171.466 45.5935C171.21 45.896 170.895 46.1364 170.523 46.3148C170.151 46.4854 169.732 46.5707 169.267 46.5707ZM169.174 45.8029C169.639 45.8029 170.038 45.6904 170.372 45.4655C170.705 45.2406 170.961 44.9381 171.14 44.5581C171.318 44.1781 171.407 43.7515 171.407 43.2784C171.407 42.7976 171.314 42.371 171.128 41.9987C170.95 41.6187 170.69 41.3201 170.349 41.103C170.015 40.8858 169.624 40.7772 169.174 40.7772C168.755 40.7772 168.375 40.8703 168.034 41.0564C167.692 41.2426 167.421 41.5063 167.219 41.8475C167.025 42.181 166.928 42.5765 166.928 43.0341V43.6042C166.928 44.0385 167.025 44.4224 167.219 44.7559C167.421 45.0816 167.692 45.3375 168.034 45.5237C168.375 45.7098 168.755 45.8029 169.174 45.8029ZM176.614 46.5707C176.087 46.5707 175.629 46.4815 175.242 46.3031C174.854 46.117 174.536 45.8727 174.288 45.5702C174.04 45.26 173.853 44.9149 173.729 44.5348C173.613 44.1548 173.555 43.7632 173.555 43.3599V43.197C173.555 42.8015 173.613 42.4137 173.729 42.0336C173.853 41.6536 174.04 41.3124 174.288 41.0099C174.536 40.7074 174.846 40.467 175.218 40.2886C175.598 40.1025 176.04 40.0094 176.545 40.0094C177.188 40.0094 177.723 40.1529 178.15 40.4399C178.584 40.7268 178.91 41.0952 179.127 41.545C179.344 41.9871 179.453 42.4641 179.453 42.976V43.4297H173.95V42.7549H178.848L178.627 43.0923C178.627 42.6347 178.546 42.2353 178.383 41.894C178.228 41.545 177.995 41.2736 177.685 41.0797C177.382 40.8781 177.002 40.7772 176.545 40.7772C176.064 40.7772 175.664 40.8897 175.346 41.1146C175.028 41.3395 174.788 41.6381 174.625 42.0104C174.47 42.3826 174.392 42.8053 174.392 43.2784C174.392 43.7438 174.47 44.1703 174.625 44.5581C174.788 44.9381 175.032 45.2406 175.358 45.4655C175.691 45.6904 176.11 45.8029 176.614 45.8029C177.15 45.8029 177.584 45.6827 177.917 45.4422C178.251 45.1941 178.456 44.9032 178.534 44.5697H179.348C179.271 44.9808 179.108 45.3375 178.86 45.64C178.611 45.9347 178.297 46.1635 177.917 46.3264C177.537 46.4893 177.103 46.5707 176.614 46.5707ZM183.366 46.4427C182.94 46.4427 182.571 46.3807 182.261 46.2566C181.951 46.1325 181.71 45.9231 181.54 45.6284C181.369 45.3259 181.284 44.9226 181.284 44.4185V38.276H182.121V44.5465C182.121 44.9032 182.218 45.1786 182.412 45.3724C182.606 45.5586 182.881 45.6516 183.238 45.6516H184.343V46.4427H183.366ZM180.179 40.8819V40.2188H184.343V40.8819H180.179ZM189.752 46.3729V44.5232H189.613V42.3361C189.613 41.8785 189.493 41.5295 189.252 41.2891C189.012 41.0409 188.639 40.9168 188.135 40.9168C187.903 40.9168 187.666 40.9207 187.426 40.9285C187.193 40.9362 186.968 40.9479 186.751 40.9634C186.541 40.9711 186.355 40.9828 186.192 40.9983V40.2305C186.363 40.2149 186.538 40.1994 186.716 40.1839C186.894 40.1684 187.077 40.1607 187.263 40.1607C187.457 40.1529 187.643 40.149 187.821 40.149C188.449 40.149 188.953 40.2266 189.334 40.3817C189.721 40.5368 190.004 40.7811 190.183 41.1146C190.361 41.4403 190.45 41.8747 190.45 42.4175V46.3729H189.752ZM187.67 46.5358C187.236 46.5358 186.852 46.4582 186.518 46.3031C186.185 46.148 185.925 45.9231 185.739 45.6284C185.56 45.3337 185.471 44.9769 185.471 44.5581C185.471 44.1471 185.564 43.7981 185.75 43.5111C185.944 43.2241 186.22 43.007 186.576 42.8596C186.941 42.7045 187.379 42.6269 187.891 42.6269H189.694V43.2901H187.833C187.344 43.2901 186.968 43.4103 186.704 43.6507C186.448 43.8834 186.32 44.1897 186.32 44.5697C186.32 44.9575 186.456 45.2677 186.728 45.5004C186.999 45.7253 187.367 45.8378 187.833 45.8378C188.12 45.8378 188.395 45.7874 188.659 45.6866C188.922 45.578 189.143 45.3996 189.322 45.1514C189.5 44.8955 189.597 44.5465 189.613 44.1044L189.869 44.465C189.838 44.9226 189.729 45.3065 189.543 45.6167C189.357 45.9192 189.105 46.148 188.787 46.3031C188.469 46.4582 188.096 46.5358 187.67 46.5358Z"
        fill="#0D055B"
      />
    </g>
    <defs>
      <clipPath id="clip0_983_61844">
        <rect width={209} height={52.3118} fill="white" />
      </clipPath>
    </defs>
  </svg>
            <pre className="max-md:whitespace-pre-line max-md:break-before-avoid-page max-md:text-wrap max-md:break-words">
              {wichContent == 1 ? Conditions.content : Privacy.content}
            </pre>
          </p>
        </main>
      </section>
    </div>
  );
}
