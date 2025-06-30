// src/views/PlannerView.jsx
import React, { useState, useMemo } from 'react'
import { 
  ArrowLeft, Calendar, Plus, Sparkles, ChevronLeft, 
  ChevronRight, Check, X, AlertCircle, Clock 
} from 'lucide-react'

const PlannerView = ({ 
  onNavigate, 
  outfitPlanner, 
  onPlanOutfit, 
  clothingItems, 
  weatherData, 
  plannerService,
  addNotification 
}) => {
  const [viewMode, setViewMode] = useState('week') // 'week' or 'month'
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showOutfitModal, setShowOutfitModal] = useState(false)
  const [selectedPlanDate, setSelectedPlanDate] = useState(null)
  const [generatedOutfits, setGeneratedOutfits] = useState([])

  // Obtener fechas según el modo de vista
  const dates = useMemo(() => {
    if (viewMode === 'week') {
      return plannerService.getCurrentWeekDates(selectedDate)
    } else {
      return plannerService.getCurrentMonthDates(
        selectedDate.getFullYear(), 
        selectedDate.getMonth()
      )
    }
  }, [viewMode, selectedDate, plannerService])

  // Estadísticas del planificador
  const plannerStats = plannerService.getPlannerStats(outfitPlanner.weekly)

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate)
    if (viewMode === 'week') {
      newDate.setDate(selectedDate.getDate() + (direction * 7))
    } else {
      newDate.setMonth(selectedDate.getMonth() + direction)
    }
    setSelectedDate(newDate)
  }

  const handleDateClick = (dateInfo) => {
    if (dateInfo.isPast) return
    
    setSelectedPlanDate(dateInfo.date)
    
    // Generar opciones de outfit para esta fecha
    generateOutfitOptions(dateInfo.date)
    setShowOutfitModal(true)
  }

  const generateOutfitOptions = (date) => {
    // Simular variaciones de clima para el día seleccionado
    const variations = [
      { ...weatherData, temp: weatherData.temp },
      { ...weatherData, temp: weatherData.temp + 3 },
      { ...weatherData, temp: weatherData.temp - 2 }
    ]

    const options = variations.map((weather, index) => {
      // Aquí usaríamos OutfitAI.generateOutfit
      const outfit = {
        id: `option_${index}`,
        title: `Opción ${index + 1}`,
        description: `Outfit para ${weather.temp}°C`,
        items: selectRandomItems(clothingItems, 3),
        weatherType: 'sunny',
        generated: new Date().toISOString()
      }
      return outfit
    })

    setGeneratedOutfits(options)
  }

  // Función auxiliar para seleccionar items aleatorios
  const selectRandomItems = (items, count) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const handlePlanOutfit = (outfit) => {
    onPlanOutfit(selectedPlanDate, outfit)
    setShowOutfitModal(false)
    addNotification('Outfit planificado correctamente', 'success')
  }

  const handleRemovePlan = (date) => {
    // Aquí implementarías la lógica para remover un plan
    addNotification('Plan removido', 'info')
  }

  const getDateDisplayText = () => {
    if (viewMode === 'week') {
      const startWeek = dates[0]?.date
      const endWeek = dates[6]?.date
      if (startWeek && endWeek) {
        const start = new Date(startWeek)
        const end = new Date(endWeek)
        return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`
      }
    } else {
      return selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    }
    return ''
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-800">Planificador</h1>
              <p className="text-sm text-slate-500">
                Organiza tus outfits por adelantado
              </p>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
            <button 
              onClick={() => setViewMode('week')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              Semana
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              Mes
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigateWeek(-1)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            
            <h2 className="font-medium text-slate-800 capitalize">
              {getDateDisplayText()}
            </h2>
            
            <button 
              onClick={() => navigateWeek(1)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Stats */}
        {plannerStats.total > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-3">Resumen de planificación</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-purple-600">{plannerStats.planned}</div>
                <div className="text-xs text-slate-500">Planeados</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{plannerStats.used}</div>
                <div className="text-xs text-slate-500">Usados</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{plannerStats.completionRate}%</div>
                <div className="text-xs text-slate-500">Completados</div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        {viewMode === 'week' ? (
          <WeekView 
            dates={dates}
            outfitPlanner={outfitPlanner}
            onDateClick={handleDateClick}
            onRemovePlan={handleRemovePlan}
          />
        ) : (
          <MonthView 
            dates={dates}
            outfitPlanner={outfitPlanner}
            onDateClick={handleDateClick}
            selectedDate={selectedDate}
          />
        )}

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <button 
            onClick={() => {
              // Generar plan semanal automático
              addNotification('Generando plan semanal...', 'info')
              setTimeout(() => {
                addNotification('Plan semanal generado', 'success')
              }, 1000)
            }}
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generar plan semanal automático
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => addNotification('Exportando calendario...', 'info')}
              className="bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Exportar calendario
            </button>
            <button 
              onClick={() => addNotification('Configurando recordatorios...', 'info')}
              className="bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Recordatorios
            </button>
          </div>
        </div>

        {/* Outfit Planning Modal */}
        {showOutfitModal && (
          <OutfitPlanningModal
            date={selectedPlanDate}
            outfits={generatedOutfits}
            onPlan={handlePlanOutfit}
            onClose={() => setShowOutfitModal(false)}
            onRegenerate={() => generateOutfitOptions(selectedPlanDate)}
          />
        )}
      </div>
    </div>
  )
}

// Componente Vista Semanal
const WeekView = ({ dates, outfitPlanner, onDateClick, onRemovePlan }) => {
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  return (
    <div className="space-y-4">
      {dates.map((dateInfo, index) => {
        const plannedOutfit = outfitPlanner.weekly[dateInfo.date]
        
        return (
          <div key={dateInfo.date} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`font-semibold ${
                  dateInfo.isToday ? 'text-purple-600' : 'text-slate-800'
                }`}>
                  {dayNames[index]}
                  {dateInfo.isToday && ' (Hoy)'}
                </h3>
                <p className="text-sm text-slate-500">{dateInfo.date}</p>
              </div>
              
              {!plannedOutfit && !dateInfo.isPast && (
                <button 
                  onClick={() => onDateClick(dateInfo)}
                  className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs hover:bg-purple-600 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Planificar
                </button>
              )}
              
              {plannedOutfit && (
                <button 
                  onClick={() => onRemovePlan(dateInfo.date)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {plannedOutfit ? (
              <div>
                <p className="text-sm text-slate-600 mb-2">{plannedOutfit.outfit.title}</p>
                <div className="flex gap-2">
                  {plannedOutfit.outfit.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {plannedOutfit.outfit.items.length > 3 && (
                    <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-slate-600">+{plannedOutfit.outfit.items.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`text-center py-4 ${
                dateInfo.isPast ? 'text-slate-300' : 'text-slate-400'
              }`}>
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {dateInfo.isPast ? 'Sin planificar' : 'No hay outfit planeado'}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Componente Vista Mensual (simplificada)
const MonthView = ({ dates, outfitPlanner, onDateClick, selectedDate }) => {
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-slate-500 p-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {dates.map((dateInfo) => {
          const plannedOutfit = outfitPlanner.weekly[dateInfo.date]
          const isCurrentMonth = dateInfo.isCurrentMonth
          
          return (
            <button
              key={dateInfo.date}
              onClick={() => !dateInfo.isPast && isCurrentMonth && onDateClick(dateInfo)}
              disabled={dateInfo.isPast || !isCurrentMonth}
              className={`aspect-square p-1 rounded-lg text-xs relative transition-colors ${
                !isCurrentMonth ? 'text-slate-300' :
                dateInfo.isToday ? 'bg-purple-500 text-white' :
                dateInfo.isPast ? 'text-slate-400' :
                'text-slate-700 hover:bg-slate-100'
              } ${plannedOutfit ? 'bg-green-100' : ''}`}
            >
              <span>{dateInfo.dayNumber}</span>
              {plannedOutfit && (
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Modal de planificación de outfit
const OutfitPlanningModal = ({ date, outfits, onPlan, onClose, onRegenerate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">
            Planificar outfit
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        
        <p className="text-sm text-slate-600 mb-6">
          Selecciona un outfit para {new Date(date).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </p>
        
        <div className="space-y-4 mb-6">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-medium text-slate-800">{outfit.title}</h4>
              </div>
              
              <div className="flex gap-2 mb-3">
                {outfit.items.map((item, index) => (
                  <div key={index} className="w-8 h-8 bg-slate-100 rounded overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => onPlan(outfit)}
                className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
              >
                Seleccionar este outfit
              </button>
            </div>
          ))}
        </div>
        
        <button
          onClick={onRegenerate}
          className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Generar nuevas opciones
        </button>
      </div>
    </div>
  )
}

export default PlannerView