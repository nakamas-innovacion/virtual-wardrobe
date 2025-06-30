// src/services/OutfitAI.js
export const OutfitAI = {
  // Base de datos de estilos por clima
  stylesByWeather: {
    sunny: {
      styles: ['Casual Fresco', 'Elegante Verano', 'Deportivo Solar', 'Boho Chic'],
      descriptions: [
        'Perfecto para un día soleado. Colores claros y telas transpirables.',
        'Elegancia veraniega con toques sofisticados para el sol.',
        'Look deportivo ideal para actividades al aire libre.',
        'Estilo bohemio relajado perfecto para el buen tiempo.'
      ]
    },
    cloudy: {
      styles: ['Casual Urbano', 'Smart Casual', 'Minimalista', 'Artístico'],
      descriptions: [
        'Look versátil para un día nublado con capas cómodas.',
        'Equilibrio perfecto entre formal e informal para clima variable.',
        'Simplicidad elegante con líneas limpias.',
        'Expresión creativa con piezas únicas y texturas.'
      ]
    },
    rainy: {
      styles: ['Impermeable Chic', 'Cozy Layers', 'Urban Rain', 'Classic Storm'],
      descriptions: [
        'Protección elegante contra la lluvia sin sacrificar estilo.',
        'Capas acogedoras para mantenerte seco y cómodo.',
        'Look urbano preparado para la lluvia de la ciudad.',
        'Clásico atemporal resistente al mal tiempo.'
      ]
    },
    cold: {
      styles: ['Cozy Winter', 'Elegant Layers', 'Nordic Chic', 'Urban Warmth'],
      descriptions: [
        'Calidez y comodidad con texturas suaves y acogedoras.',
        'Sofisticación invernal con capas elegantes.',
        'Inspiración nórdica con funcionalidad y estilo.',
        'Calor urbano con piezas modernas y prácticas.'
      ]
    }
  },

  // Consejos de estilo por clima
  styleAdvice: {
    sunny: [
      'Los colores claros reflejan el calor y te mantienen fresco.',
      'Las telas naturales como el algodón son ideales para el sol.',
      'No olvides los accesorios para protegerte del sol.',
      'Los tonos pasteles complementan perfectamente los días soleados.'
    ],
    cloudy: [
      'Las capas te permiten adaptarte a cambios de temperatura.',
      'Los colores neutros son perfectos para días nublados.',
      'Experimenta con texturas para añadir interés visual.',
      'Un toque de color alegra los días grises.'
    ],
    rainy: [
      'Prioriza materiales resistentes al agua.',
      'Los colores oscuros disimulan mejor las manchas.',
      'Calzado con buen agarre es esencial para días húmedos.',
      'Una chaqueta ligera puede ser tu mejor aliada.'
    ],
    cold: [
      'Las capas son clave para mantener el calor corporal.',
      'Los tejidos como lana y cashmere ofrecen calidez natural.',
      'No descuides los accesorios: bufandas, gorros y guantes.',
      'Los colores oscuros absorben mejor el calor solar.'
    ]
  },

  // Determinar tipo de clima basado en temperatura y descripción
  getWeatherType(weatherData) {
    const temp = weatherData.temp
    const description = weatherData.description.toLowerCase()
    
    if (description.includes('lluv') || description.includes('rain')) {
      return 'rainy'
    } else if (temp < 10) {
      return 'cold'
    } else if (temp > 25 && (description.includes('sol') || description.includes('sun'))) {
      return 'sunny'
    } else if (description.includes('nubl') || description.includes('cloud')) {
      return 'cloudy'
    } else if (temp > 20) {
      return 'sunny'
    } else {
      return 'cloudy'
    }
  },

  // Filtrar prendas apropiadas para el clima
  getClimateAppropriateClothes(clothingItems, weatherType, temp) {
    return clothingItems.filter(item => {
      // Filtrar por temporada
      if (item.season === 'all') return true
      
      if (temp > 25 && (item.season === 'summer' || item.season === 'spring')) return true
      if (temp < 15 && (item.season === 'winter' || item.season === 'fall')) return true
      if (temp >= 15 && temp <= 25 && (item.season === 'spring' || item.season === 'fall')) return true
      
      return false
    })
  },

  // Seleccionar prendas aleatorias por categoría
  selectRandomByCategory(items, category, count = 1) {
    const categoryItems = items.filter(item => item.category === category)
    if (categoryItems.length === 0) return []
    
    const selected = []
    const usedIndexes = new Set()
    
    for (let i = 0; i < count && selected.length < categoryItems.length; i++) {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * categoryItems.length)
      } while (usedIndexes.has(randomIndex))
      
      usedIndexes.add(randomIndex)
      selected.push(categoryItems[randomIndex])
    }
    return selected
  },

  // Generar outfit completo
  generateOutfit(clothingItems, weatherData) {
    const weatherType = this.getWeatherType(weatherData)
    const appropriateClothes = this.getClimateAppropriateClothes(clothingItems, weatherType, weatherData.temp)
    
    // Seleccionar prendas básicas
    const tops = this.selectRandomByCategory(appropriateClothes, 'tops', 1)
    const bottoms = this.selectRandomByCategory(appropriateClothes, 'bottoms', 1)
    const shoes = this.selectRandomByCategory(appropriateClothes, 'shoes', 1)
    const accessories = this.selectRandomByCategory(appropriateClothes, 'accessories', 1)
    
    // Combinar todas las prendas seleccionadas
    const selectedItems = [...tops, ...bottoms, ...shoes, ...accessories].filter(Boolean)
    
    // Si no hay suficientes prendas, usar todas las disponibles
    if (selectedItems.length < 2) {
      const randomItems = []
      const categories = ['tops', 'bottoms', 'shoes']
      
      categories.forEach(category => {
        const items = this.selectRandomByCategory(clothingItems, category, 1)
        randomItems.push(...items)
      })
      
      selectedItems.push(...randomItems.filter(item => 
        !selectedItems.find(selected => selected.id === item.id)
      ))
    }

    // Obtener estilo y descripción aleatoria
    const weatherStyles = this.stylesByWeather[weatherType]
    const randomStyleIndex = Math.floor(Math.random() * weatherStyles.styles.length)
    const title = weatherStyles.styles[randomStyleIndex]
    const description = weatherStyles.descriptions[randomStyleIndex]
    
    // Obtener consejo de estilo aleatorio
    const advice = this.styleAdvice[weatherType]
    const randomAdvice = advice[Math.floor(Math.random() * advice.length)]

    return {
      title,
      description,
      advice: randomAdvice,
      items: selectedItems.slice(0, 4), // Máximo 4 prendas para la vista
      weatherType,
      generated: new Date().toISOString()
    }
  },

  // Función para evaluar compatibilidad de prendas
  evaluateCompatibility(item1, item2) {
    // Lógica simple de compatibilidad por colores y estilo
    const colorCompatibility = {
      'bg-white': ['bg-black', 'bg-blue-600', 'bg-gray-600', 'bg-pink-200'],
      'bg-black': ['bg-white', 'bg-gray-300', 'bg-blue-600'],
      'bg-blue-600': ['bg-white', 'bg-black', 'bg-gray-300'],
      'bg-pink-200': ['bg-white', 'bg-gray-600'],
      'bg-amber-800': ['bg-black', 'bg-white']
    }
    
    return colorCompatibility[item1.color]?.includes(item2.color) || false
  },

  // Generar múltiples opciones de outfit
  generateMultipleOutfits(clothingItems, weatherData, count = 3) {
    const outfits = []
    for (let i = 0; i < count; i++) {
      outfits.push(this.generateOutfit(clothingItems, weatherData))
    }
    return outfits
  }
}

export default OutfitAI