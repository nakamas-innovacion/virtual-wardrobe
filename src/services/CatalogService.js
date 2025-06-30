

// src/services/CatalogService.js
export class CatalogService {
  constructor() {
    this.compatibilityMatrix = {
      'tops': ['bottoms', 'shoes', 'accessories'],
      'bottoms': ['tops', 'shoes', 'accessories'],
      'shoes': ['tops', 'bottoms', 'accessories'],
      'dresses': ['shoes', 'accessories'],
      'accessories': ['tops', 'bottoms', 'shoes', 'dresses']
    }
    
    this.colorCompatibility = {
      'white': ['black', 'navy', 'gray', 'beige', 'pink', 'blue'],
      'black': ['white', 'gray', 'red', 'pink', 'gold'],
      'navy': ['white', 'beige', 'gray', 'gold'],
      'gray': ['white', 'black', 'navy', 'pink', 'yellow'],
      'beige': ['white', 'navy', 'brown', 'green'],
      'red': ['black', 'white', 'navy', 'gray'],
      'pink': ['white', 'gray', 'navy', 'black'],
      'blue': ['white', 'beige', 'gray', 'yellow'],
      'green': ['beige', 'white', 'brown', 'navy'],
      'brown': ['beige', 'white', 'green', 'navy']
    }
  }

  // Analizar compatibilidad de una prenda del catálogo con el armario
  analyzeCompatibility(catalogItem, userWardrobe) {
    const analysis = {
      overallScore: 0,
      compatibleItems: [],
      incompatibleItems: [],
      recommendations: [],
      styleMatches: []
    }

    // Filtrar elementos compatibles por categoría
    const potentialMatches = userWardrobe.filter(wardrobeItem => 
      this.compatibilityMatrix[catalogItem.category]?.includes(wardrobeItem.category) ||
      this.compatibilityMatrix[wardrobeItem.category]?.includes(catalogItem.category)
    )

    potentialMatches.forEach(wardrobeItem => {
      const compatibility = this.calculateItemCompatibility(catalogItem, wardrobeItem)
      
      if (compatibility.score >= 70) {
        analysis.compatibleItems.push({
          ...wardrobeItem,
          compatibilityScore: compatibility.score,
          reasons: compatibility.reasons
        })
      } else {
        analysis.incompatibleItems.push({
          ...wardrobeItem,
          compatibilityScore: compatibility.score,
          reasons: compatibility.reasons
        })
      }
    })

    // Calcular puntuación general
    if (potentialMatches.length > 0) {
      const avgScore = analysis.compatibleItems.reduce((sum, item) => 
        sum + item.compatibilityScore, 0) / potentialMatches.length
      analysis.overallScore = Math.round(avgScore)
    }

    // Generar recomendaciones
    analysis.recommendations = this.generateRecommendations(catalogItem, analysis)
    
    // Encontrar coincidencias de estilo
    analysis.styleMatches = this.findStyleMatches(catalogItem, userWardrobe)

    return analysis
  }

  // Calcular compatibilidad entre dos prendas específicas
  calculateItemCompatibility(item1, item2) {
    let score = 0
    const reasons = []

    // Compatibilidad por categoría (40% del score)
    if (this.areCategoriesCompatible(item1.category, item2.category)) {
      score += 40
      reasons.push('Categorías compatibles')
    }

    // Compatibilidad por color (30% del score)
    const colorScore = this.calculateColorCompatibility(item1, item2)
    score += colorScore * 0.3
    if (colorScore > 70) {
      reasons.push('Colores que combinan bien')
    }

    // Compatibilidad por temporada (20% del score)
    const seasonScore = this.calculateSeasonCompatibility(item1, item2)
    score += seasonScore * 0.2
    if (seasonScore > 80) {
      reasons.push('Apropiado para la misma temporada')
    }

    // Compatibilidad por estilo/marca (10% del score)
    const styleScore = this.calculateStyleCompatibility(item1, item2)
    score += styleScore * 0.1
    if (styleScore > 80) {
      reasons.push('Estilos complementarios')
    }

    return {
      score: Math.round(score),
      reasons
    }
  }

  // Verificar compatibilidad entre categorías
  areCategoriesCompatible(category1, category2) {
    return this.compatibilityMatrix[category1]?.includes(category2) ||
           this.compatibilityMatrix[category2]?.includes(category1)
  }

  // Calcular compatibilidad de colores
  calculateColorCompatibility(item1, item2) {
    const color1 = this.extractColorFromBg(item1.color || item1.backgroundColor)
    const color2 = this.extractColorFromBg(item2.color || item2.backgroundColor)
    
    if (color1 === color2) return 85 // Mismo color es buena compatibilidad
    
    const compatible1to2 = this.colorCompatibility[color1]?.includes(color2)
    const compatible2to1 = this.colorCompatibility[color2]?.includes(color1)
    
    if (compatible1to2 || compatible2to1) return 90
    
    // Neutral colors are generally compatible
    const neutrals = ['white', 'black', 'gray', 'beige']
    if (neutrals.includes(color1) || neutrals.includes(color2)) return 75
    
    return 30 // Baja compatibilidad por defecto
  }

  // Extraer color básico de clase CSS
  extractColorFromBg(colorClass) {
    if (!colorClass) return 'unknown'
    
    const colorMap = {
      'bg-white': 'white',
      'bg-black': 'black',
      'bg-gray': 'gray',
      'bg-blue': 'blue',
      'bg-red': 'red',
      'bg-green': 'green',
      'bg-yellow': 'yellow',
      'bg-pink': 'pink',
      'bg-purple': 'purple',
      'bg-amber': 'brown',
      'bg-slate': 'gray'
    }
    
    for (const [cssClass, color] of Object.entries(colorMap)) {
      if (colorClass.includes(cssClass)) return color
    }
    
    return 'unknown'
  }

  // Calcular compatibilidad de temporada
  calculateSeasonCompatibility(item1, item2) {
    if (item1.season === 'all' || item2.season === 'all') return 100
    if (item1.season === item2.season) return 100
    
    const seasonGroups = {
      warm: ['spring', 'summer'],
      cool: ['fall', 'winter']
    }
    
    for (const group of Object.values(seasonGroups)) {
      if (group.includes(item1.season) && group.includes(item2.season)) {
        return 80
      }
    }
    
    return 40
  }

  // Calcular compatibilidad de estilo
  calculateStyleCompatibility(item1, item2) {
    // Marcas similares tienen mejor compatibilidad
    if (item1.brand && item2.brand && item1.brand === item2.brand) {
      return 90
    }
    
    // Rangos de precio similares
    if (item1.price && item2.price) {
      const priceRatio = Math.min(item1.price, item2.price) / Math.max(item1.price, item2.price)
      if (priceRatio > 0.7) return 80
    }
    
    return 60 // Compatibilidad neutral por defecto
  }

  // Generar recomendaciones basadas en el análisis
  generateRecommendations(catalogItem, analysis) {
    const recommendations = []
    
    if (analysis.overallScore >= 80) {
      recommendations.push({
        type: 'excellent',
        title: '¡Excelente elección!',
        description: 'Esta prenda combina perfectamente con tu armario actual',
        icon: '⭐'
      })
    } else if (analysis.overallScore >= 60) {
      recommendations.push({
        type: 'good',
        title: 'Buena opción',
        description: 'Esta prenda tiene buena compatibilidad con varias de tus prendas',
        icon: '👍'
      })
    } else if (analysis.overallScore >= 40) {
      recommendations.push({
        type: 'moderate',
        title: 'Compatibilidad moderada',
        description: 'Podrías necesitar prendas adicionales para crear outfits completos',
        icon: '⚠️'
      })
    } else {
      recommendations.push({
        type: 'low',
        title: 'Compatibilidad limitada',
        description: 'Esta prenda no combina bien con tu estilo actual',
        icon: '❌'
      })
    }

    // Recomendaciones específicas
    if (analysis.compatibleItems.length === 0) {
      recommendations.push({
        type: 'suggestion',
        title: 'Considera estas opciones',
        description: 'Para aprovechar mejor esta prenda, podrías necesitar prendas básicas adicionales',
        icon: '💡'
      })
    }

    // Recomendación por gaps en el armario
    const missingCategories = this.findMissingCategories(catalogItem, analysis)
    if (missingCategories.length > 0) {
      recommendations.push({
        type: 'gap',
        title: 'Completa tu look',
        description: `Considera añadir: ${missingCategories.join(', ')}`,
        icon: '📝'
      })
    }

    return recommendations
  }

  // Encontrar categorías faltantes para completar outfits
  findMissingCategories(catalogItem, analysis) {
    const essentialCategories = ['tops', 'bottoms', 'shoes']
    const currentCategories = new Set([catalogItem.category])
    
    analysis.compatibleItems.forEach(item => {
      currentCategories.add(item.category)
    })
    
    return essentialCategories.filter(category => !currentCategories.has(category))
  }

  // Encontrar coincidencias de estilo
  findStyleMatches(catalogItem, userWardrobe) {
    const matches = []
    
    // Buscar prendas de la misma marca
    const sameBrand = userWardrobe.filter(item => 
      item.brand && catalogItem.brand && 
      item.brand.toLowerCase() === catalogItem.brand.toLowerCase()
    )
    
    if (sameBrand.length > 0) {
      matches.push({
        type: 'brand',
        title: `Misma marca: ${catalogItem.brand}`,
        items: sameBrand,
        description: 'Tienes otras prendas de esta marca'
      })
    }
    
    // Buscar prendas de color similar
    const similarColor = userWardrobe.filter(item => 
      this.calculateColorCompatibility(catalogItem, item) >= 85
    )
    
    if (similarColor.length > 0) {
      matches.push({
        type: 'color',
        title: 'Colores similares',
        items: similarColor.slice(0, 3),
        description: 'Estas prendas tienen colores que combinan'
      })
    }
    
    return matches
  }

  // Simular prueba virtual
  virtualTryOn(catalogItem, userProfile = {}) {
    const tryOnResult = {
      item: catalogItem,
      fit: this.calculateFit(catalogItem, userProfile),
      styleScore: this.calculateStyleScore(catalogItem, userProfile),
      recommendations: [],
      visualEffects: this.generateVisualEffects(catalogItem)
    }
    
    // Generar recomendaciones de talla
    if (tryOnResult.fit.confidence < 70) {
      tryOnResult.recommendations.push({
        type: 'size',
        message: 'Considera revisar la guía de tallas antes de comprar',
        suggestion: 'size_guide'
      })
    }
    
    // Recomendaciones de estilo
    if (tryOnResult.styleScore < 60) {
      tryOnResult.recommendations.push({
        type: 'style',
        message: 'Esta prenda podría no ser tu estilo habitual',
        suggestion: 'try_similar'
      })
    }
    
    return tryOnResult
  }

  // Calcular ajuste de talla (simulado)
  calculateFit(catalogItem, userProfile) {
    // En una implementación real, esto usaría medidas del usuario
    return {
      overall: 'good', // excellent, good, fair, poor
      confidence: 75, // 0-100
      details: {
        length: 'perfect',
        width: 'slightly loose',
        shoulders: 'good fit'
      }
    }
  }

  // Calcular puntuación de estilo
  calculateStyleScore(catalogItem, userProfile) {
    // Puntuación basada en preferencias del usuario
    let score = 70 // Base score
    
    if (userProfile.preferredColors?.includes(catalogItem.color)) {
      score += 15
    }
    
    if (userProfile.preferredBrands?.includes(catalogItem.brand)) {
      score += 10
    }
    
    if (catalogItem.trending) {
      score += 5
    }
    
    return Math.min(100, score)
  }

  // Generar efectos visuales para la prueba
  generateVisualEffects(catalogItem) {
    return {
      lighting: 'natural',
      background: 'neutral',
      pose: 'front',
      zoom: '100%',
      filters: []
    }
  }

  // Buscar items similares en el catálogo
  findSimilarItems(catalogItem, catalog, limit = 5) {
    return catalog
      .filter(item => item.id !== catalogItem.id)
      .map(item => ({
        ...item,
        similarity: this.calculateSimilarity(catalogItem, item)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
  }

  // Calcular similitud entre dos items del catálogo
  calculateSimilarity(item1, item2) {
    let similarity = 0
    
    // Misma categoría (+40)
    if (item1.category === item2.category) similarity += 40
    
    // Misma marca (+20)
    if (item1.brand === item2.brand) similarity += 20
    
    // Precio similar (+20)
    if (item1.price && item2.price) {
      const priceRatio = Math.min(item1.price, item2.price) / Math.max(item1.price, item2.price)
      similarity += priceRatio * 20
    }
    
    // Color compatible (+15)
    const colorCompat = this.calculateColorCompatibility(item1, item2)
    similarity += (colorCompat / 100) * 15
    
    // Misma temporada (+5)
    if (item1.season === item2.season || item1.season === 'all' || item2.season === 'all') {
      similarity += 5
    }
    
    return Math.round(similarity)
  }

  // Filtrar catálogo
  filterCatalog(catalog, filters) {
    return catalog.filter(item => {
      // Filtro por categoría
      if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
        return false
      }
      
      // Filtro por precio
      if (filters.minPrice && item.price < filters.minPrice) return false
      if (filters.maxPrice && item.price > filters.maxPrice) return false
      
      // Filtro por marca
      if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(item.brand)) {
        return false
      }
      
      // Filtro por temporada
      if (filters.season && filters.season !== 'all' && item.season !== filters.season && item.season !== 'all') {
        return false
      }
      
      // Filtro por trending
      if (filters.trending && !item.trending) return false
      
      // Filtro por compatibilidad (requiere userWardrobe)
      if (filters.compatibleWithWardrobe && filters.userWardrobe) {
        const compatibility = this.analyzeCompatibility(item, filters.userWardrobe)
        if (compatibility.overallScore < (filters.minCompatibility || 60)) {
          return false
        }
      }
      
      return true
    })
  }

  // Ordenar catálogo
  sortCatalog(catalog, sortBy = 'relevance', userWardrobe = null) {
    const sorted = [...catalog]
    
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
      
      case 'price_high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
      
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      
      case 'brand':
        return sorted.sort((a, b) => a.brand.localeCompare(b.brand))
      
      case 'trending':
        return sorted.sort((a, b) => {
          if (a.trending && !b.trending) return -1
          if (!a.trending && b.trending) return 1
          return 0
        })
      
      case 'compatibility':
        if (userWardrobe) {
          return sorted.map(item => ({
            ...item,
            _compatibility: this.analyzeCompatibility(item, userWardrobe).overallScore
          })).sort((a, b) => b._compatibility - a._compatibility)
        }
        return sorted
      
      case 'newest':
        return sorted.sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0))
      
      default: // relevance
        return sorted.sort((a, b) => {
          let scoreA = 0, scoreB = 0
          if (a.trending) scoreA += 10
          if (b.trending) scoreB += 10
          if (a.rating) scoreA += a.rating
          if (b.rating) scoreB += b.rating
          return scoreB - scoreA
        })
    }
  }

  // Generar wishlist inteligente
  generateSmartWishlist(userWardrobe, userPreferences = {}, limit = 10) {
    const wishlist = []
    
    // Analizar gaps en el armario
    const gaps = this.analyzeWardrobeGaps(userWardrobe)
    
    // Sugerir items para completar outfits
    gaps.forEach(gap => {
      const suggestions = this.suggestItemsForGap(gap, userPreferences)
      wishlist.push(...suggestions.slice(0, 2)) // Max 2 por gap
    })
    
    // Añadir items trending que sean compatibles
    const trendingCompatible = this.findTrendingCompatibleItems(userWardrobe, userPreferences)
    wishlist.push(...trendingCompatible.slice(0, 3))
    
    // Añadir upgrade suggestions
    const upgrades = this.suggestUpgrades(userWardrobe, userPreferences)
    wishlist.push(...upgrades.slice(0, 2))
    
    // Eliminar duplicados y limitar
    const uniqueWishlist = wishlist.filter((item, index, self) => 
      index === self.findIndex(i => i.id === item.id)
    )
    
    return uniqueWishlist.slice(0, limit).map(item => ({
      ...item,
      reason: item._reason || 'Recomendado para ti',
      priority: item._priority || 'medium'
    }))
  }

  // Analizar gaps en el armario
  analyzeWardrobeGaps(userWardrobe) {
    const categoryCount = {}
    const seasonCount = { spring: 0, summer: 0, fall: 0, winter: 0, all: 0 }
    const colorCount = {}
    
    userWardrobe.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1
      seasonCount[item.season] = (seasonCount[item.season] || 0) + 1
      
      const color = this.extractColorFromBg(item.color)
      colorCount[color] = (colorCount[color] || 0) + 1
    })
    
    const gaps = []
    
    // Essential categories
    const essentials = { tops: 5, bottoms: 3, shoes: 3, accessories: 2 }
    Object.entries(essentials).forEach(([category, minCount]) => {
      if ((categoryCount[category] || 0) < minCount) {
        gaps.push({
          type: 'category',
          category,
          missing: minCount - (categoryCount[category] || 0),
          priority: 'high'
        })
      }
    })
    
    // Seasonal gaps
    Object.entries(seasonCount).forEach(([season, count]) => {
      if (season !== 'all' && count < 2) {
        gaps.push({
          type: 'season',
          season,
          missing: 2 - count,
          priority: 'medium'
        })
      }
    })
    
    // Color variety
    if (Object.keys(colorCount).length < 4) {
      gaps.push({
        type: 'color',
        colors: ['navy', 'white', 'black', 'gray'].filter(color => !colorCount[color]),
        priority: 'low'
      })
    }
    
    return gaps
  }

  // Sugerir items para llenar gaps
  suggestItemsForGap(gap, userPreferences) {
    // En una implementación real, esto consultaría una base de datos de productos
    const suggestions = []
    
    switch (gap.type) {
      case 'category':
        suggestions.push({
          id: `suggestion_${gap.category}_${Date.now()}`,
          name: `${gap.category} básico`,
          category: gap.category,
          price: 25000,
          brand: 'Marca sugerida',
          season: 'all',
          _reason: `Necesitas más ${gap.category}`,
          _priority: gap.priority
        })
        break
      
      case 'season':
        suggestions.push({
          id: `suggestion_${gap.season}_${Date.now()}`,
          name: `Prenda para ${gap.season}`,
          category: 'tops',
          season: gap.season,
          price: 30000,
          brand: 'Marca estacional',
          _reason: `Para completar tu armario de ${gap.season}`,
          _priority: gap.priority
        })
        break
      
      case 'color':
        gap.colors.forEach(color => {
          suggestions.push({
            id: `suggestion_${color}_${Date.now()}`,
            name: `Prenda en ${color}`,
            category: 'tops',
            color: `bg-${color}`,
            price: 20000,
            brand: 'Marca colorida',
            _reason: `Añadir variedad de color`,
            _priority: gap.priority
          })
        })
        break
    }
    
    return suggestions
  }

  // Encontrar items trending compatibles
  findTrendingCompatibleItems(userWardrobe, userPreferences) {
    // Simulación de items trending
    const trendingItems = [
      {
        id: 'trend1',
        name: 'Blazer Oversize',
        category: 'tops',
        price: 65000,
        brand: 'Trend Brand',
        trending: true,
        season: 'all'
      },
      {
        id: 'trend2',
        name: 'Mom Jeans',
        category: 'bottoms',
        price: 45000,
        brand: 'Denim Co',
        trending: true,
        season: 'all'
      }
    ]
    
    return trendingItems
      .map(item => ({
        ...item,
        _compatibility: this.analyzeCompatibility(item, userWardrobe).overallScore,
        _reason: 'Tendencia actual compatible con tu estilo',
        _priority: 'medium'
      }))
      .filter(item => item._compatibility >= 60)
  }

  // Sugerir upgrades para prendas existentes
  suggestUpgrades(userWardrobe, userPreferences) {
    const upgrades = []
    
    // Buscar prendas en mal estado que podrían upgradearse
    const poorConditionItems = userWardrobe.filter(item => item.condition < 60)
    
    poorConditionItems.forEach(item => {
      upgrades.push({
        id: `upgrade_${item.id}`,
        name: `${item.name} (versión mejorada)`,
        category: item.category,
        price: (item.originalPrice || 30000) * 1.5,
        brand: 'Premium Brand',
        season: item.season,
        _reason: `Upgrade para reemplazar ${item.name}`,
        _priority: 'low',
        _replacesId: item.id
      })
    })
    
    return upgrades.slice(0, 3)
  }

  // Calcular ROI de una compra
  calculatePurchaseROI(catalogItem, userWardrobe, estimatedUses = 10) {
    const compatibility = this.analyzeCompatibility(catalogItem, userWardrobe)
    const costPerUse = catalogItem.price / estimatedUses
    
    // Factor de versatilidad (cuántos outfits puede crear)
    const versatilityScore = compatibility.compatibleItems.length * 10
    
    // Score de inversión
    let investmentScore = 0
    
    if (costPerUse < 2000) investmentScore += 30 // Muy económico por uso
    else if (costPerUse < 5000) investmentScore += 20
    else if (costPerUse < 10000) investmentScore += 10
    
    investmentScore += Math.min(50, versatilityScore) // Max 50 points for versatility
    investmentScore += Math.min(20, compatibility.overallScore / 5) // Max 20 points for compatibility
    
    return {
      score: Math.round(investmentScore),
      costPerUse,
      estimatedUses,
      versatility: versatilityScore / 10,
      recommendation: investmentScore >= 70 ? 'excellent' : 
                     investmentScore >= 50 ? 'good' : 
                     investmentScore >= 30 ? 'fair' : 'poor'
    }
  }

  // Generar comparación entre múltiples items
  compareItems(items, userWardrobe = null) {
    const comparison = {
      items: items.map(item => ({
        ...item,
        _analysis: userWardrobe ? this.analyzeCompatibility(item, userWardrobe) : null,
        _roi: userWardrobe ? this.calculatePurchaseROI(item, userWardrobe) : null
      })),
      winner: null,
      summary: {}
    }
    
    if (userWardrobe) {
      // Determinar ganador basado en compatibilidad y ROI
      const scores = comparison.items.map(item => {
        const compatScore = item._analysis?.overallScore || 0
        const roiScore = item._roi?.score || 0
        return (compatScore * 0.6 + roiScore * 0.4)
      })
      
      const winnerIndex = scores.indexOf(Math.max(...scores))
      comparison.winner = comparison.items[winnerIndex]
      
      // Resumen de comparación
      comparison.summary = {
        priceRange: {
          min: Math.min(...items.map(i => i.price)),
          max: Math.max(...items.map(i => i.price))
        },
        avgCompatibility: Math.round(
          comparison.items.reduce((sum, item) => sum + (item._analysis?.overallScore || 0), 0) / items.length
        ),
        mostVersatile: comparison.items.reduce((most, current) => 
          (current._analysis?.compatibleItems.length || 0) > (most._analysis?.compatibleItems.length || 0) ? 
          current : most
        )
      }
    }
    
    return comparison
  }
}