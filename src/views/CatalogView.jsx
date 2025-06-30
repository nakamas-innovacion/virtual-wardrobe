import React, { useState } from 'react'
import { ArrowLeft, Shirt, ShoppingBag, TrendingUp } from 'lucide-react'

// Vista del Catálogo
const CatalogView = ({ onNavigate, externalCatalog, onTryOn, clothingItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [tryOnResult, setTryOnResult] = useState(null)

  const handleTryOn = (item) => {
    const result = onTryOn(item)
    // Compatible items tryOnResult.compatibleItems
    result.catalogItem = item
    result.recommendation = `Este ${item.category} combina bien con tu armario.
    Puedes usarlo con prendas de las siguientes categorías: ${item.compatibility.join(', ')}`
    result.compatibleItems = clothingItems.filter(clothingItem =>
      item.compatibility.includes(clothingItem.category) && clothingItem.id !== item.id
    ).slice(0, 3) // Limitar a 3 items compatibles
    setTryOnResult(result)

  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Catálogo</h1>
            <span className="ml-auto bg-red-500 text-white px-2 py-1 rounded-full text-xs">NUEVO</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'tops', 'bottoms', 'dresses', 'shoes'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === category 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category === 'all' ? 'Todo' : category}
            </button>
          ))}
        </div>

        {/* Productos del catálogo */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            {
              id: 'ext1',
              name: 'Chaqueta Denim',
              brand: 'Levi\'s',
              price: 89990,
              category: 'tops',
              season: 'all',
              image: 'https://levis.cl/media/catalog/product/cache/eaaba5bf70dd6e05d78e04c6434dea8e/7/7/77380-0001-1.jpg',
              compatibility: ['jeans', 'falda', 'vestido'],
              trending: true
            },
            {
              id: 'ext2',
              name: 'Vestido Floral',
              brand: 'Zara',
              price: 29990,
              category: 'dresses',
              season: 'summer',
              image: 'https://static.zara.net/photos///2024/V/0/1/p/7568/144/800/2/w/750/7568144800_6_1_1.jpg',
              compatibility: ['sandalias', 'sneakers'],
              trending: false
            },
            {
              id: 'ext3',
              name: 'Sneakers Retro',
              brand: 'Nike',
              price: 119990,
              category: 'shoes',
              season: 'all',
              image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFqb.png',
              compatibility: ['jeans', 'shorts', 'vestido'],
              trending: true
            }
          ]
            .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
            .map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-slate-100 relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.trending && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    🔥 Trend
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-slate-800 mb-1">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{item.brand}</p>
                <p className="text-lg font-bold text-purple-600 mb-3">${item.price.toLocaleString()}</p>
                <button 
                  onClick={() => handleTryOn(item)}
                  className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Shirt className="w-4 h-4" />
                  Probar virtual
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de prueba virtual */}
        {tryOnResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Prueba Virtual</h3>
                <img 
                  src={tryOnResult.catalogItem.image} 
                  alt={tryOnResult.catalogItem.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="font-medium">{tryOnResult.catalogItem.name}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Compatibilidad con tu armario:
                </h4>
                <p className="text-sm text-slate-600 mb-2">{tryOnResult.recommendation}</p>
                
                {tryOnResult.compatibleItems.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Se combina bien con:</p>
                    <div className="flex gap-2">
                      {tryOnResult.compatibleItems.slice(0, 3).map(item => (
                        <div key={item.id} className="w-8 h-8 bg-slate-100 rounded overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setTryOnResult(null)}
                  className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium"
                >
                  Cerrar
                </button>
                <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Comprar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogView