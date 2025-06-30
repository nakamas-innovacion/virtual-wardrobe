import React from 'react'
import { ArrowLeft, Trophy, Heart, Share2 } from 'lucide-react'

const ProfileView = ({ onNavigate, userLevel, userPoints, userStreak, clothingItems }) => {
  const stats = [
    { label: 'Prendas', value: clothingItems.length.toString() },
    { label: 'Nivel', value: userLevel.toString() },
    { label: 'Puntos', value: userPoints.toString() }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-8 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-bold">Mi Perfil</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <img 
                src="https://img.freepik.com/foto-gratis/mujer-posando-tiro-medio-estudio_23-2149883753.jpg?semt=ais_hybrid&w=740" 
                alt="User" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">María García</h2>
              <p className="text-purple-100">Fashionista desde 2024</p>
              <p className="text-sm opacity-75">🔥 {userStreak} días de racha</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('game')}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-medium text-slate-800 block">Mi Progreso</span>
              <span className="text-sm text-slate-500">Nivel {userLevel} • {userPoints} puntos</span>
            </div>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-slate-800">Mis Favoritos</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium text-slate-800">Compartir App</span>
          </button>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mt-6 text-white">
          <h3 className="font-bold text-lg mb-2">✨ Hazte Premium</h3>
          <p className="text-sm opacity-90 mb-4">Desbloquea outfits ilimitados, análisis de estilo avanzado y más funciones increíbles.</p>
          <button className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium">
            Mejorar ahora
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileView