import { achievementsData } from "../data/initialData"

// src/services/GamificationService.js
export class GamificationService {
  constructor() {
    this.pointsPerOutfit = 10
    this.pointsPerItem = 5
    this.pointsPerLevel = 1000
    this.streakBonus = 5
  }

  // Calcular puntos por usar un outfit
  calculateOutfitPoints(outfit, isConsecutiveDay = false) {
    const basePoints = this.pointsPerOutfit + (outfit.items.length * this.pointsPerItem)
    const streakBonus = isConsecutiveDay ? this.streakBonus : 0
    return basePoints + streakBonus
  }

  // Calcular nivel basado en puntos totales
  calculateLevel(totalPoints) {
    return Math.floor(totalPoints / this.pointsPerLevel) + 1
  }

  // Calcular progreso hacia el siguiente nivel
  calculateLevelProgress(totalPoints) {
    const currentLevelPoints = totalPoints % this.pointsPerLevel
    const progressPercentage = (currentLevelPoints / this.pointsPerLevel) * 100
    return {
      currentLevelPoints,
      nextLevelPoints: this.pointsPerLevel,
      progressPercentage,
      pointsToNextLevel: this.pointsPerLevel - currentLevelPoints
    }
  }

  // Verificar si el usuario subió de nivel
  checkLevelUp(oldPoints, newPoints) {
    const oldLevel = this.calculateLevel(oldPoints)
    const newLevel = this.calculateLevel(newPoints)
    return newLevel > oldLevel ? newLevel : null
  }

  // Definición de logros
  getAchievements() {
    return achievementsData.map(achievement => ({
      ...achievement,
      maxProgress: achievement.maxProgress || 100 // Valor por defecto si no se especifica
    }))
  }

  // Calcular progreso de logros
  calculateAchievementProgress(achievementId, userStats, clothingItems) {
    switch (achievementId) {
      case 'fashionista':
        return Math.min(userStats.outfitsUsed || 0, 50)
      
      case 'eco_friendly': {
        const totalWears = clothingItems.reduce((sum, item) => sum + (item.timesWorn || 0), 0)
        return Math.min(totalWears, 100)
      }
      
      case 'trendsetter':
        return Math.min(userStats.level || 1, 10)
      
      case 'wardrobe_keeper': {
        if (clothingItems.length === 0) return 0
        const goodConditionItems = clothingItems.filter(item => item.condition >= 80).length
        return Math.round((goodConditionItems / clothingItems.length) * 100)
      }
      
      case 'streak_master':
        return Math.min(userStats.streak || 0, 30)
      
      case 'color_coordinator':
        return Math.min(userStats.coordinatedOutfits || 0, 25)
      
      case 'seasonal_expert':
        return Math.min(userStats.seasonalOutfits || 0, 4)
      
      default:
        return 0
    }
  }

  // Verificar logros completados
  checkCompletedAchievements(userStats, clothingItems) {
    const achievements = this.getAchievements()
    const completed = []

    achievements.forEach(achievement => {
      const progress = this.calculateAchievementProgress(achievement.id, userStats, clothingItems)
      if (progress >= achievement.maxProgress) {
        completed.push({
          ...achievement,
          completedAt: new Date().toISOString()
        })
      }
    })

    return completed
  }

  // Calcular puntos bonus por logros
  calculateAchievementBonus(completedAchievements) {
    return completedAchievements.length * 100 // 100 puntos por logro completado
  }

  // Evaluar racha diaria
  updateStreak(lastActiveDate, currentDate) {
    if (!lastActiveDate) return 1

    const lastDate = new Date(lastActiveDate)
    const today = new Date(currentDate)
    
    // Resetear horas para comparar solo fechas
    lastDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    
    const diffTime = today.getTime() - lastDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // Día consecutivo
      return 'continue'
    } else if (diffDays === 0) {
      // Mismo día
      return 'same'
    } else {
      // Se rompió la racha
      return 'reset'
    }
  }

  // Calcular estadísticas de usuario
  calculateUserStats(userData, clothingItems) {
    const totalWears = clothingItems.reduce((sum, item) => sum + (item.timesWorn || 0), 0)
    const averageCondition = clothingItems.length > 0 
      ? Math.round(clothingItems.reduce((sum, item) => sum + item.condition, 0) / clothingItems.length)
      : 100

    return {
      level: userData.level || 1,
      points: userData.points || 0,
      streak: userData.streak || 0,
      outfitsUsed: userData.outfitsUsed || 0,
      totalWears,
      averageCondition,
      clothingCount: clothingItems.length,
      coordinatedOutfits: userData.coordinatedOutfits || 0,
      seasonalOutfits: userData.seasonalOutfits || 0
    }
  }

  // Generar recomendaciones de mejora
  generateRecommendations(userStats, clothingItems) {
    const recommendations = []

    // Recomendaciones basadas en condición del armario
    const poorConditionItems = clothingItems.filter(item => item.condition < 70)
    if (poorConditionItems.length > 0) {
      recommendations.push({
        type: 'care',
        title: 'Cuida tu armario',
        description: `${poorConditionItems.length} prendas necesitan atención`,
        action: 'Revisa las prendas en mal estado',
        priority: 'high'
      })
    }

    // Recomendaciones basadas en uso
    const underusedItems = clothingItems.filter(item => item.timesWorn < 5)
    if (underusedItems.length > clothingItems.length * 0.3) {
      recommendations.push({
        type: 'usage',
        title: 'Diversifica tu estilo',
        description: 'Tienes prendas que podrías usar más',
        action: 'Prueba nuevas combinaciones',
        priority: 'medium'
      })
    }

    // Recomendaciones basadas en racha
    if (userStats.streak < 7) {
      recommendations.push({
        type: 'streak',
        title: 'Mantén tu racha',
        description: 'Usa la app diariamente para ganar más puntos',
        action: 'Planifica outfits para la semana',
        priority: 'low'
      })
    }

    return recommendations
  }
}
