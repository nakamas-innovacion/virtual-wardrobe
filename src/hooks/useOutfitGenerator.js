// src/hooks/useOutfitGenerator.js
import { useState, useCallback } from 'react'
import { OutfitAI } from '../services/OutfitAI'

export function useOutfitGenerator(clothingItems, weatherData) {
  const [currentOutfit, setCurrentOutfit] = useState(null)
  const [outfitHistory, setOutfitHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const generateOutfit = useCallback(async (preferences = {}) => {
    if (!clothingItems || clothingItems.length === 0) {
      return null
    }

    try {
      setLoading(true)
      
      // Simular tiempo de procesamiento de IA
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const outfit = OutfitAI.generateOutfit(clothingItems, weatherData, preferences)
      
      setCurrentOutfit(outfit)
      setOutfitHistory(prev => [outfit, ...prev.slice(0, 9)]) // Mantener últimos 10
      
      return outfit
    } catch (error) {
      console.error('Error generando outfit:', error)
      return null
    } finally {
      setLoading(false)
    }
  }, [clothingItems, weatherData])

  const generateMultipleOptions = useCallback(async (count = 3) => {
    if (!clothingItems || clothingItems.length === 0) {
      return []
    }

    try {
      setLoading(true)
      const options = []
      
      for (let i = 0; i < count; i++) {
        const outfit = OutfitAI.generateOutfit(clothingItems, weatherData)
        options.push(outfit)
        // Pequeña pausa entre generaciones para variedad
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      return options
    } catch (error) {
      console.error('Error generando múltiples opciones:', error)
      return []
    } finally {
      setLoading(false)
    }
  }, [clothingItems, weatherData])

  const regenerateOutfit = useCallback(() => {
    return generateOutfit()
  }, [generateOutfit])

  return {
    currentOutfit,
    outfitHistory,
    loading,
    generateOutfit,
    generateMultipleOptions,
    regenerateOutfit
  }
}
