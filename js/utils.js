 1	// ==============================================
     2	// IVOISERVICE - Fonctions utilitaires
     3	// ==============================================
     4	
     5	// Calcul de distance avec formule Haversine
     6	function calculateDistance(lat1, lon1, lat2, lon2) {
     7	  const R = 6371; // Rayon de la Terre en km
     8	  const dLat = toRadians(lat2 - lat1);
     9	  const dLon = toRadians(lon2 - lon1);
    10	  
    11	  const a = 
    12	    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    13	    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    14	    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    15	  
    16	  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    17	  const distance = R * c;
    18	  
    19	  return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
    20	}
    21	
    22	function toRadians(degrees) {
    23	  return degrees * (Math.PI / 180);
    24	}
    25	
    26	// Générer un UUID simple
    27	function generateUUID() {
    28	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    29	    const r = Math.random() * 16 | 0;
    30	    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    31	    return v.toString(16);
    32	  });
    33	}
    34	
    35	// Formater une date
    36	function formatDate(timestamp) {
    37	  const date = new Date(timestamp);
    38	  const options = { year: 'numeric', month: 'long', day: 'numeric' };
    39	  return date.toLocaleDateString('fr-FR', options);
    40	}
    41	
    42	function formatDateTime(timestamp) {
    43	  const date = new Date(timestamp);
    44	  const options = { 
    45	    year: 'numeric', 
    46	    month: 'long', 
    47	    day: 'numeric',
    48	    hour: '2-digit',
    49	    minute: '2-digit'
    50	  };
    51	  return date.toLocaleDateString('fr-FR', options);
    52	}
    53	
    54	// Formater un prix en FCFA
    55	function formatPrice(amount) {
    56	  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    57	}
    58	
    59	// Valider un email
    60	function isValidEmail(email) {
    61	  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    62	  return re.test(email);
    63	}
    64	
    65	// Valider un numéro de téléphone ivoirien
    66	function isValidIvorianPhone(phone) {
    67	  // Format: +225 XX XX XX XX XX ou 07/05/01 XX XX XX XX
    68	  const re = /^(\+225)?[0-9]{10}$/;
    69	  return re.test(phone.replace(/\s/g, ''));
    70	}
    71	
    72	// Hasher un mot de passe (simulation - NON sécurisé)
    73	function hashPassword(password) {
    74	  // ⚠️ ATTENTION: Ceci est une simulation simple
    75	  // En production, utilisez bcrypt côté serveur
    76	  let hash = 0;
    77	  for (let i = 0; i < password.length; i++) {
    78	    const char = password.charCodeAt(i);
    79	    hash = ((hash << 5) - hash) + char;
    80	    hash = hash & hash;
    81	  }
    82	  return 'hashed_' + Math.abs(hash).toString(36);
    83	}
    84	
    85	// LocalStorage helpers
    86	const Storage = {
    87	  get(key, defaultValue = null) {
    88	    try {
    89	      const item = localStorage.getItem(key);
    90	      return item ? JSON.parse(item) : defaultValue;
    91	    } catch (error) {
    92	      console.error('Error reading from localStorage:', error);
    93	      return defaultValue;
    94	    }
    95	  },
    96	  
    97	  set(key, value) {
    98	    try {
    99	      localStorage.setItem(key, JSON.stringify(value));
   100	      return true;
   101	    } catch (error) {
   102	      console.error('Error writing to localStorage:', error);
   103	      return false;
   104	    }
   105	  },
   106	  
   107	  remove(key) {
   108	    try {
   109	      localStorage.removeItem(key);
   110	      return true;
   111	    } catch (error) {
   112	      console.error('Error removing from localStorage:', error);
   113	      return false;
   114	    }
   115	  },
   116	  
   117	  clear() {
   118	    try {
   119	      localStorage.clear();
   120	      return true;
   121	    } catch (error) {
   122	      console.error('Error clearing localStorage:', error);
   123	      return false;
   124	    }
   125	  }
   126	};
   127	
   128	// Gestion des sessions utilisateur
   129	const Session = {
   130	  login(user) {
   131	    Storage.set('currentUser', user);
   132	    Storage.set('isLoggedIn', true);
   133	    Storage.set('loginTime', Date.now());
   134	  },
   135	  
   136	  logout() {
   137	    Storage.remove('currentUser');
   138	    Storage.remove('isLoggedIn');
   139	    Storage.remove('loginTime');
   140	  },
   141	  
   142	  isLoggedIn() {
   143	    return Storage.get('isLoggedIn', false);
   144	  },
   145	  
   146	  getCurrentUser() {
   147	    return Storage.get('currentUser');
   148	  },
   149	  
   150	  updateUser(userData) {
   151	    const currentUser = this.getCurrentUser();
   152	    if (currentUser) {
   153	      const updatedUser = { ...currentUser, ...userData };
   154	      Storage.set('currentUser', updatedUser);
   155	      return updatedUser;
   156	    }
   157	    return null;
   158	  }
   159	};
   160	
   161	// Générer des étoiles de notation
   162	function generateStars(rating) {
   163	  let starsHTML = '<div class="stars">';
   164	  const fullStars = Math.floor(rating);
   165	  const hasHalfStar = rating % 1 >= 0.5;
   166	  
   167	  for (let i = 0; i < fullStars; i++) {
   168	    starsHTML += '<i class="fas fa-star star"></i>';
   169	  }
   170	  
   171	  if (hasHalfStar) {
   172	    starsHTML += '<i class="fas fa-star-half-alt star"></i>';
   173	  }
   174	  
   175	  const emptyStars = 5 - Math.ceil(rating);
   176	  for (let i = 0; i < emptyStars; i++) {
   177	    starsHTML += '<i class="far fa-star star empty"></i>';
   178	  }
   179	  
   180	  starsHTML += '</div>';
   181	  return starsHTML;
   182	}
   183	
   184	// Afficher un message toast
   185	function showToast(message, type = 'info') {
   186	  // Créer l'élément toast
   187	  const toast = document.createElement('div');
   188	  toast.className = `alert alert-${type}`;
   189	  toast.style.cssText = `
   190	    position: fixed;
   191	    top: 20px;
   192	    right: 20px;
   193	    z-index: 9999;
   194	    min-width: 300px;
   195	    animation: slideInRight 0.3s ease;
   196	  `;
   197	  
   198	  const icon = {
   199	    success: 'fa-check-circle',
   200	    error: 'fa-exclamation-circle',
   201	    warning: 'fa-exclamation-triangle',
   202	    info: 'fa-info-circle'
   203	  }[type];
   204	  
   205	  toast.innerHTML = `
   206	    <i class="fas ${icon}"></i>
   207	    <span>${message}</span>
   208	  `;
   209	  
   210	  document.body.appendChild(toast);
   211	  
   212	  // Supprimer après 4 secondes
   213	  setTimeout(() => {
   214	    toast.style.animation = 'slideOutRight 0.3s ease';
   215	    setTimeout(() => {
   216	      toast.remove();
   217	    }, 300);
   218	  }, 4000);
   219	}
   220	
   221	// Ajouter les animations CSS pour les toasts
   222	if (!document.getElementById('toast-animations')) {
   223	  const style = document.createElement('style');
   224	  style.id = 'toast-animations';
   225	  style.textContent = `
   226	    @keyframes slideInRight {
   227	      from {
   228	        transform: translateX(400px);
   229	        opacity: 0;
   230	      }
   231	      to {
   232	        transform: translateX(0);
   233	        opacity: 1;
   234	      }
   235	    }
   236	    
   237	    @keyframes slideOutRight {
   238	      from {
   239	        transform: translateX(0);
   240	        opacity: 1;
   241	      }
   242	      to {
   243	        transform: translateX(400px);
   244	        opacity: 0;
   245	      }
   246	    }
   247	  `;
   248	  document.head.appendChild(style);
   249	}
   250	
   251	// Confirmer une action
   252	function confirmAction(message, onConfirm) {
   253	  const confirmed = confirm(message);
   254	  if (confirmed && typeof onConfirm === 'function') {
   255	    onConfirm();
   256	  }
   257	  return confirmed;
   258	}
   259	
   260	// Débounce pour les recherches
   261	function debounce(func, wait = 300) {
   262	  let timeout;
   263	  return function executedFunction(...args) {
   264	    const later = () => {
   265	      clearTimeout(timeout);
   266	      func(...args);
   267	    };
   268	    clearTimeout(timeout);
   269	    timeout = setTimeout(later, wait);
   270	  };
   271	}
   272	
   273	// Vérifier le rôle de l'utilisateur
   274	function checkUserRole(requiredRole) {
   275	  const user = Session.getCurrentUser();
   276	  if (!user) return false;
   277	  
   278	  if (Array.isArray(requiredRole)) {
   279	    return requiredRole.includes(user.role);
   280	  }
   281	  
   282	  return user.role === requiredRole;
   283	}
   284	
   285	// Rediriger si non connecté
   286	function requireAuth() {
   287	  if (!Session.isLoggedIn()) {
   288	    showToast('Vous devez être connecté pour accéder à cette page', 'error');
   289	    setTimeout(() => {
   290	      window.location.href = 'login.html';
   291	    }, 1500);
   292	    return false;
   293	  }
   294	  return true;
   295	}
   296	
   297	// Rediriger si non autorisé
   298	function requireRole(role) {
   299	  if (!requireAuth()) return false;
   300	  
   301	  if (!checkUserRole(role)) {
   302	    showToast('Vous n\'avez pas les permissions nécessaires', 'error');
   303	    setTimeout(() => {
   304	      window.location.href = 'index.html';
   305	    }, 1500);
   306	    return false;
   307	  }
   308	  return true;
   309	}
   310	
   311	// Obtenir les coordonnées de l'utilisateur
   312	function getUserLocation() {
   313	  return new Promise((resolve, reject) => {
   314	    if (!navigator.geolocation) {
   315	      reject(new Error('La géolocalisation n\'est pas supportée'));
   316	      return;
   317	    }
   318	    
   319	    navigator.geolocation.getCurrentPosition(
   320	      (position) => {
   321	        resolve({
   322	          latitude: position.coords.latitude,
   323	          longitude: position.coords.longitude
   324	        });
   325	      },
   326	      (error) => {
   327	        reject(error);
   328	      }
   329	    );
   330	  });
   331	}
   332	
   333	// Simuler des coordonnées pour Abidjan (pour démo)
   334	function getAbidjanCoordinates() {
   335	  // Coordonnées approximatives de différents quartiers d'Abidjan
   336	  const areas = [
   337	    { name: 'Plateau', lat: 5.3213, lon: -4.0114 },
   338	    { name: 'Cocody', lat: 5.3480, lon: -3.9838 },
   339	    { name: 'Yopougon', lat: 5.3346, lon: -4.0929 },
   340	    { name: 'Adjamé', lat: 5.3578, lon: -4.0207 },
   341	    { name: 'Treichville', lat: 5.2897, lon: -3.9830 },
   342	    { name: 'Marcory', lat: 5.2788, lon: -3.9666 },
   343	    { name: 'Koumassi', lat: 5.2948, lon: -3.9340 },
   344	    { name: 'Port-Bouët', lat: 5.2549, lon: -3.9193 },
   345	    { name: 'Attécoubé', lat: 5.3297, lon: -4.0482 },
   346	    { name: 'Abobo', lat: 5.4258, lon: -4.0201 }
   347	  ];
   348	  
   349	  return areas[Math.floor(Math.random() * areas.length)];
   350	}
   351	
   352	// Générer un avatar avec initiales
   353	function generateAvatar(firstName, lastName) {
   354	  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
   355	  const colors = ['#009E60', '#007A4A', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];
   356	  const color = colors[Math.floor(Math.random() * colors.length)];
   357	  
   358	  return `
   359	    <div style="
   360	      width: 100%;
   361	      height: 100%;
   362	      background: ${color};
   363	      display: flex;
   364	      align-items: center;
   365	      justify-content: center;
   366	      font-size: 4rem;
   367	      font-weight: 700;
   368	      color: white;
   369	    ">
   370	      ${initials}
   371	    </div>
   372	  `;
   373	}
   374	
   375	// Formater un numéro de téléphone
   376	function formatPhoneNumber(phone) {
   377	  // Retirer tous les espaces
   378	  const cleaned = phone.replace(/\s/g, '');
   379	  
   380	  // Si commence par +225
   381	  if (cleaned.startsWith('+225')) {
   382	    const number = cleaned.substring(4);
   383	    return `+225 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)} ${number.substring(8, 10)}`;
   384	  }
   385	  
   386	  // Sinon, format standard
   387	  return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`;
   388	}
   389	
   390	// Professions disponibles
   391	const PROFESSIONS = {
   392	  // Services classiques
   393	  GARAGISTE: 'Garagiste',
   394	  PLOMBIER: 'Plombier',
   395	  ELECTRICIEN: 'Électricien',
   396	  MENUISIER: 'Menuisier',
   397	  FRIGORISTE: 'Frigoriste',
   398	  MACON: 'Maçon',
   399	  PEINTRE: 'Peintre',
   400	  SERRURIER: 'Serrurier',
   401	  REPARATEUR_TELEPHONE: 'Réparateur téléphone',
   402	  MECANICIEN_MOTO: 'Mécanicien moto',
   403	  // Freelances
   404	  DEVELOPPEUR_WEB: 'Développeur Web',
   405	  GRAPHISTE: 'Graphiste',
   406	  REDACTEUR: 'Rédacteur',
   407	  PHOTOGRAPHE: 'Photographe',
   408	  VIDEASTE: 'Vidéaste',
   409	  TRADUCTEUR: 'Traducteur',
   410	  COMMUNITY_MANAGER: 'Community Manager',
   411	  COMPTABLE: 'Comptable',
   412	  MARKETING: 'Marketing'
   413	};
   414	
   415	// Icônes des professions
   416	const PROFESSION_ICONS = {
   417	  // Services classiques
   418	  GARAGISTE: 'fa-car',
   419	  PLOMBIER: 'fa-wrench',
   420	  ELECTRICIEN: 'fa-bolt',
   421	  MENUISIER: 'fa-hammer',
   422	  FRIGORISTE: 'fa-snowflake',
   423	  MACON: 'fa-hard-hat',
   424	  PEINTRE: 'fa-paint-roller',
   425	  SERRURIER: 'fa-key',
   426	  REPARATEUR_TELEPHONE: 'fa-mobile-alt',
   427	  MECANICIEN_MOTO: 'fa-motorcycle',
   428	  // Freelances
   429	  DEVELOPPEUR_WEB: 'fa-code',
   430	  GRAPHISTE: 'fa-palette',
   431	  REDACTEUR: 'fa-pen',
   432	  PHOTOGRAPHE: 'fa-camera',
   433	  VIDEASTE: 'fa-video',
   434	  TRADUCTEUR: 'fa-language',
   435	  COMMUNITY_MANAGER: 'fa-share-alt',
   436	  COMPTABLE: 'fa-calculator',
   437	  MARKETING: 'fa-chart-line'
   438	};
   439	
   440	// Exporter pour utilisation globale
   441	window.Utils = {
   442	  calculateDistance,
   443	  generateUUID,
   444	  formatDate,
   445	  formatDateTime,
   446	  formatPrice,
   447	  isValidEmail,
   448	  isValidIvorianPhone,
   449	  hashPassword,
   450	  Storage,
   451	  Session,
   452	  generateStars,
   453	  showToast,
   454	  confirmAction,
   455	  debounce,
   456	  checkUserRole,
   457	  requireAuth,
   458	  requireRole,
   459	  getUserLocation,
   460	  getAbidjanCoordinates,
   461	  generateAvatar,
   462	  formatPhoneNumber,
   463	  PROFESSIONS,
   464	  PROFESSION_ICONS
   465	};
   466	
