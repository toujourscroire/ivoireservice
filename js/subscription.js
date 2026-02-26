// ==============================================
// IVOISERVICE - Gestion des abonnements
// ==============================================

// Créer un abonnement
function createSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  
  // Vérifier si l'utilisateur a déjà un abonnement actif
  const existingSubscription = subscriptions.find(
    s => s.userId === userId && s.status === 'ACTIVE' && s.endDate > Date.now()
  );
  
  if (existingSubscription) {
    return { 
      success: false, 
      message: 'Vous avez déjà un abonnement actif' 
    };
  }
  
  const newSubscription = {
    id: Utils.generateUUID(),
    userId: userId,
    status: 'ACTIVE',
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // +30 jours
    amount: 5000,
    createdAt: Date.now()
  };
  
  subscriptions.push(newSubscription);
  Utils.Storage.set('subscriptions', subscriptions);
  
  return { success: true, subscription: newSubscription };
}

// Renouveler un abonnement
function renewSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  const subscription = subscriptions.find(s => s.userId === userId);
  
  if (!subscription) {
    return createSubscription(userId);
  }
  
  // Renouveler
  const startDate = subscription.endDate > Date.now() ? subscription.endDate : Date.now();
  
  subscription.status = 'ACTIVE';
  subscription.startDate = startDate;
  subscription.endDate = startDate + (30 * 24 * 60 * 60 * 1000);
  subscription.updatedAt = Date.now();
  
  Utils.Storage.set('subscriptions', subscriptions);
  
  return { success: true, subscription };
}

// Obtenir l'abonnement d'un utilisateur
function getSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  const subscription = subscriptions.find(s => s.userId === userId);
  
  if (!subscription) return null;
  
  // Vérifier si expiré
  if (subscription.endDate <= Date.now() && subscription.status === 'ACTIVE') {
    subscription.status = 'EXPIRED';
    Utils.Storage.set('subscriptions', subscriptions);
  }
  
  return subscription;
}

// Vérifier si un abonnement est actif
function isSubscriptionActive(userId) {
  const subscription = getSubscription(userId);
  
  if (!subscription) return false;
  
  return subscription.status === 'ACTIVE' && subscription.endDate > Date.now();
}

// Obtenir le nombre de jours restants
function getDaysRemaining(userId) {
  const subscription = getSubscription(userId);
  
  if (!subscription || subscription.status !== 'ACTIVE') return 0;
  
  const now = Date.now();
  const remaining = subscription.endDate - now;
  
  if (remaining <= 0) return 0;
  
  return Math.ceil(remaining / (24 * 60 * 60 * 1000));
}

// Annuler un abonnement
function cancelSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  const subscription = subscriptions.find(s => s.userId === userId);
  
  if (!subscription) {
    return { success: false, message: 'Aucun abonnement trouvé' };
  }
  
  subscription.status = 'CANCELLED';
  subscription.cancelledAt = Date.now();
  
  Utils.Storage.set('subscriptions', subscriptions);
  
  return { success: true, subscription };
}

// Simuler un paiement
function processPayment(userId, amount, method) {
  // Simulation de paiement
  // En production, intégrer Orange Money, MTN Mobile Money, Wave, etc.
  
  // Simuler un délai de traitement
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simuler un succès aléatoire (95% de succès)
      const success = Math.random() < 0.95;
      
      if (success) {
        const payment = {
          id: Utils.generateUUID(),
          userId: userId,
          amount: amount,
          method: method,
          status: 'SUCCESS',
          transactionId: 'TXN' + Math.random().toString(36).substring(2, 15).toUpperCase(),
          createdAt: Date.now()
        };
        
        // Sauvegarder l'historique des paiements
        const payments = Utils.Storage.get('payments', []);
        payments.push(payment);
        Utils.Storage.set('payments', payments);
        
        resolve({ success: true, payment });
      } else {
        resolve({ 
          success: false, 
          message: 'Le paiement a échoué. Veuillez réessayer.' 
        });
      }
    }, 1500);
  });
}

// Obtenir l'historique des paiements
function getPaymentHistory(userId) {
  const payments = Utils.Storage.get('payments', []);
  return payments
    .filter(p => p.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

// Obtenir les statistiques d'abonnement (admin)
function getSubscriptionStats() {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  
  const active = subscriptions.filter(s => s.status === 'ACTIVE' && s.endDate > Date.now()).length;
  const expired = subscriptions.filter(s => s.status === 'EXPIRED' || (s.status === 'ACTIVE' && s.endDate <= Date.now())).length;
  const cancelled = subscriptions.filter(s => s.status === 'CANCELLED').length;
  
  const totalRevenue = subscriptions
    .filter(s => s.status === 'ACTIVE' || s.status === 'EXPIRED')
    .reduce((sum, s) => sum + s.amount, 0);
  
  return {
    active,
    expired,
    cancelled,
    total: subscriptions.length,
    revenue: totalRevenue
  };
}

// Exporter les fonctions
window.Subscription = {
  createSubscription,
  renewSubscription,
  getSubscription,
  isSubscriptionActive,
  getDaysRemaining,
  cancelSubscription,
  processPayment,
  getPaymentHistory,
  getSubscriptionStats
};
