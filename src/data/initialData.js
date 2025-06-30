// src/data/initialData.js

export const initialClothingItems = [
  {
    id: 1,
    name: 'Camisa Blanca Clásica',
    category: 'tops',
    brand: 'Zara',
    color: 'bg-white',
    season: 'all',
    condition: 95,
    timesWorn: 12,
    lastWorn: '2025-06-25',
    createdAt: '2024-01-15',
    originalPrice: 29990,
    image: 'https://b2ctreckcl.vtexassets.com/arquivos/ids/169126-800-auto?v=638695409461730000&width=800&height=auto&aspect=true'
  },
  {
    id: 2,
    name: 'Jeans Azul Oscuro',
    category: 'bottoms',
    brand: 'H&M',
    color: 'bg-blue-600',
    season: 'all',
    condition: 88,
    timesWorn: 25,
    lastWorn: '2025-06-28',
    createdAt: '2024-02-10',
    originalPrice: 39990,
    image: 'https://www.zazadorali.cl/wp-content/uploads/2023/08/JN8000-AZUL-01.jpg'
  },
  {
    id: 3,
    name: 'Sneakers Blancos',
    category: 'shoes',
    brand: 'Nike',
    color: 'bg-white',
    season: 'spring',
    condition: 75,
    timesWorn: 40,
    lastWorn: '2025-06-29',
    createdAt: '2024-03-05',
    originalPrice: 89990,
    image: 'https://i.pinimg.com/736x/a8/38/84/a838843f2b0b10fc157683f44df3a2e3.jpg'
  },
  {
    id: 4,
    name: 'Blazer Negro Elegante',
    category: 'tops',
    brand: 'Mango',
    color: 'bg-black',
    season: 'fall',
    condition: 92,
    timesWorn: 8,
    lastWorn: '2025-06-20',
    createdAt: '2024-01-20',
    originalPrice: 69990,
    image: 'https://hmchile.vtexassets.com/arquivos/ids/6674801/Blazer-de-botonadura-sencilla-Slim-Fit---Negro---H-M-CL.jpg?v=638755438210430000'
  },
  {
    id: 5,
    name: 'Vestido Floral Verano',
    category: 'tops',
    brand: 'Bershka',
    color: 'bg-pink-200',
    season: 'summer',
    condition: 85,
    timesWorn: 15,
    lastWorn: '2025-06-22',
    createdAt: '2024-04-12',
    originalPrice: 24990,
    image: 'https://hmchile.vtexassets.com/arquivos/ids/5353552/Vestido-floral-con-manga-globo---Beige-claro-Floral---H-M-CL.jpg?v=638228370482100000'
  },
  {
    id: 6,
    name: 'Pantalón Negro Formal',
    category: 'bottoms',
    brand: 'Uniqlo',
    color: 'bg-black',
    season: 'all',
    condition: 90,
    timesWorn: 18,
    lastWorn: '2025-06-26',
    createdAt: '2024-02-28',
    originalPrice: 34990,
    image: 'https://cdnx.jumpseller.com/yagan-depot/image/62096532/Pantalon_Negro_Gabardina_Trabajo__2_.jpg?1743705558'
  },
  {
    id: 7,
    name: 'Botas de Cuero Marrón',
    category: 'shoes',
    brand: 'Dr. Martens',
    color: 'bg-amber-800',
    season: 'winter',
    condition: 65,
    timesWorn: 45,
    lastWorn: '2025-06-15',
    createdAt: '2024-01-08',
    originalPrice: 159990,
    image: 'https://www.narruks.cl/cdn/shop/products/WBG1000-40-1-Siete-Leguas-Bota-Cuero-Gamuza-Ginger-jpg.jpg?v=1668006397'
  },
  {
    id: 8,
    name: 'Bufanda de Lana Gris',
    category: 'accessories',
    brand: 'Massimo Dutti',
    color: 'bg-gray-600',
    season: 'winter',
    condition: 93,
    timesWorn: 6,
    lastWorn: '2025-05-30',
    createdAt: '2024-03-15',
    originalPrice: 29990,
    image: 'https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77027651_78_D5.jpg?imwidth=2048&imdensity=1&ts=1730394273830'
  },
  {
    id: 9,
    name: 'Camiseta Básica Gris',
    category: 'tops',
    brand: 'Cotton On',
    color: 'bg-gray-400',
    season: 'all',
    condition: 78,
    timesWorn: 32,
    lastWorn: '2025-06-27',
    createdAt: '2024-01-25',
    originalPrice: 12990,
    image: 'https://via.placeholder.com/300x300/9CA3AF/FFFFFF?text=Camiseta+Gris'
  },
  {
    id: 10,
    name: 'Falda Plisada Azul',
    category: 'bottoms',
    brand: 'Pull & Bear',
    color: 'bg-blue-400',
    season: 'spring',
    condition: 87,
    timesWorn: 14,
    lastWorn: '2025-06-23',
    createdAt: '2024-04-02',
    originalPrice: 19990,
    image: 'https://via.placeholder.com/300x300/60A5FA/FFFFFF?text=Falda+Azul'
  }
]

export const initialWeatherData = {
  location: 'Santiago, Chile',
  temp: 22,
  max: 25,
  min: 15,
  description: 'Soleado',
  humidity: 45,
  windSpeed: 12,
  uvIndex: 6,
  lastUpdated: new Date().toISOString()
}

export const mockCatalogData = [
  {
    id: 'cat_001',
    name: 'Chaqueta Denim Clásica',
    category: 'tops',
    brand: 'Levi\'s',
    price: 89990,
    originalPrice: 109990,
    discount: 18,
    color: 'bg-blue-500',
    season: 'all',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Azul clásico', 'Negro', 'Blanco'],
    description: 'Chaqueta denim clásica de corte recto. Material 100% algodón.',
    features: ['100% algodón', 'Corte clásico', 'Bolsillos frontales', 'Cierre con botones'],
    compatibility: ['jeans', 'falda', 'vestido', 'pantalón'],
    trending: true,
    rating: 4.5,
    reviews: 234,
    addedDate: '2025-06-15',
    image: 'https://levis.cl/media/catalog/product/cache/eaaba5bf70dd6e05d78e04c6434dea8e/7/7/77380-0001-1.jpg'
  },
  {
    id: 'cat_002',
    name: 'Vestido Floral Midi',
    category: 'dresses',
    brand: 'Zara',
    price: 29990,
    originalPrice: 29990,
    discount: 0,
    color: 'bg-pink-300',
    season: 'summer',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa floral', 'Azul floral', 'Verde floral'],
    description: 'Vestido midi con estampado floral. Manga larga con puños elásticos.',
    features: ['Estampado floral', 'Manga larga', 'Largo midi', 'Tela fluida'],
    compatibility: ['sandalias', 'sneakers', 'tacones'],
    trending: false,
    rating: 4.2,
    reviews: 89,
    addedDate: '2025-06-10',
    image: 'https://static.zara.net/photos///2024/V/0/1/p/7568/144/800/2/w/750/7568144800_6_1_1.jpg'
  },
  {
    id: 'cat_003',
    name: 'Sneakers Retro Runner',
    category: 'shoes',
    brand: 'Nike',
    price: 119990,
    originalPrice: 139990,
    discount: 14,
    color: 'bg-white',
    season: 'all',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: ['Blanco/Gris', 'Negro/Blanco', 'Azul/Blanco'],
    description: 'Sneakers retro con tecnología Air. Perfectos para uso diario.',
    features: ['Tecnología Air', 'Suela de goma', 'Upper de cuero sintético', 'Cómodos'],
    compatibility: ['jeans', 'shorts', 'vestido', 'pantalón deportivo'],
    trending: true,
    rating: 4.7,
    reviews: 456,
    addedDate: '2025-06-20',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFqb.png'
  },
  {
    id: 'cat_004',
    name: 'Blusa Satinada Elegante',
    category: 'tops',
    brand: 'Mango',
    price: 39990,
    originalPrice: 49990,
    discount: 20,
    color: 'bg-emerald-500',
    season: 'all',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Verde esmeralda', 'Azul marino', 'Negro', 'Crema'],
    description: 'Blusa elegante de satén con cuello en V. Ideal para ocasiones especiales.',
    features: ['Tela satinada', 'Cuello en V', 'Manga larga', 'Corte holgado'],
    compatibility: ['pantalón formal', 'falda', 'jeans'],
    trending: false,
    rating: 4.3,
    reviews: 67,
    addedDate: '2025-06-05',
    image: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Blusa+Verde'
  },
  {
    id: 'cat_005',
    name: 'Pantalón Wide Leg',
    category: 'bottoms',
    brand: 'H&M',
    price: 34990,
    originalPrice: 34990,
    discount: 0,
    color: 'bg-slate-700',
    season: 'all',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gris oscuro', 'Negro', 'Beige', 'Azul marino'],
    description: 'Pantalón de pierna ancha con cintura alta. Confeccionado en tela fluida.',
    features: ['Pierna ancha', 'Cintura alta', 'Tela fluida', 'Bolsillos laterales'],
    compatibility: ['blusa', 'camiseta', 'sweater'],
    trending: true,
    rating: 4.4,
    reviews: 123,
    addedDate: '2025-06-18',
    image: 'https://via.placeholder.com/300x300/374151/FFFFFF?text=Pantalón+Wide'
  },
  {
    id: 'cat_006',
    name: 'Abrigo Wool Blend',
    category: 'tops',
    brand: 'COS',
    price: 199990,
    originalPrice: 249990,
    discount: 20,
    color: 'bg-amber-900',
    season: 'winter',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Camel', 'Negro', 'Gris marengo'],
    description: 'Abrigo largo en mezcla de lana. Diseño minimalista y atemporal.',
    features: ['80% lana', 'Corte recto', 'Cuello solapa', 'Cierre con botones'],
    compatibility: ['cualquier outfit de invierno'],
    trending: false,
    rating: 4.8,
    reviews: 45,
    addedDate: '2025-06-01',
    image: 'https://via.placeholder.com/300x300/92400E/FFFFFF?text=Abrigo+Camel'
  },
  {
    id: 'cat_007',
    name: 'Bolso Crossbody Minimalista',
    category: 'accessories',
    brand: 'Charles & Keith',
    price: 49990,
    originalPrice: 59990,
    discount: 17,
    color: 'bg-black',
    season: 'all',
    sizes: ['Único'],
    colors: ['Negro', 'Cognac', 'Blanco'],
    description: 'Bolso crossbody de cuero sintético. Diseño minimalista con correa ajustable.',
    features: ['Cuero sintético', 'Correa ajustable', 'Compartimento principal', 'Bolsillo frontal'],
    compatibility: ['cualquier outfit'],
    trending: true,
    rating: 4.1,
    reviews: 78,
    addedDate: '2025-06-12',
    image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Bolso+Negro'
  },
  {
    id: 'cat_008',
    name: 'Cardigan Oversized',
    category: 'tops',
    brand: 'Uniqlo',
    price: 44990,
    originalPrice: 44990,
    discount: 0,
    color: 'bg-rose-200',
    season: 'fall',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rosa pastel', 'Beige', 'Gris claro', 'Crema'],
    description: 'Cardigan oversized en punto suave. Perfecto para capas cómodas.',
    features: ['Punto suave', 'Corte oversized', 'Botones frontales', 'Bolsillos'],
    compatibility: ['camiseta', 'blusa', 'vestido'],
    trending: false,
    rating: 4.6,
    reviews: 156,
    addedDate: '2025-06-08',
    image: 'https://via.placeholder.com/300x300/FECACA/FFFFFF?text=Cardigan+Rosa'
  }
]

export const achievementsData = [
  {
    id: 'fashionista',
    name: 'Fashionista',
    description: 'Usa 50 outfits diferentes',
    icon: '👗',
    maxProgress: 50,
    category: 'outfits',
    rewards: {
      points: 500,
      badge: 'fashionista_gold'
    }
  },
  {
    id: 'eco_friendly',
    name: 'Eco-friendly',
    description: 'Reutiliza prendas 100 veces',
    icon: '♻️',
    maxProgress: 100,
    category: 'sustainability',
    rewards: {
      points: 300,
      badge: 'eco_warrior'
    }
  },
  {
    id: 'trendsetter',
    name: 'Trendsetter',
    description: 'Alcanza nivel 10',
    icon: '⭐',
    maxProgress: 10,
    category: 'level',
    rewards: {
      points: 1000,
      badge: 'trendsetter_master'
    }
  },
  {
    id: 'wardrobe_keeper',
    name: 'Cuidador del Armario',
    description: 'Mantén todas las prendas en buen estado',
    icon: '🧹',
    maxProgress: 100,
    category: 'care',
    rewards: {
      points: 200,
      badge: 'wardrobe_master'
    }
  },
  {
    id: 'streak_master',
    name: 'Racha Perfecta',
    description: 'Mantén una racha de 30 días',
    icon: '🔥',
    maxProgress: 30,
    category: 'streak',
    rewards: {
      points: 750,
      badge: 'streak_legend'
    }
  },
  {
    id: 'color_coordinator',
    name: 'Coordinador de Colores',
    description: 'Crea 25 outfits con buena coordinación',
    icon: '🎨',
    maxProgress: 25,
    category: 'style',
    rewards: {
      points: 400,
      badge: 'color_expert'
    }
  },
  {
    id: 'seasonal_expert',
    name: 'Experto Estacional',
    description: 'Usa prendas apropiadas para cada estación',
    icon: '🌸',
    maxProgress: 4,
    category: 'seasonal',
    rewards: {
      points: 600,
      badge: 'season_master'
    }
  },
  {
    id: 'planner_pro',
    name: 'Planificador Pro',
    description: 'Planifica outfits para 7 días consecutivos',
    icon: '📅',
    maxProgress: 7,
    category: 'planning',
    rewards: {
      points: 350,
      badge: 'planner_expert'
    }
  },
  {
    id: 'virtual_stylist',
    name: 'Estilista Virtual',
    description: 'Prueba 20 prendas del catálogo virtual',
    icon: '👔',
    maxProgress: 20,
    category: 'catalog',
    rewards: {
      points: 250,
      badge: 'virtual_stylist'
    }
  },
  {
    id: 'minimalist',
    name: 'Minimalista',
    description: 'Crea 10 outfits con solo 3 prendas cada uno',
    icon: '✨',
    maxProgress: 10,
    category: 'style',
    rewards: {
      points: 300,
      badge: 'minimalist_master'
    }
  }
]

export const userProfileData = {
  name: 'María García',
  email: 'maria.garcia@email.com',
  avatar: 'https://img.freepik.com/foto-gratis/mujer-posando-tiro-medio-estudio_23-2149883753.jpg?semt=ais_hybrid&w=740',
  memberSince: '2024-01-15',
  preferences: {
    favoriteColors: ['black', 'white', 'navy', 'gray'],
    favoriteBrands: ['Zara', 'H&M', 'Mango'],
    preferredStyle: 'casual_chic',
    budgetRange: {
      min: 10000,
      max: 100000
    },
    sizes: {
      tops: 'M',
      bottoms: 'M',
      shoes: '38',
      accessories: 'Único'
    }
  },
  settings: {
    notifications: {
      outfitReminders: true,
      weatherAlerts: true,
      achievementUpdates: true,
      catalogUpdates: false
    },
    privacy: {
      shareStats: false,
      publicProfile: false
    },
    theme: 'light' // 'light', 'dark', 'auto'
  }
}