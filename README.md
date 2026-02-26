# 🇨🇮 Ivoiservice - Prototype Statique

## 📋 Description

**Ivoiservice** est un prototype statique d'une plateforme de mise en relation entre clients et prestataires de services locaux en Côte d'Ivoire.

### 🎯 Services proposés
- Garagiste
- Plombier
- Électricien
- Menuisier
- Frigoriste
- Maçon
- Peintre
- Serrurier
- Réparateur téléphone
- Mécanicien moto

---

## ⚠️ IMPORTANT : Ceci est un PROTOTYPE STATIQUE

Ce projet est une **démonstration visuelle** de l'application Ivoiservice. Il simule les fonctionnalités mais ne possède pas de véritable backend.

### ✅ Ce qui fonctionne (simulation) :
- Interface utilisateur complète et responsive
- Navigation entre les pages
- Formulaires d'inscription et connexion (données en localStorage)
- Recherche de prestataires avec filtres
- Affichage des profils prestataires
- Système d'abonnement (simulé)
- Dashboard administrateur
- Calcul de distance (Haversine simulé)

### ❌ Ce qui n'est PAS implémenté :
- Vraie base de données PostgreSQL
- Backend Next.js avec API Routes
- Authentification JWT sécurisée avec httpOnly cookies
- Upload réel de fichiers (CNI, selfies, photos)
- Système de paiement réel
- Emails de notification
- Stockage permanent des données

---

## 🎨 Thème de couleurs

```css
Primary: #009E60 (Vert Côte d'Ivoire)
PrimaryDark: #007A4A
PrimarySoft: #BFEAD6
Background: #F7FAF9
Card: #FFFFFF
Text: #1F2937
```

---

## 📁 Structure du projet

```
ivoiservice/
│
├── index.html                 # ✅ Page d'accueil avec présentation services
├── login.html                 # ✅ Connexion avec comptes démo
├── register-client.html       # ✅ Inscription client avec géolocalisation
├── register-provider.html     # ✅ Inscription prestataire complète
├── search.html                # ✅ Recherche avec filtres (métier, distance, tri)
├── provider-profile.html      # ✅ Profil prestataire détaillé + avis
├── client-dashboard.html      # ✅ Tableau de bord client + demandes
├── provider-dashboard.html    # ✅ Tableau de bord prestataire + stats
├── subscription.html          # ✅ Page abonnement 5000 FCFA/mois
├── admin-dashboard.html       # ✅ Dashboard admin avec vérification
│
├── css/
│   ├── style.css             # ✅ Styles principaux (14.8 Ko)
│   └── responsive.css        # ✅ Responsive mobile/tablet/desktop (6.9 Ko)
│
├── js/
│   ├── utils.js              # ✅ Utilitaires + Haversine + Storage (11 Ko)
│   ├── auth.js               # ✅ Authentification + gestion comptes (9.7 Ko)
│   ├── search.js             # ✅ Recherche + avis + demandes (12.5 Ko)
│   └── subscription.js       # ✅ Abonnements + paiements simulés (5.6 Ko)
│
└── README.md                 # ✅ Documentation complète
```

**Total : 11 pages HTML + 4 fichiers JS + 2 fichiers CSS = 17 fichiers**

---

## 🚀 Démarrage rapide

### Option 1 : Ouvrir directement
1. Téléchargez tous les fichiers du projet
2. Ouvrez `index.html` dans votre navigateur
3. Naviguez dans l'application

### Option 2 : Serveur local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server -p 8000

# Avec PHP
php -S localhost:8000

# Ouvrez http://localhost:8000
```

---

## 🧪 Guide de test complet

### 1️⃣ Tester en tant que CLIENT

**Étape 1 : Connexion**
- Allez sur `login.html`
- Utilisez : `client@demo.com` / `demo123`
- Vous êtes redirigé vers le dashboard client

**Étape 2 : Vérifier l'abonnement**
- Sur le dashboard, vous verrez "Abonnement actif"
- L'abonnement démo expire dans 30 jours

**Étape 3 : Rechercher un prestataire**
- Cliquez sur "Rechercher" dans le menu
- Choisissez un métier (ex: Plombier)
- Réglez la distance maximale (ex: 10 km)
- Triez par note, distance ou prix
- 10 prestataires démo sont disponibles

**Étape 4 : Consulter un profil**
- Cliquez sur une carte prestataire
- Consultez les détails, la note, les avis
- Cliquez sur "Demander un service"

**Étape 5 : Demander un service**
- Décrivez votre besoin dans le formulaire
- Envoyez la demande
- Retournez au dashboard pour voir l'historique

### 2️⃣ Tester en tant que PRESTATAIRE

**Étape 1 : Connexion**
- Allez sur `login.html`
- Utilisez : `prestataire@demo.com` / `demo123`
- Dashboard prestataire s'affiche

**Étape 2 : Consulter les stats**
- Note moyenne : 4.5/5
- Nombre d'avis : 12
- Rayon d'intervention : 10 km

**Étape 3 : Gérer les demandes**
- Consultez les demandes reçues
- Acceptez ou refusez une demande
- Marquez comme terminée

**Étape 4 : Inscription nouveau prestataire**
- Déconnectez-vous
- Allez sur `register-provider.html`
- Remplissez le formulaire
- Choisissez votre métier et rayon
- Votre profil apparaît dans la recherche
- Status "Non vérifié" jusqu'à validation admin

### 3️⃣ Tester en tant qu'ADMIN

**Étape 1 : Connexion**
- Utilisez : `admin@ivoiservice.ci` / `admin123`
- Dashboard admin complet

**Étape 2 : Consulter les statistiques**
- Nombre total d'utilisateurs
- Clients vs Prestataires
- Abonnements actifs

**Étape 3 : Gérer les utilisateurs**
- Onglet "Utilisateurs" : liste complète
- Informations détaillées (email, téléphone, rôle)

**Étape 4 : Vérifier les prestataires**
- Onglet "Prestataires à vérifier"
- Cliquez "Vérifier" pour approuver
- Le prestataire obtient le badge vérifié

**Étape 5 : Consulter les abonnements**
- Onglet "Abonnements"
- Voir tous les paiements
- Statuts : ACTIVE, EXPIRED, CANCELLED

### 4️⃣ Tester le système d'abonnement

**Sans abonnement :**
- Créez un nouveau compte client
- Essayez de contacter un prestataire
- Vous êtes redirigé vers la page d'abonnement

**Souscrire :**
- Choisissez un mode de paiement
- Cliquez "Payer 5000 FCFA"
- Paiement simulé (95% de succès)
- Abonnement activé pour 30 jours

**Après expiration :**
- L'abonnement passe en EXPIRED
- Renouvellement nécessaire pour continuer

### 5️⃣ Tester la recherche géolocalisée

**Avec géolocalisation :**
- Autorisez l'accès à votre position
- Les distances sont calculées depuis votre position

**Sans géolocalisation :**
- Une position à Abidjan est utilisée par défaut
- Distances simulées mais cohérentes

### 6️⃣ Tester les avis et notes

**En tant que client abonné :**
- Consultez un profil prestataire
- Laissez une note (1-5 étoiles)
- Ajoutez un commentaire
- L'avis apparaît immédiatement
- La note moyenne est recalculée

---

## 👥 Comptes de démonstration

### Comptes pré-configurés

| Rôle | Email | Mot de passe | Spécificités |
|------|-------|--------------|--------------|
| **Client** | client@demo.com | demo123 | Abonnement actif (expire dans 30j) |
| **Prestataire** | prestataire@demo.com | demo123 | Plombier vérifié, Note 4.5/5, 12 avis |
| **Admin** | admin@ivoiservice.ci | admin123 | Accès complet gestion plateforme |

### Prestataires démo générés automatiquement

L'application génère automatiquement **10 prestataires** couvrant tous les métiers :

1. **Yao Kouassi** - Garagiste (Cocody) - 4.8/5 ⭐
2. **Adjoua Yao** - Plombier (Attécoubé) - 4.5/5 ⭐
3. **Koffi N'Guessan** - Électricien (Adjamé) - 4.7/5 ⭐
4. **Aya Koné** - Menuisier (Treichville) - 4.9/5 ⭐
5. **Jean Kouamé** - Frigoriste (Plateau) - 4.6/5 ⭐
6. **Marie Brou** - Maçon (Marcory) - 4.8/5 ⭐
7. **Serge Konan** - Peintre (Koumassi) - 4.4/5 ⭐
8. **Akissi Diallo** - Serrurier (Port-Bouët) - 4.7/5 ⭐
9. **Ibrahim Touré** - Réparateur téléphone (Yopougon) - 4.5/5 ⭐
10. **Boubacar Traoré** - Mécanicien moto (Abobo) - 4.6/5 ⭐

Chaque prestataire a :
- Une localisation dans un quartier d'Abidjan
- Un prix de base réaliste
- Un rayon d'intervention (5-20 km)
- Des avis et notes
- Un statut de vérification (70% vérifiés)

---

## ⚠️ Limitations du prototype (Important)

### Ce qui fonctionne (Simulation)
✅ Interface utilisateur complète et responsive  
✅ Navigation entre les pages  
✅ Formulaires d'inscription et connexion  
✅ Recherche avec filtres fonctionnels  
✅ Affichage des profils et avis  
✅ Système d'abonnement simulé  
✅ Dashboard administrateur  
✅ Calcul de distance Haversine

### Ce qui n'est PAS implémenté (Backend requis)
❌ **Vraie base de données** - Données stockées en localStorage (volatiles)  
❌ **Backend Next.js** - Pas de serveur Node.js  
❌ **Authentification sécurisée** - Pas de JWT httpOnly cookies  
❌ **Upload de fichiers** - CNI et selfies non uploadables réellement  
❌ **Paiement réel** - Orange Money/MTN/Wave non intégrés  
❌ **Emails** - Pas de notifications email  
❌ **Stockage permanent** - Les données disparaissent si vous videz le cache  
❌ **API REST** - Pas d'endpoints Next.js API Routes  
❌ **Prisma ORM** - Pas de connexion PostgreSQL  
❌ **Protection CSRF/XSS** - Pas de sécurisation backend

### Données simulées
- Mots de passe hashés avec fonction simple (NON sécurisé)
- Transactions de paiement simulées (succès à 95%)
- Géolocalisation utilise quartiers d'Abidjan par défaut
- localStorage utilisé comme "base de données"
- Avis et notes générés automatiquement

### Pour la production
Ce prototype doit être **réimplémenté avec un vrai backend** :
- Next.js 14 + TypeScript + App Router
- PostgreSQL + Prisma ORM
- Auth JWT avec httpOnly cookies
- Upload S3/Cloudinary pour images
- Intégration vraie API de paiement mobile
- Emails transactionnels
- Tests unitaires et e2e
- Déploiement Vercel/Railway

---

## ✅ Fonctionnalités implémentées (100%)

### 🎯 Authentification complète
- ✅ Inscription client avec validation email/téléphone
- ✅ Inscription prestataire avec infos professionnelles
- ✅ Connexion sécurisée (simulation JWT)
- ✅ Gestion des rôles (CLIENT, PROVIDER, ADMIN)
- ✅ Comptes de démonstration pré-configurés
- ✅ Géolocalisation automatique (Abidjan par défaut)

### 👷 Prestataires
- ✅ 10 prestataires démo créés automatiquement
- ✅ Profil complet (métier, prix, rayon, description)
- ✅ Système de notes et avis
- ✅ Photos de profil (avatars générés)
- ✅ Statut de vérification (CNI + selfie simulé)
- ✅ Rayon d'intervention configurable (5-20 km)

### 🔍 Recherche intelligente
- ✅ Filtrage par métier (10 professions)
- ✅ Filtrage par distance (5, 10, 15, 20 km)
- ✅ Tri par distance, note ou prix
- ✅ Calcul distance Haversine en temps réel
- ✅ Affichage des prestataires vérifiés en priorité
- ✅ Interface responsive avec cartes cliquables

### 💳 Système d'abonnement
- ✅ Abonnement obligatoire 5000 FCFA/mois pour clients
- ✅ 3 modes de paiement simulés (Orange Money, MTN, Wave)
- ✅ Gestion statut ACTIVE/EXPIRED
- ✅ Calcul jours restants
- ✅ Renouvellement automatique
- ✅ Blocage contact sans abonnement

### 📋 Demandes de service
- ✅ Création demande par clients abonnés
- ✅ Réception par prestataires
- ✅ Statuts : PENDING, ACCEPTED, COMPLETED, CANCELLED
- ✅ Historique complet
- ✅ Notifications visuelles

### ⭐ Système d'avis
- ✅ Clients peuvent noter (1-5 étoiles)
- ✅ Commentaires texte
- ✅ Calcul note moyenne automatique
- ✅ Affichage chronologique
- ✅ Un avis par client par prestataire

### 🛡️ Dashboard Admin
- ✅ Statistiques globales (users, clients, prestataires, abonnements)
- ✅ Liste complète des utilisateurs
- ✅ Vérification identité prestataires
- ✅ Gestion des abonnements
- ✅ Interface tabs pour navigation

### 📱 Design & UX
- ✅ Design moderne aux couleurs de la Côte d'Ivoire
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Animations fluides
- ✅ Toasts de notification
- ✅ Modals pour interactions
- ✅ Navigation intuitive
- ✅ Icônes Font Awesome pour chaque métier

## 📱 Fonctionnalités par rôle détaillées

### 🙋 CLIENT
- ✅ Inscription avec informations personnelles
- ✅ Connexion sécurisée (simulation)
- ✅ Recherche de prestataires par métier
- ✅ Filtrage par distance (5, 10, 15, 20 km)
- ✅ Consultation des profils prestataires
- ✅ Voir galerie photos et avis
- ✅ Demander un service (nécessite abonnement actif)
- ✅ Abonnement mensuel 5000 FCFA
- ✅ Tableau de bord personnel

### 👷 PRESTATAIRE
- ✅ Inscription avec informations professionnelles
- ✅ Sélection du métier
- ✅ Définition du rayon d'intervention (5-20 km)
- ✅ Prix de base du service
- ✅ Ajout de photos (galerie)
- ✅ Réception de demandes de service
- ✅ Gestion du profil
- ✅ Consultation des avis clients
- ✅ Validation d'identité (CNI + selfie)

### 🛡️ ADMIN
- ✅ Vue d'ensemble des utilisateurs
- ✅ Validation des identités prestataires
- ✅ Vérification CNI et selfie
- ✅ Activation/Désactivation de comptes
- ✅ Gestion des abonnements
- ✅ Statistiques de la plateforme

---

## 🗄️ Structure de données (simulation)

### User
```javascript
{
  id: "uuid",
  email: "string",
  password: "string", // ⚠️ NON hashé dans ce prototype
  firstName: "string",
  lastName: "string",
  phone: "string",
  role: "CLIENT | PROVIDER | ADMIN",
  latitude: number,
  longitude: number,
  createdAt: timestamp
}
```

### ProviderProfile
```javascript
{
  id: "uuid",
  userId: "uuid",
  profession: "GARAGISTE | PLOMBIER | ELECTRICIEN | ...",
  basePrice: number,
  radius: number, // 5, 10, 15, 20 km
  description: "string",
  photos: ["url1", "url2", ...],
  rating: number,
  reviewCount: number,
  isVerified: boolean
}
```

### Subscription
```javascript
{
  id: "uuid",
  userId: "uuid",
  status: "ACTIVE | EXPIRED",
  startDate: timestamp,
  endDate: timestamp,
  amount: 5000 // FCFA
}
```

### ServiceRequest
```javascript
{
  id: "uuid",
  clientId: "uuid",
  providerId: "uuid",
  description: "string",
  status: "PENDING | ACCEPTED | COMPLETED | CANCELLED",
  createdAt: timestamp
}
```

### Review
```javascript
{
  id: "uuid",
  providerId: "uuid",
  clientId: "uuid",
  rating: number, // 1-5
  comment: "string",
  createdAt: timestamp
}
```

### AdminVerification
```javascript
{
  id: "uuid",
  providerId: "uuid",
  cniPhoto: "url",
  selfiePhoto: "url",
  status: "PENDING | APPROVED | REJECTED",
  verifiedAt: timestamp
}
```

---

## 📍 Calcul de distance (Haversine)

La formule Haversine est implémentée en JavaScript pour calculer la distance entre deux points géographiques :

```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

---

## 🔐 Sécurité (Limitations du prototype)

⚠️ **Ce prototype n'est PAS sécurisé pour une utilisation en production** :

- Mots de passe stockés en clair dans localStorage
- Pas de validation côté serveur
- Pas de protection CSRF/XSS
- Pas de cookies httpOnly
- Pas de rate limiting
- Données volatiles (localStorage)

---

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique moderne
- **CSS3** - Styles avancés avec variables CSS
- **JavaScript ES6+** - Logique client moderne (async/await, modules)
- **Font Awesome 6.4** - Bibliothèque d'icônes (via CDN)
- **Google Fonts (Inter)** - Typographie professionnelle (via CDN)

### Stockage & Données
- **localStorage** - Persistance temporaire des données
- **JSON** - Format d'échange de données
- **IndexedDB** (prêt pour upgrade) - Stockage structuré client

### Utilitaires JavaScript
- **Formule Haversine** - Calcul précis des distances géographiques
- **UUID v4** - Génération d'identifiants uniques
- **Date/Time formatting** - Internationalisation française
- **Email/Phone validation** - Regex pour validation côté client

### Design & UX
- **Responsive Design** - Mobile-first, breakpoints pour tablet/desktop
- **CSS Grid & Flexbox** - Layouts modernes
- **CSS Transitions** - Animations fluides
- **Toast Notifications** - Feedback utilisateur immédiat
- **Modal Components** - Interactions contextuelles

### Architecture
- **MVC Pattern** (simplifié) - Séparation logique/présentation
- **Module Pattern** - Encapsulation du code JavaScript
- **Event-Driven** - Gestion événements DOM
- **Storage Abstraction** - Interface unifiée pour localStorage

---

## 🎨 Thème de couleurs (Côte d'Ivoire)

```css
/* Palette principale */
Primary: #009E60      /* Vert drapeau ivoirien */
PrimaryDark: #007A4A  /* Vert foncé pour hover */
PrimarySoft: #BFEAD6  /* Vert clair pour backgrounds */

/* Neutrals */
Background: #F7FAF9   /* Fond général léger */
Card: #FFFFFF         /* Cartes et contenus */
Text: #1F2937         /* Texte principal */
Text-Light: #6B7280   /* Texte secondaire */
Border: #E5E7EB       /* Bordures subtiles */

/* Status */
Success: #10B981      /* Actions positives */
Error: #EF4444        /* Erreurs */
Warning: #F59E0B      /* Avertissements */
```

---

## ❓ FAQ (Questions fréquentes)

### Q1 : Les données sont-elles sauvegardées ?
**R :** Non, les données sont stockées dans `localStorage` et disparaissent si vous :
- Videz le cache du navigateur
- Utilisez le mode navigation privée
- Changez de navigateur

### Q2 : Puis-je vraiment payer avec Orange Money ?
**R :** Non, c'est une **simulation**. Le paiement affiche une interface réaliste mais n'effectue aucune transaction réelle.

### Q3 : Comment uploader ma CNI ou selfie ?
**R :** Cette fonctionnalité nécessite un backend. Dans ce prototype, la vérification se fait manuellement par l'admin sans upload réel.

### Q4 : Les distances calculées sont-elles précises ?
**R :** Oui ! La formule Haversine calcule des distances réelles entre coordonnées GPS. Cependant, les positions des prestataires sont simulées dans Abidjan.

### Q5 : Puis-je créer plusieurs comptes ?
**R :** Oui, mais ils sont stockés localement. Vous pouvez créer autant de comptes que vous voulez sur votre navigateur.

### Q6 : L'application fonctionne-t-elle hors ligne ?
**R :** Partiellement. Les pages HTML/CSS/JS sont chargées, mais aucune nouvelle donnée ne peut être récupérée sans connexion.

### Q7 : Comment déployer en production ?
**R :** Ce prototype est **uniquement pour démonstration**. Pour la production :
1. Réimplémenter avec Next.js + TypeScript
2. Ajouter PostgreSQL + Prisma
3. Intégrer vraies APIs de paiement
4. Implémenter authentification sécurisée
5. Déployer sur Vercel/Railway
6. Configurer domaine et HTTPS

### Q8 : Les avis sont-ils réels ?
**R :** Non, les avis des prestataires démo sont générés automatiquement. Les nouveaux avis que vous créez sont réels (dans localStorage).

### Q9 : Puis-je modifier le code ?
**R :** Oui ! Le code est fourni à titre éducatif. Tous les fichiers HTML/CSS/JS sont modifiables.

### Q10 : Combien coûterait la version production ?
**R :** Estimation pour développement complet :
- Développeur fullstack Next.js : 2-3 mois
- Infrastructure (Vercel + Supabase) : ~50$/mois
- Intégration paiement : Frais de transaction variables
- Maintenance : Budget mensuel continu

---

## 📱 Pages disponibles

| Page | URL | Description | Status |
|------|-----|-------------|--------|
| Accueil | `index.html` | Page d'accueil avec présentation + 10 services | ✅ Fonctionnel |
| Connexion | `login.html` | Authentification avec comptes démo | ✅ Fonctionnel |
| Inscription Client | `register-client.html` | Formulaire client + géolocalisation | ✅ Fonctionnel |
| Inscription Prestataire | `register-provider.html` | Formulaire prestataire complet | ✅ Fonctionnel |
| Recherche | `search.html` | Recherche avec filtres (métier, distance, tri) | ✅ Fonctionnel |
| Profil Prestataire | `provider-profile.html?id={userId}` | Détails + galerie + avis + contact | ✅ Fonctionnel |
| Dashboard Client | `client-dashboard.html` | Espace client + demandes + abonnement | ✅ Fonctionnel |
| Dashboard Prestataire | `provider-dashboard.html` | Espace prestataire + stats + demandes | ✅ Fonctionnel |
| Abonnement | `subscription.html` | Paiement 5000 FCFA simulé | ✅ Fonctionnel |
| Admin | `admin-dashboard.html` | Gestion utilisateurs + vérifications | ✅ Fonctionnel |

---

## 🚧 Pour passer en production (Next.js)

Ce prototype doit être réimplémenté avec :

### Backend
- **Next.js 14** avec App Router
- **TypeScript** pour la sécurité des types
- **API Routes** pour les endpoints REST
- **Prisma ORM** pour PostgreSQL
- **JWT + httpOnly cookies** pour l'auth
- **bcrypt** pour hasher les mots de passe
- **Zod** pour validation des données

### Base de données
- **PostgreSQL** (Supabase, Neon, ou self-hosted)
- **Prisma migrations** pour versionner le schéma

### Stockage fichiers
- **AWS S3** ou **Cloudinary** pour les images
- **Multer** ou **Formidable** pour l'upload

### Paiement
- Intégration **Orange Money** / **MTN Mobile Money**
- Ou **Wave** / **Moov Money**

### Déploiement
- **Vercel** (recommandé pour Next.js)
- **Railway** ou **Render** (alternatives)

### Sécurité
- HTTPS obligatoire
- Rate limiting (Upstash Redis)
- Validation CSRF
- Sanitization des inputs
- Protection XSS/injection SQL

---

## 📞 Support

Pour transformer ce prototype en application production-ready, vous aurez besoin d'un développeur fullstack Next.js/TypeScript.

---

## 📄 Licence

Ce prototype est fourni à titre de démonstration uniquement.

---

**Créé avec ❤️ pour Ivoiservice 🇨🇮**
