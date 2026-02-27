// ==============================================
// IVOISERVICE - Gestion de l'authentification
// Version modifiée avec CNI + Freelance
// ==============================================

// Initialiser les utilisateurs de démonstration
function initDemoUsers() {
  const users = Utils.Storage.get('users', []);
  
  if (users.length === 0) {
    const demoUsers = [
      {
        id: Utils.generateUUID(),
        email: 'client@demo.com',
        password: Utils.hashPassword('demo123'),
        firstName: 'Kouassi',
        lastName: 'Konan',
        phone: '+2250701020304',
        role: 'CLIENT',
        latitude: 5.3213,
        longitude: -4.0114,
        createdAt: Date.now()
      },
      {
        id: Utils.generateUUID(),
        email: 'prestataire@demo.com',
        password: Utils.hashPassword('demo123'),
        firstName: 'Adjoua',
        lastName: 'Yao',
        phone: '+2250705060708',
        role: 'PROVIDER',
        latitude: 5.3480,
        longitude: -3.9838,
        createdAt: Date.now()
      },
      {
        id: Utils.generateUUID(),
        email: 'freelance@demo.com',
        password: Utils.hashPassword('demo123'),
        firstName: 'Aya',
        lastName: 'Kouamé',
        phone: '+2250706070809',
        role: 'PROVIDER',
        latitude: 5.3600,
        longitude: -4.0000,
        createdAt: Date.now()
      },
      {
        id: Utils.generateUUID(),
        email: 'admin@ivoiservice.ci',
        password: Utils.hashPassword('admin123'),
        firstName: 'Admin',
        lastName: 'Ivoiservice',
        phone: '+2250709101112',
        role: 'ADMIN',
        latitude: 5.3213,
        longitude: -4.0114,
        createdAt: Date.now()
      }
    ];
    
    Utils.Storage.set('users', demoUsers);
    
    // Créer le profil prestataire classique pour le compte démo
    const providerProfiles = Utils.Storage.get('providerProfiles', []);
    providerProfiles.push({
      id: Utils.generateUUID(),
      userId: demoUsers[1].id,
      profession: 'PLOMBIER',
      isFreelance: false,
      basePrice: 15000,
      radius: 10,
      description: 'Plombier professionnel avec 10 ans d\'expérience. Intervention rapide et travail soigné.',
      photos: [],
      portfolio: [],
      rating: 4.5,
      reviewCount: 12,
      isVerified: true,
      idDocumentUrl: null,
      idDocumentStatus: 'APPROVED',
      createdAt: Date.now()
    });
    
    // Créer un profil freelance pour le compte démo
    providerProfiles.push({
      id: Utils.generateUUID(),
      userId: demoUsers[2].id,
      profession: 'MARKETING_DIGITAL',
      isFreelance: true,
      basePrice: 25000,
      radius: 50,
      description: 'Expert en marketing digital avec 5 ans d\'expérience. Spécialisé en campagnes Facebook Ads et Google Ads.',
      photos: [],
      portfolio: [
        {
          id: Utils.generateUUID(),
          title: 'Campagne Facebook Ads pour boutique e-commerce',
          description: 'Augmentation de 300% des ventes en 3 mois',
          imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23009E60" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"%3EProjet 1%3C/text%3E%3C/svg%3E',
          createdAt: Date.now()
        },
        {
          id: Utils.generateUUID(),
          title: 'Stratégie SEO pour restaurant',
          description: 'Première page Google en 2 mois pour 10 mots-clés',
          imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23007A4A" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"%3EProjet 2%3C/text%3E%3C/svg%3E',
          createdAt: Date.now()
        }
      ],
      rating: 4.8,
      reviewCount: 8,
      isVerified: true,
      idDocumentUrl: null,
      idDocumentStatus: 'APPROVED',
      createdAt: Date.now()
    });
    
    Utils.Storage.set('providerProfiles', providerProfiles);
    
    // Créer un abonnement actif pour le client démo
    const subscriptions = Utils.Storage.get('subscriptions', []);
    subscriptions.push({
      id: Utils.generateUUID(),
      userId: demoUsers[0].id,
      status: 'ACTIVE',
      startDate: Date.now() - (10 * 24 * 60 * 60 * 1000), // Commencé il y a 10 jours
      endDate: Date.now() + (20 * 24 * 60 * 60 * 1000), // Expire dans 20 jours
      amount: 5000,
      paymentMethod: 'ORANGE_MONEY',
      createdAt: Date.now() - (10 * 24 * 60 * 60 * 1000)
    });
    Utils.Storage.set('subscriptions', subscriptions);
  }
}

// Connexion (utilise sessionStorage uniquement)
function login(email, password) {
  const users = Utils.Storage.get('users', []);
  const hashedPassword = Utils.hashPassword(password);
  
  const user = users.find(u => u.email === email && u.password === hashedPassword);
  
  if (user) {
    // Créer une copie sans le mot de passe
    const userSession = { ...user };
    delete userSession.password;
    
    Utils.Session.login(userSession);
    return { success: true, user: userSession };
  }
  
  return { success: false, message: 'Email ou mot de passe incorrect' };
}

// Inscription client
function registerClient(data) {
  const users = Utils.Storage.get('users', []);
  
  // Vérifier si l'email existe déjà
  if (users.some(u => u.email === data.email)) {
    return { success: false, message: 'Cet email est déjà utilisé' };
  }
  
  // Vérifier si le téléphone existe déjà
  if (users.some(u => u.phone === data.phone)) {
    return { success: false, message: 'Ce numéro de téléphone est déjà utilisé' };
  }
  
  // Créer le nouvel utilisateur
  const newUser = {
    id: Utils.generateUUID(),
    email: data.email,
    password: Utils.hashPassword(data.password),
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    role: 'CLIENT',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    createdAt: Date.now()
  };
  
  users.push(newUser);
  Utils.Storage.set('users', users);
  
  // Créer une session
  const userSession = { ...newUser };
  delete userSession.password;
  Utils.Session.login(userSession);
  
  return { success: true, user: userSession };
}

// Inscription prestataire (avec support Freelance + CNI)
function registerProvider(data) {
  const users = Utils.Storage.get('users', []);
  
  // Vérifier si l'email existe déjà
  if (users.some(u => u.email === data.email)) {
    return { success: false, message: 'Cet email est déjà utilisé' };
  }
  
  // Vérifier si le téléphone existe déjà
  if (users.some(u => u.phone === data.phone)) {
    return { success: false, message: 'Ce numéro de téléphone est déjà utilisé' };
  }
  
  // Vérifier que le document CNI est fourni
  if (!data.idDocument) {
    return { success: false, message: 'Le document d\'identité (CNI ou Passeport) est obligatoire' };
  }
  
  // Créer le nouvel utilisateur
  const newUser = {
    id: Utils.generateUUID(),
    email: data.email,
    password: Utils.hashPassword(data.password),
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    role: 'PROVIDER',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    createdAt: Date.now()
  };
  
  users.push(newUser);
  Utils.Storage.set('users', users);
  
  // Créer le profil prestataire
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const newProfile = {
    id: Utils.generateUUID(),
    userId: newUser.id,
    profession: data.profession,
    isFreelance: data.isFreelance || false,
    basePrice: data.basePrice,
    radius: data.radius,
    description: data.description || '',
    photos: [],
    portfolio: data.isFreelance ? [] : undefined,
    rating: 0,
    reviewCount: 0,
    isVerified: false,
    idDocumentUrl: data.idDocument, // Base64 de l'image CNI
    idDocumentStatus: 'PENDING', // PENDING, APPROVED, REJECTED
    createdAt: Date.now()
  };
  
  providerProfiles.push(newProfile);
  Utils.Storage.set('providerProfiles', providerProfiles);
  
  // Créer une session
  const userSession = { ...newUser };
  delete userSession.password;
  Utils.Session.login(userSession);
  
  return { success: true, user: userSession, profile: newProfile };
}

// Récupérer le profil prestataire d'un utilisateur
function getProviderProfile(userId) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  return providerProfiles.find(p => p.userId === userId);
}

// Récupérer l'abonnement d'un utilisateur
function getUserSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  return subscriptions.find(s => s.userId === userId && s.status === 'ACTIVE');
}

// Récupérer l'historique des abonnements
function getUserSubscriptionHistory(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  return subscriptions.filter(s => s.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
}

// Compter le nombre d'abonnements
function getUserSubscriptionCount(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  return subscriptions.filter(s => s.userId === userId).length;
}

// Vérifier si un client a un abonnement actif
function hasActiveSubscription(userId) {
  const subscription = getUserSubscription(userId);
  
  if (!subscription) return false;
  
  if (subscription.status === 'ACTIVE' && subscription.endDate > Date.now()) {
    return true;
  }
  
  // Mettre à jour le statut si expiré
  if (subscription.endDate <= Date.now() && subscription.status === 'ACTIVE') {
    subscription.status = 'EXPIRED';
    const subscriptions = Utils.Storage.get('subscriptions', []);
    const index = subscriptions.findIndex(s => s.id === subscription.id);
    if (index !== -1) {
      subscriptions[index] = subscription;
      Utils.Storage.set('subscriptions', subscriptions);
    }
  }
  
  return false;
}

// Calculer les jours restants d'abonnement
function getRemainingDays(userId) {
  const subscription = getUserSubscription(userId);
  
  if (!subscription || subscription.status !== 'ACTIVE') {
    return 0;
  }
  
  const now = Date.now();
  const remainingMs = subscription.endDate - now;
  
  if (remainingMs <= 0) {
    return 0;
  }
  
  return Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
}

// Mettre à jour le profil utilisateur
function updateUserProfile(userId, updates) {
  const users = Utils.Storage.get('users', []);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'Utilisateur non trouvé' };
  }
  
  // Ne pas permettre de modifier l'email, le mot de passe ou le rôle ici
  const allowedFields = ['firstName', 'lastName', 'phone', 'latitude', 'longitude'];
  const filteredUpdates = {};
  
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      filteredUpdates[field] = updates[field];
    }
  });
  
  users[userIndex] = { ...users[userIndex], ...filteredUpdates };
  Utils.Storage.set('users', users);
  
  // Mettre à jour la session
  const currentUser = Utils.Session.getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    Utils.Session.updateUser(filteredUpdates);
  }
  
  return { success: true, user: users[userIndex] };
}

// Mettre à jour le profil prestataire
function updateProviderProfile(userId, updates) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const profileIndex = providerProfiles.findIndex(p => p.userId === userId);
  
  if (profileIndex === -1) {
    return { success: false, message: 'Profil prestataire non trouvé' };
  }
  
  const allowedFields = ['profession', 'basePrice', 'radius', 'description', 'photos', 'portfolio', 'idDocumentUrl'];
  const filteredUpdates = {};
  
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      filteredUpdates[field] = updates[field];
    }
  });
  
  providerProfiles[profileIndex] = { ...providerProfiles[profileIndex], ...filteredUpdates };
  Utils.Storage.set('providerProfiles', providerProfiles);
  
  return { success: true, profile: providerProfiles[profileIndex] };
}

// Ajouter un projet au portfolio (Freelance uniquement)
function addPortfolioItem(userId, portfolioItem) {
  const profile = getProviderProfile(userId);
  
  if (!profile) {
    return { success: false, message: 'Profil non trouvé' };
  }
  
  if (!profile.isFreelance) {
    return { success: false, message: 'Cette fonctionnalité est réservée aux freelances' };
  }
  
  if (!profile.portfolio) {
    profile.portfolio = [];
  }
  
  const newItem = {
    id: Utils.generateUUID(),
    title: portfolioItem.title,
    description: portfolioItem.description,
    imageUrl: portfolioItem.imageUrl, // Base64
    createdAt: Date.now()
  };
  
  profile.portfolio.push(newItem);
  
  return updateProviderProfile(userId, { portfolio: profile.portfolio });
}

// Supprimer un projet du portfolio
function removePortfolioItem(userId, itemId) {
  const profile = getProviderProfile(userId);
  
  if (!profile || !profile.portfolio) {
    return { success: false, message: 'Portfolio non trouvé' };
  }
  
  profile.portfolio = profile.portfolio.filter(item => item.id !== itemId);
  
  return updateProviderProfile(userId, { portfolio: profile.portfolio });
}

// Changer le mot de passe
function changePassword(userId, currentPassword, newPassword) {
  const users = Utils.Storage.get('users', []);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'Utilisateur non trouvé' };
  }
  
  const hashedCurrentPassword = Utils.hashPassword(currentPassword);
  
  if (users[userIndex].password !== hashedCurrentPassword) {
    return { success: false, message: 'Mot de passe actuel incorrect' };
  }
  
  users[userIndex].password = Utils.hashPassword(newPassword);
  Utils.Storage.set('users', users);
  
  return { success: true, message: 'Mot de passe modifié avec succès' };
}

// Fonctions ADMIN : Valider/Rejeter CNI
function verifyIdDocument(profileId, status) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const profileIndex = providerProfiles.findIndex(p => p.id === profileId);
  
  if (profileIndex === -1) {
    return { success: false, message: 'Profil non trouvé' };
  }
  
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return { success: false, message: 'Statut invalide' };
  }
  
  providerProfiles[profileIndex].idDocumentStatus = status;
  
  // Si approuvé, activer la vérification
  if (status === 'APPROVED') {
    providerProfiles[profileIndex].isVerified = true;
  } else {
    providerProfiles[profileIndex].isVerified = false;
  }
  
  Utils.Storage.set('providerProfiles', providerProfiles);
  
  return { success: true, profile: providerProfiles[profileIndex] };
}

// Récupérer tous les prestataires en attente de vérification
function getPendingVerifications() {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  return providerProfiles.filter(p => p.idDocumentStatus === 'PENDING');
}

// Initialiser les utilisateurs de démonstration au chargement
document.addEventListener('DOMContentLoaded', () => {
  initDemoUsers();
});

// Exporter les fonctions
window.Auth = {
  login,
  registerClient,
  registerProvider,
  getProviderProfile,
  getUserSubscription,
  getUserSubscriptionHistory,
  getUserSubscriptionCount,
  hasActiveSubscription,
  getRemainingDays,
  updateUserProfile,
  updateProviderProfile,
  addPortfolioItem,
  removePortfolioItem,
  changePassword,
  verifyIdDocument,
  getPendingVerifications,
  initDemoUsers
};
