// src/hooks/useWardrobe.js
import { useState, useCallback, useMemo } from 'react'
import { WardrobeService } from '../services/WardrobeService'

export function useWardrobe(initialItems = []) {
  const [items, setItems] = useState(initialItems)
  const [filters, setFilters] = useState({
    category: 'all',
    condition: 0,
    season: 'all',
    sortBy: 'condition'
  })
  const [searchQuery, setSearchQuery] = useState('')
  
  const wardrobeService = new WardrobeService()

  // Items filtrados y ordenados
  const filteredItems = useMemo(() => {
    let filtered = items

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      filtered = wardrobeService.searchItems(filtered, searchQuery)
    }

    // Aplicar filtros
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    if (filters.condition > 0) {
      filtered = wardrobeService.filterByCondition(filtered, filters.condition)
    }

    if (filters.season !== 'all') {
      filtered = filtered.filter(item => 
        item.season === filters.season || item.season === 'all'
      )
    }

    // Aplicar ordenamiento
    return wardrobeService.sortItems(filtered, filters.sortBy)
  }, [items, filters, searchQuery])

  // Estadísticas del armario
  const wardrobeStats = useMemo(() => {
    return wardrobeService.getWardrobeStats(items)
  }, [items])

  // Items que necesitan cuidado
  const itemsNeedingCare = useMemo(() => {
    return wardrobeService.getItemsNeedingCare(items)
  }, [items])

  const addItem = useCallback((itemData) => {
    try {
      const newItem = wardrobeService.createNewItem(itemData)
      setItems(prev => [...prev, newItem])
      return { success: true, item: newItem }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [])

  const updateItem = useCallback((itemId, updates) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ))
  }, [])

  const removeItem = useCallback((itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }, [])

  const applyWear = useCallback((itemId, weatherConditions = 'normal') => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? wardrobeService.applyWear(item, weatherConditions)
        : item
    ))
  }, [])

  const restoreItem = useCallback((itemId, restorationType = 'basic') => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? wardrobeService.restoreItem(item, restorationType)
        : item
    ))
  }, [])

  return {
    items: filteredItems,
    allItems: items,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    wardrobeStats,
    itemsNeedingCare,
    addItem,
    updateItem,
    removeItem,
    applyWear,
    restoreItem,
    wardrobeService
  }
}