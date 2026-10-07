# CyberHub

**Learn · Analyze · Detect · Protect · Practice · Certify**

CyberHub est une plateforme pédagogique d'orientation en cybersécurité. Elle aide l'utilisateur à répondre à cinq questions :

- **Qu'est-ce qui se passe ?** → Détecter
- **Comment me protéger ?** → Protéger
- **Comment fonctionne cette attaque ?** → Comprendre
- **Quel outil dois-je utiliser ?** → Tool Finder
- **Où apprendre et quelle certification viser ?** → Roadmap / Ressources / Certifications

## Fonctionnalités

- Analyse heuristique locale d'URL avec indicateurs explicables.
- Vérification externe manuelle via VirusTotal, URLScan, Google Safe Browsing et PhishTank.
- Détection par symptôme : phishing, compte compromis, malware, ransomware, activité réseau.
- Checklists de protection par actif avec progression persistante dans `localStorage`.
- Fiches d'attaques : fonctionnement, impact, détection, prévention et entraînement légal.
- Types d'acteurs : White Hat, Black Hat, Grey Hat, Script Kiddie, Hacktivist, Insider.
- Tool Finder pour URL, IP, domaine, fichier, hash et email.
- Guide de réponse à incident : Identifier → Isoler → Contenir → Éradiquer → Récupérer → Apprendre.
- Roadmap cybersécurité + ressources gratuites + chaînes YouTube.
- Fondamentaux : CIA, authentification, autorisation, chiffrement, hashing, MFA, PKI, TLS, firewall, IDS/IPS, SIEM, Zero Trust.
- Certifications avec filtres par niveau et domaine.
- Design responsive, thème sombre automatique et fonctionnalités d'accessibilité.

## Analyse d'URL : limites importantes

L'analyse locale ne donne **jamais** un verdict « sûr ». Elle repère des caractéristiques de l'URL : HTTPS absent, adresse IP, punycode, `@`, raccourcisseur, TLD inhabituel, imitation de marque, mots liés à l'authentification, etc.

La version actuelle n'appelle pas automatiquement les APIs externes. Les boutons ouvrent les services concernés. Cela évite d'exposer des clés API et respecte le principe « aucune donnée envoyée automatiquement ».

## Architecture actuelle

```text
Browser
  │
  ├── index.html
  ├── css/style.css
  └── js/
      ├── data.js       ← contenu data-driven
      └── app.js        ← routing + logique + analyse

localStorage
  └── progression des checklists
```

## Architecture future recommandée

```text
Frontend CyberHub
       │
       ▼
CyberHub API (Node/FastAPI)
       │
       ├── VirusTotal
       ├── URLScan
       ├── Safe Browsing
       ├── RDAP / WHOIS
       └── autres sources de threat intelligence
       │
       ▼
Corrélation + cache + rate limiting
       │
       ▼
Rapport CyberHub
```

Les clés API ne doivent jamais être placées dans `app.js` ou dans le navigateur.

## Lancer localement

```bash
python3 -m http.server 8000
```

Puis ouvrir : `http://localhost:8000`

Le projet reste volontairement sans framework et sans dépendance pour cette version. Il pourra ensuite migrer vers React + Vite + TypeScript et une API.

## Sécurité et usage

Le contenu offensif reste pédagogique. Les exercices doivent être réalisés uniquement sur des environnements possédés ou explicitement autorisés.

## Structure

```text
cyberhub/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── data.js
├── README.md
└── .gitignore
```

## V3 — Direction artistique

La homepage adopte une identité **black / white / danger red**. Le rouge est réservé aux signaux de risque, alertes, actions et éléments de cybersécurité sensibles. La page d'accueil utilise une visualisation 3D abstraite Three.js : sphère/icosaèdres filaires, particules, anneaux et lignes de monitoring.

Three.js est chargé côté client depuis jsDelivr. Si WebGL/Three.js n'est pas disponible, le reste du site reste fonctionnel.
