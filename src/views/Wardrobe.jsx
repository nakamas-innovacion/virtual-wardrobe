import { useState } from 'react'
import { ArrowLeft, Search, Heart, Plus } from 'lucide-react'

const WardrobeView = ({ onNavigate, clothingItems }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories']

  const filteredItems = activeCategory === 'all' 
    ? clothingItems 
    : clothingItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Mi Armario</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar en tu armario..."
              className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-full text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === category 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category === 'all' ? 'Todo' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Clothing Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-slate-100 relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-slate-800 mb-1">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.brand}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                  <span className="text-xs text-slate-400">{item.season}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button 
          onClick={() => onNavigate('add')}
          className="fixed bottom-24 right-6 w-14 h-14 bg-purple-500 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

export default WardrobeView