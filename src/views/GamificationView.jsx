import React from 'react'
import { ArrowLeft, Trophy, TrendingUp, Award, Clock, Star, Heart } from 'lucide-react'

// Vista de Gamificación
const GameView = ({ onNavigate, userLevel, userPoints, userStreak, clothingItems, achievements }) => {
  const nextLevelPoints = userLevel * 1000
  const currentLevelProgress = userPoints % 1000
  
  const getConditionColor = (condition) => {
    if (condition >= 80) return 'text-green-600 bg-green-100'
    if (condition >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const totalWearCount = clothingItems.reduce((sum, item) => sum + item.timesWorn, 0)
  const averageCondition = Math.round(clothingItems.reduce((sum, item) => sum + item.condition, 0) / clothingItems.length)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-8 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-bold">Mi Progreso</h1>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Nivel {userLevel}</h2>
            <p className="opacity-90 mb-4">{userPoints} puntos totales</p>
            
            {/* Barra de progreso */}
            <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
              <div 
                className="bg-emerald-500 rounded-full h-3 transition-all duration-500"
                style={{ width: `${(currentLevelProgress / 1000) * 100}%` }}
              />
            </div>
            <p className="text-sm opacity-75">{currentLevelProgress}/1000 para nivel {userLevel + 1}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Estadísticas */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Estadísticas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStreak}</div>
              <div className="text-sm text-slate-500">Días consecutivos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalWearCount}</div>
              <div className="text-sm text-slate-500">Usos totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{clothingItems.length}</div>
              <div className="text-sm text-slate-500">Prendas en armario</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{averageCondition}%</div>
              <div className="text-sm text-slate-500">Condición promedio</div>
            </div>
          </div>
        </div>

        {/* Logros */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Logros
          </h3>
          <div className="space-y-4">
            {achievements.map(achievement => (
              <div key={achievement.id} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{achievement.name}</h4>
                  <span className="text-sm text-slate-500">{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                <div className="bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cuidado del armario */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Cuidado del Armario
          </h3>
          <div className="space-y-3">
            {clothingItems
              .filter(item => item.condition < 70)
              .slice(0, 3)
              .map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{item.name}</h4>
                  <p className="text-sm text-slate-500">Necesita cuidado</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                  {Math.round(item.condition)}%
                </span>
              </div>
            ))}
            
            {clothingItems.filter(item => item.condition < 70).length === 0 && (
              <div className="text-center py-4 text-slate-500">
                <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">¡Tu armario está en excelente estado!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameView