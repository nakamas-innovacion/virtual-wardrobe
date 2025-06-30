// src/services/PlannerService.js
export class PlannerService {
  constructor() {
    this.weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    this.monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
  }

  // Obtener fechas de la semana actual
  getCurrentWeekDates(startDate = new Date()) {
    const dates = []
    const currentDate = new Date(startDate)
    
    // Obtener el lunes de la semana
    const dayOfWeek = currentDate.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(currentDate)
    monday.setDate(currentDate.getDate() + mondayOffset)
    
    // Generar las 7 fechas de la semana
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName: this.weekDays[i],
        dayNumber: date.getDate(),
        isToday: this.isSameDay(date, new Date()),
        isPast: date < new Date() && !this.isSameDay(date, new Date())
      })
    }
    
    return dates
  }

  // Obtener fechas del mes actual
  getCurrentMonthDates(year = new Date().getFullYear(), month = new Date().getMonth()) {
    const dates = []
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    // Obtener el primer lunes del calendario (puede ser del mes anterior)
    const startDate = new Date(firstDay)
    const firstDayOfWeek = firstDay.getDay()
    const mondayOffset = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek
    startDate.setDate(firstDay.getDate() + mondayOffset)
    
    // Generar todas las fechas del calendario (6 semanas = 42 días)
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      dates.push({
        date: date.toISOString().split('T')[0],
        dayNumber: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: this.isSameDay(date, new Date()),
        isPast: date < new Date() && !this.isSameDay(date, new Date())
      })
    }
    
    return dates
  }

  // Verificar si dos fechas son el mismo día
  isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString()
  }

  // Planificar outfit para una fecha específica
  planOutfit(date, outfit, notes = '') {
    return {
      date,
      outfit,
      notes,
      plannedAt: new Date().toISOString(),
      status: 'planned' // planned, used, skipped
    }
  }

  // Obtener outfit planeado para una fecha
  getPlannedOutfit(plannedOutfits, date) {
    return plannedOutfits[date] || null
  }

  // Verificar disponibilidad de prendas para una fecha
  checkItemAvailability(plannedOutfits, targetDate, items) {
    const conflicts = []
    
    // Verificar si alguna prenda ya está planeada para el mismo día
    Object.entries(plannedOutfits).forEach(([date, plannedOutfit]) => {
      if (date === targetDate) return // Ignorar la misma fecha
      
      // Verificar conflictos en fechas cercanas (mismo día)
      if (this.isSameDay(new Date(date), new Date(targetDate))) {
        plannedOutfit.outfit.items.forEach(plannedItem => {
          items.forEach(item => {
            if (item.id === plannedItem.id) {
              conflicts.push({
                item,
                conflictDate: date,
                type: 'same_day'
              })
            }
          })
        })
      }
    })
    
    return conflicts
  }

  // Sugerir alternativas cuando hay conflictos
  suggestAlternatives(conflicts, allClothingItems, weatherData) {
    const suggestions = []
    
    conflicts.forEach(conflict => {
      const alternatives = allClothingItems.filter(item => 
        item.category === conflict.item.category && 
        item.id !== conflict.item.id &&
        item.condition >= 70 // Solo sugerir prendas en buen estado
      )
      
      if (alternatives.length > 0) {
        suggestions.push({
          originalItem: conflict.item,
          alternatives: alternatives.slice(0, 3), // Máximo 3 alternativas
          reason: `Conflicto en ${conflict.conflictDate}`
        })
      }
    })
    
    return suggestions
  }

  // Generar plan semanal automático
  generateWeeklyPlan(clothingItems, weatherData, startDate = new Date()) {
    const weekDates = this.getCurrentWeekDates(startDate)
    const weeklyPlan = {}
    
    // Importar OutfitAI aquí para evitar dependencias circulares
    // En implementación real, se inyectaría como dependencia
    
    weekDates.forEach(dateInfo => {
      if (!dateInfo.isPast) {
        // Simular diferentes condiciones climáticas para cada día
        const dailyWeather = {
          ...weatherData,
          temp: weatherData.temp + (Math.random() - 0.5) * 6 // Variación de ±3 grados
        }
        
        // Aquí se llamaría a OutfitAI.generateOutfit(clothingItems, dailyWeather)
        // Por ahora, creamos un outfit simulado
        const simulatedOutfit = {
          title: `Outfit para ${dateInfo.dayName}`,
          description: 'Outfit generado automáticamente',
          items: this.selectRandomItems(clothingItems, 3),
          weatherType: 'sunny',
          generated: new Date().toISOString()
        }
        
        weeklyPlan[dateInfo.date] = this.planOutfit(
          dateInfo.date, 
          simulatedOutfit, 
          'Generado automáticamente'
        )
      }
    })
    
    return weeklyPlan
  }

  // Función auxiliar para seleccionar items aleatorios
  selectRandomItems(items, count) {
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Estadísticas del planificador
  getPlannerStats(plannedOutfits) {
    const total = Object.keys(plannedOutfits).length
    const used = Object.values(plannedOutfits).filter(p => p.status === 'used').length
    const planned = Object.values(plannedOutfits).filter(p => p.status === 'planned').length
    const skipped = Object.values(plannedOutfits).filter(p => p.status === 'skipped').length
    
    // Estadísticas de prendas más usadas en planning
    const itemUsage = {}
    Object.values(plannedOutfits).forEach(plannedOutfit => {
      plannedOutfit.outfit.items.forEach(item => {
        itemUsage[item.id] = (itemUsage[item.id] || 0) + 1
      })
    })
    
    const mostPlannedItems = Object.entries(itemUsage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([itemId, count]) => ({ itemId, count }))
    
    return {
      total,
      used,
      planned,
      skipped,
      completionRate: total > 0 ? Math.round((used / total) * 100) : 0,
      mostPlannedItems
    }
  }

  // Exportar plan a formato de calendario
  exportToCalendar(plannedOutfits, format = 'ics') {
    const events = Object.values(plannedOutfits).map(plannedOutfit => ({
      date: plannedOutfit.date,
      title: plannedOutfit.outfit.title,
      description: `${plannedOutfit.outfit.description}\n\nPrendas: ${plannedOutfit.outfit.items.map(item => item.name).join(', ')}`,
      notes: plannedOutfit.notes
    }))
    
    if (format === 'ics') {
      return this.generateICSFormat(events)
    } else {
      return events
    }
  }

  // Generar formato ICS para calendarios
  generateICSFormat(events) {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wardrobe App//Outfit Planner//ES'
    ]
    
    events.forEach(event => {
      const date = event.date.replace(/-/g, '')
      icsLines.push(
        'BEGIN:VEVENT',
        `DTSTART:${date}T080000Z`,
        `DTEND:${date}T090000Z`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
        `UID:${event.date}-outfit@wardrobeapp.com`,
        'END:VEVENT'
      )
    })
    
    icsLines.push('END:VCALENDAR')
    return icsLines.join('\r\n')
  }

  // Recordatorios y notificaciones
  getUpcomingReminders(plannedOutfits, daysAhead = 1) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + daysAhead)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]
    
    const plannedOutfit = plannedOutfits[tomorrowStr]
    if (!plannedOutfit) return null
    
    return {
      date: tomorrowStr,
      outfit: plannedOutfit.outfit,
      message: `¡No olvides tu outfit para mañana: ${plannedOutfit.outfit.title}!`,
      items: plannedOutfit.outfit.items.map(item => ({
        name: item.name,
        condition: item.condition,
        needsPrep: item.condition < 80
      }))
    }
  }

  // Análisis de patrones de uso
  analyzeUsagePatterns(plannedOutfits) {
    const patterns = {
      favoriteColors: {},
      favoriteCategories: {},
      seasonalPreferences: {},
      dayOfWeekPreferences: {}
    }
    
    Object.values(plannedOutfits).forEach(plannedOutfit => {
      const date = new Date(plannedOutfit.date)
      const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'long' })
      
      plannedOutfit.outfit.items.forEach(item => {
        // Colores favoritos
        patterns.favoriteColors[item.color] = (patterns.favoriteColors[item.color] || 0) + 1
        
        // Categorías favoritas
        patterns.favoriteCategories[item.category] = (patterns.favoriteCategories[item.category] || 0) + 1
        
        // Preferencias estacionales
        patterns.seasonalPreferences[item.season] = (patterns.seasonalPreferences[item.season] || 0) + 1
        
        // Preferencias por día de la semana
        if (!patterns.dayOfWeekPreferences[dayOfWeek]) {
          patterns.dayOfWeekPreferences[dayOfWeek] = {}
        }
        patterns.dayOfWeekPreferences[dayOfWeek][item.category] = 
          (patterns.dayOfWeekPreferences[dayOfWeek][item.category] || 0) + 1
      })
    })
    
    return patterns
  }

  // Validar plan de outfit
  validateOutfitPlan(date, outfit, clothingItems) {
    const errors = []
    const warnings = []
    
    // Verificar que la fecha no sea en el pasado
    if (new Date(date) < new Date()) {
      errors.push('No puedes planificar outfits para fechas pasadas')
    }
    
    // Verificar que el outfit tenga prendas
    if (!outfit.items || outfit.items.length === 0) {
      errors.push('El outfit debe tener al menos una prenda')
    }
    
    // Verificar que las prendas existan en el armario
    outfit.items.forEach(item => {
      const exists = clothingItems.find(wardrobeItem => wardrobeItem.id === item.id)
      if (!exists) {
        errors.push(`La prenda "${item.name}" no existe en tu armario`)
      } else if (exists.condition < 50) {
        warnings.push(`La prenda "${item.name}" está en mal estado`)
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }
}