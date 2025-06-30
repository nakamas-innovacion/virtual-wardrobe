// src/hooks/useGamification.js
import { useState, useEffect, useCallback } from 'react'
import { GamificationService } from '../services/GamificationService'

export function useGamification(initialUserData, clothingItems) {
  const [userData, setUserData] = useState(initialUserData)
  const [achievements, setAchievements] = useState([])
  const [levelProgress, setLevelProgress] = useState({ progressPercentage: 0 })
  
  const gamificationService = new GamificationService()

  // Calcular progreso y logros cuando cambien los datos
  useEffect(() => {
    const userStats = gamificationService.calculateUserStats(userData, clothingItems)
    const allAchievements = gamificationService.getAchievements()
    
    const achievementsWithProgress = allAchievements.map(achievement => ({
      ...achievement,
      progress: gamificationService.calculateAchievementProgress(
        achievement.id, 
        userStats, 
        clothingItems
      ),
      completed: gamificationService.calculateAchievementProgress(
        achievement.id, 
        userStats, 
        clothingItems
      ) >= achievement.maxProgress
    }))
    
    setAchievements(achievementsWithProgress)
    
    const progress = gamificationService.calculateLevelProgress(userData.points)
    setLevelProgress(progress)
  }, [userData, clothingItems])

  const addPoints = useCallback((points, reason = '') => {
    const newPoints = userData.points + points
    const newLevel = gamificationService.checkLevelUp(userData.points, newPoints)
    
    setUserData(prev => ({
      ...prev,
      points: newPoints,
      level: newLevel || prev.level
    }))

    return {
      pointsAdded: points,
      newLevel: newLevel,
      totalPoints: newPoints,
      reason
    }
  }, [userData.points])

  const updateStreak = useCallback((date = new Date().toISOString().split('T')[0]) => {
    const streakUpdate = gamificationService.updateStreak(userData.lastActiveDate, date)
    
    let newStreak = userData.streak
    
    switch (streakUpdate) {
      case 'continue':
        newStreak = userData.streak + 1
        break
      case 'reset':
        newStreak = 1
        break
      // 'same' no cambia nada
    }
    
    setUserData(prev => ({
      ...prev,
      streak: newStreak,
      lastActiveDate: date
    }))

    return {
      action: streakUpdate,
      newStreak,
      bonus: streakUpdate === 'continue' ? gamificationService.streakBonus : 0
    }
  }, [userData.streak, userData.lastActiveDate])

  const completeAchievement = useCallback((achievementId) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, completed: true, completedAt: new Date().toISOString() }
        : achievement
    ))
    
    const bonusPoints = 100 // Puntos por completar logro
    return addPoints(bonusPoints, `Logro completado: ${achievementId}`)
  }, [addPoints])

  return {
    userData,
    setUserData,
    achievements,
    levelProgress,
    addPoints,
    updateStreak,
    completeAchievement,
    gamificationService
  }
}