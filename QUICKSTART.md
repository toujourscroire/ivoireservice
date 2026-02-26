# 🚀 GUIDE DÉMARRAGE RAPIDE - Ivoiservice

## 📥 Installation (30 secondes)

### Méthode 1 : Ouvrir directement
```bash
# 1. Téléchargez tous les fichiers du projet
# 2. Double-cliquez sur index.html
# 3. C'est tout ! 🎉
```

### Méthode 2 : Serveur local (recommandé)
```bash
# Python (déjà installé sur Mac/Linux)
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000

# Puis ouvrez : http://localhost:8000
```

---

## ⚡ Test en 2 minutes

### 🎯 Scénario complet

#### 1. Connexion Client (15 sec)
```
1. Ouvrez index.html
2. Cliquez "Connexion" 
3. Utilisez : client@demo.com / demo123
4. Vous êtes sur le dashboard client
```

#### 2. Rechercher un prestataire (30 sec)
```
1. Cliquez "Rechercher" dans le menu
2. Choisissez "Plombier" 
3. Distance : 10 km
4. Cliquez "Rechercher"
5. 2-3 plombiers s'affichent
```

#### 3. Demander un service (30 sec)
```
1. Cliquez sur une carte prestataire
2. Consultez le profil
3. Cliquez "Demander un service"
4. Décrivez : "Fuite dans la salle de bain"
5. Envoyez
6. ✅ Demande envoyée !
```

#### 4. Tester le prestataire (30 sec)
```
1. Déconnectez-vous
2. Connexion : prestataire@demo.com / demo123
3. Vous voyez la demande reçue
4. Cliquez "Accepter"
5. ✅ Statut mis à jour !
```

#### 5. Vérifier en Admin (15 sec)
```
1. Déconnectez-vous
2. Connexion : admin@ivoiservice.ci / admin123
3. Consultez les statistiques
4. Vérifiez un prestataire
5. ✅ Badge vérifié ajouté !
```

**Total : 2 minutes pour tester tout le flow !** 🎉

---

## 🎮 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| 👤 Client | `client@demo.com` | `demo123` |
| 👷 Prestataire | `prestataire@demo.com` | `demo123` |
| 🛡️ Admin | `admin@ivoiservice.ci` | `admin123` |

---

## 📱 Pages principales

| Page | URL | Description |
|------|-----|-------------|
| 🏠 Accueil | `index.html` | Présentation + 10 services |
| 🔍 Recherche | `search.html` | Trouver un prestataire |
| 👤 Profil | `provider-profile.html?id={userId}` | Détails prestataire |
| 💳 Abonnement | `subscription.html` | Souscrire 5000 FCFA |
| 📊 Dashboard Client | `client-dashboard.html` | Mes demandes |
| 📊 Dashboard Prestataire | `provider-dashboard.html` | Mes services |
| 🛡️ Dashboard Admin | `admin-dashboard.html` | Gestion plateforme |

---

## 🎨 Couleurs du thème

```css
/* Vert Côte d'Ivoire */
--primary: #009E60
--primary-dark: #007A4A
--primary-soft: #BFEAD6

/* Neutrals */
--background: #F7FAF9
--card: #FFFFFF
--text: #1F2937
```

---

## 🔧 Structure des fichiers

```
ivoiservice/
├── index.html              ⭐ Commencez ici !
├── login.html
├── register-client.html
├── register-provider.html
├── search.html
├── provider-profile.html
├── client-dashboard.html
├── provider-dashboard.html
├── subscription.html
├── admin-dashboard.html
├── css/
│   ├── style.css
│   └── responsive.css
└── js/
    ├── utils.js
    ├── auth.js
    ├── search.js
    └── subscription.js
```

---

## 💡 Conseils

### ✅ À faire
- Ouvrir dans un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Autoriser la géolocalisation si demandé
- Tester sur mobile pour voir le responsive
- Consulter la console développeur pour les logs

### ❌ À éviter
- Ne pas utiliser Internet Explorer
- Ne pas vider le localStorage (perte de données)
- Ne pas attendre de vraies transactions
- Ne pas utiliser en production tel quel

---

## 🐛 Résolution de problèmes

### Problème : "Aucun prestataire trouvé"
**Solution :** Les prestataires démo sont générés au premier chargement. Rafraîchissez la page.

### Problème : "Vous devez être connecté"
**Solution :** Connectez-vous avec un compte démo avant d'accéder aux fonctionnalités protégées.

### Problème : "Abonnement requis"
**Solution :** Le compte client démo a déjà un abonnement. Si vous créez un nouveau compte, allez sur `subscription.html`.

### Problème : Les données disparaissent
**Solution :** Normal ! Les données sont en localStorage. Ne videz pas le cache.

### Problème : Erreur de géolocalisation
**Solution :** Autorisez la géolocalisation ou une position par défaut à Abidjan sera utilisée.

---

## 📚 Documentation complète

Pour en savoir plus :
- 📖 **README.md** - Documentation technique complète
- 📦 **LIVRAISON.md** - Récapitulatif de la livraison
- 💻 **Code source** - Tous les fichiers sont commentés

---

## 🎯 Prêt à tester ?

```bash
# Étape 1 : Ouvrez index.html
# Étape 2 : Cliquez "Connexion"
# Étape 3 : Utilisez client@demo.com / demo123
# Étape 4 : Explorez ! 🚀
```

**Temps de prise en main : 2 minutes**  
**Temps pour tout tester : 10 minutes**

---

🇨🇮 **Bon test sur Ivoiservice !**

*Si vous avez des questions, consultez la FAQ dans README.md*
