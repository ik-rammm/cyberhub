// CyberHub — contenu piloté par les données.
// Les URLs externes sont des points d'entrée pédagogiques : CyberHub ne prétend pas remplacer ces services.
const L=(n,u)=>({n,u});
const VT=L("VirusTotal","https://www.virustotal.com"),US=L("URLScan","https://urlscan.io"),GSB=L("Google Safe Browsing","https://transparencyreport.google.com/safe-browsing/search"),PT=L("PhishTank","https://phishtank.org"),AB=L("AbuseIPDB","https://www.abuseipdb.com"),SH=L("Shodan","https://www.shodan.io");
window.DATA={
 detect:[
 {id:"phishing",t:"Email ou lien suspect",signs:["Urgence ou menace (compte bloqué, colis, amende)","Expéditeur dont le domaine imite une marque","Pièce jointe inattendue ou lien raccourci","Demande de mot de passe ou de paiement"],now:["Ne cliquez pas et ne répondez pas","Vérifiez le domaine réel de l'expéditeur","Analysez le lien avec plusieurs services","Signalez le message, puis supprimez-le","Si vous avez saisi un mot de passe : changez-le et activez la MFA"],tools:[VT,US,GSB,PT]},
 {id:"account",t:"Compte piraté",signs:["Connexion depuis un lieu ou un appareil inconnu","Mot de passe qui ne fonctionne plus","Messages envoyés que vous n'avez pas écrits","Alertes de réinitialisation non demandées"],now:["Changez le mot de passe depuis un appareil sûr","Déconnectez toutes les sessions","Activez la MFA et vérifiez l'email de récupération","Vérifiez les règles de redirection d'email","Prévenez vos contacts"],tools:[L("Have I Been Pwned","https://haveibeenpwned.com")]},
 {id:"malware",t:"PC lent ou comportement anormal",signs:["Processus inconnu qui consomme CPU ou réseau","Programmes ou extensions installés à votre insu","Antivirus désactivé","Fenêtres publicitaires ou redirections"],now:["Déconnectez la machine du réseau si une compromission est plausible","Lancez une analyse antivirus complète","Examinez processus, démarrage et extensions","Préservez les éléments utiles avant de supprimer des preuves","Sauvegardez vos données saines puis restaurez si besoin"],tools:[VT,L("Hybrid Analysis","https://www.hybrid-analysis.com")]},
 {id:"ransom",t:"Fichiers chiffrés (ransomware)",signs:["Fichiers renommés avec une extension inconnue","Note de rançon à l'écran","Impossible d'ouvrir documents ou sauvegardes"],now:["Isolez immédiatement la machine du réseau","Ne payez pas avant d'avoir consulté un spécialiste","Conservez la note et les journaux utiles","Cherchez un déchiffreur reconnu","Restaurez depuis une sauvegarde saine et hors ligne"],tools:[L("No More Ransom","https://www.nomoreransom.org")]},
 {id:"network",t:"Activité réseau inhabituelle",signs:["Trafic sortant important à une heure inhabituelle","Connexions vers des IP inconnues","Appareil inconnu sur le réseau"],now:["Identifiez l'appareil ou l'IP concernés","Consultez la réputation de l'IP","Isolez l'appareil suspect","Changez les accès compromis","Conservez les journaux réseau pertinents"],tools:[AB,VT,SH]}
 ],
 assets:[
 {id:"account",t:"Mon compte",m:[["Mot de passe unique et long par service",1],["Gestionnaire de mots de passe",1],["Authentification multifacteur (MFA)",1],["Passkeys quand le service les propose",0],["Email et codes de récupération à jour",0],["Revue des sessions et appareils connectés",0],["Alertes de connexion activées",0]]},
 {id:"pc",t:"Mon ordinateur",m:[["Système et logiciels à jour",1],["Chiffrement du disque",1],["Compte standard au quotidien",0],["Pare-feu activé",0],["Sauvegarde 3-2-1 testée",1],["Antivirus ou EDR actif",0]]},
 {id:"phone",t:"Mon téléphone",m:[["Verrouillage par code robuste",1],["Mises à jour automatiques",1],["Applications issues des stores officiels uniquement",1],["Permissions des applications revues",0],["Localisation et effacement à distance activés",0]]},
 {id:"network",t:"Mon réseau",m:[["Mot de passe du routeur changé",1],["WPA3 ou WPA2 avec phrase longue",1],["Firmware du routeur à jour",0],["WPS désactivé",0],["Réseau invité pour les objets connectés",0]]},
 {id:"web",t:"Mon site web",m:[["HTTPS et HSTS",1],["En-têtes de sécurité (CSP, X-Frame-Options)",0],["Requêtes paramétrées contre l'injection SQL",1],["Validation des entrées et échappement des sorties",1],["Dépendances à jour",0],["Journalisation et sauvegardes",0]]}
 ],
 attacks:[
 {t:"Phishing",what:"Technique d'ingénierie sociale qui pousse une victime à divulguer une information ou effectuer une action sensible.",how:["Prétexte trompeur","Message ou page imitative","Interaction de la victime","Collecte ou redirection"],impact:"Vol de comptes, fraude, installation de malware.",detect:"Domaine imité, urgence, demande inhabituelle, incohérences.",prevent:"MFA, passkeys, filtrage, vérification hors bande, sensibilisation.",lab:"TryHackMe / PortSwigger pour apprendre dans des environnements autorisés."},
 {t:"Injection SQL",what:"Entrée utilisateur interprétée de manière dangereuse par une requête SQL mal conçue.",how:["Entrée utilisateur","Traitement non sûr","Requête exécutée","Données potentiellement exposées"],impact:"Lecture ou modification de données, selon le contexte.",detect:"Erreurs SQL, journaux applicatifs/WAF, requêtes anormales.",prevent:"Requêtes paramétrées, validation, moindre privilège.",lab:"PortSwigger Web Security Academy"},
 {t:"XSS",what:"Contenu contrôlé par un attaquant interprété comme du script dans le navigateur d'un autre utilisateur.",how:["Entrée contrôlée","Contenu rendu","Navigateur interprète","Impact côté client"],impact:"Vol de session, actions au nom de la victime, défiguration.",detect:"Entrées anormales, journaux, violations CSP.",prevent:"Échappement des sorties, CSP, cookies HttpOnly/SameSite.",lab:"PortSwigger Web Security Academy"},
 {t:"Force brute",what:"Tentatives répétées pour deviner un secret d'authentification.",how:["Tentatives répétées","Échecs observables","Blocage ou réussite"],impact:"Compte compromis si les défenses sont faibles.",detect:"Pics d'échecs, connexions répétées, géolocalisations atypiques.",prevent:"MFA, limitation de débit, détection, mots de passe uniques.",lab:"Labs d'authentification de PortSwigger"},
 {t:"Man-in-the-Middle",what:"Un intermédiaire non autorisé tente d'observer ou modifier une communication.",how:["Canal non fiable","Interception possible","Observation ou modification","Communication compromise"],impact:"Fuite ou altération de données.",detect:"Alertes de certificat, anomalies réseau, changements inattendus.",prevent:"TLS, HSTS, validation des certificats, réseaux de confiance.",lab:"Modules réseau de TryHackMe"},
 {t:"Déni de service",what:"Saturation d'un service afin d'en réduire ou empêcher la disponibilité.",how:["Trafic ou requêtes excessives","Ressources saturées","Dégradation","Indisponibilité"],impact:"Interruption d'activité.",detect:"Pics de trafic, latence, saturation de ressources.",prevent:"CDN, rate limiting, filtrage, architecture résiliente.",lab:"Étudier les concepts uniquement sur des environnements autorisés."}
 ],
 hackers:[
 {t:"White Hat",c:"Autorisé",d:"Professionnel qui teste la sécurité avec une autorisation explicite."},
 {t:"Black Hat",c:"Malveillant",d:"Acteur qui exploite des systèmes sans autorisation à des fins nuisibles ou illégales."},
 {t:"Grey Hat",c:"Zone grise",d:"Acteur qui peut découvrir ou tester sans autorisation claire, même si l'intention n'est pas toujours malveillante."},
 {t:"Script Kiddie",c:"Débutant",d:"Utilise des outils ou scripts existants sans nécessairement comprendre leur fonctionnement."},
 {t:"Hacktivist",c:"Idéologique",d:"Utilise des actions numériques pour défendre une cause ou un message."},
 {t:"Insider",c:"Interne",d:"Personne disposant d'un accès légitime qui l'utilise de manière abusive ou compromettante."}
 ],
 concepts:[
 {t:"CIA Triad",d:"Confidentialité, intégrité et disponibilité : trois objectifs fondamentaux de la sécurité de l'information."},
 {t:"Authentification",d:"Vérifier l'identité d'un utilisateur, appareil ou service."},
 {t:"Autorisation",d:"Déterminer ce qu'une identité authentifiée est autorisée à faire."},
 {t:"Chiffrement",d:"Transformer des données lisibles en données protégées à l'aide d'une clé."},
 {t:"Hashing",d:"Fonction à sens unique produisant une empreinte ; utile notamment pour l'intégrité et le stockage adapté des mots de passe."},
 {t:"MFA",d:"Combiner plusieurs facteurs d'authentification indépendants."},
 {t:"PKI",d:"Infrastructure de clés publiques permettant notamment certificats, authentification et signatures numériques."},
 {t:"TLS",d:"Protocole cryptographique utilisé pour sécuriser les communications réseau, notamment HTTPS."},
 {t:"Firewall",d:"Contrôle des flux réseau selon des règles définies."},
 {t:"IDS / IPS",d:"Détection et, pour l'IPS, prévention de certaines activités réseau suspectes."},
 {t:"SIEM",d:"Centralise et corrèle des événements de sécurité pour faciliter détection, investigation et réponse."},
 {t:"Zero Trust",d:"Approche qui évite de faire confiance implicitement et vérifie continuellement les accès."}
 ],
 practice:[L("PortSwigger Web Security Academy","https://portswigger.net/web-security"),L("TryHackMe","https://tryhackme.com"),L("Hack The Box","https://www.hackthebox.com"),L("picoCTF","https://picoctf.org"),L("OverTheWire","https://overthewire.org"),L("CyberDefenders","https://cyberdefenders.org")],
 resources:[
 {cat:"Networking",n:"Cisco Networking Academy",u:"https://www.netacad.com/",d:"Bases réseau et parcours Cisco."},
 {cat:"Linux",n:"Linux Journey",u:"https://linuxjourney.com/",d:"Parcours progressif Linux."},
 {cat:"Web Security",n:"PortSwigger Academy",u:"https://portswigger.net/web-security",d:"Cours et labs gratuits orientés sécurité web."},
 {cat:"CTF",n:"picoCTF",u:"https://picoctf.org/",d:"Challenges pour apprendre la cybersécurité par la pratique."},
 {cat:"Blue Team",n:"CyberDefenders",u:"https://cyberdefenders.org/",d:"Cas pratiques orientés SOC, DFIR et défense."}
 ],
 youtube:[
 {n:"Professor Messer",d:"Bases réseau et préparation Security+.",u:"https://www.youtube.com/@professormesser"},
 {n:"NetworkChuck",d:"Networking, Linux et introduction à la cybersécurité.",u:"https://www.youtube.com/@NetworkChuck"},
 {n:"John Hammond",d:"CTF, malware, analyse et sécurité offensive/défensive.",u:"https://www.youtube.com/@_JohnHammond"},
 {n:"IppSec",d:"Walkthroughs Hack The Box et raisonnement de pentest.",u:"https://www.youtube.com/@ippsec"},
 {n:"13Cubed",d:"Digital forensics et DFIR.",u:"https://www.youtube.com/@13Cubed"},
 {n:"LiveOverflow",d:"Exploitation, reverse engineering et CTF avancés.",u:"https://www.youtube.com/@LiveOverflow"}
 ],
 roadmap:[
 {n:"1. IT Fundamentals",items:["Systèmes d'exploitation","Fichiers, processus et permissions","Virtualisation","Ligne de commande"]},
 {n:"2. Networking",items:["OSI / TCP-IP","IPv4 / IPv6 et subnetting","DNS / DHCP","HTTP(S), ports et protocoles","NAT, VPN, firewall"]},
 {n:"3. Linux & Windows",items:["Administration Linux","Windows et Active Directory","Logs et permissions","PowerShell / Bash"]},
 {n:"4. Cybersecurity Fundamentals",items:["CIA Triad","Authentification / autorisation","Cryptographie","Vulnérabilités et risques","Sécurité applicative"]},
 {n:"5. Practice",items:["TryHackMe","PortSwigger","picoCTF","Hack The Box","CyberDefenders"]},
 {n:"6. Choose a path",items:["SOC / Blue Team","Pentest","AppSec","Cloud Security","DFIR","GRC"]}
 ],
 finder:[
 {k:"URL",cat:"Reputation",desc:"Réputation, phishing et indices de navigation.",tools:[VT,US,GSB,PT]},
 {k:"IP",cat:"Threat Intelligence",desc:"Réputation, exposition et informations sur une adresse IP.",tools:[AB,VT,SH,L("Censys","https://search.censys.io")]},
 {k:"Domaine",cat:"OSINT / DNS",desc:"WHOIS/RDAP, DNS, certificats et réputation.",tools:[L("WHOIS","https://who.is"),L("DNSDumpster","https://dnsdumpster.com"),L("crt.sh","https://crt.sh"),VT]},
 {k:"Fichier",cat:"Malware Analysis",desc:"Analyse statique/dynamique et réputation de fichiers.",tools:[VT,L("Hybrid Analysis","https://www.hybrid-analysis.com"),L("ANY.RUN","https://any.run")]},
 {k:"Hash",cat:"Malware Intelligence",desc:"Chercher une empreinte connue dans des bases de menace.",tools:[VT,L("MalwareBazaar","https://bazaar.abuse.ch")]},
 {k:"Email",cat:"Email / OSINT",desc:"Analyser des en-têtes et rechercher des indicateurs.",tools:[L("MXToolbox Header Analyzer","https://mxtoolbox.com/EmailHeaders.aspx"),VT]}
 ],
 ir:[
 ["Identifier","Que se passe-t-il, depuis quand, quels systèmes et quels comptes sont concernés ?"],
 ["Isoler","Réduire les communications de la machine ou du compte suspect pour empêcher l'aggravation."],
 ["Contenir","Empêcher la propagation : comptes, segments réseau, sessions et accès."],
 ["Éradiquer","Supprimer la cause après collecte des éléments nécessaires : malware, accès ou vulnérabilité."],
 ["Récupérer","Restaurer depuis une source saine, vérifier puis surveiller."],
 ["Apprendre","Documenter l'incident et corriger le contrôle qui a échoué."]
 ],
 irDo:["Déconnecter ou isoler selon le scénario","Préserver les preuves utiles","Prévenir IT ou sécurité","Noter heure, symptômes et actions","Changer les secrets compromis depuis un environnement sûr"],
 irDont:["Supprimer immédiatement toutes les traces","Continuer à ouvrir un fichier suspect","Brancher des périphériques inconnus","Publier des informations sensibles de l'incident","Tester une technique offensive sur un système non autorisé"],
 certs:[
 {n:"ISC2 CC",lvl:"Débutant",dom:"Général",px:"Prix à vérifier",url:"https://www.isc2.org/certifications/cc",who:"Certification d'entrée pour les fondamentaux de cybersécurité."},
 {n:"Security+",lvl:"Débutant",dom:"Général",px:"Prix à vérifier",url:"https://www.comptia.org/certifications/security",who:"Socle général couvrant les fondamentaux de sécurité."},
 {n:"eJPT",lvl:"Intermédiaire",dom:"Pentest",px:"Prix à vérifier",url:"https://ine.com/security",who:"Certification pratique d'introduction au penetration testing."},
 {n:"BTL1",lvl:"Intermédiaire",dom:"SOC",px:"Prix à vérifier",url:"https://www.securityblue.team/blue-team-level-1",who:"Orientation analyste défensif et investigation pratique."},
 {n:"CySA+",lvl:"Intermédiaire",dom:"SOC",px:"Prix à vérifier",url:"https://www.comptia.org/certifications/cybersecurity-analyst",who:"Analyse de menaces, détection et réponse."},
 {n:"OSCP",lvl:"Avancé",dom:"Pentest",px:"Prix à vérifier",url:"https://www.offsec.com/courses/pen-200/",who:"Certification avancée orientée penetration testing pratique."},
 {n:"CISSP",lvl:"Avancé",dom:"GRC",px:"Prix à vérifier",url:"https://www.isc2.org/certifications/cissp",who:"Certification avancée couvrant de nombreux domaines de sécurité et de gouvernance."}
 ]
};
