import { useState } from 'react'
import { ArrowLeft, Trophy, Star, Target, Zap, Crown, Award, Gift, Lock, Flame, Medal, TrendingUp } from 'lucide-react'
import { challengesData, achievementsData } from '../data/initialData' // Asegúrate de tener un archivo de datos para los desafíos

const GamificationView = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('achievements')

  // Datos del usuario más detallados
  const userStats = {
    level: 12,
    experience: 2450,
    nextLevelExp: 3000,
    totalOutfits: 43,
    itemsAdded: 127,
    stylesUnlocked: 8,
    daysActive: 28,
    streak: 7,
    favoriteOutfits: 15,
    shareCount: 7
  }

  

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-orange-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300'
      case 'rare': return 'border-blue-300'
      case 'epic': return 'border-purple-300'
      case 'legendary': return 'border-yellow-300'
      default: return 'border-gray-300'
    }
  }

  const experienceProgress = (userStats.experience / userStats.nextLevelExp) * 100

  const filteredAchievements = achievementsData
  const unlockedCount = achievementsData.filter(a => a.unlocked).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm px-4 py-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Gamificación</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* User Level Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-slate-800">Nivel {userStats.level}</h2>
                <div className="flex items-center gap-1 text-orange-500">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">{userStats.streak}</span>
                </div>
              </div>
              <p className="text-slate-600">Fashionista Avanzado</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Experiencia</span>
              <span>{userStats.experience} / {userStats.nextLevelExp} XP</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${experienceProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {userStats.nextLevelExp - userStats.experience} XP para el siguiente nivel
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-slate-800">{userStats.totalOutfits}</div>
              <div className="text-xs text-slate-500">Outfits</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800">{userStats.itemsAdded}</div>
              <div className="text-xs text-slate-500">Prendas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800">{userStats.stylesUnlocked}</div>
              <div className="text-xs text-slate-500">Estilos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800">{userStats.shareCount}</div>
              <div className="text-xs text-slate-500">Shares</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'achievements' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Logros ({unlockedCount}/{achievementsData.length})
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'challenges' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Desafíos
          </button>
        </div>

        {/* Content */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {filteredAchievements.map(achievement => {
              const Icon = achievement.icon
              const isUnlocked = achievement.unlocked
              
              return (
                <div 
                  key={achievement.id} 
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all hover:shadow-md ${
                    isUnlocked ? getRarityBorder(achievement.rarity) : 'border-slate-200'
                  } ${!isUnlocked ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isUnlocked 
                        ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}` 
                        : 'bg-slate-200'
                    }`}>
                      {isUnlocked ? (
                        <Icon className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className={`font-semibold truncate ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${isUnlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                            {achievement.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-amber-600 ml-2">
                          <Star className="w-3 h-3 fill-amber-600" />
                          <span>{achievement.experience}</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      {!isUnlocked && achievement.progress !== undefined && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Progreso</span>
                            <span>{achievement.progress} / {achievement.maxProgress}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Unlock date */}
                      {isUnlocked && achievement.unlockedAt && (
                        <div className="mt-2 text-xs text-slate-400">
                          Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString('es-ES')}
                        </div>
                      )}
                      
                      {/* Rarity badge */}
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          achievement.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                          achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                          achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-orange-700'
                        }`}>
                          {achievement.rarity === 'common' ? 'Común' :
                           achievement.rarity === 'rare' ? 'Raro' :
                           achievement.rarity === 'epic' ? 'Épico' : 'Legendario'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challengesData.map(challenge => {
              const Icon = challenge.icon
              const progress = (challenge.progress / challenge.maxProgress) * 100
              
              return (
                <div key={challenge.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      challenge.type === 'daily' ? 'bg-orange-100' : 'bg-blue-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        challenge.type === 'daily' ? 'text-orange-600' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">{challenge.title}</h4>
                          <p className="text-sm text-slate-600">{challenge.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            <Star className="w-3 h-3 fill-amber-600" />
                            <span>{challenge.reward} XP</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{challenge.timeLeft}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Progreso</span>
                          <span>{challenge.progress} / {challenge.maxProgress}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              challenge.type === 'daily' 
                                ? 'bg-gradient-to-r from-orange-400 to-orange-600' 
                                : 'bg-gradient-to-r from-blue-400 to-blue-600'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mt-6 text-white">
          <h3 className="font-semibold text-lg mb-2">¡Sigue progresando!</h3>
          <p className="text-sm opacity-90 mb-4">
            Has desbloqueado {unlockedCount} de {achievementsData.length} logros disponibles
          </p>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-300"
              style={{ width: `${(unlockedCount / achievementsData.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs opacity-75">
            Próximo objetivo: {achievementsData.find(a => !a.unlocked)?.title || 'Todos completados'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamificationView