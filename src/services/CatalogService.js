// CatalogService.js - Servicio para el catálogo y prueba virtual de ropa

export class CatalogService {
  constructor() {
    this.combinationRules = {
      // Reglas de colores que combinan bien
      colorCombinations: {
        'Negro': ['Blanco', 'Gris', 'Beige', 'Azul Marino', 'Rojo', 'Rosa', 'Amarillo'],
        'Blanco': ['Negro', 'Azul', 'Rojo', 'Verde', 'Rosa', 'Amarillo', 'Púrpura'],
        'Azul': ['Blanco', 'Beige', 'Gris', 'Amarillo', 'Rosa Claro'],
        'Beige': ['Negro', 'Blanco', 'Marrón', 'Azul Marino', 'Verde'],
        'Gris': ['Negro', 'Blanco', 'Azul', 'Rosa', 'Amarillo'],
        'Marrón': ['Beige', 'Crema', 'Verde', 'Azul Marino'],
        'Rojo': ['Negro', 'Blanco', 'Gris', 'Azul Marino'],
        'Rosa': ['Negro', 'Blanco', 'Gris', 'Azul'],
        'Verde': ['Beige', 'Marrón', 'Blanco', 'Gris'],
        'Amarillo': ['Negro', 'Blanco', 'Gris', 'Azul Marino']
      },

      // Reglas de estilos que combinan
      styleCombinations: {
        'casual': ['deportivo', 'casual', 'street'],
        'formal': ['elegante', 'profesional', 'clásico'],
        'deportivo': ['casual', 'athleisure', 'street'],
        'elegante': ['formal', 'sofisticado', 'clásico'],
        'bohemio': ['casual', 'artístico', 'vintage'],
        'vintage': ['retro', 'clásico', 'bohemio'],
        'street': ['urbano', 'casual', 'deportivo']
      },

      // Reglas de ocasiones
      occasionRules: {
        'trabajo': ['formal', 'profesional', 'elegante'],
        'casual': ['casual', 'cómodo', 'relajado'],
        'fiesta': ['elegante', 'glamoroso', 'sofisticado'],
        'deportes': ['deportivo', 'cómodo', 'funcional'],
        'cita': ['elegante', 'atractivo', 'sofisticado'],
        'viaje': ['cómodo', 'versátil', 'práctico']
      }
    }
  }

  // Analizar compatibilidad de colores
  analyzeColorCompatibility(item1, item2) {
    const color1 = this.extractMainColor(item1.colors[0])
    const color2 = this.extractMainColor(item2.color)
    
    const compatibility = this.combinationRules.colorCombinations[color1]?.includes(color2) || 
                         this.combinationRules.colorCombinations[color2]?.includes(color1)
    
    return {
      compatible: compatibility,
      score: compatibility ? 85 + Math.random() * 15 : 30 + Math.random() * 40,
      reason: compatibility ? 
        `${color1} y ${color2} crean una combinación armoniosa` :
        `${color1} y ${color2} pueden generar un contraste muy fuerte`
    }
  }

  // Analizar compatibilidad de estilos
  analyzeStyleCompatibility(item1, item2) {
    const style1 = this.inferStyle(item1)
    const style2 = this.inferStyle(item2)
    
    const compatibility = this.combinationRules.styleCombinations[style1]?.includes(style2) ||
                         this.combinationRules.styleCombinations[style2]?.includes(style1)
    
    return {
      compatible: compatibility,
      score: compatibility ? 80 + Math.random() * 20 : 25 + Math.random() * 45,
      reason: compatibility ?
        `Los estilos ${style1} y ${style2} se complementan perfectamente` :
        `Los estilos ${style1} y ${style2} pueden chocar entre sí`
    }
  }

  // Analizar compatibilidad de temporada
  analyzeSeasonCompatibility(item1, item2) {
    const seasonCompatible = item1.season === item2.season || 
                           item1.season === 'all' || 
                           item2.season === 'all' ||
                           this.areAdjacentSeasons(item1.season, item2.season)
    
    return {
      compatible: seasonCompatible,
      score: seasonCompatible ? 90 + Math.random() * 10 : 20 + Math.random() * 30,
      reason: seasonCompatible ?
        'Perfectas para la misma temporada' :
        'Pueden no ser apropiadas para la misma época del año'
    }
  }

  // Crear outfit virtual completo
  createVirtualOutfit(selectedItems, userWardrobe) {
    if (selectedItems.length === 0) return null

    const outfit = {
      items: [...selectedItems],
      analysis: this.analyzeOutfitCombination(selectedItems),
      suggestions: this.generateSuggestions(selectedItems, userWardrobe),
      totalPrice: selectedItems.reduce((sum, item) => sum + item.price, 0),
      compatibility: this.calculateOverallCompatibility(selectedItems)
    }

    return outfit
  }

  // Analizar combinación completa del outfit
  analyzeOutfitCombination(items) {
    if (items.length < 2) {
      return {
        overall: 'incomplete',
        score: 0,
        feedback: 'Agrega más prendas para ver el análisis de combinación'
      }
    }

    const analyses = []
    
    // Analizar cada par de items
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const colorAnalysis = this.analyzeColorCompatibility(items[i], items[j])
        const styleAnalysis = this.analyzeStyleCompatibility(items[i], items[j])
        const seasonAnalysis = this.analyzeSeasonCompatibility(items[i], items[j])
        
        analyses.push({
          items: [items[i].name, items[j].name],
          color: colorAnalysis,
          style: styleAnalysis,
          season: seasonAnalysis,
          avgScore: (colorAnalysis.score + styleAnalysis.score + seasonAnalysis.score) / 3
        })
      }
    }

    const avgScore = analyses.reduce((sum, analysis) => sum + analysis.avgScore, 0) / analyses.length
    
    return {
      overall: avgScore >= 70 ? 'excellent' : avgScore >= 50 ? 'good' : avgScore >= 30 ? 'fair' : 'poor',
      score: Math.round(avgScore),
      feedback: this.generateFeedback(avgScore, analyses),
      details: analyses
    }
  }

  // Generar sugerencias para mejorar el outfit
  generateSuggestions(selectedItems, userWardrobe) {
    const suggestions = []
    const categories = ['tops', 'bottoms', 'shoes', 'accessories']
    const selectedCategories = selectedItems.map(item => item.category)
    
    // Sugerir categorías faltantes
    categories.forEach(category => {
      if (!selectedCategories.includes(category)) {
        const matchingItems = userWardrobe.filter(item => 
          item.category === category && 
          this.wouldImproveOutfit(item, selectedItems)
        )
        
        if (matchingItems.length > 0) {
          suggestions.push({
            type: 'add_from_wardrobe',
            category: category,
            items: matchingItems.slice(0, 3),
            reason: `Agregar ${category} de tu armario completaría el look`
          })
        } else {
          suggestions.push({
            type: 'missing_category',
            category: category,
            reason: `Considera agregar ${category} para completar el outfit`
          })
        }
      }
    })

    // Sugerir reemplazos para mejorar compatibilidad
    selectedItems.forEach((item, index) => {
      const alternatives = userWardrobe.filter(wardrobeItem =>
        wardrobeItem.category === item.category &&
        wardrobeItem.id !== item.id &&
        this.calculateItemCompatibility(wardrobeItem, selectedItems.filter((_, i) => i !== index)) > 
        this.calculateItemCompatibility(item, selectedItems.filter((_, i) => i !== index))
      )

      if (alternatives.length > 0) {
        suggestions.push({
          type: 'better_alternative',
          original: item,
          alternatives: alternatives.slice(0, 2),
          reason: `Tienes mejores opciones en tu armario para este tipo de prenda`
        })
      }
    })

    return suggestions
  }

  // Calcular compatibilidad general
  calculateOverallCompatibility(items) {
    if (items.length < 2) return 0
    
    let totalScore = 0
    let comparisons = 0
    
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const colorComp = this.analyzeColorCompatibility(items[i], items[j])
        const styleComp = this.analyzeStyleCompatibility(items[i], items[j])
        const seasonComp = this.analyzeSeasonCompatibility(items[i], items[j])
        
        totalScore += (colorComp.score + styleComp.score + seasonComp.score) / 3
        comparisons++
      }
    }
    
    return Math.round(totalScore / comparisons)
  }

  // Funciones auxiliares
  extractMainColor(colorString) {
    // Extraer el color principal de strings como "Azul Claro", "Negro", etc.
    const colorMap = {
      'azul': 'Azul', 'blue': 'Azul',
      'negro': 'Negro', 'black': 'Negro',
      'blanco': 'Blanco', 'white': 'Blanco',
      'gris': 'Gris', 'gray': 'Gris', 'grey': 'Gris',
      'rojo': 'Rojo', 'red': 'Rojo',
      'verde': 'Verde', 'green': 'Verde',
      'amarillo': 'Amarillo', 'yellow': 'Amarillo',
      'rosa': 'Rosa', 'pink': 'Rosa',
      'marrón': 'Marrón', 'brown': 'Marrón',
      'beige': 'Beige', 'cream': 'Beige'
    }
    
    const lowerColor = colorString.toLowerCase()
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerColor.includes(key)) {
        return value
      }
    }
    
    return colorString // Retornar original si no se encuentra mapeo
  }

  inferStyle(item) {
    const name = item.name.toLowerCase()
    const brand = item.brand.toLowerCase()
    
    if (name.includes('blazer') || name.includes('formal')) return 'formal'
    if (name.includes('deportivo') || name.includes('sport')) return 'deportivo'
    if (name.includes('casual') || name.includes('jeans')) return 'casual'
    if (name.includes('elegante') || brand.includes('massimo')) return 'elegante'
    if (name.includes('vintage') || name.includes('retro')) return 'vintage'
    if (name.includes('boho') || name.includes('bohemio')) return 'bohemio'
    
    return 'casual' // Default
  }

  areAdjacentSeasons(season1, season2) {
    const seasonOrder = ['spring', 'summer', 'fall', 'winter']
    const index1 = seasonOrder.indexOf(season1)
    const index2 = seasonOrder.indexOf(season2)
    
    if (index1 === -1 || index2 === -1) return false
    
    return Math.abs(index1 - index2) === 1 || 
           (index1 === 0 && index2 === 3) || 
           (index1 === 3 && index2 === 0)
  }

  generateFeedback(score, analyses) {
    if (score >= 80) {
      return "¡Excelente combinación! Este outfit se ve increíble y está perfectamente coordinado."
    } else if (score >= 65) {
      return "¡Muy buena combinación! Las prendas se complementan bien entre sí."
    } else if (score >= 50) {
      return "Combinación decente. Algunas prendas combinan mejor que otras."
    } else if (score >= 35) {
      return "La combinación necesita ajustes. Considera cambiar algunas prendas."
    } else {
      return "Esta combinación puede mejorarse significativamente. Te sugerimos probar otras opciones."
    }
  }

  wouldImproveOutfit(newItem, currentItems) {
    if (currentItems.length === 0) return true
    
    const currentCompatibility = this.calculateOverallCompatibility(currentItems)
    const newCompatibility = this.calculateOverallCompatibility([...currentItems, newItem])
    
    return newCompatibility > currentCompatibility
  }

  calculateItemCompatibility(item, otherItems) {
    if (otherItems.length === 0) return 50
    
    let totalScore = 0
    otherItems.forEach(otherItem => {
      const colorComp = this.analyzeColorCompatibility(item, otherItem)
      const styleComp = this.analyzeStyleCompatibility(item, otherItem)
      const seasonComp = this.analyzeSeasonCompatibility(item, otherItem)
      
      totalScore += (colorComp.score + styleComp.score + seasonComp.score) / 3
    })
    
    return totalScore / otherItems.length
  }

  // Obtener recomendaciones de outfits completos
  getOutfitRecommendations(selectedItem, catalogItems, userWardrobe) {
    const recommendations = []
    const allItems = [...catalogItems, ...userWardrobe]
    
    // Filtrar items de diferentes categorías
    const complementaryItems = allItems.filter(item => 
      item.category !== selectedItem.category && 
      item.id !== selectedItem.id
    )

    // Crear combinaciones de 3-4 prendas
    const outfitCombinations = this.generateOutfitCombinations(selectedItem, complementaryItems)
    
    // Evaluar y ordenar por compatibilidad
    outfitCombinations.forEach(combination => {
      const analysis = this.analyzeOutfitCombination(combination)
      if (analysis.score > 60) {
        recommendations.push({
          items: combination,
          score: analysis.score,
          analysis: analysis
        })
      }
    })

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Top 5 recomendaciones
  }

  generateOutfitCombinations(baseItem, availableItems) {
    const combinations = []
    const maxCombinations = 20 // Limitar para performance
    
    // Generar combinaciones de 2-3 items adicionales
    for (let i = 0; i < availableItems.length && combinations.length < maxCombinations; i++) {
      for (let j = i + 1; j < availableItems.length && combinations.length < maxCombinations; j++) {
        combinations.push([baseItem, availableItems[i], availableItems[j]])
        
        // Agregar cuarto item si hay una buena categoría faltante
        for (let k = j + 1; k < availableItems.length && combinations.length < maxCombinations; k++) {
          const categories = [baseItem, availableItems[i], availableItems[j], availableItems[k]]
            .map(item => item.category)
          const uniqueCategories = new Set(categories)
          
          if (uniqueCategories.size === 4) { // Outfit completo
            combinations.push([baseItem, availableItems[i], availableItems[j], availableItems[k]])
          }
        }
      }
    }
    
    return combinations
  }
}