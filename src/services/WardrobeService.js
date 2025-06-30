// src/services/WardrobeService.js
export class WardrobeService {
  constructor() {
    this.wearRates = {
      tops: { min: 1, max: 3 },
      bottoms: { min: 1.5, max: 4 },
      shoes: { min: 2, max: 5 },
      accessories: { min: 0.5, max: 2 }
    }
  }

  // Aplicar desgaste a una prenda
  applyWear(item, weatherConditions = 'normal') {
    const category = item.category || 'tops'
    const wearRate = this.wearRates[category] || this.wearRates.tops
    
    // Factor de desgaste basado en condiciones
    let weatherMultiplier = 1
    switch (weatherConditions) {
      case 'rainy':
        weatherMultiplier = 1.5
        break
      case 'sunny':
        weatherMultiplier = 1.2
        break
      case 'cold':
        weatherMultiplier = 0.8
        break
      default:
        weatherMultiplier = 1
    }

    // Calcular desgaste
    const baseWear = Math.random() * (wearRate.max - wearRate.min) + wearRate.min
    const totalWear = baseWear * weatherMultiplier
    
    // Aplicar desgaste considerando la calidad actual
    const conditionFactor = item.condition / 100 // Prendas en peor estado se desgastan más rápido
    const finalWear = totalWear * (2 - conditionFactor)

    return {
      ...item,
      condition: Math.max(0, Math.round(item.condition - finalWear)),
      timesWorn: (item.timesWorn || 0) + 1,
      lastWorn: new Date().toISOString().split('T')[0]
    }
  }

  // Aplicar desgaste a múltiples prendas (outfit completo)
  applyOutfitWear(items, weatherConditions = 'normal') {
    return items.map(item => this.applyWear(item, weatherConditions))
  }

  // Obtener estado de condición de una prenda
  getConditionStatus(condition) {
    if (condition >= 80) {
      return {
        status: 'excellent',
        label: 'Excelente',
        color: 'text-green-600 bg-green-100',
        icon: '✨'
      }
    } else if (condition >= 60) {
      return {
        status: 'good',
        label: 'Bueno',
        color: 'text-yellow-600 bg-yellow-100',
        icon: '👍'
      }
    } else if (condition >= 40) {
      return {
        status: 'fair',
        label: 'Regular',
        color: 'text-orange-600 bg-orange-100',
        icon: '⚠️'
      }
    } else {
      return {
        status: 'poor',
        label: 'Necesita cuidado',
        color: 'text-red-600 bg-red-100',
        icon: '🆘'
      }
    }
  }

  // Filtrar prendas por condición
  filterByCondition(items, minCondition = 0) {
    return items.filter(item => item.condition >= minCondition)
  }

  // Obtener prendas que necesitan cuidado
  getItemsNeedingCare(items, threshold = 70) {
    return items.filter(item => item.condition < threshold)
  }

  // Obtener estadísticas del armario
  getWardrobeStats(items) {
    if (items.length === 0) {
      return {
        total: 0,
        averageCondition: 100,
        totalWears: 0,
        needsCare: 0,
        byCategory: {},
        byCondition: {
          excellent: 0,
          good: 0,
          fair: 0,
          poor: 0
        }
      }
    }

    const totalWears = items.reduce((sum, item) => sum + (item.timesWorn || 0), 0)
    const averageCondition = Math.round(
      items.reduce((sum, item) => sum + item.condition, 0) / items.length
    )
    const needsCare = items.filter(item => item.condition < 70).length

    // Estadísticas por categoría
    const byCategory = items.reduce((acc, item) => {
      const category = item.category || 'other'
      if (!acc[category]) {
        acc[category] = { count: 0, averageCondition: 0, totalWears: 0 }
      }
      acc[category].count++
      acc[category].totalWears += item.timesWorn || 0
      return acc
    }, {})

    // Calcular condición promedio por categoría
    Object.keys(byCategory).forEach(category => {
      const categoryItems = items.filter(item => (item.category || 'other') === category)
      byCategory[category].averageCondition = Math.round(
        categoryItems.reduce((sum, item) => sum + item.condition, 0) / categoryItems.length
      )
    })

    // Estadísticas por condición
    const byCondition = items.reduce((acc, item) => {
      const status = this.getConditionStatus(item.condition).status
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, { excellent: 0, good: 0, fair: 0, poor: 0 })

    return {
      total: items.length,
      averageCondition,
      totalWears,
      needsCare,
      byCategory,
      byCondition
    }
  }

  // Sugerir mantenimiento para prendas
  suggestMaintenance(item) {
    const condition = item.condition
    const category = item.category
    const timesWorn = item.timesWorn || 0

    const suggestions = []

    if (condition < 40) {
      suggestions.push({
        type: 'urgent',
        action: 'Reparación profesional recomendada',
        description: 'Esta prenda necesita atención inmediata'
      })
    } else if (condition < 70) {
      switch (category) {
        case 'shoes':
          suggestions.push({
            type: 'care',
            action: 'Limpieza y cuidado del calzado',
            description: 'Usa productos específicos para el material'
          })
          break
        case 'tops':
        case 'bottoms':
          suggestions.push({
            type: 'care',
            action: 'Lavado cuidadoso',
            description: 'Usa programa delicado y detergente suave'
          })
          break
        default:
          suggestions.push({
            type: 'care',
            action: 'Cuidado general',
            description: 'Revisa las instrucciones de cuidado'
          })
      }
    }

    if (timesWorn > 30 && condition > 70) {
      suggestions.push({
        type: 'preventive',
        action: 'Mantenimiento preventivo',
        description: 'Considera un cuidado especial para mantener la calidad'
      })
    }

    return suggestions
  }

  // Simular restauración de prenda
  restoreItem(item, restorationType = 'basic') {
    const restorationEffects = {
      basic: { conditionBoost: 10, cost: 5000 },
      professional: { conditionBoost: 25, cost: 15000 },
      premium: { conditionBoost: 40, cost: 30000 }
    }

    const effect = restorationEffects[restorationType]
    const newCondition = Math.min(100, item.condition + effect.conditionBoost)

    return {
      ...item,
      condition: newCondition,
      lastMaintenance: new Date().toISOString().split('T')[0]
    }
  }

  // Ordenar prendas por diferentes criterios
  sortItems(items, criteria = 'condition') {
    switch (criteria) {
      case 'condition':
        return [...items].sort((a, b) => a.condition - b.condition)
      case 'timesWorn':
        return [...items].sort((a, b) => (b.timesWorn || 0) - (a.timesWorn || 0))
      case 'lastWorn':
        return [...items].sort((a, b) => {
          if (!a.lastWorn) return 1
          if (!b.lastWorn) return -1
          return new Date(b.lastWorn) - new Date(a.lastWorn)
        })
      case 'name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name))
      case 'category':
        return [...items].sort((a, b) => (a.category || '').localeCompare(b.category || ''))
      default:
        return items
    }
  }

  // Buscar prendas
  searchItems(items, query) {
    const searchTerm = query.toLowerCase().trim()
    if (!searchTerm) return items

    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.season.toLowerCase().includes(searchTerm)
    )
  }

  // Validar nueva prenda
  validateNewItem(itemData) {
    const errors = []

    if (!itemData.name || itemData.name.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres')
    }

    if (!itemData.category) {
      errors.push('Debes seleccionar una categoría')
    }

    if (!itemData.season) {
      errors.push('Debes seleccionar una temporada')
    }

    const validCategories = ['tops', 'bottoms', 'shoes', 'accessories']
    if (itemData.category && !validCategories.includes(itemData.category)) {
      errors.push('Categoría no válida')
    }

    const validSeasons = ['spring', 'summer', 'fall', 'winter', 'all']
    if (itemData.season && !validSeasons.includes(itemData.season)) {
      errors.push('Temporada no válida')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Crear nueva prenda con valores por defecto
  createNewItem(itemData) {
    const validation = this.validateNewItem(itemData)
    if (!validation.isValid) {
      throw new Error(`Datos inválidos: ${validation.errors.join(', ')}`)
    }

    return {
      id: Date.now() + Math.random(), // ID único temporal
      name: itemData.name.trim(),
      category: itemData.category,
      brand: itemData.brand || 'Sin marca',
      color: itemData.color || 'bg-gray-300',
      season: itemData.season,
      condition: 100,
      timesWorn: 0,
      lastWorn: null,
      createdAt: new Date().toISOString(),
      image: itemData.image || 'https://via.placeholder.com/300x300?text=Nueva+Prenda'
    }
  }
}