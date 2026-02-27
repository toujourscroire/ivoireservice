// ==============================================
// IVOISERVICE - Gestion de l'authentification
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
    
    // Créer le profil prestataire pour le compte démo
    const providerProfiles = Utils.Storage.get('providerProfiles', []);
    providerProfiles.push({
      id: Utils.generateUUID(),
      userId: demoUsers[1].id,
      profession: 'PLOMBIER',
      basePrice: 15000,
      radius: 10,
      description: 'Plombier professionnel avec 10 ans d\'expérience. Intervention rapide et travail soigné.',
      photos: [],
      rating: 4.5,
      reviewCount: 12,
      isVerified: true,
      createdAt: Date.now()
    });
    Utils.Storage.set('providerProfiles', providerProfiles);
    
    // Créer un abonnement actif pour le client démo
    const subscriptions = Utils.Storage.get('subscriptions', []);
    subscriptions.push({
      id: Utils.generateUUID(),
      userId: demoUsers[0].id,
      status: 'ACTIVE',
      startDate: Date.now(),
      endDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // +30 jours
      amount: 5000,
      createdAt: Date.now()
    });
    Utils.Storage.set('subscriptions', subscriptions);
  }
}

// Connexion
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

// Inscription prestataire
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
    basePrice: data.basePrice,
    radius: data.radius,
    description: data.description || '',
    photos: [],
    rating: 0,
    reviewCount: 0,
    isVerified: false,
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
  return subscriptions.find(s => s.userId === userId);
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
  
  const allowedFields = ['profession', 'basePrice', 'radius', 'description', 'photos'];
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

// ==============================================
// GESTION DES PHOTOS PRESTATAIRES
// ==============================================

// Ajouter une photo au profil prestataire
function addProviderPhoto(userId, photoBase64) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const profileIndex = providerProfiles.findIndex(p => p.userId === userId);
  
  if (profileIndex === -1) {
    return { success: false, message: 'Profil prestataire non trouvé' };
  }
  
  if (!providerProfiles[profileIndex].photos) {
    providerProfiles[profileIndex].photos = [];
  }
  
  // Vérifier limite 10 photos
  if (providerProfiles[profileIndex].photos.length >= 10) {
    return { success: false, message: 'Maximum 10 photos autorisées' };
  }
  
  // Créer la nouvelle photo
  const newPhoto = {
    id: Utils.generateUUID(),
    url: photoBase64,
    status: 'PENDING', // PENDING, APPROVED, REJECTED
    uploadedAt: Date.now()
  };
  
  providerProfiles[profileIndex].photos.push(newPhoto);
  Utils.Storage.set('providerProfiles', providerProfiles);
  
  return { success: true, photo: newPhoto };
}

// Supprimer une photo du profil prestataire
function deleteProviderPhoto(userId, photoId) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const profileIndex = providerProfiles.findIndex(p => p.userId === userId);
  
  if (profileIndex === -1) {
    return { success: false, message: 'Profil prestataire non trouvé' };
  }
  
  if (!providerProfiles[profileIndex].photos) {
    return { success: false, message: 'Aucune photo à supprimer' };
  }
  
  const photoIndex = providerProfiles[profileIndex].photos.findIndex(p => p.id === photoId);
  
  if (photoIndex === -1) {
    return { success: false, message: 'Photo non trouvée' };
  }
  
  providerProfiles[profileIndex].photos.splice(photoIndex, 1);
  Utils.Storage.set('providerProfiles', providerProfiles);
  
  return { success: true };
}

// Récupérer toutes les photos d'un prestataire
function getProviderPhotos(userId, statusFilter = null) {
  const profile = getProviderProfile(userId);
  
  if (!profile || !profile.photos) {
    return [];
  }
  
  if (statusFilter) {
    return profile.photos.filter(p => p.status === statusFilter);
  }
  
  return profile.photos;
}

// Modifier le statut d'une photo (pour l'admin)
function updatePhotoStatus(profileId, photoId, newStatus) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const profileIndex = providerProfiles.findIndex(p => p.id === profileId);
  
  if (profileIndex === -1) {
    return { success: false, message: 'Profil prestataire non trouvé' };
  }
  
  if (!providerProfiles[profileIndex].photos) {
    return { success: false, message: 'Aucune photo trouvée' };
  }
  
  const photoIndex = providerProfiles[profileIndex].photos.findIndex(p => p.id === photoId);
  
  if (photoIndex === -1) {
    return { success: false, message: 'Photo non trouvée' };
  }
  
  providerProfiles[profileIndex].photos[photoIndex].status = newStatus;
  providerProfiles[profileIndex].photos[photoIndex].reviewedAt = Date.now();
  Utils.Storage.set('providerProfiles', providerProfiles);
  
  return { success: true };
}

// Récupérer toutes les photos en attente de validation (pour l'admin)
function getPendingPhotos() {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const users = Utils.Storage.get('users', []);
  const pendingPhotos = [];
  
  providerProfiles.forEach(profile => {
    if (profile.photos && profile.photos.length > 0) {
      const user = users.find(u => u.id === profile.userId);
      
      profile.photos.forEach(photo => {
        if (photo.status === 'PENDING') {
          pendingPhotos.push({
            photo: photo,
            profile: profile,
            user: user
          });
        }
      });
    }
  });
  
  // Trier par date (plus récentes en premier)
  return pendingPhotos.sort((a, b) => b.photo.uploadedAt - a.photo.uploadedAt);
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
  hasActiveSubscription,
  updateUserProfile,
  updateProviderProfile,
  changePassword,
  addProviderPhoto,
  deleteProviderPhoto,
  getProviderPhotos,
  updatePhotoStatus,
  getPendingPhotos,
  initDemoUsers
};
