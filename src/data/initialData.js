// src/data/initialData.js
import { Trophy, Star, Flame, Crown, Target, Award, Zap, Gift, TrendingUp, Medal } from 'lucide-react'

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
    createdAt: '2024-02-12',
    originalPrice: 24990,
    image: 'https://ae01.alicdn.com/kf/S44945a4f02b54483976f6443752018a4D.jpg'
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_939711-MLC73767108938_012024-O-polera-basica-recta-algodon-hombre-gris-manga-corta.webp'
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgmLS_nPMTvl7RrOsjC96GQjaiZt3A2EMtw&s'
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
      id: 1,
      name: 'Blazer Oversize Elegante',
      brand: 'Zara',
      price: 45990,
      originalPrice: 55990,
      category: 'tops',
      rating: 4.8,
      reviews: 124,
      image: 'https://hmchile.vtexassets.com/arquivos/ids/6674801/Blazer-de-botonadura-sencilla-Slim-Fit---Negro---H-M-CL.jpg?v=638755438210430000',
      tags: ['trending', 'sale'],
      season: 'all',
      colors: ['Negro', 'Beige', 'Azul Marino'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Blazer elegante de corte oversized perfecto para looks profesionales y casuales'
    },
    {
      id: 2,
      name: 'Jeans Mom Fit Vintage',
      brand: 'H&M',
      price: 29990,
      category: 'bottoms',
      rating: 4.6,
      reviews: 89,
      image: 'https://www.zazadorali.cl/wp-content/uploads/2023/08/JN8000-AZUL-01.jpg',
      tags: ['trending', 'featured'],
      season: 'all',
      colors: ['Azul Claro', 'Azul Oscuro', 'Negro'],
      sizes: ['26', '28', '30', '32', '34'],
      description: 'Jeans de cintura alta con corte mom fit que estiliza la figura'
    },
    {
      id: 3,
      name: 'Sneakers Chunky Premium',
      brand: 'Nike',
      price: 89990,
      category: 'shoes',
      rating: 4.9,
      reviews: 256,
      image: 'https://i.pinimg.com/736x/a8/38/84/a838843f2b0b10fc157683f44df3a2e3.jpg',
      tags: ['new', 'trending', 'featured'],
      season: 'all',
      colors: ['Blanco', 'Negro', 'Gris'],
      sizes: ['36', '37', '38', '39', '40'],
      description: 'Zapatillas deportivas con suela chunky y máximo confort'
    },
    {
      id: 4,
      name: 'Vestido Midi Floral',
      brand: 'Bershka',
      price: 39990,
      category: 'tops',
      rating: 4.7,
      reviews: 167,
      image: 'https://hmchile.vtexassets.com/arquivos/ids/5353552/Vestido-floral-con-manga-globo---Beige-claro-Floral---H-M-CL.jpg?v=638228370482100000',
      tags: ['new', 'featured'],
      season: 'spring',
      colors: ['Floral Beige', 'Floral Rosa', 'Floral Azul'],
      sizes: ['XS', 'S', 'M', 'L'],
      description: 'Vestido romántico con estampado floral y manga globo'
    },
    {
      id: 5,
      name: 'Botas Chelsea Premium',
      brand: 'Dr. Martens',
      price: 129990,
      category: 'shoes',
      rating: 4.9,
      reviews: 312,
      image: 'https://www.narruks.cl/cdn/shop/products/WBG1000-40-1-Siete-Leguas-Bota-Cuero-Gamuza-Ginger-jpg.jpg?v=1668006397',
      tags: ['trending'],
      season: 'fall',
      colors: ['Marrón', 'Negro', 'Burdeos'],
      sizes: ['36', '37', '38', '39', '40', '41'],
      description: 'Botas Chelsea de cuero premium con diseño atemporal'
    },
    {
      id: 6,
      name: 'Bufanda Cashmere Luxury',
      brand: 'Massimo Dutti',
      price: 79990,
      originalPrice: 99990,
      category: 'accessories',
      rating: 4.8,
      reviews: 94,
      image: 'https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77027651_78_D5.jpg?imwidth=2048&imdensity=1&ts=1730394273830',
      tags: ['sale'],
      season: 'winter',
      colors: ['Gris', 'Beige', 'Negro'],
      sizes: ['Único'],
      description: 'Bufanda de cashmere 100% con acabado premium'
    },
    {
      id: 7,
      name: 'Camisa Seda Elegante',
      brand: 'Mango',
      price: 59990,
      category: 'tops',
      rating: 4.5,
      reviews: 78,
      image: 'https://b2ctreckcl.vtexassets.com/arquivos/ids/169126-800-auto?v=638695409461730000&width=800&height=auto&aspect=true',
      tags: ['new'],
      season: 'all',
      colors: ['Blanco', 'Crema', 'Rosa Pálido'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Camisa de seda natural con caída perfecta'
    },
    {
      id: 8,
      name: 'Pantalón Wide Leg',
      brand: 'Uniqlo',
      price: 35990,
      category: 'bottoms',
      rating: 4.6,
      reviews: 142,
      image: 'https://cdnx.jumpseller.com/yagan-depot/image/62096532/Pantalon_Negro_Gabardina_Trabajo__2_.jpg?1743705558',
      tags: ['trending'],
      season: 'all',
      colors: ['Negro', 'Beige', 'Azul Marino'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Pantalón de pierna ancha con corte moderno y cómodo'
    }
  ]

export const achievementsData = [
    {
      id: 1,
      title: 'Primer Paso',
      description: 'Crea tu primer outfit con IA',
      icon: Trophy,
      unlocked: true,
      unlockedAt: '2024-01-15',
      rarity: 'common',
      experience: 50,
      category: 'beginner'
    },
    {
      id: 2,
      title: 'Coleccionista Novato',
      description: 'Agrega 25 prendas a tu armario',
      icon: Star,
      unlocked: true,
      unlockedAt: '2024-01-20',
      rarity: 'common',
      experience: 100,
      progress: 127,
      maxProgress: 25,
      category: 'collection'
    },
    {
      id: 3,
      title: 'Racha de Fuego',
      description: 'Usa la app 7 días consecutivos',
      icon: Flame,
      unlocked: true,
      unlockedAt: '2024-01-25',
      rarity: 'rare',
      experience: 200,
      progress: 7,
      maxProgress: 7,
      category: 'engagement'
    },
    {
      id: 4,
      title: 'Explorador de Estilos',
      description: 'Desbloquea 10 estilos diferentes',
      icon: Target,
      unlocked: false,
      rarity: 'rare',
      experience: 250,
      progress: 8,
      maxProgress: 10,
      category: 'exploration'
    },
    {
      id: 5,
      title: 'Maestro del Outfit',
      description: 'Crea 100 outfits únicos',
      icon: Award,
      unlocked: false,
      rarity: 'epic',
      experience: 500,
      progress: 43,
      maxProgress: 100,
      category: 'creation'
    },
    {
      id: 6,
      title: 'Gurú de la Moda',
      description: 'Alcanza el nivel 25',
      icon: Crown,
      unlocked: false,
      rarity: 'epic',
      experience: 750,
      progress: 12,
      maxProgress: 25,
      category: 'progression'
    },
    {
      id: 7,
      title: 'Influencer Virtual',
      description: 'Comparte 50 outfits',
      icon: Zap,
      unlocked: false,
      rarity: 'legendary',
      experience: 1000,
      progress: 7,
      maxProgress: 50,
      category: 'social'
    },
    {
      id: 8,
      title: 'Coleccionista Supremo',
      description: 'Alcanza 500 prendas',
      icon: Gift,
      unlocked: false,
      rarity: 'legendary',
      experience: 1500,
      progress: 127,
      maxProgress: 500,
      category: 'collection'
    }
  ]

export const challengesData = [
    {
      id: 1,
      title: 'Desafío Diario',
      description: 'Crea 3 outfits diferentes hoy',
      type: 'daily',
      progress: 1,
      maxProgress: 3,
      reward: 50,
      timeLeft: '14h 23m',
      icon: Medal
    },
    {
      id: 2,
      title: 'Semana de Estilos',
      description: 'Prueba 5 estilos diferentes esta semana',
      type: 'weekly',
      progress: 2,
      maxProgress: 5,
      reward: 200,
      timeLeft: '3d 8h',
      icon: TrendingUp
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