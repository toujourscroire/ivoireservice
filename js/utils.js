// ==============================================
// IVOISERVICE - Fonctions utilitaires
// ==============================================

// Calcul de distance avec formule Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Générer un UUID simple
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Formater une date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('fr-FR', options);
}

// Formater un prix en FCFA
function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

// Valider un email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Valider un numéro de téléphone ivoirien
function isValidIvorianPhone(phone) {
  // Format: +225 XX XX XX XX XX ou 07/05/01 XX XX XX XX
  const re = /^(\+225)?[0-9]{10}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// Hasher un mot de passe (simulation - NON sécurisé)
function hashPassword(password) {
  // ⚠️ ATTENTION: Ceci est une simulation simple
  // En production, utilisez bcrypt côté serveur
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'hashed_' + Math.abs(hash).toString(36);
}

// LocalStorage helpers
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Gestion des sessions utilisateur
const Session = {
  login(user) {
    Storage.set('currentUser', user);
    Storage.set('isLoggedIn', true);
    Storage.set('loginTime', Date.now());
  },
  
  logout() {
    Storage.remove('currentUser');
    Storage.remove('isLoggedIn');
    Storage.remove('loginTime');
  },
  
  isLoggedIn() {
    return Storage.get('isLoggedIn', false);
  },
  
  getCurrentUser() {
    return Storage.get('currentUser');
  },
  
  updateUser(userData) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      Storage.set('currentUser', updatedUser);
      return updatedUser;
    }
    return null;
  }
};

// Générer des étoiles de notation
function generateStars(rating) {
  let starsHTML = '<div class="stars">';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star star"></i>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt star"></i>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star star empty"></i>';
  }
  
  starsHTML += '</div>';
  return starsHTML;
}

// Afficher un message toast
function showToast(message, type = 'info') {
  // Créer l'élément toast
  const toast = document.createElement('div');
  toast.className = `alert alert-${type}`;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    animation: slideInRight 0.3s ease;
  `;
  
  const icon = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  }[type];
  
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Supprimer après 4 secondes
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Ajouter les animations CSS pour les toasts
if (!document.getElementById('toast-animations')) {
  const style = document.createElement('style');
  style.id = 'toast-animations';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Confirmer une action
function confirmAction(message, onConfirm) {
  const confirmed = confirm(message);
  if (confirmed && typeof onConfirm === 'function') {
    onConfirm();
  }
  return confirmed;
}

// Débounce pour les recherches
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Vérifier le rôle de l'utilisateur
function checkUserRole(requiredRole) {
  const user = Session.getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  
  return user.role === requiredRole;
}

// Rediriger si non connecté
function requireAuth() {
  if (!Session.isLoggedIn()) {
    showToast('Vous devez être connecté pour accéder à cette page', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return false;
  }
  return true;
}

// Rediriger si non autorisé
function requireRole(role) {
  if (!requireAuth()) return false;
  
  if (!checkUserRole(role)) {
    showToast('Vous n\'avez pas les permissions nécessaires', 'error');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    return false;
  }
  return true;
}

// Obtenir les coordonnées de l'utilisateur
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('La géolocalisation n\'est pas supportée'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// Simuler des coordonnées pour Abidjan (pour démo)
function getAbidjanCoordinates() {
  // Coordonnées approximatives de différents quartiers d'Abidjan
  const areas = [
    { name: 'Plateau', lat: 5.3213, lon: -4.0114 },
    { name: 'Cocody', lat: 5.3480, lon: -3.9838 },
    { name: 'Yopougon', lat: 5.3346, lon: -4.0929 },
    { name: 'Adjamé', lat: 5.3578, lon: -4.0207 },
    { name: 'Treichville', lat: 5.2897, lon: -3.9830 },
    { name: 'Marcory', lat: 5.2788, lon: -3.9666 },
    { name: 'Koumassi', lat: 5.2948, lon: -3.9340 },
    { name: 'Port-Bouët', lat: 5.2549, lon: -3.9193 },
    { name: 'Attécoubé', lat: 5.3297, lon: -4.0482 },
    { name: 'Abobo', lat: 5.4258, lon: -4.0201 }
  ];
  
  return areas[Math.floor(Math.random() * areas.length)];
}

// Générer un avatar avec initiales
function generateAvatar(firstName, lastName) {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  const colors = ['#009E60', '#007A4A', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return `
    <div style="
      width: 100%;
      height: 100%;
      background: ${color};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      font-weight: 700;
      color: white;
    ">
      ${initials}
    </div>
  `;
}

// Formater un numéro de téléphone
function formatPhoneNumber(phone) {
  // Retirer tous les espaces
  const cleaned = phone.replace(/\s/g, '');
  
  // Si commence par +225
  if (cleaned.startsWith('+225')) {
    const number = cleaned.substring(4);
    return `+225 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)} ${number.substring(8, 10)}`;
  }
  
  // Sinon, format standard
  return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`;
}

// Professions disponibles
const PROFESSIONS = {
  GARAGISTE: 'Garagiste',
  PLOMBIER: 'Plombier',
  ELECTRICIEN: 'Électricien',
  MENUISIER: 'Menuisier',
  FRIGORISTE: 'Frigoriste',
  MACON: 'Maçon',
  PEINTRE: 'Peintre',
  SERRURIER: 'Serrurier',
  REPARATEUR_TELEPHONE: 'Réparateur téléphone',
  MECANICIEN_MOTO: 'Mécanicien moto'
};

// Icônes des professions
const PROFESSION_ICONS = {
  GARAGISTE: 'fa-car',
  PLOMBIER: 'fa-wrench',
  ELECTRICIEN: 'fa-bolt',
  MENUISIER: 'fa-hammer',
  FRIGORISTE: 'fa-snowflake',
  MACON: 'fa-hard-hat',
  PEINTRE: 'fa-paint-roller',
  SERRURIER: 'fa-key',
  REPARATEUR_TELEPHONE: 'fa-mobile-alt',
  MECANICIEN_MOTO: 'fa-motorcycle'
};

// Exporter pour utilisation globale
window.Utils = {
  calculateDistance,
  generateUUID,
  formatDate,
  formatDateTime,
  formatPrice,
  isValidEmail,
  isValidIvorianPhone,
  hashPassword,
  Storage,
  Session,
  generateStars,
  showToast,
  confirmAction,
  debounce,
  checkUserRole,
  requireAuth,
  requireRole,
  getUserLocation,
  getAbidjanCoordinates,
  generateAvatar,
  formatPhoneNumber,
  PROFESSIONS,
  PROFESSION_ICONS
};
