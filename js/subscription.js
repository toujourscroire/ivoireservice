// ==============================================
// IVOISERVICE - Gestion des abonnements
// Version modifiée avec historique détaillé
// ==============================================

// Créer un abonnement
function createSubscription(userId, paymentMethod = 'ORANGE_MONEY') {
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
    paymentMethod: paymentMethod,
    createdAt: Date.now()
  };
  
  subscriptions.push(newSubscription);
  Utils.Storage.set('subscriptions', subscriptions);
  
  return { success: true, subscription: newSubscription };
}

// Renouveler un abonnement
function renewSubscription(userId, paymentMethod = 'ORANGE_MONEY') {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  
  // Créer un nouvel abonnement (historique conservé)
  const startDate = Date.now();
  
  const newSubscription = {
    id: Utils.generateUUID(),
    userId: userId,
    status: 'ACTIVE',
    startDate: startDate,
    endDate: startDate + (30 * 24 * 60 * 60 * 1000),
    amount: 5000,
    paymentMethod: paymentMethod,
    createdAt: Date.now()
  };
  
  subscriptions.push(newSubscription);
  Utils.Storage.set('subscriptions', subscriptions);
  
  return { success: true, subscription: newSubscription };
}

// Obtenir l'abonnement ACTIF d'un utilisateur
function getSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  const activeSubscriptions = subscriptions.filter(s => s.userId === userId && s.status === 'ACTIVE');
  
  if (activeSubscriptions.length === 0) return null;
  
  // Prendre le plus récent
  const subscription = activeSubscriptions.sort((a, b) => b.startDate - a.startDate)[0];
  
  // Vérifier si expiré
  if (subscription.endDate <= Date.now()) {
    subscription.status = 'EXPIRED';
    Utils.Storage.set('subscriptions', subscriptions);
    return null;
  }
  
  return subscription;
}

// Obtenir TOUS les abonnements d'un utilisateur (historique complet)
function getSubscriptionHistory(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  return subscriptions
    .filter(s => s.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

// Compter combien de fois l'utilisateur s'est abonné
function getSubscriptionCount(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  return subscriptions.filter(s => s.userId === userId).length;
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

// Obtenir les informations détaillées de l'abonnement
function getSubscriptionInfo(userId) {
  const subscription = getSubscription(userId);
  const count = getSubscriptionCount(userId);
  const daysRemaining = getDaysRemaining(userId);
  
  return {
    hasActive: subscription !== null,
    subscription: subscription,
    totalSubscriptions: count,
    daysRemaining: daysRemaining,
    expirationDate: subscription ? new Date(subscription.endDate) : null
  };
}

// Annuler un abonnement
function cancelSubscription(userId) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  const subscription = subscriptions.find(s => s.userId === userId && s.status === 'ACTIVE');
  
  if (!subscription) {
    return { success: false, message: 'Aucun abonnement actif trouvé' };
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
  const users = Utils.Storage.get('users', []);
  
  const active = subscriptions.filter(s => s.status === 'ACTIVE' && s.endDate > Date.now()).length;
  const expired = subscriptions.filter(s => s.status === 'EXPIRED' || (s.status === 'ACTIVE' && s.endDate <= Date.now())).length;
  const cancelled = subscriptions.filter(s => s.status === 'CANCELLED').length;
  
  const totalRevenue = subscriptions
    .filter(s => s.status === 'ACTIVE' || s.status === 'EXPIRED')
    .reduce((sum, s) => sum + s.amount, 0);
  
  // Clients uniques ayant souscrit
  const uniqueClients = [...new Set(subscriptions.map(s => s.userId))].length;
  
  // Taux de renouvellement
  const clientsWithMultiple = subscriptions.reduce((acc, sub) => {
    acc[sub.userId] = (acc[sub.userId] || 0) + 1;
    return acc;
  }, {});
  
  const renewedClients = Object.values(clientsWithMultiple).filter(count => count > 1).length;
  const renewalRate = uniqueClients > 0 ? (renewedClients / uniqueClients * 100).toFixed(1) : 0;
  
  return {
    active,
    expired,
    cancelled,
    total: subscriptions.length,
    revenue: totalRevenue,
    uniqueClients,
    renewalRate: renewalRate + '%'
  };
}

// Obtenir les abonnements expirant bientôt (admin)
function getExpiringSoon(days = 7) {
  const subscriptions = Utils.Storage.get('subscriptions', []);
  const now = Date.now();
  const threshold = now + (days * 24 * 60 * 60 * 1000);
  
  return subscriptions
    .filter(s => s.status === 'ACTIVE' && s.endDate > now && s.endDate <= threshold)
    .sort((a, b) => a.endDate - b.endDate);
}

// Afficher le widget d'abonnement sur les pages client
function renderSubscriptionWidget(containerId) {
  const user = Utils.Session.getCurrentUser();
  
  if (!user || user.role !== 'CLIENT') return;
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const info = getSubscriptionInfo(user.id);
  
  let html = '<div class="subscription-widget">';
  
  if (info.hasActive) {
    html += `
      <div class="subscription-active">
        <i class="fas fa-check-circle"></i>
        <div>
          <h4>Abonnement actif</h4>
          <p><strong>${info.daysRemaining} jours restants</strong></p>
          <p class="text-sm">Expire le ${Utils.formatDate(info.expirationDate)}</p>
          <p class="text-sm">Abonné ${info.totalSubscriptions} fois</p>
        </div>
      </div>
    `;
  } else {
    html += `
      <div class="subscription-inactive">
        <i class="fas fa-exclamation-triangle"></i>
        <div>
          <h4>Abonnement expiré</h4>
          <p>Renouvelez pour continuer à contacter les prestataires</p>
          <a href="subscription.html" class="btn btn-primary">Renouveler - 5000 FCFA</a>
        </div>
      </div>
    `;
  }
  
  html += '</div>';
  
  container.innerHTML = html;
}

// Exporter les fonctions
window.Subscription = {
  createSubscription,
  renewSubscription,
  getSubscription,
  getSubscriptionHistory,
  getSubscriptionCount,
  getSubscriptionInfo,
  isSubscriptionActive,
  getDaysRemaining,
  cancelSubscription,
  processPayment,
  getPaymentHistory,
  getSubscriptionStats,
  getExpiringSoon,
  renderSubscriptionWidget
};
