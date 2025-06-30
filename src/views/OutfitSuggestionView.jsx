// src/views/OutfitSuggestionView.jsx
import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, Check, Sun, Sparkles, Share2, 
  Heart, Calendar, Shuffle, Info, Star 
} from 'lucide-react'

const OutfitSuggestionView = ({ 
  onNavigate, 
  outfitSuggestion, 
  weatherData, 
  onRegenerateOutfit, 
  onUseOutfit, 
  userData,
  addNotification 
}) => {
  const [showPoints, setShowPoints] = useState(false)
  const [showItemDetails, setShowItemDetails] = useState(null)
  const [liked, setLiked] = useState(false)

  const pointsToEarn = 10 + (outfitSuggestion.items.length * 5)

  const handleUseOutfit = () => {
    onUseOutfit(outfitSuggestion)
    setShowPoints(true)
    setTimeout(() => setShowPoints(false), 3000)
  }

  const handleLike = () => {
    setLiked(!liked)
    addNotification(
      liked ? 'Outfit removido de favoritos' : 'Outfit añadido a favoritos', 
      'info'
    )
  }

  const handleShare = () => {
    // Simular compartir
    addNotification('Outfit compartido', 'success')
  }

  const handleSchedule = () => {
    addNotification('Redirigiendo al planificador...', 'info')
    onNavigate('planner')
  }

  const getItemConditionColor = (condition) => {
    if (condition >= 80) return 'text-green-600 bg-green-100'
    if (condition >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getWeatherIcon = () => {
    const desc = weatherData.description.toLowerCase()
    if (desc.includes('sol')) return '☀️'
    if (desc.includes('nub')) return '☁️'
    if (desc.includes('lluv')) return '🌧️'
    return '🌤️'
  }

  const getOutfitRating = () => {
    // Calcular rating basado en condición de prendas y compatibilidad
    const avgCondition = outfitSuggestion.items.reduce((sum, item) => sum + item.condition, 0) / outfitSuggestion.items.length
    return Math.round(avgCondition / 20) // 0-5 stars
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm px-4 py-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-800">Outfit del día</h1>
              <p className="text-sm text-slate-500">
                Generado especialmente para ti
              </p>
            </div>
            <button 
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                liked ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Weather Context */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">{getWeatherIcon()}</div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">Perfecto para hoy</h3>
              <p className="text-slate-600 text-sm">
                {weatherData.temp}° • {weatherData.description}
              </p>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p>Máx: {weatherData.max}°</p>
              <p>Mín: {weatherData.min}°</p>
            </div>
          </div>
          
          {weatherData.humidity && (
            <div className="flex justify-between text-xs text-slate-500 pt-3 border-t">
              <span>Humedad: {weatherData.humidity}%</span>
              {weatherData.uvIndex && <span>UV: {weatherData.uvIndex}</span>}
            </div>
          )}
        </div>

        {/* Outfit Display */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          {/* Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < getOutfitRating() ? 'text-yellow-500 fill-current' : 'text-slate-300'
                  }`} 
                />
              ))}
              <span className="text-sm text-slate-600 ml-2">
                {getOutfitRating()}/5
              </span>
            </div>
            <button 
              onClick={onRegenerateOutfit}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm"
            >
              <Shuffle className="w-4 h-4" />
              Regenerar
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {outfitSuggestion.items.map((item, index) => (
              <div 
                key={index} 
                className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative cursor-pointer group"
                onClick={() => setShowItemDetails(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                
                {/* Condition indicator */}
                <div className="absolute bottom-1 right-1">
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getItemConditionColor(item.condition)}`}>
                    {Math.round(item.condition)}%
                  </span>
                </div>

                {/* Hover overlay */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <Info className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div> */}
              </div>
            ))}
          </div>
          
          {/* Outfit Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              {outfitSuggestion.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {outfitSuggestion.description}
            </p>
            
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
              <span>Combinación generada por IA</span>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <span>{outfitSuggestion.items.length} prendas</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button 
            onClick={handleUseOutfit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-medium text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-5 h-5" />
            ¡Me gusta! (+{pointsToEarn} pts)
          </button>
          
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={handleShare}
              className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
            <button 
              onClick={handleSchedule}
              className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Planificar
            </button>
            <button 
              onClick={onRegenerateOutfit}
              className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Nuevo
            </button>
          </div>
        </div>

        {/* Style Tips */}
        {outfitSuggestion.advice && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-6">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              💡 Tip de estilo
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {outfitSuggestion.advice}
            </p>
          </div>
        )}

        {/* Items Care Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Estado de las prendas
          </h4>
          <div className="space-y-3">
            {outfitSuggestion.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-slate-800 text-sm">{item.name}</h5>
                  <p className="text-xs text-slate-500">{item.brand}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getItemConditionColor(item.condition)}`}>
                    {Math.round(item.condition)}%
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.timesWorn || 0} usos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Animation */}
        {showPoints && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-green-500 text-white px-8 py-6 rounded-2xl shadow-2xl animate-bounce">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-xl font-bold">+{pointsToEarn} puntos!</div>
                <div className="text-sm opacity-90">¡Excelente elección!</div>
              </div>
            </div>
          </div>
        )}

        {/* Item Details Modal */}
        {showItemDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <img 
                  src={showItemDetails.image} 
                  alt={showItemDetails.name}
                  className="w-24 h-24 object-cover rounded-xl mx-auto mb-3"
                />
                <h3 className="font-bold text-slate-800">{showItemDetails.name}</h3>
                <p className="text-slate-600">{showItemDetails.brand}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Condición:</span>
                  <span className={`font-medium ${
                    showItemDetails.condition >= 80 ? 'text-green-600' : 
                    showItemDetails.condition >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {Math.round(showItemDetails.condition)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Usos:</span>
                  <span className="text-slate-800">{showItemDetails.timesWorn || 0} veces</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Temporada:</span>
                  <span className="text-slate-800 capitalize">{showItemDetails.season}</span>
                </div>
                {showItemDetails.lastWorn && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Último uso:</span>
                    <span className="text-slate-800">{showItemDetails.lastWorn}</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setShowItemDetails(null)}
                className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutfitSuggestionView