// src/views/HomeView.jsx
import React from 'react'
import { 
  User, MapPin, Sun, Sparkles, Camera, Shirt, 
  Calendar, ShoppingBag, Trophy, TrendingUp 
} from 'lucide-react'

const HomeView = ({ 
  onNavigate, 
  weatherData, 
  outfitSuggestion, 
  onRegenerateOutfit,
  userData,
  addNotification 
}) => {
  
  // Calcular progreso hacia siguiente nivel
  const levelProgress = (userData.points % 1000) / 1000 * 100
  const pointsToNextLevel = 1000 - (userData.points % 1000)

  const handleQuickAction = (action) => {
    switch (action) {
      case 'regenerate':
        onRegenerateOutfit()
        addNotification('Nuevo outfit generado', 'info')
        break
      case 'planner':
        onNavigate('planner')
        break
      case 'catalog':
        onNavigate('catalog')
        break
      case 'wardrobe':
        onNavigate('wardrobe')
        break
      case 'add':
        onNavigate('add')
        break
      default:
        break
    }
  }

  const getStreakMessage = () => {
    if (userData.streak >= 30) return '¡Leyenda del estilo!'
    if (userData.streak >= 14) return '¡Fashionista dedicado!'
    if (userData.streak >= 7) return '¡Vas muy bien!'
    return '¡Sigue así!'
  }

  const getStreakColor = () => {
    if (userData.streak >= 30) return 'from-purple-500 to-pink-500'
    if (userData.streak >= 14) return 'from-blue-500 to-purple-500'
    if (userData.streak >= 7) return 'from-green-500 to-blue-500'
    return 'from-amber-400 to-orange-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Header con stats de gamificación */}
        <div className="flex justify-between items-center mb-6 pt-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {new Date().getHours() < 12 ? 'Buenos días' : 
               new Date().getHours() < 18 ? 'Buenas tardes' : 'Buenas noches'}
            </h1>
            <p className="text-slate-600">¿Qué te pondrás hoy?</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-slate-600">Nivel {userData.level}</span>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userData.level}
              </div>
            </div>
            <div className="text-xs text-slate-500">
              {userData.points.toLocaleString()} pts • {userData.streak} días
            </div>
            
            {/* Barra de progreso mini */}
            <div className="w-16 bg-slate-200 rounded-full h-1 mt-1">
              <div 
                className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tarjeta de racha */}
        <div className={`bg-gradient-to-r ${getStreakColor()} rounded-2xl p-4 mb-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                🔥 Racha de {userData.streak} días
              </h3>
              <p className="text-sm opacity-90">{getStreakMessage()}</p>
              {pointsToNextLevel <= 200 && (
                <p className="text-xs opacity-75 mt-1">
                  Solo {pointsToNextLevel} puntos para subir de nivel
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{userData.points.toLocaleString()}</div>
              <div className="text-xs opacity-90">puntos</div>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">{weatherData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Sun className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-slate-800">{weatherData.temp}°</span>
                  <p className="text-sm text-slate-600">{weatherData.description}</p>
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p>Máx: {weatherData.max}°</p>
              <p>Mín: {weatherData.min}°</p>
              {weatherData.humidity && (
                <p className="text-xs mt-1">Humedad: {weatherData.humidity}%</p>
              )}
            </div>
          </div>
        </div>

        {/* Outfit Suggestion */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Outfit del día</h3>
            </div>
            <button 
              onClick={() => handleQuickAction('regenerate')}
              className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all transform hover:scale-105"
              title="Generar nuevo outfit"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
          
          <p className="mb-4 opacity-90">{outfitSuggestion.description}</p>
          
          <div className="flex gap-3 mb-4">
            {outfitSuggestion.items.slice(0, 3).map((item, index) => (
              <div 
                key={index} 
                className="relative w-12 h-12 bg-white bg-opacity-20 rounded-lg overflow-hidden group"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                
                {/* Indicador de condición */}
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white">
                  <div 
                    className={`w-full h-full rounded-full ${
                      item.condition >= 80 ? 'bg-green-400' : 
                      item.condition >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                  />
                </div>
              </div>
            ))}
            
            {outfitSuggestion.items.length > 3 && (
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold">+{outfitSuggestion.items.length - 3}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('outfit')}
              className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors"
            >
              Ver completo
            </button>
            <button 
              onClick={() => handleQuickAction('planner')}
              className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-full text-sm hover:bg-opacity-30 transition-colors"
              title="Planificar para más tarde"
            >
              📅
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <QuickActionCard
            icon={Calendar}
            title="Planificar"
            subtitle="Organiza tu semana"
            color="blue"
            onClick={() => handleQuickAction('planner')}
            badge={null}
          />
          
          <QuickActionCard
            icon={ShoppingBag}
            title="Catálogo"
            subtitle="Prueba ropa nueva"
            color="green"
            onClick={() => handleQuickAction('catalog')}
            badge="NUEVO"
          />
          
          <QuickActionCard
            icon={Trophy}
            title="Logros"
            subtitle={`Nivel ${userData.level}`}
            color="purple"
            onClick={() => onNavigate('game')}
            badge={userData.streak >= 7 ? "🔥" : null}
          />
          
          <QuickActionCard
            icon={Shirt}
            title="Mi armario"
            subtitle="Gestiona tu ropa"
            color="amber"
            onClick={() => handleQuickAction('wardrobe')}
            badge={null}
          />
        </div>

        {/* Stats Row */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Resumen de hoy
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-purple-600">{userData.level}</div>
              <div className="text-xs text-slate-500">Nivel</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{userData.streak}</div>
              <div className="text-xs text-slate-500">Racha (días)</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{userData.outfitsUsed || 0}</div>
              <div className="text-xs text-slate-500">Outfits usados</div>
            </div>
          </div>
        </div>

        {/* Floating Add Button */}
        <button 
          onClick={() => handleQuickAction('add')}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all transform hover:scale-105 z-10"
          title="Añadir prenda"
        >
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

// Componente auxiliar para las tarjetas de acción rápida
const QuickActionCard = ({ icon: Icon, title, subtitle, color, onClick, badge }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600'
  }

  return (
    <button 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-[1.02] flex flex-col items-center gap-3 relative"
    >
      {badge && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          {badge}
        </span>
      )}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-center">
        <div className="text-slate-700 font-medium">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
    </button>
  )
}

export default HomeView