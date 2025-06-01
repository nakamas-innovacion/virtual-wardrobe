import { Home, Shirt, Plus, Sparkles, User } from 'lucide-react'

const BottomNavigation = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'wardrobe', icon: Shirt, label: 'Armario' },
    { id: 'add', icon: Plus, label: 'Añadir' },
    { id: 'outfit', icon: Sparkles, label: 'Outfit' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${item.id === 'add' && !isActive ? 'bg-purple-500 text-white p-1 rounded-full w-8 h-8' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation