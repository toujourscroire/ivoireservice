// ==============================================
// IVOISERVICE - Fonctions utilitaires (MODIFIÉ)
// ==============================================

// Calcul de distance avec formule Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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

function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidIvorianPhone(phone) {
  const re = /^(\+225)?[0-9]{10}$/;
  return re.test(phone.replace(/\s/g, ''));
}

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'hashed_' + Math.abs(hash).toString(36);
}

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

// ✅ MODIFIÉ - Session stricte (pas de mémorisation)
const Session = {
  login(user) {
    // ✅ NOUVEAU - Pas de persistance, session temporaire uniquement
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('loginTime', Date.now().toString());
  },
  
  logout() {
    // ✅ MODIFIÉ - Nettoyer sessionStorage au lieu de localStorage
    sessionStorage.clear();
  },
  
  isLoggedIn() {
    // ✅ MODIFIÉ - Vérifier sessionStorage
    return sessionStorage.getItem('isLoggedIn') === 'true';
  },
  
  getCurrentUser() {
    // ✅ MODIFIÉ - Lire depuis sessionStorage
    try {
      const user = sessionStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },
  
  updateUser(userData) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  }
};

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

function showToast(message, type = 'info') {
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
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

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

function confirmAction(message, onConfirm) {
  const confirmed = confirm(message);
  if (confirmed && typeof onConfirm === 'function') {
    onConfirm();
  }
  return confirmed;
}

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

function checkUserRole(requiredRole) {
  const user = Session.getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  
  return user.role === requiredRole;
}

// ✅ MODIFIÉ - Redirection stricte si non connecté
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

// ✅ MODIFIÉ - Redirection stricte si mauvais rôle
function requireRole(role) {
  if (!requireAuth()) return false;
  
  if (!checkUserRole(role)) {
    showToast('Accès refusé : Vous n\'avez pas les permissions nécessaires', 'error');
    setTimeout(() => {
      const user = Session.getCurrentUser();
      if (user) {
        // Rediriger vers le bon dashboard selon le rôle
        if (user.role === 'CLIENT') window.location.href = 'client-dashboard.html';
        else if (user.role === 'PROVIDER') window.location.href = 'provider-dashboard.html';
        else if (user.role === 'ADMIN') window.location.href = 'admin-dashboard.html';
        else window.location.href = 'index.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1500);
    return false;
  }
  return true;
}

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

function getAbidjanCoordinates() {
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

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\s/g, '');
  
  if (cleaned.startsWith('+225')) {
    const number = cleaned.substring(4);
    return `+225 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)} ${number.substring(8, 10)}`;
  }
  
  return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`;
}

// ✅ NOUVEAU - Métiers classiques
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

// ✅ NOUVEAU - 9 Métiers Freelance
const FREELANCE_PROFESSIONS = {
  MARKETING_DIGITAL: 'Marketing Digital',
  COMMUNICATION: 'Communication',
  DEV_WEB: 'Développeur Web',
  DEV_APP: 'Développeur App Mobile',
  DESIGNER_GRAPHIQUE: 'Designer Graphique',
  REDACTEUR_WEB: 'Rédacteur Web',
  COMMUNITY_MANAGER: 'Community Manager',
  DATA_ANALYST: 'Data Analyst',
  CONSULTANT_SEO: 'Consultant SEO'
};

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
  MECANICIEN_MOTO: 'fa-motorcycle',
  // ✅ NOUVEAU - Icônes freelance
  MARKETING_DIGITAL: 'fa-bullhorn',
  COMMUNICATION: 'fa-comments',
  DEV_WEB: 'fa-code',
  DEV_APP: 'fa-mobile',
  DESIGNER_GRAPHIQUE: 'fa-palette',
  REDACTEUR_WEB: 'fa-pen-fancy',
  COMMUNITY_MANAGER: 'fa-users',
  DATA_ANALYST: 'fa-chart-line',
  CONSULTANT_SEO: 'fa-search'
};

// ✅ NOUVEAU - Créer une carte Google Maps
function createMap(containerId, lat, lng, label = 'Position') {
  const mapContainer = document.getElementById(containerId);
  if (!mapContainer) return;
  
  // Utiliser iframe Google Maps (gratuit, pas de clé API nécessaire)
  mapContainer.innerHTML = `
    <iframe
      width="100%"
      height="400"
      frameborder="0"
      style="border:0; border-radius: 12px;"
      src="https://www.google.com/maps?q=${lat},${lng}&output=embed&z=15"
      allowfullscreen>
    </iframe>
  `;
}

// ✅ NOUVEAU - Créer un lien Google Maps
function getMapLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

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
  FREELANCE_PROFESSIONS, // ✅ NOUVEAU
  PROFESSION_ICONS,
  createMap, // ✅ NOUVEAU
  getMapLink // ✅ NOUVEAU
};
