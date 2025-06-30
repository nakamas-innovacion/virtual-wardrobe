// src/components/ui/BottomNavigation.jsx
import React from 'react'
import { Home, Shirt, Plus, Sparkles, User } from 'lucide-react'

const BottomNavigation = ({ activeView, onNavigate, userData }) => {
  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: 'Inicio',
      notification: null
    },
    { 
      id: 'wardrobe', 
      icon: Shirt, 
      label: 'Armario',
      notification: null
    },
    { 
      id: 'add', 
      icon: Plus, 
      label: 'Añadir',
      notification: null,
      special: true
    },
    { 
      id: 'outfit', 
      icon: Sparkles, 
      label: 'Outfit',
      notification: null
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'Perfil',
      notification: userData?.streak >= 7 ? '🔥' : null
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-purple-600 bg-purple-50 transform scale-105' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {/* Icono especial para el botón Add */}
                {item.special ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                ) : (
                  <Icon className="w-6 h-6" />
                )}
                
                <span className="text-xs font-medium">{item.label}</span>
                
                {/* Indicador de notificación */}
                {item.notification && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">{item.notification}</span>
                  </div>
                )}
                
                {/* Indicador activo */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation