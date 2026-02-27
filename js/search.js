// ==============================================
// IVOISERVICE - Gestion de la recherche
// Version modifiée avec Freelance + Google Maps
// ==============================================

// Créer des prestataires de démonstration
function initDemoProviders() {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  
  // Vérifier si les prestataires démo existent déjà
  if (providerProfiles.length > 2) return; // Permet les comptes démo créés par Auth
  
  const users = Utils.Storage.get('users', []);
  
  // Créer plusieurs prestataires de démonstration classiques
  const demoProviders = [
    {
      firstName: 'Yao', lastName: 'Kouassi', profession: 'GARAGISTE', isFreelance: false, basePrice: 20000, 
      radius: 15, description: 'Garagiste expert avec 15 ans d\'expérience. Spécialisé en véhicules français et japonais.',
      location: { lat: 5.3480, lon: -3.9838 }, rating: 4.8, reviewCount: 28
    },
    {
      firstName: 'Koffi', lastName: 'N\'Guessan', profession: 'ELECTRICIEN', isFreelance: false, basePrice: 12000,
      radius: 20, description: 'Électricien certifié. Installation électrique, dépannage, mise aux normes.',
      location: { lat: 5.3578, lon: -4.0207 }, rating: 4.7, reviewCount: 35
    },
    {
      firstName: 'Aya', lastName: 'Koné', profession: 'MENUISIER', isFreelance: false, basePrice: 25000,
      radius: 15, description: 'Menuisier ébéniste. Fabrication de meubles sur mesure, réparations, aménagements.',
      location: { lat: 5.2897, lon: -3.9830 }, rating: 4.9, reviewCount: 42
    },
    {
      firstName: 'Jean', lastName: 'Kouamé', profession: 'FRIGORISTE', isFreelance: false, basePrice: 18000,
      radius: 10, description: 'Frigoriste expert. Climatiseurs, réfrigérateurs, chambres froides. Maintenance et réparation.',
      location: { lat: 5.3213, lon: -4.0114 }, rating: 4.6, reviewCount: 19
    },
    {
      firstName: 'Marie', lastName: 'Brou', profession: 'MACON', isFreelance: false, basePrice: 30000,
      radius: 20, description: 'Maçon professionnel. Construction, rénovation, carrelage. Travail de qualité.',
      location: { lat: 5.2788, lon: -3.9666 }, rating: 4.8, reviewCount: 51
    },
    {
      firstName: 'Serge', lastName: 'Konan', profession: 'PEINTRE', isFreelance: false, basePrice: 10000,
      radius: 15, description: 'Peintre bâtiment. Intérieur et extérieur. Finitions soignées, respect des délais.',
      location: { lat: 5.2948, lon: -3.9340 }, rating: 4.4, reviewCount: 23
    },
    {
      firstName: 'Akissi', lastName: 'Diallo', profession: 'SERRURIER', isFreelance: false, basePrice: 8000,
      radius: 10, description: 'Serrurier dépanneur. Ouverture porte, changement de serrure, installation. Disponible 24/7.',
      location: { lat: 5.2549, lon: -3.9193 }, rating: 4.7, reviewCount: 67
    },
    {
      firstName: 'Ibrahim', lastName: 'Touré', profession: 'REPARATEUR_TELEPHONE', isFreelance: false, basePrice: 5000,
      radius: 5, description: 'Réparateur téléphone et tablettes. Écrans, batteries, circuits. Pièces d\'origine.',
      location: { lat: 5.3346, lon: -4.0929 }, rating: 4.5, reviewCount: 89
    },
    {
      firstName: 'Boubacar', lastName: 'Traoré', profession: 'MECANICIEN_MOTO', isFreelance: false, basePrice: 15000,
      radius: 15, description: 'Mécanicien moto expert. Toutes marques. Révision, réparation, entretien.',
      location: { lat: 5.4258, lon: -4.0201 }, rating: 4.6, reviewCount: 31
    }
  ];
  
  // Créer des freelances de démonstration
  const demoFreelances = [
    {
      firstName: 'Stéphanie', lastName: 'Kouadio', profession: 'COMMUNITY_MANAGER', isFreelance: true, basePrice: 30000,
      radius: 50, description: 'Community Manager certifiée. Gestion réseaux sociaux, création de contenu, engagement communautaire.',
      location: { lat: 5.3400, lon: -4.0100 }, rating: 4.9, reviewCount: 18,
      portfolio: [
        { title: 'Gestion Instagram restaurant', description: '+500% engagement en 3 mois', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23009E60" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16"%3ECommunity Management%3C/text%3E%3C/svg%3E' }
      ]
    },
    {
      firstName: 'David', lastName: 'Assi', profession: 'DEVELOPPEUR_WEB', isFreelance: true, basePrice: 50000,
      radius: 100, description: 'Développeur Full-Stack. React, Node.js, PHP. Sites web, applications mobiles, e-commerce.',
      location: { lat: 5.3300, lon: -4.0000 }, rating: 4.8, reviewCount: 22,
      portfolio: [
        { title: 'Site e-commerce mode', description: 'Boutique en ligne complète avec paiement mobile', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23007A4A" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16"%3ED%C3%A9veloppement Web%3C/text%3E%3C/svg%3E' }
      ]
    },
    {
      firstName: 'Prisca', lastName: 'Bamba', profession: 'GRAPHISTE', isFreelance: true, basePrice: 20000,
      radius: 50, description: 'Graphiste créative. Logo, identité visuelle, flyers, affiches, packaging.',
      location: { lat: 5.3500, lon: -3.9900 }, rating: 4.7, reviewCount: 31,
      portfolio: [
        { title: 'Identité visuelle startup', description: 'Logo + charte graphique complète', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23BFEAD6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23007A4A" font-size="16"%3EGraphisme%3C/text%3E%3C/svg%3E' }
      ]
    },
    {
      firstName: 'Roland', lastName: 'Koffi', profession: 'REDACTEUR_WEB', isFreelance: true, basePrice: 15000,
      radius: 100, description: 'Rédacteur web SEO. Articles de blog, fiches produits, contenus optimisés Google.',
      location: { lat: 5.3250, lon: -4.0300 }, rating: 4.6, reviewCount: 15,
      portfolio: [
        { title: 'Blog entreprise tech', description: '50 articles SEO, trafic x3', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23009E60" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16"%3ER%C3%A9daction Web%3C/text%3E%3C/svg%3E' }
      ]
    },
    {
      firstName: 'Sylvie', lastName: 'Tano', profession: 'CONSULTANT_SEO', isFreelance: true, basePrice: 40000,
      radius: 100, description: 'Consultante SEO certifiée. Audit, stratégie, optimisation. Première page Google garanti.',
      location: { lat: 5.3350, lon: -4.0200 }, rating: 4.9, reviewCount: 12,
      portfolio: [
        { title: 'Audit SEO e-commerce', description: 'Trafic organique +250%', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23007A4A" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16"%3ESEO%3C/text%3E%3C/svg%3E' }
      ]
    }
  ];
  
  // Combiner tous les prestataires
  const allProviders = [...demoProviders, ...demoFreelances];
  
  allProviders.forEach(provider => {
    // Créer l'utilisateur
    const newUser = {
      id: Utils.generateUUID(),
      email: `${provider.firstName.toLowerCase()}.${provider.lastName.toLowerCase()}@provider.ci`,
      password: Utils.hashPassword('demo123'),
      firstName: provider.firstName,
      lastName: provider.lastName,
      phone: `+2250${Math.floor(Math.random() * 90000000) + 10000000}`,
      role: 'PROVIDER',
      latitude: provider.location.lat,
      longitude: provider.location.lon,
      createdAt: Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
    };
    
    users.push(newUser);
    
    // Créer le profil prestataire
    const newProfile = {
      id: Utils.generateUUID(),
      userId: newUser.id,
      profession: provider.profession,
      isFreelance: provider.isFreelance,
      basePrice: provider.basePrice,
      radius: provider.radius,
      description: provider.description,
      photos: [],
      portfolio: provider.portfolio || [],
      rating: provider.rating,
      reviewCount: provider.reviewCount,
      isVerified: Math.random() > 0.2, // 80% vérifiés
      idDocumentStatus: Math.random() > 0.2 ? 'APPROVED' : 'PENDING',
      createdAt: newUser.createdAt
    };
    
    providerProfiles.push(newProfile);
  });
  
  Utils.Storage.set('users', users);
  Utils.Storage.set('providerProfiles', providerProfiles);
}

// Rechercher des prestataires (avec filtre Freelance)
function searchProviders(filters = {}) {
  const { profession, maxDistance, sortBy, isFreelance } = filters;
  const currentUser = Utils.Session.getCurrentUser();
  
  // Récupérer tous les prestataires
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const users = Utils.Storage.get('users', []);
  
  // Fusionner les données utilisateur avec les profils
  let providers = providerProfiles.map(profile => {
    const user = users.find(u => u.id === profile.userId);
    if (!user) return null;
    
    return {
      ...profile,
      ...user,
      password: undefined // Ne pas exposer le mot de passe
    };
  }).filter(p => p !== null);
  
  // Filtrer par type (Freelance ou Classique)
  if (isFreelance !== undefined) {
    providers = providers.filter(p => p.isFreelance === isFreelance);
  }
  
  // Filtrer par profession
  if (profession && profession !== 'ALL') {
    providers = providers.filter(p => p.profession === profession);
  }
  
  // Calculer la distance si l'utilisateur est connecté
  if (currentUser && currentUser.latitude && currentUser.longitude) {
    providers = providers.map(provider => {
      const distance = Utils.calculateDistance(
        currentUser.latitude,
        currentUser.longitude,
        provider.latitude,
        provider.longitude
      );
      
      return { ...provider, distance };
    });
    
    // Filtrer par distance maximale
    if (maxDistance) {
      providers = providers.filter(p => {
        // Vérifier que le client est dans le rayon d'intervention du prestataire
        return p.distance <= Math.min(maxDistance, p.radius);
      });
    }
  } else {
    // Si pas de localisation, assigner des distances aléatoires pour la démo
    providers = providers.map(provider => ({
      ...provider,
      distance: Math.round((Math.random() * 15 + 2) * 10) / 10
    }));
    
    if (maxDistance) {
      providers = providers.filter(p => p.distance <= maxDistance);
    }
  }
  
  // Trier les résultats
  if (sortBy === 'distance') {
    providers.sort((a, b) => (a.distance || 999) - (b.distance || 999));
  } else if (sortBy === 'rating') {
    providers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'price') {
    providers.sort((a, b) => a.basePrice - b.basePrice);
  } else {
    // Par défaut : vérifiés en premier, puis par note
    providers.sort((a, b) => {
      if (a.isVerified !== b.isVerified) {
        return a.isVerified ? -1 : 1;
      }
      return (b.rating || 0) - (a.rating || 0);
    });
  }
  
  return providers;
}

// Obtenir un prestataire par ID
function getProviderById(id) {
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const users = Utils.Storage.get('users', []);
  
  const profile = providerProfiles.find(p => p.id === id || p.userId === id);
  if (!profile) return null;
  
  const user = users.find(u => u.id === profile.userId);
  if (!user) return null;
  
  const currentUser = Utils.Session.getCurrentUser();
  let distance = null;
  
  // Calculer la distance
  if (currentUser && currentUser.latitude && currentUser.longitude && user.latitude && user.longitude) {
    distance = Utils.calculateDistance(
      currentUser.latitude,
      currentUser.longitude,
      user.latitude,
      user.longitude
    );
  }
  
  return {
    ...profile,
    ...user,
    password: undefined,
    distance: distance
  };
}

// Créer une demande de service
function createServiceRequest(providerId, description) {
  const currentUser = Utils.Session.getCurrentUser();
  
  if (!currentUser) {
    return { success: false, message: 'Vous devez être connecté' };
  }
  
  if (currentUser.role !== 'CLIENT') {
    return { success: false, message: 'Seuls les clients peuvent demander des services' };
  }
  
  // Vérifier l'abonnement
  if (!Auth.hasActiveSubscription(currentUser.id)) {
    return { 
      success: false, 
      message: 'Vous devez avoir un abonnement actif pour contacter des prestataires',
      requireSubscription: true
    };
  }
  
  const serviceRequests = Utils.Storage.get('serviceRequests', []);
  
  const newRequest = {
    id: Utils.generateUUID(),
    clientId: currentUser.id,
    providerId: providerId,
    description: description,
    status: 'PENDING',
    createdAt: Date.now()
  };
  
  serviceRequests.push(newRequest);
  Utils.Storage.set('serviceRequests', serviceRequests);
  
  return { success: true, request: newRequest };
}

// Obtenir les demandes d'un client
function getClientRequests(clientId) {
  const serviceRequests = Utils.Storage.get('serviceRequests', []);
  return serviceRequests.filter(r => r.clientId === clientId);
}

// Obtenir les demandes d'un prestataire
function getProviderRequests(providerId) {
  const serviceRequests = Utils.Storage.get('serviceRequests', []);
  return serviceRequests.filter(r => r.providerId === providerId);
}

// Mettre à jour le statut d'une demande
function updateRequestStatus(requestId, status) {
  const serviceRequests = Utils.Storage.get('serviceRequests', []);
  const requestIndex = serviceRequests.findIndex(r => r.id === requestId);
  
  if (requestIndex === -1) {
    return { success: false, message: 'Demande non trouvée' };
  }
  
  serviceRequests[requestIndex].status = status;
  serviceRequests[requestIndex].updatedAt = Date.now();
  
  Utils.Storage.set('serviceRequests', serviceRequests);
  
  return { success: true, request: serviceRequests[requestIndex] };
}

// Ajouter un avis
function addReview(providerId, rating, comment) {
  const currentUser = Utils.Session.getCurrentUser();
  
  if (!currentUser || currentUser.role !== 'CLIENT') {
    return { success: false, message: 'Seuls les clients peuvent laisser des avis' };
  }
  
  const reviews = Utils.Storage.get('reviews', []);
  
  // Vérifier si le client a déjà laissé un avis pour ce prestataire
  const existingReview = reviews.find(
    r => r.providerId === providerId && r.clientId === currentUser.id
  );
  
  if (existingReview) {
    return { success: false, message: 'Vous avez déjà laissé un avis pour ce prestataire' };
  }
  
  const newReview = {
    id: Utils.generateUUID(),
    providerId: providerId,
    clientId: currentUser.id,
    rating: rating,
    comment: comment,
    createdAt: Date.now()
  };
  
  reviews.push(newReview);
  Utils.Storage.set('reviews', reviews);
  
  // Recalculer la note moyenne du prestataire
  updateProviderRating(providerId);
  
  return { success: true, review: newReview };
}

// Obtenir les avis d'un prestataire
function getProviderReviews(providerId) {
  const reviews = Utils.Storage.get('reviews', []);
  const users = Utils.Storage.get('users', []);
  
  return reviews
    .filter(r => r.providerId === providerId)
    .map(review => {
      const client = users.find(u => u.id === review.clientId);
      return {
        ...review,
        clientName: client ? `${client.firstName} ${client.lastName}` : 'Client'
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

// Mettre à jour la note moyenne d'un prestataire
function updateProviderRating(providerId) {
  const reviews = Utils.Storage.get('reviews', []);
  const providerReviews = reviews.filter(r => r.providerId === providerId);
  
  if (providerReviews.length === 0) return;
  
  const totalRating = providerReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRating / providerReviews.length;
  
  const providerProfiles = Utils.Storage.get('providerProfiles', []);
  const profileIndex = providerProfiles.findIndex(p => p.userId === providerId || p.id === providerId);
  
  if (profileIndex !== -1) {
    providerProfiles[profileIndex].rating = Math.round(averageRating * 10) / 10;
    providerProfiles[profileIndex].reviewCount = providerReviews.length;
    Utils.Storage.set('providerProfiles', providerProfiles);
  }
}

// Initialiser les prestataires de démonstration
document.addEventListener('DOMContentLoaded', () => {
  initDemoProviders();
});

// Exporter les fonctions
window.Search = {
  searchProviders,
  getProviderById,
  createServiceRequest,
  getClientRequests,
  getProviderRequests,
  updateRequestStatus,
  addReview,
  getProviderReviews,
  initDemoProviders
};
